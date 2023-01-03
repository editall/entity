import { Factory } from "./Entity";
interface Validator<T> {
    (v: T): boolean;
}
interface OptionMeta<T> {
    type: FieldType;
    factory: Factory<T> | {
        new (...arg: any): T;
    };
    instance?: T;
}
export interface Option<T> {
    validator?: Validator<T>;
    optional?: boolean;
    toJSON?: (v: any) => any;
    fromJSON?: (v: any) => T;
    __meta__?: OptionMeta<T>;
}
interface FromJSON {
    (fromjson: ((v: any) => any) | undefined, validator: Validator<any> | undefined, meta: OptionMeta<any>, key: string, json: any, report: any[]): any | undefined;
}
export declare class FieldType {
    static value: FieldType;
    static object: FieldType;
    static valueArray: FieldType;
    static objectArray: FieldType;
    static valueMap: FieldType;
    static objectMap: FieldType;
    readonly fromJSON: FromJSON;
    readonly name: string;
    private constructor();
}
export {};
