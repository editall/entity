import {Field} from "../Field.js";
import {isArray} from "../../util/util.js";

class AnyListField extends Field{
    typeValidation(v){return isArray(v)}
}
const anyList = _=>new AnyListField;

export {anyList};