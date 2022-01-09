# entityJS
entityJS is data modeling framework for JSON.

# usage
## 1. simple sample

JSON
```json
{
  "name":"hika",
  "age":18
}
```

Model
Simple value model using value series function.
```js
class Member extends Entity{
  constructor(){
    super();
    stringValue(this, "name");
    numberValue(this, "age");
  }
}
```

Use
```js
const member = new Member();
member.parse({
  "name":"hika",
  "age":18
});

//or

const member = (new Member()).parse({
  "name":"hika",
  "age":18
});

//------------------
console.log(member.name); //hika
console.log(member.age); //18
```

## 2. array and object
using List, Map series Function
```js
class Remember extends Entity{
  constructor(){
    super();
    stringList(this, "friends");
    numberMap(this, "lotto");
  }
}

const remember = (new Remember).parse({
  "friends":["hika", "easy"],
  "lotto":[1,2,3,4,5,6]
});
```

## 3. composited strcuture
using entity, entityList, entityMap
```js
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
});
```

# license
MIT
