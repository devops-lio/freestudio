$(document).ready(function () {
	PUI.plugin.init();
	sns.valid.init($("form"));
});

var cols = new Array(
	{ title:'逻辑ID', name:'customerPid', hidden: true}, 
	{ title:'会员编号', name:'memberNo' ,width:140, align:'center', sortable: true, type: 'string'},
	{ title:'姓名', name:'customerName' ,width:150, align:'center', sortable: true, type: 'string'},
	{ title:'联系方式',name:'mobile', width: 120, align: 'center',lockWidth:true,sortable: true, type: 'object'}, 
	{ title:'身份证号', name:'cardNo' ,width:130, align:'center', sortable: true, type: 'string'},
	{ title:'邮箱', name:'emill' ,width:150, align:'center', sortable: true, type: 'string'},  
	{ title:'操作', name:'customerPid' ,width:150, align:'center', sortable: true, type: 'string',
		renderer: function(val,item,rowIndex){
			var operatorHtml = ""
			var evaluateResultPid = item.evaluateResultPid;
			if(evaluateResultPid)
				operatorHtml += '<a class="btnPrice" href="javascript:void(0)" onclick="customerEvaluateList.evaluateAgain(\''+rowIndex+'\')">重新评估'+'</a>'
					+'&nbsp&nbsp<a class="btnPrice" href="javascript:void(0)" onclick="customerEvaluateList.getResult(\''+rowIndex+'\')">评估结果'+'</a>';
			else
				operatorHtml += '<a class="btnPrice" href="javascript:void(0)" onclick="customerEvaluateList.evaluate(\''+rowIndex+'\')">评估' +  '</a>';
//			var reportPid = item.reportPid;
//			if(reportPid)
//				operatorHtml += '&nbsp&nbsp<a class="btnPrice" href="javascript:void(0)" onclick="customerEvaluateList.evaluateAgain(\''+rowIndex+'\')">编辑报告'+'</a>'
//					+'&nbsp&nbsp<a class="btnPrice" href="javascript:void(0)" onclick="customerEvaluateList.getResult(\''+rowIndex+'\')">报告预览'+'</a>';
//			else
//				operatorHtml += '&nbsp&nbsp<a class="btnPrice" href="javascript:void(0)" onclick="customerEvaluateList.evaluate(\''+rowIndex+'\')">生成报告' +  '</a>';
			return operatorHtml;
    	}
	}
);
			
mmg =  $("#mmg-customer").mmGrid({
	height: 290,
	cols: cols,
	url: 'xascf/customer/customerUserPage4Risk.shtml',
	params: $("#evaluateResultQueryForm").serialize(),
	method: 'post',
	autoLoad: true,
	fullWidthRows: true,
	indexColWidth: 15, 
	cache: false,
	multiSelect: true,
	nowrap: true,
	plugins: [$('#pg').mmPaginator({})] 
});


var customerEvaluateList = function() {
	return {
		/**评估*/
		evaluate : function(rowIndex) {
			var item=mmg.row(rowIndex);
			var customerPid = item.customerPid;
			$("#evaluateTableDiv").show();
			$("#indexTableId").html("");
			PUI.util.clearForm($("#indexFormId"));
			$.post("xascf/rm/templateIndex/getCustomerTemplateIndex.shtml",{customerPid:customerPid},function(data){
				$("#evaluateTableDiv").show();
				$("#saveBtnDiv").show();
				$("#indexTableId").html("");
				PUI.util.clearForm($("#indexFormId"));
				var customerName = item.customerName;
				var memberno = item.memberNo;
				$("#evaluateObjectPid").val(customerPid);
				$("#evaluateObjectName").val(customerName);
				$("#evaluateObjectNo").val(memberno);
				$("#customerNameSpan").html(customerName);
				$("#membernoSpan").html(memberno);

		 		$("#indexTableId").append(data);
				$("#indexTableId").find("input:first").focus();
				initBySpanScore();
				bindChangeEvent();		 			
			});			
		},
		/**重新评估*/
		evaluateAgain : function(rowIndex) {
			PUI.MessageBox.show({
				title: "重新评估",
				content: "你确定要重新进行客户评估吗？评估保存后，将覆盖之前的评估结果。",
				type: "alert",
				buttons: [{ value: "是" },{ value: "否" }],
				success: function (result) {
				   if (result == "是") {
				   		customerEvaluateList.evaluate(rowIndex);
				   }
			    }
			});

		},
		/**获取评估结果*/
		getResult : function(rowIndex) {
			var item=mmg.row(rowIndex);
			var customerPid = item.customerPid;
			$.post("xascf/rm/evaluateResult/getEvaluateResult.shtml",{evaluateObjectPid:customerPid},function(data){
				$("#evaluateTableDiv").show();
				$("#indexTableId").html("");
				PUI.util.clearForm($("#indexFormId"));
				var customerName = item.customerName;
				var memberno = item.memberNo;
				$("#customerNameSpan").html(customerName);
				$("#membernoSpan").html(memberno);

		 		$("#indexTableId").append(data);
		 		$("#saveBtnDiv").hide();
			});			

		},
		/**保存*/
		save : function() {
			PUI.MessageBox.show({
				title: "保存客户评估",
				content: "你确定要保存客户评估吗？",
				type: "alert",
				buttons: [{ value: "是" },{ value: "否" }],
				success: function (result) {
				   if (result == "是") {
				   		var params = $("#indexFormId").serializeArray();
						params = pushResultItemToParam(params);
						params.push({ //评估类型
							name: 'evaluateType',
							value: '1'
						});
				   		$.post("xascf/rm/evaluateResult/saveEvaluateResult.shtml",params,function(data){
				   			var message=data;
							if(message.result){
								$("#indexTableId").html("");
								PUI.util.clearForm($("#indexFormId"));
		 						$("#evaluateTableDiv").hide();
		 						customerEvaluateList.query();
							}
							PUI.MessageBox.info(message.msg);
				   		},"json");
				   }
			    }
			});

		},
		/**查询*/
		query : function(){
			mmg.load($("#evaluateResultQueryForm").serialize());
		},
		/**清空**/
		clear : function(){
			$("#customersubPid").val("");
			$("#customerName").val("");
		}
	};
}();


