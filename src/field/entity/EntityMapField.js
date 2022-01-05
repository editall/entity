import {Field} from "../Field.js";
import {everyValue, isObject, mapValue} from "../../util/util.js";

class EntityMapField extends Field{
    constructor(cls){
        super();
        this.cls = cls;
    }
    typeValidation(v){return isObject(v) && everyValue(v, item=>item instanceof this.cls);}
    fromJSON(v){return mapValue(v, json=>(new this.cls).parse(json));}
}

const entityMap = (entity, key, cls)=>entity.define(key, new EntityMapField(cls));

export {entityMap};