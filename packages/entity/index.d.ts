interface Validator<T>{
    (v: T):boolean
}
interface OptionMeta<T>{
    type:FieldType,
    factory:Factory<T>|{new(...arg:any):T},
    instance?:T
}
export interface Option<T> {
    validator?: Validator<T>,
    optional?: boolean,
    toJSON?: (v: any) => any,
    fromJSON?: (v: any) => T,
    __meta__?:OptionMeta<T>
}
interface FromJSON{
    (fromjson:((v:any)=>any)|undefined, validator:Validator<any>|undefined, meta:OptionMeta<any>, key:string, json:any, report:any[]):any|undefined
}
export class FieldType{
    static value:FieldType;
    static object:FieldType;
    static valueArray:FieldType;
    static objectArray:FieldType;
    static valueMap:FieldType;
    static objectMap:FieldType;
    readonly fromJSON:FromJSON;
    readonly name:string
}


export interface Report{
    (error:any[]):void
}
export interface Factory<T>{
    (...arg:any):T
}
export class Entity{

    static parse<T extends Entity>(type:{new ():T}, json:object|string, report?:Report, noUnion?:boolean):T | null;

    get fields():[[string|symbol],{[key:string|symbol]:Option<any>}];
    toJSON():any;
    value<T>(factory:Factory<T>, option?:Option<T>):T;
    object<T>(factory:{new (...arg:any):T}, option?:Option<T>):T;
    valueArray<T>(factory:(...arg:any)=>T, option?:Option<T>):T[];
    objectArray<T>(factory:{new (...arg:any):T}, option?:Option<T>):{[key:string]:T};
    valueMap<T>(factory:(...arg:any)=>T, option?:Option<T>):{[key:string]:T};
    objectMap<T>(factory:{new (...arg:any):T}, option?:Option<T>):{[key:string]:T};
    get STRING():string;
    string(option?:Option<string>):string
    get BOOL():boolean
    bool(option?:Option<boolean>):boolean
    get NUMBER():number
    number(option?:Option<number>):number
}
export class Union extends Entity{
    static subTypes(type:{new ():Union}, f:(type:{new ():Entity})=>boolean);
}
