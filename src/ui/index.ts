import { PagerState, PojoState, PojoListState } from 'coreds/lib/types'
export { form } from './form'
export { qform } from './qform'

// ================================================== 
// dropdown

export function dropdown_msg(hs: string, mask: number) {
    return /**/`
<div :class="'dropdown' + (!${hs}.msg ? '' : ' active')">
  <ul class="menu transparent">
    <li class="menu-item">
      <div :class="'ui msg status-' + (${mask} & ${hs}.state) + (!${hs}.msg ? ' d-none' : '')">
        <i class="icon close" @click.prevent="${hs}.msg = null"></i>
        <span v-text="${hs}.msg"></span>
      </div>
    </li>
  </ul>
</div>
    `/**/
}

// ================================================== 
// lsearch

export function lsearch_attrs(fk: string) {
    return /**/`
:disabled="0 !== (${PagerState.LOADING} & pager.state) || (!pager.size && !(${PagerState.LOCAL_SEARCH} & pager.state))"
v-lsearch="{ pager: pager, fields: ['${fk}'] }"
    `/**/
}

// ================================================== 
// suggest

export const suggest_controls = /**/`
<div class="btn-group links">
  <button class="btn btn-link btn-sm" :disabled="0 !== (${PagerState.LOADING} & pager.state) || 0 === pager.page"
      @click.prevent="pager.store.repaint((pager.page = 0))">
    <i class="icon angle-double-left"></i>
  </button>
  <button class="btn btn-link btn-sm" :disabled="0 !== (${PagerState.MASK_RPC_DISABLE} & pager.state)"
      @click.prevent="pager.store.pagePrevOrLoad(0)">
    <b><i class="icon angle-left"></i></b>
  </button>
  <button class="btn btn-link btn-sm" :disabled="0 !== (${PagerState.MASK_RPC_DISABLE} & pager.state) || 0 === pager.size"
      @click.prevent="pager.store.pageNextOrLoad(0)">
    <b><i class="icon angle-right"></i></b>
  </button>
  <button class="btn btn-link btn-sm" :disabled="0 !== (${PagerState.LOADING} & pager.state) || 0 === pager.size || pager.page_count === pager.page"
      @click.prevent="pager.store.repaint((pager.page = pager.page_count))">
    <i class="icon angle-double-right"></i>
  </button>
  <button :class="!pager.size ? 'd-none' : 'btn btn-link btn-sm'" disabled>
    {{ '' + pager.page_from + (pager.page_from === pager.page_to ? ' of ' : (' - ' + pager.page_to + ' of ')) + pager.size }}
  </button>
</div>
`/**/

// ================================================== 
// pager

export const pager_controls = /**/`
<div class="btn-group links">
  <button class="btn btn-link btn-sm" :disabled="0 !== (${PagerState.LOADING} & pager.state) || 2 > pager.size"
      @click.prevent="pager.store.repaint((pager.state ^= ${PagerState.DESC}))">
    <i :class="(${PagerState.DESC} & pager.state) ? 'icon desc-yes' : 'icon desc-no'"></i>
  </button>
  <button class="btn btn-link btn-sm" :disabled="0 !== (${PagerState.MASK_RPC_DISABLE} & pager.state) || 0 === pager.size"
      @click.prevent="pager.store.reload()">
    <i class="icon cw"></i>
  </button>
  <button class="btn btn-link btn-sm" :disabled="0 !== (${PagerState.LOADING} & pager.state) || 0 === pager.page"
      @click.prevent="pager.store.repaint((pager.page = 0))">
    <i class="icon angle-double-left"></i>
  </button>
  <button class="btn btn-link btn-sm" :disabled="0 !== (${PagerState.MASK_RPC_DISABLE} & pager.state)"
      @click.prevent="pager.store.pagePrevOrLoad(0)">
    <b><i class="icon angle-left"></i></b>
  </button>
  <button class="btn btn-link btn-sm" :disabled="0 !== (${PagerState.MASK_RPC_DISABLE} & pager.state) || 0 === pager.size"
      @click.prevent="pager.store.pageNextOrLoad(0)">
    <b><i class="icon angle-right"></i></b>
  </button>
  <button class="btn btn-link btn-sm" :disabled="0 !== (${PagerState.LOADING} & pager.state) || 0 === pager.size || pager.page_count === pager.page"
      @click.prevent="pager.store.repaint((pager.page = pager.page_count))">
    <i class="icon angle-double-right"></i>
  </button>
  <button :class="!pager.size ? 'd-none' : 'btn btn-link btn-sm'" disabled>
    {{ '' + pager.page_from + (pager.page_from === pager.page_to ? ' of ' : (' - ' + pager.page_to + ' of ')) + pager.size }}
  </button>
</div>
`/**/

export const pager_controls_nav = /**/`
<div class="navbar">
  <div class="navbar-section links">
    <button :class="!pager.size ? 'd-none' : 'btn btn-link btn-sm info'" disabled>
      {{ '' + pager.page_from + (pager.page_from === pager.page_to ? ' of ' : (' - ' + pager.page_to + ' of ')) + pager.size }}
    </button>
  </div>
  <div class="navbar-center links">
    <button class="btn btn-link btn-sm" :disabled="0 !== (${PagerState.LOADING} & pager.state) || 2 > pager.size"
        @click.prevent="pager.store.repaint((pager.state ^= ${PagerState.DESC}))">
      <i :class="(${PagerState.DESC} & pager.state) ? 'icon desc-yes' : 'icon desc-no'"></i>
    </button>
    &nbsp;
    <button class="btn btn-link btn-sm" :disabled="0 !== (${PagerState.MASK_RPC_DISABLE} & pager.state) || 0 === pager.size"
        @click.prevent="pager.store.reload()">
      <i class="icon cw"></i>
    </button>
  </div>
  <div class="navbar-section links">
    <button class="btn btn-link btn-sm" :disabled="0 !== (${PagerState.LOADING} & pager.state) || 0 === pager.page"
        @click.prevent="pager.store.repaint((pager.page = 0))">
      <i class="icon angle-double-left"></i>
    </button>
    <button class="btn btn-link btn-sm" :disabled="0 !== (${PagerState.MASK_RPC_DISABLE} & pager.state)"
        @click.prevent="pager.store.pagePrevOrLoad(0)">
      <b><i class="icon left-open"></i></b>
    </button>
    &nbsp;
    <button class="btn btn-link btn-sm" :disabled="0 !== (${PagerState.MASK_RPC_DISABLE} & pager.state) || 0 === pager.size"
        @click.prevent="pager.store.pageNextOrLoad(0)">
      <b><i class="icon right-open"></i></b>
    </button>
    <button class="btn btn-link btn-sm" :disabled="0 !== (${PagerState.LOADING} & pager.state) || 0 === pager.size || pager.page_count === pager.page"
        @click.prevent="pager.store.repaint((pager.page = pager.page_count))">
      <i class="icon angle-double-right"></i>
    </button>
  </div>
</div>
`/**/

export const pager_msg = /**/`
<div :class="'ui msg status-' + (${PagerState.MASK_STATUS} & pager.state) + (!pager.msg ? ' d-none' : '')">
  <i class="close icon" @click.prevent="pager.msg = null"></i>
  <span v-text="pager.msg"></span>
</div>
`/**/

// ================================================== 
// icons

export function icon_timeago(wrapper_class?: string) {
    let attrs = !wrapper_class ? '' : ` class="${wrapper_class}"`
    return /**/`
<div${attrs}>
  <i class="icon clock"></i><small>{{ pojo['2'] | prettydate }}</small>
</div>
    `/**/
}

export function icon_update_ts(fk: string, wrapper_class?: string) {
    let attrs = !wrapper_class ? '' : ` class="${wrapper_class}"`
    return /**/`
<div${attrs}>
  <i class="icon pencil"></i><small>{{ pojo['${fk}'] | prettydate }}</small>
</div>
    `/**/
}

export function icon_toggle(fk: string, bit: number, icon_class: string,
        name?: string, wrapper_class?: string): string {
    if (bit < 32) throw 'Invalid bit: ' + bit
    let attrs = !wrapper_class ? '' : ` class="${wrapper_class}"`
    let suffix = !name ? '' : ` :title="pojo['${fk}'] ? '${name}' : 'Mark ${name}?'"`
    return /**/`
<div${attrs}>
  <i :class="'icon action ${icon_class}' + (!pojo['${fk}'] ? ' empty' : '')" @click.prevent="(pojo._.state ^= ${bit})"${suffix}></i>
  <i :class="!(${bit} & pojo._.state) ? 'd-none' : 'icon ok-circled'" @click.prevent="0 <= (pojo._.state ^= ${bit}) && $emit('toggle', '${fk}')"></i>
  <i :class="!(${bit} & pojo._.state) ? 'd-none' : 'icon cancel-circled'" @click.prevent="(pojo._.state ^= ${bit})"></i>
</div>
`/**/
}

export function icon_toggle_dd(fk: string, bit: number, icon_class: string, name?: string): string {
    if (bit < 32) throw 'Invalid bit: ' + bit
    let suffix = !name ? '' : ` :title="pojo['${fk}'] ? '${name}' : 'Mark ${name}?'"`
    return /**/`
<div class="dropdown icons">
  <a class="link dropdown-toggle s-circle" tabindex="0" @focus="(pojo._.state |= ${bit})">
    <i :class="'icon action ${icon_class}' + (!pojo['${fk}'] ? ' empty' : '')"${suffix}></i>
  </a>
  <ul :class="'menu transparent' + ((${bit} & pojo._.state) ? ' hover' : '')">
    <li class="menu-item">
      <button class="btn s-circle" @click="0 <= (pojo._.state ^= ${bit}) && $emit('toggle', '${fk}')"><i class="icon ok"></i></button>
    </li>
  </ul>
</div>
`/**/
}

export function icon_action(bit: number, icon_class: string,
        name?: string, wrapper_class?: string): string {
    if (bit < 32) throw 'Invalid bit: ' + bit
    let attrs = !wrapper_class ? '' : ` class="${wrapper_class}"`
    let suffix = !name ? '' : ` title="${name}"`
    return /**/`
<div${attrs}>
  <i class="icon action ${icon_class}" @click.prevent="(pojo._.state ^= ${bit})"${suffix}></i>
  <i :class="!(${bit} & pojo._.state) ? 'd-none' : 'icon ok-circled'" @click.prevent="0 <= (pojo._.state ^= ${bit}) && $emit('action', ${bit})"></i>
  <i :class="!(${bit} & pojo._.state) ? 'd-none' : 'icon cancel-circled'" @click.prevent="(pojo._.state ^= ${bit})"></i>
</div>
`/**/
}

export function icon_action_dd(bit: number, icon_class: string, name?: string): string {
    if (bit < 32) throw 'Invalid bit: ' + bit
    let suffix = !name ? '' : ` title="${name}"`
    return /**/`
<div class="dropdown icons">
  <a class="link dropdown-toggle s-circle" tabindex="0" @focus="(pojo._.state |= ${bit})">
    <i class="icon action ${icon_class}"${suffix}></i>
  </a>
  <ul :class="'menu transparent' + ((${bit} & pojo._.state) ? ' hover' : '')">
    <li class="menu-item">
      <button class="btn s-circle" @click="0 <= (pojo._.state ^= ${bit}) && $emit('action', ${bit})"><i class="icon ok"></i></button>
    </li>
  </ul>
</div>
`/**/
}

// ================================================== 
// list

export const list_attrs = /**/`
:class="'ui small divided selection list' + ((${PagerState.LOADING} & pager.state) ? ' loading loading-lg' : '')"
`/**/

// ================================================== 
// item

export const item_attrs = /**/`
v-defp:pager_item="pojo"
:class="!(${PojoListState.INCLUDED} & pojo._.lstate) ? 'd-none' : (!(${PojoListState.SELECTED} & pojo._.lstate) ? 'item' : 'item active')"
`/**/

export const item_msg = /**/`
<div :class="'ui msg status-' + (${PojoState.MASK_STATUS} & pojo._.state) + (!pojo._.msg ? ' d-none' : '')">
  <i class="close icon" @click.prevent="pojo._.msg = null"></i>
  <span v-text="pojo._.msg"></span>
</div>
`/**/

export const item_msg_dd = dropdown_msg('pojo._', PojoState.MASK_STATUS)

// icons

export const item_timeago = icon_timeago('content right floated timeago')

export function item_update_ts(fk: string) {
    return icon_update_ts(fk, 'content right floated timeago')
}

export function item_toggle(fk: string, bit: number, icon_class: string, name?: string): string {
    return icon_toggle(fk, bit, icon_class, name, 'content right floated')
}

export function item_toggle_dd(fk: string, bit: number, icon_class: string, name?: string): string {
    return /**/`
<div class="content right floated">
  ${icon_toggle_dd(fk, bit, icon_class, name)}
</div>
    `/**/
}

export function item_action(bit: number, icon_class: string, name?: string): string {
    return icon_action(bit, icon_class, name, 'content right floated')
}

export function item_action_dd(bit: number, icon_class: string, name?: string): string {
    return /**/`
<div class="content right floated">
  ${icon_action_dd(bit, icon_class, name)}
</div>
    `/**/
}

export const item_remove32 = item_action(32, 'trash empty', 'Remove')
export const item_remove32_dd = item_action_dd(32, 'trash empty', 'Remove')

// detail

export function item_detail(detail_id: string) {
    return /**/`
<div :class="!(${PojoState.UPDATE} & pojo._.state) ? 'd-none' : ''" v-append:${detail_id}="${PojoState.UPDATE} & pojo._.state"></div>
    `/**/
}

