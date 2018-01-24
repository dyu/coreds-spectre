import { formatDate, formatTime, formatDateTime } from 'coreds/lib/datetime_util'

export const enum FormFlags {
    PLACEHOLDER = 1,
    REF_AND_ID = 2,
    HORIZONTAL = 4,
    SLOT_BOTTOM = 8,
    TOGGLE_FLAG32 = 32
}

// ================================================== 
// options

export const option_empty = '<option value=""></option>'

export function options(arrayValue: any[], arrayDisplay: any[]): string {
    let out = ''
    for (var i = 0, len = arrayValue.length; i < len; i++) {
        out += `<option value="${arrayValue[i]}">${arrayDisplay[i]}</option>`
    }
    return out
}

export function enum_option(fd: any) {
    return `<option value="">${fd.$n}${fd.m === 2 && ' *' || ''}</option>`
}

export function enum_options(fd: any) {
    return options(fd.v_fn(), fd.$v_fn())
}

// ================================================== 
// form value formatting

export function valTime(value) {
    return !value ? '' : formatTime(value)
}

export function valDate(value) {
    return !value ? '' : formatDate(value)
}

export function valDateTime(value) {
    return !value ? '' : formatDateTime(value)
}

export function valNumber(value) {
    return value || value === 0 ? value.toString() : ''
}

export function getFnVal(flags: number) {
    switch (flags) {
        case 1: return valTime
        case 2: return valDate
        case 4: return valDateTime
        default: return valNumber
    }
}
