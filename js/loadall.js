define(["jquery","cookie"],function($){
	$("#header").load("/html/include/header.html",function(){
		var user=$.cookie("login_user");
		
		if(user){
			var _user=$.parseJSON(user);
			var _html=`欢迎光临果酷：${_user.username}<span>[退出]</span>`;
			$("#top_con_rt>li:nth-child(1)").html(_html);
			$("#top_con_rt>li:nth-child(2)").hide();
		}
		$("#top_con_rt>li:nth-child(1)>span").click(function() {
			/* Act on the event */
			$.removeCookie("login_user",{path:"/"});
			var _html=`<img style="padding-bottom: 5px;" src="/images/login_icon.jpg">
					<a id="dologin" class="tp_hover_a" href="javascript:void(0)">请登录</a>`;
			$("#top_con_rt>li:nth-child(1)").html(_html);
			$("#top_con_rt>li:nth-child(2)").show();
		});
		$("#dologin").click(function(){
			$("#logdiv").css("display","block");
		});
		$("#hd_mc_txt").click(function() {
			/* Act on the event */
			var user=$.cookie("login_user");
			if(!user){
				alert("请先登录!!!");
			}else{
				location="/html/cart.html";
			}
		});
		$("#myorder").click(function() {
			/* Act on the event */
			var user=$.cookie("login_user");
			if(!user){
				alert("请先登录!!!");
			}else{
				location="/html/order.html";
			}
		});
		$("#head").delegate('.hsli', 'mouseenter mouseleave', function(e) {
			var type=e.type;
			if(type==="mouseenter"){
				$(this).children('span').toggleClass('hssp');
			}
			if(type==="mouseleave"){
				$(this).children('span').toggleClass('hssp');
			}
		});
		$("#home").click(function(){
			location="/index.html";
		});
		//淘宝接口跨越,
		$("#hd_search_txt").keyup(function(){
			$("#hd_search .hd_search_info").css("display","block");
			var _word = $(this).val(),
				_url = "https://suggest.taobao.com/sug?code=utf-8&q="+ _word +"&callback=?";
			$.getJSON(_url, function(data){
				var html = "";
				var data=data.result;
				$(data).each(function(curr){
					var _html=data[curr];
					html += `<div>${_html[0]}</div>`;
				});
				$(".hd_search_info").html(html);
			});
			
			if($(this).val()===""){
				$("#hd_search .hd_search_info").css("display","none");
			};
		});
		$("#hd_search_txt").blur(function(){
			$("#hd_search .hd_search_info").css("display","none");
		});

	});
	$("#footer").load("/html/include/footer.html");
	$("#nav").load("/html/include/nav.html");
	$("#logdiv").load("/html/include/login.html",function(){
		$("#logdiv_tit_a").click(function(){
			$("#logdiv").css("display","none");
		});
		$("#denglu").click(function() {
			$.post(
				"/login.php", 
				{username:$("#log_name").val(),password:$("#log_pwd").val()},
				function(respData) {
					if(respData.status===1){
						var _user=respData.data;
						$.cookie("login_user",JSON.stringify(_user),{path:"/"});
						location="/index.html";
					};
				},
				"json"
			);
		});
		
	});
});