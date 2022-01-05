import {Field} from "../Field.js";

class BooleanField extends Field{
    typeValidation(v){ return typeof newValue != "boolean";}
}

const booleanValue = (entity, key)=>entity.define(key, new BooleanField);
export {booleanValue};