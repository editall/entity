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
  name = stringValue();
  age = numberValue();
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
  friends = stringList();
  lotto = numberMap();
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
  name = stringValue();
}
class Member extends Entity{
  name = stringValue();
  age = numberValue();
  partners = entityList(Partner);
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

### 4. default value
If there is a default value, the parsing will pass even if there is no corresponding property in the json.
Therefore, you can think of the default value as a kind of optional field declaration for parsing.

```js
class Member extends Entity{
  name = stringValue().default("hika");
  age = numberValue();
}

const member = (new Member).parse({ //There is no name field in json
  age:18
}); // but parsing ok!

member.name == "hika"
member.age == 18
```

### 5. validator
Validation can be set precisely for each field, and it is applied when directly entering a value in a property or parsing from json.

```js
class Member extends Entity{

  name = stringValue()
           .default("hika")
           .validation(name=> 3 < name.length && name.length < 20); //4 ~ 19 characters
           
  age = numberValue().validation(age=> 9 < age && age < 20); //teenager
}

const member = (new Member).parse({
  name:"ted", //invalid
  age:9 //invalid
}); // throw exception

const member = (new Member).parse({
  name:"teds", //valid
  age:12 //valid
}); //parsing ok
```

### 6. decorator
Without changing the value of the actual field, you can do extra work when you get it with get.

```js
class Member extends Entity{
  name = stringValue()
           .default("hika")
           .validation(name=> 3 < name.length && name.length < 20)
           .decorator(name=>"**" + name + "**"); //set decorator
           
  age = numberValue().validation(age=> 9 < age && age < 20);
}

const member = (new Member).parse({
  name:"hika",
  age:12
});

member.name == "**hika**" //decorated!
```

### 7. union type
In practice, json is often in the form of a or b. In particular, it is common for a and b to have shared fields. To handle this, define the abstract type of a and b to define a common field, and define a and b by inheriting it. This is called a union type.

```json
//backend developers
{
  "name":"hika",
  "age":18,
  "part":"backend",
  "languages":["java", "kotlin"],
  "framework":"spring",
  "database":"mysql"
}
//frontend developers
{
  "name":"hika",
  "age":18,
  "part":"frontend",
  "languages":["js", "ts"],
  "view":"react",
  "state":"redux"
}
```
In the example above, the developers has 'name', 'age', and 'languages' as shared fields.
However, backend developers have 'framework' and 'database', and front-end developers have 'view' and 'state'.
This can be effectively modeled as follows.

#### 1 'part' is determined as an enum.
```js
const PART = new Enum("backend", "frontend");
```

#### 2 Collect the shared fields to define the abstract type 'Developer'.
```js
class Developer extends Entity{
  name = stringValue();
  age = numberValue();
  part = enumValue(PART);
  languages = stringList();
}
```

#### 3 Define 'Backend' and 'Frontend' by extending 'Developer'.
```js
class Backend extends Developer{
  framework = stringValue();
  database = stringValue();
}
class Frontend extends Developer{
  view = stringValue();
  state = stringValue();
}
```

#### 4 Declare Union.
```js
Entity.union(Developer, Backend, Frontend)
```
* The first parameter becomes an abstract type, followed by concrete classes. According to the order of concrete classes, it is judged first when parsing.

#### 5 Parsing through static method of abstract class.
```js
const dev1 = Developer.parse({
  "name":"hika",
  "age":18,
  "part":"backend",
  "languages":["java", "kotlin"],
  "framework":"spring",
  "database":"mysql"
});

dev1 instanceof Backend == true

const dev2 = Developer.parse({
  "name":"hika",
  "age":18,
  "part":"frontend",
  "languages":["js", "ts"],
  "view":"react",
  "state":"redux"
});

dev2 instanceof Frontend == true
```
A cleaner implementation is possible because it can branch through exact type matching without understanding the shape of json based on the value or existence of a specific field.
```js
//other system - field level branch
if(entity.field === undefined)
if(entity.field === specialValue)

//entityJS - type level branch
switch(true){
  case entity instanceof Frontend:{
    ...
  }
  case entity instanceof Backend:{
    ...
  }
}
```


## addtional content
* NPM <a href="https://www.npmjs.com/package/@entityjs/entityjs" target="_blank">https://www.npmjs.com/package/@entityjs/entityjs</a>

Blog Post(Korean)
* <a href="https://www.bsidesoft.com/8621" target="_blank">entityJS 1</a>
* <a href="https://www.bsidesoft.com/8624" target="_blank">entityJS 2</a>
* <a href="https://www.bsidesoft.com/8634" target="_blank">entityJS 3</a>

## license
MIT
