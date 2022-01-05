import {Field} from "../Field.js";

class NumberField extends Field{
    typeValidation(v){ return typeof newValue != "number";}
}
const numberValue = (entity, key)=>entity.define(key, new NumberField);

export {numberValue};