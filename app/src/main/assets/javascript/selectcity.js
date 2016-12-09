var cityid = "";
var cityName = "";
var siteOrgId = $.getUrlVar("siteOrgId");
if (siteOrgId == null || siteOrgId == "") {
    siteOrgId = 0;
}
$(document).ready(function () {

    $.getJson({
        "ObjectName": "GETORGANIZATIONLIST",
        "OrderByData": [
              {
                  "FieldName": "OrgName",
                  "Direction": "ASCENDING"
              }
           ],
        "SearchData": [
              {
                  "FieldName": "OrgLevel",
                  "FieldVal": 2,
                  "Relation": "And",
                  "SearchMode": "Equal"
              }
           ]
          }, 'get_GETORGANIZATIONLIST');


});
function doClick(orgId,orgName) {
    cityid = orgId;
    cityName = orgName;
}
function sureClick() {
    if (cityid != "" && cityName != "") {
        $.setSessionCache('curCityId', cityid);
        $.setSessionCache('curCityName', cityName);
        //重置 当前的网点
        $.setSessionCache('curSiteOrgID', "0");
        location.href = "./list.htm";
    }
    else {
        if (siteOrgId == 0) {
            location.href = "./list.htm";
        }
        else {
            location.href = "./list.htm?siteOrgId=" + siteOrgId;
        }
    }
}

var get_GETORGANIZATIONLIST = function (json) {
    if (json.IsSuccess == true) {
        var Data = json.Data;
        var nextword = "";
        var word = new Array();
        var citylength = json.Data.length;
        $.packing(Data).each(function () {
            var str = "";
            var city = "";
            var s = this.OrgName;
            var firstword = getPY_str(s);

            if (document.getElementById(firstword) == null) {

                str += "<div class='selectList  norlist' id='" + firstword + "'>";
                str += "<a href=\"javascript:;\" class=\"title\" id=\"title" + firstword + "\">";
                str += firstword;
                str += "</a>";
                str += "<ul class=\"listItem\" id=\"list" + firstword + "\">";
                str += "<li onclick=\"doClick(" + this.OrgID + ",'" + this.OrgName + "');\"><a href='javascript:;' >" + this.OrgName + "</a></li>";
                str += "</ul>";
                str += "</div>"
                $("#areaList").append(str);
                str = "<li>";
                str += "<a href='javascript:;'>" + firstword + "</a>";
                str += "</li>";
                $('.letters ul').append(str);
            } else {
                str = "<li onclick=\"doClick(" + this.OrgID + ",'" + this.OrgName + "');\"><a href='javascript:;'>" + this.OrgName + "</a></li>";
                $("#list" + firstword).append(str);

            }
        });
    }
    else {
        $.easyErrorBox(json.Message);
    }
}
