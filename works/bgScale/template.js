!
function() {
    "use strict";

    function i(i) {
        i.preventDefault()
    }
    function e(i) {
        this.canvas = i, this.ctx = this.canvas.getContext("2d"), this.audio = NE("#audio")[0], this.imgList = [{
            link: "http://img3.cache.netease.com/f2e/ent/ent_painting2016/images/1.jpg?1520",
            imgW: "750",
            imgH: "1206"
        }, {
            link: "http://img3.cache.netease.com/f2e/ent/ent_painting2016/images/2.jpg?1520",
            imgW: "1875",
            imgH: "3015",
            areaW: "375",
            areaH: "603",
            areaL: "1379",
            areaT: "103",
            limitMax: .3,
            limitMin: .2
        }, {
            link: "http://img3.cache.netease.com/f2e/ent/ent_painting2016/images/3.jpg?1520",
            limitMax: .12,
            limitMin: .08,
            imgW: "1875",
            imgH: "3015",
            areaW: "152",
            areaH: "244",
            areaL: "791",
            areaT: "1193"
        }, {
            link: "http://img4.cache.netease.com/f2e/ent/ent_painting2016/images/4.jpg?44",
            limitMax: .22,
            limitMin: .15,
            imgW: "1875",
            imgH: "3015",
            areaW: "282",
            areaH: "454",
            areaL: "857",
            areaT: "413"
        }, {
            link: "http://img3.cache.netease.com/f2e/ent/ent_painting2016/images/5.jpg?44",
            limitMax: .18,
            limitMin: .123,
            imgW: "1875",
            imgH: "3015",
            areaW: "232",
            areaH: "372",
            areaL: "388",
            areaT: "844"
        }, {
            link: "http://img4.cache.netease.com/f2e/ent/ent_painting2016/images/6.jpg?1200",
            imgW: "1875",
            imgH: "3015",
            areaW: "187",
            areaH: "300",
            areaL: "359",
            areaT: "1226"
        }, {
            link: "http://img3.cache.netease.com/f2e/ent/ent_painting2016/images/6_5.jpg?1520",
            limitMax: .6,
            limitMin: .415,
            imgW: "1875",
            imgH: "3015",
            areaW: "778",
            areaH: "1251",
            areaL: "133",
            areaT: "856"
        }, {
            link: "http://img3.cache.netease.com/f2e/ent/ent_painting2016/images/7.jpg?1520",
            imgW: "1875",
            imgH: "3015",
            areaW: "278",
            areaH: "446",
            areaL: "794",
            areaT: "783"
        }, {
            link: "http://img3.cache.netease.com/f2e/ent/ent_painting2016/images/7_5.jpg?1520",
            limitMax: .75,
            limitMin: .5,
            imgW: "1875",
            imgH: "3015",
            areaW: "938",
            areaH: "1507",
            areaL: "428",
            areaT: "454"
        }, {
            link: "http://img3.cache.netease.com/f2e/ent/ent_painting2016/images/8.jpg?1520",
            imgW: "1875",
            imgH: "3015",
            areaW: "290",
            areaH: "466",
            areaL: "1276",
            areaT: "665"
        }, {
            link: "http://img3.cache.netease.com/f2e/ent/ent_painting2016/images/8_5.jpg?1520",
            limitMax: .6,
            limitMin: .415,
            imgW: "1875",
            imgH: "3015",
            areaW: "782",
            areaH: "1258",
            areaL: "977",
            areaT: "557"
        }, {
            link: "http://img3.cache.netease.com/f2e/ent/ent_painting2016/images/9.jpg?1520",
            imgW: "1875",
            imgH: "3015",
            areaW: "238",
            areaH: "382",
            areaL: "1206",
            areaT: "2310"
        }, {
            link: "http://img3.cache.netease.com/f2e/ent/ent_painting2016/images/9_5.jpg?1520",
            limitMax: .47,
            limitMin: .355,
            imgW: "1875",
            imgH: "3015",
            areaW: "669",
            areaH: "1076",
            areaL: "894",
            areaT: "1608"
        }, {
            link: "http://img3.cache.netease.com/f2e/ent/ent_painting2016/images/10.jpg?1520",
            imgW: "1875",
            imgH: "3015",
            areaW: "247",
            areaH: "396",
            areaL: "285",
            areaT: "45"
        }, {
            link: "http://img3.cache.netease.com/f2e/ent/ent_painting2016/images/10_5.jpg?1520",
            limitMax: .75,
            limitMin: .5,
            imgW: "1875",
            imgH: "3015",
            areaW: "938",
            areaH: "1507",
            areaL: "264",
            areaT: "21"
        }, {
            link: "http://img3.cache.netease.com/f2e/ent/ent_painting2016/images/11.jpg?1520",
            imgW: "1875",
            imgH: "3015",
            areaW: "434",
            areaH: "698",
            areaL: "1059",
            areaT: "192"
        }, {
            link: "http://img3.cache.netease.com/f2e/ent/ent_painting2016/images/11_5.jpg?1520",
            limitMax: .6,
            limitMin: .415,
            imgW: "1875",
            imgH: "3015",
            areaW: "780",
            areaH: "1256",
            areaL: "1038",
            areaT: "679"
        }, {
            link: "http://img3.cache.netease.com/f2e/ent/ent_painting2016/images/12.jpg?1520",
            imgW: "1875",
            imgH: "3015",
            areaW: "415",
            areaH: "668",
            areaL: "226",
            areaT: "2210"
        }, {
            link: "http://img3.cache.netease.com/f2e/ent/ent_painting2016/images/12_5.jpg?1520",
            limitMax: .6,
            limitMin: .415,
            imgW: "1875",
            imgH: "3015",
            areaW: "782",
            areaH: "1258",
            areaL: "356",
            areaT: "1652"
        }, {
            link: "http://img3.cache.netease.com/f2e/ent/ent_painting2016/images/13.jpg?1520",
            imgW: "1875",
            imgH: "3015",
            areaW: "288",
            areaH: "462",
            areaL: "1494",
            areaT: "528"
        }, {
            link: "http://img3.cache.netease.com/f2e/ent/ent_painting2016/images/13_5.jpg?1520",
            limitMax: .6,
            limitMin: .415,
            imgW: "1875",
            imgH: "3015",
            areaW: "782",
            areaH: "1257",
            areaL: "1017",
            areaT: "482"
        }, {
            link: "http://img3.cache.netease.com/f2e/ent/ent_painting2016/images/14.jpg?1520",
            imgW: "1875",
            imgH: "3015",
            areaW: "99",
            areaH: "160",
            areaL: "1158",
            areaT: "2312"
        }, {
            link: "http://img3.cache.netease.com/f2e/ent/ent_painting2016/images/15.jpg?1520",
            limitMax: .1,
            limitMin: .053,
            imgW: "1875",
            imgH: "3015",
            areaW: "469",
            areaH: "753",
            areaL: "1001",
            areaT: "2034 "
        }], this.radio = 1, this.index = 0, this.fps = 40, this.scale = .985, this.scaleSlow = .995
    }
    function t(i) {
        var e = document.getElementById(i),
            t = function() {
                document.removeEventListener("WeixinJSBridgeReady", t), document.removeEventListener("YixinJSBridgeReady", t), e.play()
            };
        e.play(), window.WeixinJSBridge && e.play(), "undefined" == typeof WeixinJSBridge ? document.addEventListener("WeixinJSBridgeReady", t, !1) : (document.addEventListener("YixinJSBridgeReady", t, !1), e.play())
    }
    /micromessenger/.test(navigator.userAgent.toLocaleLowerCase()) && NE(".share_btn").hide(), document.addEventListener("touchmove", i, !1), document.addEventListener("touchstart", i, !1), NE(".reload").bind("touchstart", function() {
        window.location.reload()
    }), NE(".share_btn").bind("touchend", function() {
        h5Share.share()
    }), NE(".tie").bind("touchend", function() {
        window.location.href = this.href
    }), NE(".review").bind("touchend", function() {
        window.location.href = this.href
    }), e.prototype.initCanvas = function() {
        this.w = window.innerWidth, this.h = window.innerHeight, this.w > this.h && (this.w = 725, this.h = 1206, NE("body").css({
            width: "725px",
            height: "1206px",
            margin: "0 auto",
            position: "relative",
            overflow: "hidden"
        }), NE("html").css({
            width: "100%",
            height: "100%"
        })), this.canvas.setAttribute("width", this.w), this.canvas.setAttribute("height", this.h)
    }, e.prototype.preload = function() {
        function i() {
            e++, e == n.length && a(t.imgList)
        }
        for (var e = 0, t = this, a = function() {}, n = this.imgList, m = 0; m < n.length; m++) this.imgList[m].image = new Image, this.imgList[m].image.src = n[m].link, this.imgList[m].image.i = m, this.imgList[m].image.name = m, this.imgList[m].image.className = "item", this.imgList[m].image.onload = function() {
            NE(".collection").append(t.imgList[this.i].image), i()
        }, this.imgList[m].image.onerror = function() {
            console.log("\u5931\u8d25" + this.i), i(), NE(".collection").append(t.imgList[this.i].image)
        };
        return {
            done: function(i) {
                a = i || a
            }
        }
    }, e.prototype.showend = function() {
        NE(".backcover").removeClass("hidden"), NE("#start").hide(), setTimeout(function() {
            NE(".backcover").addClass("active")
        }, 200)
    }, e.prototype.init = function() {
        t("audio"), NE(".music").removeClass("music_close");
        var i = this;
        this.initCanvas(), this.preload().done(function() {
            NE(".loading").hide(), NE(".cover").addClass("active"), setTimeout(function() {
                NE(".title").css({
                    "background-image": "url(http://img3.cache.netease.com/f2e/ent/ent_painting2016/images/title.gif?" + (new Date).getTime() + ")"
                }), NE(".title_bg").css({
                    "background-image": "url(http://img3.cache.netease.com/f2e/ent/ent_painting2016/images/title_bg.gif?" + (new Date).getTime() + ")"
                })
            }, 1e3), i.domList = NE(".collection .item").sort(function(i, e) {
                return i.name - e.name
            }), i.img_oversize = i.domList[i.index + 1].image, i.img_minisize = i.domList[i.index].image, i.draw(), i.touchEvent()
        })
    }, e.prototype.draw = function() {
        if (this.index + 1 != this.imgList.length) {
            if (this.radio < this.imgList[this.index + 1].areaW / this.imgList[this.index + 1].imgW && (this.index++, this.radio = 1, !this.imgList[this.index + 1])) return void this.showend();
            this.imgNext = this.imgList[this.index + 1], 
            this.imgCur = this.imgList[this.index], 
            this.img_oversize = this.domList[this.index + 1], 
            this.img_minisize = this.domList[this.index], 
            this.drawImgOversize(this.img_oversize, this.imgNext.imgW, this.imgNext.imgH, this.imgNext.areaW, this.imgNext.areaH, this.imgNext.areaL, this.imgNext.areaT, this.radio), 
            this.drawImgMinisize(this.img_minisize, this.imgCur.imgW, this.imgCur.imgH, this.imgNext.imgW, this.imgNext.imgH, this.imgNext.areaW, this.imgNext.areaH, this.imgNext.areaL, this.imgNext.areaT, this.radio)
        }
    }, e.prototype.touchEvent = function() {
        var i = this;
        NE("#start").bind("touchstart", function() {
            function e() {
                var a = (new Date).getTime();
                if (console.log(a - t, 1), i.index + 1 != i.imgList.length) {
                    if (a - t < 1e3 / i.fps) return void(i.timer = requestAnimationFrame(e));
                    t = a, i.imgList[i.index + 1].limitMax && i.imgList[i.index + 1].limitMin && i.radio < i.imgList[i.index + 1].limitMax && i.radio > i.imgList[i.index + 1].limitMin ? i.radio = i.scaleSlow * i.radio : i.radio = i.scale * i.radio, i.draw(), i.timer = requestAnimationFrame(e)
                }
            }
            cancelAnimationFrame(i.timer), NE(".cover").length && NE(".cover")[0].remove();
            var t = (new Date).getTime();
            i.timer = requestAnimationFrame(e)
        }), NE("#start").bind("touchmove", function() {}), NE("#start").bind("touchend", function() {
            cancelAnimationFrame(i.timer)
        }), NE(".music").bind("touchend", function() {
            NE(".music").hasClass("music_close") ? (NE(".music").removeClass("music_close"), NE("#audio")[0].play()) : (NE(".music").addClass("music_close"), NE("#audio")[0].pause())
        })
    }, e.prototype.drawImgOversize = function(i, e, t, a, n, m, s, g) {
        this.ctx.drawImage(i, m - (a / g - a) * (m / (e - a)), s - (n / g - n) * (s / (t - n)), a / g, n / g, 0, 0, 750, 1206)
    }, e.prototype.drawImgMinisize = function(i, e, t, a, n, m, s, g, r, o) {
        this.ctx.drawImage(i, 0, 0, e, t, (m / o - m) * (g / (a - m)) * o * 750 / m, (s / o - s) * (r / (n - s)) * o * 1206 / s, 750 * o, 1206 * o)
    };
    var a = new e(NE("#app")[0]);
    a.init()
}();