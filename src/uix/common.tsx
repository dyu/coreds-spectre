import * as Surplus from 'surplus'; Surplus;
import { HasState } from 'coreds/lib/types'
import { $any } from 'coreds/lib/util'

export function $apply(val, filter) {
    return val && filter(val)
}

export function $clearMsg(this: any, e) {
    e.preventDefault()
    this.msg = null
}

export function msg(hs: HasState, mask: number) {
    let fn = $clearMsg.bind(hs)
    return (
<div class={$any('ui msg status-' + (hs.state & mask) + (!hs.msg ? ' d-none' : ''))}>
  <i class="close icon" onClick={fn}></i>
  <span>{$any(hs.msg)}</span>
</div>
    )
}
