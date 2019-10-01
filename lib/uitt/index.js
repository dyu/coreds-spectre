import { html, h } from 'sinuous';
h;
import { prettyDate } from 'coreds/lib/datetime_util';
import { defp } from 'coreds/lib/util';
import { attachOptsTo } from 'coreds-ui/lib/_pager';
import { parseOpts } from 'coreds-ui/lib/_lsearch';
import { msg } from './common';
import { $apply, $append_if } from '../util';
export { form } from './form';
export * from '../handler';
// ================================================== 
// dropdown
export function dropdown_msg(hs, mask) {
    return (_a = ["\n<div class=", ">\n  <ul class=\"menu transparent\">\n    <li class=\"menu-item\">\n      ", "\n    </li>\n  </ul>\n</div>\n"], _a.raw = [/**/ "\n<div class=", ">\n  <ul class=\"menu transparent\">\n    <li class=\"menu-item\">\n      ", "\n    </li>\n  </ul>\n</div>\n"], html /**/(_a, function () { return 'dropdown' + (hs.msg && ' active' || ''); }, function () { return msg(hs, mask); })); /**/
    var _a;
}
// ================================================== 
// lsearch
export function lsearch_disabled(pager) {
    return 0 !== (8 /* LOADING */ & pager.state) || (!pager.size && !(256 /* LOCAL_SEARCH */ & pager.state));
}
export function lsearch_input(pager, placeholder, fields, fn, clazz) {
    var cls = clazz === undefined ? 'underline' : clazz, el = (_a = ["<input type=\"text\" class=", " placeholder=", " disabled=", " />"], _a.raw = [/**/ "<input type=\"text\" class=", " placeholder=", " disabled=", " />"], html /**/(_a, cls, placeholder, function () { return lsearch_disabled(pager); })); /**/
    parseOpts(null, pager, fields, fn, null, el);
    return el;
    var _a;
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
    return (_a = ["\n<div class=\"btn-group links\">\n  <button class=\"btn btn-link btn-sm\" onclick=", "\n      disabled=", ">\n    <i class=", "></i>\n  </button>\n  <button class=\"btn btn-link btn-sm\" onclick=", "\n      disabled=", ">\n    <i class=\"icon cw\"></i>\n  </button>\n  <button class=\"btn btn-link btn-sm\" onclick=", "\n      disabled=", ">\n    <i class=\"icon angle-double-left\"></i>\n  </button>\n  <button class=\"btn btn-link btn-sm\" onclick=", "\n      disabled=", ">\n    <i class=\"icon angle-left\"></i>\n  </button>\n  <button class=\"btn btn-link btn-sm\" onclick=", "\n      disabled=", ">\n    <i class=\"icon angle-right\"></i>\n  </button>\n  <button class=\"btn btn-link btn-sm\" onclick=", "\n      disabled=", ">\n    <i class=\"icon angle-double-right\"></i>\n  </button>\n  <button class=", " disabled>\n    ", "\n  </button>\n</div>\n"], _a.raw = [/**/ "\n<div class=\"btn-group links\">\n  <button class=\"btn btn-link btn-sm\" onclick=", "\n      disabled=", ">\n    <i class=", "></i>\n  </button>\n  <button class=\"btn btn-link btn-sm\" onclick=", "\n      disabled=", ">\n    <i class=\"icon cw\"></i>\n  </button>\n  <button class=\"btn btn-link btn-sm\" onclick=", "\n      disabled=", ">\n    <i class=\"icon angle-double-left\"></i>\n  </button>\n  <button class=\"btn btn-link btn-sm\" onclick=", "\n      disabled=", ">\n    <i class=\"icon angle-left\"></i>\n  </button>\n  <button class=\"btn btn-link btn-sm\" onclick=", "\n      disabled=", ">\n    <i class=\"icon angle-right\"></i>\n  </button>\n  <button class=\"btn btn-link btn-sm\" onclick=", "\n      disabled=", ">\n    <i class=\"icon angle-double-right\"></i>\n  </button>\n  <button class=", " disabled>\n    ", "\n  </button>\n</div>\n"], html /**/(_a, sort, function () { return 0 !== (8 /* LOADING */ & pager.state) || 2 > pager.size; }, function () { return (16 /* DESC */ & pager.state) ? 'icon desc-yes' : 'icon desc-no'; }, reload, function () { return 0 !== (264 /* MASK_RPC_DISABLE */ & pager.state) || 0 === pager.size; }, gotoFirst, function () { return 0 !== (8 /* LOADING */ & pager.state) || 0 === pager.page; }, prevOrLoad, function () { return 0 !== (264 /* MASK_RPC_DISABLE */ & pager.state); }, nextOrLoad, function () { return 0 !== (264 /* MASK_RPC_DISABLE */ & pager.state) || 0 === pager.size; }, gotoLast, function () { return 0 !== (8 /* LOADING */ & pager.state) || 0 === pager.size || pager.page_count === pager.page; }, function () { return !pager.size ? 'd-none' : 'btn btn-link btn-sm'; }, function () { return '' + pager.page_from + (pager.page_from === pager.page_to ? ' of ' : (' - ' + pager.page_to + ' of ')) + pager.size; })); /**/
    var _a;
}
export function pager_controls_nav(pager) {
    var sort = $sort.bind(pager), reload = $reload.bind(pager), gotoFirst = $gotoFirst.bind(pager), gotoLast = $gotoLast.bind(pager), prevOrLoad = $prevOrLoad.bind(pager), nextOrLoad = $nextOrLoad.bind(pager);
    return (_a = ["\n<div class=\"navbar\">\n  <div class=\"navbar-section links\">\n    <button class=", " disabled>\n      ", "\n    </button>\n  </div>\n  <div class=\"navbar-center links\">\n    <button class=\"btn btn-link btn-sm\"\n        onclick=", "\n        disabled=", ">\n      <i class=", "></i>\n    </button>\n    &nbsp;\n    <button class=\"btn btn-link btn-sm\"\n        onclick=", "\n        disabled=", ">\n      <i class=\"icon cw\"></i>\n    </button>\n  </div>\n  <div class=\"navbar-section links\">\n    <button class=\"btn btn-link btn-sm\"\n        onclick=", "\n        disabled=", ">\n      <i class=\"icon angle-double-left\"></i>\n    </button>\n    <button class=\"btn btn-link btn-sm\"\n        onclick=", "\n        disabled=", ">\n      <i class=\"icon left-open\"></i>\n    </button>\n    &nbsp;\n    <button class=\"btn btn-link btn-sm\"\n        onclick=", "\n        disabled=", ">\n      <i class=\"icon right-open\"></i>\n    </button>\n    <button class=\"btn btn-link btn-sm\"\n        onclick=", "\n        disabled=", ">\n      <i class=\"icon angle-double-right\"></i>\n    </button>\n  </div>\n</div>\n"], _a.raw = [/**/ "\n<div class=\"navbar\">\n  <div class=\"navbar-section links\">\n    <button class=", " disabled>\n      ", "\n    </button>\n  </div>\n  <div class=\"navbar-center links\">\n    <button class=\"btn btn-link btn-sm\"\n        onclick=", "\n        disabled=", ">\n      <i class=", "></i>\n    </button>\n    &nbsp;\n    <button class=\"btn btn-link btn-sm\"\n        onclick=", "\n        disabled=", ">\n      <i class=\"icon cw\"></i>\n    </button>\n  </div>\n  <div class=\"navbar-section links\">\n    <button class=\"btn btn-link btn-sm\"\n        onclick=", "\n        disabled=", ">\n      <i class=\"icon angle-double-left\"></i>\n    </button>\n    <button class=\"btn btn-link btn-sm\"\n        onclick=", "\n        disabled=", ">\n      <i class=\"icon left-open\"></i>\n    </button>\n    &nbsp;\n    <button class=\"btn btn-link btn-sm\"\n        onclick=", "\n        disabled=", ">\n      <i class=\"icon right-open\"></i>\n    </button>\n    <button class=\"btn btn-link btn-sm\"\n        onclick=", "\n        disabled=", ">\n      <i class=\"icon angle-double-right\"></i>\n    </button>\n  </div>\n</div>\n"], html /**/(_a, function () { return !pager.size ? 'd-none' : 'btn btn-link btn-sm info'; }, function () { return '' + pager.page_from + (pager.page_from === pager.page_to ? ' of ' : (' - ' + pager.page_to + ' of ')) + pager.size; }, sort, function () { return 0 !== (8 /* LOADING */ & pager.state) || 2 > pager.size; }, function () { return (16 /* DESC */ & pager.state) ? 'icon desc-yes' : 'icon desc-no'; }, reload, function () { return 0 !== (264 /* MASK_RPC_DISABLE */ & pager.state) || 0 === pager.size; }, gotoFirst, function () { return 0 !== (8 /* LOADING */ & pager.state) || 0 === pager.page; }, prevOrLoad, function () { return 0 !== (264 /* MASK_RPC_DISABLE */ & pager.state); }, nextOrLoad, function () { return 0 !== (264 /* MASK_RPC_DISABLE */ & pager.state) || 0 === pager.size; }, gotoLast, function () { return 0 !== (8 /* LOADING */ & pager.state) || 0 === pager.size || pager.page_count === pager.page; })); /**/
    var _a;
}
export function pager_msg(pager) {
    return msg(pager, 7 /* MASK_STATUS */);
}
// ================================================== 
// icons
export function icon_timeago(pojo, wrapper_class) {
    return (_a = ["\n<div class=", ">\n  <i class=\"icon clock\"></i>\n  <small>", "</small>\n</div>\n"], _a.raw = [/**/ "\n<div class=", ">\n  <i class=\"icon clock\"></i>\n  <small>", "</small>\n</div>\n"], html /**/(_a, wrapper_class, function () { return $apply(pojo['2'], prettyDate); })); /**/
    var _a;
}
export function icon_update_ts(pojo, fk, wrapper_class) {
    return (_a = ["\n<div class=", ">\n  <i class=\"icon pencil\"></i>\n  <small>", "</small>\n</div>\n"], _a.raw = [/**/ "\n<div class=", ">\n  <i class=\"icon pencil\"></i>\n  <small>", "</small>\n</div>\n"], html /**/(_a, wrapper_class, function () { return $apply(pojo[fk], prettyDate); })); /**/
    var _a;
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
    return (_a = ["\n<div class=", ">\n  <i class=", " onclick=", " title=", "></i>\n  <i class=", " onclick=", "></i>\n  <i class=", " onclick=", "></i>\n</div>\n"], _a.raw = [/**/ "\n<div class=", ">\n  <i class=", " onclick=", " title=", "></i>\n  <i class=", " onclick=", "></i>\n  <i class=", " onclick=", "></i>\n</div>\n"], html /**/(_a, wrapper_class, function () { return (icon + (!pojo[fk] ? ' empty' : '')); }, fn, function () { return pojo[fk] ? titleOn : titleOff; }, function () { return (!(bit & hs.state) ? 'd-none' : 'icon ok-circled'); }, trigger, function () { return (!(bit & hs.state) ? 'd-none' : 'icon cancel-circled'); }, fn)); /**/
    var _a;
}
export function icon_toggle_dd(pojo, fk, bit, icon_class, cb, name) {
    if (bit < 32)
        throw 'Invalid bit: ' + bit;
    var icon = "icon action " + icon_class, hs = pojo['_'], opts = { hs: hs, bit: bit, cb: cb }, fn = $set.bind(opts), trigger = $trigger.bind(opts), titleOn, titleOff;
    if (name) {
        titleOn = "" + name;
        titleOff = "Mark " + name + "?";
    }
    return (_a = ["\n<div class=\"dropdown icons\">\n  <a class=\"link dropdown-toggle circle\" tabIndex=\"0\" onfocus=", ">\n    <i class=", " title=", "></i>\n  </a>\n  <ul class=", ">\n    <li class=\"menu-item\">\n      <button class=\"btn circle\" onclick=", "><i class=\"icon ok\"></i></button>\n    </li>\n  </ul>\n</div>\n"], _a.raw = [/**/ "\n<div class=\"dropdown icons\">\n  <a class=\"link dropdown-toggle circle\" tabIndex=\"0\" onfocus=", ">\n    <i class=", " title=", "></i>\n  </a>\n  <ul class=", ">\n    <li class=\"menu-item\">\n      <button class=\"btn circle\" onclick=", "><i class=\"icon ok\"></i></button>\n    </li>\n  </ul>\n</div>\n"], html /**/(_a, fn, function () { return (icon + (!pojo[fk] ? ' empty' : '')); }, function () { return (pojo[fk] ? titleOn : titleOff); }, function () { return ('menu transparent' + ((bit & hs.state) ? ' hover' : '')); }, trigger)); /**/
    var _a;
}
export function icon_action(pojo, bit, icon_class, cb, name, wrapper_class) {
    if (bit < 32)
        throw 'Invalid bit: ' + bit;
    var icon = "icon action " + icon_class, hs = pojo['_'], opts = { hs: hs, bit: bit, cb: cb }, fn = $toggle.bind(opts), trigger = $trigger.bind(opts);
    return (_a = ["\n<div class=", ">\n  <i class=", " onclick=", " title=", "></i>\n  <i class=", " onclick=", "></i>\n  <i class=", " onclick=", "></i>\n</div>\n"], _a.raw = [/**/ "\n<div class=", ">\n  <i class=", " onclick=", " title=", "></i>\n  <i class=", " onclick=", "></i>\n  <i class=", " onclick=", "></i>\n</div>\n"], html /**/(_a, wrapper_class, icon, fn, name, function () { return (!(bit & hs.state) ? 'd-none' : 'icon ok-circled'); }, trigger, function () { return (!(bit & hs.state) ? 'd-none' : 'icon cancel-circled'); }, fn)); /**/
    var _a;
}
export function icon_action_dd(pojo, bit, icon_class, cb, name) {
    if (bit < 32)
        throw 'Invalid bit: ' + bit;
    var icon = "icon action " + icon_class, hs = pojo['_'], opts = { hs: hs, bit: bit, cb: cb }, fn = $set.bind(opts), trigger = $trigger.bind(opts);
    return (_a = ["\n<div class=\"dropdown icons\">\n  <a class=\"link dropdown-toggle circle\" tabIndex=\"0\" onfocus=", ">\n    <i class=", " title=", "></i>\n  </a>\n  <ul class=", ">\n    <li class=", ">\n      <button class=\"btn circle\" onclick=", "><i class=\"icon ok\"></i></button>\n    </li>\n  </ul>\n</div>\n"], _a.raw = [/**/ "\n<div class=\"dropdown icons\">\n  <a class=\"link dropdown-toggle circle\" tabIndex=\"0\" onfocus=", ">\n    <i class=", " title=", "></i>\n  </a>\n  <ul class=", ">\n    <li class=", ">\n      <button class=\"btn circle\" onclick=", "><i class=\"icon ok\"></i></button>\n    </li>\n  </ul>\n</div>\n"], html /**/(_a, fn, icon, name, function () { return ('menu transparent' + ((bit & hs.state) ? ' hover' : '')); }, function () { return (!(bit & hs.state) ? 'd-none' : 'menu-item'); }, trigger)); /**/
    var _a;
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
    return (_a = ["\n<div class=\"content right floated\">\n  ", "\n</div>\n"], _a.raw = [/**/ "\n<div class=\"content right floated\">\n  ", "\n</div>\n"], html /**/(_a, icon_toggle_dd(pojo, fk, bit, icon_class, cb, name))); /**/
    var _a;
}
export function item_action(pojo, bit, icon_class, cb, name) {
    return icon_action(pojo, bit, icon_class, cb, name, 'content right floated');
}
export function item_action_dd(pojo, bit, icon_class, cb, name) {
    return (_a = ["\n<div class=\"content right floated\">\n  ", "\n</div>\n"], _a.raw = [/**/ "\n<div class=\"content right floated\">\n  ", "\n</div>\n"], html /**/(_a, icon_action_dd(pojo, bit, icon_class, cb, name))); /**/
    var _a;
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
    return parent = (_a = ["\n<div \n    class=", ">\n</div>\n"], _a.raw = [/**/ "\n<div \n    class=", ">\n</div>\n"], html /**/(_a, function () { return $append_if(!!(16 /* UPDATE */ & pojo_.state), (el || (el = document.getElementById(detail_id))), parent) ? '' : 'd-none'; })); /**/
    var _a;
}
//# sourceMappingURL=index.js.map