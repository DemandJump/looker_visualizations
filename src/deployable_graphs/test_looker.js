/* Register a new custom visualization with loooker by calling the
        * looker.plugins.visualizations.add ~ function and passing it a visualization object 
    */
   looker.plugins.visualizations.add({
    id: 'hello_world_test',
    label: 'Looker Custom Visualization Test',
    options: {
        font_size: {
            type: "string",
            label: "Font Size",
            values: [
                {"Large": "large"},
                {"Small": "small"}
            ],
            display: "radio",
            default: "large"
        }
    },

    // Onto the create section 
create: function(element, config) {
    var d3 = d3v4; // Pull in d3 selector as it's normal reference
    // Element is the Dom element that looker would like us to put our visualization into
        // Looker formats it to the proper size, you just need to put the stuff here
// We're essentially using vanilla javascript to create a visualization for looker to append!

    // Insert a <style> tag with some styles we'll use later.
    element.innerHTML = `
        <style>
            .hello-world-vis { 
                // Vertical centering
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center; 
                text-align: center;
            }
            .hello-world-text-small {
                font-size: 18px;
            }
            .hello-world-text-large { 
                font-size: 72px;
            }
            div {
                background-color: gray;
            }
        </style>

        <h1>Ready to render!</h1>
        `;

    /* 
        So create is where you setup the visualization, then we render it in updateAsync
            Note: Create is a convenient place t o do setup that only needs to happen once 
    */

},

    // Onto the update async section
updateAsync: function(data, element, config, queryResponse, details, doneRendering) { 
    var d3 = d3v4; // Pull in the d3 selector as it's normal reference 
    // This helps us visualize the interactive data!
    // This function is called any time the chart is supposed to visualize changes, or when any other event happens that might affect how your chart is rendered.
    
    /* CURRENT VERSION */ // Just comment what your doing becuase looker takes forever to grab the updated server js file
    console.log('Pulling in d3 by building it into the js file');

    /****** Log all these functions to see what we're working with ******/
    console.log('\n\n\n\n\nUpdateAsync initialized');
    console.log('data', data);
    console.log('element', element);
    console.log('config', config);
    console.log('queryResponse', queryResponse);
    console.log('details', details);

    // Try implementing d3
    console.log('See if the d3 stuff works', d3);

    /**********************
     * Error Clauses 
    **********************/
        // Clear any errors from previous updates.
    // this.clearErrors(); /* !!! Important try keeping this off for now !!!


        // You can clean up the error console as you iterate and even create custom errors

        // Create different cases for potential errors that could occur
    // Throw some errors and exit if the shape of the data isn't what this chart needs.
    if (queryResponse.fields.dimensions.length == 0) {
        this.addError({title: "No Dimensions", message: "This chart requires dimensions."});
        return;
    }


    /***********************************
     * Update the Visualization *
    ***********************************/
    var html = "";
		for(var row of data) {
			var cell = row[queryResponse.fields.dimensions[0].name];
			html += LookerCharts.Utils.htmlForCell(cell);
        }
        element.innerHTML = html; // This is to test the data 
        console.log('what is cell?', cell);




    /**********************
     * Update the Options
    **********************/
    // Here's a check we add to the end of the update function to implement the options 


    /**************** Done! *****************/
    // Always call done to indicate a visualization has finished rendering
    doneRendering() 
}
});

/*
    git status
    git add . 
    git commit -m "experimenting"
    git push -u origin master 
    git status

*/









/******************************************/
/***********************************************
 * D3 V4 LIBRARY
***********************************************/
/*****************************************/

// https://d3js.org Version 4.12.0. Copyright 2017 Mike Bostock.
(function(t, n) {
	"object" == typeof exports && "undefined" != typeof module ? n(exports) : "function" == typeof define && define.amd ? define(["exports"], n) : n(t.d3v4 = t.d3v4 || {})
})(this, function(t) {
	"use strict";

	function n(t, n) {
		return [t, n]
	}

	function e(t, n, e) {
		var r = (n - t) / Math.max(0, e),
			i = Math.floor(Math.log(r) / Math.LN10),
			o = r / Math.pow(10, i);
		return i >= 0 ? (o >= Ra ? 10 : o >= La ? 5 : o >= qa ? 2 : 1) * Math.pow(10, i) : -Math.pow(10, -i) / (o >= Ra ? 10 : o >= La ? 5 : o >= qa ? 2 : 1)
	}

	function r(t, n, e) {
		var r = Math.abs(n - t) / Math.max(0, e),
			i = Math.pow(10, Math.floor(Math.log(r) / Math.LN10)),
			o = r / i;
		return o >= Ra ? i *= 10 : o >= La ? i *= 5 : o >= qa && (i *= 2), n < t ? -i : i
	}

	function i(t) {
		return t.length
	}

	function o() {
		return !this.__axis
	}

	function u(t, n) {
		function e(e) {
			var p = null == i ? n.ticks ? n.ticks.apply(n, r) : n.domain() : i,
				d = null == u ? n.tickFormat ? n.tickFormat.apply(n, r) : Ha : u,
				v = Math.max(a, 0) + s,
				g = n.range(),
				_ = +g[0] + .5,
				y = +g[g.length - 1] + .5,
				m = (n.bandwidth ? function(t) {
					var n = Math.max(0, t.bandwidth() - 1) / 2;
					return t.round() && (n = Math.round(n)),
						function(e) {
							return +t(e) + n
						}
				} : function(t) {
					return function(n) {
						return +t(n)
					}
				})(n.copy()),
				x = e.selection ? e.selection() : e,
				b = x.selectAll(".domain").data([null]),
				w = x.selectAll(".tick").data(p, n).order(),
				M = w.exit(),
				T = w.enter().append("g").attr("class", "tick"),
				N = w.select("line"),
				k = w.select("text");
			b = b.merge(b.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "#000")), w = w.merge(T), N = N.merge(T.append("line").attr("stroke", "#000").attr(l + "2", f * a)), k = k.merge(T.append("text").attr("fill", "#000").attr(l, f * v).attr("dy", t === ja ? "0em" : t === Va ? "0.71em" : "0.32em")), e !== x && (b = b.transition(e), w = w.transition(e), N = N.transition(e), k = k.transition(e), M = M.transition(e).attr("opacity", Wa).attr("transform", function(t) {
				return isFinite(t = m(t)) ? h(t) : this.getAttribute("transform")
			}), T.attr("opacity", Wa).attr("transform", function(t) {
				var n = this.parentNode.__axis;
				return h(n && isFinite(n = n(t)) ? n : m(t))
			})), M.remove(), b.attr("d", t === $a || t == Xa ? "M" + f * c + "," + _ + "H0.5V" + y + "H" + f * c : "M" + _ + "," + f * c + "V0.5H" + y + "V" + f * c), w.attr("opacity", 1).attr("transform", function(t) {
				return h(m(t))
			}), N.attr(l + "2", f * a), k.attr(l, f * v).text(d), x.filter(o).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", t === Xa ? "start" : t === $a ? "end" : "middle"), x.each(function() {
				this.__axis = m
			})
		}
		var r = [],
			i = null,
			u = null,
			a = 6,
			c = 6,
			s = 3,
			f = t === ja || t === $a ? -1 : 1,
			l = t === $a || t === Xa ? "x" : "y",
			h = t === ja || t === Va ? function(t) {
				return "translate(" + (t + .5) + ",0)"
			} : function(t) {
				return "translate(0," + (t + .5) + ")"
			};
		return e.scale = function(t) {
			return arguments.length ? (n = t, e) : n
		}, e.ticks = function() {
			return r = Ba.call(arguments), e
		}, e.tickArguments = function(t) {
			return arguments.length ? (r = null == t ? [] : Ba.call(t), e) : r.slice()
		}, e.tickValues = function(t) {
			return arguments.length ? (i = null == t ? null : Ba.call(t), e) : i && i.slice()
		}, e.tickFormat = function(t) {
			return arguments.length ? (u = t, e) : u
		}, e.tickSize = function(t) {
			return arguments.length ? (a = c = +t, e) : a
		}, e.tickSizeInner = function(t) {
			return arguments.length ? (a = +t, e) : a
		}, e.tickSizeOuter = function(t) {
			return arguments.length ? (c = +t, e) : c
		}, e.tickPadding = function(t) {
			return arguments.length ? (s = +t, e) : s
		}, e
	}

	function a() {
		for (var t, n = 0, e = arguments.length, r = {}; n < e; ++n) {
			if (!(t = arguments[n] + "") || t in r) throw new Error("illegal type: " + t);
			r[t] = []
		}
		return new c(r)
	}

	function c(t) {
		this._ = t
	}

	function s(t, n, e) {
		for (var r = 0, i = t.length; r < i; ++r)
			if (t[r].name === n) {
				t[r] = Za, t = t.slice(0, r).concat(t.slice(r + 1));
				break
			} return null != e && t.push({
			name: n,
			value: e
		}), t
	}

	function f() {
		return new l
	}

	function l() {
		this._ = "@" + (++tc).toString(36)
	}

	function h(n, e, r) {
		return function(i) {
			var o = t.event;
			t.event = i;
			try {
				n.call(this, this.__data__, e, r)
			} finally {
				t.event = o
			}
		}
	}

	function p(t, n, e) {
		var r = oc.hasOwnProperty(t.type) ? function(t, n, e) {
			return t = h(t, n, e),
				function(n) {
					var e = n.relatedTarget;
					e && (e === this || 8 & e.compareDocumentPosition(this)) || t.call(this, n)
				}
		} : h;
		return function(i, o, u) {
			var a, c = this.__on,
				s = r(n, o, u);
			if (c)
				for (var f = 0, l = c.length; f < l; ++f)
					if ((a = c[f]).type === t.type && a.name === t.name) return this.removeEventListener(a.type, a.listener, a.capture), this.addEventListener(a.type, a.listener = s, a.capture = e), void(a.value = n);
			this.addEventListener(t.type, s, e), a = {
				type: t.type,
				name: t.name,
				value: n,
				listener: s,
				capture: e
			}, c ? c.push(a) : this.__on = [a]
		}
	}

	function d(n, e, r, i) {
		var o = t.event;
		n.sourceEvent = t.event, t.event = n;
		try {
			return e.apply(r, i)
		} finally {
			t.event = o
		}
	}

	function v(t, n) {
		this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = n
	}

	function g(t, n) {
		return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN
	}

	function _(t, n) {
		return t.style.getPropertyValue(n) || pc(t).getComputedStyle(t, null).getPropertyValue(n)
	}

	function y(t) {
		return t.trim().split(/^|\s+/)
	}

	function m(t) {
		return t.classList || new x(t)
	}

	function x(t) {
		this._node = t, this._names = y(t.getAttribute("class") || "")
	}

	function b(t, n) {
		for (var e = m(t), r = -1, i = n.length; ++r < i;) e.add(n[r])
	}

	function w(t, n) {
		for (var e = m(t), r = -1, i = n.length; ++r < i;) e.remove(n[r])
	}

	function M() {
		this.nextSibling && this.parentNode.appendChild(this)
	}

	function T() {
		this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild)
	}

	function N() {
		var t = this.parentNode;
		t && t.removeChild(this)
	}

	function k(t, n, e) {
		var r = pc(t),
			i = r.CustomEvent;
		"function" == typeof i ? i = new i(n, e) : (i = r.document.createEvent("Event"), e ? (i.initEvent(n, e.bubbles, e.cancelable), i.detail = e.detail) : i.initEvent(n, !1, !1)), t.dispatchEvent(i)
	}

	function S(t, n) {
		this._groups = t, this._parents = n
	}

	function E() {
		return new S([
			[document.documentElement]
		], dc)
	}

	function A() {
		t.event.stopImmediatePropagation()
	}

	function C(t, n) {
		var e = t.document.documentElement,
			r = vc(t).on("dragstart.drag", null);
		n && (r.on("click.drag", _c, !0), setTimeout(function() {
			r.on("click.drag", null)
		}, 0)), "onselectstart" in e ? r.on("selectstart.drag", null) : (e.style.MozUserSelect = e.__noselect, delete e.__noselect)
	}

	function z(t, n, e, r, i, o, u, a, c, s) {
		this.target = t, this.type = n, this.subject = e, this.identifier = r, this.active = i, this.x = o, this.y = u, this.dx = a, this.dy = c, this._ = s
	}

	function P() {
		return !t.event.button
	}

	function R() {
		return this.parentNode
	}

	function L(n) {
		return null == n ? {
			x: t.event.x,
			y: t.event.y
		} : n
	}

	function q() {
		return "ontouchstart" in this
	}

	function D(t, n) {
		var e = Object.create(t.prototype);
		for (var r in n) e[r] = n[r];
		return e
	}

	function U() {}

	function O(t) {
		var n;
		return t = (t + "").trim().toLowerCase(), (n = Tc.exec(t)) ? (n = parseInt(n[1], 16), new H(n >> 8 & 15 | n >> 4 & 240, n >> 4 & 15 | 240 & n, (15 & n) << 4 | 15 & n, 1)) : (n = Nc.exec(t)) ? F(parseInt(n[1], 16)) : (n = kc.exec(t)) ? new H(n[1], n[2], n[3], 1) : (n = Sc.exec(t)) ? new H(255 * n[1] / 100, 255 * n[2] / 100, 255 * n[3] / 100, 1) : (n = Ec.exec(t)) ? I(n[1], n[2], n[3], n[4]) : (n = Ac.exec(t)) ? I(255 * n[1] / 100, 255 * n[2] / 100, 255 * n[3] / 100, n[4]) : (n = Cc.exec(t)) ? j(n[1], n[2] / 100, n[3] / 100, 1) : (n = zc.exec(t)) ? j(n[1], n[2] / 100, n[3] / 100, n[4]) : Pc.hasOwnProperty(t) ? F(Pc[t]) : "transparent" === t ? new H(NaN, NaN, NaN, 0) : null
	}

	function F(t) {
		return new H(t >> 16 & 255, t >> 8 & 255, 255 & t, 1)
	}

	function I(t, n, e, r) {
		return r <= 0 && (t = n = e = NaN), new H(t, n, e, r)
	}

	function Y(t) {
		return t instanceof U || (t = O(t)), t ? (t = t.rgb(), new H(t.r, t.g, t.b, t.opacity)) : new H
	}

	function B(t, n, e, r) {
		return 1 === arguments.length ? Y(t) : new H(t, n, e, null == r ? 1 : r)
	}

	function H(t, n, e, r) {
		this.r = +t, this.g = +n, this.b = +e, this.opacity = +r
	}

	function j(t, n, e, r) {
		return r <= 0 ? t = n = e = NaN : e <= 0 || e >= 1 ? t = n = NaN : n <= 0 && (t = NaN), new V(t, n, e, r)
	}

	function X(t, n, e, r) {
		return 1 === arguments.length ? function(t) {
			if (t instanceof V) return new V(t.h, t.s, t.l, t.opacity);
			if (t instanceof U || (t = O(t)), !t) return new V;
			if (t instanceof V) return t;
			var n = (t = t.rgb()).r / 255,
				e = t.g / 255,
				r = t.b / 255,
				i = Math.min(n, e, r),
				o = Math.max(n, e, r),
				u = NaN,
				a = o - i,
				c = (o + i) / 2;
			return a ? (u = n === o ? (e - r) / a + 6 * (e < r) : e === o ? (r - n) / a + 2 : (n - e) / a + 4, a /= c < .5 ? o + i : 2 - o - i, u *= 60) : a = c > 0 && c < 1 ? 0 : u, new V(u, a, c, t.opacity)
		}(t) : new V(t, n, e, null == r ? 1 : r)
	}

	function V(t, n, e, r) {
		this.h = +t, this.s = +n, this.l = +e, this.opacity = +r
	}

	function $(t, n, e) {
		return 255 * (t < 60 ? n + (e - n) * t / 60 : t < 180 ? e : t < 240 ? n + (e - n) * (240 - t) / 60 : n)
	}

	function W(t) {
		if (t instanceof G) return new G(t.l, t.a, t.b, t.opacity);
		if (t instanceof et) {
			var n = t.h * Rc;
			return new G(t.l, Math.cos(n) * t.c, Math.sin(n) * t.c, t.opacity)
		}
		t instanceof H || (t = Y(t));
		var e = tt(t.r),
			r = tt(t.g),
			i = tt(t.b),
			o = Q((.4124564 * e + .3575761 * r + .1804375 * i) / qc),
			u = Q((.2126729 * e + .7151522 * r + .072175 * i) / Dc);
		return new G(116 * u - 16, 500 * (o - u), 200 * (u - Q((.0193339 * e + .119192 * r + .9503041 * i) / Uc)), t.opacity)
	}

	function Z(t, n, e, r) {
		return 1 === arguments.length ? W(t) : new G(t, n, e, null == r ? 1 : r)
	}

	function G(t, n, e, r) {
		this.l = +t, this.a = +n, this.b = +e, this.opacity = +r
	}

	function Q(t) {
		return t > Yc ? Math.pow(t, 1 / 3) : t / Ic + Oc
	}

	function J(t) {
		return t > Fc ? t * t * t : Ic * (t - Oc)
	}

	function K(t) {
		return 255 * (t <= .0031308 ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - .055)
	}

	function tt(t) {
		return (t /= 255) <= .04045 ? t / 12.92 : Math.pow((t + .055) / 1.055, 2.4)
	}

	function nt(t, n, e, r) {
		return 1 === arguments.length ? function(t) {
			if (t instanceof et) return new et(t.h, t.c, t.l, t.opacity);
			t instanceof G || (t = W(t));
			var n = Math.atan2(t.b, t.a) * Lc;
			return new et(n < 0 ? n + 360 : n, Math.sqrt(t.a * t.a + t.b * t.b), t.l, t.opacity)
		}(t) : new et(t, n, e, null == r ? 1 : r)
	}

	function et(t, n, e, r) {
		this.h = +t, this.c = +n, this.l = +e, this.opacity = +r
	}

	function rt(t, n, e, r) {
		return 1 === arguments.length ? function(t) {
			if (t instanceof it) return new it(t.h, t.s, t.l, t.opacity);
			t instanceof H || (t = Y(t));
			var n = t.r / 255,
				e = t.g / 255,
				r = t.b / 255,
				i = (Zc * r + $c * n - Wc * e) / (Zc + $c - Wc),
				o = r - i,
				u = (Vc * (e - i) - jc * o) / Xc,
				a = Math.sqrt(u * u + o * o) / (Vc * i * (1 - i)),
				c = a ? Math.atan2(u, o) * Lc - 120 : NaN;
			return new it(c < 0 ? c + 360 : c, a, i, t.opacity)
		}(t) : new it(t, n, e, null == r ? 1 : r)
	}

	function it(t, n, e, r) {
		this.h = +t, this.s = +n, this.l = +e, this.opacity = +r
	}

	function ot(t, n, e, r, i) {
		var o = t * t,
			u = o * t;
		return ((1 - 3 * t + 3 * o - u) * n + (4 - 6 * o + 3 * u) * e + (1 + 3 * t + 3 * o - 3 * u) * r + u * i) / 6
	}

	function ut(t, n) {
		return function(e) {
			return t + e * n
		}
	}

	function at(t, n) {
		var e = n - t;
		return e ? ut(t, e > 180 || e < -180 ? e - 360 * Math.round(e / 360) : e) : is(isNaN(t) ? n : t)
	}

	function ct(t) {
		return 1 == (t = +t) ? st : function(n, e) {
			return e - n ? function(t, n, e) {
				return t = Math.pow(t, e), n = Math.pow(n, e) - t, e = 1 / e,
					function(r) {
						return Math.pow(t + r * n, e)
					}
			}(n, e, t) : is(isNaN(n) ? e : n)
		}
	}

	function st(t, n) {
		var e = n - t;
		return e ? ut(t, e) : is(isNaN(t) ? n : t)
	}

	function ft(t) {
		return function(n) {
			var e, r, i = n.length,
				o = new Array(i),
				u = new Array(i),
				a = new Array(i);
			for (e = 0; e < i; ++e) r = B(n[e]), o[e] = r.r || 0, u[e] = r.g || 0, a[e] = r.b || 0;
			return o = t(o), u = t(u), a = t(a), r.opacity = 1,
				function(t) {
					return r.r = o(t), r.g = u(t), r.b = a(t), r + ""
				}
		}
	}

	function lt(t, n, e, r) {
		function i(t) {
			return t.length ? t.pop() + " " : ""
		}
		return function(o, u) {
			var a = [],
				c = [];
			return o = t(o), u = t(u),
				function(t, r, i, o, u, a) {
					if (t !== i || r !== o) {
						var c = u.push("translate(", null, n, null, e);
						a.push({
							i: c - 4,
							x: fs(t, i)
						}, {
							i: c - 2,
							x: fs(r, o)
						})
					} else(i || o) && u.push("translate(" + i + n + o + e)
				}(o.translateX, o.translateY, u.translateX, u.translateY, a, c),
				function(t, n, e, o) {
					t !== n ? (t - n > 180 ? n += 360 : n - t > 180 && (t += 360), o.push({
						i: e.push(i(e) + "rotate(", null, r) - 2,
						x: fs(t, n)
					})) : n && e.push(i(e) + "rotate(" + n + r)
				}(o.rotate, u.rotate, a, c),
				function(t, n, e, o) {
					t !== n ? o.push({
						i: e.push(i(e) + "skewX(", null, r) - 2,
						x: fs(t, n)
					}) : n && e.push(i(e) + "skewX(" + n + r)
				}(o.skewX, u.skewX, a, c),
				function(t, n, e, r, o, u) {
					if (t !== e || n !== r) {
						var a = o.push(i(o) + "scale(", null, ",", null, ")");
						u.push({
							i: a - 4,
							x: fs(t, e)
						}, {
							i: a - 2,
							x: fs(n, r)
						})
					} else 1 === e && 1 === r || o.push(i(o) + "scale(" + e + "," + r + ")")
				}(o.scaleX, o.scaleY, u.scaleX, u.scaleY, a, c), o = u = null,
				function(t) {
					for (var n, e = -1, r = c.length; ++e < r;) a[(n = c[e]).i] = n.x(t);
					return a.join("")
				}
		}
	}

	function ht(t) {
		return ((t = Math.exp(t)) + 1 / t) / 2
	}

	function pt(t) {
		return function(n, e) {
			var r = t((n = X(n)).h, (e = X(e)).h),
				i = st(n.s, e.s),
				o = st(n.l, e.l),
				u = st(n.opacity, e.opacity);
			return function(t) {
				return n.h = r(t), n.s = i(t), n.l = o(t), n.opacity = u(t), n + ""
			}
		}
	}

	function dt(t) {
		return function(n, e) {
			var r = t((n = nt(n)).h, (e = nt(e)).h),
				i = st(n.c, e.c),
				o = st(n.l, e.l),
				u = st(n.opacity, e.opacity);
			return function(t) {
				return n.h = r(t), n.c = i(t), n.l = o(t), n.opacity = u(t), n + ""
			}
		}
	}

	function vt(t) {
		return function n(e) {
			function r(n, r) {
				var i = t((n = rt(n)).h, (r = rt(r)).h),
					o = st(n.s, r.s),
					u = st(n.l, r.l),
					a = st(n.opacity, r.opacity);
				return function(t) {
					return n.h = i(t), n.s = o(t), n.l = u(Math.pow(t, e)), n.opacity = a(t), n + ""
				}
			}
			return e = +e, r.gamma = n, r
		}(1)
	}

	function gt() {
		return qs || (Os(_t), qs = Us.now() + Ds)
	}

	function _t() {
		qs = 0
	}

	function yt() {
		this._call = this._time = this._next = null
	}

	function mt(t, n, e) {
		var r = new yt;
		return r.restart(t, n, e), r
	}

	function xt() {
		gt(), ++Cs;
		for (var t, n = ts; n;)(t = qs - n._time) >= 0 && n._call.call(null, t), n = n._next;
		--Cs
	}

	function bt() {
		qs = (Ls = Us.now()) + Ds, Cs = zs = 0;
		try {
			xt()
		} finally {
			Cs = 0,
				function() {
					var t, n, e = ts,
						r = 1 / 0;
					for (; e;) e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : ts = n);
					ns = t, Mt(r)
				}(), qs = 0
		}
	}

	function wt() {
		var t = Us.now(),
			n = t - Ls;
		n > Rs && (Ds -= n, Ls = t)
	}

	function Mt(t) {
		if (!Cs) {
			zs && (zs = clearTimeout(zs));
			t - qs > 24 ? (t < 1 / 0 && (zs = setTimeout(bt, t - Us.now() - Ds)), Ps && (Ps = clearInterval(Ps))) : (Ps || (Ls = Us.now(), Ps = setInterval(wt, Rs)), Cs = 1, Os(bt))
		}
	}

	function Tt(t, n) {
		var e = kt(t, n);
		if (e.state > Bs) throw new Error("too late; already scheduled");
		return e
	}

	function Nt(t, n) {
		var e = kt(t, n);
		if (e.state > js) throw new Error("too late; already started");
		return e
	}

	function kt(t, n) {
		var e = t.__transition;
		if (!e || !(e = e[n])) throw new Error("transition not found");
		return e
	}

	function St(t, n, e) {
		var r = t._id;
		return t.each(function() {
				var t = Nt(this, r);
				(t.value || (t.value = {}))[n] = e.apply(this, arguments)
			}),
			function(t) {
				return kt(t, r).value[n]
			}
	}

	function Et(t, n, e, r) {
		this._groups = t, this._parents = n, this._name = e, this._id = r
	}

	function At(t) {
		return E().transition(t)
	}

	function Ct() {
		return ++Ks
	}

	function zt(t) {
		return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2
	}

	function Pt(t) {
		return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2
	}

	function Rt(t) {
		return (1 - Math.cos( of * t)) / 2
	}

	function Lt(t) {
		return ((t *= 2) <= 1 ? Math.pow(2, 10 * t - 10) : 2 - Math.pow(2, 10 - 10 * t)) / 2
	}

	function qt(t) {
		return ((t *= 2) <= 1 ? 1 - Math.sqrt(1 - t * t) : Math.sqrt(1 - (t -= 2) * t) + 1) / 2
	}

	function Dt(t) {
		return (t = +t) < af ? gf * t * t : t < sf ? gf * (t -= cf) * t + ff : t < hf ? gf * (t -= lf) * t + pf : gf * (t -= df) * t + vf
	}

	function Ut(t, n) {
		for (var e; !(e = t.__transition) || !(e = e[n]);)
			if (!(t = t.parentNode)) return Tf.time = gt(), Tf;
		return e
	}

	function Ot() {
		t.event.stopImmediatePropagation()
	}

	function Ft(t) {
		return {
			type: t
		}
	}

	function It() {
		return !t.event.button
	}

	function Yt() {
		var t = this.ownerSVGElement || this;
		return [
			[0, 0],
			[t.width.baseVal.value, t.height.baseVal.value]
		]
	}

	function Bt(t) {
		for (; !t.__brush;)
			if (!(t = t.parentNode)) return;
		return t.__brush
	}

	function Ht(t) {
		return t[0][0] === t[1][0] || t[0][1] === t[1][1]
	}

	function jt(n) {
		function e(t) {
			var e = t.property("__brush", c).selectAll(".overlay").data([Ft("overlay")]);
			e.enter().append("rect").attr("class", "overlay").attr("pointer-events", "all").attr("cursor", Df.overlay).merge(e).each(function() {
				var t = Bt(this).extent;
				vc(this).attr("x", t[0][0]).attr("y", t[0][1]).attr("width", t[1][0] - t[0][0]).attr("height", t[1][1] - t[0][1])
			}), t.selectAll(".selection").data([Ft("selection")]).enter().append("rect").attr("class", "selection").attr("cursor", Df.selection).attr("fill", "#777").attr("fill-opacity", .3).attr("stroke", "#fff").attr("shape-rendering", "crispEdges");
			var i = t.selectAll(".handle").data(n.handles, function(t) {
				return t.type
			});
			i.exit().remove(), i.enter().append("rect").attr("class", function(t) {
				return "handle handle--" + t.type
			}).attr("cursor", function(t) {
				return Df[t.type]
			}), t.each(r).attr("fill", "none").attr("pointer-events", "all").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)").on("mousedown.brush touchstart.brush", u)
		}

		function r() {
			var t = vc(this),
				n = Bt(this).selection;
			n ? (t.selectAll(".selection").style("display", null).attr("x", n[0][0]).attr("y", n[0][1]).attr("width", n[1][0] - n[0][0]).attr("height", n[1][1] - n[0][1]), t.selectAll(".handle").style("display", null).attr("x", function(t) {
				return "e" === t.type[t.type.length - 1] ? n[1][0] - p / 2 : n[0][0] - p / 2
			}).attr("y", function(t) {
				return "s" === t.type[0] ? n[1][1] - p / 2 : n[0][1] - p / 2
			}).attr("width", function(t) {
				return "n" === t.type || "s" === t.type ? n[1][0] - n[0][0] + p : p
			}).attr("height", function(t) {
				return "e" === t.type || "w" === t.type ? n[1][1] - n[0][1] + p : p
			})) : t.selectAll(".selection,.handle").style("display", "none").attr("x", null).attr("y", null).attr("width", null).attr("height", null)
		}

		function i(t, n) {
			return t.__brush.emitter || new o(t, n)
		}

		function o(t, n) {
			this.that = t, this.args = n, this.state = t.__brush, this.active = 0
		}

		function u() {
			function e() {
				var t = cc(w);
				!q || x || b || (Math.abs(t[0] - U[0]) > Math.abs(t[1] - U[1]) ? b = !0 : x = !0), U = t, m = !0, Ef(), o()
			}

			function o() {
				var t;
				switch (_ = U[0] - D[0], y = U[1] - D[1], T) {
					case Cf:
					case Af:
						N && (_ = Math.max(z - a, Math.min(R - p, _)), c = a + _, d = p + _), k && (y = Math.max(P - f, Math.min(L - v, y)), h = f + y, g = v + y);
						break;
					case zf:
						N < 0 ? (_ = Math.max(z - a, Math.min(R - a, _)), c = a + _, d = p) : N > 0 && (_ = Math.max(z - p, Math.min(R - p, _)), c = a, d = p + _), k < 0 ? (y = Math.max(P - f, Math.min(L - f, y)), h = f + y, g = v) : k > 0 && (y = Math.max(P - v, Math.min(L - v, y)), h = f, g = v + y);
						break;
					case Pf:
						N && (c = Math.max(z, Math.min(R, a - _ * N)), d = Math.max(z, Math.min(R, p + _ * N))), k && (h = Math.max(P, Math.min(L, f - y * k)), g = Math.max(P, Math.min(L, v + y * k)))
				}
				d < c && (N *= -1, t = a, a = p, p = t, t = c, c = d, d = t, M in Uf && I.attr("cursor", Df[M = Uf[M]])), g < h && (k *= -1, t = f, f = v, v = t, t = h, h = g, g = t, M in Of && I.attr("cursor", Df[M = Of[M]])), S.selection && (A = S.selection), x && (c = A[0][0], d = A[1][0]), b && (h = A[0][1], g = A[1][1]), A[0][0] === c && A[0][1] === h && A[1][0] === d && A[1][1] === g || (S.selection = [
					[c, h],
					[d, g]
				], r.call(w), O.brush())
			}

			function u() {
				if (Ot(), t.event.touches) {
					if (t.event.touches.length) return;
					s && clearTimeout(s), s = setTimeout(function() {
						s = null
					}, 500), F.on("touchmove.brush touchend.brush touchcancel.brush", null)
				} else C(t.event.view, m), Y.on("keydown.brush keyup.brush mousemove.brush mouseup.brush", null);
				F.attr("pointer-events", "all"), I.attr("cursor", Df.overlay), S.selection && (A = S.selection), Ht(A) && (S.selection = null, r.call(w)), O.end()
			}
			if (t.event.touches) {
				if (t.event.changedTouches.length < t.event.touches.length) return Ef()
			} else if (s) return;
			if (l.apply(this, arguments)) {
				var a, c, f, h, p, d, v, g, _, y, m, x, b, w = this,
					M = t.event.target.__data__.type,
					T = "selection" === (t.event.metaKey ? M = "overlay" : M) ? Af : t.event.altKey ? Pf : zf,
					N = n === Lf ? null : Ff[M],
					k = n === Rf ? null : If[M],
					S = Bt(w),
					E = S.extent,
					A = S.selection,
					z = E[0][0],
					P = E[0][1],
					R = E[1][0],
					L = E[1][1],
					q = N && k && t.event.shiftKey,
					D = cc(w),
					U = D,
					O = i(w, arguments).beforestart();
				"overlay" === M ? S.selection = A = [
					[a = n === Lf ? z : D[0], f = n === Rf ? P : D[1]],
					[p = n === Lf ? R : a, v = n === Rf ? L : f]
				] : (a = A[0][0], f = A[0][1], p = A[1][0], v = A[1][1]), c = a, h = f, d = p, g = v;
				var F = vc(w).attr("pointer-events", "none"),
					I = F.selectAll(".overlay").attr("cursor", Df[M]);
				if (t.event.touches) F.on("touchmove.brush", e, !0).on("touchend.brush touchcancel.brush", u, !0);
				else {
					var Y = vc(t.event.view).on("keydown.brush", function() {
						switch (t.event.keyCode) {
							case 16:
								q = N && k;
								break;
							case 18:
								T === zf && (N && (p = d - _ * N, a = c + _ * N), k && (v = g - y * k, f = h + y * k), T = Pf, o());
								break;
							case 32:
								T !== zf && T !== Pf || (N < 0 ? p = d - _ : N > 0 && (a = c - _), k < 0 ? v = g - y : k > 0 && (f = h - y), T = Cf, I.attr("cursor", Df.selection), o());
								break;
							default:
								return
						}
						Ef()
					}, !0).on("keyup.brush", function() {
						switch (t.event.keyCode) {
							case 16:
								q && (x = b = q = !1, o());
								break;
							case 18:
								T === Pf && (N < 0 ? p = d : N > 0 && (a = c), k < 0 ? v = g : k > 0 && (f = h), T = zf, o());
								break;
							case 32:
								T === Cf && (t.event.altKey ? (N && (p = d - _ * N, a = c + _ * N), k && (v = g - y * k, f = h + y * k), T = Pf) : (N < 0 ? p = d : N > 0 && (a = c), k < 0 ? v = g : k > 0 && (f = h), T = zf), I.attr("cursor", Df[M]), o());
								break;
							default:
								return
						}
						Ef()
					}, !0).on("mousemove.brush", e, !0).on("mouseup.brush", u, !0);
					yc(t.event.view)
				}
				Ot(), Gs(w), r.call(w), O.start()
			}
		}

		function c() {
			var t = this.__brush || {
				selection: null
			};
			return t.extent = f.apply(this, arguments), t.dim = n, t
		}
		var s, f = Yt,
			l = It,
			h = a(e, "start", "brush", "end"),
			p = 6;
		return e.move = function(t, e) {
			t.selection ? t.on("start.brush", function() {
				i(this, arguments).beforestart().start()
			}).on("interrupt.brush end.brush", function() {
				i(this, arguments).end()
			}).tween("brush", function() {
				function t(t) {
					u.selection = 1 === t && Ht(s) ? null : f(t), r.call(o), a.brush()
				}
				var o = this,
					u = o.__brush,
					a = i(o, arguments),
					c = u.selection,
					s = n.input("function" == typeof e ? e.apply(this, arguments) : e, u.extent),
					f = vs(c, s);
				return c && s ? t : t(1)
			}) : t.each(function() {
				var t = arguments,
					o = this.__brush,
					u = n.input("function" == typeof e ? e.apply(this, t) : e, o.extent),
					a = i(this, t).beforestart();
				Gs(this), o.selection = null == u || Ht(u) ? null : u, r.call(this), a.start().brush().end()
			})
		}, o.prototype = {
			beforestart: function() {
				return 1 == ++this.active && (this.state.emitter = this, this.starting = !0), this
			},
			start: function() {
				return this.starting && (this.starting = !1, this.emit("start")), this
			},
			brush: function() {
				return this.emit("brush"), this
			},
			end: function() {
				return 0 == --this.active && (delete this.state.emitter, this.emit("end")), this
			},
			emit: function(t) {
				d(new Sf(e, t, n.output(this.state.selection)), h.apply, h, [t, this.that, this.args])
			}
		}, e.extent = function(t) {
			return arguments.length ? (f = "function" == typeof t ? t : kf([
				[+t[0][0], +t[0][1]],
				[+t[1][0], +t[1][1]]
			]), e) : f
		}, e.filter = function(t) {
			return arguments.length ? (l = "function" == typeof t ? t : kf(!!t), e) : l
		}, e.handleSize = function(t) {
			return arguments.length ? (p = +t, e) : p
		}, e.on = function() {
			var t = h.on.apply(h, arguments);
			return t === h ? e : t
		}, e
	}

	function Xt() {
		this._x0 = this._y0 = this._x1 = this._y1 = null, this._ = ""
	}

	function Vt() {
		return new Xt
	}

	function $t(t) {
		return t.source
	}

	function Wt(t) {
		return t.target
	}

	function Zt(t) {
		return t.radius
	}

	function Gt(t) {
		return t.startAngle
	}

	function Qt(t) {
		return t.endAngle
	}

	function Jt() {}

	function Kt(t, n) {
		var e = new Jt;
		if (t instanceof Jt) t.each(function(t, n) {
			e.set(n, t)
		});
		else if (Array.isArray(t)) {
			var r, i = -1,
				o = t.length;
			if (null == n)
				for (; ++i < o;) e.set(i, t[i]);
			else
				for (; ++i < o;) e.set(n(r = t[i], i, t), r)
		} else if (t)
			for (var u in t) e.set(u, t[u]);
		return e
	}

	function tn() {
		return {}
	}

	function nn(t, n, e) {
		t[n] = e
	}

	function en() {
		return Kt()
	}

	function rn(t, n, e) {
		t.set(n, e)
	}

	function on() {}

	function un(t, n) {
		var e = new on;
		if (t instanceof on) t.each(function(t) {
			e.add(t)
		});
		else if (t) {
			var r = -1,
				i = t.length;
			if (null == n)
				for (; ++r < i;) e.add(t[r]);
			else
				for (; ++r < i;) e.add(n(t[r], r, t))
		}
		return e
	}

	function an(t) {
		return new Function("d", "return {" + t.map(function(t, n) {
			return JSON.stringify(t) + ": d[" + n + "]"
		}).join(",") + "}")
	}

	function cn(t, n, e, r) {
		if (isNaN(n) || isNaN(e)) return t;
		var i, o, u, a, c, s, f, l, h, p = t._root,
			d = {
				data: r
			},
			v = t._x0,
			g = t._y0,
			_ = t._x1,
			y = t._y1;
		if (!p) return t._root = d, t;
		for (; p.length;)
			if ((s = n >= (o = (v + _) / 2)) ? v = o : _ = o, (f = e >= (u = (g + y) / 2)) ? g = u : y = u, i = p, !(p = p[l = f << 1 | s])) return i[l] = d, t;
		if (a = +t._x.call(null, p.data), c = +t._y.call(null, p.data), n === a && e === c) return d.next = p, i ? i[l] = d : t._root = d, t;
		do {
			i = i ? i[l] = new Array(4) : t._root = new Array(4), (s = n >= (o = (v + _) / 2)) ? v = o : _ = o, (f = e >= (u = (g + y) / 2)) ? g = u : y = u
		} while ((l = f << 1 | s) == (h = (c >= u) << 1 | a >= o));
		return i[h] = p, i[l] = d, t
	}

	function sn(t, n, e) {
		var r = new fn(null == n ? function(t) {
			return t[0]
		} : n, null == e ? function(t) {
			return t[1]
		} : e, NaN, NaN, NaN, NaN);
		return null == t ? r : r.addAll(t)
	}

	function fn(t, n, e, r, i, o) {
		this._x = t, this._y = n, this._x0 = e, this._y0 = r, this._x1 = i, this._y1 = o, this._root = void 0
	}

	function ln(t) {
		for (var n = {
				data: t.data
			}, e = n; t = t.next;) e = e.next = {
			data: t.data
		};
		return n
	}

	function hn(t) {
		return t.x + t.vx
	}

	function pn(t) {
		return t.y + t.vy
	}

	function dn(t) {
		return t.index
	}

	function vn(t, n) {
		var e = t.get(n);
		if (!e) throw new Error("missing: " + n);
		return e
	}

	function gn(t) {
		return t.x
	}

	function _n(t) {
		return t.y
	}

	function yn(t) {
		return new mn(t)
	}

	function mn(t) {
		if (!(n = kl.exec(t))) throw new Error("invalid format: " + t);
		var n, e = n[1] || " ",
			r = n[2] || ">",
			i = n[3] || "-",
			o = n[4] || "",
			u = !!n[5],
			a = n[6] && +n[6],
			c = !!n[7],
			s = n[8] && +n[8].slice(1),
			f = n[9] || "";
		"n" === f ? (c = !0, f = "g") : Nl[f] || (f = ""), (u || "0" === e && "=" === r) && (u = !0, e = "0", r = "="), this.fill = e, this.align = r, this.sign = i, this.symbol = o, this.zero = u, this.width = a, this.comma = c, this.precision = s, this.type = f
	}

	function xn(n) {
		return Sl = Cl(n), t.format = Sl.format, t.formatPrefix = Sl.formatPrefix, Sl
	}

	function bn() {
		this.reset()
	}

	function wn(t, n, e) {
		var r = t.s = n + e,
			i = r - n,
			o = r - i;
		t.t = n - o + (e - i)
	}

	function Mn(t) {
		return t > 1 ? 0 : t < -1 ? dh : Math.acos(t)
	}

	function Tn(t) {
		return t > 1 ? vh : t < -1 ? -vh : Math.asin(t)
	}

	function Nn(t) {
		return (t = Eh(t / 2)) * t
	}

	function kn() {}

	function Sn(t, n) {
		t && Rh.hasOwnProperty(t.type) && Rh[t.type](t, n)
	}

	function En(t, n, e) {
		var r, i = -1,
			o = t.length - e;
		for (n.lineStart(); ++i < o;) r = t[i], n.point(r[0], r[1], r[2]);
		n.lineEnd()
	}

	function An(t, n) {
		var e = -1,
			r = t.length;
		for (n.polygonStart(); ++e < r;) En(t[e], n, 1);
		n.polygonEnd()
	}

	function Cn() {
		Uh.point = Pn
	}

	function zn() {
		Rn(ql, Dl)
	}

	function Pn(t, n) {
		Uh.point = Rn, ql = t, Dl = n, Ul = t *= mh, Ol = Mh(n = (n *= mh) / 2 + gh), Fl = Eh(n)
	}

	function Rn(t, n) {
		n = (n *= mh) / 2 + gh;
		var e = (t *= mh) - Ul,
			r = e >= 0 ? 1 : -1,
			i = r * e,
			o = Mh(n),
			u = Eh(n),
			a = Fl * u,
			c = Ol * o + a * Mh(i),
			s = a * r * Eh(i);
		qh.add(wh(s, c)), Ul = t, Ol = o, Fl = u
	}

	function Ln(t) {
		return [wh(t[1], t[0]), Tn(t[2])]
	}

	function qn(t) {
		var n = t[0],
			e = t[1],
			r = Mh(e);
		return [r * Mh(n), r * Eh(n), Eh(e)]
	}

	function Dn(t, n) {
		return t[0] * n[0] + t[1] * n[1] + t[2] * n[2]
	}

	function Un(t, n) {
		return [t[1] * n[2] - t[2] * n[1], t[2] * n[0] - t[0] * n[2], t[0] * n[1] - t[1] * n[0]]
	}

	function On(t, n) {
		t[0] += n[0], t[1] += n[1], t[2] += n[2]
	}

	function Fn(t, n) {
		return [t[0] * n, t[1] * n, t[2] * n]
	}

	function In(t) {
		var n = Ch(t[0] * t[0] + t[1] * t[1] + t[2] * t[2]);
		t[0] /= n, t[1] /= n, t[2] /= n
	}

	function Yn(t, n) {
		Wl.push(Zl = [Il = t, Bl = t]), n < Yl && (Yl = n), n > Hl && (Hl = n)
	}

	function Bn(t, n) {
		var e = qn([t * mh, n * mh]);
		if ($l) {
			var r = Un($l, e),
				i = Un([r[1], -r[0], 0], r);
			In(i), i = Ln(i);
			var o, u = t - jl,
				a = u > 0 ? 1 : -1,
				c = i[0] * yh * a,
				s = xh(u) > 180;
			s ^ (a * jl < c && c < a * t) ? (o = i[1] * yh) > Hl && (Hl = o) : (c = (c + 360) % 360 - 180, s ^ (a * jl < c && c < a * t) ? (o = -i[1] * yh) < Yl && (Yl = o) : (n < Yl && (Yl = n), n > Hl && (Hl = n))), s ? t < jl ? Wn(Il, t) > Wn(Il, Bl) && (Bl = t) : Wn(t, Bl) > Wn(Il, Bl) && (Il = t) : Bl >= Il ? (t < Il && (Il = t), t > Bl && (Bl = t)) : t > jl ? Wn(Il, t) > Wn(Il, Bl) && (Bl = t) : Wn(t, Bl) > Wn(Il, Bl) && (Il = t)
		} else Wl.push(Zl = [Il = t, Bl = t]);
		n < Yl && (Yl = n), n > Hl && (Hl = n), $l = e, jl = t
	}

	function Hn() {
		Fh.point = Bn
	}

	function jn() {
		Zl[0] = Il, Zl[1] = Bl, Fh.point = Yn, $l = null
	}

	function Xn(t, n) {
		if ($l) {
			var e = t - jl;
			Oh.add(xh(e) > 180 ? e + (e > 0 ? 360 : -360) : e)
		} else Xl = t, Vl = n;
		Uh.point(t, n), Bn(t, n)
	}

	function Vn() {
		Uh.lineStart()
	}

	function $n() {
		Xn(Xl, Vl), Uh.lineEnd(), xh(Oh) > ph && (Il = -(Bl = 180)), Zl[0] = Il, Zl[1] = Bl, $l = null
	}

	function Wn(t, n) {
		return (n -= t) < 0 ? n + 360 : n
	}

	function Zn(t, n) {
		return t[0] - n[0]
	}

	function Gn(t, n) {
		return t[0] <= t[1] ? t[0] <= n && n <= t[1] : n < t[0] || t[1] < n
	}

	function Qn(t, n) {
		t *= mh;
		var e = Mh(n *= mh);
		Jn(e * Mh(t), e * Eh(t), Eh(n))
	}

	function Jn(t, n, e) {
		Jl += (t - Jl) / ++Gl, Kl += (n - Kl) / Gl, th += (e - th) / Gl
	}

	function Kn() {
		Ih.point = te
	}

	function te(t, n) {
		t *= mh;
		var e = Mh(n *= mh);
		sh = e * Mh(t), fh = e * Eh(t), lh = Eh(n), Ih.point = ne, Jn(sh, fh, lh)
	}

	function ne(t, n) {
		t *= mh;
		var e = Mh(n *= mh),
			r = e * Mh(t),
			i = e * Eh(t),
			o = Eh(n),
			u = wh(Ch((u = fh * o - lh * i) * u + (u = lh * r - sh * o) * u + (u = sh * i - fh * r) * u), sh * r + fh * i + lh * o);
		Ql += u, nh += u * (sh + (sh = r)), eh += u * (fh + (fh = i)), rh += u * (lh + (lh = o)), Jn(sh, fh, lh)
	}

	function ee() {
		Ih.point = Qn
	}

	function re() {
		Ih.point = oe
	}

	function ie() {
		ue(ah, ch), Ih.point = Qn
	}

	function oe(t, n) {
		ah = t, ch = n, t *= mh, n *= mh, Ih.point = ue;
		var e = Mh(n);
		sh = e * Mh(t), fh = e * Eh(t), lh = Eh(n), Jn(sh, fh, lh)
	}

	function ue(t, n) {
		t *= mh;
		var e = Mh(n *= mh),
			r = e * Mh(t),
			i = e * Eh(t),
			o = Eh(n),
			u = fh * o - lh * i,
			a = lh * r - sh * o,
			c = sh * i - fh * r,
			s = Ch(u * u + a * a + c * c),
			f = Tn(s),
			l = s && -f / s;
		ih += l * u, oh += l * a, uh += l * c, Ql += f, nh += f * (sh + (sh = r)), eh += f * (fh + (fh = i)), rh += f * (lh + (lh = o)), Jn(sh, fh, lh)
	}

	function ae(t, n) {
		return [t > dh ? t - _h : t < -dh ? t + _h : t, n]
	}

	function ce(t, n, e) {
		return (t %= _h) ? n || e ? Bh(fe(t), le(n, e)) : fe(t) : n || e ? le(n, e) : ae
	}

	function se(t) {
		return function(n, e) {
			return n += t, [n > dh ? n - _h : n < -dh ? n + _h : n, e]
		}
	}

	function fe(t) {
		var n = se(t);
		return n.invert = se(-t), n
	}

	function le(t, n) {
		function e(t, n) {
			var e = Mh(n),
				a = Mh(t) * e,
				c = Eh(t) * e,
				s = Eh(n),
				f = s * r + a * i;
			return [wh(c * o - f * u, a * r - s * i), Tn(f * o + c * u)]
		}
		var r = Mh(t),
			i = Eh(t),
			o = Mh(n),
			u = Eh(n);
		return e.invert = function(t, n) {
			var e = Mh(n),
				a = Mh(t) * e,
				c = Eh(t) * e,
				s = Eh(n),
				f = s * o - c * u;
			return [wh(c * o + s * u, a * r + f * i), Tn(f * r - a * i)]
		}, e
	}

	function he(t, n, e, r, i, o) {
		if (e) {
			var u = Mh(n),
				a = Eh(n),
				c = r * e;
			null == i ? (i = n + r * _h, o = n - c / 2) : (i = pe(u, i), o = pe(u, o), (r > 0 ? i < o : i > o) && (i += r * _h));
			for (var s, f = i; r > 0 ? f > o : f < o; f -= c) s = Ln([u, -a * Mh(f), -a * Eh(f)]), t.point(s[0], s[1])
		}
	}

	function pe(t, n) {
		(n = qn(n))[0] -= t, In(n);
		var e = Mn(-n[1]);
		return ((-n[2] < 0 ? -e : e) + _h - ph) % _h
	}

	function de(t, n, e, r) {
		this.x = t, this.z = n, this.o = e, this.e = r, this.v = !1, this.n = this.p = null
	}

	function ve(t) {
		if (n = t.length) {
			for (var n, e, r = 0, i = t[0]; ++r < n;) i.n = e = t[r], e.p = i, i = e;
			i.n = e = t[0], e.p = i
		}
	}

	function ge(t) {
		return t.length > 1
	}

	function _e(t, n) {
		return ((t = t.x)[0] < 0 ? t[1] - vh - ph : vh - t[1]) - ((n = n.x)[0] < 0 ? n[1] - vh - ph : vh - n[1])
	}

	function ye(t, n, e, r) {
		function i(i, o) {
			return t <= i && i <= e && n <= o && o <= r
		}

		function o(i, o, a, s) {
			var f = 0,
				l = 0;
			if (null == i || (f = u(i, a)) !== (l = u(o, a)) || c(i, o) < 0 ^ a > 0)
				do {
					s.point(0 === f || 3 === f ? t : e, f > 1 ? r : n)
				} while ((f = (f + a + 4) % 4) !== l);
			else s.point(o[0], o[1])
		}

		function u(r, i) {
			return xh(r[0] - t) < ph ? i > 0 ? 0 : 3 : xh(r[0] - e) < ph ? i > 0 ? 2 : 1 : xh(r[1] - n) < ph ? i > 0 ? 1 : 0 : i > 0 ? 3 : 2
		}

		function a(t, n) {
			return c(t.x, n.x)
		}

		function c(t, n) {
			var e = u(t, 1),
				r = u(n, 1);
			return e !== r ? e - r : 0 === e ? n[1] - t[1] : 1 === e ? t[0] - n[0] : 2 === e ? t[1] - n[1] : n[0] - t[0]
		}
		return function(u) {
			function c(t, n) {
				i(t, n) && b.point(t, n)
			}

			function s(o, u) {
				var a = i(o, u);
				if (l && h.push([o, u]), m) p = o, d = u, v = a, m = !1, a && (b.lineStart(), b.point(o, u));
				else if (a && y) b.point(o, u);
				else {
					var c = [g = Math.max(lp, Math.min(fp, g)), _ = Math.max(lp, Math.min(fp, _))],
						s = [o = Math.max(lp, Math.min(fp, o)), u = Math.max(lp, Math.min(fp, u))];
					sp(c, s, t, n, e, r) ? (y || (b.lineStart(), b.point(c[0], c[1])), b.point(s[0], s[1]), a || b.lineEnd(), x = !1) : a && (b.lineStart(), b.point(o, u), x = !1)
				}
				g = o, _ = u, y = a
			}
			var f, l, h, p, d, v, g, _, y, m, x, b = u,
				w = np(),
				M = {
					point: c,
					lineStart: function() {
						M.point = s, l && l.push(h = []), m = !0, y = !1, g = _ = NaN
					},
					lineEnd: function() {
						f && (s(p, d), v && y && w.rejoin(), f.push(w.result())), M.point = c, y && b.lineEnd()
					},
					polygonStart: function() {
						b = w, f = [], l = [], x = !0
					},
					polygonEnd: function() {
						var n = function() {
								for (var n = 0, e = 0, i = l.length; e < i; ++e)
									for (var o, u, a = l[e], c = 1, s = a.length, f = a[0], h = f[0], p = f[1]; c < s; ++c) o = h, u = p, h = (f = a[c])[0], p = f[1], u <= r ? p > r && (h - o) * (r - u) > (p - u) * (t - o) && ++n : p <= r && (h - o) * (r - u) < (p - u) * (t - o) && --n;
								return n
							}(),
							e = x && n,
							i = (f = Fa(f)).length;
						(e || i) && (u.polygonStart(), e && (u.lineStart(), o(null, null, 1, u), u.lineEnd()), i && rp(f, a, n, o, u), u.polygonEnd()), b = u, f = l = h = null
					}
				};
			return M
		}
	}

	function me() {
		pp.point = pp.lineEnd = kn
	}

	function xe(t, n) {
		Hh = t *= mh, jh = Eh(n *= mh), Xh = Mh(n), pp.point = be
	}

	function be(t, n) {
		t *= mh;
		var e = Eh(n *= mh),
			r = Mh(n),
			i = xh(t - Hh),
			o = Mh(i),
			u = r * Eh(i),
			a = Xh * e - jh * r * o,
			c = jh * e + Xh * r * o;
		hp.add(wh(Ch(u * u + a * a), c)), Hh = t, jh = e, Xh = r
	}

	function we(t, n) {
		return !(!t || !mp.hasOwnProperty(t.type)) && mp[t.type](t, n)
	}

	function Me(t, n) {
		return 0 === _p(t, n)
	}

	function Te(t, n) {
		var e = _p(t[0], t[1]);
		return _p(t[0], n) + _p(n, t[1]) <= e + ph
	}

	function Ne(t, n) {
		return !!op(t.map(ke), Se(n))
	}

	function ke(t) {
		return (t = t.map(Se)).pop(), t
	}

	function Se(t) {
		return [t[0] * mh, t[1] * mh]
	}

	function Ee(t, n, e) {
		var r = Pa(t, n - ph, e).concat(n);
		return function(t) {
			return r.map(function(n) {
				return [t, n]
			})
		}
	}

	function Ae(t, n, e) {
		var r = Pa(t, n - ph, e).concat(n);
		return function(t) {
			return r.map(function(n) {
				return [n, t]
			})
		}
	}

	function Ce() {
		function t() {
			return {
				type: "MultiLineString",
				coordinates: n()
			}
		}

		function n() {
			return Pa(Th(o / g) * g, i, g).map(h).concat(Pa(Th(s / _) * _, c, _).map(p)).concat(Pa(Th(r / d) * d, e, d).filter(function(t) {
				return xh(t % g) > ph
			}).map(f)).concat(Pa(Th(a / v) * v, u, v).filter(function(t) {
				return xh(t % _) > ph
			}).map(l))
		}
		var e, r, i, o, u, a, c, s, f, l, h, p, d = 10,
			v = d,
			g = 90,
			_ = 360,
			y = 2.5;
		return t.lines = function() {
			return n().map(function(t) {
				return {
					type: "LineString",
					coordinates: t
				}
			})
		}, t.outline = function() {
			return {
				type: "Polygon",
				coordinates: [h(o).concat(p(c).slice(1), h(i).reverse().slice(1), p(s).reverse().slice(1))]
			}
		}, t.extent = function(n) {
			return arguments.length ? t.extentMajor(n).extentMinor(n) : t.extentMinor()
		}, t.extentMajor = function(n) {
			return arguments.length ? (o = +n[0][0], i = +n[1][0], s = +n[0][1], c = +n[1][1], o > i && (n = o, o = i, i = n), s > c && (n = s, s = c, c = n), t.precision(y)) : [
				[o, s],
				[i, c]
			]
		}, t.extentMinor = function(n) {
			return arguments.length ? (r = +n[0][0], e = +n[1][0], a = +n[0][1], u = +n[1][1], r > e && (n = r, r = e, e = n), a > u && (n = a, a = u, u = n), t.precision(y)) : [
				[r, a],
				[e, u]
			]
		}, t.step = function(n) {
			return arguments.length ? t.stepMajor(n).stepMinor(n) : t.stepMinor()
		}, t.stepMajor = function(n) {
			return arguments.length ? (g = +n[0], _ = +n[1], t) : [g, _]
		}, t.stepMinor = function(n) {
			return arguments.length ? (d = +n[0], v = +n[1], t) : [d, v]
		}, t.precision = function(n) {
			return arguments.length ? (y = +n, f = Ee(a, u, 90), l = Ae(r, e, y), h = Ee(s, c, 90), p = Ae(o, i, y), t) : y
		}, t.extentMajor([
			[-180, -90 + ph],
			[180, 90 - ph]
		]).extentMinor([
			[-180, -80 - ph],
			[180, 80 + ph]
		])
	}

	function ze() {
		Mp.point = Pe
	}

	function Pe(t, n) {
		Mp.point = Re, Vh = Wh = t, $h = Zh = n
	}

	function Re(t, n) {
		wp.add(Zh * t - Wh * n), Wh = t, Zh = n
	}

	function Le() {
		Re(Vh, $h)
	}

	function qe(t, n) {
		Ap += t, Cp += n, ++zp
	}

	function De() {
		Op.point = Ue
	}

	function Ue(t, n) {
		Op.point = Oe, qe(Jh = t, Kh = n)
	}

	function Oe(t, n) {
		var e = t - Jh,
			r = n - Kh,
			i = Ch(e * e + r * r);
		Pp += i * (Jh + t) / 2, Rp += i * (Kh + n) / 2, Lp += i, qe(Jh = t, Kh = n)
	}

	function Fe() {
		Op.point = qe
	}

	function Ie() {
		Op.point = Be
	}

	function Ye() {
		He(Gh, Qh)
	}

	function Be(t, n) {
		Op.point = He, qe(Gh = Jh = t, Qh = Kh = n)
	}

	function He(t, n) {
		var e = t - Jh,
			r = n - Kh,
			i = Ch(e * e + r * r);
		Pp += i * (Jh + t) / 2, Rp += i * (Kh + n) / 2, Lp += i, qp += (i = Kh * t - Jh * n) * (Jh + t), Dp += i * (Kh + n), Up += 3 * i, qe(Jh = t, Kh = n)
	}

	function je(t) {
		this._context = t
	}

	function Xe(t, n) {
		Xp.point = Ve, Ip = Bp = t, Yp = Hp = n
	}

	function Ve(t, n) {
		Bp -= t, Hp -= n, jp.add(Ch(Bp * Bp + Hp * Hp)), Bp = t, Hp = n
	}

	function $e() {
		this._string = []
	}

	function We(t) {
		return "m0," + t + "a" + t + "," + t + " 0 1,1 0," + -2 * t + "a" + t + "," + t + " 0 1,1 0," + 2 * t + "z"
	}

	function Ze(t) {
		return function(n) {
			var e = new Ge;
			for (var r in t) e[r] = t[r];
			return e.stream = n, e
		}
	}

	function Ge() {}

	function Qe(t, n, e) {
		var r = t.clipExtent && t.clipExtent();
		return t.scale(150).translate([0, 0]), null != r && t.clipExtent(null), Lh(e, t.stream(Ep)), n(Ep.result()), null != r && t.clipExtent(r), t
	}

	function Je(t, n, e) {
		return Qe(t, function(e) {
			var r = n[1][0] - n[0][0],
				i = n[1][1] - n[0][1],
				o = Math.min(r / (e[1][0] - e[0][0]), i / (e[1][1] - e[0][1])),
				u = +n[0][0] + (r - o * (e[1][0] + e[0][0])) / 2,
				a = +n[0][1] + (i - o * (e[1][1] + e[0][1])) / 2;
			t.scale(150 * o).translate([u, a])
		}, e)
	}

	function Ke(t, n, e) {
		return Je(t, [
			[0, 0], n
		], e)
	}

	function tr(t, n, e) {
		return Qe(t, function(e) {
			var r = +n,
				i = r / (e[1][0] - e[0][0]),
				o = (r - i * (e[1][0] + e[0][0])) / 2,
				u = -i * e[0][1];
			t.scale(150 * i).translate([o, u])
		}, e)
	}

	function nr(t, n, e) {
		return Qe(t, function(e) {
			var r = +n,
				i = r / (e[1][1] - e[0][1]),
				o = -i * e[0][0],
				u = (r - i * (e[1][1] + e[0][1])) / 2;
			t.scale(150 * i).translate([o, u])
		}, e)
	}

	function er(t) {
		return rr(function() {
			return t
		})()
	}

	function rr(t) {
		function n(t) {
			return t = s(t[0] * mh, t[1] * mh), [t[0] * v + u, a - t[1] * v]
		}

		function e(t, n) {
			return t = o(t, n), [t[0] * v + u, a - t[1] * v]
		}

		function r() {
			s = Bh(c = ce(x, b, w), o);
			var t = o(y, m);
			return u = g - t[0] * v, a = _ + t[1] * v, i()
		}

		function i() {
			return p = d = null, n
		}
		var o, u, a, c, s, f, l, h, p, d, v = 150,
			g = 480,
			_ = 250,
			y = 0,
			m = 0,
			x = 0,
			b = 0,
			w = 0,
			M = null,
			T = ap,
			N = null,
			k = xp,
			S = .5,
			E = Wp(e, S);
		return n.stream = function(t) {
				return p && d === t ? p : p = Zp(function(t) {
					return Ze({
						point: function(n, e) {
							var r = t(n, e);
							return this.stream.point(r[0], r[1])
						}
					})
				}(c)(T(E(k(d = t)))))
			}, n.preclip = function(t) {
				return arguments.length ? (T = t, M = void 0, i()) : T
			}, n.postclip = function(t) {
				return arguments.length ? (k = t, N = f = l = h = null, i()) : k
			}, n.clipAngle = function(t) {
				return arguments.length ? (T = +t ? cp(M = t * mh) : (M = null, ap), i()) : M * yh
			}, n.clipExtent = function(t) {
				return arguments.length ? (k = null == t ? (N = f = l = h = null, xp) : ye(N = +t[0][0], f = +t[0][1], l = +t[1][0], h = +t[1][1]), i()) : null == N ? null : [
					[N, f],
					[l, h]
				]
			}, n.scale = function(t) {
				return arguments.length ? (v = +t, r()) : v
			}, n.translate = function(t) {
				return arguments.length ? (g = +t[0], _ = +t[1], r()) : [g, _]
			}, n.center = function(t) {
				return arguments.length ? (y = t[0] % 360 * mh, m = t[1] % 360 * mh, r()) : [y * yh, m * yh]
			}, n.rotate = function(t) {
				return arguments.length ? (x = t[0] % 360 * mh, b = t[1] % 360 * mh, w = t.length > 2 ? t[2] % 360 * mh : 0, r()) : [x * yh, b * yh, w * yh]
			}, n.precision = function(t) {
				return arguments.length ? (E = Wp(e, S = t * t), i()) : Ch(S)
			}, n.fitExtent = function(t, e) {
				return Je(n, t, e)
			}, n.fitSize = function(t, e) {
				return Ke(n, t, e)
			}, n.fitWidth = function(t, e) {
				return tr(n, t, e)
			}, n.fitHeight = function(t, e) {
				return nr(n, t, e)
			},
			function() {
				return o = t.apply(this, arguments), n.invert = o.invert && function(t) {
					return (t = s.invert((t[0] - u) / v, (a - t[1]) / v)) && [t[0] * yh, t[1] * yh]
				}, r()
			}
	}

	function ir(t) {
		var n = 0,
			e = dh / 3,
			r = rr(t),
			i = r(n, e);
		return i.parallels = function(t) {
			return arguments.length ? r(n = t[0] * mh, e = t[1] * mh) : [n * yh, e * yh]
		}, i
	}

	function or(t, n) {
		function e(t, n) {
			var e = Ch(o - 2 * i * Eh(n)) / i;
			return [e * Eh(t *= i), u - e * Mh(t)]
		}
		var r = Eh(t),
			i = (r + Eh(n)) / 2;
		if (xh(i) < ph) return function(t) {
			function n(t, n) {
				return [t * e, Eh(n) / e]
			}
			var e = Mh(t);
			return n.invert = function(t, n) {
				return [t / e, Tn(n * e)]
			}, n
		}(t);
		var o = 1 + r * (2 * i - r),
			u = Ch(o) / i;
		return e.invert = function(t, n) {
			var e = u - n;
			return [wh(t, xh(e)) / i * Ah(e), Tn((o - (t * t + e * e) * i * i) / (2 * i))]
		}, e
	}

	function ur(t) {
		return function(n, e) {
			var r = Mh(n),
				i = Mh(e),
				o = t(r * i);
			return [o * i * Eh(n), o * Eh(e)]
		}
	}

	function ar(t) {
		return function(n, e) {
			var r = Ch(n * n + e * e),
				i = t(r),
				o = Eh(i),
				u = Mh(i);
			return [wh(n * o, r * u), Tn(r && e * o / r)]
		}
	}

	function cr(t, n) {
		return [t, kh(zh((vh + n) / 2))]
	}

	function sr(t) {
		function n() {
			var n = dh * a(),
				u = o(tp(o.rotate()).invert([0, 0]));
			return s(null == f ? [
				[u[0] - n, u[1] - n],
				[u[0] + n, u[1] + n]
			] : t === cr ? [
				[Math.max(u[0] - n, f), e],
				[Math.min(u[0] + n, r), i]
			] : [
				[f, Math.max(u[1] - n, e)],
				[r, Math.min(u[1] + n, i)]
			])
		}
		var e, r, i, o = er(t),
			u = o.center,
			a = o.scale,
			c = o.translate,
			s = o.clipExtent,
			f = null;
		return o.scale = function(t) {
			return arguments.length ? (a(t), n()) : a()
		}, o.translate = function(t) {
			return arguments.length ? (c(t), n()) : c()
		}, o.center = function(t) {
			return arguments.length ? (u(t), n()) : u()
		}, o.clipExtent = function(t) {
			return arguments.length ? (null == t ? f = e = r = i = null : (f = +t[0][0], e = +t[0][1], r = +t[1][0], i = +t[1][1]), n()) : null == f ? null : [
				[f, e],
				[r, i]
			]
		}, n()
	}

	function fr(t) {
		return zh((vh + t) / 2)
	}

	function lr(t, n) {
		function e(t, n) {
			o > 0 ? n < -vh + ph && (n = -vh + ph) : n > vh - ph && (n = vh - ph);
			var e = o / Sh(fr(n), i);
			return [e * Eh(i * t), o - e * Mh(i * t)]
		}
		var r = Mh(t),
			i = t === n ? Eh(t) : kh(r / Mh(n)) / kh(fr(n) / fr(t)),
			o = r * Sh(fr(t), i) / i;
		return i ? (e.invert = function(t, n) {
			var e = o - n,
				r = Ah(i) * Ch(t * t + e * e);
			return [wh(t, xh(e)) / i * Ah(e), 2 * bh(Sh(o / r, 1 / i)) - vh]
		}, e) : cr
	}

	function hr(t, n) {
		return [t, n]
	}

	function pr(t, n) {
		function e(t, n) {
			var e = o - n,
				r = i * t;
			return [e * Eh(r), o - e * Mh(r)]
		}
		var r = Mh(t),
			i = t === n ? Eh(t) : (r - Mh(n)) / (n - t),
			o = r / i + t;
		return xh(i) < ph ? hr : (e.invert = function(t, n) {
			var e = o - n;
			return [wh(t, xh(e)) / i * Ah(e), o - Ah(i) * Ch(t * t + e * e)]
		}, e)
	}

	function dr(t, n) {
		var e = Mh(n),
			r = Mh(t) * e;
		return [e * Eh(t) / r, Eh(n) / r]
	}

	function vr(t, n, e, r) {
		return 1 === t && 1 === n && 0 === e && 0 === r ? xp : Ze({
			point: function(i, o) {
				this.stream.point(i * t + e, o * n + r)
			}
		})
	}

	function gr(t, n) {
		var e = n * n,
			r = e * e;
		return [t * (.8707 - .131979 * e + r * (r * (.003971 * e - .001529 * r) - .013791)), n * (1.007226 + e * (.015085 + r * (.028874 * e - .044475 - .005916 * r)))]
	}

	function _r(t, n) {
		return [Mh(n) * Eh(t), Eh(n)]
	}

	function yr(t, n) {
		var e = Mh(n),
			r = 1 + Mh(t) * e;
		return [e * Eh(t) / r, Eh(n) / r]
	}

	function mr(t, n) {
		return [kh(zh((vh + n) / 2)), -t]
	}

	function xr(t, n) {
		return t.parent === n.parent ? 1 : 2
	}

	function br(t, n) {
		return t + n.x
	}

	function wr(t, n) {
		return Math.max(t, n.y)
	}

	function Mr(t) {
		var n = 0,
			e = t.children,
			r = e && e.length;
		if (r)
			for (; --r >= 0;) n += e[r].value;
		else n = 1;
		t.value = n
	}

	function Tr(t, n) {
		var e, r, i, o, u, a = new Er(t),
			c = +t.value && (a.value = t.value),
			s = [a];
		for (null == n && (n = Nr); e = s.pop();)
			if (c && (e.value = +e.data.value), (i = n(e.data)) && (u = i.length))
				for (e.children = new Array(u), o = u - 1; o >= 0; --o) s.push(r = e.children[o] = new Er(i[o])), r.parent = e, r.depth = e.depth + 1;
		return a.eachBefore(Sr)
	}

	function Nr(t) {
		return t.children
	}

	function kr(t) {
		t.data = t.data.data
	}

	function Sr(t) {
		var n = 0;
		do {
			t.height = n
		} while ((t = t.parent) && t.height < ++n)
	}

	function Er(t) {
		this.data = t, this.depth = this.height = 0, this.parent = null
	}

	function Ar(t, n) {
		var e = t.r - n.r,
			r = n.x - t.x,
			i = n.y - t.y;
		return e < 0 || e * e < r * r + i * i
	}

	function Cr(t, n) {
		var e = t.r - n.r + 1e-6,
			r = n.x - t.x,
			i = n.y - t.y;
		return e > 0 && e * e > r * r + i * i
	}

	function zr(t, n) {
		for (var e = 0; e < n.length; ++e)
			if (!Cr(t, n[e])) return !1;
		return !0
	}

	function Pr(t, n) {
		var e = t.x,
			r = t.y,
			i = t.r,
			o = n.x,
			u = n.y,
			a = n.r,
			c = o - e,
			s = u - r,
			f = a - i,
			l = Math.sqrt(c * c + s * s);
		return {
			x: (e + o + c / l * f) / 2,
			y: (r + u + s / l * f) / 2,
			r: (l + i + a) / 2
		}
	}

	function Rr(t, n, e) {
		var r = t.x,
			i = t.y,
			o = t.r,
			u = n.x,
			a = n.y,
			c = n.r,
			s = e.x,
			f = e.y,
			l = e.r,
			h = r - u,
			p = r - s,
			d = i - a,
			v = i - f,
			g = c - o,
			_ = l - o,
			y = r * r + i * i - o * o,
			m = y - u * u - a * a + c * c,
			x = y - s * s - f * f + l * l,
			b = p * d - h * v,
			w = (d * x - v * m) / (2 * b) - r,
			M = (v * g - d * _) / b,
			T = (p * m - h * x) / (2 * b) - i,
			N = (h * _ - p * g) / b,
			k = M * M + N * N - 1,
			S = 2 * (o + w * M + T * N),
			E = w * w + T * T - o * o,
			A = -(k ? (S + Math.sqrt(S * S - 4 * k * E)) / (2 * k) : E / S);
		return {
			x: r + w + M * A,
			y: i + T + N * A,
			r: A
		}
	}

	function Lr(t, n, e) {
		var r = t.x,
			i = t.y,
			o = n.r + e.r,
			u = t.r + e.r,
			a = n.x - r,
			c = n.y - i,
			s = a * a + c * c;
		if (s) {
			var f = .5 + ((u *= u) - (o *= o)) / (2 * s),
				l = Math.sqrt(Math.max(0, 2 * o * (u + s) - (u -= s) * u - o * o)) / (2 * s);
			e.x = r + f * a + l * c, e.y = i + f * c - l * a
		} else e.x = r + u, e.y = i
	}

	function qr(t, n) {
		var e = n.x - t.x,
			r = n.y - t.y,
			i = t.r + n.r;
		return i * i - 1e-6 > e * e + r * r
	}

	function Dr(t) {
		var n = t._,
			e = t.next._,
			r = n.r + e.r,
			i = (n.x * e.r + e.x * n.r) / r,
			o = (n.y * e.r + e.y * n.r) / r;
		return i * i + o * o
	}

	function Ur(t) {
		this._ = t, this.next = null, this.previous = null
	}

	function Or(t) {
		if (!(i = t.length)) return 0;
		var n, e, r, i, o, u, a, c, s, f, l;
		if (n = t[0], n.x = 0, n.y = 0, !(i > 1)) return n.r;
		if (e = t[1], n.x = -e.r, e.x = n.r, e.y = 0, !(i > 2)) return n.r + e.r;
		Lr(e, n, r = t[2]), n = new Ur(n), e = new Ur(e), r = new Ur(r), n.next = r.previous = e, e.next = n.previous = r, r.next = e.previous = n;
		t: for (a = 3; a < i; ++a) {
			Lr(n._, e._, r = t[a]), r = new Ur(r), c = e.next, s = n.previous, f = e._.r, l = n._.r;
			do {
				if (f <= l) {
					if (qr(c._, r._)) {
						e = c, n.next = e, e.previous = n, --a;
						continue t
					}
					f += c._.r, c = c.next
				} else {
					if (qr(s._, r._)) {
						(n = s).next = e, e.previous = n, --a;
						continue t
					}
					l += s._.r, s = s.previous
				}
			} while (c !== s.next);
			for (r.previous = n, r.next = e, n.next = e.previous = e = r, o = Dr(n);
				(r = r.next) !== e;)(u = Dr(r)) < o && (n = r, o = u);
			e = n.next
		}
		for (n = [e._], r = e;
			(r = r.next) !== e;) n.push(r._);
		for (r = nd(n), a = 0; a < i; ++a) n = t[a], n.x -= r.x, n.y -= r.y;
		return r.r
	}

	function Fr(t) {
		if ("function" != typeof t) throw new Error;
		return t
	}

	function Ir() {
		return 0
	}

	function Yr(t) {
		return Math.sqrt(t.value)
	}

	function Br(t) {
		return function(n) {
			n.children || (n.r = Math.max(0, +t(n) || 0))
		}
	}

	function Hr(t, n) {
		return function(e) {
			if (r = e.children) {
				var r, i, o, u = r.length,
					a = t(e) * n || 0;
				if (a)
					for (i = 0; i < u; ++i) r[i].r += a;
				if (o = Or(r), a)
					for (i = 0; i < u; ++i) r[i].r -= a;
				e.r = o + a
			}
		}
	}

	function jr(t) {
		return function(n) {
			var e = n.parent;
			n.r *= t, e && (n.x = e.x + t * n.x, n.y = e.y + t * n.y)
		}
	}

	function Xr(t) {
		return t.id
	}

	function Vr(t) {
		return t.parentId
	}

	function $r(t, n) {
		return t.parent === n.parent ? 1 : 2
	}

	function Wr(t) {
		var n = t.children;
		return n ? n[0] : t.t
	}

	function Zr(t) {
		var n = t.children;
		return n ? n[n.length - 1] : t.t
	}

	function Gr(t, n, e) {
		var r = e / (n.i - t.i);
		n.c -= r, n.s += e, t.c += r, n.z += e, n.m += e
	}

	function Qr(t, n, e) {
		return t.a.parent === n.parent ? t.a : e
	}

	function Jr(t, n) {
		this._ = t, this.parent = null, this.children = null, this.A = null, this.a = this, this.z = 0, this.m = 0, this.c = 0, this.s = 0, this.t = null, this.i = n
	}

	function Kr(t, n, e, r, i, o) {
		for (var u, a, c, s, f, l, h, p, d, v, g, _ = [], y = n.children, m = 0, x = 0, b = y.length, w = n.value; m < b;) {
			c = i - e, s = o - r;
			do {
				f = y[x++].value
			} while (!f && x < b);
			for (l = h = f, g = f * f * (v = Math.max(s / c, c / s) / (w * t)), d = Math.max(h / g, g / l); x < b; ++x) {
				if (f += a = y[x].value, a < l && (l = a), a > h && (h = a), g = f * f * v, (p = Math.max(h / g, g / l)) > d) {
					f -= a;
					break
				}
				d = p
			}
			_.push(u = {
				value: f,
				dice: c < s,
				children: y.slice(m, x)
			}), u.dice ? id(u, e, r, i, w ? r += s * f / w : o) : cd(u, e, r, w ? e += c * f / w : i, o), w -= f, m = x
		}
		return _
	}

	function ti(t, n) {
		return t[0] - n[0] || t[1] - n[1]
	}

	function ni(t) {
		for (var n = t.length, e = [0, 1], r = 2, i = 2; i < n; ++i) {
			for (; r > 1 && hd(t[e[r - 2]], t[e[r - 1]], t[i]) <= 0;) --r;
			e[r++] = i
		}
		return e.slice(0, r)
	}

	function ei(t) {
		this._size = t, this._call = this._error = null, this._tasks = [], this._data = [], this._waiting = this._active = this._ended = this._start = 0
	}

	function ri(t) {
		if (!t._start) try {
			(function(t) {
				for (; t._start = t._waiting && t._active < t._size;) {
					var n = t._ended + t._active,
						e = t._tasks[n],
						r = e.length - 1,
						i = e[r];
					e[r] = function(t, n) {
						return function(e, r) {
							t._tasks[n] && (--t._active, ++t._ended, t._tasks[n] = null, null == t._error && (null != e ? ii(t, e) : (t._data[n] = r, t._waiting ? ri(t) : oi(t))))
						}
					}(t, n), --t._waiting, ++t._active, e = i.apply(null, e), t._tasks[n] && (t._tasks[n] = e || dd)
				}
			})(t)
		} catch (n) {
			if (t._tasks[t._ended + t._active - 1]) ii(t, n);
			else if (!t._data) throw n
		}
	}

	function ii(t, n) {
		var e, r = t._tasks.length;
		for (t._error = n, t._data = void 0, t._waiting = NaN; --r >= 0;)
			if ((e = t._tasks[r]) && (t._tasks[r] = null, e.abort)) try {
				e.abort()
			} catch (n) {}
		t._active = NaN, oi(t)
	}

	function oi(t) {
		if (!t._active && t._call) {
			var n = t._data;
			t._data = void 0, t._call(t._error, n)
		}
	}

	function ui(t) {
		if (null == t) t = 1 / 0;
		else if (!((t = +t) >= 1)) throw new Error("invalid concurrency");
		return new ei(t)
	}

	function ai(t) {
		function n(n) {
			var o = n + "",
				u = e.get(o);
			if (!u) {
				if (i !== Ld) return i;
				e.set(o, u = r.push(n))
			}
			return t[(u - 1) % t.length]
		}
		var e = Kt(),
			r = [],
			i = Ld;
		return t = null == t ? [] : Rd.call(t), n.domain = function(t) {
			if (!arguments.length) return r.slice();
			r = [], e = Kt();
			for (var i, o, u = -1, a = t.length; ++u < a;) e.has(o = (i = t[u]) + "") || e.set(o, r.push(i));
			return n
		}, n.range = function(e) {
			return arguments.length ? (t = Rd.call(e), n) : t.slice()
		}, n.unknown = function(t) {
			return arguments.length ? (i = t, n) : i
		}, n.copy = function() {
			return ai().domain(r).range(t).unknown(i)
		}, n
	}

	function ci() {
		function t() {
			var t = i().length,
				r = u[1] < u[0],
				l = u[r - 0],
				h = u[1 - r];
			n = (h - l) / Math.max(1, t - c + 2 * s), a && (n = Math.floor(n)), l += (h - l - n * (t - c)) * f, e = n * (1 - c), a && (l = Math.round(l), e = Math.round(e));
			var p = Pa(t).map(function(t) {
				return l + n * t
			});
			return o(r ? p.reverse() : p)
		}
		var n, e, r = ai().unknown(void 0),
			i = r.domain,
			o = r.range,
			u = [0, 1],
			a = !1,
			c = 0,
			s = 0,
			f = .5;
		return delete r.unknown, r.domain = function(n) {
			return arguments.length ? (i(n), t()) : i()
		}, r.range = function(n) {
			return arguments.length ? (u = [+n[0], +n[1]], t()) : u.slice()
		}, r.rangeRound = function(n) {
			return u = [+n[0], +n[1]], a = !0, t()
		}, r.bandwidth = function() {
			return e
		}, r.step = function() {
			return n
		}, r.round = function(n) {
			return arguments.length ? (a = !!n, t()) : a
		}, r.padding = function(n) {
			return arguments.length ? (c = s = Math.max(0, Math.min(1, n)), t()) : c
		}, r.paddingInner = function(n) {
			return arguments.length ? (c = Math.max(0, Math.min(1, n)), t()) : c
		}, r.paddingOuter = function(n) {
			return arguments.length ? (s = Math.max(0, Math.min(1, n)), t()) : s
		}, r.align = function(n) {
			return arguments.length ? (f = Math.max(0, Math.min(1, n)), t()) : f
		}, r.copy = function() {
			return ci().domain(i()).range(u).round(a).paddingInner(c).paddingOuter(s).align(f)
		}, t()
	}

	function si(t) {
		var n = t.copy;
		return t.padding = t.paddingOuter, delete t.paddingInner, delete t.paddingOuter, t.copy = function() {
			return si(n())
		}, t
	}

	function fi(t, n) {
		return (n -= t = +t) ? function(e) {
			return (e - t) / n
		} : qd(n)
	}

	function li(t, n) {
		return n.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp())
	}

	function hi(t, n) {
		function e() {
			return i = Math.min(a.length, c.length) > 2 ? function(t, n, e, r) {
				var i = Math.min(t.length, n.length) - 1,
					o = new Array(i),
					u = new Array(i),
					a = -1;
				for (t[i] < t[0] && (t = t.slice().reverse(), n = n.slice().reverse()); ++a < i;) o[a] = e(t[a], t[a + 1]), u[a] = r(n[a], n[a + 1]);
				return function(n) {
					var e = ba(t, n, 1, i) - 1;
					return u[e](o[e](n))
				}
			} : function(t, n, e, r) {
				var i = t[0],
					o = t[1],
					u = n[0],
					a = n[1];
				return o < i ? (i = e(o, i), u = r(a, u)) : (i = e(i, o), u = r(u, a)),
					function(t) {
						return u(i(t))
					}
			}, o = u = null, r
		}

		function r(n) {
			return (o || (o = i(a, c, f ? function(t) {
				return function(n, e) {
					var r = t(n = +n, e = +e);
					return function(t) {
						return t <= n ? 0 : t >= e ? 1 : r(t)
					}
				}
			}(t) : t, s)))(+n)
		}
		var i, o, u, a = Ud,
			c = Ud,
			s = vs,
			f = !1;
		return r.invert = function(t) {
			return (u || (u = i(c, a, fi, f ? function(t) {
				return function(n, e) {
					var r = t(n = +n, e = +e);
					return function(t) {
						return t <= 0 ? n : t >= 1 ? e : r(t)
					}
				}
			}(n) : n)))(+t)
		}, r.domain = function(t) {
			return arguments.length ? (a = Pd.call(t, Dd), e()) : a.slice()
		}, r.range = function(t) {
			return arguments.length ? (c = Rd.call(t), e()) : c.slice()
		}, r.rangeRound = function(t) {
			return c = Rd.call(t), s = gs, e()
		}, r.clamp = function(t) {
			return arguments.length ? (f = !!t, e()) : f
		}, r.interpolate = function(t) {
			return arguments.length ? (s = t, e()) : s
		}, e()
	}

	function pi(t) {
		var n = t.domain;
		return t.ticks = function(t) {
			var e = n();
			return Da(e[0], e[e.length - 1], null == t ? 10 : t)
		}, t.tickFormat = function(t, e) {
			return Od(n(), t, e)
		}, t.nice = function(r) {
			null == r && (r = 10);
			var i, o = n(),
				u = 0,
				a = o.length - 1,
				c = o[u],
				s = o[a];
			return s < c && (i = c, c = s, s = i, i = u, u = a, a = i), (i = e(c, s, r)) > 0 ? i = e(c = Math.floor(c / i) * i, s = Math.ceil(s / i) * i, r) : i < 0 && (i = e(c = Math.ceil(c * i) / i, s = Math.floor(s * i) / i, r)), i > 0 ? (o[u] = Math.floor(c / i) * i, o[a] = Math.ceil(s / i) * i, n(o)) : i < 0 && (o[u] = Math.ceil(c * i) / i, o[a] = Math.floor(s * i) / i, n(o)), t
		}, t
	}

	function di() {
		var t = hi(fi, fs);
		return t.copy = function() {
			return li(t, di())
		}, pi(t)
	}

	function vi() {
		function t(t) {
			return +t
		}
		var n = [0, 1];
		return t.invert = t, t.domain = t.range = function(e) {
			return arguments.length ? (n = Pd.call(e, Dd), t) : n.slice()
		}, t.copy = function() {
			return vi().domain(n)
		}, pi(t)
	}

	function gi(t, n) {
		return (n = Math.log(n / t)) ? function(e) {
			return Math.log(e / t) / n
		} : qd(n)
	}

	function _i(t, n) {
		return t < 0 ? function(e) {
			return -Math.pow(-n, e) * Math.pow(-t, 1 - e)
		} : function(e) {
			return Math.pow(n, e) * Math.pow(t, 1 - e)
		}
	}

	function yi(t) {
		return 10 === t ? function(t) {
			return isFinite(t) ? +("1e" + t) : t < 0 ? 0 : t
		} : t === Math.E ? Math.exp : function(n) {
			return Math.pow(t, n)
		}
	}

	function mi(t) {
		return t === Math.E ? Math.log : 10 === t && Math.log10 || 2 === t && Math.log2 || (t = Math.log(t), function(n) {
			return Math.log(n) / t
		})
	}

	function xi(t) {
		return function(n) {
			return -t(-n)
		}
	}

	function bi() {
		function n() {
			return o = mi(i), u = yi(i), r()[0] < 0 && (o = xi(o), u = xi(u)), e
		}
		var e = hi(gi, _i).domain([1, 10]),
			r = e.domain,
			i = 10,
			o = mi(10),
			u = yi(10);
		return e.base = function(t) {
			return arguments.length ? (i = +t, n()) : i
		}, e.domain = function(t) {
			return arguments.length ? (r(t), n()) : r()
		}, e.ticks = function(t) {
			var n, e = r(),
				a = e[0],
				c = e[e.length - 1];
			(n = c < a) && (h = a, a = c, c = h);
			var s, f, l, h = o(a),
				p = o(c),
				d = null == t ? 10 : +t,
				v = [];
			if (!(i % 1) && p - h < d) {
				if (h = Math.round(h) - 1, p = Math.round(p) + 1, a > 0) {
					for (; h < p; ++h)
						for (f = 1, s = u(h); f < i; ++f)
							if (!((l = s * f) < a)) {
								if (l > c) break;
								v.push(l)
							}
				} else
					for (; h < p; ++h)
						for (f = i - 1, s = u(h); f >= 1; --f)
							if (!((l = s * f) < a)) {
								if (l > c) break;
								v.push(l)
							}
			} else v = Da(h, p, Math.min(p - h, d)).map(u);
			return n ? v.reverse() : v
		}, e.tickFormat = function(n, r) {
			if (null == r && (r = 10 === i ? ".0e" : ","), "function" != typeof r && (r = t.format(r)), n === 1 / 0) return r;
			null == n && (n = 10);
			var a = Math.max(1, i * n / e.ticks().length);
			return function(t) {
				var n = t / u(Math.round(o(t)));
				return n * i < i - .5 && (n *= i), n <= a ? r(t) : ""
			}
		}, e.nice = function() {
			return r(Fd(r(), {
				floor: function(t) {
					return u(Math.floor(o(t)))
				},
				ceil: function(t) {
					return u(Math.ceil(o(t)))
				}
			}))
		}, e.copy = function() {
			return li(e, bi().base(i))
		}, e
	}

	function wi(t, n) {
		return t < 0 ? -Math.pow(-t, n) : Math.pow(t, n)
	}

	function Mi() {
		var t = 1,
			n = hi(function(n, e) {
				return (e = wi(e, t) - (n = wi(n, t))) ? function(r) {
					return (wi(r, t) - n) / e
				} : qd(e)
			}, function(n, e) {
				return e = wi(e, t) - (n = wi(n, t)),
					function(r) {
						return wi(n + e * r, 1 / t)
					}
			}),
			e = n.domain;
		return n.exponent = function(n) {
			return arguments.length ? (t = +n, e(e())) : t
		}, n.copy = function() {
			return li(n, Mi().exponent(t))
		}, pi(n)
	}

	function Ti() {
		function t() {
			var t = 0,
				o = Math.max(1, r.length);
			for (i = new Array(o - 1); ++t < o;) i[t - 1] = Oa(e, t / o);
			return n
		}

		function n(t) {
			if (!isNaN(t = +t)) return r[ba(i, t)]
		}
		var e = [],
			r = [],
			i = [];
		return n.invertExtent = function(t) {
			var n = r.indexOf(t);
			return n < 0 ? [NaN, NaN] : [n > 0 ? i[n - 1] : e[0], n < i.length ? i[n] : e[e.length - 1]]
		}, n.domain = function(n) {
			if (!arguments.length) return e.slice();
			e = [];
			for (var r, i = 0, o = n.length; i < o; ++i) null == (r = n[i]) || isNaN(r = +r) || e.push(r);
			return e.sort(ya), t()
		}, n.range = function(n) {
			return arguments.length ? (r = Rd.call(n), t()) : r.slice()
		}, n.quantiles = function() {
			return i.slice()
		}, n.copy = function() {
			return Ti().domain(e).range(r)
		}, n
	}

	function Ni() {
		function t(t) {
			if (t <= t) return u[ba(o, t, 0, i)]
		}

		function n() {
			var n = -1;
			for (o = new Array(i); ++n < i;) o[n] = ((n + 1) * r - (n - i) * e) / (i + 1);
			return t
		}
		var e = 0,
			r = 1,
			i = 1,
			o = [.5],
			u = [0, 1];
		return t.domain = function(t) {
			return arguments.length ? (e = +t[0], r = +t[1], n()) : [e, r]
		}, t.range = function(t) {
			return arguments.length ? (i = (u = Rd.call(t)).length - 1, n()) : u.slice()
		}, t.invertExtent = function(t) {
			var n = u.indexOf(t);
			return n < 0 ? [NaN, NaN] : n < 1 ? [e, o[0]] : n >= i ? [o[i - 1], r] : [o[n - 1], o[n]]
		}, t.copy = function() {
			return Ni().domain([e, r]).range(u)
		}, pi(t)
	}

	function ki() {
		function t(t) {
			if (t <= t) return e[ba(n, t, 0, r)]
		}
		var n = [.5],
			e = [0, 1],
			r = 1;
		return t.domain = function(i) {
			return arguments.length ? (n = Rd.call(i), r = Math.min(n.length, e.length - 1), t) : n.slice()
		}, t.range = function(i) {
			return arguments.length ? (e = Rd.call(i), r = Math.min(n.length, e.length - 1), t) : e.slice()
		}, t.invertExtent = function(t) {
			var r = e.indexOf(t);
			return [n[r - 1], n[r]]
		}, t.copy = function() {
			return ki().domain(n).range(e)
		}, t
	}

	function Si(t, n, e, r) {
		function i(n) {
			return t(n = new Date(+n)), n
		}
		return i.floor = i, i.ceil = function(e) {
			return t(e = new Date(e - 1)), n(e, 1), t(e), e
		}, i.round = function(t) {
			var n = i(t),
				e = i.ceil(t);
			return t - n < e - t ? n : e
		}, i.offset = function(t, e) {
			return n(t = new Date(+t), null == e ? 1 : Math.floor(e)), t
		}, i.range = function(e, r, o) {
			var u, a = [];
			if (e = i.ceil(e), o = null == o ? 1 : Math.floor(o), !(e < r && o > 0)) return a;
			do {
				a.push(u = new Date(+e)), n(e, o), t(e)
			} while (u < e && e < r);
			return a
		}, i.filter = function(e) {
			return Si(function(n) {
				if (n >= n)
					for (; t(n), !e(n);) n.setTime(n - 1)
			}, function(t, r) {
				if (t >= t)
					if (r < 0)
						for (; ++r <= 0;)
							for (; n(t, -1), !e(t););
					else
						for (; --r >= 0;)
							for (; n(t, 1), !e(t););
			})
		}, e && (i.count = function(n, r) {
			return Id.setTime(+n), Yd.setTime(+r), t(Id), t(Yd), Math.floor(e(Id, Yd))
		}, i.every = function(t) {
			return t = Math.floor(t), isFinite(t) && t > 0 ? t > 1 ? i.filter(r ? function(n) {
				return r(n) % t == 0
			} : function(n) {
				return i.count(0, n) % t == 0
			}) : i : null
		}), i
	}

	function Ei(t) {
		return Si(function(n) {
			n.setDate(n.getDate() - (n.getDay() + 7 - t) % 7), n.setHours(0, 0, 0, 0)
		}, function(t, n) {
			t.setDate(t.getDate() + 7 * n)
		}, function(t, n) {
			return (n - t - (n.getTimezoneOffset() - t.getTimezoneOffset()) * jd) / Xd
		})
	}

	function Ai(t) {
		return Si(function(n) {
			n.setUTCDate(n.getUTCDate() - (n.getUTCDay() + 7 - t) % 7), n.setUTCHours(0, 0, 0, 0)
		}, function(t, n) {
			t.setUTCDate(t.getUTCDate() + 7 * n)
		}, function(t, n) {
			return (n - t) / Xd
		})
	}

	function Ci(t) {
		if (0 <= t.y && t.y < 100) {
			var n = new Date(-1, t.m, t.d, t.H, t.M, t.S, t.L);
			return n.setFullYear(t.y), n
		}
		return new Date(t.y, t.m, t.d, t.H, t.M, t.S, t.L)
	}

	function zi(t) {
		if (0 <= t.y && t.y < 100) {
			var n = new Date(Date.UTC(-1, t.m, t.d, t.H, t.M, t.S, t.L));
			return n.setUTCFullYear(t.y), n
		}
		return new Date(Date.UTC(t.y, t.m, t.d, t.H, t.M, t.S, t.L))
	}

	function Pi(t) {
		return {
			y: t,
			m: 0,
			d: 1,
			H: 0,
			M: 0,
			S: 0,
			L: 0
		}
	}

	function Ri(t) {
		function n(t, n) {
			return function(e) {
				var r, i, o, u = [],
					a = -1,
					c = 0,
					s = t.length;
				for (e instanceof Date || (e = new Date(+e)); ++a < s;) 37 === t.charCodeAt(a) && (u.push(t.slice(c, a)), null != (i = Hv[r = t.charAt(++a)]) ? r = t.charAt(++a) : i = "e" === r ? " " : "0", (o = n[r]) && (r = o(e, i)), u.push(r), c = a + 1);
				return u.push(t.slice(c, a)), u.join("")
			}
		}

		function e(t, n) {
			return function(e) {
				var i, o, u = Pi(1900);
				if (r(u, t, e += "", 0) != e.length) return null;
				if ("Q" in u) return new Date(u.Q);
				if ("p" in u && (u.H = u.H % 12 + 12 * u.p), "V" in u) {
					if (u.V < 1 || u.V > 53) return null;
					"w" in u || (u.w = 1), "Z" in u ? (i = (o = (i = zi(Pi(u.y))).getUTCDay()) > 4 || 0 === o ? Nv.ceil(i) : Nv(i), i = wv.offset(i, 7 * (u.V - 1)), u.y = i.getUTCFullYear(), u.m = i.getUTCMonth(), u.d = i.getUTCDate() + (u.w + 6) % 7) : (i = (o = (i = n(Pi(u.y))).getDay()) > 4 || 0 === o ? nv.ceil(i) : nv(i), i = Jd.offset(i, 7 * (u.V - 1)), u.y = i.getFullYear(), u.m = i.getMonth(), u.d = i.getDate() + (u.w + 6) % 7)
				} else("W" in u || "U" in u) && ("w" in u || (u.w = "u" in u ? u.u % 7 : "W" in u ? 1 : 0), o = "Z" in u ? zi(Pi(u.y)).getUTCDay() : n(Pi(u.y)).getDay(), u.m = 0, u.d = "W" in u ? (u.w + 6) % 7 + 7 * u.W - (o + 5) % 7 : u.w + 7 * u.U - (o + 6) % 7);
				return "Z" in u ? (u.H += u.Z / 100 | 0, u.M += u.Z % 100, zi(u)) : n(u)
			}
		}

		function r(t, n, e, r) {
			for (var i, o, u = 0, a = n.length, c = e.length; u < a;) {
				if (r >= c) return -1;
				if (37 === (i = n.charCodeAt(u++))) {
					if (i = n.charAt(u++), !(o = T[i in Hv ? n.charAt(u++) : i]) || (r = o(t, e, r)) < 0) return -1
				} else if (i != e.charCodeAt(r++)) return -1
			}
			return r
		}
		var i = t.dateTime,
			o = t.date,
			u = t.time,
			a = t.periods,
			c = t.days,
			s = t.shortDays,
			f = t.months,
			l = t.shortMonths,
			h = Di(a),
			p = Ui(a),
			d = Di(c),
			v = Ui(c),
			g = Di(s),
			_ = Ui(s),
			y = Di(f),
			m = Ui(f),
			x = Di(l),
			b = Ui(l),
			w = {
				a: function(t) {
					return s[t.getDay()]
				},
				A: function(t) {
					return c[t.getDay()]
				},
				b: function(t) {
					return l[t.getMonth()]
				},
				B: function(t) {
					return f[t.getMonth()]
				},
				c: null,
				d: ro,
				e: ro,
				f: co,
				H: io,
				I: oo,
				j: uo,
				L: ao,
				m: so,
				M: fo,
				p: function(t) {
					return a[+(t.getHours() >= 12)]
				},
				Q: Fo,
				s: Io,
				S: lo,
				u: ho,
				U: po,
				V: vo,
				w: go,
				W: _o,
				x: null,
				X: null,
				y: yo,
				Y: mo,
				Z: xo,
				"%": Oo
			},
			M = {
				a: function(t) {
					return s[t.getUTCDay()]
				},
				A: function(t) {
					return c[t.getUTCDay()]
				},
				b: function(t) {
					return l[t.getUTCMonth()]
				},
				B: function(t) {
					return f[t.getUTCMonth()]
				},
				c: null,
				d: bo,
				e: bo,
				f: ko,
				H: wo,
				I: Mo,
				j: To,
				L: No,
				m: So,
				M: Eo,
				p: function(t) {
					return a[+(t.getUTCHours() >= 12)]
				},
				Q: Fo,
				s: Io,
				S: Ao,
				u: Co,
				U: zo,
				V: Po,
				w: Ro,
				W: Lo,
				x: null,
				X: null,
				y: qo,
				Y: Do,
				Z: Uo,
				"%": Oo
			},
			T = {
				a: function(t, n, e) {
					var r = g.exec(n.slice(e));
					return r ? (t.w = _[r[0].toLowerCase()], e + r[0].length) : -1
				},
				A: function(t, n, e) {
					var r = d.exec(n.slice(e));
					return r ? (t.w = v[r[0].toLowerCase()], e + r[0].length) : -1
				},
				b: function(t, n, e) {
					var r = x.exec(n.slice(e));
					return r ? (t.m = b[r[0].toLowerCase()], e + r[0].length) : -1
				},
				B: function(t, n, e) {
					var r = y.exec(n.slice(e));
					return r ? (t.m = m[r[0].toLowerCase()], e + r[0].length) : -1
				},
				c: function(t, n, e) {
					return r(t, i, n, e)
				},
				d: $i,
				e: $i,
				f: Ki,
				H: Zi,
				I: Zi,
				j: Wi,
				L: Ji,
				m: Vi,
				M: Gi,
				p: function(t, n, e) {
					var r = h.exec(n.slice(e));
					return r ? (t.p = p[r[0].toLowerCase()], e + r[0].length) : -1
				},
				Q: no,
				s: eo,
				S: Qi,
				u: Fi,
				U: Ii,
				V: Yi,
				w: Oi,
				W: Bi,
				x: function(t, n, e) {
					return r(t, o, n, e)
				},
				X: function(t, n, e) {
					return r(t, u, n, e)
				},
				y: ji,
				Y: Hi,
				Z: Xi,
				"%": to
			};
		return w.x = n(o, w), w.X = n(u, w), w.c = n(i, w), M.x = n(o, M), M.X = n(u, M), M.c = n(i, M), {
			format: function(t) {
				var e = n(t += "", w);
				return e.toString = function() {
					return t
				}, e
			},
			parse: function(t) {
				var n = e(t += "", Ci);
				return n.toString = function() {
					return t
				}, n
			},
			utcFormat: function(t) {
				var e = n(t += "", M);
				return e.toString = function() {
					return t
				}, e
			},
			utcParse: function(t) {
				var n = e(t, zi);
				return n.toString = function() {
					return t
				}, n
			}
		}
	}

	function Li(t, n, e) {
		var r = t < 0 ? "-" : "",
			i = (r ? -t : t) + "",
			o = i.length;
		return r + (o < e ? new Array(e - o + 1).join(n) + i : i)
	}

	function qi(t) {
		return t.replace(Vv, "\\$&")
	}

	function Di(t) {
		return new RegExp("^(?:" + t.map(qi).join("|") + ")", "i")
	}

	function Ui(t) {
		for (var n = {}, e = -1, r = t.length; ++e < r;) n[t[e].toLowerCase()] = e;
		return n
	}

	function Oi(t, n, e) {
		var r = jv.exec(n.slice(e, e + 1));
		return r ? (t.w = +r[0], e + r[0].length) : -1
	}

	function Fi(t, n, e) {
		var r = jv.exec(n.slice(e, e + 1));
		return r ? (t.u = +r[0], e + r[0].length) : -1
	}

	function Ii(t, n, e) {
		var r = jv.exec(n.slice(e, e + 2));
		return r ? (t.U = +r[0], e + r[0].length) : -1
	}

	function Yi(t, n, e) {
		var r = jv.exec(n.slice(e, e + 2));
		return r ? (t.V = +r[0], e + r[0].length) : -1
	}

	function Bi(t, n, e) {
		var r = jv.exec(n.slice(e, e + 2));
		return r ? (t.W = +r[0], e + r[0].length) : -1
	}

	function Hi(t, n, e) {
		var r = jv.exec(n.slice(e, e + 4));
		return r ? (t.y = +r[0], e + r[0].length) : -1
	}

	function ji(t, n, e) {
		var r = jv.exec(n.slice(e, e + 2));
		return r ? (t.y = +r[0] + (+r[0] > 68 ? 1900 : 2e3), e + r[0].length) : -1
	}

	function Xi(t, n, e) {
		var r = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(n.slice(e, e + 6));
		return r ? (t.Z = r[1] ? 0 : -(r[2] + (r[3] || "00")), e + r[0].length) : -1
	}

	function Vi(t, n, e) {
		var r = jv.exec(n.slice(e, e + 2));
		return r ? (t.m = r[0] - 1, e + r[0].length) : -1
	}

	function $i(t, n, e) {
		var r = jv.exec(n.slice(e, e + 2));
		return r ? (t.d = +r[0], e + r[0].length) : -1
	}

	function Wi(t, n, e) {
		var r = jv.exec(n.slice(e, e + 3));
		return r ? (t.m = 0, t.d = +r[0], e + r[0].length) : -1
	}

	function Zi(t, n, e) {
		var r = jv.exec(n.slice(e, e + 2));
		return r ? (t.H = +r[0], e + r[0].length) : -1
	}

	function Gi(t, n, e) {
		var r = jv.exec(n.slice(e, e + 2));
		return r ? (t.M = +r[0], e + r[0].length) : -1
	}

	function Qi(t, n, e) {
		var r = jv.exec(n.slice(e, e + 2));
		return r ? (t.S = +r[0], e + r[0].length) : -1
	}

	function Ji(t, n, e) {
		var r = jv.exec(n.slice(e, e + 3));
		return r ? (t.L = +r[0], e + r[0].length) : -1
	}

	function Ki(t, n, e) {
		var r = jv.exec(n.slice(e, e + 6));
		return r ? (t.L = Math.floor(r[0] / 1e3), e + r[0].length) : -1
	}

	function to(t, n, e) {
		var r = Xv.exec(n.slice(e, e + 1));
		return r ? e + r[0].length : -1
	}

	function no(t, n, e) {
		var r = jv.exec(n.slice(e));
		return r ? (t.Q = +r[0], e + r[0].length) : -1
	}

	function eo(t, n, e) {
		var r = jv.exec(n.slice(e));
		return r ? (t.Q = 1e3 * +r[0], e + r[0].length) : -1
	}

	function ro(t, n) {
		return Li(t.getDate(), n, 2)
	}

	function io(t, n) {
		return Li(t.getHours(), n, 2)
	}

	function oo(t, n) {
		return Li(t.getHours() % 12 || 12, n, 2)
	}

	function uo(t, n) {
		return Li(1 + Jd.count(gv(t), t), n, 3)
	}

	function ao(t, n) {
		return Li(t.getMilliseconds(), n, 3)
	}

	function co(t, n) {
		return ao(t, n) + "000"
	}

	function so(t, n) {
		return Li(t.getMonth() + 1, n, 2)
	}

	function fo(t, n) {
		return Li(t.getMinutes(), n, 2)
	}

	function lo(t, n) {
		return Li(t.getSeconds(), n, 2)
	}

	function ho(t) {
		var n = t.getDay();
		return 0 === n ? 7 : n
	}

	function po(t, n) {
		return Li(tv.count(gv(t), t), n, 2)
	}

	function vo(t, n) {
		var e = t.getDay();
		return t = e >= 4 || 0 === e ? iv(t) : iv.ceil(t), Li(iv.count(gv(t), t) + (4 === gv(t).getDay()), n, 2)
	}

	function go(t) {
		return t.getDay()
	}

	function _o(t, n) {
		return Li(nv.count(gv(t), t), n, 2)
	}

	function yo(t, n) {
		return Li(t.getFullYear() % 100, n, 2)
	}

	function mo(t, n) {
		return Li(t.getFullYear() % 1e4, n, 4)
	}

	function xo(t) {
		var n = t.getTimezoneOffset();
		return (n > 0 ? "-" : (n *= -1, "+")) + Li(n / 60 | 0, "0", 2) + Li(n % 60, "0", 2)
	}

	function bo(t, n) {
		return Li(t.getUTCDate(), n, 2)
	}

	function wo(t, n) {
		return Li(t.getUTCHours(), n, 2)
	}

	function Mo(t, n) {
		return Li(t.getUTCHours() % 12 || 12, n, 2)
	}

	function To(t, n) {
		return Li(1 + wv.count(Iv(t), t), n, 3)
	}

	function No(t, n) {
		return Li(t.getUTCMilliseconds(), n, 3)
	}

	function ko(t, n) {
		return No(t, n) + "000"
	}

	function So(t, n) {
		return Li(t.getUTCMonth() + 1, n, 2)
	}

	function Eo(t, n) {
		return Li(t.getUTCMinutes(), n, 2)
	}

	function Ao(t, n) {
		return Li(t.getUTCSeconds(), n, 2)
	}

	function Co(t) {
		var n = t.getUTCDay();
		return 0 === n ? 7 : n
	}

	function zo(t, n) {
		return Li(Tv.count(Iv(t), t), n, 2)
	}

	function Po(t, n) {
		var e = t.getUTCDay();
		return t = e >= 4 || 0 === e ? Ev(t) : Ev.ceil(t), Li(Ev.count(Iv(t), t) + (4 === Iv(t).getUTCDay()), n, 2)
	}

	function Ro(t) {
		return t.getUTCDay()
	}

	function Lo(t, n) {
		return Li(Nv.count(Iv(t), t), n, 2)
	}

	function qo(t, n) {
		return Li(t.getUTCFullYear() % 100, n, 2)
	}

	function Do(t, n) {
		return Li(t.getUTCFullYear() % 1e4, n, 4)
	}

	function Uo() {
		return "+0000"
	}

	function Oo() {
		return "%"
	}

	function Fo(t) {
		return +t
	}

	function Io(t) {
		return Math.floor(+t / 1e3)
	}

	function Yo(n) {
		return Yv = Ri(n), t.timeFormat = Yv.format, t.timeParse = Yv.parse, t.utcFormat = Yv.utcFormat, t.utcParse = Yv.utcParse, Yv
	}

	function Bo(t) {
		return new Date(t)
	}

	function Ho(t) {
		return t instanceof Date ? +t : +new Date(+t)
	}

	function jo(t, n, e, i, o, u, a, c, s) {
		function f(n, e, i, o) {
			if (null == n && (n = 10), "number" == typeof n) {
				var u = Math.abs(i - e) / n,
					a = ma(function(t) {
						return t[2]
					}).right(w, u);
				a === w.length ? (o = r(e / ng, i / ng, n), n = t) : a ? (o = (a = w[u / w[a - 1][2] < w[a][2] / u ? a - 1 : a])[1], n = a[0]) : (o = Math.max(r(e, i, n), 1), n = c)
			}
			return null == o ? n : n.every(o)
		}
		var l = hi(fi, fs),
			h = l.invert,
			p = l.domain,
			d = s(".%L"),
			v = s(":%S"),
			g = s("%I:%M"),
			_ = s("%I %p"),
			y = s("%a %d"),
			m = s("%b %d"),
			x = s("%B"),
			b = s("%Y"),
			w = [
				[a, 1, Zv],
				[a, 5, 5 * Zv],
				[a, 15, 15 * Zv],
				[a, 30, 30 * Zv],
				[u, 1, Gv],
				[u, 5, 5 * Gv],
				[u, 15, 15 * Gv],
				[u, 30, 30 * Gv],
				[o, 1, Qv],
				[o, 3, 3 * Qv],
				[o, 6, 6 * Qv],
				[o, 12, 12 * Qv],
				[i, 1, Jv],
				[i, 2, 2 * Jv],
				[e, 1, Kv],
				[n, 1, tg],
				[n, 3, 3 * tg],
				[t, 1, ng]
			];
		return l.invert = function(t) {
			return new Date(h(t))
		}, l.domain = function(t) {
			return arguments.length ? p(Pd.call(t, Ho)) : p().map(Bo)
		}, l.ticks = function(t, n) {
			var e, r = p(),
				i = r[0],
				o = r[r.length - 1],
				u = o < i;
			return u && (e = i, i = o, o = e), e = f(t, i, o, n), e = e ? e.range(i, o + 1) : [], u ? e.reverse() : e
		}, l.tickFormat = function(r, c) {
			return null == c ? function(r) {
				return (a(r) < r ? d : u(r) < r ? v : o(r) < r ? g : i(r) < r ? _ : n(r) < r ? e(r) < r ? y : m : t(r) < r ? x : b)(r)
			} : s(c)
		}, l.nice = function(t, n) {
			var e = p();
			return (t = f(t, e[0], e[e.length - 1], n)) ? p(Fd(e, t)) : l
		}, l.copy = function() {
			return li(l, jo(t, n, e, i, o, u, a, c, s))
		}, l
	}

	function Xo(t) {
		var n = t.length;
		return function(e) {
			return t[Math.max(0, Math.min(n - 1, Math.floor(e * n)))]
		}
	}

	function Vo(t) {
		function n(n) {
			var o = (n - e) / (r - e);
			return t(i ? Math.max(0, Math.min(1, o)) : o)
		}
		var e = 0,
			r = 1,
			i = !1;
		return n.domain = function(t) {
			return arguments.length ? (e = +t[0], r = +t[1], n) : [e, r]
		}, n.clamp = function(t) {
			return arguments.length ? (i = !!t, n) : i
		}, n.interpolator = function(e) {
			return arguments.length ? (t = e, n) : t
		}, n.copy = function() {
			return Vo(t).domain([e, r]).clamp(i)
		}, pi(n)
	}

	function $o(t) {
		return t >= 1 ? Ng : t <= -1 ? -Ng : Math.asin(t)
	}

	function Wo(t) {
		return t.innerRadius
	}

	function Zo(t) {
		return t.outerRadius
	}

	function Go(t) {
		return t.startAngle
	}

	function Qo(t) {
		return t.endAngle
	}

	function Jo(t) {
		return t && t.padAngle
	}

	function Ko(t, n, e, r, i, o, u) {
		var a = t - e,
			c = n - r,
			s = (u ? o : -o) / wg(a * a + c * c),
			f = s * c,
			l = -s * a,
			h = t + f,
			p = n + l,
			d = e + f,
			v = r + l,
			g = (h + d) / 2,
			_ = (p + v) / 2,
			y = d - h,
			m = v - p,
			x = y * y + m * m,
			b = i - o,
			w = h * v - d * p,
			M = (m < 0 ? -1 : 1) * wg(mg(0, b * b * x - w * w)),
			T = (w * m - y * M) / x,
			N = (-w * y - m * M) / x,
			k = (w * m + y * M) / x,
			S = (-w * y + m * M) / x,
			E = T - g,
			A = N - _,
			C = k - g,
			z = S - _;
		return E * E + A * A > C * C + z * z && (T = k, N = S), {
			cx: T,
			cy: N,
			x01: -f,
			y01: -l,
			x11: T * (i / b - 1),
			y11: N * (i / b - 1)
		}
	}

	function tu(t) {
		this._context = t
	}

	function nu(t) {
		return t[0]
	}

	function eu(t) {
		return t[1]
	}

	function ru(t) {
		this._curve = t
	}

	function iu(t) {
		function n(n) {
			return new ru(t(n))
		}
		return n._curve = t, n
	}

	function ou(t) {
		var n = t.curve;
		return t.angle = t.x, delete t.x, t.radius = t.y, delete t.y, t.curve = function(t) {
			return arguments.length ? n(iu(t)) : n()._curve
		}, t
	}

	function uu(t) {
		return t.source
	}

	function au(t) {
		return t.target
	}

	function cu(t) {
		function n() {
			var n, a = Dg.call(arguments),
				c = e.apply(this, a),
				s = r.apply(this, a);
			if (u || (u = n = Vt()), t(u, +i.apply(this, (a[0] = c, a)), +o.apply(this, a), +i.apply(this, (a[0] = s, a)), +o.apply(this, a)), n) return u = null, n + "" || null
		}
		var e = uu,
			r = au,
			i = nu,
			o = eu,
			u = null;
		return n.source = function(t) {
			return arguments.length ? (e = t, n) : e
		}, n.target = function(t) {
			return arguments.length ? (r = t, n) : r
		}, n.x = function(t) {
			return arguments.length ? (i = "function" == typeof t ? t : vg(+t), n) : i
		}, n.y = function(t) {
			return arguments.length ? (o = "function" == typeof t ? t : vg(+t), n) : o
		}, n.context = function(t) {
			return arguments.length ? (u = null == t ? null : t, n) : u
		}, n
	}

	function su(t, n, e, r, i) {
		t.moveTo(n, e), t.bezierCurveTo(n = (n + r) / 2, e, n, i, r, i)
	}

	function fu(t, n, e, r, i) {
		t.moveTo(n, e), t.bezierCurveTo(n, e = (e + i) / 2, r, e, r, i)
	}

	function lu(t, n, e, r, i) {
		var o = qg(n, e),
			u = qg(n, e = (e + i) / 2),
			a = qg(r, e),
			c = qg(r, i);
		t.moveTo(o[0], o[1]), t.bezierCurveTo(u[0], u[1], a[0], a[1], c[0], c[1])
	}

	function hu(t, n, e) {
		t._context.bezierCurveTo((2 * t._x0 + t._x1) / 3, (2 * t._y0 + t._y1) / 3, (t._x0 + 2 * t._x1) / 3, (t._y0 + 2 * t._y1) / 3, (t._x0 + 4 * t._x1 + n) / 6, (t._y0 + 4 * t._y1 + e) / 6)
	}

	function pu(t) {
		this._context = t
	}

	function du(t) {
		this._context = t
	}

	function vu(t) {
		this._context = t
	}

	function gu(t, n) {
		this._basis = new pu(t), this._beta = n
	}

	function _u(t, n, e) {
		t._context.bezierCurveTo(t._x1 + t._k * (t._x2 - t._x0), t._y1 + t._k * (t._y2 - t._y0), t._x2 + t._k * (t._x1 - n), t._y2 + t._k * (t._y1 - e), t._x2, t._y2)
	}

	function yu(t, n) {
		this._context = t, this._k = (1 - n) / 6
	}

	function mu(t, n) {
		this._context = t, this._k = (1 - n) / 6
	}

	function xu(t, n) {
		this._context = t, this._k = (1 - n) / 6
	}

	function bu(t, n, e) {
		var r = t._x1,
			i = t._y1,
			o = t._x2,
			u = t._y2;
		if (t._l01_a > Mg) {
			var a = 2 * t._l01_2a + 3 * t._l01_a * t._l12_a + t._l12_2a,
				c = 3 * t._l01_a * (t._l01_a + t._l12_a);
			r = (r * a - t._x0 * t._l12_2a + t._x2 * t._l01_2a) / c, i = (i * a - t._y0 * t._l12_2a + t._y2 * t._l01_2a) / c
		}
		if (t._l23_a > Mg) {
			var s = 2 * t._l23_2a + 3 * t._l23_a * t._l12_a + t._l12_2a,
				f = 3 * t._l23_a * (t._l23_a + t._l12_a);
			o = (o * s + t._x1 * t._l23_2a - n * t._l12_2a) / f, u = (u * s + t._y1 * t._l23_2a - e * t._l12_2a) / f
		}
		t._context.bezierCurveTo(r, i, o, u, t._x2, t._y2)
	}

	function wu(t, n) {
		this._context = t, this._alpha = n
	}

	function Mu(t, n) {
		this._context = t, this._alpha = n
	}

	function Tu(t, n) {
		this._context = t, this._alpha = n
	}

	function Nu(t) {
		this._context = t
	}

	function ku(t) {
		return t < 0 ? -1 : 1
	}

	function Su(t, n, e) {
		var r = t._x1 - t._x0,
			i = n - t._x1,
			o = (t._y1 - t._y0) / (r || i < 0 && -0),
			u = (e - t._y1) / (i || r < 0 && -0),
			a = (o * i + u * r) / (r + i);
		return (ku(o) + ku(u)) * Math.min(Math.abs(o), Math.abs(u), .5 * Math.abs(a)) || 0
	}

	function Eu(t, n) {
		var e = t._x1 - t._x0;
		return e ? (3 * (t._y1 - t._y0) / e - n) / 2 : n
	}

	function Au(t, n, e) {
		var r = t._x0,
			i = t._y0,
			o = t._x1,
			u = t._y1,
			a = (o - r) / 3;
		t._context.bezierCurveTo(r + a, i + a * n, o - a, u - a * e, o, u)
	}

	function Cu(t) {
		this._context = t
	}

	function zu(t) {
		this._context = new Pu(t)
	}

	function Pu(t) {
		this._context = t
	}

	function Ru(t) {
		this._context = t
	}

	function Lu(t) {
		var n, e, r = t.length - 1,
			i = new Array(r),
			o = new Array(r),
			u = new Array(r);
		for (i[0] = 0, o[0] = 2, u[0] = t[0] + 2 * t[1], n = 1; n < r - 1; ++n) i[n] = 1, o[n] = 4, u[n] = 4 * t[n] + 2 * t[n + 1];
		for (i[r - 1] = 2, o[r - 1] = 7, u[r - 1] = 8 * t[r - 1] + t[r], n = 1; n < r; ++n) e = i[n] / o[n - 1], o[n] -= e, u[n] -= e * u[n - 1];
		for (i[r - 1] = u[r - 1] / o[r - 1], n = r - 2; n >= 0; --n) i[n] = (u[n] - i[n + 1]) / o[n];
		for (o[r - 1] = (t[r] + i[r - 1]) / 2, n = 0; n < r - 1; ++n) o[n] = 2 * t[n + 1] - i[n + 1];
		return [i, o]
	}

	function qu(t, n) {
		this._context = t, this._t = n
	}

	function Du(t, n) {
		return t[n]
	}

	function Uu(t) {
		for (var n, e = 0, r = -1, i = t.length; ++r < i;)(n = +t[r][1]) && (e += n);
		return e
	}

	function Ou(t) {
		return t[0]
	}

	function Fu(t) {
		return t[1]
	}

	function Iu() {
		this._ = null
	}

	function Yu(t) {
		t.U = t.C = t.L = t.R = t.P = t.N = null
	}

	function Bu(t, n) {
		var e = n,
			r = n.R,
			i = e.U;
		i ? i.L === e ? i.L = r : i.R = r : t._ = r, r.U = i, e.U = r, e.R = r.L, e.R && (e.R.U = e), r.L = e
	}

	function Hu(t, n) {
		var e = n,
			r = n.L,
			i = e.U;
		i ? i.L === e ? i.L = r : i.R = r : t._ = r, r.U = i, e.U = r, e.L = r.R, e.L && (e.L.U = e), r.R = e
	}

	function ju(t) {
		for (; t.L;) t = t.L;
		return t
	}

	function Xu(t, n, e, r) {
		var i = [null, null],
			o = __.push(i) - 1;
		return i.left = t, i.right = n, e && $u(i, t, n, e), r && $u(i, n, t, r), v_[t.index].halfedges.push(o), v_[n.index].halfedges.push(o), i
	}

	function Vu(t, n, e) {
		var r = [n, e];
		return r.left = t, r
	}

	function $u(t, n, e, r) {
		t[0] || t[1] ? t.left === e ? t[1] = r : t[0] = r : (t[0] = r, t.left = n, t.right = e)
	}

	function Wu(t, n, e, r, i) {
		var o, u = t[0],
			a = t[1],
			c = u[0],
			s = u[1],
			f = 0,
			l = 1,
			h = a[0] - c,
			p = a[1] - s;
		if (o = n - c, h || !(o > 0)) {
			if (o /= h, h < 0) {
				if (o < f) return;
				o < l && (l = o)
			} else if (h > 0) {
				if (o > l) return;
				o > f && (f = o)
			}
			if (o = r - c, h || !(o < 0)) {
				if (o /= h, h < 0) {
					if (o > l) return;
					o > f && (f = o)
				} else if (h > 0) {
					if (o < f) return;
					o < l && (l = o)
				}
				if (o = e - s, p || !(o > 0)) {
					if (o /= p, p < 0) {
						if (o < f) return;
						o < l && (l = o)
					} else if (p > 0) {
						if (o > l) return;
						o > f && (f = o)
					}
					if (o = i - s, p || !(o < 0)) {
						if (o /= p, p < 0) {
							if (o > l) return;
							o > f && (f = o)
						} else if (p > 0) {
							if (o < f) return;
							o < l && (l = o)
						}
						return !(f > 0 || l < 1) || (f > 0 && (t[0] = [c + f * h, s + f * p]), l < 1 && (t[1] = [c + l * h, s + l * p]), !0)
					}
				}
			}
		}
	}

	function Zu(t, n, e, r, i) {
		var o = t[1];
		if (o) return !0;
		var u, a, c = t[0],
			s = t.left,
			f = t.right,
			l = s[0],
			h = s[1],
			p = f[0],
			d = f[1],
			v = (l + p) / 2,
			g = (h + d) / 2;
		if (d === h) {
			if (v < n || v >= r) return;
			if (l > p) {
				if (c) {
					if (c[1] >= i) return
				} else c = [v, e];
				o = [v, i]
			} else {
				if (c) {
					if (c[1] < e) return
				} else c = [v, i];
				o = [v, e]
			}
		} else if (u = (l - p) / (d - h), a = g - u * v, u < -1 || u > 1)
			if (l > p) {
				if (c) {
					if (c[1] >= i) return
				} else c = [(e - a) / u, e];
				o = [(i - a) / u, i]
			} else {
				if (c) {
					if (c[1] < e) return
				} else c = [(i - a) / u, i];
				o = [(e - a) / u, e]
			}
		else if (h < d) {
			if (c) {
				if (c[0] >= r) return
			} else c = [n, u * n + a];
			o = [r, u * r + a]
		} else {
			if (c) {
				if (c[0] < n) return
			} else c = [r, u * r + a];
			o = [n, u * n + a]
		}
		return t[0] = c, t[1] = o, !0
	}

	function Gu(t, n) {
		var e = t.site,
			r = n.left,
			i = n.right;
		return e === i && (i = r, r = e), i ? Math.atan2(i[1] - r[1], i[0] - r[0]) : (e === r ? (r = n[1], i = n[0]) : (r = n[0], i = n[1]), Math.atan2(r[0] - i[0], i[1] - r[1]))
	}

	function Qu(t, n) {
		return n[+(n.left !== t.site)]
	}

	function Ju(t, n) {
		return n[+(n.left === t.site)]
	}

	function Ku(t) {
		var n = t.P,
			e = t.N;
		if (n && e) {
			var r = n.site,
				i = t.site,
				o = e.site;
			if (r !== o) {
				var u = i[0],
					a = i[1],
					c = r[0] - u,
					s = r[1] - a,
					f = o[0] - u,
					l = o[1] - a,
					h = 2 * (c * l - s * f);
				if (!(h >= -b_)) {
					var p = c * c + s * s,
						d = f * f + l * l,
						v = (l * p - s * d) / h,
						g = (c * d - f * p) / h,
						_ = y_.pop() || new function() {
							Yu(this), this.x = this.y = this.arc = this.site = this.cy = null
						};
					_.arc = t, _.site = i, _.x = v + u, _.y = (_.cy = g + a) + Math.sqrt(v * v + g * g), t.circle = _;
					for (var y = null, m = g_._; m;)
						if (_.y < m.y || _.y === m.y && _.x <= m.x) {
							if (!m.L) {
								y = m.P;
								break
							}
							m = m.L
						} else {
							if (!m.R) {
								y = m;
								break
							}
							m = m.R
						} g_.insert(y, _), y || (p_ = _)
				}
			}
		}
	}

	function ta(t) {
		var n = t.circle;
		n && (n.P || (p_ = n.N), g_.remove(n), y_.push(n), Yu(n), t.circle = null)
	}

	function na(t) {
		var n = m_.pop() || new function() {
			Yu(this), this.edge = this.site = this.circle = null
		};
		return n.site = t, n
	}

	function ea(t) {
		ta(t), d_.remove(t), m_.push(t), Yu(t)
	}

	function ra(t) {
		var n = t.circle,
			e = n.x,
			r = n.cy,
			i = [e, r],
			o = t.P,
			u = t.N,
			a = [t];
		ea(t);
		for (var c = o; c.circle && Math.abs(e - c.circle.x) < x_ && Math.abs(r - c.circle.cy) < x_;) o = c.P, a.unshift(c), ea(c), c = o;
		a.unshift(c), ta(c);
		for (var s = u; s.circle && Math.abs(e - s.circle.x) < x_ && Math.abs(r - s.circle.cy) < x_;) u = s.N, a.push(s), ea(s), s = u;
		a.push(s), ta(s);
		var f, l = a.length;
		for (f = 1; f < l; ++f) s = a[f], c = a[f - 1], $u(s.edge, c.site, s.site, i);
		c = a[0], (s = a[l - 1]).edge = Xu(c.site, s.site, null, i), Ku(c), Ku(s)
	}

	function ia(t) {
		for (var n, e, r, i, o = t[0], u = t[1], a = d_._; a;)
			if ((r = oa(a, u) - o) > x_) a = a.L;
			else {
				if (!((i = o - function(t, n) {
						var e = t.N;
						if (e) return oa(e, n);
						var r = t.site;
						return r[1] === n ? r[0] : 1 / 0
					}(a, u)) > x_)) {
					r > -x_ ? (n = a.P, e = a) : i > -x_ ? (n = a, e = a.N) : n = e = a;
					break
				}
				if (!a.R) {
					n = a;
					break
				}
				a = a.R
			}(function(t) {
				v_[t.index] = {
					site: t,
					halfedges: []
				}
			})(t);
		var c = na(t);
		if (d_.insert(n, c), n || e) {
			if (n === e) return ta(n), e = na(n.site), d_.insert(c, e), c.edge = e.edge = Xu(n.site, c.site), Ku(n), void Ku(e);
			if (e) {
				ta(n), ta(e);
				var s = n.site,
					f = s[0],
					l = s[1],
					h = t[0] - f,
					p = t[1] - l,
					d = e.site,
					v = d[0] - f,
					g = d[1] - l,
					_ = 2 * (h * g - p * v),
					y = h * h + p * p,
					m = v * v + g * g,
					x = [(g * y - p * m) / _ + f, (h * m - v * y) / _ + l];
				$u(e.edge, s, d, x), c.edge = Xu(s, t, null, x), e.edge = Xu(t, d, null, x), Ku(n), Ku(e)
			} else c.edge = Xu(n.site, c.site)
		}
	}

	function oa(t, n) {
		var e = t.site,
			r = e[0],
			i = e[1],
			o = i - n;
		if (!o) return r;
		var u = t.P;
		if (!u) return -1 / 0;
		var a = (e = u.site)[0],
			c = e[1],
			s = c - n;
		if (!s) return a;
		var f = a - r,
			l = 1 / o - 1 / s,
			h = f / s;
		return l ? (-h + Math.sqrt(h * h - 2 * l * (f * f / (-2 * s) - c + s / 2 + i - o / 2))) / l + r : (r + a) / 2
	}

	function ua(t, n, e) {
		return (t[0] - e[0]) * (n[1] - t[1]) - (t[0] - n[0]) * (e[1] - t[1])
	}

	function aa(t, n) {
		return n[1] - t[1] || n[0] - t[0]
	}

	function ca(t, n) {
		var e, r, i, o = t.sort(aa).pop();
		for (__ = [], v_ = new Array(t.length), d_ = new Iu, g_ = new Iu;;)
			if (i = p_, o && (!i || o[1] < i.y || o[1] === i.y && o[0] < i.x)) o[0] === e && o[1] === r || (ia(o), e = o[0], r = o[1]), o = t.pop();
			else {
				if (!i) break;
				ra(i.arc)
			} if (function() {
				for (var t, n, e, r, i = 0, o = v_.length; i < o; ++i)
					if ((t = v_[i]) && (r = (n = t.halfedges).length)) {
						var u = new Array(r),
							a = new Array(r);
						for (e = 0; e < r; ++e) u[e] = e, a[e] = Gu(t, __[n[e]]);
						for (u.sort(function(t, n) {
								return a[n] - a[t]
							}), e = 0; e < r; ++e) a[e] = n[u[e]];
						for (e = 0; e < r; ++e) n[e] = a[e]
					}
			}(), n) {
			var u = +n[0][0],
				a = +n[0][1],
				c = +n[1][0],
				s = +n[1][1];
			(function(t, n, e, r) {
				for (var i, o = __.length; o--;) Zu(i = __[o], t, n, e, r) && Wu(i, t, n, e, r) && (Math.abs(i[0][0] - i[1][0]) > x_ || Math.abs(i[0][1] - i[1][1]) > x_) || delete __[o]
			})(u, a, c, s),
			function(t, n, e, r) {
				var i, o, u, a, c, s, f, l, h, p, d, v, g = v_.length,
					_ = !0;
				for (i = 0; i < g; ++i)
					if (o = v_[i]) {
						for (u = o.site, a = (c = o.halfedges).length; a--;) __[c[a]] || c.splice(a, 1);
						for (a = 0, s = c.length; a < s;) d = (p = Ju(o, __[c[a]]))[0], v = p[1], l = (f = Qu(o, __[c[++a % s]]))[0], h = f[1], (Math.abs(d - l) > x_ || Math.abs(v - h) > x_) && (c.splice(a, 0, __.push(Vu(u, p, Math.abs(d - t) < x_ && r - v > x_ ? [t, Math.abs(l - t) < x_ ? h : r] : Math.abs(v - r) < x_ && e - d > x_ ? [Math.abs(h - r) < x_ ? l : e, r] : Math.abs(d - e) < x_ && v - n > x_ ? [e, Math.abs(l - e) < x_ ? h : n] : Math.abs(v - n) < x_ && d - t > x_ ? [Math.abs(h - n) < x_ ? l : t, n] : null)) - 1), ++s);
						s && (_ = !1)
					} if (_) {
					var y, m, x, b = 1 / 0;
					for (i = 0, _ = null; i < g; ++i)(o = v_[i]) && (x = (y = (u = o.site)[0] - t) * y + (m = u[1] - n) * m) < b && (b = x, _ = o);
					if (_) {
						var w = [t, n],
							M = [t, r],
							T = [e, r],
							N = [e, n];
						_.halfedges.push(__.push(Vu(u = _.site, w, M)) - 1, __.push(Vu(u, M, T)) - 1, __.push(Vu(u, T, N)) - 1, __.push(Vu(u, N, w)) - 1)
					}
				}
				for (i = 0; i < g; ++i)(o = v_[i]) && (o.halfedges.length || delete v_[i])
			}(u, a, c, s)
		}
		this.edges = __, this.cells = v_, d_ = g_ = __ = v_ = null
	}

	function sa(t, n, e) {
		this.k = t, this.x = n, this.y = e
	}

	function fa(t) {
		return t.__zoom || M_
	}

	function la() {
		t.event.stopImmediatePropagation()
	}

	function ha() {
		return !t.event.button
	}

	function pa() {
		var t, n, e = this;
		return e instanceof SVGElement ? (t = (e = e.ownerSVGElement || e).width.baseVal.value, n = e.height.baseVal.value) : (t = e.clientWidth, n = e.clientHeight), [
			[0, 0],
			[t, n]
		]
	}

	function da() {
		return this.__zoom || M_
	}

	function va() {
		return -t.event.deltaY * (t.event.deltaMode ? 120 : 1) / 500
	}

	function ga() {
		return "ontouchstart" in this
	}

	function _a(t, n, e) {
		var r = t.invertX(n[0][0]) - e[0][0],
			i = t.invertX(n[1][0]) - e[1][0],
			o = t.invertY(n[0][1]) - e[0][1],
			u = t.invertY(n[1][1]) - e[1][1];
		return t.translate(i > r ? (r + i) / 2 : Math.min(0, r) || Math.max(0, i), u > o ? (o + u) / 2 : Math.min(0, o) || Math.max(0, u))
	}
	var ya = function(t, n) {
			return t < n ? -1 : t > n ? 1 : t >= n ? 0 : NaN
		},
		ma = function(t) {
			return 1 === t.length && (t = function(t) {
				return function(n, e) {
					return ya(t(n), e)
				}
			}(t)), {
				left: function(n, e, r, i) {
					for (null == r && (r = 0), null == i && (i = n.length); r < i;) {
						var o = r + i >>> 1;
						t(n[o], e) < 0 ? r = o + 1 : i = o
					}
					return r
				},
				right: function(n, e, r, i) {
					for (null == r && (r = 0), null == i && (i = n.length); r < i;) {
						var o = r + i >>> 1;
						t(n[o], e) > 0 ? i = o : r = o + 1
					}
					return r
				}
			}
		},
		xa = ma(ya),
		ba = xa.right,
		wa = xa.left,
		Ma = function(t) {
			return null === t ? NaN : +t
		},
		Ta = function(t, n) {
			var e, r, i = t.length,
				o = 0,
				u = -1,
				a = 0,
				c = 0;
			if (null == n)
				for (; ++u < i;) isNaN(e = Ma(t[u])) || (c += (r = e - a) * (e - (a += r / ++o)));
			else
				for (; ++u < i;) isNaN(e = Ma(n(t[u], u, t))) || (c += (r = e - a) * (e - (a += r / ++o)));
			if (o > 1) return c / (o - 1)
		},
		Na = function(t, n) {
			var e = Ta(t, n);
			return e ? Math.sqrt(e) : e
		},
		ka = function(t, n) {
			var e, r, i, o = t.length,
				u = -1;
			if (null == n) {
				for (; ++u < o;)
					if (null != (e = t[u]) && e >= e)
						for (r = i = e; ++u < o;) null != (e = t[u]) && (r > e && (r = e), i < e && (i = e))
			} else
				for (; ++u < o;)
					if (null != (e = n(t[u], u, t)) && e >= e)
						for (r = i = e; ++u < o;) null != (e = n(t[u], u, t)) && (r > e && (r = e), i < e && (i = e));
			return [r, i]
		},
		Sa = Array.prototype,
		Ea = Sa.slice,
		Aa = Sa.map,
		Ca = function(t) {
			return function() {
				return t
			}
		},
		za = function(t) {
			return t
		},
		Pa = function(t, n, e) {
			t = +t, n = +n, e = (i = arguments.length) < 2 ? (n = t, t = 0, 1) : i < 3 ? 1 : +e;
			for (var r = -1, i = 0 | Math.max(0, Math.ceil((n - t) / e)), o = new Array(i); ++r < i;) o[r] = t + r * e;
			return o
		},
		Ra = Math.sqrt(50),
		La = Math.sqrt(10),
		qa = Math.sqrt(2),
		Da = function(t, n, r) {
			var i, o, u, a, c = -1;
			if (n = +n, t = +t, r = +r, t === n && r > 0) return [t];
			if ((i = n < t) && (o = t, t = n, n = o), 0 === (a = e(t, n, r)) || !isFinite(a)) return [];
			if (a > 0)
				for (t = Math.ceil(t / a), n = Math.floor(n / a), u = new Array(o = Math.ceil(n - t + 1)); ++c < o;) u[c] = (t + c) * a;
			else
				for (t = Math.floor(t * a), n = Math.ceil(n * a), u = new Array(o = Math.ceil(t - n + 1)); ++c < o;) u[c] = (t - c) / a;
			return i && u.reverse(), u
		},
		Ua = function(t) {
			return Math.ceil(Math.log(t.length) / Math.LN2) + 1
		},
		Oa = function(t, n, e) {
			if (null == e && (e = Ma), r = t.length) {
				if ((n = +n) <= 0 || r < 2) return +e(t[0], 0, t);
				if (n >= 1) return +e(t[r - 1], r - 1, t);
				var r, i = (r - 1) * n,
					o = Math.floor(i),
					u = +e(t[o], o, t);
				return u + (+e(t[o + 1], o + 1, t) - u) * (i - o)
			}
		},
		Fa = function(t) {
			for (var n, e, r, i = t.length, o = -1, u = 0; ++o < i;) u += t[o].length;
			for (e = new Array(u); --i >= 0;)
				for (n = (r = t[i]).length; --n >= 0;) e[--u] = r[n];
			return e
		},
		Ia = function(t, n) {
			var e, r, i = t.length,
				o = -1;
			if (null == n) {
				for (; ++o < i;)
					if (null != (e = t[o]) && e >= e)
						for (r = e; ++o < i;) null != (e = t[o]) && r > e && (r = e)
			} else
				for (; ++o < i;)
					if (null != (e = n(t[o], o, t)) && e >= e)
						for (r = e; ++o < i;) null != (e = n(t[o], o, t)) && r > e && (r = e);
			return r
		},
		Ya = function(t) {
			if (!(o = t.length)) return [];
			for (var n = -1, e = Ia(t, i), r = new Array(e); ++n < e;)
				for (var o, u = -1, a = r[n] = new Array(o); ++u < o;) a[u] = t[u][n];
			return r
		},
		Ba = Array.prototype.slice,
		Ha = function(t) {
			return t
		},
		ja = 1,
		Xa = 2,
		Va = 3,
		$a = 4,
		Wa = 1e-6,
		Za = {
			value: function() {}
		};
	c.prototype = a.prototype = {
		constructor: c,
		on: function(t, n) {
			var e, r = this._,
				i = function(t, n) {
					return t.trim().split(/^|\s+/).map(function(t) {
						var e = "",
							r = t.indexOf(".");
						if (r >= 0 && (e = t.slice(r + 1), t = t.slice(0, r)), t && !n.hasOwnProperty(t)) throw new Error("unknown type: " + t);
						return {
							type: t,
							name: e
						}
					})
				}(t + "", r),
				o = -1,
				u = i.length; {
				if (!(arguments.length < 2)) {
					if (null != n && "function" != typeof n) throw new Error("invalid callback: " + n);
					for (; ++o < u;)
						if (e = (t = i[o]).type) r[e] = s(r[e], t.name, n);
						else if (null == n)
						for (e in r) r[e] = s(r[e], t.name, null);
					return this
				}
				for (; ++o < u;)
					if ((e = (t = i[o]).type) && (e = function(t, n) {
							for (var e, r = 0, i = t.length; r < i; ++r)
								if ((e = t[r]).name === n) return e.value
						}(r[e], t.name))) return e
			}
		},
		copy: function() {
			var t = {},
				n = this._;
			for (var e in n) t[e] = n[e].slice();
			return new c(t)
		},
		call: function(t, n) {
			if ((e = arguments.length - 2) > 0)
				for (var e, r, i = new Array(e), o = 0; o < e; ++o) i[o] = arguments[o + 2];
			if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
			for (o = 0, e = (r = this._[t]).length; o < e; ++o) r[o].value.apply(n, i)
		},
		apply: function(t, n, e) {
			if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
			for (var r = this._[t], i = 0, o = r.length; i < o; ++i) r[i].value.apply(n, e)
		}
	};
	var Ga = "http://www.w3.org/1999/xhtml",
		Qa = {
			svg: "http://www.w3.org/2000/svg",
			xhtml: Ga,
			xlink: "http://www.w3.org/1999/xlink",
			xml: "http://www.w3.org/XML/1998/namespace",
			xmlns: "http://www.w3.org/2000/xmlns/"
		},
		Ja = function(t) {
			var n = t += "",
				e = n.indexOf(":");
			return e >= 0 && "xmlns" !== (n = t.slice(0, e)) && (t = t.slice(e + 1)), Qa.hasOwnProperty(n) ? {
				space: Qa[n],
				local: t
			} : t
		},
		Ka = function(t) {
			var n = Ja(t);
			return (n.local ? function(t) {
				return function() {
					return this.ownerDocument.createElementNS(t.space, t.local)
				}
			} : function(t) {
				return function() {
					var n = this.ownerDocument,
						e = this.namespaceURI;
					return e === Ga && n.documentElement.namespaceURI === Ga ? n.createElement(t) : n.createElementNS(e, t)
				}
			})(n)
		},
		tc = 0;
	l.prototype = f.prototype = {
		constructor: l,
		get: function(t) {
			for (var n = this._; !(n in t);)
				if (!(t = t.parentNode)) return;
			return t[n]
		},
		set: function(t, n) {
			return t[this._] = n
		},
		remove: function(t) {
			return this._ in t && delete t[this._]
		},
		toString: function() {
			return this._
		}
	};
	var nc = function(t) {
		return function() {
			return this.matches(t)
		}
	};
	if ("undefined" != typeof document) {
		var ec = document.documentElement;
		if (!ec.matches) {
			var rc = ec.webkitMatchesSelector || ec.msMatchesSelector || ec.mozMatchesSelector || ec.oMatchesSelector;
			nc = function(t) {
				return function() {
					return rc.call(this, t)
				}
			}
		}
	}
	var ic = nc,
		oc = {};
	if (t.event = null, "undefined" != typeof document) {
		"onmouseenter" in document.documentElement || (oc = {
			mouseenter: "mouseover",
			mouseleave: "mouseout"
		})
	}
	var uc = function() {
			for (var n, e = t.event; n = e.sourceEvent;) e = n;
			return e
		},
		ac = function(t, n) {
			var e = t.ownerSVGElement || t;
			if (e.createSVGPoint) {
				var r = e.createSVGPoint();
				return r.x = n.clientX, r.y = n.clientY, r = r.matrixTransform(t.getScreenCTM().inverse()), [r.x, r.y]
			}
			var i = t.getBoundingClientRect();
			return [n.clientX - i.left - t.clientLeft, n.clientY - i.top - t.clientTop]
		},
		cc = function(t) {
			var n = uc();
			return n.changedTouches && (n = n.changedTouches[0]), ac(t, n)
		},
		sc = function(t) {
			return null == t ? function() {} : function() {
				return this.querySelector(t)
			}
		},
		fc = function(t) {
			return null == t ? function() {
				return []
			} : function() {
				return this.querySelectorAll(t)
			}
		},
		lc = function(t) {
			return new Array(t.length)
		};
	v.prototype = {
		constructor: v,
		appendChild: function(t) {
			return this._parent.insertBefore(t, this._next)
		},
		insertBefore: function(t, n) {
			return this._parent.insertBefore(t, n)
		},
		querySelector: function(t) {
			return this._parent.querySelector(t)
		},
		querySelectorAll: function(t) {
			return this._parent.querySelectorAll(t)
		}
	};
	var hc = "$",
		pc = function(t) {
			return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView
		};
	x.prototype = {
		add: function(t) {
			this._names.indexOf(t) < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")))
		},
		remove: function(t) {
			var n = this._names.indexOf(t);
			n >= 0 && (this._names.splice(n, 1), this._node.setAttribute("class", this._names.join(" ")))
		},
		contains: function(t) {
			return this._names.indexOf(t) >= 0
		}
	};
	var dc = [null];
	S.prototype = E.prototype = {
		constructor: S,
		select: function(t) {
			"function" != typeof t && (t = sc(t));
			for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
				for (var o, u, a = n[i], c = a.length, s = r[i] = new Array(c), f = 0; f < c; ++f)(o = a[f]) && (u = t.call(o, o.__data__, f, a)) && ("__data__" in o && (u.__data__ = o.__data__), s[f] = u);
			return new S(r, this._parents)
		},
		selectAll: function(t) {
			"function" != typeof t && (t = fc(t));
			for (var n = this._groups, e = n.length, r = [], i = [], o = 0; o < e; ++o)
				for (var u, a = n[o], c = a.length, s = 0; s < c; ++s)(u = a[s]) && (r.push(t.call(u, u.__data__, s, a)), i.push(u));
			return new S(r, i)
		},
		filter: function(t) {
			"function" != typeof t && (t = ic(t));
			for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
				for (var o, u = n[i], a = u.length, c = r[i] = [], s = 0; s < a; ++s)(o = u[s]) && t.call(o, o.__data__, s, u) && c.push(o);
			return new S(r, this._parents)
		},
		data: function(t, n) {
			if (!t) return p = new Array(this.size()), s = -1, this.each(function(t) {
				p[++s] = t
			}), p;
			var e = n ? function(t, n, e, r, i, o, u) {
					var a, c, s, f = {},
						l = n.length,
						h = o.length,
						p = new Array(l);
					for (a = 0; a < l; ++a)(c = n[a]) && (p[a] = s = hc + u.call(c, c.__data__, a, n), s in f ? i[a] = c : f[s] = c);
					for (a = 0; a < h; ++a)(c = f[s = hc + u.call(t, o[a], a, o)]) ? (r[a] = c, c.__data__ = o[a], f[s] = null) : e[a] = new v(t, o[a]);
					for (a = 0; a < l; ++a)(c = n[a]) && f[p[a]] === c && (i[a] = c)
				} : function(t, n, e, r, i, o) {
					for (var u, a = 0, c = n.length, s = o.length; a < s; ++a)(u = n[a]) ? (u.__data__ = o[a], r[a] = u) : e[a] = new v(t, o[a]);
					for (; a < c; ++a)(u = n[a]) && (i[a] = u)
				},
				r = this._parents,
				i = this._groups;
			"function" != typeof t && (t = function(t) {
				return function() {
					return t
				}
			}(t));
			for (var o = i.length, u = new Array(o), a = new Array(o), c = new Array(o), s = 0; s < o; ++s) {
				var f = r[s],
					l = i[s],
					h = l.length,
					p = t.call(f, f && f.__data__, s, r),
					d = p.length,
					g = a[s] = new Array(d),
					_ = u[s] = new Array(d);
				e(f, l, g, _, c[s] = new Array(h), p, n);
				for (var y, m, x = 0, b = 0; x < d; ++x)
					if (y = g[x]) {
						for (x >= b && (b = x + 1); !(m = _[b]) && ++b < d;);
						y._next = m || null
					}
			}
			return u = new S(u, r), u._enter = a, u._exit = c, u
		},
		enter: function() {
			return new S(this._enter || this._groups.map(lc), this._parents)
		},
		exit: function() {
			return new S(this._exit || this._groups.map(lc), this._parents)
		},
		merge: function(t) {
			for (var n = this._groups, e = t._groups, r = n.length, i = e.length, o = Math.min(r, i), u = new Array(r), a = 0; a < o; ++a)
				for (var c, s = n[a], f = e[a], l = s.length, h = u[a] = new Array(l), p = 0; p < l; ++p)(c = s[p] || f[p]) && (h[p] = c);
			for (; a < r; ++a) u[a] = n[a];
			return new S(u, this._parents)
		},
		order: function() {
			for (var t = this._groups, n = -1, e = t.length; ++n < e;)
				for (var r, i = t[n], o = i.length - 1, u = i[o]; --o >= 0;)(r = i[o]) && (u && u !== r.nextSibling && u.parentNode.insertBefore(r, u), u = r);
			return this
		},
		sort: function(t) {
			function n(n, e) {
				return n && e ? t(n.__data__, e.__data__) : !n - !e
			}
			t || (t = g);
			for (var e = this._groups, r = e.length, i = new Array(r), o = 0; o < r; ++o) {
				for (var u, a = e[o], c = a.length, s = i[o] = new Array(c), f = 0; f < c; ++f)(u = a[f]) && (s[f] = u);
				s.sort(n)
			}
			return new S(i, this._parents).order()
		},
		call: function() {
			var t = arguments[0];
			return arguments[0] = this, t.apply(null, arguments), this
		},
		nodes: function() {
			var t = new Array(this.size()),
				n = -1;
			return this.each(function() {
				t[++n] = this
			}), t
		},
		node: function() {
			for (var t = this._groups, n = 0, e = t.length; n < e; ++n)
				for (var r = t[n], i = 0, o = r.length; i < o; ++i) {
					var u = r[i];
					if (u) return u
				}
			return null
		},
		size: function() {
			var t = 0;
			return this.each(function() {
				++t
			}), t
		},
		empty: function() {
			return !this.node()
		},
		each: function(t) {
			for (var n = this._groups, e = 0, r = n.length; e < r; ++e)
				for (var i, o = n[e], u = 0, a = o.length; u < a; ++u)(i = o[u]) && t.call(i, i.__data__, u, o);
			return this
		},
		attr: function(t, n) {
			var e = Ja(t);
			if (arguments.length < 2) {
				var r = this.node();
				return e.local ? r.getAttributeNS(e.space, e.local) : r.getAttribute(e)
			}
			return this.each((null == n ? e.local ? function(t) {
				return function() {
					this.removeAttributeNS(t.space, t.local)
				}
			} : function(t) {
				return function() {
					this.removeAttribute(t)
				}
			} : "function" == typeof n ? e.local ? function(t, n) {
				return function() {
					var e = n.apply(this, arguments);
					null == e ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, e)
				}
			} : function(t, n) {
				return function() {
					var e = n.apply(this, arguments);
					null == e ? this.removeAttribute(t) : this.setAttribute(t, e)
				}
			} : e.local ? function(t, n) {
				return function() {
					this.setAttributeNS(t.space, t.local, n)
				}
			} : function(t, n) {
				return function() {
					this.setAttribute(t, n)
				}
			})(e, n))
		},
		style: function(t, n, e) {
			return arguments.length > 1 ? this.each((null == n ? function(t) {
				return function() {
					this.style.removeProperty(t)
				}
			} : "function" == typeof n ? function(t, n, e) {
				return function() {
					var r = n.apply(this, arguments);
					null == r ? this.style.removeProperty(t) : this.style.setProperty(t, r, e)
				}
			} : function(t, n, e) {
				return function() {
					this.style.setProperty(t, n, e)
				}
			})(t, n, null == e ? "" : e)) : _(this.node(), t)
		},
		property: function(t, n) {
			return arguments.length > 1 ? this.each((null == n ? function(t) {
				return function() {
					delete this[t]
				}
			} : "function" == typeof n ? function(t, n) {
				return function() {
					var e = n.apply(this, arguments);
					null == e ? delete this[t] : this[t] = e
				}
			} : function(t, n) {
				return function() {
					this[t] = n
				}
			})(t, n)) : this.node()[t]
		},
		classed: function(t, n) {
			var e = y(t + "");
			if (arguments.length < 2) {
				for (var r = m(this.node()), i = -1, o = e.length; ++i < o;)
					if (!r.contains(e[i])) return !1;
				return !0
			}
			return this.each(("function" == typeof n ? function(t, n) {
				return function() {
					(n.apply(this, arguments) ? b : w)(this, t)
				}
			} : n ? function(t) {
				return function() {
					b(this, t)
				}
			} : function(t) {
				return function() {
					w(this, t)
				}
			})(e, n))
		},
		text: function(t) {
			return arguments.length ? this.each(null == t ? function() {
				this.textContent = ""
			} : ("function" == typeof t ? function(t) {
				return function() {
					var n = t.apply(this, arguments);
					this.textContent = null == n ? "" : n
				}
			} : function(t) {
				return function() {
					this.textContent = t
				}
			})(t)) : this.node().textContent
		},
		html: function(t) {
			return arguments.length ? this.each(null == t ? function() {
				this.innerHTML = ""
			} : ("function" == typeof t ? function(t) {
				return function() {
					var n = t.apply(this, arguments);
					this.innerHTML = null == n ? "" : n
				}
			} : function(t) {
				return function() {
					this.innerHTML = t
				}
			})(t)) : this.node().innerHTML
		},
		raise: function() {
			return this.each(M)
		},
		lower: function() {
			return this.each(T)
		},
		append: function(t) {
			var n = "function" == typeof t ? t : Ka(t);
			return this.select(function() {
				return this.appendChild(n.apply(this, arguments))
			})
		},
		insert: function(t, n) {
			var e = "function" == typeof t ? t : Ka(t),
				r = null == n ? function() {
					return null
				} : "function" == typeof n ? n : sc(n);
			return this.select(function() {
				return this.insertBefore(e.apply(this, arguments), r.apply(this, arguments) || null)
			})
		},
		remove: function() {
			return this.each(N)
		},
		datum: function(t) {
			return arguments.length ? this.property("__data__", t) : this.node().__data__
		},
		on: function(t, n, e) {
			var r, i, o = (t + "").trim().split(/^|\s+/).map(function(t) {
					var n = "",
						e = t.indexOf(".");
					return e >= 0 && (n = t.slice(e + 1), t = t.slice(0, e)), {
						type: t,
						name: n
					}
				}),
				u = o.length; {
				if (!(arguments.length < 2)) {
					for (a = n ? p : function(t) {
							return function() {
								var n = this.__on;
								if (n) {
									for (var e, r = 0, i = -1, o = n.length; r < o; ++r) e = n[r], t.type && e.type !== t.type || e.name !== t.name ? n[++i] = e : this.removeEventListener(e.type, e.listener, e.capture);
									++i ? n.length = i : delete this.__on
								}
							}
						}, null == e && (e = !1), r = 0; r < u; ++r) this.each(a(o[r], n, e));
					return this
				}
				var a = this.node().__on;
				if (a)
					for (var c, s = 0, f = a.length; s < f; ++s)
						for (r = 0, c = a[s]; r < u; ++r)
							if ((i = o[r]).type === c.type && i.name === c.name) return c.value
			}
		},
		dispatch: function(t, n) {
			return this.each(("function" == typeof n ? function(t, n) {
				return function() {
					return k(this, t, n.apply(this, arguments))
				}
			} : function(t, n) {
				return function() {
					return k(this, t, n)
				}
			})(t, n))
		}
	};
	var vc = function(t) {
			return "string" == typeof t ? new S([
				[document.querySelector(t)]
			], [document.documentElement]) : new S([
				[t]
			], dc)
		},
		gc = function(t, n, e) {
			arguments.length < 3 && (e = n, n = uc().changedTouches);
			for (var r, i = 0, o = n ? n.length : 0; i < o; ++i)
				if ((r = n[i]).identifier === e) return ac(t, r);
			return null
		},
		_c = function() {
			t.event.preventDefault(), t.event.stopImmediatePropagation()
		},
		yc = function(t) {
			var n = t.document.documentElement,
				e = vc(t).on("dragstart.drag", _c, !0);
			"onselectstart" in n ? e.on("selectstart.drag", _c, !0) : (n.__noselect = n.style.MozUserSelect, n.style.MozUserSelect = "none")
		},
		mc = function(t) {
			return function() {
				return t
			}
		};
	z.prototype.on = function() {
		var t = this._.on.apply(this._, arguments);
		return t === this._ ? this : t
	};
	var xc = function(t, n, e) {
			t.prototype = n.prototype = e, e.constructor = t
		},
		bc = "\\s*([+-]?\\d+)\\s*",
		wc = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
		Mc = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
		Tc = /^#([0-9a-f]{3})$/,
		Nc = /^#([0-9a-f]{6})$/,
		kc = new RegExp("^rgb\\(" + [bc, bc, bc] + "\\)$"),
		Sc = new RegExp("^rgb\\(" + [Mc, Mc, Mc] + "\\)$"),
		Ec = new RegExp("^rgba\\(" + [bc, bc, bc, wc] + "\\)$"),
		Ac = new RegExp("^rgba\\(" + [Mc, Mc, Mc, wc] + "\\)$"),
		Cc = new RegExp("^hsl\\(" + [wc, Mc, Mc] + "\\)$"),
		zc = new RegExp("^hsla\\(" + [wc, Mc, Mc, wc] + "\\)$"),
		Pc = {
			aliceblue: 15792383,
			antiquewhite: 16444375,
			aqua: 65535,
			aquamarine: 8388564,
			azure: 15794175,
			beige: 16119260,
			bisque: 16770244,
			black: 0,
			blanchedalmond: 16772045,
			blue: 255,
			blueviolet: 9055202,
			brown: 10824234,
			burlywood: 14596231,
			cadetblue: 6266528,
			chartreuse: 8388352,
			chocolate: 13789470,
			coral: 16744272,
			cornflowerblue: 6591981,
			cornsilk: 16775388,
			crimson: 14423100,
			cyan: 65535,
			darkblue: 139,
			darkcyan: 35723,
			darkgoldenrod: 12092939,
			darkgray: 11119017,
			darkgreen: 25600,
			darkgrey: 11119017,
			darkkhaki: 12433259,
			darkmagenta: 9109643,
			darkolivegreen: 5597999,
			darkorange: 16747520,
			darkorchid: 10040012,
			darkred: 9109504,
			darksalmon: 15308410,
			darkseagreen: 9419919,
			darkslateblue: 4734347,
			darkslategray: 3100495,
			darkslategrey: 3100495,
			darkturquoise: 52945,
			darkviolet: 9699539,
			deeppink: 16716947,
			deepskyblue: 49151,
			dimgray: 6908265,
			dimgrey: 6908265,
			dodgerblue: 2003199,
			firebrick: 11674146,
			floralwhite: 16775920,
			forestgreen: 2263842,
			fuchsia: 16711935,
			gainsboro: 14474460,
			ghostwhite: 16316671,
			gold: 16766720,
			goldenrod: 14329120,
			gray: 8421504,
			green: 32768,
			greenyellow: 11403055,
			grey: 8421504,
			honeydew: 15794160,
			hotpink: 16738740,
			indianred: 13458524,
			indigo: 4915330,
			ivory: 16777200,
			khaki: 15787660,
			lavender: 15132410,
			lavenderblush: 16773365,
			lawngreen: 8190976,
			lemonchiffon: 16775885,
			lightblue: 11393254,
			lightcoral: 15761536,
			lightcyan: 14745599,
			lightgoldenrodyellow: 16448210,
			lightgray: 13882323,
			lightgreen: 9498256,
			lightgrey: 13882323,
			lightpink: 16758465,
			lightsalmon: 16752762,
			lightseagreen: 2142890,
			lightskyblue: 8900346,
			lightslategray: 7833753,
			lightslategrey: 7833753,
			lightsteelblue: 11584734,
			lightyellow: 16777184,
			lime: 65280,
			limegreen: 3329330,
			linen: 16445670,
			magenta: 16711935,
			maroon: 8388608,
			mediumaquamarine: 6737322,
			mediumblue: 205,
			mediumorchid: 12211667,
			mediumpurple: 9662683,
			mediumseagreen: 3978097,
			mediumslateblue: 8087790,
			mediumspringgreen: 64154,
			mediumturquoise: 4772300,
			mediumvioletred: 13047173,
			midnightblue: 1644912,
			mintcream: 16121850,
			mistyrose: 16770273,
			moccasin: 16770229,
			navajowhite: 16768685,
			navy: 128,
			oldlace: 16643558,
			olive: 8421376,
			olivedrab: 7048739,
			orange: 16753920,
			orangered: 16729344,
			orchid: 14315734,
			palegoldenrod: 15657130,
			palegreen: 10025880,
			paleturquoise: 11529966,
			palevioletred: 14381203,
			papayawhip: 16773077,
			peachpuff: 16767673,
			peru: 13468991,
			pink: 16761035,
			plum: 14524637,
			powderblue: 11591910,
			purple: 8388736,
			rebeccapurple: 6697881,
			red: 16711680,
			rosybrown: 12357519,
			royalblue: 4286945,
			saddlebrown: 9127187,
			salmon: 16416882,
			sandybrown: 16032864,
			seagreen: 3050327,
			seashell: 16774638,
			sienna: 10506797,
			silver: 12632256,
			skyblue: 8900331,
			slateblue: 6970061,
			slategray: 7372944,
			slategrey: 7372944,
			snow: 16775930,
			springgreen: 65407,
			steelblue: 4620980,
			tan: 13808780,
			teal: 32896,
			thistle: 14204888,
			tomato: 16737095,
			turquoise: 4251856,
			violet: 15631086,
			wheat: 16113331,
			white: 16777215,
			whitesmoke: 16119285,
			yellow: 16776960,
			yellowgreen: 10145074
		};
	xc(U, O, {
		displayable: function() {
			return this.rgb().displayable()
		},
		toString: function() {
			return this.rgb() + ""
		}
	}), xc(H, B, D(U, {
		brighter: function(t) {
			return t = null == t ? 1 / .7 : Math.pow(1 / .7, t), new H(this.r * t, this.g * t, this.b * t, this.opacity)
		},
		darker: function(t) {
			return t = null == t ? .7 : Math.pow(.7, t), new H(this.r * t, this.g * t, this.b * t, this.opacity)
		},
		rgb: function() {
			return this
		},
		displayable: function() {
			return 0 <= this.r && this.r <= 255 && 0 <= this.g && this.g <= 255 && 0 <= this.b && this.b <= 255 && 0 <= this.opacity && this.opacity <= 1
		},
		toString: function() {
			var t = this.opacity;
			return (1 === (t = isNaN(t) ? 1 : Math.max(0, Math.min(1, t))) ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (1 === t ? ")" : ", " + t + ")")
		}
	})), xc(V, X, D(U, {
		brighter: function(t) {
			return t = null == t ? 1 / .7 : Math.pow(1 / .7, t), new V(this.h, this.s, this.l * t, this.opacity)
		},
		darker: function(t) {
			return t = null == t ? .7 : Math.pow(.7, t), new V(this.h, this.s, this.l * t, this.opacity)
		},
		rgb: function() {
			var t = this.h % 360 + 360 * (this.h < 0),
				n = isNaN(t) || isNaN(this.s) ? 0 : this.s,
				e = this.l,
				r = e + (e < .5 ? e : 1 - e) * n,
				i = 2 * e - r;
			return new H($(t >= 240 ? t - 240 : t + 120, i, r), $(t, i, r), $(t < 120 ? t + 240 : t - 120, i, r), this.opacity)
		},
		displayable: function() {
			return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1
		}
	}));
	var Rc = Math.PI / 180,
		Lc = 180 / Math.PI,
		qc = .95047,
		Dc = 1,
		Uc = 1.08883,
		Oc = 4 / 29,
		Fc = 6 / 29,
		Ic = 3 * Fc * Fc,
		Yc = Fc * Fc * Fc;
	xc(G, Z, D(U, {
		brighter: function(t) {
			return new G(this.l + 18 * (null == t ? 1 : t), this.a, this.b, this.opacity)
		},
		darker: function(t) {
			return new G(this.l - 18 * (null == t ? 1 : t), this.a, this.b, this.opacity)
		},
		rgb: function() {
			var t = (this.l + 16) / 116,
				n = isNaN(this.a) ? t : t + this.a / 500,
				e = isNaN(this.b) ? t : t - this.b / 200;
			return t = Dc * J(t), n = qc * J(n), e = Uc * J(e), new H(K(3.2404542 * n - 1.5371385 * t - .4985314 * e), K(-.969266 * n + 1.8760108 * t + .041556 * e), K(.0556434 * n - .2040259 * t + 1.0572252 * e), this.opacity)
		}
	})), xc(et, nt, D(U, {
		brighter: function(t) {
			return new et(this.h, this.c, this.l + 18 * (null == t ? 1 : t), this.opacity)
		},
		darker: function(t) {
			return new et(this.h, this.c, this.l - 18 * (null == t ? 1 : t), this.opacity)
		},
		rgb: function() {
			return W(this).rgb()
		}
	}));
	var Bc = -.14861,
		Hc = 1.78277,
		jc = -.29227,
		Xc = -.90649,
		Vc = 1.97294,
		$c = Vc * Xc,
		Wc = Vc * Hc,
		Zc = Hc * jc - Xc * Bc;
	xc(it, rt, D(U, {
		brighter: function(t) {
			return t = null == t ? 1 / .7 : Math.pow(1 / .7, t), new it(this.h, this.s, this.l * t, this.opacity)
		},
		darker: function(t) {
			return t = null == t ? .7 : Math.pow(.7, t), new it(this.h, this.s, this.l * t, this.opacity)
		},
		rgb: function() {
			var t = isNaN(this.h) ? 0 : (this.h + 120) * Rc,
				n = +this.l,
				e = isNaN(this.s) ? 0 : this.s * n * (1 - n),
				r = Math.cos(t),
				i = Math.sin(t);
			return new H(255 * (n + e * (Bc * r + Hc * i)), 255 * (n + e * (jc * r + Xc * i)), 255 * (n + e * (Vc * r)), this.opacity)
		}
	}));
	var Gc, Qc, Jc, Kc, ts, ns, es = function(t) {
			var n = t.length - 1;
			return function(e) {
				var r = e <= 0 ? e = 0 : e >= 1 ? (e = 1, n - 1) : Math.floor(e * n),
					i = t[r],
					o = t[r + 1],
					u = r > 0 ? t[r - 1] : 2 * i - o,
					a = r < n - 1 ? t[r + 2] : 2 * o - i;
				return ot((e - r / n) * n, u, i, o, a)
			}
		},
		rs = function(t) {
			var n = t.length;
			return function(e) {
				var r = Math.floor(((e %= 1) < 0 ? ++e : e) * n),
					i = t[(r + n - 1) % n],
					o = t[r % n],
					u = t[(r + 1) % n],
					a = t[(r + 2) % n];
				return ot((e - r / n) * n, i, o, u, a)
			}
		},
		is = function(t) {
			return function() {
				return t
			}
		},
		os = function t(n) {
			function e(t, n) {
				var e = r((t = B(t)).r, (n = B(n)).r),
					i = r(t.g, n.g),
					o = r(t.b, n.b),
					u = st(t.opacity, n.opacity);
				return function(n) {
					return t.r = e(n), t.g = i(n), t.b = o(n), t.opacity = u(n), t + ""
				}
			}
			var r = ct(n);
			return e.gamma = t, e
		}(1),
		us = ft(es),
		as = ft(rs),
		cs = function(t, n) {
			var e, r = n ? n.length : 0,
				i = t ? Math.min(r, t.length) : 0,
				o = new Array(i),
				u = new Array(r);
			for (e = 0; e < i; ++e) o[e] = vs(t[e], n[e]);
			for (; e < r; ++e) u[e] = n[e];
			return function(t) {
				for (e = 0; e < i; ++e) u[e] = o[e](t);
				return u
			}
		},
		ss = function(t, n) {
			var e = new Date;
			return t = +t, n -= t,
				function(r) {
					return e.setTime(t + n * r), e
				}
		},
		fs = function(t, n) {
			return t = +t, n -= t,
				function(e) {
					return t + n * e
				}
		},
		ls = function(t, n) {
			var e, r = {},
				i = {};
			null !== t && "object" == typeof t || (t = {}), null !== n && "object" == typeof n || (n = {});
			for (e in n) e in t ? r[e] = vs(t[e], n[e]) : i[e] = n[e];
			return function(t) {
				for (e in r) i[e] = r[e](t);
				return i
			}
		},
		hs = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
		ps = new RegExp(hs.source, "g"),
		ds = function(t, n) {
			var e, r, i, o = hs.lastIndex = ps.lastIndex = 0,
				u = -1,
				a = [],
				c = [];
			for (t += "", n += "";
				(e = hs.exec(t)) && (r = ps.exec(n));)(i = r.index) > o && (i = n.slice(o, i), a[u] ? a[u] += i : a[++u] = i), (e = e[0]) === (r = r[0]) ? a[u] ? a[u] += r : a[++u] = r : (a[++u] = null, c.push({
				i: u,
				x: fs(e, r)
			})), o = ps.lastIndex;
			return o < n.length && (i = n.slice(o), a[u] ? a[u] += i : a[++u] = i), a.length < 2 ? c[0] ? function(t) {
				return function(n) {
					return t(n) + ""
				}
			}(c[0].x) : function(t) {
				return function() {
					return t
				}
			}(n) : (n = c.length, function(t) {
				for (var e, r = 0; r < n; ++r) a[(e = c[r]).i] = e.x(t);
				return a.join("")
			})
		},
		vs = function(t, n) {
			var e, r = typeof n;
			return null == n || "boolean" === r ? is(n) : ("number" === r ? fs : "string" === r ? (e = O(n)) ? (n = e, os) : ds : n instanceof O ? os : n instanceof Date ? ss : Array.isArray(n) ? cs : "function" != typeof n.valueOf && "function" != typeof n.toString || isNaN(n) ? ls : fs)(t, n)
		},
		gs = function(t, n) {
			return t = +t, n -= t,
				function(e) {
					return Math.round(t + n * e)
				}
		},
		_s = 180 / Math.PI,
		ys = {
			translateX: 0,
			translateY: 0,
			rotate: 0,
			skewX: 0,
			scaleX: 1,
			scaleY: 1
		},
		ms = function(t, n, e, r, i, o) {
			var u, a, c;
			return (u = Math.sqrt(t * t + n * n)) && (t /= u, n /= u), (c = t * e + n * r) && (e -= t * c, r -= n * c), (a = Math.sqrt(e * e + r * r)) && (e /= a, r /= a, c /= a), t * r < n * e && (t = -t, n = -n, c = -c, u = -u), {
				translateX: i,
				translateY: o,
				rotate: Math.atan2(n, t) * _s,
				skewX: Math.atan(c) * _s,
				scaleX: u,
				scaleY: a
			}
		},
		xs = lt(function(t) {
			return "none" === t ? ys : (Gc || (Gc = document.createElement("DIV"), Qc = document.documentElement, Jc = document.defaultView), Gc.style.transform = t, t = Jc.getComputedStyle(Qc.appendChild(Gc), null).getPropertyValue("transform"), Qc.removeChild(Gc), t = t.slice(7, -1).split(","), ms(+t[0], +t[1], +t[2], +t[3], +t[4], +t[5]))
		}, "px, ", "px)", "deg)"),
		bs = lt(function(t) {
			return null == t ? ys : (Kc || (Kc = document.createElementNS("http://www.w3.org/2000/svg", "g")), Kc.setAttribute("transform", t), (t = Kc.transform.baseVal.consolidate()) ? (t = t.matrix, ms(t.a, t.b, t.c, t.d, t.e, t.f)) : ys)
		}, ", ", ")", ")"),
		ws = Math.SQRT2,
		Ms = function(t, n) {
			var e, r, i = t[0],
				o = t[1],
				u = t[2],
				a = n[0],
				c = n[1],
				s = n[2],
				f = a - i,
				l = c - o,
				h = f * f + l * l;
			if (h < 1e-12) r = Math.log(s / u) / ws, e = function(t) {
				return [i + t * f, o + t * l, u * Math.exp(ws * t * r)]
			};
			else {
				var p = Math.sqrt(h),
					d = (s * s - u * u + 4 * h) / (2 * u * 2 * p),
					v = (s * s - u * u - 4 * h) / (2 * s * 2 * p),
					g = Math.log(Math.sqrt(d * d + 1) - d),
					_ = Math.log(Math.sqrt(v * v + 1) - v);
				r = (_ - g) / ws, e = function(t) {
					var n = t * r,
						e = ht(g),
						a = u / (2 * p) * (e * function(t) {
							return ((t = Math.exp(2 * t)) - 1) / (t + 1)
						}(ws * n + g) - function(t) {
							return ((t = Math.exp(t)) - 1 / t) / 2
						}(g));
					return [i + a * f, o + a * l, u * e / ht(ws * n + g)]
				}
			}
			return e.duration = 1e3 * r, e
		},
		Ts = pt(at),
		Ns = pt(st),
		ks = dt(at),
		Ss = dt(st),
		Es = vt(at),
		As = vt(st),
		Cs = 0,
		zs = 0,
		Ps = 0,
		Rs = 1e3,
		Ls = 0,
		qs = 0,
		Ds = 0,
		Us = "object" == typeof performance && performance.now ? performance : Date,
		Os = "object" == typeof window && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
			setTimeout(t, 17)
		};
	yt.prototype = mt.prototype = {
		constructor: yt,
		restart: function(t, n, e) {
			if ("function" != typeof t) throw new TypeError("callback is not a function");
			e = (null == e ? gt() : +e) + (null == n ? 0 : +n), this._next || ns === this || (ns ? ns._next = this : ts = this, ns = this), this._call = t, this._time = e, Mt()
		},
		stop: function() {
			this._call && (this._call = null, this._time = 1 / 0, Mt())
		}
	};
	var Fs = function(t, n, e) {
			var r = new yt;
			return n = null == n ? 0 : +n, r.restart(function(e) {
				r.stop(), t(e + n)
			}, n, e), r
		},
		Is = a("start", "end", "interrupt"),
		Ys = [],
		Bs = 0,
		Hs = 1,
		js = 2,
		Xs = 3,
		Vs = 4,
		$s = 5,
		Ws = 6,
		Zs = function(t, n, e, r, i, o) {
			var u = t.__transition;
			if (u) {
				if (e in u) return
			} else t.__transition = {};
			(function(t, n, e) {
				function r(c) {
					var s, f, l, h;
					if (e.state !== Hs) return o();
					for (s in a)
						if ((h = a[s]).name === e.name) {
							if (h.state === Xs) return Fs(r);
							h.state === Vs ? (h.state = Ws, h.timer.stop(), h.on.call("interrupt", t, t.__data__, h.index, h.group), delete a[s]) : +s < n && (h.state = Ws, h.timer.stop(), delete a[s])
						} if (Fs(function() {
							e.state === Xs && (e.state = Vs, e.timer.restart(i, e.delay, e.time), i(c))
						}), e.state = js, e.on.call("start", t, t.__data__, e.index, e.group), e.state === js) {
						for (e.state = Xs, u = new Array(l = e.tween.length), s = 0, f = -1; s < l; ++s)(h = e.tween[s].value.call(t, t.__data__, e.index, e.group)) && (u[++f] = h);
						u.length = f + 1
					}
				}

				function i(n) {
					for (var r = n < e.duration ? e.ease.call(null, n / e.duration) : (e.timer.restart(o), e.state = $s, 1), i = -1, a = u.length; ++i < a;) u[i].call(null, r);
					e.state === $s && (e.on.call("end", t, t.__data__, e.index, e.group), o())
				}

				function o() {
					e.state = Ws, e.timer.stop(), delete a[n];
					for (var r in a) return;
					delete t.__transition
				}
				var u, a = t.__transition;
				a[n] = e, e.timer = mt(function(t) {
					e.state = Hs, e.timer.restart(r, e.delay, e.time), e.delay <= t && r(t - e.delay)
				}, 0, e.time)
			})(t, e, {
				name: n,
				index: r,
				group: i,
				on: Is,
				tween: Ys,
				time: o.time,
				delay: o.delay,
				duration: o.duration,
				ease: o.ease,
				timer: null,
				state: Bs
			})
		},
		Gs = function(t, n) {
			var e, r, i, o = t.__transition,
				u = !0;
			if (o) {
				n = null == n ? null : n + "";
				for (i in o)(e = o[i]).name === n ? (r = e.state > js && e.state < $s, e.state = Ws, e.timer.stop(), r && e.on.call("interrupt", t, t.__data__, e.index, e.group), delete o[i]) : u = !1;
				u && delete t.__transition
			}
		},
		Qs = function(t, n) {
			var e;
			return ("number" == typeof n ? fs : n instanceof O ? os : (e = O(n)) ? (n = e, os) : ds)(t, n)
		},
		Js = E.prototype.constructor,
		Ks = 0,
		tf = E.prototype;
	Et.prototype = At.prototype = {
		constructor: Et,
		select: function(t) {
			var n = this._name,
				e = this._id;
			"function" != typeof t && (t = sc(t));
			for (var r = this._groups, i = r.length, o = new Array(i), u = 0; u < i; ++u)
				for (var a, c, s = r[u], f = s.length, l = o[u] = new Array(f), h = 0; h < f; ++h)(a = s[h]) && (c = t.call(a, a.__data__, h, s)) && ("__data__" in a && (c.__data__ = a.__data__), l[h] = c, Zs(l[h], n, e, h, l, kt(a, e)));
			return new Et(o, this._parents, n, e)
		},
		selectAll: function(t) {
			var n = this._name,
				e = this._id;
			"function" != typeof t && (t = fc(t));
			for (var r = this._groups, i = r.length, o = [], u = [], a = 0; a < i; ++a)
				for (var c, s = r[a], f = s.length, l = 0; l < f; ++l)
					if (c = s[l]) {
						for (var h, p = t.call(c, c.__data__, l, s), d = kt(c, e), v = 0, g = p.length; v < g; ++v)(h = p[v]) && Zs(h, n, e, v, p, d);
						o.push(p), u.push(c)
					} return new Et(o, u, n, e)
		},
		filter: function(t) {
			"function" != typeof t && (t = ic(t));
			for (var n = this._groups, e = n.length, r = new Array(e), i = 0; i < e; ++i)
				for (var o, u = n[i], a = u.length, c = r[i] = [], s = 0; s < a; ++s)(o = u[s]) && t.call(o, o.__data__, s, u) && c.push(o);
			return new Et(r, this._parents, this._name, this._id)
		},
		merge: function(t) {
			if (t._id !== this._id) throw new Error;
			for (var n = this._groups, e = t._groups, r = n.length, i = e.length, o = Math.min(r, i), u = new Array(r), a = 0; a < o; ++a)
				for (var c, s = n[a], f = e[a], l = s.length, h = u[a] = new Array(l), p = 0; p < l; ++p)(c = s[p] || f[p]) && (h[p] = c);
			for (; a < r; ++a) u[a] = n[a];
			return new Et(u, this._parents, this._name, this._id)
		},
		selection: function() {
			return new Js(this._groups, this._parents)
		},
		transition: function() {
			for (var t = this._name, n = this._id, e = Ct(), r = this._groups, i = r.length, o = 0; o < i; ++o)
				for (var u, a = r[o], c = a.length, s = 0; s < c; ++s)
					if (u = a[s]) {
						var f = kt(u, n);
						Zs(u, t, e, s, a, {
							time: f.time + f.delay + f.duration,
							delay: 0,
							duration: f.duration,
							ease: f.ease
						})
					} return new Et(r, this._parents, t, e)
		},
		call: tf.call,
		nodes: tf.nodes,
		node: tf.node,
		size: tf.size,
		empty: tf.empty,
		each: tf.each,
		on: function(t, n) {
			var e = this._id;
			return arguments.length < 2 ? kt(this.node(), e).on.on(t) : this.each(function(t, n, e) {
				var r, i, o = function(t) {
					return (t + "").trim().split(/^|\s+/).every(function(t) {
						var n = t.indexOf(".");
						return n >= 0 && (t = t.slice(0, n)), !t || "start" === t
					})
				}(n) ? Tt : Nt;
				return function() {
					var u = o(this, t),
						a = u.on;
					a !== r && (i = (r = a).copy()).on(n, e), u.on = i
				}
			}(e, t, n))
		},
		attr: function(t, n) {
			var e = Ja(t),
				r = "transform" === e ? bs : Qs;
			return this.attrTween(t, "function" == typeof n ? (e.local ? function(t, n, e) {
				var r, i, o;
				return function() {
					var u, a = e(this);
					if (null != a) return (u = this.getAttributeNS(t.space, t.local)) === a ? null : u === r && a === i ? o : o = n(r = u, i = a);
					this.removeAttributeNS(t.space, t.local)
				}
			} : function(t, n, e) {
				var r, i, o;
				return function() {
					var u, a = e(this);
					if (null != a) return (u = this.getAttribute(t)) === a ? null : u === r && a === i ? o : o = n(r = u, i = a);
					this.removeAttribute(t)
				}
			})(e, r, St(this, "attr." + t, n)) : null == n ? (e.local ? function(t) {
				return function() {
					this.removeAttributeNS(t.space, t.local)
				}
			} : function(t) {
				return function() {
					this.removeAttribute(t)
				}
			})(e) : (e.local ? function(t, n, e) {
				var r, i;
				return function() {
					var o = this.getAttributeNS(t.space, t.local);
					return o === e ? null : o === r ? i : i = n(r = o, e)
				}
			} : function(t, n, e) {
				var r, i;
				return function() {
					var o = this.getAttribute(t);
					return o === e ? null : o === r ? i : i = n(r = o, e)
				}
			})(e, r, n + ""))
		},
		attrTween: function(t, n) {
			var e = "attr." + t;
			if (arguments.length < 2) return (e = this.tween(e)) && e._value;
			if (null == n) return this.tween(e, null);
			if ("function" != typeof n) throw new Error;
			var r = Ja(t);
			return this.tween(e, (r.local ? function(t, n) {
				function e() {
					var e = this,
						r = n.apply(e, arguments);
					return r && function(n) {
						e.setAttributeNS(t.space, t.local, r(n))
					}
				}
				return e._value = n, e
			} : function(t, n) {
				function e() {
					var e = this,
						r = n.apply(e, arguments);
					return r && function(n) {
						e.setAttribute(t, r(n))
					}
				}
				return e._value = n, e
			})(r, n))
		},
		style: function(t, n, e) {
			var r = "transform" == (t += "") ? xs : Qs;
			return null == n ? this.styleTween(t, function(t, n) {
				var e, r, i;
				return function() {
					var o = _(this, t),
						u = (this.style.removeProperty(t), _(this, t));
					return o === u ? null : o === e && u === r ? i : i = n(e = o, r = u)
				}
			}(t, r)).on("end.style." + t, function(t) {
				return function() {
					this.style.removeProperty(t)
				}
			}(t)) : this.styleTween(t, "function" == typeof n ? function(t, n, e) {
				var r, i, o;
				return function() {
					var u = _(this, t),
						a = e(this);
					return null == a && (this.style.removeProperty(t), a = _(this, t)), u === a ? null : u === r && a === i ? o : o = n(r = u, i = a)
				}
			}(t, r, St(this, "style." + t, n)) : function(t, n, e) {
				var r, i;
				return function() {
					var o = _(this, t);
					return o === e ? null : o === r ? i : i = n(r = o, e)
				}
			}(t, r, n + ""), e)
		},
		styleTween: function(t, n, e) {
			var r = "style." + (t += "");
			if (arguments.length < 2) return (r = this.tween(r)) && r._value;
			if (null == n) return this.tween(r, null);
			if ("function" != typeof n) throw new Error;
			return this.tween(r, function(t, n, e) {
				function r() {
					var r = this,
						i = n.apply(r, arguments);
					return i && function(n) {
						r.style.setProperty(t, i(n), e)
					}
				}
				return r._value = n, r
			}(t, n, null == e ? "" : e))
		},
		text: function(t) {
			return this.tween("text", "function" == typeof t ? function(t) {
				return function() {
					var n = t(this);
					this.textContent = null == n ? "" : n
				}
			}(St(this, "text", t)) : function(t) {
				return function() {
					this.textContent = t
				}
			}(null == t ? "" : t + ""))
		},
		remove: function() {
			return this.on("end.remove", function(t) {
				return function() {
					var n = this.parentNode;
					for (var e in this.__transition)
						if (+e !== t) return;
					n && n.removeChild(this)
				}
			}(this._id))
		},
		tween: function(t, n) {
			var e = this._id;
			if (t += "", arguments.length < 2) {
				for (var r, i = kt(this.node(), e).tween, o = 0, u = i.length; o < u; ++o)
					if ((r = i[o]).name === t) return r.value;
				return null
			}
			return this.each((null == n ? function(t, n) {
				var e, r;
				return function() {
					var i = Nt(this, t),
						o = i.tween;
					if (o !== e)
						for (var u = 0, a = (r = e = o).length; u < a; ++u)
							if (r[u].name === n) {
								(r = r.slice()).splice(u, 1);
								break
							} i.tween = r
				}
			} : function(t, n, e) {
				var r, i;
				if ("function" != typeof e) throw new Error;
				return function() {
					var o = Nt(this, t),
						u = o.tween;
					if (u !== r) {
						i = (r = u).slice();
						for (var a = {
								name: n,
								value: e
							}, c = 0, s = i.length; c < s; ++c)
							if (i[c].name === n) {
								i[c] = a;
								break
							} c === s && i.push(a)
					}
					o.tween = i
				}
			})(e, t, n))
		},
		delay: function(t) {
			var n = this._id;
			return arguments.length ? this.each(("function" == typeof t ? function(t, n) {
				return function() {
					Tt(this, t).delay = +n.apply(this, arguments)
				}
			} : function(t, n) {
				return n = +n,
					function() {
						Tt(this, t).delay = n
					}
			})(n, t)) : kt(this.node(), n).delay
		},
		duration: function(t) {
			var n = this._id;
			return arguments.length ? this.each(("function" == typeof t ? function(t, n) {
				return function() {
					Nt(this, t).duration = +n.apply(this, arguments)
				}
			} : function(t, n) {
				return n = +n,
					function() {
						Nt(this, t).duration = n
					}
			})(n, t)) : kt(this.node(), n).duration
		},
		ease: function(t) {
			var n = this._id;
			return arguments.length ? this.each(function(t, n) {
				if ("function" != typeof n) throw new Error;
				return function() {
					Nt(this, t).ease = n
				}
			}(n, t)) : kt(this.node(), n).ease
		}
	};
	var nf = function t(n) {
			function e(t) {
				return Math.pow(t, n)
			}
			return n = +n, e.exponent = t, e
		}(3),
		ef = function t(n) {
			function e(t) {
				return 1 - Math.pow(1 - t, n)
			}
			return n = +n, e.exponent = t, e
		}(3),
		rf = function t(n) {
			function e(t) {
				return ((t *= 2) <= 1 ? Math.pow(t, n) : 2 - Math.pow(2 - t, n)) / 2
			}
			return n = +n, e.exponent = t, e
		}(3),
		of = Math.PI,
		uf = of /2,af=4/
	11, cf = 6 / 11, sf = 8 / 11, ff = .75, lf = 9 / 11, hf = 10 / 11, pf = .9375, df = 21 / 22, vf = 63 / 64, gf = 1 / af / af, _f = function t(n) {
		function e(t) {
			return t * t * ((n + 1) * t - n)
		}
		return n = +n, e.overshoot = t, e
	}(1.70158), yf = function t(n) {
		function e(t) {
			return --t * t * ((n + 1) * t + n) + 1
		}
		return n = +n, e.overshoot = t, e
	}(1.70158), mf = function t(n) {
		function e(t) {
			return ((t *= 2) < 1 ? t * t * ((n + 1) * t - n) : (t -= 2) * t * ((n + 1) * t + n) + 2) / 2
		}
		return n = +n, e.overshoot = t, e
	}(1.70158), xf = 2 * Math.PI, bf = function t(n, e) {
		function r(t) {
			return n * Math.pow(2, 10 * --t) * Math.sin((i - t) / e)
		}
		var i = Math.asin(1 / (n = Math.max(1, n))) * (e /= xf);
		return r.amplitude = function(n) {
			return t(n, e * xf)
		}, r.period = function(e) {
			return t(n, e)
		}, r
	}(1, .3), wf = function t(n, e) {
		function r(t) {
			return 1 - n * Math.pow(2, -10 * (t = +t)) * Math.sin((t + i) / e)
		}
		var i = Math.asin(1 / (n = Math.max(1, n))) * (e /= xf);
		return r.amplitude = function(n) {
			return t(n, e * xf)
		}, r.period = function(e) {
			return t(n, e)
		}, r
	}(1, .3), Mf = function t(n, e) {
		function r(t) {
			return ((t = 2 * t - 1) < 0 ? n * Math.pow(2, 10 * t) * Math.sin((i - t) / e) : 2 - n * Math.pow(2, -10 * t) * Math.sin((i + t) / e)) / 2
		}
		var i = Math.asin(1 / (n = Math.max(1, n))) * (e /= xf);
		return r.amplitude = function(n) {
			return t(n, e * xf)
		}, r.period = function(e) {
			return t(n, e)
		}, r
	}(1, .3), Tf = {
		time: null,
		delay: 0,
		duration: 250,
		ease: Pt
	};
	E.prototype.interrupt = function(t) {
		return this.each(function() {
			Gs(this, t)
		})
	}, E.prototype.transition = function(t) {
		var n, e;
		t instanceof Et ? (n = t._id, t = t._name) : (n = Ct(), (e = Tf).time = gt(), t = null == t ? null : t + "");
		for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
			for (var u, a = r[o], c = a.length, s = 0; s < c; ++s)(u = a[s]) && Zs(u, t, n, s, a, e || Ut(u, n));
		return new Et(r, this._parents, t, n)
	};
	var Nf = [null],
		kf = function(t) {
			return function() {
				return t
			}
		},
		Sf = function(t, n, e) {
			this.target = t, this.type = n, this.selection = e
		},
		Ef = function() {
			t.event.preventDefault(), t.event.stopImmediatePropagation()
		},
		Af = {
			name: "drag"
		},
		Cf = {
			name: "space"
		},
		zf = {
			name: "handle"
		},
		Pf = {
			name: "center"
		},
		Rf = {
			name: "x",
			handles: ["e", "w"].map(Ft),
			input: function(t, n) {
				return t && [
					[t[0], n[0][1]],
					[t[1], n[1][1]]
				]
			},
			output: function(t) {
				return t && [t[0][0], t[1][0]]
			}
		},
		Lf = {
			name: "y",
			handles: ["n", "s"].map(Ft),
			input: function(t, n) {
				return t && [
					[n[0][0], t[0]],
					[n[1][0], t[1]]
				]
			},
			output: function(t) {
				return t && [t[0][1], t[1][1]]
			}
		},
		qf = {
			name: "xy",
			handles: ["n", "e", "s", "w", "nw", "ne", "se", "sw"].map(Ft),
			input: function(t) {
				return t
			},
			output: function(t) {
				return t
			}
		},
		Df = {
			overlay: "crosshair",
			selection: "move",
			n: "ns-resize",
			e: "ew-resize",
			s: "ns-resize",
			w: "ew-resize",
			nw: "nwse-resize",
			ne: "nesw-resize",
			se: "nwse-resize",
			sw: "nesw-resize"
		},
		Uf = {
			e: "w",
			w: "e",
			nw: "ne",
			ne: "nw",
			se: "sw",
			sw: "se"
		},
		Of = {
			n: "s",
			s: "n",
			nw: "sw",
			ne: "se",
			se: "ne",
			sw: "nw"
		},
		Ff = {
			overlay: 1,
			selection: 1,
			n: null,
			e: 1,
			s: null,
			w: -1,
			nw: -1,
			ne: 1,
			se: 1,
			sw: -1
		},
		If = {
			overlay: 1,
			selection: 1,
			n: -1,
			e: null,
			s: 1,
			w: null,
			nw: -1,
			ne: -1,
			se: 1,
			sw: 1
		},
		Yf = Math.cos,
		Bf = Math.sin,
		Hf = Math.PI,
		jf = Hf / 2,
		Xf = 2 * Hf,
		Vf = Math.max,
		$f = Array.prototype.slice,
		Wf = function(t) {
			return function() {
				return t
			}
		},
		Zf = Math.PI,
		Gf = 2 * Zf,
		Qf = Gf - 1e-6;
	Xt.prototype = Vt.prototype = {
		constructor: Xt,
		moveTo: function(t, n) {
			this._ += "M" + (this._x0 = this._x1 = +t) + "," + (this._y0 = this._y1 = +n)
		},
		closePath: function() {
			null !== this._x1 && (this._x1 = this._x0, this._y1 = this._y0, this._ += "Z")
		},
		lineTo: function(t, n) {
			this._ += "L" + (this._x1 = +t) + "," + (this._y1 = +n)
		},
		quadraticCurveTo: function(t, n, e, r) {
			this._ += "Q" + +t + "," + +n + "," + (this._x1 = +e) + "," + (this._y1 = +r)
		},
		bezierCurveTo: function(t, n, e, r, i, o) {
			this._ += "C" + +t + "," + +n + "," + +e + "," + +r + "," + (this._x1 = +i) + "," + (this._y1 = +o)
		},
		arcTo: function(t, n, e, r, i) {
			t = +t, n = +n, e = +e, r = +r, i = +i;
			var o = this._x1,
				u = this._y1,
				a = e - t,
				c = r - n,
				s = o - t,
				f = u - n,
				l = s * s + f * f;
			if (i < 0) throw new Error("negative radius: " + i);
			if (null === this._x1) this._ += "M" + (this._x1 = t) + "," + (this._y1 = n);
			else if (l > 1e-6)
				if (Math.abs(f * a - c * s) > 1e-6 && i) {
					var h = e - o,
						p = r - u,
						d = a * a + c * c,
						v = h * h + p * p,
						g = Math.sqrt(d),
						_ = Math.sqrt(l),
						y = i * Math.tan((Zf - Math.acos((d + l - v) / (2 * g * _))) / 2),
						m = y / _,
						x = y / g;
					Math.abs(m - 1) > 1e-6 && (this._ += "L" + (t + m * s) + "," + (n + m * f)), this._ += "A" + i + "," + i + ",0,0," + +(f * h > s * p) + "," + (this._x1 = t + x * a) + "," + (this._y1 = n + x * c)
				} else this._ += "L" + (this._x1 = t) + "," + (this._y1 = n);
			else;
		},
		arc: function(t, n, e, r, i, o) {
			t = +t, n = +n;
			var u = (e = +e) * Math.cos(r),
				a = e * Math.sin(r),
				c = t + u,
				s = n + a,
				f = 1 ^ o,
				l = o ? r - i : i - r;
			if (e < 0) throw new Error("negative radius: " + e);
			null === this._x1 ? this._ += "M" + c + "," + s : (Math.abs(this._x1 - c) > 1e-6 || Math.abs(this._y1 - s) > 1e-6) && (this._ += "L" + c + "," + s), e && (l < 0 && (l = l % Gf + Gf), l > Qf ? this._ += "A" + e + "," + e + ",0,1," + f + "," + (t - u) + "," + (n - a) + "A" + e + "," + e + ",0,1," + f + "," + (this._x1 = c) + "," + (this._y1 = s) : l > 1e-6 && (this._ += "A" + e + "," + e + ",0," + +(l >= Zf) + "," + f + "," + (this._x1 = t + e * Math.cos(i)) + "," + (this._y1 = n + e * Math.sin(i))))
		},
		rect: function(t, n, e, r) {
			this._ += "M" + (this._x0 = this._x1 = +t) + "," + (this._y0 = this._y1 = +n) + "h" + +e + "v" + +r + "h" + -e + "Z"
		},
		toString: function() {
			return this._
		}
	};
	Jt.prototype = Kt.prototype = {
		constructor: Jt,
		has: function(t) {
			return "$" + t in this
		},
		get: function(t) {
			return this["$" + t]
		},
		set: function(t, n) {
			return this["$" + t] = n, this
		},
		remove: function(t) {
			var n = "$" + t;
			return n in this && delete this[n]
		},
		clear: function() {
			for (var t in this) "$" === t[0] && delete this[t]
		},
		keys: function() {
			var t = [];
			for (var n in this) "$" === n[0] && t.push(n.slice(1));
			return t
		},
		values: function() {
			var t = [];
			for (var n in this) "$" === n[0] && t.push(this[n]);
			return t
		},
		entries: function() {
			var t = [];
			for (var n in this) "$" === n[0] && t.push({
				key: n.slice(1),
				value: this[n]
			});
			return t
		},
		size: function() {
			var t = 0;
			for (var n in this) "$" === n[0] && ++t;
			return t
		},
		empty: function() {
			for (var t in this)
				if ("$" === t[0]) return !1;
			return !0
		},
		each: function(t) {
			for (var n in this) "$" === n[0] && t(this[n], n.slice(1), this)
		}
	};
	var Jf = Kt.prototype;
	on.prototype = un.prototype = {
		constructor: on,
		has: Jf.has,
		add: function(t) {
			return t += "", this["$" + t] = t, this
		},
		remove: Jf.remove,
		clear: Jf.clear,
		values: Jf.keys,
		size: Jf.size,
		empty: Jf.empty,
		each: Jf.each
	};
	var Kf = {},
		tl = {},
		nl = 34,
		el = 10,
		rl = 13,
		il = function(t) {
			function n(t, n) {
				function e() {
					if (s) return tl;
					if (f) return f = !1, Kf;
					var n, e, r = a;
					if (t.charCodeAt(r) === nl) {
						for (; a++ < u && t.charCodeAt(a) !== nl || t.charCodeAt(++a) === nl;);
						return (n = a) >= u ? s = !0 : (e = t.charCodeAt(a++)) === el ? f = !0 : e === rl && (f = !0, t.charCodeAt(a) === el && ++a), t.slice(r + 1, n - 1).replace(/""/g, '"')
					}
					for (; a < u;) {
						if ((e = t.charCodeAt(n = a++)) === el) f = !0;
						else if (e === rl) f = !0, t.charCodeAt(a) === el && ++a;
						else if (e !== o) continue;
						return t.slice(r, n)
					}
					return s = !0, t.slice(r, u)
				}
				var r, i = [],
					u = t.length,
					a = 0,
					c = 0,
					s = u <= 0,
					f = !1;
				for (t.charCodeAt(u - 1) === el && --u, t.charCodeAt(u - 1) === rl && --u;
					(r = e()) !== tl;) {
					for (var l = []; r !== Kf && r !== tl;) l.push(r), r = e();
					n && null == (l = n(l, c++)) || i.push(l)
				}
				return i
			}

			function e(n) {
				return n.map(r).join(t)
			}

			function r(t) {
				return null == t ? "" : i.test(t += "") ? '"' + t.replace(/"/g, '""') + '"' : t
			}
			var i = new RegExp('["' + t + "\n\r]"),
				o = t.charCodeAt(0);
			return {
				parse: function(t, e) {
					var r, i, o = n(t, function(t, n) {
						if (r) return r(t, n - 1);
						i = t, r = e ? function(t, n) {
							var e = an(t);
							return function(r, i) {
								return n(e(r), i, t)
							}
						}(t, e) : an(t)
					});
					return o.columns = i || [], o
				},
				parseRows: n,
				format: function(n, e) {
					return null == e && (e = function(t) {
						var n = Object.create(null),
							e = [];
						return t.forEach(function(t) {
							for (var r in t) r in n || e.push(n[r] = r)
						}), e
					}(n)), [e.map(r).join(t)].concat(n.map(function(n) {
						return e.map(function(t) {
							return r(n[t])
						}).join(t)
					})).join("\n")
				},
				formatRows: function(t) {
					return t.map(e).join("\n")
				}
			}
		},
		ol = il(","),
		ul = ol.parse,
		al = ol.parseRows,
		cl = ol.format,
		sl = ol.formatRows,
		fl = il("\t"),
		ll = fl.parse,
		hl = fl.parseRows,
		pl = fl.format,
		dl = fl.formatRows,
		vl = function(t) {
			return function() {
				return t
			}
		},
		gl = function() {
			return 1e-6 * (Math.random() - .5)
		},
		_l = function(t, n, e, r, i) {
			this.node = t, this.x0 = n, this.y0 = e, this.x1 = r, this.y1 = i
		},
		yl = sn.prototype = fn.prototype;
	yl.copy = function() {
		var t, n, e = new fn(this._x, this._y, this._x0, this._y0, this._x1, this._y1),
			r = this._root;
		if (!r) return e;
		if (!r.length) return e._root = ln(r), e;
		for (t = [{
				source: r,
				target: e._root = new Array(4)
			}]; r = t.pop();)
			for (var i = 0; i < 4; ++i)(n = r.source[i]) && (n.length ? t.push({
				source: n,
				target: r.target[i] = new Array(4)
			}) : r.target[i] = ln(n));
		return e
	}, yl.add = function(t) {
		var n = +this._x.call(null, t),
			e = +this._y.call(null, t);
		return cn(this.cover(n, e), n, e, t)
	}, yl.addAll = function(t) {
		var n, e, r, i, o = t.length,
			u = new Array(o),
			a = new Array(o),
			c = 1 / 0,
			s = 1 / 0,
			f = -1 / 0,
			l = -1 / 0;
		for (e = 0; e < o; ++e) isNaN(r = +this._x.call(null, n = t[e])) || isNaN(i = +this._y.call(null, n)) || (u[e] = r, a[e] = i, r < c && (c = r), r > f && (f = r), i < s && (s = i), i > l && (l = i));
		for (f < c && (c = this._x0, f = this._x1), l < s && (s = this._y0, l = this._y1), this.cover(c, s).cover(f, l), e = 0; e < o; ++e) cn(this, u[e], a[e], t[e]);
		return this
	}, yl.cover = function(t, n) {
		if (isNaN(t = +t) || isNaN(n = +n)) return this;
		var e = this._x0,
			r = this._y0,
			i = this._x1,
			o = this._y1;
		if (isNaN(e)) i = (e = Math.floor(t)) + 1, o = (r = Math.floor(n)) + 1;
		else {
			if (!(e > t || t > i || r > n || n > o)) return this;
			var u, a, c = i - e,
				s = this._root;
			switch (a = (n < (r + o) / 2) << 1 | t < (e + i) / 2) {
				case 0:
					do {
						u = new Array(4), u[a] = s, s = u
					} while (c *= 2, i = e + c, o = r + c, t > i || n > o);
					break;
				case 1:
					do {
						u = new Array(4), u[a] = s, s = u
					} while (c *= 2, e = i - c, o = r + c, e > t || n > o);
					break;
				case 2:
					do {
						u = new Array(4), u[a] = s, s = u
					} while (c *= 2, i = e + c, r = o - c, t > i || r > n);
					break;
				case 3:
					do {
						u = new Array(4), u[a] = s, s = u
					} while (c *= 2, e = i - c, r = o - c, e > t || r > n)
			}
			this._root && this._root.length && (this._root = s)
		}
		return this._x0 = e, this._y0 = r, this._x1 = i, this._y1 = o, this
	}, yl.data = function() {
		var t = [];
		return this.visit(function(n) {
			if (!n.length)
				do {
					t.push(n.data)
				} while (n = n.next)
		}), t
	}, yl.extent = function(t) {
		return arguments.length ? this.cover(+t[0][0], +t[0][1]).cover(+t[1][0], +t[1][1]) : isNaN(this._x0) ? void 0 : [
			[this._x0, this._y0],
			[this._x1, this._y1]
		]
	}, yl.find = function(t, n, e) {
		var r, i, o, u, a, c, s, f = this._x0,
			l = this._y0,
			h = this._x1,
			p = this._y1,
			d = [],
			v = this._root;
		for (v && d.push(new _l(v, f, l, h, p)), null == e ? e = 1 / 0 : (f = t - e, l = n - e, h = t + e, p = n + e, e *= e); c = d.pop();)
			if (!(!(v = c.node) || (i = c.x0) > h || (o = c.y0) > p || (u = c.x1) < f || (a = c.y1) < l))
				if (v.length) {
					var g = (i + u) / 2,
						_ = (o + a) / 2;
					d.push(new _l(v[3], g, _, u, a), new _l(v[2], i, _, g, a), new _l(v[1], g, o, u, _), new _l(v[0], i, o, g, _)), (s = (n >= _) << 1 | t >= g) && (c = d[d.length - 1], d[d.length - 1] = d[d.length - 1 - s], d[d.length - 1 - s] = c)
				} else {
					var y = t - +this._x.call(null, v.data),
						m = n - +this._y.call(null, v.data),
						x = y * y + m * m;
					if (x < e) {
						var b = Math.sqrt(e = x);
						f = t - b, l = n - b, h = t + b, p = n + b, r = v.data
					}
				} return r
	}, yl.remove = function(t) {
		if (isNaN(o = +this._x.call(null, t)) || isNaN(u = +this._y.call(null, t))) return this;
		var n, e, r, i, o, u, a, c, s, f, l, h, p = this._root,
			d = this._x0,
			v = this._y0,
			g = this._x1,
			_ = this._y1;
		if (!p) return this;
		if (p.length)
			for (;;) {
				if ((s = o >= (a = (d + g) / 2)) ? d = a : g = a, (f = u >= (c = (v + _) / 2)) ? v = c : _ = c, n = p, !(p = p[l = f << 1 | s])) return this;
				if (!p.length) break;
				(n[l + 1 & 3] || n[l + 2 & 3] || n[l + 3 & 3]) && (e = n, h = l)
			}
		for (; p.data !== t;)
			if (r = p, !(p = p.next)) return this;
		return (i = p.next) && delete p.next, r ? (i ? r.next = i : delete r.next, this) : n ? (i ? n[l] = i : delete n[l], (p = n[0] || n[1] || n[2] || n[3]) && p === (n[3] || n[2] || n[1] || n[0]) && !p.length && (e ? e[h] = p : this._root = p), this) : (this._root = i, this)
	}, yl.removeAll = function(t) {
		for (var n = 0, e = t.length; n < e; ++n) this.remove(t[n]);
		return this
	}, yl.root = function() {
		return this._root
	}, yl.size = function() {
		var t = 0;
		return this.visit(function(n) {
			if (!n.length)
				do {
					++t
				} while (n = n.next)
		}), t
	}, yl.visit = function(t) {
		var n, e, r, i, o, u, a = [],
			c = this._root;
		for (c && a.push(new _l(c, this._x0, this._y0, this._x1, this._y1)); n = a.pop();)
			if (!t(c = n.node, r = n.x0, i = n.y0, o = n.x1, u = n.y1) && c.length) {
				var s = (r + o) / 2,
					f = (i + u) / 2;
				(e = c[3]) && a.push(new _l(e, s, f, o, u)), (e = c[2]) && a.push(new _l(e, r, f, s, u)), (e = c[1]) && a.push(new _l(e, s, i, o, f)), (e = c[0]) && a.push(new _l(e, r, i, s, f))
			} return this
	}, yl.visitAfter = function(t) {
		var n, e = [],
			r = [];
		for (this._root && e.push(new _l(this._root, this._x0, this._y0, this._x1, this._y1)); n = e.pop();) {
			var i = n.node;
			if (i.length) {
				var o, u = n.x0,
					a = n.y0,
					c = n.x1,
					s = n.y1,
					f = (u + c) / 2,
					l = (a + s) / 2;
				(o = i[0]) && e.push(new _l(o, u, a, f, l)), (o = i[1]) && e.push(new _l(o, f, a, c, l)), (o = i[2]) && e.push(new _l(o, u, l, f, s)), (o = i[3]) && e.push(new _l(o, f, l, c, s))
			}
			r.push(n)
		}
		for (; n = r.pop();) t(n.node, n.x0, n.y0, n.x1, n.y1);
		return this
	}, yl.x = function(t) {
		return arguments.length ? (this._x = t, this) : this._x
	}, yl.y = function(t) {
		return arguments.length ? (this._y = t, this) : this._y
	};
	var ml, xl = 10,
		bl = Math.PI * (3 - Math.sqrt(5)),
		wl = function(t, n) {
			if ((e = (t = n ? t.toExponential(n - 1) : t.toExponential()).indexOf("e")) < 0) return null;
			var e, r = t.slice(0, e);
			return [r.length > 1 ? r[0] + r.slice(2) : r, +t.slice(e + 1)]
		},
		Ml = function(t) {
			return (t = wl(Math.abs(t))) ? t[1] : NaN
		},
		Tl = function(t, n) {
			var e = wl(t, n);
			if (!e) return t + "";
			var r = e[0],
				i = e[1];
			return i < 0 ? "0." + new Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + new Array(i - r.length + 2).join("0")
		},
		Nl = {
			"": function(t, n) {
				t: for (var e, r = (t = t.toPrecision(n)).length, i = 1, o = -1; i < r; ++i) switch (t[i]) {
					case ".":
						o = e = i;
						break;
					case "0":
						0 === o && (o = i), e = i;
						break;
					case "e":
						break t;
					default:
						o > 0 && (o = 0)
				}
				return o > 0 ? t.slice(0, o) + t.slice(e + 1) : t
			},
			"%": function(t, n) {
				return (100 * t).toFixed(n)
			},
			b: function(t) {
				return Math.round(t).toString(2)
			},
			c: function(t) {
				return t + ""
			},
			d: function(t) {
				return Math.round(t).toString(10)
			},
			e: function(t, n) {
				return t.toExponential(n)
			},
			f: function(t, n) {
				return t.toFixed(n)
			},
			g: function(t, n) {
				return t.toPrecision(n)
			},
			o: function(t) {
				return Math.round(t).toString(8)
			},
			p: function(t, n) {
				return Tl(100 * t, n)
			},
			r: Tl,
			s: function(t, n) {
				var e = wl(t, n);
				if (!e) return t + "";
				var r = e[0],
					i = e[1],
					o = i - (ml = 3 * Math.max(-8, Math.min(8, Math.floor(i / 3)))) + 1,
					u = r.length;
				return o === u ? r : o > u ? r + new Array(o - u + 1).join("0") : o > 0 ? r.slice(0, o) + "." + r.slice(o) : "0." + new Array(1 - o).join("0") + wl(t, Math.max(0, n + o - 1))[0]
			},
			X: function(t) {
				return Math.round(t).toString(16).toUpperCase()
			},
			x: function(t) {
				return Math.round(t).toString(16)
			}
		},
		kl = /^(?:(.)?([<>=^]))?([+\-\( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?([a-z%])?$/i;
	yn.prototype = mn.prototype, mn.prototype.toString = function() {
		return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (null == this.width ? "" : Math.max(1, 0 | this.width)) + (this.comma ? "," : "") + (null == this.precision ? "" : "." + Math.max(0, 0 | this.precision)) + this.type
	};
	var Sl, El = function(t) {
			return t
		},
		Al = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"],
		Cl = function(t) {
			function n(t) {
				function n(t) {
					var n, r, u, f = g,
						x = _;
					if ("c" === v) x = y(t) + x, t = "";
					else {
						var b = (t = +t) < 0;
						if (t = y(Math.abs(t), d), b && 0 == +t && (b = !1), f = (b ? "(" === s ? s : "-" : "-" === s || "(" === s ? "" : s) + f, x = x + ("s" === v ? Al[8 + ml / 3] : "") + (b && "(" === s ? ")" : ""), m)
							for (n = -1, r = t.length; ++n < r;)
								if (48 > (u = t.charCodeAt(n)) || u > 57) {
									x = (46 === u ? i + t.slice(n + 1) : t.slice(n)) + x, t = t.slice(0, n);
									break
								}
					}
					p && !l && (t = e(t, 1 / 0));
					var w = f.length + t.length + x.length,
						M = w < h ? new Array(h - w + 1).join(a) : "";
					switch (p && l && (t = e(M + t, M.length ? h - x.length : 1 / 0), M = ""), c) {
						case "<":
							t = f + t + x + M;
							break;
						case "=":
							t = f + M + t + x;
							break;
						case "^":
							t = M.slice(0, w = M.length >> 1) + f + t + x + M.slice(w);
							break;
						default:
							t = M + f + t + x
					}
					return o(t)
				}
				var a = (t = yn(t)).fill,
					c = t.align,
					s = t.sign,
					f = t.symbol,
					l = t.zero,
					h = t.width,
					p = t.comma,
					d = t.precision,
					v = t.type,
					g = "$" === f ? r[0] : "#" === f && /[boxX]/.test(v) ? "0" + v.toLowerCase() : "",
					_ = "$" === f ? r[1] : /[%p]/.test(v) ? u : "",
					y = Nl[v],
					m = !v || /[defgprs%]/.test(v);
				return d = null == d ? v ? 6 : 12 : /[gprs]/.test(v) ? Math.max(1, Math.min(21, d)) : Math.max(0, Math.min(20, d)), n.toString = function() {
					return t + ""
				}, n
			}
			var e = t.grouping && t.thousands ? function(t, n) {
					return function(e, r) {
						for (var i = e.length, o = [], u = 0, a = t[0], c = 0; i > 0 && a > 0 && (c + a + 1 > r && (a = Math.max(1, r - c)), o.push(e.substring(i -= a, i + a)), !((c += a + 1) > r));) a = t[u = (u + 1) % t.length];
						return o.reverse().join(n)
					}
				}(t.grouping, t.thousands) : El,
				r = t.currency,
				i = t.decimal,
				o = t.numerals ? function(t) {
					return function(n) {
						return n.replace(/[0-9]/g, function(n) {
							return t[+n]
						})
					}
				}(t.numerals) : El,
				u = t.percent || "%";
			return {
				format: n,
				formatPrefix: function(t, e) {
					var r = n((t = yn(t), t.type = "f", t)),
						i = 3 * Math.max(-8, Math.min(8, Math.floor(Ml(e) / 3))),
						o = Math.pow(10, -i),
						u = Al[8 + i / 3];
					return function(t) {
						return r(o * t) + u
					}
				}
			}
		};
	xn({
		decimal: ".",
		thousands: ",",
		grouping: [3],
		currency: ["$", ""]
	});
	var zl = function(t) {
			return Math.max(0, -Ml(Math.abs(t)))
		},
		Pl = function(t, n) {
			return Math.max(0, 3 * Math.max(-8, Math.min(8, Math.floor(Ml(n) / 3))) - Ml(Math.abs(t)))
		},
		Rl = function(t, n) {
			return t = Math.abs(t), n = Math.abs(n) - t, Math.max(0, Ml(n) - Ml(t)) + 1
		},
		Ll = function() {
			return new bn
		};
	bn.prototype = {
		constructor: bn,
		reset: function() {
			this.s = this.t = 0
		},
		add: function(t) {
			wn(hh, t, this.t), wn(this, hh.s, this.s), this.s ? this.t += hh.t : this.s = hh.t
		},
		valueOf: function() {
			return this.s
		}
	};
	var ql, Dl, Ul, Ol, Fl, Il, Yl, Bl, Hl, jl, Xl, Vl, $l, Wl, Zl, Gl, Ql, Jl, Kl, th, nh, eh, rh, ih, oh, uh, ah, ch, sh, fh, lh, hh = new bn,
		ph = 1e-6,
		dh = Math.PI,
		vh = dh / 2,
		gh = dh / 4,
		_h = 2 * dh,
		yh = 180 / dh,
		mh = dh / 180,
		xh = Math.abs,
		bh = Math.atan,
		wh = Math.atan2,
		Mh = Math.cos,
		Th = Math.ceil,
		Nh = Math.exp,
		kh = Math.log,
		Sh = Math.pow,
		Eh = Math.sin,
		Ah = Math.sign || function(t) {
			return t > 0 ? 1 : t < 0 ? -1 : 0
		},
		Ch = Math.sqrt,
		zh = Math.tan,
		Ph = {
			Feature: function(t, n) {
				Sn(t.geometry, n)
			},
			FeatureCollection: function(t, n) {
				for (var e = t.features, r = -1, i = e.length; ++r < i;) Sn(e[r].geometry, n)
			}
		},
		Rh = {
			Sphere: function(t, n) {
				n.sphere()
			},
			Point: function(t, n) {
				t = t.coordinates, n.point(t[0], t[1], t[2])
			},
			MultiPoint: function(t, n) {
				for (var e = t.coordinates, r = -1, i = e.length; ++r < i;) t = e[r], n.point(t[0], t[1], t[2])
			},
			LineString: function(t, n) {
				En(t.coordinates, n, 0)
			},
			MultiLineString: function(t, n) {
				for (var e = t.coordinates, r = -1, i = e.length; ++r < i;) En(e[r], n, 0)
			},
			Polygon: function(t, n) {
				An(t.coordinates, n)
			},
			MultiPolygon: function(t, n) {
				for (var e = t.coordinates, r = -1, i = e.length; ++r < i;) An(e[r], n)
			},
			GeometryCollection: function(t, n) {
				for (var e = t.geometries, r = -1, i = e.length; ++r < i;) Sn(e[r], n)
			}
		},
		Lh = function(t, n) {
			t && Ph.hasOwnProperty(t.type) ? Ph[t.type](t, n) : Sn(t, n)
		},
		qh = Ll(),
		Dh = Ll(),
		Uh = {
			point: kn,
			lineStart: kn,
			lineEnd: kn,
			polygonStart: function() {
				qh.reset(), Uh.lineStart = Cn, Uh.lineEnd = zn
			},
			polygonEnd: function() {
				var t = +qh;
				Dh.add(t < 0 ? _h + t : t), this.lineStart = this.lineEnd = this.point = kn
			},
			sphere: function() {
				Dh.add(_h)
			}
		},
		Oh = Ll(),
		Fh = {
			point: Yn,
			lineStart: Hn,
			lineEnd: jn,
			polygonStart: function() {
				Fh.point = Xn, Fh.lineStart = Vn, Fh.lineEnd = $n, Oh.reset(), Uh.polygonStart()
			},
			polygonEnd: function() {
				Uh.polygonEnd(), Fh.point = Yn, Fh.lineStart = Hn, Fh.lineEnd = jn, qh < 0 ? (Il = -(Bl = 180), Yl = -(Hl = 90)) : Oh > ph ? Hl = 90 : Oh < -ph && (Yl = -90), Zl[0] = Il, Zl[1] = Bl
			}
		},
		Ih = {
			sphere: kn,
			point: Qn,
			lineStart: Kn,
			lineEnd: ee,
			polygonStart: function() {
				Ih.lineStart = re, Ih.lineEnd = ie
			},
			polygonEnd: function() {
				Ih.lineStart = Kn, Ih.lineEnd = ee
			}
		},
		Yh = function(t) {
			return function() {
				return t
			}
		},
		Bh = function(t, n) {
			function e(e, r) {
				return e = t(e, r), n(e[0], e[1])
			}
			return t.invert && n.invert && (e.invert = function(e, r) {
				return (e = n.invert(e, r)) && t.invert(e[0], e[1])
			}), e
		};
	ae.invert = ae;
	var Hh, jh, Xh, Vh, $h, Wh, Zh, Gh, Qh, Jh, Kh, tp = function(t) {
			function n(n) {
				return n = t(n[0] * mh, n[1] * mh), n[0] *= yh, n[1] *= yh, n
			}
			return t = ce(t[0] * mh, t[1] * mh, t.length > 2 ? t[2] * mh : 0), n.invert = function(n) {
				return n = t.invert(n[0] * mh, n[1] * mh), n[0] *= yh, n[1] *= yh, n
			}, n
		},
		np = function() {
			var t, n = [];
			return {
				point: function(n, e) {
					t.push([n, e])
				},
				lineStart: function() {
					n.push(t = [])
				},
				lineEnd: kn,
				rejoin: function() {
					n.length > 1 && n.push(n.pop().concat(n.shift()))
				},
				result: function() {
					var e = n;
					return n = [], t = null, e
				}
			}
		},
		ep = function(t, n) {
			return xh(t[0] - n[0]) < ph && xh(t[1] - n[1]) < ph
		},
		rp = function(t, n, e, r, i) {
			var o, u, a = [],
				c = [];
			if (t.forEach(function(t) {
					if (!((n = t.length - 1) <= 0)) {
						var n, e, r = t[0],
							u = t[n];
						if (ep(r, u)) {
							for (i.lineStart(), o = 0; o < n; ++o) i.point((r = t[o])[0], r[1]);
							i.lineEnd()
						} else a.push(e = new de(r, t, null, !0)), c.push(e.o = new de(r, null, e, !1)), a.push(e = new de(u, t, null, !1)), c.push(e.o = new de(u, null, e, !0))
					}
				}), a.length) {
				for (c.sort(n), ve(a), ve(c), o = 0, u = c.length; o < u; ++o) c[o].e = e = !e;
				for (var s, f, l = a[0];;) {
					for (var h = l, p = !0; h.v;)
						if ((h = h.n) === l) return;
					s = h.z, i.lineStart();
					do {
						if (h.v = h.o.v = !0, h.e) {
							if (p)
								for (o = 0, u = s.length; o < u; ++o) i.point((f = s[o])[0], f[1]);
							else r(h.x, h.n.x, 1, i);
							h = h.n
						} else {
							if (p)
								for (s = h.p.z, o = s.length - 1; o >= 0; --o) i.point((f = s[o])[0], f[1]);
							else r(h.x, h.p.x, -1, i);
							h = h.p
						}
						s = (h = h.o).z, p = !p
					} while (!h.v);
					i.lineEnd()
				}
			}
		},
		ip = Ll(),
		op = function(t, n) {
			var e = n[0],
				r = n[1],
				i = [Eh(e), -Mh(e), 0],
				o = 0,
				u = 0;
			ip.reset();
			for (var a = 0, c = t.length; a < c; ++a)
				if (f = (s = t[a]).length)
					for (var s, f, l = s[f - 1], h = l[0], p = l[1] / 2 + gh, d = Eh(p), v = Mh(p), g = 0; g < f; ++g, h = y, d = x, v = b, l = _) {
						var _ = s[g],
							y = _[0],
							m = _[1] / 2 + gh,
							x = Eh(m),
							b = Mh(m),
							w = y - h,
							M = w >= 0 ? 1 : -1,
							T = M * w,
							N = T > dh,
							k = d * x;
						if (ip.add(wh(k * M * Eh(T), v * b + k * Mh(T))), o += N ? w + M * _h : w, N ^ h >= e ^ y >= e) {
							var S = Un(qn(l), qn(_));
							In(S);
							var E = Un(i, S);
							In(E);
							var A = (N ^ w >= 0 ? -1 : 1) * Tn(E[2]);
							(r > A || r === A && (S[0] || S[1])) && (u += N ^ w >= 0 ? 1 : -1)
						}
					}
			return (o < -ph || o < ph && ip < -ph) ^ 1 & u
		},
		up = function(t, n, e, r) {
			return function(i) {
				function o(n, e) {
					t(n, e) && i.point(n, e)
				}

				function u(t, n) {
					v.point(t, n)
				}

				function a() {
					m.point = u, v.lineStart()
				}

				function c() {
					m.point = o, v.lineEnd()
				}

				function s(t, n) {
					d.push([t, n]), _.point(t, n)
				}

				function f() {
					_.lineStart(), d = []
				}

				function l() {
					s(d[0][0], d[0][1]), _.lineEnd();
					var t, n, e, r, o = _.clean(),
						u = g.result(),
						a = u.length;
					if (d.pop(), h.push(d), d = null, a)
						if (1 & o) {
							if (e = u[0], (n = e.length - 1) > 0) {
								for (y || (i.polygonStart(), y = !0), i.lineStart(), t = 0; t < n; ++t) i.point((r = e[t])[0], r[1]);
								i.lineEnd()
							}
						} else a > 1 && 2 & o && u.push(u.pop().concat(u.shift())), p.push(u.filter(ge))
				}
				var h, p, d, v = n(i),
					g = np(),
					_ = n(g),
					y = !1,
					m = {
						point: o,
						lineStart: a,
						lineEnd: c,
						polygonStart: function() {
							m.point = s, m.lineStart = f, m.lineEnd = l, p = [], h = []
						},
						polygonEnd: function() {
							m.point = o, m.lineStart = a, m.lineEnd = c, p = Fa(p);
							var t = op(h, r);
							p.length ? (y || (i.polygonStart(), y = !0), rp(p, _e, t, e, i)) : t && (y || (i.polygonStart(), y = !0), i.lineStart(), e(null, null, 1, i), i.lineEnd()), y && (i.polygonEnd(), y = !1), p = h = null
						},
						sphere: function() {
							i.polygonStart(), i.lineStart(), e(null, null, 1, i), i.lineEnd(), i.polygonEnd()
						}
					};
				return m
			}
		},
		ap = up(function() {
			return !0
		}, function(t) {
			var n, e = NaN,
				r = NaN,
				i = NaN;
			return {
				lineStart: function() {
					t.lineStart(), n = 1
				},
				point: function(o, u) {
					var a = o > 0 ? dh : -dh,
						c = xh(o - e);
					xh(c - dh) < ph ? (t.point(e, r = (r + u) / 2 > 0 ? vh : -vh), t.point(i, r), t.lineEnd(), t.lineStart(), t.point(a, r), t.point(o, r), n = 0) : i !== a && c >= dh && (xh(e - i) < ph && (e -= i * ph), xh(o - a) < ph && (o -= a * ph), r = function(t, n, e, r) {
						var i, o, u = Eh(t - e);
						return xh(u) > ph ? bh((Eh(n) * (o = Mh(r)) * Eh(e) - Eh(r) * (i = Mh(n)) * Eh(t)) / (i * o * u)) : (n + r) / 2
					}(e, r, o, u), t.point(i, r), t.lineEnd(), t.lineStart(), t.point(a, r), n = 0), t.point(e = o, r = u), i = a
				},
				lineEnd: function() {
					t.lineEnd(), e = r = NaN
				},
				clean: function() {
					return 2 - n
				}
			}
		}, function(t, n, e, r) {
			var i;
			if (null == t) i = e * vh, r.point(-dh, i), r.point(0, i), r.point(dh, i), r.point(dh, 0), r.point(dh, -i), r.point(0, -i), r.point(-dh, -i), r.point(-dh, 0), r.point(-dh, i);
			else if (xh(t[0] - n[0]) > ph) {
				var o = t[0] < n[0] ? dh : -dh;
				i = e * o / 2, r.point(-o, i), r.point(0, i), r.point(o, i)
			} else r.point(n[0], n[1])
		}, [-dh, -vh]),
		cp = function(t) {
			function n(t, n) {
				return Mh(t) * Mh(n) > i
			}

			function e(t, n, e) {
				var r = [1, 0, 0],
					o = Un(qn(t), qn(n)),
					u = Dn(o, o),
					a = o[0],
					c = u - a * a;
				if (!c) return !e && t;
				var s = i * u / c,
					f = -i * a / c,
					l = Un(r, o),
					h = Fn(r, s);
				On(h, Fn(o, f));
				var p = l,
					d = Dn(h, p),
					v = Dn(p, p),
					g = d * d - v * (Dn(h, h) - 1);
				if (!(g < 0)) {
					var _ = Ch(g),
						y = Fn(p, (-d - _) / v);
					if (On(y, h), y = Ln(y), !e) return y;
					var m, x = t[0],
						b = n[0],
						w = t[1],
						M = n[1];
					b < x && (m = x, x = b, b = m);
					var T = b - x,
						N = xh(T - dh) < ph;
					if (!N && M < w && (m = w, w = M, M = m), N || T < ph ? N ? w + M > 0 ^ y[1] < (xh(y[0] - x) < ph ? w : M) : w <= y[1] && y[1] <= M : T > dh ^ (x <= y[0] && y[0] <= b)) {
						var k = Fn(p, (-d + _) / v);
						return On(k, h), [y, Ln(k)]
					}
				}
			}

			function r(n, e) {
				var r = u ? t : dh - t,
					i = 0;
				return n < -r ? i |= 1 : n > r && (i |= 2), e < -r ? i |= 4 : e > r && (i |= 8), i
			}
			var i = Mh(t),
				o = 6 * mh,
				u = i > 0,
				a = xh(i) > ph;
			return up(n, function(t) {
				var i, o, c, s, f;
				return {
					lineStart: function() {
						s = c = !1, f = 1
					},
					point: function(l, h) {
						var p, d = [l, h],
							v = n(l, h),
							g = u ? v ? 0 : r(l, h) : v ? r(l + (l < 0 ? dh : -dh), h) : 0;
						if (!i && (s = c = v) && t.lineStart(), v !== c && (!(p = e(i, d)) || ep(i, p) || ep(d, p)) && (d[0] += ph, d[1] += ph, v = n(d[0], d[1])), v !== c) f = 0, v ? (t.lineStart(), p = e(d, i), t.point(p[0], p[1])) : (p = e(i, d), t.point(p[0], p[1]), t.lineEnd()), i = p;
						else if (a && i && u ^ v) {
							var _;
							g & o || !(_ = e(d, i, !0)) || (f = 0, u ? (t.lineStart(), t.point(_[0][0], _[0][1]), t.point(_[1][0], _[1][1]), t.lineEnd()) : (t.point(_[1][0], _[1][1]), t.lineEnd(), t.lineStart(), t.point(_[0][0], _[0][1])))
						}!v || i && ep(i, d) || t.point(d[0], d[1]), i = d, c = v, o = g
					},
					lineEnd: function() {
						c && t.lineEnd(), i = null
					},
					clean: function() {
						return f | (s && c) << 1
					}
				}
			}, function(n, e, r, i) {
				he(i, t, o, r, n, e)
			}, u ? [0, -t] : [-dh, t - dh])
		},
		sp = function(t, n, e, r, i, o) {
			var u, a = t[0],
				c = t[1],
				s = 0,
				f = 1,
				l = n[0] - a,
				h = n[1] - c;
			if (u = e - a, l || !(u > 0)) {
				if (u /= l, l < 0) {
					if (u < s) return;
					u < f && (f = u)
				} else if (l > 0) {
					if (u > f) return;
					u > s && (s = u)
				}
				if (u = i - a, l || !(u < 0)) {
					if (u /= l, l < 0) {
						if (u > f) return;
						u > s && (s = u)
					} else if (l > 0) {
						if (u < s) return;
						u < f && (f = u)
					}
					if (u = r - c, h || !(u > 0)) {
						if (u /= h, h < 0) {
							if (u < s) return;
							u < f && (f = u)
						} else if (h > 0) {
							if (u > f) return;
							u > s && (s = u)
						}
						if (u = o - c, h || !(u < 0)) {
							if (u /= h, h < 0) {
								if (u > f) return;
								u > s && (s = u)
							} else if (h > 0) {
								if (u < s) return;
								u < f && (f = u)
							}
							return s > 0 && (t[0] = a + s * l, t[1] = c + s * h), f < 1 && (n[0] = a + f * l, n[1] = c + f * h), !0
						}
					}
				}
			}
		},
		fp = 1e9,
		lp = -fp,
		hp = Ll(),
		pp = {
			sphere: kn,
			point: kn,
			lineStart: function() {
				pp.point = xe, pp.lineEnd = me
			},
			lineEnd: kn,
			polygonStart: kn,
			polygonEnd: kn
		},
		dp = function(t) {
			return hp.reset(), Lh(t, pp), +hp
		},
		vp = [null, null],
		gp = {
			type: "LineString",
			coordinates: vp
		},
		_p = function(t, n) {
			return vp[0] = t, vp[1] = n, dp(gp)
		},
		yp = {
			Feature: function(t, n) {
				return we(t.geometry, n)
			},
			FeatureCollection: function(t, n) {
				for (var e = t.features, r = -1, i = e.length; ++r < i;)
					if (we(e[r].geometry, n)) return !0;
				return !1
			}
		},
		mp = {
			Sphere: function() {
				return !0
			},
			Point: function(t, n) {
				return Me(t.coordinates, n)
			},
			MultiPoint: function(t, n) {
				for (var e = t.coordinates, r = -1, i = e.length; ++r < i;)
					if (Me(e[r], n)) return !0;
				return !1
			},
			LineString: function(t, n) {
				return Te(t.coordinates, n)
			},
			MultiLineString: function(t, n) {
				for (var e = t.coordinates, r = -1, i = e.length; ++r < i;)
					if (Te(e[r], n)) return !0;
				return !1
			},
			Polygon: function(t, n) {
				return Ne(t.coordinates, n)
			},
			MultiPolygon: function(t, n) {
				for (var e = t.coordinates, r = -1, i = e.length; ++r < i;)
					if (Ne(e[r], n)) return !0;
				return !1
			},
			GeometryCollection: function(t, n) {
				for (var e = t.geometries, r = -1, i = e.length; ++r < i;)
					if (we(e[r], n)) return !0;
				return !1
			}
		},
		xp = function(t) {
			return t
		},
		bp = Ll(),
		wp = Ll(),
		Mp = {
			point: kn,
			lineStart: kn,
			lineEnd: kn,
			polygonStart: function() {
				Mp.lineStart = ze, Mp.lineEnd = Le
			},
			polygonEnd: function() {
				Mp.lineStart = Mp.lineEnd = Mp.point = kn, bp.add(xh(wp)), wp.reset()
			},
			result: function() {
				var t = bp / 2;
				return bp.reset(), t
			}
		},
		Tp = 1 / 0,
		Np = Tp,
		kp = -Tp,
		Sp = kp,
		Ep = {
			point: function(t, n) {
				t < Tp && (Tp = t), t > kp && (kp = t), n < Np && (Np = n), n > Sp && (Sp = n)
			},
			lineStart: kn,
			lineEnd: kn,
			polygonStart: kn,
			polygonEnd: kn,
			result: function() {
				var t = [
					[Tp, Np],
					[kp, Sp]
				];
				return kp = Sp = -(Np = Tp = 1 / 0), t
			}
		},
		Ap = 0,
		Cp = 0,
		zp = 0,
		Pp = 0,
		Rp = 0,
		Lp = 0,
		qp = 0,
		Dp = 0,
		Up = 0,
		Op = {
			point: qe,
			lineStart: De,
			lineEnd: Fe,
			polygonStart: function() {
				Op.lineStart = Ie, Op.lineEnd = Ye
			},
			polygonEnd: function() {
				Op.point = qe, Op.lineStart = De, Op.lineEnd = Fe
			},
			result: function() {
				var t = Up ? [qp / Up, Dp / Up] : Lp ? [Pp / Lp, Rp / Lp] : zp ? [Ap / zp, Cp / zp] : [NaN, NaN];
				return Ap = Cp = zp = Pp = Rp = Lp = qp = Dp = Up = 0, t
			}
		};
	je.prototype = {
		_radius: 4.5,
		pointRadius: function(t) {
			return this._radius = t, this
		},
		polygonStart: function() {
			this._line = 0
		},
		polygonEnd: function() {
			this._line = NaN
		},
		lineStart: function() {
			this._point = 0
		},
		lineEnd: function() {
			0 === this._line && this._context.closePath(), this._point = NaN
		},
		point: function(t, n) {
			switch (this._point) {
				case 0:
					this._context.moveTo(t, n), this._point = 1;
					break;
				case 1:
					this._context.lineTo(t, n);
					break;
				default:
					this._context.moveTo(t + this._radius, n), this._context.arc(t, n, this._radius, 0, _h)
			}
		},
		result: kn
	};
	var Fp, Ip, Yp, Bp, Hp, jp = Ll(),
		Xp = {
			point: kn,
			lineStart: function() {
				Xp.point = Xe
			},
			lineEnd: function() {
				Fp && Ve(Ip, Yp), Xp.point = kn
			},
			polygonStart: function() {
				Fp = !0
			},
			polygonEnd: function() {
				Fp = null
			},
			result: function() {
				var t = +jp;
				return jp.reset(), t
			}
		};
	$e.prototype = {
		_radius: 4.5,
		_circle: We(4.5),
		pointRadius: function(t) {
			return (t = +t) !== this._radius && (this._radius = t, this._circle = null), this
		},
		polygonStart: function() {
			this._line = 0
		},
		polygonEnd: function() {
			this._line = NaN
		},
		lineStart: function() {
			this._point = 0
		},
		lineEnd: function() {
			0 === this._line && this._string.push("Z"), this._point = NaN
		},
		point: function(t, n) {
			switch (this._point) {
				case 0:
					this._string.push("M", t, ",", n), this._point = 1;
					break;
				case 1:
					this._string.push("L", t, ",", n);
					break;
				default:
					null == this._circle && (this._circle = We(this._radius)), this._string.push("M", t, ",", n, this._circle)
			}
		},
		result: function() {
			if (this._string.length) {
				var t = this._string.join("");
				return this._string = [], t
			}
			return null
		}
	};
	Ge.prototype = {
		constructor: Ge,
		point: function(t, n) {
			this.stream.point(t, n)
		},
		sphere: function() {
			this.stream.sphere()
		},
		lineStart: function() {
			this.stream.lineStart()
		},
		lineEnd: function() {
			this.stream.lineEnd()
		},
		polygonStart: function() {
			this.stream.polygonStart()
		},
		polygonEnd: function() {
			this.stream.polygonEnd()
		}
	};
	var Vp = 16,
		$p = Mh(30 * mh),
		Wp = function(t, n) {
			return +n ? function(t, n) {
				function e(r, i, o, u, a, c, s, f, l, h, p, d, v, g) {
					var _ = s - r,
						y = f - i,
						m = _ * _ + y * y;
					if (m > 4 * n && v--) {
						var x = u + h,
							b = a + p,
							w = c + d,
							M = Ch(x * x + b * b + w * w),
							T = Tn(w /= M),
							N = xh(xh(w) - 1) < ph || xh(o - l) < ph ? (o + l) / 2 : wh(b, x),
							k = t(N, T),
							S = k[0],
							E = k[1],
							A = S - r,
							C = E - i,
							z = y * A - _ * C;
						(z * z / m > n || xh((_ * A + y * C) / m - .5) > .3 || u * h + a * p + c * d < $p) && (e(r, i, o, u, a, c, S, E, N, x /= M, b /= M, w, v, g), g.point(S, E), e(S, E, N, x, b, w, s, f, l, h, p, d, v, g))
					}
				}
				return function(n) {
					function r(e, r) {
						e = t(e, r), n.point(e[0], e[1])
					}

					function i() {
						_ = NaN, w.point = o, n.lineStart()
					}

					function o(r, i) {
						var o = qn([r, i]),
							u = t(r, i);
						e(_, y, g, m, x, b, _ = u[0], y = u[1], g = r, m = o[0], x = o[1], b = o[2], Vp, n), n.point(_, y)
					}

					function u() {
						w.point = r, n.lineEnd()
					}

					function a() {
						i(), w.point = c, w.lineEnd = s
					}

					function c(t, n) {
						o(f = t, n), l = _, h = y, p = m, d = x, v = b, w.point = o
					}

					function s() {
						e(_, y, g, m, x, b, l, h, f, p, d, v, Vp, n), w.lineEnd = u, u()
					}
					var f, l, h, p, d, v, g, _, y, m, x, b, w = {
						point: r,
						lineStart: i,
						lineEnd: u,
						polygonStart: function() {
							n.polygonStart(), w.lineStart = a
						},
						polygonEnd: function() {
							n.polygonEnd(), w.lineStart = i
						}
					};
					return w
				}
			}(t, n) : function(t) {
				return Ze({
					point: function(n, e) {
						n = t(n, e), this.stream.point(n[0], n[1])
					}
				})
			}(t)
		},
		Zp = Ze({
			point: function(t, n) {
				this.stream.point(t * mh, n * mh)
			}
		}),
		Gp = function() {
			return ir(or).scale(155.424).center([0, 33.6442])
		},
		Qp = function() {
			return Gp().parallels([29.5, 45.5]).scale(1070).translate([480, 250]).rotate([96, 0]).center([-.6, 38.7])
		},
		Jp = ur(function(t) {
			return Ch(2 / (1 + t))
		});
	Jp.invert = ar(function(t) {
		return 2 * Tn(t / 2)
	});
	var Kp = ur(function(t) {
		return (t = Mn(t)) && t / Eh(t)
	});
	Kp.invert = ar(function(t) {
		return t
	});
	cr.invert = function(t, n) {
		return [t, 2 * bh(Nh(n)) - vh]
	};
	hr.invert = hr;
	dr.invert = ar(bh);
	gr.invert = function(t, n) {
		var e, r = n,
			i = 25;
		do {
			var o = r * r,
				u = o * o;
			r -= e = (r * (1.007226 + o * (.015085 + u * (.028874 * o - .044475 - .005916 * u))) - n) / (1.007226 + o * (.045255 + u * (.259866 * o - .311325 - .005916 * 11 * u)))
		} while (xh(e) > ph && --i > 0);
		return [t / (.8707 + (o = r * r) * (o * (o * o * o * (.003971 - .001529 * o) - .013791) - .131979)), r]
	};
	_r.invert = ar(Tn);
	yr.invert = ar(function(t) {
		return 2 * bh(t)
	});
	mr.invert = function(t, n) {
		return [-n, 2 * bh(Nh(t)) - vh]
	};
	Er.prototype = Tr.prototype = {
		constructor: Er,
		count: function() {
			return this.eachAfter(Mr)
		},
		each: function(t) {
			var n, e, r, i, o = this,
				u = [o];
			do {
				for (n = u.reverse(), u = []; o = n.pop();)
					if (t(o), e = o.children)
						for (r = 0, i = e.length; r < i; ++r) u.push(e[r])
			} while (u.length);
			return this
		},
		eachAfter: function(t) {
			for (var n, e, r, i = this, o = [i], u = []; i = o.pop();)
				if (u.push(i), n = i.children)
					for (e = 0, r = n.length; e < r; ++e) o.push(n[e]);
			for (; i = u.pop();) t(i);
			return this
		},
		eachBefore: function(t) {
			for (var n, e, r = this, i = [r]; r = i.pop();)
				if (t(r), n = r.children)
					for (e = n.length - 1; e >= 0; --e) i.push(n[e]);
			return this
		},
		sum: function(t) {
			return this.eachAfter(function(n) {
				for (var e = +t(n.data) || 0, r = n.children, i = r && r.length; --i >= 0;) e += r[i].value;
				n.value = e
			})
		},
		sort: function(t) {
			return this.eachBefore(function(n) {
				n.children && n.children.sort(t)
			})
		},
		path: function(t) {
			for (var n = this, e = function(t, n) {
					if (t === n) return t;
					var e = t.ancestors(),
						r = n.ancestors(),
						i = null;
					for (t = e.pop(), n = r.pop(); t === n;) i = t, t = e.pop(), n = r.pop();
					return i
				}(n, t), r = [n]; n !== e;) n = n.parent, r.push(n);
			for (var i = r.length; t !== e;) r.splice(i, 0, t), t = t.parent;
			return r
		},
		ancestors: function() {
			for (var t = this, n = [t]; t = t.parent;) n.push(t);
			return n
		},
		descendants: function() {
			var t = [];
			return this.each(function(n) {
				t.push(n)
			}), t
		},
		leaves: function() {
			var t = [];
			return this.eachBefore(function(n) {
				n.children || t.push(n)
			}), t
		},
		links: function() {
			var t = this,
				n = [];
			return t.each(function(e) {
				e !== t && n.push({
					source: e.parent,
					target: e
				})
			}), n
		},
		copy: function() {
			return Tr(this).eachBefore(kr)
		}
	};
	var td = Array.prototype.slice,
		nd = function(t) {
			for (var n, e, r = 0, i = (t = function(t) {
					for (var n, e, r = t.length; r;) e = Math.random() * r-- | 0, n = t[r], t[r] = t[e], t[e] = n;
					return t
				}(td.call(t))).length, o = []; r < i;) n = t[r], e && Cr(e, n) ? ++r : (e = function(t) {
				switch (t.length) {
					case 1:
						return function(t) {
							return {
								x: t.x,
								y: t.y,
								r: t.r
							}
						}(t[0]);
					case 2:
						return Pr(t[0], t[1]);
					case 3:
						return Rr(t[0], t[1], t[2])
				}
			}(o = function(t, n) {
				var e, r;
				if (zr(n, t)) return [n];
				for (e = 0; e < t.length; ++e)
					if (Ar(n, t[e]) && zr(Pr(t[e], n), t)) return [t[e], n];
				for (e = 0; e < t.length - 1; ++e)
					for (r = e + 1; r < t.length; ++r)
						if (Ar(Pr(t[e], t[r]), n) && Ar(Pr(t[e], n), t[r]) && Ar(Pr(t[r], n), t[e]) && zr(Rr(t[e], t[r], n), t)) return [t[e], t[r], n];
				throw new Error
			}(o, n)), r = 0);
			return e
		},
		ed = function(t) {
			return function() {
				return t
			}
		},
		rd = function(t) {
			t.x0 = Math.round(t.x0), t.y0 = Math.round(t.y0), t.x1 = Math.round(t.x1), t.y1 = Math.round(t.y1)
		},
		id = function(t, n, e, r, i) {
			for (var o, u = t.children, a = -1, c = u.length, s = t.value && (r - n) / t.value; ++a < c;)(o = u[a]).y0 = e, o.y1 = i, o.x0 = n, o.x1 = n += o.value * s
		},
		od = "$",
		ud = {
			depth: -1
		},
		ad = {};
	Jr.prototype = Object.create(Er.prototype);
	var cd = function(t, n, e, r, i) {
			for (var o, u = t.children, a = -1, c = u.length, s = t.value && (i - e) / t.value; ++a < c;)(o = u[a]).x0 = n, o.x1 = r, o.y0 = e, o.y1 = e += o.value * s
		},
		sd = (1 + Math.sqrt(5)) / 2,
		fd = function t(n) {
			function e(t, e, r, i, o) {
				Kr(n, t, e, r, i, o)
			}
			return e.ratio = function(n) {
				return t((n = +n) > 1 ? n : 1)
			}, e
		}(sd),
		ld = function t(n) {
			function e(t, e, r, i, o) {
				if ((u = t._squarify) && u.ratio === n)
					for (var u, a, c, s, f, l = -1, h = u.length, p = t.value; ++l < h;) {
						for (c = (a = u[l]).children, s = a.value = 0, f = c.length; s < f; ++s) a.value += c[s].value;
						a.dice ? id(a, e, r, i, r += (o - r) * a.value / p) : cd(a, e, r, e += (i - e) * a.value / p, o), p -= a.value
					} else t._squarify = u = Kr(n, t, e, r, i, o), u.ratio = n
			}
			return e.ratio = function(n) {
				return t((n = +n) > 1 ? n : 1)
			}, e
		}(sd),
		hd = function(t, n, e) {
			return (n[0] - t[0]) * (e[1] - t[1]) - (n[1] - t[1]) * (e[0] - t[0])
		},
		pd = [].slice,
		dd = {};
	ei.prototype = ui.prototype = {
		constructor: ei,
		defer: function(t) {
			if ("function" != typeof t) throw new Error("invalid callback");
			if (this._call) throw new Error("defer after await");
			if (null != this._error) return this;
			var n = pd.call(arguments, 1);
			return n.push(t), ++this._waiting, this._tasks.push(n), ri(this), this
		},
		abort: function() {
			return null == this._error && ii(this, new Error("abort")), this
		},
		await: function(t) {
			if ("function" != typeof t) throw new Error("invalid callback");
			if (this._call) throw new Error("multiple await");
			return this._call = function(n, e) {
				t.apply(null, [n].concat(e))
			}, oi(this), this
		},
		awaitAll: function(t) {
			if ("function" != typeof t) throw new Error("invalid callback");
			if (this._call) throw new Error("multiple await");
			return this._call = t, oi(this), this
		}
	};
	var vd = function() {
			return Math.random()
		},
		gd = function t(n) {
			function e(t, e) {
				return t = null == t ? 0 : +t, e = null == e ? 1 : +e, 1 === arguments.length ? (e = t, t = 0) : e -= t,
					function() {
						return n() * e + t
					}
			}
			return e.source = t, e
		}(vd),
		_d = function t(n) {
			function e(t, e) {
				var r, i;
				return t = null == t ? 0 : +t, e = null == e ? 1 : +e,
					function() {
						var o;
						if (null != r) o = r, r = null;
						else
							do {
								r = 2 * n() - 1, o = 2 * n() - 1, i = r * r + o * o
							} while (!i || i > 1);
						return t + e * o * Math.sqrt(-2 * Math.log(i) / i)
					}
			}
			return e.source = t, e
		}(vd),
		yd = function t(n) {
			function e() {
				var t = _d.source(n).apply(this, arguments);
				return function() {
					return Math.exp(t())
				}
			}
			return e.source = t, e
		}(vd),
		md = function t(n) {
			function e(t) {
				return function() {
					for (var e = 0, r = 0; r < t; ++r) e += n();
					return e
				}
			}
			return e.source = t, e
		}(vd),
		xd = function t(n) {
			function e(t) {
				var e = md.source(n)(t);
				return function() {
					return e() / t
				}
			}
			return e.source = t, e
		}(vd),
		bd = function t(n) {
			function e(t) {
				return function() {
					return -Math.log(1 - n()) / t
				}
			}
			return e.source = t, e
		}(vd),
		wd = function(t, n) {
			function e(t) {
				var n, e = f.status;
				if (!e && function(t) {
						var n = t.responseType;
						return n && "text" !== n ? t.response : t.responseText
					}(f) || e >= 200 && e < 300 || 304 === e) {
					if (o) try {
						n = o.call(r, f)
					} catch (t) {
						return void c.call("error", r, t)
					} else n = f;
					c.call("load", r, n)
				} else c.call("error", r, t)
			}
			var r, i, o, u, c = a("beforesend", "progress", "load", "error"),
				s = Kt(),
				f = new XMLHttpRequest,
				l = null,
				h = null,
				p = 0;
			if ("undefined" == typeof XDomainRequest || "withCredentials" in f || !/^(http(s)?:)?\/\//.test(t) || (f = new XDomainRequest), "onload" in f ? f.onload = f.onerror = f.ontimeout = e : f.onreadystatechange = function(t) {
					f.readyState > 3 && e(t)
				}, f.onprogress = function(t) {
					c.call("progress", r, t)
				}, r = {
					header: function(t, n) {
						return t = (t + "").toLowerCase(), arguments.length < 2 ? s.get(t) : (null == n ? s.remove(t) : s.set(t, n + ""), r)
					},
					mimeType: function(t) {
						return arguments.length ? (i = null == t ? null : t + "", r) : i
					},
					responseType: function(t) {
						return arguments.length ? (u = t, r) : u
					},
					timeout: function(t) {
						return arguments.length ? (p = +t, r) : p
					},
					user: function(t) {
						return arguments.length < 1 ? l : (l = null == t ? null : t + "", r)
					},
					password: function(t) {
						return arguments.length < 1 ? h : (h = null == t ? null : t + "", r)
					},
					response: function(t) {
						return o = t, r
					},
					get: function(t, n) {
						return r.send("GET", t, n)
					},
					post: function(t, n) {
						return r.send("POST", t, n)
					},
					send: function(n, e, o) {
						return f.open(n, t, !0, l, h), null == i || s.has("accept") || s.set("accept", i + ",*/*"), f.setRequestHeader && s.each(function(t, n) {
							f.setRequestHeader(n, t)
						}), null != i && f.overrideMimeType && f.overrideMimeType(i), null != u && (f.responseType = u), p > 0 && (f.timeout = p), null == o && "function" == typeof e && (o = e, e = null), null != o && 1 === o.length && (o = function(t) {
							return function(n, e) {
								t(null == n ? e : null)
							}
						}(o)), null != o && r.on("error", o).on("load", function(t) {
							o(null, t)
						}), c.call("beforesend", r, f), f.send(null == e ? null : e), r
					},
					abort: function() {
						return f.abort(), r
					},
					on: function() {
						var t = c.on.apply(c, arguments);
						return t === c ? r : t
					}
				}, null != n) {
				if ("function" != typeof n) throw new Error("invalid callback: " + n);
				return r.get(n)
			}
			return r
		},
		Md = function(t, n) {
			return function(e, r) {
				var i = wd(e).mimeType(t).response(n);
				if (null != r) {
					if ("function" != typeof r) throw new Error("invalid callback: " + r);
					return i.get(r)
				}
				return i
			}
		},
		Td = Md("text/html", function(t) {
			return document.createRange().createContextualFragment(t.responseText)
		}),
		Nd = Md("application/json", function(t) {
			return JSON.parse(t.responseText)
		}),
		kd = Md("text/plain", function(t) {
			return t.responseText
		}),
		Sd = Md("application/xml", function(t) {
			var n = t.responseXML;
			if (!n) throw new Error("parse error");
			return n
		}),
		Ed = function(t, n) {
			return function(e, r, i) {
				arguments.length < 3 && (i = r, r = null);
				var o = wd(e).mimeType(t);
				return o.row = function(t) {
					return arguments.length ? o.response(function(t, n) {
						return function(e) {
							return t(e.responseText, n)
						}
					}(n, r = t)) : r
				}, o.row(r), i ? o.get(i) : o
			}
		},
		Ad = Ed("text/csv", ul),
		Cd = Ed("text/tab-separated-values", ll),
		zd = Array.prototype,
		Pd = zd.map,
		Rd = zd.slice,
		Ld = {
			name: "implicit"
		},
		qd = function(t) {
			return function() {
				return t
			}
		},
		Dd = function(t) {
			return +t
		},
		Ud = [0, 1],
		Od = function(n, e, i) {
			var o, u = n[0],
				a = n[n.length - 1],
				c = r(u, a, null == e ? 10 : e);
			switch ((i = yn(null == i ? ",f" : i)).type) {
				case "s":
					var s = Math.max(Math.abs(u), Math.abs(a));
					return null != i.precision || isNaN(o = Pl(c, s)) || (i.precision = o), t.formatPrefix(i, s);
				case "":
				case "e":
				case "g":
				case "p":
				case "r":
					null != i.precision || isNaN(o = Rl(c, Math.max(Math.abs(u), Math.abs(a)))) || (i.precision = o - ("e" === i.type));
					break;
				case "f":
				case "%":
					null != i.precision || isNaN(o = zl(c)) || (i.precision = o - 2 * ("%" === i.type))
			}
			return t.format(i)
		},
		Fd = function(t, n) {
			var e, r = 0,
				i = (t = t.slice()).length - 1,
				o = t[r],
				u = t[i];
			return u < o && (e = r, r = i, i = e, e = o, o = u, u = e), t[r] = n.floor(o), t[i] = n.ceil(u), t
		},
		Id = new Date,
		Yd = new Date,
		Bd = Si(function() {}, function(t, n) {
			t.setTime(+t + n)
		}, function(t, n) {
			return n - t
		});
	Bd.every = function(t) {
		return t = Math.floor(t), isFinite(t) && t > 0 ? t > 1 ? Si(function(n) {
			n.setTime(Math.floor(n / t) * t)
		}, function(n, e) {
			n.setTime(+n + e * t)
		}, function(n, e) {
			return (e - n) / t
		}) : Bd : null
	};
	var Hd = Bd.range,
		jd = 6e4,
		Xd = 6048e5,
		Vd = Si(function(t) {
			t.setTime(1e3 * Math.floor(t / 1e3))
		}, function(t, n) {
			t.setTime(+t + 1e3 * n)
		}, function(t, n) {
			return (n - t) / 1e3
		}, function(t) {
			return t.getUTCSeconds()
		}),
		$d = Vd.range,
		Wd = Si(function(t) {
			t.setTime(Math.floor(t / jd) * jd)
		}, function(t, n) {
			t.setTime(+t + n * jd)
		}, function(t, n) {
			return (n - t) / jd
		}, function(t) {
			return t.getMinutes()
		}),
		Zd = Wd.range,
		Gd = Si(function(t) {
			var n = t.getTimezoneOffset() * jd % 36e5;
			n < 0 && (n += 36e5), t.setTime(36e5 * Math.floor((+t - n) / 36e5) + n)
		}, function(t, n) {
			t.setTime(+t + 36e5 * n)
		}, function(t, n) {
			return (n - t) / 36e5
		}, function(t) {
			return t.getHours()
		}),
		Qd = Gd.range,
		Jd = Si(function(t) {
			t.setHours(0, 0, 0, 0)
		}, function(t, n) {
			t.setDate(t.getDate() + n)
		}, function(t, n) {
			return (n - t - (n.getTimezoneOffset() - t.getTimezoneOffset()) * jd) / 864e5
		}, function(t) {
			return t.getDate() - 1
		}),
		Kd = Jd.range,
		tv = Ei(0),
		nv = Ei(1),
		ev = Ei(2),
		rv = Ei(3),
		iv = Ei(4),
		ov = Ei(5),
		uv = Ei(6),
		av = tv.range,
		cv = nv.range,
		sv = ev.range,
		fv = rv.range,
		lv = iv.range,
		hv = ov.range,
		pv = uv.range,
		dv = Si(function(t) {
			t.setDate(1), t.setHours(0, 0, 0, 0)
		}, function(t, n) {
			t.setMonth(t.getMonth() + n)
		}, function(t, n) {
			return n.getMonth() - t.getMonth() + 12 * (n.getFullYear() - t.getFullYear())
		}, function(t) {
			return t.getMonth()
		}),
		vv = dv.range,
		gv = Si(function(t) {
			t.setMonth(0, 1), t.setHours(0, 0, 0, 0)
		}, function(t, n) {
			t.setFullYear(t.getFullYear() + n)
		}, function(t, n) {
			return n.getFullYear() - t.getFullYear()
		}, function(t) {
			return t.getFullYear()
		});
	gv.every = function(t) {
		return isFinite(t = Math.floor(t)) && t > 0 ? Si(function(n) {
			n.setFullYear(Math.floor(n.getFullYear() / t) * t), n.setMonth(0, 1), n.setHours(0, 0, 0, 0)
		}, function(n, e) {
			n.setFullYear(n.getFullYear() + e * t)
		}) : null
	};
	var _v = gv.range,
		yv = Si(function(t) {
			t.setUTCSeconds(0, 0)
		}, function(t, n) {
			t.setTime(+t + n * jd)
		}, function(t, n) {
			return (n - t) / jd
		}, function(t) {
			return t.getUTCMinutes()
		}),
		mv = yv.range,
		xv = Si(function(t) {
			t.setUTCMinutes(0, 0, 0)
		}, function(t, n) {
			t.setTime(+t + 36e5 * n)
		}, function(t, n) {
			return (n - t) / 36e5
		}, function(t) {
			return t.getUTCHours()
		}),
		bv = xv.range,
		wv = Si(function(t) {
			t.setUTCHours(0, 0, 0, 0)
		}, function(t, n) {
			t.setUTCDate(t.getUTCDate() + n)
		}, function(t, n) {
			return (n - t) / 864e5
		}, function(t) {
			return t.getUTCDate() - 1
		}),
		Mv = wv.range,
		Tv = Ai(0),
		Nv = Ai(1),
		kv = Ai(2),
		Sv = Ai(3),
		Ev = Ai(4),
		Av = Ai(5),
		Cv = Ai(6),
		zv = Tv.range,
		Pv = Nv.range,
		Rv = kv.range,
		Lv = Sv.range,
		qv = Ev.range,
		Dv = Av.range,
		Uv = Cv.range,
		Ov = Si(function(t) {
			t.setUTCDate(1), t.setUTCHours(0, 0, 0, 0)
		}, function(t, n) {
			t.setUTCMonth(t.getUTCMonth() + n)
		}, function(t, n) {
			return n.getUTCMonth() - t.getUTCMonth() + 12 * (n.getUTCFullYear() - t.getUTCFullYear())
		}, function(t) {
			return t.getUTCMonth()
		}),
		Fv = Ov.range,
		Iv = Si(function(t) {
			t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0)
		}, function(t, n) {
			t.setUTCFullYear(t.getUTCFullYear() + n)
		}, function(t, n) {
			return n.getUTCFullYear() - t.getUTCFullYear()
		}, function(t) {
			return t.getUTCFullYear()
		});
	Iv.every = function(t) {
		return isFinite(t = Math.floor(t)) && t > 0 ? Si(function(n) {
			n.setUTCFullYear(Math.floor(n.getUTCFullYear() / t) * t), n.setUTCMonth(0, 1), n.setUTCHours(0, 0, 0, 0)
		}, function(n, e) {
			n.setUTCFullYear(n.getUTCFullYear() + e * t)
		}) : null
	};
	var Yv, Bv = Iv.range,
		Hv = {
			"-": "",
			_: " ",
			0: "0"
		},
		jv = /^\s*\d+/,
		Xv = /^%/,
		Vv = /[\\^$*+?|[\]().{}]/g;
	Yo({
		dateTime: "%x, %X",
		date: "%-m/%-d/%Y",
		time: "%-I:%M:%S %p",
		periods: ["AM", "PM"],
		days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	});
	var $v = Date.prototype.toISOString ? function(t) {
			return t.toISOString()
		} : t.utcFormat("%Y-%m-%dT%H:%M:%S.%LZ"),
		Wv = +new Date("2000-01-01T00:00:00.000Z") ? function(t) {
			var n = new Date(t);
			return isNaN(n) ? null : n
		} : t.utcParse("%Y-%m-%dT%H:%M:%S.%LZ"),
		Zv = 1e3,
		Gv = 60 * Zv,
		Qv = 60 * Gv,
		Jv = 24 * Qv,
		Kv = 7 * Jv,
		tg = 30 * Jv,
		ng = 365 * Jv,
		eg = function(t) {
			return t.match(/.{6}/g).map(function(t) {
				return "#" + t
			})
		},
		rg = eg("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf"),
		ig = eg("393b795254a36b6ecf9c9ede6379398ca252b5cf6bcedb9c8c6d31bd9e39e7ba52e7cb94843c39ad494ad6616be7969c7b4173a55194ce6dbdde9ed6"),
		og = eg("3182bd6baed69ecae1c6dbefe6550dfd8d3cfdae6bfdd0a231a35474c476a1d99bc7e9c0756bb19e9ac8bcbddcdadaeb636363969696bdbdbdd9d9d9"),
		ug = eg("1f77b4aec7e8ff7f0effbb782ca02c98df8ad62728ff98969467bdc5b0d58c564bc49c94e377c2f7b6d27f7f7fc7c7c7bcbd22dbdb8d17becf9edae5"),
		ag = As(rt(300, .5, 0), rt(-240, .5, 1)),
		cg = As(rt(-100, .75, .35), rt(80, 1.5, .8)),
		sg = As(rt(260, .75, .35), rt(80, 1.5, .8)),
		fg = rt(),
		lg = Xo(eg("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725")),
		hg = Xo(eg("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf")),
		pg = Xo(eg("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4")),
		dg = Xo(eg("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921")),
		vg = function(t) {
			return function() {
				return t
			}
		},
		gg = Math.abs,
		_g = Math.atan2,
		yg = Math.cos,
		mg = Math.max,
		xg = Math.min,
		bg = Math.sin,
		wg = Math.sqrt,
		Mg = 1e-12,
		Tg = Math.PI,
		Ng = Tg / 2,
		kg = 2 * Tg;
	tu.prototype = {
		areaStart: function() {
			this._line = 0
		},
		areaEnd: function() {
			this._line = NaN
		},
		lineStart: function() {
			this._point = 0
		},
		lineEnd: function() {
			(this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line = 1 - this._line
		},
		point: function(t, n) {
			switch (t = +t, n = +n, this._point) {
				case 0:
					this._point = 1, this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
					break;
				case 1:
					this._point = 2;
				default:
					this._context.lineTo(t, n)
			}
		}
	};
	var Sg = function(t) {
			return new tu(t)
		},
		Eg = function() {
			function t(t) {
				var a, c, s, f = t.length,
					l = !1;
				for (null == i && (u = o(s = Vt())), a = 0; a <= f; ++a) !(a < f && r(c = t[a], a, t)) === l && ((l = !l) ? u.lineStart() : u.lineEnd()), l && u.point(+n(c, a, t), +e(c, a, t));
				if (s) return u = null, s + "" || null
			}
			var n = nu,
				e = eu,
				r = vg(!0),
				i = null,
				o = Sg,
				u = null;
			return t.x = function(e) {
				return arguments.length ? (n = "function" == typeof e ? e : vg(+e), t) : n
			}, t.y = function(n) {
				return arguments.length ? (e = "function" == typeof n ? n : vg(+n), t) : e
			}, t.defined = function(n) {
				return arguments.length ? (r = "function" == typeof n ? n : vg(!!n), t) : r
			}, t.curve = function(n) {
				return arguments.length ? (o = n, null != i && (u = o(i)), t) : o
			}, t.context = function(n) {
				return arguments.length ? (null == n ? i = u = null : u = o(i = n), t) : i
			}, t
		},
		Ag = function() {
			function t(t) {
				var n, f, l, h, p, d = t.length,
					v = !1,
					g = new Array(d),
					_ = new Array(d);
				for (null == a && (s = c(p = Vt())), n = 0; n <= d; ++n) {
					if (!(n < d && u(h = t[n], n, t)) === v)
						if (v = !v) f = n, s.areaStart(), s.lineStart();
						else {
							for (s.lineEnd(), s.lineStart(), l = n - 1; l >= f; --l) s.point(g[l], _[l]);
							s.lineEnd(), s.areaEnd()
						} v && (g[n] = +e(h, n, t), _[n] = +i(h, n, t), s.point(r ? +r(h, n, t) : g[n], o ? +o(h, n, t) : _[n]))
				}
				if (p) return s = null, p + "" || null
			}

			function n() {
				return Eg().defined(u).curve(c).context(a)
			}
			var e = nu,
				r = null,
				i = vg(0),
				o = eu,
				u = vg(!0),
				a = null,
				c = Sg,
				s = null;
			return t.x = function(n) {
				return arguments.length ? (e = "function" == typeof n ? n : vg(+n), r = null, t) : e
			}, t.x0 = function(n) {
				return arguments.length ? (e = "function" == typeof n ? n : vg(+n), t) : e
			}, t.x1 = function(n) {
				return arguments.length ? (r = null == n ? null : "function" == typeof n ? n : vg(+n), t) : r
			}, t.y = function(n) {
				return arguments.length ? (i = "function" == typeof n ? n : vg(+n), o = null, t) : i
			}, t.y0 = function(n) {
				return arguments.length ? (i = "function" == typeof n ? n : vg(+n), t) : i
			}, t.y1 = function(n) {
				return arguments.length ? (o = null == n ? null : "function" == typeof n ? n : vg(+n), t) : o
			}, t.lineX0 = t.lineY0 = function() {
				return n().x(e).y(i)
			}, t.lineY1 = function() {
				return n().x(e).y(o)
			}, t.lineX1 = function() {
				return n().x(r).y(i)
			}, t.defined = function(n) {
				return arguments.length ? (u = "function" == typeof n ? n : vg(!!n), t) : u
			}, t.curve = function(n) {
				return arguments.length ? (c = n, null != a && (s = c(a)), t) : c
			}, t.context = function(n) {
				return arguments.length ? (null == n ? a = s = null : s = c(a = n), t) : a
			}, t
		},
		Cg = function(t, n) {
			return n < t ? -1 : n > t ? 1 : n >= t ? 0 : NaN
		},
		zg = function(t) {
			return t
		},
		Pg = iu(Sg);
	ru.prototype = {
		areaStart: function() {
			this._curve.areaStart()
		},
		areaEnd: function() {
			this._curve.areaEnd()
		},
		lineStart: function() {
			this._curve.lineStart()
		},
		lineEnd: function() {
			this._curve.lineEnd()
		},
		point: function(t, n) {
			this._curve.point(n * Math.sin(t), n * -Math.cos(t))
		}
	};
	var Rg = function() {
			return ou(Eg().curve(Pg))
		},
		Lg = function() {
			var t = Ag().curve(Pg),
				n = t.curve,
				e = t.lineX0,
				r = t.lineX1,
				i = t.lineY0,
				o = t.lineY1;
			return t.angle = t.x, delete t.x, t.startAngle = t.x0, delete t.x0, t.endAngle = t.x1, delete t.x1, t.radius = t.y, delete t.y, t.innerRadius = t.y0, delete t.y0, t.outerRadius = t.y1, delete t.y1, t.lineStartAngle = function() {
				return ou(e())
			}, delete t.lineX0, t.lineEndAngle = function() {
				return ou(r())
			}, delete t.lineX1, t.lineInnerRadius = function() {
				return ou(i())
			}, delete t.lineY0, t.lineOuterRadius = function() {
				return ou(o())
			}, delete t.lineY1, t.curve = function(t) {
				return arguments.length ? n(iu(t)) : n()._curve
			}, t
		},
		qg = function(t, n) {
			return [(n = +n) * Math.cos(t -= Math.PI / 2), n * Math.sin(t)]
		},
		Dg = Array.prototype.slice,
		Ug = {
			draw: function(t, n) {
				var e = Math.sqrt(n / Tg);
				t.moveTo(e, 0), t.arc(0, 0, e, 0, kg)
			}
		},
		Og = {
			draw: function(t, n) {
				var e = Math.sqrt(n / 5) / 2;
				t.moveTo(-3 * e, -e), t.lineTo(-e, -e), t.lineTo(-e, -3 * e), t.lineTo(e, -3 * e), t.lineTo(e, -e), t.lineTo(3 * e, -e), t.lineTo(3 * e, e), t.lineTo(e, e), t.lineTo(e, 3 * e), t.lineTo(-e, 3 * e), t.lineTo(-e, e), t.lineTo(-3 * e, e), t.closePath()
			}
		},
		Fg = Math.sqrt(1 / 3),
		Ig = 2 * Fg,
		Yg = {
			draw: function(t, n) {
				var e = Math.sqrt(n / Ig),
					r = e * Fg;
				t.moveTo(0, -e), t.lineTo(r, 0), t.lineTo(0, e), t.lineTo(-r, 0), t.closePath()
			}
		},
		Bg = Math.sin(Tg / 10) / Math.sin(7 * Tg / 10),
		Hg = Math.sin(kg / 10) * Bg,
		jg = -Math.cos(kg / 10) * Bg,
		Xg = {
			draw: function(t, n) {
				var e = Math.sqrt(.8908130915292852 * n),
					r = Hg * e,
					i = jg * e;
				t.moveTo(0, -e), t.lineTo(r, i);
				for (var o = 1; o < 5; ++o) {
					var u = kg * o / 5,
						a = Math.cos(u),
						c = Math.sin(u);
					t.lineTo(c * e, -a * e), t.lineTo(a * r - c * i, c * r + a * i)
				}
				t.closePath()
			}
		},
		Vg = {
			draw: function(t, n) {
				var e = Math.sqrt(n),
					r = -e / 2;
				t.rect(r, r, e, e)
			}
		},
		$g = Math.sqrt(3),
		Wg = {
			draw: function(t, n) {
				var e = -Math.sqrt(n / (3 * $g));
				t.moveTo(0, 2 * e), t.lineTo(-$g * e, -e), t.lineTo($g * e, -e), t.closePath()
			}
		},
		Zg = -.5,
		Gg = Math.sqrt(3) / 2,
		Qg = 1 / Math.sqrt(12),
		Jg = 3 * (Qg / 2 + 1),
		Kg = {
			draw: function(t, n) {
				var e = Math.sqrt(n / Jg),
					r = e / 2,
					i = e * Qg,
					o = r,
					u = e * Qg + e,
					a = -o,
					c = u;
				t.moveTo(r, i), t.lineTo(o, u), t.lineTo(a, c), t.lineTo(Zg * r - Gg * i, Gg * r + Zg * i), t.lineTo(Zg * o - Gg * u, Gg * o + Zg * u), t.lineTo(Zg * a - Gg * c, Gg * a + Zg * c), t.lineTo(Zg * r + Gg * i, Zg * i - Gg * r), t.lineTo(Zg * o + Gg * u, Zg * u - Gg * o), t.lineTo(Zg * a + Gg * c, Zg * c - Gg * a), t.closePath()
			}
		},
		t_ = [Ug, Og, Yg, Vg, Xg, Wg, Kg],
		n_ = function() {};
	pu.prototype = {
		areaStart: function() {
			this._line = 0
		},
		areaEnd: function() {
			this._line = NaN
		},
		lineStart: function() {
			this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0
		},
		lineEnd: function() {
			switch (this._point) {
				case 3:
					hu(this, this._x1, this._y1);
				case 2:
					this._context.lineTo(this._x1, this._y1)
			}(this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line = 1 - this._line
		},
		point: function(t, n) {
			switch (t = +t, n = +n, this._point) {
				case 0:
					this._point = 1, this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
					break;
				case 1:
					this._point = 2;
					break;
				case 2:
					this._point = 3, this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
				default:
					hu(this, t, n)
			}
			this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = n
		}
	};
	du.prototype = {
		areaStart: n_,
		areaEnd: n_,
		lineStart: function() {
			this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN, this._point = 0
		},
		lineEnd: function() {
			switch (this._point) {
				case 1:
					this._context.moveTo(this._x2, this._y2), this._context.closePath();
					break;
				case 2:
					this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3), this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3), this._context.closePath();
					break;
				case 3:
					this.point(this._x2, this._y2), this.point(this._x3, this._y3), this.point(this._x4, this._y4)
			}
		},
		point: function(t, n) {
			switch (t = +t, n = +n, this._point) {
				case 0:
					this._point = 1, this._x2 = t, this._y2 = n;
					break;
				case 1:
					this._point = 2, this._x3 = t, this._y3 = n;
					break;
				case 2:
					this._point = 3, this._x4 = t, this._y4 = n, this._context.moveTo((this._x0 + 4 * this._x1 + t) / 6, (this._y0 + 4 * this._y1 + n) / 6);
					break;
				default:
					hu(this, t, n)
			}
			this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = n
		}
	};
	vu.prototype = {
		areaStart: function() {
			this._line = 0
		},
		areaEnd: function() {
			this._line = NaN
		},
		lineStart: function() {
			this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0
		},
		lineEnd: function() {
			(this._line || 0 !== this._line && 3 === this._point) && this._context.closePath(), this._line = 1 - this._line
		},
		point: function(t, n) {
			switch (t = +t, n = +n, this._point) {
				case 0:
					this._point = 1;
					break;
				case 1:
					this._point = 2;
					break;
				case 2:
					this._point = 3;
					var e = (this._x0 + 4 * this._x1 + t) / 6,
						r = (this._y0 + 4 * this._y1 + n) / 6;
					this._line ? this._context.lineTo(e, r) : this._context.moveTo(e, r);
					break;
				case 3:
					this._point = 4;
				default:
					hu(this, t, n)
			}
			this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = n
		}
	};
	gu.prototype = {
		lineStart: function() {
			this._x = [], this._y = [], this._basis.lineStart()
		},
		lineEnd: function() {
			var t = this._x,
				n = this._y,
				e = t.length - 1;
			if (e > 0)
				for (var r, i = t[0], o = n[0], u = t[e] - i, a = n[e] - o, c = -1; ++c <= e;) r = c / e, this._basis.point(this._beta * t[c] + (1 - this._beta) * (i + r * u), this._beta * n[c] + (1 - this._beta) * (o + r * a));
			this._x = this._y = null, this._basis.lineEnd()
		},
		point: function(t, n) {
			this._x.push(+t), this._y.push(+n)
		}
	};
	var e_ = function t(n) {
		function e(t) {
			return 1 === n ? new pu(t) : new gu(t, n)
		}
		return e.beta = function(n) {
			return t(+n)
		}, e
	}(.85);
	yu.prototype = {
		areaStart: function() {
			this._line = 0
		},
		areaEnd: function() {
			this._line = NaN
		},
		lineStart: function() {
			this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._point = 0
		},
		lineEnd: function() {
			switch (this._point) {
				case 2:
					this._context.lineTo(this._x2, this._y2);
					break;
				case 3:
					_u(this, this._x1, this._y1)
			}(this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line = 1 - this._line
		},
		point: function(t, n) {
			switch (t = +t, n = +n, this._point) {
				case 0:
					this._point = 1, this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
					break;
				case 1:
					this._point = 2, this._x1 = t, this._y1 = n;
					break;
				case 2:
					this._point = 3;
				default:
					_u(this, t, n)
			}
			this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = n
		}
	};
	var r_ = function t(n) {
		function e(t) {
			return new yu(t, n)
		}
		return e.tension = function(n) {
			return t(+n)
		}, e
	}(0);
	mu.prototype = {
		areaStart: n_,
		areaEnd: n_,
		lineStart: function() {
			this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN, this._point = 0
		},
		lineEnd: function() {
			switch (this._point) {
				case 1:
					this._context.moveTo(this._x3, this._y3), this._context.closePath();
					break;
				case 2:
					this._context.lineTo(this._x3, this._y3), this._context.closePath();
					break;
				case 3:
					this.point(this._x3, this._y3), this.point(this._x4, this._y4), this.point(this._x5, this._y5)
			}
		},
		point: function(t, n) {
			switch (t = +t, n = +n, this._point) {
				case 0:
					this._point = 1, this._x3 = t, this._y3 = n;
					break;
				case 1:
					this._point = 2, this._context.moveTo(this._x4 = t, this._y4 = n);
					break;
				case 2:
					this._point = 3, this._x5 = t, this._y5 = n;
					break;
				default:
					_u(this, t, n)
			}
			this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = n
		}
	};
	var i_ = function t(n) {
		function e(t) {
			return new mu(t, n)
		}
		return e.tension = function(n) {
			return t(+n)
		}, e
	}(0);
	xu.prototype = {
		areaStart: function() {
			this._line = 0
		},
		areaEnd: function() {
			this._line = NaN
		},
		lineStart: function() {
			this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._point = 0
		},
		lineEnd: function() {
			(this._line || 0 !== this._line && 3 === this._point) && this._context.closePath(), this._line = 1 - this._line
		},
		point: function(t, n) {
			switch (t = +t, n = +n, this._point) {
				case 0:
					this._point = 1;
					break;
				case 1:
					this._point = 2;
					break;
				case 2:
					this._point = 3, this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
					break;
				case 3:
					this._point = 4;
				default:
					_u(this, t, n)
			}
			this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = n
		}
	};
	var o_ = function t(n) {
		function e(t) {
			return new xu(t, n)
		}
		return e.tension = function(n) {
			return t(+n)
		}, e
	}(0);
	wu.prototype = {
		areaStart: function() {
			this._line = 0
		},
		areaEnd: function() {
			this._line = NaN
		},
		lineStart: function() {
			this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0
		},
		lineEnd: function() {
			switch (this._point) {
				case 2:
					this._context.lineTo(this._x2, this._y2);
					break;
				case 3:
					this.point(this._x2, this._y2)
			}(this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line = 1 - this._line
		},
		point: function(t, n) {
			if (t = +t, n = +n, this._point) {
				var e = this._x2 - t,
					r = this._y2 - n;
				this._l23_a = Math.sqrt(this._l23_2a = Math.pow(e * e + r * r, this._alpha))
			}
			switch (this._point) {
				case 0:
					this._point = 1, this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
					break;
				case 1:
					this._point = 2;
					break;
				case 2:
					this._point = 3;
				default:
					bu(this, t, n)
			}
			this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = n
		}
	};
	var u_ = function t(n) {
		function e(t) {
			return n ? new wu(t, n) : new yu(t, 0)
		}
		return e.alpha = function(n) {
			return t(+n)
		}, e
	}(.5);
	Mu.prototype = {
		areaStart: n_,
		areaEnd: n_,
		lineStart: function() {
			this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0
		},
		lineEnd: function() {
			switch (this._point) {
				case 1:
					this._context.moveTo(this._x3, this._y3), this._context.closePath();
					break;
				case 2:
					this._context.lineTo(this._x3, this._y3), this._context.closePath();
					break;
				case 3:
					this.point(this._x3, this._y3), this.point(this._x4, this._y4), this.point(this._x5, this._y5)
			}
		},
		point: function(t, n) {
			if (t = +t, n = +n, this._point) {
				var e = this._x2 - t,
					r = this._y2 - n;
				this._l23_a = Math.sqrt(this._l23_2a = Math.pow(e * e + r * r, this._alpha))
			}
			switch (this._point) {
				case 0:
					this._point = 1, this._x3 = t, this._y3 = n;
					break;
				case 1:
					this._point = 2, this._context.moveTo(this._x4 = t, this._y4 = n);
					break;
				case 2:
					this._point = 3, this._x5 = t, this._y5 = n;
					break;
				default:
					bu(this, t, n)
			}
			this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = n
		}
	};
	var a_ = function t(n) {
		function e(t) {
			return n ? new Mu(t, n) : new mu(t, 0)
		}
		return e.alpha = function(n) {
			return t(+n)
		}, e
	}(.5);
	Tu.prototype = {
		areaStart: function() {
			this._line = 0
		},
		areaEnd: function() {
			this._line = NaN
		},
		lineStart: function() {
			this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0
		},
		lineEnd: function() {
			(this._line || 0 !== this._line && 3 === this._point) && this._context.closePath(), this._line = 1 - this._line
		},
		point: function(t, n) {
			if (t = +t, n = +n, this._point) {
				var e = this._x2 - t,
					r = this._y2 - n;
				this._l23_a = Math.sqrt(this._l23_2a = Math.pow(e * e + r * r, this._alpha))
			}
			switch (this._point) {
				case 0:
					this._point = 1;
					break;
				case 1:
					this._point = 2;
					break;
				case 2:
					this._point = 3, this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
					break;
				case 3:
					this._point = 4;
				default:
					bu(this, t, n)
			}
			this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this._y2 = n
		}
	};
	var c_ = function t(n) {
		function e(t) {
			return n ? new Tu(t, n) : new xu(t, 0)
		}
		return e.alpha = function(n) {
			return t(+n)
		}, e
	}(.5);
	Nu.prototype = {
		areaStart: n_,
		areaEnd: n_,
		lineStart: function() {
			this._point = 0
		},
		lineEnd: function() {
			this._point && this._context.closePath()
		},
		point: function(t, n) {
			t = +t, n = +n, this._point ? this._context.lineTo(t, n) : (this._point = 1, this._context.moveTo(t, n))
		}
	};
	Cu.prototype = {
		areaStart: function() {
			this._line = 0
		},
		areaEnd: function() {
			this._line = NaN
		},
		lineStart: function() {
			this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN, this._point = 0
		},
		lineEnd: function() {
			switch (this._point) {
				case 2:
					this._context.lineTo(this._x1, this._y1);
					break;
				case 3:
					Au(this, this._t0, Eu(this, this._t0))
			}(this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line = 1 - this._line
		},
		point: function(t, n) {
			var e = NaN;
			if (t = +t, n = +n, t !== this._x1 || n !== this._y1) {
				switch (this._point) {
					case 0:
						this._point = 1, this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
						break;
					case 1:
						this._point = 2;
						break;
					case 2:
						this._point = 3, Au(this, Eu(this, e = Su(this, t, n)), e);
						break;
					default:
						Au(this, this._t0, e = Su(this, t, n))
				}
				this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = n, this._t0 = e
			}
		}
	}, (zu.prototype = Object.create(Cu.prototype)).point = function(t, n) {
		Cu.prototype.point.call(this, n, t)
	}, Pu.prototype = {
		moveTo: function(t, n) {
			this._context.moveTo(n, t)
		},
		closePath: function() {
			this._context.closePath()
		},
		lineTo: function(t, n) {
			this._context.lineTo(n, t)
		},
		bezierCurveTo: function(t, n, e, r, i, o) {
			this._context.bezierCurveTo(n, t, r, e, o, i)
		}
	}, Ru.prototype = {
		areaStart: function() {
			this._line = 0
		},
		areaEnd: function() {
			this._line = NaN
		},
		lineStart: function() {
			this._x = [], this._y = []
		},
		lineEnd: function() {
			var t = this._x,
				n = this._y,
				e = t.length;
			if (e)
				if (this._line ? this._context.lineTo(t[0], n[0]) : this._context.moveTo(t[0], n[0]), 2 === e) this._context.lineTo(t[1], n[1]);
				else
					for (var r = Lu(t), i = Lu(n), o = 0, u = 1; u < e; ++o, ++u) this._context.bezierCurveTo(r[0][o], i[0][o], r[1][o], i[1][o], t[u], n[u]);
			(this._line || 0 !== this._line && 1 === e) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null
		},
		point: function(t, n) {
			this._x.push(+t), this._y.push(+n)
		}
	};
	qu.prototype = {
		areaStart: function() {
			this._line = 0
		},
		areaEnd: function() {
			this._line = NaN
		},
		lineStart: function() {
			this._x = this._y = NaN, this._point = 0
		},
		lineEnd: function() {
			0 < this._t && this._t < 1 && 2 === this._point && this._context.lineTo(this._x, this._y), (this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line >= 0 && (this._t = 1 - this._t, this._line = 1 - this._line)
		},
		point: function(t, n) {
			switch (t = +t, n = +n, this._point) {
				case 0:
					this._point = 1, this._line ? this._context.lineTo(t, n) : this._context.moveTo(t, n);
					break;
				case 1:
					this._point = 2;
				default:
					if (this._t <= 0) this._context.lineTo(this._x, n), this._context.lineTo(t, n);
					else {
						var e = this._x * (1 - this._t) + t * this._t;
						this._context.lineTo(e, this._y), this._context.lineTo(e, n)
					}
			}
			this._x = t, this._y = n
		}
	};
	var s_ = function(t, n) {
			if ((i = t.length) > 1)
				for (var e, r, i, o = 1, u = t[n[0]], a = u.length; o < i; ++o)
					for (r = u, u = t[n[o]], e = 0; e < a; ++e) u[e][1] += u[e][0] = isNaN(r[e][1]) ? r[e][0] : r[e][1]
		},
		f_ = function(t) {
			for (var n = t.length, e = new Array(n); --n >= 0;) e[n] = n;
			return e
		},
		l_ = function(t) {
			var n = t.map(Uu);
			return f_(t).sort(function(t, e) {
				return n[t] - n[e]
			})
		},
		h_ = function(t) {
			return function() {
				return t
			}
		};
	Iu.prototype = {
		constructor: Iu,
		insert: function(t, n) {
			var e, r, i;
			if (t) {
				if (n.P = t, n.N = t.N, t.N && (t.N.P = n), t.N = n, t.R) {
					for (t = t.R; t.L;) t = t.L;
					t.L = n
				} else t.R = n;
				e = t
			} else this._ ? (t = ju(this._), n.P = null, n.N = t, t.P = t.L = n, e = t) : (n.P = n.N = null, this._ = n, e = null);
			for (n.L = n.R = null, n.U = e, n.C = !0, t = n; e && e.C;) e === (r = e.U).L ? (i = r.R) && i.C ? (e.C = i.C = !1, r.C = !0, t = r) : (t === e.R && (Bu(this, e), e = (t = e).U), e.C = !1, r.C = !0, Hu(this, r)) : (i = r.L) && i.C ? (e.C = i.C = !1, r.C = !0, t = r) : (t === e.L && (Hu(this, e), e = (t = e).U), e.C = !1, r.C = !0, Bu(this, r)), e = t.U;
			this._.C = !1
		},
		remove: function(t) {
			t.N && (t.N.P = t.P), t.P && (t.P.N = t.N), t.N = t.P = null;
			var n, e, r, i = t.U,
				o = t.L,
				u = t.R;
			if (e = o ? u ? ju(u) : o : u, i ? i.L === t ? i.L = e : i.R = e : this._ = e, o && u ? (r = e.C, e.C = t.C, e.L = o, o.U = e, e !== u ? (i = e.U, e.U = t.U, t = e.R, i.L = t, e.R = u, u.U = e) : (e.U = i, i = e, t = e.R)) : (r = t.C, t = e), t && (t.U = i), !r)
				if (t && t.C) t.C = !1;
				else {
					do {
						if (t === this._) break;
						if (t === i.L) {
							if ((n = i.R).C && (n.C = !1, i.C = !0, Bu(this, i), n = i.R), n.L && n.L.C || n.R && n.R.C) {
								n.R && n.R.C || (n.L.C = !1, n.C = !0, Hu(this, n), n = i.R), n.C = i.C, i.C = n.R.C = !1, Bu(this, i), t = this._;
								break
							}
						} else if ((n = i.L).C && (n.C = !1, i.C = !0, Hu(this, i), n = i.L), n.L && n.L.C || n.R && n.R.C) {
							n.L && n.L.C || (n.R.C = !1, n.C = !0, Bu(this, n), n = i.L), n.C = i.C, i.C = n.L.C = !1, Hu(this, i), t = this._;
							break
						}
						n.C = !0, t = i, i = i.U
					} while (!t.C);
					t && (t.C = !1)
				}
		}
	};
	var p_, d_, v_, g_, __, y_ = [],
		m_ = [],
		x_ = 1e-6,
		b_ = 1e-12;
	ca.prototype = {
		constructor: ca,
		polygons: function() {
			var t = this.edges;
			return this.cells.map(function(n) {
				var e = n.halfedges.map(function(e) {
					return Qu(n, t[e])
				});
				return e.data = n.site.data, e
			})
		},
		triangles: function() {
			var t = [],
				n = this.edges;
			return this.cells.forEach(function(e, r) {
				if (o = (i = e.halfedges).length)
					for (var i, o, u, a = e.site, c = -1, s = n[i[o - 1]], f = s.left === a ? s.right : s.left; ++c < o;) u = f, f = (s = n[i[c]]).left === a ? s.right : s.left, u && f && r < u.index && r < f.index && ua(a, u, f) < 0 && t.push([a.data, u.data, f.data])
			}), t
		},
		links: function() {
			return this.edges.filter(function(t) {
				return t.right
			}).map(function(t) {
				return {
					source: t.left.data,
					target: t.right.data
				}
			})
		},
		find: function(t, n, e) {
			for (var r, i, o = this, u = o._found || 0, a = o.cells.length; !(i = o.cells[u]);)
				if (++u >= a) return null;
			var c = t - i.site[0],
				s = n - i.site[1],
				f = c * c + s * s;
			do {
				i = o.cells[r = u], u = null, i.halfedges.forEach(function(e) {
					var r = o.edges[e],
						a = r.left;
					if (a !== i.site && a || (a = r.right)) {
						var c = t - a[0],
							s = n - a[1],
							l = c * c + s * s;
						l < f && (f = l, u = a.index)
					}
				})
			} while (null !== u);
			return o._found = r, null == e || f <= e * e ? i.site : null
		}
	};
	var w_ = function(t) {
		return function() {
			return t
		}
	};
	sa.prototype = {
		constructor: sa,
		scale: function(t) {
			return 1 === t ? this : new sa(this.k * t, this.x, this.y)
		},
		translate: function(t, n) {
			return 0 === t & 0 === n ? this : new sa(this.k, this.x + this.k * t, this.y + this.k * n)
		},
		apply: function(t) {
			return [t[0] * this.k + this.x, t[1] * this.k + this.y]
		},
		applyX: function(t) {
			return t * this.k + this.x
		},
		applyY: function(t) {
			return t * this.k + this.y
		},
		invert: function(t) {
			return [(t[0] - this.x) / this.k, (t[1] - this.y) / this.k]
		},
		invertX: function(t) {
			return (t - this.x) / this.k
		},
		invertY: function(t) {
			return (t - this.y) / this.k
		},
		rescaleX: function(t) {
			return t.copy().domain(t.range().map(this.invertX, this).map(t.invert, t))
		},
		rescaleY: function(t) {
			return t.copy().domain(t.range().map(this.invertY, this).map(t.invert, t))
		},
		toString: function() {
			return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")"
		}
	};
	var M_ = new sa(1, 0, 0);
	fa.prototype = sa.prototype;
	var T_ = function() {
		t.event.preventDefault(), t.event.stopImmediatePropagation()
	};
	t.version = "4.12.0", t.bisect = ba, t.bisectRight = ba, t.bisectLeft = wa, t.ascending = ya, t.bisector = ma, t.cross = function(t, e, r) {
		var i, o, u, a, c = t.length,
			s = e.length,
			f = new Array(c * s);
		for (null == r && (r = n), i = u = 0; i < c; ++i)
			for (a = t[i], o = 0; o < s; ++o, ++u) f[u] = r(a, e[o]);
		return f
	}, t.descending = function(t, n) {
		return n < t ? -1 : n > t ? 1 : n >= t ? 0 : NaN
	}, t.deviation = Na, t.extent = ka, t.histogram = function() {
		function t(t) {
			var o, u, a = t.length,
				c = new Array(a);
			for (o = 0; o < a; ++o) c[o] = n(t[o], o, t);
			var s = e(c),
				f = s[0],
				l = s[1],
				h = i(c, f, l);
			Array.isArray(h) || (h = r(f, l, h), h = Pa(Math.ceil(f / h) * h, Math.floor(l / h) * h, h));
			for (var p = h.length; h[0] <= f;) h.shift(), --p;
			for (; h[p - 1] > l;) h.pop(), --p;
			var d, v = new Array(p + 1);
			for (o = 0; o <= p; ++o)(d = v[o] = []).x0 = o > 0 ? h[o - 1] : f, d.x1 = o < p ? h[o] : l;
			for (o = 0; o < a; ++o) f <= (u = c[o]) && u <= l && v[ba(h, u, 0, p)].push(t[o]);
			return v
		}
		var n = za,
			e = ka,
			i = Ua;
		return t.value = function(e) {
			return arguments.length ? (n = "function" == typeof e ? e : Ca(e), t) : n
		}, t.domain = function(n) {
			return arguments.length ? (e = "function" == typeof n ? n : Ca([n[0], n[1]]), t) : e
		}, t.thresholds = function(n) {
			return arguments.length ? (i = "function" == typeof n ? n : Ca(Array.isArray(n) ? Ea.call(n) : n), t) : i
		}, t
	}, t.thresholdFreedmanDiaconis = function(t, n, e) {
		return t = Aa.call(t, Ma).sort(ya), Math.ceil((e - n) / (2 * (Oa(t, .75) - Oa(t, .25)) * Math.pow(t.length, -1 / 3)))
	}, t.thresholdScott = function(t, n, e) {
		return Math.ceil((e - n) / (3.5 * Na(t) * Math.pow(t.length, -1 / 3)))
	}, t.thresholdSturges = Ua, t.max = function(t, n) {
		var e, r, i = t.length,
			o = -1;
		if (null == n) {
			for (; ++o < i;)
				if (null != (e = t[o]) && e >= e)
					for (r = e; ++o < i;) null != (e = t[o]) && e > r && (r = e)
		} else
			for (; ++o < i;)
				if (null != (e = n(t[o], o, t)) && e >= e)
					for (r = e; ++o < i;) null != (e = n(t[o], o, t)) && e > r && (r = e);
		return r
	}, t.mean = function(t, n) {
		var e, r = t.length,
			i = r,
			o = -1,
			u = 0;
		if (null == n)
			for (; ++o < r;) isNaN(e = Ma(t[o])) ? --i : u += e;
		else
			for (; ++o < r;) isNaN(e = Ma(n(t[o], o, t))) ? --i : u += e;
		if (i) return u / i
	}, t.median = function(t, n) {
		var e, r = t.length,
			i = -1,
			o = [];
		if (null == n)
			for (; ++i < r;) isNaN(e = Ma(t[i])) || o.push(e);
		else
			for (; ++i < r;) isNaN(e = Ma(n(t[i], i, t))) || o.push(e);
		return Oa(o.sort(ya), .5)
	}, t.merge = Fa, t.min = Ia, t.pairs = function(t, e) {
		null == e && (e = n);
		for (var r = 0, i = t.length - 1, o = t[0], u = new Array(i < 0 ? 0 : i); r < i;) u[r] = e(o, o = t[++r]);
		return u
	}, t.permute = function(t, n) {
		for (var e = n.length, r = new Array(e); e--;) r[e] = t[n[e]];
		return r
	}, t.quantile = Oa, t.range = Pa, t.scan = function(t, n) {
		if (e = t.length) {
			var e, r, i = 0,
				o = 0,
				u = t[o];
			for (null == n && (n = ya); ++i < e;)(n(r = t[i], u) < 0 || 0 !== n(u, u)) && (u = r, o = i);
			return 0 === n(u, u) ? o : void 0
		}
	}, t.shuffle = function(t, n, e) {
		for (var r, i, o = (null == e ? t.length : e) - (n = null == n ? 0 : +n); o;) i = Math.random() * o-- | 0, r = t[o + n], t[o + n] = t[i + n], t[i + n] = r;
		return t
	}, t.sum = function(t, n) {
		var e, r = t.length,
			i = -1,
			o = 0;
		if (null == n)
			for (; ++i < r;)(e = +t[i]) && (o += e);
		else
			for (; ++i < r;)(e = +n(t[i], i, t)) && (o += e);
		return o
	}, t.ticks = Da, t.tickIncrement = e, t.tickStep = r, t.transpose = Ya, t.variance = Ta, t.zip = function() {
		return Ya(arguments)
	}, t.axisTop = function(t) {
		return u(ja, t)
	}, t.axisRight = function(t) {
		return u(Xa, t)
	}, t.axisBottom = function(t) {
		return u(Va, t)
	}, t.axisLeft = function(t) {
		return u($a, t)
	}, t.brush = function() {
		return jt(qf)
	}, t.brushX = function() {
		return jt(Rf)
	}, t.brushY = function() {
		return jt(Lf)
	}, t.brushSelection = function(t) {
		var n = t.__brush;
		return n ? n.dim.output(n.selection) : null
	}, t.chord = function() {
		function t(t) {
			var o, u, a, c, s, f, l = t.length,
				h = [],
				p = Pa(l),
				d = [],
				v = [],
				g = v.groups = new Array(l),
				_ = new Array(l * l);
			for (o = 0, s = -1; ++s < l;) {
				for (u = 0, f = -1; ++f < l;) u += t[s][f];
				h.push(u), d.push(Pa(l)), o += u
			}
			for (e && p.sort(function(t, n) {
					return e(h[t], h[n])
				}), r && d.forEach(function(n, e) {
					n.sort(function(n, i) {
						return r(t[e][n], t[e][i])
					})
				}), c = (o = Vf(0, Xf - n * l) / o) ? n : Xf / l, u = 0, s = -1; ++s < l;) {
				for (a = u, f = -1; ++f < l;) {
					var y = p[s],
						m = d[y][f],
						x = t[y][m],
						b = u,
						w = u += x * o;
					_[m * l + y] = {
						index: y,
						subindex: m,
						startAngle: b,
						endAngle: w,
						value: x
					}
				}
				g[y] = {
					index: y,
					startAngle: a,
					endAngle: u,
					value: h[y]
				}, u += c
			}
			for (s = -1; ++s < l;)
				for (f = s - 1; ++f < l;) {
					var M = _[f * l + s],
						T = _[s * l + f];
					(M.value || T.value) && v.push(M.value < T.value ? {
						source: T,
						target: M
					} : {
						source: M,
						target: T
					})
				}
			return i ? v.sort(i) : v
		}
		var n = 0,
			e = null,
			r = null,
			i = null;
		return t.padAngle = function(e) {
			return arguments.length ? (n = Vf(0, e), t) : n
		}, t.sortGroups = function(n) {
			return arguments.length ? (e = n, t) : e
		}, t.sortSubgroups = function(n) {
			return arguments.length ? (r = n, t) : r
		}, t.sortChords = function(n) {
			return arguments.length ? (null == n ? i = null : (i = function(t) {
				return function(n, e) {
					return t(n.source.value + n.target.value, e.source.value + e.target.value)
				}
			}(n))._ = n, t) : i && i._
		}, t
	}, t.ribbon = function() {
		function t() {
			var t, a = $f.call(arguments),
				c = n.apply(this, a),
				s = e.apply(this, a),
				f = +r.apply(this, (a[0] = c, a)),
				l = i.apply(this, a) - jf,
				h = o.apply(this, a) - jf,
				p = f * Yf(l),
				d = f * Bf(l),
				v = +r.apply(this, (a[0] = s, a)),
				g = i.apply(this, a) - jf,
				_ = o.apply(this, a) - jf;
			if (u || (u = t = Vt()), u.moveTo(p, d), u.arc(0, 0, f, l, h), l === g && h === _ || (u.quadraticCurveTo(0, 0, v * Yf(g), v * Bf(g)), u.arc(0, 0, v, g, _)), u.quadraticCurveTo(0, 0, p, d), u.closePath(), t) return u = null, t + "" || null
		}
		var n = $t,
			e = Wt,
			r = Zt,
			i = Gt,
			o = Qt,
			u = null;
		return t.radius = function(n) {
			return arguments.length ? (r = "function" == typeof n ? n : Wf(+n), t) : r
		}, t.startAngle = function(n) {
			return arguments.length ? (i = "function" == typeof n ? n : Wf(+n), t) : i
		}, t.endAngle = function(n) {
			return arguments.length ? (o = "function" == typeof n ? n : Wf(+n), t) : o
		}, t.source = function(e) {
			return arguments.length ? (n = e, t) : n
		}, t.target = function(n) {
			return arguments.length ? (e = n, t) : e
		}, t.context = function(n) {
			return arguments.length ? (u = null == n ? null : n, t) : u
		}, t
	}, t.nest = function() {
		function t(n, i, u, a) {
			if (i >= o.length) return null != e && n.sort(e), null != r ? r(n) : n;
			for (var c, s, f, l = -1, h = n.length, p = o[i++], d = Kt(), v = u(); ++l < h;)(f = d.get(c = p(s = n[l]) + "")) ? f.push(s) : d.set(c, [s]);
			return d.each(function(n, e) {
				a(v, e, t(n, i, u, a))
			}), v
		}

		function n(t, e) {
			if (++e > o.length) return t;
			var i, a = u[e - 1];
			return null != r && e >= o.length ? i = t.entries() : (i = [], t.each(function(t, r) {
				i.push({
					key: r,
					values: n(t, e)
				})
			})), null != a ? i.sort(function(t, n) {
				return a(t.key, n.key)
			}) : i
		}
		var e, r, i, o = [],
			u = [];
		return i = {
			object: function(n) {
				return t(n, 0, tn, nn)
			},
			map: function(n) {
				return t(n, 0, en, rn)
			},
			entries: function(e) {
				return n(t(e, 0, en, rn), 0)
			},
			key: function(t) {
				return o.push(t), i
			},
			sortKeys: function(t) {
				return u[o.length - 1] = t, i
			},
			sortValues: function(t) {
				return e = t, i
			},
			rollup: function(t) {
				return r = t, i
			}
		}
	}, t.set = un, t.map = Kt, t.keys = function(t) {
		var n = [];
		for (var e in t) n.push(e);
		return n
	}, t.values = function(t) {
		var n = [];
		for (var e in t) n.push(t[e]);
		return n
	}, t.entries = function(t) {
		var n = [];
		for (var e in t) n.push({
			key: e,
			value: t[e]
		});
		return n
	}, t.color = O, t.rgb = B, t.hsl = X, t.lab = Z, t.hcl = nt, t.cubehelix = rt, t.dispatch = a, t.drag = function() {
		function n(t) {
			t.on("mousedown.drag", e).filter(y).on("touchstart.drag", o).on("touchmove.drag", u).on("touchend.drag touchcancel.drag", c).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)")
		}

		function e() {
			if (!p && v.apply(this, arguments)) {
				var n = s("mouse", g.apply(this, arguments), cc, this, arguments);
				n && (vc(t.event.view).on("mousemove.drag", r, !0).on("mouseup.drag", i, !0), yc(t.event.view), A(), h = !1, f = t.event.clientX, l = t.event.clientY, n("start"))
			}
		}

		function r() {
			if (_c(), !h) {
				var n = t.event.clientX - f,
					e = t.event.clientY - l;
				h = n * n + e * e > w
			}
			m.mouse("drag")
		}

		function i() {
			vc(t.event.view).on("mousemove.drag mouseup.drag", null), C(t.event.view, h), _c(), m.mouse("end")
		}

		function o() {
			if (v.apply(this, arguments)) {
				var n, e, r = t.event.changedTouches,
					i = g.apply(this, arguments),
					o = r.length;
				for (n = 0; n < o; ++n)(e = s(r[n].identifier, i, gc, this, arguments)) && (A(), e("start"))
			}
		}

		function u() {
			var n, e, r = t.event.changedTouches,
				i = r.length;
			for (n = 0; n < i; ++n)(e = m[r[n].identifier]) && (_c(), e("drag"))
		}

		function c() {
			var n, e, r = t.event.changedTouches,
				i = r.length;
			for (p && clearTimeout(p), p = setTimeout(function() {
					p = null
				}, 500), n = 0; n < i; ++n)(e = m[r[n].identifier]) && (A(), e("end"))
		}

		function s(e, r, i, o, u) {
			var a, c, s, f = i(r, e),
				l = x.copy();
			if (d(new z(n, "beforestart", a, e, b, f[0], f[1], 0, 0, l), function() {
					return null != (t.event.subject = a = _.apply(o, u)) && (c = a.x - f[0] || 0, s = a.y - f[1] || 0, !0)
				})) return function t(h) {
				var p, v = f;
				switch (h) {
					case "start":
						m[e] = t, p = b++;
						break;
					case "end":
						delete m[e], --b;
					case "drag":
						f = i(r, e), p = b
				}
				d(new z(n, h, a, e, p, f[0] + c, f[1] + s, f[0] - v[0], f[1] - v[1], l), l.apply, l, [h, o, u])
			}
		}
		var f, l, h, p, v = P,
			g = R,
			_ = L,
			y = q,
			m = {},
			x = a("start", "drag", "end"),
			b = 0,
			w = 0;
		return n.filter = function(t) {
			return arguments.length ? (v = "function" == typeof t ? t : mc(!!t), n) : v
		}, n.container = function(t) {
			return arguments.length ? (g = "function" == typeof t ? t : mc(t), n) : g
		}, n.subject = function(t) {
			return arguments.length ? (_ = "function" == typeof t ? t : mc(t), n) : _
		}, n.touchable = function(t) {
			return arguments.length ? (y = "function" == typeof t ? t : mc(!!t), n) : y
		}, n.on = function() {
			var t = x.on.apply(x, arguments);
			return t === x ? n : t
		}, n.clickDistance = function(t) {
			return arguments.length ? (w = (t = +t) * t, n) : Math.sqrt(w)
		}, n
	}, t.dragDisable = yc, t.dragEnable = C, t.dsvFormat = il, t.csvParse = ul, t.csvParseRows = al, t.csvFormat = cl, t.csvFormatRows = sl, t.tsvParse = ll, t.tsvParseRows = hl, t.tsvFormat = pl, t.tsvFormatRows = dl, t.easeLinear = function(t) {
		return +t
	}, t.easeQuad = zt, t.easeQuadIn = function(t) {
		return t * t
	}, t.easeQuadOut = function(t) {
		return t * (2 - t)
	}, t.easeQuadInOut = zt, t.easeCubic = Pt, t.easeCubicIn = function(t) {
		return t * t * t
	}, t.easeCubicOut = function(t) {
		return --t * t * t + 1
	}, t.easeCubicInOut = Pt, t.easePoly = rf, t.easePolyIn = nf, t.easePolyOut = ef, t.easePolyInOut = rf, t.easeSin = Rt, t.easeSinIn = function(t) {
		return 1 - Math.cos(t * uf)
	}, t.easeSinOut = function(t) {
		return Math.sin(t * uf)
	}, t.easeSinInOut = Rt, t.easeExp = Lt, t.easeExpIn = function(t) {
		return Math.pow(2, 10 * t - 10)
	}, t.easeExpOut = function(t) {
		return 1 - Math.pow(2, -10 * t)
	}, t.easeExpInOut = Lt, t.easeCircle = qt, t.easeCircleIn = function(t) {
		return 1 - Math.sqrt(1 - t * t)
	}, t.easeCircleOut = function(t) {
		return Math.sqrt(1 - --t * t)
	}, t.easeCircleInOut = qt, t.easeBounce = Dt, t.easeBounceIn = function(t) {
		return 1 - Dt(1 - t)
	}, t.easeBounceOut = Dt, t.easeBounceInOut = function(t) {
		return ((t *= 2) <= 1 ? 1 - Dt(1 - t) : Dt(t - 1) + 1) / 2
	}, t.easeBack = mf, t.easeBackIn = _f, t.easeBackOut = yf, t.easeBackInOut = mf, t.easeElastic = wf, t.easeElasticIn = bf, t.easeElasticOut = wf, t.easeElasticInOut = Mf, t.forceCenter = function(t, n) {
		function e() {
			var e, i, o = r.length,
				u = 0,
				a = 0;
			for (e = 0; e < o; ++e) u += (i = r[e]).x, a += i.y;
			for (u = u / o - t, a = a / o - n, e = 0; e < o; ++e)(i = r[e]).x -= u, i.y -= a
		}
		var r;
		return null == t && (t = 0), null == n && (n = 0), e.initialize = function(t) {
			r = t
		}, e.x = function(n) {
			return arguments.length ? (t = +n, e) : t
		}, e.y = function(t) {
			return arguments.length ? (n = +t, e) : n
		}, e
	}, t.forceCollide = function(t) {
		function n() {
			for (var t, n, r, c, s, f, l, h = i.length, p = 0; p < a; ++p)
				for (n = sn(i, hn, pn).visitAfter(e), t = 0; t < h; ++t) r = i[t], f = o[r.index], l = f * f, c = r.x + r.vx, s = r.y + r.vy, n.visit(function(t, n, e, i, o) {
					var a = t.data,
						h = t.r,
						p = f + h;
					if (!a) return n > c + p || i < c - p || e > s + p || o < s - p;
					if (a.index > r.index) {
						var d = c - a.x - a.vx,
							v = s - a.y - a.vy,
							g = d * d + v * v;
						g < p * p && (0 === d && (d = gl(), g += d * d), 0 === v && (v = gl(), g += v * v), g = (p - (g = Math.sqrt(g))) / g * u, r.vx += (d *= g) * (p = (h *= h) / (l + h)), r.vy += (v *= g) * p, a.vx -= d * (p = 1 - p), a.vy -= v * p)
					}
				})
		}

		function e(t) {
			if (t.data) return t.r = o[t.data.index];
			for (var n = t.r = 0; n < 4; ++n) t[n] && t[n].r > t.r && (t.r = t[n].r)
		}

		function r() {
			if (i) {
				var n, e, r = i.length;
				for (o = new Array(r), n = 0; n < r; ++n) e = i[n], o[e.index] = +t(e, n, i)
			}
		}
		var i, o, u = 1,
			a = 1;
		return "function" != typeof t && (t = vl(null == t ? 1 : +t)), n.initialize = function(t) {
			i = t, r()
		}, n.iterations = function(t) {
			return arguments.length ? (a = +t, n) : a
		}, n.strength = function(t) {
			return arguments.length ? (u = +t, n) : u
		}, n.radius = function(e) {
			return arguments.length ? (t = "function" == typeof e ? e : vl(+e), r(), n) : t
		}, n
	}, t.forceLink = function(t) {
		function n(n) {
			for (var e = 0, r = t.length; e < p; ++e)
				for (var i, a, c, f, l, h, d, v = 0; v < r; ++v) a = (i = t[v]).source, f = (c = i.target).x + c.vx - a.x - a.vx || gl(), l = c.y + c.vy - a.y - a.vy || gl(), f *= h = ((h = Math.sqrt(f * f + l * l)) - u[v]) / h * n * o[v], l *= h, c.vx -= f * (d = s[v]), c.vy -= l * d, a.vx += f * (d = 1 - d), a.vy += l * d
		}

		function e() {
			if (a) {
				var n, e, l = a.length,
					h = t.length,
					p = Kt(a, f);
				for (n = 0, c = new Array(l); n < h; ++n)(e = t[n]).index = n, "object" != typeof e.source && (e.source = vn(p, e.source)), "object" != typeof e.target && (e.target = vn(p, e.target)), c[e.source.index] = (c[e.source.index] || 0) + 1, c[e.target.index] = (c[e.target.index] || 0) + 1;
				for (n = 0, s = new Array(h); n < h; ++n) e = t[n], s[n] = c[e.source.index] / (c[e.source.index] + c[e.target.index]);
				o = new Array(h), r(), u = new Array(h), i()
			}
		}

		function r() {
			if (a)
				for (var n = 0, e = t.length; n < e; ++n) o[n] = +l(t[n], n, t)
		}

		function i() {
			if (a)
				for (var n = 0, e = t.length; n < e; ++n) u[n] = +h(t[n], n, t)
		}
		var o, u, a, c, s, f = dn,
			l = function(t) {
				return 1 / Math.min(c[t.source.index], c[t.target.index])
			},
			h = vl(30),
			p = 1;
		return null == t && (t = []), n.initialize = function(t) {
			a = t, e()
		}, n.links = function(r) {
			return arguments.length ? (t = r, e(), n) : t
		}, n.id = function(t) {
			return arguments.length ? (f = t, n) : f
		}, n.iterations = function(t) {
			return arguments.length ? (p = +t, n) : p
		}, n.strength = function(t) {
			return arguments.length ? (l = "function" == typeof t ? t : vl(+t), r(), n) : l
		}, n.distance = function(t) {
			return arguments.length ? (h = "function" == typeof t ? t : vl(+t), i(), n) : h
		}, n
	}, t.forceManyBody = function() {
		function t(t) {
			var n, a = i.length,
				c = sn(i, gn, _n).visitAfter(e);
			for (u = t, n = 0; n < a; ++n) o = i[n], c.visit(r)
		}

		function n() {
			if (i) {
				var t, n, e = i.length;
				for (a = new Array(e), t = 0; t < e; ++t) n = i[t], a[n.index] = +c(n, t, i)
			}
		}

		function e(t) {
			var n, e, r, i, o, u = 0,
				c = 0;
			if (t.length) {
				for (r = i = o = 0; o < 4; ++o)(n = t[o]) && (e = Math.abs(n.value)) && (u += n.value, c += e, r += e * n.x, i += e * n.y);
				t.x = r / c, t.y = i / c
			} else {
				(n = t).x = n.data.x, n.y = n.data.y;
				do {
					u += a[n.data.index]
				} while (n = n.next)
			}
			t.value = u
		}

		function r(t, n, e, r) {
			if (!t.value) return !0;
			var i = t.x - o.x,
				c = t.y - o.y,
				h = r - n,
				p = i * i + c * c;
			if (h * h / l < p) return p < f && (0 === i && (i = gl(), p += i * i), 0 === c && (c = gl(), p += c * c), p < s && (p = Math.sqrt(s * p)), o.vx += i * t.value * u / p, o.vy += c * t.value * u / p), !0;
			if (!(t.length || p >= f)) {
				(t.data !== o || t.next) && (0 === i && (i = gl(), p += i * i), 0 === c && (c = gl(), p += c * c), p < s && (p = Math.sqrt(s * p)));
				do {
					t.data !== o && (h = a[t.data.index] * u / p, o.vx += i * h, o.vy += c * h)
				} while (t = t.next)
			}
		}
		var i, o, u, a, c = vl(-30),
			s = 1,
			f = 1 / 0,
			l = .81;
		return t.initialize = function(t) {
			i = t, n()
		}, t.strength = function(e) {
			return arguments.length ? (c = "function" == typeof e ? e : vl(+e), n(), t) : c
		}, t.distanceMin = function(n) {
			return arguments.length ? (s = n * n, t) : Math.sqrt(s)
		}, t.distanceMax = function(n) {
			return arguments.length ? (f = n * n, t) : Math.sqrt(f)
		}, t.theta = function(n) {
			return arguments.length ? (l = n * n, t) : Math.sqrt(l)
		}, t
	}, t.forceRadial = function(t, n, e) {
		function r(t) {
			for (var r = 0, i = o.length; r < i; ++r) {
				var c = o[r],
					s = c.x - n || 1e-6,
					f = c.y - e || 1e-6,
					l = Math.sqrt(s * s + f * f),
					h = (a[r] - l) * u[r] * t / l;
				c.vx += s * h, c.vy += f * h
			}
		}

		function i() {
			if (o) {
				var n, e = o.length;
				for (u = new Array(e), a = new Array(e), n = 0; n < e; ++n) a[n] = +t(o[n], n, o), u[n] = isNaN(a[n]) ? 0 : +c(o[n], n, o)
			}
		}
		var o, u, a, c = vl(.1);
		return "function" != typeof t && (t = vl(+t)), null == n && (n = 0), null == e && (e = 0), r.initialize = function(t) {
			o = t, i()
		}, r.strength = function(t) {
			return arguments.length ? (c = "function" == typeof t ? t : vl(+t), i(), r) : c
		}, r.radius = function(n) {
			return arguments.length ? (t = "function" == typeof n ? n : vl(+n), i(), r) : t
		}, r.x = function(t) {
			return arguments.length ? (n = +t, r) : n
		}, r.y = function(t) {
			return arguments.length ? (e = +t, r) : e
		}, r
	}, t.forceSimulation = function(t) {
		function n() {
			e(), d.call("tick", o), u < c && (p.stop(), d.call("end", o))
		}

		function e() {
			var n, e, r = t.length;
			for (u += (f - u) * s, h.each(function(t) {
					t(u)
				}), n = 0; n < r; ++n) null == (e = t[n]).fx ? e.x += e.vx *= l : (e.x = e.fx, e.vx = 0), null == e.fy ? e.y += e.vy *= l : (e.y = e.fy, e.vy = 0)
		}

		function r() {
			for (var n, e = 0, r = t.length; e < r; ++e) {
				if (n = t[e], n.index = e, isNaN(n.x) || isNaN(n.y)) {
					var i = xl * Math.sqrt(e),
						o = e * bl;
					n.x = i * Math.cos(o), n.y = i * Math.sin(o)
				}(isNaN(n.vx) || isNaN(n.vy)) && (n.vx = n.vy = 0)
			}
		}

		function i(n) {
			return n.initialize && n.initialize(t), n
		}
		var o, u = 1,
			c = .001,
			s = 1 - Math.pow(c, 1 / 300),
			f = 0,
			l = .6,
			h = Kt(),
			p = mt(n),
			d = a("tick", "end");
		return null == t && (t = []), r(), o = {
			tick: e,
			restart: function() {
				return p.restart(n), o
			},
			stop: function() {
				return p.stop(), o
			},
			nodes: function(n) {
				return arguments.length ? (t = n, r(), h.each(i), o) : t
			},
			alpha: function(t) {
				return arguments.length ? (u = +t, o) : u
			},
			alphaMin: function(t) {
				return arguments.length ? (c = +t, o) : c
			},
			alphaDecay: function(t) {
				return arguments.length ? (s = +t, o) : +s
			},
			alphaTarget: function(t) {
				return arguments.length ? (f = +t, o) : f
			},
			velocityDecay: function(t) {
				return arguments.length ? (l = 1 - t, o) : 1 - l
			},
			force: function(t, n) {
				return arguments.length > 1 ? (null == n ? h.remove(t) : h.set(t, i(n)), o) : h.get(t)
			},
			find: function(n, e, r) {
				var i, o, u, a, c, s = 0,
					f = t.length;
				for (null == r ? r = 1 / 0 : r *= r, s = 0; s < f; ++s)(u = (i = n - (a = t[s]).x) * i + (o = e - a.y) * o) < r && (c = a, r = u);
				return c
			},
			on: function(t, n) {
				return arguments.length > 1 ? (d.on(t, n), o) : d.on(t)
			}
		}
	}, t.forceX = function(t) {
		function n(t) {
			for (var n, e = 0, u = r.length; e < u; ++e)(n = r[e]).vx += (o[e] - n.x) * i[e] * t
		}

		function e() {
			if (r) {
				var n, e = r.length;
				for (i = new Array(e), o = new Array(e), n = 0; n < e; ++n) i[n] = isNaN(o[n] = +t(r[n], n, r)) ? 0 : +u(r[n], n, r)
			}
		}
		var r, i, o, u = vl(.1);
		return "function" != typeof t && (t = vl(null == t ? 0 : +t)), n.initialize = function(t) {
			r = t, e()
		}, n.strength = function(t) {
			return arguments.length ? (u = "function" == typeof t ? t : vl(+t), e(), n) : u
		}, n.x = function(r) {
			return arguments.length ? (t = "function" == typeof r ? r : vl(+r), e(), n) : t
		}, n
	}, t.forceY = function(t) {
		function n(t) {
			for (var n, e = 0, u = r.length; e < u; ++e)(n = r[e]).vy += (o[e] - n.y) * i[e] * t
		}

		function e() {
			if (r) {
				var n, e = r.length;
				for (i = new Array(e), o = new Array(e), n = 0; n < e; ++n) i[n] = isNaN(o[n] = +t(r[n], n, r)) ? 0 : +u(r[n], n, r)
			}
		}
		var r, i, o, u = vl(.1);
		return "function" != typeof t && (t = vl(null == t ? 0 : +t)), n.initialize = function(t) {
			r = t, e()
		}, n.strength = function(t) {
			return arguments.length ? (u = "function" == typeof t ? t : vl(+t), e(), n) : u
		}, n.y = function(r) {
			return arguments.length ? (t = "function" == typeof r ? r : vl(+r), e(), n) : t
		}, n
	}, t.formatDefaultLocale = xn, t.formatLocale = Cl, t.formatSpecifier = yn, t.precisionFixed = zl, t.precisionPrefix = Pl, t.precisionRound = Rl, t.geoArea = function(t) {
		return Dh.reset(), Lh(t, Uh), 2 * Dh
	}, t.geoBounds = function(t) {
		var n, e, r, i, o, u, a;
		if (Hl = Bl = -(Il = Yl = 1 / 0), Wl = [], Lh(t, Fh), e = Wl.length) {
			for (Wl.sort(Zn), n = 1, o = [r = Wl[0]]; n < e; ++n) Gn(r, (i = Wl[n])[0]) || Gn(r, i[1]) ? (Wn(r[0], i[1]) > Wn(r[0], r[1]) && (r[1] = i[1]), Wn(i[0], r[1]) > Wn(r[0], r[1]) && (r[0] = i[0])) : o.push(r = i);
			for (u = -1 / 0, n = 0, r = o[e = o.length - 1]; n <= e; r = i, ++n) i = o[n], (a = Wn(r[1], i[0])) > u && (u = a, Il = i[0], Bl = r[1])
		}
		return Wl = Zl = null, Il === 1 / 0 || Yl === 1 / 0 ? [
			[NaN, NaN],
			[NaN, NaN]
		] : [
			[Il, Yl],
			[Bl, Hl]
		]
	}, t.geoCentroid = function(t) {
		Gl = Ql = Jl = Kl = th = nh = eh = rh = ih = oh = uh = 0, Lh(t, Ih);
		var n = ih,
			e = oh,
			r = uh,
			i = n * n + e * e + r * r;
		return i < 1e-12 && (n = nh, e = eh, r = rh, Ql < ph && (n = Jl, e = Kl, r = th), (i = n * n + e * e + r * r) < 1e-12) ? [NaN, NaN] : [wh(e, n) * yh, Tn(r / Ch(i)) * yh]
	}, t.geoCircle = function() {
		function t() {
			var t = r.apply(this, arguments),
				a = i.apply(this, arguments) * mh,
				c = o.apply(this, arguments) * mh;
			return n = [], e = ce(-t[0] * mh, -t[1] * mh, 0).invert, he(u, a, c, 1), t = {
				type: "Polygon",
				coordinates: [n]
			}, n = e = null, t
		}
		var n, e, r = Yh([0, 0]),
			i = Yh(90),
			o = Yh(6),
			u = {
				point: function(t, r) {
					n.push(t = e(t, r)), t[0] *= yh, t[1] *= yh
				}
			};
		return t.center = function(n) {
			return arguments.length ? (r = "function" == typeof n ? n : Yh([+n[0], +n[1]]), t) : r
		}, t.radius = function(n) {
			return arguments.length ? (i = "function" == typeof n ? n : Yh(+n), t) : i
		}, t.precision = function(n) {
			return arguments.length ? (o = "function" == typeof n ? n : Yh(+n), t) : o
		}, t
	}, t.geoClipAntimeridian = ap, t.geoClipCircle = cp, t.geoClipExtent = function() {
		var t, n, e, r = 0,
			i = 0,
			o = 960,
			u = 500;
		return e = {
			stream: function(e) {
				return t && n === e ? t : t = ye(r, i, o, u)(n = e)
			},
			extent: function(a) {
				return arguments.length ? (r = +a[0][0], i = +a[0][1], o = +a[1][0], u = +a[1][1], t = n = null, e) : [
					[r, i],
					[o, u]
				]
			}
		}
	}, t.geoClipRectangle = ye, t.geoContains = function(t, n) {
		return (t && yp.hasOwnProperty(t.type) ? yp[t.type] : we)(t, n)
	}, t.geoDistance = _p, t.geoGraticule = Ce, t.geoGraticule10 = function() {
		return Ce()()
	}, t.geoInterpolate = function(t, n) {
		var e = t[0] * mh,
			r = t[1] * mh,
			i = n[0] * mh,
			o = n[1] * mh,
			u = Mh(r),
			a = Eh(r),
			c = Mh(o),
			s = Eh(o),
			f = u * Mh(e),
			l = u * Eh(e),
			h = c * Mh(i),
			p = c * Eh(i),
			d = 2 * Tn(Ch(Nn(o - r) + u * c * Nn(i - e))),
			v = Eh(d),
			g = d ? function(t) {
				var n = Eh(t *= d) / v,
					e = Eh(d - t) / v,
					r = e * f + n * h,
					i = e * l + n * p,
					o = e * a + n * s;
				return [wh(i, r) * yh, wh(o, Ch(r * r + i * i)) * yh]
			} : function() {
				return [e * yh, r * yh]
			};
		return g.distance = d, g
	}, t.geoLength = dp, t.geoPath = function(t, n) {
		function e(t) {
			return t && ("function" == typeof o && i.pointRadius(+o.apply(this, arguments)), Lh(t, r(i))), i.result()
		}
		var r, i, o = 4.5;
		return e.area = function(t) {
			return Lh(t, r(Mp)), Mp.result()
		}, e.measure = function(t) {
			return Lh(t, r(Xp)), Xp.result()
		}, e.bounds = function(t) {
			return Lh(t, r(Ep)), Ep.result()
		}, e.centroid = function(t) {
			return Lh(t, r(Op)), Op.result()
		}, e.projection = function(n) {
			return arguments.length ? (r = null == n ? (t = null, xp) : (t = n).stream, e) : t
		}, e.context = function(t) {
			return arguments.length ? (i = null == t ? (n = null, new $e) : new je(n = t), "function" != typeof o && i.pointRadius(o), e) : n
		}, e.pointRadius = function(t) {
			return arguments.length ? (o = "function" == typeof t ? t : (i.pointRadius(+t), +t), e) : o
		}, e.projection(t).context(n)
	}, t.geoAlbers = Qp, t.geoAlbersUsa = function() {
		function t(t) {
			var n = t[0],
				e = t[1];
			return a = null, i.point(n, e), a || (o.point(n, e), a) || (u.point(n, e), a)
		}

		function n() {
			return e = r = null, t
		}
		var e, r, i, o, u, a, c = Qp(),
			s = Gp().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]),
			f = Gp().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]),
			l = {
				point: function(t, n) {
					a = [t, n]
				}
			};
		return t.invert = function(t) {
			var n = c.scale(),
				e = c.translate(),
				r = (t[0] - e[0]) / n,
				i = (t[1] - e[1]) / n;
			return (i >= .12 && i < .234 && r >= -.425 && r < -.214 ? s : i >= .166 && i < .234 && r >= -.214 && r < -.115 ? f : c).invert(t)
		}, t.stream = function(t) {
			return e && r === t ? e : e = function(t) {
				var n = t.length;
				return {
					point: function(e, r) {
						for (var i = -1; ++i < n;) t[i].point(e, r)
					},
					sphere: function() {
						for (var e = -1; ++e < n;) t[e].sphere()
					},
					lineStart: function() {
						for (var e = -1; ++e < n;) t[e].lineStart()
					},
					lineEnd: function() {
						for (var e = -1; ++e < n;) t[e].lineEnd()
					},
					polygonStart: function() {
						for (var e = -1; ++e < n;) t[e].polygonStart()
					},
					polygonEnd: function() {
						for (var e = -1; ++e < n;) t[e].polygonEnd()
					}
				}
			}([c.stream(r = t), s.stream(t), f.stream(t)])
		}, t.precision = function(t) {
			return arguments.length ? (c.precision(t), s.precision(t), f.precision(t), n()) : c.precision()
		}, t.scale = function(n) {
			return arguments.length ? (c.scale(n), s.scale(.35 * n), f.scale(n), t.translate(c.translate())) : c.scale()
		}, t.translate = function(t) {
			if (!arguments.length) return c.translate();
			var e = c.scale(),
				r = +t[0],
				a = +t[1];
			return i = c.translate(t).clipExtent([
				[r - .455 * e, a - .238 * e],
				[r + .455 * e, a + .238 * e]
			]).stream(l), o = s.translate([r - .307 * e, a + .201 * e]).clipExtent([
				[r - .425 * e + ph, a + .12 * e + ph],
				[r - .214 * e - ph, a + .234 * e - ph]
			]).stream(l), u = f.translate([r - .205 * e, a + .212 * e]).clipExtent([
				[r - .214 * e + ph, a + .166 * e + ph],
				[r - .115 * e - ph, a + .234 * e - ph]
			]).stream(l), n()
		}, t.fitExtent = function(n, e) {
			return Je(t, n, e)
		}, t.fitSize = function(n, e) {
			return Ke(t, n, e)
		}, t.fitWidth = function(n, e) {
			return tr(t, n, e)
		}, t.fitHeight = function(n, e) {
			return nr(t, n, e)
		}, t.scale(1070)
	}, t.geoAzimuthalEqualArea = function() {
		return er(Jp).scale(124.75).clipAngle(179.999)
	}, t.geoAzimuthalEqualAreaRaw = Jp, t.geoAzimuthalEquidistant = function() {
		return er(Kp).scale(79.4188).clipAngle(179.999)
	}, t.geoAzimuthalEquidistantRaw = Kp, t.geoConicConformal = function() {
		return ir(lr).scale(109.5).parallels([30, 30])
	}, t.geoConicConformalRaw = lr, t.geoConicEqualArea = Gp, t.geoConicEqualAreaRaw = or, t.geoConicEquidistant = function() {
		return ir(pr).scale(131.154).center([0, 13.9389])
	}, t.geoConicEquidistantRaw = pr, t.geoEquirectangular = function() {
		return er(hr).scale(152.63)
	}, t.geoEquirectangularRaw = hr, t.geoGnomonic = function() {
		return er(dr).scale(144.049).clipAngle(60)
	}, t.geoGnomonicRaw = dr, t.geoIdentity = function() {
		function t() {
			return i = o = null, u
		}
		var n, e, r, i, o, u, a = 1,
			c = 0,
			s = 0,
			f = 1,
			l = 1,
			h = xp,
			p = null,
			d = xp;
		return u = {
			stream: function(t) {
				return i && o === t ? i : i = h(d(o = t))
			},
			postclip: function(i) {
				return arguments.length ? (d = i, p = n = e = r = null, t()) : d
			},
			clipExtent: function(i) {
				return arguments.length ? (d = null == i ? (p = n = e = r = null, xp) : ye(p = +i[0][0], n = +i[0][1], e = +i[1][0], r = +i[1][1]), t()) : null == p ? null : [
					[p, n],
					[e, r]
				]
			},
			scale: function(n) {
				return arguments.length ? (h = vr((a = +n) * f, a * l, c, s), t()) : a
			},
			translate: function(n) {
				return arguments.length ? (h = vr(a * f, a * l, c = +n[0], s = +n[1]), t()) : [c, s]
			},
			reflectX: function(n) {
				return arguments.length ? (h = vr(a * (f = n ? -1 : 1), a * l, c, s), t()) : f < 0
			},
			reflectY: function(n) {
				return arguments.length ? (h = vr(a * f, a * (l = n ? -1 : 1), c, s), t()) : l < 0
			},
			fitExtent: function(t, n) {
				return Je(u, t, n)
			},
			fitSize: function(t, n) {
				return Ke(u, t, n)
			},
			fitWidth: function(t, n) {
				return tr(u, t, n)
			},
			fitHeight: function(t, n) {
				return nr(u, t, n)
			}
		}
	}, t.geoProjection = er, t.geoProjectionMutator = rr, t.geoMercator = function() {
		return sr(cr).scale(961 / _h)
	}, t.geoMercatorRaw = cr, t.geoNaturalEarth1 = function() {
		return er(gr).scale(175.295)
	}, t.geoNaturalEarth1Raw = gr, t.geoOrthographic = function() {
		return er(_r).scale(249.5).clipAngle(90 + ph)
	}, t.geoOrthographicRaw = _r, t.geoStereographic = function() {
		return er(yr).scale(250).clipAngle(142)
	}, t.geoStereographicRaw = yr, t.geoTransverseMercator = function() {
		var t = sr(mr),
			n = t.center,
			e = t.rotate;
		return t.center = function(t) {
			return arguments.length ? n([-t[1], t[0]]) : (t = n(), [t[1], -t[0]])
		}, t.rotate = function(t) {
			return arguments.length ? e([t[0], t[1], t.length > 2 ? t[2] + 90 : 90]) : (t = e(), [t[0], t[1], t[2] - 90])
		}, e([0, 0, 90]).scale(159.155)
	}, t.geoTransverseMercatorRaw = mr, t.geoRotation = tp, t.geoStream = Lh, t.geoTransform = function(t) {
		return {
			stream: Ze(t)
		}
	}, t.cluster = function() {
		function t(t) {
			var o, u = 0;
			t.eachAfter(function(t) {
				var e = t.children;
				e ? (t.x = function(t) {
					return t.reduce(br, 0) / t.length
				}(e), t.y = function(t) {
					return 1 + t.reduce(wr, 0)
				}(e)) : (t.x = o ? u += n(t, o) : 0, t.y = 0, o = t)
			});
			var a = function(t) {
					for (var n; n = t.children;) t = n[0];
					return t
				}(t),
				c = function(t) {
					for (var n; n = t.children;) t = n[n.length - 1];
					return t
				}(t),
				s = a.x - n(a, c) / 2,
				f = c.x + n(c, a) / 2;
			return t.eachAfter(i ? function(n) {
				n.x = (n.x - t.x) * e, n.y = (t.y - n.y) * r
			} : function(n) {
				n.x = (n.x - s) / (f - s) * e, n.y = (1 - (t.y ? n.y / t.y : 1)) * r
			})
		}
		var n = xr,
			e = 1,
			r = 1,
			i = !1;
		return t.separation = function(e) {
			return arguments.length ? (n = e, t) : n
		}, t.size = function(n) {
			return arguments.length ? (i = !1, e = +n[0], r = +n[1], t) : i ? null : [e, r]
		}, t.nodeSize = function(n) {
			return arguments.length ? (i = !0, e = +n[0], r = +n[1], t) : i ? [e, r] : null
		}, t
	}, t.hierarchy = Tr, t.pack = function() {
		function t(t) {
			return t.x = e / 2, t.y = r / 2, n ? t.eachBefore(Br(n)).eachAfter(Hr(i, .5)).eachBefore(jr(1)) : t.eachBefore(Br(Yr)).eachAfter(Hr(Ir, 1)).eachAfter(Hr(i, t.r / Math.min(e, r))).eachBefore(jr(Math.min(e, r) / (2 * t.r))), t
		}
		var n = null,
			e = 1,
			r = 1,
			i = Ir;
		return t.radius = function(e) {
			return arguments.length ? (n = null == e ? null : Fr(e), t) : n
		}, t.size = function(n) {
			return arguments.length ? (e = +n[0], r = +n[1], t) : [e, r]
		}, t.padding = function(n) {
			return arguments.length ? (i = "function" == typeof n ? n : ed(+n), t) : i
		}, t
	}, t.packSiblings = function(t) {
		return Or(t), t
	}, t.packEnclose = nd, t.partition = function() {
		function t(t) {
			var o = t.height + 1;
			return t.x0 = t.y0 = r, t.x1 = n, t.y1 = e / o, t.eachBefore(function(t, n) {
				return function(e) {
					e.children && id(e, e.x0, t * (e.depth + 1) / n, e.x1, t * (e.depth + 2) / n);
					var i = e.x0,
						o = e.y0,
						u = e.x1 - r,
						a = e.y1 - r;
					u < i && (i = u = (i + u) / 2), a < o && (o = a = (o + a) / 2), e.x0 = i, e.y0 = o, e.x1 = u, e.y1 = a
				}
			}(e, o)), i && t.eachBefore(rd), t
		}
		var n = 1,
			e = 1,
			r = 0,
			i = !1;
		return t.round = function(n) {
			return arguments.length ? (i = !!n, t) : i
		}, t.size = function(r) {
			return arguments.length ? (n = +r[0], e = +r[1], t) : [n, e]
		}, t.padding = function(n) {
			return arguments.length ? (r = +n, t) : r
		}, t
	}, t.stratify = function() {
		function t(t) {
			var r, i, o, u, a, c, s, f = t.length,
				l = new Array(f),
				h = {};
			for (i = 0; i < f; ++i) r = t[i], a = l[i] = new Er(r), null != (c = n(r, i, t)) && (c += "") && (h[s = od + (a.id = c)] = s in h ? ad : a);
			for (i = 0; i < f; ++i)
				if (a = l[i], null != (c = e(t[i], i, t)) && (c += "")) {
					if (!(u = h[od + c])) throw new Error("missing: " + c);
					if (u === ad) throw new Error("ambiguous: " + c);
					u.children ? u.children.push(a) : u.children = [a], a.parent = u
				} else {
					if (o) throw new Error("multiple roots");
					o = a
				} if (!o) throw new Error("no root");
			if (o.parent = ud, o.eachBefore(function(t) {
					t.depth = t.parent.depth + 1, --f
				}).eachBefore(Sr), o.parent = null, f > 0) throw new Error("cycle");
			return o
		}
		var n = Xr,
			e = Vr;
		return t.id = function(e) {
			return arguments.length ? (n = Fr(e), t) : n
		}, t.parentId = function(n) {
			return arguments.length ? (e = Fr(n), t) : e
		}, t
	}, t.tree = function() {
		function t(t) {
			var c = function(t) {
				for (var n, e, r, i, o, u = new Jr(t, 0), a = [u]; n = a.pop();)
					if (r = n._.children)
						for (n.children = new Array(o = r.length), i = o - 1; i >= 0; --i) a.push(e = n.children[i] = new Jr(r[i], i)), e.parent = n;
				return (u.parent = new Jr(null, 0)).children = [u], u
			}(t);
			if (c.eachAfter(n), c.parent.m = -c.z, c.eachBefore(e), a) t.eachBefore(r);
			else {
				var s = t,
					f = t,
					l = t;
				t.eachBefore(function(t) {
					t.x < s.x && (s = t), t.x > f.x && (f = t), t.depth > l.depth && (l = t)
				});
				var h = s === f ? 1 : i(s, f) / 2,
					p = h - s.x,
					d = o / (f.x + h + p),
					v = u / (l.depth || 1);
				t.eachBefore(function(t) {
					t.x = (t.x + p) * d, t.y = t.depth * v
				})
			}
			return t
		}

		function n(t) {
			var n = t.children,
				e = t.parent.children,
				r = t.i ? e[t.i - 1] : null;
			if (n) {
				(function(t) {
					for (var n, e = 0, r = 0, i = t.children, o = i.length; --o >= 0;)(n = i[o]).z += e, n.m += e, e += n.s + (r += n.c)
				})(t);
				var o = (n[0].z + n[n.length - 1].z) / 2;
				r ? (t.z = r.z + i(t._, r._), t.m = t.z - o) : t.z = o
			} else r && (t.z = r.z + i(t._, r._));
			t.parent.A = function(t, n, e) {
				if (n) {
					for (var r, o = t, u = t, a = n, c = o.parent.children[0], s = o.m, f = u.m, l = a.m, h = c.m; a = Zr(a), o = Wr(o), a && o;) c = Wr(c), (u = Zr(u)).a = t, (r = a.z + l - o.z - s + i(a._, o._)) > 0 && (Gr(Qr(a, t, e), t, r), s += r, f += r), l += a.m, s += o.m, h += c.m, f += u.m;
					a && !Zr(u) && (u.t = a, u.m += l - f), o && !Wr(c) && (c.t = o, c.m += s - h, e = t)
				}
				return e
			}(t, r, t.parent.A || e[0])
		}

		function e(t) {
			t._.x = t.z + t.parent.m, t.m += t.parent.m
		}

		function r(t) {
			t.x *= o, t.y = t.depth * u
		}
		var i = $r,
			o = 1,
			u = 1,
			a = null;
		return t.separation = function(n) {
			return arguments.length ? (i = n, t) : i
		}, t.size = function(n) {
			return arguments.length ? (a = !1, o = +n[0], u = +n[1], t) : a ? null : [o, u]
		}, t.nodeSize = function(n) {
			return arguments.length ? (a = !0, o = +n[0], u = +n[1], t) : a ? [o, u] : null
		}, t
	}, t.treemap = function() {
		function t(t) {
			return t.x0 = t.y0 = 0, t.x1 = i, t.y1 = o, t.eachBefore(n), u = [0], r && t.eachBefore(rd), t
		}

		function n(t) {
			var n = u[t.depth],
				r = t.x0 + n,
				i = t.y0 + n,
				o = t.x1 - n,
				h = t.y1 - n;
			o < r && (r = o = (r + o) / 2), h < i && (i = h = (i + h) / 2), t.x0 = r, t.y0 = i, t.x1 = o, t.y1 = h, t.children && (n = u[t.depth + 1] = a(t) / 2, r += l(t) - n, i += c(t) - n, o -= s(t) - n, h -= f(t) - n, o < r && (r = o = (r + o) / 2), h < i && (i = h = (i + h) / 2), e(t, r, i, o, h))
		}
		var e = fd,
			r = !1,
			i = 1,
			o = 1,
			u = [0],
			a = Ir,
			c = Ir,
			s = Ir,
			f = Ir,
			l = Ir;
		return t.round = function(n) {
			return arguments.length ? (r = !!n, t) : r
		}, t.size = function(n) {
			return arguments.length ? (i = +n[0], o = +n[1], t) : [i, o]
		}, t.tile = function(n) {
			return arguments.length ? (e = Fr(n), t) : e
		}, t.padding = function(n) {
			return arguments.length ? t.paddingInner(n).paddingOuter(n) : t.paddingInner()
		}, t.paddingInner = function(n) {
			return arguments.length ? (a = "function" == typeof n ? n : ed(+n), t) : a
		}, t.paddingOuter = function(n) {
			return arguments.length ? t.paddingTop(n).paddingRight(n).paddingBottom(n).paddingLeft(n) : t.paddingTop()
		}, t.paddingTop = function(n) {
			return arguments.length ? (c = "function" == typeof n ? n : ed(+n), t) : c
		}, t.paddingRight = function(n) {
			return arguments.length ? (s = "function" == typeof n ? n : ed(+n), t) : s
		}, t.paddingBottom = function(n) {
			return arguments.length ? (f = "function" == typeof n ? n : ed(+n), t) : f
		}, t.paddingLeft = function(n) {
			return arguments.length ? (l = "function" == typeof n ? n : ed(+n), t) : l
		}, t
	}, t.treemapBinary = function(t, n, e, r, i) {
		function o(t, n, e, r, i, u, a) {
			if (t >= n - 1) {
				var s = c[t];
				return s.x0 = r, s.y0 = i, s.x1 = u, void(s.y1 = a)
			}
			for (var l = f[t], h = e / 2 + l, p = t + 1, d = n - 1; p < d;) {
				var v = p + d >>> 1;
				f[v] < h ? p = v + 1 : d = v
			}
			h - f[p - 1] < f[p] - h && t + 1 < p && --p;
			var g = f[p] - l,
				_ = e - g;
			if (u - r > a - i) {
				var y = (r * _ + u * g) / e;
				o(t, p, g, r, i, y, a), o(p, n, _, y, i, u, a)
			} else {
				var m = (i * _ + a * g) / e;
				o(t, p, g, r, i, u, m), o(p, n, _, r, m, u, a)
			}
		}
		var u, a, c = t.children,
			s = c.length,
			f = new Array(s + 1);
		for (f[0] = a = u = 0; u < s; ++u) f[u + 1] = a += c[u].value;
		o(0, s, t.value, n, e, r, i)
	}, t.treemapDice = id, t.treemapSlice = cd, t.treemapSliceDice = function(t, n, e, r, i) {
		(1 & t.depth ? cd : id)(t, n, e, r, i)
	}, t.treemapSquarify = fd, t.treemapResquarify = ld, t.interpolate = vs, t.interpolateArray = cs, t.interpolateBasis = es, t.interpolateBasisClosed = rs, t.interpolateDate = ss, t.interpolateNumber = fs, t.interpolateObject = ls, t.interpolateRound = gs, t.interpolateString = ds, t.interpolateTransformCss = xs, t.interpolateTransformSvg = bs, t.interpolateZoom = Ms, t.interpolateRgb = os, t.interpolateRgbBasis = us, t.interpolateRgbBasisClosed = as, t.interpolateHsl = Ts, t.interpolateHslLong = Ns, t.interpolateLab = function(t, n) {
		var e = st((t = Z(t)).l, (n = Z(n)).l),
			r = st(t.a, n.a),
			i = st(t.b, n.b),
			o = st(t.opacity, n.opacity);
		return function(n) {
			return t.l = e(n), t.a = r(n), t.b = i(n), t.opacity = o(n), t + ""
		}
	}, t.interpolateHcl = ks, t.interpolateHclLong = Ss, t.interpolateCubehelix = Es, t.interpolateCubehelixLong = As, t.quantize = function(t, n) {
		for (var e = new Array(n), r = 0; r < n; ++r) e[r] = t(r / (n - 1));
		return e
	}, t.path = Vt, t.polygonArea = function(t) {
		for (var n, e = -1, r = t.length, i = t[r - 1], o = 0; ++e < r;) n = i, i = t[e], o += n[1] * i[0] - n[0] * i[1];
		return o / 2
	}, t.polygonCentroid = function(t) {
		for (var n, e, r = -1, i = t.length, o = 0, u = 0, a = t[i - 1], c = 0; ++r < i;) n = a, a = t[r], c += e = n[0] * a[1] - a[0] * n[1], o += (n[0] + a[0]) * e, u += (n[1] + a[1]) * e;
		return c *= 3, [o / c, u / c]
	}, t.polygonHull = function(t) {
		if ((e = t.length) < 3) return null;
		var n, e, r = new Array(e),
			i = new Array(e);
		for (n = 0; n < e; ++n) r[n] = [+t[n][0], +t[n][1], n];
		for (r.sort(ti), n = 0; n < e; ++n) i[n] = [r[n][0], -r[n][1]];
		var o = ni(r),
			u = ni(i),
			a = u[0] === o[0],
			c = u[u.length - 1] === o[o.length - 1],
			s = [];
		for (n = o.length - 1; n >= 0; --n) s.push(t[r[o[n]][2]]);
		for (n = +a; n < u.length - c; ++n) s.push(t[r[u[n]][2]]);
		return s
	}, t.polygonContains = function(t, n) {
		for (var e, r, i = t.length, o = t[i - 1], u = n[0], a = n[1], c = o[0], s = o[1], f = !1, l = 0; l < i; ++l) e = (o = t[l])[0], (r = o[1]) > a != s > a && u < (c - e) * (a - r) / (s - r) + e && (f = !f), c = e, s = r;
		return f
	}, t.polygonLength = function(t) {
		for (var n, e, r = -1, i = t.length, o = t[i - 1], u = o[0], a = o[1], c = 0; ++r < i;) n = u, e = a, n -= u = (o = t[r])[0], e -= a = o[1], c += Math.sqrt(n * n + e * e);
		return c
	}, t.quadtree = sn, t.queue = ui, t.randomUniform = gd, t.randomNormal = _d, t.randomLogNormal = yd, t.randomBates = xd, t.randomIrwinHall = md, t.randomExponential = bd, t.request = wd, t.html = Td, t.json = Nd, t.text = kd, t.xml = Sd, t.csv = Ad, t.tsv = Cd, t.scaleBand = ci, t.scalePoint = function() {
		return si(ci().paddingInner(1))
	}, t.scaleIdentity = vi, t.scaleLinear = di, t.scaleLog = bi, t.scaleOrdinal = ai, t.scaleImplicit = Ld, t.scalePow = Mi, t.scaleSqrt = function() {
		return Mi().exponent(.5)
	}, t.scaleQuantile = Ti, t.scaleQuantize = Ni, t.scaleThreshold = ki, t.scaleTime = function() {
		return jo(gv, dv, tv, Jd, Gd, Wd, Vd, Bd, t.timeFormat).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)])
	}, t.scaleUtc = function() {
		return jo(Iv, Ov, Tv, wv, xv, yv, Vd, Bd, t.utcFormat).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)])
	}, t.schemeCategory10 = rg, t.schemeCategory20b = ig, t.schemeCategory20c = og, t.schemeCategory20 = ug, t.interpolateCubehelixDefault = ag, t.interpolateRainbow = function(t) {
		(t < 0 || t > 1) && (t -= Math.floor(t));
		var n = Math.abs(t - .5);
		return fg.h = 360 * t - 100, fg.s = 1.5 - 1.5 * n, fg.l = .8 - .9 * n, fg + ""
	}, t.interpolateWarm = cg, t.interpolateCool = sg, t.interpolateViridis = lg, t.interpolateMagma = hg, t.interpolateInferno = pg, t.interpolatePlasma = dg, t.scaleSequential = Vo, t.creator = Ka, t.local = f, t.matcher = ic, t.mouse = cc, t.namespace = Ja, t.namespaces = Qa, t.clientPoint = ac, t.select = vc, t.selectAll = function(t) {
		return "string" == typeof t ? new S([document.querySelectorAll(t)], [document.documentElement]) : new S([null == t ? [] : t], dc)
	}, t.selection = E, t.selector = sc, t.selectorAll = fc, t.style = _, t.touch = gc, t.touches = function(t, n) {
		null == n && (n = uc().touches);
		for (var e = 0, r = n ? n.length : 0, i = new Array(r); e < r; ++e) i[e] = ac(t, n[e]);
		return i
	}, t.window = pc, t.customEvent = d, t.arc = function() {
		function t() {
			var t, s, f = +n.apply(this, arguments),
				l = +e.apply(this, arguments),
				h = o.apply(this, arguments) - Ng,
				p = u.apply(this, arguments) - Ng,
				d = gg(p - h),
				v = p > h;
			if (c || (c = t = Vt()), l < f && (s = l, l = f, f = s), l > Mg)
				if (d > kg - Mg) c.moveTo(l * yg(h), l * bg(h)), c.arc(0, 0, l, h, p, !v), f > Mg && (c.moveTo(f * yg(p), f * bg(p)), c.arc(0, 0, f, p, h, v));
				else {
					var g, _, y = h,
						m = p,
						x = h,
						b = p,
						w = d,
						M = d,
						T = a.apply(this, arguments) / 2,
						N = T > Mg && (i ? +i.apply(this, arguments) : wg(f * f + l * l)),
						k = xg(gg(l - f) / 2, +r.apply(this, arguments)),
						S = k,
						E = k;
					if (N > Mg) {
						var A = $o(N / f * bg(T)),
							C = $o(N / l * bg(T));
						(w -= 2 * A) > Mg ? (A *= v ? 1 : -1, x += A, b -= A) : (w = 0, x = b = (h + p) / 2), (M -= 2 * C) > Mg ? (C *= v ? 1 : -1, y += C, m -= C) : (M = 0, y = m = (h + p) / 2)
					}
					var z = l * yg(y),
						P = l * bg(y),
						R = f * yg(b),
						L = f * bg(b);
					if (k > Mg) {
						var q = l * yg(m),
							D = l * bg(m),
							U = f * yg(x),
							O = f * bg(x);
						if (d < Tg) {
							var F = w > Mg ? function(t, n, e, r, i, o, u, a) {
									var c = U - z,
										s = O - P,
										f = u - q,
										l = a - D,
										h = (f * (P - D) - l * (z - q)) / (l * c - f * s);
									return [z + h * c, P + h * s]
								}(0, 0, 0, 0, 0, 0, R, L) : [R, L],
								I = z - F[0],
								Y = P - F[1],
								B = q - F[0],
								H = D - F[1],
								j = 1 / bg(function(t) {
									return t > 1 ? 0 : t < -1 ? Tg : Math.acos(t)
								}((I * B + Y * H) / (wg(I * I + Y * Y) * wg(B * B + H * H))) / 2),
								X = wg(F[0] * F[0] + F[1] * F[1]);
							S = xg(k, (f - X) / (j - 1)), E = xg(k, (l - X) / (j + 1))
						}
					}
					M > Mg ? E > Mg ? (g = Ko(U, O, z, P, l, E, v), _ = Ko(q, D, R, L, l, E, v), c.moveTo(g.cx + g.x01, g.cy + g.y01), E < k ? c.arc(g.cx, g.cy, E, _g(g.y01, g.x01), _g(_.y01, _.x01), !v) : (c.arc(g.cx, g.cy, E, _g(g.y01, g.x01), _g(g.y11, g.x11), !v), c.arc(0, 0, l, _g(g.cy + g.y11, g.cx + g.x11), _g(_.cy + _.y11, _.cx + _.x11), !v), c.arc(_.cx, _.cy, E, _g(_.y11, _.x11), _g(_.y01, _.x01), !v))) : (c.moveTo(z, P), c.arc(0, 0, l, y, m, !v)) : c.moveTo(z, P), f > Mg && w > Mg ? S > Mg ? (g = Ko(R, L, q, D, f, -S, v), _ = Ko(z, P, U, O, f, -S, v), c.lineTo(g.cx + g.x01, g.cy + g.y01), S < k ? c.arc(g.cx, g.cy, S, _g(g.y01, g.x01), _g(_.y01, _.x01), !v) : (c.arc(g.cx, g.cy, S, _g(g.y01, g.x01), _g(g.y11, g.x11), !v), c.arc(0, 0, f, _g(g.cy + g.y11, g.cx + g.x11), _g(_.cy + _.y11, _.cx + _.x11), v), c.arc(_.cx, _.cy, S, _g(_.y11, _.x11), _g(_.y01, _.x01), !v))) : c.arc(0, 0, f, b, x, v) : c.lineTo(R, L)
				}
			else c.moveTo(0, 0);
			if (c.closePath(), t) return c = null, t + "" || null
		}
		var n = Wo,
			e = Zo,
			r = vg(0),
			i = null,
			o = Go,
			u = Qo,
			a = Jo,
			c = null;
		return t.centroid = function() {
			var t = (+n.apply(this, arguments) + +e.apply(this, arguments)) / 2,
				r = (+o.apply(this, arguments) + +u.apply(this, arguments)) / 2 - Tg / 2;
			return [yg(r) * t, bg(r) * t]
		}, t.innerRadius = function(e) {
			return arguments.length ? (n = "function" == typeof e ? e : vg(+e), t) : n
		}, t.outerRadius = function(n) {
			return arguments.length ? (e = "function" == typeof n ? n : vg(+n), t) : e
		}, t.cornerRadius = function(n) {
			return arguments.length ? (r = "function" == typeof n ? n : vg(+n), t) : r
		}, t.padRadius = function(n) {
			return arguments.length ? (i = null == n ? null : "function" == typeof n ? n : vg(+n), t) : i
		}, t.startAngle = function(n) {
			return arguments.length ? (o = "function" == typeof n ? n : vg(+n), t) : o
		}, t.endAngle = function(n) {
			return arguments.length ? (u = "function" == typeof n ? n : vg(+n), t) : u
		}, t.padAngle = function(n) {
			return arguments.length ? (a = "function" == typeof n ? n : vg(+n), t) : a
		}, t.context = function(n) {
			return arguments.length ? (c = null == n ? null : n, t) : c
		}, t
	}, t.area = Ag, t.line = Eg, t.pie = function() {
		function t(t) {
			var a, c, s, f, l, h = t.length,
				p = 0,
				d = new Array(h),
				v = new Array(h),
				g = +i.apply(this, arguments),
				_ = Math.min(kg, Math.max(-kg, o.apply(this, arguments) - g)),
				y = Math.min(Math.abs(_) / h, u.apply(this, arguments)),
				m = y * (_ < 0 ? -1 : 1);
			for (a = 0; a < h; ++a)(l = v[d[a] = a] = +n(t[a], a, t)) > 0 && (p += l);
			for (null != e ? d.sort(function(t, n) {
					return e(v[t], v[n])
				}) : null != r && d.sort(function(n, e) {
					return r(t[n], t[e])
				}), a = 0, s = p ? (_ - h * m) / p : 0; a < h; ++a, g = f) c = d[a], f = g + ((l = v[c]) > 0 ? l * s : 0) + m, v[c] = {
				data: t[c],
				index: a,
				value: l,
				startAngle: g,
				endAngle: f,
				padAngle: y
			};
			return v
		}
		var n = zg,
			e = Cg,
			r = null,
			i = vg(0),
			o = vg(kg),
			u = vg(0);
		return t.value = function(e) {
			return arguments.length ? (n = "function" == typeof e ? e : vg(+e), t) : n
		}, t.sortValues = function(n) {
			return arguments.length ? (e = n, r = null, t) : e
		}, t.sort = function(n) {
			return arguments.length ? (r = n, e = null, t) : r
		}, t.startAngle = function(n) {
			return arguments.length ? (i = "function" == typeof n ? n : vg(+n), t) : i
		}, t.endAngle = function(n) {
			return arguments.length ? (o = "function" == typeof n ? n : vg(+n), t) : o
		}, t.padAngle = function(n) {
			return arguments.length ? (u = "function" == typeof n ? n : vg(+n), t) : u
		}, t
	}, t.areaRadial = Lg, t.radialArea = Lg, t.lineRadial = Rg, t.radialLine = Rg, t.pointRadial = qg, t.linkHorizontal = function() {
		return cu(su)
	}, t.linkVertical = function() {
		return cu(fu)
	}, t.linkRadial = function() {
		var t = cu(lu);
		return t.angle = t.x, delete t.x, t.radius = t.y, delete t.y, t
	}, t.symbol = function() {
		function t() {
			var t;
			if (r || (r = t = Vt()), n.apply(this, arguments).draw(r, +e.apply(this, arguments)), t) return r = null, t + "" || null
		}
		var n = vg(Ug),
			e = vg(64),
			r = null;
		return t.type = function(e) {
			return arguments.length ? (n = "function" == typeof e ? e : vg(e), t) : n
		}, t.size = function(n) {
			return arguments.length ? (e = "function" == typeof n ? n : vg(+n), t) : e
		}, t.context = function(n) {
			return arguments.length ? (r = null == n ? null : n, t) : r
		}, t
	}, t.symbols = t_, t.symbolCircle = Ug, t.symbolCross = Og, t.symbolDiamond = Yg, t.symbolSquare = Vg, t.symbolStar = Xg, t.symbolTriangle = Wg, t.symbolWye = Kg, t.curveBasisClosed = function(t) {
		return new du(t)
	}, t.curveBasisOpen = function(t) {
		return new vu(t)
	}, t.curveBasis = function(t) {
		return new pu(t)
	}, t.curveBundle = e_, t.curveCardinalClosed = i_, t.curveCardinalOpen = o_, t.curveCardinal = r_, t.curveCatmullRomClosed = a_, t.curveCatmullRomOpen = c_, t.curveCatmullRom = u_, t.curveLinearClosed = function(t) {
		return new Nu(t)
	}, t.curveLinear = Sg, t.curveMonotoneX = function(t) {
		return new Cu(t)
	}, t.curveMonotoneY = function(t) {
		return new zu(t)
	}, t.curveNatural = function(t) {
		return new Ru(t)
	}, t.curveStep = function(t) {
		return new qu(t, .5)
	}, t.curveStepAfter = function(t) {
		return new qu(t, 1)
	}, t.curveStepBefore = function(t) {
		return new qu(t, 0)
	}, t.stack = function() {
		function t(t) {
			var o, u, a = n.apply(this, arguments),
				c = t.length,
				s = a.length,
				f = new Array(s);
			for (o = 0; o < s; ++o) {
				for (var l, h = a[o], p = f[o] = new Array(c), d = 0; d < c; ++d) p[d] = l = [0, +i(t[d], h, d, t)], l.data = t[d];
				p.key = h
			}
			for (o = 0, u = e(f); o < s; ++o) f[u[o]].index = o;
			return r(f, u), f
		}
		var n = vg([]),
			e = f_,
			r = s_,
			i = Du;
		return t.keys = function(e) {
			return arguments.length ? (n = "function" == typeof e ? e : vg(Dg.call(e)), t) : n
		}, t.value = function(n) {
			return arguments.length ? (i = "function" == typeof n ? n : vg(+n), t) : i
		}, t.order = function(n) {
			return arguments.length ? (e = null == n ? f_ : "function" == typeof n ? n : vg(Dg.call(n)), t) : e
		}, t.offset = function(n) {
			return arguments.length ? (r = null == n ? s_ : n, t) : r
		}, t
	}, t.stackOffsetExpand = function(t, n) {
		if ((r = t.length) > 0) {
			for (var e, r, i, o = 0, u = t[0].length; o < u; ++o) {
				for (i = e = 0; e < r; ++e) i += t[e][o][1] || 0;
				if (i)
					for (e = 0; e < r; ++e) t[e][o][1] /= i
			}
			s_(t, n)
		}
	}, t.stackOffsetDiverging = function(t, n) {
		if ((a = t.length) > 1)
			for (var e, r, i, o, u, a, c = 0, s = t[n[0]].length; c < s; ++c)
				for (o = u = 0, e = 0; e < a; ++e)(i = (r = t[n[e]][c])[1] - r[0]) >= 0 ? (r[0] = o, r[1] = o += i) : i < 0 ? (r[1] = u, r[0] = u += i) : r[0] = o
	}, t.stackOffsetNone = s_, t.stackOffsetSilhouette = function(t, n) {
		if ((e = t.length) > 0) {
			for (var e, r = 0, i = t[n[0]], o = i.length; r < o; ++r) {
				for (var u = 0, a = 0; u < e; ++u) a += t[u][r][1] || 0;
				i[r][1] += i[r][0] = -a / 2
			}
			s_(t, n)
		}
	}, t.stackOffsetWiggle = function(t, n) {
		if ((i = t.length) > 0 && (r = (e = t[n[0]]).length) > 0) {
			for (var e, r, i, o = 0, u = 1; u < r; ++u) {
				for (var a = 0, c = 0, s = 0; a < i; ++a) {
					for (var f = t[n[a]], l = f[u][1] || 0, h = (l - (f[u - 1][1] || 0)) / 2, p = 0; p < a; ++p) {
						var d = t[n[p]];
						h += (d[u][1] || 0) - (d[u - 1][1] || 0)
					}
					c += l, s += h * l
				}
				e[u - 1][1] += e[u - 1][0] = o, c && (o -= s / c)
			}
			e[u - 1][1] += e[u - 1][0] = o, s_(t, n)
		}
	}, t.stackOrderAscending = l_, t.stackOrderDescending = function(t) {
		return l_(t).reverse()
	}, t.stackOrderInsideOut = function(t) {
		var n, e, r = t.length,
			i = t.map(Uu),
			o = f_(t).sort(function(t, n) {
				return i[n] - i[t]
			}),
			u = 0,
			a = 0,
			c = [],
			s = [];
		for (n = 0; n < r; ++n) e = o[n], u < a ? (u += i[e], c.push(e)) : (a += i[e], s.push(e));
		return s.reverse().concat(c)
	}, t.stackOrderNone = f_, t.stackOrderReverse = function(t) {
		return f_(t).reverse()
	}, t.timeInterval = Si, t.timeMillisecond = Bd, t.timeMilliseconds = Hd, t.utcMillisecond = Bd, t.utcMilliseconds = Hd, t.timeSecond = Vd, t.timeSeconds = $d, t.utcSecond = Vd, t.utcSeconds = $d, t.timeMinute = Wd, t.timeMinutes = Zd, t.timeHour = Gd, t.timeHours = Qd, t.timeDay = Jd, t.timeDays = Kd, t.timeWeek = tv, t.timeWeeks = av, t.timeSunday = tv, t.timeSundays = av, t.timeMonday = nv, t.timeMondays = cv, t.timeTuesday = ev, t.timeTuesdays = sv, t.timeWednesday = rv, t.timeWednesdays = fv, t.timeThursday = iv, t.timeThursdays = lv, t.timeFriday = ov, t.timeFridays = hv, t.timeSaturday = uv, t.timeSaturdays = pv, t.timeMonth = dv, t.timeMonths = vv, t.timeYear = gv, t.timeYears = _v, t.utcMinute = yv, t.utcMinutes = mv, t.utcHour = xv, t.utcHours = bv, t.utcDay = wv, t.utcDays = Mv, t.utcWeek = Tv, t.utcWeeks = zv, t.utcSunday = Tv, t.utcSundays = zv, t.utcMonday = Nv, t.utcMondays = Pv, t.utcTuesday = kv, t.utcTuesdays = Rv, t.utcWednesday = Sv, t.utcWednesdays = Lv, t.utcThursday = Ev, t.utcThursdays = qv, t.utcFriday = Av, t.utcFridays = Dv, t.utcSaturday = Cv, t.utcSaturdays = Uv, t.utcMonth = Ov, t.utcMonths = Fv, t.utcYear = Iv, t.utcYears = Bv, t.timeFormatDefaultLocale = Yo, t.timeFormatLocale = Ri, t.isoFormat = $v, t.isoParse = Wv, t.now = gt, t.timer = mt, t.timerFlush = xt, t.timeout = Fs, t.interval = function(t, n, e) {
		var r = new yt,
			i = n;
		return null == n ? (r.restart(t, n, e), r) : (n = +n, e = null == e ? gt() : +e, r.restart(function o(u) {
			u += i, r.restart(o, i += n, e), t(u)
		}, n, e), r)
	}, t.transition = At, t.active = function(t, n) {
		var e, r, i = t.__transition;
		if (i) {
			n = null == n ? null : n + "";
			for (r in i)
				if ((e = i[r]).state > Hs && e.name === n) return new Et([
					[t]
				], Nf, n, +r)
		}
		return null
	}, t.interrupt = Gs, t.voronoi = function() {
		function t(t) {
			return new ca(t.map(function(r, i) {
				var o = [Math.round(n(r, i, t) / x_) * x_, Math.round(e(r, i, t) / x_) * x_];
				return o.index = i, o.data = r, o
			}), r)
		}
		var n = Ou,
			e = Fu,
			r = null;
		return t.polygons = function(n) {
			return t(n).polygons()
		}, t.links = function(n) {
			return t(n).links()
		}, t.triangles = function(n) {
			return t(n).triangles()
		}, t.x = function(e) {
			return arguments.length ? (n = "function" == typeof e ? e : h_(+e), t) : n
		}, t.y = function(n) {
			return arguments.length ? (e = "function" == typeof n ? n : h_(+n), t) : e
		}, t.extent = function(n) {
			return arguments.length ? (r = null == n ? null : [
				[+n[0][0], +n[0][1]],
				[+n[1][0], +n[1][1]]
			], t) : r && [
				[r[0][0], r[0][1]],
				[r[1][0], r[1][1]]
			]
		}, t.size = function(n) {
			return arguments.length ? (r = null == n ? null : [
				[0, 0],
				[+n[0], +n[1]]
			], t) : r && [r[1][0] - r[0][0], r[1][1] - r[0][1]]
		}, t
	}, t.zoom = function() {
		function n(t) {
			t.property("__zoom", da).on("wheel.zoom", s).on("mousedown.zoom", f).on("dblclick.zoom", l).filter(w).on("touchstart.zoom", h).on("touchmove.zoom", p).on("touchend.zoom touchcancel.zoom", v).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)")
		}

		function e(t, n) {
			return (n = Math.max(M[0], Math.min(M[1], n))) === t.k ? t : new sa(n, t.x, t.y)
		}

		function r(t, n, e) {
			var r = n[0] - e[0] * t.k,
				i = n[1] - e[1] * t.k;
			return r === t.x && i === t.y ? t : new sa(t.k, r, i)
		}

		function i(t) {
			return [(+t[0][0] + +t[1][0]) / 2, (+t[0][1] + +t[1][1]) / 2]
		}

		function o(t, n, e) {
			t.on("start.zoom", function() {
				u(this, arguments).start()
			}).on("interrupt.zoom end.zoom", function() {
				u(this, arguments).end()
			}).tween("zoom", function() {
				var t = arguments,
					r = u(this, t),
					o = m.apply(this, t),
					a = e || i(o),
					c = Math.max(o[1][0] - o[0][0], o[1][1] - o[0][1]),
					s = this.__zoom,
					f = "function" == typeof n ? n.apply(this, t) : n,
					l = k(s.invert(a).concat(c / s.k), f.invert(a).concat(c / f.k));
				return function(t) {
					if (1 === t) t = f;
					else {
						var n = l(t),
							e = c / n[2];
						t = new sa(e, a[0] - n[0] * e, a[1] - n[1] * e)
					}
					r.zoom(null, t)
				}
			})
		}

		function u(t, n) {
			for (var e, r = 0, i = S.length; r < i; ++r)
				if ((e = S[r]).that === t) return e;
			return new c(t, n)
		}

		function c(t, n) {
			this.that = t, this.args = n, this.index = -1, this.active = 0, this.extent = m.apply(t, n)
		}

		function s() {
			if (y.apply(this, arguments)) {
				var t = u(this, arguments),
					n = this.__zoom,
					i = Math.max(M[0], Math.min(M[1], n.k * Math.pow(2, b.apply(this, arguments)))),
					o = cc(this);
				if (t.wheel) t.mouse[0][0] === o[0] && t.mouse[0][1] === o[1] || (t.mouse[1] = n.invert(t.mouse[0] = o)), clearTimeout(t.wheel);
				else {
					if (n.k === i) return;
					t.mouse = [o, n.invert(o)], Gs(this), t.start()
				}
				T_(), t.wheel = setTimeout(function() {
					t.wheel = null, t.end()
				}, z), t.zoom("mouse", x(r(e(n, i), t.mouse[0], t.mouse[1]), t.extent, T))
			}
		}

		function f() {
			if (!_ && y.apply(this, arguments)) {
				var n = u(this, arguments),
					e = vc(t.event.view).on("mousemove.zoom", function() {
						if (T_(), !n.moved) {
							var e = t.event.clientX - o,
								i = t.event.clientY - a;
							n.moved = e * e + i * i > P
						}
						n.zoom("mouse", x(r(n.that.__zoom, n.mouse[0] = cc(n.that), n.mouse[1]), n.extent, T))
					}, !0).on("mouseup.zoom", function() {
						e.on("mousemove.zoom mouseup.zoom", null), C(t.event.view, n.moved), T_(), n.end()
					}, !0),
					i = cc(this),
					o = t.event.clientX,
					a = t.event.clientY;
				yc(t.event.view), la(), n.mouse = [i, this.__zoom.invert(i)], Gs(this), n.start()
			}
		}

		function l() {
			if (y.apply(this, arguments)) {
				var i = this.__zoom,
					u = cc(this),
					a = i.invert(u),
					c = i.k * (t.event.shiftKey ? .5 : 2),
					s = x(r(e(i, c), u, a), m.apply(this, arguments), T);
				T_(), N > 0 ? vc(this).transition().duration(N).call(o, s, u) : vc(this).call(n.transform, s)
			}
		}

		function h() {
			if (y.apply(this, arguments)) {
				var n, e, r, i, o = u(this, arguments),
					a = t.event.changedTouches,
					c = a.length;
				for (la(), e = 0; e < c; ++e) r = a[e], i = [i = gc(this, a, r.identifier), this.__zoom.invert(i), r.identifier], o.touch0 ? o.touch1 || (o.touch1 = i) : (o.touch0 = i, n = !0);
				if (g && (g = clearTimeout(g), !o.touch1)) return o.end(), void((i = vc(this).on("dblclick.zoom")) && i.apply(this, arguments));
				n && (g = setTimeout(function() {
					g = null
				}, A), Gs(this), o.start())
			}
		}

		function p() {
			var n, i, o, a, c = u(this, arguments),
				s = t.event.changedTouches,
				f = s.length;
			for (T_(), g && (g = clearTimeout(g)), n = 0; n < f; ++n) i = s[n], o = gc(this, s, i.identifier), c.touch0 && c.touch0[2] === i.identifier ? c.touch0[0] = o : c.touch1 && c.touch1[2] === i.identifier && (c.touch1[0] = o);
			if (i = c.that.__zoom, c.touch1) {
				var l = c.touch0[0],
					h = c.touch0[1],
					p = c.touch1[0],
					d = c.touch1[1],
					v = (v = p[0] - l[0]) * v + (v = p[1] - l[1]) * v,
					_ = (_ = d[0] - h[0]) * _ + (_ = d[1] - h[1]) * _;
				i = e(i, Math.sqrt(v / _)), o = [(l[0] + p[0]) / 2, (l[1] + p[1]) / 2], a = [(h[0] + d[0]) / 2, (h[1] + d[1]) / 2]
			} else {
				if (!c.touch0) return;
				o = c.touch0[0], a = c.touch0[1]
			}
			c.zoom("touch", x(r(i, o, a), c.extent, T))
		}

		function v() {
			var n, e, r = u(this, arguments),
				i = t.event.changedTouches,
				o = i.length;
			for (la(), _ && clearTimeout(_), _ = setTimeout(function() {
					_ = null
				}, A), n = 0; n < o; ++n) e = i[n], r.touch0 && r.touch0[2] === e.identifier ? delete r.touch0 : r.touch1 && r.touch1[2] === e.identifier && delete r.touch1;
			r.touch1 && !r.touch0 && (r.touch0 = r.touch1, delete r.touch1), r.touch0 ? r.touch0[1] = this.__zoom.invert(r.touch0[0]) : r.end()
		}
		var g, _, y = ha,
			m = pa,
			x = _a,
			b = va,
			w = ga,
			M = [0, 1 / 0],
			T = [
				[-1 / 0, -1 / 0],
				[1 / 0, 1 / 0]
			],
			N = 250,
			k = Ms,
			S = [],
			E = a("start", "zoom", "end"),
			A = 500,
			z = 150,
			P = 0;
		return n.transform = function(t, n) {
			var e = t.selection ? t.selection() : t;
			e.property("__zoom", da), t !== e ? o(t, n) : e.interrupt().each(function() {
				u(this, arguments).start().zoom(null, "function" == typeof n ? n.apply(this, arguments) : n).end()
			})
		}, n.scaleBy = function(t, e) {
			n.scaleTo(t, function() {
				return this.__zoom.k * ("function" == typeof e ? e.apply(this, arguments) : e)
			})
		}, n.scaleTo = function(t, o) {
			n.transform(t, function() {
				var t = m.apply(this, arguments),
					n = this.__zoom,
					u = i(t),
					a = n.invert(u),
					c = "function" == typeof o ? o.apply(this, arguments) : o;
				return x(r(e(n, c), u, a), t, T)
			})
		}, n.translateBy = function(t, e, r) {
			n.transform(t, function() {
				return x(this.__zoom.translate("function" == typeof e ? e.apply(this, arguments) : e, "function" == typeof r ? r.apply(this, arguments) : r), m.apply(this, arguments), T)
			})
		}, n.translateTo = function(t, e, r) {
			n.transform(t, function() {
				var t = m.apply(this, arguments),
					n = this.__zoom,
					o = i(t);
				return x(M_.translate(o[0], o[1]).scale(n.k).translate("function" == typeof e ? -e.apply(this, arguments) : -e, "function" == typeof r ? -r.apply(this, arguments) : -r), t, T)
			})
		}, c.prototype = {
			start: function() {
				return 1 == ++this.active && (this.index = S.push(this) - 1, this.emit("start")), this
			},
			zoom: function(t, n) {
				return this.mouse && "mouse" !== t && (this.mouse[1] = n.invert(this.mouse[0])), this.touch0 && "touch" !== t && (this.touch0[1] = n.invert(this.touch0[0])), this.touch1 && "touch" !== t && (this.touch1[1] = n.invert(this.touch1[0])), this.that.__zoom = n, this.emit("zoom"), this
			},
			end: function() {
				return 0 == --this.active && (S.splice(this.index, 1), this.index = -1, this.emit("end")), this
			},
			emit: function(t) {
				d(new function(t, n, e) {
					this.target = t, this.type = n, this.transform = e
				}(n, t, this.that.__zoom), E.apply, E, [t, this.that, this.args])
			}
		}, n.wheelDelta = function(t) {
			return arguments.length ? (b = "function" == typeof t ? t : w_(+t), n) : b
		}, n.filter = function(t) {
			return arguments.length ? (y = "function" == typeof t ? t : w_(!!t), n) : y
		}, n.touchable = function(t) {
			return arguments.length ? (w = "function" == typeof t ? t : w_(!!t), n) : w
		}, n.extent = function(t) {
			return arguments.length ? (m = "function" == typeof t ? t : w_([
				[+t[0][0], +t[0][1]],
				[+t[1][0], +t[1][1]]
			]), n) : m
		}, n.scaleExtent = function(t) {
			return arguments.length ? (M[0] = +t[0], M[1] = +t[1], n) : [M[0], M[1]]
		}, n.translateExtent = function(t) {
			return arguments.length ? (T[0][0] = +t[0][0], T[1][0] = +t[1][0], T[0][1] = +t[0][1], T[1][1] = +t[1][1], n) : [
				[T[0][0], T[0][1]],
				[T[1][0], T[1][1]]
			]
		}, n.constrain = function(t) {
			return arguments.length ? (x = t, n) : x
		}, n.duration = function(t) {
			return arguments.length ? (N = +t, n) : N
		}, n.interpolate = function(t) {
			return arguments.length ? (k = t, n) : k
		}, n.on = function() {
			var t = E.on.apply(E, arguments);
			return t === E ? n : t
		}, n.clickDistance = function(t) {
			return arguments.length ? (P = (t = +t) * t, n) : Math.sqrt(P)
		}, n
	}, t.zoomTransform = fa, t.zoomIdentity = M_, Object.defineProperty(t, "__esModule", {
		value: !0
	})
});
