import {Field} from "../Field.js";
import {isArray} from "../../util/util.js";

class NumberListField extends Field{
    typeValidation(v){return isArray(v) && v.every(item=>typeof item == 'number');}
}
const numberList = _=>new NumberListField;

export {numberList};