var datas;
var VIID = $.getUrlVar("VIID");
var VMID = $.getUrlVar("VMID");
var UnitePriceMM = unescape($.getUrlVar("UnitePriceMM"));
$(document).ready(function () {
    GetPriceDetail(VMID);
    $("#back").click(function () {
        location.href = "cardetail.htm?VMID=" + VMID + "&VIID=" + VIID + "&UnitePriceMM=" + UnitePriceMM;
    })
});

function GetPriceDetail(VMID) {
    var cityId = $.getSessionCache('curCityId');
    if (!cityId) {
        cityId = 2;
    }
    $.getJson({
        "ObjectName": "PriceListDetail",
        "OrderByData": [
                  {
                      "FieldName": "PTCID",
                      "Direction": "Asc"
                  }
               ],
        "PagerData": {
            "CurrentPage": "1",
            "PageCount": "1000"
        },
        "SearchData": [
                  {
                      "FieldName": "OrgID",
                      "FieldVal": cityId,
                      "Relation": "And",
                      "SearchMode": "Equal"
                  },
                  {
                      "FieldName": "VMID",
                      "FieldVal": VMID,
                      "Relation": "And",
                      "SearchMode": "Equal"
                  }
               ]
    },"get_PriceListDetail");
    }

    var get_PriceListDetail = function (json) {
        if (json.IsSuccess == true) {
            datas = json.Data;
            GetPrice("workDay", "基础价格", "白天档", "workDayUnit");
            GetPrice("workNight", "基础价格", "夜间档", "workNightUnit");
            GetPrice("workAllNight", "基础价格", "晚上包段", "workAllNightUnit");
            GetPrice("workAllDay", "基础价格", "全天", "workAllDayUnit");
            GetPrice("weekDay", "周末价格", "白天档", "weekDayUnit");
            GetPrice("weekNight", "周末价格", "夜间档", "weekNightUnit");
            GetPrice("weekAllNight", "周末价格", "晚上包段", "weekAllNightUnit");
            GetPrice("weekAllDay", "周末价格", "全天", "weekAllDayUnit");
            GetPrice("workInsurance", "基础价格", "保险");
            GetPrice("weekInsurance", "周末价格", "保险");
            GetPrice("workFuelMileage", "基础价格", "里程");
            GetPrice("weekFuelMileage", "周末价格", "里程");
        }
        else {
            $.easyErrorBox(json.Message);
        }
    }

    function GetPrice(id,type, category,unitId) {
        $.packing(datas).each(function () {
            if (category == "保险") {
                if (this.PriceTypeName == type) {
                    $("#" + id).text(this.Insurance.toFixed(2));
                    return;
                }
            }
            if (category == "里程") {
                if (this.PriceTypeName == type) {
                    $("#" + id).text(this.FuelMileage.toFixed(1));
                    return;
                }
            }
            else {
                if (this.PriceTypeName == type && this.TimeName == category) {
                    $("#" + id).text(this.UnitPriceMM.toFixed(1));
                    $("#" + unitId).text("元/" + this.PriceTimeUnitMM);
                    if (this.TimeName == "白天档") {
                        $("#dayTime").html(ConverTime(this.StartTime, 3) + "-" + ConverTime(this.EndTime, 3));
                    }
                    if (this.TimeName == "夜间档") {
                        $("#nightTime").html(ConverTime(this.StartTime, 3) + "-" + ConverTime(this.EndTime, 3));
                    }
                    if (this.TimeName == "晚上包段") {
                        $("#" + id).text(this.UnitPrice.toFixed(1));
                        $("#" + unitId).text("元/次");
                        $("#nightAllTime").html(ConverTime(this.StartTime, 3) + "-" + ConverTime(this.EndTime, 3));
                    }
                    if (this.TimeName == "全天") {
                        $("#" + id).text(this.UnitPrice.toFixed(1));
                        $("#" + unitId).text("元/天");
                    }
                    return;
                }
            }
        });
    }