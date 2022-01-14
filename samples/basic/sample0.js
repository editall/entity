import {Entity} from "../../src/entity/Entity.js";
import {stringValue} from "../../src/field/string/StringField.js";
import {numberValue} from "../../src/field/number/NumberField.js";
import {entityList} from "../../src/field/entity/EntityListField.js";

class Partner extends Entity{
    constructor() {
        super();
        stringValue(this, "name");
    }
}
class Member extends Entity{
    constructor() {
        super();
        stringValue(this, "name");
        numberValue(this, "age");
        entityList(this, "partners", Partner);
    }
}

const member = (new Member).parse({
    name:"hika",
    age:18,
    partners:[
        {name:"jidolstar"},
        {name:"easy"}
    ]
})
console.log(member);
console.log(JSON.stringify(member));