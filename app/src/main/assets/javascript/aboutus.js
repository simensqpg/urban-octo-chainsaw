 function GetAboutUs() {
       
        $.getJson({
            "ObjectName": "ABOUTUS"
        }, 'get_ABOUTUS');
    }

    

    var get_ABOUTUS = function (json) {
                if (json.IsSuccess == true) {
                    $("#aboutUs").html(json.Data);
                    
                }
                else {
                    $.easyErrorBox(json.Message);
                }
            }