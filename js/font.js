! function (a) {
    var l, h, c, t, p, M, z, i =
        d = (l = document.getElementsByTagName("script"))[l.length - 1].getAttribute("data-injectcss");
    if (d && !a.__iconfont__svg__cssinject__) {
        a.__iconfont__svg__cssinject__ = !0;
        try {
            document.write(
                "<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>"
            )
        } catch (a) {
            console && console.log(a)
        }
    }

    function F() {
        M || (M = !0, t())
    }
    h = function () {
        var a, l, h, c, t, p = document.createElement("div");
        p.innerHTML = i, i = null, (a = p.getElementsByTagName("svg")[0]) && (a.setAttribute("aria-hidden", "true"),
            a.style.position = "absolute", a.style.width = 0, a.style.height = 0, a.style.overflow = "hidden",
            l = a, (h = document.body).firstChild ? (c = l, (t = h.firstChild).parentNode.insertBefore(c, t)) :
            h.appendChild(l))
    }, document.addEventListener ? ~["complete", "loaded", "interactive"].indexOf(document.readyState) ? setTimeout(
        h, 0) : (c = function () {
        document.removeEventListener("DOMContentLoaded", c, !1), h()
    }, document.addEventListener("DOMContentLoaded", c, !1)) : document.attachEvent && (t = h, p = a.document, M = !
        1, (z = function () {
            try {
                p.documentElement.doScroll("left")
            } catch (a) {
                return void setTimeout(z, 50)
            }
            F()
        })(), p.onreadystatechange = function () {
            "complete" == p.readyState && (p.onreadystatechange = null, F())
        })
}(window);