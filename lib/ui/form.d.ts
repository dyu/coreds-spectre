import { FormFlags } from '../util';
export declare function msg(pojo: string, update: boolean): string;
export declare function toggle32(pojo: string): string;
export declare function form(pojo: string, $d: any, ffid: string | null, formFlags?: FormFlags, content?: string): string;
export declare const enum DPFlags {
    UPDATE = 16,
    TRIGGER_CHANGE_ON_SELECT = 32,
}
export declare function dpicker(pojo: string, field: number, update: boolean): string;
