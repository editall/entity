const v = /* @__PURE__ */ new WeakMap(), b = (h, t) => {
  if (v.has(h) || v.set(h, /* @__PURE__ */ new WeakSet()), v.get(h)?.has(t) == !0)
    return !0;
  const n = t.prototype;
  let e = h.prototype, u = 100;
  do {
    if (e === n)
      return v.get(h)?.add(t), !0;
    e = Object.getPrototypeOf(e);
  } while (e && u--);
  return !1;
}, g = (h, t, n, e, u) => {
  if (typeof e != typeof n) {
    u.push(`invalid value type. json:${e}[${typeof e}], type:[${typeof n}]`);
    return;
  }
  if (t && !t(e)) {
    u.push(`validation error. json:${e}`);
    return;
  }
  return h ? h(e) : e;
}, m = (h, t, n, e, u) => {
  if (t && !t(e)) {
    u.push(`validation error. json:${e}`);
    return;
  }
  let r;
  if (h)
    r = h(e);
  else {
    let i = n.factory;
    if (b(i, $)) {
      if ($.subTypes(i, (a) => (r = p.parse(a, e), !r)), r)
        return r;
      u.push(`no matched union. json:${e}`);
      return;
    } else if (b(i, p))
      r = p.parse(i, e, (a) => u.push(...a));
    else if (r = new i(), r.fromJSON)
      r.fromJSON(e);
    else {
      const a = Object.keys(e);
      for (let s = 0, l = a.length; s < l; s++) {
        const o = a[s];
        r[o] = e[o];
      }
    }
  }
  return r;
};
class f {
  static value = new f("value", (t, n, e, u, r, i) => {
    const a = g(t, n, e.instance, r, i);
    if (i.length) {
      i.push(`${i.pop()}, key:${u}`);
      return;
    }
    return a;
  });
  static object = new f("object", (t, n, e, u, r, i) => {
    const a = m(t, n, e, r, i);
    if (i.length) {
      i.push(`${i.pop()}, key:${u}`);
      return;
    }
    return a;
  });
  static valueArray = new f("valueArray", (t, n, e, u, r, i) => {
    if (!(r instanceof Array)) {
      i.push(`invalid array. json: ${r}`);
      return;
    }
    e.instance === void 0 && (e.instance = e.factory());
    const a = [];
    for (let s = 0, l = r.length; s < l; s++) {
      const o = g(t, n, e.instance, r[s], i);
      if (i.length) {
        i.push(`invalid array item type. item: ${r[s]}, index:${s}, error:${i.pop()}, key:${u}`);
        return;
      }
      a.push(o);
    }
    return a;
  });
  static objectArray = new f("objectArray", (t, n, e, u, r, i) => {
    if (!(r instanceof Array)) {
      i.push(`invalid array. json: ${r}`);
      return;
    }
    const a = [];
    for (let s = 0, l = r.length; s < l; s++) {
      const o = m(t, n, e, r[s], i);
      if (i.length) {
        i.push(`invalid array item type. item: ${r[s]}, index:${s}, error:${i.pop()}, key:${u}`);
        return;
      }
      a.push(o);
    }
    return a;
  });
  static valueMap = new f("valueMap", (t, n, e, u, r, i) => {
    if (!r || typeof r != "object") {
      i.push(`invalid object. json: ${r}`);
      return;
    }
    const a = Object.keys(r), s = {};
    e.instance === void 0 && (e.instance = e.factory());
    for (let l = 0, o = a.length; l < o; l++) {
      const c = a[l], y = g(t, n, e.instance, r[c], i);
      if (i.length) {
        i.push(`invalid object item type. item: ${r[c]}, objectkey:${c}, error:${i.pop()}, key:${c}`);
        return;
      }
      s[c] = y;
    }
    return s;
  });
  static objectMap = new f("objectMap", (t, n, e, u, r, i) => {
    if (!r || typeof r != "object") {
      i.push(`invalid object. json: ${r}`);
      return;
    }
    const a = Object.keys(r), s = {};
    for (let l = 0, o = a.length; l < o; l++) {
      const c = a[l], y = m(t, n, e, r[c], i);
      if (i.length) {
        i.push(`invalid object item type. item: ${r[c]}, objectkey:${c}, error:${i.pop()}, key:${c}`);
        return;
      }
      s[c] = y;
    }
    return s;
  });
  fromJSON;
  name;
  constructor(t, n) {
    this.name = t, this.fromJSON = n;
  }
}
const d = /* @__PURE__ */ new WeakMap();
class p {
  static parse(t, n, e, u) {
    if (typeof n == "string" && (n = JSON.parse(n)), !u && b(t, $)) {
      let l = [], o;
      return $.subTypes(t, (c) => (l.push(c.name), o = p.parse(c, n, void 0, !0), !o)), o || (e && e([`no matched union. union:${t.name}, subType:${l.join(",")}`]), null);
    }
    const r = new t(), [i, a] = r.fields, s = [];
    for (let l = 0, o = i.length; l < o; l++) {
      const c = i[l];
      if (typeof c == "symbol")
        continue;
      const y = n[c], { validator: O, optional: S, fromJSON: w, __meta__: k } = a[c];
      if (y === void 0) {
        if (S)
          continue;
        s.push(`no key. key:${String(c)}`);
        break;
      }
      if (!k) {
        s.push(`no meta data. key: ${String(c)}`);
        break;
      }
      const _ = k.type.fromJSON(w, O, k, c, y, s);
      if (_ === void 0)
        break;
      r[c] = _;
    }
    return s.length ? (e && e(s), null) : r;
  }
  #e = [];
  get fields() {
    if (!d.has(this.constructor)) {
      const t = Object.getOwnPropertyNames(this);
      d.set(
        this.constructor,
        [
          t,
          t.reduce((n, e, u) => (n[e] = this.#e[u], n), {})
        ]
      );
    }
    return d.get(this.constructor);
  }
  toJSON() {
    const [t, n] = this.fields;
    return t.reduce((e, u) => {
      const r = this[u];
      return e[u] = n[u].toJSON?.(r) ?? r, e;
    }, {});
  }
  value(t, n = {}) {
    const e = t();
    if (typeof e == "object")
      throw `${e} is no value`;
    return n.__meta__ = {
      type: f.value,
      factory: t,
      instance: e
    }, this.#e.push(n), e;
  }
  object(t, n = {}) {
    return n.__meta__ = {
      type: f.object,
      factory: t
    }, this.#e.push(n), {};
  }
  valueArray(t, n = {}) {
    return n.__meta__ = {
      type: f.valueArray,
      factory: t
    }, this.#e.push(n), [];
  }
  objectArray(t, n = {}) {
    return n.__meta__ = {
      type: f.objectArray,
      factory: t
    }, this.#e.push(n), {};
  }
  valueMap(t, n = {}) {
    return n.__meta__ = {
      type: f.valueMap,
      factory: t
    }, this.#e.push(n), {};
  }
  objectMap(t, n = {}) {
    return n.__meta__ = {
      type: f.objectMap,
      factory: t
    }, this.#e.push(n), {};
  }
  get STRING() {
    return this.value(String);
  }
  string(t) {
    return this.value(String, t);
  }
  get BOOL() {
    return this.value(Boolean);
  }
  bool(t) {
    return this.value(Boolean, t);
  }
  get NUMBER() {
    return this.value(Number);
  }
  number(t) {
    return this.value(Number, t);
  }
}
class $ extends p {
  static subTypes(t, n) {
    const e = Object.values(t);
    for (let u = 0, r = e.length; u < r; u++) {
      const i = e[u];
      if (i && typeof i == "function" && b(i, t) && !n(i))
        break;
    }
  }
}
export {
  p as Entity,
  f as FieldType,
  $ as Union
};
