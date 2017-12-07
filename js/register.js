require(["config"],function(){
	require(["jquery","load"],function($){
		$("#dlogin").click(function() {
			/* Act on the event */
			$("#logdiv").css("display","block");
		});
		$("#reg_btn").click(function() {
			/* Act on the event */
			$.ajax({
					type : "POST",
					url : "http://localhost/register.php",
					data : {
						username : $("#r_mb_num").val(),
						password : $("#r_mb_key").val(),
						phone : $("#r_cod").val(),
					},
					dataType : "json",
					success : function(data){
						if (data.status === 1) { // 注册成功
							location="/index.html";
							alert("登录以享受购物");
						} else {
							location.reload();
						}
					}
				});
		});
	});
});