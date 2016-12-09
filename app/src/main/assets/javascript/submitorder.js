var isLogin = $.getTicketMIID();
var VIID = $.getUrlVar("VIID");
var VMID = $.getUrlVar("VMID");
var PlateNo = "";
var UnitePriceMM = unescape($.getUrlVar("UnitePriceMM"));
var OwerOrgID = 0;
var datas;
var total = 0;
if (isLogin != null) {


}
else {
    var url = "login.htm?phttp=submitorder";
    if (isBook != null && isBook == 1) {
        url += "&isBook=" + isBook;
    }
    url += "&Param=VMID+" + VMID + ";VIID+" + VIID + ";UnitePriceMM+" + UnitePriceMM;
    window.location.href = url;
}
var isBook = $.getUrlVar("isBook");




function DoCala() {
    //如果是预约用车  则调用预约用车的选取时间
    if (isBook != null && isBook == 1) {
        if ($.getSessionCache('getBookCarTime')) {
            $("#js_StartDate").val($.getSessionCache('getBookCarTime'));
            if ($.getSessionCache('backBookCarTime')) {
                var newback = $.getMicroTime($.getSessionCache('getBookCarTime')) + 0.5 * 60 * 60 * 1000;
                newback = $.getNormalTime(newback);
                //                if ($.getMicroTime($.getSessionCache('backBookCarTime')) <= $.getMicroTime(newback)) {
                //                    $.easyErrorBox('租车时间必须在半小时以上', function () {
                //                        $("#js_EndDate").text('');
                //                        $.deleteSessionCache('backBookCarTime');
                //                    });
                //                }
            }
        }
        if ($.getSessionCache('backBookCarTime')) {
            $("#js_EndDate").val($.getSessionCache('backBookCarTime'));
            var counttime = $.countTime($.getSessionCache('getBookCarTime'), $.getSessionCache('backBookCarTime'));
            var sCountTime = "";
            if (counttime.day > 0) {
                sCountTime += counttime.day + '天  ';
            }
            if (counttime.hour > 0) {
                sCountTime += counttime.hour + '小时  ';
            }
            if (counttime.min > 0) {
                sCountTime += counttime.min + '分钟  ';
            }
            $('#jscounttime').text(sCountTime);
        }
    }
    else {
        if ($.getSessionCache('getCarTime')) {
            $("#js_StartDate").val($.getSessionCache('getCarTime'));
            if ($.getSessionCache('backCarTime')) {
                //                var newback = $.getMicroTime($.getSessionCache('getCarTime')) + 0.5 * 60 * 60 * 1000;
                //                newback = $.getNormalTime(newback);
                if ($.getMicroTime($.getSessionCache('backCarTime')) <= $.getMicroTime($.getSessionCache('getCarTime'))) {
                    $.easyErrorBox('还车时间必须大于取车时间')
                    $("#js_EndDate").val('');
                    $.deleteSessionCache('backCarTime');
                    return;

                }
            }
        }
        if ($.getSessionCache('backCarTime')) {
            $("#js_EndDate").val($.getSessionCache('backCarTime'));
            if ($.getSessionCache('getCarTime')) {

                if ($.getMicroTime($.getSessionCache('backCarTime')) <= $.getMicroTime($.getSessionCache('getCarTime'))) {
                    $.easyErrorBox('还车时间必须大于取车时间')
                    $("#js_StartDate").val('');
                    $.deleteSessionCache('getCarTime');
                    return;

                }
            }


            var counttime = $.countTime($.getSessionCache('getCarTime'), $.getSessionCache('backCarTime'));
            var sCountTime = "";
            if (counttime.day > 0) {
                sCountTime += counttime.day + '天  ';
            }
            if (counttime.hour > 0) {
                sCountTime += counttime.hour + '小时  ';
            }
            if (counttime.min > 0) {
                sCountTime += counttime.min + '分钟  ';
            }
            
            $('#jscounttime').text(sCountTime);
        }
    }
//    var getTime = $.getSessionCache('getCarTime');

//    var backTime = $.getSessionCache('backCarTime');
//    if (getTime != null && backTime != null) {
//        var mi = ($.getMicroTime(backTime) - $.getMicroTime(getTime))/1000;
//        if (mi < 1800) {
//            $.easyErrorBox('租车时间不能少于30分钟');
//            return;
//        }
//    }
    GetPriceDetail(VMID, OwerOrgID);
}


function GetCarInfo(VIID) {
    var date = new Date();
    var week = date.getDay();
    var t = "基础价格";
    if (week == 0 || week == 6) {
        t = "周末价格";
    }
    var cityId = $.getSessionCache('curCityId');
    if (!cityId) {
        cityId = 2;
    }
    $.getJson({
        "ObjectName": "CARINFO",

        "SearchData": [
                    {
                        "FieldName": "VIID",
                        "FieldVal": VIID,
                        "Relation": "And",
                        "SearchMode": "Equal"
                    },
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
                  },
                  {
                      "FieldName": "PriceTypeName",
                      "FieldVal": t,
                      "Relation": "And",
                      "SearchMode": "Equal"
                  },
                  {
                      "FieldName": "PTCID",
                      "FieldVal": "1,2",
                      "Relation": "And",
                      "SearchMode": "In"
                  }
               ]
    }, "get_CarInfo");
}

var get_CarInfo = function (json) {

    if (json.Data != null) {
        
        json = json.Data;
        var str = json.PlateNo;
        PlateNo = json.PlateNo;
        $('#ModelName').html(json.ModelName + " <font style='font-size:0.8em;' color='#58595b'>" + str + "</font>"); // + carInfo.ATMT + "/" + carInfo.Doors + "门");
        //$('#Passengers').text(carInfo.Passengers);
        $('#AtmtName').text(json.ATMT);
        //$('#Doors').text(carInfo.Doors);
        //$("#ModelInfo").text(carInfo.ModelInfo);
        $("#providerInfo").text(json.ProviderInfo);
        $("#imgProvider").attr("src", "../upload/car/" + json.ProviderPic);
        //$("#carImg").attr("src", "../upload/car/" + carInfo.ImgUrl);
        //$('#trunkCounts').text(carInfo.TrunkCount);
        $("#carAddress").text(json.Address);

        OwerOrgID = json.OwerOrgID;


        get_CARUSEDDATEXML(json.VUsed);

        DoCala();
        //get_PriceListDetail(json.PriceList);

    }
}


//获取不可租时间
var get_CARUSEDDATEXML = function (json) {
    //if (json == true) {
    var str = json;
    $('.middle').each(function (i) {
        $.createHour(this, str);
    });
    //    }
    //    else {
    //        $.easyErrorBox(json.Message);
    //    }
}

var get_GetUserInfo = function (json) {

    if (json.IsSuccess == true) {

        var cInfo = json.Data;
        if (cInfo.Balance >= 500) {
            //window.location.href = url;
        }
        else {
            $.easyErrorBox("押金不足!", function () {
                location.href = "paymemdeposit.htm?Member_Id=" + $.getTicketMIID() + "&balance=" + cInfo.Balance + "&VMID=" + VMID + "&VIID=" + VIID + "&UnitePriceMM=" + UnitePriceMM;
            });

        }
    }
}

var cityId = $.getSessionCache('curCityId');
if (!cityId) {
    cityId = 2;
}
$(document).ready(function () {
    GetCarInfo(VIID);
    $("#back").click(function () {
        location.href = "cardetail.htm?VMID=" + VMID + "&VIID=" + VIID + "&UnitePriceMM=" + UnitePriceMM;
    })
    //需要判断用户的押金是否大于等于500
    $.getJson({
        "ObjectName": "GETUSERINFO",

        "SearchData": [
              {
                  "FieldName": "MIID",
                  "FieldVal": $.getTicketMIID(),
                  "Relation": "And",
                  "SearchMode": "Equal"
              }
           ]
    }, 'get_GetUserInfo');


    var currYear = (new Date()).getFullYear();
    var optTime = {
        preset: 'yeartime', //日期
        theme: 'android-ics light', //皮肤样式
        display: 'modal', //显示方式
        mode: 'scroller', //日期选择模式
        lang: 'zh',
        showNow: false,
        days: 20,
        nowText: "今",
        calendarTitle: '取车时间',
        callback: function () {
            $.setSessionCache('getCarTime', this);
            console.log($.setSessionCache('getCarTime'));
            DoCala();
        }
    };
    $("#js_StartDate").mobiscroll(optTime);
    var optTime2 = {
        preset: 'yeartime', //日期
        theme: 'android-ics light', //皮肤样式
        display: 'modal', //显示方式
        mode: 'scroller', //日期选择模式
        lang: 'zh',
        showNow: false,
        days: 20,
        nowText: "今",
        calendarTitle: '还车时间',
        callback: function () {
            $.setSessionCache('backCarTime', this);
            DoCala();
            //alert(this);
        }
    };
    $("#js_EndDate").mobiscroll(optTime2);
    //DoCala();
    //js_EndDate
    $("#jsitem1").click(function () {
        //debugger;
        //$("#js_StartDate").click();
        return;
    });
    $("#jsitem2").click(function () {
        return;

    });


    //提交订单
    $('#submitOrder').click(function () {
        var getTime = $.getSessionCache('getCarTime');

        var backTime = $.getSessionCache('backCarTime');

        //如果是预约用车  则调用预约用车的选取时间
        if (isBook != null && isBook == 1) {
            getTime = $.getSessionCache('getBookCarTime');
            backTime = $.getSessionCache('backBookCarTime');
        }

        if (getTime == null || backTime == null) {
            $.easyErrorBox("请选择租车时间和还车时间!");
            return;
        }
        else {
            var newback = $.getMicroTime($.getSessionCache('getCarTime')) + 0.5 * 60 * 60 * 1000;
            newback = $.getNormalTime(newback);
            //            if ($.getMicroTime($.getSessionCache('backCarTime')) <= $.getMicroTime(newback)) {
            //                $.easyErrorBox("租车时间必须在半小时以上!");
            //                return;
            //            }
        }
        var payAmt = $("#allTotal").html();
        var getDateTime = $("#js_StartDate").val();
        var returnDateTime = $("#js_EndDate").val();
        
        $.getJson({
            "ObjectName": "ORDERFORM",
            "SubData":
                    {
                        "OrderSource": "12300003",
                        "CityOrgID": cityId,
                        "GetOrgID": OwerOrgID,
                        "ReturnOrgID": OwerOrgID,
                        "GetTime": getDateTime,
                        "ReturnTime": returnDateTime,
                        "AgreementNo": "1012",
                        "PriceCode": "1001",
                        "PriceType": "1",
                        "VMID": VMID,
                        "VIID": $.getSessionCache('VIID'),
                        "PlateNo": PlateNo,
                        "Driver": $.getTicketReadName(),
                        "DriverTel": $.getTicketMobile(),
                        "MIID": $.getTicketMIID(),
                        "PaymentEndTime": '1900-01-01 00:00:00',
                        "PaymentAmt": payAmt,
                        "PaymentType": "1200001",
                        "PaymentTime": "1900-01-01 00:00:00",
                        "OrderStatus": "12200010",
                        "TotalAmt": payAmt,
                        "CreateUser": $.getTicketUserName(),
                        "ModifyUser": $.getTicketUserName()
                    }
        }, 'get_SubmitOrder');

    });
})

var get_SubmitOrder = function (json) {
    console.log(json);

    //location.href = "onlinePaySuccess.htm";

    if (json.IsSuccess == true) {
        $.easyErrorBox(json.Message);
        var aa = json.Data;
        DoPay(aa.OrderID, aa.OrderCode);
    }
    else {
        $.easyErrorBox(json.Message);
    }
}

function cutString(str, length) {
    if (str.length > length) {
        str = str.substr(0, length) + "...";
    }
    return str;
}
function GetPriceDetail(VMID, OwerOrgID) {
    total = 0;
    var r_getTime = "";
    var r_backTime = "";
    var getTime = $.getSessionCache('getCarTime');
    //    if (!getTime) {
    //        getTime = new Date();
    //    }
    //    else {
    //        r_getTime = getTime;
    //    }
    var backTime = $.getSessionCache('backCarTime');
    //如果是预约用车  则调用预约用车的选取时间
    if (isBook != null && isBook == 1) {
        getTime = $.getSessionCache('getBookCarTime');
        backTime = $.getSessionCache('backBookCarTime');
    }
    if (getTime != null && backTime != null) {
   //PRICELISTDETAILORDER
        $.getJson({
            "ObjectName": "DoOrderPrice",
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
                      "FieldName": "CityOrgID",
                      "FieldVal": cityId
                  },
                  {
                      "FieldName": "SiteOrgID",
                      "FieldVal": OwerOrgID
                  },
                  {
                      "FieldName": "StartTime",
                      "FieldVal": getTime
                  },
                  {
                      "FieldName": "EndTime",
                      "FieldVal": backTime
                  },
                  {
                      "FieldName": "PriceCode",
                      "FieldVal": ""
                  },
                  {
                      "FieldName": "VMID",
                      "FieldVal": VMID
                  }
               ]
        }, 'get_PriceListDetail');
    }
}

var get_PriceListDetail = function (json) {
    if (json.IsSuccess == true) {
        datas = json.Data;
        $("#rentTotal").html(datas.RentTotal);
        $("#workInsurance").html(datas.InsuranceTotal);
        $("#allTotal").html(datas.AllTotal);
        
//        GetPrice("workInsurance", "基础价格", "保险费");
//        GetPrice("workInsurance", "周末价格", "保险费");
//        //GetPrice("workFuelMileage", "基础价格", "燃油里程费");
//        GetPrice("rentTotal", "基础价格", "");
//        GetPrice("rentTotal", "周末价格", "");
//        setTimeout(function () {
//            var renttotal = $("#rentTotal").html();
//            var workInsurance = $("#workInsurance").html();
//            $("#allTotal").html((parseFloat(renttotal) + parseFloat(workInsurance)).toFixed(2));
//        }, 500);
    }
    else {
        $.easyErrorBox(json.Message);
    }
}

function GetOrderDtlList() {
    var jsonStr = "[";
    $.packing(datas).each(function () {
        jsonStr += '{ \"FeeType\": \"1\",\"StartTime\": \"2015-01-08\",\"EndTime\":\"2015-01-08\",\"Hours\": \"' + parseFloat(parseFloat(this.Days) * 24 + parseFloat(this.Hours) + parseFloat(this.Minutes) / 60) + '\",\"UnitePrice\": \"' + this.UnitPrice + '\", \"Unite\":\"' + this.Unit + '\",\"Subtotal\":\"' + this.Subtotal + '\",\"IsEnabled\": \"true\" },'
    });
    jsonStr = jsonStr.substr(0, jsonStr.length - 1);
    jsonStr += "]";
    jsonStr = eval('(' + jsonStr + ')');
    //jsonStr = jsonStr.parseJSON(); 
    return jsonStr;
}
function GetPrice(id, type, category, unitId) {

    $.packing(datas).each(function () {
        if (category == "燃油里程费") {
            if (this.PriceTypeName == type && this.TimeName == category) {
                $("#" + id).text(this.UnitPrice.toFixed(2));
                return;
            }
        }
        else if (category == "保险费") {
            if (this.PriceTypeName == type && this.TimeName == category) {
                $("#" + id).text(this.Subtotal.toFixed(2));
                return;
            }
        }
        else {
            if (this.PriceTypeName == type && this.TimeName != "保险费" && this.TimeName != "燃油里程费") {
                total = parseFloat(total) + parseFloat(this.Subtotal.toFixed(2));
                $("#" + id).text(total);
                return;
            }
        }
    });
}
function DoPay(orderId, orderCode) {
    location.href = "myschedule.htm";
   
}
function getDefaultTime() {

    var day = "";
    var month = "";
    var hour = "";
    var minutes = "";
    var myweekday = "";
    var year = "";
    mydate = new Date();
    mydate.setMinutes(mydate.getMinutes() + 5);
    myweekday = mydate.getDay();
    mymonth = mydate.getMonth() + 1;
    myday = mydate.getDate();
    myyear = mydate.getYear();
    year = (myyear > 200) ? myyear : 1900 + myyear;
    hour = mydate.getHours();       //获取当前小时数(0-23)
    minutes = mydate.getMinutes();     //获取当前分钟数(0-59)
    myweekday = getWeekDay(myweekday);
    var startdate = year + "-" + mymonth + "-" + myday;
    var starttime = hour + ":" + minutes;
    enddate = new Date();
    enddate.setHours(mydate.getHours() + 2);

    var endYear = enddate.getYear();
    year_end = (endYear > 200) ? endYear : 1900 + endYear;
    var endMonth = enddate.getMonth() + 1;
    var endWeekDay = getWeekDay(enddate.getDay());


    if (!$.getSessionCache('getCarTime')) {
        $("#js_StartDate").val(startdate);
    }
    if (!$.getSessionCache('backCarTime')) {
        $("#js_EndDate").val(year_end + "-" + endMonth + "-" + enddate.getDate());
    }

    $("#js_StartWeek").text(myweekday);
    $("#js_EndWeek").text(endWeekDay);

}

function getWeekDay(myweekday) {
    var weekday;
    if (myweekday == 0)
        weekday = "周日 ";
    else if (myweekday == 1)
        weekday = "周一 ";
    else if (myweekday == 2)
        weekday = "周二 ";
    else if (myweekday == 3)
        weekday = "周三 ";
    else if (myweekday == 4)
        weekday = "周四 ";
    else if (myweekday == 5)
        weekday = "周五 ";
    else if (myweekday == 6)
        weekday = "周六 ";
    return weekday;
}