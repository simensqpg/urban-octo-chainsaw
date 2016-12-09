//alert(CreateDate(6));
var isBook = $.getUrlVar("isBook");
var VIID = $.getUrlVar("VIID");
var VMID = $.getUrlVar("VMID");
var UnitePriceMM = unescape($.getUrlVar("UnitePriceMM"));
$(document).ready(function () {
    $('#jsdate').click(function () {
        window.location.href = "./canorder.htm";
    });

    //详细按钮点击事件
    //$('#carDetailBtn').click(function () {
        //if ($('#carListDetail').css('opacity') == '0') {
    $('#carDetailBtn').addClass('active');
    $('#carDetailBtn').find('.carDeArrow').show();
            $('#carListDetail').css("opacity", "1");
            $('#map').hide();
//        }
//        else {
//            $(this).removeClass('active');
//            $(this).find('.carDeArrow').hide();
//            $('#carListDetail').css("opacity", "0");
//            $('#map').show();
//        }
    //})


    var strweek = CreateDate(6, "week");
    for (var i = 0; i < strweek.content.length; i++) {
        $("#usedWeek").append("<td>" + strweek.content[i][1] + "</td>");
    }
    var strday = CreateDate(6, "day");
    for (var i = 0; i < strday.content.length; i++) {
        $("#usedDate").append("<td id=\"" + strday.content[i][0] + "\">" + strday.content[i][1] + "</td>");
    }


    GetCarInfo(VIID);

    //提交订单
    $('#jssub').click(function () {
        //判断用户是否登录，如果没有登录则跳转到登录页面
        var isLogin = $.getTicketMIID();
        if (isLogin != null) {
            var url = "submitorder.htm?VMID=" + VMID + "&VIID=" + VIID + "&UnitePriceMM=" + UnitePriceMM;
            if (isBook != null && isBook == 1) {
                url += "?isBook=" + isBook;
            }
            //需要判断用户的押金是否大于等于500
            $.getJson({
                "ObjectName": "GETUSERINFO",

                "SearchData": [
              {
                  "FieldName": "MIID",
                  "FieldVal": $.getTicketMIID(),
                  "Relation": "And",
                  "SearchMode": "Equal"
              }
           ]
            }, "get_GETUSERINFO");

        }
        else {
            var url = "login.htm?phttp=submitorder&Param=VMID+" + VMID + ";VIID+" + VIID + ";UnitePriceMM+" + UnitePriceMM;
            if (isBook != null && isBook == 1) {
                url += "&isBook=" + isBook;
            }
            window.location.href = url;
        }
    });
    $("#carAddress").click(function () {
        window.location.href = "./map.htm?OrgID=12";
    });

});

function GetCarInfo(VIID) {
    var date = new Date();
    var week = date.getDay();
    var t = "基础价格";
    if (week == 0 || week == 6) {
        t = "周末价格";
    }
    var cityId = $.getSessionCache('curCityId');
    if (!cityId) {
        cityId = 2;
    }
    $.getJson({
        "ObjectName": "CARINFO",

        "SearchData": [
                    {
                        "FieldName": "VIID",
                        "FieldVal": VIID,
                        "Relation": "And",
                        "SearchMode": "Equal"
                    }, 
                    {
                        "FieldName": "OrgID",
                        "FieldVal": cityId,
                        "Relation": "And",
                        "SearchMode": "Equal"
                    },
                  {
                      "FieldName": "VMID",
                      "FieldVal": VMID,
                      "Relation": "And",
                      "SearchMode": "Equal"
                  },
                  {
                      "FieldName": "PriceTypeName",
                      "FieldVal": t,
                      "Relation": "And",
                      "SearchMode": "Equal"
                  },
                  {
                      "FieldName": "PTCID",
                      "FieldVal": "1,2",
                      "Relation": "And",
                      "SearchMode": "In"
                  }
               ]
    }, "get_CarInfo");
}

var get_CarInfo = function (json) {

    if (json.Data != null) {
        json = json.Data;
        var str = json.PlateNo;
        var plateno = str.substring(0, 2) + "***" + str.substring(5, str.length);
        $('#ModelName').html(json.ModelName + " <font style='font-size:0.8em;'>" + plateno + "</font>");
        $('#Passengers').text(json.Passengers);
        $('#AtmtName').text(json.ATMT);
        $('#fuelTypeName').text(json.FuelTypeName);

        $("#PowerQu").text(json.PowerQuantity.toFixed(1) + "%");

        $('#UnitePrice').text(UnitePriceMM);
        $("#Canmil").text(parseInt(json.CanMil) + "km");
        $("#carAddress").text(json.Address);

        get_CARUSEDDATEXML(json.VUsed);

        get_COMMENTLIST(json.CommentList);

        get_PriceListDetail(json.PriceList);

       // map.loadMap(json.Longitude, json.Latitude);
        $(".rentPrice").click(function () {
            location.href = "pricelist.htm?VMID=" + VMID + "&VIID=" + VIID + "&UnitePriceMM=" + UnitePriceMM;
        })
        $("#commentTitle").click(function () {
            location.href = "commentdetails.html?VMID=" + VMID + "&VIID=" + VIID + "&UnitePriceMM=" + UnitePriceMM;
        })
    }
}


//获取不可租时间
var get_CARUSEDDATEXML = function (json) {
    //if (json == true) {
        var str = json;
        $('.middle').each(function (i) {
            $.createHour(this, str);
        });
//    }
//    else {
//        $.easyErrorBox(json.Message);
//    }
}
////需要判断用户的押金是否大于等于500
var get_GETUSERINFO = function (json) {
    var url = "submitorder.htm?VMID=" + VMID + "&VIID=" + VIID + "&UnitePriceMM=" + UnitePriceMM;
    if (isBook != null && isBook == 1) {
        url += "?isBook=" + isBook;
    }
    if (json.IsSuccess == true) {
        var cInfo = json.Data;
        if (cInfo.IsEnabled == null || cInfo.IsEnabled == false) {
            $.easyErrorBox("我们正在审核您的会员资料，将尽快为您办理!");
        }
        else {
            if (cInfo.Balance >= 500) {
                window.location.href = url;
            }
            else {
                $.easyErrorBox("押金不足!");
            }
        }
    }
}

//
var get_PriceListDetail = function (json) {
    if (!json) {
        return;
    }
    if (json.length >=0) {
        //$('#priceDetail').append("<img src=\"../images/de_spread.png\" class=\"fr\">");
        $.packing(json).each(function () {
            //var str = "";
            //var img = "";
            if (this.PTCID == 1) {
                //img = "day.png";
                $("#dayUnit").html(this.UnitPriceMM.toFixed(1));
                $("#dayUnitDW").html(this.PriceTimeUnitMM);
            }
            else {
                $("#nightUnit").html(this.UnitPriceMM.toFixed(1));
                $("#nightUnitDW").html(this.PriceTimeUnitMM);
                //img = "night.png";
            }
            //str += "<p><img src=\"../images/" + img + "\"><span class=\"text\">" + this.TimeName + "：￥</span><span class=\"orange\">" + this.UnitPrice.toFixed(1) + "</span><span class=\"text\">/" + this.PriceTimeUnit + "</span></p>";
            //$('#priceDetail').append(str);
        });
    }
    else {
        $.easyErrorBox(json.Message);
    }
}

var get_COMMENTLIST = function (json) {
    if (!json) {
        return;
    }
    if (json.length >= 0) {
        var scoreCount = 0;
        var scoreAvg = 0;
        var i = 0;
        $.packing(json).each(function () {
            i++;
            scoreCount = this.SCount;
            scoreAvg = this.SorceAvg;
            var str = "";
            str += "                    <li>";
            str += "<div class=\"score\"><span class=\"green\"><span class=\"scoreNo\">" + this.Score + "</span>分</span><span class=\"text\"><span class=\"comDate\">" + ConverTime(this.CommentTime, 1) + "</span><span class=\"comCarType\">" + this.CarName + "</span></span> <span class=\"from\">来自 " + this.MIIDName + "</span></div>  ";
            str += " <p class=\"con\">" + this.Comment + "</p>";
            str += "</li>";

            $('#commentList').append(str);
        });
        $("#commentCount").text("(" + scoreCount + ")");

        if (scoreAvg > 4) {
            $("#starSpan").attr("class", "star5");
        }
        else if (3 < scoreAvg && scoreAvg <= 4) {
            $("#starSpan").attr("class", "star4");
        }
        else if (2 < scoreAvg && scoreAvg <= 3) {
            $("#starSpan").attr("class", "star3");
        }
        else if (1 < scoreAvg && scoreAvg <= 2) {
            $("#starSpan").attr("class", "star2");
        }
        else if (0 < scoreAvg && scoreAvg <= 1) {
            $("#starSpan").attr("class", "star1");
        }
        else {
            $("#starSpan").attr("class", "star0");
        }
    }
    else {
        $.easyErrorBox(json.Message);
    }
}