import {Entity, stringValue, numberValue, dateValue, entityList, enumValue, Enum} from "../../src/index.js";

class Member extends Entity{
    #name = stringValue(this, "name").validation(v=>2<v.length && v.length<=10);
    #point = numberValue(this, "point").default(0);
}
class VIP extends Member{
    #freeParking = numberValue(this, "freeParking").validation(v=>v>=0);
    #vipCoupons = entityList(this, "vipCoupons", Coupon);
    #until = dateValue(this, "until");
}
class Normal extends Member{}
Entity.union(Member, VIP, Normal);

const CouponType = new Enum("percent", "amount");

class Coupon extends Entity{
    #title = stringValue(this, "title");
    #type = enumValue(this, "type", CouponType);
    #value = numberValue(this, "value");
}

const vipMember = Member.parse({
    name:"hika",
    point:1800,
    freeParking:3,
    until:"2022-12-31T00:00:00.000Z",
    vipCoupons:[
        {title:"iphone sale", type:"amount", value:10000},
        {title:"super market", type:"percent", value:10}
    ]
});
const normalMember = Member.parse({
    name:"easy",
    point:100
});

const sourceCode = `
class Member extends Entity{
    #name = stringValue(this, "name").validation(v => 2 < v.length && v.length<=10);
    #point = numberValue(this, "point").default(0);
}
class VIP extends Member{
    #freeParking = numberValue(this, "freeParking").validation(v=>v>=0);
    #vipCoupons = entityList(this, "vipCoupons", Coupon);
    #until = dateValue(this, "until");
}
class Normal extends Member{}

//declare Member Union
Entity.union(Member, VIP, Normal);

//make Enum
const CouponType = new Enum("percent", "amount");

class Coupon extends Entity{
    #title = stringValue(this, "title");
    #type = enumValue(this, "type", CouponType);
    #value = numberValue(this, "value");
}

//parse union using parse method of union base class
const vipMember = Member.parse({
    name:"hika",
    point:1800,
    freeParking:3,
    until:"2022-12-31T00:00:00.000Z",
    vipCoupons:[
        {title:"iphone sale", type:"amount", value:10000},
        {title:"super market", type:"percent", value:10}
    ]
});

//same parse method but auto detect subtype from json
const normalMember = Member.parse({
    name:"easy",
    point:100
});

console.log(vipMember);
console.log(normalMember);
`;

const div = document.createElement("div");
div.innerHTML = `
<h1>EntityJS - Union & Enum</h1>
<h2>Entity Structure</h2>
<img src="sample1.png" style="width: 500px">

<h2>Source Code</h2>
<pre>${sourceCode}</pre>

<h2>Result - vipMember</h2>
<pre>const vipMember = ${JSON.stringify(vipMember, null, 2)}</pre>
<h2>Result - normalMember</h2>
<pre>const normalMember = ${JSON.stringify(normalMember, null, 2)}</pre>
`;

document.body.appendChild(div);
