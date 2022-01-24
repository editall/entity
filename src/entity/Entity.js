import {setProp, mapValue} from "../util/util.js";
import {Field} from "../field/Field.js";

const handler = {
    get(target, prop){
        if(prop[0] === "#") return Reflect.get(target, prop.substr(1));
        const field = Reflect.get(target, prop);
        return field instanceof Field ? field.get() : field;
    },
    set(target, prop, value){
        const field = Reflect.get(target, prop);
        field instanceof Field ? field.set(value) : Reflect.set(target, prop, value);
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