import {Field} from "../Field.js";
import {everyValue, isObject} from "../../util/util.js";

class NumberMapField extends Field{
    typeValidation(v){return isObject(v) && everyValue(v, item=>typeof item == 'number');}
}

const numberMap = (entity, key)=>entity.define(key, new NumberMapField);

export {numberMap};