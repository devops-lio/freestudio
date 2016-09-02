

var reportPreview = function() {
	return {
		/**
		 * 导出
		 */
		exportToWord:function(){
			$.post("xascf/rm/evaluateReport/exportToWord.shtml",
				{"reportContent":$("#reportPreviewDiv").html(),"reportTitle":$("input[name='evaluateReportModel.reportTitle']").val()},
				function(data){
					var dataArry = data.split("|");
					if(dataArry && dataArry[0].indexOf("成功")>0)
						window.open("xascf/util/download.shtml?fileName="+dataArry[1]+"&url="+dataArry[2]);
					else
						PUI.MessageBox.alert("导出失败");
				},
			"json");
		},
		returnList:function(){
			var requestType=$("#requestType").val();
				$.post("xascf/customer/toEvaluateReportPage.shtml",{"memberPid":$("#reportObjectPid").val()}, function(data) {
					$("#xascfMainPanel").html(data);
					$("#requestType").val(requestType);
//					if(requestType=='2'){
//						$("#evalAdd").hide();
//						$("#evalEdit").hide();
//						$("#evalDel").hide();
//					}
				});
		}
	};
}();


