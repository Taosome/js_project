require(["config"],function(){
	require(["jquery","load","cookie"],function($){
		$(".grgp_ul_car").click(function() {
			/* Act on the event */
			var _p=$(this).parent().parent().parent().parent();
			var product={
                id:_p.children(".grg_goods_id").val(),
                title:_p.children(".glc_rt_gds_des").children("a").text(),
                price:Number((_p.children(".glc_rt_gds_pri").children("span").text()).substring(1)),
                img:_p.find("img").attr("src"),
                amount:_p.children(".glc_rt_gds_opt").find("input").val()
			};
			$.cookie.json=true;
			var _products=$.cookie("products") || [];

			var index=exist(product.id,_products);
			if(index!==-1){
				_products[index].amount++;
			}else{
				_products.push(product);
			}
			$.cookie("products",_products,{expires:7,path:"/"});

		});
		function exist(id, products) {
		for (var i = 0; i < products.length; i++) {
			if (products[i].id == id)
				return i;
		}
		return -1;
	}
	});
});