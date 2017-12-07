require(["config"],function(){
	require(["jquery","temp","load","cookie"],function($,template){
		$.cookie.json=true;
		var _products=$.cookie("products")||[];
		var html = template("order_template", {products:_products});
		$("#cf_order_con").html(html);
		var sum=0;
		var num=0;
		$("#cf_order_con li").each(function(index, el) {
			var _sum=Number($(this).find(".coi_sub").text());
			var _num=Number($(this).find(".coi_num").text());
			sum+=_sum;
			num+=_num;
		});
		$("#cfof_total").html("￥"+sum.toFixed(2));
		$("#cfof_slt span").html(num);
	});
});