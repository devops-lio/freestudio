 var listType=$("#listType").val();
$(document).ready(function(){
 	PUI.plugin.init({},$("#approdPass_form"));
	sns.valid.init($("#approdPass_form"));
	$("#approvalNext").val($("#backTo").find("option:selected").text());
	//是否通过下拉框change事件
	$("#approvaelPass").bind("change", function(){
		var v=$(this).val();
		if(v=="N"){
			$("#backDiv").show();
		}else {
			$("#backDiv").hide();
		}
	});
	//判断是否风控总监复核确认
	if(listType=='FKZJSXQR'){
		$("#printCustomerBtn").show();
		$("#printXinanBtn").show();
		$("#specialBtn").show();
		
	}else{
		$("#printCustomerBtn").hide();
		$("#printXinanBtn").hide();
		$("#specialBtn").hide();
	}
	
});
var ApprovalCreditEdit = function() {
	return {
		
		backChange:function(){
			$("#approvalNext").val($("#backTo").find("option:selected").text());
		},
		rebackList:function(){
			if(listType!='' && listType=='SCZJSXQR'){
				//返回市场总监确认列表
				Menu.forward("xascf/credit/jsp/creditConfirList.jsp"); 
			}else if(listType=='FKZJSXQR'){
				//返回主任复核确认列表
				Menu.forward("xascf/credit/jsp/creditCheckList.jsp"); 
			}else if(listType=='FXWYHSXQR'){
				//返回风险委员会确认列表
				Menu.forward("xascf/credit/jsp/creditSpecialList.jsp"); 
			}
		},
		saveSpecial :function(){
			if (!$("#approdPass_form").isValid()) {
				return ;
			}
			PUI.MessageBox.show({
				title: "提交审批",
				content: "你确定要提交审批吗？",
				type: "alert",
				buttons: [{ value: "是" },{ value: "否" }],
				success: function (result) {
				   if (result == "是") {
						var params = $("#approdPass_form").serializeArray();
						$.post("xascf/credit/saveRequestSpecialApplor.shtml",params,function(data){
							PUI.MessageBox.info(data);
							//返回市场总监确认列表
							if(data.indexOf('成功')>0){
								ApprovalCreditEdit.rebackList();
							}
						},"json");
				   }
			    }
			});
		},
		save :function(){
			if (!$("#approdPass_form").isValid()) {
				return ;
			}
			PUI.MessageBox.show({
				title: "提交审批",
				content: "你确定要提交审批吗？",
				type: "alert",
				buttons: [{ value: "是" },{ value: "否" }],
				success: function (result) {
				   if (result == "是") {
						var params = $("#approdPass_form").serializeArray();
						$.post("xascf/credit/saveSCZJApplor.shtml",params,function(data){
							PUI.MessageBox.info(data);
							//返回市场总监确认列表
							if(data.indexOf('成功')>0){
								ApprovalCreditEdit.rebackList();
							}
						},"json");
				   }
			    }
			});
		}
	};
}();