 $(document).ready(function(){
 	PUI.plugin.init({},$("#approdPass_form"));
	sns.valid.init($("#approdPass_form"));
	$("#zhangqi").find(".chosen-container").css("float",'right').css("width",'45%');
	$("#approvalNext").val($("#backTo").find("option:selected").text());
	//是否通过下拉框change事件
	$("#approvaelPass").bind("change", function(){
		var v=$(this).val();
		if(v=="N"){
			$("#backDiv").show();
			$("#fancingSet").hide();
		}else {
			$("#backDiv").hide();
			$("#fancingSet").show();
		}
	});
	$("#rebackType").bind("change", function(){
		var val=$(this).val();
		if(val=='1'){
			$("#lxjszq").hide();
		}else
			$("#lxjszq").show();
	});
	
});
 var listType=$("#listType").val();
 var price=0;
//票据有效期
 var noteEffec=[{pid:'',effec:''}];
 var billType=$("#billType").val();
var LoanRequestFKSet = function() {
	return {
		backChange:function(){
			$("#approvalNext").val($("#backTo").find("option:selected").text());
		},
		rebackList:function(){
				Menu.forward("xascf/loan/jsp/loanRequestSetList.jsp"); 
		},
		save :function(){
			if (!$("#approdPass_form").isValid()) {
				return ;
			}
			var params = $("#approdPass_form").serializeArray();
			if($("#approvaelPass").val()=='Y'){
				// 折扣金额
				var discountPrice=parseFloat($("#discountPrice").val());
				// 批复总金额
				var requestReplyPrice=parseFloat($("#fancingRequestReplyPrice").val());
				if(discountPrice<requestReplyPrice){
					PUI.MessageBox.alert("批复总金额不能大于票据折扣后的金额!");
					return ;
				}
				// 本次放款金额
				var fancingReplyPrice=parseFloat($("#fancingReplyPrice").val());
				if(discountPrice<fancingReplyPrice){
					PUI.MessageBox.alert("本次放款金额不能大于票据折扣后的金额!");
					return ;
				}
				//申请金额
				var requestPrice=parseFloat($("#requestPrice").val());
				if(requestPrice<fancingReplyPrice){
					PUI.MessageBox.alert("本次放款金额不能大于申请金额!");
					return ;
				}
				if($("#loanType").val()=='2'){
					if(requestReplyPrice<fancingReplyPrice){
						PUI.MessageBox.alert("本次放款金额不能大于批复总金额!");
						return ;
					}
					// 剩余金额 = 批复总金额-本次放款金额
					var lostPrice = requestReplyPrice-fancingReplyPrice; 
					params.push({
						name: 'fancingOrderEntity.fancingOrderItem.lostPrice',
						value: lostPrice
					});
					// 预付金额 = 本次放款金额 PREPAY_PRICE
					params.push({
						name: 'fancingOrderEntity.fancingOrderItem.prepayPrice',
						value: fancingReplyPrice
					});
				}
				
			}
			PUI.MessageBox.show({
				title: "提交审批",
				content: "你确定要提交审批吗？",
				type: "alert",
				buttons: [{ value: "是" },{ value: "否" }],
				success: function (result) {
				   if (result == "是") {
						$.post("xascf/fancing/saveNoteCheck.shtml",params,function(data){
								PUI.MessageBox.info(data);
								if(data.indexOf('成功')>=0)
									Menu.forward("xascf/loan/jsp/loanRequestSetList.jsp"); 
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