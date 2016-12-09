(function (a) { String.prototype.trim === a && (String.prototype.trim = function () { return this.replace(/^\s+/, "").replace(/\s+$/, "") }), Array.prototype.reduce === a && (Array.prototype.reduce = function (b) { if (this === void 0 || this === null) throw new TypeError; var c = Object(this), d = c.length >>> 0, e = 0, f; if (typeof b != "function") throw new TypeError; if (d == 0 && arguments.length == 1) throw new TypeError; if (arguments.length >= 2) f = arguments[1]; else do { if (e in c) { f = c[e++]; break } if (++e >= d) throw new TypeError } while (!0); while (e < d) e in c && (f = b.call(a, f, c[e], e, c)), e++; return f }) })(); var Zepto = function () { function v(a) { return {}.toString.call(a) == "[object Function]" } function w(a) { return a instanceof Object } function x(a) { return a instanceof Array } function y(a) { return typeof a.length == "number" } function z(b) { return b.filter(function (b) { return b !== a && b !== null }) } function A(a) { return a.length > 0 ? [].concat.apply([], a) : a } function B(a) { return a.replace(/-+(.)?/g, function (a, b) { return b ? b.toUpperCase() : "" }) } function C(a) { return a.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase() } function D(a) { return a.filter(function (a, b, c) { return c.indexOf(a) == b }) } function E(a) { return a in i ? i[a] : i[a] = new RegExp("(^|\\s)" + a + "(\\s|$)") } function F(a, b) { return typeof b == "number" && !k[C(a)] ? b + "px" : b } function G(a) { var b, c; return h[a] || (b = g.createElement(a), g.body.appendChild(b), c = j(b, "").getPropertyValue("display"), b.parentNode.removeChild(b), c == "none" && (c = "block"), h[a] = c), h[a] } function H(b, c) { c === a && l.test(b) && RegExp.$1, c in q || (c = "*"); var d = q[c]; return d.innerHTML = "" + b, f.call(d.childNodes) } function I(a, b) { return a = a || e, a.__proto__ = I.prototype, a.selector = b || "", a } function J(b, d) { if (!b) return I(); if (d !== a) return J(d).find(b); if (v(b)) return J(g).ready(b); if (b instanceof I) return b; var e; return x(b) ? e = z(b) : m.indexOf(b.nodeType) >= 0 || b === window ? (e = [b], b = null) : l.test(b) ? (e = H(b.trim(), RegExp.$1), b = null) : b.nodeType && b.nodeType == 3 ? e = [b] : e = c(g, b), I(e, b) } function K(b, c) { return c === a ? J(b) : J(b).filter(c) } function L(a, b, c, d) { return v(b) ? b.call(a, c, d) : b } function M(a, b, c) { var d = a % 2 ? b : b.parentNode; d && d.insertBefore(c, a ? a == 1 ? d.firstChild : a == 2 ? b : null : b.nextSibling) } function N(a, b) { b(a); for (var c in a.childNodes) N(a.childNodes[c], b) } var a, b, c, d, e = [], f = e.slice, g = window.document, h = {}, i = {}, j = g.defaultView.getComputedStyle, k = { "column-count": 1, columns: 1, "font-weight": 1, "line-height": 1, opacity: 1, "z-index": 1, zoom: 1 }, l = /^\s*<(\w+)[^>]*>/, m = [1, 9, 11], n = ["after", "prepend", "before", "append"], o = g.createElement("table"), p = g.createElement("tr"), q = { tr: g.createElement("tbody"), tbody: o, thead: o, tfoot: o, td: p, th: p, "*": g.createElement("div") }, r = /complete|loaded|interactive/, s = /^\.([\w-]+)$/, t = /^#([\w-]+)$/, u = /^[\w-]+$/; return J.extend = function (a) { return f.call(arguments, 1).forEach(function (c) { for (b in c) a[b] = c[b] }), a }, J.qsa = c = function (a, b) { var c; return a === g && t.test(b) ? (c = a.getElementById(RegExp.$1)) ? [c] : e : f.call(s.test(b) ? a.getElementsByClassName(RegExp.$1) : u.test(b) ? a.getElementsByTagName(b) : a.querySelectorAll(b)) }, J.isFunction = v, J.isObject = w, J.isArray = x, J.map = function (a, b) { var c, d = [], e, f; if (y(a)) for (e = 0; e < a.length; e++) c = b(a[e], e), c != null && d.push(c); else for (f in a) c = b(a[f], f), c != null && d.push(c); return A(d) }, J.each = function (a, b) { var c, d; if (y(a)) { for (c = 0; c < a.length; c++) if (b(c, a[c]) === !1) return a } else for (d in a) if (b(d, a[d]) === !1) return a; return a }, J.fn = { forEach: e.forEach, reduce: e.reduce, push: e.push, indexOf: e.indexOf, concat: e.concat, map: function (a) { return J.map(this, function (b, c) { return a.call(b, c, b) }) }, slice: function () { return J(f.apply(this, arguments)) }, ready: function (a) { return r.test(g.readyState) ? a(J) : g.addEventListener("DOMContentLoaded", function () { a(J) }, !1), this }, get: function (b) { return b === a ? this : this[b] }, size: function () { return this.length }, remove: function () { return this.each(function () { this.parentNode != null && this.parentNode.removeChild(this) }) }, each: function (a) { return this.forEach(function (b, c) { a.call(b, c, b) }), this }, filter: function (a) { return J([].filter.call(this, function (b) { return b.parentNode && c(b.parentNode, a).indexOf(b) >= 0 })) }, end: function () { return this.prevObject || J() }, andSelf: function () { return this.add(this.prevObject || J()) }, add: function (a, b) { return J(D(this.concat(J(a, b)))) }, is: function (a) { return this.length > 0 && J(this[0]).filter(a).length > 0 }, not: function (b) { var c = []; if (v(b) && b.call !== a) this.each(function (a) { b.call(this, a) || c.push(this) }); else { var d = typeof b == "string" ? this.filter(b) : y(b) && v(b.item) ? f.call(b) : J(b); this.forEach(function (a) { d.indexOf(a) < 0 && c.push(a) }) } return J(c) }, eq: function (a) { return a === -1 ? this.slice(a) : this.slice(a, +a + 1) }, first: function () { var a = this[0]; return a && !w(a) ? a : J(a) }, last: function () { var a = this[this.length - 1]; return a && !w(a) ? a : J(a) }, find: function (a) { var b; return this.length == 1 ? b = c(this[0], a) : b = this.map(function () { return c(this, a) }), J(b) }, closest: function (a, b) { var d = this[0], e = c(b || g, a); e.length || (d = null); while (d && e.indexOf(d) < 0) d = d !== b && d !== g && d.parentNode; return J(d) }, parents: function (a) { var b = [], c = this; while (c.length > 0) c = J.map(c, function (a) { if ((a = a.parentNode) && a !== g && b.indexOf(a) < 0) return b.push(a), a }); return K(b, a) }, parent: function (a) { return K(D(this.pluck("parentNode")), a) }, children: function (a) { return K(this.map(function () { return f.call(this.children) }), a) }, siblings: function (a) { return K(this.map(function (a, b) { return f.call(b.parentNode.children).filter(function (a) { return a !== b }) }), a) }, empty: function () { return this.each(function () { this.innerHTML = "" }) }, pluck: function (a) { return this.map(function () { return this[a] }) }, show: function () { return this.each(function () { this.style.display == "none" && (this.style.display = null), j(this, "").getPropertyValue("display") == "none" && (this.style.display = G(this.nodeName)) }) }, replaceWith: function (a) { return this.each(function () { J(this).before(a).remove() }) }, wrap: function (a) { return this.each(function () { J(this).wrapAll(J(a)[0].cloneNode(!1)) }) }, wrapAll: function (a) { return this[0] && (J(this[0]).before(a = J(a)), a.append(this)), this }, unwrap: function () { return this.parent().each(function () { J(this).replaceWith(J(this).children()) }), this }, hide: function () { return this.css("display", "none") }, toggle: function (b) { return (b === a ? this.css("display") == "none" : b) ? this.show() : this.hide() }, prev: function () { return J(this.pluck("previousElementSibling")) }, next: function () { return J(this.pluck("nextElementSibling")) }, html: function (b) { return b === a ? this.length > 0 ? this[0].innerHTML : null : this.each(function (a) { var c = this.innerHTML; J(this).empty().append(L(this, b, a, c)) }) }, text: function (b) { return b === a ? this.length > 0 ? this[0].textContent : null : this.each(function () { this.textContent = b }) }, attr: function (c, d) { var e; return typeof c == "string" && d === a ? this.length == 0 ? a : c == "value" && this[0].nodeName == "INPUT" ? this.val() : !(e = this[0].getAttribute(c)) && c in this[0] ? this[0][c] : e : this.each(function (a) { if (w(c)) for (b in c) this.setAttribute(b, c[b]); else this.setAttribute(c, L(this, d, a, this.getAttribute(c))) }) }, removeAttr: function (a) { return this.each(function () { this.removeAttribute(a) }) }, data: function (a, b) { return this.attr("data-" + a, b) }, val: function (b) { return b === a ? this.length > 0 ? this[0].value : null : this.each(function (a) { this.value = L(this, b, a, this.value) }) }, offset: function () { if (this.length == 0) return null; var a = this[0].getBoundingClientRect(); return { left: a.left + window.pageXOffset, top: a.top + window.pageYOffset, width: a.width, height: a.height} }, css: function (c, d) { if (d === a && typeof c == "string") return this.length == 0 ? a : this[0].style[B(c)] || j(this[0], "").getPropertyValue(c); var e = ""; for (b in c) e += C(b) + ":" + F(b, c[b]) + ";"; return typeof c == "string" && (e = C(c) + ":" + F(c, d)), this.each(function () { this.style.cssText += ";" + e }) }, index: function (a) { return a ? this.indexOf(J(a)[0]) : this.parent().children().indexOf(this[0]) }, hasClass: function (a) { return this.length < 1 ? !1 : E(a).test(this[0].className) }, addClass: function (a) { return this.each(function (b) { d = []; var c = this.className, e = L(this, a, b, c); e.split(/\s+/g).forEach(function (a) { J(this).hasClass(a) || d.push(a) }, this), d.length && (this.className += (c ? " " : "") + d.join(" ")) }) }, removeClass: function (b) { return this.each(function (c) { if (b === a) return this.className = ""; d = this.className, L(this, b, c, d).split(/\s+/g).forEach(function (a) { d = d.replace(E(a), " ") }), this.className = d.trim() }) }, toggleClass: function (b, c) { return this.each(function (d) { var e = L(this, b, d, this.className); (c === a ? !J(this).hasClass(e) : c) ? J(this).addClass(e) : J(this).removeClass(e) }) } }, "filter,add,not,eq,first,last,find,closest,parents,parent,children,siblings".split(",").forEach(function (a) { var b = J.fn[a]; J.fn[a] = function () { var a = b.apply(this, arguments); return a.prevObject = this, a } }), ["width", "height"].forEach(function (b) { J.fn[b] = function (c) { var d, e = b.replace(/./, function (a) { return a[0].toUpperCase() }); return c === a ? this[0] == window ? window["inner" + e] : this[0] == g ? g.documentElement["offset" + e] : (d = this.offset()) && d[b] : this.each(function (a) { var d = J(this); d.css(b, L(this, c, a, d[b]())) }) } }), n.forEach(function (a, b) { J.fn[a] = function (a) { var c = w(a) ? a : H(a); if (!("length" in c) || c.nodeType) c = [c]; if (c.length < 1) return this; var d = this.length, e = d > 1, f = b < 2; return this.each(function (a, g) { for (var h = 0; h < c.length; h++) { var i = c[f ? c.length - h - 1 : h]; N(i, function (a) { a.nodeName != null && a.nodeName.toUpperCase() === "SCRIPT" && (!a.type || a.type === "text/javascript") && window.eval.call(window, a.innerHTML) }), e && a < d - 1 && (i = i.cloneNode(!0)), M(b, g, i) } }) }; var c = b % 2 ? a + "To" : "insert" + (b ? "Before" : "After"); J.fn[c] = function (b) { return J(b)[a](this), this } }), I.prototype = J.fn, J } (); window.Zepto = Zepto, "$" in window || (window.$ = Zepto), function (a) { function f(a) { return a._zid || (a._zid = d++) } function g(a, b, d, e) { b = h(b); if (b.ns) var g = i(b.ns); return (c[f(a)] || []).filter(function (a) { return a && (!b.e || a.e == b.e) && (!b.ns || g.test(a.ns)) && (!d || a.fn == d) && (!e || a.sel == e) }) } function h(a) { var b = ("" + a).split("."); return { e: b[0], ns: b.slice(1).sort().join(" ")} } function i(a) { return new RegExp("(?:^| )" + a.replace(" ", " .* ?") + "(?: |$)") } function j(b, c, d) { a.isObject(b) ? a.each(b, d) : b.split(/\s/).forEach(function (a) { d(a, c) }) } function k(b, d, e, g, i) { var k = f(b), l = c[k] || (c[k] = []); j(d, e, function (c, d) { var e = i && i(d, c), f = e || d, j = function (a) { var c = f.apply(b, [a].concat(a.data)); return c === !1 && a.preventDefault(), c }, k = a.extend(h(c), { fn: d, proxy: j, sel: g, del: e, i: l.length }); l.push(k), b.addEventListener(k.e, j, !1) }) } function l(a, b, d, e) { var h = f(a); j(b || "", d, function (b, d) { g(a, b, d, e).forEach(function (b) { delete c[h][b.i], a.removeEventListener(b.e, b.proxy, !1) }) }) } function p(b) { var c = a.extend({ originalEvent: b }, b); return a.each(o, function (a, d) { c[a] = function () { return this[d] = m, b[a].apply(b, arguments) }, c[d] = n }), c } function q(a) { if (!("defaultPrevented" in a)) { a.defaultPrevented = !1; var b = a.preventDefault; a.preventDefault = function () { this.defaultPrevented = !0, b.call(this) } } } var b = a.qsa, c = {}, d = 1, e = {}; e.click = e.mousedown = e.mouseup = e.mousemove = "MouseEvents", a.event = { add: k, remove: l }, a.fn.bind = function (a, b) { return this.each(function () { k(this, a, b) }) }, a.fn.unbind = function (a, b) { return this.each(function () { l(this, a, b) }) }, a.fn.one = function (a, b) { return this.each(function (c, d) { k(this, a, b, null, function (a, b) { return function () { var c = a.apply(d, arguments); return l(d, b, a), c } }) }) }; var m = function () { return !0 }, n = function () { return !1 }, o = { preventDefault: "isDefaultPrevented", stopImmediatePropagation: "isImmediatePropagationStopped", stopPropagation: "isPropagationStopped" }; a.fn.delegate = function (b, c, d) { return this.each(function (e, f) { k(f, c, d, b, function (c) { return function (d) { var e, g = a(d.target).closest(b, f).get(0); if (g) return e = a.extend(p(d), { currentTarget: g, liveFired: f }), c.apply(g, [e].concat([].slice.call(arguments, 1))) } }) }) }, a.fn.undelegate = function (a, b, c) { return this.each(function () { l(this, b, c, a) }) }, a.fn.live = function (b, c) { return a(document.body).delegate(this.selector, b, c), this }, a.fn.die = function (b, c) { return a(document.body).undelegate(this.selector, b, c), this }, a.fn.on = function (b, c, d) { return c === undefined || a.isFunction(c) ? this.bind(b, c) : this.delegate(c, b, d) }, a.fn.off = function (b, c, d) { return c === undefined || a.isFunction(c) ? this.unbind(b, c) : this.undelegate(c, b, d) }, a.fn.trigger = function (b, c) { return typeof b == "string" && (b = a.Event(b)), q(b), b.data = c, this.each(function () { this.dispatchEvent(b) }) }, a.fn.triggerHandler = function (b, c) { var d, e; return this.each(function (f, h) { d = p(typeof b == "string" ? a.Event(b) : b), d.data = c, d.target = h, a.each(g(h, b.type || b), function (a, b) { e = b.proxy(d); if (d.isImmediatePropagationStopped()) return !1 }) }), e }, "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout change select keydown keypress keyup error".split(" ").forEach(function (b) { a.fn[b] = function (a) { return this.bind(b, a) } }), ["focus", "blur"].forEach(function (b) { a.fn[b] = function (a) { if (a) this.bind(b, a); else if (this.length) try { this.get(0)[b]() } catch (c) { } return this } }), a.Event = function (a, b) { var c = document.createEvent(e[a] || "Events"), d = !0; if (b) for (var f in b) f == "bubbles" ? d = !!b[f] : c[f] = b[f]; return c.initEvent(a, d, !0, null, null, null, null, null, null, null, null, null, null, null, null), c } } (Zepto), function (a) { function b(a) { var b = this.os = {}, c = this.browser = {}, d = a.match(/WebKit\/([\d.]+)/), e = a.match(/(Android)\s+([\d.]+)/), f = a.match(/(iPad).*OS\s([\d_]+)/), g = !f && a.match(/(iPhone\sOS)\s([\d_]+)/), h = a.match(/(webOS|hpwOS)[\s\/]([\d.]+)/), i = h && a.match(/TouchPad/), j = a.match(/(BlackBerry).*Version\/([\d.]+)/); d && (c.version = d[1]), c.webkit = !!d, e && (b.android = !0, b.version = e[2]), g && (b.ios = !0, b.version = g[2].replace(/_/g, "."), b.iphone = !0), f && (b.ios = !0, b.version = f[2].replace(/_/g, "."), b.ipad = !0), h && (b.webos = !0, b.version = h[2]), i && (b.touchpad = !0), j && (b.blackberry = !0, b.version = j[2]) } b.call(a, navigator.userAgent), a.__detect = b } (Zepto), function (a, b) { function k(a) { return a.toLowerCase() } function l(a) { return d ? d + a : k(a) } var c = "", d, e, f, g = { Webkit: "webkit", Moz: "", O: "o", ms: "MS" }, h = window.document, i = h.createElement("div"), j = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i; a.each(g, function (a, e) { if (i.style[a + "TransitionProperty"] !== b) return c = "-" + k(a) + "-", d = e, !1 }), a.fx = { off: d === b && i.style.transitionProperty === b, cssPrefix: c, transitionEnd: l("TransitionEnd"), animationEnd: l("AnimationEnd") }, a.fn.animate = function (b, c, d, e) { return a.isObject(c) && (d = c.easing, e = c.complete, c = c.duration), c && (c /= 1e3), this.anim(b, c, d, e) }, a.fn.anim = function (d, e, f, g) { var h, i = {}, k, l = this, m, n = a.fx.transitionEnd; e === b && (e = .4), a.fx.off && (e = 0); if (typeof d == "string") i[c + "animation-name"] = d, i[c + "animation-duration"] = e + "s", n = a.fx.animationEnd; else { for (k in d) j.test(k) ? (h || (h = []), h.push(k + "(" + d[k] + ")")) : i[k] = d[k]; h && (i[c + "transform"] = h.join(" ")), a.fx.off || (i[c + "transition"] = "all " + e + "s " + (f || "")) } return m = function () { var b = {}; b[c + "transition"] = b[c + "animation-name"] = "none", a(this).css(b), g && g.call(this) }, e > 0 && this.one(n, m), setTimeout(function () { l.css(i), e <= 0 && setTimeout(function () { l.each(function () { m.call(this) }) }, 0) }, 0), this }, i = null } (Zepto), function (a) { function g(b, c, d) { var e = a.Event(c); return a(b).trigger(e, d), !e.defaultPrevented } function h(a, b, c, e) { if (a.global) return g(b || d, c, e) } function i(b) { b.global && a.active++ === 0 && h(b, null, "ajaxStart") } function j(b) { b.global && ! --a.active && h(b, null, "ajaxStop") } function k(a, b) { var c = b.context; if (b.beforeSend.call(c, a, b) === !1 || h(b, c, "ajaxBeforeSend", [a, b]) === !1) return !1; h(b, c, "ajaxSend", [a, b]) } function l(a, b, c) { var d = c.context, e = "success"; c.success.call(d, a, e, b), h(c, d, "ajaxSuccess", [b, c, a]), n(e, b, c) } function m(a, b, c, d) { var e = d.context; d.error.call(e, c, b, a), h(d, e, "ajaxError", [c, d, a]), n(b, c, d) } function n(a, b, c) { var d = c.context; c.complete.call(d, b, a), h(c, d, "ajaxComplete", [b, c]), j(c) } function o() { } function q(b, d, e, f) { var g = a.isArray(d); a.each(d, function (d, h) { f && (d = e ? f : f + "[" + (g ? "" : d) + "]"), !f && g ? b.add(h.name, h.value) : (e ? a.isArray(h) : c(h)) ? q(b, h, e, d) : b.add(d, h) }) } var b = 0, c = a.isObject, d = window.document, e, f; a.active = 0, a.ajaxJSONP = function (c) { var e = "jsonp" + ++b, f = d.createElement("script"), g = function () { a(f).remove(), e in window && (window[e] = o), n(h, c, "abort") }, h = { abort: g }, i; return window[e] = function (b) { clearTimeout(i), a(f).remove(), delete window[e], l(b, h, c) }, f.src = c.url.replace(/=\?/, "=" + e), a("head").append(f), c.timeout > 0 && (i = setTimeout(function () { h.abort(), n(h, c, "timeout") }, c.timeout)), h }, a.ajaxSettings = { type: "GET", beforeSend: o, success: o, error: o, complete: o, context: null, global: !0, xhr: function () { return new window.XMLHttpRequest }, accepts: { script: "text/javascript, application/javascript", json: "application/json", xml: "application/xml, text/xml", html: "text/html", text: "text/plain" }, crossDomain: !1, timeout: 0 }, a.ajax = function (b) { var d = a.extend({}, b || {}); for (e in a.ajaxSettings) d[e] === undefined && (d[e] = a.ajaxSettings[e]); i(d), d.crossDomain || (d.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(d.url) && RegExp.$2 != window.location.host); if (/=\?/.test(d.url)) return a.ajaxJSONP(d); d.url || (d.url = window.location.toString()), d.data && !d.contentType && (d.contentType = "application/x-www-form-urlencoded"), c(d.data) && (d.data = a.param(d.data)); if (d.type.match(/get/i) && d.data) { var g = d.data; d.url.match(/\?.*=/) ? g = "&" + g : g[0] != "?" && (g = "?" + g), d.url += g } var h = d.accepts[d.dataType], j = {}, n = /^([\w-]+:)\/\//.test(d.url) ? RegExp.$1 : window.location.protocol, p = a.ajaxSettings.xhr(), q; d.crossDomain || (j["X-Requested-With"] = "XMLHttpRequest"), h && (j.Accept = h), d.headers = a.extend(j, d.headers || {}), p.onreadystatechange = function () { if (p.readyState == 4) { clearTimeout(q); var a, b = !1; if (p.status >= 200 && p.status < 300 || p.status == 0 && n == "file:") { if (h == "application/json" && !/^\s*$/.test(p.responseText)) try { a = JSON.parse(p.responseText) } catch (c) { b = c } else a = p.responseText; b ? m(b, "parsererror", p, d) : l(a, p, d) } else m(null, "error", p, d) } }, p.open(d.type, d.url, !0), d.contentType && (d.headers["Content-Type"] = d.contentType); for (f in d.headers) p.setRequestHeader(f, d.headers[f]); return k(p, d) === !1 ? (p.abort(), !1) : (d.timeout > 0 && (q = setTimeout(function () { p.onreadystatechange = o, p.abort(), m(null, "timeout", p, d) }, d.timeout)), p.send(d.data), p) }, a.get = function (b, c) { return a.ajax({ url: b, success: c }) }, a.post = function (b, c, d, e) { return a.isFunction(c) && (e = e || d, d = c, c = null), a.ajax({ type: "POST", url: b, data: c, success: d, dataType: e }) }, a.getJSON = function (b, c) { return a.ajax({ url: b, success: c, dataType: "json" }) }, a.fn.load = function (b, c) { if (!this.length) return this; var e = this, f = b.split(/\s/), g; return f.length > 1 && (b = f[0], g = f[1]), a.get(b, function (b) { e.html(g ? a(d.createElement("div")).html(b).find(g).html() : b), c && c.call(e) }), this }; var p = encodeURIComponent; a.param = function (a, b) { var c = []; return c.add = function (a, b) { this.push(p(a) + "=" + p(b)) }, q(c, a, b), c.join("&").replace("%20", "+") } } (Zepto), function (a) { a.fn.serializeArray = function () { var b = [], c; return a(Array.prototype.slice.call(this.get(0).elements)).each(function () { c = a(this); var d = c.attr("type"); !this.disabled && d != "submit" && d != "reset" && d != "button" && (d != "radio" && d != "checkbox" || this.checked) && b.push({ name: c.attr("name"), value: c.val() }) }), b }, a.fn.serialize = function () { var a = []; return this.serializeArray().forEach(function (b) { a.push(encodeURIComponent(b.name) + "=" + encodeURIComponent(b.value)) }), a.join("&") }, a.fn.submit = function (b) { if (b) this.bind("submit", b); else if (this.length) { var c = a.Event("submit"); this.eq(0).trigger(c), c.defaultPrevented || this.get(0).submit() } return this } } (Zepto), function (a) { function d(a) { return "tagName" in a ? a : a.parentNode } function e(a, b, c, d) { var e = Math.abs(a - b), f = Math.abs(c - d); return e >= f ? a - b > 0 ? "Left" : "Right" : c - d > 0 ? "Up" : "Down" } function g() { b.last && Date.now() - b.last >= f && (a(b.target).trigger("longTap"), b = {}) } var b = {}, c, f = 750; a(document).ready(function () { a(document.body).bind("touchstart", function (a) { var e = Date.now(), h = e - (b.last || e); b.target = d(a.touches[0].target), c && clearTimeout(c), b.x1 = a.touches[0].pageX, b.y1 = a.touches[0].pageY, h > 0 && h <= 250 && (b.isDoubleTap = !0), b.last = e, setTimeout(g, f) }).bind("touchmove", function (a) { b.x2 = a.touches[0].pageX, b.y2 = a.touches[0].pageY }).bind("touchend", function (d) { b.isDoubleTap ? (a(b.target).trigger("doubleTap"), b = {}) : b.x2 > 0 || b.y2 > 0 ? ((Math.abs(b.x1 - b.x2) > 30 || Math.abs(b.y1 - b.y2) > 30) && a(b.target).trigger("swipe") && a(b.target).trigger("swipe" + e(b.x1, b.x2, b.y1, b.y2)), b.x1 = b.x2 = b.y1 = b.y2 = b.last = 0) : "last" in b && (c = setTimeout(function () { c = null, a(b.target).trigger("tap"), b = {} }, 250)) }).bind("touchcancel", function () { b = {} }) }), ["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "longTap"].forEach(function (b) { a.fn[b] = function (a) { return this.bind(b, a) } }) } (Zepto);
(function (a) { function j(a) { var d, e; typeof a.touches[0].pageX != "undefined" ? d = a.touches[0].pageX : d = a.pageX; typeof a.touches[0].pageY != "undefined" ? e = a.touches[0].pageY : e = a.pageY; b = c; b.start = { x: d, y: e, time: a.timeStamp }; b.delta.prevPos = { x: d, y: e }; k(a); if (h) { s() } } function k(a) { var c, d; typeof a.touches[0].pageX != "undefined" ? c = a.touches[0].pageX : c = a.pageX; typeof a.touches[0].pageY != "undefined" ? d = a.touches[0].pageY : d = a.pageY; var e, f, g = c, i = d, j = c - b.start.x, k = d - b.start.y; if (c > b.delta.prevPos.x) { e = 1 } else if (c < b.delta.prevPos.x) { e = -1 } else { e = 0 } if (d > b.delta.prevPos.y) { f = 1 } else if (d < b.delta.prevPos.y) { f = -1 } else { f = 0 } b.delta.prevPos = { x: g, y: i }; b.delta.dist = { x: j, y: k }; b.delta.dir = { x: e, y: f }; if (h) { s() } } function l(c) { var d = a(this), e = d.data("preventDefaultAxis"), f = e === "both" || e === "x", h = e === "both" || e === "y", i = f && Math.abs(b.delta.dist.y) >= g, j = h && Math.abs(b.delta.dist.x) >= g; if (i || j) { c.preventDefault() } } function m(a) { var c = a.timeStamp - b.start.time, d = Math.abs(Math.round(b.delta.dist.x / c * 100) / 100), e = Math.abs(Math.round(b.delta.dist.y / c * 100) / 100), i = b.delta.dir.x, j = b.delta.dir.y, k = 0, l = 0; if (d > f) { Math.abs(b.delta.dist.x) >= g ? k = i : k = 0 } else if (e > f) { Math.abs(b.delta.dist.y) >= g ? l = j : l = 0 } b.end.duration = c; b.end.speed = { x: d, y: e }; b.end.flick = { x: k, y: l }; if (h) { r("Touch end"); s() } } function n(a, b) { if (b !== "x" && b !== "y") { a.height() > a.width() ? b = "y" : b = "x" } return b } function o(a, b) { if (!parseInt(b)) { var b, c = a.data("segments"), d = n(a, a.data("flickDirection")); d == "y" ? b = a.height() / c : b = a.width() / c } return b } function p(a) { var b = document.createElement("div"), c = "Khtml Ms O Moz Webkit".split(" "), d = c.length; return function (a) { if (a in b.style) return true; a = a.replace(/^[a-z]/, function (a) { return a.toUpperCase() }); while (d--) { if (c[d] + a in b.style) { return true } } return false } } function q() { if (!a("#flickableDebugger").length) { h = true; b = c; b.eventLog = []; var d = '<div id="flickableDebugger" style="position: fixed; bottom: 0; margin: 0 auto; padding: 10px; width: 100%; background: #000; color: #fff; font-family: courier, sans-serif;">Debugger</div>'; a("body").append(d) } } function r(a) { if (h) { console.log(a); b.eventLog.splice(0, 0, a); s() } } function s() { var c = ""; for (var d = 0; d < 3; d++) { c += b.eventLog[d] + " | " } var e = "<pre> 		last 3 events: " + c + "<br /> 		start: {x:" + b.start.x + ", y:" + b.start.y + ",time: " + b.start.time + "}<br /> 			delta: {<br /> 			prevPos: {" + b.delta.prevPos.x + ", " + b.delta.prevPos.y + "}<br /> 			dist: {" + b.delta.dist.x + ", " + b.delta.dist.y + "}<br /> 			dir: {" + b.delta.dir.x + ", " + b.delta.dir.y + "}<br /> 			}<br /> 		end: {<br /> 			speed: {" + b.end.speed.x + ", " + b.end.speed.y + "}<br /> 			flick: {" + b.end.flick.x + ", " + b.end.flick.y + "}<br /> 			duration: " + b.end.duration + "<br /> 		} 		</pre>"; a("#flickableDebugger").html(e) } var b, c = { start: { x: 0, y: 0, time: 0 }, delta: { prevPos: { x: 0, y: 0 }, dist: { x: 0, y: 0 }, dir: { x: 0, y: 0} }, end: { duration: 0, speed: { x: 0, y: 0 }, flick: { x: 0, y: 0}} }, d = false, e = 0, f = .7, g = 5, h = false; var i = { init: function (b) { var c = a.extend({ enableDebugger: false, segments: 5, snapSpeed: .3, flickSnapSpeed: .3, flickThreshold: false, segmentPx: "auto", flickDirection: "auto", preventDefault: true, preventDefaultAxis: "both", onCreate: false, onFlick: false, onFlickLeft: false, onFlickRight: false, onFlickUp: false, onFlickDown: false, onScroll: false, onScrollNext: false, onScrollPrev: false, onMove: false, onStart: false, onEnd: false }, b); return this.each(function () { var b = a(this), e = b.data("isAlive"); if (!e) { var g = c.segments, i = n(b, c.flickDirection); b.data("isAlive", true).data("pos", 0).data("snapSpeed", parseFloat(c.snapSpeed)).data("flickSnapSpeed", parseFloat(c.flickSnapSpeed)).data("segment", 0).data("segments", g).data("flickDirection", i).data("segmentPx", o(b, c.segmentPx)).data("preventDefaultAxis", c.preventDefaultAxis); a(b).bind({ onStart: function () { a(this).flickable("start", c.onStart) }, onMove: function () { a(this).flickable("move", c.onMove) }, onEnd: function () { a(this).flickable("finished", c.onEnd) }, onScroll: function () { a(this).flickable("scrollToSegment", c.onScroll) }, onScrollPrev: function () { a(this).flickable("prevSegment", c.onScrollPrev) }, onScrollNext: function () { a(this).flickable("nextSegment", c.onScrollNext) }, onFlick: function () { a(this).flickable("flick", c.onFlick) }, onFlickLeft: function () { a(this).flickable("flickLeft", c.onFlickLeft) }, onFlickRight: function () { a(this).flickable("flickRight", c.onFlickRight) }, onFlickUp: function () { a(this).flickable("flickUp", c.onFlickUp) }, onFlickDown: function () { a(this).flickable("flickDown", c.onFlickDown) }, touchstart: function (b) { j(b); a(this).trigger("onStart") }, touchmove: function (b) { k(b); if (c.preventDefault) { l.call(this, b) } a(this).trigger("onMove") }, touchend: function (b) { m(b); a(this).trigger("onEnd") } }); if (!p("transform")) { d = true } if (parseInt(c.flickThreshold)) { f = parseInt(c.flickThreshold) } if (h || c.enableDebugger) { q() } b.flickable("create", c.onCreate) } }) }, create: function (d) { var f = a(this); b = c; e++; r("It's alive!"); if (!f.attr("id")) { f.attr("id", "flickable" + e) } f.flickable("scrollToSegment"); if (typeof d == "function") { d.call(this, e) } }, start: function (c) { r("Touch start"); var d = a(this), e = parseInt(d.data("segment")), f = parseInt(d.data("segmentPx")), g = -(f * e); d.data("anchor", g); if (typeof c == "function") { c.call(this, b) } }, segment: function (b) { var c = a(this), d = parseInt(c.data("segments")), e = parseInt(c.data("segment")); if (typeof b != "undefined") { if (b >= d) { b = d - 1 } else if (b < 0) { b = 0 } if (b !== e) { c.data("segment", b).trigger("onScroll") } else { c.flickable("scrollToSegment") } } return parseInt(c.data("segment")) }, move: function (c) { var e = a(this), f, g, h = e.data("flickDirection"), i = parseInt(e.data("anchor")), f = i + b.delta.dist[h]; if (d) { if (h == "y") { e.css("top", f) } else { e.css("left", f) } } else { h == "y" ? g = "(0," + f + "px,0)" : g = "(" + f + "px,0,0)"; if (typeof document.getElementById(e.attr("id")).style.webkitTransform != "undefined") { document.getElementById(e.attr("id")).style.webkitTransform = "translate3d" + g } else if (typeof document.getElementById(e.attr("id")).style.mozTransform != "undefined") { document.getElementById(e.attr("id")).style.mozTransform = "translate3d" + g } else { document.getElementById(e.attr("id")).style.transform = "translate3d" + g } } a(this).data("pos", f); if (typeof c == "function") { c.call(this, b) } }, scrollNext: function () { a(this).trigger("onScrollNext") }, scrollPrev: function () { a(this).trigger("onScrollPrev") }, nextSegment: function (c) { r("Next segment"); var d = a(this), e = parseInt(d.data("segment")) + 1; d.flickable("segment", e); if (typeof c == "function") { c.call(this, b, e) } }, prevSegment: function (c) { r("Previous segment"); var d = a(this), e = parseInt(d.data("segment")) - 1; d.flickable("segment", e); if (typeof c == "function") { c.call(this, b, e) } }, flick: function (c) { r("You flicked"); var d = a(this); switch (b.end.flick.x) { case -1: d.trigger("onFlickLeft"); break; case 1: d.trigger("onFlickRight"); break } switch (b.end.flick.y) { case -1: d.trigger("onFlickUp"); break; case 1: d.trigger("onFlickDown"); break } if (typeof c == "function") { c.call(this, b) } }, flickLeft: function (c) { r("Flicked left"); var d = a(this), e = parseInt(d.data("segment")); d.trigger("onScrollNext"); if (typeof c == "function") { c.call(this, b, e) } }, flickRight: function (c) { r("Flicked right"); var d = a(this), e = parseInt(d.data("segment")); d.trigger("onScrollPrev"); if (typeof c == "function") { c.call(this, b, e) } }, flickUp: function (c) { r("Flicked up"); var d = a(this), e = parseInt(d.data("segment")); d.trigger("onScrollNext"); if (typeof c == "function") { c.call(this, b, e) } }, flickDown: function (c) { r("Flicked down"); var d = a(this), e = parseInt(d.data("segment")); d.trigger("onScrollPrev"); if (typeof c == "function") { c.call(this, b, e) } }, scrollToSegment: function (c) { var e = a(this), f, g = e.data("flickDirection"), h = parseFloat(e.data("snapSpeed")), i = parseFloat(e.data("flickSnapSpeed")), j = parseInt(e.data("segments")), k = parseInt(e.data("segment")), l = parseInt(e.data("segmentPx")), m = -(l * k), n = "ease-out"; r("Sliding to segment " + k); if (b.end.flick.x || b.end.flick.y) { h = i; n = "cubic-bezier(0, .70, .35, 1)" } e.data("anchor", m).data("pos", m).data("segment", k); if (d) { if (g == "y") { e.anim({ top: m }, h, n) } else { e.anim({ left: m }, h, n) } } else { g == "y" ? f = "0px, " + m + "px, 0px" : f = m + "px, 0px, 0px"; e.anim({ translate3d: f }, h, n) } if (typeof c == "function") { c.call(this, b, k) } }, finished: function (c) { var d = a(this), e = d.data("flickDirection"), f = parseInt(d.data("segments")), g = parseInt(d.data("segment")), h = parseInt(d.data("segmentPx")), i = parseInt(d.data("anchor")), j = parseInt(d.data("pos")); var k; j < 0 ? k = Math.abs(Math.round(j / h)) : k = 0; r("Nearest segment is " + k); if (typeof c == "function") { c.call(this, b, g) } if (g == k) { if (b.end.flick[e]) { return d.trigger("onFlick") } } if (k == g + 1) { d.trigger("onScrollNext") } else if (k == g - 1) { d.trigger("onScrollPrev") } else { d.flickable("segment", k) } } }; a.fn.flickable = function (b) { if (i[b]) { return i[b].apply(this, Array.prototype.slice.call(arguments, 1)) } else if (typeof b === "object" || !b) { return i.init.apply(this, arguments) } else { a.error("Method " + b + " does not exist") } } })(Zepto)
$.calendar = {};
$.extend($.calendar, {
    constructed: false,
    opened: false,
    target: null,
    defaultDay: 10,
    callback: null,
    msg: {
        'day': '',
        'hour': '',
        'min': ''
    },
    html: '<div class="flikdate" id="jsflikdate"><h1 id="flikmsg"></h1><div class="flikcon"><div class="year"><ul id="flikday"></ul></div><div class="hour"><ul id="flikhour"></ul></div><div class="min"><ul id="flikmin"></ul></div><div class="line"><span>:</span></div></div><div class="flikfoot"><div id="flickcancle" class="cancle">取消</div><div id="flickconfirm" class="confirm">确定</div></div></div>',
    createShadow: function (day) {
        var odiv = document.createElement('div'),
        mypage = $.getPageSize(),
        obody = document.getElementsByTagName('body')[0];
        this.defaultDay = day;
        odiv.id = 'CalendarShadow';
        $(odiv).css({
            'background-color': '#000000',
            'z-index': '999',
            'position': 'absolute',
            'opacity': '0.4',
            'left': '0px',
            'top': '0px',
            'right': '0px',
            'visibility': 'hidden',
            'height': mypage.pageHeight
        });
        $(obody).append(odiv);
        this.createDate(obody)
    },
    createDate: function (obody) {
        var html = this.html;
        $(obody).append(html);
        $('#jsflikdate').css('top', '-1000px');
        this.bindDays();
        this.bindHours();
        this.bindMinutes();
        this.bindEvent()
    },
    bindDays: function () {
        var now = (new Date()).getTime(),
        i = 0,
        _this = this,
        dayobj = $('#flikday'),
        weekArr = ['日', '一', '二', '三', '四', '五', '六'],
        timearr = [];
        for (i; i < this.defaultDay - 1; i++) {
            timearr.push(now + i * (24 * 60 * 60 * 1000))
        }
        $(timearr).each(function (i) {
            var dateObj = new Date(parseInt(this)),
            month = dateObj.getMonth() + 1,
            day = dateObj.getDate(),
            week = dateObj.getDay(),
            oli = document.createElement('li'),
            str = month + '月' + day + '日 周' + weekArr[week];
            $(oli).attr('micro', this);
            $(oli).text(str);
            if (i == 0) {
                $(oli).addClass('focus');
                _this.msg.day = this + ''
            }
            dayobj.append(oli)
        })
    },
    bindHours: function () {
        var hourArr = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
        hourobj = $('#flikhour');
        $(hourArr).each(function () {
            var oli = document.createElement('li');
            $(oli).append(this + '');
            hourobj.append(oli)
        })
    },
    bindMinutes: function () {
        var minArr = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'],
        minobj = $('#flikmin');
        $(minArr).each(function (i) {
            var oli = document.createElement('li');
            $(oli).append(this + '');
            if (i == 0) {
                $(oli).addClass('focus')
            }
            minobj.append(oli)
        })
    },
    focusFlik: function (obj) {
        var theT = $(obj);
        var timer = window.setTimeout(function () {
            theT.find('li').eq(theT.attr('data-segment')).addClass('focus')
        },
        200)
    },
    bindEvent: function () {
        var _this = this;
        Zepto('#flikday').flickable({
            segments: $('#flikday li').length,
            segment: 3,
            snapSpeed: 0.6,
            flickSnapSpeed: 0.6,
            onStart: function () {
                $(this).find('li.focus').removeClass()
            },
            onEnd: function (e, s) {
                _this.focusFlik(this)
            }
        });
        Zepto('#flikhour').flickable({
            segments: $('#flikhour li').length,
            segment: 3,
            snapSpeed: 0.6,
            flickSnapSpeed: 0.6,
            onStart: function () {
                $(this).find('li.focus').removeClass()
            },
            onEnd: function (e, s) {
                _this.focusFlik(this)
            }
        });
        Zepto('#flikmin').flickable({
            segments: $('#flikmin li').length,
            segment: 3,
            snapSpeed: 0.6,
            flickSnapSpeed: 0.6,
            onStart: function () {
                $(this).find('li.focus').removeClass()
            },
            onEnd: function (e, s) {
                _this.focusFlik(this)
            }
        });
        $('#flickcancle').click(function () {
            _this.closeDate('cancle')
        });
        $('#flickconfirm').click(function () {
            _this.closeDate('confirm')
        })
    },
    openDate: function (obj, callback) {
        var _this = this;
        this.target = obj;
        this.callback = callback;
        $('#jsflikdate').css('visibility', 'visible');
        var height = Zepto('#flikhour').find('li').eq(0).height();
        $('#jsflikdate').animate({
            'top': '30px'
        },
        function () {
            if (_this.opened == false) {
                _this.opened = true;

                var len = (new Date()).getHours() + 1;
                var now = -len * height + 'px';
                Zepto('#flikhour').find('li').eq(len).addClass('focus');
                Zepto('#flikhour').animate({
                    'translate3d': '0,' + now + ',0'
                },
                500, 'ease-out');
            }
        });
        $('#CalendarShadow').css('visibility', 'visible');
        var old = '';
        if (obj.nodeName.toLowerCase() == 'input') {
            old = $(obj).val();
        }
        else {
            old = $(obj).text();
        }
        if (old != '') {
            var len = (new Date($.getMicroTime(old))).getHours() + 1;
            var now = -len * height + 'px';
            Zepto('#flikhour').find('li').eq(len).addClass('focus');
            Zepto('#flikhour').animate({
                'translate3d': '0,' + now + ',0'
            },
                500, 'ease-out');
        }
    },
    closeDate: function (type) {
        $('#jsflikdate').animate({
            'top': '-1000'
        },
        function () {
            $('#jsflikdate').css('visibility', 'hidden');
            $('#CalendarShadow').css('visibility', 'hidden')
        });
        if (type == 'confirm') {
            var day, hour, min;
            $('#flikday li').each(function () {
                if ($(this).hasClass('focus')) {
                    day = $(this).attr('micro');
                }
            });
            $('#flikhour li').each(function () {
                if ($(this).hasClass('focus')) {
                    hour = $(this).text();
                }
            });
            $('#flikmin li').each(function () {
                if ($(this).hasClass('focus')) {
                    min = $(this).text();
                }
            });
            if (day && hour && min) {
                var dateobj = (new Date(parseInt(day)));
                var str = dateobj.getFullYear() + '-' + (dateobj.getMonth() + 1) + '-' + dateobj.getDate() + ' ' + hour + ':' + min;
                if (this.target.tagName.toLowerCase() == 'input') {
                    $(this.target).attr('value', str);
                }
                else {
                    $(this.target).text(str);
                }
                if (this.callback != null) {
                    this.callback.call(str);
                }
            }
        }
    },
    changeMsg: function (msg) {
        $('#flikmsg').text(msg)
    }
});
$.extend($.fn, {
    openCalendar: function (day, msg, callback) {
        if ($.calendar.constructed == false) {
            $.calendar.constructed = true;
            $.calendar.createShadow(day)
        }
        this.each(function () {
            $(this).click(function () {
                $.calendar.changeMsg(msg);
                $.calendar.openDate(this,callback);
            })
        })
    }
});