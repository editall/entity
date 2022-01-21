import {Field} from "../Field.js";

class DateField extends Field{
    typeValidation(v){return v instanceof Date;}
    toJSON(){return this.v.toISOString();}
    fromJSON(v){return new Date(v);}
}

const dateValue = _=>new DateField;

export {dateValue};