import { Pager, PagerState, PojoState, PojoListState, ItemSO, HasState } from 'coreds/lib/types'
import { prettyDate } from 'coreds/lib/datetime_util'
import { defp } from 'coreds/lib/util'
import { toggleClass, removeClass } from 'coreds-ui/lib/dom_util'
import { attachOptsTo } from 'coreds-ui/lib/_pager'
import { parseOpts } from 'coreds-ui/lib/_lsearch'
import { msg } from './common'
import { $apply, $append_if } from '../util'

export { form } from './form'
export * from '../handler'

// ================================================== 
// dropdown

export function dropdown_msg(hs: HasState, mask: number) {
    return (
<div class={( 'dropdown' + (hs.msg && ' active' || '') )}>
  <ul class="menu transparent">
    <li class="menu-item">
      { msg(hs, mask) }
    </li>
  </ul>
</div>
    )
}

// ================================================== 
// lsearch

export function lsearch_disabled(pager: Pager) {
    return 0 !== (PagerState.LOADING & pager.state) || (!pager.size && !(PagerState.LOCAL_SEARCH & pager.state))
}

export function lsearch_input(pager: Pager, placeholder: string, fields: string[],
        fn?: Function, clazz?: string) {
    let cls = clazz === undefined ? 'underline' : clazz,
        el = <input type="text" class={cls} placeholder={placeholder} disabled={( lsearch_disabled(pager) )} />
    
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
      disabled={( 0 !== (PagerState.LOADING & pager.state) || 2 > pager.size )}>
    <i class={( (PagerState.DESC & pager.state) ? 'icon desc-yes' : 'icon desc-no' )}></i>
  </button>
  <button class="btn btn-link btn-sm" onClick={reload}
      disabled={( 0 !== (PagerState.MASK_RPC_DISABLE & pager.state) || 0 === pager.size )}>
    <i class="icon cw"></i>
  </button>
  <button class="btn btn-link btn-sm" onClick={gotoFirst}
      disabled={( 0 !== (PagerState.LOADING & pager.state) || 0 === pager.page )}>
    <i class="icon angle-double-left"></i>
  </button>
  <button class="btn btn-link btn-sm" onClick={prevOrLoad}
      disabled={( 0 !== (PagerState.MASK_RPC_DISABLE & pager.state) )}>
    <i class="icon angle-left"></i>
  </button>
  <button class="btn btn-link btn-sm" onClick={nextOrLoad}
      disabled={( 0 !== (PagerState.MASK_RPC_DISABLE & pager.state) || 0 === pager.size )}>
    <i class="icon angle-right"></i>
  </button>
  <button class="btn btn-link btn-sm" onClick={gotoLast}
      disabled={( 0 !== (PagerState.LOADING & pager.state) || 0 === pager.size || pager.page_count === pager.page )}>
    <i class="icon angle-double-right"></i>
  </button>
  <button class={( !pager.size ? 'd-none' : 'btn btn-link btn-sm' )} disabled={true}>
    {( '' + pager.page_from + (pager.page_from === pager.page_to ? ' of ' : (' - ' + pager.page_to + ' of ')) + pager.size )}
  </button>
</div>
    )
}

export function pager_controls_nav(pager: Pager) {
    let sort = $sort.bind(pager),
        reload = $reload.bind(pager),
        gotoFirst = $gotoFirst.bind(pager),
        gotoLast = $gotoLast.bind(pager),
        prevOrLoad = $prevOrLoad.bind(pager),
        nextOrLoad = $nextOrLoad.bind(pager)
    return (
<div class="navbar">
  <div class="navbar-section links">
    <button class={( !pager.size ? 'd-none' : 'btn btn-link btn-sm info' )} disabled={true}>
      {( '' + pager.page_from + (pager.page_from === pager.page_to ? ' of ' : (' - ' + pager.page_to + ' of ')) + pager.size )}
    </button>
  </div>
  <div class="navbar-center links">
    <button class="btn btn-link btn-sm"
        onClick={sort}
        disabled={( 0 !== (PagerState.LOADING & pager.state) || 2 > pager.size )}>
      <i class={( (PagerState.DESC & pager.state) ? 'icon desc-yes' : 'icon desc-no' )}></i>
    </button>
    &nbsp;
    <button class="btn btn-link btn-sm"
        onClick={reload}
        disabled={( 0 !== (PagerState.MASK_RPC_DISABLE & pager.state) || 0 === pager.size )}>
      <i class="icon cw"></i>
    </button>
  </div>
  <div class="navbar-section links">
    <button class="btn btn-link btn-sm"
        onClick={gotoFirst}
        disabled={( 0 !== (PagerState.LOADING & pager.state) || 0 === pager.page )}>
      <i class="icon angle-double-left"></i>
    </button>
    <button class="btn btn-link btn-sm"
        onClick={prevOrLoad}
        disabled={( 0 !== (PagerState.MASK_RPC_DISABLE & pager.state) )}>
      <i class="icon left-open"></i>
    </button>
    &nbsp;
    <button class="btn btn-link btn-sm"
        onClick={nextOrLoad}
        disabled={( 0 !== (PagerState.MASK_RPC_DISABLE & pager.state) || 0 === pager.size )}>
      <i class="icon right-open"></i>
    </button>
    <button class="btn btn-link btn-sm"
        onClick={gotoLast}
        disabled={( 0 !== (PagerState.LOADING & pager.state) || 0 === pager.size || pager.page_count === pager.page )}>
      <i class="icon angle-double-right"></i>
    </button>
  </div>
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
  <small>{( $apply(pojo['2'], prettyDate) )}</small>
</div>
    )
}

export function icon_update_ts(pojo: any, fk: string, wrapper_class?: string) {
    return (
<div class={wrapper_class}>
  <i class="icon pencil"></i>
  <small>{( $apply(pojo[fk], prettyDate) )}</small>
</div>
    )
}

interface ToggleOpts {
    hs: HasState
    bit: number
    cb: Function
}

function $toggle(this: ToggleOpts, e) {
    this.hs.state ^= this.bit
}

function $set(this: ToggleOpts, e) {
    this.hs.state |= this.bit
}

function $trigger(this: ToggleOpts, e) {
    this.hs.state ^= this.bit
    this.cb(this.bit)
}

export function icon_toggle(pojo: any, fk: string, bit: number, icon_class: string,
        cb: Function, name?: string, wrapper_class?: string) {
    if (bit < 32) throw 'Invalid bit: ' + bit
    let icon = `icon action ${icon_class}`,
        hs = pojo['_'] as HasState,
        opts = { hs, bit, cb } as ToggleOpts,
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
  <i class={( icon + (!pojo[fk] ? ' empty' : '') )} onClick={fn} title={( pojo[fk] ? titleOn : titleOff )}></i>
  <i class={( !(bit & hs.state) ? 'd-none' : 'icon ok-circled' )} onClick={trigger}></i>
  <i class={( !(bit & hs.state) ? 'd-none' : 'icon cancel-circled' )} onClick={fn}></i>
</div>
    )
}

export function icon_toggle_dd(pojo: any, fk: string, bit: number, icon_class: string,
        cb: Function, name?: string) {
    if (bit < 32) throw 'Invalid bit: ' + bit
    let icon = `icon action ${icon_class}`,
        hs = pojo['_'] as HasState,
        opts = { hs, bit, cb } as ToggleOpts,
        fn = $set.bind(opts),
        trigger = $trigger.bind(opts),
        titleOn,
        titleOff
    if (name) {
        titleOn = `${name}`
        titleOff = `Mark ${name}?`
    }
    return (
<div class="dropdown icons">
  <a class="link dropdown-toggle s-circle" tabIndex={0} onFocus={fn}>
    <i class={( icon + (!pojo[fk] ? ' empty' : '') )} title={( pojo[fk] ? titleOn : titleOff )}></i>
  </a>
  <ul class={( 'menu transparent' + ((bit & hs.state) ? ' hover' : '') )}>
    <li class="menu-item">
      <button class="btn s-circle" onClick={trigger}><i class="icon ok"></i></button>
    </li>
  </ul>
</div>
    )
}

export function icon_action(pojo: any, bit: number, icon_class: string, 
        cb: Function, name?: string, wrapper_class?: string) {
    if (bit < 32) throw 'Invalid bit: ' + bit
    let icon = `icon action ${icon_class}`,
        hs = pojo['_'] as HasState,
        opts = { hs, bit, cb } as ToggleOpts,
        fn = $toggle.bind(opts),
        trigger = $trigger.bind(opts)
    return (
<div class={wrapper_class}>
  <i class={icon} onClick={fn} title={name}></i>
  <i class={( !(bit & hs.state) ? 'd-none' : 'icon ok-circled' )} onClick={trigger}></i>
  <i class={( !(bit & hs.state) ? 'd-none' : 'icon cancel-circled' )} onClick={fn}></i>
</div>
    )
}

export function icon_action_dd(pojo: any, bit: number, icon_class: string,
        cb: Function, name?: string) {
    if (bit < 32) throw 'Invalid bit: ' + bit
    let icon = `icon action ${icon_class}`,
        hs = pojo['_'] as HasState,
        opts = { hs, bit, cb } as ToggleOpts,
        fn = $set.bind(opts),
        trigger = $trigger.bind(opts)
    return (
<div class="dropdown icons">
  <a class="link dropdown-toggle s-circle" tabIndex={0} onFocus={fn}>
    <i class={icon} title={name}></i>
  </a>
  <ul class={( 'menu transparent' + ((bit & hs.state) ? ' hover' : '') )}>
    <li class={( !(bit & hs.state) ? 'd-none' : 'menu-item' )}>
      <button class="btn s-circle" onClick={trigger}><i class="icon ok"></i></button>
    </li>
  </ul>
</div>
    )
}

// ================================================== 
// list

export function list_class(pager: Pager) {
    if ((PagerState.LOADING & pager.state)) {
        return 'ui small divided selection list loading loading-lg'
    } else {
        return 'ui small divided selection list'
    }
}

// ================================================== 
// item

export function $item<T>(pojo: any, el: T): T {
    defp(el, 'pager_item', pojo)
    return el
}

export function item_class(pojo: any) {
    let pojo_ = pojo['_'] as ItemSO,
        lstate = pojo_.lstate
    if (!(PojoListState.INCLUDED & lstate)) {
        return 'd-none'
    } else if (!(PojoListState.SELECTED & lstate)) {
        return 'item'
    } else {
        return 'item active'
    }
}

export function item_msg(pojo: any) {
    return msg(pojo['_'], PojoState.MASK_STATUS)
}

export function item_msg_dd(pojo: any) {
    return dropdown_msg(pojo['_'], PojoState.MASK_STATUS)
}

// icons

export function item_timeago(pojo: any) {
    return icon_timeago(pojo, 'content right floated timeago')
}

export function item_update_ts(pojo: any, fk: string) {
    return icon_update_ts(pojo, fk, 'content right floated timeago')
}

export function item_toggle(pojo: any, fk: string, bit: number, icon_class: string,
        cb: Function, name?: string) {
    return icon_toggle(pojo, fk, bit, icon_class, cb, name, 'content right floated')
}

export function item_toggle_dd(pojo: any, fk: string, bit: number, icon_class: string,
        cb: Function, name?: string) {
    return (
<div class="content right floated">
  {icon_toggle_dd(pojo, fk, bit, icon_class, cb, name)}
</div>
    )
}

export function item_action(pojo: any, bit: number, icon_class: string, 
        cb: Function, name?: string) {
    return icon_action(pojo, bit, icon_class, cb, name, 'content right floated')
}

export function item_action_dd(pojo: any, bit: number, icon_class: string, 
        cb: Function, name?: string) {
    return (
<div class="content right floated">
  {icon_action_dd(pojo, bit, icon_class, cb, name)}
</div>
    )
}

export function item_remove32(pojo: any, cb: Function) {
    return item_action(pojo, 32, 'trash empty', cb, 'Remove')
}

export function item_remove32_dd(pojo: any, cb: Function) {
    return item_action_dd(pojo, 32, 'trash empty', cb, 'Remove')
}



// detail

export function item_detail(pojo: any, detail_id: string) {
    let pojo_ = pojo['_'] as HasState,
        parent,
        el
    return (
<div ref={parent}
    class={( $append_if(!!(PojoState.UPDATE & pojo_.state), (el || (el = document.getElementById(detail_id))), parent) ? '' : 'd-none' )}>
</div>
    )
}
