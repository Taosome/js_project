$(function(){
	// 配置cookie插件
	$.cookie.json = true;

	// 从 cookie 中读取购物车数据
	var _products = $.cookie("products") || [];
	if (_products.length === 0) {
		alert("购物车为空");
		location = "demo1_products_list.html";
		return;
	}

	/* 使用模板，渲染，显示购物车数据 */
	function render() {
		var html = template("cart_template", {products:_products});
		$(".cart_body").html(html);
		/* 每行缓存对应显示的商品对象 */
		$(".row").each(function(index, element){
			$(element).data("product", _products[index]);
		});
	}
	render();
	
	


	/************************************************************/
	/* 删除选购商品 */
	$(".cart_body").on("click", ".del", function(){
		// 找出当前“删除”链接所在行
		var _row = $(this).parents(".row");
		// 找出商品id
		var _id = _row.children(".id").val();
		// 获取该id商品在数组中的下标
		var index = exist(_id, _products);
		// 从数组中删除该元素
		_products.splice(index, 1);
		// 保存回 cookie 中(从cookie中移除)
		$.cookie("products", _products, {expires:7, path:"/"});
		// 从DOM结构中移除
		_row.remove();

		// 更新合计
		calcTotal();
	});

	/************************************************************/
	/* 修改选购商品数量 */
	// 加/减
	$(".cart_body").on("click", ".add, .minus", function(){
		// 获取所在行
		var _row = $(this).parents(".row");
		// 获取所在行商品对象
		var _prod = _row.data("product");
		
		if ($(this).is(".add")) { // 数量加
			_prod.amount++;
		} else if ($(this).is(".minus")) { // 数量减
			if (_prod.amount <= 1)
				return;
			_prod.amount--;
		}
		// 保存回cookie
		$.cookie("products", _products, {expires:7, path:"/"});
		// 显示加/减后的数量
		_row.find(".amount_val").val(_prod.amount);
		// _row.find(".amount_val").attr("value", _prod.amount);
		// 显示小计金额
		_row.children(".sub").text((_prod.price * _prod.amount).toFixed(2));

		// 更新合计
		calcTotal();
	});

	$(".cart_body").on("blur", ".amount_val", function(){
		var _row = $(this).parents(".row");
		var _prod = _row.data("product");
		// 验证输入数据的格式
		var reg = /^[1-9]\d*$/;
		if (!reg.test($(this).val())){
			$(this).val(_prod.amount);
			return;
		}
		// 将输入修改的数量保存到对象的 amount 属性中
		_prod.amount = $(this).val();
		// 保存回cookie
		$.cookie("products", _products, {expires:7, path:"/"});
		// 显示小计金额
		_row.children(".sub").text((_prod.price * _prod.amount).toFixed(2));

		// 更新合计
		calcTotal();
	});

	/************************************************************/
	/* 全选 */
	$("#ck_all").click(function(){
		// 获取当前“全选”复选框的选中状态
		var status = $(this).prop("checked");
		// 将商品行前所有复选框选中状态设置为“全选”一致的状态
		$(".ck_prod").prop("checked", status);

		// 更新合计
		calcTotal();
	});
	/* 部分选中 */
	$(".cart_body").on("click", ".ck_prod",function(){
		var status = $(".ck_prod:checked").length === _products.length;
		$("#ck_all").prop("checked", status);
		// 更新合计
		calcTotal();
	});

	/************************************************************/
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



	// 指定id的商品在所有已选购的数组中是否存在
	// 存在则返回其在数组中的下标，不存在返回-1
	function exist(id, products) {
		for (var i = 0; i < products.length; i++) {
			if (products[i].id == id)
				return i;
		}
		return -1;
	}
});