import * as Surplus from 'surplus'; Surplus;
import { FormFlags, enum_option, enum_options, getFnVal } from '../util'
import { FieldType, HasState, PojoState, PojoSO } from 'coreds/lib/types'
import { $any, defp } from 'coreds/lib/util'
import { $change } from 'coreds/lib/form'
import { $clearMsg } from './common'

import * as keymage from 'coreds-ui/lib/keymage'
import { getPopup, hidePopup } from 'coreds-ui/lib/dom_util'

function $focusin(e) {
    keymage.clearScope()
    hidePopup(getPopup())
}

function $keydown(this: any, e) {
    // escape key
    if (e.which === 27 && this.msg) {
        e.stopPropagation()
        this.msg = ''
    }
}

function msg_class(hs: HasState, update: boolean) {
    let flag
    return !hs.msg || (!(flag = (PojoState.MASK_STATUS & hs.state)) && update) ? 'd-none' : ('ui msg status-' + flag)
}

function msg(pojo: any, update: boolean) {
    let hs = pojo['_'] as HasState,
        fn = $clearMsg.bind(hs)
    return (
<div class={msg_class(hs, update)}>
  <i class="close icon" onClick={fn}></i>
  <span>{$any(hs.msg)}</span>
</div>
    )
}

function $onSubmit(this: any, e) {
    e.preventDefault()
    this(e)
    return false
}

export function form(pojo: any, $d: any, fnSubmit: any, ffid: string | null, ffobj?: any,
        formFlags?: FormFlags, content?: any) {
    let update = ffid === null,
        flags = formFlags || 0,
        bottom = !!(flags & FormFlags.SLOT_BOTTOM),
        toggle32 = (flags & FormFlags.TOGGLE_FLAG32),
        placeholder = 0 !== (flags & FormFlags.PLACEHOLDER),
        horizontal = 0 !== (flags & FormFlags.HORIZONTAL),
        pojo_ = pojo['_'] as HasState,
        keydown = $keydown.bind(pojo_),
        onSubmit = $onSubmit.bind(fnSubmit),
        btn_class = placeholder ? 'btn btn-primary' : 'btn btn-outlined',
        btn_text = update ? 'Update' : 'Submit',
        body_out = [],
        class_prefix = `ui form${horizontal && ' form-horizontal' || ''}${placeholder && ' placeholder' || ''} status-`
    
    body(pojo, $d, { pojo, ffid, ffobj, flags, update }, body_out)
    
    let el = (
<form class={$any(class_prefix + (PojoState.MASK_STATUS & pojo_.state) + (toggle32 && !(32 & pojo_.state) && 'd-none' || ''))}>
  {!bottom && content}
  {body_out}
  {bottom && content}
  {msg(pojo, update)}
  <button type="submit" class={btn_class} onClick={onSubmit}>
    {btn_text}
  </button>
</form>    
    )
    
    el.addEventListener('focusin', $focusin)
    el.addEventListener('keydown', keydown)
    
    return el
}

interface FormRoot {
    pojo: any
    ffid: string|null
    ffobj: any
    flags: FormFlags
    update: boolean
}

function body(pojo: any, $d: any, root: FormRoot, out: any[]) {
    let array = $d.$fdf
    
    if ($d.$fmf) {
        for (let fk of $d.$fmf) {
            body(pojo[fk], $d[fk].d_fn(), root, out)
        }
    }
    
    if (!array)
        return
    
    let mask = root.update ? 13 : 3, 
        ffid = root.ffid

    if (ffid && array.length)
        root.ffid = null

    for (var i = 0, len = array.length; i < len; i++) {
        let fk = array[i],
            fd = $d[fk]
        if (!fd.t || (fd.a & mask)) continue
        
        out.push(field_switch(pojo, fd, fk, root, i, ffid))
        
        ffid = null
    }

    return out
}

function field_class(pojo: any, fd: any, fk: string): string {
    var buf = '',
        pojo_: PojoSO
    
    buf += 'form-group'
    if (fd.m === 2) {
        buf += ' required'
    }
    if (fd.t !== FieldType.BOOL && fd.t !== FieldType.ENUM &&
            0 !== ((1 << (fd._ - 1)) & (pojo_ = pojo['_']).vfbs) &&
            pojo_[fk]) {
        buf += ' has-error'
    }
    
    return buf
}

function field_switch(pojo: any, fd: any, fk: string, root: FormRoot, idx: number, ffid: any) {
    let t = fd.t,
        label,
        hint,
        el
    
    if (t !== FieldType.BOOL && 0 === (root.flags & FormFlags.PLACEHOLDER)) {
        label = <label class="form-label">{fd.$n + (fd.m === 2 && ' *' || '')}</label>
    }
    
    if (t === FieldType.BOOL)
        el = field_bool(pojo, fd, fk, root, ffid)
    else if (t === FieldType.ENUM)
        el = field_enum(pojo, fd, fk, root, ffid, label)
    else if (t !== FieldType.STRING)
        el = field_num(pojo, fd, fk, root, ffid, label)
    else if (fd.ta)
        el = field_textarea(pojo, fd, fk, root, ffid, label)
    else
        el = field_default(pojo, fd, fk, root, ffid, label)
    
    return el
}

function setFF(el: any, ffid: any, ffobj: any) {
    if (ffobj) {
        ffobj[ffid] = el
    } else {
        el.id = ffid
    }
}

function field_bool(pojo: any, fd: any, fk: string, root: FormRoot,
        ffid: any) {
    let input
    let el = (
<div class={field_class(pojo, fd, fk)}>
  <label class="form-switch">
    <input ref={input} type="checkbox" checked={$any(!!pojo[fk])} onChange={e => $change(e, fk, pojo, root.update, root.pojo)} />
    <i class="form-icon"></i>{fd.$n}
  </label>
</div>
    )
    
    ffid && setFF(input, ffid, root.ffobj)
    return el
}

function select_val(val) {
    return val ? val.toString() : ''
}

function field_enum(pojo: any, fd: any, fk: string, root: FormRoot, 
        ffid: any, label: any) {
    let select
    let el = (
<div class={field_class(pojo, fd, fk)}>
  {label}
  <select ref={select} class={$any(!root.update && !pojo[fk] ? 'empty' : '')} value={select_val(pojo[fk])} onChange={e => $change(e, fk, pojo, root.update, root.pojo)}></select>
</div>
    )
    
    let buf = ''
    if (!root.update && 0 !== (root.flags & FormFlags.PLACEHOLDER)) {
        buf += enum_option(fd)
    }
    buf += enum_options(fd)
    select.innerHTML = buf
    
    ffid && setFF(select, ffid, root.ffobj)
    return el
}

function placeholder(fd) {
    return `${fd.$n}${fd.m === 2 && ' *' || ''}`
}

function help_text(str) {
    return <p class="form-input-hint">{str}</p>
}

function field_num(pojo: any, fd: any, fk: string, root: FormRoot,
        ffid: any, label: any) {
    let ph = !(root.flags & FormFlags.PLACEHOLDER) ? '' : placeholder(fd),
        pojo_ = pojo['_'] as PojoSO,
        flag = 1 << (fd._ - 1),
        hint = fd.$h && help_text(fd.$h),
        fnVal = getFnVal(fd.o),
        input
    let el = (
<div class={field_class(pojo, fd, fk)}>
  {label}
  <input ref={input} type="text" placeholder={ph} value={fnVal(pojo[fk])} onChange={e => $change(e, fk, pojo, root.update, root.pojo)} />
  <div class="form-input-hint">{$any(!(flag & pojo_.vfbs) ? '' : pojo_[fk])}</div>
  {hint}
</div>
    )
    
    ffid && setFF(input, ffid, root.ffobj)
    return el
}

function field_textarea(pojo: any, fd: any, fk: string, root: FormRoot,
        ffid: any, label: any) {
    let ph = !(root.flags & FormFlags.PLACEHOLDER) ? '' : placeholder(fd),
        pojo_ = pojo['_'] as PojoSO,
        flag = 1 << (fd._ - 1),
        hint = fd.$h && help_text(fd.$h),
        ta
    let el = (
<div class={field_class(pojo, fd, fk)}>
  {label}
  <textarea ref={ta} placeholder={ph} value={$any(pojo[fk])} onChange={e => $change(e, fk, pojo, root.update, root.pojo)}>
  </textarea>
  <div class="form-input-hint">{$any(!(flag & pojo_.vfbs) ? '' : pojo_[fk])}</div>
  {hint}
</div>
    )
    
    ffid && setFF(ta, ffid, root.ffobj)
    return el
}

function field_default(pojo: any, fd: any, fk: string, root: FormRoot,
        ffid: any, label: any) {
    let ph = !(root.flags & FormFlags.PLACEHOLDER) ? '' : placeholder(fd),
        pojo_ = pojo['_'] as PojoSO,
        flag = 1 << (fd._ - 1),
        typ = fd.pw ? 'password' : 'text',
        hint = fd.$h && help_text(fd.$h),
        input
    let el = (
<div class={field_class(pojo, fd, fk)}>
  {label}
  <input ref={input} type={typ} placeholder={ph} value={$any(pojo[fk])} onChange={e => $change(e, fk, pojo, root.update, root.pojo)} />
  <div class="form-input-hint">{$any(!(flag & pojo_.vfbs) ? '' : pojo_[fk])}</div>
  {hint}
</div>
    )
    
    ffid && setFF(input, ffid, root.ffobj)
    return el
}
