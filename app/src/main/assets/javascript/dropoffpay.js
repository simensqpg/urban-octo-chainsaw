var orderId = $.getUrlVar("orderId");
var orderAMT = $.getUrlVar("orderAMT");
var payway;
$(document).ready(function () {
    $("#deposit").html(orderAMT);
})
function payMemDeposit() {
    
    if ($('.checkRadio1').hasClass('active')) {
        payway = "0";
    }
    if ($('.checkRadio2').hasClass('active')) {
        payway = "1";
    }
    $.getJson({
        "ObjectName": "MEMBERBALANCE",
        "SearchData": [
          {
              "FieldName": "PayWay",
              "FieldVal": payway,
              "Relation": "And",
              "SearchMode": "In"
          },
          {
              "FieldName": "OrderId",
              "FieldVal": orderId,
              "Relation": "And",
              "SearchMode": "Equal"
          },
          {
              "FieldName": "Balance",
              "FieldVal": orderAMT,
              "Relation": "And",
              "SearchMode": "Equal"
          }
       ]
      }, 'get_MEMBERBALANCE');
}


function DoSubmit() {
    payMemDeposit();
    
}

 var get_MEMBERBALANCE=function (json) {
                if (json.IsSuccess == true) {
                    window.location.href = './onlinepaysuccess.htm?Price=' + orderAMT;
                }
                else {
                    $.easyErrorBox(json.Message);
                }
            }