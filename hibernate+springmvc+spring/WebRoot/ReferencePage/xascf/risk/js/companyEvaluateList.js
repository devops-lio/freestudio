$(document).ready(function () {
	PUI.plugin.init();
	sns.valid.init($("form"));
//	var requestType=$("#requestType").val();
//	if(requestType=='2'){
//		$("#evalAdd").hide();
//		$("#evalEdit").hide();
//		$("#evalDel").hide();
//	}
		
});

var cols = new Array(
	{ title:'PID', name:'reportPid', hidden: true}, 
	{ title:'评估对象', name:'reportObjectName' ,width:140, align:'center', sortable: true, type: 'string'},
	{ title:'评估标题', name:'reportTitle' ,width:150, align:'center', sortable: true, type: 'string'},
	{ title:'报告人',name:'operator', width: 120, align: 'center',lockWidth:true,sortable: true, type: 'object'}, 
	{ title:'报告时间', name:'reportTime' ,width:130, align:'center', sortable: true, type: 'string'},
	{ title:'附件', name:'fileName' ,width:130, align:'center', sortable: true, type: 'string', 
		renderer: function(val,item,rowIndex){
						if (val==""||val==null||val==undefined) val="";
						return '<a href="javascript:void(0)" ' +
							'onclick="FileUtil.downLoad(\''+item.fileUrl+'\', \''+item.fileName+'\')">'+val+'</a>';
					}
	}
);
			
mmg =  $("#mmg_evaluateReport").mmGrid({
	height:getAutoHeightByMmGrid($("#xascfMainPanel"))-50,
	cols: cols,
	url: 'xascf/rm/evaluateReport/getEvaluateReportList.shtml',
	params: $("#evaluateResultQueryForm").serialize(),
	method: 'post',
	checkCol : true,
	autoLoad: true,
	fullWidthRows: true,
	indexColWidth: 15, 
	cache: false,
	multiSelect: true,
	nowrap: true,
	plugins: [$('#pg').mmPaginator({})] 
});
mmGridResizeListener(mmg, $(".page-content")); 

var companyEvaluateList = function() {
	return {
		/**返回*/
		reback:function(){
			var type=$("#requestType").val();
			if(type=='1')
				Menu.forward("xascf/customer/jsp/comapanyInfo.jsp");
			else{
				Menu.forward("xascf/customer/jsp/comapanyInfoAll.jsp");
			}
		},
		/**查询*/
		query : function(){
			mmg.load($("#evaluateResultQueryForm").serialize());
		},
		/**清空**/
		clear : function(){
			PUI.util.resetForm($("#evaluateResultQueryForm"));
		},
		/**新增*/
		add : function(){
			var requestType=$("#requestType").val()
			$.post("xascf/rm/evaluateReport/toCompanyEvaluateReportPage.shtml",{"customersubPid":$("#reportObjectPid").val()}, function(data) {
				$("#xascfMainPanel").html(data);
				$("#requestType").val(requestType);
			});
		},
		/**编辑评估报告*/
		editEvaluateReport : function(){
			if ($("input[class='mmg-check']:checked").length != 1){
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			var requestType=$("#requestType").val()
			var item = mmg.selectedRows()[0];
			$.post("xascf/rm/evaluateReport/getTitlesInCreditByPidList.shtml",
				{"reportPids":item.reportPid}, function(data) {
 					var message=data;
					if(!message.result&&requestType!="2"){
						PUI.MessageBox.alert(message.msg+" 已在授信中使用，不能编辑!");
					} else{
						$.ajax({  
			         		type : "post",  
			         		url : "xascf/rm/evaluateReport/getEvaluateReport2.shtml",  
			          		data : "reportPid=" + item.reportPid,  
			          		async : false,  
			         		 success : function(data){
								$("#xascfMainPanel").html(data);
								$("#saveType").val("update");
								$("#requestType").val(requestType);
//								var $evaluateReportDiv = $("#evaluateReportDiv");
//			         		 	$evaluateReportDiv.find("div[class='select']").each(
//									function(){
//										var i=0;
//										$(this).find("div[class='chosen-container chosen-container-single chosen-container-single-nosearch']").each(function(){
//											if(i>0){
//												//$(this).css("display","none");
//												$(this).replaceWith("");
//											}
//											i++;
//										});
//										
//										$(this).find("div[class='chosen-container chosen-container-single chosen-container-single-nosearch chosen-container-active']").each(function(){
//										if(i>0){
//												//$(this).css("display","none");
//												$(this).replaceWith("");
//											}
//										});
//									}
//								);
			          		}  
			     		}); 

					}
				}
			);	

//         	Menu.forward('xascf/risk/jsp/companyEvaluateReport.jsp');
		},
		/**删除**/
		deleteEvaluateReport:function(){		
			var str = new Array();
			$.each(mmg.selectedRows(), function(i, n) {
				str.push("reportPids=" + n.reportPid);
			});

			/**选中才能删除 */
			if (str == "") {
				PUI.MessageBox.alert("请至少选中一条记录");

			} else {
				$.post("xascf/rm/evaluateReport/getTitlesInCreditByPidList.shtml",
					str.join("&"), function(data) {
	 					var message=data;
						if(!message.result){
							PUI.MessageBox.alert(message.msg+" 已在授信中使用，不能删除!");
						} else {
							PUI.MessageBox.show({
							    title: "删除评估报告信息",
							    content: "你确定要删除评估报告信息吗？",
							    type: "alert",
							    buttons: [{ value: "是" },{ value: "否" }],
							    success: function (result) {
							        if (result == "是") {
							        	$.post("xascf/rm/evaluateReport/deleteEvaluateReport.shtml",
										str.join("&"), function(data) {
						 					var message=data;
											if(message.result){
						        				companyEvaluateList.query();
											}
											PUI.MessageBox.info(message.msg);
										});	
						        	}
						    	}
							});

						}
					}
				);	

			}
		
		},
		/**评估报告预览*/
		reportPreview : function(){
			if ($("input[class='mmg-check']:checked").length != 1){
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			var requestType=$("#requestType").val()
			var item = mmg.selectedRows()[0];
			$.post("xascf/rm/evaluateReport/toReportPreviewPage.shtml",{"reportPid":item.reportPid}, function(data) {
				$("#xascfMainPanel").html(data);
				$("#requestType").val(requestType);
				replaceDocument();
			});
		}
	};
}();


