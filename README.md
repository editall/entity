# entityJS

## what is
entityJS is data modeling framework for JSON.

## usage
### 1. simple sample

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
  #name = stringValue(this, "name");
  #age = numberValue(this, "age");
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

### 2. array and object
using List, Map series Function
```js
class Remember extends Entity{
  #friends = stringList(this, "friends");
  #lotto = numberMap(this, "lotto");
}

const remember = (new Remember).parse({
  "friends":["hika", "easy"],
  "lotto":{"num1":1, "num2":2, "num3":3, "num4":4, "num5":5, "num6":6}
});
```

### 3. composited strcuture
using entity, entityList, entityMap
```js
class Partner extends Entity{
  #name = stringValue(this, "name");
}
class Member extends Entity{
  #name = stringValue(this, "name");
  #age = numberValue(this, "age");
  #partners = entityList(this, "partners", Partner);
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

## addtional content
* NPM <a href="https://www.npmjs.com/package/@entityjs/entityjs" target="_blank">https://www.npmjs.com/package/@entityjs/entityjs</a>

Blog Post(Korean)
* <a href="https://www.bsidesoft.com/8621" target="_blank">entityJS 1</a>
* <a href="https://www.bsidesoft.com/8624" target="_blank">entityJS 2</a>
* <a href="https://www.bsidesoft.com/8634" target="_blank">entityJS 3</a>

## license
MIT
