import {Field} from "../Field.js";
import {everyValue, isObject} from "../../util/util.js";

class StringMapField extends Field{
    typeValidation(v){return isObject(v) && everyValue(v, item=>typeof item == 'string');}
}
const stringMap = (entity, key)=>entity.define(key, new StringMapField);

export {stringMap};