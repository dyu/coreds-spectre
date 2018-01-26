export { form } from './form';
export { qform } from './qform';
// ================================================== 
// dropdown
export function dropdown_msg(hs, mask) {
    return "\n<div :class=\"'dropdown' + (!" + hs + ".msg ? '' : ' active')\">\n  <ul class=\"menu transparent\">\n    <li class=\"menu-item\">\n      <div :class=\"'ui msg status-' + (" + hs + ".state & " + mask + ") + (!" + hs + ".msg ? ' d-none' : '')\">\n        <i class=\"icon close\" @click.prevent=\"" + hs + ".msg = null\"></i>\n        <span v-text=\"" + hs + ".msg\"></span>\n      </div>\n    </li>\n  </ul>\n</div>\n    "; /**/
}
// ================================================== 
// lsearch
export function lsearch_attrs(fk) {
    return "\n:disabled=\"0 !== (pager.state & " + 8 /* LOADING */ + ") || (!pager.size && !(pager.state & " + 256 /* LOCAL_SEARCH */ + "))\"\nv-lsearch=\"{ pager: pager, fields: ['" + fk + "'] }\"\n    "; /**/
}
// ================================================== 
// suggest
export var suggest_controls = "\n<div class=\"btn-group links\">\n  <button class=\"btn btn-link btn-sm\" :disabled=\"0 !== (pager.state & " + 8 /* LOADING */ + ") || 0 === pager.page\"\n      @click.prevent=\"pager.store.repaint((pager.page = 0))\">\n    <i class=\"icon angle-double-left\"></i>\n  </button>\n  <button class=\"btn btn-link btn-sm\" :disabled=\"0 !== (pager.state & " + 264 /* MASK_RPC_DISABLE */ + ")\"\n      @click.prevent=\"pager.store.pagePrevOrLoad(0)\">\n    <b><i class=\"icon angle-left\"></i></b>\n  </button>\n  <button class=\"btn btn-link btn-sm\" :disabled=\"0 !== (pager.state & " + 264 /* MASK_RPC_DISABLE */ + ") || 0 === pager.size\"\n      @click.prevent=\"pager.store.pageNextOrLoad(0)\">\n    <b><i class=\"icon angle-right\"></i></b>\n  </button>\n  <button class=\"btn btn-link btn-sm\" :disabled=\"0 !== (pager.state & " + 8 /* LOADING */ + ") || 0 === pager.size || pager.page_count === pager.page\"\n      @click.prevent=\"pager.store.repaint((pager.page = pager.page_count))\">\n    <i class=\"icon angle-double-right\"></i>\n  </button>\n  <button :class=\"!pager.size ? 'd-none' : 'btn btn-link btn-sm'\" disabled>\n    {{ '' + pager.page_from + (pager.page_from === pager.page_to ? ' of ' : (' - ' + pager.page_to + ' of ')) + pager.size }}\n  </button>\n</div>\n"; /**/
// ================================================== 
// pager
export var pager_controls = "\n<div class=\"btn-group links\">\n  <button class=\"btn btn-link btn-sm\" :disabled=\"0 !== (pager.state & " + 8 /* LOADING */ + ") || 2 > pager.size\"\n      @click.prevent=\"pager.store.repaint((pager.state ^= " + 16 /* DESC */ + "))\">\n    <i :class=\"(pager.state & " + 16 /* DESC */ + ") ? 'icon desc-yes' : 'icon desc-no'\"></i>\n  </button>\n  <button class=\"btn btn-link btn-sm\" :disabled=\"0 !== (pager.state & " + 264 /* MASK_RPC_DISABLE */ + ") || 0 === pager.size\"\n      @click.prevent=\"pager.store.reload()\">\n    <i class=\"icon cw\"></i>\n  </button>\n  <button class=\"btn btn-link btn-sm\" :disabled=\"0 !== (pager.state & " + 8 /* LOADING */ + ") || 0 === pager.page\"\n      @click.prevent=\"pager.store.repaint((pager.page = 0))\">\n    <i class=\"icon angle-double-left\"></i>\n  </button>\n  <button class=\"btn btn-link btn-sm\" :disabled=\"0 !== (pager.state & " + 264 /* MASK_RPC_DISABLE */ + ")\"\n      @click.prevent=\"pager.store.pagePrevOrLoad(0)\">\n    <b><i class=\"icon angle-left\"></i></b>\n  </button>\n  <button class=\"btn btn-link btn-sm\" :disabled=\"0 !== (pager.state & " + 264 /* MASK_RPC_DISABLE */ + ") || 0 === pager.size\"\n      @click.prevent=\"pager.store.pageNextOrLoad(0)\">\n    <b><i class=\"icon angle-right\"></i></b>\n  </button>\n  <button class=\"btn btn-link btn-sm\" :disabled=\"0 !== (pager.state & " + 8 /* LOADING */ + ") || 0 === pager.size || pager.page_count === pager.page\"\n      @click.prevent=\"pager.store.repaint((pager.page = pager.page_count))\">\n    <i class=\"icon angle-double-right\"></i>\n  </button>\n  <button :class=\"!pager.size ? 'd-none' : 'btn btn-link btn-sm'\" disabled>\n    {{ '' + pager.page_from + (pager.page_from === pager.page_to ? ' of ' : (' - ' + pager.page_to + ' of ')) + pager.size }}\n  </button>\n</div>\n"; /**/
export var pager_msg = "\n<div :class=\"'ui msg status-' + (pager.state & " + 7 /* MASK_STATUS */ + ") + (!pager.msg ? ' d-none' : '')\">\n  <i class=\"close icon\" @click.prevent=\"pager.msg = null\"></i>\n  <span v-text=\"pager.msg\"></span>\n</div>\n"; /**/
// ================================================== 
// icons
export var icon_timeago = "\n<i class=\"icon clock\"></i><small>{{ pojo['2'] | prettydate }}</small>\n"; /**/
export function icon_update_ts(fk) {
    return "\n<i class=\"icon pencil\"></i><small>{{ pojo['" + fk + "'] | prettydate }}</small>\n    "; /**/
}
export function icon_toggle(fk, bit, icon_class, name) {
    if (bit < 32)
        throw 'Invalid bit: ' + bit;
    var suffix = !name ? '' : " :title=\"pojo['" + fk + "'] ? '" + name + "' : 'Mark " + name + "?'\"";
    return "\n<i :class=\"'icon action " + icon_class + "' + (!pojo['" + fk + "'] ? ' empty' : '')\" @click.prevent=\"(pojo._.state ^= " + bit + ")\"" + suffix + "></i>\n<i class=\"icon ok-circled\" v-show=\"(pojo._.state & " + bit + ")\" @click.prevent=\"0 <= (pojo._.state ^= " + bit + ") && $emit('toggle', '" + fk + "')\"></i>\n<i class=\"icon cancel-circled\" v-show=\"(pojo._.state & " + bit + ")\" @click.prevent=\"(pojo._.state ^= " + bit + ")\"></i>\n"; /**/
}
export function icon_remove(bit, icon_class, name) {
    if (bit < 32)
        throw 'Invalid bit: ' + bit;
    return "\n<i class=\"icon action " + (icon_class || 'trash empty') + "\" @click.prevent=\"(pojo._.state ^= " + bit + ")\" title=\"" + (name || 'Remove') + "?'\"></i>\n<i class=\"icon ok-circled\" v-show=\"(pojo._.state & " + bit + ")\" @click.prevent=\"0 <= (pojo._.state ^= " + bit + ") && $emit('remove', pojo)\"></i>\n<i class=\"icon cancel-circled\" v-show=\"(pojo._.state & " + bit + ")\" @click.prevent=\"(pojo._.state ^= " + bit + ")\"></i>\n"; /**/
}
export var icon_remove_bit32 = icon_remove(32);
// ================================================== 
// item
export var item_attrs = "\nv-defp:pager_item=\"pojo\"\n:class=\"!(pojo._.lstate & " + 1 /* INCLUDED */ + ") ? 'd-none' : (!(pojo._.lstate & " + 2 /* SELECTED */ + ") ? 'item' : 'item active')\"\n"; /**/
export var item_msg = "\n<div :class=\"'ui msg status-' + (pojo._.state & " + 7 /* MASK_STATUS */ + ") + (!pojo._.msg ? ' d-none' : '')\">\n  <i class=\"close icon\" @click.prevent=\"pojo._.msg = null\"></i>\n  <span v-text=\"pojo._.msg\"></span>\n</div>\n"; /**/
export var item_msg_dd = dropdown_msg('pojo._', 7 /* MASK_STATUS */);
export function item_toggle(fk, bit, icon_class, name) {
    return "\n<div class=\"content right floated\">\n  " + icon_toggle(fk, bit, icon_class, name) + "\n</div>\n"; /**/
}
export var item_timeago = "\n<div class=\"content right floated timeago\">\n  " + icon_timeago + "\n</div>\n"; /**/
export function item_detail(detail_id) {
    return "\n<div :class=\"!(" + 16 /* UPDATE */ + " & pojo._.state) ? 'd-none' : ''\" v-append:" + detail_id + "=\"" + 16 /* UPDATE */ + " & pojo._.state\"></div>\n    "; /**/
}
//# sourceMappingURL=index.js.map