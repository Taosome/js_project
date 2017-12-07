$(function(){
	$.cookie.json=true;
	
	var _products=$.cookie("products")||[];
	if(_products.length === 0){
		alert("购物车为空");
		location = " demo1_products_list.html";
		return;
	}
	function render(){
		var html=template("cart_templata",{products:_products});
		$(".cart_body").html(html);
		$(".row").each(function(index,element){
			$(element).data("product",_products[index]);
		});
	}
	render();
	$(".cart_body").on("click",".del",function(){
		var _row=$(this).parents(".row");
		var _id=_row.children.(".id").val();
		var index= exist(_id,_products);
		_products.splice(index,1);
		$.cookie("products",_products,{expires:7,path:"/"})
		_row.remove();
		calcTotal();
	});
	
	$(".cart_body").on("click",".add, .minus",function(){
		var _row=$(this).parents(".row");
		var _prod=_row.data("product");
		if($(this).is(".add")){
			_prod.amount++;
		}else if($(this).is(".minus")){
			if(_prod.amount<=1)
				return;
				_prod.amount--;
		}
		$.cookie("products",_products,{expires:7},path:"/"});
		_row.find(".amount_val").val(_prod.amount);
		_row.children(".sub").text((_prod.price*_prod.amount).toFixed(2));
		calcTotal();
	});
	$(".cart_body").on("blur", ".amount_val",function(){
		var _row=$(this).parents(".row");
		var _prod=_row.data("product");
		var reg=/^[1-9]\d*$/;
		if(!reg.test($(this).val())){
			$(this).val(_prod.amount);
			return;
		}
		_prod.amount=$(this).val();
		$.cookie("products",_product,{expires:7,path:"/"});
		_row.children(".sub").text((_prod.price*_prod.amount).toFixed(2));
		calcTotal();
	});
	$("#ck_all").click(function(){
		var status=$(this).prop("checked");
		$(".ck_prod").prop("checked",status);
		calcTotal();
	});
	$(".cart_body").on("click",".ck_prod",function(){
		var status=$(".ck_prod:checked").length===_products.length;
		$("#ck_all").prop("checked",status);
		calcTotal();
	});
	// 计算合计金额的函数
	function calcTotal() {
		// 合计金额
		var sum = 0;
		$(".ck_prod:checked").each(function(index, element){
			// 当前选中行中的获取小计金额
			var _sub = Number($(this).parents(".row").children(".sub").text());
			// 累加到合计金额中
			sum += _sub;
		});
		// 显示合计金额
		$("#total").text(sum.toFixed(2));
	}

	/************************************************************/
	/* 猜你喜欢 推荐购物 */
	$(".buy").on("click", ".add_to_cart", function(){
		var box = $(this).parents(".product")
		// 获取当前加入购物车商品对象
		var prod = {
			id : box.children(".id").val(),
			title : box.children(".title").text(),
			img : box.find("img").attr("src"),
			price : box.children(".price").text(),
			amount : 1
		};
		var index = exist(prod.id, _products);
		if (index !== -1) {
			_products[index].amount++;
		} else {
			_products.push(prod);
		}
		// 保存到 cookie 中
		$.cookie("products", _products, {expires:7, path:"/"});
		// 重新渲染显示购物车数据
		render();
	});

function exist(id,products){
	for (var i = 0; i< products.length; i++) {
		if (products[i].id==id)
			return i;
	}
	return -1;
}
});