$(document).ready(function () {
    var carId = $.getUrlVar("carId");
    var orderId = $.getUrlVar("orderId");
    GetCommentList(carId, orderId);
});
function GetCommentList(VIID, OrderID) {
    $.getJson({
        "ObjectName": "GetConditionReportList",
        "OrderByData": [
                  {
                      "FieldName": "ID",
                      "Direction": "Desc"
                  }
               ],
        "PagerData": {
            "CurrentPage": "1",
            "PageCount": "20"
        },
        "SearchData": [
                  {
                      "FieldName": "CarID",
                      "FieldVal": VIID,
                      "Relation": "And",
                      "SearchMode": "Equal"
                  }, {
                      "FieldName": "OrderID",
                      "FieldVal": OrderID,
                      "Relation": "And",
                      "SearchMode": "Equal"
                  }
               ]
              }, "get_GetConditionReportList");
}

var get_GetConditionReportList=function (json) {
    if (json.IsSuccess == true) {
                var scoreCount = 0;
                var i = 0;
                $.packing(json.Data).each(function () {
                    var str = "";
//                    <li>
//                    	<div class="left">
//                    		<p class="date">2015-01-22</p>
//                    		<p class="comment">车头右前方有油漆擦伤，面积不大</p>
//                    	</div>
//                    	<div class="right">
//                    		<button class="openlayer">查 看</button>
//                    	</div>
//                    </li>
                    str += "<li>";
                    str += "<div class=\"left\">";
                    str += "<p class=\"date\">" + ConverTime(this.CreateTime, 1) + "</p>";
                    str += " <p class=\"comment\">" +this.ConditionContent + "</p>";
                    str += "</div>";
//                    str += "<div class=\"right\"><button class=\"openlayer\">查 看</button></div>";
                    str += "</li>";
                    if (this.ConditionType == 1) {
                        $('#ulAppearance').append(str);
                    }
                    else {
                        $('#ulClear').append(str);
                    }
                });

            }
            else {
                $.easyErrorBox(json.Message);
            }
        };