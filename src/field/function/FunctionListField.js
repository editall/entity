import {Field} from "../Field.js";
import {isArray} from "../../util/util.js";

class FunctionListField extends Field{
    typeValidation(v){return isArray(v) && v.every(item=>typeof item == 'function');}
}
const functionList = _=>new FunctionListField;

export {functionList};