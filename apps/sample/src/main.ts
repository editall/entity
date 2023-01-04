import {Entity, Union} from "@edit-all/entity";
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

console.log("=============================")
const json = {
    name:"hika",
    num:1234,
    list:["a", "b", "c"],
    map:{a:{title:"a", id:12}, b:{title:"b", id:15}}
};

class Test11_Sub extends Entity{
    title = this.STRING;
    id = this.NUMBER;
}
class Test11 extends Entity{
    name = this.STRING;
    num = this.number({
        validator:v=>50 < v
    });
    list = this.valueArray(String);
    map = this.objectMap(Test11_Sub)
}
const test11 = Entity.parse(Test11, json);
console.log(test11);