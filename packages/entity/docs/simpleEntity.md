## 간단한 모델정의

예를 들어 아래와 같은 json이 존재한다고 가정하겠습니다.

JSON
```json
{
  "name":"hika",
  "age":18
}
```
이 json인 정확히 의도된 것이라면 name, age라는 필드를 갖고 있으며 각각 string, number형이라는 것을 알 수 있습니다.
이를 정적으로 모델링하기 위해 entity를 사용합니다.
기본적인 사용법은 Entity클래스를 상속한 모델클래스를 정의하고 각 필드에 Entity제공하는 기능으로 타입을 명시하는 것입니다.

Model
```js
class Member extends Entity{
  name = this.STRING;
  age = this.NUMBER;
}
```
이렇게 정의된 Member모델은 name, age 필드를 갖고 있으며 그 타입으로 string, number가 지정됩니다.
이러한 기본 타입에 대한 정의는 ```this.STRING, this.NUMBER, this.BOOL``` 3종을 제공합니다.
또한 이렇게 정의된 Member는 타입스크립트 입장에서 명확이 타입이 정의됩니다. 즉 위의 코드는 아래 코드와 정확히 일치합니다.

```js
class Member extends Entity{
  name:string = this.STRING;
  age:number = this.NUMBER;
}
```

외부에서 Member의 인스턴스를 사용한다면 name, age의 코드힌트가 작동하고 타입도 정확히 string과 number로 인식되는 것이죠.
이렇게 정의된 Member엔티티를 활용하여 json을 파싱할 수 있습니다.

```typescript
const member1:Member|null = Entity.parse(Member, {
  "name":"hika",
  "age":18
});

if(member1){
    console.log(member1.name, member1.age); //hika, 18
    console.log(member1 instanceof Member); //true
}

const member2:Member|null = Entity.parse(Member, {
    "name":"hika",
    "age":"18" //age가 문자열로 들어옴
});

console.log(member2); // null - 파싱에 실패하고 null이 됨
```

```Entity.parse```는 첫번째 인자로 파싱된 결과로 생성될 모델클래스를 받습니다. 두번째 인자는 대상이 될 json객체 또는 문자열입니다.
만약 json이 첫번째 인자의 모델클래스 정의와 일치한다면 정상적으로 해당 클래스의 인스턴스가 반환될 것이고 아니라면 null이 반환됩니다.
