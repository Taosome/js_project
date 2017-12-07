/* 异步加载商品数据 */
$(function(){
	/* 异步加载商品列表数据，展示 */
	$.getJSON("mock/list.json", function(responseData){
		/*// 定义变量保存html布局
		var html = "";
		// 遍历所有商品
		responseData.data.forEach(function(product){
			html += `<div class="product">
						<div class="img"><img src="${product.img}"></div>
						<div class="title">${product.title}</div>
						<div class="price">${product.price.toFixed(2)}</div>
						<input type="hidden" class="id" value="${product.id}">
						<div class="add_to_cart">加入购物车</div>
					</div>`;					
		});
		// 将 html 字符串设置到页面元素中
		$(".box").html(html);*/

		// 使用 artTemplate 模板引擎渲染
		var data = {
			products : responseData.data
		};
		var html = template("product_list_template", data);
		$(".box").html(html);
	});
});


/************************************************************/
/* 添加购物车 */
$(function(){
	// 将“加入购物车”的点击事件委派给 div.box 的元素
	/*$(".box").delegate(".add_to_cart", "click", function(){

	});*/
	$(".box").on("click", ".add_to_cart", function(e){
		/* 将当前点击的"加入购物车"所在盒子商品数据保存到对象中 */
		// 获取"加入购物车"的父节点
		var _p = $(this).parent();
		var product = {
			id : _p.children(".id").val(),
			title : _p.children(".title").text(),
			price : _p.children(".price").text(),
			img : _p.find("img").attr("src"),
			amount : 1
		};
		/* cookie操作 */
		$.cookie.json = true;
		// 将 cookie 中所有购物车中的商品读取出来
		var _products = $.cookie("products") || [];
		// 当前商品是否已被选购过
		var index = exist(product.id, _products);
		if (index !== -1) { // 已选购，数量自增
			_products[index].amount++;
		} else { // 未选购，将当前选购商品对象添加到数组中
			_products.push(product);
		}
		// 将数组重新保存回 cookie
		$.cookie("products", _products, {expires:7, path:"/"});
		
		// 抛物线
		$(`<img src="images/1.jpg" style="width:50px; height:50px;">`).fly({
			start:{
		    	left: e.pageX,  //开始位置（必填）#fly元素会被设置成position: fixed
		    	top: e.pageY,  //开始位置（必填）
		    },
		    end:{
		    	left: $(".slider .cart").offset().left, //结束位置（必填）
		    	top: $(".slider .cart").offset().top,  //结束位置（必填）
		    	width: 0, //结束时高度
		    	height: 0, //结束时高度
		    }
		});
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