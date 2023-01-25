import {
  Fragment,
  computed,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createSlots,
  defineComponent,
  mergeProps,
  normalizeProps,
  openBlock,
  renderList,
  resolveComponent,
  resolveDynamicComponent,
  withCtx
} from "./chunk-3T6VSYDD.js";

// node_modules/vue-blox/dist/vue-blox.es.js
var V = Object.defineProperty;
var j = (t, e, r) => e in t ? V(t, e, { enumerable: true, configurable: true, writable: true, value: r }) : t[e] = r;
var p = (t, e, r) => (j(t, typeof e != "symbol" ? e + "" : e, r), r);
var B = class extends Error {
  constructor(r, i, o) {
    super(`${i}: ${JSON.stringify(o)}`);
    p(this, "isBloxError");
    p(this, "message");
    p(this, "debugMessage");
    p(this, "context");
    this.message = r, this.debugMessage = i, this.context = o, this.isBloxError = true;
  }
  static asBloxError(r) {
    return r.isBloxError ? r : void 0;
  }
};
var m = class {
  constructor() {
    p(this, "catalog", {});
    p(this, "plugins", []);
  }
};
var g = m;
p(g, "shared", new m());
var z = class {
  run(e, r, i, o, d) {
    const l = "bind:";
    if (!e.startsWith(l))
      return;
    const n = e.substring(l.length, e.length);
    if (n.length === 0)
      throw new B(
        "Bind parsing failed.",
        "The value for the prop name for bound variable key/value pairs must be a string with length > 0.",
        {
          key: e,
          value: r
        }
      );
    const s = r;
    if (typeof s != "string")
      throw new B(
        "Bind parsing failed.",
        `The value for the variable name of bound variable key/value pairs must be a string. The value type found is a ${typeof s} for bound value ${e}.`,
        {
          key: e,
          value: r
        }
      );
    o(e, void 0), o(n, i[s]), o(`onUpdate:${n}`, (a) => {
      i[s] = a;
    });
  }
};
var D = class {
  run(e, r, i, o, d) {
    const l = "slot:";
    if (!e.startsWith(l))
      return;
    let n = e.substring(l.length, e.length);
    n.length === 0 && (n = "default");
    let s;
    Array.isArray(r) ? s = r : typeof r == "object" && (s = [r]), !(!s || s.length === 0) && d(n, s);
  }
};
var F = defineComponent({
  name: "BloxComponent",
  components: void 0,
  props: {
    catalog: {
      type: Object,
      required: false,
      default: g.shared.catalog
    },
    view: {
      type: Object,
      required: false,
      default: void 0
    },
    variables: {
      type: Object,
      required: false,
      default: {}
    },
    plugins: {
      type: Object,
      required: false,
      default: []
    }
  },
  emits: [
    "on:error"
  ],
  setup(t, { emit: e }) {
    const r = computed(() => {
      try {
        const o = t.plugins;
        return o.length === 0 && o.push(...g.shared.plugins), o.push(new z()), o.push(new D()), o;
      } catch (o) {
        return e("on:error", o), [];
      }
    });
    return {
      getView: computed(() => {
        try {
          const { view: o, variables: d } = t;
          if (!o)
            return {
              isSet: false,
              type: void 0,
              props: void 0,
              slots: void 0
            };
          const { type: l } = o, n = r.value, s = Object.keys(o), a = {};
          Object.assign(a, o);
          const v = {}, S = (u, c) => {
            c ? a[u] = c : delete a[u];
          }, O = (u, c) => {
            v[u] = c;
          };
          for (let u = 0; u < s.length; u += 1) {
            const c = s[u];
            let C = o[c];
            for (let f = 0; f < n.length; f += 1)
              n[f].run(c, C, d, S, O);
          }
          return {
            isSet: true,
            type: l,
            props: a,
            slots: v
          };
        } catch (o) {
          return e("on:error", o), {
            isSet: false,
            type: void 0,
            props: {},
            slots: {}
          };
        }
      }),
      emit: e
    };
  }
});
var J = (t, e) => {
  const r = t.__vccOpts || t;
  for (const [i, o] of e)
    r[i] = o;
  return r;
};
function K(t, e, r, i, o, d) {
  const l = resolveComponent("BloxComponent", true);
  return t.getView.isSet && t.getView.type ? (openBlock(), createBlock(resolveDynamicComponent(t.catalog[t.getView.type]), normalizeProps(mergeProps({ key: 0 }, t.getView.props)), createSlots({ _: 2 }, [
    renderList(Object.keys(t.getView.slots ?? {}), (n) => ({
      name: n,
      fn: withCtx(() => [
        (openBlock(true), createElementBlock(Fragment, null, renderList((t.getView.slots ?? {})[n], (s) => (openBlock(), createBlock(l, {
          catalog: t.catalog,
          view: s,
          variables: t.variables,
          plugins: t.plugins,
          "onOn:error": e[0] || (e[0] = (a) => t.emit("on:error", a))
        }, null, 8, ["catalog", "view", "variables", "plugins"]))), 256))
      ])
    }))
  ]), 1040)) : createCommentVNode("", true);
}
var L = J(F, [["render", K]]);
function I(t) {
  return {
    install: (r, i) => {
      Object.assign(g.shared.catalog, t.catalog), g.shared.plugins = t.plugins ?? [], r.component("BloxComponent", L);
    }
  };
}

export {
  B,
  L,
  I
};
//# sourceMappingURL=chunk-ZYMVSQD5.js.map
