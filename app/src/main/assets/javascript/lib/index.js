var front_img = "";
var back_img = "";
window.onload = function () {
    var input = document.getElementById('demo_input');
    var img_area = document.getElementById("img_area");
    var input01 = document.getElementById('demo_input01');
    var img_area01 = document.getElementById("img_area01");
    input.onchange = function () {
        lrz(this.files[0], { width: 400 }, function (results) {
            // 你需要的数据都在这里，可以以字符串的形式传送base64给服务端转存为图片。
            //            console.log(results);
            // 发送到后端
            $("#uploadImgFront .showimg").show();
            $("#uploadImgFront .uploadImg").hide();
            img_area.innerHTML = '<img src="' + results.base64 + '" alt="" width="100%"/>';
            front_img = results.base64;
            $("#uploadImgFront .uploadsure").click(function () {
                input.value = "";
                $("#uploadImgFront.uploadImgFilter").hide();
                $("#uploadImgFront .showimg").hide();
                $("#uploadImgFront .uploadImg").show();
                if (front_img != "") {
                $(".imgFront").text("已选择图片");
            }
        })

        });
    };
    input01.onchange = function () {
        lrz(this.files[0], { width: 400 }, function (results) {
            $("#uploadImgBack .showimg").show();
            $("#uploadImgBack .uploadImg").hide();
            img_area01.innerHTML = '<img src="' + results.base64 + '" alt="" width="100%"/>';
            back_img = results.base64;
            $("#uploadImgBack .uploadsure").click(function () {
                input.value = "";
                $("#uploadImgBack.uploadImgFilter").hide();
                $("#uploadImgBack .showimg").hide();
                $("#uploadImgBack .uploadImg").show();
                if (back_img != "") {
                    $(".imgBack").text("已选择图片");
                }
        })

        });
    };

};