import { ContentSlot } from './util';
export declare const enum FormFlags {
    PLACEHOLDER = 1,
    REF_AND_ID = 2,
    HORIZONTAL = 4,
    TOGGLE_FLAG32 = 32,
}
export declare function msg(pojo: string, update: boolean): string;
export declare function toggle32(pojo: string): string;
export declare function form(pojo: string, $d: any, ffid: string | null, content?: string, content_slot?: ContentSlot, formFlags?: FormFlags): string;
export declare const option_empty = "<option value=\"\"></option>";
export declare function enum_options(arrayValue: any[], arrayDisplay: any[]): string;
export declare const enum DPFlags {
    UPDATE = 16,
    TRIGGER_CHANGE_ON_SELECT = 32,
}
export declare function dpicker(pojo: string, field: number, update: boolean): string;
