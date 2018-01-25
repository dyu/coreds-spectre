import * as Surplus from 'surplus'; Surplus;
import { Pager, PagerState, PojoState, PojoListState, ItemSO, HasState } from 'coreds/lib/types'
import { prettyDate } from 'coreds/lib/datetime_util'
import { $any, defp } from 'coreds/lib/util'
import { toggleClass } from 'coreds-ui/lib/dom_util'
import { attachOptsTo } from 'coreds-ui/lib/_pager'
import { parseOpts } from 'coreds-ui/lib/_lsearch'
import { $apply, msg } from './common'

export { form } from './form'

// ================================================== 
// toggles

export function $toggle0(e) {
    toggleClass(e.target, 'active')
}

export function $toggle1(e) {
    toggleClass(e.target.parentElement, 'active')
}

export function $toggle2(e) {
    toggleClass(e.target.parentElement.parentElement, 'active')
}

export function $toggle3(e) {
    toggleClass(e.target.parentElement.parentElement.parentElement, 'active')
}

// ================================================== 
// dropdown

export function dropdown_msg(hs: HasState, mask: number) {
    return (
<div class={$any('dropdown' + (hs.msg && ' active' || ''))}>
  <ul class="menu transparent">
    <li class="menu-item">
      ${msg(hs, mask)}
    </li>
  </ul>
</div>
    )
}

// ================================================== 
// lsearch

export function lsearch_disabled(pager: Pager) {
    return 0 !== (pager.state & PagerState.LOADING) || (!pager.size && !(pager.state & PagerState.LOCAL_SEARCH))
}

export function lsearch_input(pager: Pager, placeholder: string, fields: string[],
        fn?: Function, clazz?: string) {
    let cls = clazz === undefined ? 'underline' : clazz,
        el = <input type="text" class={cls} placeholder={placeholder} disabled={lsearch_disabled(pager)} />
    
    parseOpts(null, pager, fields, fn, null, el)
    
    return el
}

// ================================================== 
// pager

export function $pager<T>(pager: Pager, el: T): T {
    attachOptsTo(el, null, pager, {})
    return el
}

function $sort(this: Pager) {
    this['store'].repaint((this.state ^= PagerState.DESC))
}

function $reload(this: Pager) {
    this['store'].reload()
}

function $gotoFirst(this: Pager) {
    this['store'].repaint((this.page = 0))
}

function $gotoLast(this: Pager) {
    this['store'].repaint((this.page = this.page_count))
}

function $prevOrLoad(this: Pager) {
    this['store'].pagePrevOrLoad(0)
}

function $nextOrLoad(this: Pager) {
    this['store'].pageNextOrLoad(0)
}

export function pager_controls(pager: Pager) {
    let sort = $sort.bind(pager),
        reload = $reload.bind(pager),
        gotoFirst = $gotoFirst.bind(pager),
        gotoLast = $gotoLast.bind(pager),
        prevOrLoad = $prevOrLoad.bind(pager),
        nextOrLoad = $nextOrLoad.bind(pager)
    return (
<div class="btn-group links">
  <button class="btn btn-link btn-sm" onClick={sort}
      disabled={$any(0 !== (pager.state & PagerState.LOADING) || 2 > pager.size)}>
    <i class={$any((pager.state & PagerState.DESC) ? 'icon desc-yes' : 'icon desc-no')}></i>
  </button>
  <button class="btn btn-link btn-sm" onClick={reload}
      disabled={$any(0 !== (pager.state & PagerState.MASK_RPC_DISABLE) || 0 === pager.size)}>
    <i class="icon cw"></i>
  </button>
  <button class="btn btn-link btn-sm" onClick={gotoFirst}
      disabled={$any(0 !== (pager.state & PagerState.LOADING) || 0 === pager.page)}>
    <i class="icon angle-double-left"></i>
  </button>
  <button class="btn btn-link btn-sm" onClick={prevOrLoad}
      disabled={$any(0 !== (pager.state & PagerState.MASK_RPC_DISABLE))}>
    <i class="icon angle-left"></i>
  </button>
  <button class="btn btn-link btn-sm" onClick={nextOrLoad}
      disabled={$any(0 !== (pager.state & PagerState.MASK_RPC_DISABLE) || 0 === pager.size)}>
    <i class="icon angle-right"></i>
  </button>
  <button class="btn btn-link btn-sm" onClick={gotoLast}
      disabled={$any(0 !== (pager.state & PagerState.LOADING) || 0 === pager.size || pager.page_count === pager.page)}>
    <i class="icon angle-double-right"></i>
  </button>
  <button class={$any('btn btn-link btn-sm' + (!pager.size ? ' d-none' : ''))} disabled>
    {$any('' + pager.page_from + (pager.page_from === pager.page_to ? ' of ' : (' - ' + pager.page_to + ' of ')) + pager.size)}
  </button>
</div>
    )
}

export function pager_msg(pager: Pager) {
    return msg(pager, PagerState.MASK_STATUS)
}

// ================================================== 
// icons

export function icon_timeago(pojo: any, wrapper_class?: string) {
    return (
<div class={wrapper_class}>
  <i class="icon clock"></i>
  <small>{ $apply(pojo['2'], prettyDate) }</small>
</div>
    )
}

export function icon_update_ts(pojo: any, fk: string, wrapper_class?: string) {
    return (
<div class={wrapper_class}>
  <i class="icon pencil"></i>
  <small>{ $apply(pojo[fk], prettyDate) }</small>
</div>
    )
}

interface ToggleOpts {
    obj: ItemSO
    bit: number
    cb: Function
}

function $toggle(this: ToggleOpts, e) {
    this.obj.state ^= this.bit
}

function $trigger(this: ToggleOpts, e) {
    let state = this.obj.state
    this.obj.state = state ^ this.bit
    this.cb(this.bit)
}

export function icon_toggle(pojo: any, fk: string, bit: number, icon_class: string,
        cb: Function, name?: string, wrapper_class?: string) {
    if (bit < 32) throw 'Invalid bit: ' + bit
    let icon = `icon action ${icon_class}`,
        obj = pojo['_'],
        opts = { obj, bit, cb },
        fn = $toggle.bind(opts),
        trigger = $trigger.bind(opts),
        titleOn,
        titleOff
    if (name) {
        titleOn = `${name}`
        titleOff = `Mark ${name}?`
    }
    return (
<div class={wrapper_class}>
  <i class={$any(icon + (!pojo[fk] ? ' empty' : ''))} onClick={fn} title={$any(pojo[fk] ? titleOn : titleOff)}></i>
  <i class={$any('icon ok-circled' + (!(obj.state & bit) ? ' d-none' : ''))} onClick={trigger}></i>
  <i class={$any('icon cancel-circled' + (!(obj.state & bit) ? ' d-none' : ''))} onClick={fn}></i>
</div>
    )
}

export function icon_remove(pojo: any, fk: string, bit: number, icon_class: string, 
        cb?: Function, name?: string, wrapper_class?: string) {
    if (bit < 32) throw 'Invalid bit: ' + bit
    let icon = `icon action ${icon_class}`,
        obj = pojo['_'],
        opts = { obj, bit, cb },
        fn = $toggle.bind(opts),
        trigger = $trigger.bind(opts),
        title = name || 'Remove'
    return (
<div class={wrapper_class}>
  <i class={icon} onClick={fn} title={title}></i>
  <i class={$any('icon ok-circled' + (!(obj.state & bit) ? ' d-none' : ''))} onClick={trigger}></i>
  <i class={$any('icon cancel-circled' + (!(obj.state & bit) ? ' d-none' : ''))} onClick={fn}></i>
</div>
    )
}

// ================================================== 
// item

export function $item<T>(pojo: any, el: T): T {
    defp(el, 'pager_item', pojo)
    return el
}

export function item_class(pojo: any) {
    let pojo_ = pojo['_'] as ItemSO
    if (!(pojo_.lstate & PojoListState.INCLUDED)) {
        return 'd-none'
    } else if (!(pojo_.lstate & PojoListState.SELECTED)) {
        return 'item'
    } else {
        return 'item active'
    }
}

export function item_msg(pojo: any) {
    return msg(pojo['_'], PojoState.MASK_STATUS)
}

export function item_timeago(pojo: any) {
    return icon_timeago(pojo, 'content right floated timeago')
}

export function item_update_ts(pojo: any, fk: string) {
    return icon_update_ts(pojo, fk, 'content right floated')
}

export function item_toggle(pojo: any, fk: string, bit: number, icon_class: string,
        cb: Function, name?: string) {
    return icon_toggle(pojo, fk, bit, icon_class, cb, name, 'content right floated')
}

export function item_remove(pojo: any, fk: string, bit: number, icon_class: string, 
        cb: Function, name?: string) {
    return icon_remove(pojo, fk, bit, icon_class, cb, name, 'content right floated')
}

function $append_if(cond: boolean, el: any, parent: any): boolean {
    cond && parent.appendChild(el)
    return cond
}

export function item_detail(pojo: any, detail_id: string) {
    let pojo_ = pojo['_'],
        parent,
        el
    return (
<div ref={parent}
    class={$append_if(!!(pojo_.state & PojoState.UPDATE), (el || (el = document.getElementById(detail_id))), parent) ? '' : 'd-none'}>
</div>
    )
}
