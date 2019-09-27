import * as Surplus from 'surplus'; Surplus;
import { HasState } from 'coreds/lib/types'
import { $any } from 'coreds/lib/util'
import { $clearMsg } from '../handler'

export function msg(hs: HasState, mask: number) {
    let fn = $clearMsg.bind(hs)
    return (
<div class={$any('ui msg status-' + (mask & hs.state) + (!hs.msg ? ' d-none' : ''))}>
  <i class="close icon" onClick={fn}></i>
  <span>{$any(hs.msg)}</span>
</div>
    )
}
