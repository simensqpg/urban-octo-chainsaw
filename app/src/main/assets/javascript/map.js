function test(obj) {
    alert(obj);
}

function SquareOverlay(center, options) {
    this._center = center;
    this._content = options.content;
    this._width = options.width;
    this._color = options.color;
    this._callBack = function () {
        var data = map._data;
        if (!data.IsAllocate && data.CarCount == 0) {
            //alert("此网点暂时没有可租车辆!");
            $.easyErrorBox("该网点订车,需要联系客服<a class='phone' href='tel://400-968-1666'>400-968-1666</a>！", null, true);
        }
        else {
            if (data.CarCount == 0) {
                if (data.NearStoreCount != 0 && data.NearStoreIsAllocate.indexOf('1') >= 0 && data.NearCarCount > 0) {
                    $.setSessionCache('curSiteOrgID', data.OrgID);
                    window.location.href = 'list.htm';
                }
                else {
                    $.easyErrorBox("该网点订车,需要联系客服<a class='phone' href='tel://400-968-1666'>400-968-1666</a>！", null, true);
                    //alert("此网点暂时没有可租车辆!");
                }
            }
            else {
                $.setSessionCache('curSiteOrgID', data.OrgID);
                window.location.href = 'list.htm?siteOrgId=' + data.OrgID;
            }

        }

    };
}
// 继承API的BMap.Overlay      
SquareOverlay.prototype = new BMap.Overlay();

SquareOverlay.prototype.initialize = function () {
    // 保存map对象实例     
    this._map = map.mapObj;
    // 创建div元素，作为自定义覆盖物的容器     
    var div = document.createElement("div");
    //$(div).html('xxoo');
    $(div).addClass('xxoo');
    div.style.position = "absolute";

    // 可以根据参数设置元素外观     
    div.style.width = this._width + 'px';
    //div.style.border = '1px solid red';
    div.style.display = "none";
    div.addEventListener("touchstart", this._callBack);
    // 将div添加到覆盖物容器中     
    map.mapObj.getPanes().markerPane.appendChild(div);


    $(div).append(this._content);
    $(div).click(this._callBack);

    // 保存div实例     
    this._div = div;
    // 需要将div元素作为方法的返回值，当调用该覆盖物的show、     
    // hide方法，或者对覆盖物进行移除时，API都将操作此元素。     
    return div;
}
SquareOverlay.prototype.draw = function () {
    // 根据地理坐标转换为像素坐标，并设置给容器
    if (!this._center)
        return;
    var position = this._map.pointToOverlayPixel(this._center);
    this._div.style.left = position.x - this._width / 2 + "px";
    this._div.style.top = position.y - $(this._div).height() / 3 * 4 + "px";
    //console.log(position.y+"|"+$(this._div).height()/2+"|"+());
    //this.hide();
}
// 实现显示方法
SquareOverlay.prototype.show = function () {
    if (this._div) {
        this._div.style.display = "block";
    }
}
// 实现隐藏方法    
SquareOverlay.prototype.hide = function () {
    if (this._div) {
        this._div.style.display = "none";
    }
}


var pName = "";
var curLng = "121.481683";
var curLat = "31.238958";

function getCurPoint(callback) {

    //获取地址栏参数传入的坐标
    var reqLng = $.request.queryString["lng"];
    var reqLat = $.request.queryString["lat"];
    //    alert(reqLng + "|" + reqLat);

    if (reqLng != "undefined" && reqLng != "" && reqLng != null && reqLat != "undefined" && reqLat != "" && reqLat != null) {

        $.setSessionCache('curLat', reqLng);
        $.setSessionCache('curLon', reqLat);
    }

    if ($.getSessionCache('curLat') != null && $.getSessionCache('curLon') != null) {

        curLng = $.getSessionCache('curLat');
        curLat = $.getSessionCache('curLon');
    }
    callback();
}

var map =
{
    index: 0,
    markerList: [],
    gc: new BMap.Geocoder(),
    loadMap: function () {
        map.mapObj = new BMap.Map("mapCon", { enableMapClick: false });

        map.mapObj.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

        // 添加带有定位的导航控件
        var navigationControl = new BMap.NavigationControl({
            // 靠左上角位置
            anchor: BMAP_ANCHOR_TOP_LEFT,
            // LARGE类型
            type: BMAP_NAVIGATION_CONTROL_LARGE,
            // 启用显示定位
            enableGeolocation: true
        });
        map.mapObj.addControl(navigationControl);
        // 添加定位控件
        var geolocationControl = new BMap.GeolocationControl();
        geolocationControl.addEventListener("locationSuccess", function (e) {
            // 定位成功事件
            var address = '';
            address += e.addressComponent.province;
            address += e.addressComponent.city;
            address += e.addressComponent.district;
            address += e.addressComponent.street;
            address += e.addressComponent.streetNumber;
            //alert("当前定位地址为：" + address);
            map.bindMarkerCur(e);
            map.mapObj.centerAndZoom(e, 15);
        });
        geolocationControl.addEventListener("locationError", function (e) {
            // 定位失败事件
            alert(e.message);
        });
        map.mapObj.addControl(geolocationControl);

        map.mapObj.enableDragging();

        var curPoint = new BMap.Point(curLng, curLat);
        map.bindMarkerCur(curPoint);
        //设置中心点为定位坐标
        map.mapObj.centerAndZoom(curPoint, 15);

        // 创建控件实例
        var width = parseInt($(document.getElementsByTagName('body')[0]).width() * 0.9);
        map.mySquare = new SquareOverlay(map.mapObj.getCenter(), { 'width': width, color: 'red' });
        // 添加到地图当中
        map.mapObj.addOverlay(map.mySquare);
        map.mapObj.addEventListener('click', function (e) {
            if (!e.overlay) {
                map.mySquare.hide();
            }
        });
    },

    bindMarkerCur: function (Point) {

        var marker = new BMap.Marker(Point);

        map.mapObj.addOverlay(marker);
        marker.setAnimation(BMAP_ANIMATION_BOUNCE);
    },
    bindMarker: function (data) {
        if (data.Longitude == '' || data.Latitude == '') {
            return;
        }
        var strInfo = "";
        if (data.IsAllocate && data.CarCount == 0) {
            if (data.NearStoreCount != 0 && data.NearStoreIsAllocate.indexOf('1') >= 0 && data.NearCarCount > 0) {
                strInfo = "车辆可于您下达订单后30分钟内送达";
            }
            else {
                strInfo = data.Address;
            }
        }
        else {
            strInfo = data.Address;
        }
        var mapid = 'map_' + map.index++;
        var sContent = '<div class="map_info" id="' + mapid + '">' +
		                    '<div class="head"><span>' + data.OrgName + '</span></div>' +
		                    '<div class="main">' +
			                    '<span class="car_num num_item"><img src="../images/car.png"><span class="carNo">X' + data.CarCount + '</span></span>' +
			                    '<span class="park_num num_item"><img src="../images/park.png"><span class="parkNo">X' + data.ParkingSpace + '</span></span>' +
			                    '<span class="icon_num num_item"><img src="../images/map_chazuo.png"><span class="chaPileNo">X' + data.ChargingPile + '</span></span>' +
			                    '<p class="txt">' + strInfo + '</p>' +
		                    '</div>' +
		                    '<div class="map_arrow">' +
			                    '<img src="../images/alert_arrow.png">' +
		                    '</div>' +
	                    '</div>';

        var _point = new BMap.Point(data.Longitude, data.Latitude);
        var myIcon = new BMap.Icon("../images/e_map4.png",
          new BMap.Size(25, 29), {
              // 指定定位位置。     
              // 当标注显示在地图上时，其所指向的地理位置距离图标左上      
              // 角各偏移7像素和25像素。您可以看到在本例中该位置即是     
              // 图标中央下端的尖角位置。      
              anchor: new BMap.Size(7, 25)
          });
        var marker = new BMap.Marker(_point, { icon: myIcon });

        map.mapObj.addOverlay(marker);

        map.markerList.push(marker);
        marker.addEventListener('click', function (e) {
            var pt = e.target.point;
            $(map.mySquare._div).html(sContent);

            map.mySquare._center = pt;
            map.mapObj.setCenter(pt);

            map.mySquare.show();
            map._data = data;
        });

    },

    clearMarker: function () {
        var i = 0, len = map.markerList.length;
        for (i; i < len; i++) {
            map.mapObj.removeOverlay(map.markerList[i]);
        }
        map.markerList = [];
    },

    setViewport: function () {
        var i = 0, len = map.markerList.length, points = [];
        for (i; i < len; i++) {
            points.push(map.markerList[i].point);
        }
        //var points=[new BMap.Point(121.426628,31.260006),new BMap.Point(121.428633,31.288487),new BMap.Point(121.425399,31.293298),new BMap.Point(121.380851,31.257158),new BMap.Point(121.399749,31.245742)]
        map.mapObj.setViewport(points);
    },

    getRad: function (d) {
        return d * Math.PI / 180;
    },

    getDisance: function (lat1, lng1, lat2, lng2) {
        var f = map.getRad((lat1 + lat2) / 2);
        var g = map.getRad((lat1 - lat2) / 2);
        var l = map.getRad((lng1 - lng2) / 2);

        var sg = Math.sin(g);
        var sl = Math.sin(l);
        var sf = Math.sin(f);

        var s, c, w, r, d, h1, h2;
        var a = 6378137.0;
        var fl = 1 / 298.257;

        sg = sg * sg;
        sl = sl * sl;
        sf = sf * sf;

        s = sg * (1 - sl) + (1 - sf) * sl;
        c = (1 - sg) * (1 - sl) + sf * sl;

        w = Math.atan(Math.sqrt(s / c));
        r = Math.sqrt(s * c) / w;
        d = 2 * w * a;
        h1 = (3 * r - 1) / 2 / c;
        h2 = (3 * r + 1) / 2 / s;

        return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
    },

    getCurProShopList: function (data) {
        var i = 0, len = data.length, nearestDistance = [];
        for (i; i < len; i++) {
            var d = map.getDisance(findShop.curPoint.lat, findShop.curPoint.lng, parseFloat(data[i].Latitude), parseFloat(data[i].Longitude));
            if (nearestDistance.length == 0) {
                data[i].distance = d;
                nearestDistance.push(data[i]);
            }
            else {
                var j = 0, _len = nearestDistance.length;
                for (j; j < _len; j++) {
                    data[i].distance = d;
                    if (d < nearestDistance[j].distance) {
                        nearestDistance.splice(j, 0, data[i]);
                        break;
                    }
                }
                if (nearestDistance.length < 6) {
                    data[i].distance = d;
                    nearestDistance.push(data[i]);
                }
                else {
                    nearestDistance.pop();
                }

            }
        }
        return nearestDistance;
    },

    getCurPosition: function () {
        map.getCurrProvince(curLng, curLat);
    },

    getCurrProvince: function (lng, lat) {
        var pt = new BMap.Point(lng, lat);
        map.gc.getLocation(pt, function (rs) {
            // 这里是 百度 解析 经纬度后的 对象

            var addComp = rs.addressComponents;
            pName = addComp.city;
            findShop.getProvince(addComp.city);
        });

    }
}
var get_GETORGANIZATIONLIST = function (json) {
    //console.log(json.Data);
    findShop.getCurrProvinceId(pName, json.Data)
}
var get_GETORGANIZATIONLISTBYPARENTID = function (json) {
    if (findShop.curPoint.lng == 0 || findShop.curPoint.lat == 0) {
        findShop.curPoint.lng = json.Data[0].Longitude;
        findShop.curPoint.lat = json.Data[0].Latitude;
    }
    //map.loadMap();
    var shopList = json.Data;
    var i = 0, len = 0;
    if (shopList != null) {
        len = shopList.length;
    }
    for (i; i < len; i++) {
        map.bindMarker(shopList[i]);

    }
    //map.setViewport();
    findShop.complete = true;
    $.setSessionCache('mapComplete', 'true');
}
var findShop =
{
    complete: false,
    curPoint: { lng: 121.481683, lat: 31.238958 }, //上海市中心点坐标
    getProvince: function (provinceName) {
        provinceName = provinceName.replace('省', '');
        provinceName = provinceName.replace('市', '');
        var data = { AppCode: 1001, AppKey: 9365, ClientID: 12345, TokenID: 'www.softlinker.cn', objectName: 'GetOrgShopListByProName', Operate: 'Get' };
        data.SearchData = [{ FieldName: 'ProName', FieldVal: provinceName, Relation: 'And', SearchMode: 'Equal'}];
        $.getJson(data, "get_GETORGANIZATIONLISTBYPARENTID");
    },
    getCurrProvinceId: function (provinceName, data) {
        var i = 0, len = data.length;
        provinceName = provinceName.replace('省', '');
        provinceName = provinceName.replace('市', '');
        for (i; i < len; i++) {
            if (data[i].OrgName.indexOf(provinceName) > -1) {
                findShop.getCity(data[i].OrgID);
                $.setSessionCache('curCityId', data[i].OrgID);
                $.setSessionCache('curCityName', provinceName);
                return;
            }
        }
    }
}

$(document).ready(function () {
    getCurPoint(function () {
        map.getCurPosition();
        map.loadMap();
    });
});
/*
<!-- 地图弹出层 -->
<div class="map_info">
<div class="head"><span>上海市虹桥国际机场</span></div>
<div class="main">
<span class="car_num num_item"><img src="../images/car.png"><span class="carNo">X0</span></span>
<span class="park_num num_item"><img src="../images/park.png"><span class="parkNo">X1</span></span>
<span class="icon_num num_item"><img src="../images/icon.png"><span class="chaPileNo">X2</span></span>
<p class="txt">
车辆可于您下达订单后30分钟内送达【用户所选网点地址】
</p>
</div>
<div class="map_arrow">
<img src="../images/alert_arrow.png">
</div>
</div>
<!-- 地图弹出层 -->
*/
// lng : 121.487899 经度  lat : 31.249162 纬度
