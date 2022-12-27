import {FieldType, Option} from "./Option";
import {isSubClass} from "./IsSubClass";

export interface Report{
    (error:any[]):void
}
export interface Factory<T>{
    (...arg:any):T
}
const reflected = new WeakMap();
export class Entity{
    static parse<T extends Entity>(type:{new ():T}, json:object|string, report?:Report, noUnion?:boolean):T | null{
        if(typeof json === "string") json = JSON.parse(json);
        if(!noUnion && isSubClass(type, Union)){
            let subTypes: any[] = [];
            let result;
            Union.subTypes(type, t=>{
                subTypes.push(t.name);
                result = Entity.parse(t, json, undefined, true);
                return !result;
            });
            if(result) return result;
            else{
                if(report) report([`no matched union. union:${type.name}, subType:${subTypes.join(",")}`]);
                return null;
            }
        }
        const entity = new type();
        const [keys, option] = entity.fields;
        const error: any[] = [];
        for(let i = 0, j = keys.length; i < j; i++){
            const key = keys[i];
            if(typeof key === "symbol") continue;
            // @ts-ignore
            const jsonValue = json[key];
            const {validator, optional, fromJSON, __meta__:meta} = option[key];
            if(jsonValue === undefined){
                if(!optional){
                    error.push(`no key. key:${String(key)}`);
                    break;
                }else continue;
            }
            if(!meta){
                error.push(`no meta data. key: ${String(key)}`);
                break;
            }
            const result = meta.type.fromJSON(fromJSON, validator, meta, key, jsonValue, error);
            if(result === undefined) break;
            // @ts-ignore
            entity[key] = result;
        }
        if(error.length){
            if(report) report(error);
            return null;
        }else return entity;
    }
    readonly #fields:Option<any>[] = [];
    get fields():[[string|symbol],{[key:string|symbol]:Option<any>}]{
        if(!reflected.has(this.constructor)){
            const keys = Object.getOwnPropertyNames(this);
            reflected.set(
                this.constructor,
                [
                    keys,
                    keys.reduce((result:any, key, index)=>{
                        result[key] = this.#fields[index];
                        return result;
                    }, {})
                ]
            );
        }
        return reflected.get(this.constructor);
    }
    toJSON():any{
        const [keys, option] = this.fields;
        return keys.reduce((result:any, key)=>{
            // @ts-ignore
            const value = this[key];
            result[key] = option[key].toJSON?.(value) ?? value;
            return result;
        }, {});
    }
    value<T>(factory:Factory<T>, option:Option<T> = {}):T{
        const instance = factory();
        if(typeof instance === "object") throw `${instance} is no value`;
        option.__meta__ = {
            type:FieldType.value,
            factory,
            instance
        };
        this.#fields.push(option);
        return instance;
    }
    object<T>(factory:{new (...arg:any):T}, option:Option<T> = {}):T{
        option.__meta__ = {
            type:FieldType.object,
            factory,
        };
        this.#fields.push(option);
        return {} as T;
    }
    valueArray<T>(factory:(...arg:any)=>T, option:Option<T> = {}):T[]{
        option.__meta__ = {
            type:FieldType.valueArray,
            factory
        };
        this.#fields.push(option);
        return [];
    }
    objectArray<T>(factory:{new (...arg:any):T}, option:Option<T> = {}):{[key:string]:T}{
        option.__meta__ = {
            type:FieldType.objectArray,
            factory
        };
        this.#fields.push(option);
        return {};
    }
    valueMap<T>(factory:(...arg:any)=>T, option:Option<T> = {}):{[key:string]:T}{
        option.__meta__ = {
            type:FieldType.valueMap,
            factory
        };
        this.#fields.push(option);
        return {};
    }
    objectMap<T>(factory:{new (...arg:any):T}, option:Option<T> = {}):{[key:string]:T}{
        option.__meta__ = {
            type:FieldType.objectMap,
            factory
        };
        this.#fields.push(option);
        return {};
    }
    get STRING():string{return this.value(String);}
    string(option?:Option<string>){return this.value(String, option);}
    get BOOL(){return this.value(Boolean);}
    bool(option?:Option<boolean>){return this.value(Boolean, option);}
    get NUMBER(){return this.value(Number);}
    number(option?:Option<number>){return this.value(Number, option);}
}
export class Union extends Entity{
    static subTypes(type:{new ():Union}, f:(type:{new ():Entity})=>boolean){
        const types = Object.values(type);
        for(let i = 0, j = types.length; i < j; i++){
            const t = types[i];
            if(t && typeof t === "function" && isSubClass(t, type) && !f(t)) break;
        }
    }
}
