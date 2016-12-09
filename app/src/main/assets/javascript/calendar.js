$.nameSpace('AVIS', 'Calendar');
var cal = AVIS.Calendar = function () {

};
$.extend(cal, {
    cnMonth: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
    msg: {
        defaultYear: '',
        defaultMonth: '',
        curMonthDays: 0,
        firstDay: 0,
        thismonth: 0,
        thisyear: 0,
        today: '',
        callback: null
    },
    html: '<table width="100%" border="0" cellpadding="3" cellspacing="1" bgcolor="#cfcfcf">' +
					'<thead>' +
						'<tr><td colspan="7"><div class="title"><img class="leftbtn" src="../images/leftarrow_c.png"><span class="jstitle"></span><img class="rightbtn" src="../images/rightarrow_c.png"></div></td></tr>' +
						'<tr class="weeeks">' +
							'<td class="weeks" colspan="7">' +
								'<div class="weeks">' +
									'<div class="item weekend">周日</div>' +
									'<div class="item">周一</div>' +
									'<div class="item">周二</div>' +
									'<div class="item">周三</div>' +
									'<div class="item">周四</div>' +
									'<div class="item">周五</div>' +
									'<div class="item weekend">周六</div>' +
								'</div>' +
							'</td>' +
						'</tr>' +
					'</thead>' +
					'<tbody>' +
					'</tbody>' +
				'</table>',
    //如果time1>=time2 则返回TRUE，否则返回假 
    compareTime: function (time1, time2, timeformat) {
        //yyyy-mm-dd
        if (!timeformat || timeformat.indexOf(' ') < 0) {
            time1 = time1.split('-');
            time2 = time2.split('-');
            return ((new Date(time1[0], time1[1] - 1, time1[2])).getTime() >= (new Date(time2[0], time2[1] - 1, time2[2])).getTime()) ? true : false;
        }

    },
    initialize: function (con) {

        var mydate = new Date(),
        //年
			thisyear = this.msg.defaultYear == '' ? mydate.getFullYear() : parseInt(this.msg.defaultYear),
        //月 实际月份-1 因为从0开始
			thismonth = this.msg.defaultMonth == '' ? mydate.getMonth() : parseInt(this.msg.defaultMonth) - 1,
        //日
			thisday = mydate.getDate(),
        //星期几
			thisweekday = mydate.getDay(),
        //当前月份的总天数,这里thismonth+1 ,配合 0 表示上个月最后一天是几号
        //假设当前月是二月,则thismonth=1 1+1=2获取的是三月份的前一个月的最后一天的日期,也就是2月29号
			curMonthDays = new Date(thisyear, (thismonth + 1), 0).getDate(),
			preMonthDays = new Date(thisyear, thismonth, 0).getDate(),
        //获取当前月的 第一天所在的周的第几天
			firstDay = new Date(thisyear, thismonth, 1).getDay();
        this.msg.curMonthDays = curMonthDays;
        this.msg.firstDay = firstDay;
        this.msg.thismonth = thismonth;
        this.msg.thisyear = thisyear;
        this.msg.today = thisday;
        this.initDate(thismonth, thisyear, con);
    },
    checkFuture: function (month, year, firstDay, curMonthDays, preMonthDays, len) {
        /*	var mydate = new Date(),
        //年
        thisyear 	   = mydate.getFullYear(),
        //月 实际月份-1 因为从0开始
        thismonth 	   = mydate.getMonth();
        var first = year+'-'+month+'-'+(preMonthDays - firstDay+1),
        last  = year+'-'+(month+1)+'-'+(len - firstDay - curMonthDays);
        alert(firstDay);
        alert(first+'***'+last); */
    },
    initDate: function (thismonth, thisyear, con) {
        var tbody = con.find('tbody'),
			mydate = new Date(),
			_this = this,
        //年
			realyear = mydate.getFullYear(),
        //月 实际月份-1 因为从0开始
			realmonth = mydate.getMonth(),
        //日
			realday = mydate.getDate(),
        //星期几
			thisweekday = mydate.getDay(),
			curMonthDays = new Date(thisyear, (thismonth + 1), 0).getDate(),
			preMonthDays = new Date(thisyear, thismonth, 0).getDate(),
        //获取当前月的 第一天所在的周的第几天
			firstDay = new Date(thisyear, thismonth, 1).getDay();
        tbody.empty();
        var title = con.find('.jstitle'),
			thisyearcn = thisyear + '年' + (thismonth + 1) + '月',
			tbody = con.find('tbody'),
        //需要插入的TR的列数
			len = Math.ceil((curMonthDays - (7 - firstDay)) / 7) + 1,
			i = 0, j = 0, start = 0, start2 = 1, start3 = 0;
        title.text(thisyearcn);
        for (i; i < len; i++) {
            var otr = document.createElement('tr');
            for (var j = 0; j < 7; j++) {
                var otd = document.createElement('td');
                $(otr).append(otd);
            }
            tbody.append(otr);
        }
        var tds = tbody.find('td');
        tds.each(function (index) {
            if (index < firstDay) {
                $(this).text(preMonthDays - firstDay + 1 + start3);
                $(this).attr('targetMonth', 'premonth');
                if (thismonth == 0) {
                    datestr = (thisyear - 1) + '-' + '12' + '-' + (preMonthDays - firstDay + 1 + start3);
                }
                else {
                    datestr = thisyear + '-' + thismonth + '-' + (preMonthDays - firstDay + 1 + start3);
                }
                $(this).attr('date', datestr);
                start3++;
            }
            else if (index >= firstDay && index < firstDay + curMonthDays) {
                $(this).text(start + 1);
                $(this).attr('targetMonth', 'thismonth');
                $(this).addClass('future');
                datestr = thisyear + '-' + (thismonth + 1) + '-' + (start + 1);
                $(this).attr('date', datestr);
                start++;
            }
            else {
                $(this).text(start2);
                $(this).attr('targetMonth', 'nextmonth');
                if (thismonth == 11) {
                    datestr = (thisyear + 1) + '-' + '1' + '-' + (start2);
                }
                else {
                    datestr = thisyear + '-' + (thismonth + 2) + '-' + (start2);
                }
                $(this).attr('date', datestr);
                start2++;
            }
            $(this).click(function () {
                var date = $(this).attr('date');
                if (_this.compareTime(date, realyear + '-' + (realmonth + 1) + '-' + realday)) {
                    tds.each(function (z) {
                        {
                            if (z == index) { $(this).addClass('focus'); } else { $(this).removeClass('focus'); }
                        }
                    });

                    if ($.isFunction(_this.msg.callback)) {
                        _this.msg.callback.call(this);
                    }
                }

            });
        });
        tds.each(function () {
            var date = $(this).attr('date');
            if (date == realyear + '-' + (realmonth + 1) + '-' + realday) {
                $(this).addClass('today');
            }
        });
    },
    eventConstruct: function (con) {
        var left = con.find('.leftbtn'),
			right = con.find('.rightbtn'),
			_this = this;
        left.click(function () {
            var thismonth = _this.msg.thismonth;
            if (thismonth == 0) {
                thismonth = _this.msg.thismonth = 11;
                thisyear = --_this.msg.thisyear;
            }
            else {
                thismonth = --_this.msg.thismonth;
                thisyear = _this.msg.thisyear;
            }
            _this.initDate(thismonth, thisyear, con);
        });
        right.click(function () {
            var thismonth = _this.msg.thismonth;
            //这里表示最后一个月，下一个月即将换年
            if (thismonth == 11) {
                thismonth = _this.msg.thismonth = 0;
                thisyear = ++_this.msg.thisyear;
            }
            else {
                thismonth = ++_this.msg.thismonth;
                thisyear = _this.msg.thisyear;
            }
            _this.initDate(thismonth, thisyear, con);
        });
    }
});
$.extend(cal.prototype, {
    //初始化
    initializeDate: function (obj) {
        $.extend(AVIS.Calendar.msg, obj);
        //console.log(AVIS.Calendar.msg);
    },
    createCalendar: function (con) {
        var con = $.packing(con),
			html = cal.html;
        con.append(html);
        cal.initialize(con);
        cal.eventConstruct(con);
    },
    addCallBack: function (callback) {
        if ($.isFunction(callback)) {
            cal.msg.callback = callback;
        }
    }
});