var price;
var orderCode = "";
var carId = "";
var OrderID = "0";
var payAmt = "0";
$(document).ready(function () {
    var CouponID = ""; //优惠券id
    var Coupon_Price = 0.0; //优惠价面额
    var totalprice;

    OrderID = $.request.queryString["OrderID"];

    var sType = $.request.queryString["Type"];

    if (sType == 1) {
        $("#js_PageTitle").text("订单详情");
    }
    else {
        $("#js_PageTitle").text("订单结算");
    }
    $.getJson({ "ObjectName": "GetOrderSettlementInfo", "SearchData": [{ "FieldName": "OrderId", "FieldVal": OrderID}] }, 'get_GetOrderSettlementInfo');

    $("#dispFee").click(function () {
        $("#fee").toggle();
    });
});

var get_GetOrderSettlementInfo = function (json) {
    if (json.IsSuccess == true) {
        var dataObj = json.Data;
        carId = dataObj.VIID;
        orderCode = dataObj.OrderCode;

        $("#js_brandimg").attr("src", "../upload/car/" + dataObj.CarImageUrl);
        $("#js_brandtitle").text(dataObj.ModelName + " " + dataObj.ATMT);
        $("#js_address").text(cutString(dataObj.Address, 15));
        $("#js_carmodel").text(dataObj.ModelName);
        $("#js_startdate").html("取车　" + ConverTime(dataObj.GetTime, 1) + "　" + ConverTime(dataObj.GetTime, 2));
        $("#js_starttime").text(ConverTime(dataObj.GetTime, 5));
        $("#js_starttimefact").text(ConverTime(dataObj.RealGetTime, 5));
        $("#js_enddate").html("还车　" + ConverTime(dataObj.ReturnTime, 1) + "　" + ConverTime(dataObj.ReturnTime, 2));
        $("#js_endtime").text(ConverTime(dataObj.ReturnTime, 5));
        $("#js_endtimefact").text(ConverTime(dataObj.RealReturnTime, 5));
        $("#js_ordertime").text("订单时长：" + getDateDiff(dataObj.GetTime, dataObj.ReturnTime));

        var startTime;
        var endTime;
        //如果取车时间大于实际取车时间  则为提前取车
        if (CaDateDiff(dataObj.GetTime, dataObj.RealGetTime) > 0) {
            startTime = dataObj.GetTime;
        }
        else {
            if (CaDateDiff(dataObj.RealGetTime, dataObj.GetTime) > 5) {
                startTime = dataObj.RealGetTime;
                var mydate = new Date(startTime);  //开始时间
                startTime = mydate.setMinutes(mydate.getMinutes() + 5);
            }
        }
        if (CaDateDiff(dataObj.ReturnTime, dataObj.RealReturnTime) > 0) {
            endTime = dataObj.RealReturnTime;
        }
        else {
            endTime = dataObj.ReturnTime;
        }
        $("#js_chaoshi").text(getDateDiff(startTime, endTime));
        $("#js_km").text("行驶里程：" + (dataObj.ReturnMileageNum - dataObj.GetMileageNum).toFixed(2));

        var orderfee = 0;
        //获取订单明细
        $.packing(dataObj.OrderDtlList).each(function () {
            if (this.FeeType == "12000001") {
                var rent = parseFloat($("#js_rent").text());
                $("#js_rent").text(rent + parseFloat(this.Subtotal));
            }
            if (this.FeeType == "12000002") {
                $("#js_ins").text(this.Subtotal);
            }
            if (this.FeeType == "12000040") {
                $("#js_fuel").text(this.Subtotal);
            }
            if (this.FeeType == "12000039") {
                $("#js_overtime").text(this.Subtotal);
            }
            orderfee += eval(this.Subtotal);
        });
        //获取订单是否有占用的优惠券
        var pmObj = dataObj.PMInfo;
        if (pmObj) {
            $.setSessionCache("couponCode", pmObj.ID);
            $.setSessionCache("couponAmt", pmObj.AmtOrOff);
        }
        $("#js_vouchersNeed").html(dataObj.TotalAmt);
        totalprice = dataObj.TotalAmt;
        price = totalprice;
        $("#js_vouchers").html(dataObj.TotalAmt);
        $("#js_orderFee").text(orderfee);

        $('#btnPay').click(function () {
            debugger;
            payAmt = $("#js_vouchers").text();
            if (payAmt == null || payAmt == "" || payAmt == "undefined") {
                return;
            }
            payAmt = parseFloat(payAmt);
            var url = "";
            var couponId = "0";
            if ($.getSessionCache("couponCode") != null && $.getSessionCache("couponCode") != "") {
                couponId = $.getSessionCache("couponCode");
            }
            if (parseFloat(payAmt) <= 0) {
                $.getJson({
                    "ObjectName": "UpdateOrderZero",
                    "subData":
                      {
                          "OrderID": OrderID,
                          "CouponId": couponId,
                          "PaymentAmt": payAmt,
                          "OrderStatus": "12200060"
                      }
                }, 'get_ZeroOrder')
                //***********加入更新订单和优惠券的逻辑
            }
            else {
                url = "payorder.htm?OrderID=" + OrderID + "&balance=" + $("#js_vouchers").text() + "&CarID=" + carId + "&OrderCode=" + orderCode;
                if ($.getSessionCache("couponCode") != null && $.getSessionCache("couponCode") != "") {
                    url += "&couponId=" + $.getSessionCache("couponCode");
                }
                $.setSessionCache("couponCode", ""); //.setSessionCache("couponCode", "");
                $.setSessionCache("couponAmt", "");
                location.href = url;
            }

        });

        if ($.getSessionCache("couponCode") != null && $.getSessionCache("couponAmt") != null && $.getSessionCache("couponCode") != "" && $.getSessionCache("couponAmt") != "") {
            var Coupon_Price = parseFloat($.getSessionCache("couponAmt")).toFixed(1);
            $("#spSoupon").html("已选" + $.getSessionCache("couponAmt") + "元优惠券");
            price = totalprice - Coupon_Price;
            if (price < 0) {
                price = 0;
                $("#js_vouchers").text(price.toFixed(2));
            } else {
                $("#js_vouchers").text(price.toFixed(2));
            }
        }
    }
    else {
        $.easyErrorBox(json.Message);
    }
}
var get_ZeroOrder = function (json) {
    if (json.IsSuccess == true) {
        url = "./onlinepaysuccess.htm";
        url += "?orderCode=" + orderCode + "&orderId=" + OrderID + "&orderAmt=" + payAmt + "&CarID=" + carId;
        $.setSessionCache("couponCode", ""); //.setSessionCache("couponCode", "");
        $.setSessionCache("couponAmt", "");
        location.href = url;
    }
    else {
        $.easyErrorBox(json.Message);
    }
}
function CaDateDiff(strdate1, strdate2) {
    var date1 = new Date(strdate1);  //开始时间
    var date2 = new Date(strdate2);    //结束时间
    var date3 = date2.getTime() - date1.getTime()  //时间差的毫秒数
    return date3;
}
function getDateDiff(strdate1, strdate2) {

    var date1 = new Date(strdate1);  //开始时间
    var date2 = new Date(strdate2);    //结束时间
    var date3 = date2.getTime() - date1.getTime()  //时间差的毫秒数

    //计算出相差天数
    var days = Math.floor(date3 / (24 * 3600 * 1000))

    //计算出小时数
    var leave1 = date3 % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000))
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000)        //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000))

    //计算相差秒数
    var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000)
    var str = "";
    if (days > 0) {
        str += days + "天";
    }
    if (hours > 0) {
        str += hours + "小时";
    }
    if (minutes > 0) {
        str += minutes + "分钟";
    }
    if (seconds > 0) {
        str += seconds + "秒";
    }
    return str;
    //alert(" 相差 " + days + "天 " + hours + "小时" + minutes + "分钟" + seconds + "秒")
}

function GetPromotion() {
    $.getJson({
        "ObjectName": "USERPROMOTION",
        "OrderByData": [{ "FieldName": "pm.ID", "Direction": "Desc"}],
        "PagerData": { "CurrentPage": "1", "PageCount": "100" },
        "SearchData": [
                    {
                        "FieldName": "MemberID",
                        "FieldVal": $.getTicketMIID(),
                        "Relation": "And",
                        "SearchMode": "Equal"
                    }
               ]
    }, 'get_UserPromotion');
}

var get_UserPromotion = function (json) {
    if (json.IsSuccess == true) {
        var str = "";
        $.packing(json.Data).each(function () {
            //                <div class="fee1 item">
            //                <h2>租二免一</h2>
            //                <div class="checkRadio active">
            //                    <input type="radio" class="checkRadio">
            //                </div>
            //            </div>
            str += "<div class=\"fee1 item\">";
            str += "<h2>" + this.PromotionName + "</h2>";
            str += "<div class=\"checkRadio\">";
            str += "<input idname=\"" + this.ID + "\" value=\"" + this.AmtOrOff + "\" id=\"chk" + this.ID + "\" type=\"radio\" name='radio' checked='false'>";
            str += "</div>";
            str += "</div>";
            $("#promotionList").append(str);
        });

    }
    else {
        $.easyErrorBox(json.Message);
    }
}

function GoCouponlis() {
    var orderID = $.request.queryString["OrderID"];
    location.href = "couponlist.htm?OrderID=" + orderID;
}