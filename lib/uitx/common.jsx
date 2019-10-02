import { $clearMsg } from '../handler';
export function msg(hs, mask) {
    var fn = $clearMsg.bind(hs);
    return (<div class={('ui msg status-' + (mask & hs.state) + (!hs.msg ? ' d-none' : ''))}>
  <i class="close icon" onClick={fn}></i>
  <span>{(hs.msg)}</span>
</div>);
}
//# sourceMappingURL=common.jsx.map