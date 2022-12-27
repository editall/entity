import {Entity} from "entity";

let HTML = "";
const OK = ` <span class="ok">ok</span>`;
const FAIL = ` <span class="fail">fail</span>`;
let ISOK = true;
export function test<T extends Entity>(type: { new(): T }, json: any) {
    const html = {html: ""};
    const entity = Entity.parse(type, json, data => html.html += data);
    let isOk = entity ? isEntitySame(entity, json, html, 0) : false;
    if (!isOk) ISOK = false;
    HTML += `<h2>${type.name} - ${isOk ? OK : FAIL}</h2>` + html.html;
}
function isEntitySame(origin:Entity, json:any, html:{html:string}, depth:number):boolean{
    const [, fields] = origin.fields;
    let isOk = true;
    let temp = ``;
    Object.getOwnPropertyNames(origin).forEach(key => {
        // @ts-ignore
        const v = origin[key];
        const jsonValue = json[key];
        // @ts-ignore
        const type = fields[key].__meta__.type
        const h = {html:""};
        let ok = false;
        let isEntity = v instanceof Entity;
        if(isEntity){
            if(isEntitySame( v, jsonValue, h, depth + 1)) ok = true
        }else{
            if(isSame(v, jsonValue, h, depth + 1)) ok = true;
            temp += ``;
        }
        if(!ok) isOk = false;
        temp += `<div class="key">${ok ? OK :FAIL} ${String(key)} : ${type.name}</div>        
            ${!isEntity ? `<div>origin ${JSON.stringify(v)}</div>` : ""} 
            ${!isEntity ? `<div>json ${JSON.stringify(jsonValue)}</div>` : ""} 
            <div>${h.html}</div>`;
    });
    html.html += `<section style="margin-left:${depth*20}px">
<pre>origin[${origin.constructor.name}]: ${JSON.stringify(origin)}</pre>
<pre>json: ${JSON.stringify(json)}</pre>${temp}
</section>`;
    return isOk;
}
function isSame(origin: any, json: any, html: { html: string }, depth: number):boolean{
    if(origin && typeof origin === "object"){
        if(origin instanceof Array) return origin.every((item, index)=>isSame(item, json[index], html, depth));
        else if(origin instanceof Entity) return isEntitySame(origin, json, html, depth + 1);
        else return Object.getOwnPropertyNames(origin).every(key=>isSame(origin[key], json[key], html, depth));
    }else return origin === json;
}

export function render(){
    // @ts-ignore
    document.querySelector("#root").innerHTML = HTML;
}