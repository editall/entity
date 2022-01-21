import {Field} from "../Field.js";
import {isArray} from "../../util/util.js";

class EntityListField extends Field{
    constructor(cls){
        super();
        this.cls = cls;
    }
    typeValidation(v){return isArray(v) && v.every(item=>item instanceof this.cls);}
    fromJSON(v){return v.map(json=>(new this.cls).parse(json));}
}
const entityList = cls=>new EntityListField(cls);

export {entityList};