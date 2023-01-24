import {
  B
} from "./chunk-EXI6NJD3.js";
import {
  toRaw
} from "./chunk-3T6VSYDD.js";
import "./chunk-TWLJ45QX.js";

// node_modules/vue-blox-expressions/dist/vue-blox-expressions.es.js
var v = Object.defineProperty;
var b = (r, t, e) => t in r ? v(r, t, { enumerable: true, configurable: true, writable: true, value: e }) : r[t] = e;
var g = (r, t, e) => (b(r, typeof t != "symbol" ? t + "" : t, e), e);
var _ = class {
  constructor(t) {
    g(this, "parser");
    t.functions.internal_invokeFunctions = (...e) => () => {
      for (let o = 0; o < e.length; o += 1) {
        const s = e[o];
        s();
      }
    }, this.parser = t;
  }
  run(t, e, o, s, d) {
    const l = "compute:";
    if (!t.startsWith(l))
      return;
    const c = t.substring(l.length, t.length);
    if (c.length === 0)
      throw new B(
        "Compute parsing failed.",
        "The value for the prop name for compute must be a string with length > 0.",
        {
          key: t,
          value: e
        }
      );
    const u = e;
    if (/^__proto__|prototype|constructor$/.test(u))
      throw new B(
        "Expression parsing failed.",
        `The call to parser.evaluate() for value ${e} was aborted because prototype access was detected.`,
        void 0
      );
    const p = {};
    Object.assign(p, toRaw(o));
    try {
      const n = this.parser.evaluate(u, p);
      s(c, n);
    } catch (n) {
      throw new B(
        "Expression parsing failed.",
        `The call to parser.evaluate() for value ${e} threw the error: ${n}`,
        void 0
      );
    }
  }
};
function S({ parser: r }) {
  return new _(r);
}
var x = class {
  constructor(t) {
    g(this, "parser");
    t.functions.internal_invokeFunctions = (...e) => () => {
      for (let o = 0; o < e.length; o += 1) {
        const s = e[o];
        s();
      }
    }, this.parser = t;
  }
  run(t, e, o, s, d) {
    const l = "on:";
    if (!t.startsWith(l))
      return;
    const c = t.substring(l.length, t.length);
    if (c.length === 0)
      throw new B(
        "Emit parsing failed.",
        "The value for the prop name for emit must be a string with length > 0.",
        {
          key: t,
          value: e
        }
      );
    const u = (f) => {
      let a = f.split(/[^a-zA-Z0-9]/), w = a[0].toLowerCase();
      for (let h = 1; h < a.length; h++)
        w += a[h].charAt(0).toUpperCase() + a[h].slice(1).toLowerCase();
      return w;
    }, p = e;
    if (/^__proto__|prototype|constructor$/.test(p))
      throw new B(
        "Expression parsing failed.",
        `The call to parser.evaluate() for value ${e} was aborted because prototype access was detected.`,
        void 0
      );
    const n = {};
    Object.assign(n, toRaw(o)), s(u(`on_${c}`), (...f) => {
      Object.assign(n, f);
      try {
        this.parser.evaluate(p, n);
      } catch (a) {
        throw new B(
          "Expression parsing failed.",
          `The call to parser.evaluate() for value ${e} threw the error: ${a}`,
          void 0
        );
      }
    });
  }
};
function T({ parser: r }) {
  return new x(r);
}
export {
  _ as BloxPluginCompute,
  x as BloxPluginEmit,
  S as getPluginCompute,
  T as getPluginEmit
};
//# sourceMappingURL=vue-blox-expressions.js.map
