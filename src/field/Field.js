class Field{
    constructor(){
        const self = this;
        self.get =_=>this._decorator ? this._decorator(self.v) : self.v;
        self.set =newValue=>{
            if(!self.typeValidation(newValue)) throw "invalid type: " + newValue;
            if(self.validator && !self.validator(newValue)) throw "invalid validation: " + newValue;
            self.v = newValue;
        }
    }
    typeValidation(v){ throw "must be override!"; }
    validation(validator){
        this.validator = validator;
        return this;
    }
    default(v){this.set(v);}
    decorator(v){this._decorator = v;}
    toJSON(){return this.v;}
    fromJSON(v){return v;}
}

export {Field};