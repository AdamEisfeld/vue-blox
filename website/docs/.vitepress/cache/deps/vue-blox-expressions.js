import {
  B
} from "./chunk-ZYMVSQD5.js";
import {
  toRaw
} from "./chunk-3T6VSYDD.js";
import "./chunk-TWLJ45QX.js";

// node_modules/vue-blox-expressions/dist/vue-blox-expressions.es.js
var d = Object.defineProperty;
var v = (r, t, e) => t in r ? d(r, t, { enumerable: true, configurable: true, writable: true, value: e }) : r[t] = e;
var u = (r, t, e) => (v(r, typeof t != "symbol" ? t + "" : t, e), e);
var b = class {
  constructor(t) {
    u(this, "parser");
    this.parser = t;
  }
  run(t, e, p, l, f) {
    const a = "compute:";
    if (!t.startsWith(a))
      return;
    const s = t.substring(a.length, t.length);
    if (s.length === 0)
      throw new B(
        "Compute parsing failed.",
        "The value for the prop name for compute must be a string with length > 0.",
        {
          key: t,
          value: e
        }
      );
    const i = e;
    if (/^__proto__|prototype|constructor$/.test(i))
      throw new B(
        "Expression parsing failed.",
        `The call to parser.evaluate() for value ${e} was aborted because prototype access was detected.`,
        void 0
      );
    const c = {};
    Object.assign(c, toRaw(p));
    try {
      const o = this.parser.evaluate(i, c);
      l(s, o);
    } catch (o) {
      throw new B(
        "Expression parsing failed.",
        `The call to parser.evaluate() for value ${e} threw the error: ${o}`,
        void 0
      );
    }
  }
};
function S({ parser: r }) {
  return new b(r);
}
var x = class {
  constructor(t) {
    u(this, "parser");
    this.parser = t;
  }
  run(t, e, p, l, f) {
    const a = "event:";
    if (!t.startsWith(a))
      return;
    const s = t.substring(a.length, t.length);
    if (s.length === 0)
      throw new B(
        "Emit parsing failed.",
        "The value for the prop name for emit must be a string with length > 0.",
        {
          key: t,
          value: e
        }
      );
    const i = e;
    if (/^__proto__|prototype|constructor$/.test(i))
      throw new B(
        "Expression parsing failed.",
        `The call to parser.evaluate() for value ${e} was aborted because prototype access was detected.`,
        void 0
      );
    const c = `on${s.charAt(0).toUpperCase()}${s.slice(1)}`, o = {};
    Object.assign(o, toRaw(p)), l(c, (...w) => {
      Object.assign(o, w);
      try {
        this.parser.functions.setVariable = (h, m) => {
          p[h] = m;
        }, this.parser.evaluate(i, o);
      } catch (h) {
        throw new B(
          "Expression parsing failed.",
          `The call to parser.evaluate() for value ${e} threw the error: ${h}`,
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
  b as BloxPluginCompute,
  x as BloxPluginEvent,
  S as getPluginCompute,
  T as getPluginEvent
};
//# sourceMappingURL=vue-blox-expressions.js.map
