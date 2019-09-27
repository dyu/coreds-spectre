import { html, h } from 'sinuous';
h;
import { $clearMsg } from '../handler';
export function msg(hs, mask) {
    var fn = $clearMsg.bind(hs);
    return (_a = ["\n<div class=", ">\n  <i class=\"close icon\" onclick=", "></i>\n  <span>", "</span>\n</div>\n    "], _a.raw = [/**/ "\n<div class=", ">\n  <i class=\"close icon\" onclick=", "></i>\n  <span>", "</span>\n</div>\n    "], html /**/(_a, function () { return 'ui msg status-' + (mask & hs.state) + (!hs.msg ? ' d-none' : ''); }, fn, function () { return hs.msg; })); /**/
    var _a;
}
//# sourceMappingURL=common.js.map