import { PagerState, PojoState, PojoListState } from 'coreds/lib/types'
export { ContentSlot } from '../util'
export { form } from './form'
export { qform } from './qform'

// ================================================== 
// dropdown

export function dropdown_msg(hs: string) {
    return /**/`
<div :class="'dropdown' + (!${hs}.msg ? '' : ' active')">
  <ul class="menu transparent" v-show="${hs}.msg">
    <li class="menu-item">
      <div :class="'ui msg status-' + (${hs}.state & ${PojoState.MASK_STATUS})">
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
:disabled="0 !== (pager.state & ${PagerState.LOADING}) || (!pager.size && !(pager.state & ${PagerState.LOCAL_SEARCH}))"
v-lsearch="{ pager: pager, fields: ['${fk}'] }"
    `/**/
}

// ================================================== 
// suggest

export const suggest_controls = /**/`
<div class="btn-group links">
  <button class="btn btn-link btn-sm" :disabled="0 !== (pager.state & ${PagerState.LOADING}) || 0 === pager.page"
      @click.prevent="pager.store.repaint((pager.page = 0))">
    <i class="icon angle-double-left"></i>
  </button>
  <button class="btn btn-link btn-sm" :disabled="0 !== (pager.state & ${PagerState.MASK_RPC_DISABLE})"
      @click.prevent="pager.store.pagePrevOrLoad(0)">
    <b><i class="icon angle-left"></i></b>
  </button>
  <button class="btn btn-link btn-sm" :disabled="0 !== (pager.state & ${PagerState.MASK_RPC_DISABLE}) || 0 === pager.size"
      @click.prevent="pager.store.pageNextOrLoad(0)">
    <b><i class="icon angle-right"></i></b>
  </button>
  <button class="btn btn-link btn-sm" :disabled="0 !== (pager.state & ${PagerState.LOADING}) || 0 === pager.size || pager.page_count === pager.page"
      @click.prevent="pager.store.repaint((pager.page = pager.page_count))">
    <i class="icon angle-double-right"></i>
  </button>
  <button class="btn btn-link btn-sm" v-show="pager.size" disabled>
    {{ pager.page_from }}{{ pager.page_from === pager.page_to ? ' of ' : (' - ' + pager.page_to + ' of ') }}{{ pager.size }}
  </button>
</div>
`/**/

// ================================================== 
// pager

export const pager_controls = /**/`
<div class="btn-group links">
  <button class="btn btn-link btn-sm" :disabled="0 !== (pager.state & ${PagerState.LOADING}) || 2 > pager.size"
      @click.prevent="pager.store.repaint((pager.state ^= ${PagerState.DESC}))">
    <i :class="(pager.state & ${PagerState.DESC}) ? 'icon desc-yes' : 'icon desc-no'"></i>
  </button>
  <button class="btn btn-link btn-sm" :disabled="0 !== (pager.state & ${PagerState.MASK_RPC_DISABLE}) || 0 === pager.size"
      @click.prevent="pager.store.reload()">
    <i class="icon cw"></i>
  </button>
  <button class="btn btn-link btn-sm" :disabled="0 !== (pager.state & ${PagerState.LOADING}) || 0 === pager.page"
      @click.prevent="pager.store.repaint((pager.page = 0))">
    <i class="icon angle-double-left"></i>
  </button>
  <button class="btn btn-link btn-sm" :disabled="0 !== (pager.state & ${PagerState.MASK_RPC_DISABLE})"
      @click.prevent="pager.store.pagePrevOrLoad(0)">
    <b><i class="icon angle-left"></i></b>
  </button>
  <button class="btn btn-link btn-sm" :disabled="0 !== (pager.state & ${PagerState.MASK_RPC_DISABLE}) || 0 === pager.size"
      @click.prevent="pager.store.pageNextOrLoad(0)">
    <b><i class="icon angle-right"></i></b>
  </button>
  <button class="btn btn-link btn-sm" :disabled="0 !== (pager.state & ${PagerState.LOADING}) || 0 === pager.size || pager.page_count === pager.page"
      @click.prevent="pager.store.repaint((pager.page = pager.page_count))">
    <i class="icon angle-double-right"></i>
  </button>
  <button class="btn btn-link btn-sm" v-show="pager.size" disabled>
    {{ pager.page_from }}{{ pager.page_from === pager.page_to ? ' of ' : (' - ' + pager.page_to + ' of ') }}{{ pager.size }}
  </button>
</div>
`/**/

export const pager_msg = /**/`
<div :class="'ui msg status-' + (pager.state & ${PagerState.MASK_STATUS}) + (!pager.msg ? ' d-none' : '')">
  <i class="close icon" @click.prevent="pager.msg = null"></i>
  <span v-text="pager.msg"></span>
</div>
`/**/

// ================================================== 
// icons

export const icon_timeago = /**/`
<i class="icon clock"></i><small>{{ pojo['2'] | prettydate }}</small>
`/**/

export function icon_update_ts(fk: string) {
    return /**/`
<i class="icon pencil"></i><small>{{ pojo['${fk}'] | prettydate }}</small>
    `/**/
}

export function icon_toggle(fk: string, bit: number, icon_class: string, name?: string): string {
    if (bit < 32) throw 'Invalid bit: ' + bit
    let suffix = !name ? '' : ` :title="pojo['${fk}'] ? '${name}' : 'Mark ${name}?'"`
    return /**/`
<i :class="'icon action ${icon_class}' + (!pojo['${fk}'] ? ' empty' : '')" @click.prevent="(pojo._.state ^= ${bit})"${suffix}></i>
<i class="icon ok-circled" v-show="(pojo._.state & ${bit})" @click.prevent="0 <= (pojo._.state ^= ${bit}) && $emit('toggle', '${fk}')"></i>
<i class="icon cancel-circled" v-show="(pojo._.state & ${bit})" @click.prevent="(pojo._.state ^= ${bit})"></i>
`/**/
}

export function icon_remove(bit: number, icon_class?: string, name?: string): string {
    if (bit < 32) throw 'Invalid bit: ' + bit
    return /**/`
<i class="icon action ${icon_class || 'trash empty'}" @click.prevent="(pojo._.state ^= ${bit})" title="${name || 'Remove'}?'"></i>
<i class="icon ok-circled" v-show="(pojo._.state & ${bit})" @click.prevent="0 <= (pojo._.state ^= ${bit}) && $emit('remove', pojo)"></i>
<i class="icon cancel-circled" v-show="(pojo._.state & ${bit})" @click.prevent="(pojo._.state ^= ${bit})"></i>
`/**/
}

export const icon_remove_bit32 = icon_remove(32)

// ================================================== 
// item

export const item_attrs = /**/`
v-defp:pager_item="pojo" v-show="(pojo._.lstate & ${PojoListState.INCLUDED})"
:class="(pojo._.lstate & ${PojoListState.SELECTED}) ? 'item active' : 'item'"
`/**/

export const item_msg = /**/`
<div style="clear:both"></div>
<div :class="'ui msg status-' + (pojo._.state & ${PojoState.MASK_STATUS}) + (!pojo._.msg ? ' d-none' : '')">
  <i class="close icon" @click.prevent="pojo._.msg = null"></i>
  <span v-text="pojo._.msg"></span>
</div>
`/**/

export function item_toggle(fk: string, bit: number, icon_class: string, name?: string): string {
    return /**/`
<div class="content right floated">
  ${icon_toggle(fk, bit, icon_class, name)}
</div>
`/**/
}

export const item_timeago = /**/`
<div class="content right floated timeago">
  ${icon_timeago}
</div>
`/**/

