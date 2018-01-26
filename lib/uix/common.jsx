import * as Surplus from 'surplus';
Surplus;
import { $any } from 'coreds/lib/util';
export function $apply(val, filter) {
    return val && filter(val);
}
export function $clearMsg(e) {
    e.preventDefault();
    this.msg = null;
}
export function msg(hs, mask) {
    var fn = $clearMsg.bind(hs);
    return (<div class={$any('ui msg status-' + (mask & hs.state) + (!hs.msg ? ' d-none' : ''))}>
  <i class="close icon" onClick={fn}></i>
  <span>{$any(hs.msg)}</span>
</div>);
}
//# sourceMappingURL=common.jsx.map