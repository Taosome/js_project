require(["config"],function(){
	require(["jquery","temp","load","cookie"],function($, template){
		$.cookie.json=true;
		var _products=$.cookie("products")||[];
		if(_products.length===0){
			var _html=`<li><div id="mc_msg">购物车空空的哦，去看看心仪的商品吧~<a href="/index.html">去购物</a></div></li>`;
			console.log(_html);
			$("#cart_con").html(_html);
		}else{
			render();
		}
		function render(){
			var html = template("cart_template", {products:_products});
			$("#cart_con").html(html);
			$(".cart_con_li").each(function(index, element){
				$(element).data("product", _products[index]);
			});
		};
		$(".co_inp>input").prop("checked",true);
		calc();
		$("#cart_con").on("click",".add,.minus",function(){
			var _row=$(this).parents(".cart_con_li");
			var _prod=_row.data("product");
			if($(this).is(".add")){
				_prod.amount++;
			}else if($(this).is(".minus")){
				if(_prod.amount<=1)
					return;
				_prod.amount--;
			};
			$.cookie("products",_products,{expires:7,path:"/"});
			_row.find(".amount_val").val(_prod.amount);
			_row.find(".co_sub").text((_prod.price * _prod.amount).toFixed(2));
			calc();
		});
		$("#cart_con").on("blur",".amount_val",function(){
			var _row=$(this).parents(".cart_con_li");
			var _prod=_row.data("product");
			var reg=/^[1-9]\d*$/;
			if(!reg.test($(this).val())){
				$(this).val(_prod.amount);
				return;
			}
			_prod.amount=$(this).val();
			$.cookie("products",_products,{expires:7,path:"/"});
			_row.find(".co_sub").text((_prod.price * _prod.amount).toFixed(2));
			calc();
		});
		//行内删除
		$("#cart_con").on("click",".del",function(){
			var _row=$(this).parents(".cart_con_li");
			var _id=_row.find(".id").val();
			var _index=exist(_id,_products);
			_products.splice(_index,1);
			$.cookie("products",_products,{expires:7,path:"/"});
			_row.remove();
			calc();
		});
		function exist(id,products){
			for(var i=0;i<products.length;i++){
				if(id==products[i].id){
					return i;
				}
				return -1;
			}
		};

		//全选按钮
		$(".co_inp>input").prop("checked",true);
		$("#ct_inp>input").click(function() {
			/* Act on the event */

			var status=$(this).prop("checked");
			$(".co_inp>input").prop("checked",status);
			$("#ctf_inp>input").prop("checked",status);
			calc();
		});
		$("#ctf_inp>input").click(function() {
			/* Act on the event */

			var status=$(this).prop("checked");
			$(".co_inp>input").prop("checked",status);
			$("#ct_inp>input").prop("checked",status);
			calc();
		});
		//单选按钮
		$("#cart_con").on("click",".co_inp>input",function(){
			var status=($(".co_inp>input:checked").length===_products.length);
			$("#ct_inp>input").prop("checked",status);
			$("#ctf_inp>input").prop("checked",status);
			calc();
		});
		//合计
		function calc(){
			var sum=0;
			$(".co_inp>input:checked").each(function(index, el) {
				var _sum=Number($(this).parents(".cart_con_li").find(".co_sub").text());
				sum+=_sum;	
			});
			$("#total").html("￥"+sum.toFixed(2));
			var count=0;
			$(".co_inp>input:checked").each(function(index, el) {
				var _count=Number($(this).parents(".cart_con_li").find(".amount_val").val());
				count+=_count;
			});
			
			$("#count").html(count);
		};
		$("#cart_tf li .hover_a").click(function() {
			/* Act on the event */
			$(".co_inp>input:checked").each(function(index, el) {
				var _row=$(this).parents(".cart_con_li");
				var _id=_row.find(".id").val();
				var _index=exist(_id,_products);
				_products.splice(_index,1);
				$.cookie("products",_products,{expires:7,path:"/"});
				_row.remove();
				calc();
			});
		});
		$("#ctf_js").click(function() {
			/* Act on the event */
			var user=$.cookie("login_user");
			if(!user){
				alert("请先登录!!!");
			}else{
				location="/html/order.html";
			}
		});
	});
});