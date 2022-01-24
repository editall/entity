import {Field} from "../Field.js";

class StringField extends Field{
    typeValidation(v){ return typeof v == "string";}
}
const stringValue = ()=>new StringField;
export {stringValue};