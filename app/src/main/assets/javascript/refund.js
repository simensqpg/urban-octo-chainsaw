$(function () {
    GetUserInfo();
});

function GetUserInfo() {
    //加载用户的余额
    $.getJson({
        "ObjectName": "GETUSERINFO",
        "OrderByData": [
              {
                  "FieldName": "M.MIID",
                  "Direction": "Desc"
              }
           ],
        "PagerData": {
            "CurrentPage": "1",
            "PageCount": "10"
        },
        "SearchData": [
              {
                  "FieldName": "MIID",
                  "FieldVal": $.getTicketMIID(),
                  "Relation": "And",
                  "SearchMode": "Equal"
              }
           ]
    }, 'get_USERLOGIN');
}

var get_USERLOGIN = function (json) {

    if (json.IsSuccess == true) {
        var Data = json.Data;
        $("#balance").text(Data.CanCash.toFixed(2));
    }
    else {
        $.easyErrorBox(json.Message);
    }
}
function DoCash() {
    var amt = $("#amount").val();
    if (amt == "") {
        $.easyErrorBox("提现金额必须填写！");
        return;
        }
    if (amt - 0 <= 0) {
        $.easyErrorBox("提现金额必须大于0！");
        return;
    }
    var pat1= new RegExp(/^\d{1,}\.{1}\d{1,}$/);
    var pat2 = new RegExp(/^\d*$/);
    if (!(pat1.test(amt) || pat2.test(amt))) {
        $.easyErrorBox("提现金额必须为数字！");
        return;
    }

    var cashnumber = $("#usernumber").val();
    if (cashnumber == "") {
        $.easyErrorBox("提现账户必须填写！");
        return;
    }
    var balance = $("#balance").text();

    if (parseFloat(balance) < parseFloat(amt)) {
        $.easyErrorBox("可提现金额不足！");
        return;
    }

    $.getJson({
        "ObjectName": "DoCash",

        "SubData":
                    {
                        "MIID": $.getTicketMIID(),
                        "CashAmt": amt,
                        "CashUser": $.getTicketUserName(),
                        "CashReson": $("#cashreson").val(),
                        "CashNumber": $("#usernumber").val()

                    }
    }, 'get_DoCash');
}
var get_DoCash = function (json) {
    if (json.IsSuccess == true) {
        $.easyErrorBox("申请提现成功!客服将会在24小时内完成审核！");
        location.href = "individualcenter.htm";
    }
    else {
        $.easyErrorBox(json.Message);
    }
}