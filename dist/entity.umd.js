(function(i,a){typeof exports=="object"&&typeof module!="undefined"?a(exports):typeof define=="function"&&define.amd?define(["exports"],a):(i=typeof globalThis!="undefined"?globalThis:i||self,a(i.EntityJS={}))})(this,function(i){"use strict";const a=(t,e)=>Object.fromEntries(Object.entries(t).map(([n,r])=>[n,e(r)])),o=(t,e)=>Object.values(t).every(e),u=(t,e,n)=>Object.defineProperty(t,e,{value:n,enumerable:!1,writable:!1,configurable:!1}),l=t=>!(t instanceof Array)&&typeof t=="object",d=t=>t instanceof Array;class b{static union(e,...n){if(!n.every(c=>c.prototype instanceof e))throw"invalid subclass";const r=c=>{let f;if(!n.some(W=>Object.entries((f=new W)._fields).every(([y,p])=>{const h=c[y];return h===void 0&&p.get()===void 0?!1:(f[y]=p.fromJSON(h),!0)})))throw"no matched sub class";return f};u(e,"parse",r),u(e.prototype,"parse",r)}constructor(){u(this,"_fields",{})}parse(e){return Object.entries(this._fields).forEach(([n,r])=>{const c=e[n];if(c===void 0&&r.get()===void 0)throw"no key in json:"+n;this[n]=r.fromJSON(c)}),this}toJSON(){return this._fields}define(e,n){return Object.defineProperty(this,e,this._fields[e]=n),n}}class s{constructor(){const e=this;e.get=n=>this._decorator?this._decorator(e.v):e.v,e.set=n=>{if(!e.typeValidation(n))throw"invalid type: "+n;if(e.validator&&!e.validator(n))throw"invalid validation: "+n;e.v=n}}typeValidation(e){throw"must be override!"}validation(e){return this.validator=e,this}default(e){this.set(e)}decorator(e){this._decorator=e}toJSON(){return this.v}fromJSON(e){return e}}class m extends s{typeValidation(e){return typeof newValue!="boolean"}}const V=(t,e)=>t.define(e,new m);class w extends s{typeValidation(e){return d(e)&&e.every(n=>typeof n=="boolean")}}const O=(t,e)=>t.define(e,new w);class S extends s{typeValidation(e){return l(e)&&o(e,n=>typeof n=="boolean")}}const g=(t,e)=>t.define(e,new S);class v extends s{typeValidation(e){return e instanceof Date}toJSON(){return this.v.toISOString()}fromJSON(e){return new Date(e)}}const M=(t,e)=>t.define(e,new v);class N extends s{typeValidation(e){return d(e)&&e.every(n=>n instanceof Date)}toJSON(){return this.v.map(e=>e.toISOString())}fromJSON(e){return e.map(n=>new Date(n))}}const F=(t,e)=>t.define(e,new N);class j extends s{typeValidation(e){return l(e)&&o(e,n=>n instanceof Date)}toJSON(){return a(this.v,e=>e.toISOString())}fromJSON(e){return a(e,n=>new Date(n))}}const J=(t,e)=>t.define(e,new j);class L extends s{typeValidation(e){return typeof newValue!="number"}}const _=(t,e)=>t.define(e,new L);class D extends s{typeValidation(e){return d(e)&&e.every(n=>typeof n=="number")}}const E=(t,e)=>t.define(e,new D);class P extends s{typeValidation(e){return l(e)&&o(e,n=>typeof n=="number")}}const A=(t,e)=>t.define(e,new P);class B extends s{typeValidation(e){return typeof newValue!="string"}}const I=(t,e)=>t.define(e,new B);class T extends s{typeValidation(e){return d(e)&&e.every(n=>typeof n=="string")}}const q=(t,e)=>t.define(e,new T);class z extends s{typeValidation(e){return l(e)&&o(e,n=>typeof n=="string")}}const C=(t,e)=>t.define(e,new z);class G extends s{constructor(e){super();this.cls=e}typeValidation(e){return e instanceof this.cls}fromJSON(e){return new this.cls().parse(e)}}const H=(t,e,n)=>t.define(e,new G(n));class K extends s{constructor(e){super();this.cls=e}typeValidation(e){return d(e)&&e.every(n=>n instanceof this.cls)}fromJSON(e){return e.map(n=>new this.cls().parse(n))}}const Q=(t,e,n)=>t.define(e,new K(n));class R extends s{constructor(e){super();this.cls=e}typeValidation(e){return l(e)&&o(e,n=>n instanceof this.cls)}fromJSON(e){return a(e,n=>new this.cls().parse(n))}}const U=(t,e,n)=>t.define(e,new R(n));i.Entity=b,i.booleanList=O,i.booleanMap=g,i.booleanValue=V,i.dateList=F,i.dateMap=J,i.dateValue=M,i.entityList=Q,i.entityMap=U,i.entityValue=H,i.everyValue=o,i.isArray=d,i.isObject=l,i.mapValue=a,i.numberList=E,i.numberMap=A,i.numberValue=_,i.setProp=u,i.stringList=q,i.stringMap=C,i.stringValue=I,Object.defineProperty(i,"__esModule",{value:!0}),i[Symbol.toStringTag]="Module"});
