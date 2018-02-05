import { formatDate, formatTime, formatDateTime } from 'coreds/lib/datetime_util';
// ================================================== 
// options
export var option_empty = '<option value=""></option>';
export function options(arrayValue, arrayDisplay) {
    var out = '';
    for (var i = 0, len = arrayValue.length; i < len; i++) {
        out += "<option value=\"" + arrayValue[i] + "\">" + arrayDisplay[i] + "</option>";
    }
    return out;
}
export function enum_option(fd) {
    return "<option value=\"\">" + fd.$n + (fd.m === 2 && ' *' || '') + "</option>";
}
export function enum_options(fd) {
    return options(fd.v_fn(), fd.$v_fn());
}
// ================================================== 
// form value formatting
export function valTime(value) {
    return !value ? '' : formatTime(value);
}
export function valDate(value) {
    return !value ? '' : formatDate(value);
}
export function valDateTime(value) {
    return !value ? '' : formatDateTime(value);
}
export function valNumber(value) {
    return value || value === 0 ? value.toString() : '';
}
export function getFnVal(flags) {
    switch (flags) {
        case 1: return valTime;
        case 2: return valDate;
        case 4: return valDateTime;
        default: return valNumber;
    }
}
// ================================================== 
// el utils
export function $append_if(cond, el, parent) {
    cond && parent.appendChild(el);
    return cond;
}
//# sourceMappingURL=util.js.map