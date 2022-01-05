import {Field} from "../Field.js";
import {isArray} from "../../util/util.js";

class BooleanListField extends Field{
    typeValidation(v){ return isArray(v) && v.every(item=>typeof item == "boolean");}
}
const booleanList = (entity, key)=>entity.define(key, new BooleanListField);
export {booleanList};