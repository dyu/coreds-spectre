import * as Surplus from 'surplus'; Surplus;
import { HasState } from 'coreds/lib/types'
import { $clearMsg } from '../handler'

export function msg(hs: HasState, mask: number) {
    let fn = $clearMsg.bind(hs)
    return (
<div class={( 'ui msg status-' + (mask & hs.state) + (!hs.msg ? ' d-none' : '') )}>
  <i class="close icon" onClick={fn}></i>
  <span>{( hs.msg )}</span>
</div>
    )
}
