import * as Surplus from 'surplus';
Surplus;
import { prettyDate } from 'coreds/lib/datetime_util';
import { $any, defp } from 'coreds/lib/util';
import { attachOptsTo } from 'coreds-ui/lib/_pager';
import { parseOpts } from 'coreds-ui/lib/_lsearch';
import { msg } from './common';
import { $apply, $append_if } from '../util';
export { form } from './form';
export * from '../handler';
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
    return 0 !== (8 /* LOADING */ & pager.state) || (!pager.size && !(256 /* LOCAL_SEARCH */ & pager.state));
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
  <button class="btn btn-link btn-sm" onClick={sort} disabled={$any(0 !== (8 /* LOADING */ & pager.state) || 2 > pager.size)}>
    <i class={$any((16 /* DESC */ & pager.state) ? 'icon desc-yes' : 'icon desc-no')}></i>
  </button>
  <button class="btn btn-link btn-sm" onClick={reload} disabled={$any(0 !== (264 /* MASK_RPC_DISABLE */ & pager.state) || 0 === pager.size)}>
    <i class="icon cw"></i>
  </button>
  <button class="btn btn-link btn-sm" onClick={gotoFirst} disabled={$any(0 !== (8 /* LOADING */ & pager.state) || 0 === pager.page)}>
    <i class="icon angle-double-left"></i>
  </button>
  <button class="btn btn-link btn-sm" onClick={prevOrLoad} disabled={$any(0 !== (264 /* MASK_RPC_DISABLE */ & pager.state))}>
    <i class="icon angle-left"></i>
  </button>
  <button class="btn btn-link btn-sm" onClick={nextOrLoad} disabled={$any(0 !== (264 /* MASK_RPC_DISABLE */ & pager.state) || 0 === pager.size)}>
    <i class="icon angle-right"></i>
  </button>
  <button class="btn btn-link btn-sm" onClick={gotoLast} disabled={$any(0 !== (8 /* LOADING */ & pager.state) || 0 === pager.size || pager.page_count === pager.page)}>
    <i class="icon angle-double-right"></i>
  </button>
  <button class={$any(!pager.size ? 'd-none' : 'btn btn-link btn-sm')} disabled>
    {$any('' + pager.page_from + (pager.page_from === pager.page_to ? ' of ' : (' - ' + pager.page_to + ' of ')) + pager.size)}
  </button>
</div>);
}
export function pager_controls_nav(pager) {
    var sort = $sort.bind(pager), reload = $reload.bind(pager), gotoFirst = $gotoFirst.bind(pager), gotoLast = $gotoLast.bind(pager), prevOrLoad = $prevOrLoad.bind(pager), nextOrLoad = $nextOrLoad.bind(pager);
    return (<div class="navbar">
  <div class="navbar-section links">
    <button class={$any(!pager.size ? 'd-none' : 'btn btn-link btn-sm info')} disabled>
      {$any('' + pager.page_from + (pager.page_from === pager.page_to ? ' of ' : (' - ' + pager.page_to + ' of ')) + pager.size)}
    </button>
  </div>
  <div class="navbar-center links">
    <button class="btn btn-link btn-sm" onClick={sort} disabled={$any(0 !== (8 /* LOADING */ & pager.state) || 2 > pager.size)}>
      <i class={$any((16 /* DESC */ & pager.state) ? 'icon desc-yes' : 'icon desc-no')}></i>
    </button>
    &nbsp;
    <button class="btn btn-link btn-sm" onClick={reload} disabled={$any(0 !== (264 /* MASK_RPC_DISABLE */ & pager.state) || 0 === pager.size)}>
      <i class="icon cw"></i>
    </button>
  </div>
  <div class="navbar-section links">
    <button class="btn btn-link btn-sm" onClick={gotoFirst} disabled={$any(0 !== (8 /* LOADING */ & pager.state) || 0 === pager.page)}>
      <i class="icon angle-double-left"></i>
    </button>
    <button class="btn btn-link btn-sm" onClick={prevOrLoad} disabled={$any(0 !== (264 /* MASK_RPC_DISABLE */ & pager.state))}>
      <i class="icon left-open"></i>
    </button>
    &nbsp;
    <button class="btn btn-link btn-sm" onClick={nextOrLoad} disabled={$any(0 !== (264 /* MASK_RPC_DISABLE */ & pager.state) || 0 === pager.size)}>
      <i class="icon right-open"></i>
    </button>
    <button class="btn btn-link btn-sm" onClick={gotoLast} disabled={$any(0 !== (8 /* LOADING */ & pager.state) || 0 === pager.size || pager.page_count === pager.page)}>
      <i class="icon angle-double-right"></i>
    </button>
  </div>
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
    this.hs.state ^= this.bit;
}
function $set(e) {
    this.hs.state |= this.bit;
}
function $trigger(e) {
    this.hs.state ^= this.bit;
    this.cb(this.bit);
}
export function icon_toggle(pojo, fk, bit, icon_class, cb, name, wrapper_class) {
    if (bit < 32)
        throw 'Invalid bit: ' + bit;
    var icon = "icon action " + icon_class, hs = pojo['_'], opts = { hs: hs, bit: bit, cb: cb }, fn = $toggle.bind(opts), trigger = $trigger.bind(opts), titleOn, titleOff;
    if (name) {
        titleOn = "" + name;
        titleOff = "Mark " + name + "?";
    }
    return (<div class={wrapper_class}>
  <i class={$any(icon + (!pojo[fk] ? ' empty' : ''))} onClick={fn} title={$any(pojo[fk] ? titleOn : titleOff)}></i>
  <i class={$any(!(bit & hs.state) ? 'd-none' : 'icon ok-circled')} onClick={trigger}></i>
  <i class={$any(!(bit & hs.state) ? 'd-none' : 'icon cancel-circled')} onClick={fn}></i>
</div>);
}
export function icon_toggle_dd(pojo, fk, bit, icon_class, cb, name) {
    if (bit < 32)
        throw 'Invalid bit: ' + bit;
    var icon = "icon action " + icon_class, hs = pojo['_'], opts = { hs: hs, bit: bit, cb: cb }, fn = $set.bind(opts), trigger = $trigger.bind(opts), titleOn, titleOff;
    if (name) {
        titleOn = "" + name;
        titleOff = "Mark " + name + "?";
    }
    return (<div class="dropdown icons">
  <a class="link dropdown-toggle s-circle" tabIndex={0} onFocus={fn}>
    <i class={$any(icon + (!pojo[fk] ? ' empty' : ''))} title={$any(pojo[fk] ? titleOn : titleOff)}></i>
  </a>
  <ul class={$any('menu transparent' + ((bit & hs.state) ? ' hover' : ''))}>
    <li class="menu-item">
      <button class="btn s-circle" onClick={trigger}><i class="icon ok"></i></button>
    </li>
  </ul>
</div>);
}
export function icon_action(pojo, bit, icon_class, cb, name, wrapper_class) {
    if (bit < 32)
        throw 'Invalid bit: ' + bit;
    var icon = "icon action " + icon_class, hs = pojo['_'], opts = { hs: hs, bit: bit, cb: cb }, fn = $toggle.bind(opts), trigger = $trigger.bind(opts);
    return (<div class={wrapper_class}>
  <i class={icon} onClick={fn} title={name}></i>
  <i class={$any(!(bit & hs.state) ? 'd-none' : 'icon ok-circled')} onClick={trigger}></i>
  <i class={$any(!(bit & hs.state) ? 'd-none' : 'icon cancel-circled')} onClick={fn}></i>
</div>);
}
export function icon_action_dd(pojo, bit, icon_class, cb, name) {
    if (bit < 32)
        throw 'Invalid bit: ' + bit;
    var icon = "icon action " + icon_class, hs = pojo['_'], opts = { hs: hs, bit: bit, cb: cb }, fn = $set.bind(opts), trigger = $trigger.bind(opts);
    return (<div class="dropdown icons">
  <a class="link dropdown-toggle s-circle" tabIndex={0} onFocus={fn}>
    <i class={icon} title={name}></i>
  </a>
  <ul class={$any('menu transparent' + ((bit & hs.state) ? ' hover' : ''))}>
    <li class={$any(!(bit & hs.state) ? 'd-none' : 'menu-item')}>
      <button class="btn s-circle" onClick={trigger}><i class="icon ok"></i></button>
    </li>
  </ul>
</div>);
}
// ================================================== 
// list
export function list_class(pager) {
    if ((8 /* LOADING */ & pager.state)) {
        return 'ui small divided selection list loading loading-lg';
    }
    else {
        return 'ui small divided selection list';
    }
}
// ================================================== 
// item
export function $item(pojo, el) {
    defp(el, 'pager_item', pojo);
    return el;
}
export function item_class(pojo) {
    var pojo_ = pojo['_'], lstate = pojo_.lstate;
    if (!(1 /* INCLUDED */ & lstate)) {
        return 'd-none';
    }
    else if (!(2 /* SELECTED */ & lstate)) {
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
// icons
export function item_timeago(pojo) {
    return icon_timeago(pojo, 'content right floated timeago');
}
export function item_update_ts(pojo, fk) {
    return icon_update_ts(pojo, fk, 'content right floated timeago');
}
export function item_toggle(pojo, fk, bit, icon_class, cb, name) {
    return icon_toggle(pojo, fk, bit, icon_class, cb, name, 'content right floated');
}
export function item_toggle_dd(pojo, fk, bit, icon_class, cb, name) {
    return (<div class="content right floated">
  {icon_toggle_dd(pojo, fk, bit, icon_class, cb, name)}
</div>);
}
export function item_action(pojo, bit, icon_class, cb, name) {
    return icon_action(pojo, bit, icon_class, cb, name, 'content right floated');
}
export function item_action_dd(pojo, bit, icon_class, cb, name) {
    return (<div class="content right floated">
  {icon_action_dd(pojo, bit, icon_class, cb, name)}
</div>);
}
export function item_remove32(pojo, cb) {
    return item_action(pojo, 32, 'trash empty', cb, 'Remove');
}
export function item_remove32_dd(pojo, cb) {
    return item_action_dd(pojo, 32, 'trash empty', cb, 'Remove');
}
// detail
export function item_detail(pojo, detail_id) {
    var pojo_ = pojo['_'], parent, el;
    return (<div ref={parent} class={$append_if(!!(16 /* UPDATE */ & pojo_.state), (el || (el = document.getElementById(detail_id))), parent) ? '' : 'd-none'}>
</div>);
}
//# sourceMappingURL=index.jsx.map