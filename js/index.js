require(["config"],function(){
	require(["jquery","load","coursel"],function($){
		$(document).ready(function(){
			$("#banners").mkinfinite({
				maxZoom:1.4,
				animationTime:4000,
				imagesRatio:(960/720),
				isFixedBG:true,
				zoomIn:true,
				imagesList:new Array(
					'images/banner1.jpg',
					'images/banner2.jpg',
					'images/banner3.jpg'
				)
			});
		});
		$(".gt_u_a").attr("href", "html/list.html");
		$(".buy-now-btn").attr("href", "html/detail.html");
	});
});