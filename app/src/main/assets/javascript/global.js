//全局计算字体大小
var GLOBALSIZE;
var BASEURL = 'http://service.extk.com.cn/';
//var BASEURL = 'http://servicetest.extk.com.cn/';
var objectPrototype = Object.prototype;
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month 
        "d+": this.getDate(), //day 
        "h+": this.getHours(), //hour 
        "m+": this.getMinutes(), //minute 
        "s+": this.getSeconds(), //second 
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
        "S": this.getMilliseconds() //millisecond 
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

$.extend($, {
    isArray: function (value) {
        return objectPrototype.toString.apply(value) === '[object Array]';
    },
    isString: function (value) {
        return typeof value === 'string';
    },
    /**
    */
    isEmpty: function (value) {
        return (value === null) || (value === undefined) || ((core.isArray(value) && !value.length));
    },
    isFunction: function (value) {
        return objectPrototype.toString.apply(value) === '[object Function]';
    },
    isObject: function (value) {
        return !!value && !value.tagName && objectPrototype.toString.call(value) === '[object Object]';
    },
    /**
    */
    packing: function (elems) {
        if (elems instanceof $) {
            return elems;
        }
        else if ($.isArray(elems) || elems.nodeType) {
            return $(elems);
        }
        else if ($.isString(elems)) {
            if (elems.indexOf('#') >= 0 || elems.indexOf('.') > 0) {
                return $(elems);
            }
            else {
                return $('#' + elems);
            }
        }
        else {
            return $([]);
        }
    },
    /**
    */
    nameSpace: function () {
        var a = arguments,
            o = null,
            globalObj,
            i = 1,
            j,
            d,
            arg;
        if (window[arguments[0]]) {
            globalObj = window[arguments[0]];
        }
        else {
            window[arguments[0]] = {};
        }
        for (; i < a.length; i++) {
            o = window[arguments[0]];
            arg = arguments[i];
            if (arg.indexOf('.')) {
                d = arg.split('.');
                for (j = 0; j < d.length; j++) {
                    o[d[j]] = o[d[j]] || {};
                    o = o[d[j]];
                }
            }
            else {
                o[arg] = o[arg] || {};
            }
        }
        return;
    }
});
$.extend($, {
    getUrlVars: function () {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getUrlVar: function (name) {
        return $.getUrlVars()[name];
    },
    setCookie: function (name, value) {
        //        var Days = 30;
        //        var exp = new Date();
        //        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        //        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
        //        alert(name + "=" + escape(value) + ";expires=" + exp.toGMTString());
        localStorage.setItem(name, value);
    },
    getCookie: function (name) {
        //        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        //        arr = document.cookie.match(reg);
        //        if (arr) {
        //            alert(arr[0] + "|" + "|" + arr[1] + "|" + arr[2]);
        //        }
        //        if (arr = document.cookie.match(reg)) {
        //            return unescape(arr[2]);
        //        }
        //        else {
        //            return null;
        //        }
        var arr = localStorage.getItem(name);
        if (arr) {
            return arr;
        }
        else {
            return null;
        }
    },
    delCookie: function (name) {
        //        var exp = new Date();
        //        exp.setTime(exp.getTime() - 1);
        //        var cval = $.getCookie(name);
        //        if (cval != null)
        //            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
        localStorage.removeItem(name);
    },
    //获取MIID会员编号的 票据验证
    getTicketMIID: function () {
        var cookie_MIID = $.getCookie("MIID");
        if (cookie_MIID != null && cookie_MIID != "") {
            return cookie_MIID;
        }
        else {
            return null;
        }
    },
    //获取UserName会员的 票据验证
    getTicketUserName: function () {
        var cookie_UserName = $.getCookie("UserName");
        if (cookie_UserName != null && cookie_UserName != "") {
            return cookie_UserName;
        }
        else {
            return null;
        }
    },
    //获取ReadName会员真实姓名的 票据验证
    getTicketReadName: function () {

        var cookie_ReadName = $.getCookie("ReadName");
        if (cookie_ReadName != null && cookie_ReadName != "") {
            return cookie_ReadName;
        }
        else {
            return null;
        }
    },
    //获取UserPwd会员密码的 票据验证
    getTicketUserPwd: function () {
        var cookie_UserPwd = $.getCookie("UserPwd");
        if (cookie_UserPwd != null && cookie_UserPwd != "") {
            return cookie_UserPwd;
        }
        else {
            return null;
        }
    },
    //获取Mobile会员手机号的 票据验证
    getTicketMobile: function () {
        var cookie_Mobile = $.getCookie("Mobile");
        if (cookie_Mobile != null && cookie_Mobile != "") {
            return cookie_Mobile;
        }
        else {
            return null;
        }
    },
    setSessionCache: function () {
        var arglen = arguments.length;
        if (arglen == 2) {
            sessionStorage.setItem(arguments[0], arguments[1]);
        }
        else if (arglen == 1) {
            if ($.isObject(arguments[0])) {
                for (var i in arguments[0]) {
                    sessionStorage.setItem(i, arguments[0][i]);
                }
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    },
    getMicroTime: function (time) {
        if (time) {
            return (new Date(time.replace(/-/g, "/"))).getTime();
        }
        else {
            return (new Date()).getTime();
        }
    },
    getNormalTime: function (microtime, timeformat) {
        var defaultformat = 'yyyy-MM-dd hh:mm';
        if (timeformat) {
            defaultformat = timeformat;
        }
        return new Date(microtime).format(defaultformat);
    },
    countTime: function (gettime, backtime) {
        var gettime = this.getMicroTime(gettime),
            backtime = this.getMicroTime(backtime);
        var time = (backtime - gettime);
        var day = parseInt(time / (24 * 60 * 60 * 1000))
        var hour = parseInt((time - day * 24 * 60 * 60 * 1000) / (60 * 60 * 1000));
        var min = parseInt((time - day * 24 * 60 * 60 * 1000 - hour * 60 * 60 * 1000) / (60 * 1000));
        return {
            day: day,
            hour: hour,
            min: min
        }
    },
    getDefaultTime: function (FromTime) {
        var todaymicro = parseInt($.getMicroTime()) + 2 * 24 * 60 * 60 * 1000,
            todaymicro2 = todaymicro + 2 * 24 * 60 * 60 * 1000,
            tomorrow1 = $.getNormalTime(todaymicro, "yyyy-MM-dd") + ' ' + FromTime,
            tomorrow2 = $.getNormalTime(todaymicro2, "yyyy-MM-dd") + ' ' + FromTime;
        return {
            day1: tomorrow1,
            day2: tomorrow2
        }
    },
    setLocalCache: function () {
        var arglen = arguments.length;
        if (arglen == 2) {
            localStorage.setItem(arguments[0], arguments[1]);
        }
        else if (arglen == 1) {
            if ($.isObject(arguments[0])) {
                for (var i in arguments[0]) {
                    localStorage.setItem(i, arguments[0][i]);
                }
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    },
    getSessionCache: function (key) {
        if ($.isString(key)) {
            return sessionStorage.getItem(key);
        }
    },
    getLocalCache: function (key) {
        if ($.isString(key)) {
            return localStorage.getItem(key);
        }
    },
    deleteSessionCache: function (key) {
        if ($.isString(key)) {
            $(key.split(',')).each(function () {
                sessionStorage.removeItem(this + '');
            });
        }
    },
    urlData: function () {
        var href = window.location.href,
            thisdata,
            data = {};
        href = href.split('?')[1];
        if (href) {
            href = href.split('&');
            $.packing(href).each(function () {
                thisdata = this.split('=');
                data[thisdata[0]] = thisdata[1];
            });
            return data;
        }
        else {
            return data;
        }
    },
    clearSessionCache: function () {
        sessionStorage.clear();
    },
    appendEmByWidth: function () {
        var screenW = document.body.clientWidth,
            style = document.createElement('style'),
            size = (screenW / 720) * 24,
            styles = 'body{font-size:' + size + 'px !important;}';
        GLOBALSIZE = size;
        (document.getElementsByTagName("head")[0] || document.body).appendChild(style);
        if (style.styleSheet) {
            style.styleSheet.cssText = styles;
        }
        else {
            style.appendChild(document.createTextNode(styles));
        }
    },

    getPageSize: function () {
        var xScroll, yScroll;
        if (window.innerHeight && window.scrollMaxY) {
            xScroll = window.innerWidth + window.scrollMaxX;
            yScroll = window.innerHeight + window.scrollMaxY;
        } else {
            if (document.body.scrollHeight > document.body.offsetHeight) {
                xScroll = document.body.scrollWidth;
                yScroll = document.body.scrollHeight;
            } else {
                xScroll = document.body.offsetWidth;
                yScroll = document.body.offsetHeight;
            }
        }
        var windowWidth, windowHeight;
        if (self.innerHeight) {
            if (document.documentElement.clientWidth) {
                windowWidth = document.documentElement.clientWidth;
            } else {
                windowWidth = self.innerWidth;
            }
            windowHeight = self.innerHeight;
        } else {
            if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
                windowWidth = document.documentElement.clientWidth;
                windowHeight = document.documentElement.clientHeight;
            } else {
                if (document.body) {
                    windowWidth = document.body.clientWidth;
                    windowHeight = document.body.clientHeight;
                }
            }
        }
        if (yScroll < windowHeight) {
            pageHeight = windowHeight;
        } else {
            pageHeight = yScroll;
        }
        if (xScroll < windowWidth) {
            pageWidth = xScroll;
        } else {
            pageWidth = windowWidth;
        }
        return {
            'pageWidth': pageWidth,
            'pageHeight': pageHeight,
            'windowWidth': windowWidth,
            'windowHeight': windowHeight
        }
    },
    getElementPosLeft: function (element) {
        var actualLeft = element.offsetLeft,
            current = element.offsetParent;
        while (current !== null) {
            actualLeft += current.offsetLeft;
            current = current.offsetParent;
        }
        if (document.compatMode == "BackCompat") {
            var elementScrollLeft = document.body.scrollLeft;
        } else {
            var elementScrollLeft = document.documentElement.scrollLeft;
        }
        return actualLeft - elementScrollLeft;
    },
    getElementPosTop: function (element) {
        var actualTop = element.offsetTop,
            current = element.offsetParent;
        while (current !== null) {
            actualTop += current.offsetTop;
            current = current.offsetParent;
        }
        if (document.compatMode == "BackCompat") {
            var elementScrollTop = document.body.scrollTop;
        } else {
            var elementScrollTop = document.documentElement.scrollTop;
        }
        return actualTop - elementScrollTop;
    },


    getUrl: function (api, options) {
        var url = BASEURL + api + '?';
        for (var i in options) {
            url = url + i + '=' + options[i] + '&';
        }
        return url.substring(0, url.length - 1);
    },
    getStrLen: function (str) {
        return str.replace(/[^\x00-\xff]/g, "**").length;
    },
    getUrlData: function () {
        var url = window.location.href,
            urlstr = url.split('?')[1];
        if (urlstr) {
            var urlarr = urlstr.split('&'),
                data = {};
            $(urlarr).each(function () {
                var arr = (this + '').split('=');
                data[arr[0]] = arr[1];
            });
            return data;
        }
        else {
            return false;
        }
    },
    //全局AJAX LOADING遮罩页面
    loadingStart: function (str) {
        var mypage = $.getPageSize();
        if (document.getElementById('jsLoadingStart') == null) {
            var odiv = document.createElement('div'),
                odiv2 = document.createElement('div'),
                odiv3 = document.createElement('div'),
                body = document.getElementsByTagName('body')[0],
                oimg = document.createElement('img');
            oimg.src = '../images/loading9.gif';
            odiv.id = 'jsLoadingStart';
            $(odiv).css({
                'position': 'absolute',
                'left': '0px',
                'top': '0px',
                'z-index': '999999',
                'width': mypage.pageWidth,
                'height': mypage.pageHeight
            });
            $(oimg).css({
                'position': 'fixed',
                'width': '8em',
                'height': '8em',
                'left': '40%',
                'margin-left': '-1em',
                'top': '45%',
                'margin-top': '-1em'
            });
            $(odiv3).css({
                'position': 'absolute',
                'z-index': '2',
                'left': '0px',
                'top': '0px',
                'width': '100%',
                'height': '100%'
            });
            $(odiv2).addClass('jsmask');
            $(body).append(odiv);
            $(odiv).append(odiv2);
            $(odiv).append(odiv3);
            $(odiv3).empty();
            if (str) {
                $(odiv3).append('<div style="width:60%;position:absolute;top:40%;left:20%;border-radius:5px;background-color:#000000;padding:1em;color:#ffffff;margin-left:-1em;text-align:center;">' + str + '</div>');
            }
            else {
                $(odiv3).append(oimg);
            }


        }
        else {
            $('#jsLoadingStart').css({
                'width': mypage.pageWidth,
                'height': mypage.pageHeight
            });
            $('#jsLoadingStart').css('display', 'block');
        }

    },
    loadingStart2: function (str) {
        var mypage = $.getPageSize();
        if (document.getElementById('jsLoadingStart') == null) {
            var odiv = document.createElement('div'),
                odiv2 = document.createElement('div'),
                odiv3 = document.createElement('div'),
                body = document.getElementsByTagName('body')[0],
                oimg = document.createElement('img');
            oimg.src = '../images/newgif.gif';
            odiv.id = 'jsLoadingStart';
            $(odiv).css({
                'position': 'absolute',
                'left': '0px',
                'top': '0px',
                'z-index': '999999',
                'width': mypage.pageWidth,
                'height': mypage.pageHeight
            });
            $(oimg).css({
                'position': 'absolute',
                'width': '4em',
                'height': '4em',
                'left': '50%',
                'margin-left': '-2em',
                'top': '50%',
                'margin-top': '-2em'
            });
            $(odiv3).css({
                'position': 'absolute',
                'z-index': '2',
                'left': '0px',
                'top': '0px',
                'width': '100%',
                'height': '100%'
            });
            $(odiv2).addClass('jsmask');
            $(body).append(odiv);
            $(odiv).append(odiv2);
            $(odiv).append(odiv3);
            $(odiv3).empty();
            var oimgdiv = document.createElement('div');
            $(oimgdiv).css({
                'width': '60%',
                'position': 'fixed',
                'border-radius': '5px',
                'top': '50%',
                'height': '10em',
                'left': '20%',
                'margin-top': '-5em',
                'background-color': '#000000',
                'opacity': '0.8'
            });
            $(oimgdiv).append(oimg);
            $(odiv3).append(oimgdiv);
            /*   if (str) {
            $(odiv3).append('<div style="width:60%;position:absolute;top:40%;left:20%;border-radius:5px;background-color:#000000;padding:1em;color:#ffffff;margin-left:-1em;text-align:center;">' + str + '</div>');
            }
            else {
            $(odiv3).append(oimg);
            }
            */

        }
        else {
            $('#jsLoadingStart').css({
                'width': mypage.pageWidth,
                'height': mypage.pageHeight
            });
            $('#jsLoadingStart').css('display', 'block');
        }

    },
    //关闭LOADING遮罩
    loadingEnd: function () {
        $('#jsLoadingStart').css('display', 'none');
        $('#jsLoadingStart').remove();
    },
    easyErrorBox: function (str, callback, hold) {
        var mypage = $.getPageSize();
        if (document.getElementById('jserrorbox') == null) {
            var odiv = document.createElement('div'),
                body = document.getElementsByTagName('body')[0],
                html = "<div class='errormask'></div>" +
                       "<div class='errorboxbg'></div>";
            $(body).append(odiv);
            odiv.id = 'jserrorbox';
            $(odiv).addClass('jsmsgbox');
            $(odiv).append(html);
            $('#jserrorbox').css('height', mypage.pageHeight);
        }
        $('#jserrorbox').css('height', mypage.pageHeight);
        $('#jserrorbox').css('display', 'block');
        $('#jserrorbox').find('div.mask').css({
            'width': mypage.pageWidth,
            'height': mypage.pageHeight
        });
        $('#jserrorbox').find('div.errorboxbg').empty();
        $('#jserrorbox').find('div.errorboxbg').append(str);
        if (hold == true) {
            if ($.isFunction(callback)) {
                callback();
            }
            $('#jserrorbox .phone').click(function (e) {
                e.stopPropagation();
            });
            $('#jserrorbox').click(function () {
                $(this).css('display', 'none');
            });
        }
        else {
            window.setTimeout(function () {
                $('#jserrorbox').css('display', 'none');
                if ($.isFunction(callback)) {
                    callback();
                }
            }, 2000);
        }
    },
    getJsonAsync: function (options, callback) {

        var requestData = {
            "AppCode": "1001",
            "AppKey": "9365",
            "ClientID": "12345",
            "TokenID": "www.extk.com.cn"
        };
        $.extend(requestData, options);
        requestData = JSON.stringify(requestData);
        var url = BASEURL + 'Services.asmx/GetDataForWeb?requestData=' + requestData;
        $.ajax({
            'url': url,
            async: false,
            dataType: 'jsonp',
            jsonpCallback: callback,
            beforeSend: function () {
                $.loadingStart();
            },
            complete: function () {
                $.loadingEnd();
                //   $.easyErrorBox('服务器连接错误，请联系管理员');
            }

        });
    },
    getJson: function (options, callback) {

        var requestData = {
            "AppCode": "1001",
            "AppKey": "9365",
            "ClientID": "12345",
            "TokenID": "www.extk.com.cn"
        };
        $.extend(requestData, options);
        requestData = JSON.stringify(requestData);
        var url = BASEURL + 'Services.asmx/GetDataForWeb?requestData=' + requestData;

        $.ajax({
            'url': url,
            dataType: 'jsonp',
            jsonpCallback: callback,
            beforeSend: function () {
                $.loadingStart();
            },
            complete: function () {
                $.loadingEnd();
                //   $.easyErrorBox('服务器连接错误，请联系管理员');
            }

        });
    },
    getJsonToPay: function (options, callback) {

        var requestData = {
            "AppCode": "1001",
            "AppKey": "9365",
            "ClientID": "12345",
            "TokenID": "www.extk.com.cn"
        };
        $.extend(requestData, options);
        requestData = JSON.stringify(requestData);
        var url = BASEURL + 'Services.asmx/GetDataForWeb?requestData=' + requestData;
        $.ajax({
            'url': url,
            dataType: 'jsonp',
            jsonpCallback: callback,
            beforeSend: function () {
                //$.loadingStart();
            },
            complete: function () {
                //$.loadingEnd();
                //   $.easyErrorBox('服务器连接错误，请联系管理员');
            }

        });
    },
    createHour: function (obj, time) {
        var oul = document.createElement('ul');
        $(oul).css({
            'position': 'absolute',
            'height': '10px',
            'background-color': '#dcddde',
            'left': '0px',
            'right': '0px',
            'top': '50%',
            'border-radius': '2px',
            'margin-top': '-5px'
        });
        $(obj).append(oul);
        var width = $(obj).width();
        var halfwidth = width / 24;
        var _date = new Date();
        var now = _date.getFullYear() + '/' + (_date.getMonth() + 1) + '/' + _date.getDate() + ' ' + _date.getHours() + ':' + '00' + ':00';
        var now = (new Date(now)).getTime();
        var start = now - 2 * 60 * 60 * 1000;
        var end = now + 10 * 60 * 60 * 1000;
        var len = end - start;
        if (time != '') {
            var time = time.split(';');
            var timelen = time.length;
            console.log(time);
            $(time).each(function (i) {
                if (this == '') {
                    return;
                }
                var s = $.getMicroTime(this.split('/')[0]),
                    e = $.getMicroTime(this.split('/')[1]);
                /* if (i == timelen - 1) {
                if (e > end) {
                e = end;
                }
                }*/

                var spre = width * ((s - start) / len),
                    epre = width * ((e - start) / len);
                var oli = document.createElement('li');
                var oli2 = document.createElement('li');
                $(oli).css({
                    'display': 'block',
                    'position': 'absolute',
                    'left': spre,
                    'width': epre - spre,
                    'height': '10px',
                    'top': '0px',
                    'z-index': '2',
                    'background-color': 'red'
                });
                $(oli2).css({
                    'display': 'block',
                    'position': 'absolute',
                    'left': spre + (epre - spre),
                    'width': halfwidth,
                    'height': '10px',
                    'top': '0px',
                    'background-color': 'yellow'
                });
                $(oul).append(oli);
                $(oul).append(oli2);
            });
        }

        var arr = [];
        var z = 0;
        var starttime = start;
        for (z; z <= 6; z++) {
            var dt = $.getNormalTime(starttime);
            arr.push(dt.split(' ')[1].split(':')[0]);
            starttime = starttime + 2 * 60 * 60 * 1000;
        }
        var i = 0;
        var j = 0;
        var w = 0;
        var preW = width / 6;
        var arrlen = arr.length;
        $(arr).each(function (i) {
            var span = document.createElement('span'),
                span2 = document.createElement('span');
            $(span).append(this + '');
            $(span).css({
                position: 'absolute',
                'display': 'block',
                'left': w,
                'top': '11px'
            });
            var borderleft = '1px solid #b1b1b1';
            if (i == 0 || i == arrlen - 1) {
                borderleft = '';
            }
            $(span2).css({
                position: 'absolute',
                'display': 'block',
                'left': w,
                'top': '0px',
                'bottom': '0px',
                'width': '0px',
                'z-index': '3',
                'border-left': borderleft
            });
            j++;
            w = w + preW;

            $(oul).append(span);
            $(oul).append(span2);
        });
    }

});
$(document).ready(function () {
    $.appendEmByWidth();

});

function convertLocate(lng, lat) {
    //这个地方不要用跳转  直接用地图自带的定位 也就是要实现不刷新定位处理
    $.getJson({
        "ObjectName": "GetBaiduConvertCoords",
        "SubData":
              {
                  "lng": lng,
                  "lat": lat
              }
    }, 'translateCallback');
}

//坐标转换完之后的回调函数
translateCallback = function (json) {
    var point = eval("(" + json.Data + ')');
    //alert(point.lng + "," + point.lat);
    window.location.href = "./map.htm?lng=" + point.lng + "&lat=" + point.lat;
}

function jumplocate(lng, lat) {/// <reference path="jquery-1.11.1.min.js" />

    //这里不对  这块是我回调你的地方你不用再调用这个东西了
    //cordova.exec(callback, pluginFailed, "LocationPlugin", "jumpLocate", [""]);
    //这个里面要做跳转处理 
    window.location.href = "map.htm?lat=" + lat + "&lng=" + lng;
    //convertLocate(lng, lat);
}

var pluginFailed = function (message) {
    alert("failed>>" + message);
}
//比如点左边地图菜单 就调用这个
function showMap() {
    cordova.exec(function (e) { }, pluginFailed, "LocationPlugin", "jumplocate", [""]);
}
//如果要单纯的定位 不刷新页面就调用这个
function locateMap() {
    var test = function (message) {
        alert("failed>>" + message);
    }
    cordova.exec(function (e) { }, test, "LocationPlugin", "dolocate", [""]);
    //cordova.exec(function (e) { }, pluginFailed, "LocationPlugin", "jumplocate", [""]);
}





