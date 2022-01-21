import {Field} from "../Field.js";
import {everyValue, isObject} from "../../util/util.js";

class EnumMapField extends Field{
    constructor(targetEnum){
        super();
        this.enum = targetEnum;
    }
    typeValidation(v){return isObject(v) && everyValue(v, item=>this.enum.isValid(item));}
}

const enumMap = targetEnum=>new EnumMapField(targetEnum);

export {enumMap};