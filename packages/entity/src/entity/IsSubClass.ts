const cache: WeakMap<{ new(): any }, WeakSet<{ new(): any }>> = new WeakMap();
export const isSubClass = (subClass: { new(): any }, superClass: { new(): any }) => {
    if(!cache.has(subClass)) cache.set(subClass, new WeakSet());
    if(cache.get(subClass)?.has(superClass) == true) return true;

    const superProto = superClass.prototype;
    let proto = subClass.prototype;
    let limit = 100;
    do {
        if (proto === superProto){
            cache.get(subClass)?.add(superClass);
            return true;
        }
        // @ts-ignore
        proto = Object.getPrototypeOf(proto);
    } while (proto && limit--);
    return false;
}