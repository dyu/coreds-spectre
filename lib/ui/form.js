function msg_show(pojo) {
    return " && (" + pojo + "._.state & " + 7 /* MASK_STATUS */ + ")";
}
export function msg(pojo, update) {
    return "\n<div :class=\"'ui msg status-' + (" + pojo + "._.state & " + 7 /* MASK_STATUS */ + ")\"\n    v-show=\"" + pojo + "._.msg" + (update && msg_show(pojo) || '') + "\">\n  <i class=\"icon close\" @click.prevent=\"" + pojo + "._.msg = null\"></i>\n  <span v-text=\"" + pojo + "._.msg\"></span>\n</div>\n"; /**/
}
export function toggle32(pojo) {
    return " v-show=\"(" + pojo + "._.state & 32)\"";
}
export function form(pojo, $d, ffid, content, content_slot, formFlags) {
    var update = ffid === null, flags = formFlags || 0, placeholder = 0 !== (flags & 1 /* PLACEHOLDER */), horizontal = 0 !== (flags & 4 /* HORIZONTAL */), class_prefix = "ui form" + (horizontal && ' form-horizontal' || '') + (placeholder && ' placeholder' || '') + " status-";
    if (content && content_slot === undefined)
        content_slot = 0 /* TOP */;
    return "\n<form v-clear=\"" + pojo + "._\" :class=\"'" + class_prefix + "' + (" + pojo + "._.state & " + 7 /* MASK_STATUS */ + ")\"" + ((flags & 32 /* TOGGLE_FLAG32 */) && toggle32(pojo) || '') + ">\n  " + (content_slot === 0 /* TOP */ && content || '') + "\n  " + body(pojo, $d, update, { pojo: pojo, ffid: ffid, flags: flags }) + "\n  " + (content_slot === 1 /* BOTTOM */ && content || '') + "\n  " + msg(pojo, update) + "\n  <button type=\"submit\" class=\"btn btn-" + (placeholder ? 'primary' : 'outlined') + "\" @click.prevent=\"" + pojo + "$$\">\n    " + (update ? 'Update' : 'Submit') + "\n  </button>\n</form>\n"; /**/
}
function body(pojo, $d, update, root) {
    var out = '', array = $d.$fdf;
    if ($d.$fmf) {
        for (var _i = 0, _a = $d.$fmf; _i < _a.length; _i++) {
            var fk = _a[_i];
            out += body(pojo + "['" + fk + "']", $d[fk].d_fn(), update, root);
        }
    }
    if (!array)
        return out;
    var mask = update ? 13 : 3, ffid = root.ffid;
    if (ffid && array.length)
        root.ffid = null;
    for (var i = 0, len = array.length; i < len; i++) {
        var fk = array[i], fd = $d[fk];
        if (!fd.t || (fd.a & mask))
            continue;
        out += "<div " + field_class(pojo, fd) + ">" + field_switch(pojo, fd, update, root, i, ffid) + "</div>";
        ffid = null;
    }
    return out;
}
function field_class(pojo, fd) {
    var base = fd.m === 2 ? 'form-group required' : 'form-group';
    if (fd.t === 1 /* BOOL */ || fd.t === 16 /* ENUM */)
        return "class=\"" + base + "\"";
    else
        return ":class=\"'" + base + "' + ((" + pojo + "._.vfbs & " + (1 << (fd._ - 1)) + ") && " + pojo + "._['" + fd._ + "'] && ' has-error' || '')\"";
}
function field_switch(pojo, fd, update, root, idx, ffid) {
    var buf = '', t = fd.t;
    if (t !== 1 /* BOOL */ && 0 === (root.flags & 1 /* PLACEHOLDER */))
        buf += "<label class=\"form-label\">" + fd.$n + (fd.m === 2 && ' *' || '') + "</label>";
    if (t === 1 /* BOOL */)
        buf += field_bool(pojo, fd, update, root, ffid);
    else if (t === 16 /* ENUM */)
        buf += field_enum(pojo, fd, update, root, ffid);
    else if (t !== 3 /* STRING */)
        buf += field_num(pojo, fd, update, root, ffid);
    else if (fd.ta)
        buf += field_textarea(pojo, fd, update, root, ffid);
    else
        buf += field_default(pojo, fd, update, root, ffid);
    return buf;
}
function ffid_attr(ffid, flags) {
    return " ref=\"" + ffid + "\"" + ((flags & 2 /* REF_AND_ID */) && (' id="' + ffid + '"') || '');
}
function help_text(str) {
    return "<p class=\"form-input-hint\">" + str + "</p>"; /**/
}
function placeholder(fd) {
    return " placeholder=\"" + fd.$n + (fd.m === 2 && ' *' || '') + "\"";
}
function field_bool(pojo, fd, update, root, ffid) {
    return "\n<label class=\"form-switch\">\n  <input" + (ffid && ffid_attr(ffid, root.flags) || '') + " type=\"checkbox\" v-sval:" + fd.t + "=\"" + pojo + "['" + fd._ + "']\"\n      @change=\"change($event, '" + fd._ + "', " + pojo + ", " + update + ", " + root.pojo + ")\" />\n  <i class=\"form-icon\"></i> " + fd.$n + "\n</label>\n"; /**/
}
export var option_empty = '<option value=""></option>';
function enum_option(fd) {
    return "<option value=\"\">" + fd.$n + (fd.m === 2 && ' *' || '') + "</option>";
}
export function enum_options(arrayValue, arrayDisplay) {
    var out = '';
    for (var i = 0, len = arrayValue.length; i < len; i++) {
        out += "<option value=\"" + arrayValue[i] + "\">" + arrayDisplay[i] + "</option>";
    }
    return out;
}
function field_enum(pojo, fd, update, root, ffid) {
    return "\n<select" + (ffid && ffid_attr(ffid, root.flags) || '') + " v-sval:" + fd.t + "=\"" + pojo + "['" + fd._ + "']\"\n    class=\"form-select" + (!update && ' resettable' || '') + "\"\n    @change=\"change($event, '" + fd._ + "', " + pojo + ", " + update + ", " + root.pojo + ")\">\n    " + (update ? '' : ((root.flags & 1 /* PLACEHOLDER */) && enum_option(fd) || '')) + "\n    " + enum_options(fd.v_fn(), fd.$v_fn()) + "\n</select>\n"; /**/
}
export function dpicker(pojo, field, update) {
    return " v-dpicker:" + (32 /* TRIGGER_CHANGE_ON_SELECT */ | (update ? 16 /* UPDATE */ : 0)) + "=\"{ pojo: " + pojo + ", field: '" + field + "' }\"";
}
function field_num(pojo, fd, update, root, ffid) {
    return "\n<input" + (ffid && ffid_attr(ffid, root.flags) || '') + " type=\"text\"" + (fd.o === 2 && dpicker(pojo, fd._, update) || '') + "\n    " + ((root.flags & 1 /* PLACEHOLDER */) && placeholder(fd) || '') + "\n    v-sval:" + (!fd.o ? fd.t : (fd.t + ',' + fd.o)) + "=\"" + pojo + "['" + fd._ + "']\"\n    @change=\"change($event, '" + fd._ + "', " + pojo + ", " + update + ", " + root.pojo + ")\" />\n<div class=\"form-input-hint\" v-text=\"!(" + pojo + "._.vfbs & " + (1 << (fd._ - 1)) + ") ? '' : " + pojo + "._['" + fd._ + "']\"></div>\n" + (fd.$h && help_text(fd.$h) || '') + "\n"; /**/
}
function field_textarea(pojo, fd, update, root, ffid) {
    return "\n<textarea" + (ffid && ffid_attr(ffid, root.flags) || '') + " v-sval:" + fd.t + "=\"" + pojo + "['" + fd._ + "']\"\n    " + ((root.flags & 1 /* PLACEHOLDER */) && placeholder(fd) || '') + "\n    @change=\"change($event, '" + fd._ + "', " + pojo + ", " + update + ", " + root.pojo + ")\"></textarea>\n<div class=\"form-input-hint\" v-text=\"!(" + pojo + "._.vfbs & " + (1 << (fd._ - 1)) + ") ? '' : " + pojo + "._['" + fd._ + "']\"></div>\n" + (fd.$h && help_text(fd.$h) || '') + "\n"; /**/
}
function field_default(pojo, fd, update, root, ffid) {
    return "\n<input" + (ffid && ffid_attr(ffid, root.flags) || '') + " type=\"" + (fd.pw ? 'password' : 'text') + "\"\n    " + ((root.flags & 1 /* PLACEHOLDER */) && placeholder(fd) || '') + "\n    v-sval:" + fd.t + "=\"" + pojo + "['" + fd._ + "']\"\n    @change=\"change($event, '" + fd._ + "', " + pojo + ", " + update + ", " + root.pojo + ")\" />\n<div class=\"form-input-hint\" v-text=\"!(" + pojo + "._.vfbs & " + (1 << (fd._ - 1)) + ") ? '' : " + pojo + "._['" + fd._ + "']\"></div>\n" + (fd.$h && help_text(fd.$h) || '') + "\n"; /**/
}
//# sourceMappingURL=form.js.map