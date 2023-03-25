import { getCurrentScope as R, onScopeDispose as U, ref as s, readonly as W, defineComponent as P, computed as j, watch as G, onMounted as H, onUnmounted as L, openBlock as M, createElementBlock as $, toDisplayString as K, unref as z } from "vue";
const J = "1.0.7";
function x(e, n, t, a, r, m) {
  let u = e.toFixed(n);
  u += "";
  const i = u.split(".");
  let o = i[0];
  const c = i.length > 1 ? t + i[1] : "", f = /(\d+)(\d{3})/;
  if (a && !X(a))
    for (; f.test(o); )
      o = o.replace(f, "$1" + a + "$2");
  return r + o + c + m;
}
function X(e) {
  return !isNaN(parseFloat(e));
}
var N;
const Q = typeof window < "u";
Q && ((N = window == null ? void 0 : window.navigator) != null && N.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function Y(e) {
  return e;
}
function Z(e) {
  return R() ? (U(e), !0) : !1;
}
const ee = Q ? window : void 0, T = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, F = "__vueuse_ssr_handlers__";
T[F] = T[F] || {};
function ae(e, n = {}) {
  const {
    immediate: t = !0,
    window: a = ee
  } = n, r = s(!1);
  let m = 0, u = null;
  function i(f) {
    if (!r.value || !a)
      return;
    const _ = f - m;
    e({ delta: _, timestamp: f }), m = f, u = a.requestAnimationFrame(i);
  }
  function o() {
    !r.value && a && (r.value = !0, u = a.requestAnimationFrame(i));
  }
  function c() {
    r.value = !1, u != null && a && (a.cancelAnimationFrame(u), u = null);
  }
  return t && o(), Z(c), {
    isActive: W(r),
    pause: c,
    resume: o
  };
}
var q;
(function(e) {
  e.UP = "UP", e.RIGHT = "RIGHT", e.DOWN = "DOWN", e.LEFT = "LEFT", e.NONE = "NONE";
})(q || (q = {}));
var te = Object.defineProperty, E = Object.getOwnPropertySymbols, ne = Object.prototype.hasOwnProperty, ue = Object.prototype.propertyIsEnumerable, S = (e, n, t) => n in e ? te(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t, le = (e, n) => {
  for (var t in n || (n = {}))
    ne.call(n, t) && S(e, t, n[t]);
  if (E)
    for (var t of E(n))
      ue.call(n, t) && S(e, t, n[t]);
  return e;
};
const re = {
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6]
};
le({
  linear: Y
}, re);
const oe = P({
  name: "CountTo"
}), h = /* @__PURE__ */ P({
  ...oe,
  props: {
    startVal: {
      // 开始值
      type: Number,
      required: !1,
      default: 0
    },
    endVal: {
      // 结束值
      type: Number,
      required: !1,
      default: 2017
    },
    duration: {
      // 执行时间
      type: Number,
      required: !1,
      default: 3e3
    },
    autoplay: {
      type: Boolean,
      required: !1,
      default: !0
    },
    decimals: {
      // 显示的小数点位数
      type: Number,
      required: !1,
      default: 0,
      validator(e) {
        return e >= 0;
      }
    },
    decimal: {
      // 十进制分隔符
      type: String,
      required: !1,
      default: "."
    },
    separator: {
      // 分隔符
      type: String,
      required: !1,
      default: ","
    },
    prefix: {
      // 前缀 ¥ 2000
      type: String,
      required: !1,
      default: ""
    },
    suffix: {
      // 后缀 2000 rmb
      type: String,
      required: !1,
      default: ""
    },
    useEasing: {
      // 缓和功能
      type: Boolean,
      required: !1,
      default: !0
    },
    easingFn: {
      // 缓和回调
      type: Function,
      // 计算缓和函数，0-3000毫秒 => 对应 开始值到结束值得变化
      default(e, n, t, a) {
        return t * (-Math.pow(2, -10 * e / a) + 1) * 1024 / 1023 + n;
      }
    }
  },
  emits: ["mountedCountTo", "endCountToCallback"],
  setup(e, { emit: n }) {
    const {
      startVal: t,
      endVal: a,
      duration: r,
      autoplay: m,
      decimals: u,
      decimal: i,
      separator: o,
      prefix: c,
      suffix: f,
      useEasing: _,
      easingFn: b
    } = e, d = s(t), g = s(""), l = s(0), V = s(!1), p = s(r), y = s(0), A = s(0), B = s(0);
    s(null), g.value = x(t, u, i, o, c, f);
    const w = j(() => t > a);
    G([() => t, () => a], () => {
      C();
    }), H(() => {
      m && C(), n("mountedCountTo");
    });
    const k = (O) => {
      y.value || (y.value = O.timestamp), A.value = O.timestamp;
      const v = O.timestamp - y.value;
      B.value = p.value - v, _ ? w.value ? l.value = d.value - b(v, 0, d.value - a, p.value) : l.value = b(v, d.value, a - d.value, p.value) : w.value ? l.value = d.value - (d.value - a) * (v / p.value) : l.value = d.value + (a - d.value) * (v / p.value), w.value ? l.value = l.value < a ? a : l.value : l.value = l.value > a ? a : l.value, g.value = x(l.value, u, i, o, c, f), v > p.value && (I && I(), n("endCountToCallback"));
    }, { pause: I, resume: D } = ae(k, { immediate: !1 }), C = () => {
      d.value = t, y.value = 0, p.value = r, V.value = !1, D();
    };
    return L(() => {
      I();
    }), (O, v) => (M(), $("span", null, K(z(g)), 1));
  }
}), ie = {
  install(e) {
    e.component(h.name, h);
  },
  version: J
};
export {
  h as CountTo,
  ie as default
};
