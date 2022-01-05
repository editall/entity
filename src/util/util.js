const mapValue = (target, block)=>Object.fromEntries(
    Object.entries(target).map(([key, value])=>[key, block(value)])
);

const everyValue = (target, block)=>Object.values(target).every(block);

const setProp = (target, key, value)=>Object.defineProperty(
    target,
    key,
    {value, enumerable:false, writable:false, configurable:false}
);

const isObject = v=>!(v instanceof Array) && typeof v == "object";
const isArray = v=>v instanceof Array;

export {mapValue, everyValue, setProp, isObject, isArray};