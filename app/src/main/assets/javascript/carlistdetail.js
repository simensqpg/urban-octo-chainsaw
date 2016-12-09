var carListObj={
	carListShowHide:function(){
		$('#carDetailBtn').click(function(){
			if($('#carListDetail').css('opacity') == '0')
			{
				$(this).addClass('active');
				$(this).find('.carDeArrow').show();
				$('#carListDetail').css("opacity", "1");
				$('#map').hide();
			}
			else
			{
				$(this).removeClass('active');
				$(this).find('.carDeArrow').hide();
				$('#carListDetail').css("opacity", "0");
				$('#map').show();
			}
		})
	}
}

$(function(){
	carListObj.carListShowHide();
})