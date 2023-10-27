!(function (e, t, n, a) {
    var i = "SimpleMarquee";
    function s(t, n) {
        (this.element = t),
            (this._name = i),
            (this._defaults = e.fn.SimpleMarquee.defaults),
            (this.settings = e.extend({}, this._defaults, n)),
            (this.marqueeSpawned = []),
            (this.marqueeHovered = !1),
            (this.documentHasFocus = !1),
            (this.counter = 0),
            (this.timeLeft = 0),
            (this.currentPos = 0),
            (this.distanceLeft = 0),
            (this.totalDistance = 0),
            (this.contentWidth = 0),
            (this.endPoint = 0),
            (this.duration = 0),
            (this.hovered = !1),
            (this.padding = 0),
            this.init();
    }
    function r(e) {
        (this.el = e),
            (this.counter = 0),
            (this.name = ""),
            (this.timeTop = 0),
            (this.currentPos = 0),
            (this.distanceTop = 0),
            (this.totalDistance = 0),
            (this.contentWidth = 0),
            (this.endPoint = 0),
            (this.duration = 0),
            (this.hovered = !1),
            (this.padding = 0);
    }
    e.extend(s.prototype, {
        init: function () {
            this.buildCache(), this.bindEvents();
            var t = this.settings;
            0 != e(t.marquee_class).width()
                ? void 0 !== e(t.marquee_class)
                    ? void 0 !== e(t.container_class)
                        ? 0 == t.sibling_class || void 0 !== e(t.sibling_class)
                            ? (t.autostart && (this.documentHasFocus = !0), this.createMarquee())
                            : console.error("FATAL: sibling class container class not valid")
                        : console.error("FATAL: marquee container class not valid")
                    : console.error("FATAL: marquee class not valid")
                : console.error("FATAL: marquee css or children css not correct. Width is either set to 0 or the element is collapsing. Make sure overflow is set on the marquee, and the children are postitioned relatively");
        },
        destroy: function () {
            this.unbindEvents(), this.$element.removeData();
        },
        buildCache: function () {
            this.$element = e(this.element);
        },
        bindEvents: function () {
            var n = this;
            e(t).on("focus", function () {
                for (var e in ((n.documentHasFocus = !0), n.marqueeSpawned)) n.marqueeManager(n.marqueeSpawned[e]);
            }),
                e(t).on("blur", function () {
                    for (var e in ((n.documentHasFocus = !1), n.marqueeSpawned)) n.marqueeSpawned[e].el.clearQueue().stop(), (n.marqueeSpawned[e].hovered = !0);
                });
        },
        unbindEvents: function () {
            e(t).off("blur focus");
        },
        getPosition: function (t) {
            return (this.currentPos = parseInt(e(t).css("left"))), this.currentPos;
        },
        createMarquee: function () {
            var t = this,
                a = t.settings,
                i = e(a.marquee_class).html(),
                s = e(a.container_class).width(),
                o = e(a.marquee_class).width(),
                u = 0;
            0 != a.sibling_class && (u = e(a.sibling_class).width());
            var c = Math.ceil(s / o);
            e(a.marquee_class).remove(), c <= 2 ? (c = 3) : c++;
            for (var d = -((o + a.padding) * c - s), l = s - d, h = 0; h < c; h++) {
                var m = !1;
                (m =
                    1 == a.hover
                        ? e('<div class="marquee-' + (h + 1) + '">' + i + "</div>")
                              .mouseenter(function () {
                                  if (1 == t.documentHasFocus && 0 == t.marqueeHovered) for (var e in ((t.marqueeHovered = !0), t.marqueeSpawned)) t.marqueeSpawned[e].el.clearQueue().stop(), (t.marqueeSpawned[e].hovered = !0);
                              })
                              .mouseleave(function () {
                                  if (1 == t.documentHasFocus && 1 == t.marqueeHovered) {
                                      for (var e in t.marqueeSpawned) t.marqueeManager(t.marqueeSpawned[e]);
                                      t.marqueeHovered = !1;
                                  }
                              })
                        : e('<div class="marquee-' + (h + 1) + '">' + i + "</div>")),
                    (t.marqueeSpawned[h] = new r(m)),
                    e(a.container_class).append(m),
                    (t.marqueeSpawned[h].currentPos = u + o * h + a.padding * h),
                    (t.marqueeSpawned[h].name = ".marquee-" + (h + 1)),
                    (t.marqueeSpawned[h].totalDistance = l),
                    (t.marqueeSpawned[h].containerWidth = s),
                    (t.marqueeSpawned[h].contentWidth = o),
                    (t.marqueeSpawned[h].endPoint = d),
                    (t.marqueeSpawned[h].duration = a.duration),
                    (t.marqueeSpawned[h].padding = a.padding),
                    t.marqueeSpawned[h].el.css("left", t.marqueeSpawned[h].currentPos + a.padding + "px"),
                    1 == t.documentHasFocus && t.marqueeManager(t.marqueeSpawned[h]);
            }
            n.hasFocus() ? (t.documentHasFocus = !0) : (t.documentHasFocus = !1);
        },
        marqueeManager: function (e) {
            var t = e.name;
            0 == e.hovered
                ? e.counter > 0
                    ? ((e.timeLeft = e.duration), e.el.css("left", e.containerWidth + "px"), (e.currentPos = e.containerWidth), (e.distanceLeft = e.totalDistance - (e.containerWidth - this.getPosition(t))))
                    : (e.timeLeft = ((e.totalDistance - (e.containerWidth - this.getPosition(t))) / e.totalDistance) * e.duration)
                : ((e.hovered = !1),
                  (e.currentPos = parseInt(e.el.css("left"))),
                  (e.distanceLeft = e.totalDistance - (e.containerWidth - this.getPosition(t))),
                  (e.timeLeft = ((e.totalDistance - (e.containerWidth - e.currentPos)) / e.totalDistance) * e.duration)),
                this.marqueeAnim(e);
        },
        marqueeAnim: function (e) {
            var t = this;
            e.counter++,
                e.el.clearQueue().animate({ left: e.endPoint + "px" }, e.timeLeft, "linear", function () {
                    t.marqueeManager(e);
                });
        },
        callback: function () {
            var e = this.settings.onComplete;
            "function" == typeof e && e.call(this.element);
        },
    }),
        (e.fn.SimpleMarquee = function (t) {
            return (
                this.each(function () {
                    e.data(this, "plugin_" + i) || e.data(this, "plugin_" + i, new s(this, t));
                }),
                this
            );
        }),
        (e.fn.SimpleMarquee.defaults = { autostart: !0, property: "value", onComplete: null, duration: 60000, padding: 10, marquee_class: ".marquee", container_class: ".simple-marquee-container", sibling_class: 0, hover: !0 });
})(jQuery, window, document);

