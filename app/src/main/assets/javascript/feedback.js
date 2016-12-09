var MIID = $.getTicketMIID();
var iBlock = "none";
var hasSugg = false;
var get_UserFeedback = function (json) {
    if (json.IsSuccess == true) {
        $.easyErrorBox("反馈成功!");
        $("#content").attr("value", "");
        $("#wordNum").html("200");
        $("#first").removeClass("active").next().addClass("active");
        $(".unfinish").hide();
        $(".finish").show();
    }
    else {
        $.easyErrorBox(json.Message);
    }
};
var get_GetUserFeedbackList = function (json) {
    if (json.IsSuccess == true) {
        var scoreCount = 0;
        var i = 0;
        $.packing(json.Data).each(function () {
            var str = "";
            str += "<li class=\"sug_list_item\">";
            str += "<p class=\"time\"><img src=\"../images/clockblue.png\">" + ConverTime(this.CreateTime, 1) + "</p>";
            str += "<p class=\"info\"><img src=\"../images/edit.png\"><span class=\"edit\">" + this.Content + "</span></p>";
            str += " </li>";
            i++;
            $("#feedList").append(str);
        });
        if (i == 0) {
            $(".finish").css("display", "none");
            iBlock = "block";
            hasSugg = true;
        }
        else {
            iBlock = "none";
            hasSugg = false;
            if ($("#another").hasClass("active")) {
                $(".notravel").css("display", "none");
            }
        }

    }
    else {
        $.easyErrorBox(json.Message);
    }
};
$(document).ready(function () {

    GetFeedbackList();
    $("#first").click(function () {
        $(".notravel").css("display", "none");
    });
    $("#another").click(function () {
        if (!hasSugg) {
            iBlock = "none";
        }

        if ($(".finish li").length > 0) {
            iBlock = "none";
        }
        $(".notravel").css("display", iBlock);
    });

    //字数变化
    $("#wordNum").html("200");
    $("#content").keyup(function () {
        var num = 200 - parseInt($(this).attr("value").length);
        
        if (num < 0) {
            $.easyErrorBox("反馈内容不能大于200个字符!");
            $(this).attr("value", $(this).attr("value").substring(0,200));
        }
        $("#wordNum").html(200 - parseInt($(this).attr("value").length));
    });

});
//提交建议
function DoSubmit() {
    var content = $("#content").val(); //textarea的内容
    if (content == "") {
        $.easyErrorBox("反馈内容必须填写!");
        return;
    }
    if (content.length > 200) {
        $.easyErrorBox("反馈内容不能大于200个字符!");
        return;
    }
    $.getJson({
        "ObjectName": "UserFeedback",
        "SubData":
                    {
                        "Content": content,
                        "userid": MIID

                    }
    },"get_UserFeedback" );
}
function GetFeedbackList() {

    $.getJson({
        "ObjectName": "GetUserFeedbackList",
        "OrderByData": [
                  {
                      "FieldName": "ID",
                      "Direction": "DESCENDING"
                  }
               ],
        "PagerData": {
            "CurrentPage": "1",
            "PageCount": "100"
        },
        "SearchData": [
                  {
                      "FieldName": "userid",
                      "FieldVal": MIID,
                      "Relation": "And",
                      "SearchMode": "Equal"
                  }
               ]
    },"get_GetUserFeedbackList");
}