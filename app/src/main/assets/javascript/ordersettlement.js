function GetCommentList(VIID,orderid) {
    $.getJson({
        "ObjectName": "COMMENTLIST",
        "OrderByData": [
                  {
                      "FieldName": "CTID",
                      "Direction": "Desc"
                  }
               ],
        "PagerData": {
            "CurrentPage": "1",
            "PageCount": "10"
        },
        "SearchData": [
                  {
                      "FieldName": "CarID",
                      "FieldVal": VIID,
                      "Relation": "And",
                      "SearchMode": "Equal"
                  },
                  {
                      "FieldName": "OrderID",
                      "FieldVal": orderid,
                      "Relation": "And",
                      "SearchMode": "Equal"
                  }
               ]
    },
        function () {
            if (this.IsSuccess == true) {
                var score = 0,
		        str = '查看评价';
                $.packing(this.Data).each(function () {
                    score = this.Score;                
                });

                switch (score) {
                    case 0: $('#star').attr('class', 'star0'); str = '去评价'; break;
                    case 1: $('#star').attr('class', 'star1'); break;
                    case 2: $('#star').attr('class', 'star2'); break;
                    case 3: $('#star').attr('class', 'star3'); break;
                    case 4: $('#star').attr('class', 'star4'); break;
                    case 5: $('#star').attr('class', 'star5'); break;
                }
                $('#goToComment .text').html(str);

            }
            else {
                $.easyErrorBox(this.Message);
            }
        });
}


$(function () {
    var VIID = "";
    var orderid = 11;
    GetCommentList(VIID, orderid);
});