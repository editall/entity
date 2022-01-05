import {Field} from "../Field.js";

class DateField extends Field{
    typeValidation(v){return v instanceof Date;}
    toJSON(){return this.v.toISOString();}
    fromJSON(v){return new Date(v);}
}

const dateValue = (entity, key)=>entity.define(key, new DateField);

export {dateValue};