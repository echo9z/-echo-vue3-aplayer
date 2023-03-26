import { getCurrentScope as H, onScopeDispose as L, ref as d, readonly as M, defineComponent as A, computed as $, watch as K, onMounted as z, onUnmounted as J, openBlock as X, createElementBlock as Y, toDisplayString as Z, unref as ee } from "vue";
const ae = "1.1.3";
function T(e, a, t, n, u, p) {
  let s = e.toFixed(a);
  s += "";
  const r = s.split(".");
  let o = r[0];
  const c = r.length > 1 ? t + r[1] : "", i = /(\d+)(\d{3})/;
  if (n && !te(n))
    for (; i.test(o); )
      o = o.replace(i, "$1" + n + "$2");
  return u + o + c + p;
}
function te(e) {
  return !isNaN(parseFloat(e));
}
var E;
const B = typeof window < "u";
B && ((E = window == null ? void 0 : window.navigator) != null && E.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function ne(e) {
  return e;
}
function ue(e) {
  return H() ? (L(e), !0) : !1;
}
const le = B ? window : void 0, S = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, h = "__vueuse_ssr_handlers__";
S[h] = S[h] || {};
function oe(e, a = {}) {
  const {
    immediate: t = !0,
    window: n = le
  } = a, u = d(!1);
  let p = 0, s = null;
  function r(i) {
    if (!u.value || !n)
      return;
    const w = i - p;
    e({ delta: w, timestamp: i }), p = i, s = n.requestAnimationFrame(r);
  }
  function o() {
    !u.value && n && (u.value = !0, s = n.requestAnimationFrame(r));
  }
  function c() {
    u.value = !1, s != null && n && (n.cancelAnimationFrame(s), s = null);
  }
  return t && o(), ue(c), {
    isActive: M(u),
    pause: c,
    resume: o
  };
}
var P;
(function(e) {
  e.UP = "UP", e.RIGHT = "RIGHT", e.DOWN = "DOWN", e.LEFT = "LEFT", e.NONE = "NONE";
})(P || (P = {}));
var se = Object.defineProperty, Q = Object.getOwnPropertySymbols, re = Object.prototype.hasOwnProperty, ie = Object.prototype.propertyIsEnumerable, V = (e, a, t) => a in e ? se(e, a, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[a] = t, fe = (e, a) => {
  for (var t in a || (a = {}))
    re.call(a, t) && V(e, t, a[t]);
  if (Q)
    for (var t of Q(a))
      ie.call(a, t) && V(e, t, a[t]);
  return e;
};
const de = {
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
fe({
  linear: ne
}, de);
const ce = A({
  name: "CountTo"
}), N = /* @__PURE__ */ A({
  ...ce,
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
      default: 2023
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
      default(e, a, t, n) {
        return t * (-Math.pow(2, -10 * e / n) + 1) * 1024 / 1023 + a;
      }
    }
  },
  emits: ["mountedCountTo", "endCountToCallback"],
  setup(e, { expose: a, emit: t }) {
    const {
      startVal: n,
      endVal: u,
      duration: p,
      autoplay: s,
      decimals: r,
      decimal: o,
      separator: c,
      prefix: i,
      suffix: w,
      useEasing: k,
      easingFn: x
    } = e, f = d(n), _ = d(""), l = d(0), g = d(!1), v = d(p), y = d(0), D = d(0), F = d(0);
    _.value = T(n, r, o, c, i, w);
    const b = $(() => n > u);
    K([() => n, () => u], () => {
      C();
    }), z(() => {
      s && C(), t("mountedCountTo");
    });
    const R = (I) => {
      y.value || (y.value = I.timestamp), D.value = I.timestamp;
      const m = I.timestamp - y.value;
      F.value = v.value - m, k ? b.value ? l.value = f.value - x(m, 0, f.value - u, v.value) : l.value = x(m, f.value, u - f.value, v.value) : b.value ? l.value = f.value - (f.value - u) * (m / v.value) : l.value = f.value + (u - f.value) * (m / v.value), b.value ? l.value = l.value < u ? u : l.value : l.value = l.value > u ? u : l.value, _.value = T(l.value, r, o, c, i, w), m > v.value && (O && O(), t("endCountToCallback"));
    }, { pause: O, resume: q } = oe(R, { immediate: !1 }), C = () => {
      f.value = n, y.value = 0, v.value = p, g.value = !1, q();
    }, U = () => {
      g.value ? (j(), g.value = !1) : (W(), g.value = !0);
    }, W = () => {
      O();
    }, j = () => {
      y.value = 0, v.value = +F.value, f.value = +l.value, q();
    }, G = () => {
      y.value = 0, O(), _.value = T(n, r, o, c, i, w);
    };
    return J(() => {
      O();
    }), a({
      start: C,
      reset: G,
      pauseResume: U
    }), (I, m) => (X(), Y("span", null, Z(ee(_)), 1));
  }
}), ve = {
  CountTo: N,
  install(e) {
    e.component(N.name, N);
  },
  version: ae
};
typeof window < "u" && window.Vue && (window.CountTo = ve);
export {
  N as CountTo,
  ve as default
};
