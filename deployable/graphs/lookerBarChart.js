(window.webpackJsonp = window.webpackJsonp || []).push([
  [22],
  {
    1495: function(e, t, i) {
      "use strict";
      var r = i(137);
      i(63),
        i(59),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.TooltipMapper = void 0);
      var n = r(i(141)),
        a = r(i(142)),
        s = r(i(155)),
        o = r(i(154)),
        l = r(i(156)),
        u = i(199),
        c = i(356),
        d = i(234),
        f = i(283),
        h = i(252),
        p = i(276),
        v = r(i(2129));
      i(2446);
      var y = (function(e) {
        function t(e, i) {
          var r;
          return (
            (0, n.default)(this, t),
            ((r = (0, s.default)(
              this,
              (0, o.default)(t).call(this)
            )).result = e),
            (r.config = i),
            r
          );
        }
        return (
          (0, l.default)(t, e),
          (0, a.default)(t, [
            {
              key: "serialize",
              value: function() {
                var e = this;
                return {
                  animation: this.animation(),
                  backgroundColor: this.backgroundColor(),
                  borderWidth: this.borderWidth(),
                  borderRadius: this.borderRadius(),
                  formatter: function() {
                    return e.formatter(this);
                  },
                  hideDelay: this.hideDelay(),
                  outside: this.outside(),
                  padding: this.padding(),
                  shadow: this.shadow(),
                  style: this.style(),
                  useHTML: this.useHTML()
                };
              }
            },
            {
              key: "animation",
              value: function() {
                return !1;
              }
            },
            {
              key: "backgroundColor",
              value: function() {
                return h.HIGHCHARTS.TOOLTIP.BACKGROUND_COLOR;
              }
            },
            {
              key: "borderWidth",
              value: function() {
                return h.HIGHCHARTS.TOOLTIP.BORDER_WIDTH;
              }
            },
            {
              key: "borderRadius",
              value: function() {
                return h.HIGHCHARTS.TOOLTIP.BORDER_RADIUS;
              }
            },
            {
              key: "formatter",
              value: function(e) {
                var t, i;
                if (
                  e.percentage &&
                  e.series.options.stacking === u.StackingType.Percent
                ) {
                  var r = (0, d.valueFormatter)(
                    e.percentage,
                    h.HIGHCHARTS.VALUE_FORMAT.PERCENT_0,
                    e.series.options.series.numberFormat
                  );
                  t = '<div class="percent">'.concat(r, "</div>");
                }
                var n,
                  a = c.Aesthetics.size(this.result, this.config);
                if (
                  a &&
                  e.series.options.series.field.name !== a.name &&
                  e.point.options &&
                  e.point.options.seriesDataPoint.formattedZ
                ) {
                  var s =
                    e.point.options &&
                    e.point.options.seriesDataPoint.formattedZ;
                  i = '\n      <div class="section">\n        <div>'
                    .concat(a.label, '</div>\n        <div class="value">')
                    .concat(s, "</div>\n      </div>\n      ");
                }
                var o = e.point.options && e.point.options.seriesDataPoint;
                if ((0, f.pointIsNull)(e.point)) n = h.HIGHCHARTS.NULL;
                else {
                  var l = e.series.options.series.field.value_format,
                    p = o && o.formattedY,
                    y = o && o.html,
                    g = o && o.rendered;
                  n =
                    p ||
                    y ||
                    g ||
                    (0, d.valueFormatter)(
                      e.y,
                      l,
                      e.series.options.series.numberFormat
                    );
                }
                var m = e.series.name,
                  b = (0, f.getXAxisTitle)(this.result, this.config),
                  x = c.Aesthetics.x(this.result)[0],
                  _ = e.point.name || e.point.x,
                  k = "";
                return (
                  x &&
                    (k = '\n        <div class="section">\n          '
                      .concat(
                        b ? "<div>".concat(b, "</div>") : "",
                        '\n          <div class="value">'
                      )
                      .concat(_, "</div>\n        </div>\n      ")),
                  v.default.sanitize(
                    "\n      <div>\n        "
                      .concat(
                        k,
                        '\n        <div class="section">\n          <div>'
                      )
                      .concat(
                        m,
                        '</div>\n          <div class="value">\n            '
                      )
                      .concat(n, "\n          </div>\n          ")
                      .concat(t || "", "\n        </div>\n        ")
                      .concat(i || "", "\n      </div>\n    ")
                  )
                );
              }
            },
            {
              key: "hideDelay",
              value: function() {
                return h.HIGHCHARTS.TOOLTIP.HIDE_DELAY;
              }
            },
            {
              key: "outside",
              value: function() {
                return !0;
              }
            },
            {
              key: "padding",
              value: function() {
                return h.HIGHCHARTS.TOOLTIP.PADDING;
              }
            },
            {
              key: "shadow",
              value: function() {
                return !1;
              }
            },
            {
              key: "style",
              value: function() {
                return { color: "white", fontWeight: 400 };
              }
            },
            {
              key: "useHTML",
              value: function() {
                return !0;
              }
            }
          ]),
          t
        );
      })(p.ResultMapper);
      t.TooltipMapper = y;
    },
    1835: function(e, t, i) {
      "use strict";
      var r = i(137);
      i(65),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.AbstractRectangularSeriesMapper = void 0);
      var n = r(i(141)),
        a = r(i(142)),
        s = r(i(155)),
        o = r(i(154)),
        l = r(i(761)),
        u = r(i(156)),
        c = i(252),
        d = i(199),
        f = (function(e) {
          function t() {
            return (
              (0, n.default)(this, t),
              (0, s.default)(this, (0, o.default)(t).apply(this, arguments))
            );
          }
          return (
            (0, u.default)(t, e),
            (0, a.default)(t, [
              {
                key: "serialize",
                value: function() {
                  return Object.assign(
                    {},
                    (0, l.default)(
                      (0, o.default)(t.prototype),
                      "serialize",
                      this
                    ).call(this),
                    {
                      borderWidth: this.borderWidth(),
                      groupPadding: this.groupPadding(),
                      pointPadding: this.pointPadding(),
                      hideStackedChartValueLabels: this.hideStackedChartValueLabels()
                    }
                  );
                }
              },
              {
                key: "borderWidth",
                value: function() {
                  return c.HIGHCHARTS.COLUMN.BORDER_WIDTH;
                }
              },
              {
                key: "groupPadding",
                value: function() {
                  return (
                    this.config.column_group_spacing_ratio *
                      c.HIGHCHARTS.COLUMN.GROUP_PADDING_RATIO ||
                    c.HIGHCHARTS.COLUMN.GROUP_PADDING_DEFAULT
                  );
                }
              },
              {
                key: "pointPadding",
                value: function() {
                  return (
                    this.config.column_spacing_ratio *
                      c.HIGHCHARTS.COLUMN.GROUP_PADDING_RATIO || 0
                  );
                }
              },
              {
                key: "tooltip",
                value: function() {
                  return { followPointer: !0 };
                }
              },
              {
                key: "hideStackedChartValueLabels",
                value: function() {
                  var e =
                    this.series.stacking === d.StackingType.Normal ||
                    this.series.stacking === d.StackingType.Percent;
                  return this.config.show_value_labels && e;
                }
              }
            ]),
            t
          );
        })(i(2307).AbstractSeriesMapper);
      t.AbstractRectangularSeriesMapper = f;
    },
    1836: function(e, t, i) {
      "use strict";
      var r, n;
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.ReferenceLineType = t.LabelPosition = void 0),
        (t.LabelPosition = r),
        (function(e) {
          (e.Left = "left"), (e.Center = "center"), (e.Right = "right");
        })(r || (t.LabelPosition = r = {})),
        (t.ReferenceLineType = n),
        (function(e) {
          (e.Line = "line"), (e.Range = "range"), (e.Margins = "margins");
        })(n || (t.ReferenceLineType = n = {}));
    },
    2084: function(e, t, i) {
      "use strict";
      var r = i(137);
      i(162),
        i(172),
        i(178),
        i(63),
        i(64),
        i(36),
        i(160),
        i(146),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.validateTrellis = p),
        (t.valueFormatValidator = v),
        (t.hline = t.hcolumn = t.hscatter = t.hbar = t.harea = t.MAX_TRELLIS_SIZE = void 0);
      var n = r(i(171)),
        a = i(2085),
        s = i(199),
        o = i(1477),
        l = r(i(5203)),
        u = i(4737),
        c = r(i(906)),
        d = r(i(888)),
        f = i(2476),
        h = function(e, t) {
          var i =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
          return {
            id: "looker_" + e,
            label: t,
            options: i,
            lookerInternal: { primary: !0, iconClass: "lk-icon-vis-" + e },
            create: function(e) {},
            update: function(e, t, i, r, n) {
              var s = this;
              this.clearErrors(), (r.data = e);
              try {
                if (!e.length || void 0 === i.type)
                  return void this.addError({
                    title: "No Results",
                    group: "No Results",
                    retryable: !0
                  });
                this.clearErrors("No Results");
                var u = o.SeriesGenerator.generateSeries(r, i),
                  c = this.validate(r, i, u);
                if (c) return void this.addError(c);
                var f = this,
                  h = function(e) {
                    s.charts = new l.default(t, e, i, r).charts;
                  },
                  p = d.default.openDrillMenu,
                  v = new a.HighchartsCartesianMapper(
                    r,
                    i,
                    u,
                    function e(t) {
                      f.trigger("updateConfig", [{ hidden_series: t }]),
                        (i.hidden_series = t),
                        (u = o.SeriesGenerator.generateSeries(r, i));
                      var n = new a.HighchartsCartesianMapper(
                        r,
                        i,
                        u,
                        e,
                        p
                      ).serialize();
                      h(n);
                    },
                    p
                  ),
                  y = v.serialize();
                if (v.errors.length) {
                  var g = !0,
                    m = !1,
                    b = void 0;
                  try {
                    for (
                      var x, _ = v.errors[Symbol.iterator]();
                      !(g = (x = _.next()).done);
                      g = !0
                    ) {
                      var k = x.value;
                      this.addError(k);
                    }
                  } catch (e) {
                    (m = !0), (b = e);
                  } finally {
                    try {
                      g || null == _.return || _.return();
                    } finally {
                      if (m) throw b;
                    }
                  }
                } else h(y);
              } catch (c) {
                this.addError({
                  group: "Exception",
                  title: "Internal Chart Error",
                  message: "Please ensure that ".concat(
                    i.type,
                    " visualizations support the provided data."
                  )
                }),
                  console.error(c);
              }
            },
            destroy: function() {},
            validate: function(t, i, r) {
              var n = v(t, i);
              if (n) return n;
              var a = (0, f.queryResponseValidator)(e, t);
              if (a) return a;
              var s = !0,
                o = !1,
                l = void 0;
              try {
                for (
                  var u, c = r[Symbol.iterator]();
                  !(s = (u = c.next()).done);
                  s = !0
                ) {
                  var d = u.value.validate();
                  if (d) return d;
                }
              } catch (e) {
                (o = !0), (l = e);
              } finally {
                try {
                  s || null == c.return || c.return();
                } finally {
                  if (o) throw l;
                }
              }
              return (a = p(t, i)) || null;
            }
          };
        };
      function p(e, t) {
        if (!t) return null;
        var i = c.default.getVisibleDataRangeFromVisConfig(e.data, t),
          r = i[1] - i[0];
        return t.trellis === s.TrellisType.Pivot &&
          e.pivots &&
          e.pivots.length > y
          ? {
              title: "Grid By Error",
              message: "Max grid size is ".concat(
                y,
                '. Reduce Pivots with column limit or change Grid By to "none".'
              )
            }
          : t.trellis === s.TrellisType.Row && r > y
          ? {
              title: "Grid By Error",
              message: "Max grid size is ".concat(
                y,
                '. Reduce Rows with row limit, the "Limit Displayed Rows" option or change Grid By to "none".'
              )
            }
          : t.trellis !== s.TrellisType.Pivot || e.pivots
          ? null
          : {
              title: "Grid By Error",
              message: "Add a pivoted dimension to Grid by pivot."
            };
      }
      function v(e, t) {
        var i,
          r = function(t) {
            if (t)
              try {
                c.default.valueFormat(10, t, e.number_format),
                  c.default.valueFormat(10.2, t, e.number_format);
              } catch (e) {
                i = i || {
                  title: "Invalid Format String",
                  message:
                    "Format strings follow standard spreadsheet format using ECMA-376 spreadsheet format codes."
                };
              }
          };
        t && r(t.label_value_format);
        var a = [].concat(
            (0, n.default)(e.fields.dimension_like),
            (0, n.default)(e.fields.measure_like),
            (0, n.default)(e.fields.pivots)
          ),
          s = !0,
          o = !1,
          l = void 0;
        try {
          for (
            var u, d = a[Symbol.iterator]();
            !(s = (u = d.next()).done);
            s = !0
          ) {
            r(u.value.value_format);
          }
        } catch (e) {
          (o = !0), (l = e);
        } finally {
          try {
            s || null == d.return || d.return();
          } finally {
            if (o) throw l;
          }
        }
        if (t && t.reference_lines) {
          var f = !0,
            h = !1,
            p = void 0;
          try {
            for (
              var v, y = t.reference_lines[Symbol.iterator]();
              !(f = (v = y.next()).done);
              f = !0
            ) {
              r(v.value.value_format);
            }
          } catch (e) {
            (h = !0), (p = e);
          } finally {
            try {
              f || null == y.return || y.return();
            } finally {
              if (h) throw p;
            }
          }
        }
        if (t && t.y_axes) {
          var g = !0,
            m = !1,
            b = void 0;
          try {
            for (
              var x, _ = t.y_axes[Symbol.iterator]();
              !(g = (x = _.next()).done);
              g = !0
            ) {
              r(x.value.valueFormat);
            }
          } catch (e) {
            (m = !0), (b = e);
          } finally {
            try {
              g || null == _.return || _.return();
            } finally {
              if (m) throw b;
            }
          }
        }
        return i;
      }
      var y = 12;
      t.MAX_TRELLIS_SIZE = y;
      var g = h("area", "Area", (0, u.areaOptions)());
      t.harea = g;
      var m = h("bar", "Bar", (0, u.barOptions)());
      t.hbar = m;
      var b = h("scatter", "Bubble", (0, u.scatterOptions)());
      t.hscatter = b;
      var x = h("column", "Column", (0, u.columnOptions)());
      t.hcolumn = x;
      var _ = h("line", "Line", (0, u.lineOptions)());
      t.hline = _;
    },
    2085: function(e, t, i) {
      "use strict";
      var r = i(137);
      i(162),
        i(172),
        i(178),
        i(63),
        i(316),
        i(64),
        i(62),
        i(59),
        i(36),
        i(160),
        i(146),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.HighchartsCartesianMapper = void 0);
      var n = r(i(141)),
        a = r(i(142)),
        s = r(i(155)),
        o = r(i(154)),
        l = r(i(156)),
        u = i(252),
        c = i(199),
        d = i(356),
        f = i(2294),
        h = i(234),
        p = i(283),
        v = i(3111),
        y = i(1917),
        g = i(2492),
        m = i(3113),
        b = i(276),
        x = i(3114),
        _ = i(3125),
        k = i(1495),
        T = i(3126),
        S = i(3128),
        A = i(3129),
        M = (function(e) {
          function t(e, i, r, a, l) {
            var u;
            return (
              (0, n.default)(this, t),
              ((u = (0, s.default)(
                this,
                (0, o.default)(t).call(this)
              )).result = e),
              (u.config = i),
              (u.allSeries = r),
              (u.onDisabledSeriesChanged = a),
              (u.openDrillMenu = l),
              (u.sizeByField = d.Aesthetics.size(u.result, u.config)),
              (u.yAxes = new f.YAxesGenerator(
                u.result,
                u.config,
                u.allSeries
              ).yAxes()),
              u
            );
          }
          return (
            (0, l.default)(t, e),
            (0, a.default)(t, [
              {
                key: "serialize",
                value: function() {
                  return {
                    annotations: this.annotations(),
                    chart: this.chart(),
                    credits: this.credits(),
                    defs: this.defs(),
                    legend: this.legend(),
                    plotOptions: this.plotOptions(),
                    responsive: this.responsive(),
                    series: this.series(),
                    title: this.title(),
                    tooltip: this.tooltip(),
                    xAxis: this.xAxis(),
                    yAxis: this.yAxis()
                  };
                }
              },
              {
                key: "chart",
                value: function() {
                  return this.chartFactory(
                    y.lookerTypeToHighcharts[this.config.type]
                  ).serialize();
                }
              },
              {
                key: "credits",
                value: function() {
                  return { enabled: !1 };
                }
              },
              {
                key: "annotations",
                value: function() {
                  var e = [];
                  return (
                    this.config.show_dropoff &&
                      e.push(
                        new g.PercentOfPreviousMapper(
                          this.result,
                          this.config,
                          this.allSeries
                        ).serialize()
                      ),
                    this.config.show_totals_labels &&
                      this.config.show_silhouette &&
                      e.push(
                        new _.StackedSubtotalsMapper(
                          this.result,
                          this.config,
                          this.allSeries
                        ).serialize()
                      ),
                    e
                  );
                }
              },
              {
                key: "defs",
                value: function() {
                  return {
                    percentOfPreviousRightArrow: {
                      id: "percent-of-previous-right-arrow",
                      tagName: "marker",
                      children: [
                        {
                          tagName: "polygon",
                          points: "0,3.5 0,10.5 14,10.5, 14,14 20,7 14,0 14,3.5"
                        }
                      ],
                      markerWidth: 20,
                      markerHeight: 14,
                      refX: 8,
                      refY: 7
                    }
                  };
                }
              },
              {
                key: "legend",
                value: function() {
                  return this.config.hide_legend ||
                    (1 === this.allSeries.length && !this.sizeByField)
                    ? { enabled: !1 }
                    : {
                        align: this.config.legend_position || "center",
                        enabled: !0,
                        itemStyle: {
                          color: u.HIGHCHARTS.DEFAULT_TEXT_COLOR,
                          fontWeight: "normal",
                          textOverflow: void 0
                        },
                        labelFormatter: function() {
                          return this.options.isSizeByLegendSeries &&
                            this.legendItem
                            ? ((this.legendItem.element.style.color =
                                "#666666"),
                              (this.legendItem.element.style.cursor =
                                "default"),
                              (this.legendItem.element.style.fill = "#666666"),
                              (this.legendItem.element.onmouseover = null),
                              (this.legendItem.element.onmouseout = null),
                              this.legendSymbol && this.legendSymbol.hide(),
                              "Points sized by ".concat(this.name))
                            : (this.options.series &&
                                this.options.series.isSilhouetted &&
                                ((this.legendItem.element.style.color =
                                  "#cccccc"),
                                (this.legendItem.element.style.fill =
                                  "#cccccc")),
                              this.name);
                        },
                        layout:
                          this.config.legend_position &&
                          "center" !== this.config.legend_position
                            ? "vertical"
                            : "horizontal",
                        navigation: {
                          activeColor: u.HIGHCHARTS.LEGEND.NAV_ACTIVE_COLOR
                        },
                        reversed:
                          this.config.stacking === c.StackingType.Normal &&
                          !!this.config.legend_position &&
                          "center" !== this.config.legend_position,
                        verticalAlign:
                          this.config.legend_position &&
                          "center" !== this.config.legend_position
                            ? "middle"
                            : "bottom",
                        useHTML: !0
                      };
                }
              },
              {
                key: "plotOptions",
                value: function() {
                  return {
                    series: {
                      animation: !1,
                      cursor: this.openDrillMenu ? "pointer" : void 0,
                      connectNulls: !this.config.discontinuous_nulls,
                      turboThreshold: u.HIGHCHARTS.TURBO_THRESHOLD
                    }
                  };
                }
              },
              {
                key: "responsive",
                value: function() {
                  return new m.ResponsiveMapper(
                    this.allSeries.length,
                    this.yAxes.length
                  ).serialize();
                }
              },
              {
                key: "series",
                value: function() {
                  var e = this,
                    t = this.allSeries.map(function(t) {
                      return e.seriesFactory(t);
                    }),
                    i = this.sizeByLegendSeries(),
                    r = this.generateTrendLines(),
                    n = t
                      .map(function(e) {
                        return e.serialize();
                      })
                      .concat(r)
                      .concat(i);
                  return (
                    1 === this.allSeries.length &&
                      1 === i.length &&
                      (n[0].showInLegend = !1),
                    n
                  );
                }
              },
              {
                key: "title",
                value: function() {
                  return { text: null };
                }
              },
              {
                key: "tooltip",
                value: function() {
                  return new k.TooltipMapper(
                    this.result,
                    this.config
                  ).serialize();
                }
              },
              {
                key: "xAxis",
                value: function() {
                  var e = new S.XAxisMapper(
                      this.result,
                      this.config,
                      this.allSeries[0],
                      this.openDrillMenu
                    ),
                    t = e.serialize();
                  return (
                    e.errors.length &&
                      (this.errors = this.errors.concat(e.errors)),
                    t
                  );
                }
              },
              {
                key: "yAxis",
                value: function() {
                  var e = this,
                    t = !0;
                  return this.yAxes.map(function(i, r) {
                    var n = new A.YAxisMapper(
                        e.result,
                        e.config,
                        e.allSeries,
                        e.yAxes,
                        t,
                        i
                      ),
                      a = n.serialize();
                    return (
                      0 !== a.gridLineWidth && (t = !1),
                      n.errors.length && (e.errors = e.errors.concat(n.errors)),
                      a
                    );
                  });
                }
              },
              {
                key: "chartFactory",
                value: function(e) {
                  return new v.chartMapperToClass[e](this.result, this.config);
                }
              },
              {
                key: "seriesFactory",
                value: function(e) {
                  var t = (0, p.getYAxisIndex)(this.yAxes, e);
                  return new x.seriesTypeToClass[e.type](
                    e,
                    this.result,
                    this.config,
                    t,
                    this.onDisabledSeriesChanged,
                    this.openDrillMenu
                  );
                }
              },
              {
                key: "generateTrendLines",
                value: function() {
                  var e = d.Aesthetics.x(this.result)[0],
                    t = [];
                  if (
                    ((window.slipstream || {}).appState || {})
                      .allowTrendLines &&
                    this.config.trend_lines
                  ) {
                    var i = !0,
                      r = !1,
                      n = void 0;
                    try {
                      for (
                        var a, s = this.config.trend_lines[Symbol.iterator]();
                        !(i = (a = s.next()).done);
                        i = !0
                      ) {
                        var o = a.value,
                          l = (0, p.getYAxisIndex)(
                            this.yAxes,
                            this.allSeries[o.series_index - 1]
                          ),
                          u = new T.TrendLineMapper(
                            this.config,
                            o,
                            this.allSeries,
                            e,
                            l
                          );
                        t.push(u.serialize()),
                          u.errors &&
                            (this.errors = this.errors.concat(u.errors));
                      }
                    } catch (e) {
                      (r = !0), (n = e);
                    } finally {
                      try {
                        i || null == s.return || s.return();
                      } finally {
                        if (r) throw n;
                      }
                    }
                  }
                  return t;
                }
              },
              {
                key: "sizeByLegendSeries",
                value: function() {
                  return this.sizeByField &&
                    this.allSeries.some(function(e) {
                      return e.type === c.HighchartsChartType.Scatter;
                    })
                    ? [
                        {
                          events: {
                            legendItemClick: function() {
                              return !1;
                            }
                          },
                          isSizeByLegendSeries: !0,
                          legendIndex: this.allSeries.length,
                          marker: { enabled: !1 },
                          name: (0, h.fieldLabelHtml)(
                            this.sizeByField,
                            this.config,
                            this.result.fields
                          ),
                          visible: !1
                        }
                      ]
                    : [];
                }
              }
            ]),
            t
          );
        })(b.ResultMapper);
      t.HighchartsCartesianMapper = M;
    },
    2086: function(e, t, i) {
      "use strict";
      var r = i(137);
      i(65),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.AbstractLinearSeriesMapper = void 0);
      var n = r(i(141)),
        a = r(i(142)),
        s = r(i(155)),
        o = r(i(154)),
        l = r(i(761)),
        u = r(i(156)),
        c = i(252),
        d = i(199),
        f = (function(e) {
          function t() {
            return (
              (0, n.default)(this, t),
              (0, s.default)(this, (0, o.default)(t).apply(this, arguments))
            );
          }
          return (
            (0, u.default)(t, e),
            (0, a.default)(t, [
              {
                key: "serialize",
                value: function() {
                  return Object.assign(
                    {},
                    (0, l.default)(
                      (0, o.default)(t.prototype),
                      "serialize",
                      this
                    ).call(this),
                    { marker: this.marker(), step: this.step() }
                  );
                }
              },
              {
                key: "marker",
                value: function() {
                  var e =
                      this.config.series_point_styles &&
                      this.config.series_point_styles[this.series.id]
                        ? this.config.series_point_styles[this.series.id]
                        : "circle",
                    t =
                      this.type === d.HighchartsChartType.Scatter ||
                      this.type === d.HighchartsChartType.Bubble ||
                      "circle" === this.config.point_style ||
                      "circle_outline" === this.config.point_style;
                  return {
                    fillColor:
                      "circle_outline" === this.config.point_style
                        ? c.HIGHCHARTS.MARKER.FILL_COLOR
                        : null,
                    lineWidth:
                      "circle_outline" === this.config.point_style
                        ? c.HIGHCHARTS.MARKER.LINE_WIDTH
                        : void 0,
                    lineColor: null,
                    symbol: "auto" === e ? null : e,
                    enabled: t
                  };
                }
              },
              {
                key: "step",
                value: function() {
                  switch (this.config.interpolation) {
                    case "monotone":
                      return null;
                    case "step":
                      return "center";
                    case "step-before":
                      return "right";
                    case "step-after":
                      return "left";
                    default:
                      return !1;
                  }
                }
              }
            ]),
            t
          );
        })(i(2307).AbstractSeriesMapper);
      t.AbstractLinearSeriesMapper = f;
    },
    2306: function(e, t, i) {
      "use strict";
      var r = i(137);
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.ChartMapper = void 0);
      var n = r(i(141)),
        a = r(i(142)),
        s = r(i(155)),
        o = r(i(154)),
        l = r(i(156)),
        u = i(252),
        c = i(1917),
        d = (function(e) {
          function t(e, i) {
            var r;
            return (
              (0, n.default)(this, t),
              ((r = (0, s.default)(
                this,
                (0, o.default)(t).call(this)
              )).result = e),
              (r.config = i),
              r
            );
          }
          return (
            (0, l.default)(t, e),
            (0, a.default)(t, [
              {
                key: "serialize",
                value: function() {
                  return {
                    animation: this.animation(),
                    backgroundColor: this.backgroundColor(),
                    inverted: this.inverted(),
                    orderStacks: this.orderStacks(),
                    style: this.style(),
                    type: this.type()
                  };
                }
              },
              {
                key: "animation",
                value: function() {
                  return !1;
                }
              },
              {
                key: "backgroundColor",
                value: function() {
                  return "rgba(0, 0, 0, 0)";
                }
              },
              {
                key: "inverted",
                value: function() {
                  return !!this.config.swap_axes;
                }
              },
              {
                key: "orderStacks",
                value: function() {
                  return this.config.ordering || "none";
                }
              },
              {
                key: "style",
                value: function() {
                  return {
                    fontFamily: u.HIGHCHARTS.FONT_FAMILY,
                    fontSize: u.HIGHCHARTS.FONT_SIZE
                  };
                }
              },
              {
                key: "type",
                value: function() {
                  return c.lookerTypeToHighcharts[this.config.type];
                }
              }
            ]),
            t
          );
        })(i(276).ResultMapper);
      t.ChartMapper = d;
    },
    2307: function(e, t, i) {
      "use strict";
      var r = i(137);
      i(149),
        i(174),
        i(62),
        i(182),
        i(59),
        i(181),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.AbstractSeriesMapper = void 0);
      var n = r(i(141)),
        a = r(i(142)),
        s = r(i(155)),
        o = r(i(154)),
        l = r(i(156)),
        u = r(i(200)),
        c = i(252),
        d = i(3116),
        f = i(2308),
        h = (function(e) {
          function t(e, i, r, a, l, u) {
            var c;
            return (
              (0, n.default)(this, t),
              ((c = (0, s.default)(
                this,
                (0, o.default)(t).call(this)
              )).series = e),
              (c.result = i),
              (c.config = r),
              (c.yAxisIndex = a),
              (c.onDisabledSeriesChanged = l),
              (c.openDrillMenu = u),
              c
            );
          }
          return (
            (0, l.default)(t, e),
            (0, a.default)(t, [
              {
                key: "serialize",
                value: function() {
                  return {
                    color: this.color(),
                    data: this.data(),
                    dataLabels: this.dataLabels(),
                    events: this.events(),
                    id: this.series.id,
                    index: this.series.index,
                    legendIndex: this.series.legendIndex,
                    name: this.name(),
                    series: this.series,
                    stacking: this.series.stacking,
                    states: this.states(),
                    tooltip: this.tooltip(),
                    type: this.type,
                    visible: this.series.visible,
                    yAxis: this.yAxis(),
                    zIndex: this.zIndex()
                  };
                }
              },
              {
                key: "color",
                value: function() {
                  return this.series.isSilhouetted
                    ? c.HIGHCHARTS.SILHOUETTE_COLOR
                    : this.series.color;
                }
              },
              {
                key: "data",
                value: function() {
                  var e = this;
                  return this.series.data.map(function(t) {
                    return new f.DataPointMapper(
                      e.config,
                      e.series,
                      t
                    ).serialize();
                  });
                }
              },
              {
                key: "dataLabels",
                value: function() {
                  return new d.DataLabelsMapper(
                    this.result,
                    this.config,
                    this.series
                  ).serialize();
                }
              },
              {
                key: "events",
                value: function() {
                  var e = this;
                  return {
                    click: function(t) {
                      e.openDrillMenu &&
                        e.openDrillMenu({
                          element: (0, u.default)(t.target),
                          links: t.point.options.seriesDataPoint.links,
                          event: t
                        });
                    },
                    touchhold: function(t) {
                      if (e.openDrillMenu) {
                        this.pointer.reset();
                        var i = {
                          pageX: t.touches[0].pageX,
                          pageY: t.touches[0].pageY
                        };
                        e.openDrillMenu({
                          element: (0, u.default)(t.target),
                          links: t.target.point.options.seriesDataPoint.links,
                          event: i
                        });
                      }
                    },
                    legendItemClick: function(t) {
                      if (e.onDisabledSeriesChanged) {
                        var i = e.series.config.hidden_series || [],
                          r = t.target,
                          n = r.chart.series,
                          a = n
                            .filter(function(e) {
                              return !i.includes(e.options.id);
                            })
                            .map(function(e) {
                              return e.options.id;
                            });
                        if (t.browserEvent.altKey)
                          if (1 === a.length && a[0] === r.options.id) i = [];
                          else {
                            var s = (i = n.map(function(e) {
                              return e.options.id;
                            })).indexOf(r.options.id);
                            i.splice(s, 1);
                          }
                        else if (i.includes(r.options.id)) {
                          var o = i.indexOf(r.options.id);
                          i.splice(o, 1);
                        } else i.push(r.options.id);
                        return setTimeout(e.onDisabledSeriesChanged, 0, i), !1;
                      }
                      return !0;
                    }
                  };
                }
              },
              {
                key: "name",
                value: function() {
                  return this.series.nameHtml;
                }
              },
              {
                key: "states",
                value: function() {
                  return { inactive: { opacity: 1 } };
                }
              },
              {
                key: "tooltip",
                value: function() {
                  return { followPointer: !1 };
                }
              },
              {
                key: "yAxis",
                value: function() {
                  return this.yAxisIndex;
                }
              },
              {
                key: "zIndex",
                value: function() {
                  return (
                    -1 * this.series.legendIndex +
                    (this.series.numberOfSeries - 1)
                  );
                }
              }
            ]),
            t
          );
        })(i(276).ResultMapper);
      t.AbstractSeriesMapper = h;
    },
    2308: function(e, t, i) {
      "use strict";
      var r = i(137);
      i(59),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.DataPointMapper = void 0);
      var n = r(i(141)),
        a = r(i(142)),
        s = r(i(155)),
        o = r(i(154)),
        l = r(i(156)),
        u = i(199),
        c = i(283),
        d = i(3117),
        f = (function(e) {
          function t(e, i, r) {
            var a;
            return (
              (0, n.default)(this, t),
              ((a = (0, s.default)(
                this,
                (0, o.default)(t).call(this)
              )).config = e),
              (a.series = i),
              (a.dataPoint = r),
              a
            );
          }
          return (
            (0, l.default)(t, e),
            (0, a.default)(t, [
              {
                key: "serialize",
                value: function() {
                  return {
                    color: this.color(),
                    dataLabels: this.dataLabels(),
                    name: this.name(),
                    seriesDataPoint: this.dataPoint,
                    x: this.x(),
                    y: this.y(),
                    z: this.z()
                  };
                }
              },
              {
                key: "color",
                value: function() {
                  return this.dataPoint.color;
                }
              },
              {
                key: "dataLabels",
                value: function() {
                  return new d.DataPointLabelMapper(
                    this.y(),
                    this.series,
                    this.config
                  ).serialize();
                }
              },
              {
                key: "name",
                value: function() {
                  return this.dataPoint.formattedX
                    ? "".concat(this.dataPoint.formattedX, " ")
                    : void 0;
                }
              },
              {
                key: "x",
                value: function() {
                  if (this.series.xAxisType !== u.AxisType.Categorical)
                    return this.dataPoint.x;
                }
              },
              {
                key: "y",
                value: function() {
                  if (this.dataPoint.isNull) {
                    if (
                      (0, c.isLinearChartType)(this.series.type) &&
                      !1 === this.config.show_null_points
                    )
                      return;
                    return this.dataPoint.y || 0;
                  }
                  return this.dataPoint.y;
                }
              },
              {
                key: "z",
                value: function() {
                  return this.dataPoint.isNull ? 0 : this.dataPoint.z;
                }
              }
            ]),
            t
          );
        })(i(276).ResultMapper);
      t.DataPointMapper = f;
    },
    2309: function(e, t, i) {
      "use strict";
      var r = i(137);
      i(62),
        i(187),
        i(176),
        i(163),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.getReferenceLineValue = function(e, t, i) {
          var r = u(e, t);
          if (void 0 !== r && i.stacking !== o.StackingType.Percent) return r;
          var n = Number(e);
          return isNaN(n)
            ? void 0
            : i.stacking === o.StackingType.Percent
            ? 100 * n
            : n;
        }),
        (t.getReferenceLineLabel = function(e, t, i, r) {
          for (var a in n) {
            var o = n[a];
            if (-1 !== e.indexOf("{{".concat(o, "}}"))) {
              var c = u(o, t);
              void 0 !== c &&
                (e = e.replace(
                  "{{".concat(o, "}}"),
                  (0, l.valueFormatter)(c, i, r)
                ));
            }
          }
          return (0, s.default)(e);
        }),
        (t.Statistic = void 0);
      var n,
        a = r(i(171)),
        s = r(i(408)),
        o = i(199),
        l = i(234);
      function u(e, t) {
        switch (e) {
          case n.Min:
            return Math.min.apply(Math, (0, a.default)(t));
          case n.Max:
            return Math.max.apply(Math, (0, a.default)(t));
          case n.Mean:
            return c(t);
          case n.Median:
            return (function(e) {
              e.sort(function(e, t) {
                return e - t;
              });
              var t = Math.floor((e.length - 1) / 2),
                i = Math.ceil((e.length - 1) / 2);
              return (e[t] + e[i]) / 2;
            })(t);
          case n.Deviation:
            return Math.sqrt(d(t));
          case n.Variance:
            return d(t);
          default:
            return;
        }
      }
      function c(e) {
        return e.length
          ? e.reduce(function(e, t) {
              return t + e;
            }, 0) / e.length
          : 0;
      }
      function d(e) {
        var t = c(e);
        return c(
          e.map(function(e) {
            var i = e - t;
            return i * i;
          })
        );
      }
      (t.Statistic = n),
        (function(e) {
          (e.Min = "min"),
            (e.Max = "max"),
            (e.Mean = "mean"),
            (e.Median = "median"),
            (e.Deviation = "deviation"),
            (e.Variance = "variance");
        })(n || (t.Statistic = n = {}));
    },
    2439: function(e, t, i) {
      e.exports = i(2440);
    },
    2440: function(e, t, i) {
      var r, n;
      /**
       * @license
       *
       * Regression.JS - Regression functions for javascript
       * http://tom-alexander.github.com/regression-js/
       *
       * copyright(c) 2013 Tom Alexander
       * Licensed under the MIT license.
       *
       * @module regression - Least-squares regression functions for JavaScript
       **/ void 0 ===
        (n =
          "function" ==
          typeof (r = function() {
            "use strict";
            function e(e, t) {
              var i =
                  e.reduce(function(e, t) {
                    return e + t[1];
                  }, 0) / e.length,
                r = e.reduce(function(e, t) {
                  var r = t[1] - i;
                  return e + r * r;
                }, 0);
              return (
                1 -
                e.reduce(function(e, i, r) {
                  var n = t[r],
                    a = i[1] - n[1];
                  return e + a * a;
                }, 0) /
                  r
              );
            }
            function t(e, t) {
              var i = Math.pow(10, t);
              return Math.round(e * i) / i;
            }
            var i = {
              linear: function(i, r, n) {
                for (
                  var a, s, o, l = [0, 0, 0, 0, 0], u = i.length, c = 0;
                  c < u;
                  c++
                )
                  null !== i[c][1] &&
                    ((l[0] += i[c][0]),
                    (l[1] += i[c][1]),
                    (l[2] += i[c][0] * i[c][0]),
                    (l[3] += i[c][0] * i[c][1]),
                    (l[4] += i[c][1] * i[c][1]));
                return (
                  (s = (u * l[3] - l[0] * l[1]) / (u * l[2] - l[0] * l[0])),
                  (o = l[1] / u - (s * l[0]) / u),
                  (a = i.map(function(e) {
                    var t = e[0];
                    return [t, s * t + o];
                  })),
                  {
                    r2: e(i, a),
                    equation: [s, o],
                    points: a,
                    string:
                      "y = " + t(s, n.precision) + "x + " + t(o, n.precision)
                  }
                );
              },
              linearthroughorigin: function(i, r, n) {
                for (var a, s, o = [0, 0], l = 0; l < i.length; l++)
                  null !== i[l][1] &&
                    ((o[0] += i[l][0] * i[l][0]), (o[1] += i[l][0] * i[l][1]));
                return (
                  (a = o[1] / o[0]),
                  (s = i.map(function(e) {
                    var t = e[0];
                    return [t, a * t];
                  })),
                  {
                    r2: e(i, s),
                    equation: [a],
                    points: s,
                    string: "y = " + t(a, n.precision) + "x"
                  }
                );
              },
              exponential: function(i, r, n) {
                for (
                  var a, s, o, l, u = [0, 0, 0, 0, 0, 0], c = 0;
                  c < i.length;
                  c++
                )
                  null !== i[c][1] &&
                    ((u[0] += i[c][0]),
                    (u[1] += i[c][1]),
                    (u[2] += i[c][0] * i[c][0] * i[c][1]),
                    (u[3] += i[c][1] * Math.log(i[c][1])),
                    (u[4] += i[c][0] * i[c][1] * Math.log(i[c][1])),
                    (u[5] += i[c][0] * i[c][1]));
                return (
                  (a = u[1] * u[2] - u[5] * u[5]),
                  (s = Math.exp((u[2] * u[3] - u[5] * u[4]) / a)),
                  (o = (u[1] * u[4] - u[5] * u[3]) / a),
                  (l = i.map(function(e) {
                    var t = e[0];
                    return [t, s * Math.exp(o * t)];
                  })),
                  {
                    r2: e(i, l),
                    equation: [s, o],
                    points: l,
                    string:
                      "y = " +
                      t(s, n.precision) +
                      "e^(" +
                      t(o, n.precision) +
                      "x)"
                  }
                );
              },
              logarithmic: function(i, r, n) {
                for (
                  var a, s, o, l = [0, 0, 0, 0], u = i.length, c = 0;
                  c < u;
                  c++
                )
                  null !== i[c][1] &&
                    ((l[0] += Math.log(i[c][0])),
                    (l[1] += i[c][1] * Math.log(i[c][0])),
                    (l[2] += i[c][1]),
                    (l[3] += Math.pow(Math.log(i[c][0]), 2)));
                return (
                  (s = (u * l[1] - l[2] * l[0]) / (u * l[3] - l[0] * l[0])),
                  (a = (l[2] - s * l[0]) / u),
                  (o = i.map(function(e) {
                    var t = e[0];
                    return [t, a + s * Math.log(t)];
                  })),
                  {
                    r2: e(i, o),
                    equation: [a, s],
                    points: o,
                    string:
                      "y = " +
                      t(a, n.precision) +
                      " + " +
                      t(s, n.precision) +
                      " ln(x)"
                  }
                );
              },
              power: function(i, r, n) {
                for (
                  var a, s, o, l = [0, 0, 0, 0], u = i.length, c = 0;
                  c < u;
                  c++
                )
                  null !== i[c][1] &&
                    ((l[0] += Math.log(i[c][0])),
                    (l[1] += Math.log(i[c][1]) * Math.log(i[c][0])),
                    (l[2] += Math.log(i[c][1])),
                    (l[3] += Math.pow(Math.log(i[c][0]), 2)));
                return (
                  (s = (u * l[1] - l[2] * l[0]) / (u * l[3] - l[0] * l[0])),
                  (a = Math.exp((l[2] - s * l[0]) / u)),
                  (o = i.map(function(e) {
                    var t = e[0];
                    return [t, a * Math.pow(t, s)];
                  })),
                  {
                    r2: e(i, o),
                    equation: [a, s],
                    points: o,
                    string:
                      "y = " + t(a, n.precision) + "x^" + t(s, n.precision)
                  }
                );
              },
              polynomial: function(i, r, n) {
                var a,
                  s,
                  o,
                  l,
                  u,
                  c,
                  d,
                  f,
                  h = [],
                  p = [],
                  v = 0,
                  y = 0,
                  g = i.length;
                for (s = void 0 === r ? 3 : r + 1, o = 0; o < s; o++) {
                  for (u = 0; u < g; u++)
                    null !== i[u][1] && (v += Math.pow(i[u][0], o) * i[u][1]);
                  for (h.push(v), v = 0, a = [], l = 0; l < s; l++) {
                    for (u = 0; u < g; u++)
                      null !== i[u][1] && (y += Math.pow(i[u][0], o + l));
                    a.push(y), (y = 0);
                  }
                  p.push(a);
                }
                for (
                  p.push(h),
                    d = (function(e, t) {
                      var i = 0,
                        r = 0,
                        n = 0,
                        a = 0,
                        s = 0,
                        o = e.length - 1,
                        l = new Array(t);
                      for (i = 0; i < o; i++) {
                        for (a = i, r = i + 1; r < o; r++)
                          Math.abs(e[i][r]) > Math.abs(e[i][a]) && (a = r);
                        for (n = i; n < o + 1; n++)
                          (s = e[n][i]), (e[n][i] = e[n][a]), (e[n][a] = s);
                        for (r = i + 1; r < o; r++)
                          for (n = o; n >= i; n--)
                            e[n][r] -= (e[n][i] * e[i][r]) / e[i][i];
                      }
                      for (r = o - 1; r >= 0; r--) {
                        for (s = 0, n = r + 1; n < o; n++) s += e[n][r] * l[n];
                        l[r] = (e[o][r] - s) / e[r][r];
                      }
                      return l;
                    })(p, s),
                    c = i.map(function(e) {
                      var t = e[0],
                        i = d.reduce(function(e, i, r) {
                          return e + i * Math.pow(t, r);
                        }, 0);
                      return [t, i];
                    }),
                    f = "y = ",
                    o = d.length - 1;
                  o >= 0;
                  o--
                )
                  f +=
                    o > 1
                      ? t(d[o], n.precision) + "x^" + o + " + "
                      : 1 === o
                      ? t(d[o], n.precision) + "x + "
                      : t(d[o], n.precision);
                return { r2: e(i, c), equation: d, points: c, string: f };
              },
              lastvalue: function(i, r, n) {
                for (var a = [], s = null, o = 0; o < i.length; o++)
                  null !== i[o][1] && isFinite(i[o][1])
                    ? ((s = i[o][1]), a.push([i[o][0], i[o][1]]))
                    : a.push([i[o][0], s]);
                return {
                  r2: e(i, a),
                  equation: [s],
                  points: a,
                  string: "" + t(s, n.precision)
                };
              }
            };
            return function(e, t, r, n) {
              var a = "object" == typeof r && void 0 === n ? r : n || {};
              return (
                a.precision || (a.precision = 2),
                "string" == typeof e ? i[e.toLowerCase()](t, r, a) : null
              );
            };
          })
            ? r.call(t, i, t, e)
            : r) || (e.exports = n);
    },
    2446: function(e, t, i) {
      var r = i(2447);
      "string" == typeof r && (r = [[e.i, r, ""]]);
      i(69)(r, {});
      r.locals && (e.exports = r.locals);
    },
    2447: function(e, t, i) {
      (e.exports = i(68)(!1)).push([
        e.i,
        ".highcharts-tooltip-container{z-index:9999}.highcharts-tooltip-container .percent{font-size:10px;font-weight:700}.highcharts-tooltip-container .section{padding:5px 0}.highcharts-tooltip-container .value{font-weight:700}\n",
        ""
      ]);
    },
    2448: function(e, t, i) {
      "use strict";
      var r = i(137);
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = void 0);
      var n = r(i(1837)),
        a = r(i(4394)),
        s = r(i(4395)),
        o = r(i(4396)),
        l = r(i(3394)),
        u = i(3133),
        c = i(3134),
        d = i(3135),
        f = i(3136),
        h = i(3137),
        p = i(3138),
        v = i(3139),
        y = i(3140),
        g = i(3142),
        m = i(3143),
        b = i(3144),
        x = i(3145),
        _ = i(3146),
        k = i(3147),
        T = i(3148);
      (0, a.default)(n.default),
        (0, s.default)(n.default),
        (0, o.default)(n.default),
        (0, l.default)(n.default),
        (0, u.addMarginsForOverflowExtension)(n.default),
        (0, c.clickableAxisLabelsExtension)(n.default),
        (0, d.columnSpacingExtension)(n.default),
        (0, f.dateFormatsExtension)(n.default),
        (0, h.followPointerWithCaretExtension)(n.default),
        (0, p.hoverableAxisLabelsExtension)(n.default),
        (0, v.keepOrderExtension)(n.default),
        (0, y.localizationExtension)(n.default),
        (0, g.negativeStackingAreaBehaviorExtension)(n.default),
        (0, m.orderStackedBarExtension)(n.default),
        (0, b.pointStyleExtension)(n.default),
        (0, x.seriesTouchholdExtension)(n.default),
        (0, _.showAreaPointInLegendExtension)(n.default),
        (0, k.sizeAxisTitleCorrectlyExtension)(n.default),
        (0, T.wrapLegendItems)(n.default);
      var S = n.default;
      (t.default = S), (e.exports = t.default);
    },
    2492: function(e, t, i) {
      "use strict";
      var r = i(137);
      i(63),
        i(149),
        i(62),
        i(60),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.PercentOfPreviousMapper = void 0);
      var n = r(i(171)),
        a = r(i(141)),
        s = r(i(142)),
        o = r(i(155)),
        l = r(i(154)),
        u = r(i(156)),
        c = i(252),
        d = i(199),
        f = i(234),
        h = i(283),
        p = (function(e) {
          function t(e, i, r) {
            var n;
            return (
              (0, a.default)(this, t),
              ((n = (0, o.default)(
                this,
                (0, l.default)(t).call(this)
              )).result = e),
              (n.config = i),
              (n.series = r),
              (n.visibleSeries = n.series.filter(function(e) {
                return e.visible;
              })),
              n
            );
          }
          return (
            (0, u.default)(t, e),
            (0, s.default)(t, [
              {
                key: "serialize",
                value: function() {
                  var e = this.generateLabelsAndShapes(),
                    t = e.labels,
                    i = e.shapes;
                  return {
                    id: this.id(),
                    labelOptions: this.labelOptions(),
                    labels: t,
                    shapes: i
                  };
                }
              },
              {
                key: "id",
                value: function() {
                  return d.AnnotationIds.PercentOfPrevious;
                }
              },
              {
                key: "labelOptions",
                value: function() {
                  return { verticalAlign: "middle", y: 1 };
                }
              },
              {
                key: "generateLabelsAndShapes",
                value: function() {
                  var e = this,
                    t = [],
                    i = [],
                    r = this.findYOffset(),
                    n =
                      (0, h.getXAxisType)(this.result, this.config) ===
                      d.AxisType.Datetime;
                  if (this.config.stacking) return { labels: t, shapes: i };
                  if (1 === this.visibleSeries.length) {
                    var a = this.visibleSeries[0].data;
                    a.forEach(function(s, o) {
                      if (o > 0) {
                        var l = a[o - 1];
                        if (l && l.y) {
                          var u = ((s.y || 0) / l.y) * 100,
                            c = n ? l.x : o - 1,
                            d = n ? s.x : o;
                          t.push(e.generateLabel(u, d - (d - c) / 2, r)),
                            i.push(e.generateArrowShape(c, d, r));
                        }
                      }
                    });
                  } else if (this.visibleSeries.length > 1) {
                    var s =
                      n && this.visibleSeries[0].data.length > 1
                        ? this.visibleSeries[0].data[1].x -
                          this.visibleSeries[0].data[0].x
                        : 0.9;
                    this.visibleSeries.forEach(function(a, o) {
                      o > 0 &&
                        a.data.forEach(function(a, l) {
                          var u = e.visibleSeries[o - 1].data[l];
                          if (u && u.y) {
                            var c = n ? a.x : l,
                              d = ((a.y || 0) / u.y) * 100,
                              f = c + (o / e.visibleSeries.length - 0.5) * s;
                            t.push(e.generateLabel(d, f, r));
                            var h =
                                c +
                                ((2 * o - 1) / (2 * e.visibleSeries.length) -
                                  0.5) *
                                  s,
                              p =
                                c +
                                ((2 * o + 1) / (2 * e.visibleSeries.length) -
                                  0.5) *
                                  s;
                            i.push(e.generateArrowShape(h, p, r));
                          }
                        });
                    });
                  }
                  return { labels: t, shapes: i };
                }
              },
              {
                key: "generateLabel",
                value: function(e, t, i) {
                  return {
                    distance: void 0,
                    point: { xAxis: 0, yAxis: 0, x: t, y: i },
                    shape: "none",
                    align: "center",
                    padding: 0,
                    backgroundColor: "transparent",
                    borderColor: "transparent",
                    text: (0, f.valueFormatter)(
                      e,
                      c.HIGHCHARTS.VALUE_FORMAT.PERCENT_2,
                      this.visibleSeries[0].numberFormat
                    ),
                    x: 6
                  };
                }
              },
              {
                key: "generateArrowShape",
                value: function(e, t, i) {
                  var r = (t - e) / 2;
                  return {
                    points: [
                      { xAxis: 0, yAxis: 0, x: e + r, y: i },
                      { xAxis: 0, yAxis: 0, x: e + r + r / 30, y: i }
                    ],
                    type: "path",
                    stroke: "rgba(0,0,0,0.75)",
                    strokeWidth: 3,
                    fill: "rgba(0,0,0,0.75)",
                    markerEnd: "percent-of-previous-right-arrow"
                  };
                }
              },
              {
                key: "findYOffset",
                value: function() {
                  var e = this.visibleSeries
                    .reduce(function(e, t) {
                      return e.concat(t.data);
                    }, [])
                    .filter(function(e) {
                      return void 0 !== e.y;
                    })
                    .map(function(e) {
                      return e.y;
                    }) || [0];
                  (this.config.y_axes &&
                    this.config.y_axes[0] &&
                    this.config.y_axes[0].unpinAxis) ||
                    e.push(0);
                  var t = Math.min.apply(Math, (0, n.default)(e)),
                    i = Math.max.apply(Math, (0, n.default)(e));
                  return (
                    this.config.y_axes &&
                      this.config.y_axes.length > 0 &&
                      (this.config.y_axes[0].minValue &&
                        (t = this.config.y_axes[0].minValue),
                      this.config.y_axes[0].maxValue &&
                        (i = this.config.y_axes[0].maxValue)),
                    t + (i - t) / 4
                  );
                }
              }
            ]),
            t
          );
        })(i(276).ResultMapper);
      t.PercentOfPreviousMapper = p;
    },
    276: function(e, t, i) {
      "use strict";
      var r = i(137);
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.ResultMapper = void 0);
      var n = r(i(141));
      t.ResultMapper = function e() {
        (0, n.default)(this, e), (this.errors = []);
      };
    },
    3111: function(e, t, i) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.chartMapperToClass = void 0);
      var r = i(3112),
        n = i(2306),
        a = {
          area: n.ChartMapper,
          bar: r.BarChartMapper,
          boxplot: n.ChartMapper,
          column: n.ChartMapper,
          line: n.ChartMapper,
          scatter: n.ChartMapper,
          waterfall: n.ChartMapper
        };
      t.chartMapperToClass = a;
    },
    3112: function(e, t, i) {
      "use strict";
      var r = i(137);
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.BarChartMapper = void 0);
      var n = r(i(141)),
        a = r(i(142)),
        s = r(i(155)),
        o = r(i(154)),
        l = r(i(156)),
        u = (function(e) {
          function t() {
            return (
              (0, n.default)(this, t),
              (0, s.default)(this, (0, o.default)(t).apply(this, arguments))
            );
          }
          return (
            (0, l.default)(t, e),
            (0, a.default)(t, [
              {
                key: "inverted",
                value: function() {
                  return !this.config.inverted;
                }
              }
            ]),
            t
          );
        })(i(2306).ChartMapper);
      t.BarChartMapper = u;
    },
    3113: function(e, t, i) {
      "use strict";
      var r = i(137);
      i(162),
        i(172),
        i(178),
        i(316),
        i(64),
        i(65),
        i(36),
        i(160),
        i(286),
        i(146),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.ResponsiveMapper = void 0);
      var n = r(i(141)),
        a = r(i(142)),
        s = r(i(155)),
        o = r(i(154)),
        l = r(i(156)),
        u = i(252),
        c = i(199),
        d = (function(e) {
          function t(e, i) {
            var r;
            return (
              (0, n.default)(this, t),
              ((r = (0, s.default)(
                this,
                (0, o.default)(t).call(this)
              )).numSeries = e),
              (r.numYAxes = i),
              r
            );
          }
          return (
            (0, l.default)(t, e),
            (0, a.default)(t, [
              {
                key: "serialize",
                value: function() {
                  return {
                    rules: [
                      this.small(),
                      this.mini(),
                      this.tiny(),
                      this.legend()
                    ]
                  };
                }
              },
              {
                key: "tiny",
                value: function() {
                  var e = this;
                  return {
                    condition: {
                      callback: function() {
                        return (
                          (this.chartHeight <
                            u.HIGHCHARTS.RESPONSIVE.TINY_HEIGHT ||
                            this.chartWidth <
                              u.HIGHCHARTS.RESPONSIVE.TINY_WIDTH) &&
                          (e.hidePercentOfPrevious(this),
                          e.hideSubtotals(this),
                          !0)
                        );
                      }
                    },
                    chartOptions: {
                      series: new Array(this.numSeries).fill(
                        this.hideDataLabels()
                      ),
                      xAxis: Object.assign(
                        {},
                        this.hideAxisTitle(),
                        this.hideAxisLabels()
                      ),
                      yAxis: new Array(this.numYAxes).fill(
                        Object.assign(
                          {},
                          this.hideAxisTitle(),
                          this.hideAxisLabels(),
                          this.hideStackLabels()
                        )
                      )
                    }
                  };
                }
              },
              {
                key: "mini",
                value: function() {
                  var e = this;
                  return {
                    condition: {
                      callback: function() {
                        return (
                          (this.chartHeight <
                            u.HIGHCHARTS.RESPONSIVE.MINI_HEIGHT ||
                            this.chartWidth <
                              u.HIGHCHARTS.RESPONSIVE.MINI_WIDTH) &&
                          (e.hidePercentOfPrevious(this),
                          e.hideSubtotals(this),
                          !0)
                        );
                      }
                    },
                    chartOptions: {
                      series: new Array(this.numSeries).fill(
                        this.hideDataLabels()
                      ),
                      xAxis: Object.assign(
                        {},
                        this.truncateAxisTitle(),
                        this.hideAxisLabels()
                      ),
                      yAxis: new Array(this.numYAxes).fill(
                        Object.assign(
                          {},
                          this.truncateAxisTitle(),
                          this.hideStackLabels()
                        )
                      )
                    }
                  };
                }
              },
              {
                key: "small",
                value: function() {
                  var e = this;
                  return {
                    condition: {
                      callback: function() {
                        return (
                          this.chartHeight <
                            u.HIGHCHARTS.RESPONSIVE.SMALL_HEIGHT &&
                          this.chartWidth <
                            u.HIGHCHARTS.RESPONSIVE.SMALL_WIDTH &&
                          (e.hideSubtotals(this), !0)
                        );
                      }
                    },
                    chartOptions: {
                      series: new Array(this.numSeries).fill(
                        this.hideDataLabels()
                      ),
                      xAxis: this.truncateAxisTitle(),
                      yAxis: new Array(this.numYAxes).fill(
                        Object.assign(
                          {},
                          this.hideStackLabels(),
                          this.truncateAxisTitle()
                        )
                      )
                    }
                  };
                }
              },
              {
                key: "legend",
                value: function() {
                  return {
                    condition: {
                      callback: function() {
                        if (
                          this.legend.legendHeight <
                          u.HIGHCHARTS.RESPONSIVE.MIN_LEGEND_HEIGHT
                        )
                          return !0;
                        if ("center" === this.legend.options.align) {
                          var e = this.chartHeight / 2 - 50;
                          return this.legend.legendHeight > e;
                        }
                        return this.chartWidth < 300;
                      }
                    },
                    chartOptions: { legend: { enabled: !1 } }
                  };
                }
              },
              {
                key: "hidePercentOfPrevious",
                value: function(e) {
                  var t = !0,
                    i = !1,
                    r = void 0;
                  try {
                    for (
                      var n, a = e.options.annotations[Symbol.iterator]();
                      !(t = (n = a.next()).done);
                      t = !0
                    ) {
                      var s = n.value;
                      s.id === c.AnnotationIds.PercentOfPrevious &&
                        (s.visible = !1);
                    }
                  } catch (e) {
                    (i = !0), (r = e);
                  } finally {
                    try {
                      t || null == a.return || a.return();
                    } finally {
                      if (i) throw r;
                    }
                  }
                }
              },
              {
                key: "hideSubtotals",
                value: function(e) {
                  var t = !0,
                    i = !1,
                    r = void 0;
                  try {
                    for (
                      var n, a = e.options.annotations[Symbol.iterator]();
                      !(t = (n = a.next()).done);
                      t = !0
                    ) {
                      var s = n.value;
                      s.id === c.AnnotationIds.Subtotals && (s.visible = !1);
                    }
                  } catch (e) {
                    (i = !0), (r = e);
                  } finally {
                    try {
                      t || null == a.return || a.return();
                    } finally {
                      if (i) throw r;
                    }
                  }
                }
              },
              {
                key: "hideAxisLabels",
                value: function() {
                  return { labels: { enabled: !1 }, gridLineWidth: 0 };
                }
              },
              {
                key: "hideAxisTitle",
                value: function() {
                  return { title: { text: null } };
                }
              },
              {
                key: "hideDataLabels",
                value: function() {
                  return { dataLabels: { enabled: !1 } };
                }
              },
              {
                key: "hideStackLabels",
                value: function() {
                  return { stackLabels: { enabled: !1 } };
                }
              },
              {
                key: "truncateAxisTitle",
                value: function() {
                  return {
                    title: {
                      style: { textOverflow: "ellipsis", width: "100%" }
                    }
                  };
                }
              }
            ]),
            t
          );
        })(i(276).ResultMapper);
      t.ResponsiveMapper = d;
    },
    3114: function(e, t, i) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.seriesTypeToClass = void 0);
      var r = i(3115),
        n = i(3118),
        a = i(3119),
        s = i(3121),
        o = i(3122),
        l = i(3123),
        u = i(3124),
        c = {
          area: r.AreaSeriesMapper,
          bar: n.BarSeriesMapper,
          boxplot: a.BoxplotSeriesMapper,
          column: o.ColumnSeriesMapper,
          line: l.LineSeriesMapper,
          scatter: s.BubbleSeriesMapper,
          waterfall: u.WaterfallSeriesMapper
        };
      t.seriesTypeToClass = c;
    },
    3115: function(e, t, i) {
      "use strict";
      var r = i(137);
      i(65),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.AreaSeriesMapper = void 0);
      var n = r(i(141)),
        a = r(i(142)),
        s = r(i(155)),
        o = r(i(154)),
        l = r(i(761)),
        u = r(i(156)),
        c = i(252),
        d = i(199),
        f = (function(e) {
          function t(e, i, r, a, l, u) {
            var c;
            return (
              (0, n.default)(this, t),
              ((c = (0, s.default)(
                this,
                (0, o.default)(t).call(this, e, i, r, a, l, u)
              )).series = e),
              (c.result = i),
              (c.config = r),
              (c.yAxisIndex = a),
              (c.onDisabledSeriesChanged = l),
              (c.openDrillMenu = u),
              (c.type =
                "monotone" === r.interpolation
                  ? d.HighchartsChartType.Areaspline
                  : d.HighchartsChartType.Area),
              c
            );
          }
          return (
            (0, u.default)(t, e),
            (0, a.default)(t, [
              {
                key: "serialize",
                value: function() {
                  return Object.assign(
                    {},
                    (0, l.default)(
                      (0, o.default)(t.prototype),
                      "serialize",
                      this
                    ).call(this),
                    {
                      fillOpacity: this.fillOpacity(),
                      threshold: this.threshold()
                    }
                  );
                }
              },
              {
                key: "fillOpacity",
                value: function() {
                  return c.HIGHCHARTS.AREA.FILL_OPACITY;
                }
              },
              {
                key: "threshold",
                value: function() {
                  return this.series.field.is_timeframe ? null : 0;
                }
              }
            ]),
            t
          );
        })(i(2086).AbstractLinearSeriesMapper);
      t.AreaSeriesMapper = f;
    },
    3116: function(e, t, i) {
      "use strict";
      var r = i(137);
      i(63),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.DataLabelsMapper = void 0);
      var n = r(i(141)),
        a = r(i(142)),
        s = r(i(155)),
        o = r(i(154)),
        l = r(i(156)),
        u = i(247),
        c = i(252),
        d = i(199),
        f = i(234),
        h = i(283),
        p = (function(e) {
          function t(e, i, r) {
            var a;
            return (
              (0, n.default)(this, t),
              ((a = (0, s.default)(
                this,
                (0, o.default)(t).call(this)
              )).result = e),
              (a.config = i),
              (a.series = r),
              a
            );
          }
          return (
            (0, l.default)(t, e),
            (0, a.default)(t, [
              {
                key: "serialize",
                value: function() {
                  var e = this;
                  return {
                    crop: this.crop(),
                    enabled: this.enabled(),
                    formatter: function() {
                      return e.formatter(this);
                    },
                    overflow: this.overflow(),
                    rotation: this.rotation(),
                    style: this.style()
                  };
                }
              },
              {
                key: "crop",
                value: function() {
                  if (
                    (0, h.isRectangularChartType)(this.series.type) &&
                    !this.series.stacking
                  )
                    return !1;
                }
              },
              {
                key: "enabled",
                value: function() {
                  return (
                    !!this.config.show_value_labels &&
                    !this.series.isSilhouetted
                  );
                }
              },
              {
                key: "formatter",
                value: function(e) {
                  var t,
                    i = !1;
                  if (!this.series.visible) return "";
                  if ((0, h.pointIsNull)(e.point)) {
                    if (
                      !this.config.show_null_labels &&
                      (0, h.isRectangularChartType)(this.series.type)
                    )
                      return "";
                    (t = c.HIGHCHARTS.NULL), (i = !0);
                  }
                  e.point.options &&
                    e.point.options.seriesDataPoint &&
                    e.point.options.seriesDataPoint.formattedY &&
                    (t = e.point.options.seriesDataPoint.formattedY);
                  var r = e.y,
                    n =
                      this.config.label_value_format ||
                      (this.series.field && this.series.field.value_format);
                  this.series.stacking === d.StackingType.Percent &&
                    ((r = e.percentage),
                    (n =
                      this.config.label_value_format ||
                      c.HIGHCHARTS.VALUE_FORMAT.PERCENT_0)),
                    (t =
                      t ||
                      (0, f.valueFormatter)(r, n, this.series.numberFormat));
                  var a = this.getDataLabelColor(i);
                  return a
                    ? '\n      <span style="color:'
                        .concat(a, '">')
                        .concat(t, "</span>\n    ")
                    : t;
                }
              },
              {
                key: "overflow",
                value: function() {
                  if (
                    (0, h.isRectangularChartType)(this.series.type) &&
                    !this.series.stacking
                  )
                    return "none";
                }
              },
              {
                key: "rotation",
                value: function() {
                  if (
                    (0, h.isRectangularChartType)(this.series.type) &&
                    !this.series.stacking
                  )
                    return this.config.label_rotation || void 0;
                }
              },
              {
                key: "style",
                value: function() {
                  return {
                    fontSize: this.config.font_size || c.HIGHCHARTS.FONT_SIZE,
                    fontWeight: "bold",
                    textOutline: "none"
                  };
                }
              },
              {
                key: "getDataLabelColor",
                value: function(e) {
                  var t,
                    i = this.series.color;
                  return (
                    this.config.label_color &&
                      this.config.label_color.length &&
                      (t =
                        this.config.label_color[this.series.legendIndex] ||
                        this.config.label_color[0]),
                    !t &&
                      !e &&
                      this.series.stacking &&
                      (0, h.isRectangularChartType)(this.series.type) &&
                      (t = u.ColorUtils.textColorForBackgroundColor(i)),
                    t || i
                  );
                }
              }
            ]),
            t
          );
        })(i(276).ResultMapper);
      t.DataLabelsMapper = p;
    },
    3117: function(e, t, i) {
      "use strict";
      var r = i(137);
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.DataPointLabelMapper = void 0);
      var n = r(i(141)),
        a = r(i(142)),
        s = r(i(155)),
        o = r(i(154)),
        l = r(i(156)),
        u = i(199),
        c = i(283),
        d = (function(e) {
          function t(e, i, r) {
            var a;
            (0, n.default)(this, t),
              ((a = (0, s.default)(
                this,
                (0, o.default)(t).call(this)
              )).value = e),
              (a.series = i),
              (a.config = r);
            var l = !!e && e < 0;
            return (
              (a.isReversed =
                (l && !a.config.y_axis_reversed) ||
                (!l && a.config.y_axis_reversed)),
              a
            );
          }
          return (
            (0, l.default)(t, e),
            (0, a.default)(t, [
              {
                key: "serialize",
                value: function() {
                  var e = {},
                    t = this.align(),
                    i = this.x(),
                    r = this.y();
                  return (
                    void 0 !== t && (e.align = t),
                    void 0 !== i && (e.x = i),
                    void 0 !== r && (e.y = r),
                    e
                  );
                }
              },
              {
                key: "align",
                value: function() {
                  if (
                    !this.series.stacking &&
                    (0, c.isRectangularChartType)(this.series.type) &&
                    this.config.label_rotation
                  )
                    if (this.series.type === u.HighchartsChartType.Column) {
                      var e = this.config.label_rotation;
                      if (e % 180 == 0) return "center";
                      if (e < -180 || (e > 0 && e < 180))
                        return this.isReversed ? "left" : "right";
                      if (e > 180 || (e > -180 && e < 0))
                        return this.isReversed ? "right" : "left";
                    } else if (this.series.type === u.HighchartsChartType.Bar) {
                      var t = Math.abs(this.config.label_rotation);
                      return t < 90 || t > 270
                        ? this.isReversed
                          ? "right"
                          : "left"
                        : t > 90 && t < 270
                        ? this.isReversed
                          ? "left"
                          : "right"
                        : "center";
                    }
                }
              },
              {
                key: "x",
                value: function() {
                  if (
                    !this.series.stacking &&
                    this.series.type === u.HighchartsChartType.Bar &&
                    this.config.label_rotation
                  ) {
                    var e = Math.abs(this.config.label_rotation);
                    return (e > 50 && e < 130) || (e > 230 && e < 310)
                      ? this.isReversed
                        ? -10
                        : 10
                      : this.isReversed
                      ? -5
                      : 5;
                  }
                }
              },
              {
                key: "y",
                value: function() {
                  if (
                    !this.series.stacking &&
                    (0, c.isRectangularChartType)(this.series.type) &&
                    this.config.label_rotation
                  ) {
                    var e = Math.abs(this.config.label_rotation);
                    if (this.series.type === u.HighchartsChartType.Column) {
                      if (this.isReversed) return e < 40 || e >= 320 ? 15 : 10;
                      if (e < 110 || e >= 260) return -5;
                      if (e < 150 || e >= 220) return -10;
                      if (e >= 150 && e < 220) return -15;
                    } else if (this.series.type === u.HighchartsChartType.Bar)
                      return 180 === e ? -4 : 360 === e ? 4 : 0;
                  }
                }
              }
            ]),
            t
          );
        })(i(276).ResultMapper);
      t.DataPointLabelMapper = d;
    },
    3118: function(e, t, i) {
      "use strict";
      var r = i(137);
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.BarSeriesMapper = void 0);
      var n = r(i(141)),
        a = r(i(155)),
        s = r(i(154)),
        o = r(i(156)),
        l = i(199),
        u = (function(e) {
          function t() {
            var e;
            return (
              (0, n.default)(this, t),
              ((e = (0, a.default)(
                this,
                (0, s.default)(t).apply(this, arguments)
              )).type = l.HighchartsChartType.Bar),
              e
            );
          }
          return (0, o.default)(t, e), t;
        })(i(1835).AbstractRectangularSeriesMapper);
      t.BarSeriesMapper = u;
    },
    3119: function(e, t, i) {
      "use strict";
      var r = i(137);
      i(62),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.BoxplotSeriesMapper = void 0);
      var n = r(i(141)),
        a = r(i(142)),
        s = r(i(155)),
        o = r(i(154)),
        l = r(i(156)),
        u = i(199),
        c = i(1835),
        d = i(3120),
        f = (function(e) {
          function t() {
            var e;
            return (
              (0, n.default)(this, t),
              ((e = (0, s.default)(
                this,
                (0, o.default)(t).apply(this, arguments)
              )).type = u.HighchartsChartType.Boxplot),
              e
            );
          }
          return (
            (0, l.default)(t, e),
            (0, a.default)(t, [
              {
                key: "data",
                value: function() {
                  var e = this;
                  return this.series.data.map(function(t) {
                    return new d.BoxplotDataPointMapper(
                      e.config,
                      e.series,
                      t
                    ).serialize();
                  });
                }
              }
            ]),
            t
          );
        })(c.AbstractRectangularSeriesMapper);
      t.BoxplotSeriesMapper = f;
    },
    3120: function(e, t, i) {
      "use strict";
      var r = i(137);
      i(174),
        i(62),
        i(59),
        i(65),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.BoxplotDataPointMapper = void 0);
      var n = r(i(141)),
        a = r(i(142)),
        s = r(i(155)),
        o = r(i(154)),
        l = r(i(156)),
        u = i(199),
        c = (function(e) {
          function t(e, i, r) {
            var a;
            return (
              (0, n.default)(this, t),
              ((a = (0, s.default)(
                this,
                (0, o.default)(t).call(this)
              )).config = e),
              (a.series = i),
              (a.dataPoint = r),
              a
            );
          }
          return (
            (0, l.default)(t, e),
            (0, a.default)(t, [
              {
                key: "serialize",
                value: function() {
                  var e = this.measureValues();
                  return Object.assign(
                    {
                      seriesDataPoint: this.dataPoint,
                      name: this.name(),
                      x: this.x()
                    },
                    this.boxplotPoint(e)
                  );
                }
              },
              {
                key: "measureValues",
                value: function() {
                  var e = this;
                  return this.series.measures.map(function(t) {
                    return e.dataPoint.row[t].value;
                  });
                }
              },
              {
                key: "boxplotPoint",
                value: function(e) {
                  var t = {};
                  if ([2, 3].includes(e.length)) {
                    var i = e[0],
                      r = 3 === e.length ? e[1] : void 0,
                      n = e[e.length - 1];
                    t = { q1: i, median: r, q3: n, high: n };
                  }
                  return (
                    5 === e.length &&
                      (t = {
                        low: e[0],
                        q1: e[1],
                        median: e[2],
                        q3: e[3],
                        high: e[4]
                      }),
                    t
                  );
                }
              },
              {
                key: "x",
                value: function() {
                  if (this.series.xAxisType !== u.AxisType.Categorical)
                    return this.dataPoint.x;
                }
              },
              {
                key: "name",
                value: function() {
                  return this.dataPoint.formattedX
                    ? "".concat(this.dataPoint.formattedX, " ")
                    : void 0;
                }
              }
            ]),
            t
          );
        })(i(276).ResultMapper);
      t.BoxplotDataPointMapper = c;
    },
    3121: function(e, t, i) {
      "use strict";
      var r = i(137);
      i(65),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.BubbleSeriesMapper = void 0);
      var n = r(i(141)),
        a = r(i(142)),
        s = r(i(155)),
        o = r(i(154)),
        l = r(i(761)),
        u = r(i(156)),
        c = i(247),
        d = i(252),
        f = i(199),
        h = i(356),
        p = (function(e) {
          function t(e, i, r, a, l, u) {
            var c;
            return (
              (0, n.default)(this, t),
              ((c = (0, s.default)(
                this,
                (0, o.default)(t).call(this, e, i, r, a, l, u)
              )).series = e),
              (c.result = i),
              (c.config = r),
              (c.yAxisIndex = a),
              (c.onDisabledSeriesChanged = l),
              (c.openDrillMenu = u),
              (c.type = c.isBubbleSeries()
                ? f.HighchartsChartType.Bubble
                : f.HighchartsChartType.Scatter),
              c
            );
          }
          return (
            (0, u.default)(t, e),
            (0, a.default)(t, [
              {
                key: "serialize",
                value: function() {
                  return Object.assign(
                    {},
                    (0, l.default)(
                      (0, o.default)(t.prototype),
                      "serialize",
                      this
                    ).call(this),
                    {
                      clip: this.clip(),
                      marker: this.marker(),
                      minSize: this.minSize(),
                      sizeBy: this.sizeBy()
                    }
                  );
                }
              },
              {
                key: "clip",
                value: function() {
                  return !this.isBubbleSeries() && void 0;
                }
              },
              {
                key: "marker",
                value: function() {
                  var e = c.ColorUtils.transparentize(this.series.color, 0.65);
                  return Object.assign(
                    {},
                    (0, l.default)(
                      (0, o.default)(t.prototype),
                      "marker",
                      this
                    ).call(this),
                    { fillColor: e }
                  );
                }
              },
              {
                key: "minSize",
                value: function() {
                  return this.isBubbleSeries()
                    ? d.HIGHCHARTS.BUBBLE.MIN_SIZE
                    : void 0;
                }
              },
              {
                key: "sizeBy",
                value: function() {
                  return this.isBubbleSeries() ? "width" : void 0;
                }
              },
              {
                key: "zIndex",
                value: function() {
                  return (
                    (0, l.default)(
                      (0, o.default)(t.prototype),
                      "zIndex",
                      this
                    ).call(this) +
                    2 * this.series.numberOfSeries
                  );
                }
              },
              {
                key: "isBubbleSeries",
                value: function() {
                  return (
                    void 0 !== h.Aesthetics.color(this.result, this.config) ||
                    void 0 !== h.Aesthetics.size(this.result, this.config)
                  );
                }
              }
            ]),
            t
          );
        })(i(2086).AbstractLinearSeriesMapper);
      t.BubbleSeriesMapper = p;
    },
    3122: function(e, t, i) {
      "use strict";
      var r = i(137);
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.ColumnSeriesMapper = void 0);
      var n = r(i(141)),
        a = r(i(155)),
        s = r(i(154)),
        o = r(i(156)),
        l = i(199),
        u = (function(e) {
          function t() {
            var e;
            return (
              (0, n.default)(this, t),
              ((e = (0, a.default)(
                this,
                (0, s.default)(t).apply(this, arguments)
              )).type = l.HighchartsChartType.Column),
              e
            );
          }
          return (0, o.default)(t, e), t;
        })(i(1835).AbstractRectangularSeriesMapper);
      t.ColumnSeriesMapper = u;
    },
    3123: function(e, t, i) {
      "use strict";
      var r = i(137);
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.LineSeriesMapper = void 0);
      var n = r(i(141)),
        a = r(i(142)),
        s = r(i(155)),
        o = r(i(154)),
        l = r(i(761)),
        u = r(i(156)),
        c = i(199),
        d = (function(e) {
          function t(e, i, r, a, l, u) {
            var d;
            return (
              (0, n.default)(this, t),
              ((d = (0, s.default)(
                this,
                (0, o.default)(t).call(this, e, i, r, a, l, u)
              )).series = e),
              (d.result = i),
              (d.config = r),
              (d.yAxisIndex = a),
              (d.onDisabledSeriesChanged = l),
              (d.openDrillMenu = u),
              (d.type =
                "monotone" === r.interpolation
                  ? c.HighchartsChartType.Spline
                  : c.HighchartsChartType.Line),
              d
            );
          }
          return (
            (0, u.default)(t, e),
            (0, a.default)(t, [
              {
                key: "zIndex",
                value: function() {
                  return (
                    (0, l.default)(
                      (0, o.default)(t.prototype),
                      "zIndex",
                      this
                    ).call(this) + this.series.numberOfSeries
                  );
                }
              }
            ]),
            t
          );
        })(i(2086).AbstractLinearSeriesMapper);
      t.LineSeriesMapper = d;
    },
    3124: function(e, t, i) {
      "use strict";
      var r = i(137);
      i(150),
        i(62),
        i(59),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.WaterfallSeriesMapper = void 0);
      var n = r(i(141)),
        a = r(i(142)),
        s = r(i(155)),
        o = r(i(154)),
        l = r(i(156)),
        u = i(199),
        c = i(1835),
        d = i(2308),
        f = (function(e) {
          function t() {
            var e;
            return (
              (0, n.default)(this, t),
              ((e = (0, s.default)(
                this,
                (0, o.default)(t).apply(this, arguments)
              )).type = u.HighchartsChartType.Waterfall),
              e
            );
          }
          return (
            (0, l.default)(t, e),
            (0, a.default)(t, [
              {
                key: "data",
                value: function() {
                  var e = this,
                    t = this.series.data.map(function(t) {
                      return new h(e.config, e.series, t).serialize();
                    });
                  if (this.series.xAxisType !== u.AxisType.Datetime) {
                    var i = {
                      isSum: !0,
                      name: "Total",
                      color: this.config.total_color
                    };
                    t.push(i);
                  }
                  return t;
                }
              }
            ]),
            t
          );
        })(c.AbstractRectangularSeriesMapper);
      t.WaterfallSeriesMapper = f;
      var h = (function(e) {
        function t() {
          return (
            (0, n.default)(this, t),
            (0, s.default)(this, (0, o.default)(t).apply(this, arguments))
          );
        }
        return (
          (0, l.default)(t, e),
          (0, a.default)(t, [
            {
              key: "color",
              value: function() {
                return this.y() >= 0
                  ? this.config.up_color
                  : this.config.down_color;
              }
            },
            {
              key: "name",
              value: function() {
                var e = this;
                if (!this.dataPoint.formattedX) {
                  var t = this.series.result.fields.measure_like.find(function(
                    t
                  ) {
                    return !!e.dataPoint.row[t.name];
                  }).field_group_variant;
                  return "".concat(t, " ");
                }
                return "".concat(this.dataPoint.formattedX, " ");
              }
            }
          ]),
          t
        );
      })(d.DataPointMapper);
    },
    3125: function(e, t, i) {
      "use strict";
      var r = i(137);
      i(316),
        i(149),
        i(62),
        i(60),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.StackedSubtotalsMapper = void 0);
      var n = r(i(141)),
        a = r(i(142)),
        s = r(i(155)),
        o = r(i(154)),
        l = r(i(156)),
        u = i(199),
        c = i(234),
        d = i(283),
        f = i(252),
        h = (function(e) {
          function t(e, i, r) {
            var a;
            return (
              (0, n.default)(this, t),
              ((a = (0, s.default)(
                this,
                (0, o.default)(t).call(this)
              )).result = e),
              (a.config = i),
              (a.series = r),
              (a.visibleSeries = a.series.filter(function(e) {
                return e.visible;
              })),
              a
            );
          }
          return (
            (0, l.default)(t, e),
            (0, a.default)(t, [
              {
                key: "serialize",
                value: function() {
                  return {
                    id: this.id(),
                    labels: this.generateSubtotalsLabels(),
                    shapes: []
                  };
                }
              },
              {
                key: "id",
                value: function() {
                  return u.AnnotationIds.Subtotals;
                }
              },
              {
                key: "generateSubtotalsLabels",
                value: function() {
                  var e = this;
                  if (
                    !this.visibleSeries.some(function(e) {
                      return e.isSilhouetted;
                    })
                  )
                    return [];
                  var t =
                      (0, d.getXAxisType)(this.result, this.config) ===
                      u.AxisType.Datetime,
                    i = [],
                    r = Array(this.visibleSeries[0].data.length).fill(0);
                  return (
                    this.visibleSeries.forEach(function(e) {
                      e.data.forEach(function(n, a) {
                        (r[a] += n.y || 0),
                          e.isSilhouetted ||
                            (i[a]
                              ? (i[a].y += n.y || 0)
                              : i.push({ x: t ? n.x : a, y: n.y || 0 }));
                      });
                    }),
                    i
                      .filter(function(e, t) {
                        return r[t] > e.y;
                      })
                      .map(function(t) {
                        return e.generateLabel(t.x, t.y);
                      })
                  );
                }
              },
              {
                key: "generateLabel",
                value: function(e, t) {
                  var i = (0, d.getSeriesValueFormat)(this.visibleSeries),
                    r = {
                      distance: void 0,
                      point: { xAxis: 0, yAxis: 0, x: e, y: t },
                      shape: "none",
                      padding: 0,
                      backgroundColor: "transparent",
                      borderColor: "transparent",
                      text: (0, c.valueFormatter)(
                        t,
                        this.config.label_value_format || i,
                        this.visibleSeries[0].numberFormat,
                        2
                      ),
                      style: {
                        color: f.HIGHCHARTS.TOTALS_LABELS_COLOR,
                        fontWeight: "bold",
                        fontSize:
                          this.config.font_size || f.HIGHCHARTS.FONT_SIZE
                      }
                    };
                  return (
                    this.config.type === u.LookerChartType.Bar
                      ? ((r.x = this.config.y_axis_reversed ? -2 : 2),
                        (r.y = 8),
                        (r.align = this.config.y_axis_reversed
                          ? "right"
                          : "left"))
                      : ((r.y = this.config.y_axis_reversed ? 16 : 3),
                        (r.align = "center")),
                    r
                  );
                }
              }
            ]),
            t
          );
        })(i(276).ResultMapper);
      t.StackedSubtotalsMapper = h;
    },
    3126: function(e, t, i) {
      "use strict";
      var r = i(137);
      i(162),
        i(172),
        i(178),
        i(63),
        i(149),
        i(174),
        i(64),
        i(62),
        i(182),
        i(36),
        i(160),
        i(146),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.TrendLineMapper = void 0);
      var n = r(i(141)),
        a = r(i(142)),
        s = r(i(155)),
        o = r(i(154)),
        l = r(i(156)),
        u = r(i(408)),
        c = r(i(2439)),
        d = i(199),
        f = i(1836),
        h = i(3127),
        p = (function(e) {
          function t(e, i, r, a, l) {
            var u;
            if (
              ((0, n.default)(this, t),
              ((u = (0, s.default)(
                this,
                (0, o.default)(t).call(this)
              )).config = e),
              (u.trendLineConfig = i),
              (u.allSeries = r),
              (u.xAxisField = a),
              (u.yAxisIndex = l),
              (u.series = r[i.series_index - 1]),
              u.validate(u.series))
            )
              if (
                ((u.xAxisType = u.series.xAxisType),
                (u.seriesData = u.extractDataForInterpolation(
                  u.series,
                  u.allSeries
                )),
                i.regression_type === h.TrendLineType.Average)
              )
                u.regressionResult = {
                  points: u.movingAverage(u.seriesData, i.period)
                };
              else {
                u.regressionResult = (0, c.default)(
                  i.regression_type,
                  u.seriesData
                );
                var d = [];
                u.regressionResult.points = u.regressionResult.points.reduce(
                  function(e, t) {
                    return -1 === d.indexOf(t[0])
                      ? (d.push(t[0]), e.push(t), e)
                      : e;
                  },
                  []
                );
              }
            return u;
          }
          return (
            (0, l.default)(t, e),
            (0, a.default)(t, [
              {
                key: "serialize",
                value: function() {
                  return this.regressionResult && this.seriesData
                    ? {
                        color: this.color(),
                        data: this.data(),
                        dataLabels: this.dataLabels(),
                        enableMouseTracking: this.enableMouseTracking(),
                        marker: this.marker(),
                        showInLegend: this.showInLegend(),
                        states: this.states(),
                        type: "line",
                        yAxis: this.yAxis(),
                        zIndex: this.zIndex()
                      }
                    : {};
                }
              },
              {
                key: "color",
                value: function() {
                  return this.trendLineConfig.color;
                }
              },
              {
                key: "data",
                value: function() {
                  var e = this,
                    t = this.series.data.filter(function(e) {
                      return void 0 !== e.y;
                    });
                  return this.regressionResult.points.map(function(i) {
                    return {
                      name:
                        e.xAxisType === d.AxisType.Categorical
                          ? t[i[0]].formattedX
                          : void 0,
                      x: e.xAxisType === d.AxisType.Categorical ? void 0 : i[0],
                      y: i[1]
                    };
                  });
                }
              },
              {
                key: "dataLabels",
                value: function() {
                  var e;
                  if (
                    this.regressionResult &&
                    this.regressionResult.points.length
                  )
                    switch (this.trendLineConfig.label_position) {
                      case f.LabelPosition.Left:
                        e = this.regressionResult.points[0][0];
                        break;
                      case f.LabelPosition.Center:
                        e = this.regressionResult.points[
                          Math.floor(this.regressionResult.points.length / 2)
                        ][0];
                        break;
                      case f.LabelPosition.Right:
                        e = this.regressionResult.points[
                          this.regressionResult.points.length - 1
                        ][0];
                    }
                  var t = this;
                  return {
                    backgroundColor: "white",
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: this.trendLineConfig.color,
                    color: this.trendLineConfig.color,
                    enabled: this.trendLineConfig.show_label,
                    filter: { operator: "==", property: "x", value: e || 0 },
                    formatter: function() {
                      return t.getLabelString();
                    },
                    style: { fontSize: "14px" },
                    verticalAlign: "middle"
                  };
                }
              },
              {
                key: "enableMouseTracking",
                value: function() {
                  return !1;
                }
              },
              {
                key: "marker",
                value: function() {
                  return { enabled: !1 };
                }
              },
              {
                key: "showInLegend",
                value: function() {
                  return !1;
                }
              },
              {
                key: "states",
                value: function() {
                  return { inactive: { opacity: 1 } };
                }
              },
              {
                key: "yAxis",
                value: function() {
                  return this.yAxisIndex;
                }
              },
              {
                key: "zIndex",
                value: function() {
                  return 5;
                }
              },
              {
                key: "validate",
                value: function(e) {
                  if (!e)
                    return (
                      this.errors.push({
                        title: "Invalid trend line series index '".concat(
                          this.trendLineConfig.series_index,
                          "'"
                        ),
                        message: "Series index must be between 1 and the total number of series (".concat(
                          this.allSeries.length,
                          ")"
                        )
                      }),
                      !1
                    );
                  return this.xAxisField &&
                    ["yesno", "location", "distance", "zipcode"].includes(
                      this.xAxisField.type
                    )
                    ? (this.errors.push({
                        title: "Unable to display trend lines for dimension type ".concat(
                          this.xAxisField.type
                        ),
                        message:
                          "Please select a different dimension or remove the trend line"
                      }),
                      !1)
                    : this.trendLineConfig.regression_type !==
                        h.TrendLineType.Exponential ||
                        !e.data.some(function(e) {
                          return void 0 !== e.y && e.y <= 0;
                        }) ||
                        (this.errors.push({
                          title:
                            "Unable to display exponential trend lines with negative or zero-valued data",
                          message:
                            "Please select a different trend type or filter out all non-positive values"
                        }),
                        !1);
                }
              },
              {
                key: "extractDataForInterpolation",
                value: function(e, t) {
                  var i = this;
                  return e.data
                    .filter(function(e) {
                      return void 0 !== e.y;
                    })
                    .map(function(e, r) {
                      var n,
                        a = i.xAxisType === d.AxisType.Categorical ? r : e.x;
                      if (i.config.stacking === d.StackingType.Percent) {
                        var s = t.reduce(function(e, t) {
                          var i = t.data[r].y;
                          return e + (void 0 !== i ? i : 0);
                        }, 0);
                        n = (100 * e.y) / s;
                      } else n = e.y;
                      return [a, n];
                    });
                }
              },
              {
                key: "getLabelString",
                value: function() {
                  var e = "",
                    t = "",
                    i = "",
                    r = this.regressionResult.equation;
                  switch (this.trendLineConfig.regression_type) {
                    case h.TrendLineType.Average:
                      (e = "Moving Avg"),
                        (i = "No Equation for Moving Average"),
                        (t = "No R^2 for Moving Average");
                      break;
                    case h.TrendLineType.Linear:
                      (e = "Linear"),
                        (t = "R^2: ".concat(
                          this.regressionResult.r2.toPrecision(4)
                        )),
                        (i = "y = "
                          .concat(r[0].toPrecision(4), "x + ")
                          .concat(r[1].toPrecision(4)));
                      break;
                    case h.TrendLineType.Exponential:
                      (e = "Exp"),
                        (t = "R^2: ".concat(
                          this.regressionResult.r2.toPrecision(4)
                        )),
                        (i = "y = "
                          .concat(r[0].toPrecision(4), "e^(")
                          .concat(r[1].toPrecision(4), "x)"));
                      break;
                    case h.TrendLineType.Logarithmic:
                      (e = "Log"),
                        (t = "R^2: ".concat(
                          this.regressionResult.r2.toPrecision(4)
                        )),
                        (i = "y = "
                          .concat(r[0].toPrecision(4), " + ")
                          .concat(r[1].toPrecision(4), " ln(x)"));
                  }
                  switch (this.trendLineConfig.label_type) {
                    case h.TrendLineLabelType.R2:
                      return t;
                    case h.TrendLineLabelType.Equation:
                      return i;
                    default:
                      return (0, u.default)(this.trendLineConfig.label) || e;
                  }
                }
              },
              {
                key: "movingAverage",
                value: function(e, t) {
                  var i = [],
                    r = function(e) {
                      i.push(e), i.length > t && i.splice(0, 1);
                      for (var r = 0, n = 0, a = i; n < a.length; n++) {
                        r += a[n];
                      }
                      var s = t;
                      return i.length < t && (s = i.length), r / s;
                    },
                    n = [],
                    a = !0,
                    s = !1,
                    o = void 0;
                  try {
                    for (
                      var l, u = e[Symbol.iterator]();
                      !(a = (l = u.next()).done);
                      a = !0
                    ) {
                      var c = l.value;
                      n.push([c[0] || 0, r(c[1] || 0)]);
                    }
                  } catch (e) {
                    (s = !0), (o = e);
                  } finally {
                    try {
                      a || null == u.return || u.return();
                    } finally {
                      if (s) throw o;
                    }
                  }
                  return n;
                }
              }
            ]),
            t
          );
        })(i(276).ResultMapper);
      t.TrendLineMapper = p;
    },
    3127: function(e, t, i) {
      "use strict";
      var r, n;
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.TrendLineType = t.TrendLineLabelType = void 0),
        (t.TrendLineLabelType = r),
        (function(e) {
          (e.String = "string"), (e.R2 = "r2"), (e.Equation = "equation");
        })(r || (t.TrendLineLabelType = r = {})),
        (t.TrendLineType = n),
        (function(e) {
          (e.Linear = "linear"),
            (e.Exponential = "exponential"),
            (e.Logarithmic = "logarithmic"),
            (e.Average = "average");
        })(n || (t.TrendLineType = n = {}));
    },
    3128: function(e, t, i) {
      "use strict";
      var r = i(137);
      i(149),
        i(60),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.XAxisMapper = void 0);
      var n = r(i(141)),
        a = r(i(142)),
        s = r(i(155)),
        o = r(i(154)),
        l = r(i(156)),
        u = r(i(2129)),
        c = r(i(1837)),
        d = r(i(200)),
        f = i(252),
        h = i(199),
        p = i(356),
        v = i(234),
        y = i(283),
        g = i(276),
        m = {
          sunday: 0,
          monday: 1,
          tuesday: 2,
          wednesday: 3,
          thursday: 4,
          friday: 5,
          saturday: 6
        },
        b = (function(e) {
          function t(e, i, r, a) {
            var l;
            return (
              (0, n.default)(this, t),
              ((l = (0, s.default)(
                this,
                (0, o.default)(t).call(this)
              )).result = e),
              (l.config = i),
              (l.firstSeries = r),
              (l.openDrillMenu = a),
              (l.axisType = (0, y.getXAxisType)(l.result, l.config, l.errors)),
              (l.firstFieldForX = p.Aesthetics.x(l.result)[0]),
              l
            );
          }
          return (
            (0, l.default)(t, e),
            (0, a.default)(t, [
              {
                key: "serialize",
                value: function() {
                  var e = this;
                  return {
                    allowDecimals: this.allowDecimals(),
                    dateTimeLabelFormats: this.dateTimeLabelFormats(),
                    gridLineColor: this.gridLineColor(),
                    gridLineWidth: this.gridLineWidth(),
                    keepOrder: !0,
                    labels: this.labels(),
                    maxPadding: this.maxPadding(),
                    minPadding: this.minPadding(),
                    reversed: this.reversed(),
                    startOfWeek: this.startOfWeek(),
                    tickLength: this.tickLength(),
                    tickPositioner: function() {
                      return e.tickPositioner(this);
                    },
                    title: this.title(),
                    type: this.type(),
                    uniqueNames: this.uniqueNames()
                  };
                }
              },
              {
                key: "allowDecimals",
                value: function() {
                  return !1;
                }
              },
              {
                key: "dateTimeLabelFormats",
                value: function() {
                  return f.HIGHCHARTS.DATETIME.LABEL_FORMATS;
                }
              },
              {
                key: "gridLineColor",
                value: function() {
                  return f.HIGHCHARTS.AXIS.GRID_LINE_COLOR;
                }
              },
              {
                key: "gridLineWidth",
                value: function() {
                  return this.config.x_axis_gridlines
                    ? f.HIGHCHARTS.AXIS.GRID_LINE_WIDTH
                    : 0;
                }
              },
              {
                key: "labels",
                value: function() {
                  var e = this;
                  return {
                    enabled: !1 !== this.config.show_x_axis_ticks,
                    events: {
                      click: function(t) {
                        var i = e.firstSeries.data[this.pos];
                        e.isAxisDrillable() &&
                          i &&
                          i.xLinks &&
                          i.xLinks.length &&
                          e.openDrillMenu({
                            element: (0, d.default)(t.target),
                            links: i.xLinks,
                            event: t
                          });
                      },
                      mouseOver: function() {
                        var t = e.firstSeries.data[this.pos];
                        e.isAxisDrillable() &&
                          t &&
                          t.xLinks &&
                          t.xLinks.length &&
                          (this.label.element.style.color =
                            f.HIGHCHARTS.AXIS.HOVER_LINK_COLOR);
                      },
                      mouseOut: function() {
                        this.label.element.style.color =
                          f.HIGHCHARTS.DEFAULT_TEXT_COLOR;
                      }
                    },
                    format: this.getLabelsFormat(),
                    formatter: function() {
                      return e.labelFormatter(this);
                    },
                    rotation:
                      this.config.type === h.LookerChartType.Bar
                        ? this.config.x_axis_label_rotation_bar
                        : this.config.x_axis_label_rotation,
                    style: {
                      cursor: this.isAxisDrillable() ? "pointer" : "default",
                      fontSize: f.HIGHCHARTS.FONT_SIZE
                    },
                    useHTML: !0
                  };
                }
              },
              {
                key: "maxPadding",
                value: function() {
                  return this.config.x_padding_right
                    ? this.config.x_padding_right *
                        f.HIGHCHARTS.AXIS.PADDING_RATIO
                    : f.HIGHCHARTS.AXIS.PADDING;
                }
              },
              {
                key: "minPadding",
                value: function() {
                  return this.config.x_padding_left
                    ? this.config.x_padding_left *
                        f.HIGHCHARTS.AXIS.PADDING_RATIO
                    : f.HIGHCHARTS.AXIS.PADDING;
                }
              },
              {
                key: "reversed",
                value: function() {
                  return this.config.type === h.LookerChartType.Bar
                    ? !this.config.x_axis_reversed
                    : !!this.config.x_axis_reversed;
                }
              },
              {
                key: "startOfWeek",
                value: function() {
                  var e = 1;
                  return (
                    this.firstFieldForX &&
                      this.firstFieldForX.week_start_day &&
                      (e = m[this.firstFieldForX.week_start_day]),
                    e
                  );
                }
              },
              {
                key: "tickLength",
                value: function() {
                  return 0;
                }
              },
              {
                key: "tickPositioner",
                value: function(e) {
                  if (this.axisType === h.AxisType.Categorical)
                    return e.tickPositions.filter(function(t) {
                      return t >= e.dataMin && t <= e.dataMax;
                    });
                  if (
                    this.axisType === h.AxisType.Datetime &&
                    this.firstFieldForX &&
                    this.firstFieldForX.is_fiscal
                  ) {
                    var t = e.dataMin,
                      i = e.tickPositions;
                    return (
                      e.tickPositions.forEach(function(r, n) {
                        (i[n] = t), (t += e.tickInterval);
                      }),
                      i
                    );
                  }
                }
              },
              {
                key: "title",
                value: function() {
                  return !1 !== this.config.show_x_axis_label
                    ? {
                        text: (0, y.getXAxisTitle)(this.result, this.config),
                        useHTML: !0
                      }
                    : { text: null };
                }
              },
              {
                key: "type",
                value: function() {
                  return this.axisType;
                }
              },
              {
                key: "uniqueNames",
                value: function() {
                  return !1;
                }
              },
              {
                key: "getLabelsFormat",
                value: function() {
                  if (
                    this.axisType === h.AxisType.Datetime &&
                    this.config.x_axis_datetime_label
                  )
                    return "{value:".concat(
                      this.config.x_axis_datetime_label,
                      "}"
                    );
                }
              },
              {
                key: "labelFormatter",
                value: function(e) {
                  var t,
                    i = e.axis.defaultLabelFormatter.call(e);
                  (this.axisType !== h.AxisType.Datetime ||
                    this.config.x_axis_datetime_label ||
                    e.dateTimeLabelFormat !==
                      f.HIGHCHARTS.DATETIME.LABEL_FORMATS.month ||
                    "January" !== i ||
                    ((e.dateTimeLabelFormat = e.dateTimeLabelFormat + " '%y"),
                    (i = e.axis.defaultLabelFormatter.call(e))),
                  this.axisType === h.AxisType.Categorical &&
                    this.firstFieldForX &&
                    this.firstFieldForX.is_timeframe &&
                    this.config.x_axis_datetime_label &&
                    (i =
                      c.default.dateFormat(
                        this.config.x_axis_datetime_label,
                        (0, y.parseDate)(this.firstFieldForX, e.value)
                      ) || i),
                  this.firstFieldForX &&
                    this.firstFieldForX.is_numeric &&
                    -1 === i.indexOf("k") &&
                    -1 === i.indexOf("M")) &&
                    (this.firstFieldForX.strict_value_format ||
                      (t = this.result.number_format),
                    (i = (0, v.valueFormatter)(
                      e.value,
                      this.firstFieldForX.value_format,
                      t
                    )));
                  return u.default.sanitize(i);
                }
              },
              {
                key: "isAxisDrillable",
                value: function() {
                  return (
                    1 === p.Aesthetics.x(this.result).length &&
                    this.axisType === h.AxisType.Categorical &&
                    void 0 !== this.openDrillMenu
                  );
                }
              }
            ]),
            t
          );
        })(g.ResultMapper);
      t.XAxisMapper = b;
    },
    3129: function(e, t, i) {
      "use strict";
      var r = i(137);
      i(162),
        i(172),
        i(178),
        i(63),
        i(149),
        i(174),
        i(64),
        i(161),
        i(62),
        i(59),
        i(61),
        i(36),
        i(281),
        i(181),
        i(160),
        i(60),
        i(146),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.YAxisMapper = void 0);
      var n = r(i(171)),
        a = r(i(141)),
        s = r(i(142)),
        o = r(i(155)),
        l = r(i(154)),
        u = r(i(156)),
        c = r(i(408)),
        d = i(247),
        f = i(252),
        h = i(199),
        p = i(1836),
        v = i(234),
        y = i(283),
        g = i(3130),
        m = i(3131),
        b = i(276),
        x = i(3132),
        _ = (function(e) {
          function t(e, i, r, n, s, u) {
            var c;
            (0, a.default)(this, t),
              ((c = (0, o.default)(
                this,
                (0, l.default)(t).call(this)
              )).result = e),
              (c.config = i),
              (c.allSeries = r),
              (c.allYAxes = n),
              (c.drawGridLines = s),
              (c.axisConfiguration = u);
            var d = u.series.map(function(e) {
              return e.axisId || e.id;
            });
            c.mySeries = r.filter(function(e) {
              return d.includes(e.axisId);
            });
            var f = n.some(function(e) {
                return e.hasExplicitExtents();
              }),
              h = c.calculateAxisExtents();
            return (
              (c.dataMax = h.max),
              (c.dataMin = h.min),
              (c.shouldAlignThresholds =
                !f &&
                n.length > 1 &&
                c.dataMin < 0 &&
                c.dataMax > 0 &&
                !i.stacking),
              (c.type = c.getType()),
              c
            );
          }
          return (
            (0, u.default)(t, e),
            (0, s.default)(t, [
              {
                key: "serialize",
                value: function() {
                  return {
                    allowDecimals: this.allowDecimals(),
                    categories: this.categories(),
                    dateTimeLabelFormats: this.dateTimeLabelFormats(),
                    endOnTick: this.endOnTick(),
                    gridLineWidth: this.gridLineWidth(),
                    labels: this.labels(),
                    max: this.max(),
                    maxPadding: this.maxPadding(),
                    min: this.min(),
                    opposite: this.opposite(),
                    plotBands: this.plotBands(),
                    plotLines: this.plotLines(),
                    reversed: this.reversed(),
                    reversedStacks: this.reversedStacks(),
                    softMax: this.softMax(),
                    softMin: this.softMin(),
                    stackLabels: this.stackLabels(),
                    startOnTick: this.startOnTick(),
                    tickPixelInterval: this.tickPixelInterval(),
                    title: this.title(),
                    type: this.type,
                    visible: this.visible()
                  };
                }
              },
              {
                key: "allowDecimals",
                value: function() {
                  var e = this.calculateSeriesMinMax(this.mySeries),
                    t = e.max,
                    i = void 0 === t ? 1 / 0 : t,
                    r = e.min,
                    n = void 0 === r ? 0 : r;
                  return (
                    Math.abs(i) < f.HIGHCHARTS.Y_AXIS.DECIMAL_THRESHOLD ||
                    Math.abs(i - n) < f.HIGHCHARTS.Y_AXIS.DECIMAL_THRESHOLD
                  );
                }
              },
              {
                key: "categories",
                value: function() {
                  if (
                    this.mySeries.length > 0 &&
                    this.type === h.AxisType.Categorical
                  )
                    return this.mySeries[0].yCategories;
                }
              },
              {
                key: "dateTimeLabelFormats",
                value: function() {
                  return f.HIGHCHARTS.DATETIME.LABEL_FORMATS;
                }
              },
              {
                key: "endOnTick",
                value: function() {
                  return !1;
                }
              },
              {
                key: "gridLineWidth",
                value: function() {
                  return this.mySeries.filter(function(e) {
                    return e.visible;
                  }).length > 0 &&
                    this.drawGridLines &&
                    this.config.y_axis_gridlines &&
                    !this.hideYAxisTicks()
                    ? 1
                    : 0;
                }
              },
              {
                key: "labels",
                value: function() {
                  var e = this;
                  return {
                    enabled: !this.hideYAxisTicks(),
                    events: {
                      mouseOver: function() {
                        this.label.element.style.fontWeight = "bold";
                        var e = this.gridLine.element.attributes.getNamedItem(
                          "stroke"
                        );
                        e && (e.value = f.HIGHCHARTS.DEFAULT_TEXT_COLOR);
                      },
                      mouseOut: function() {
                        this.label.element.style.fontWeight = "normal";
                        var e = this.gridLine.element.attributes.getNamedItem(
                          "stroke"
                        );
                        e && (e.value = f.HIGHCHARTS.AXIS.GRID_LINE_COLOR);
                      }
                    },
                    formatter: function() {
                      if (e.type === h.AxisType.Datetime)
                        return this.axis.defaultLabelFormatter.call(this);
                      var t = e.axisConfiguration.valueFormat,
                        i =
                          e.config.stacking === h.StackingType.Percent
                            ? f.HIGHCHARTS.VALUE_FORMAT.PERCENT_0
                            : void 0,
                        r = (0, y.getSeriesValueFormat)(e.mySeries);
                      return (0, v.valueFormatter)(
                        this.value,
                        t || i || r,
                        e.mySeries[0].numberFormat
                      );
                    },
                    style: { fontSize: f.HIGHCHARTS.FONT_SIZE },
                    useHTML: !0
                  };
                }
              },
              {
                key: "max",
                value: function() {
                  if ((0, y.isNumeric)(this.axisConfiguration.maxValue))
                    return this.axisConfiguration.maxValue;
                  if (!0 === this.axisConfiguration.unpinAxis) {
                    var e = this.calculateSeriesMinMax(this.mySeries);
                    if (e.min < 0 && e.max < 0) return e.max;
                  }
                  return this.shouldAlignThresholds ? this.dataMax : void 0;
                }
              },
              {
                key: "maxPadding",
                value: function() {
                  return this.config.show_totals_labels &&
                    this.config.stacking === h.StackingType.Normal
                    ? this.mySeries.some(function(e) {
                        return (
                          e.type === h.HighchartsChartType.Area ||
                          e.type === h.HighchartsChartType.Areaspline
                        );
                      }) && this.config.show_value_labels
                      ? f.HIGHCHARTS.Y_AXIS.DOUBLE_LABEL_MAX_PADDING
                      : f.HIGHCHARTS.Y_AXIS.SINGLE_LABEL_MAX_PADDING
                    : f.HIGHCHARTS.Y_AXIS.DEFAULT_PADDING;
                }
              },
              {
                key: "min",
                value: function() {
                  if ((0, y.isNumeric)(this.axisConfiguration.minValue))
                    return this.axisConfiguration.minValue;
                  if (!0 === this.axisConfiguration.unpinAxis) {
                    var e = this.calculateSeriesMinMax(this.mySeries);
                    if (e.min > 0 && e.max > 0) return e.min;
                  }
                  return (this.type !== h.AxisType.Log || this.dataMin > 0) &&
                    this.shouldAlignThresholds
                    ? this.dataMin
                    : void 0;
                }
              },
              {
                key: "opposite",
                value: function() {
                  return (
                    "right" === this.axisConfiguration.orientation ||
                    "top" === this.axisConfiguration.orientation
                  );
                }
              },
              {
                key: "plotBands",
                value: function() {
                  var e = [];
                  if (
                    this.mySeries[0] === this.allSeries[0] &&
                    this.config.reference_lines
                  ) {
                    var t = !0,
                      i = !1,
                      r = void 0;
                    try {
                      for (
                        var n,
                          a = this.config.reference_lines[Symbol.iterator]();
                        !(t = (n = a.next()).done);
                        t = !0
                      ) {
                        var s = n.value;
                        if (
                          s.reference_type === p.ReferenceLineType.Range ||
                          s.reference_type === p.ReferenceLineType.Margins
                        ) {
                          var o = new g.PlotBandMapper(
                            s,
                            this.config,
                            this.allSeries[0].nonNullDataValues,
                            this.result,
                            this.allSeries[0].field.value_format,
                            this.allSeries[0].numberFormat
                          );
                          e.push(o.serialize()),
                            o.errors &&
                              (this.errors = this.errors.concat(o.errors));
                        }
                      }
                    } catch (e) {
                      (i = !0), (r = e);
                    } finally {
                      try {
                        t || null == a.return || a.return();
                      } finally {
                        if (i) throw r;
                      }
                    }
                  }
                  return e;
                }
              },
              {
                key: "plotLines",
                value: function() {
                  var e = [];
                  if (
                    this.mySeries[0] === this.allSeries[0] &&
                    this.config.reference_lines
                  ) {
                    var t = !0,
                      i = !1,
                      r = void 0;
                    try {
                      for (
                        var n,
                          a = this.config.reference_lines[Symbol.iterator]();
                        !(t = (n = a.next()).done);
                        t = !0
                      ) {
                        var s = n.value;
                        if (
                          s.reference_type === p.ReferenceLineType.Line ||
                          s.reference_type === p.ReferenceLineType.Margins
                        ) {
                          var o = new m.PlotLineMapper(
                            s,
                            this.config,
                            this.allSeries[0].nonNullDataValues,
                            this.result,
                            this.allSeries[0].field.value_format,
                            this.allSeries[0].numberFormat
                          );
                          e.push(o.serialize()),
                            o.errors &&
                              (this.errors = this.errors.concat(o.errors));
                        }
                      }
                    } catch (e) {
                      (i = !0), (r = e);
                    } finally {
                      try {
                        t || null == a.return || a.return();
                      } finally {
                        if (i) throw r;
                      }
                    }
                  }
                  return e;
                }
              },
              {
                key: "reversed",
                value: function() {
                  return !!this.config.y_axis_reversed;
                }
              },
              {
                key: "reversedStacks",
                value: function() {
                  return !1;
                }
              },
              {
                key: "softMax",
                value: function() {
                  return !0 === this.axisConfiguration.unpinAxis ||
                    (0, y.isNumeric)(this.axisConfiguration.maxValue) ||
                    this.type === h.AxisType.Datetime
                    ? void 0
                    : 0;
                }
              },
              {
                key: "softMin",
                value: function() {
                  return !0 === this.axisConfiguration.unpinAxis ||
                    (0, y.isNumeric)(this.axisConfiguration.minValue) ||
                    this.type === h.AxisType.Datetime
                    ? void 0
                    : 0;
                }
              },
              {
                key: "stackLabels",
                value: function() {
                  return new x.StackLabelsMapper(
                    this.result,
                    this.config,
                    this.allSeries
                  ).serialize();
                }
              },
              {
                key: "startOnTick",
                value: function() {
                  return !1;
                }
              },
              {
                key: "tickPixelInterval",
                value: function() {
                  return "custom" === this.axisConfiguration.tickDensity
                    ? 1e3 /
                        (this.axisConfiguration.tickDensityCustom ||
                          this.axisConfiguration.defaultTickDensity)
                    : 60;
                }
              },
              {
                key: "title",
                value: function() {
                  var e = null,
                    t = (0, n.default)(
                      new Set(
                        this.mySeries.map(function(e) {
                          return e.field;
                        })
                      )
                    ).length,
                    i =
                      this.mySeries.filter(function(e) {
                        return e.visible;
                      }).length > 0;
                  return (
                    !1 !== this.axisConfiguration.showLabels &&
                    this.axisConfiguration.label
                      ? (e = (0, c.default)(this.axisConfiguration.label))
                      : !1 !== this.axisConfiguration.showLabels &&
                        (1 === this.mySeries.length && i
                          ? (e = this.mySeries[0].nameHtml)
                          : 1 === t &&
                            i &&
                            (e = (0, v.fieldLabelHtml)(
                              this.mySeries[0].field,
                              this.config,
                              this.result.fields
                            ))),
                    {
                      style: {
                        color:
                          this.allYAxes.length > 1 && 1 === this.mySeries.length
                            ? d.ColorUtils.colorForWhiteBackground(
                                this.mySeries[0].color
                              )
                            : f.HIGHCHARTS.DEFAULT_TEXT_COLOR
                      },
                      text: e,
                      useHTML: !0
                    }
                  );
                }
              },
              {
                key: "visible",
                value: function() {
                  return this.mySeries.some(function(e) {
                    return e.visible;
                  });
                }
              },
              {
                key: "getType",
                value: function() {
                  var e = {};
                  this.mySeries.forEach(function(t) {
                    t.field.is_numeric
                      ? (
                          e[h.AxisType.Linear] || (e[h.AxisType.Linear] = [])
                        ).push(t)
                      : t.field.is_timeframe
                      ? (
                          e[h.AxisType.Datetime] ||
                          (e[h.AxisType.Datetime] = [])
                        ).push(t)
                      : (
                          e[h.AxisType.Categorical] ||
                          (e[h.AxisType.Categorical] = [])
                        ).push(t);
                  });
                  var t = Object.keys(e);
                  if (1 !== t.length) {
                    var i = ["Can only combine like series on a single axis."];
                    return (
                      t.forEach(function(t) {
                        var r = e[t].map(function(e) {
                          return e.name;
                        });
                        i.push(
                          ""
                            .concat(r.join(", "), " ")
                            .concat(r.length > 1 ? "are" : "is a", " ")
                            .concat(t, " series.")
                        );
                      }),
                      this.errors.push({
                        title: "Incompatible Axis Types",
                        message: i.join(" ")
                      }),
                      h.AxisType.Categorical
                    );
                  }
                  return t[0] === h.AxisType.Linear
                    ? "log" === this.axisConfiguration.type
                      ? h.AxisType.Log
                      : h.AxisType.Linear
                    : t[0];
                }
              },
              {
                key: "calculateAxisExtents",
                value: function() {
                  var e = this;
                  if (
                    this.allYAxes.some(function(e) {
                      return e.hasExplicitExtents();
                    })
                  )
                    return this.calculateSeriesMinMax(this.mySeries);
                  var t = [],
                    i = !0,
                    r = !1,
                    a = void 0;
                  try {
                    for (
                      var s,
                        o = function() {
                          var i = s.value.series.map(function(e) {
                              return e.axisId || e.id;
                            }),
                            r = e.allSeries.filter(function(e) {
                              return i.includes(e.axisId);
                            });
                          t.push(e.calculateSeriesMinMax(r, !0));
                        },
                        l = this.allYAxes[Symbol.iterator]();
                      !(i = (s = l.next()).done);
                      i = !0
                    )
                      o();
                  } catch (e) {
                    (r = !0), (a = e);
                  } finally {
                    try {
                      i || null == l.return || l.return();
                    } finally {
                      if (r) throw a;
                    }
                  }
                  for (var u = [], c = 0, d = t; c < d.length; c++) {
                    var f = d[c];
                    0 !== f.max ? u.push(f.min / f.max) : u.push(f.max / f.min);
                  }
                  var h = Math.min.apply(Math, u),
                    p = Math.min.apply(
                      Math,
                      (0, n.default)(
                        t.map(function(e) {
                          return e.min;
                        })
                      )
                    ),
                    v = Math.max.apply(
                      Math,
                      (0, n.default)(
                        t.map(function(e) {
                          return e.max;
                        })
                      )
                    ),
                    y = this.calculateSeriesMinMax(this.mySeries, !0);
                  return (
                    0 !== h && Math.abs(h) < 10
                      ? h <= 1 && y.min <= 0 && y.max > 0
                        ? (y.min = y.max * h)
                        : h < 0 &&
                          y.min < 0 &&
                          0 === y.max &&
                          (y.max = y.min / h)
                      : p < 0 && v > 0 && ((y.min = p), (y.max = v)),
                    { min: y.min, max: y.max }
                  );
                }
              },
              {
                key: "calculateSeriesMinMax",
                value: function(e) {
                  var t =
                      arguments.length > 1 &&
                      void 0 !== arguments[1] &&
                      arguments[1],
                    i = e
                      .filter(function(e) {
                        return e.visible;
                      })
                      .map(function(e) {
                        return e.data.map(function(e) {
                          return e.y || 0;
                        });
                      })
                      .reduce(function(e, t) {
                        return e.concat(t);
                      }, []),
                    r = Math.min.apply(Math, (0, n.default)(i)),
                    a = Math.max.apply(Math, (0, n.default)(i));
                  return (
                    t && r > 0 && a > 0 && (r = 0),
                    t && r < 0 && a < 0 && (a = 0),
                    { min: r, max: a }
                  );
                }
              },
              {
                key: "hideYAxisTicks",
                value: function() {
                  return (
                    !1 === this.axisConfiguration.showValues ||
                    ("custom" === this.axisConfiguration.tickDensity &&
                      0 === this.axisConfiguration.tickDensityCustom)
                  );
                }
              }
            ]),
            t
          );
        })(b.ResultMapper);
      t.YAxisMapper = _;
    },
    3130: function(e, t, i) {
      "use strict";
      var r = i(137);
      i(63),
        i(65),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.PlotBandMapper = void 0);
      var n = r(i(141)),
        a = r(i(142)),
        s = r(i(155)),
        o = r(i(154)),
        l = r(i(156)),
        u = i(247),
        c = i(252),
        d = i(199),
        f = i(234),
        h = i(2309),
        p = i(1836),
        v = (function(e) {
          function t(e, i, r, a, l, u) {
            var c;
            return (
              (0, n.default)(this, t),
              ((c = (0, s.default)(
                this,
                (0, o.default)(t).call(this)
              )).referenceLineConfig = e),
              (c.config = i),
              (c.data = r),
              (c.result = a),
              (c.fieldValueFormat = l),
              (c.numberFormat = u),
              c
            );
          }
          return (
            (0, l.default)(t, e),
            (0, a.default)(t, [
              {
                key: "serialize",
                value: function() {
                  return {
                    color: this.color(),
                    from: this.from(),
                    label: this.label(),
                    to: this.to(),
                    zIndex: this.zIndex()
                  };
                }
              },
              {
                key: "color",
                value: function() {
                  var e = this.referenceLineConfig.color || "#000000";
                  return u.ColorUtils.transparentize(e, 0.2);
                }
              },
              {
                key: "from",
                value: function() {
                  if (
                    this.referenceLineConfig.reference_type ===
                    p.ReferenceLineType.Range
                  )
                    return (0, h.getReferenceLineValue)(
                      this.referenceLineConfig.range_start,
                      this.data,
                      this.config
                    );
                  if (
                    this.referenceLineConfig.reference_type ===
                    p.ReferenceLineType.Margins
                  ) {
                    var e = (0, h.getReferenceLineValue)(
                        this.referenceLineConfig.margin_value,
                        this.data,
                        this.config
                      ),
                      t = (0, h.getReferenceLineValue)(
                        this.referenceLineConfig.margin_bottom,
                        this.data,
                        this.config
                      );
                    return void 0 !== e && void 0 !== t ? e - t : e;
                  }
                }
              },
              {
                key: "label",
                value: function() {
                  if (
                    this.referenceLineConfig.reference_type ===
                    p.ReferenceLineType.Range
                  ) {
                    var e,
                      t = this.from(),
                      i = this.to();
                    this.config.stacking === d.StackingType.Percent &&
                      ((t /= 100),
                      (i /= 100),
                      (e = c.HIGHCHARTS.VALUE_FORMAT.PERCENT_0_MULTIPLIED));
                    var r =
                        this.referenceLineConfig.value_format ||
                        e ||
                        this.fieldValueFormat,
                      n = (0, f.valueFormatter)(t, r, this.numberFormat, 2),
                      a = (0, f.valueFormatter)(i, r, this.numberFormat, 2),
                      s =
                        t < i
                          ? "".concat(n, "&ndash;").concat(a)
                          : "".concat(a, "&ndash;").concat(n),
                      o = this.referenceLineConfig.color,
                      l = this.referenceLineConfig.label
                        ? (0, h.getReferenceLineLabel)(
                            this.referenceLineConfig.label,
                            this.data,
                            r,
                            this.numberFormat
                          )
                        : s,
                      u = "<div>".concat(l, "</div>");
                    return {
                      align:
                        this.referenceLineConfig.label_position ||
                        p.LabelPosition.Right,
                      style: Object.assign(
                        {},
                        c.HIGHCHARTS.REFERENCE_LINE.LABEL.STYLES,
                        { borderColor: o, color: o }
                      ),
                      text: u,
                      useHTML: !0,
                      x: 0,
                      y: -1,
                      verticalAlign: t < i ? "bottom" : "top"
                    };
                  }
                }
              },
              {
                key: "to",
                value: function() {
                  if (
                    this.referenceLineConfig.reference_type ===
                    p.ReferenceLineType.Range
                  )
                    return (0, h.getReferenceLineValue)(
                      this.referenceLineConfig.range_end,
                      this.data,
                      this.config
                    );
                  if (
                    this.referenceLineConfig.reference_type ===
                    p.ReferenceLineType.Margins
                  ) {
                    var e = (0, h.getReferenceLineValue)(
                        this.referenceLineConfig.margin_value,
                        this.data,
                        this.config
                      ),
                      t = (0, h.getReferenceLineValue)(
                        this.referenceLineConfig.margin_top,
                        this.data,
                        this.config
                      );
                    return void 0 !== e && void 0 !== t ? e + t : e;
                  }
                }
              },
              {
                key: "zIndex",
                value: function() {
                  return 5;
                }
              }
            ]),
            t
          );
        })(i(276).ResultMapper);
      t.PlotBandMapper = v;
    },
    3131: function(e, t, i) {
      "use strict";
      var r = i(137);
      i(65),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.PlotLineMapper = void 0);
      var n = r(i(141)),
        a = r(i(142)),
        s = r(i(155)),
        o = r(i(154)),
        l = r(i(156)),
        u = i(252),
        c = i(199),
        d = i(234),
        f = i(2309),
        h = i(1836),
        p = (function(e) {
          function t(e, i, r, a, l, u) {
            var c;
            return (
              (0, n.default)(this, t),
              ((c = (0, s.default)(
                this,
                (0, o.default)(t).call(this)
              )).referenceLineConfig = e),
              (c.config = i),
              (c.data = r),
              (c.result = a),
              (c.fieldValueFormat = l),
              (c.numberFormat = u),
              c
            );
          }
          return (
            (0, l.default)(t, e),
            (0, a.default)(t, [
              {
                key: "serialize",
                value: function() {
                  return {
                    color: this.color(),
                    label: this.label(),
                    value: this.value(),
                    width: this.width(),
                    zIndex: this.zIndex()
                  };
                }
              },
              {
                key: "color",
                value: function() {
                  return this.referenceLineConfig.color;
                }
              },
              {
                key: "label",
                value: function() {
                  var e,
                    t = this.value();
                  this.config.stacking === c.StackingType.Percent &&
                    (t && (t /= 100),
                    (e = u.HIGHCHARTS.VALUE_FORMAT.PERCENT_0_MULTIPLIED));
                  var i =
                      this.referenceLineConfig.value_format ||
                      e ||
                      this.fieldValueFormat,
                    r = (0, d.valueFormatter)(t, i, this.numberFormat, 2),
                    n = this.referenceLineConfig.color,
                    a = this.referenceLineConfig.label
                      ? (0, f.getReferenceLineLabel)(
                          this.referenceLineConfig.label,
                          this.data,
                          i,
                          this.numberFormat
                        )
                      : r,
                    s = "<div>".concat(a, "</div>"),
                    o =
                      this.referenceLineConfig.label_position ||
                      h.LabelPosition.Right,
                    l = "middle";
                  if (this.config.type === c.LookerChartType.Bar)
                    switch (
                      ((o = h.LabelPosition.Center),
                      this.referenceLineConfig.label_position)
                    ) {
                      case h.LabelPosition.Left:
                        l = "top";
                        break;
                      case h.LabelPosition.Right:
                        l = "bottom";
                        break;
                      case h.LabelPosition.Center:
                        l = "middle";
                        break;
                      default:
                        l = "top";
                    }
                  return {
                    align: o,
                    rotation: 0,
                    style: Object.assign(
                      {},
                      u.HIGHCHARTS.REFERENCE_LINE.LABEL.STYLES,
                      { borderColor: n, color: n }
                    ),
                    text: s,
                    useHTML: !0,
                    verticalAlign: l,
                    x: 0,
                    y: -1
                  };
                }
              },
              {
                key: "value",
                value: function() {
                  return this.referenceLineConfig.reference_type ===
                    h.ReferenceLineType.Line
                    ? (0, f.getReferenceLineValue)(
                        this.referenceLineConfig.line_value,
                        this.data,
                        this.config
                      )
                    : this.referenceLineConfig.reference_type ===
                      h.ReferenceLineType.Margins
                    ? (0, f.getReferenceLineValue)(
                        this.referenceLineConfig.margin_value,
                        this.data,
                        this.config
                      )
                    : void 0;
                }
              },
              {
                key: "width",
                value: function() {
                  return 1;
                }
              },
              {
                key: "zIndex",
                value: function() {
                  return 5;
                }
              }
            ]),
            t
          );
        })(i(276).ResultMapper);
      t.PlotLineMapper = p;
    },
    3132: function(e, t, i) {
      "use strict";
      var r = i(137);
      i(149),
        i(150),
        i(174),
        i(181),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.StackLabelsMapper = void 0);
      var n = r(i(141)),
        a = r(i(142)),
        s = r(i(155)),
        o = r(i(154)),
        l = r(i(156)),
        u = i(252),
        c = i(199),
        d = i(234),
        f = i(283),
        h = (function(e) {
          function t(e, i, r) {
            var a;
            return (
              (0, n.default)(this, t),
              ((a = (0, s.default)(
                this,
                (0, o.default)(t).call(this)
              )).result = e),
              (a.config = i),
              (a.allSeries = r),
              (a.xAxisType = (0, f.getXAxisType)(e, i)),
              a
            );
          }
          return (
            (0, l.default)(t, e),
            (0, a.default)(t, [
              {
                key: "serialize",
                value: function() {
                  var e = this;
                  return {
                    allowOverlap: this.allowOverlap(),
                    enabled: this.enabled(),
                    formatter: function() {
                      return e.formatter(this);
                    },
                    rotation: this.rotation(),
                    style: this.style()
                  };
                }
              },
              {
                key: "allowOverlap",
                value: function() {
                  return (
                    this.config.type === c.LookerChartType.Area &&
                    !!this.config.show_value_labels
                  );
                }
              },
              {
                key: "enabled",
                value: function() {
                  return (
                    !!this.config.show_totals_labels &&
                    this.supportsTotalsLabels()
                  );
                }
              },
              {
                key: "formatter",
                value: function(e) {
                  var t = 0,
                    i = !0,
                    r = e.axis.chart.userOptions.series.filter(function(e) {
                      return e.visible;
                    });
                  for (var n in r) {
                    var a = r[n];
                    if (a.visible && a.stacking === c.StackingType.Normal) {
                      var s =
                        this.xAxisType === c.AxisType.Categorical
                          ? a.data[e.x]
                          : a.data.find(function(t) {
                              return t.x === e.x;
                            }) || a.data[e.x];
                      s &&
                        null !== s.seriesDataPoint.cell.value &&
                        ((i = !1), (t += s.y || 0));
                    }
                  }
                  if ((t >= 0 && e.total < 0) || (t < 0 && e.total >= 0))
                    return "";
                  this.config.y_axis_reversed &&
                    (this.config.type === c.LookerChartType.Bar
                      ? t < 0
                        ? ((e.alignOptions.align = "right"),
                          (e.alignOptions.x = 22))
                        : ((e.alignOptions.align = "left"),
                          (e.alignOptions.x = -22))
                      : t < 0
                      ? ((e.alignOptions.verticalAlign = "top"),
                        (e.alignOptions.y = -6))
                      : ((e.alignOptions.verticalAlign = "bottom"),
                        (e.alignOptions.y = 14)));
                  var o =
                    (t < 0 && !this.config.y_axis_reversed) ||
                    (t >= 0 && this.config.y_axis_reversed);
                  if (
                    (this.config.type === c.LookerChartType.Area &&
                      (o
                        ? (e.alignOptions.y = 15)
                        : this.config.show_value_labels &&
                          (e.alignOptions.y = -25)),
                    i)
                  )
                    return u.HIGHCHARTS.NULL;
                  var l = this.config.label_value_format,
                    h = (0, f.getSeriesValueFormat)(this.allSeries);
                  return (0, d.valueFormatter)(
                    t,
                    l || h,
                    this.allSeries[0].numberFormat,
                    2
                  );
                }
              },
              {
                key: "rotation",
                value: function() {
                  return this.config.totals_rotation;
                }
              },
              {
                key: "style",
                value: function() {
                  return {
                    color: this.config.totals_color,
                    fontSize: this.config.font_size || u.HIGHCHARTS.FONT_SIZE,
                    fontWeight: "bold",
                    textOutline: "none"
                  };
                }
              },
              {
                key: "supportsTotalsLabels",
                value: function() {
                  return [
                    c.LookerChartType.Column,
                    c.LookerChartType.Bar,
                    c.LookerChartType.Area
                  ].includes(this.config.type);
                }
              }
            ]),
            t
          );
        })(i(276).ResultMapper);
      t.StackLabelsMapper = h;
    },
    3133: function(e, t, i) {
      "use strict";
      i(162),
        i(172),
        i(178),
        i(149),
        i(64),
        i(66),
        i(61),
        i(36),
        i(160),
        i(146),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.addMarginsForOverflowExtension = function(e) {
          e.wrap(e.Chart.prototype, "onload", function(e) {
            e.apply(this, Array.prototype.slice.call(arguments, 1)), n(this);
          });
        }),
        (t.addMarginsForOverflow = n);
      var r = i(199);
      function n(e) {
        var t = {},
          i = e.series.filter(function(e) {
            return e.visible;
          }),
          r = !0,
          n = !1,
          o = void 0;
        try {
          for (
            var l, u = i[Symbol.iterator]();
            !(r = (l = u.next()).done);
            r = !0
          ) {
            var c = l.value;
            c.dataLabelsGroup &&
              s(c.yAxis) &&
              a(e, t, e.plotBackground, c.dataLabelsGroup),
              c.group && s(c.yAxis) && a(e, t, e.plotBackground, c.group);
          }
        } catch (e) {
          (n = !0), (o = e);
        } finally {
          try {
            r || null == u.return || u.return();
          } finally {
            if (n) throw o;
          }
        }
        var d = !0,
          f = !1,
          h = void 0;
        try {
          for (
            var p, v = e.yAxis[Symbol.iterator]();
            !(d = (p = v.next()).done);
            d = !0
          ) {
            var y = p.value;
            if (
              (y.stackTotalGroup &&
                s(y) &&
                a(e, t, e.plotBackground, y.stackTotalGroup),
              y.plotLinesAndBands)
            ) {
              var g = !0,
                m = !1,
                b = void 0;
              try {
                for (
                  var x, _ = y.plotLinesAndBands[Symbol.iterator]();
                  !(g = (x = _.next()).done);
                  g = !0
                ) {
                  var k = x.value;
                  k.label && s(y) && a(e, t, e.plotBackground, k.label);
                }
              } catch (e) {
                (m = !0), (b = e);
              } finally {
                try {
                  g || null == _.return || _.return();
                } finally {
                  if (m) throw b;
                }
              }
            }
          }
        } catch (e) {
          (f = !0), (h = e);
        } finally {
          try {
            d || null == v.return || v.return();
          } finally {
            if (f) throw h;
          }
        }
        e.userOptions &&
          e.userOptions.title &&
          e.userOptions.title.text &&
          a(e, t, e.plotBackground, e.title),
          t.marginTop && (t.marginTop += 10),
          t.marginRight && (t.marginRight += 20),
          Object.keys(t).length && e.update({ chart: t });
      }
      function a(e, t, i, r) {
        if (r && "hidden" !== r.visibility) {
          var n = r.element.getBoundingClientRect(),
            a = i.element.getBoundingClientRect(),
            s = a.top - n.top,
            o = n.right - a.right,
            l =
              s > 0 &&
              s > e.axisOffset[0] &&
              s > (t.marginTop || 0) &&
              s < a.height,
            u =
              o > 0 &&
              o > e.axisOffset[1] &&
              o > (t.marginRight || 0) &&
              "right" !== e.legend.options.align &&
              o < a.width;
          l && (t.marginTop = s), u && (t.marginRight = o);
        }
      }
      function s(e) {
        if (!e) return !0;
        if (e.options && e.options.type === r.AxisType.Log) {
          var t = Math.log(e.dataMax) / Math.LN10,
            i = Math.log(e.dataMin) / Math.LN10;
          return e.max >= t && e.min <= i;
        }
        return e.max >= e.dataMax && e.min <= e.dataMin;
      }
    },
    3134: function(e, t, i) {
      "use strict";
      i(66),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.clickableAxisLabelsExtension = function(e) {
          e.wrap(e.Tick.prototype, "addLabel", function(t, i) {
            var r =
                this.axis.options.labels &&
                this.axis.options.labels.events &&
                this.axis.options.labels.events.click,
              n = this.label;
            if (r && n) {
              var a = this;
              e.addEvent(n.element, "click", function(e) {
                r.apply(a, [e]);
              });
            }
            return t.apply(this, Array.prototype.slice.call(arguments, 1));
          });
        });
    },
    3135: function(e, t, i) {
      "use strict";
      function r(e) {
        e.columnMetrics &&
          e.columnMetrics.width &&
          e.columnMetrics.width < 25 &&
          (e.options.crisp = !1);
      }
      i(66),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.columnSpacingExtension = function(e) {
          e.wrap(e.Series.prototype, "render", function(e) {
            r(this), e.apply(this, Array.prototype.slice.call(arguments, 1));
          });
        }),
        (t.checkColumnSpacing = r);
    },
    3136: function(e, t, i) {
      "use strict";
      var r = i(137);
      i(66),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.dateFormatsExtension = function(e) {
          e.dateFormats = {
            c: function(e) {
              return n.default.dateFormat("%a %b %e %H:%M:%S %Y", e);
            },
            j: function(e) {
              return (function(e) {
                var t = new Date(e);
                t = new Date(
                  Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate())
                );
                var i = new Date(Date.UTC(t.getUTCFullYear(), 0, 0)),
                  r = Math.floor((t.getTime() - i.getTime()) / 864e5);
                return ("000" + String(r)).slice(-3);
              })(e);
            },
            x: function(e) {
              return n.default.dateFormat("%m/%d/%Y", e);
            },
            X: function(e) {
              return n.default.dateFormat("%H:%M:%S", e);
            },
            U: function(e) {
              return a(e, 0);
            },
            W: function(e) {
              return a(e, 1);
            }
          };
        });
      var n = r(i(1837));
      function a(e, t) {
        var i = new Date(e),
          r =
            ((i = new Date(
              Date.UTC(i.getUTCFullYear(), i.getUTCMonth(), i.getUTCDate())
            )).getUTCDay() +
              7 -
              t) %
            7;
        i.setUTCDate(i.getUTCDate() + 3 - r);
        var n = new Date(Date.UTC(i.getUTCFullYear(), 0, 1)),
          a = Math.ceil(((i.getTime() - n.getTime()) / 864e5 + 1) / 7);
        return String(a);
      }
    },
    3137: function(e, t, i) {
      "use strict";
      i(66),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.followPointerWithCaretExtension = function(e) {
          e.wrap(e.Tooltip.prototype, "move", function(e) {
            var t = this.followPointer,
              i = this.followPointer;
            return (
              (this.followPointer = !1),
              (t = e.apply(this, Array.prototype.slice.call(arguments, 1))),
              (this.followPointer = i),
              t
            );
          });
        });
    },
    3138: function(e, t, i) {
      "use strict";
      i(66),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.hoverableAxisLabelsExtension = function(e) {
          e.wrap(e.Tick.prototype, "addLabel", function(t, i) {
            var r = this.label,
              n =
                this.axis.options.labels &&
                this.axis.options.labels.events &&
                this.axis.options.labels.events.mouseOver;
            if (n && r) {
              var a = this;
              e.addEvent(r.element, "mouseover", function(e) {
                n.apply(a, [e]);
              });
            }
            var s =
              this.axis.options.labels &&
              this.axis.options.labels.events &&
              this.axis.options.labels.events.mouseOut;
            if (s && r) {
              var o = this;
              e.addEvent(r.element, "mouseout", function(e) {
                s.apply(o, [e]);
              });
            }
            t.apply(this, Array.prototype.slice.call(arguments, 1));
          });
        });
    },
    3139: function(e, t, i) {
      "use strict";
      i(66),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.keepOrderExtension = function(e) {
          e.wrap(e.seriesTypes.column.prototype, "getColumnMetrics", function(
            e
          ) {
            var t,
              i = this.xAxis.options.keepOrder,
              r = this.xAxis.reversed;
            return (
              i &&
                ("column" === this.type && r
                  ? (this.xAxis.reversed = !1)
                  : "bar" !== this.type || r || (this.xAxis.reversed = !0)),
              (t = e.apply(this, Array.prototype.slice.call(arguments, 1))),
              (this.xAxis.reversed = r),
              (this.columnMetrics = t),
              t
            );
          });
        });
    },
    3140: function(e, t, i) {
      "use strict";
      var r = i(137);
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.localizationExtension = function(e) {
          var t = n.default.state.number_format;
          t &&
            ((a.default.thousandsSep = t[1]), (a.default.decimalPoint = t[5]));
          e.setOptions({ lang: a.default });
        });
      var n = r(i(169)),
        a = r(i(3141));
    },
    3141: function(e) {
      e.exports = {
        decimalPoint: ".",
        loading: "Loading...",
        months: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ],
        noData: "No data to display",
        numericSymbolMagnitude: "1000",
        numericSymbols: ["k", "M", "G", "T", "P", "E"],
        shortMonths: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
        shortWeekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        thousandsSep: ",",
        weekdays: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ]
      };
    },
    3142: function(e, t, i) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.negativeStackingAreaBehaviorExtension = function(e) {
          (e.seriesTypes.area.prototype.negStacks = !0),
            (e.seriesTypes.area.prototype.getStackPoints =
              e.seriesTypes.area.prototype.getValidPoints),
            (e.seriesTypes.areaspline.prototype.negStacks = !0),
            (e.seriesTypes.areaspline.prototype.getStackPoints =
              e.seriesTypes.areaspline.prototype.getValidPoints);
        });
    },
    3143: function(e, t, i) {
      "use strict";
      function r(e) {
        var t = {};
        return (
          e.forEach(function(e) {
            e.options.stacking &&
              e.points.forEach(function(i) {
                var r = e.stackKey + ":" + i.category;
                void 0 === t[r] && (t[r] = []),
                  e.userOptions.series.isSilhouetted || t[r].push(i);
              });
          }),
          t
        );
      }
      i(66),
        i(187),
        i(60),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.orderStackedBarExtension = function(e) {
          e.wrap(e.Chart.prototype, "onload", function(e, t) {
            var i = "bar" === this.options.chart.type,
              n = "column" === this.options.chart.type,
              a = this.options.series[0].stacking,
              s = this.options.yAxis[0].reversed,
              o =
                this.options.chart.orderStacks &&
                "asc" === this.options.chart.orderStacks,
              l =
                this.options.chart.orderStacks &&
                "desc" === this.options.chart.orderStacks,
              u = a && (i || n) && (o || l);
            if (
              (this.series.forEach(function(e) {
                e.translate();
              }),
              u)
            ) {
              var c = this.series[0].points[0].shapeArgs,
                d = s ? 0 : c.y + c.height,
                f = r(this.series);
              !(function(e, t, i, r) {
                var n = function(n) {
                  var a = t;
                  e[n]
                    .sort(function(e, t) {
                      var i =
                        t.seriesDataPoint.cell.value -
                        e.seriesDataPoint.cell.value;
                      return r ? i : -i;
                    })
                    .forEach(function(e) {
                      i
                        ? ((e.shapeArgs.y = a),
                          (a = e.shapeArgs.y + e.shapeArgs.height))
                        : ((e.shapeArgs.y = a - e.shapeArgs.height),
                          (a = e.shapeArgs.y)),
                        Object.defineProperty(e, "shapeArgs", { writable: !1 });
                    });
                };
                for (var a in e) n(a);
              })(f, d, s, l);
            }
            return (
              this.series.forEach(function(e) {
                e.render();
              }),
              e.apply(this, Array.prototype.slice.call(arguments, 1))
            );
          });
        }),
        (t.stacksToReorder = r);
    },
    3144: function(e, t, i) {
      "use strict";
      i(66),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.pointStyleExtension = function(e) {
          e.wrap(e.Series.prototype, "render", function(e) {
            this.options.marker &&
              r(this.data) &&
              (this.options.marker.enabled = !0),
              e.apply(this, Array.prototype.slice.call(arguments, 1));
          });
        }),
        (t.shouldEnableMarker = void 0);
      var r = function(e) {
        return 1 === e.length;
      };
      t.shouldEnableMarker = r;
    },
    3145: function(e, t, i) {
      "use strict";
      i(66),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.seriesTouchholdExtension = function(e) {
          var t = !1;
          try {
            var i = Object.defineProperty({}, "passive", {
              get: function() {
                t = !0;
              }
            });
            window.addEventListener("testPassive", null, i),
              window.removeEventListener("testPassive", null, i);
          } catch (e) {}
          e.wrap(e.Series.prototype, "render", function(e, i) {
            var r = this.hcEvents && this.hcEvents.touchhold,
              n = this.chart.seriesGroup;
            if (r && n) {
              var a,
                s,
                o,
                l = this;
              n.element.addEventListener(
                "touchstart",
                function(e) {
                  e.preventDefault(),
                    !a &&
                      e.target.point &&
                      ((s = e.touches[0].pageX),
                      (o = e.touches[0].pageY),
                      (a = setTimeout(r[0].bind(l.chart, e), 750)));
                },
                !!t && { passive: !1 }
              ),
                n.element.addEventListener(
                  "touchend",
                  function(e) {
                    a && (clearTimeout(a), (a = void 0));
                  },
                  !!t && { passive: !0 }
                ),
                n.element.addEventListener(
                  "touchmove",
                  function(e) {
                    var t =
                      Math.abs(e.touches[0].pageX - s) < 5 &&
                      Math.abs(e.touches[0].pageY - o) < 5;
                    a && !t && (clearTimeout(a), (a = void 0));
                  },
                  !!t && { passive: !0 }
                ),
                this.chart.chartBackground.element.addEventListener(
                  "touchstart",
                  function(e) {
                    l.chart.pointer.reset();
                  },
                  !!t && { passive: !0 }
                );
            }
            e.apply(this, Array.prototype.slice.call(arguments, 1));
          });
        });
    },
    3146: function(e, t, i) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.showAreaPointInLegendExtension = function(e) {
          e.seriesTypes.area.prototype.drawLegendSymbol = function() {
            e.LegendSymbolMixin.drawLineMarker.apply(this, arguments);
          };
        });
    },
    3147: function(e, t, i) {
      "use strict";
      i(62),
        i(66),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.sizeAxisTitleCorrectlyExtension = function(e) {
          e.wrap(e.Chart.prototype, "onload", function(e) {
            var t = this.inverted ? this.plotWidth : this.plotHeight;
            this.yAxis.map(function(e) {
              e.update({ title: { style: { width: t } } });
            });
            var i = this.inverted ? this.plotHeight : this.plotWidth;
            this.xAxis.map(function(e) {
              e.update({ title: { style: { width: i } } });
            }),
              e.apply(this, Array.prototype.slice.call(arguments, 1));
          });
        });
    },
    3148: function(e, t, i) {
      "use strict";
      i(66),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.wrapLegendItems = function(e) {
          e.wrap(e.Chart.prototype, "onload", function(e) {
            if ("center" !== this.legend.options.align) {
              var t = Math.max(this.chartWidth / 4, 100);
              this.legend.legendWidth > t && this.legend.update({ width: t });
            }
            e.apply(this, Array.prototype.slice.call(arguments, 1));
          });
        });
    },
    3149: function(e, t, i) {
      "use strict";
      var r = i(137);
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.BoxplotMapper = void 0);
      var n = r(i(141)),
        a = r(i(142)),
        s = r(i(155)),
        o = r(i(154)),
        l = r(i(156)),
        u = i(3150),
        c = (function(e) {
          function t() {
            return (
              (0, n.default)(this, t),
              (0, s.default)(this, (0, o.default)(t).apply(this, arguments))
            );
          }
          return (
            (0, l.default)(t, e),
            (0, a.default)(t, [
              {
                key: "tooltip",
                value: function() {
                  return new u.BoxplotTooltipMapper(
                    this.result,
                    this.config
                  ).serialize();
                }
              }
            ]),
            t
          );
        })(i(2085).HighchartsCartesianMapper);
      t.BoxplotMapper = c;
    },
    3150: function(e, t, i) {
      "use strict";
      var r = i(137);
      i(63),
        i(161),
        i(62),
        i(59),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.BoxplotTooltipMapper = void 0);
      var n = r(i(141)),
        a = r(i(142)),
        s = r(i(155)),
        o = r(i(154)),
        l = r(i(156)),
        u = i(356),
        c = i(283),
        d = (function(e) {
          function t() {
            return (
              (0, n.default)(this, t),
              (0, s.default)(this, (0, o.default)(t).apply(this, arguments))
            );
          }
          return (
            (0, l.default)(t, e),
            (0, a.default)(t, [
              {
                key: "formatter",
                value: function(e) {
                  var t = e.series.name,
                    i = (0, c.getXAxisTitle)(this.result, this.config),
                    r = u.Aesthetics.x(this.result)[0],
                    n = e.point.name || e.point.x,
                    a = this.boxplotVals(e.point),
                    s = "";
                  return (
                    r &&
                      (s = '\n        <div style="padding: 5px 0;">\n          '
                        .concat(
                          i ? "<div>".concat(i, "</div>") : "",
                          '\n          <div style="font-weight: 700;">'
                        )
                        .concat(n, "</div>\n        </div>\n      ")),
                    "\n      <div>\n        "
                      .concat(
                        s,
                        '\n        <div style="padding: 5px 0;">\n          <div>'
                      )
                      .concat(
                        t,
                        '</div>\n          <div style="font-weight: 700;">\n            '
                      )
                      .concat(
                        a
                          .map(function(e) {
                            return "<div>".concat(e, "</div>");
                          })
                          .join(""),
                        "\n          </div>\n        </div>\n      </div>\n    "
                      )
                  );
                }
              },
              {
                key: "boxplotVals",
                value: function(e) {
                  var t,
                    i = e.low,
                    r = e.q1,
                    n = e.median,
                    a = e.q3,
                    s = e.high;
                  return (
                    (t =
                      void 0 === i
                        ? void 0 === n
                          ? ["Min: ".concat(r), "Max: ".concat(a)]
                          : [
                              "Min: ".concat(r),
                              "Median: ".concat(n),
                              "Max: ".concat(a)
                            ]
                        : [
                            "Min: ".concat(i),
                            "Q1: ".concat(r),
                            "Median: ".concat(n),
                            "Q3: ".concat(a),
                            "Max: ".concat(s)
                          ]),
                    t
                  );
                }
              }
            ]),
            t
          );
        })(i(1495).TooltipMapper);
      t.BoxplotTooltipMapper = d;
    },
    3151: function(e, t, i) {
      "use strict";
      var r = i(137);
      i(59),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.BoxplotSeriesGenerator = void 0);
      var n = r(i(141)),
        a = r(i(142)),
        s = i(199),
        o = i(356),
        l = i(3152),
        u = i(2119),
        c = (function() {
          function e() {
            (0, n.default)(this, e);
          }
          return (
            (0, a.default)(e, null, [
              {
                key: "generateSeries",
                value: function(e, t) {
                  var i = this.generateProtoSeries(e, t),
                    r = new u.VisConfigAdapter([i], t).translateConfig();
                  return [new l.BoxplotSeries(e, r, i.id, i.field)];
                }
              },
              {
                key: "generateProtoSeries",
                value: function(e, t) {
                  var i = o.Aesthetics.y(e)[0];
                  return {
                    id: i.name,
                    field: i,
                    stacking: void 0,
                    type: s.HighchartsChartType.Boxplot
                  };
                }
              }
            ]),
            e
          );
        })();
      t.BoxplotSeriesGenerator = c;
    },
    3152: function(e, t, i) {
      "use strict";
      var r = i(137);
      i(62),
        i(66),
        i(187),
        i(59),
        i(60),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.BoxplotSeries = void 0);
      var n = r(i(141)),
        a = r(i(142)),
        s = r(i(1708)),
        o = i(273),
        l = i(199),
        u = i(234),
        c = i(283),
        d = i(1918),
        f = (function() {
          function e(t, i, r, a) {
            (0, n.default)(this, e),
              (this.result = t),
              (this.config = i),
              (this.id = r),
              (this.field = a),
              (this.yCategories = []),
              (this.type = l.HighchartsChartType.Boxplot),
              (this.visible = !0),
              (this.index = 0),
              (this.isSilhouetted = !1),
              (this.legacyId = void 0),
              (this.legendIndex = 0),
              (this.numberOfFields = 1),
              (this.numberOfSeries = 1),
              (this.pivot = void 0),
              (this.stacking = void 0),
              (this.nonNullDataValues = []),
              (this.xAxisType = (0, c.getXAxisType)(t, i)),
              (this.data = this.getData()),
              (this.measures = this.result.fields.measure_like.map(function(e) {
                return e.name;
              }));
          }
          return (
            (0, a.default)(e, [
              {
                key: "validate",
                value: function() {
                  return 0 === this.data.length && this.result.data.length > 0
                    ? {
                        title: "No Data To Show",
                        message:
                          "The x-axis settings for this visualization have filtered out all rows."
                      }
                    : "list" === this.field.type
                    ? {
                        title: "Can't Visualize List Measures",
                        message:
                          "The query includes a list measure, which can't be visualized."
                      }
                    : void 0;
                }
              },
              {
                key: "visConfigLabel",
                value: function() {
                  if (
                    this.config.series_labels &&
                    this.config.series_labels[this.id]
                  )
                    return escape(this.config.series_labels[this.id]);
                }
              },
              {
                key: "getData",
                value: function() {
                  var e = this,
                    t = this.limitDataByConfiguration(this.result, this.config),
                    i = [];
                  return (
                    t.forEach(function(t) {
                      var r = new d.SeriesDataPoint(e.result, e.config, e, t);
                      (e.xAxisType === l.AxisType.Datetime && void 0 === r.x) ||
                        (e.xAxisType === l.AxisType.Linear && void 0 === r.x) ||
                        (e.field.is_timeframe && r.isNull) ||
                        i.push(r);
                    }),
                    (this.xAxisType !== l.AxisType.Linear &&
                      this.xAxisType !== l.AxisType.Datetime) ||
                      i.sort(function(e, t) {
                        return e.x - t.x;
                      }),
                    i
                  );
                }
              },
              {
                key: "limitDataByConfiguration",
                value: function(e) {
                  var t =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : {};
                  if (!e || !e.data) return [];
                  var i = (0, u.getVisibleDataRangeFromVisConfig)(e.data, t);
                  return e.data.slice(i[0], i[1]);
                }
              },
              {
                key: "axisId",
                get: function() {
                  return this.field.name;
                }
              },
              {
                key: "defaultName",
                get: function() {
                  return (0, u.fieldLabel)(
                    this.field,
                    this.config,
                    this.result.fields
                  );
                }
              },
              {
                key: "name",
                get: function() {
                  return this.visConfigLabel() || this.defaultName;
                }
              },
              {
                key: "nameHtml",
                get: function() {
                  return (
                    this.visConfigLabel() ||
                    (0, u.fieldLabelHtml)(
                      this.field,
                      this.config,
                      this.result.fields
                    )
                  );
                }
              },
              {
                key: "numberFormat",
                get: function() {
                  return this.field.strict_value_format
                    ? s.default.DEFAULT_USER_FORMAT
                    : this.result.number_format;
                }
              },
              {
                key: "color",
                get: function() {
                  var e =
                    !(
                      !this.config.color_application ||
                      !this.config.color_application.options
                    ) && this.config.color_application.options.reverse;
                  return this.config.series_colors &&
                    this.config.series_colors[this.id]
                    ? (0, c.sanitizeColor)(this.config.series_colors[this.id])
                    : (0, o.paletteForApplication)(
                        this.config.color_application,
                        this.config.colors
                      ).sample(1, e)[0];
                }
              }
            ]),
            e
          );
        })();
      t.BoxplotSeries = f;
    },
    3156: function(e, t, i) {
      "use strict";
      var r = i(137);
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.WaterfallMapper = void 0);
      var n = r(i(141)),
        a = r(i(142)),
        s = r(i(155)),
        o = r(i(154)),
        l = r(i(156)),
        u = i(2085),
        c = i(3157),
        d = (function(e) {
          function t() {
            return (
              (0, n.default)(this, t),
              (0, s.default)(this, (0, o.default)(t).apply(this, arguments))
            );
          }
          return (
            (0, l.default)(t, e),
            (0, a.default)(t, [
              {
                key: "tooltip",
                value: function() {
                  return new c.WaterfallTooltipMapper(
                    this.result,
                    this.config
                  ).serialize();
                }
              }
            ]),
            t
          );
        })(u.HighchartsCartesianMapper);
      t.WaterfallMapper = d;
    },
    3157: function(e, t, i) {
      "use strict";
      var r = i(137);
      i(63),
        i(150),
        i(59),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.WaterfallTooltipMapper = void 0);
      var n = r(i(141)),
        a = r(i(142)),
        s = r(i(155)),
        o = r(i(154)),
        l = r(i(156)),
        u = i(1495),
        c = i(252),
        d = i(356),
        f = i(234),
        h = i(283),
        p = (function(e) {
          function t() {
            return (
              (0, n.default)(this, t),
              (0, s.default)(this, (0, o.default)(t).apply(this, arguments))
            );
          }
          return (
            (0, l.default)(t, e),
            (0, a.default)(t, [
              {
                key: "formatter",
                value: function(e) {
                  var t,
                    i,
                    r = e.point.options && e.point.options.seriesDataPoint;
                  if ((0, h.pointIsNull)(e.point)) t = c.HIGHCHARTS.NULL;
                  else {
                    var n = e.series.options.series.field.value_format,
                      a = e.series.options.series.numberFormat,
                      s = r && r.formattedY,
                      o = r && r.html,
                      l = r && r.rendered;
                    t = s || o || l || (0, f.valueFormatter)(e.y, n, a);
                    var u = d.Aesthetics.y(this.result);
                    i = r
                      ? u.find(function(e) {
                          return !!r.row[e.name];
                        }).field_group_variant
                      : "Total";
                  }
                  return "\n      <div>\n        "
                    .concat(
                      i,
                      '\n        <div style="padding: 5px 0;">\n          <div style="font-weight: 700;">\n            '
                    )
                    .concat(
                      t,
                      "\n          </div>\n        </div>\n      </div>\n    "
                    );
                }
              }
            ]),
            t
          );
        })(u.TooltipMapper);
      t.WaterfallTooltipMapper = p;
    },
    3158: function(e, t, i) {
      "use strict";
      var r = i(137);
      i(59),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.WaterfallSeriesGenerator = void 0);
      var n = r(i(141)),
        a = r(i(142)),
        s = i(199),
        o = i(1477),
        l = i(356),
        u = i(3159),
        c = (function() {
          function e() {
            (0, n.default)(this, e);
          }
          return (
            (0, a.default)(e, null, [
              {
                key: "generateSeries",
                value: function(e, t) {
                  if (
                    0 === e.fields.dimension_like.length &&
                    e.fields.measure_like.length > 1
                  ) {
                    var i = l.Aesthetics.y(e)[0];
                    return [
                      new u.WaterfallSeries(
                        e,
                        t,
                        s.HighchartsChartType.Waterfall,
                        i.name,
                        void 0,
                        i,
                        0,
                        void 0,
                        !1,
                        0,
                        void 0,
                        1,
                        l.Aesthetics.y(e).length
                      )
                    ];
                  }
                  return o.SeriesGenerator.generateSeries(e, t);
                }
              }
            ]),
            e
          );
        })();
      t.WaterfallSeriesGenerator = c;
    },
    3159: function(e, t, i) {
      "use strict";
      var r = i(137);
      i(187),
        i(59),
        i(60),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.WaterfallSeries = void 0);
      var n = r(i(141)),
        a = r(i(142)),
        s = r(i(155)),
        o = r(i(154)),
        l = r(i(156)),
        u = i(199),
        c = i(2118),
        d = i(1918),
        f = (function(e) {
          function t() {
            return (
              (0, n.default)(this, t),
              (0, s.default)(this, (0, o.default)(t).apply(this, arguments))
            );
          }
          return (
            (0, l.default)(t, e),
            (0, a.default)(t, [
              {
                key: "getData",
                value: function() {
                  var e = this,
                    t = this.limitDataByConfiguration(
                      this.result,
                      this.config
                    )[0],
                    i = [];
                  return (
                    this.result.fields.measure_like.forEach(function(r) {
                      var n = t[r.name],
                        a = {};
                      a[r.name] = n;
                      var s = new d.SeriesDataPoint(
                        e.result,
                        e.config,
                        e,
                        a,
                        r
                      );
                      (e.xAxisType === u.AxisType.Datetime && void 0 === s.x) ||
                        (e.xAxisType === u.AxisType.Linear && void 0 === s.x) ||
                        (e.field.is_timeframe && s.isNull) ||
                        i.push(s);
                    }),
                    (this.xAxisType !== u.AxisType.Linear &&
                      this.xAxisType !== u.AxisType.Datetime) ||
                      i.sort(function(e, t) {
                        return e.x - t.x;
                      }),
                    i
                  );
                }
              }
            ]),
            t
          );
        })(c.CartesianSeries);
      t.WaterfallSeries = f;
    },
    3160: function(e, t, i) {
      "use strict";
      var r = i(137);
      i(59),
        i(60),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.WordcloudMapper = void 0);
      var n = r(i(141)),
        a = r(i(142)),
        s = i(273),
        o = i(3161),
        l = (function() {
          function e(t, i, r) {
            var a = this;
            (0, n.default)(this, e),
              (this.result = t),
              (this.config = i),
              (this.openDrillMenu = r),
              (this.getEvents = function(e, t) {
                var i = a;
                return {
                  click: function(r) {
                    var n = e[t];
                    i.openDrillMenu({
                      element: $(r.target),
                      links: n.links || [],
                      event: r
                    });
                  }
                };
              });
          }
          return (
            (0, a.default)(e, [
              {
                key: "serialize",
                value: function() {
                  var e = this,
                    t = this.result.fields,
                    i = t.dimension_like[0].name,
                    r = t.measure_like[0].name,
                    n = [];
                  this.result.data.forEach(function(t) {
                    n.push({
                      name: t[i].value,
                      weight: t[r].value,
                      events: e.openDrillMenu ? e.getEvents(t, i) : void 0
                    });
                  });
                  var a =
                      !(
                        !this.config.color_application ||
                        !this.config.color_application.options
                      ) && this.config.color_application.options.reverse,
                    l = (0, s.paletteForApplication)(
                      this.config.color_application,
                      this.config.colors
                    ).sample(void 0, a);
                  return {
                    title: void 0,
                    credits: { enabled: !1 },
                    xAxis: { visible: !1 },
                    yAxis: { visible: !1 },
                    tooltip: new o.WordcloudTooltipMapper(
                      this.result,
                      this.config
                    ).serialize(),
                    series: [
                      {
                        type: "wordcloud",
                        animation: !1,
                        cursor: "pointer",
                        data: n,
                        colors: l
                      }
                    ]
                  };
                }
              }
            ]),
            e
          );
        })();
      t.WordcloudMapper = l;
    },
    3161: function(e, t, i) {
      "use strict";
      var r = i(137);
      i(63),
        i(59),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.WordcloudTooltipMapper = void 0);
      var n = r(i(141)),
        a = r(i(142)),
        s = r(i(155)),
        o = r(i(154)),
        l = r(i(156)),
        u = i(1495),
        c = i(252),
        d = i(356),
        f = i(234),
        h = i(283),
        p = (function(e) {
          function t() {
            return (
              (0, n.default)(this, t),
              (0, s.default)(this, (0, o.default)(t).apply(this, arguments))
            );
          }
          return (
            (0, l.default)(t, e),
            (0, a.default)(t, [
              {
                key: "formatter",
                value: function(e) {
                  var t,
                    i = e.point;
                  if ((0, h.pointIsNull)(e.point)) t = c.HIGHCHARTS.NULL;
                  else {
                    var r,
                      n = this.result.fields.measure_like[0],
                      a = n.value_format;
                    n.strict_value_format || (r = this.result.number_format),
                      (t = (0, f.valueFormatter)(i.weight, a, r));
                  }
                  var s = this.result.fields.measure_like[0].label,
                    o = (0, h.getXAxisTitle)(this.result, this.config),
                    l = d.Aesthetics.x(this.result)[0],
                    u = e.point.name || e.point.x,
                    p = "";
                  return (
                    l &&
                      (p = '\n        <div style="padding: 5px 0;">\n          '
                        .concat(
                          o ? "<div>".concat(o, "</div>") : "",
                          '\n          <div style="font-weight: 700;">'
                        )
                        .concat(u, "</div>\n        </div>\n      ")),
                    "\n      <div>\n        "
                      .concat(
                        p,
                        '\n        <div style="padding: 5px 0;">\n          <div>'
                      )
                      .concat(
                        s,
                        '</div>\n          <div style="font-weight: 700;">\n            '
                      )
                      .concat(
                        t,
                        "\n          </div>\n        </div>\n      </div>\n    "
                      )
                  );
                }
              }
            ]),
            t
          );
        })(u.TooltipMapper);
      t.WordcloudTooltipMapper = p;
    },
    4737: function(e, t, i) {
      "use strict";
      var r = i(137);
      i(174),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.boxplotOptions = t.scatterOptions = t.lineOptions = t.columnOptions = t.barOptions = t.areaOptions = t.cartesianOptions = void 0);
      var n = r(i(175)),
        a = r(i(426)),
        s = r(i(198)),
        o = i(199),
        l = r(i(723)),
        u = r(i(169)),
        c = function e() {
          for (
            var t = {}, i = arguments.length, r = new Array(i), o = 0;
            o < i;
            o++
          )
            r[o] = arguments[o];
          for (var l = 0, u = r; l < u.length; l++) {
            var c = u[l];
            for (var d in c) {
              var f = c[d];
              (0, n.default)(f)
                ? (t[d] = $.extend(!0, [], f))
                : (0, s.default)(f) && !(0, a.default)(f)
                ? (t[d] = e(f))
                : (t[d] = f);
            }
          }
          return t;
        },
        d = {
          baseOptions: {
            color_application: {
              type: "object",
              display: "color_application",
              label: "Color Configuration",
              section: "Series"
            },
            x_axis_gridlines: {
              type: "boolean",
              label: "Gridlines",
              section: "X",
              default: !1,
              hidden: function(e) {
                return !e.show_x_axis_ticks;
              },
              order: 50
            },
            y_axis_gridlines: {
              type: "boolean",
              label: "Gridlines",
              section: "Y",
              default: !0,
              order: 3,
              hidden: function(e) {
                return !e.show_y_axis_ticks;
              }
            },
            show_view_names: {
              type: "boolean",
              label: "Show Full Field Name",
              section: "Style",
              default: !1,
              order: 3
            },
            y_axes: { type: "array" },
            y_axis_min: {
              type: "array",
              label: "Minimum Values",
              section: "Y",
              placeholder: "10, 20, 30, etc.",
              display_size: "half",
              order: 5
            },
            y_axis_max: {
              type: "array",
              label: "Maximum Values",
              section: "Y",
              placeholder: "100, 200, 300, etc.",
              display_size: "half",
              order: 6
            },
            show_y_axis_labels: {
              type: "boolean",
              label: "Show Axis Names",
              default: !0,
              section: "Y",
              order: 1
            },
            show_y_axis_ticks: {
              type: "boolean",
              label: "Axis Value Labels",
              default: !0,
              section: "Y",
              order: 2
            },
            y_axis_labels: {
              type: "array",
              label: "Custom Axis Names",
              section: "Y",
              placeholder: "Label 1, Label 2, Label 3, etc.",
              order: 1.1,
              hidden: function(e) {
                return !e.show_y_axis_labels;
              }
            },
            y_axis_tick_density: {
              type: "string",
              display: "radio",
              label: "Tick Density",
              values: [{ Default: "default" }, { Custom: "custom" }],
              section: "Y",
              default: "default",
              order: 7
            },
            y_axis_tick_density_custom: {
              type: "number",
              display: "range",
              no_label: !0,
              section: "Y",
              min: 2,
              max: 25,
              default: 5,
              order: 7.1,
              hidden: function(e) {
                return "default" === e.y_axis_tick_density;
              }
            },
            y_axis_value_format: {
              type: "string",
              label: "Y Axis Format",
              section: "Y",
              placeholder: "Spreadsheet-style format code",
              hidden: function(e) {
                return !e.show_y_axis_ticks;
              },
              order: 9
            },
            x_axis_min: {
              type: "array",
              label: "Minimum Value",
              section: "X",
              placeholder: "Auto detect",
              display_size: "half",
              order: 1,
              disabledReason: function(e, t) {
                if (t && t.fields && t.fields.dimension_like) {
                  var i = t.fields.dimension_like;
                  return !i ||
                    !i.length ||
                    i.some(function(e) {
                      return !e.is_numeric;
                    }) ||
                    ["looker_column", "looker_bar"].includes(e.type) ||
                    ["time", "ordinal"].includes(e.x_axis_scale)
                    ? "Only a numeric x-axis can specify a minimum value."
                    : void 0;
                }
              },
              hidden: function() {
                return !0;
              }
            },
            x_axis_max: {
              type: "array",
              label: "Maximum Value",
              section: "X",
              placeholder: "Auto detect",
              display_size: "half",
              order: 1.1,
              disabledReason: function(e, t) {
                if (t && t.fields && t.fields.dimension_like) {
                  var i = t.fields.dimension_like;
                  return !i ||
                    !i.length ||
                    i.some(function(e) {
                      return !e.is_numeric;
                    }) ||
                    ["looker_column", "looker_bar"].includes(e.type) ||
                    ["time", "ordinal"].includes(e.x_axis_scale)
                    ? "Only a numeric x-axis can specify a minimum value."
                    : void 0;
                }
              },
              hidden: function() {
                return !0;
              }
            },
            show_x_axis_label: {
              type: "boolean",
              label: "Show Axis Name",
              default: !0,
              section: "X",
              order: 2
            },
            x_axis_label: {
              type: "string",
              section: "X",
              label: "Custom Axis Name",
              order: 2.1,
              hidden: function(e) {
                return !e.show_x_axis_label;
              }
            },
            show_x_axis_ticks: {
              type: "boolean",
              label: "Axis Value Labels",
              default: !0,
              section: "X",
              order: 9
            },
            y_axis_scale_mode: {
              type: "string",
              display: "radio",
              values: [{ Linear: "linear" }, { Logarithmic: "log" }],
              default: "linear",
              label: "Scale Type",
              section: "Y",
              order: 0,
              hidden: function(e, t) {
                return "" !== e.stacking;
              },
              validateValue: function(e, t, i) {
                return "" !== t.stacking ? "linear" : e;
              }
            },
            x_axis_reversed: { type: "boolean", default: !1 },
            y_axis_reversed: { type: "boolean", default: !1 },
            size_by_field: { type: "string", label: "Size Points by Field" },
            plot_size_by_field: { type: "boolean", default: !1 }
          },
          extraBaseOptions: {
            trellis: {
              type: "select",
              options: [
                { name: "None", value: o.TrellisType.None },
                { name: "By Pivot", value: o.TrellisType.Pivot },
                { name: "By Row", value: o.TrellisType.Row }
              ],
              label: "Trellis",
              section: "Plot",
              default: "",
              order: 19
            },
            stacking: {
              type: "string",
              display: "radio",
              values: [
                { Grouped: "" },
                { Stacked: "normal" },
                { "Stacked Percentage": "percent" }
              ],
              label: "Series Positioning",
              default: "",
              section: "Plot",
              order: 0
            },
            limit_displayed_rows: {
              type: "boolean",
              label: "Limit Displayed Rows",
              default: !1,
              section: "Plot",
              order: 102
            },
            limit_displayed_rows_values: {
              type: "sentence_maker",
              label: "Limit Displayed Rows Values",
              section: "Plot",
              words: [
                {
                  type: "select",
                  name: "show_hide",
                  options: [
                    { label: "Hide", value: "hide" },
                    { label: "Show", value: "show" }
                  ]
                },
                { type: "separator", text: "the" },
                {
                  type: "select",
                  name: "first_last",
                  options: [
                    { label: "First", value: "first" },
                    { label: "Last", value: "last" }
                  ]
                },
                { type: "number", name: "num_rows", value: 0 },
                { type: "separator", text: "rows" }
              ],
              order: 102.1,
              hidden: function(e) {
                return !e.limit_displayed_rows;
              }
            },
            hidden_series: {
              type: "array",
              label: "Hidden Series",
              hidden: !0
            },
            x_padding_left: {
              type: "number",
              min: 0,
              max: 100,
              label: "Padding Left",
              section: "X",
              placeholder: "0 to 100",
              order: 100,
              display_size: "half"
            },
            x_padding_right: {
              type: "number",
              min: 0,
              max: 100,
              label: "Padding Right",
              section: "X",
              placeholder: "0 to 100",
              order: 100,
              display_size: "half"
            },
            hide_legend: {
              type: "boolean",
              label: "Hide Legend",
              section: "Style",
              order: 2
            },
            legend_position: {
              type: "string",
              display: "radio",
              values: [
                { Center: "center" },
                { Left: "left" },
                { Right: "right" }
              ],
              default: "center",
              label: "Legend Align",
              section: "Style",
              order: 3,
              hidden: function(e, t) {
                return (
                  e.hide_legend ||
                  (t &&
                    t.fields &&
                    t.fields.measure_like.length <= 1 &&
                    !(t.pivots && t.pivots.length))
                );
              }
            },
            colors: {
              type: "array",
              display: "colors",
              label: "Chart Colors",
              section: "Style",
              placeholder: "#62bdf4, #f59b38, blue, etc.",
              order: 0
            },
            font_size: {
              type: "string",
              label: "Font Size",
              section: "Values",
              placeholder: "12px, 2em, 100%, etc.",
              order: 3
            },
            label_value_format: {
              type: "string",
              label: "Value Format",
              section: "Values",
              placeholder: "Spreadsheet-style format code",
              order: 9
            },
            trellis_rows: {
              type: "number",
              label: "Number of Charts per Row",
              section: "Plot",
              min: 1,
              order: 19.1
            },
            series_types: {
              type: "object",
              label: "Series Types",
              section: "Plot",
              placeholder: "users.count: line\nPivot Value: area",
              order: 100
            },
            point_style: {
              type: "string",
              display: "radio",
              values: [
                { None: "none" },
                { Filled: "circle" },
                { Outline: "circle_outline" }
              ],
              label: "Point Style",
              default: "none",
              section: "Style",
              order: 4
            },
            series_colors: {
              type: "object",
              label: "Series Colors",
              section: "Style",
              placeholder: "users.count: red\nPivot Value: #f59b38",
              order: 9
            },
            series_labels: {
              type: "object",
              label: "Series Labels",
              section: "Style",
              placeholder:
                "users.count: My Great Label\nPivot Value: My Greater Label",
              order: 9
            },
            series_point_styles: {
              type: "object",
              label: "Series Point Styles",
              section: "Style",
              placeholder: "users.count: circle"
            },
            show_value_labels: {
              type: "boolean",
              label: "Value Labels",
              section: "Values",
              default: !1,
              order: 0
            },
            label_density: {
              type: "number",
              label: "Value Density",
              display: "range",
              section: "Values",
              min: 1,
              max: 25,
              default: 25,
              validateValue: function(e, t, i) {
                return e > 25 ? 25 : e;
              }
            },
            label_color: {
              type: "array",
              label: "Value Colors",
              section: "Values",
              placeholder: "#62bdf4, #f59b38, blue, etc.",
              order: 2
            },
            x_axis_scale: {
              type: "string",
              display: "radio",
              values: [
                { "Automatic Based on Data": "auto" },
                { Ordinal: "ordinal" },
                { Time: "time" }
              ],
              default: "auto",
              label: "Scale Type",
              section: "X",
              order: 0
            },
            x_axis_datetime_label: {
              type: "string",
              label: "Time Label Format",
              section: "X",
              placeholder: "%b '%y (printf-style)",
              hidden: function(e) {
                return !e.show_x_axis_ticks;
              },
              order: 50
            },
            y_axis_combined: {
              type: "boolean",
              label: "Combine Axes",
              section: "Y",
              order: 0,
              default: !0,
              disabledReason: function(e, t) {
                if (t && t.fields)
                  return t.fields.measure_like.length > 1 &&
                    t.fields.pivots.length > 0
                    ? "Must combine axes when using both pivots and multiple measures."
                    : "percent" === e.stacking || "normal" === e.stacking
                    ? "Axes must be combined for stacked chart types"
                    : "log" === e.y_axis_scale_mode
                    ? "Axes must be combined for logarithmic axis"
                    : void 0;
              },
              validateValue: function(e, t, i) {
                return (
                  (i &&
                    i.fields &&
                    i.fields.measure_like.length > 1 &&
                    i.fields.pivots.length > 0) ||
                  e
                );
              }
            },
            x_axis_datetime_tick_count: {
              type: "number",
              label: "Time Tick Count",
              section: "X",
              placeholder: "> 0",
              min: 0,
              hidden: function(e) {
                return !e.show_x_axis_ticks;
              },
              order: 50
            }
          },
          linearOptions: {
            stacking: {
              type: "string",
              display: "radio",
              values: [
                { Overlay: "" },
                { Stacked: "normal" },
                { "Stacked Percentage": "percent" }
              ],
              label: "Series Positioning",
              default: "",
              section: "Plot",
              order: 0
            },
            show_null_points: {
              type: "boolean",
              label: "Plot Null Values",
              default: !0,
              section: "Plot",
              hidden: function(e) {
                return "" !== e.stacking;
              },
              order: 10
            },
            x_axis_scale: {
              type: "string",
              display: "radio",
              values: [
                { "Automatic Based on Data": "auto" },
                { Ordinal: "ordinal" },
                { Linear: "linear" },
                { Time: "time" }
              ],
              default: "auto",
              label: "Scale Type",
              section: "X",
              order: 0
            }
          },
          lineOptions: {
            interpolation: {
              type: "string",
              display: "select",
              values: [
                { Linear: "linear" },
                { Monotone: "monotone" },
                { "Step (center)": "step" },
                { "Step (before)": "step-before" },
                { "Step (after)": "step-after" }
              ],
              default: "linear",
              label: "Line Interpolation",
              section: "Plot",
              order: 4
            },
            discontinuous_nulls: {
              type: "boolean",
              label: "Null Values Cause Discontinuities",
              section: "Plot",
              hidden: function(e) {
                return e.show_null_points || "" !== e.stacking;
              },
              order: 11
            }
          },
          columnOptions: {
            show_dropoff: {
              type: "boolean",
              label: "Show Percent of Previous",
              section: "Plot",
              order: 20,
              hidden: function(e) {
                return "" !== e.stacking || "time" === e.x_axis_scale;
              }
            }
          },
          barOptions: {
            ordering: {
              type: "string",
              display: "select",
              values: [
                { Default: "none" },
                { Ascending: "asc" },
                { Descending: "desc" }
              ],
              default: "none",
              label: "Series Order",
              section: "Plot",
              order: 4,
              hidden: function(e) {
                return "" === e.stacking;
              }
            },
            label_rotation: {
              type: "number",
              label: "Value Rotation",
              step: 5,
              section: "Values",
              hidden: function(e) {
                return e.stacking;
              },
              placeholder: "-360 to 360",
              min: -360,
              max: 360,
              order: 5
            },
            show_null_labels: {
              type: "boolean",
              default: !1,
              label: "Label Null Columns",
              section: "Values",
              order: 1
            },
            column_spacing_ratio: {
              type: "number",
              min: 0,
              max: 1,
              label: "Inner Spacing",
              step: 0.1,
              section: "Style",
              hidden: function(e) {
                return "" !== e.stacking;
              },
              placeholder: "0 to 1"
            },
            column_group_spacing_ratio: {
              type: "number",
              min: 0,
              max: 1,
              label: "Spacing",
              step: 0.1,
              section: "Style",
              placeholder: "0 to 1"
            }
          },
          barOnlyOptions: {
            x_axis_label_rotation_bar: {
              type: "number",
              label: "Label Rotation",
              step: 5,
              section: "X",
              placeholder: "-45 to 45",
              min: -45,
              max: 45,
              hidden: function(e) {
                return !e.show_x_axis_ticks;
              },
              order: 50
            }
          },
          nonBarOptions: {
            y_axis_orientation: {
              type: "array",
              label: "Orientations",
              section: "Y",
              placeholder: "left, right, right, etc.",
              order: 4
            },
            x_axis_label_rotation: {
              type: "number",
              label: "Label Rotation",
              step: 5,
              section: "X",
              placeholder: "-360 to 360",
              hidden: function(e) {
                return !e.show_x_axis_ticks;
              },
              order: 50
            }
          },
          flippableOptions: {
            swap_axes: {
              type: "boolean",
              label: "Swap X and Y",
              section: "Plot",
              order: 101
            }
          },
          referenceLineOptions: {
            reference_lines: {
              type: "object_list",
              label: "Reference Line",
              section: "Y",
              order: 10,
              newItem: {
                reference_type: "line",
                line_value: "mean",
                range_start: "max",
                range_end: "min",
                margin_top: "deviation",
                margin_value: "mean",
                margin_bottom: "deviation",
                label_position: "right",
                color: "#000000"
              },
              options: {
                reference_type: {
                  label: "Type",
                  type: "string",
                  display: "select",
                  values: [
                    { Line: "line" },
                    { Range: "range" },
                    { "Line with Margins": "margins" }
                  ],
                  default: "line",
                  order: 3
                },
                line_value: {
                  label: "Value",
                  type: "string",
                  display: "select",
                  values: [
                    { Median: "median" },
                    { "Average (Mean)": "mean" },
                    { Maximum: "max" },
                    { Minimum: "min" }
                  ],
                  custom_value: "Custom…",
                  default: "mean",
                  hidden: function(e) {
                    return "line" !== e.reference_type;
                  },
                  order: 4
                },
                range_start: {
                  label: "Start Value",
                  type: "string",
                  display: "select",
                  values: [
                    { Median: "median" },
                    { "Average (Mean)": "mean" },
                    { Maximum: "max" },
                    { Minimum: "min" }
                  ],
                  custom_value: "Custom…",
                  default: "max",
                  hidden: function(e) {
                    return "range" !== e.reference_type;
                  },
                  order: 5
                },
                range_end: {
                  label: "End Value",
                  type: "string",
                  display: "select",
                  values: [
                    { Median: "median" },
                    { "Average (Mean)": "mean" },
                    { Maximum: "max" },
                    { Minimum: "min" }
                  ],
                  custom_value: "Custom…",
                  default: "min",
                  hidden: function(e) {
                    return "range" !== e.reference_type;
                  },
                  order: 6
                },
                margin_top: {
                  label: "Margin Above",
                  type: "string",
                  display: "select",
                  values: [
                    { "Standard Deviation": "deviation" },
                    { Variance: "variance" }
                  ],
                  custom_value: "Custom…",
                  default: "deviation",
                  hidden: function(e) {
                    return "margins" !== e.reference_type;
                  },
                  order: 7
                },
                margin_value: {
                  label: "Value",
                  type: "string",
                  display: "select",
                  values: [
                    { Median: "median" },
                    { "Average (Mean)": "mean" },
                    { Maximum: "max" },
                    { Minimum: "min" }
                  ],
                  custom_value: "Custom…",
                  default: "mean",
                  hidden: function(e) {
                    return "margins" !== e.reference_type;
                  },
                  order: 8
                },
                margin_bottom: {
                  label: "Margin Below",
                  type: "string",
                  display: "select",
                  values: [
                    { "Standard Deviation": "deviation" },
                    { Variance: "variance" }
                  ],
                  custom_value: "Custom…",
                  default: "deviation",
                  hidden: function(e) {
                    return "margins" !== e.reference_type;
                  },
                  order: 9
                },
                label: { type: "string", label: "Label", order: 10 },
                label_position: {
                  type: "string",
                  display: "radio",
                  values: [
                    { Left: "left" },
                    { Center: "center" },
                    { Right: "right" }
                  ],
                  label: "Label Position",
                  default: "right",
                  order: 11
                },
                color: {
                  type: "string",
                  display: "color",
                  label: "Color",
                  order: 12
                },
                value_format: {
                  type: "string",
                  label: "Value Format",
                  placeholder: "Spreadsheet-style format code",
                  order: 13
                }
              }
            },
            trend_lines: {
              type: "object_list",
              label: "Trend Line",
              section: "Y",
              order: 10,
              hidden: function(e) {
                return !u.default.state.allowTrendLines;
              },
              newItem: {
                color: "#000000",
                label_position: "right",
                period: 7,
                regression_type: "linear",
                series_index: 1,
                show_label: !0
              },
              options: {
                regression_type: {
                  label: "Trend Type",
                  type: "string",
                  display: "select",
                  values: [
                    { Linear: "linear" },
                    { Exponential: "exponential" },
                    { Logarithmic: "logarithmic" },
                    { "Moving Average": "average" }
                  ],
                  order: 3
                },
                period: {
                  label: "Period",
                  type: "number",
                  default: 7,
                  placeholder: "Positive integer (1,2,3...)",
                  step: 1,
                  min: 1,
                  order: 4,
                  hidden: function(e) {
                    return "average" !== e.regression_type;
                  }
                },
                color: { type: "string", display: "color", label: "Color" },
                series_index: {
                  label: "Series Index",
                  type: "number",
                  placeholder: "1 for first pivot, 2 second pivot, etc.",
                  step: 1,
                  min: 1,
                  order: 4
                },
                show_label: { type: "boolean", label: "Show Label", order: 9 },
                label_type: {
                  type: "string",
                  display: "radio",
                  values: [
                    { String: "string" },
                    { "R^2": "r2" },
                    { Equation: "equation" }
                  ],
                  default: "string",
                  label: "Label Type",
                  order: 10,
                  hidden: function(e) {
                    return !e.show_label;
                  }
                },
                label: {
                  type: "string",
                  label: "Label",
                  order: 11,
                  hidden: function(e) {
                    return !e.show_label || "string" !== e.label_type;
                  }
                },
                label_position: {
                  type: "string",
                  display: "radio",
                  values: [
                    { Left: "left" },
                    { Center: "center" },
                    { Right: "right" }
                  ],
                  label: "Label Position",
                  order: 12,
                  hidden: function(e) {
                    return !e.show_label;
                  }
                }
              }
            }
          },
          stackableOptions: {
            show_totals_labels: {
              type: "boolean",
              label: "Totals Labels",
              info:
                "Totals Labels are a simple sum of values. Data table totals count unique values only once.",
              info_link: l.default.url("/r/query/totals-dont-match"),
              section: "Values",
              default: !1,
              order: 1,
              hidden: function(e) {
                return "normal" !== e.stacking;
              }
            },
            show_silhouette: {
              type: "boolean",
              label: "Show Silhouette of Disabled Series",
              section: "Values",
              default: !1,
              order: 2,
              hidden: function(e) {
                return "normal" !== e.stacking;
              }
            },
            totals_color: {
              type: "string",
              display: "color",
              label: "Totals Color",
              section: "Values",
              default: "#808080",
              placeholder: "#808080",
              order: 2,
              hidden: function(e) {
                return "normal" !== e.stacking;
              }
            }
          },
          nonBarStackableOptions: {
            totals_rotation: {
              type: "number",
              label: "Totals Rotation",
              step: 5,
              section: "Values",
              hidden: function(e) {
                return "normal" !== e.stacking || !e.show_totals_labels;
              },
              placeholder: "-360 to 360",
              min: -360,
              max: 360,
              order: 5
            }
          }
        };
      t.cartesianOptions = d;
      t.areaOptions = function() {
        return c(
          d.baseOptions,
          d.extraBaseOptions,
          d.referenceLineOptions,
          d.nonBarOptions,
          d.flippableOptions,
          d.linearOptions,
          d.lineOptions,
          d.stackableOptions
        );
      };
      t.barOptions = function() {
        return c(
          d.baseOptions,
          d.extraBaseOptions,
          d.referenceLineOptions,
          d.barOptions,
          d.barOnlyOptions,
          d.stackableOptions,
          d.nonBarStackableOptions
        );
      };
      t.columnOptions = function() {
        return c(
          d.baseOptions,
          d.extraBaseOptions,
          d.referenceLineOptions,
          d.nonBarOptions,
          d.barOptions,
          d.columnOptions,
          d.stackableOptions,
          d.nonBarStackableOptions
        );
      };
      t.lineOptions = function() {
        return c(
          d.baseOptions,
          d.extraBaseOptions,
          d.referenceLineOptions,
          d.nonBarOptions,
          d.flippableOptions,
          d.linearOptions,
          d.lineOptions
        );
      };
      t.scatterOptions = function() {
        return c(
          d.baseOptions,
          d.extraBaseOptions,
          d.referenceLineOptions,
          d.nonBarOptions,
          d.flippableOptions,
          d.linearOptions
        );
      };
      t.boxplotOptions = function() {
        return c(d.baseOptions);
      };
    },
    4738: function(e, t, i) {
      "use strict";
      var r = i(137);
      i(162),
        i(172),
        i(178),
        i(174),
        i(64),
        i(36),
        i(160),
        i(146),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.hboxplot = void 0);
      var n = i(3149),
        a = r(i(2448)),
        s = i(3151),
        o = i(4737),
        l = r(i(888)),
        u = {
          id: "looker_boxplot",
          label: "Boxplot",
          options: (0, o.boxplotOptions)(),
          lookerInternal: { primary: !1 },
          create: function(e) {},
          update: function(e, t, i, r, o) {
            this.clearErrors(), (r.data = e);
            try {
              if (!e.length || void 0 === i.type)
                return void this.addError({
                  title: "No Results",
                  group: "No Results",
                  retryable: !0
                });
              this.clearErrors("No Results");
              var u = s.BoxplotSeriesGenerator.generateSeries(r, i),
                c = this.validate(r, i, u);
              if (c) return void this.addError(c);
              var d = l.default.openDrillMenu,
                f = new n.BoxplotMapper(r, i, u, void 0, d),
                h = f.serialize();
              if (f.errors.length) {
                var p = !0,
                  v = !1,
                  y = void 0;
                try {
                  for (
                    var g, m = f.errors[Symbol.iterator]();
                    !(p = (g = m.next()).done);
                    p = !0
                  ) {
                    var b = g.value;
                    this.addError(b);
                  }
                } catch (e) {
                  (v = !0), (y = e);
                } finally {
                  try {
                    p || null == m.return || m.return();
                  } finally {
                    if (v) throw y;
                  }
                }
              } else (x = h), a.default.chart(t, x);
            } catch (c) {
              this.addError({
                group: "Exception",
                title: "Internal Chart Error",
                message: "Please ensure that ".concat(
                  i.type,
                  " visualizations support the provided data."
                )
              }),
                console.error(c);
            }
            var x;
          },
          validate: function(e, t, i) {
            var r = e.fields,
              n = r.dimension_like || [],
              a = r.measure_like || [],
              s = r.pivots || [];
            if (n.length < 1 || ![2, 3, 5].includes(a.length) || s.length > 0)
              return {
                group: "Incompatible Data",
                title: "Incompatible Data",
                message:
                  "Requires 1+ dimensions and 2, 3, or 5 measures. Measures must be ordered left to right in order of minimum, first quartile, median, third quartile, maximum."
              };
            var o = i[0].validate();
            return o || null;
          }
        };
      t.hboxplot = u;
    },
    4740: function(e, t, i) {
      "use strict";
      var r = i(137);
      i(162),
        i(172),
        i(178),
        i(64),
        i(36),
        i(160),
        i(146),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.hwaterfall = void 0);
      var n = i(273),
        a = i(3156),
        s = r(i(2448)),
        o = i(3158),
        l = i(2084),
        u = r(i(888)),
        c = {
          id: "looker_waterfall",
          label: "Waterfall",
          lookerInternal: { primary: !1 },
          options: {
            color_application: {
              type: "object",
              display: "color_application",
              label: "Color Configuration",
              section: "Series",
              supports: ["discrete", "continuous"],
              order: 0
            },
            up_color: {
              type: "string",
              display: "color",
              label: "Up Color",
              section: "Series",
              default: !1,
              placeholder: "#21801c",
              order: 1,
              color_application: "color_application"
            },
            down_color: {
              type: "string",
              display: "color",
              label: "Down Color",
              section: "Series",
              default: !1,
              placeholder: "#c97e10",
              order: 2,
              color_application: "color_application"
            },
            total_color: {
              type: "string",
              display: "color",
              label: "Total Color",
              section: "Series",
              default: !1,
              placeholder: "#808080",
              order: 3,
              color_application: "color_application"
            },
            show_value_labels: {
              type: "boolean",
              label: "Value Labels",
              section: "Values",
              default: !1,
              order: 0
            },
            label_color: {
              type: "array",
              label: "Value Colors",
              section: "Values",
              placeholder: "#62bdf4, #f59b38, blue, etc.",
              order: 2
            },
            show_x_axis_ticks: {
              type: "boolean",
              label: "Axis Value Labels",
              default: !0,
              section: "X",
              order: 9
            },
            show_x_axis_label: {
              type: "boolean",
              label: "Show Axis Name",
              default: !0,
              section: "X",
              order: 2
            },
            x_axis_scale: {
              type: "string",
              display: "radio",
              values: [
                { "Automatic Based on Data": "auto" },
                { Ordinal: "ordinal" },
                { Time: "time" }
              ],
              default: "auto",
              label: "Scale Type",
              section: "X",
              order: 0
            },
            show_y_axis_labels: {
              type: "boolean",
              label: "Show Axis Names",
              default: !0,
              section: "Y",
              order: 1
            },
            show_y_axis_ticks: {
              type: "boolean",
              label: "Axis Value Labels",
              default: !0,
              section: "Y",
              order: 2
            },
            y_axis_gridlines: {
              type: "boolean",
              label: "Gridlines",
              section: "Y",
              default: !0,
              order: 3,
              hidden: function(e) {
                return !e.show_x_axis_ticks;
              }
            }
          },
          colorApp: void 0,
          reverse: !1,
          create: function(e, t) {},
          update: function(e, t, i, r, n) {
            this.clearErrors(), (r.data = e);
            try {
              if (!e.length || void 0 === i.type)
                return void this.addError({
                  title: "No Results",
                  group: "No Results",
                  retryable: !0
                });
              this.clearErrors("No Results"), this.updateWaterfallColors(i);
              var l = o.WaterfallSeriesGenerator.generateSeries(r, i),
                c = this.validate(r, i, l);
              if (c) return void this.addError(c);
              var d = function(e) {
                  return s.default.chart(t, e);
                },
                f = u.default.openDrillMenu,
                h = new a.WaterfallMapper(
                  r,
                  i,
                  l,
                  function e(t) {
                    i.hidden_series = t;
                    var n = o.WaterfallSeriesGenerator.generateSeries(r, i),
                      s = new a.WaterfallMapper(r, i, n, e, f).serialize();
                    d(s);
                  },
                  f
                ),
                p = h.serialize();
              if (h.errors.length) {
                var v = !0,
                  y = !1,
                  g = void 0;
                try {
                  for (
                    var m, b = h.errors[Symbol.iterator]();
                    !(v = (m = b.next()).done);
                    v = !0
                  ) {
                    var x = m.value;
                    this.addError(x);
                  }
                } catch (e) {
                  (y = !0), (g = e);
                } finally {
                  try {
                    v || null == b.return || b.return();
                  } finally {
                    if (y) throw g;
                  }
                }
              } else d(p);
            } catch (c) {
              this.addError({
                group: "Exception",
                title: "Internal Chart Error",
                message:
                  "Please ensure that waterfall visualizations support the provided data."
              }),
                console.error(c);
            }
          },
          validate: function(e, t, i) {
            var r = (0, l.valueFormatValidator)(e, t);
            if (r) return r;
            if (!e || !e.data) return null;
            if (
              1 === e.fields.dimension_like.length &&
              1 !== e.fields.measure_like.length
            )
              return {
                group: "Incompatible Data",
                title: "Incompatible Data",
                message: "Chart with one dimension requires one measure"
              };
            if (
              0 === e.fields.dimension_like.length &&
              0 === e.fields.measure_like.length
            )
              return {
                group: "Incompatible Data",
                title: "Incompatible Data",
                message: "Chart requires at least one measure"
              };
            if (!e.data.length)
              return {
                title: "No Results",
                group: "No Results",
                retryable: !0
              };
            var n = i[0].validate();
            return n || null;
          },
          updateWaterfallColors: function(e) {
            var t = this;
            if (
              !this.colorApp ||
              (e.color_application &&
                e.color_application.collection_id !==
                  t.colorApp.collection_id) ||
              (e.color_application &&
                e.color_application.palette_id !== t.colorApp.palette_id)
            ) {
              this.colorApp =
                e.color_application || (0, n.generateColorApplication)();
              var i =
                  !(!e.color_application || !e.color_application.options) &&
                  e.color_application.options.reverse,
                r = (0, n.paletteForApplication)(
                  e.color_application,
                  e.colors
                ).sample(3, i);
              this.trigger("updateConfig", [
                { up_color: r[0], down_color: r[1], total_color: r[2] }
              ]);
            } else if (
              e.color_application &&
              e.color_application.options &&
              e.color_application.options.reverse !== t.reverse
            ) {
              var a = e.color_application.options.reverse;
              this.reverse = a;
              var s = (0, n.paletteForApplication)(
                e.color_application,
                e.colors
              ).sample(3, a);
              this.trigger("updateConfig", [
                { up_color: s[0], down_color: s[1], total_color: s[2] }
              ]);
            }
          }
        };
      t.hwaterfall = c;
    },
    4741: function(e, t, i) {
      "use strict";
      var r = i(137);
      i(60),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.hwordcloud = void 0);
      var n = i(3160),
        a = r(i(5205)),
        s = r(i(888)),
        o = {
          id: "looker_wordcloud",
          label: "Word Cloud",
          lookerInternal: { primary: !1 },
          options: {
            color_application: {
              type: "object",
              display: "color_application",
              label: "Color Configuration",
              section: "Style",
              supports: ["discrete", "continuous"]
            }
          },
          errors: [],
          create: function(e) {},
          update: function(e, t, i, r, o) {
            this.clearErrors(), (r.data = e);
            var l = this.validate(r);
            if (l) this.addError(l);
            else if (e.length && void 0 !== i.type) {
              this.clearErrors("No Results");
              var u = new n.WordcloudMapper(
                r,
                i,
                s.default.openDrillMenu
              ).serialize();
              a.default.chart(t, u);
            } else
              this.addError({
                title: "No Results",
                group: "No Results",
                retryable: !0
              });
          },
          validate: function(e) {
            return e && e.data
              ? 1 !== e.fields.dimension_like.length ||
                1 !== e.fields.measure_like.length
                ? {
                    group: "Incompatible Data",
                    title: "Error",
                    message: "Chart requires one dimension and one measure."
                  }
                : e.data.length
                ? null
                : { title: "No Results", group: "No Results", retryable: !0 }
              : null;
          },
          addError: function(e) {
            this.errors.push(e);
          },
          clearErrors: function(e) {
            if (e) {
              var t = [];
              this.errors.forEach(function(i) {
                i.group !== e && t.push(i);
              }),
                (this.errors = t);
            } else this.errors = [];
          }
        };
      t.hwordcloud = o;
    },
    5203: function(e, t, i) {
      "use strict";
      var r = i(137);
      i(149),
        i(150),
        i(62),
        i(65),
        i(60),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = t.collectYAxesMinMax = void 0);
      var n = r(i(141)),
        a = r(i(142)),
        s = i(200),
        o = i(2492),
        l = r(i(2448)),
        u = i(199),
        c = r(i(906)),
        d = r(i(5204)),
        f = function(e, t) {
          var i = [],
            r = [];
          return (
            e.forEach(function(e) {
              e.yAxis.forEach(function(e, t) {
                var n = e.getExtremes(),
                  a = n.min,
                  s = n.max;
                (i[t] = i[t] ? i[t] : s),
                  (r[t] = r[t] ? r[t] : a),
                  s > i[t] && (i[t] = s),
                  a < r[t] && (r[t] = a);
              });
            }),
            { yAxesMins: r, yAxesMaxs: i }
          );
        };
      t.collectYAxesMinMax = f;
      var h = function(e, t) {
          e.style.position = "relative";
          var i = (function(e) {
              var t = (0, s.extend)(!0, {}, e);
              if (!t.series || !t.series.length) return t;
              if (!t.yAxis) return t;
              t.series.forEach(function(e) {
                e.data = [];
              }),
                (t.annotations = []),
                t.yAxis.forEach(function(e) {
                  e.labels && ((e.gridLineWidth = 0), (e.labels.enabled = !1));
                });
              return (
                (t.xAxis = Object.assign({}, t.xAxis, {
                  lineWidth: 0,
                  minorGridLineWidth: 0,
                  lineColor: "transparent",
                  tickLength: 0,
                  minorTickLength: 0,
                  tickWidth: 0,
                  labels: { enabled: !1 },
                  gridLineColor: "transparent"
                })),
                t
              );
            })(t),
            r = l.default.chart(e, i);
          (r.container.onmousemove = null),
            (r.container.onmousedown = null),
            (r.container.onclick = null);
          var n = r.plotBackground.element,
            a = document.createElement("div");
          return (
            Object.assign(a.style, {
              position: "absolute",
              height: "".concat(
                n.attributes.getNamedItem("height").nodeValue,
                "px"
              ),
              width: "".concat(
                n.attributes.getNamedItem("width").nodeValue,
                "px"
              ),
              top: "".concat(n.attributes.getNamedItem("y").nodeValue, "px"),
              left: "".concat(n.attributes.getNamedItem("x").nodeValue, "px")
            }),
            e.appendChild(a),
            a
          );
        },
        p = function(e, t, i) {
          if (e.config.series && e.config.annotations) {
            if (
              e.config.annotations.find(function(e) {
                return e.id === u.AnnotationIds.PercentOfPrevious;
              })
            ) {
              var r = e.config.annotations.filter(function(e) {
                return e.id !== u.AnnotationIds.PercentOfPrevious;
              });
              return (
                r.push(
                  new o.PercentOfPreviousMapper(
                    t,
                    i,
                    e.config.series
                  ).serialize()
                ),
                r
              );
            }
            return e.config.annotations;
          }
          return e.config.annotations;
        },
        v = (function() {
          function e(t, i, r, a) {
            (0, n.default)(this, e),
              (this.element = t),
              (this.mappedData = i),
              (this.config = r),
              (this.result = a),
              (this.renderArea = r.trellis ? h(t, i) : t);
            var s = new d.default(this.renderArea, this, r, a).charts.map(
                function(e) {
                  return l.default.chart(e.element, e.config);
                }
              ),
              o = f(s, i),
              u = o.yAxesMins,
              c = o.yAxesMaxs;
            this.alignAxes(s, u, c), (this.charts = s);
          }
          return (
            (0, a.default)(e, [
              {
                key: "singleChart",
                value: function() {
                  return [
                    {
                      column: 1,
                      row: 1,
                      element: this.element,
                      config: this.mappedData
                    }
                  ];
                }
              },
              {
                key: "trellisByPivot",
                value: function(e) {
                  var t = this;
                  return this.result.pivots && this.result.pivots.length
                    ? this.result.pivots.map(function(i, r) {
                        var n = r + 1,
                          a = Math.ceil(n / e),
                          s = n % e || e,
                          o = t.generateTrellisChart(s, a, t.mappedData),
                          l = e < t.result.pivots.length - r;
                        if (!o.config.series) return o;
                        o.config.series.forEach(function(e) {
                          var t = e;
                          t.series &&
                            t.series.pivot &&
                            (t.series.pivot.key !== i.key && (t.visible = !1),
                            (t.showInLegend = !1));
                        });
                        var u = c.default.pivotName(i);
                        return (
                          (o.config.annotations = p(o, t.result, t.config)),
                          t.setOptionsForTrellis(o.config, u, s, a, l, e),
                          o
                        );
                      })
                    : this.singleChart();
                }
              },
              {
                key: "trellisByRow",
                value: function(e) {
                  var t = this;
                  if (!this.mappedData.series) return [];
                  var i = this.mappedData.series[0];
                  return i.data
                    ? i.data.map(function(r, n) {
                        var a = n + 1,
                          s = Math.ceil(a / e),
                          o = a % e || e,
                          l = t.generateTrellisChart(o, s, t.mappedData),
                          u = !!i.data && e < i.data.length - n;
                        return (
                          l.config.series &&
                            l.config.series.forEach(function(e) {
                              e.data && (e.data = [e.data[n]]);
                            }),
                          (l.config.annotations = p(l, t.result, t.config)),
                          t.setOptionsForTrellis(l.config, null, o, s, u, e),
                          l
                        );
                      })
                    : [];
                }
              },
              {
                key: "alignAxes",
                value: function(e, t, i) {
                  e.forEach(function(e) {
                    e.yAxis.forEach(function(e, r) {
                      e.setExtremes(t[r], i[r]);
                    });
                  });
                }
              },
              {
                key: "generateTrellisChart",
                value: function(e, t, i) {
                  var r,
                    n = this.renderArea.appendChild(
                      document.createElement("div")
                    );
                  return (
                    Object.assign(n.style, {
                      msGridRow: t,
                      msGridColumn: e,
                      msGridColumnSpan: 1
                    }),
                    {
                      config: ((r = this.mappedData), (0, s.extend)(!0, {}, r)),
                      element: n,
                      column: e,
                      row: t
                    }
                  );
                }
              },
              {
                key: "setOptionsForTrellis",
                value: function(e) {
                  var t =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : null,
                    i = arguments.length > 2 ? arguments[2] : void 0,
                    r = arguments.length > 3 ? arguments[3] : void 0,
                    n = arguments.length > 4 ? arguments[4] : void 0,
                    a = arguments.length > 5 ? arguments[5] : void 0;
                  (e.legend.enabled = !1),
                    e.yAxis.forEach(function(t) {
                      t.labels &&
                        (t.opposite
                          ? i !== a && "bar" !== e.chart.type
                            ? (t.labels.style = { color: "transparent" })
                            : "bar" !== e.chart.type ||
                              n ||
                              (t.labels.style = { color: "transparent" })
                          : 1 !== i && "bar" !== e.chart.type
                          ? (t.labels.style = { color: "transparent" })
                          : "bar" === e.chart.type &&
                            1 === r &&
                            (t.labels.style = { color: "transparent" }),
                        t.title && (t.title.text = null));
                    }),
                    (e.title = {
                      text: t,
                      margin: 15,
                      style: { fontSize: "12px" }
                    }),
                    (e.xAxis.title.text = null),
                    (e.chart.spacingBottom = 25);
                }
              }
            ]),
            e
          );
        })();
      t.default = v;
    },
    5204: function(e, t, i) {
      "use strict";
      var r = i(137);
      i(63),
        i(65),
        Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = void 0);
      var n = r(i(141)),
        a = r(i(171)),
        s = i(199),
        o = function(e, t, i, r, n) {
          return {
            display: "-ms-grid",
            msGridColumns: (0, a.default)(Array(t)).reduce(function(e) {
              return e + "".concat(i, "px ");
            }, ""),
            msGridRows: (0, a.default)(Array(n)).reduce(function(e) {
              return e + "".concat(r, "px ");
            }, "")
          };
        },
        l = function(e) {
          return e.trellis === s.TrellisType.Pivot;
        },
        u = function(e, t) {
          return l(e)
            ? e.trellis && t.pivots
              ? t.pivots.length
              : 1
            : e.trellis && t.data
            ? t.data.length
            : 1;
        },
        c = function e(t, i, r, a) {
          (0, n.default)(this, e), (this.charts = []), (t.innerHTML = "");
          var s = t.clientWidth || 0,
            c = t.clientHeight || 0,
            d = (function(e, t, i, r, n) {
              var a = u(t, i),
                s = 1;
              return t.trellis
                ? !t.trellis_rows || t.trellis_rows > a
                  ? t.trellis_rows
                    ? a
                    : (n > r ? Math.floor : Math.ceil)(Math.sqrt(a))
                  : t.trellis_rows
                : s;
            })(0, r, a, s, c),
            f = s / d;
          this.charts = (function(e, t, i) {
            return e.trellis
              ? l(e)
                ? i.trellisByPivot(t)
                : i.trellisByRow(t)
              : i.singleChart();
          })(r, d, i);
          var h,
            p = (h = this.charts)[h.length - 1].row,
            v = c / p;
          this.charts.length > 1 &&
            Object.assign(
              t.style,
              (function(e, t, i, r, n) {
                var a = o(e, t, i, r, n);
                return Object.assign({}, a, {
                  display: "grid",
                  gridTemplateColumns: "repeat("
                    .concat(t, ", ")
                    .concat(i, "px)"),
                  gridAutoRows: "".concat(r, "px")
                });
              })(t, d, f, v, p)
            );
        };
      (t.default = c), (e.exports = t.default);
    },
    5205: function(e, t, i) {
      "use strict";
      var r = i(137);
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.default = void 0);
      var n = r(i(1837));
      (0, r(i(3394)).default)(n.default);
      var a = n.default;
      (t.default = a), (e.exports = t.default);
    }
  }
]);
