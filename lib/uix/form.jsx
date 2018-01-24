import { $any } from 'coreds/lib/util';
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
}
export function form(pojo, $d, ffid, fnSubmit, content, content_slot, formFlags) {
    var update = ffid === null, flags = formFlags || 0, placeholder = 0 !== (flags & 1 /* PLACEHOLDER */), horizontal = 0 !== (flags & 4 /* HORIZONTAL */), pojo_ = pojo['_'], keydown = $keydown.bind(pojo_), onSubmit = $onSubmit.bind(fnSubmit), btn_class = placeholder ? 'btn btn-outlined' : 'btn btn-primary', btn_text = update ? 'Update' : 'Submit', class_prefix = "ui form" + (horizontal && ' form-horizontal' || '') + (placeholder && ' placeholder' || '') + " status-";
    if (content && content_slot === undefined)
        content_slot = 0 /* TOP */;
    var el = (<form class={$any(class_prefix + (pojo_.state & 7 /* MASK_STATUS */) + ((flags & 32 /* TOGGLE_FLAG32 */) && !(pojo_.state & 32) && 'd-none' || ''))}>
  {content_slot === 0 /* TOP */ && content}
  {body(pojo, $d, update, { pojo: pojo, ffid: ffid, flags: flags })}
  {content_slot === 1 /* BOTTOM */ && content}
  {msg(pojo, update)}
  <button type="submit" class={btn_class} onClick={fnSubmit}>
    {btn_text}
  </button>
</form>);
    el.addEventListener('focusin', $focusin);
    el.addEventListener('keydown', keydown);
    return el;
}
function body(pojo, $d, update, root) {
    // TODO
}
//# sourceMappingURL=form.jsx.map