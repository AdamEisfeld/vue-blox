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
var j = (e, t, r) => t in e ? V(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r;
var p = (e, t, r) => (j(e, typeof t != "symbol" ? t + "" : t, r), r);
var B = class extends Error {
  constructor(r, i, n) {
    super(`${i}: ${JSON.stringify(n)}`);
    p(this, "isBloxError");
    p(this, "message");
    p(this, "debugMessage");
    p(this, "context");
    this.message = r, this.debugMessage = i, this.context = n, this.isBloxError = true;
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
  run(t, r, i, n, d) {
    const l = "bind:";
    if (!t.startsWith(l))
      return;
    const s = t.substring(l.length, t.length);
    if (s.length === 0)
      throw new B(
        "Bind parsing failed.",
        "The value for the prop name for bound variable key/value pairs must be a string with length > 0.",
        {
          key: t,
          value: r
        }
      );
    const o = r;
    if (typeof o != "string")
      throw new B(
        "Bind parsing failed.",
        `The value for the variable name of bound variable key/value pairs must be a string. The value type found is a ${typeof o} for bound value ${t}.`,
        {
          key: t,
          value: r
        }
      );
    n(t, void 0), n(s, i[o]), n(`onUpdate:${s}`, (a) => {
      i[o] = a;
    });
  }
};
var D = class {
  run(t, r, i, n, d) {
    const l = "slot:";
    if (!t.startsWith(l))
      return;
    let s = t.substring(l.length, t.length);
    s.length === 0 && (s = "default");
    let o;
    Array.isArray(r) ? o = r : typeof r == "object" && (o = [r]), !(!o || o.length === 0) && d(s, o);
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
  setup(e, { emit: t }) {
    const r = computed(() => {
      try {
        const n = e.plugins;
        return n.length === 0 && n.push(...g.shared.plugins), n.push(new z()), n.push(new D()), n;
      } catch (n) {
        return t("on:error", n), [];
      }
    });
    return {
      getView: computed(() => {
        const { view: n, variables: d } = e;
        if (!n)
          return {
            isSet: false,
            type: void 0,
            props: void 0,
            slots: void 0
          };
        const { type: l } = n, s = r.value, o = Object.keys(n), a = {};
        Object.assign(a, n);
        const b = {}, S = (u, c) => {
          c ? a[u] = c : delete a[u];
        }, O = (u, c) => {
          b[u] = c;
        };
        for (let u = 0; u < o.length; u += 1) {
          const c = o[u];
          let C = n[c];
          for (let f = 0; f < s.length; f += 1)
            s[f].run(c, C, d, S, O);
        }
        return {
          isSet: true,
          type: l,
          props: a,
          slots: b
        };
      }),
      emit: t
    };
  }
});
var J = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [i, n] of t)
    r[i] = n;
  return r;
};
function K(e, t, r, i, n, d) {
  const l = resolveComponent("BloxComponent", true);
  return e.getView.isSet && e.getView.type ? (openBlock(), createBlock(resolveDynamicComponent(e.catalog[e.getView.type]), normalizeProps(mergeProps({ key: 0 }, e.getView.props)), createSlots({ _: 2 }, [
    renderList(Object.keys(e.getView.slots ?? {}), (s) => ({
      name: s,
      fn: withCtx(() => [
        (openBlock(true), createElementBlock(Fragment, null, renderList((e.getView.slots ?? {})[s], (o) => (openBlock(), createBlock(l, {
          catalog: e.catalog,
          view: o,
          variables: e.variables,
          plugins: e.plugins,
          "onOn:error": t[0] || (t[0] = (a) => e.emit("on:error", a))
        }, null, 8, ["catalog", "view", "variables", "plugins"]))), 256))
      ])
    }))
  ]), 1040)) : createCommentVNode("", true);
}
var L = J(F, [["render", K]]);

export {
  B
};
//# sourceMappingURL=chunk-EXI6NJD3.js.map
