import {Field} from "../Field.js";

class EntityField extends Field{
    constructor(cls){
        super();
        this.cls = cls;
    }
    typeValidation(v){return v instanceof this.cls;}
    fromJSON(v){return (new this.cls).parse(v);}
}
const entityValue = cls=>new EntityField(cls);

export {entityValue};