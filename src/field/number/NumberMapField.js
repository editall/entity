import {Field} from "../Field.js";
import {everyValue, isObject} from "../../util/util.js";

class NumberMapField extends Field{
    typeValidation(v){return isObject(v) && everyValue(v, item=>typeof item == 'number');}
}

const numberMap = _=>new NumberMapField;

export {numberMap};