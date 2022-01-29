import {Field} from "../Field.js";

class StringField extends Field{
    typeValidation(v){ return typeof v == "string";}/*
    toJSON(){
        return this.v
            .replaceAll("\"", "\\\"")
            .replaceAll("\n", "\\n")
            .replaceAll("\r", "\\\\r");
    }
    fromJSON(v){
        return v
            .replaceAll("\\\"", "\"")
            .replaceAll("\\n", "\n")
            .replaceAll("\\r", "\r");
    }*/
}
const stringValue = ()=>new StringField;
export {stringValue};