import { option_empty, options, enum_options } from '../util';
import { dpicker } from './form';
function field_enum(pojo, fd, display) {
    return "\n<div class=\"fluid picker\">\n  <select :disable=\"" + pojo + ".disable_\" v-sval:" + fd.t + "=\"" + pojo + "['" + fd._ + "']\"\n      @change=\"qform.change($event, '" + fd._ + "', " + pojo + ", false, null, 0, " + pojo + "$$)\">\n    <option value=\"\">" + display + "</option>" + enum_options(fd) + "\n  </select>\n</div>\n"; /**/
}
function field_bool(pojo, fd, display) {
    return "\n<div class=\"fluid picker\">\n<select v-sval:" + fd.t + "=\"" + pojo + "['" + fd._ + "']\" :disable=\"" + pojo + ".disable_\" \n    :class=\"'icons' + (!" + pojo + "['" + fd._ + "'] ? '' : ' active') + (!" + pojo + ".disable_ ? '' : ' disabled')\"\n    @change=\"qform.change($event, '" + fd._ + "', " + pojo + ", false, null, 0, " + pojo + "$$)\">\n  <option value=\"\">" + display + ":</option>\n  <option value=\"1\">" + fd.$n + " &#xe9fc;</option>\n  <option value=\"0\">" + fd.$n + " &#xea00;</option>\n</select>\n</div>\n"; /**/
}
function field_suggest(pojo, fd, display) {
    return "\n<div class=\"ui input\">\n  <input type=\"text\" :disabled=\"" + pojo + ".disable_\" placeholder=\"" + display + "\"\n      :class=\"!" + pojo + ".disable_ ? '' : 'disabled'\"\n      v-suggest:" + (32 /* CBFN_AFTER_SET */ | 64 /* CBFN_ON_UNSET */) + "=\"{ pojo: " + pojo + ", field: '" + fd._ + "', fetch: suggest, onSelect: " + pojo + "$$ }\" />\n</div>\n"; /**/
}
function field_num(pojo, fd, display) {
    return "\n<div class=\"ui input\">\n  <input type=\"text\"" + (fd.o === 2 && dpicker(pojo, fd._, false) || '') + "\n      :disabled=\"" + pojo + ".disable_\" placeholder=\"" + display + "\"\n      :class=\"!" + pojo + ".disable_ ? '' : 'disabled'\"\n      v-sval:" + fd.t + (!fd.o ? '' : (',' + fd.o)) + "=\"" + pojo + "['" + fd._ + "']\"\n      @change=\"qform.change($event, '" + fd._ + "', " + pojo + ", false, null, 0, " + pojo + "$$)\" />\n</div>\n"; /**/
}
function field_num_range(pojo, fd, display) {
    var sval = "" + fd.t + (!fd.o ? '' : (',' + fd.o));
    return "\n<div class=\"ui input\">\n  <input type=\"text\"" + (fd.o === 2 && dpicker(pojo, fd._, false) || '') + "\n      :disabled=\"" + pojo + ".disable_\" placeholder=\"" + display + "\"\n      :class=\"!" + pojo + ".disable_ ? '' : 'disabled'\"\n      v-sval:" + sval + "=\"" + pojo + "['" + fd._ + "']\"\n      @change=\"qform.change($event, '" + fd._ + "', " + pojo + ", false, null, 0, " + pojo + "$$)\" />\n</div>\n<div class=\"ui input\">\n  <input type=\"text\"" + (fd.o === 2 && dpicker(pojo + '$', fd._, false) || '') + "\n      :disabled=\"" + pojo + ".disable_\" placeholder=\"End " + display + "\"\n      :class=\"!" + pojo + ".disable_ ? '' : 'disabled'\"\n      v-sval:" + sval + "=\"" + pojo + "$['" + fd._ + "']\"\n      @change=\"qform.change($event, '" + fd._ + "', " + pojo + "$, false, null, 0, " + pojo + "$$)\" />\n</div>\n"; /**/
}
function field_default(pojo, fd, display, flags) {
    return "\n<div class=\"ui input\">\n  <input type=\"text\" :disabled=\"" + pojo + ".disable_\" placeholder=\"" + display + "\"\n      :class=\"!" + pojo + ".disable_ ? '' : 'disabled'\"\n      v-sval:" + fd.t + (!fd.o ? '' : (',' + fd.o)) + "=\"" + pojo + "['" + fd._ + "']\"\n      @change=\"qform.change($event, '" + fd._ + "', " + pojo + ", false, null, " + flags + ", " + pojo + "$$)\" />\n</div>\n"; /**/
}
function filter_fields(qd, jso, fields, pojo, nf) {
    var buf = '', descriptor = qd.$d, fd, fk, disable, display, suggestKind;
    buf += "<div class=\"field\" v-show=\"" + pojo + ".show__ && " + pojo + ".show_\">";
    for (var i = 0, len = fields.length; i < len; i++) {
        fk = String(fields[i]);
        if (jso['i' + fk])
            continue;
        fd = descriptor[fk];
        disable = pojo + '.disable_';
        if (jso['r' + fk])
            display = fd.$n + ' *';
        else
            display = fd.$n;
        suggestKind = jso['s' + fk];
        if (suggestKind) {
            buf += field_suggest(pojo, fd, display);
        }
        else if (fd.t === 1 /* BOOL */) {
            buf += field_bool(pojo, fd, display);
        }
        else if (fd.t === 16 /* ENUM */) {
            buf += field_enum(pojo, fd, display);
        }
        else if (fd.t !== 3 /* STRING */) {
            // check range
            buf += (jso['e' + fk] ? field_num_range(pojo, fd, display) : field_num(pojo, fd, display));
        }
        else if (jso['p' + fk]) {
            buf += field_default(pojo, fd, display, 1 /* SKIP_VALIDATE */);
        }
        else {
            buf += field_default(pojo, fd, display, 0);
            // TODO range for string?
            /*if (jso['e' + fk]) {

            }*/
        }
    }
    buf += '</div>';
    return buf;
}
function items(qd, values) {
    var buf = '', key_array = qd.key_array, jso;
    for (var i = 0, len = key_array.length; i < len; i++) {
        jso = qd[key_array[i]];
        if (!jso || !jso.fields)
            continue;
        buf += filter_fields(qd, jso, jso.fields, "qform." + jso.$, String(values[i]));
    }
    return buf;
}
export function qform(qd) {
    var values = qd.value_array;
    return "\n<div class=\"fluid picker\">\n  <select :disabled=\"0 !== (" + 264 /* MASK_RPC_DISABLE */ + " & pager.state)\" @change=\"qform.change($event)\">\n  " + option_empty + "\n  " + options(values, qd.display_array) + "\n  </select>\n</div>\n<form class=\"ui form\" onsubmit=\"return false;\">\n  " + items(qd, values) + "\n</form>\n"; /**/
}
//# sourceMappingURL=qform.js.map