import {Field} from "../Field.js";

class BooleanField extends Field{
    typeValidation(v){ return typeof newValue != "boolean";}
}

const booleanValue = _=>new BooleanField;
export {booleanValue};