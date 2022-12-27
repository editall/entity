import {Entity, Factory, Union} from "./Entity";
import {isSubClass} from "./IsSubClass";

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
const value = (fromjson:((v:any)=>any)|undefined, validator:Validator<any>|undefined, origin:any, json:any, report:any[]) =>{
    if(typeof json !== typeof origin){
        report.push(`invalid value type. json:${json}[${typeof json}], type:[${typeof origin}]`);
        return;
    }
    if(validator && !validator(json)){
        report.push(`validation error. json:${json}`);
        return;
    }
    return fromjson ? fromjson(json) : json;
};
const object = (fromjson:((v:any)=>any)|undefined, validator:Validator<any>|undefined, meta:OptionMeta<any>, json:any, report:any[]) =>{
    if(validator && !validator(json)){
        report.push(`validation error. json:${json}`);
        return;
    }
    let result:any;
    if(fromjson) result = fromjson(json);
    else {
        let type = meta.factory as { new(): any };
        if (isSubClass(type, Union)) {
            Union.subTypes(type, t => {
                result = Entity.parse(t, json);
                return !result;
            });
            if (result) return result;
            else {
                report.push(`no matched union. json:${json}`);
                return;
            }
        } else if (isSubClass(type, Entity)) {
            // @ts-ignore
            result = Entity.parse(type, json, error => report.push(...error));
        } else {
            // @ts-ignore
            result = new type();
            if (result.fromJSON) result.fromJSON(json);
            else {
                const keys = Object.keys(json);
                for (let i = 0, j = keys.length; i < j; i++) {
                    const key = keys[i];
                    result[key] = json[key];
                }
            }
        }
    }
    return result;
}
export class FieldType{
    static value = new FieldType("value", (from, validator, meta, key, json, report)=>{
        const result = value(from, validator, meta.instance, json, report);
        if(report.length){
            report.push(`${report.pop()}, key:${key}`);
            return
        }
        return result;
    });
    static object = new FieldType("object", (from, validator, meta, key, json, report)=>{
        const result = object(from, validator, meta, json, report);
        if(report.length){
            report.push(`${report.pop()}, key:${key}`);
            return
        }
        return result;
    });
    static valueArray = new FieldType("valueArray", (from, validator, meta, key, json, report)=>{
        if(!(json instanceof Array)){
            report.push(`invalid array. json: ${json}`)
            return;
        }
        // @ts-ignore
        if(meta.instance === undefined) meta.instance = meta.factory();
        const result = [];
        for(let i = 0, j = json.length; i < j; i++){
            const v = value(from, validator, meta.instance, json[i], report);
            if(report.length){
                report.push(`invalid array item type. item: ${json[i]}, index:${i}, error:${report.pop()}, key:${key}`);
                return
            }
            result.push(v);
        }
        return result;
    });
    static objectArray = new FieldType("objectArray", (from, validator, meta, key, json, report)=>{
        if(!(json instanceof Array)){
            report.push(`invalid array. json: ${json}`)
            return;
        }
        // @ts-ignore
        const result = [];
        for(let i = 0, j = json.length; i < j; i++){
            const v = object(from, validator, meta, json[i], report);
            if(report.length){
                report.push(`invalid array item type. item: ${json[i]}, index:${i}, error:${report.pop()}, key:${key}`);
                return
            }
            result.push(v);
        }
        return result;
    });
    static valueMap = new FieldType("valueMap", (from, validator, meta, key, json, report)=>{
        if(!json || typeof json !== "object"){
            report.push(`invalid object. json: ${json}`);
            return;
        }
        const keys = Object.keys(json);
        const result = {};
        // @ts-ignore
        if(meta.instance === undefined) meta.instance = meta.factory();
        for(let i = 0, j = keys.length; i < j; i++){
            const key = keys[i];
            const v = value(from, validator, meta.instance, json[key], report);
            if(report.length){
                report.push(`invalid object item type. item: ${json[key]}, objectkey:${key}, error:${report.pop()}, key:${key}`);
                return
            }
            // @ts-ignore
            result[key] = v;
        }
        return result;
    });
    static objectMap = new FieldType("objectMap", (from, validator, meta, key, json, report)=>{
        if(!json || typeof json !== "object"){
            report.push(`invalid object. json: ${json}`);
            return;
        }
        const keys = Object.keys(json);
        const result = {};
        // @ts-ignore
        for(let i = 0, j = keys.length; i < j; i++){
            const key = keys[i];
            const v = object(from, validator, meta, json[key], report);
            if(report.length){
                report.push(`invalid object item type. item: ${json[key]}, objectkey:${key}, error:${report.pop()}, key:${key}`);
                return
            }
            // @ts-ignore
            result[key] = v;
        }
        return result;
    });
    readonly fromJSON:FromJSON;
    readonly name:string
    private constructor(name:string, fromJSON:FromJSON) {
        this.name = name;
        this.fromJSON = fromJSON;
    }
}