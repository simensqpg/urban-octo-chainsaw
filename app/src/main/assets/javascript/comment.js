var OrderID = $.getUrlVar("OrderID");
var CarID = "";
$(document).ready(function () {
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

    $.getJson({ "ObjectName": "GetOrderSettlementInfo", "SearchData": [{ "FieldName": "OrderId", "FieldVal": OrderID}] }, 'get_GetOrderSettlementInfo');

});
function DoSub() {
    var a1 = $('#click1 span').prop("className").substring(4, 5);
    var a2 = $('#click2 span').prop("className").substring(4, 5);
    var a3 = $('#click3 span').prop("className").substring(4, 5);
    var check = 0;
    var content = $("#content").val();
    if (a1 == "0") {
        $.easyErrorBox("请选择一个星级!");
        return false;
    }
    if (content == "") {
        $.easyErrorBox("请输入评价内容!");
        return false;
    }
    if ($(".checkbox input").attr("checked") == "checked") {
        check = 1;
     }
    var name = $("#name").val();
    $.getJson({
        "ObjectName": "CommentAdd",

        "SubData":
                    {
                        "CarID": CarID,
                        "OrderID": OrderID,
                        "MIID": $.getTicketMIID(),
                        "CommentType": "12100003",
                        "Score": a1,
                        "ScoreHygiene": a2,
                        "ScoreExperience": a3,
                        "Comment": content,
                        "IsEnabled": false,
                        "CreateUser": "",
                        "ModifyUser": "",
                        "IsAnonymous": check
                    }
                }, 'get_CommentAdd');
}

var get_GetOrderSettlementInfo = function (json) {

    console.log(json)
    if (json.IsSuccess == true) {
        
        var dataObj = json.Data;
        $("#js_brandimg").attr("src", "../upload/brand/" + dataObj.ProviderPic);
        $("#js_brandtitle").text(dataObj.ModelName + " " + dataObj.ATMT);
        $("#spanCreateTime").text(ConverTime(dataObj.CreateDate, 1) + " " + ConverTime(dataObj.CreateDate, 3));
        $("#spanPrice").text(dataObj.PaymentAmt.toFixed(2));
        CarID = dataObj.VIID;
    }
    else {
        $.easyErrorBox(json.Message);
    }
};

    var get_CommentAdd = function (json) {
        console.log(json);
        var Data = json.Data;
        if (json.IsSuccess == true) {
                        $.easyErrorBox("评价内容已经提交!");
                        window.location.href = 'myschedule.htm';

                    }
                    else {
                        $.easyErrorBox(Data.Message);
                    }
                }