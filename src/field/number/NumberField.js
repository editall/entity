import {Field} from "../Field.js";

class NumberField extends Field{
    typeValidation(v){ return typeof v != "number";}
}
const numberValue = _=>new NumberField();

export {numberValue};