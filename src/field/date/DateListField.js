import {Field} from "../Field.js";
import {isArray} from "../../util/util.js";

class DateListField extends Field{
    typeValidation(v){return isArray(v) && v.every(item=>item instanceof Date);}
    toJSON(){return this.v.map(item=>item.toISOString());}
    fromJSON(v){return v.map(item=>new Date(item));}
}
const dateList = (entity, key)=>entity.define(key, new DateListField);

export {dateList};