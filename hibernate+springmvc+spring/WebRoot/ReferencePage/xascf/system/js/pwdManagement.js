var PwdManagement = function() {
	return {
		init: function() {
			sns.valid.init($("#changePwdForm"));
		},
		submit:function(){
			if($("#changePwdForm").isValid()){
				$.post("xascf/system/user/changePassword.shtml",$("#changePwdForm").serialize(),function(data){
					var msg=data.msg;
					if(msg=='SUCCESS'){
						PUI.MessageBox.info("修改成功!请重新登录操作!");
						var time=2000;
						setInterval(function(){
							$("#loginOut").submit();
						},time);
					}else if(msg=='ERROR'){
						PUI.MessageBox.info("修改失败!");
					}else if(msg=='WRONG_OLD_PWD'){
						PUI.MessageBox.info("原密码有误!");
					}else if(msg=='UNLOGIN'){
						PUI.MessageBox.info("您还未登陆或者您很久没操作系统，系统自动为您退出!");
						var time=2000;
						setInterval(function(){
							$("#loginOut").submit();
						},time);
					}
					
				},"json");
			}
		},
		reset : function(){
			PUI.util.resetForm($("#changePwdForm")); 
		}
	};
}();

$().ready(function() {
	PwdManagement.init();
});