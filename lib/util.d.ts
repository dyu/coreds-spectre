export declare const enum ContentSlot {
    TOP = 0,
    BOTTOM = 1,
}
export declare const enum FormFlags {
    PLACEHOLDER = 1,
    REF_AND_ID = 2,
    HORIZONTAL = 4,
    TOGGLE_FLAG32 = 32,
}
export declare const option_empty = "<option value=\"\"></option>";
export declare function options(arrayValue: any[], arrayDisplay: any[]): string;
export declare function enum_option(fd: any): string;
export declare function enum_options(fd: any): string;
export declare function valTime(value: any): string;
export declare function valDate(value: any): string;
export declare function valDateTime(value: any): string;
export declare function valNumber(value: any): any;
export declare function getFnVal(flags: number): typeof valNumber;
