
var CreditRequestDetails = function() {
	return {
		showEvaluateReport : function(){
			$.post("xascf/rm/evaluateReport/reportPreviewPop.shtml",{reportPid:$("#reportPid").val()},function(data){
				if(data.result)
				{
					$("#evaluateReportContent").html(data.data.reportContent);
					$("#popTitle").html('调查报告');
					if(data.data.fileName!=null&&data.data.fileName!=""){
						$("#show_fileName").html('<a href="#" style="text-align: center;" onclick="FileUtil.downLoad(\''+data.data.fileUrl+'\',\''+data.data.fileName+'\')">'+data.data.fileName+'</a>')
					}
					replaceDocument();
					$("#tabwin_add_evaluateReportPop").popup({md:true});
				}else{
					PUI.MessageBox.alert("该会员还未提交调查报告!");
				}
			});
		},
		scoreDetail : function() {
			var evaluateObjectPid=$("#pid").val();
			$.post("xascf/credit/creditScoring/scoreDetial.shtml", {"evaluateObjectPid":evaluateObjectPid}, function(data) {
				$("#scoreDetailContent").html(data);
				$("#tabwin_add_scoreDetail").popup({md:true});
			});
			
		},
		approvlDetail : function() {
			var creditNo=$("#creditNo").val();
			$.post("xascf/credit/approvalDetail.shtml", {"creditNo":creditNo}, function(data) {
				$("#evaluateReportContent").html(data);
				$("#popTitle").html('审批记录列表');
				$("#tabwin_add_evaluateReportPop").popup({md:true});
			});
			
		}
	};
}();