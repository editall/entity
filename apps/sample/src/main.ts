import {Entity, Union} from "entity";
import {render, test} from "./test";

class Case1 extends Entity{
    name = this.value(String);
    num = this.value(Number);
    nick = this.STRING;
}
class Case2 extends Case1{
    list = this.valueArray(String);
    map = this.valueMap(Number);
}
class Case3 extends Case1{
    entity = this.object(Case1);
}
test(Case1, {
    nick:"nick",
    name:"hika",
    num:122343
});
test(Case2, {
    nick:"nick",
    name:"hika",
    num:122343,
    list:["a", "b"],
    map:{a:34, b:5}
});
test(Case3, {
    nick:"nick",
    name:"hika",
    num:122343,
    list:["a", "b"],
    entity:{
        nick:"entity nick",
        name:"entity hika",
        num:55555
    }
});
render();

class Base extends Union{
    static A = class extends Base{
        astr = this.STRING;
        anum = this.NUMBER;
    }
    static B = class extends Base{
        bstr = this.STRING;
        bnum = this.NUMBER;
    }
}

console.log("---------------------")
const e = Entity.parse(Base, {
    bstr:"bbb",
    bnum:1111
});
console.log(e, e instanceof Base.B, JSON.stringify(e));
const is = ()=>{

}