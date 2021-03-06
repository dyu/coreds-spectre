var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { html, h } from 'sinuous';
h;
import { enum_option, enum_options, getFnVal } from '../util';
import { $change } from 'coreds/lib/form';
import { $clearMsg } from '../handler';
import * as keymage from 'coreds-ui/lib/keymage';
import { getPopup, hidePopup } from 'coreds-ui/lib/dom_util';
function $focusin(e) {
    keymage.clearScope();
    hidePopup(getPopup());
}
function $keydown(e) {
    // escape key
    if (e.which === 27 && this.msg) {
        e.stopPropagation();
        this.msg = '';
    }
}
function msg_class(hs, update) {
    var flag;
    return !hs.msg || (!(flag = (7 /* MASK_STATUS */ & hs.state)) && update) ? 'd-none' : ('ui msg status-' + flag);
}
function msg(pojo, update) {
    var hs = pojo['_'], fn = $clearMsg.bind(hs);
    return html /**/(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n<div class=", ">\n  <i class=\"close icon\" onclick=", "></i>\n  <span>", "</span>\n</div>\n"], [/**/ "\n<div class=", ">\n  <i class=\"close icon\" onclick=", "></i>\n  <span>", "</span>\n</div>\n"])), function () { return msg_class(hs, update); }, fn, function () { return hs.msg; }); /**/
}
function $onSubmit(e) {
    e.preventDefault();
    this(e);
    return false;
}
export function form(pojo, $d, fnSubmit, ffid, ffobj, formFlags, content) {
    var update = ffid === null, flags = formFlags || 0, bottom = !!(flags & 8 /* SLOT_BOTTOM */), toggle32 = (flags & 32 /* TOGGLE_FLAG32 */), placeholder = 0 !== (flags & 1 /* PLACEHOLDER */), horizontal = 0 !== (flags & 4 /* HORIZONTAL */), pojo_ = pojo['_'], keydown = $keydown.bind(pojo_), onSubmit = $onSubmit.bind(fnSubmit), btn_class = placeholder ? 'btn btn-primary' : 'btn btn-outlined', btn_text = update ? 'Update' : 'Submit', body_out = [], class_prefix = "ui form" + (horizontal && ' form-horizontal' || '') + (placeholder && ' placeholder' || '') + " status-";
    body(pojo, $d, { pojo: pojo, ffid: ffid, ffobj: ffobj, flags: flags, update: update }, body_out);
    var el = html /**/(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n<form class=", ">\n  ", "\n  ", "\n  ", "\n  ", "\n  <button type=\"submit\" class=", " onclick=", ">\n    ", "\n  </button>\n</form>    \n"], [/**/ "\n<form class=", ">\n  ", "\n  ", "\n  ", "\n  ", "\n  <button type=\"submit\" class=", " onclick=", ">\n    ", "\n  </button>\n</form>    \n"])), function () { return class_prefix + (7 /* MASK_STATUS */ & pojo_.state) + (toggle32 && !(32 & pojo_.state) && 'd-none' || ''); }, !bottom && content || '', body_out, bottom && content || '', msg(pojo, update), btn_class, onSubmit, btn_text); /**/
    el.addEventListener('focusin', $focusin);
    el.addEventListener('keydown', keydown);
    return el;
}
function body(pojo, $d, root, out) {
    var array = $d.$fdf;
    if ($d.$fmf) {
        for (var _i = 0, _a = $d.$fmf; _i < _a.length; _i++) {
            var fk = _a[_i];
            body(pojo[fk], $d[fk].d_fn(), root, out);
        }
    }
    if (!array)
        return;
    var mask = root.update ? 13 : 3, ffid = root.ffid;
    if (ffid && array.length)
        root.ffid = null;
    for (var i = 0, len = array.length; i < len; i++) {
        var fk = array[i], fd = $d[fk];
        if (!fd.t || (fd.a & mask))
            continue;
        out.push(field_switch(pojo, fd, fk, root, i, ffid));
        ffid = null;
    }
    return out;
}
function field_class(pojo, fd, fk) {
    var buf = '', pojo_ = pojo['_'];
    buf += 'form-group';
    if (fd.m === 2) {
        buf += ' required';
    }
    if (pojo_[fk] && 0 !== ((1 << (fd._ - 1)) & pojo_.vfbs)) {
        buf += ' has-error';
    }
    return buf;
}
function field_switch(pojo, fd, fk, root, idx, ffid) {
    var t = fd.t, label, hint, el;
    if (t !== 1 /* BOOL */ && 0 === (root.flags & 1 /* PLACEHOLDER */)) {
        label = html /**/(templateObject_3 || (templateObject_3 = __makeTemplateObject(["<label class=\"form-label\">", "</label>"], [/**/ "<label class=\"form-label\">", "</label>"])), fd.$n + (fd.m === 2 && ' *' || '')); /**/
    }
    if (t === 1 /* BOOL */)
        el = field_bool(pojo, fd, fk, root, ffid);
    else if (t === 16 /* ENUM */)
        el = field_enum(pojo, fd, fk, root, ffid, label);
    else if (t !== 3 /* STRING */)
        el = field_num(pojo, fd, fk, root, ffid, label);
    else if (fd.ta)
        el = field_textarea(pojo, fd, fk, root, ffid, label);
    else
        el = field_default(pojo, fd, fk, root, ffid, label);
    return el;
}
function setFF(el, ffid, ffobj) {
    if (ffobj) {
        ffobj[ffid] = el;
    }
    else {
        el.id = ffid;
    }
}
function field_bool(pojo, fd, fk, root, ffid) {
    var cls = fd.m === 2 ? 'form-group required' : 'form-group';
    var el = html /**/(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n<div class=", ">\n  <label class=\"form-switch\">\n    <input type=\"checkbox\" checked=", " onchange=", " />\n    <i class=\"form-icon\"></i>", "\n  </label>\n</div>\n"], [/**/ "\n<div class=", ">\n  <label class=\"form-switch\">\n    <input type=\"checkbox\" checked=", " onchange=", " />\n    <i class=\"form-icon\"></i>", "\n  </label>\n</div>\n"])), cls, function () { return !!pojo[fk]; }, function (e) { return $change(e, fk, pojo, root.update, root.pojo); }, fd.$n); /**/
    var input = el.firstElementChild.firstElementChild;
    ffid && setFF(input, ffid, root.ffobj);
    return el;
}
function select_val(val) {
    return val ? val.toString() : '';
}
function field_enum(pojo, fd, fk, root, ffid, label) {
    var cls = fd.m === 2 ? 'form-group required' : 'form-group';
    var el = html /**/(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n<div class=", ">\n  ", "\n  <select class=", " value=", " onchange=", "></select>\n</div>\n"], [/**/ "\n<div class=", ">\n  ", "\n  <select class=", " value=", " onchange=", "></select>\n</div>\n"])), cls, label, function () { return !root.update && !pojo[fk] ? 'empty' : ''; }, select_val(pojo[fk]), function (e) { return $change(e, fk, pojo, root.update, root.pojo); }); /**/
    var select = el.lastElementChild;
    var buf = '';
    if (!root.update && 0 !== (root.flags & 1 /* PLACEHOLDER */)) {
        buf += enum_option(fd);
    }
    buf += enum_options(fd);
    select.innerHTML = buf;
    ffid && setFF(select, ffid, root.ffobj);
    return el;
}
function placeholder(fd) {
    return "" + fd.$n + (fd.m === 2 && ' *' || '');
}
function help_text(str) {
    return html /**/(templateObject_6 || (templateObject_6 = __makeTemplateObject(["<p class=\"form-input-hint\">", "</p>"], [/**/ "<p class=\"form-input-hint\">", "</p>"])), str); /**/
}
function field_num(pojo, fd, fk, root, ffid, label) {
    var ph = !(root.flags & 1 /* PLACEHOLDER */) ? '' : placeholder(fd), pojo_ = pojo['_'], flag = 1 << (fd._ - 1), hint = fd.$h && help_text(fd.$h), fnVal = getFnVal(fd.o);
    var el = html /**/(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n<div class=", ">\n  ", "\n  <input type=\"text\" placeholder=", " value=", " onchange=", " />\n  <div class=\"form-input-hint\">", "</div>\n  ", "\n</div>\n"], [/**/ "\n<div class=", ">\n  ", "\n  <input type=\"text\" placeholder=", " value=", " onchange=", " />\n  <div class=\"form-input-hint\">", "</div>\n  ", "\n</div>\n"])), function () { return field_class(pojo, fd, fk); }, label, ph, function () { return fnVal(pojo[fk]); }, function (e) { return $change(e, fk, pojo, root.update, root.pojo); }, function () { return !(flag & pojo_.vfbs) ? '' : pojo_[fk]; }, hint); /**/
    var input = label ? el.firstElementChild.nextElementSibling : el.firstElementChild;
    ffid && setFF(input, ffid, root.ffobj);
    return el;
}
function field_textarea(pojo, fd, fk, root, ffid, label) {
    var ph = !(root.flags & 1 /* PLACEHOLDER */) ? '' : placeholder(fd), pojo_ = pojo['_'], flag = 1 << (fd._ - 1), hint = fd.$h && help_text(fd.$h);
    var el = html /**/(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n<div class=", ">\n  ", "\n  <textarea placeholder=", " value=", " onchange=", ">\n  </textarea>\n  <div class=\"form-input-hint\">", "</div>\n  ", "\n</div>\n"], [/**/ "\n<div class=", ">\n  ", "\n  <textarea placeholder=", " value=", " onchange=", ">\n  </textarea>\n  <div class=\"form-input-hint\">", "</div>\n  ", "\n</div>\n"])), function () { return field_class(pojo, fd, fk); }, label, ph, function () { return pojo[fk]; }, function (e) { return $change(e, fk, pojo, root.update, root.pojo); }, function () { return !(flag & pojo_.vfbs) ? '' : pojo_[fk]; }, hint); /**/
    var ta = label ? el.firstElementChild.nextElementSibling : el.firstElementChild;
    ffid && setFF(ta, ffid, root.ffobj);
    return el;
}
function field_default(pojo, fd, fk, root, ffid, label) {
    var ph = !(root.flags & 1 /* PLACEHOLDER */) ? '' : placeholder(fd), pojo_ = pojo['_'], flag = 1 << (fd._ - 1), typ = fd.pw ? 'password' : 'text', hint = fd.$h && help_text(fd.$h);
    var el = html /**/(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n<div class=", ">\n  ", "\n  <input type=", " placeholder=", " value=", " onchange=", " />\n  <div class=\"form-input-hint\">", "</div>\n  ", "\n</div>\n"], [/**/ "\n<div class=", ">\n  ", "\n  <input type=", " placeholder=", " value=", " onchange=", " />\n  <div class=\"form-input-hint\">", "</div>\n  ", "\n</div>\n"])), field_class(pojo, fd, fk), label, typ, ph, function () { return pojo[fk]; }, function (e) { return $change(e, fk, pojo, root.update, root.pojo); }, function () { return !(flag & pojo_.vfbs) ? '' : pojo_[fk]; }, hint); /**/
    var input = label ? el.firstElementChild.nextElementSibling : el.firstElementChild;
    ffid && setFF(input, ffid, root.ffobj);
    return el;
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
//# sourceMappingURL=form.js.map