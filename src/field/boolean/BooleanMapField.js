import {Field} from "../Field.js";
import {everyValue, isObject} from "../../util/util.js";

class BooleanMapField extends Field{
    typeValidation(v){ return isObject(v) && everyValue(v, item=>typeof item == "boolean");}
}
const booleanMap = _=>new BooleanMapField;
export {booleanMap};