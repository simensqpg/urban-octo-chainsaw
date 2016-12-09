var map =
{
    loadMap: function () {
        map.mapObj = new BMap.Map("allmap");
        var Point = new BMap.Point(114.4136120000, 30.4808440000);
        map.mapObj.centerAndZoom(Point, 15);
        map.mapObj.addControl(new BMap.ZoomControl());
    },

    setcenterAndZoom: function (lng, lat) {
        var Point = new BMap.Point(lng, lat);
        map.mapObj.centerAndZoom(Point, 15);
        map.mapObj.addControl(new BMap.ZoomControl());
    },

    getStore: function () {

        map.requestData = map.request();

        if (!map.requestData || !map.requestData.orgid) {
            return;
        }

        $.getJson({
            "AppCode": "1001",
            "AppKey": "9365",
            "ClientID": "12345",
            "TokenID": "www.softlinker.cn",
            "objectName": "GetOrganizationList",
            "Operate": "Get",
            "SearchData": [
              {
                  "FieldName": "OrgID",
                  "FieldVal": map.requestData.orgid,
                  "Relation": "And",
                  "SearchMode": "Equal"
              }
           ]
          }, function () { map.cityBack(this) });
    },

    cityBack: function (json) {
        if (json.IsSuccess != true)
            return;

        var isCurStore = false;
        if (!map.requestData || !map.requestData.orgid) {
            map.setcenterAndZoom(json.Data[0].Longitude, json.Data[0].Latitude, isCurStore);
        }
        var i = 0, len = json.Data.length;
        for (i; i < len; i++) {
            isCurStore = false;
            if (json.Data[i].OrgID == map.requestData.orgid) {
                isCurStore = true;
                map.setcenterAndZoom(json.Data[i].Longitude, json.Data[i].Latitude);
            }
            map.bindMarker(json.Data[i], isCurStore);
        }
    },

    bindMarker: function (data, isCurStore) {
        var icon;
        if (isCurStore) {
            icon = new BMap.Icon('../images/maplight.png', new BMap.Size(55, 80), {
                anchor: new BMap.Size(10, 30)
            });
        }
        else {
            icon = new BMap.Icon('../images/map.png', new BMap.Size(33, 39), {
                anchor: new BMap.Size(10, 30)
            });
        }
        var marker = new BMap.Marker(new BMap.Point(data.Longitude, data.Latitude), { icon: icon });
        if (isCurStore) {
            map.curMarker = marker;
        }
        map.mapObj.addOverlay(marker);
        marker.addEventListener("click", function () { map.bindStoreInfo(data, marker) });
    },

    bindStoreInfo: function (data, marker) {
        var icon;
        if (map.curMarker) {
            icon = new BMap.Icon('../images/map.png', new BMap.Size(33, 39), {
                anchor: new BMap.Size(10, 30)
            });
            map.curMarker.setIcon(icon);
        }
        icon = new BMap.Icon('../images/maplight.png', new BMap.Size(55, 80), {
            anchor: new BMap.Size(10, 30)
        });
        marker.setIcon(icon);
        map.curMarker = marker;

        map.setcenterAndZoom(data.Longitude, data.Latitude);
    },

    request: function () {
        var url = window.location.search, data = {};
        if (url == '') {
            return;
        }
        url = url.substring(1);
        url = url.split('&');
        for (var i = 0; i < url.length; i++) {
            var arr = url[i].split('=');
            data[arr[0].toLowerCase()] = arr[1];
        }
        return data;
    }
}

$(document).ready(function(){
	//16,32,33
	map.loadMap();
	map.getStore();
	
});