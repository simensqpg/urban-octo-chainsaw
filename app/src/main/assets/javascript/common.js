var StringToDate = function (DateStr) {
    if (typeof DateStr == "undefined")
        return new Date();
    if (typeof DateStr == "date")
        return DateStr; 
        var converted = Date.parse(DateStr);
        var myDate = new Date(converted);
        if (isNaN(myDate)) {
            DateStr = DateStr.replace(/:/g, "-");
            DateStr = DateStr.replace(" ", "-");
            DateStr = DateStr.replace(".", "-");
            var arys = DateStr.split('-');
            switch (arys.length) {
                case 7: myDate = new Date(arys[0], --arys[1], arys[2], arys[3], arys[4], arys[5], arys[6]); break;
                case 6: myDate = new Date(arys[0], --arys[1], arys[2], arys[3], arys[4], arys[5]); break;
                default: myDate = new Date(arys[0], --arys[1], arys[2]); break;
            };
        };
        return myDate; 
  }
    function ReturnBackUrl(url) {
      var isBook = $.getUrlVar("isBook");
      var backUrl = url;
      if (isBook != null && isBook == 1) {
          backUrl = url + "?isBook=" + isBook;
      }
      location.href = backUrl;
  }
  function cutString(str, length) {
      if (str.length > length) {
          str = str.substr(0, length) + "...";
      }
      return str;
  }
function ChkUser() {
    var isLogin = $.getTicketMIID() ;
    if (isLogin != null) {
        return true;
    }
    else {
        return false;
    }
}
function ConverTime(date, type) {
    //alert(date);
    var date1;
    if (date == "cur") {
        date1 = new Date();
    } else {
        date1 = StringToDate(date.replace("T", " "));  //开始时间
    }
    switch(type)
    {
        case 1:
            m = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate();
            break;
        case 2:
            var week = date1.getDay();
            if (week == 0) {
                m = "周日";
            }
            if (week == 1) {
                m = "周一";
            }
            if (week == 2) {
                m = "周二";
            }
            if (week == 3) {
                m = "周三";
            }
            if (week == 4) {
                m = "周四";
            }
            if (week == 5) {
                m = "周五";
            }
            if (week == 6) {
                m = "周六";
            }
            break;
        case 3:
            var sMinutes = date1.getMinutes();
            if (sMinutes == "0") {
                sMinutes = "00";
            }
            else if (sMinutes <10) {
                sMinutes = "0" + sMinutes;
            }
            m = date1.getHours() + ":" + sMinutes;
            break;
        case 4:
            m = date1.getFullYear() + "年" + (date1.getMonth() + 1) + "月" + date1.getDate()+"日";
            break;
        case 5:
            var sMinutes = date1.getMinutes();
            if (sMinutes == "0") {
                sMinutes = "00";
            }
            else if (sMinutes < 10) {
                sMinutes = "0" + sMinutes;
            }

            var sSecond = date1.getSeconds();
            if (sSecond == "0") {
                sSecond = "00";
            }
            else if (sSecond < 10) {
                sSecond = "0" + sSecond;
            }
            m = date1.getHours() + ":" + sMinutes + ":" + sSecond;
            break;
    }
    
    return m;
}
function GetRandom(n) {
    return Math.floor(Math.random() * n + 1)
}
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
 (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
 RegExp.$1.length == 1 ? o[k] :
 ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}

function showUsedDate(value1, value2) {

    var getDate = function (str) {
        var tempDate = new Date(str);
//        var list = str.split("-");
//        tempDate.setFullYear(list[0]);
//        tempDate.setMonth(list[1] - 1);
//        tempDate.setDate(list[2]);
        return tempDate;
    }
    var date1 = getDate(value1);
    var date2 = getDate(value2);
    if (date1 > date2) {
        var tempDate = date1;
        date1 = date2;
        date2 = tempDate;
    }
    var list = new obj();
    //date1.setDate(date1.getDate() + 1);
    var curDate= new Date();
    //如果是同一天时间
    if (date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate()) {
        //        document.write("<div style='display:block'>" + date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate() + "</div>");
        //        date1.setDate(date1.getDate() + 1);
        //判断是否为全天
        var hours = parseFloat((date2.getTime() - date1.getTime()) / 1000 / 60 / 60);

        if (hours >= 23.8) {
            list.add(date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate(), "UnUsed");
        }
        else if (date2.getHours() < 24 || curDate.getHours() < date1.getHours()) {
            list.add(date1.getFullYear() + "-" + (date1.getMonth()+1) + "-" + date1.getDate(), "Part");
            //return "{\"UsedDate\":}";
        }
        else {
            list.add(date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate(), "All");
        }
    }
    else { //如果不是同一天
       
       var i=0;
       while (!(date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate())) {
           i++;
           // list.add(date1.getFullYear() + "-" + date1.getMonth() + "-" + date1.getDate(), "Part");
           //设置当天最大时间
           var maxDate = new Date(date1.getFullYear(), (date1.getMonth()), date1.getDate(), "23", "59","59");
           var hours = parseFloat((maxDate.getTime() - date1.getTime()) / 1000 / 60 / 60);
           //debugger;
           //判断是否为全天
           if (hours >= 23.8&&i>1) {
               list.add(date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate(), "UnUsed");
           }
           else if (date1 < maxDate || curDate.getHours() < date1.getHours()) {
               list.add(date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate(), "Part");
               //return "{\"UsedDate\":}";
           }
           else {
               list.add(date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate(), "All");
           }
           date1.setDate(date1.getDate() + 1);
           //var newDate = date1.getFullYear() + "-" + date1.getMonth() + "-" + date1.getDate() + " 00:00";
           //设置第二天最小时间
           date1 =new Date(date1.getFullYear(), (date1.getMonth()), date1.getDate(),"0","0","0");
           if (i > 10) {
               break;
           }
           //            document.write("<div style='display:block'>" + date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate() + "</div>");
           //            date1.setDate(date1.getDate() + 1); 
       }
       var j = 0;
        while ((date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate())) {
            j++;
            var hours = parseFloat((date2.getTime() - date1.getTime()) / 1000 / 60 / 60);

            if (hours >= 23.8) {
                list.add(date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate(), "UnUsed");
            }
            else if (date2.getHours() < 24) {
                list.add(date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate(), "Part");
            }
            break;
        }
    }
    return list;
}
function obj() {
    this.content = new Array();
    this.add = function (key, value) {
        this.content[this.content.length] = new Array(key, value);
    }
//    this.show = function () {
//        for (var i = 0; i < this.content.length; i++) {
//            alert(this.content[i][0] + "," + this.content[i][1]);
//        }
//    }
}  
//创建时间列表，向后
//n:向后的天数，不包含当天
//type:类型，week代表星期，day代表日期
function CreateDate(n, type) {

    var curDate = new Date();
    var list = new obj();
    if (type == "week") {
        list.add(curDate.getFullYear() + "-" + (curDate.getMonth() + 1) + "-" + curDate.getDate(), ChangeToWeek(curDate.getDay()));
        //str += ChangeToWeek(curDate.getDay());
    }
    else {
        //str += curDate.getDate();
        list.add(curDate.getFullYear() + "-" + (curDate.getMonth() + 1) + "-" + curDate.getDate(), curDate.getDate());
    }
    for (var i = 0; i < n; i++) {
        curDate.setDate(curDate.getDate() + 1);
        if (type == "week") {
            list.add(curDate.getFullYear() + "-" + (curDate.getMonth() + 1) + "-" + curDate.getDate(), ChangeToWeek(curDate.getDay()));
            //str += "," + ChangeToWeek(curDate.getDay());
        } else {
            list.add(curDate.getFullYear() + "-" + (curDate.getMonth() + 1) + "-" + curDate.getDate(), curDate.getDate());
            //str += "," + curDate.getDate();
        }
        //str += "," + curDate.getDate();
    }
    return list;
}
function ChangeToWeek(week) {
    switch (week) {
        case 0:
            m = "日";
            break;
        case 1:
            m = "一";
            break;
        case 2:
            m = "二";
            break;
        case 3:
            m = "三";
            break;
        case 4:
            m = "四";
            break;
        case 5:
            m = "五";
            break;
        case 6:
            m = "六";
            break;
    }
    return m;
}

var layerObj = {
    advanceSear: function () {
        var _this = this;
        if ($('#advanceSear')) {
            //筛选
            $('#advanceSear').click(function () {
                $('#advanLayer').css('display', 'block');  //筛选弹出层
                $('#advanLayerCon').animate({ right: '0' });
                $('#screen li').removeClass('active');
            });
            $('#advanLayer').find('button').click(function () {

                $('#advanLayerCon').animate({ right: '-87.5%' }, function () {
                    $('#advanLayer').css('display', 'none');
                });
                $('#selectList4 .select_content').each(function (i) {
                    var value = null;
                    if ($(this).find('li.active').length != 0) {
                        value = $(this).find('li.active span').attr('value');
                    }
                    switch (i) {
                        case 0: screenObj.advanScreen.geer = value; break;
                        // case 1: screenObj.advanScreen.brand = value; break;
                        case 1: screenObj.advanScreen.price = value; break;
                    }
                });
                // screenObj.advanScreen.geer
                console.log(screenObj.advanScreen);
                GetCarList();
            });
            $('#advanLayer').click(function (e) {
                if (e.target.id == 'advanLayer')
                    $('#advanLayerCon').animate({ right: '-87.5%' }, function () {
                        $('#advanLayer').css('display', 'none');
                    });
            });
        }

    }

}

$(document).ready(function () {
    layerObj.advanceSear();
});