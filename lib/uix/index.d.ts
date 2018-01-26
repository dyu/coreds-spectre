import { Pager, HasState } from 'coreds/lib/types';
export { form } from './form';
export declare function $toggle0(e: any): void;
export declare function $toggle1(e: any): void;
export declare function $toggle2(e: any): void;
export declare function $toggle3(e: any): void;
export declare function $itoggle0(e: any): void;
export declare function $itoggle1(e: any): void;
export declare function $itoggle2(e: any): void;
export declare function $itoggle3(e: any): void;
export declare function dropdown_msg(hs: HasState, mask: number): JSX.Element;
export declare function lsearch_disabled(pager: Pager): boolean;
export declare function lsearch_input(pager: Pager, placeholder: string, fields: string[], fn?: Function, clazz?: string): JSX.Element;
export declare function $pager<T>(pager: Pager, el: T): T;
export declare function pager_controls(pager: Pager): JSX.Element;
export declare function pager_msg(pager: Pager): JSX.Element;
export declare function icon_timeago(pojo: any, wrapper_class?: string): JSX.Element;
export declare function icon_update_ts(pojo: any, fk: string, wrapper_class?: string): JSX.Element;
export declare function icon_toggle(pojo: any, fk: string, bit: number, icon_class: string, cb: Function, name?: string, wrapper_class?: string): JSX.Element;
export declare function icon_toggle_dd(pojo: any, fk: string, bit: number, icon_class: string, cb: Function, name?: string): JSX.Element;
export declare function icon_remove(pojo: any, fk: string, bit: number, icon_class: string, cb?: Function, name?: string, wrapper_class?: string): JSX.Element;
export declare function $item<T>(pojo: any, el: T): T;
export declare function item_class(pojo: any): "d-none" | "item" | "item active";
export declare function item_msg(pojo: any): JSX.Element;
export declare function item_msg_dd(pojo: any): JSX.Element;
export declare function item_timeago(pojo: any): JSX.Element;
export declare function item_update_ts(pojo: any, fk: string): JSX.Element;
export declare function item_toggle(pojo: any, fk: string, bit: number, icon_class: string, cb: Function, name?: string): JSX.Element;
export declare function item_toggle_dd(pojo: any, fk: string, bit: number, icon_class: string, cb: Function, name?: string): JSX.Element;
export declare function item_remove(pojo: any, fk: string, bit: number, icon_class: string, cb: Function, name?: string): JSX.Element;
export declare function item_detail(pojo: any, detail_id: string): JSX.Element;
