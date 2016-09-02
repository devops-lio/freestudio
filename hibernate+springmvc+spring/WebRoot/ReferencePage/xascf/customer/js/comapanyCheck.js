$(document).ready(function(){
	PUI.plugin.init({},$("#approdPass_form"));
	sns.valid.init($("#approdPass_form"));
	//是否通过下拉框change事件
}); 



var ComapanyCheck = function() {
	return {
		save :function(){
			if (!$("#approdPass_form").isValid()) {
				return ;
			}
			var params = $("#approdPass_form").serializeArray();
			$.post("xascf/customer/saveCustomerApplor.shtml",params,function(data){
				PUI.MessageBox.info(data);
				//返回会员列表
				if(data.indexOf('成功')>0){
						Menu.forward("xascf/customer/jsp/comapanyInfo.jsp"); 
				}
			},"json");
		},
		returnBackList:function(){
			Menu.forward("xascf/customer/jsp/comapanyInfo.jsp"); 
		}
	};
}();