var chkuser = ChkUser();
if (!chkuser) {
    location.href = "login.htm?phttp=individualcenter";
}
var tel_phone = $.getTicketUserName();
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
    $('#chooseSex').click(function () {
        $('.mask').css('display', 'block');
    });
    $('.mask li').click(function () {
        $('.mask').css('display', 'none');
        var sexN = $(this).html();
        console.log(sexN)
        var sex = "1";
        if (sexN == "男") {
            sex = "1";
        }
        else {
            sex = "2";
        }
        $.getJson({
            "ObjectName": "UserUpdate",

            "SubData":
                    {
                        "Sex": sex,
                        "MIID": $.getTicketMIID()
                    }
        }, 'get_UserUpdate');
    });

    $("#btnQuit").click(function () {
        $.deleteSessionCache("MIID");
        window.location.href = "./map.htm";
    });
});
var get_USERLOGIN = function (json) {
    if (json.IsSuccess == true) {

        $.packing(json.Data).each(function () {
            var Data = json.Data[0];
            var str = Data.Mobile;
            var phonenum = str.substring(0, 3) + "****" + str.substring(7, 11); //号码注释
            var leveImg; //会员等级图标
            if (Data.MemberLevelName = "金卡") {
                leveImg = "vipmember.png";
            };
            if (Data.MemberLevelName = "银卡") {
                leveImg = "vipmember.png";
            };
            if (Data.MemberLevelName = "铜卡") {
                leveImg = "vipmember.png";
            };
            $("#headimg").html("<img src=\"../images/" + Data.ImgUrl + "\" class=\"headPor\">");
            $("#memberleve").html("<img src=\"../images/" + leveImg + "\" class=\"vip\"><span class=\"text\">" + Data.MemberLevelName + "</span>");
            $("#membername").text(Data.Name);
            $("#phoneNum").text(phonenum);

            if (Data.Sex == "1") {
                $("#memeberSex").text("男");
            };
            if (Data.Sex == "2") {
                $("#memeberSex").text("女");
            };
            if (Data.Sex == "0") {
                $("#memeberSex").text(" ");
            }
        });
    }
};

var get_UserUpdate = function (json) {

    console.log(json.Data);
    if (json.IsSuccess == true) {
        $('.mask li').click(function () {
            var sexN = $(this).html();
            $('#memeberSex').text(sexN);
        })

        $.easyErrorBox("修改成功!");
    }
    else {
        $.easyErrorBox(json.Message);
    }
}
var resetpwd = function () {
    window.location.href = 'resetpassword.htm?tel=' + tel_phone;
}