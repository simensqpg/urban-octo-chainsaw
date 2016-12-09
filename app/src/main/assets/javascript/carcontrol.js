$(document).ready(function () {

    $("#btnOpenCarDoor").click(function () {
        //$.easyErrorBox("该功能暂未开通，敬请期待！");
        $(this).children("img").attr("src", "../images/opendoor_a.jpg")
        $.getJson({
            "ObjectName": "SendSMSOprenCarDoor",
            "SubData": {
                "CarID": $.getSessionCache('CurrentCarID'),
                "CreateUser": $.getTicketMIID(),
                "CmdSource": "1"
            }
        },
         'get_OprenCarDoor');
    });

    $("#btnCloseCarDoor").click(function () {
        //$.easyErrorBox("该功能暂未开通，敬请期待！");
        $(this).children("img").attr("src", "../images/closedoor_a.png")
        $.getJson({
            "ObjectName": "SendSMSCloseCarDoor",
            "SubData": {
                "CarID": $.getSessionCache('CurrentCarID'),
                "CreateUser": $.getTicketMIID(),
                "CmdSource": "1"
            }
        },
         'get_CloseCarDoor');
    });

//    $("#btnCloseCarDoor").click(function () {
//        //$.easyErrorBox("该功能暂未开通，敬请期待！");
//    });

});

var get_OprenCarDoor = function (json) {
    $.easyErrorBox(json.Message);
    $("#btnOpenCarDoor").children("img").attr("src", "../images/opendoor_b.jpg")
}

var get_CloseCarDoor = function (json) {

    $.easyErrorBox(json.Message);
    $("#btnCloseCarDoor").children("img").attr("src", "../images/closedoor_b.png")
}
//function touchimg(id, img1, img2) {
//    var obj = document.getElementById(id);
//    obj.addEventListener('touchstart', function (event) {
//        // 如果这个元素的位置内只有一个手指的话
//        if (event.targetTouches.length == 1) {
//            event.preventDefault(); // 阻止浏览器默认事件，重要 
//            var touch = event.targetTouches[0];
//            // 把元素放在手指所在的位置
//            obj.getElementsByTagName("img").src = img2;
//        }
//    });
//    obj.addEventListener('touchend', function (event) {
//        // 如果这个元素的位置内只有一个手指的话
//        if (event.targetTouches.length == 1) {
//            event.preventDefault(); // 阻止浏览器默认事件，重要 
//            var touch = event.targetTouches[0];
//            // 把元素放在手指所在的位置

//            obj.getElementsByTagName("img").src = img2;
//        }
//    });   
//}