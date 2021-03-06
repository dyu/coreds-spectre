import * as Surplus from 'surplus';
Surplus;
import { prettyDate } from 'coreds/lib/datetime_util';
import { $any, defp } from 'coreds/lib/util';
import { attachOptsTo } from 'coreds-ui/lib/_pager';
function $apply(val, filter) {
    return val && filter(val);
}
function $clearMsg(e) {
    e.preventDefault();
    this.msg = null;
}
// ================================================== 
// dropdown
export function dropdown_msg(pojo) {
    var pojo_ = pojo['_'], fn = $clearMsg.bind(pojo_);
    return (<div class={$any('dropdown' + (pojo_.msg && ' active' || ''))}>
  <ul class={$any('menu transparent' + (!pojo_.msg ? ' d-none' : ''))}>
    <li class="menu-item">
      <div class={$any('ui msg status-' + (pojo_.state & 7 /* MASK_STATUS */))}>
        <i class="close icon" onClick={fn}></i>
        <span>{$any(pojo_.msg)}</span>
      </div>
    </li>
  </ul>
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
    var pojo_ = pojo['_'], fn = $clearMsg.bind(pojo_);
    return (<div class={$any('ui msg status-' + (pojo_.state & 7 /* MASK_STATUS */) + (!pojo_.msg ? ' d-none' : ''))}>
  <i class="close icon" onClick={fn}></i>
  <span>{$any(pojo_.msg)}</span>
</div>);
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
  <button class={$any('btn btn-link btn-sm' + (!pager.size ? ' d-none' : ''))} disabled>
    {$any('' + pager.page_from + (pager.page_from === pager.page_to ? ' of ' : (' - ' + pager.page_to + ' of ')) + pager.size)}
  </button>
</div>);
}
export function pager_msg(pager) {
    var fn = $clearMsg.bind(pager);
    return (<div class={$any(!pager.msg || !(pager.state & 7 /* MASK_STATUS */) ? 'd-none' : '')}>
  <div class={$any('ui msg status-' + (pager.state & 7 /* MASK_STATUS */))}>
    <i class="close icon" onClick={fn}></i>
    <span>{$any(pager.msg)}</span>
  </div>
</div>);
}
// ================================================== 
// icons
export function icon_timeago(pojo) {
    return (<div class="content right floated">
  <i class="icon clock"></i>
  <small>{$apply(pojo['2'], prettyDate)}</small>
</div>);
}
export function icon_update_ts(pojo, fk) {
    return (<div class="content right floated">
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
    !(state & this.bit) && this.cb && this.cb(this.bit);
}
export function icon_toggle(pojo, fk, bit, icon_class, name, cb) {
    if (bit < 32)
        throw 'Invalid bit: ' + bit;
    var icon = "icon action " + icon_class, obj = pojo['_'], opts = { obj: obj, bit: bit, cb: cb }, fn = $toggle.bind(opts), trigger = $trigger.bind(opts), titleOn, titleOff;
    if (name) {
        titleOn = "" + name;
        titleOff = "Mark " + name + "?";
    }
    return (<div class="content right floated">
  <i class={$any(icon + (!pojo[fk] ? ' empty' : ''))} onClick={fn} title={$any(pojo[fk] ? titleOn : titleOff)}></i>
  <i class={$any('icon ok-circled' + (!(obj.state & bit) ? ' d-none' : ''))} onClick={trigger}></i>
  <i class={$any('icon cancel-circled' + (!(obj.state & bit) ? ' d-none' : ''))} onClick={fn}></i>
</div>);
}
export function icon_remove(pojo, fk, bit, icon_class, name, cb) {
    if (bit < 32)
        throw 'Invalid bit: ' + bit;
    var icon = "icon action " + (icon_class || 'trash empty'), obj = pojo['_'], opts = { obj: obj, bit: bit, cb: cb }, fn = $toggle.bind(opts), trigger = $trigger.bind(opts), title = name || 'Remove';
    return (<div class="content right floated">
  <i class={icon} onClick={fn} title={title}></i>
  <i class={$any('icon ok-circled' + (!(obj.state & bit) ? ' d-none' : ''))} onClick={trigger}></i>
  <i class={$any('icon cancel-circled' + (!(obj.state & bit) ? ' d-none' : ''))} onClick={fn}></i>
</div>);
}
//# sourceMappingURL=index.js.map