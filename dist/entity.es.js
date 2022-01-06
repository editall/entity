const mapValue = (target, block) => Object.fromEntries(Object.entries(target).map(([key, value]) => [key, block(value)]));
const everyValue = (target, block) => Object.values(target).every(block);
const setProp = (target, key, value) => Object.defineProperty(target, key, { value, enumerable: false, writable: false, configurable: false });
const isObject = (v) => !(v instanceof Array) && typeof v == "object";
const isArray = (v) => v instanceof Array;
class Entity {
  static union(base, ...sub) {
    if (!sub.every((cls) => cls.prototype instanceof base))
      throw "invalid subclass";
    const parse = (json) => {
      let target;
      if (!sub.some((cls) => Object.entries((target = new cls())._fields).every(([key, field]) => {
        const jsonValue = json[key];
        if (jsonValue === void 0 && field.get() === void 0)
          return false;
        else {
          target[key] = field.fromJSON(jsonValue);
          return true;
        }
      })))
        throw "no matched sub class";
      return target;
    };
    setProp(base, "parse", parse);
    setProp(base.prototype, "parse", parse);
  }
  constructor() {
    setProp(this, "_fields", {});
  }
  parse(json) {
    Object.entries(this._fields).forEach(([key, field]) => {
      const jsonValue = json[key];
      if (jsonValue === void 0 && field.get() === void 0)
        throw "no key in json:" + key;
      this[key] = field.fromJSON(jsonValue);
    });
    return this;
  }
  toJSON() {
    return this._fields;
  }
  define(field, descriptor) {
    Object.defineProperty(this, field, this._fields[field] = descriptor);
    return descriptor;
  }
}
class Field {
  constructor() {
    const self = this;
    self.get = (_) => this._decorator ? this._decorator(self.v) : self.v;
    self.set = (newValue2) => {
      if (!self.typeValidation(newValue2))
        throw "invalid type: " + newValue2;
      if (self.validator && !self.validator(newValue2))
        throw "invalid validation: " + newValue2;
      self.v = newValue2;
    };
  }
  typeValidation(v) {
    throw "must be override!";
  }
  validation(validator) {
    this.validator = validator;
    return this;
  }
  default(v) {
    this.set(v);
  }
  decorator(v) {
    this._decorator = v;
  }
  toJSON() {
    return this.v;
  }
  fromJSON(v) {
    return v;
  }
}
class BooleanField extends Field {
  typeValidation(v) {
    return typeof newValue != "boolean";
  }
}
const booleanValue = (entity, key) => entity.define(key, new BooleanField());
class BooleanListField extends Field {
  typeValidation(v) {
    return isArray(v) && v.every((item) => typeof item == "boolean");
  }
}
const booleanList = (entity, key) => entity.define(key, new BooleanListField());
class BooleanMapField extends Field {
  typeValidation(v) {
    return isObject(v) && everyValue(v, (item) => typeof item == "boolean");
  }
}
const booleanMap = (entity, key) => entity.define(key, new BooleanMapField());
class DateField extends Field {
  typeValidation(v) {
    return v instanceof Date;
  }
  toJSON() {
    return this.v.toISOString();
  }
  fromJSON(v) {
    return new Date(v);
  }
}
const dateValue = (entity, key) => entity.define(key, new DateField());
class DateListField extends Field {
  typeValidation(v) {
    return isArray(v) && v.every((item) => item instanceof Date);
  }
  toJSON() {
    return this.v.map((item) => item.toISOString());
  }
  fromJSON(v) {
    return v.map((item) => new Date(item));
  }
}
const dateList = (entity, key) => entity.define(key, new DateListField());
class DateMapField extends Field {
  typeValidation(v) {
    return isObject(v) && everyValue(v, (item) => item instanceof Date);
  }
  toJSON() {
    return mapValue(this.v, (v) => v.toISOString());
  }
  fromJSON(v) {
    return mapValue(v, (v2) => new Date(v2));
  }
}
const dateMap = (entity, key) => entity.define(key, new DateMapField());
class NumberField extends Field {
  typeValidation(v) {
    return typeof newValue != "number";
  }
}
const numberValue = (entity, key) => entity.define(key, new NumberField());
class NumberListField extends Field {
  typeValidation(v) {
    return isArray(v) && v.every((item) => typeof item == "number");
  }
}
const numberList = (entity, key) => entity.define(key, new NumberListField());
class NumberMapField extends Field {
  typeValidation(v) {
    return isObject(v) && everyValue(v, (item) => typeof item == "number");
  }
}
const numberMap = (entity, key) => entity.define(key, new NumberMapField());
class StringField extends Field {
  typeValidation(v) {
    return typeof newValue != "string";
  }
}
const stringValue = (entity, key) => entity.define(key, new StringField());
class StringListField extends Field {
  typeValidation(v) {
    return isArray(v) && v.every((item) => typeof item == "string");
  }
}
const stringList = (entity, key) => entity.define(key, new StringListField());
class StringMapField extends Field {
  typeValidation(v) {
    return isObject(v) && everyValue(v, (item) => typeof item == "string");
  }
}
const stringMap = (entity, key) => entity.define(key, new StringMapField());
class EntityField extends Field {
  constructor(cls) {
    super();
    this.cls = cls;
  }
  typeValidation(v) {
    return v instanceof this.cls;
  }
  fromJSON(v) {
    return new this.cls().parse(v);
  }
}
const entityValue = (entity, key, cls) => entity.define(key, new EntityField(cls));
class EntityListField extends Field {
  constructor(cls) {
    super();
    this.cls = cls;
  }
  typeValidation(v) {
    return isArray(v) && v.every((item) => item instanceof this.cls);
  }
  fromJSON(v) {
    return v.map((json) => new this.cls().parse(json));
  }
}
const entityList = (entity, key, cls) => entity.define(key, new EntityListField(cls));
class EntityMapField extends Field {
  constructor(cls) {
    super();
    this.cls = cls;
  }
  typeValidation(v) {
    return isObject(v) && everyValue(v, (item) => item instanceof this.cls);
  }
  fromJSON(v) {
    return mapValue(v, (json) => new this.cls().parse(json));
  }
}
const entityMap = (entity, key, cls) => entity.define(key, new EntityMapField(cls));
export { Entity, booleanList, booleanMap, booleanValue, dateList, dateMap, dateValue, entityList, entityMap, entityValue, everyValue, isArray, isObject, mapValue, numberList, numberMap, numberValue, setProp, stringList, stringMap, stringValue };
