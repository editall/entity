const p = /* @__PURE__ */ new WeakMap(), b = (h, e) => {
  if (p.has(h) || p.set(h, /* @__PURE__ */ new WeakSet()), p.get(h)?.has(e) == !0)
    return !0;
  const n = e.prototype;
  let t = h.prototype, u = 100;
  do {
    if (t === n)
      return p.get(h)?.add(e), !0;
    t = Object.getPrototypeOf(t);
  } while (t && u--);
  return !1;
}, k = (h, e, n, t, u, i) => {
  if (typeof u != typeof t) {
    i.push(`invalid value type. json:${u}[${typeof u}], type:[${typeof t}]`);
    return;
  }
  if (e && !e(u)) {
    i.push(`validation error. json:${u}`);
    return;
  }
  return h ? h(u) : u;
}, g = (h, e, n, t, u) => {
  let i = n.factory, r;
  if (b(i, v)) {
    if (v.subTypes(i, (a) => (r = y.parse(a, t), !r)), r)
      return r;
    u.push(`no matched union. json:${t}`);
    return;
  } else if (b(i, y))
    r = y.parse(n.factory, t, (a) => u.push(...a));
  else if (r = new n.factory(), h)
    r = h(r);
  else if (r.fromJSON)
    r.fromJSON(t);
  else {
    const a = Object.keys(t);
    for (let s = 0, l = a.length; s < l; s++) {
      const o = a[s];
      r[o] = t[o];
    }
  }
  if (e && !e(t)) {
    u.push(`validation error. json:${t}`);
    return;
  }
  return r;
};
class f {
  static value = new f("value", (e, n, t, u, i, r) => {
    const a = k(e, n, t, t.instance, i, r);
    if (r.length) {
      r.push(`${r.pop()}, key:${u}`);
      return;
    }
    return a;
  });
  static object = new f("object", (e, n, t, u, i, r) => {
    const a = g(e, n, t, i, r);
    if (r.length) {
      r.push(`${r.pop()}, key:${u}`);
      return;
    }
    return a;
  });
  static valueArray = new f("valueArray", (e, n, t, u, i, r) => {
    if (!(i instanceof Array)) {
      r.push(`invalid array. json: ${i}`);
      return;
    }
    t.instance === void 0 && (t.instance = t.factory());
    const a = [];
    for (let s = 0, l = i.length; s < l; s++)
      if (a.push(k(e, n, t, t.instance, i[s], r)), r.length) {
        r.push(`invalid array item type. item: ${i[s]}, index:${s}, error:${r.pop()}, key:${u}`);
        return;
      }
    return a;
  });
  static objectArray = new f("objectArray", (e, n, t, u, i, r) => {
    if (!(i instanceof Array)) {
      r.push(`invalid array. json: ${i}`);
      return;
    }
    const a = [];
    for (let s = 0, l = i.length; s < l; s++)
      if (a.push(g(e, n, t, i[s], r)), r.length) {
        r.push(`invalid array item type. item: ${i[s]}, index:${s}, error:${r.pop()}, key:${u}`);
        return;
      }
    return a;
  });
  static valueMap = new f("valueMap", (e, n, t, u, i, r) => {
    if (!i || typeof i != "object") {
      r.push(`invalid object. json: ${i}`);
      return;
    }
    const a = Object.keys(i), s = {};
    t.instance === void 0 && (t.instance = t.factory());
    for (let l = 0, o = a.length; l < o; l++) {
      const c = a[l];
      if (s[c] = k(e, n, t, t.instance, i[c], r), r.length) {
        r.push(`invalid object item type. item: ${i[c]}, objectkey:${c}, error:${r.pop()}, key:${c}`);
        return;
      }
    }
    return s;
  });
  static objectMap = new f("objectMap", (e, n, t, u, i, r) => {
    if (!i || typeof i != "object") {
      r.push(`invalid object. json: ${i}`);
      return;
    }
    const a = Object.keys(i), s = {};
    for (let l = 0, o = a.length; l < o; l++) {
      const c = a[l];
      if (s[c] = g(e, n, t, i[c], r), r.length) {
        r.push(`invalid object item type. item: ${i[c]}, objectkey:${c}, error:${r.pop()}, key:${c}`);
        return;
      }
    }
    return s;
  });
  fromJSON;
  name;
  constructor(e, n) {
    this.name = e, this.fromJSON = n;
  }
}
const d = /* @__PURE__ */ new WeakMap();
class y {
  static parse(e, n, t, u) {
    if (typeof n == "string" && (n = JSON.parse(n)), !u && b(e, v)) {
      let l = [], o;
      return v.subTypes(e, (c) => (l.push(c.name), o = y.parse(c, n, void 0, !0), !o)), o || (t && t([`no matched union. union:${e.name}, subType:${l.join(",")}`]), null);
    }
    const i = new e(), [r, a] = i.fields, s = [];
    for (let l = 0, o = r.length; l < o; l++) {
      const c = r[l];
      if (typeof c == "symbol")
        continue;
      const m = n[c], { validator: O, optional: S, fromJSON: w, __meta__: $ } = a[c];
      if (m === void 0) {
        if (S)
          continue;
        s.push(`no key. key:${String(c)}`);
        break;
      }
      if (!$) {
        s.push(`no meta data. key: ${String(c)}`);
        break;
      }
      const _ = $.type.fromJSON(w, O, $, c, m, s);
      if (_ === void 0)
        break;
      i[c] = _;
    }
    return s.length ? (t && t(s), null) : i;
  }
  #e = [];
  get fields() {
    if (!d.has(this.constructor)) {
      const e = Reflect.ownKeys(this);
      d.set(
        this.constructor,
        [
          e,
          e.reduce((n, t, u) => (n[t] = this.#e[u], n), {})
        ]
      );
    }
    return d.get(this.constructor);
  }
  toJSON() {
    const [e, n] = this.fields;
    return e.reduce((t, u) => {
      const i = this[u];
      return t[u] = n[u].toJSON?.(i) ?? i, t;
    }, {});
  }
  value(e, n = {}) {
    const t = e();
    if (typeof t == "object")
      throw `${t} is no value`;
    return n.__meta__ = {
      type: f.value,
      factory: e,
      instance: t
    }, this.#e.push(n), t;
  }
  object(e, n = {}) {
    return n.__meta__ = {
      type: f.object,
      factory: e
    }, this.#e.push(n), {};
  }
  valueArray(e, n = {}) {
    return n.__meta__ = {
      type: f.valueArray,
      factory: e
    }, this.#e.push(n), [];
  }
  objectArray(e, n = {}) {
    return n.__meta__ = {
      type: f.objectArray,
      factory: e
    }, this.#e.push(n), {};
  }
  valueMap(e, n = {}) {
    return n.__meta__ = {
      type: f.valueMap,
      factory: e
    }, this.#e.push(n), {};
  }
  objectMap(e, n = {}) {
    return n.__meta__ = {
      type: f.objectMap,
      factory: e
    }, this.#e.push(n), {};
  }
  get STRING() {
    return this.value(String);
  }
  string(e) {
    return this.value(String, e);
  }
  get BOOL() {
    return this.value(Boolean);
  }
  bool(e) {
    return this.value(Boolean, e);
  }
  get NUMBER() {
    return this.value(Number);
  }
  number(e) {
    return this.value(Number, e);
  }
}
class v extends y {
  static subTypes(e, n) {
    const t = Object.values(e);
    for (let u = 0, i = t.length; u < i; u++) {
      const r = t[u];
      if (r && typeof r == "function" && b(r, e) && !n(r))
        break;
    }
  }
}
export {
  y as Entity,
  f as FieldType,
  v as Union
};
