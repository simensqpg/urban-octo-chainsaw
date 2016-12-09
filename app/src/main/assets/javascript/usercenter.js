var chkuser = ChkUser();
if (!chkuser) {
    location.href = "login.htm?phttp=individualcenter";
}
$(document).ready(function () {
    $.getJson({
        "ObjectName": "USERLOGIN",
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
                  "FieldName": "M.MIID",
                  "FieldVal": $.getTicketMIID(),
                  "Relation": "And",
                  "SearchMode": "Equal"
              }
           ]
    }, 'get_USERLOGIN');

    $("#myxc").click(function () {
        location.href = "myschedule.htm";
    });
    $(".userInfo").click(function () {
        location.href = "accountinformation.htm";
    });
    $("#btnQuit").click(function () {
        $.delCookie("MIID");
        $.delCookie("UserName");
        $.delCookie("UserPwd");
        $.delCookie("Mobile");
        $.delCookie("ReadName");
        window.location.href = "./map.htm";
    });
   
    
});
var get_USERLOGIN = function (json) {

    if (json.IsSuccess == true) {
        $.packing(json.Data).each(function () {

            var Data = json.Data[0];
            var str = Data.Mobile;
            var phonenum = str.substring(0, 3) + "****" + str.substring(7, 11);
            $("#userName").html(Data.Name); //+"<span class='memberlv'>普通会员<span>"
            $(".phoneNum").text(phonenum);
            $("#balance").text(Data.Balance.toFixed(1));
            $(".userInfo").prepend("<img src=\"../images/" + Data.PicPath + "\" class=\"deAvatar\">")
            $("#returnMoney").text(Data.ReturnMoney);
            $("#vouchers").text(Data.PromotionCount);
            $("#GoBalance").click(function () {
                location.href = "paymemdeposit.htm?Member_Id=" + $.getTicketMIID() + "&balance=" + Data.Balance.toFixed(1);
            });
            if (Data.IsCredit) {
                $("#iscredit").text("已绑定信用卡");
            } else {
                $("#iscredit").text("首次绑定即获赠50积分");
            };
            if (Data.IsEnabled == true) {
                $("#isvalid").html("<span class='green'>已认证会员</span>");
            } else {
                $("#isvalid").html("<span class='red'>待审核会员</span>");
            }

        });
    }
}