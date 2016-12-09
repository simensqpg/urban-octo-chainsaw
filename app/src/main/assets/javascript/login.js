$(document).ready(function () {
    var num = /^[0-9]*$/;
 
    $('#jssub').click(function () {

        if ($('#jsuser').val() == '') {
            $.easyErrorBox("请输入手机号！");
            return;
        }
        if ($("#jspass").val() == '') {
            $.easyErrorBox("请输入密码！");
            return;
        }
        var tel = $("#jsuser").val();
        if (tel.length != 11 || !num.test(tel)) {
            $.easyErrorBox("请正确输入手机号!");
            return;
        }
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
                  "FieldName": "M.UserName",
                  "FieldVal": $('#jsuser').val(),
                  "Relation": "And",
                  "SearchMode": "Equal"
              },
              {
                  "FieldName": "[Password]",
                  "FieldVal": $('#jspass').val(),
                  "Relation": "And",
                  "SearchMode": "Equal"
              }
           ]
        }, 'get_USERLOGIN');

    });
      $("#jsuser").val($.getTicketUserName());
      $("#jspass").val($.getTicketUserPwd());

      if ($.getTicketUserName() != null && $.getTicketUserPwd() != null) {
          var h = $.getUrlVar("phttp");
          var isBook = $.getUrlVar("isBook");

          if (h != null && h != "") {
              var url = h + '.htm';
              if (isBook != null && isBook == 1) {
                  url += "?isBook=" + isBook;
              }
              if ($.getUrlVar("Param") && $.getUrlVar("Param") != "") {
                  var p = replaceAll($.getUrlVar("Param"), ';', '&');
                  //var p = $.getUrlVar("Param").replace(new RegExp('', ';'), '&');
                  var p1 = p.replace("+", "=").replace("+", "=").replace("+", "=").replace("+", "=").replace("+", "=");

                  url += "?" + p1;
              }
              window.location.href = url;
          }
          else {
              window.location.href = './individualcenter.htm';
          }
      }
    // 增加jquery代碼開始

    // 输入框清除
    $("input").each(function (i) {
        $(this).focus(function (e) {
            if ($(this).val()) {
                $(this).siblings(".clear").css("display", "block");
            }
            $(this).keydown(function () {
                $(this).siblings(".clear").css("display", "block");
            });
            $("input").each(function (k) {
                if (i != k) {
                    $(this).siblings(".clear").css("display", "none");
                }
            });
        });
    });
    $(document).click(function (e) {
        if (e.target.type == 'password' || e.target.type == 'text') {
            if ($(this).val()) {
                $(this).siblings(".clear").css("display", "block");
            }
        }
        else {
            $('.clear').css("display", "none");
        }
    });
    $(".clear").click(function () {
        $(this).siblings("input").val("");
        $(this).css("display", "none");
    });

    // 密码显示明文和密文
    $(".view").bind({ click: function () {
        if ($(this).siblings('input').attr('type') == 'password') {
            $(this).siblings('input').attr('type', 'text');
        }
        else {
            $(this).siblings('input').attr('type', 'password');
        }
    }
    });

});
function replaceAll(str, s1, s2) {
    return str.replace(new RegExp(s1, "gm"), s2);
}
var get_USERLOGIN = function (json) {

    if (json.IsSuccess == true) {

        var Data = json.Data[0];
        $.setCookie('UserName', Data.UserName);
        $.setCookie('UserPwd', Data.Password);
        $.setCookie('MIID', Data.MIID);
        $.setCookie('Mobile', Data.Mobile);
        $.setCookie('ReadName', Data.Name);
    
        $.easyErrorBox(json.Message, function () {
            var h = $.getUrlVar("phttp");
            var isBook = $.getUrlVar("isBook");
            if (h != null && h != "") {
                var url = h + '.htm';
                if (isBook != null && isBook == 1) {
                    url += "?isBook=" + isBook;
                }
                if ($.getUrlVar("Param")&&$.getUrlVar("Param") != "") {
                    var p = replaceAll($.getUrlVar("Param"), ';', '&');
                    //var p = $.getUrlVar("Param").replace(new RegExp('', ';'), '&');
                    var p1 = p.replace("+", "=").replace("+", "=").replace("+", "=").replace("+", "=").replace("+", "=");

                    url += "?" + p1;
                }
                window.location.href = url;
            }
            else {
                window.location.href = './map.htm';
            }
        });
    }
    else {
        $.easyErrorBox(json.Message);
    }
}

//写入cookies
//function setCookie(name, value) {
//    var Days = 30;
//    var exp = new Date();
//    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
//    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
//}

////读取cookies 
//function getCookie(name) {
//    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

//    if (arr = document.cookie.match(reg))

//        return unescape(arr[2]);
//    else
//        return null;
//}