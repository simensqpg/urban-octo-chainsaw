var chkuser = ChkUser();
if (!chkuser) {
    location.href = "login.htm?phttp=myschedule";
}
var myScheduleObj = {
    // 弹出层
    objLayer: function () {
        $('#myScheduleBtn .cancel').click(function () {
            $('#cancleFilter').show();
        })
    },
    cancel: function () {
        $('#cancleFilter .cancel').click(function () {

            $('#cancleFilter').hide();
        })
    },
    tab: function () {
        $('#tab .tab_btn a').click(function () {
            var index = $(this).index();
            $(this).addClass('active').siblings().removeClass('active');
            $('#tab .tab_content .tab_con_list').eq(index).show().siblings().hide();
        })
    }
}

$(document).ready(function () {
    doList("12200010", "notgetcar");
    doList("12200040,12200050,12200058,12200060,12200070", "orderList");
    doList("12200020,12200030", "CancelOrder");    
    doList("12200010,122000120,12200030,12200040,12200050,12200060,12200070", "nomsg");
    myScheduleObj.objLayer();
    myScheduleObj.cancel();
    myScheduleObj.tab();

});
function doList(status, id) {

    var funStr = "get_ORDERLISTNO";
    if (id == "notgetcar")
    { funStr = "get_ORDERLISTNO"; }
    else if (id == "CancelOrder") { funStr = "get_CancelOrder"; }
    else if (id == "nomsg") { funStr = "get_nomsg"; }
    else {funStr = "get_ORDERLIST";}

    $.getJson({
        "ObjectName": "ORDERLIST",
        "OrderByData": [
              {
                  "FieldName": "GetTime",
                  "Direction": "ASCENDING"
              }
           ],
        "PagerData": {
            "CurrentPage": "1",
            "PageCount": "1000"
        },
        "SearchData": [
          {
              "FieldName": "OrderStatus",
              "FieldVal": status,
              "Relation": "And",
              "SearchMode": "In"
          },
          {
              "FieldName": "MIID",
              "FieldVal": $.getTicketMIID(),
              "Relation": "And",
              "SearchMode": "Equal"
          }
       ]

      }, funStr);

}

//<a href='navigation.htm?SiteOrgID=" + SiteOrgID + "' class='navigation'>取车路线</a>
function statusName(status, orderid, carid, SiteOrgID) {
    var str = new Array();
    switch (status) {
        case 12200010:
            str = "<div class='btns'><a onclick='Cancelorder(" + orderid + "," + carid + ")' class='cancel'>取消</a><a onclick='SelfPickCar()' class='selfpickcar'>自助提车</a></div>"
            break;
        case 12200020:
            str = "";
            break;
        case 12200030:
            str = "";
            break;
        case 12200040:
            str = "<div class='btns'><a class='selfSserviceCar' onclick='SelfBackCar()'>自助还车</a></div>";
            break;
        case 12200050:
            str = "<div class='btns'><a class='navigation' onclick='Settle(" + orderid + ")'>结算</a></div>";
            break;
        case 12200058:
            str = "<div class='btns'><a class='navigation' onclick='Settle(" + orderid + ")'>结算</a></div>";
            break;
        case 12200060:
            str = "<div class='btns'><a onclick='GoComment(" + orderid + "," + carid + ")' class='modify goToComment'>评价</a></div>";
            break;
        case 12200070:
            str = "";
            break;

    }
    return str;
}

function Cancelorder(OrderID, CarId) {//取消订单
    var cancel="";
    cancel += "<div class='cancleFilter' id='cancleFilter'>";
    cancel += "<div class='cancleLayer'>";
    cancel += "<p class='title'>确定取消</p>";
    cancel += "<p class='txt'>取消后需要重新下单，您确定要取消订单吗？</p>";
    cancel += "<div class='btns'><a class='cancel' onclick='closeConfirm();'>取 消</a><a class='makeSure' onclick='cancel(" + OrderID + "," + CarId + ");'>确 定</a></div>";
    cancel += "</div></div>";
   $("body").append(cancel);

}
function closeConfirm() {
    $(".cancleFilter").hide();
}
var get_ORDERLISTNO = function (json) {//未提车
    if (json.IsSuccess == true) {
        console.log(json.Data);
        if (json.Data.length > 0) {
            $("#nomsg").attr("style", "display:none;");
            //$("#"+id).attr("style", "display:block;");
            var index = 1;
            $.packing(json.Data).each(function () {
                console.log(json.Data);
                var html = "";
                html += "<div class='myScheduleList'>";
                html += "<div class='title'><span class='carType'>" + this.ModelName + "</span><span class='valiStatus'>" + this.OrderStatusName + "</span><span class='price'>￥<span class='priceNo'>" + this.TotalAmt + "</span></span></div>";
                html += "<div class='listCon'>";
                html += "<p class='address'><img src='../images/myscheaddr.png' alt=''>" + cutString(this.Address, 18) + "</p>";
                html += "<p class='pickUpDate'><img src='../images/myschedate.png' alt=''>取车时间：" + ConverTime(this.GetTime, 1) + "　" + ConverTime(this.GetTime, 3) + "　" + ConverTime(this.GetTime, 2) + "</p>";
                html += "<p class='dropOffDate'><img src='../images/myschedate.png' alt=''>还车时间：" + ConverTime(this.ReturnTime, 1) + "　" + ConverTime(this.ReturnTime, 3) + "　" + ConverTime(this.ReturnTime, 2) + "</p>";
                html += statusName(this.OrderStatus, this.OrderID, this.VIID, this.SiteOrgID);
                html += "</div>";
                $("#notgetcar").append(html);

                $("#notgetcar .selfpickcar:not(:first)").hide(); //只保留第一个自助提车按钮


            });


        }
    }
}
var get_ORDERLIST = function (json) {//已完成列表

    if (json.IsSuccess == true) {
        console.log(json.Data);
        if (json.Data.length > 0) {
            $("#nomsg").attr("style", "display:none;");
            //$("#"+id).attr("style", "display:block;");
            var index = 1;
            $.packing(json.Data).each(function () {
                console.log(json.Data);
                var html = "";
                html += "<div class='myScheduleList'>";
                html += "<div class='title'><span class='carType'>" + this.ModelName + "</span><span class='valiStatus'>" + this.OrderStatusName + "</span><span class='price'>￥<span class='priceNo'>" + this.TotalAmt + "</span></span></div>";
                html += "<div class='listCon'>";
                html += "<p class='address'><img src='../images/myscheaddr.png' alt=''>" + cutString(this.Address, 18) + "</p>";
                html += "<p class='pickUpDate'><img src='../images/myschedate.png' alt=''>取车时间：" + ConverTime(this.GetTime, 1) + "　" + ConverTime(this.GetTime, 3) + "　" + ConverTime(this.GetTime, 2) + "</p>";
                html += "<p class='dropOffDate'><img src='../images/myschedate.png' alt=''>还车时间：" + ConverTime(this.ReturnTime, 1) + "　" + ConverTime(this.ReturnTime, 3) + "　" + ConverTime(this.ReturnTime, 2) + "</p>";
                html += statusName(this.OrderStatus, this.OrderID, this.VIID, this.SiteOrgID);
                html += "</div>";

                $("#orderList").append(html);


                if ($(".selfSserviceCar").is(':visible')) {//如果存在自助还车按钮，则隐藏所有的自助提车
                    $(".selfpickcar").hide();


                }



            });


        }
    }
    $("#orderList").hide();
}




//取消订单列表
var get_CancelOrder = function (json) {

    if (json.IsSuccess == true) {
        console.log(json.Data);
        if (json.Data.length > 0) {
            $("#nomsg").attr("style", "display:none;");
            //$("#"+id).attr("style", "display:block;");
            var index = 1;
            $.packing(json.Data).each(function () {
                console.log(json.Data);
                var html = "";
                html += "<div class='myScheduleList'>";
                html += "<div class='title'><span class='carType'>" + this.ModelName + "</span><span class='valiStatus'>" + this.OrderStatusName + "</span><span class='price'>￥<span class='priceNo'>" + this.TotalAmt + "</span></span></div>";
                html += "<div class='listCon'>";
                html += "<p class='address'><img src='../images/myscheaddr.png' alt=''>" + cutString(this.Address, 18) + "</p>";
                html += "<p class='pickUpDate'><img src='../images/myschedate.png' alt=''>取车时间：" + ConverTime(this.GetTime, 1) + "　" + ConverTime(this.GetTime, 3) + "　" + ConverTime(this.GetTime, 2) + "</p>";
                html += "<p class='dropOffDate'><img src='../images/myschedate.png' alt=''>还车时间：" + ConverTime(this.ReturnTime, 1) + "　" + ConverTime(this.ReturnTime, 3) + "　" + ConverTime(this.ReturnTime, 2) + "</p>";
                html += statusName(this.OrderStatus, this.OrderID, this.VIID, this.SiteOrgID);
                html += "</div>";
                $("#CancelOrder").append(html);



            });


        }
    }
}

//如果没有订单
var get_nomsg = function (json) {
    if (json.IsSuccess == true) {
        console.log(json.Data);
        if (json.Data.length == 0) {
            $("#nomsg").attr("style", "display:block;");
            // $("#" + id).attr("style", "display:none;");
            $("#notgetcar").attr("style", "display:none;");
            $("#orderList").attr("style", "display:none;");
            $("#CancelOrder").attr("style", "display:none;");


        }
    }
}

var get_DOCANCELORDER = function (json) {
    console.log(json.Data);
    if (json.IsSuccess == true) {
        $.easyErrorBox("订单已取消");
        $("#cancleFilter").hide();
        window.location.reload()
    } else {
        $.easyErrorBox(json.Message);
        $("#cancleFilter").hide();
    }
}
function Modifyorder(OrderID) {//修改订单
    location.href = "./list.htm?OrderID=" + OrderID;
}
function SelfBackCar() {//自助还车
    location.href = "./wisdomtravel.htm";
}
function SelfPickCar() {//自助提车
    location.href = "./wisdomtravel.htm";

}
function Settle(OrderID) {//结算
    window.location.href = './ordersettlement.htm?OrderID=' + OrderID;

}
function GoComment(OrderID, carId) {//去评价
    location.href = "./comment.htm?OrderID=" + OrderID + "&CarID=" + carId;
}
function cancel(OrderID, CarId) {
     $.getJson({
            "ObjectName": "DOCANCELORDER",
            "OrderByData": [
              {
                  "FieldName": "OrderID",
                  "Direction": "VUID"
              }
           ],
            "PagerData": {
                "CurrentPage": "1",
                "PageCount": "1"
            },
            "SearchData": [
          {
              "FieldName": "OrderID",
              "FieldVal": OrderID,
              "Relation": "And",
              "SearchMode": "In"
          },
          {
              "FieldName": "VIID",
              "FieldVal": CarId,
              "Relation": "And",
              "SearchMode": "In"
          }
        ]
        }, 'get_DOCANCELORDER')
 }