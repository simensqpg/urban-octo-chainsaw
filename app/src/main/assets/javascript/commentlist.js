var page = 1;
var totalpages = 1;
var request = true; //为真时才请求数据

$(document).ready(function () {
    var VIID = $.getUrlVar("VIID");
    GetCommentList(VIID);
    $(".loading").click(function () {
        page++;
        if (totalpages >= page) {
            GetCommentList(VIID);
        } else {
            $(".loading").css("display", "none");
            $.easyErrorBox("所有留言已加载");

        }
    })
});


function GetCommentList(VIID) {
    if (request) {
        request = false;//防止多次请求数据
        $.getJson({
            "ObjectName": "COMMENTLIST",
            "OrderByData": [
                  {
                      "FieldName": "CTID",
                      "Direction": "Desc"
                  }
               ],
            "PagerData": {
                "CurrentPage": page,
                "PageCount": "6"
            },
            "SearchData": [
                  {
                      "FieldName": "CarID",
                      "FieldVal": VIID,
                      "Relation": "And",
                      "SearchMode": "Equal"
                  },
                  {
                      "FieldName": "a.IsEnabled",
                      "FieldVal": 1,
                      "Relation": "And",
                      "SearchMode": "Equal"
                  }
               ]
           }, 'get_COMMENTLIST');
    }
    
    request = true; 
 }

 var get_COMMENTLIST = function (json) {
     if (json.IsSuccess == true) {
         $.packing(json.Data).each(function () {
             var Data = json.Data[0];
             totalpages = Math.ceil(Data.SCount / 6);
             var str = "";
             str += "<li class=\"list_item\">";
             str += "<div class=\"headPortrait\"><img src=\" " + Data.UserImg + " \" alt=\"\"></div>";
             str += "<div class=\"comment_main\"><p class=\"title\"><span class=\"score\"><span class=\"num\">" + Data.Score + "</span>&nbsp;分</span><span class=\"commentDate\">" + ConverTime(Data.CommentTime, 1) + "</span><span class=\"user\">来自&nbsp;<span class=\"name\">" + Data.MIIDName + "</span></span></p>";
             str += "<div class=\"commentTxt\">" + Data.Comment + "</div></div>";
             str += "</li>";
             $('#appraise').append(str);
         });
     }
     else {
         $.easyErrorBox(json.Message);
     }



 }