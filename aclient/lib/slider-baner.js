window.scrollBannerItems =
    {'items':
        []
    }













var banner = document.getElementById("js-scroll-banner");
setTimeout(function () {
    initBanner(banner, {
        width: 600,
        items: window.scrollBannerItems.items
    });
}, 5000);



function initBanner(banner, data) {
    /*if(getCookie("SCROLL_BANNER_CLOSED")){
        return;
    }*/

    var resizeTimeout = null;
    var resetBannerMoveTimeout = null;
    var movingBanner = null;

    window.addEventListener("resize", function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(fillBanner, 100);
    });

    banner.addEventListener("mouseenter", stopBannerMove);
    banner.addEventListener("mouseleave", startBannerMove);
    fillBanner();


    function fillBanner() {
        var screenWidth = banner.getBoundingClientRect().width;
        var curItems = 0;

        var i = 0;
        data.curWidth = 0;
        data.singleLineWidth = data.width * data.items.length;
        banner.innerHTML = "";
        movingBanner = document.createElement("div");
        banner.appendChild(movingBanner);
        while (data.curWidth <= screenWidth * 2 || curItems < data.items.length * 2) {
            var bannerItem = document.createElement("a");
            bannerItem.setAttribute("href", data.items[i].link);
            bannerItem.className = "scroll-banner__item";
            var bannerImage = document.createElement("img");
            bannerImage.setAttribute("src", data.items[i].img);
            bannerItem.appendChild(bannerImage);
            movingBanner.appendChild(bannerItem);

            data.curWidth += data.width;
            i = ++i % data.items.length;
            curItems++;
        }

        closeBtn = document.createElement("div");
        closeBtn.className = "scroll-banner__close-btn";
        closeBtn.addEventListener("click", closeBanner);
        banner.appendChild(closeBtn);

        startBannerMove();
    }

    function startBannerMove() {
        clearTimeout(resetBannerMoveTimeout);
        var curLeftMargin = movingBanner.getBoundingClientRect().left;
        var newLeftMargin = data.singleLineWidth;
        var ms = parseInt((newLeftMargin + curLeftMargin) * 15);
        console.log(data.singleLineWidth)
        $(movingBanner).animate({marginLeft: -newLeftMargin}, ms, "linear");
        resetBannerMoveTimeout = setTimeout(resetBannerMove, ms);
    }

    function resetBannerMove() {
        var curLeftMargin = movingBanner.getBoundingClientRect().left;
        var newLeftMargin = parseInt(curLeftMargin + data.singleLineWidth);
        if (newLeftMargin > 0) {
            newLeftMargin = 0;
        }

        console.log(curLeftMargin)
        $(movingBanner).stop(true).animate({marginLeft: newLeftMargin}, 0, "linear");
        startBannerMove();
    }

    function stopBannerMove() {
        clearTimeout(resetBannerMoveTimeout);
        var marginLeft = parseInt(movingBanner.getBoundingClientRect().left);

        $(movingBanner).stop().animate({marginLeft: marginLeft}, 0, "linear");
    }

    function closeBanner() {
        stopBannerMove();
        /*setCookie("SCROLL_BANNER_CLOSED", true, {
            path: "/",
            expires: 60 * 60
        });*/
        banner.innerHTML = "";
        banner.removeEventListener("mouseenter", stopBannerMove);
        banner.removeEventListener("mouseleave", startBannerMove);
    }

    function setCookie(name, value, options) {
        options = options || {};

        var expires = options.expires;

        if (typeof expires === "number" && expires) {
            var d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }

        value = encodeURIComponent(value);

        var updatedCookie = name + "=" + value;

        for (var propName in options) {
            if (options.hasOwnProperty(propName)) {
                updatedCookie += "; " + propName;
                var propValue = options[propName];
                if (propValue !== true) {
                    updatedCookie += "=" + propValue;
                }
            }
        }

        console.log(document.cookie)
        console.log(updatedCookie)
        document.cookie = updatedCookie;
    }

    function getCookie(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        console.log(matches)
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    function extractHostname(url) {
        var hostname;
        // find & remove protocol (http, ftp, etc.) and get hostname

        if (url.indexOf("//") > -1) {
            hostname = url.split('/')[2];
        }
        else {
            hostname = url.split('/')[0];
        }

        // find & remove port number
        hostname = hostname.split(':')[0];
        // find & remove "?"
        hostname = hostname.split('?')[0];

        return hostname;
    }

    function extractRootDomain(url) {
        var domain = extractHostname(url),
            splitArr = domain.split('.'),
            arrLen = splitArr.length;

        if (arrLen > 2) {
            domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
            if (splitArr[arrLen - 2].length == 2 && splitArr[arrLen - 1].length == 2) {
                domain = splitArr[arrLen - 3] + '.' + domain;
            }
        }
        return domain;
    }
}