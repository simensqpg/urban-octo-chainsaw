var chkuser = ChkUser();
if (!chkuser) {
    location.href = "login.htm?phttp=wisdomtravel";
}
function doRefresh() {
    $.getJson({
        "ObjectName": "ORDERLIST",
        "OrderByData": [
                      {
                          "FieldName": "GetTime",
                          "Direction": "Asc"
                      }
                   ],
        "PagerData": {
            "CurrentPage": "1",
            "PageCount": "1"
        },
        "SearchData": [
                  {
                      "FieldName": "OrderStatus",
                      "FieldVal": "12200010,12200040",
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
    }, "get_CarStatus");

}
var get_CarStatus = function (json) {

    if (json.IsSuccess == true) {
        if (json.Data != null && json.Data != "") {
            $.packing(json.Data).each(function () {

                $("#mil").text(this.Mileage + "km");
                $("#power").text(this.PowerQuantity.toFixed(1) + "%");
                $("#canMil").text(parseInt(this.CanMil) + "km");
            });
        }
        else {
            $("#div_NotEmptyData").css("display", "none");
            $("#div_EmptyData").css("display", "block");
        }
    }
}

var get_OrderList = function (json) {
    console.log(json);
    if (json.IsSuccess == true) {

        if (json.Data != null && json.Data != "") {
            $.packing(json.Data).each(function () {
                $("#power").text(this.PowerQuantity.toFixed(1) + "%");
                $("#canMil").text(parseInt(this.CanMil) + "km");
                $("#js_PlateNo").text(this.PlateNo);
                //$("#ModelName").text(this.ModelName + " " + this.ATMT);
                $("#mil").text(this.Mileage + "km");
                /*$("#power").text(this.OilStoringQuantity + "%");
                $("#canMil").text(this.CanMil + "km");
                */
                $("#getCarDate").text("取车　" + ConverTime(this.GetTime, 1) + "　" + ConverTime(this.GetTime, 2));
                $("#getCarTime").text(ConverTime(this.GetTime, 5));
                $("#js_GetTime").attr("value", this.GetTime);

                $("#js_OrderStatus").attr("value", this.OrderStatus);
                if (this.OrderStatus == '12200040') {
                    $("#js_YiQuCHe").css("display", "block");
                    $("#js_YiQuCHe").text(ConverTime(this.RealGetTime, 5) + "  已取车");
                    $("#btnOpenCarDoor").css("display", "none");
                }
                else {
                    $("#js_YiQuCHe").css("display", "none");
                    $("#btnOpenCarDoor").css("display", "block");
                }
                if (this.OrderStatus == '12200050') {
                    $("#js_YiHuanCHe").css("display", "block");
                    $("#js_YiHuanCHe").text(ConverTime(this.RealReturnTime, 5) + "  已还车");
                    $("#btnCloseCarDoor").css("display", "none");
                }
                else {
                    $("#js_YiHuanCHe").css("display", "none");
                    $("#btnCloseCarDoor").css("display", "block");
                }
                $("#js_OrderID").attr("value", this.OrderID);
                $.setSessionCache('CurrentCarID', this.VIID);
                $("#backCarDate").text("还车　" + ConverTime(this.ReturnTime, 1) + "　" + ConverTime(this.ReturnTime, 2));
                $("#backCarTime").text(ConverTime(this.ReturnTime, 5));
                $("#js_ReturnTime").attr("value", this.ReturnTime);
            });
            $("#div_NotEmptyData").css("display", "block");
            $("#div_EmptyData").css("display", "none");
        }
        else {
            $("#div_NotEmptyData").css("display", "none");
            $("#div_EmptyData").css("display", "block");
        }
    }

}

$(document).ready(function () {

    $.getJson({
        "ObjectName": "ORDERLIST",
        "OrderByData": [
              {
                  "FieldName": "GetTime",
                  "Direction": "Asc"
              }
           ],
        "PagerData": {
            "CurrentPage": "1",
            "PageCount": "1"
        },
        "SearchData": [
          {
              "FieldName": "OrderStatus",
              "FieldVal": "12200010,12200040",
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
    }, 'get_OrderList');


    $("#jsCarControl").click(function () {
        var sState = $("#js_OrderStatus").attr("value");
        var sMIID = $.getTicketMIID();
        if (sState == '12200010') {
            $.easyErrorBox("订单还未取车，不能做车控操作！");
            return (false);
        }
        if (sState > 12200040) {
            $.easyErrorBox("订单已还车，不能做车控操作！");
            return (false);
        }

        window.location.href = './carcontrol.htm';
    });

    $("#btnOpenCarDoor").click(function () {
       
        var sState = $("#js_OrderStatus").attr("value");

        if (sState == "12200040") {
            $.easyErrorBox("订单已提车，不能重复操作！");
        }
        else {
            $('#btnControlCarLayer').show();
            $('#btnControlCarLayer').find('.pickUp').show();
        }
    });

    $("#btnCloseCarDoor").click(function () {
        var sState = $("#js_OrderStatus").attr("value");
        if (sState != "12200040") {
            $.easyErrorBox("订单还未取车，请先开门取车！");
            return (false);
        }
        else {
            if (sState > 12200040) {
                $.easyErrorBox("订单已还车，不能重复操作！");
            }
            else {
                $('#btnControlCarLayer').show();
                $('#btnControlCarLayer').find('.dropOff').show();
            }
        }
    });

    $("#btnGetCar").click(function () {
        var sOrderId = $("#js_OrderID").attr("value");
        $.getJson({
            "ObjectName": "UpdateOrderByTakeCarInfo",
            "SearchData": [
                  {
                      "FieldName": "OrderId",
                      "FieldVal": sOrderId,
                      "Relation": "And",
                      "SearchMode": "Equal"
                  }
                    ]
        }, 'get_UpdateOrderByTakeCarInfo');
    });
    //确定换车锁门，发送关门命令，判断命令是否执行成功，根据关门的状态进行操作，关门成功则更新订单状态，否则提示关门失败
    $("#btnReturnCar").click(function () {
        $.loadingStart("该过程可能需要一段时间,请耐心等待!");
        var sOrderId = $("#js_OrderID").attr("value");
        $.getJsonToPay({
            "ObjectName": "CloseCarDoorReturn",
            "SubData": {
                "CarID": $.getSessionCache('CurrentCarID'),
                "OrderID": sOrderId,
                "CommandName": "Lock",
                "WakupCount": 0,
                "CommandRetryCount": 0,
                "CreateUser": $.getTicketMIID()
            }
        }, 'get_CommandCloseCarReturn');
       
    });

    $('.layerBox .close').click(function () {
        $('.wisdomlayer').css('display', 'none');
    });

    $("#js_conditionreport").click(function () {
        var sPlateNo = $("#js_PlateNo").text();
        var orderId = $("#js_OrderID").val();
        window.location.href = './conditionreport.htm?PlateNo=' + sPlateNo + '&carId=' + $.getSessionCache('CurrentCarID') + '&orderId=' + orderId;
    });

    //自动聚焦
    $("#valiCode input").keyup(function () {
        var length = $(this).val().length;
        if (length == "1") {
            $(this).parents('li').next().find('input').focus();
        }
    })
});
var returnCommandId = 0;
var get_CommandCloseCarReturn = function (json) {
    $('.wisdomlayer').css('display', 'none');
    if (json.IsSuccess == true) {
        if (json.Data == "IsReturned") {
            $.easyErrorBox(json.Message, function () {
                window.location.href = './ordersettlement.htm?OrderID=' + $("#js_OrderID").attr("value");
            }, true);
        }
        else {
            returnCommandId = json.Data;
            GetCloseCarCommand(json.Data);
        }
    }
    else {
        $.loadingEnd();
        $.easyErrorBox("关门失败,失败原因:网络错误!请联系客服<a class='phone' href='tel://400-968-1666'>400-968-1666</a>！", null, true);
    }
}

//获取关门命令的信息--------------------------------start
var timerCounts = 0;
function GetCloseCarCommand(commandId) {
    timerCounts++;
    $.getJsonToPay({
        "ObjectName": "GetCloseCarCommandEntity",
        "SearchData": [
                        {
                            "FieldName": "CommandID",
                            "FieldVal": commandId
                        }
                    ]
    }, 'get_CommandReturnInfo');
}

var get_CommandReturnInfo = function (json) {
    if (json.IsSuccess == true) {
        if (json.Data != null) {
            json = json.Data;
        }
        if (json.CommandResult == 100) {
            //更新订单
            //$.loadingEnd();
            var sOrderId = $("#js_OrderID").attr("value");
            $.getJson({
                "ObjectName": "UpdateOrderByReturnCarInfo",
                "SearchData": [
                                    {
                                        "FieldName": "CityOrgID",
                                        "FieldVal": $.getSessionCache('curCityId')
                                    },
                                  {
                                      "FieldName": "OrderId",
                                      "FieldVal": sOrderId,
                                      "Relation": "And",
                                      "SearchMode": "Equal"
                                  }
                                ]
            }, 'get_UpdateOrderByReturnCarInfo');
        }
        else {
            if (json.Data != null) {
                json = json.Data;
            }
            if (timerCounts > 5) {
                $.loadingEnd();
                $.easyErrorBox("关门失败,失败原因:" + json.Description + "!请重试或联系客服<a class='phone' href='tel://400-968-1666'>400-968-1666</a>！", null, true);
            }
            else {
                setTimeout(function () { GetCloseCarCommand(returnCommandId); }, 8000);
            }
        }
    }
    else {
        if (json.Data != null) {
            json = json.Data;
        }
        if (timerCounts > 5) {
            $.loadingEnd();
            $.easyErrorBox("关门失败,失败原因:" + json.Description + "请重试或联系客服<a class='phone' href='tel://400-968-1666'>400-968-1666</a>！", null, true);
        }
        else {
            setTimeout(function () { GetCloseCarCommand(returnCommandId); }, 8000);
        }
    }
}
//获取关门命令的信息--------------------------------end
var get_OprenCarDoor = function (json) {
    if (json.IsSuccess == true) {
        $('.wisdomlayer').css('display', 'none');
        $.easyErrorBox("取车成功！");
        window.location.reload();
    }
    else {
        $('.wisdomlayer').css('display', 'none');
        $.easyErrorBox("取车成功，但是开门失败，请联系客服！");
    }
}

var get_UpdateOrderByTakeCarInfo = function (json) {
    if (json.IsSuccess == true) {
        var sMIID = $.getTicketMIID();
        $.getJson({
            "ObjectName": "SendSMSOprenCarDoor",
            "SubData": {
                "CarID": $.getSessionCache('CurrentCarID'),
                "CreateUser": sMIID,
                "CmdSource": "1"
            }
        }, 'get_OprenCarDoor');
    }
    else {
        $('.wisdomlayer').css('display', 'none');
        $.easyErrorBox(json.Message);
    }
}

var get_CloseCarDoor = function (json) {
    if (json.IsSuccess == true) {
        $('.wisdomlayer').css('display', 'none');
        $.easyErrorBox("还车成功！");
        window.location.href = './ordersettlement.htm?OrderID=' + $("#js_OrderID").attr("value");
    }
    else {
        $('.wisdomlayer').css('display', 'none');
        $.easyErrorBox("还车成功，但是关门失败，请联系客服！");
    }
}

var get_UpdateOrderByReturnCarInfo = function (json) {
    if (json.IsSuccess == true) {
        $('.wisdomlayer').css('display', 'none');
        $.easyErrorBox("还车成功！");
        window.location.href = './ordersettlement.htm?OrderID=' + $("#js_OrderID").attr("value");
        //        var sMIID = $.getSessionCache('MIID');
        //        $.getJson(
        //        {
        //            "ObjectName": "SendSMSCloseCarDoor",
        //            "SubData": {
        //                "CarID": $.getSessionCache('CurrentCarID'),
        //                "CreateUser": sMIID,
        //                "CmdSource": "1"
        //            }
        //        }, 'get_CloseCarDoor'
        //        );
    }
    else {
        $('.wisdomlayer').css('display', 'none');
        $.easyErrorBox("关车成功，但订单处理失败，请联系客服！");
        //        $('.wisdomlayer').css('display', 'none');
        //        $.easyErrorBox(json.Message);
    }
}