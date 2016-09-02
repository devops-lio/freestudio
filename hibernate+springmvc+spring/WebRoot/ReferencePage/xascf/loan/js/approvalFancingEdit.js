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
			$("#sepecialBtn").hide();
		}else {
			$("#backDiv").hide();
			$("#sepecialBtn").show();
		}
	});
	//判断是否主任复核确认
	if(listType=='FKZRQR'){
		$("#sepecialBtn").show();
	}else{
		$("#sepecialBtn").hide();
	}
	
});
var ApprovaelFancingEdit = function() {
	return {
		backChange:function(){
			$("#approvalNext").val($("#backTo").find("option:selected").text());
		},
		rebackList:function(){
			if(listType!='' && listType=='SCZJQR'){
				//返回市场总监确认列表
				Menu.forward("xascf/loan/jsp/loanRequestConfirList.jsp"); 
			}else if(listType=='FKZRQR'){
				//返回主任复核确认列表
				Menu.forward("xascf/loan/jsp/loanRequestCheckList.jsp"); 
			}else if(listType=='FXWHYQR'){
				//返回风险委员会确认列表
				Menu.forward("xascf/loan/jsp/loanRequestFXWYHCheckList.jsp"); 
			}
		},
		saveSpecial :function(){
			if (!$("#approdPass_form").isValid()) {
				return ;
			}
			var fancingPid=$("#fancingPid").val();
			var params = $("#approdPass_form").serializeArray();
			PUI.MessageBox.show({
				title: "提交审批",
				content: "你确定要提交审批吗？",
				type: "alert",
				buttons: [{ value: "是" },{ value: "否" }],
				success: function (result) {
				   if (result == "是") {
						$.post("xascf/fancing/saveSpecialApplorRequest.shtml",params,function(data){
							PUI.MessageBox.info(data);
							//返回市场总监确认列表
							if(data.indexOf('成功')>0){
								if(listType!='' && listType=='SCZJQR'){
									//返回市场总监确认列表
									Menu.forward("xascf/loan/jsp/loanRequestConfirList.jsp"); 
								}else if(listType=='FKZRQR'){
									//返回主任复核确认列表
									Menu.forward("xascf/loan/jsp/loanRequestCheckList.jsp"); 
								}else if(listType=='FXWHYQR'){
									//返回风险委员会确认列表
									Menu.forward("xascf/loan/jsp/loanRequestFXWYHCheckList.jsp"); 
								}
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
			var fancingPid=$("#fancingPid").val();
			var params = $("#approdPass_form").serializeArray();
			PUI.MessageBox.show({
				title: "提交审批",
				content: "你确定要提交审批吗？",
				type: "alert",
				buttons: [{ value: "是" },{ value: "否" }],
				success: function (result) {
				   if (result == "是") {
						$.post("xascf/fancing/saveSCZJApplor.shtml",params,function(data){
							PUI.MessageBox.info(data);
							//返回市场总监确认列表
							if(data.indexOf('成功')>0){
								if(listType!='' && listType=='SCZJQR'){
									//返回市场总监确认列表
									Menu.forward("xascf/loan/jsp/loanRequestConfirList.jsp"); 
								}
								else if(listType=='FKZRQR'){
									//返回主任复核确认列表
									Menu.forward("xascf/loan/jsp/loanRequestCheckList.jsp"); 
								}else if(listType=='FXWHYQR'){
									//返回风险委员会确认列表
									Menu.forward("xascf/loan/jsp/loanRequestFXWYHCheckList.jsp"); 
								}
							}
						},"json");
				   }
			    }
			});
		},
		//查看审批记录弹出框
		approvlDetail : function() {
			var creditNo=$("#loanRequestNo").val();
			$.post("xascf/credit/approvalDetail.shtml", {"creditNo":creditNo}, function(data) {
				$("#evaluateReportContent").html(data);
				$("#popTitle").html('审批记录列表');
				$("#tabwin_add_evaluateReportPop").popup({md:true});
			});
			
		}
	};
}();