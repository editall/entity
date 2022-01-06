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

const sourceCode = `
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
`

const resultCode = JSON.stringify(member, null, 2)

const div = document.createElement("div");
div.innerHTML = `
<h1>EntityJS</h1>
<h2>Source Code</h2>
<pre>${sourceCode}</pre>

<h2>Result - member</h2>
<pre>const member = ${resultCode}</pre>
`

document.body.appendChild(div);