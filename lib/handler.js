import { toggleClass, removeClass } from 'coreds-ui/lib/dom_util';
// ================================================== 
// hide/show
export function $hide0_on_esc(e) {
    e.which === 27 && removeClass(e.currentTarget, 'active');
}
export function $hide1_on_esc(e) {
    e.which === 27 && removeClass(e.currentTarget.parentElement, 'active');
}
// ================================================== 
// msg
export function $clearMsg(e) {
    e.preventDefault();
    this.msg = null;
}
// ================================================== 
// toggles
function focus_ff(el, ffid) {
    (ffid = el.dataset.ffid) && (el = document.getElementById(ffid)) && el.focus();
}
export function $toggle0(e) {
    toggleClass(e.currentTarget, 'active') &&
        focus_ff(e.currentTarget);
}
export function $toggle1(e) {
    toggleClass(e.currentTarget.parentElement, 'active') &&
        focus_ff(e.currentTarget);
}
export function $toggle2(e) {
    toggleClass(e.currentTarget.parentElement.parentElement, 'active') &&
        focus_ff(e.currentTarget);
}
export function $toggle3(e) {
    toggleClass(e.currentTarget.parentElement.parentElement.parentElement, 'active') &&
        focus_ff(e.currentTarget);
}
// ================================================== 
// icon toggles
export function $itoggle0(e) {
    'I' === e.target.tagName &&
        toggleClass(e.currentTarget, 'active') &&
        focus_ff(e.currentTarget);
}
export function $itoggle1(e) {
    'I' === e.target.tagName &&
        toggleClass(e.currentTarget.parentElement, 'active') &&
        focus_ff(e.currentTarget);
}
export function $itoggle2(e) {
    'I' === e.target.tagName &&
        toggleClass(e.currentTarget.parentElement.parentElement, 'active') &&
        focus_ff(e.currentTarget);
}
export function $itoggle3(e) {
    'I' === e.target.tagName &&
        toggleClass(e.currentTarget.parentElement.parentElement.parentElement, 'active') &&
        focus_ff(e.currentTarget);
}
//# sourceMappingURL=handler.js.map