var chkuser = ChkUser();
$(function () {

    bindLeftmenu(); //左侧菜单
});
function bindLeftmenu() {
    $(".menuFilter").load("../pages/leftmenu.htm",function(){
        if (!chkuser) {
            $('#login_sucess').html("<a class='login'>登录 / 注册</a><p class='txt'>登录后即可享受优质服务</p>");
            $('#js_memberCenter').click(function () {
                window.location.href = './login.htm';
            });
        } else {
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
            }, 'get_UserLoginInfo');
        }
    });

    $('#menuBtn').click(function () {
        $('#menuFilter').animate({ left: '0' });
        $('#menuLayer').animate({ left: '0' });
    });
    $('#menuFilter').click(function (e) {
        if (e.target.id == 'menuFilter') {
            $('#menuLayer').animate({ left: '-48%' });
            $('#menuFilter').animate({ left: '-100%' });
        }
    });
}
$(document).ready(function () {
    if (!chkuser) {
       // $('#login_sucess').html("<a href='login.htm' class='login'>登录 / 注册</a><p class='txt'>登录后即可享受优惠服务</p>");
    }
   
    var href = (window.location.pathname); //当前网址高亮
    href = href.split("/")[2];
    $("a").each(function () {

        if ($(this).attr("href") == href) {
            $(this).parent().addClass("active").siblings().removeClass("active");
        }

    });
});

var get_UserLoginInfo = function (json) {
    if (json.IsSuccess == true) {
        console.log(json.Data);
        $.packing(json.Data).each(function () {

            var Data = json.Data[0];
            var str = Data.Mobile;
            var phonenum = str.substring(0, 3) + "****" + str.substring(7, 11);
            $('.user_pic').html("<img src=\"../images/" + Data.PicPath + "\" class=\"deAvatar\">");
            $('#login_sucess').html("<a class='user'>" + Data.Name + "</a><p class='phone'>" + phonenum + "</p>");
            $('#js_memberCenter').click(function () {
                window.location.href = './individualcenter.htm';
            });
        });
    }
}

