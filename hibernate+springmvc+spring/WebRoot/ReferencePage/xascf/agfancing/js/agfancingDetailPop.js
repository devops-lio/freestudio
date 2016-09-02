var AgfancingDetailPop=function(){
	return {
		/**
		 * 授信详细
		 * @returns
		 */
		creditDetail:function(creditNo,solutionPid){
			if(solutionPid=="-1"){
				solutionPid = "";
			}else{
				solutionPid = $("#solutionPid").val()
			}
			$.post("xascf/agfancing/creditDetail.shtml",{"creditNo":creditNo, 'solutionPid':solutionPid},function(data) {  
				$("#creditDetailContent").html(data);
				$("#creditDetail").popup({md:true});
			}); 
		},
		/**
		 * 会员详细
		 * @returns
		 */
		memberDetail:function(memberNo, memberPid, creditNo){
			$.post("xascf/agfancing/memberDetail.shtml",{"memberNo":memberNo, 'memberPid':memberPid, 'creditNo':creditNo, 'solutionPid':$("#solutionPid").val()},function(data) {  
				$("#customerDetailContent").html(data);
				$("#customerDetail").popup({md:true});
			}); 
		},
		/**
		 * 合同详细
		 * @returns
		 */
		contractDetail:function(contractNo,solutionPid){
			if(solutionPid=="-1"){
				solutionPid = "";
			}else{
				solutionPid = $("#solutionPid").val()
			}
			$.post("xascf/agfancing/contractDetail.shtml",{"contractNo":contractNo, 'solutionPid':solutionPid},function(data) {  
				$("#contractDetailPop").html(data);
				$("#tabwin_add_contractDetailPop").popup({md:true});
			}); 
		},
		/**
		 * 查看报告
		 * @returns
		 */
		viewEvaluateReport:function(evaluateReportId){
			$.post("xascf/rm/evaluateReport/getEvaluateReportEntity.shtml",{"reportPid":evaluateReportId},function(response) {  
				if(response.result){
					var fileName = response.data.fileName;
					var fileUrl = response.data.fileUrl;
					if (fileUrl==""||fileUrl==null||fileUrl==undefined){
						PUI.MessageBox.alert("未找到调查报告文件");
						return;
					}else{
						FileUtil.downLoad(response.data.fileUrl,response.data.fileName);
					}
				}
			}); 
		}
	};
}();

		