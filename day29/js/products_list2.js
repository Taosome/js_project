$(function(){
	$.getJSON("mock/list.json",function(responseData){
		var data={
			products:responseData.data
		};
		var html=template("product_list_template",data);
		$(".box").html(html);
	});
});

$(function(){
	$(".box").on("click",".add_to_cart",function(e){
		var _p=$(this).parent();
		var product={
			id:_p.children(".id").val(),
			title:_p.children(".title").text(),
			price:_p.children(".price").text(),
			img:_p.find("img").attr("src"),
			amount:1
		};
		
		$.cookie.json=true;
		var _products=$.cookie("products")||[]
		var index=exist(_product.id,_products);
		if(index!==-1){
			_products[index].amount++;
		}else{
			_products.push(products);
		}
		$.cookie("products",_products,{expires:7,path:"/"});
		$(`<img src="images/1.jpg" style="width:50px;height:50px;">`).fly({
			start:{
				left:e.pageX,
				top:e.pageY,
			}
			end:{
				left:$(".slider .cart").offset().left,
				top:$(".slider .cart").offset().top,
				width:0,
				height:0,
			}
		});
	});
function exist(id,products){
	for (var i = 0;i < products.length; i++){
		if (products[i].id == id)
				return i;
	}
		return -1;
}
});