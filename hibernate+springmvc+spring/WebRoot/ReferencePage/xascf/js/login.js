$(document).ready(function() {
	var errorMsg=$("#errorMsg").val();
	if(errorMsg!=""){
		$("#alert_msg").empty().append("<div class='alert alert-error'><button type='button' class='close' " +
				"data-dismiss='alert'>&times;</button><strong></strong> "+errorMsg+"</div>");
	}else{
//		$("#errorMessageDiv").css('di');
	}
	document.onkeydown = function(e){
		var theEvent = window.event	|| e;
		var code = theEvent.keyCode || theEvent.which;
		if(code == 13){
			$("#login_btn").click();
		}  
	}
	Login.refreshcode();
});
var	Login = function(){  
	return { 
		/**刷新验证码*/
		refreshcode: function(){
			var verify=$("#authImg"); 
			verify.attr('src', 'xascf/common/securityCode.shtml?'+Math.round(Math.random()*10000)); 
		},
	
		login: function(){
			if($("#loginname").val()==""){
				$("#alert_msg").empty().append("<div class='alert alert-error'><button type='button' class='close' data-dismiss='alert'>&times;" +
						"</button><strong></strong>用户名不能为空</div>");
				$("#loginname").type='text';
				return;
			}
			if($("#loginpwd").val()==""){
				$("#alert_msg").empty().append("<div class='alert alert-error'><button type='button' class='close' data-dismiss='alert'>&times;" +
						"</button><strong></strong>密码不能为空</div>");
				$("#loginpwd").type='text';
				return;
			} 
			
//			if($("#verifyCode").val()==""){
//				$("#alert_msg").empty().append("<div class='alert alert-error'><button type='button' class='close' data-dismiss='alert'>&times;"  +
//						"</button><strong></strong>验证码不能为空</div>");
//				$("#verifyCode").type='text';
//				return;
//			}
			
			$("#loginName2").val($("#loginname").val());
			$("#password2").val($("#loginpwd").val());
			$("#verifyCode2").val($("#verifyCode").val());
			$("#loginForm").submit();
		}
	};
}();