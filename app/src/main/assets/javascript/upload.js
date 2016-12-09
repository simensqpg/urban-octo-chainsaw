
var uploadObj = {
    // 弹出层
    objLayer: function (classname,id) {
        $("#uploadLicense ." + classname).click(function () {
            $('#'+id).show();
        })
    },

    checkRadio: function () {
        $('#checkRadioBtn .checkRadio').click(function () {
            if ($(this).hasClass('active') && $(this).parent('.paymentModeList').siblings().find('.checkRadio').attr('className') != 'active') {
                $(this).removeClass('active');
                $(this).parent('.paymentModeList').siblings().find('.checkRadio').addClass('active');
            }
            else {
                $(this).addClass('active');
                $(this).parent('.paymentModeList').siblings().find('.checkRadio').removeClass('active');
            }
        })
    }
}

$(function(){
    uploadObj.objLayer("back", "uploadImgBack");
    uploadObj.objLayer("front", "uploadImgFront");
	uploadObj.checkRadio();
})
//window.onload = function () {
//    var input = document.getElementById("demo_input");
//    var img_area = document.getElementById("img_area");
//    if (typeof (FileReader) === 'undefined') {
//        result.innerHTML = "抱歉，你的浏览器不支持 FileReader，请使用现代浏览器操作！";
//        input.setAttribute('disabled', 'disabled');
//    } else {
//        input.addEventListener('change', readFile, false);
//    }

//    function readFile() {
//        var file = this.files[0];
//        //这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件   
//        if (!/image\/\w+/.test(file.type)) {
//            alert("请确保文件为图像类型");
//            return false;
//        }
//        var reader = new FileReader();
//        reader.readAsDataURL(file);
//        reader.onload = function (e) {
//            $("#uploadImgFront .showimg").show();
//            $("#uploadImgFront .uploadImg").hide();
//            img_area.innerHTML = '<img src="' + this.result + '" alt="" width="100%"/>';
//            front_img = this.result;

//        }
//        $("#uploadImgFront .uploadsure").click(function () {
//            input.value = "";
//            $("#uploadImgFront.uploadImgFilter").hide();
//            $("#uploadImgFront .showimg").hide();
//            $("#uploadImgFront .uploadImg").show();
//            if (front_img != "") {
//                $(".imgFront").text("已选择图片");
//            }
//        })
//    }

//    var input01 = document.getElementById("demo_input01");
//    var img_area01 = document.getElementById("img_area01");
//    if (typeof (FileReader) === 'undefined') {
//        result.innerHTML = "抱歉，你的浏览器不支持 FileReader，请使用现代浏览器操作！";
//        input.setAttribute('disabled', 'disabled');
//    } else {
//        input01.addEventListener('change', readFile01, false);
//    }

//    function readFile01() {
//        var file = this.files[0];
//        //这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件   
//        if (!/image\/\w+/.test(file.type)) {
//            alert("请确保文件为图像类型");
//            return false;
//        }
//        var reader01 = new FileReader();
//        reader01.readAsDataURL(file);
//        reader01.onload = function (e) {
//            $("#uploadImgBack .showimg").show();
//            $("#uploadImgBack .uploadImg").hide();
//            img_area01.innerHTML = '<img src="' + this.result + '" alt="" width="100%"/>';
//            back_img = this.result;

//        }
//        $("#uploadImgBack .uploadsure").click(function () {
//            input.value = "";
//            $("#uploadImgBack.uploadImgFilter").hide();
//            $("#uploadImgBack .showimg").hide();
//            $("#uploadImgBack .uploadImg").show();
//            if (back_img != "") {
//                $(".imgBack").text("已选择图片");
//            }
//        })
//    }
//}
