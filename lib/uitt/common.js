var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import { html, h } from 'sinuous';
h;
import { $clearMsg } from '../handler';
export function msg(hs, mask) {
    var fn = $clearMsg.bind(hs);
    return html /**/(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n<div class=", ">\n  <i class=\"close icon\" onclick=", "></i>\n  <span>", "</span>\n</div>\n    "], [/**/ "\n<div class=", ">\n  <i class=\"close icon\" onclick=", "></i>\n  <span>", "</span>\n</div>\n    "])), function () { return 'ui msg status-' + (mask & hs.state) + (!hs.msg ? ' d-none' : ''); }, fn, function () { return hs.msg; }); /**/
}
var templateObject_1;
//# sourceMappingURL=common.js.map