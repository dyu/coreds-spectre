import { FormFlags } from '../util';
export declare function form(pojo: any, $d: any, fnSubmit: any, ffid: string | null, ffobj?: any, formFlags?: FormFlags, content?: any): JSX.Element;
export declare function valTime(el: any, key: any, value: any): void;
export declare function valDate(el: any, key: any, value: any): void;
export declare function valDateTime(el: any, key: any, value: any): void;
export declare function valNumber(el: any, key: any, value: any): void;
export declare function getFnVal(flags: number): typeof valTime;
