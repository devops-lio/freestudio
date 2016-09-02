$(document).ready(function () {
	PUI.plugin.init();
	sns.valid.init($("form"));
	

});

var financing_cols = [
    { title:'融资单号', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
    	renderer: function(val){
    		return '<a class="btnPrice" href="javascript:void(0)" onclick="fancingDetail(\''+val.fancingOrderNo+'\')">'+val.fancingOrderNo+'</a>';
    	}
    },
    { title:'融资企业', name:'fancingOrderItem' ,width:150, align:'center', sortable: true, type: 'object',
        renderer: function(val){return val.requestName}
    },
    { title:'申请时间', name:'fancingOrderItem' ,width:150, align:'center', sortable: true, type: 'object',
        renderer: function(val){return val.fancingRequestDateStr}
    },
    { title:'申请金额(元)', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
        renderer: function(val){return formatMoney(val.fancingRequestPrice)}
    },
    { title:'预放款时间', name:'fancingOrderItem' ,width:180, align:'center', sortable: true, type: 'object',
    	renderer: function(val){return val.fancingEstimateDateStr}
   	},
   	{ title:'操作', name:'' ,width:80, align:'center',sortable: true, type: 'String', 
    	renderer: function(val,item,rowIndex){
    		return '<a class="btnPrice" href="javascript:void(0)" onclick="financingEvaluateList.evaluate(\''+rowIndex+'\')">评估' +  '</a>'
    	}
    } 
];
var financing_mmg =  $("#financing_mmg").mmGrid({
	height : getAutoHeightByMmGrid($("#xascfMainPanel")),
	cols : financing_cols,
	url : 'xascf/fancing/page.shtml?type=PGING',
	params : $("#evaluateResultQueryForm").serialize(),
	method : 'post',
	autoLoad : true,
	indexCol : true,
	indexColWidth : 15,
	sortName : 'id',
	sortStatus : 'desc',
	fullWidthRows : true,
	cache : false,
	multiSelect: true,
	plugins : [$('#pg').mmPaginator({})]
});

var financingEvaluateList = function() {
	return {
		/**评估*/
		evaluate : function(rowIndex) {
			var item=financing_mmg.row(rowIndex);
			var fancingOrderNo = item.fancingOrderItem.fancingOrderNo;
			$.post("xascf/rm/templateIndex/getFinancingTemplateIndex.shtml",{fancingOrderNo:fancingOrderNo},function(data){
		 		$("#evaluateTableDiv").show();
				$("#indexTableId").html("");
				PUI.util.clearForm($("#indexFormId"));
				$("#fancingOrderNo").val(fancingOrderNo);
				$("#fancingPid").val(item.fancingOrderItem.fancingPid);
		 		$("#indexTableId").append(data);
		 		initBySpanScore();
				bindChangeEvent();	
				$("#indexTableId").find("input:first").focus();
			});			
		},
		/**查询**/
		query : function(){
			financing_mmg.load($("#evaluateResultQueryForm").serialize());
		},
		/**清空**/
		clear : function(){
			PUI.util.clearForm($("#evaluateResultQueryForm"));
		},
		save : function(){
			PUI.MessageBox.show({
				title: "保存融资单评估",
				content: "你确定要保存融资单评估吗？",
				type: "alert",
				buttons: [{ value: "是" },{ value: "否" }],
				success: function (result) {
				   if (result == "是") {
				   		var params = $("#indexFormId").serializeArray();
						params = pushResultItemToParam(params);
						params.push({ //评估类型
							name: 'evaluateType',
							value: '3'
						});
				   		$.post("xascf/rm/evaluateResult/saveEvaluateResult.shtml",params,function(data){
				   			var message=data;
							if(message.result){
								$("#indexTableId").html("");
								PUI.util.clearForm($("#indexFormId"));
		 						$("#evaluateTableDiv").hide();
		 						financingEvaluateList.query();
							}
							PUI.MessageBox.info(message.msg);
				   		},"json");
				   }
			    }
			});

		}
	};
}();


