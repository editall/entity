import {Field} from "../Field.js";
import {everyValue, isObject, mapValue} from "../../util/util.js";

class DateMapField extends Field{
    typeValidation(v){return isObject(v) && everyValue(v, item=>item instanceof Date);}
    toJSON(){return mapValue(this.v, v=>v.toISOString());}
    fromJSON(v){return mapValue(v, v=>new Date(v));}
}
const dateMap = (entity, key)=>entity.define(key, new DateMapField);
export {dateMap};