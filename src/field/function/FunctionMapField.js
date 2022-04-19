import {Field} from "../Field.js";
import {everyValue, isObject} from "../../util/util.js";

class FunctionMapField extends Field{
    typeValidation(v){return isObject(v) && everyValue(v, item=>typeof item == 'function');}
}
const functionMap = _=>new FunctionMapField;

export {functionMap};