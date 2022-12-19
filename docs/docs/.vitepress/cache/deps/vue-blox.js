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
  ref,
  renderList,
  resolveComponent,
  resolveDynamicComponent,
  withCtx
} from "./chunk-3T6VSYDD.js";

// node_modules/vue-blox/dist/vue-blox.es.js
var fe = Object.defineProperty;
var he = (i, a, u) => a in i ? fe(i, a, { enumerable: true, configurable: true, writable: true, value: u }) : i[a] = u;
var x = (i, a, u) => (he(i, typeof a != "symbol" ? a + "" : a, u), u);
var re = class {
  constructor() {
    x(this, "type", "");
    x(this, "props", {});
    x(this, "slots", {});
  }
};
var Q = class {
  constructor() {
    x(this, "entries", {});
  }
};
var se = class {
  constructor() {
    x(this, "componentMap", {});
  }
  register(a) {
    Object.assign(this.componentMap, a);
  }
  getComponentForType(a) {
    return this.componentMap[a];
  }
};
var D = class extends Error {
  constructor(u, c, g) {
    super(`${c}: ${JSON.stringify(g)}`);
    x(this, "message");
    x(this, "debugMessage");
    x(this, "context");
    this.message = u, this.debugMessage = c, this.context = g;
  }
};
var X = class {
  constructor() {
    x(this, "catalog", new se());
    x(this, "keyPlugins", []);
    x(this, "valuePlugins", []);
  }
};
var $ = X;
x($, "shared", new X());
var Be = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
var ae = { exports: {} };
(function(i, a) {
  (function(u, c) {
    i.exports = c();
  })(Be, function() {
    var u = Object.prototype.toString, c = Array.isArray || function(e) {
      return u.call(e) === "[object Array]";
    };
    function g(r) {
      return typeof r == "function";
    }
    function h(r) {
      return c(r) ? "array" : typeof r;
    }
    function d(r) {
      return r.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
    }
    function v(r, e) {
      return r != null && typeof r == "object" && e in r;
    }
    function k(r, e) {
      return r != null && typeof r != "object" && r.hasOwnProperty && r.hasOwnProperty(e);
    }
    var b = RegExp.prototype.test;
    function j(r, e) {
      return b.call(r, e);
    }
    var m = /\S/;
    function O(r) {
      return !j(m, r);
    }
    var S = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
      "/": "&#x2F;",
      "`": "&#x60;",
      "=": "&#x3D;"
    };
    function z(r) {
      return String(r).replace(/[&<>"'`=\/]/g, function(t) {
        return S[t];
      });
    }
    var R = /\s*/, N = /\s+/, H = /\s*=/, oe = /\s*\}/, ie = /#|\^|\/|>|\{|&|=|!/;
    function le(r, e) {
      if (!r)
        return [];
      var t = false, n = [], s = [], o = [], l = false, p = false, f = "", y = 0;
      function C() {
        if (l && !p)
          for (; o.length; )
            delete s[o.pop()];
        else
          o = [];
        l = false, p = false;
      }
      var U, q, Y;
      function Z(V) {
        if (typeof V == "string" && (V = V.split(N, 2)), !c(V) || V.length !== 2)
          throw new Error("Invalid tags: " + V);
        U = new RegExp(d(V[0]) + "\\s*"), q = new RegExp("\\s*" + d(V[1])), Y = new RegExp("\\s*" + d("}" + V[1]));
      }
      Z(e || E.tags);
      for (var w = new I(r), M, B, T, _, F, A; !w.eos(); ) {
        if (M = w.pos, T = w.scanUntil(U), T)
          for (var J = 0, pe = T.length; J < pe; ++J)
            _ = T.charAt(J), O(_) ? (o.push(s.length), f += _) : (p = true, t = true, f += " "), s.push(["text", _, M, M + 1]), M += 1, _ === `
` && (C(), f = "", y = 0, t = false);
        if (!w.scan(U))
          break;
        if (l = true, B = w.scan(ie) || "name", w.scan(R), B === "=" ? (T = w.scanUntil(H), w.scan(H), w.scanUntil(q)) : B === "{" ? (T = w.scanUntil(Y), w.scan(oe), w.scanUntil(q), B = "&") : T = w.scanUntil(q), !w.scan(q))
          throw new Error("Unclosed tag at " + w.pos);
        if (B == ">" ? F = [B, T, M, w.pos, f, y, t] : F = [B, T, M, w.pos], y++, s.push(F), B === "#" || B === "^")
          n.push(F);
        else if (B === "/") {
          if (A = n.pop(), !A)
            throw new Error('Unopened section "' + T + '" at ' + M);
          if (A[1] !== T)
            throw new Error('Unclosed section "' + A[1] + '" at ' + M);
        } else
          B === "name" || B === "{" || B === "&" ? p = true : B === "=" && Z(T);
      }
      if (C(), A = n.pop(), A)
        throw new Error('Unclosed section "' + A[1] + '" at ' + w.pos);
      return ce(ue(s));
    }
    function ue(r) {
      for (var e = [], t, n, s = 0, o = r.length; s < o; ++s)
        t = r[s], t && (t[0] === "text" && n && n[0] === "text" ? (n[1] += t[1], n[3] = t[3]) : (e.push(t), n = t));
      return e;
    }
    function ce(r) {
      for (var e = [], t = e, n = [], s, o, l = 0, p = r.length; l < p; ++l)
        switch (s = r[l], s[0]) {
          case "#":
          case "^":
            t.push(s), n.push(s), t = s[4] = [];
            break;
          case "/":
            o = n.pop(), o[5] = s[2], t = n.length > 0 ? n[n.length - 1][4] : e;
            break;
          default:
            t.push(s);
        }
      return e;
    }
    function I(r) {
      this.string = r, this.tail = r, this.pos = 0;
    }
    I.prototype.eos = function() {
      return this.tail === "";
    }, I.prototype.scan = function(e) {
      var t = this.tail.match(e);
      if (!t || t.index !== 0)
        return "";
      var n = t[0];
      return this.tail = this.tail.substring(n.length), this.pos += n.length, n;
    }, I.prototype.scanUntil = function(e) {
      var t = this.tail.search(e), n;
      switch (t) {
        case -1:
          n = this.tail, this.tail = "";
          break;
        case 0:
          n = "";
          break;
        default:
          n = this.tail.substring(0, t), this.tail = this.tail.substring(t);
      }
      return this.pos += n.length, n;
    };
    function K(r, e) {
      this.view = r, this.cache = { ".": this.view }, this.parent = e;
    }
    K.prototype.push = function(e) {
      return new K(e, this);
    }, K.prototype.lookup = function(e) {
      var t = this.cache, n;
      if (t.hasOwnProperty(e))
        n = t[e];
      else {
        for (var s = this, o, l, p, f = false; s; ) {
          if (e.indexOf(".") > 0)
            for (o = s.view, l = e.split("."), p = 0; o != null && p < l.length; )
              p === l.length - 1 && (f = v(o, l[p]) || k(o, l[p])), o = o[l[p++]];
          else
            o = s.view[e], f = v(s.view, e);
          if (f) {
            n = o;
            break;
          }
          s = s.parent;
        }
        t[e] = n;
      }
      return g(n) && (n = n.call(this.view)), n;
    };
    function P() {
      this.templateCache = {
        _cache: {},
        set: function(e, t) {
          this._cache[e] = t;
        },
        get: function(e) {
          return this._cache[e];
        },
        clear: function() {
          this._cache = {};
        }
      };
    }
    P.prototype.clearCache = function() {
      typeof this.templateCache < "u" && this.templateCache.clear();
    }, P.prototype.parse = function(e, t) {
      var n = this.templateCache, s = e + ":" + (t || E.tags).join(":"), o = typeof n < "u", l = o ? n.get(s) : void 0;
      return l == null && (l = le(e, t), o && n.set(s, l)), l;
    }, P.prototype.render = function(e, t, n, s) {
      var o = this.getConfigTags(s), l = this.parse(e, o), p = t instanceof K ? t : new K(t, void 0);
      return this.renderTokens(l, p, n, e, s);
    }, P.prototype.renderTokens = function(e, t, n, s, o) {
      for (var l = "", p, f, y, C = 0, U = e.length; C < U; ++C)
        y = void 0, p = e[C], f = p[0], f === "#" ? y = this.renderSection(p, t, n, s, o) : f === "^" ? y = this.renderInverted(p, t, n, s, o) : f === ">" ? y = this.renderPartial(p, t, n, o) : f === "&" ? y = this.unescapedValue(p, t) : f === "name" ? y = this.escapedValue(p, t, o) : f === "text" && (y = this.rawValue(p)), y !== void 0 && (l += y);
      return l;
    }, P.prototype.renderSection = function(e, t, n, s, o) {
      var l = this, p = "", f = t.lookup(e[1]);
      function y(q) {
        return l.render(q, t, n, o);
      }
      if (!!f) {
        if (c(f))
          for (var C = 0, U = f.length; C < U; ++C)
            p += this.renderTokens(e[4], t.push(f[C]), n, s, o);
        else if (typeof f == "object" || typeof f == "string" || typeof f == "number")
          p += this.renderTokens(e[4], t.push(f), n, s, o);
        else if (g(f)) {
          if (typeof s != "string")
            throw new Error("Cannot use higher-order sections without the original template");
          f = f.call(t.view, s.slice(e[3], e[5]), y), f != null && (p += f);
        } else
          p += this.renderTokens(e[4], t, n, s, o);
        return p;
      }
    }, P.prototype.renderInverted = function(e, t, n, s, o) {
      var l = t.lookup(e[1]);
      if (!l || c(l) && l.length === 0)
        return this.renderTokens(e[4], t, n, s, o);
    }, P.prototype.indentPartial = function(e, t, n) {
      for (var s = t.replace(/[^ \t]/g, ""), o = e.split(`
`), l = 0; l < o.length; l++)
        o[l].length && (l > 0 || !n) && (o[l] = s + o[l]);
      return o.join(`
`);
    }, P.prototype.renderPartial = function(e, t, n, s) {
      if (!!n) {
        var o = this.getConfigTags(s), l = g(n) ? n(e[1]) : n[e[1]];
        if (l != null) {
          var p = e[6], f = e[5], y = e[4], C = l;
          f == 0 && y && (C = this.indentPartial(l, y, p));
          var U = this.parse(C, o);
          return this.renderTokens(U, t, n, C, s);
        }
      }
    }, P.prototype.unescapedValue = function(e, t) {
      var n = t.lookup(e[1]);
      if (n != null)
        return n;
    }, P.prototype.escapedValue = function(e, t, n) {
      var s = this.getConfigEscape(n) || E.escape, o = t.lookup(e[1]);
      if (o != null)
        return typeof o == "number" && s === E.escape ? String(o) : s(o);
    }, P.prototype.rawValue = function(e) {
      return e[1];
    }, P.prototype.getConfigTags = function(e) {
      return c(e) ? e : e && typeof e == "object" ? e.tags : void 0;
    }, P.prototype.getConfigEscape = function(e) {
      if (e && typeof e == "object" && !c(e))
        return e.escape;
    };
    var E = {
      name: "mustache.js",
      version: "4.1.0",
      tags: ["{{", "}}"],
      clearCache: void 0,
      escape: void 0,
      parse: void 0,
      render: void 0,
      Scanner: void 0,
      Context: void 0,
      Writer: void 0,
      set templateCache(r) {
        W.templateCache = r;
      },
      get templateCache() {
        return W.templateCache;
      }
    }, W = new P();
    return E.clearCache = function() {
      return W.clearCache();
    }, E.parse = function(e, t) {
      return W.parse(e, t);
    }, E.render = function(e, t, n, s) {
      if (typeof e != "string")
        throw new TypeError('Invalid template! Template should be a "string" but "' + h(e) + '" was given as the first argument for mustache#render(template, view, partials)');
      return W.render(e, t, n, s);
    }, E.escape = z, E.Scanner = I, E.Context = K, E.Writer = P, E;
  });
})(ae);
var xe = class {
  handleValue(a, u) {
    return this.runMustache(a, u, 0, 10);
  }
  runMustache(a, u, c = 0, g = 10) {
    if (typeof a != "string" || !a.includes("{{"))
      return a;
    try {
      let h = ae.exports.render(a, u);
      return h.includes("{{") && c < 10 && (h = this.runMustache(h, u, c + 1)), h;
    } catch (h) {
      throw new D(
        "Mustache parsing failed.",
        `The call to runMustache() for value ${a} threw the error: ${h}`,
        void 0
      );
    }
  }
};
var Se = defineComponent({
  name: "BloxComponent",
  components: void 0,
  props: {
    catalog: {
      type: Object,
      required: false,
      default: $.shared.catalog
    },
    view: {
      type: Object,
      required: false,
      default: new re()
    },
    bindings: {
      type: Object,
      required: false,
      default: new Q()
    },
    valuePlugins: {
      type: Object,
      required: false,
      default: []
    }
  },
  setup(i) {
    const a = computed(() => {
      const c = i.valuePlugins;
      return c.length === 0 && c.push(...$.shared.valuePlugins), c.push(new xe()), c;
    });
    return {
      getProps: computed(() => {
        var j;
        const { view: c, bindings: g } = i, h = a.value, d = {}, v = Object.keys(g.entries);
        for (let m = 0; m < v.length; m += 1) {
          const O = v[m], S = ((j = g.entries[O]) == null ? void 0 : j.value) ?? g.entries[O];
          d[O] = S;
        }
        const k = Object.keys(c.props), b = {};
        for (let m = 0; m < k.length; m += 1) {
          const O = k[m], S = c.props[O];
          let R = (S == null ? void 0 : S.value) ?? S;
          for (let N = 0; N < h.length; N += 1)
            R = h[N].handleValue(R, d);
          b[O] = R;
        }
        return b;
      })
    };
  }
});
var Ee = (i, a) => {
  const u = i.__vccOpts || i;
  for (const [c, g] of a)
    u[c] = g;
  return u;
};
function Te(i, a, u, c, g, h) {
  const d = resolveComponent("BloxComponent", true);
  return i.view ? (openBlock(), createBlock(resolveDynamicComponent(i.catalog.getComponentForType(i.view.type)), normalizeProps(mergeProps({ key: 0 }, { ...i.getProps })), createSlots({ _: 2 }, [
    renderList(Object.keys(i.view.slots), (v) => ({
      name: v,
      fn: withCtx(() => [
        (openBlock(true), createElementBlock(Fragment, null, renderList(i.view.slots[v], (k) => (openBlock(), createBlock(d, {
          catalog: i.catalog,
          view: k,
          bindings: i.bindings,
          valuePlugins: i.valuePlugins
        }, null, 8, ["catalog", "view", "bindings", "valuePlugins"]))), 256))
      ])
    }))
  ]), 1040)) : createCommentVNode("", true);
}
var je = Ee(Se, [["render", Te]]);
function Ne(i) {
  return {
    install: (u, c) => {
      $.shared.catalog.register(i.catalog), $.shared.keyPlugins = i.keyPlugins ?? [], $.shared.valuePlugins = i.valuePlugins ?? [], u.component("BloxComponent", je);
    }
  };
}
function qe(i) {
  const a = new se();
  return a.register(i), a;
}
function Ae(i) {
  const a = new Q(), u = i ?? {}, c = Object.keys(u);
  for (let g = 0; g < c.length; g += 1) {
    const h = c[g], d = u[h];
    a.entries[h] = ref(d);
  }
  return a;
}
var Oe = class {
  handleKey(a, u, c, g) {
    const h = {};
    return h[a] = ref(u), {
      props: h,
      slots: void 0
    };
  }
};
var Re = class {
  handleKey(a, u, c, g) {
    if (!a.startsWith("bind:"))
      return;
    const h = a.substring(5, a.length);
    if (h.length === 0)
      throw new D(
        "Bind parsing failed.",
        "The value for the prop name for bound variable key/value pairs must be a string with length > 0.",
        {
          key: a,
          value: u
        }
      );
    const d = u;
    if (typeof d != "string")
      throw new D(
        "Bind parsing failed.",
        `The value for the variable name of bound variable key/value pairs must be a string. The value type found is a ${typeof d} for bound value ${a}.`,
        {
          key: a,
          value: u
        }
      );
    const v = {};
    return v[h] = c.entries[d], v[`onUpdate:${h}`] = (k) => {
      const b = c.entries[d];
      b.value = k;
    }, {
      props: v,
      slots: void 0
    };
  }
};
var Ue = class {
  handleKey(a, u, c, g) {
    if (!a.startsWith("slot:"))
      return;
    let h = a.substring(5, a.length);
    h.length === 0 && (h = "default");
    let d;
    if (Array.isArray(u) ? d = u : typeof u == "object" && (d = [u]), !d || d.length === 0)
      return;
    const v = [];
    for (let b = 0; b < d.length; b += 1) {
      const j = d[b], m = g(j);
      v.push(m);
    }
    const k = {};
    return k[h] = v, {
      props: void 0,
      slots: k
    };
  }
};
function Ve(i, a, u) {
  const c = u ?? [];
  c.push(new Re(), new Ue(), new Oe()), c.push(...$.shared.keyPlugins);
  const g = a ?? new Q(), h = i.type;
  if (typeof h != "string")
    throw new D(
      "View parsing failed.",
      'The value for the "type" key on a view must be a string.',
      {
        view: i
      }
    );
  const d = Object.keys(i), v = {}, k = {};
  for (let j = 0; j < d.length; j += 1) {
    const m = d[j];
    if (m === "type")
      continue;
    const O = i[m];
    for (let S = 0; S < c.length; S += 1) {
      const R = c[S].handleKey(m, O, g, (N) => Ve(N, g, u));
      if (R) {
        Object.assign(v, R.props), Object.assign(k, R.slots);
        break;
      }
    }
  }
  const b = new re();
  return b.type = h, b.props = v, b.slots = k, b;
}
export {
  Q as BloxBindings,
  se as BloxCatalog,
  je as BloxComponent,
  D as BloxError,
  re as BloxView,
  Ae as getBloxBindings,
  qe as getBloxCatalog,
  Ve as getBloxView,
  Ne as registerBlox
};
//# sourceMappingURL=vue-blox.js.map
