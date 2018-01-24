import { ContentSlot, FormFlags } from '../util'
import { PojoState, HasState, FieldType } from 'coreds/lib/types'
import { $any, defp } from 'coreds/lib/util'
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

function msg_class(state: number, msg: string) {
    let flag
    return !msg || !(flag = (state & PojoState.MASK_STATUS)) ? 'd-none' : ('ui msg status-' + flag)
}

export function msg(pojo: any, update: boolean) {
    let pojo_ = pojo['_'] as HasState,
        fn = $clearMsg.bind(pojo_)
    return (
<div class={msg_class(pojo_.state, pojo_.msg)}>
  <i class="close icon" onClick={fn}></i>
  <span>{$any(pojo_.msg)}</span>
</div>
    )
}

function $onSubmit(this: any, e) {
    e.preventDefault()
    this(e)
}

export function form(pojo: any, $d: any, ffid: string | null, fnSubmit: any,
        content?: any, content_slot?: ContentSlot, formFlags?: FormFlags) {
    let update = ffid === null,
        flags = formFlags || 0,
        placeholder = 0 !== (flags & FormFlags.PLACEHOLDER),
        horizontal = 0 !== (flags & FormFlags.HORIZONTAL),
        pojo_ = pojo['_'] as HasState,
        keydown = $keydown.bind(pojo_),
        onSubmit = $onSubmit.bind(fnSubmit),
        btn_class = placeholder ? 'btn btn-outlined' : 'btn btn-primary',
        btn_text = update ? 'Update' : 'Submit',
        class_prefix = `ui form${horizontal && ' form-horizontal' || ''}${placeholder && ' placeholder' || ''} status-`
    
    if (content && content_slot === undefined)
        content_slot = ContentSlot.TOP
    
    let el = (
<form class={$any(class_prefix + (pojo_.state & PojoState.MASK_STATUS) + ((flags & FormFlags.TOGGLE_FLAG32) && !(pojo_.state & 32) && 'd-none' || ''))}>
  {content_slot === ContentSlot.TOP && content}
  {body(pojo, $d, update, { pojo, ffid, flags })}
  {content_slot === ContentSlot.BOTTOM && content}
  {msg(pojo, update)}
  <button type="submit" class={btn_class} onClick={fnSubmit}>
    {btn_text}
  </button>
</form>    
    )
    
    el.addEventListener('focusin', $focusin)
    el.addEventListener('keydown', keydown)
    
    return el
}            

interface FormRoot {
    pojo: string
    ffid: string|null
    flags: FormFlags
}

function body(pojo: any, $d: any, update: boolean, root: FormRoot) {
    // TODO
}
