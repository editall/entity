import {Field} from "../Field.js";

class AnyField extends Field{
    typeValidation(v){ return  true }
}
const anyValue = ()=>new AnyField;
export {anyValue};