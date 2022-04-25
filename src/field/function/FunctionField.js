import {Field} from "../Field.js";

class FunctionField extends Field{
    typeValidation(v){ return typeof v == "function";}
}
const functionValue = ()=>new FunctionField;
export {functionValue};