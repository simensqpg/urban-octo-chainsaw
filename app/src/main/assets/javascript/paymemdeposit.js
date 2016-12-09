var Member_id = $.getUrlVar("Member_Id");
var VIID = $.getUrlVar("VIID");
var VMID = $.getUrlVar("VMID");
var UnitePriceMM = unescape($.getUrlVar("UnitePriceMM"));
var price, payway, PaymentTN = "", PaymentTN_UB = "";
price = $.getUrlVar("balance");
var doValue = 0;
var PayType = 0;
if (price == null || price == "") {
    price = 0;
}
if (VIID == null || VIID == "") {
    VIID = 0;
}
function DoSubmit() {
    SaveReceivables();
}

var get_MEMBERBALANCE = function (json) {
    if (json.IsSuccess == true) {
        var total = 0;
        var p2 = $("#doValue").val();
        if (p2 == null || p2 == "") {
            p2 = 0;
        }
        total = (parseFloat(price) + parseFloat(p2)).toFixed(2);;
        var url = 'depositpaysuccess.htm?Price=' + total;

        location.href = url;
    }
    else {
        $.easyErrorBox(json.Message);
    }
}
$(function () {
    $(".depositNo").text(price);
    if (price < 500) {
        $("#doValue").val(500 - price);
    }
    else {
        $("#doValue").val(500);
    }
    if (VIID > 0) {
        $(".backTo").click(function () {
            location.href = "cardetail.htm?VMID=" + VMID + "&VIID=" + VIID + "&UnitePriceMM=" + UnitePriceMM;
        });
    }
    else {
        $(".backTo").click(function () {
            history.go(-1);
        });
    }
    //SaveReceivables();
});

function SaveReceivables() {
    doValue = $("#doValue").val();
    if (doValue == "") {
        $.easyErrorBox("请输入充值金额!");
        return;
    }
    if (parseFloat(doValue) <= 0) {
        $.easyErrorBox("充值金额必须大于0!");
        return;
    }
    if ((parseFloat(price) + parseFloat(doValue)) < 500) {
        $.easyErrorBox("会员押金必须大于等于500!");
        return;
    }

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
    $.getJson({
        "ObjectName": "SAVERECEIVABLES",
        "SubData":
                    {
                        "PaymentTN": PaymentTN,
                        "RelationID": Member_id,
                        "PayClass": 2,
                        "PayType": PayType,
                        "PaymentAmt": $("#doValue").val(),
                        "Status": 12900020,
                        "CouponID": 0,
                        "CreateUser": createuser,
                        "ModifyUser": createuser
                    }
    }, 'get_Receivables');
}
var get_Receivables = function (json) {

    if (json.IsSuccess == true) {
        var data = json.Data;
        if (data) {
            PaymentTN = data.PaymentTN;
            PaymentTN_UB = data.PaymentTN_UB;
        }

        //生成付款记录后  调用支付宝的接口---start
        if (PayType == "0") {
            var pluginFailed = function (message) {
                alert("failed>>" + message);
            }
            cordova.exec(function (e) { }, pluginFailed, "AliPayPlugin", "doPay", [PaymentTN, $("#doValue").val(), "会员充值", "会员充值", Member_id, price, '1']);
        }
        //生成付款记录后  调用支付宝的接口---end

        //生成付款记录后  调用银联的接口---start
        if (PayType == "1") {
            cordova.exec(function (s) { }, function (e) { }, "UnionBankPlugin", "ubpay", [PaymentTN_UB, "{\"PaymentTN\":\"" + PaymentTN + "\",\"PaymentTN_UB\":\"" + PaymentTN_UB + "\",\"payamt\":\"" + $("#doValue").val() + "\",\"memberid\":\"" + Member_id + "\",\"balance\":\"" + price + "\"}", "2"]);
        }
        //生成付款记录后  调用银联的接口---end
    }
    else {
        $.easyErrorBox(json.Message);
    }
}

