window.scrollBannerItems =
    {'items':
        []
    }









let banner = document.getElementById('js-scroll-banner');
window.onload = function() {
    setTimeout(function () {
        initBanner(banner, {
            width: 600,
            items: window.scrollBannerItems.items
        });
    }, 5000);
};


window.initBanner = function initBanner(banner, data) {

    let resizeTimeout = null;
    let resetBannerMoveTimeout = null;
    let movingBanner = null;

    window.addEventListener('resize', function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(fillBanner, 100);
    });

    banner.addEventListener('mouseenter', stopBannerMove);
    banner.addEventListener('mouseleave', startBannerMove);
    fillBanner();


    function fillBanner() {
        let screenWidth = banner.getBoundingClientRect().width;
        let curItems = 0;

        let i = 0;
        data.curWidth = 0;
        data.singleLineWidth = data.width * data.items.length;
        banner.innerHTML = '';
        movingBanner = document.createElement('div');
        banner.appendChild(movingBanner);
        while (data.curWidth <= screenWidth * 2 || curItems < data.items.length * 2) {
            let bannerItem = document.createElement('a');
            bannerItem.setAttribute('href', data.items[i].link);
            bannerItem.className = 'scroll-banner__item';
            let bannerImage = document.createElement('img');
            bannerImage.setAttribute('src', data.items[i].img);
            bannerItem.appendChild(bannerImage);
            movingBanner.appendChild(bannerItem);

            data.curWidth += data.width;
            i = ++i % data.items.length;
            curItems++;
        }

        let closeBtn = document.createElement('div');
        closeBtn.className = 'scroll-banner__close-btn';
        closeBtn.addEventListener('click', closeBanner);
        banner.appendChild(closeBtn);
        stopBannerMove()
        startBannerMove();
    }

    function startBannerMove() {
        clearTimeout(resetBannerMoveTimeout);
        let curLeftMargin = movingBanner.getBoundingClientRect().left;
        let newLeftMargin = data.singleLineWidth;
        let ms = parseInt((newLeftMargin + curLeftMargin) * 15);

        $(movingBanner).animate({marginLeft: -newLeftMargin}, ms, 'linear');
        resetBannerMoveTimeout = setTimeout(resetBannerMove, ms);
    }


    function resetBannerMove() {
        stopBannerMove()
        let curLeftMargin = movingBanner.getBoundingClientRect().left;
        let newLeftMargin = parseInt(curLeftMargin + data.singleLineWidth);
        if (newLeftMargin > 0) {
            newLeftMargin = 0;
        }

        $(movingBanner).stop(true).animate({marginLeft: newLeftMargin}, 0, 'linear');
        startBannerMove();
    }

    function stopBannerMove() {
        clearTimeout(resetBannerMoveTimeout);
        let marginLeft = parseInt(movingBanner.getBoundingClientRect().left);

        $(movingBanner).stop().animate({marginLeft: marginLeft}, 0, 'linear');
    }

    function closeBanner() {
        stopBannerMove();
        setCookie('SCROLL_BANNER_CLOSED', true, {
            path: '/',
            expires: 60 * 60
        });
        banner.innerHTML = '';
        banner.removeEventListener('mouseenter', stopBannerMove);
        banner.removeEventListener('mouseleave', startBannerMove);
    }

    function setCookie(name, value, options) {
        options = options || {};

        let expires = options.expires;

        if (typeof expires === 'number' && expires) {
            let d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }

        value = encodeURIComponent(value);

        let updatedCookie = name + '=' + value;

        for (let propName in options) {
            if (options.hasOwnProperty(propName)) {
                updatedCookie += '; ' + propName;
                let propValue = options[propName];
                if (propValue !== true) {
                    updatedCookie += '=' + propValue;
                }
            }
        }


        document.cookie = updatedCookie;
    }

    function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    function extractHostname(url) {
        let hostname;
        // find & remove protocol (http, ftp, etc.) and get hostname

        if (url.indexOf('//') > -1) {
            hostname = url.split('/')[2];
        }
        else {
            hostname = url.split('/')[0];
        }

        // find & remove port number
        hostname = hostname.split(':')[0];
        // find & remove '?'
        hostname = hostname.split('?')[0];

        return hostname;
    }

    function extractRootDomain(url) {
        let domain = extractHostname(url),
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