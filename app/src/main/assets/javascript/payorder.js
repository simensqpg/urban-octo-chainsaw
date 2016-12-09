
var OrderID = $.getUrlVar("OrderID");
var price, payway, PaymentTN = "", PaymentTN_UB = "";
price = $.getUrlVar("balance");
var couponId = $.getUrlVar("couponId");
if (couponId == null || couponId == "") {
    couponId = 0;
}
if (price == null || price == "") {
    price = 0;
}


$(function () {
    $("#backA").click(function () {
        location.href = "ordersettlement.htm?OrderID=" + OrderID
    });
    $("#deposit").html(price);
});

function DoSubmit() {
    var PayType = 0;
    if ($('.checkRadio1').hasClass('active')) {
        PayType = "0";
    }
    if ($('.checkRadio2').hasClass('active')) {
        PayType = "1";
    }
    var createuser = "";
    if ($.getTicketUserName()) {
        createuser = $.getTicketUserName();
    }
    $.getJsonToPay({
        "ObjectName": "SAVERECEIVABLES",
        "SubData":
                    {
                        "PaymentTN": PaymentTN,
                        "RelationID": OrderID,
                        "PayClass": 1,
                        "PayType": PayType,
                        "PaymentAmt": $("#deposit").text(),
                        "Status": 12900020,
                        "CouponID":couponId,
                        "CreateUser": createuser,
                        "ModifyUser": createuser
                    }
    }, 'get_Receivables');
}
var get_Receivables = function (json) {
    var sCarID = $.getUrlVar("CarID");
    var sOrderCode = $.getUrlVar("OrderCode");
    if (json.IsSuccess == true) {
        var data = json.Data;
        var payType = "";
        if (data) {
            PaymentTN = data.PaymentTN;
            payType = data.PayType;
            PaymentTN_UB = data.PaymentTN_UB;
        }
        //生成付款记录后  调用支付宝的接口---start
        if (payType == "0") {
            var pluginFailed = function (message) {
                alert("failed>>" + message);
            }
            cordova.exec(function (e) { alert("ok"); }, pluginFailed, "AliPayPlugin", "doPay", [PaymentTN, $("#deposit").text(), "租车租金", "支付租车租金", OrderID, sOrderCode, price, sCarID, couponId,'1']);
        }
        //生成付款记录后  调用支付宝的接口---end

        //生成付款记录后  调用银联的接口---start
        if (payType == "1") {
            
            //            alert([PaymentTN, "{\"orderid\":\"" + OrderID + "\",\"ordercode\":\"" + sOrderCode + "\",\"orderamt\":\"" + price + "\",\"carid\":\"" + sCarID + "\",\"couponid\":\"" + couponId + "\"}", "1"]);
            console.log([PaymentTN_UB, "{\"orderid\":\"" + OrderID + "\",\"ordercode\":\"" + sOrderCode + "\",\"orderamt\":\"" + price + "\",\"carid\":\"" + sCarID + "\",\"couponid\":\"" + couponId + "\"}", "1"]);
            cordova.exec(function (s) { }, function (e) { }, "UnionBankPlugin", "ubpay", [PaymentTN_UB, "{\"PaymentTN\":\"" + PaymentTN + "\",\"PaymentTN_UB\":\"" + PaymentTN_UB + "\",\"orderid\":\"" + OrderID + "\",\"ordercode\":\"" + sOrderCode + "\",\"orderamt\":\"" + price + "\",\"carid\":\"" + sCarID + "\",\"couponid\":\"" + couponId + "\"}", "1"]);
        }
        //生成付款记录后  调用银联的接口---end

    }
    else {
        $.easyErrorBox(json.Message);
    }
}

function finishubpay(obj) {
    alert(obj);
}
