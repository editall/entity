import {setProp, mapValue} from "../util/util.js";
import {Field} from "../field/Field.js";

const handler = {
    get(target, prop, receiver){
        if(prop[0] === "#") return Reflect.get(target, prop.substr(1));
        const field = Reflect.get(target, prop);
        if(typeof field === "function") return field;
        if(!(field instanceof Field))  throw prop + " field is not initialized(get)";
        return field.get();
    },
    set(target, prop, value){
        if(target.hasOwnProperty(prop)){
            const field = Reflect.get(target, prop);
            field.set(value);
        }else{
            if(!(value instanceof Field)) throw "value is not Field:"+ value;
            Reflect.set(target, prop, value);
        }
        return true;
    }
};
class Entity{
    static union(base, ...sub){
        if(!sub.every(cls=>cls.prototype instanceof base)) throw "invalid subclass";
        const parse = json=>{
            let target;
            if(!sub.some(cls=>Object.keys(target = new cls).every(key=>{
                const field = target["#" + key];
                const jsonValue = json[key];
                if(jsonValue === undefined && field.get() === undefined) return false;
                else{
                    target[key] = field.fromJSON(jsonValue);
                    return true;
                }
            }))) throw "no matched sub class";
            return target;
        };
        setProp(base, "parse", parse);
        setProp(base.prototype, "parse", parse);
    }
    constructor() {
        return new Proxy(this, handler);
    }
    parse(json){
        Object.keys(this).forEach(key=>{
            const jsonValue = json[key];
            const field = this["#" + key];
            if(jsonValue === undefined && field.get() === undefined) throw 'no key in json:' + key;
            field.set(field.fromJSON(jsonValue));
        });
        return this;
    }
    toJSON(){
        const result = {};
        Object.keys(this).forEach(key=>result[key] = this["#" + key]);
        return result;
    }
}

export {Entity};