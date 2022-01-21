import {Field} from "../Field.js";
import {isArray} from "../../util/util.js";

class StringListField extends Field{
    typeValidation(v){return isArray(v) && v.every(item=>typeof item == 'string');}
}
const stringList = _=>new StringListField;

export {stringList};