import {Field} from "../Field.js";
import {isObject} from "../../util/util.js";

class AnyMapField extends Field{
    typeValidation(v){return isObject(v) }
}
const anyMap = _=>new AnyMapField;

export {anyMap};