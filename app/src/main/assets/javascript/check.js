var objCheck = {
    checkbox: function () {
        $(".checkbox").click(function () {
            if ($(this).children("input").attr("name")) {
                var name = $(this).children("input").attr("name");
                $(document).find("input[name='" + name + "']").parent(".checkbox").removeClass("active");
                $(document).find("input[name='" + name + "']").attr("checked", false);
                $(this).addClass("active");
                $(this).attr("checked", true);
            }
            else {
                if ($(this).hasClass("active")) {
                    $(this).removeClass("active");
                    $(this).children("input").attr("checked", false);
                }
                else {
                    $(this).addClass("active");
                    $(this).children("input").attr("checked", true);
                }
            }
        });
    },
    // 单选
    checkRadio: function () {
        $(document).on('click', '.checkRadio', function () {
            if ($(this).children("input").attr("name")) {
                var name = $(this).children("input").attr("name");
                $(document).find("input[name='" + name + "']").parent(".checkRadio").removeClass("active");
                $(document).find("input[name='" + name + "']").attr("checked", false);
                $(this).addClass("active");
                $(this).attr("checked", true);

            }
            else {
                if ($(this).hasClass("active")) {
                    $(this).removeClass("active");
                    $(this).children("input").attr("checked", false);
                    $(this).parent('.paymentModeList').siblings().find('.checkRadio').addClass('active');
                }
                else {
                    $(this).addClass("active");
                    $(this).children("input").attr("checked", true);
                    $(this).parent('.paymentModeList').siblings().find('.checkRadio').removeClass('active');
                }
            }
        });
    }
}

$(function () {
    objCheck.checkbox();
    objCheck.checkRadio();
})
