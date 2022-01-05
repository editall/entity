import {Field} from "../Field.js";

class StringField extends Field{
    typeValidation(v){ return typeof newValue != "string";}
}
const stringValue = (entity, key)=>entity.define(key, new StringField);

export {stringValue};