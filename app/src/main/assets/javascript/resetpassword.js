var chkuser = ChkUser();
$(document).ready(function () {
    var tel = $.getUrlVar("tel");

    $('#resetPassword').click(function () {
        var pwd = $("#newpassword").val();
        var repeatpwd = $("#repeatpassword").val();
        if (pwd.length > 12 || pwd.length < 6) {
            $.easyErrorBox("密码必须在6至12位!");
            return;
        }
        if (pwd != repeatpwd) {
            $.easyErrorBox("两次密码不一样！");
            return;
        }

        $.getJson({
            "ObjectName": "USERUPDATEPWDBYUSERNAME",
            "SearchData": [
                            { "FieldName": "NewPwd", "FieldVal": pwd },
                            { "FieldName": "UserName", "FieldVal": tel }
                        ]
        }, 'get_USERUPDATEPWDBYUSERNAME');
    });


});
 var get_USERUPDATEPWDBYUSERNAME = function (json) {

     console.log(json.Data);
     if (json.IsSuccess == true) {
         $.easyErrorBox("修改成功!");
         if (!chkuser) {
             window.location = "login.htm";
         } else {
             window.history.back(-1);
         }
     }
     else {
         $.easyErrorBox(json.Message);
     }
 }
