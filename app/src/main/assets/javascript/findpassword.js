    var hidCode="";
    function GetCode() {
        var tel = $("#tel").val();
        if (tel.length != 11) {
            $.easyErrorBox("请正确输入手机号!");
            return;
        } else {
            $.easyErrorBox("短信已发送!");
        }

        $.getJson({
            "ObjectName": "SENDSMS",
            "SearchData": [
                            { "FieldName": "UserName", "FieldVal": $('#tel').val() }
                        ]
        }, 'get_SENDSMS'
           );
    }

    function GoReset() {
        if (hidCode != "" && hidCode == $("#code").val()) {
            location.href = "resetpassword.htm?tel=" + $("#tel").val();
        } else {
            $.easyErrorBox("验证码错误！");
        }
    }
    var get_SENDSMS = function (json) {
        console.log(json.Data);
                if (json.IsSuccess == true) {
                    hidCode = json.Data;
                }
                else {
                    $.easyErrorBox(json.Message);
                }
            }