//获取当前的坐标点
var lat=0;
var lon = 0;
var curCityName = $.getSessionCache('curCityName');
var curSiteOrgID = $.getSessionCache('curSiteOrgID');
var siteOrgIDForMap = $.getUrlVar("siteOrgId");
var sortStr = "km";
var preSort = "";
var lastSort = "";
var hits = 0;
var screenObj = {
    condiData: {
        des: '0',
        price: '-1',
        intel: '-1'
    },
    advanScreen: {
        geer: '0',
        // brand: '0',
        price: '0'
    },
    init: function () {
        var _this = this;
        $('.select_name li').click(function () {
            $(this).parents('.select_name').find('li').removeClass('cur');
            $(this).addClass('cur');
        });
        function giveValue(i, bool) {
            if (!bool) {
                switch (i) {
                    case 0: _this.condiData.des = '0'; break;
                    case 1: _this.condiData.price = '0'; break;
                    case 2: _this.condiData.intel = '0'; break;
                }
            }
            else {
                switch (i) {
                    case 0: _this.condiData.des = '1'; break;
                    case 1: _this.condiData.price = '1'; break;
                    case 2: _this.condiData.intel = '1'; break;
                }
            }
        }
        $('#screen li').click(function () {
            hits++;
            var index = $(this).index();
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $(this).find('img').attr('src', '../images/screen_spread.png');
                giveValue(index, false);
                console.log(index);
            }
            else {
                $(this).addClass('active');
                $(this).find('img').attr('src', '../images/screen_spread_top.png');
                giveValue(index, true);
            }
            //debugger;
            switch (index) {
                case 0:
                    if (preSort != "km") {
                        sortStr = "km," + preSort + "," + lastSort;
                    }
                    if (hits == 1) {
                        preSort = "km";
                    }
                    else {
                        if (preSort != "km") {
                            lastSort = preSort;
                            preSort = "km";
                        }
                    }
                    break;
                case 1:
                    if (preSort != "UnitePriceMM") {
                        sortStr = "UnitePriceMM," + preSort + "," + lastSort;
                    }
                    if (hits == 1) {
                        preSort = "UnitePriceMM";
                    }
                    else {
                        if (preSort != "UnitePriceMM") {
                            lastSort = preSort;
                            preSort = "UnitePriceMM";
                        }
                    }
                    break;
                case 2:
                    if (preSort != "CommentCount") {
                        sortStr = "CommentCount," + preSort + "," + lastSort;
                    }
                    if (hits == 1) {
                        preSort = "CommentCount";
                    }
                    else {
                        if (preSort != "CommentCount") {
                            lastSort = preSort;
                            preSort = "CommentCount";
                        }
                    }
                    break;
            }
            GetCarList();
        });

        $('#selectList4 .select_content').css('display', 'none');
        $('#selectList4 .select_content:first').css('display', 'block');
        $('#selectList4 .select_name li').each(function (i) {
            $(this).click(function () {
                $(this).parent('.select_name').siblings('.select_content').css('display', 'none');
                $(this).parent('.select_name').siblings('.select_content').each(function (k) {
                    if (i == k) {
                        $(this).css('display', 'block');
                    }
                });
            });
        });
        $('#selectList4 .select_content li').click(function () {
            $(this).parents('.select_content').find('li').removeClass('active');
            $(this).addClass('active');

        });
    }
};
function GoSelectCity() {
    if (!siteOrgIDForMap) {
        siteOrgIDForMap = "0";
    }
    if (siteOrgIDForMap == 0) {
        location.href = "selectcity.htm";

    }
    else {
        location.href = "selectcity.htm?siteOrgId=" + siteOrgIDForMap;
    }
}
$(document).ready(function () {
    screenObj.init();

    if (!curSiteOrgID) {
        curSiteOrgID = "0";
    }
    if (!siteOrgIDForMap) {
        siteOrgIDForMap = "0";
    }
    if (siteOrgIDForMap != "0") {
        
        //获取当前门店信息
        $.getJson({
            "ObjectName": "GetOrganizationListByParentID",

            "SearchData": [
              {
                  "FieldName": "OrgID",
                  "FieldVal": siteOrgIDForMap,
                  "Relation": "And",
                  "SearchMode": "Equal"
              }
           ]
        }, "get_CarSiteOrg");
    }
    //判断是否有了当前坐标点，没有则重新获取
    if ($.getSessionCache('curLat') != null && $.getSessionCache('curLon') != null) {
        lat = $.getSessionCache('curLon');
        lon = $.getSessionCache('curLat');

        GetCarList();
    }
    else {

        $.setSessionCache('curLat', "121.40736106108403");
        $.setSessionCache('curLon', "31.2724086148018");
        //        var geolocation = new BMap.Geolocation();
        //        geolocation.getCurrentPosition(function (r) {
        //            if (this.getStatus() == BMAP_STATUS_SUCCESS) {

        //                lat = r.point.lng;
        //                lon = r.point.lat;
        //                $.setSessionCache('curLat', r.point.lng);
        //                $.setSessionCache('curLon', r.point.lat);
        //                GetCarList();
        //            }
        //            else {
        //                alert('failed' + this.getStatus());
        //            }
        //        }, { enableHighAccuracy: true }

    }
    if (!curCityName) {
        $("#curCity").html("上海");
    }
    else {
        $("#curCity").html(curCityName);
    }
});
var get_CarSiteOrg = function (json) {
    if (json.IsSuccess == true) {
        var cInfo = json.Data[0];
        $("#siteOrg").html("[" + cInfo.OrgShortName + "所有车辆]");
    }
    else {
        $("#siteOrg").html("[所有车辆]");
    }
}
function GetStarClass(scoreCount) {
    var str = "star0";
    if (scoreCount > 4) {
        str = "star5";
    }
    else if (3 < scoreCount && scoreCount <= 4) {
        str = "star4";
    }
    else if (2 < scoreCount && scoreCount <= 3) {
        str = "star3";
    }
    else if (1 < scoreCount && scoreCount <= 2) {
        str = "star2";
    }
    else if (0 < scoreCount && scoreCount <= 1) {
        str = "star1";
    }
    else {
        str = "star0";
    }
    return str;
}

var isBook = $.getUrlVar("isBook");

function GetCarList() {
    var curDate = new Date();

    var cid = $.getSessionCache('curCityId');
    if (!cid) {
        cid = 2;
        $.setSessionCache('curCityId', 2);
    }
    $.getJson({ "AppCode": "1001", "AppKey": "9365", "ClientID": "12345", "TokenID": "B58B7467E8FB7C", "Operate": "Add", "ObjectName": "Car",
        "OrderByData": [{ "FieldName": "VIID", "Direction": "Desc"}],
        "PagerData": { "CurrentPage": "1", "PageCount": "10" },
        "SearchData": [
            { "FieldName": "CityOrgID", "FieldVal": cid },
            { "FieldName": "SiteOrgID", "FieldVal": curSiteOrgID },
            { "FieldName": "PriceCode", "FieldVal": "" },

            { "FieldName": "OrderPrice", "FieldVal": -1 },
            { "FieldName": "OrderSource", "FieldVal": -1 },
            { "FieldName": "PriceWhere", "FieldVal": screenObj.advanScreen.price },
            { "FieldName": "GeerWhere", "FieldVal": screenObj.advanScreen.geer },
            { "FieldName": "BrandWhere", "FieldVal": screenObj.advanScreen.brand }

        ]
    },'ResponseList'
    );
}

var ResponseList = function (jsonObj) {

    if (jsonObj.IsSuccess == true) {
        if (jsonObj.Data.length == 0) {
            $.easyErrorBox("暂无可租车辆!");
            return;
        }
        $("#jscars").html("");
        var map = new BMap.Map();
        for (var item in jsonObj.Data) {
            var pointA = new BMap.Point(lon, lat);  // 创建点坐标A--大渡口区
            var pointB = new BMap.Point(jsonObj.Data[item].Longitude, jsonObj.Data[item].Latitude);  // 创建点坐标B--江北区
            var mi = (map.getDistance(pointA, pointB) / 1000).toFixed(2);  //获取两点距离,保留小数点后两位
            jsonObj.Data[item]["km"] = mi;
        }
        //this.Data = JsonSort(this.Data, "km");
        var listObj = jsonObj.Data;

        var sortArray = sortStr.split(',');
        if (sortArray.length > 0) {
            for (var j = sortArray.length - 1; j >= 0; j--) {

                if (sortArray[j] && sortArray[j] != "") {

                    if (sortArray[j] == "km") {
                        //距离排序
                        if (screenObj.condiData.des == '')
                        { }
                        else if (screenObj.condiData.des == '0') {
                            listObj = jsonObj.Data.sort(sortBy('km', false, parseInt));
                        }
                        else {
                            listObj = jsonObj.Data.sort(sortBy('km', true, parseInt));
                        }
                    }
                    else if (sortArray[j] == "UnitePriceMM") {
                        //价格排序
                        if (screenObj.condiData.price == '-1')
                        { }
                        else if (screenObj.condiData.price == 0) {
                            listObj = jsonObj.Data.sort(sortBy('UnitePriceMM', false, parseFloat));
                        }
                        else {
                            listObj = jsonObj.Data.sort(sortBy('UnitePriceMM', true, parseFloat));
                        }
                    }
                    else if (sortArray[j] == "CommentCount") {

                        //评分排序
                        if (screenObj.condiData.intel == '-1')
                        { }
                        else if (screenObj.condiData.intel == 0) {
                            listObj = jsonObj.Data.sort(sortBy('CommentCount', false, parseInt));
                        }
                        else {
                            listObj = jsonObj.Data.sort(sortBy('CommentCount', true, parseInt));
                        }
                    }
                }
            }
        }



        $(listObj).each(function () {
            var otr = document.createElement('li');
            var str = this.PlateNo;
            var plateno = str.substring(0, 2) + "***" + str.substring(5, str.length);

            html = '<div class="top">' +
                    '<div class="leftImg"><img src="../upload/car/' + this.ImgUrl + '" class="car"></div>' +
                    '<div class="rightCon">' +
                    '<h2>' + this.ModelName + ' ' + '</h2><h1>' + plateno + '</h1>' +

                    '<p class="price">￥<span class="orange">' + parseFloat(this.UnitePriceMM).toFixed(1) + '</span>元/分钟</p>' +
                    '<div class="icons">' +
                    '<img src="../images/auto.png" class="auto"><span>' + this.ATMT + '</span>' +
                    '<img src="../images/people.png" class="people"><span>x' + this.Seats + '</span>' +
                    '<img src="../images/energy.png" class="energy"><span>' + this.PowerQuantity.toFixed(1) + '%</span>' +
                    '<span>可续航里程约:' + parseInt(this.CanMil) + 'km</span>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
            //时间 start
                    '<div class="middle" id="mid' + this.VIID + '">' +
                    '<img src="../images/today.png" class="today">' +
                    '</div>' +
            //时间 end
                    '<div class="bottom">' +
                    '<div class="distance"><img src="../images/distance.png"><span>' + this.km + 'km</span></div>' +
                    '<div class="score">' +
                    '<div class="icon ' + GetStarClass(this.CarSorce) + '"><span></span></div><span class="num">(' + this.CommentCount + ')</span>' +
                    '</div>' +
                    '<p class="addr">' + cutString(this.Address, 12) + '</p>' +
                    '</div>';

            $(otr).append(html);
            $(otr).attr('VIID', this.VIID);

            $(otr).attr('UnitePriceMM', this.UnitePriceMM);

            $(otr).attr('VMID', this.VMID);


            $('#jscars').append(otr);


            $.createHour($("#mid" + this.VIID), this.VUsed);
            $(otr).click(function () {
                $.deleteSessionCache("getCarTime");
                $.deleteSessionCache("backCarTime");
                $.setSessionCache('VIID', $(this).attr('VIID'));
                var url = "cardetail.htm?VIID=" + $(this).attr('VIID') + "&VMID=" + $(this).attr('VMID') + "&UnitePriceMM=" + escape($(this).attr('UnitePriceMM'));
                if (isBook != null && isBook == 1) {
                    url += "?isBook=" + isBook;
                }
                window.location.href = url;
            });

        });

    }
    else {
        $.easyErrorBox(jsonObj.Message);
    }
}

var sortBy = function (filed, rev, primer) {
    rev = (rev) ? -1 : 1;
    return function (a, b) {
        a = a[filed];
        b = b[filed];
        if (typeof (primer) != 'undefined') {
            a = primer(a);
            b = primer(b);
        }
        if (a < b) { return rev * -1; }
        if (a > b) { return rev * 1; }
        return 1;
    }
};



