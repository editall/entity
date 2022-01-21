import {Field} from "../Field.js";

class NumberField extends Field{
    typeValidation(v){ return typeof newValue != "number";}
}
const numberValue = _=>new NumberField();

export {numberValue};