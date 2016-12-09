var simple={
	layerIndex: 0,
	open: true,
	layer: function (){
		var _this=this;
		$('.openlayer').on('touchend' , function (){
			$('.mask').css('display' , 'block');
			_this.layerIndex=0;
			$('#slideBody ul').css('left' ,'0');
			_this.slide();
		});
		$('.mask .close').on('touchend' , function (){
			$('.mask').css('display' , 'none');
		});
	},
	slide: function (){
		if(this.open){
			var winW=$('body').width(),
				len=$('#slideBody li').length,
				titleH=$('#slideTitle').height(),
				imgH,
				_this=this;
			$('#slideBody ul').width(winW*len);
			$('#slideBody li').width(winW);
			imgH=$('#slideBody li img').height();
//			$('#wrap').height(titleH+imgH);
//			$('#slideBody').height(imgH);
			$('#slideBody ul').css('left' ,'0');

			$("#slideBody img").each(function (){
				var picW=$(this).width(),
					picH=$(this).height(),
					bodyW=$('#slideBody').width(),
					bodyH=$('#slideBody').height();
				// console.log("width:"+$(this).width()+",height:"+$(this).height());
				// console.log("width:"+$('#slideBody').width()+",height:"+$('#slideBody').height());
				if(picW > bodyW){
					$(this).css({'width' : '100%','height' : 'auto'});
				}
				if(picH > bodyH){
					$(this).css({'width' : 'auto','height' : bodyH + 'px'});
				}
			});

			function moveLeft(){
				_this.layerIndex--;
				_this.layerIndex=_this.layerIndex<0?(0):_this.layerIndex;
				$('#slideBody ul').stop(true,true).animate({'left' : -_this.layerIndex*winW+'px'});
			}

			function moveRight(){
				_this.layerIndex++;
				_this.layerIndex=_this.layerIndex>(len-1)?(len-1):_this.layerIndex;
				$('#slideBody ul').stop(true,true).animate({'left' : -_this.layerIndex*winW+'px'});
			}
			//左滚动
			$('#toLeft').on('touchend' , function (){
				moveLeft();
			});

			//右滚动
			$('#toRight').on('touchend' , function (){
				moveRight();
			});
			this.open=false;
			
			$('#slideBody ul').on('touchstart' , function (e){
				e = e.event || window.event;
				startMove = true;
				_this.startX=0;
				_this.moveX=0;
				_this.startLeft=-_this.layerIndex*winW,
				_this.moveDes=0;
				_this.startX = e.touches[0].clientX;	
				e.preventDefault();
			});
			$('#slideBody ul').on('touchmove' , function (e){
				if(startMove){
					e = e.event || window.event;
					_this.moveX=e.touches[0].clientX - _this.startX;
					_this.startLeft+=_this.moveX;
					_this.moveDes+=_this.moveX;
					$('#slideBody ul').css('left' ,_this.startLeft +'px');
					_this.startX=e.touches[0].clientX;
				}
			});
			$('#slideBody ul').on('touchend' , function (){
				if(_this.moveDes>100){
					moveLeft();
				}
				else if(_this.moveDes<-100){
					moveRight();
				}
				else{
					$('#slideBody ul').stop(true,true).animate({'left' : -_this.layerIndex*winW+'px'}, 100);
				}
			});
		}
		
	},
	init: function(){
		this.layer();
	}
};
window.onload=function (){
	simple.init();
};