function receivePhoto(obj) {
    alert(obj);
}

var addImgs = {
    imgNum: 0,
    addImg: function () {
        var _this = this;
        $('#add input').change(function () {
            lrz(this.files[0], { width: 400 }, function (results) {
                var html = '';
                var src = results.base64;
                _this.imgNum++;
                html = _this.imgNum == 5 ? '<li style="margin-right:0">' : '<li>';
                html += '<img src="' + src + '"><span class="delete"></span></li>';
                $('#imgList').append(html);
                _this.addIconJudge();
            });



        });
    },
    deleteImg: function () {
        var _this = this;
        $('#imgList span.delete').live('click', function () {
            $(this).parents('li').remove();
            _this.imgNum--;
            _this.addIconJudge();
        });
    },
    addIconJudge: function () {
        if (this.imgNum > 4) {
            $('#add').css('display', 'none');
        }
        else {
            $('#imgList li').last().css('margin-right', '3.75%');
            $('#add').css('display', 'block');
        }
    },
    init: function () {
        this.addImg();
        this.deleteImg();
    }
};
var PlateNo = $.request.queryString["PlateNo"],
    carId = $.request.queryString["carId"],
    orderId = $.request.queryString["orderId"],
    condiId = $.request.queryString["condiId"];
$(function () {
    
    addImgs.init();
    //字数变化
    $("#wordNum").html("200");
    $("#content").keyup(function () {
        var num = 200 - parseInt($(this).attr("value").length);

        if (num < 0) {
            $.easyErrorBox("反馈内容不能大于200个字符!");
            $(this).attr("value", $(this).attr("value").substring(0, 200));
        }
        $("#wordNum").html(200 - parseInt($(this).attr("value").length));
    });

    if (condiId == 1) $("#js_PageTitle").text(PlateNo + "-外观");
    else $("#js_PageTitle").text(PlateNo + "-清洁");

    $('#backTo').click(function () {
        window.location.href = './conditionreport.htm?PlateNo=' + PlateNo + '&carId=' + carId + '&orderId=' + orderId;
    });
});
