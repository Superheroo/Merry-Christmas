$(function(){
	var qqreg = /^[1-9]{1}[0-9]{4,8}$/;
	var code=$(".verifyImage").val();//获取输入验证码
	var ifmob=/^1[3,4,5,7,8]\d{9}$/;
	
	$('#messageform').submit(function(){
		if($(".message_name").val()=="请输入您的姓名" || $(".message_name").val()==""){
			alert("请输入您的姓名");
			return false;
		}else if($(".message_mobile").val()=="请输入您的手机" || $(".message_mobile").val()=="" || !ifmob.test($(".message_mobile").val())){
			alert("请正确输入您的手机号");
			return false;
		}else if($(".message_address").val()=="请输入您的地址" || $(".message_address").val()==""){
			alert("请输入您的地址");
			return false;
		}else if($(".message_content").val()=="请输入您的留言" || $(".message_content").val()==""){
			alert("请输入您的留言");
			return false;
		}else{
		$.ajax({
			url: "http://order.kowadon.com/index.php?a=form",
			type:'POST',
			data:"extend_url="+$(".message_url").val()+"&title="+$('input[type=radio][name=title]:checked').val()+"&name="+$(".message_name").val()+"&mobile="+$(".message_mobile").val()+"&bdprovince="+$(".message_bdprovince").val()+"&bdcity="+$(".message_bdcity").val()+"&bdarea="+$(".message_bdarea").val()+"&address="+$(".message_address").val()+"&pay="+$(".message_pay").val()+"&content="+$(".message_content").val(),
			success:function(data){
				alert("提交成功！");
				$(".message_name").val('');
				$(".message_mobile").val('');
				$(".message_bdprovince").val('');
				$(".message_bdcity").val('');
				$(".message_bdarea").val('');
				$(".message_address").val('');
				$(".message_content").val('');
			}
		})
		}
		return false;
	})
})