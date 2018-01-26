import * as Surplus from 'surplus';
Surplus;
import { prettyDate } from 'coreds/lib/datetime_util';
import { $any, defp } from 'coreds/lib/util';
import { toggleClass } from 'coreds-ui/lib/dom_util';
import { attachOptsTo } from 'coreds-ui/lib/_pager';
import { parseOpts } from 'coreds-ui/lib/_lsearch';
import { $apply, msg } from './common';
export { form } from './form';
// ================================================== 
// toggles
export function $toggle0(e) {
    toggleClass(e.target, 'active');
}
export function $toggle1(e) {
    toggleClass(e.target.parentElement, 'active');
}
export function $toggle2(e) {
    toggleClass(e.target.parentElement.parentElement, 'active');
}
export function $toggle3(e) {
    toggleClass(e.target.parentElement.parentElement.parentElement, 'active');
}
// ================================================== 
// icon toggles
export function $itoggle0(e) {
    var el = e.target;
    if ('I' === el.tagName)
        el = el.parentElement;
    toggleClass(el, 'active');
}
export function $itoggle1(e) {
    var el = e.target;
    if ('I' === el.tagName)
        el = el.parentElement;
    toggleClass(el.parentElement, 'active');
}
export function $itoggle2(e) {
    var el = e.target;
    if ('I' === el.tagName)
        el = el.parentElement;
    toggleClass(el.parentElement.parentElement, 'active');
}
export function $itoggle3(e) {
    var el = e.target;
    if ('I' === el.tagName)
        el = el.parentElement;
    toggleClass(el.parentElement.parentElement.parentElement, 'active');
}
// ================================================== 
// dropdown
export function dropdown_msg(hs, mask) {
    return (<div class={$any('dropdown' + (hs.msg && ' active' || ''))}>
  <ul class="menu transparent">
    <li class="menu-item">
      {msg(hs, mask)}
    </li>
  </ul>
</div>);
}
// ================================================== 
// lsearch
export function lsearch_disabled(pager) {
    return 0 !== (pager.state & 8 /* LOADING */) || (!pager.size && !(pager.state & 256 /* LOCAL_SEARCH */));
}
export function lsearch_input(pager, placeholder, fields, fn, clazz) {
    var cls = clazz === undefined ? 'underline' : clazz, el = <input type="text" class={cls} placeholder={placeholder} disabled={lsearch_disabled(pager)}/>;
    parseOpts(null, pager, fields, fn, null, el);
    return el;
}
// ================================================== 
// pager
export function $pager(pager, el) {
    attachOptsTo(el, null, pager, {});
    return el;
}
function $sort() {
    this['store'].repaint((this.state ^= 16 /* DESC */));
}
function $reload() {
    this['store'].reload();
}
function $gotoFirst() {
    this['store'].repaint((this.page = 0));
}
function $gotoLast() {
    this['store'].repaint((this.page = this.page_count));
}
function $prevOrLoad() {
    this['store'].pagePrevOrLoad(0);
}
function $nextOrLoad() {
    this['store'].pageNextOrLoad(0);
}
export function pager_controls(pager) {
    var sort = $sort.bind(pager), reload = $reload.bind(pager), gotoFirst = $gotoFirst.bind(pager), gotoLast = $gotoLast.bind(pager), prevOrLoad = $prevOrLoad.bind(pager), nextOrLoad = $nextOrLoad.bind(pager);
    return (<div class="btn-group links">
  <button class="btn btn-link btn-sm" onClick={sort} disabled={$any(0 !== (pager.state & 8 /* LOADING */) || 2 > pager.size)}>
    <i class={$any((pager.state & 16 /* DESC */) ? 'icon desc-yes' : 'icon desc-no')}></i>
  </button>
  <button class="btn btn-link btn-sm" onClick={reload} disabled={$any(0 !== (pager.state & 264 /* MASK_RPC_DISABLE */) || 0 === pager.size)}>
    <i class="icon cw"></i>
  </button>
  <button class="btn btn-link btn-sm" onClick={gotoFirst} disabled={$any(0 !== (pager.state & 8 /* LOADING */) || 0 === pager.page)}>
    <i class="icon angle-double-left"></i>
  </button>
  <button class="btn btn-link btn-sm" onClick={prevOrLoad} disabled={$any(0 !== (pager.state & 264 /* MASK_RPC_DISABLE */))}>
    <i class="icon angle-left"></i>
  </button>
  <button class="btn btn-link btn-sm" onClick={nextOrLoad} disabled={$any(0 !== (pager.state & 264 /* MASK_RPC_DISABLE */) || 0 === pager.size)}>
    <i class="icon angle-right"></i>
  </button>
  <button class="btn btn-link btn-sm" onClick={gotoLast} disabled={$any(0 !== (pager.state & 8 /* LOADING */) || 0 === pager.size || pager.page_count === pager.page)}>
    <i class="icon angle-double-right"></i>
  </button>
  <button class={$any(!pager.size ? 'd-none' : 'btn btn-link btn-sm')} disabled>
    {$any('' + pager.page_from + (pager.page_from === pager.page_to ? ' of ' : (' - ' + pager.page_to + ' of ')) + pager.size)}
  </button>
</div>);
}
export function pager_msg(pager) {
    return msg(pager, 7 /* MASK_STATUS */);
}
// ================================================== 
// icons
export function icon_timeago(pojo, wrapper_class) {
    return (<div class={wrapper_class}>
  <i class="icon clock"></i>
  <small>{$apply(pojo['2'], prettyDate)}</small>
</div>);
}
export function icon_update_ts(pojo, fk, wrapper_class) {
    return (<div class={wrapper_class}>
  <i class="icon pencil"></i>
  <small>{$apply(pojo[fk], prettyDate)}</small>
</div>);
}
function $toggle(e) {
    this.obj.state ^= this.bit;
}
function $trigger(e) {
    var state = this.obj.state;
    this.obj.state = state ^ this.bit;
    this.cb(this.bit);
}
export function icon_toggle(pojo, fk, bit, icon_class, cb, name, wrapper_class) {
    if (bit < 32)
        throw 'Invalid bit: ' + bit;
    var icon = "icon action " + icon_class, obj = pojo['_'], opts = { obj: obj, bit: bit, cb: cb }, fn = $toggle.bind(opts), trigger = $trigger.bind(opts), titleOn, titleOff;
    if (name) {
        titleOn = "" + name;
        titleOff = "Mark " + name + "?";
    }
    return (<div class={wrapper_class}>
  <i class={$any(icon + (!pojo[fk] ? ' empty' : ''))} onClick={fn} title={$any(pojo[fk] ? titleOn : titleOff)}></i>
  <i class={$any('icon ok-circled' + (!(obj.state & bit) ? ' d-none' : ''))} onClick={trigger}></i>
  <i class={$any('icon cancel-circled' + (!(obj.state & bit) ? ' d-none' : ''))} onClick={fn}></i>
</div>);
}
export function icon_toggle_dd(pojo, fk, bit, icon_class, cb, name) {
    if (bit < 32)
        throw 'Invalid bit: ' + bit;
    var icon = "icon action " + icon_class, obj = pojo['_'], opts = { obj: obj, bit: bit, cb: cb }, fn = $toggle.bind(opts), trigger = $trigger.bind(opts), titleOn, titleOff;
    if (name) {
        titleOn = "" + name;
        titleOff = "Mark " + name + "?";
    }
    return (<div class={$any('dropdown icons' + ((obj.state & bit) ? ' active' : ''))}>
  <span class="dropdown-toggle c-hand" onClick={fn}>
    <i class={$any(icon + (!pojo[fk] ? ' empty' : ''))} title={$any(pojo[fk] ? titleOn : titleOff)}></i>
  </span>
  <ul class="menu transparent">
    <li class={$any('menu-item' + (!(obj.state & bit) ? ' d-none' : ''))}>
      <button class="btn circle text-right" onClick={trigger}><i class="icon ok"></i></button>
    </li>
  </ul>
</div>);
}
export function icon_remove(pojo, fk, bit, icon_class, cb, name, wrapper_class) {
    if (bit < 32)
        throw 'Invalid bit: ' + bit;
    var icon = "icon action " + icon_class, obj = pojo['_'], opts = { obj: obj, bit: bit, cb: cb }, fn = $toggle.bind(opts), trigger = $trigger.bind(opts), title = name || 'Remove';
    return (<div class={wrapper_class}>
  <i class={icon} onClick={fn} title={title}></i>
  <i class={$any('icon ok-circled' + (!(obj.state & bit) ? ' d-none' : ''))} onClick={trigger}></i>
  <i class={$any('icon cancel-circled' + (!(obj.state & bit) ? ' d-none' : ''))} onClick={fn}></i>
</div>);
}
// ================================================== 
// item
export function $item(pojo, el) {
    defp(el, 'pager_item', pojo);
    return el;
}
export function item_class(pojo) {
    var pojo_ = pojo['_'];
    if (!(pojo_.lstate & 1 /* INCLUDED */)) {
        return 'd-none';
    }
    else if (!(pojo_.lstate & 2 /* SELECTED */)) {
        return 'item';
    }
    else {
        return 'item active';
    }
}
export function item_msg(pojo) {
    return msg(pojo['_'], 7 /* MASK_STATUS */);
}
export function item_msg_dd(pojo) {
    return dropdown_msg(pojo['_'], 7 /* MASK_STATUS */);
}
export function item_timeago(pojo) {
    return icon_timeago(pojo, 'content right floated timeago');
}
export function item_update_ts(pojo, fk) {
    return icon_update_ts(pojo, fk, 'content right floated');
}
export function item_toggle(pojo, fk, bit, icon_class, cb, name) {
    return icon_toggle(pojo, fk, bit, icon_class, cb, name, 'content right floated');
}
export function item_toggle_dd(pojo, fk, bit, icon_class, cb, name) {
    return (<div class="content right floated">
  {icon_toggle_dd(pojo, fk, bit, icon_class, cb, name)}
</div>);
}
export function item_remove(pojo, fk, bit, icon_class, cb, name) {
    return icon_remove(pojo, fk, bit, icon_class, cb, name, 'content right floated');
}
function $append_if(cond, el, parent) {
    cond && parent.appendChild(el);
    return cond;
}
export function item_detail(pojo, detail_id) {
    var pojo_ = pojo['_'], parent, el;
    return (<div ref={parent} class={$append_if(!!(pojo_.state & 16 /* UPDATE */), (el || (el = document.getElementById(detail_id))), parent) ? '' : 'd-none'}>
</div>);
}
//# sourceMappingURL=index.jsx.map