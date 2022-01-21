import {Field} from "../Field.js";

class EnumField extends Field{
    constructor(targetEnum){
        super();
        this.enum = targetEnum;
    }
    typeValidation(v){return this.enum.isValid(v);}
}

const enumValue = targetEnum=>new EnumField(targetEnum);

export {enumValue};