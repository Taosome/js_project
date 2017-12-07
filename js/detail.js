require(["config"],function(){
	require(["jquery","load","zoom"],function($){
		/*$("#gd_room img").elevateZoom({
			lensShape : "square",
			zoomType : "window",
			borderSize:1,
			zoomWindowWidth: 430,
			zoomWindowHeight: 500,
			cursor:"pointer",
			zoomWindowOffetx: 10,
			imageCrossfade:true,
		});
		$(".items ul li>img").mousemove(function(){
			$("#gd_room>img").attr("src",$(this).attr("src"));
			$("#gd_room>img").attr("data-room-image",$(this).attr("src"));
		});
		*/
		$("#img_0").elevateZoom({
			gallery:'gal1',
			cursor: 'pointer',
			galleryActiveClass: 'active', 
			imageCrossfade: true, 
			loadingIcon: 'http://www.elevateweb.co.uk/spinner.gif',
			lensShape : "square",
			zoomType : "window",
			zoomWindowWidth: 430,
			zoomWindowHeight: 500,
			cursor:"pointer",
			zoomWindowOffetx: 10,
			imageCrossfade:true,
			borderSize:2
			}); 
		$("#gal1").bind("click", function(e) {  
		  var ez=$('#gal1').data('elevateZoom');	
			$.fancybox(ez.getGalleryList());
		  return false;
		});
		$("#gd_des_ser1>li").click(function() {
			/* Act on the event */
			$("#gd_des_ser1>li").css("borderColor","#ccc");
			$(this).css("borderColor","red");
		});
		$("#gd_des_ser_fruit>li").click(function() {
			/* Act on the event */
			$("#gd_des_ser_fruit>li").css("borderColor","#ccc");
			$(this).css("borderColor","red");
		});
	});
});
