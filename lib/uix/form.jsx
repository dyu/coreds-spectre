import * as Surplus from 'surplus';
Surplus;
import { enum_option, enum_options, getFnVal } from '../util';
import { $any } from 'coreds/lib/util';
import { $change } from 'coreds/lib/form';
import { $clearMsg } from './common';
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
function msg_class(state, msg) {
    var flag;
    return !msg || !(flag = (state & 7 /* MASK_STATUS */)) ? 'd-none' : ('ui msg status-' + flag);
}
export function msg(pojo, update) {
    var pojo_ = pojo['_'], fn = $clearMsg.bind(pojo_);
    return (<div class={msg_class(pojo_.state, pojo_.msg)}>
  <i class="close icon" onClick={fn}></i>
  <span>{$any(pojo_.msg)}</span>
</div>);
}
function $onSubmit(e) {
    e.preventDefault();
    this(e);
    return false;
}
export function form(pojo, $d, fnSubmit, ffid, ffobj, formFlags, content) {
    var update = ffid === null, flags = formFlags || 0, bottom = !!(flags & 8 /* SLOT_BOTTOM */), toggle32 = (flags & 32 /* TOGGLE_FLAG32 */), placeholder = 0 !== (flags & 1 /* PLACEHOLDER */), horizontal = 0 !== (flags & 4 /* HORIZONTAL */), pojo_ = pojo['_'], keydown = $keydown.bind(pojo_), onSubmit = $onSubmit.bind(fnSubmit), btn_class = placeholder ? 'btn btn-primary' : 'btn btn-outlined', btn_text = update ? 'Update' : 'Submit', body_out = [], class_prefix = "ui form" + (horizontal && ' form-horizontal' || '') + (placeholder && ' placeholder' || '') + " status-";
    body(pojo, $d, { pojo: pojo, ffid: ffid, ffobj: ffobj, flags: flags, update: update }, body_out);
    var el = (<form class={$any(class_prefix + (pojo_.state & 7 /* MASK_STATUS */) + (toggle32 && !(pojo_.state & 32) && 'd-none' || ''))}>
  {!bottom && content}
  {body_out}
  {bottom && content}
  {msg(pojo, update)}
  <button type="submit" class={btn_class} onClick={onSubmit}>
    {btn_text}
  </button>
</form>);
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
    var buf = '', pojo_;
    buf += 'form-group';
    if (fd.m === 2) {
        buf += ' required';
    }
    if (fd.t !== 1 /* BOOL */ && fd.t !== 16 /* ENUM */ &&
        0 !== ((1 << (fd._ - 1)) & (pojo_ = pojo['_']).vfbs) &&
        pojo_[fk]) {
        buf += ' has-error';
    }
    return buf;
}
function field_switch(pojo, fd, fk, root, idx, ffid) {
    var t = fd.t, label, hint, el;
    if (t !== 1 /* BOOL */ && 0 === (root.flags & 1 /* PLACEHOLDER */)) {
        label = <label class="form-label">{fd.$n + (fd.m === 2 && ' *' || '')}</label>;
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
    var input;
    var el = (<div class={field_class(pojo, fd, fk)}>
  <label class="form-switch">
    <input ref={input} type="checkbox" checked={$any(!!pojo[fk])} onChange={function (e) { return $change(e, fk, pojo, root.update, root.pojo); }}/>
    <i class="form-icon"></i>{fd.$n}
  </label>
</div>);
    ffid && setFF(input, ffid, root.ffobj);
    return el;
}
function select_val(val) {
    return val ? val.toString() : '';
}
function field_enum(pojo, fd, fk, root, ffid, label) {
    var cls = "form-select" + (!root.update && ' resettable' || ''), select;
    var el = (<div class={field_class(pojo, fd, fk)}>
  {label}
  <select ref={select} class={cls} value={select_val(pojo[fk])} onChange={function (e) { return $change(e, fk, pojo, root.update, root.pojo); }}></select>
</div>);
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
    return <p class="form-input-hint">{str}</p>;
}
function field_num(pojo, fd, fk, root, ffid, label) {
    var ph = !(root.flags & 1 /* PLACEHOLDER */) ? '' : placeholder(fd), pojo_ = pojo['_'], flag = 1 << (fd._ - 1), hint = fd.$h && help_text(fd.$h), fnVal = getFnVal(fd.o), input;
    var el = (<div class={field_class(pojo, fd, fk)}>
  {label}
  <input ref={input} type="text" placeholder={ph} value={fnVal(pojo[fk])} onChange={function (e) { return $change(e, fk, pojo, root.update, root.pojo); }}/>
  <div class="form-input-hint">{$any(!(flag & pojo_.vfbs) ? '' : pojo_[fk])}</div>
  {hint}
</div>);
    ffid && setFF(input, ffid, root.ffobj);
    return el;
}
function field_textarea(pojo, fd, fk, root, ffid, label) {
    var ph = !(root.flags & 1 /* PLACEHOLDER */) ? '' : placeholder(fd), pojo_ = pojo['_'], flag = 1 << (fd._ - 1), hint = fd.$h && help_text(fd.$h), ta;
    var el = (<div class={field_class(pojo, fd, fk)}>
  {label}
  <textarea ref={ta} placeholder={ph} value={$any(pojo[fk])} onChange={function (e) { return $change(e, fk, pojo, root.update, root.pojo); }}>
  </textarea>
  <div class="form-input-hint">{$any(!(flag & pojo_.vfbs) ? '' : pojo_[fk])}</div>
  {hint}
</div>);
    ffid && setFF(ta, ffid, root.ffobj);
    return el;
}
function field_default(pojo, fd, fk, root, ffid, label) {
    var ph = !(root.flags & 1 /* PLACEHOLDER */) ? '' : placeholder(fd), pojo_ = pojo['_'], flag = 1 << (fd._ - 1), typ = fd.pw ? 'password' : 'text', hint = fd.$h && help_text(fd.$h), input;
    var el = (<div class={field_class(pojo, fd, fk)}>
  {label}
  <input ref={input} type={typ} placeholder={ph} value={$any(pojo[fk])} onChange={function (e) { return $change(e, fk, pojo, root.update, root.pojo); }}/>
  <div class="form-input-hint">{$any(!(flag & pojo_.vfbs) ? '' : pojo_[fk])}</div>
  {hint}
</div>);
    ffid && setFF(input, ffid, root.ffobj);
    return el;
}
//# sourceMappingURL=form.jsx.map