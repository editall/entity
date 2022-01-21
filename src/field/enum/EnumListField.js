import {Field} from "../Field.js";

class EnumListField extends Field{
    constructor(targetEnum){
        super();
        this.enum = targetEnum;
    }
    typeValidation(v){return v.every(item=>this.enum.isValid(item));}
}
const enumList = targetEnum=>new EnumListField(targetEnum);

export {enumList};