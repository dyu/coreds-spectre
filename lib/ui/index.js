export { form } from './form';
export { qform } from './qform';
// ================================================== 
// dropdown
export function dropdown_msg(hs, mask) {
    return "\n<div :class=\"'dropdown' + (!" + hs + ".msg ? '' : ' active')\">\n  <ul class=\"menu transparent\">\n    <li class=\"menu-item\">\n      <div :class=\"'ui msg status-' + (" + mask + " & " + hs + ".state) + (!" + hs + ".msg ? ' d-none' : '')\">\n        <i class=\"icon close\" @click.prevent=\"" + hs + ".msg = null\"></i>\n        <span v-text=\"" + hs + ".msg\"></span>\n      </div>\n    </li>\n  </ul>\n</div>\n    "; /**/
}
// ================================================== 
// lsearch
export function lsearch_attrs(fk) {
    return "\n:disabled=\"0 !== (" + 8 /* LOADING */ + " & pager.state) || (!pager.size && !(" + 256 /* LOCAL_SEARCH */ + " & pager.state))\"\nv-lsearch=\"{ pager: pager, fields: ['" + fk + "'] }\"\n    "; /**/
}
// ================================================== 
// suggest
export var suggest_controls = "\n<div class=\"btn-group links\">\n  <button class=\"btn btn-link btn-sm\" :disabled=\"0 !== (" + 8 /* LOADING */ + " & pager.state) || 0 === pager.page\"\n      @click.prevent=\"pager.store.repaint((pager.page = 0))\">\n    <i class=\"icon angle-double-left\"></i>\n  </button>\n  <button class=\"btn btn-link btn-sm\" :disabled=\"0 !== (" + 264 /* MASK_RPC_DISABLE */ + " & pager.state)\"\n      @click.prevent=\"pager.store.pagePrevOrLoad(0)\">\n    <b><i class=\"icon angle-left\"></i></b>\n  </button>\n  <button class=\"btn btn-link btn-sm\" :disabled=\"0 !== (" + 264 /* MASK_RPC_DISABLE */ + " & pager.state) || 0 === pager.size\"\n      @click.prevent=\"pager.store.pageNextOrLoad(0)\">\n    <b><i class=\"icon angle-right\"></i></b>\n  </button>\n  <button class=\"btn btn-link btn-sm\" :disabled=\"0 !== (" + 8 /* LOADING */ + " & pager.state) || 0 === pager.size || pager.page_count === pager.page\"\n      @click.prevent=\"pager.store.repaint((pager.page = pager.page_count))\">\n    <i class=\"icon angle-double-right\"></i>\n  </button>\n  <button :class=\"!pager.size ? 'd-none' : 'btn btn-link btn-sm'\" disabled>\n    {{ '' + pager.page_from + (pager.page_from === pager.page_to ? ' of ' : (' - ' + pager.page_to + ' of ')) + pager.size }}\n  </button>\n</div>\n"; /**/
// ================================================== 
// pager
export var pager_controls = "\n<div class=\"btn-group links\">\n  <button class=\"btn btn-link btn-sm\" :disabled=\"0 !== (" + 8 /* LOADING */ + " & pager.state) || 2 > pager.size\"\n      @click.prevent=\"pager.store.repaint((pager.state ^= " + 16 /* DESC */ + "))\">\n    <i :class=\"(" + 16 /* DESC */ + " & pager.state) ? 'icon desc-yes' : 'icon desc-no'\"></i>\n  </button>\n  <button class=\"btn btn-link btn-sm\" :disabled=\"0 !== (" + 264 /* MASK_RPC_DISABLE */ + " & pager.state) || 0 === pager.size\"\n      @click.prevent=\"pager.store.reload()\">\n    <i class=\"icon cw\"></i>\n  </button>\n  <button class=\"btn btn-link btn-sm\" :disabled=\"0 !== (" + 8 /* LOADING */ + " & pager.state) || 0 === pager.page\"\n      @click.prevent=\"pager.store.repaint((pager.page = 0))\">\n    <i class=\"icon angle-double-left\"></i>\n  </button>\n  <button class=\"btn btn-link btn-sm\" :disabled=\"0 !== (" + 264 /* MASK_RPC_DISABLE */ + " & pager.state)\"\n      @click.prevent=\"pager.store.pagePrevOrLoad(0)\">\n    <b><i class=\"icon angle-left\"></i></b>\n  </button>\n  <button class=\"btn btn-link btn-sm\" :disabled=\"0 !== (" + 264 /* MASK_RPC_DISABLE */ + " & pager.state) || 0 === pager.size\"\n      @click.prevent=\"pager.store.pageNextOrLoad(0)\">\n    <b><i class=\"icon angle-right\"></i></b>\n  </button>\n  <button class=\"btn btn-link btn-sm\" :disabled=\"0 !== (" + 8 /* LOADING */ + " & pager.state) || 0 === pager.size || pager.page_count === pager.page\"\n      @click.prevent=\"pager.store.repaint((pager.page = pager.page_count))\">\n    <i class=\"icon angle-double-right\"></i>\n  </button>\n  <button :class=\"!pager.size ? 'd-none' : 'btn btn-link btn-sm'\" disabled>\n    {{ '' + pager.page_from + (pager.page_from === pager.page_to ? ' of ' : (' - ' + pager.page_to + ' of ')) + pager.size }}\n  </button>\n</div>\n"; /**/
export var pager_controls_nav = "\n<div class=\"navbar\">\n  <div class=\"navbar-section links\">\n    <button :class=\"!pager.size ? 'd-none' : 'btn btn-link btn-sm info'\" disabled>\n      {{ '' + pager.page_from + (pager.page_from === pager.page_to ? ' of ' : (' - ' + pager.page_to + ' of ')) + pager.size }}\n    </button>\n  </div>\n  <div class=\"navbar-section links\">\n    <button class=\"btn btn-link btn-sm\" :disabled=\"0 !== (" + 8 /* LOADING */ + " & pager.state) || 2 > pager.size\"\n        @click.prevent=\"pager.store.repaint((pager.state ^= " + 16 /* DESC */ + "))\">\n      <i :class=\"(" + 16 /* DESC */ + " & pager.state) ? 'icon desc-yes' : 'icon desc-no'\"></i>\n    </button>\n    &nbsp;\n    <button class=\"btn btn-link btn-sm\" :disabled=\"0 !== (" + 264 /* MASK_RPC_DISABLE */ + " & pager.state) || 0 === pager.size\"\n        @click.prevent=\"pager.store.reload()\">\n      <i class=\"icon cw\"></i>\n    </button>\n  </div>\n  <div class=\"navbar-section links\">\n    <button class=\"btn btn-link btn-sm\" :disabled=\"0 !== (" + 8 /* LOADING */ + " & pager.state) || 0 === pager.page\"\n        @click.prevent=\"pager.store.repaint((pager.page = 0))\">\n      <i class=\"icon angle-double-left\"></i>\n    </button>\n    <button class=\"btn btn-link btn-sm\" :disabled=\"0 !== (" + 264 /* MASK_RPC_DISABLE */ + " & pager.state)\"\n        @click.prevent=\"pager.store.pagePrevOrLoad(0)\">\n      <b><i class=\"icon left-open\"></i></b>\n    </button>\n    &nbsp;\n    <button class=\"btn btn-link btn-sm\" :disabled=\"0 !== (" + 264 /* MASK_RPC_DISABLE */ + " & pager.state) || 0 === pager.size\"\n        @click.prevent=\"pager.store.pageNextOrLoad(0)\">\n      <b><i class=\"icon right-open\"></i></b>\n    </button>\n    <button class=\"btn btn-link btn-sm\" :disabled=\"0 !== (" + 8 /* LOADING */ + " & pager.state) || 0 === pager.size || pager.page_count === pager.page\"\n        @click.prevent=\"pager.store.repaint((pager.page = pager.page_count))\">\n      <i class=\"icon angle-double-right\"></i>\n    </button>\n  </div>\n</div>\n"; /**/
export var pager_msg = "\n<div :class=\"'ui msg status-' + (" + 7 /* MASK_STATUS */ + " & pager.state) + (!pager.msg ? ' d-none' : '')\">\n  <i class=\"close icon\" @click.prevent=\"pager.msg = null\"></i>\n  <span v-text=\"pager.msg\"></span>\n</div>\n"; /**/
// ================================================== 
// icons
export function icon_timeago(wrapper_class) {
    var attrs = !wrapper_class ? '' : " class=\"" + wrapper_class + "\"";
    return "\n<div" + attrs + ">\n  <i class=\"icon clock\"></i><small>{{ pojo['2'] | prettydate }}</small>\n</div>\n    "; /**/
}
export function icon_update_ts(fk, wrapper_class) {
    var attrs = !wrapper_class ? '' : " class=\"" + wrapper_class + "\"";
    return "\n<div" + attrs + ">\n  <i class=\"icon pencil\"></i><small>{{ pojo['" + fk + "'] | prettydate }}</small>\n</div>\n    "; /**/
}
export function icon_toggle(fk, bit, icon_class, name, wrapper_class) {
    if (bit < 32)
        throw 'Invalid bit: ' + bit;
    var attrs = !wrapper_class ? '' : " class=\"" + wrapper_class + "\"";
    var suffix = !name ? '' : " :title=\"pojo['" + fk + "'] ? '" + name + "' : 'Mark " + name + "?'\"";
    return "\n<div" + attrs + ">\n  <i :class=\"'icon action " + icon_class + "' + (!pojo['" + fk + "'] ? ' empty' : '')\" @click.prevent=\"(pojo._.state ^= " + bit + ")\"" + suffix + "></i>\n  <i :class=\"!(" + bit + " & pojo._.state) ? 'd-none' : 'icon ok-circled'\" @click.prevent=\"0 <= (pojo._.state ^= " + bit + ") && $emit('toggle', '" + fk + "')\"></i>\n  <i :class=\"!(" + bit + " & pojo._.state) ? 'd-none' : 'icon cancel-circled'\" @click.prevent=\"(pojo._.state ^= " + bit + ")\"></i>\n</div>\n"; /**/
}
export function icon_toggle_dd(fk, bit, icon_class, name) {
    if (bit < 32)
        throw 'Invalid bit: ' + bit;
    var suffix = !name ? '' : " :title=\"pojo['" + fk + "'] ? '" + name + "' : 'Mark " + name + "?'\"";
    return "\n<div :class=\"'dropdown icons' + ((" + bit + " & pojo._.state) ? ' active' : '')\">\n  <span class=\"dropdown-toggle c-hand\" @click.prevent=\"(pojo._.state ^= " + bit + ")\">\n    <i :class=\"'icon action " + icon_class + "' + (!pojo['" + fk + "'] ? ' empty' : '')\"" + suffix + "></i>\n  </span>\n  <ul class=\"menu transparent\">\n    <li :class=\"!(" + bit + " & pojo._.state) ? 'd-none' : 'menu-item'\">\n      <button class=\"btn circle\" @click.prevent=\"0 <= (pojo._.state ^= " + bit + ") && $emit('toggle', '" + fk + "')\"><i class=\"icon ok\"></i></button>\n    </li>\n  </ul>\n</div>\n"; /**/
}
export function icon_action(bit, icon_class, name, wrapper_class) {
    if (bit < 32)
        throw 'Invalid bit: ' + bit;
    var attrs = !wrapper_class ? '' : " class=\"" + wrapper_class + "\"";
    var suffix = !name ? '' : " title=\"" + name + "\"";
    return "\n<div" + attrs + ">\n  <i class=\"icon action " + icon_class + "\" @click.prevent=\"(pojo._.state ^= " + bit + ")\"" + suffix + "></i>\n  <i :class=\"!(" + bit + " & pojo._.state) ? 'd-none' : 'icon ok-circled'\" @click.prevent=\"0 <= (pojo._.state ^= " + bit + ") && $emit('action', " + bit + ")\"></i>\n  <i :class=\"!(" + bit + " & pojo._.state) ? 'd-none' : 'icon cancel-circled'\" @click.prevent=\"(pojo._.state ^= " + bit + ")\"></i>\n</div>\n"; /**/
}
export function icon_action_dd(bit, icon_class, name) {
    if (bit < 32)
        throw 'Invalid bit: ' + bit;
    var suffix = !name ? '' : " title=\"" + name + "\"";
    return "\n<div :class=\"'dropdown icons' + ((" + bit + " & pojo._.state) ? ' active' : '')\">\n  <span class=\"dropdown-toggle c-hand\" @click.prevent=\"(pojo._.state ^= " + bit + ")\">\n    <i class=\"icon action " + icon_class + "\"" + suffix + "></i>\n  </span>\n  <ul class=\"menu transparent\">\n    <li :class=\"!(" + bit + " & pojo._.state) ? 'd-none' : 'menu-item'\">\n      <button class=\"btn circle\" @click.prevent=\"0 <= (pojo._.state ^= " + bit + ") && $emit('action', " + bit + ")\"><i class=\"icon ok\"></i></button>\n    </li>\n  </ul>\n</div>\n"; /**/
}
// ================================================== 
// list
export var list_attrs = "\n:class=\"'ui small divided selection list' + ((" + 8 /* LOADING */ + " & pager.state) ? ' loading loading-lg' : '')\"\n"; /**/
// ================================================== 
// item
export var item_attrs = "\nv-defp:pager_item=\"pojo\"\n:class=\"!(" + 1 /* INCLUDED */ + " & pojo._.lstate) ? 'd-none' : (!(" + 2 /* SELECTED */ + " & pojo._.lstate) ? 'item' : 'item active')\"\n"; /**/
export var item_msg = "\n<div :class=\"'ui msg status-' + (" + 7 /* MASK_STATUS */ + " & pojo._.state) + (!pojo._.msg ? ' d-none' : '')\">\n  <i class=\"close icon\" @click.prevent=\"pojo._.msg = null\"></i>\n  <span v-text=\"pojo._.msg\"></span>\n</div>\n"; /**/
export var item_msg_dd = dropdown_msg('pojo._', 7 /* MASK_STATUS */);
// icons
export var item_timeago = icon_timeago('content right floated timeago');
export function item_update_ts(fk) {
    return icon_update_ts(fk, 'content right floated timeago');
}
export function item_toggle(fk, bit, icon_class, name) {
    return icon_toggle(fk, bit, icon_class, name, 'content right floated');
}
export function item_toggle_dd(fk, bit, icon_class, name) {
    return "\n<div class=\"content right floated\">\n  " + icon_toggle_dd(fk, bit, icon_class, name) + "\n</div>\n    "; /**/
}
export function item_action(bit, icon_class, name) {
    return icon_action(bit, icon_class, name, 'content right floated');
}
export function item_action_dd(bit, icon_class, name) {
    return "\n<div class=\"content right floated\">\n  " + icon_action_dd(bit, icon_class, name) + "\n</div>\n    "; /**/
}
export var item_remove32 = item_action(32, 'trash empty', 'Remove');
export var item_remove32_dd = item_action_dd(32, 'trash empty', 'Remove');
// detail
export function item_detail(detail_id) {
    return "\n<div :class=\"!(" + 16 /* UPDATE */ + " & pojo._.state) ? 'd-none' : ''\" v-append:" + detail_id + "=\"" + 16 /* UPDATE */ + " & pojo._.state\"></div>\n    "; /**/
}
//# sourceMappingURL=index.js.map