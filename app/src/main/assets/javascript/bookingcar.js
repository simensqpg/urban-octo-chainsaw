$(document).ready(function () {
//    $.deleteSessionCache('getBookCarTime');
//    $.deleteSessionCache('backBookCarTime');
    $("#js_StartDate").click(function () {
        window.location.href = "./bookdate.htm?type=get&oldtime=" + $(this).text();
    });
    $("#js_EndDate").click(function () {
        window.location.href = "./bookdate.htm?type=back&oldtime=" + $(this).text();
    });
    if ($.getSessionCache('getBookCarTime')) {
        $("#getDate").text($.getSessionCache('getBookCarTime'));
        if ($.getSessionCache('backBookCarTime')) {
            var newback = $.getMicroTime($.getSessionCache('getBookCarTime')) + 0.5 * 60 * 60 * 1000;
            newback = $.getNormalTime(newback);
            if ($.getMicroTime($.getSessionCache('backBookCarTime')) <= $.getMicroTime(newback)) {
                $.easyError('租车时间必须在半小时以上', function () {
                    $("#backDate").text('');
                    $.deleteSessionCache('backBookCarTime');
                });
            }
        }
    }
    if ($.getSessionCache('backBookCarTime')) {
        $("#backDate").text($.getSessionCache('backBookCarTime'));
        var counttime = $.countTime($.getSessionCache('getBookCarTime'), $.getSessionCache('backBookCarTime'));
        $('#jscounttime').text(counttime.day + '天' + counttime.hour + '时' + counttime.min + '分');
    }
    $("#btnGoBook").click(function () {
        window.location.href = "./list.htm?isBook=1";
    });
});