

function ifcoupon() {
    if ($("#ifcoupon").parent().hasClass("active")) {
        $("#ifcoupon").parent().removeClass("active");
        $("#ifcoupon").attr("checked", false);
    } else {
        $("#ifcoupon").parent().addClass("active");
        $("#ifcoupon").attr("checked", true);
        $("#couponlist .checkRadio").removeClass("active").children("input").attr("checked", false); ;
    }
    
}

 