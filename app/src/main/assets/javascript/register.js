var hidCode = "";
var Member_id = "";
var front_img = "";
var back_img = "";
function GetCode() {
    var tel = $("#tel").val();
    var num = /^[0-9]*$/;
    if (tel.length != 11 || !num.test(tel)) {
        $.easyErrorBox("请正确输入手机号!");
        return;
    }

    $.getJson({
        "ObjectName": "REGISTERSENDSMS",
        "SearchData": [
                            { "FieldName": "UserName", "FieldVal": $('#tel').val() }
                        ]
    }, 'get_RegisterSendSMS');
}

var get_RegisterSendSMS = function (json) {
    console.log(json);
    if (json.IsSuccess == true) {
        $.easyErrorBox("短信已发送!");
        hidCode = json.Data;
//        $("#code").val(hidCode);
    }
    else {
        $.easyErrorBox(json.Message);
    }
}

function Enroll() {
    var tel = $("#tel").val();
    if (tel.length != 11) {
        $.easyErrorBox("请正确输入手机号!");
        return;
    }
    if (tel.length > 0) {
        if (isNaN(tel)) {
            $.easyErrorBox("请正确输入手机号!");
            return;
        }
    }
    var pwd = $("#inputPwd").val();
    var pwd02 = $("#inputPwd02").val();
    if (pwd.length > 12 || pwd.length < 6) {
        $.easyErrorBox("密码必须在6至12位!");
        return;
    }
    if (pwd != pwd02) {
        $.easyErrorBox("两次密码输入不一样!");
        return;
    }
    var name = $("#inputName").val();
    if (name.length < 1 && name != "请填写昵称") {
        $.easyErrorBox("姓名必须填写!");
        return;
    }
    var sex = $("#chkboxMan");
    var num = /^[0-9]*$/;
    var identitycard = $("#identitycard").val();
    if (!IdCardValidate(identitycard))//验证身份证号码
    {
        return;
    }

    if (sex.hasClass("active")) {
        sex = "1";
    }
    else {
        sex = "2";
    }
    front_img = $("#txtPhoto1").val();
    back_img = $("#txtPhoto2").val();
    if (front_img=="") {
        $.easyErrorBox("请上传驾照正面照!");
        return;
    }
    if (back_img=="") {
        $.easyErrorBox("请上传驾照反面照!");
        return;
    }
    if (hidCode != "" && hidCode == $("#code").val()) {
        $.getJson({
            "ObjectName": "USERREGISTER",

            "SubData":
                    {
                        "UserName": tel,
                        "Password": pwd,
                        "Name": name,
                        "MemberLevel": "11800003",
                        "Mobile": tel,
                        "Point": "0",
                        "IsEnabled": "false",
                        "Sex": sex,
                        "JSZPicPositive": front_img,
                        "JSZPicOtherSide": back_img,
                        "SelfCardNo": identitycard

                    }
        },'get_UserRegister');
    } else {
        $.easyErrorBox("验证码错误！");
    }
}


var get_UserRegister = function (json) {
    if (json.IsSuccess == true) {
        $.easyErrorBox("注册申请已提交，我们将在您支付会员押金成功后24小时内审核完毕！", function () {
            Member_id = json.Data;
            $.setCookie('UserName', $("#tel").val());
            $.setCookie('MIID', Member_id);
            $.setCookie('UserPwd', $("#inputPwd").val());
            $.setCookie('Mobile', $("#tel").val());
            $.setCookie('ReadName', $("#inputName").val());
            //window.location.href = './paymemdeposit.htm?Member_Id=' + Member_id + "&balance=0";
            window.location.href = 'individualcenter.htm'       
        });
        
    }
    else {
        $.easyErrorBox(json.Message);
    }
}
//写入cookies
function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
$(document).ready(function () {
    // 增加jquery代碼開始
    $(".checkbox").click(function () {
        if ($(this).children("input").attr("name")) {
            var name = $(this).children("input").attr("name");
            $(document).find("input[name='" + name + "']").parent(".checkbox").removeClass("active");
            $(document).find("input[name='" + name + "']").attr("checked", false);
            $(this).addClass("active");
            $(this).attr("checked", true);
        }
        else {
            if ($(this).hasClass("active")) {
                $(this).removeClass("active");
                $(this).children("input").attr("checked", false);
            }
            else {
                $(this).addClass("active");
                $(this).children("input").attr("checked", true);
            }
        }
    });

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
    // 增加jquery代碼結束
    $('.xieyiLayer').click(function () {
        $("#xieyi").show();
    });
});
function closelayer() {
    $(".uploadImgFilter").hide();
}

//身份证验证开始
var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];    // 加权因子   
var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];            // 身份证验证位值.10代表X   

function IdCardValidate(idCard) {
    var num = /^[0-9]*$/;
    idCard = trim(idCard.replace(/ /g, ""));               //去掉字符串头尾空格                     
    if (idCard.length == 15 && num.test(idCard)) {
        return isValidityBrithBy15IdCard(idCard);       //进行15位身份证的验证    
    }
    else if (idCard.length == 18) {
        var a_idCard = idCard.split("");                // 得到身份证数组   
        if (isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(a_idCard)) {   //进行18位身份证的基本验证和第18位的验证
            return true;
        }

        else {
            $.easyErrorBox("18位身份证号码错误!");
            return false;
        }
    }

    else {
        $.easyErrorBox("1身份证号码错误!");
        return false;
    }
}
/**  
* 判断身份证号码为18位时最后的验证位是否正确  
* @param a_idCard 身份证号码数组  
* @return  
*/
function isTrueValidateCodeBy18IdCard(a_idCard) {
    var sum = 0;                             // 声明加权求和变量   
    if (a_idCard[17].toLowerCase() == 'x') {
        a_idCard[17] = 10;                    // 将最后位为x的验证码替换为10方便后续操作   
    }
    for (var i = 0; i < 17; i++) {
        sum += Wi[i] * a_idCard[i];            // 加权求和   
    }
    valCodePosition = sum % 11;                // 得到验证码所位置   
    if (a_idCard[17] == ValideCode[valCodePosition]) {
        return true;
    } else {
        $.easyErrorBox("18位身份证号码错误!");
        return false;
    }

}
/**  
* 验证18位数身份证号码中的生日是否是有效生日  
* @param idCard 18位书身份证字符串  
* @return  
*/
function isValidityBrithBy18IdCard(idCard18) {
    var year = idCard18.substring(6, 10);
    var month = idCard18.substring(10, 12);
    var day = idCard18.substring(12, 14);
    var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
    // 这里用getFullYear()获取年份，避免千年虫问题   
    if (temp_date.getFullYear() != parseFloat(year)
          || temp_date.getMonth() != parseFloat(month) - 1
          || temp_date.getDate() != parseFloat(day)) {
        $.easyErrorBox("18身份证号码生日错误!");
        return false;
    } else {
        return true;
    }
}
/**  
* 验证15位数身份证号码中的生日是否是有效生日  
* @param idCard15 15位书身份证字符串  
* @return  
*/
function isValidityBrithBy15IdCard(idCard15) {
    var year = idCard15.substring(6, 8);
    var month = idCard15.substring(8, 10);
    var day = idCard15.substring(10, 12);
    var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
    // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法   
    if (temp_date.getYear() != parseFloat(year)
              || temp_date.getMonth() != parseFloat(month) - 1
              || temp_date.getDate() != parseFloat(day)) {
        $.easyErrorBox("15位身份证号码生日错误!");
        return false;
    } else {
        return true;
    }
}
//去掉字符串头尾空格   
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}


