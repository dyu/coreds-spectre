import { html, h } from 'sinuous';h;
import { HasState } from 'coreds/lib/types'
import { $clearMsg } from '../handler'

export function msg(hs: HasState, mask: number) {
    let fn = $clearMsg.bind(hs)
    
    return html/**/`
<div class=${() => 'ui msg status-' + (mask & hs.state) + (!hs.msg ? ' d-none' : '')}>
  <i class="close icon" onclick=${fn}></i>
  <span>${() => hs.msg}</span>
</div>
    `/**/
}
