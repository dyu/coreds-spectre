import { FormFlags, enum_option, enum_options } from '../util'
import { PojoState, FieldType } from 'coreds/lib/types'

function msg_show(pojo: string): string {
    return ` && (${pojo}._.state & ${PojoState.MASK_STATUS})`
}

export function msg(pojo: string, update: boolean): string {
    return /**/`
<div :class="'ui msg status-' + (${pojo}._.state & ${PojoState.MASK_STATUS})"
    v-show="${pojo}._.msg${update && msg_show(pojo) || ''}">
  <i class="icon close" @click.prevent="${pojo}._.msg = null"></i>
  <span v-text="${pojo}._.msg"></span>
</div>
`/**/
}

export function toggle32(pojo: string) {
    return ` v-show="(${pojo}._.state & 32)"`
}

export function form(pojo: string, $d: any, ffid: string|null, 
        formFlags?: FormFlags, content?: string): string {
    let update = ffid === null,
        flags = formFlags || 0,
        bottom = !!(flags & FormFlags.SLOT_BOTTOM),
        placeholder = 0 !== (flags & FormFlags.PLACEHOLDER),
        horizontal = 0 !== (flags & FormFlags.HORIZONTAL),
        class_prefix = `ui form${horizontal && ' form-horizontal' || ''}${placeholder && ' placeholder' || ''} status-`
    
    return /**/`
<form v-clear="${pojo}._" :class="'${class_prefix}' + (${pojo}._.state & ${PojoState.MASK_STATUS})"${(flags & FormFlags.TOGGLE_FLAG32) && toggle32(pojo) || ''}>
  ${!bottom && content || ''}
  ${body(pojo, $d, { pojo, ffid, flags, update })}
  ${bottom && content || ''}
  ${msg(pojo, update)}
  <button type="submit" class="btn btn-${placeholder ? 'primary' :'outlined'}" @click.prevent="${pojo}$$">
    ${update ? 'Update' : 'Submit'}
  </button>
</form>
`/**/
}

interface FormRoot {
    pojo: string
    ffid: string|null
    flags: FormFlags
    update: boolean
}

function body(pojo: string, $d: any, root: FormRoot): string {
    let out = '',
        array = $d.$fdf

    if ($d.$fmf) {
        for (let fk of $d.$fmf) {
            out += body(`${pojo}['${fk}']`, $d[fk].d_fn(), root)
        }
    }

    if (!array)
        return out

    let mask = root.update ? 13 : 3, 
        ffid = root.ffid

    if (ffid && array.length)
        root.ffid = null

    for (var i = 0, len = array.length; i < len; i++) {
        let fk = array[i],
            fd = $d[fk]
        if (!fd.t || (fd.a & mask)) continue

        out += `<div ${field_class(pojo, fd)}>${field_switch(pojo, fd, root, i, ffid)}</div>`
        ffid = null
    }

    return out
}

function field_class(pojo: string, fd: any): string {
    let base = fd.m === 2 ? 'form-group required' : 'form-group'
    if (fd.t === FieldType.BOOL || fd.t === FieldType.ENUM)
        return `class="${base}"`
    else
        return `:class="'${base}' + ((${pojo}._.vfbs & ${1 << (fd._ - 1)}) && ${pojo}._['${fd._}'] && ' has-error' || '')"`
}

function field_switch(pojo: string, fd: any, root: FormRoot, idx: number, ffid: any): string {
    let buf = '',
        t = fd.t

    if (t !== FieldType.BOOL && 0 === (root.flags & FormFlags.PLACEHOLDER))
        buf += `<label class="form-label">${fd.$n}${fd.m === 2 && ' *' || ''}</label>`

    if (t === FieldType.BOOL)
        buf += field_bool(pojo, fd, root, ffid)
    else if (t === FieldType.ENUM)
        buf += field_enum(pojo, fd, root, ffid)
    else if (t !== FieldType.STRING)
        buf += field_num(pojo, fd, root, ffid)
    else if (fd.ta)
        buf += field_textarea(pojo, fd, root, ffid)
    else
        buf += field_default(pojo, fd, root, ffid)

    return buf
}

function ffid_attr(ffid, flags: number): string {
    return ` ref="${ffid}"${(flags & FormFlags.REF_AND_ID) && (' id="' + ffid + '"') || ''}`
}

function help_text(str): string {
    return /**/`<p class="form-input-hint">${str}</p>`/**/
}

function placeholder(fd: any) {
    return ` placeholder="${fd.$n}${fd.m === 2 && ' *' || ''}"`
}

function field_bool(pojo: string, fd: any, root: FormRoot, ffid: any): string {
    return /**/`
<label class="form-switch">
  <input${ffid && ffid_attr(ffid, root.flags) || ''} type="checkbox" v-sval:${fd.t}="${pojo}['${fd._}']"
      @change="change($event, '${fd._}', ${pojo}, ${root.update}, ${root.pojo})" />
  <i class="form-icon"></i>${fd.$n}
</label>
`/**/
}


function field_enum(pojo: string, fd: any, root: FormRoot, ffid: any): string {
    return /**/`
<select${ffid && ffid_attr(ffid, root.flags) || ''} v-sval:${fd.t}="${pojo}['${fd._}']"
    @change="change($event, '${fd._}', ${pojo}, ${root.update}, ${root.pojo})">
    ${root.update ? '' : ((root.flags & FormFlags.PLACEHOLDER) && enum_option(fd) || '')}
    ${enum_options(fd)}
</select>
`/**/
}

// datepicker flags copied here
export const enum DPFlags {
    UPDATE = 16,
    TRIGGER_CHANGE_ON_SELECT = 32
}
export function dpicker(pojo: string, field: number, update: boolean): string {
    return ` v-dpicker:${DPFlags.TRIGGER_CHANGE_ON_SELECT | (update ? DPFlags.UPDATE : 0)}="{ pojo: ${pojo}, field: '${field}' }"`
}
function field_num(pojo: string, fd: any, root: FormRoot, ffid: any): string {
    return /**/`
<input${ffid && ffid_attr(ffid, root.flags) || ''} type="text"${fd.o === 2 && dpicker(pojo, fd._, root.update) || ''}
    ${(root.flags & FormFlags.PLACEHOLDER) && placeholder(fd) || ''}
    v-sval:${!fd.o ? fd.t : (fd.t + ',' + fd.o)}="${pojo}['${fd._}']"
    @change="change($event, '${fd._}', ${pojo}, ${root.update}, ${root.pojo})" />
<div class="form-input-hint" v-text="!(${pojo}._.vfbs & ${1 << (fd._ - 1)}) ? '' : ${pojo}._['${fd._}']"></div>
${fd.$h && help_text(fd.$h) || ''}
`/**/
}

function field_textarea(pojo: string, fd: any, root: FormRoot, ffid: any): string {
    return /**/`
<textarea${ffid && ffid_attr(ffid, root.flags) || ''} v-sval:${fd.t}="${pojo}['${fd._}']"
    ${(root.flags & FormFlags.PLACEHOLDER) && placeholder(fd) || ''}
    @change="change($event, '${fd._}', ${pojo}, ${root.update}, ${root.pojo})"></textarea>
<div class="form-input-hint" v-text="!(${pojo}._.vfbs & ${1 << (fd._ - 1)}) ? '' : ${pojo}._['${fd._}']"></div>
${fd.$h && help_text(fd.$h) || ''}
`/**/
}

function field_default(pojo: string, fd: any, root: FormRoot, ffid: any): string {
    return /**/`
<input${ffid && ffid_attr(ffid, root.flags) || ''} type="${fd.pw ? 'password' : 'text'}"
    ${(root.flags & FormFlags.PLACEHOLDER) && placeholder(fd) || ''}
    v-sval:${fd.t}="${pojo}['${fd._}']"
    @change="change($event, '${fd._}', ${pojo}, ${root.update}, ${root.pojo})" />
<div class="form-input-hint" v-text="!(${pojo}._.vfbs & ${1 << (fd._ - 1)}) ? '' : ${pojo}._['${fd._}']"></div>
${fd.$h && help_text(fd.$h) || ''}
`/**/
}
