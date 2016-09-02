 $(document).ready(function(){
	PUI.plugin.init();
	sns.valid.init($("form"));
	
	$("#agDiv").hide();
	$("#incomeLLdiv").hide();
	$("#expireDiv").hide();
	$("#expireDiv2").hide();
	
	//融入种类下拉框change事件
	$("#incomeType").on("change", function(){
		var _thisVal=$(this).val();
		if(_thisVal=='01'){
			$("#agDiv").hide();
			$("#incomeLLdiv").hide();
			$("#expireDiv").hide();
			$("#expireDiv2").hide();
			
			$("#incomeNo").val("");
			$("#incomeAmount").val("");
			$("#incomeDate").val("");
			$("#incomeSource").val("");
			$("#fundRate").val("");
			$("#expireDate").val("");
			$("#expireDate2").val("");
			
			$("#fundRate").removeAttr("readonly");
			$("#incomeAmount").removeAttr("readonly");
			$("#incomeSource").removeAttr("readonly");
		}else if(_thisVal=='03'){
			$("#incomeLLdiv").show();
			$("#agDiv").show();
			$("#expireDiv").hide();
			$("#expireDiv2").show();
			
			$("#incomeNo").val("");
			$("#incomeAmount").val("");
			$("#incomeDate").val("");
			$("#incomeSource").val("");
			$("#fundRate").val("");
			$("#expireDate").val("");
			$("#expireDate2").val("");
			
			$("#fundRate").attr("readonly","readonly");
			$("#incomeAmount").attr("readonly","readonly");
			$("#incomeSource").attr("readonly","readonly");
		}else{
			$("#agDiv").hide();
			$("#incomeLLdiv").show();
			$("#expireDiv").show();
			$("#expireDiv2").hide();
			
			$("#incomeNo").val("");
			$("#incomeAmount").val("");
			$("#incomeDate").val("");
			$("#incomeSource").val("");
			$("#fundRate").val("");
			$("#expireDate").val("");
			$("#expireDate2").val("");
			
			$("#fundRate").removeAttr("readonly");
			$("#incomeAmount").removeAttr("readonly");
			$("#incomeSource").removeAttr("readonly");
		}
	});
});
		
var _cols = [
    { title:'逻辑ID', name:'fundIncomePid' ,width:180,hidden:true ,align:'center', sortable: true, type: 'object'},
    { title:'融入单号', name:'incomeNo' ,width:120, align:'left', sortable: true, type: 'object'},
    { title:'交易流水号', name:'transactionSerialNo' ,width:180, align:'center', sortable: true, type: 'object'},
    { title:'融入银行账号', name:'bankNo' ,width:180, align:'center', sortable: true, type: 'object'},
   
    { title:'融入金额', name:'incomeAmount' ,width:120, align:'center', sortable: true, type: 'object',
    	 renderer: function(val){return formatMoney(val)+' 元'}},
//    { title:'现有金额', name:'currentAmount' ,width:80, align:'center', sortable: true, type: 'object'},
    { title:'利率', name:'fundRate' ,width:50, align:'center', sortable: true, type: 'object',
    		 renderer: function(val){
    			 if(val!=null)
    			 return val+'%';
    			 else return '';}},
    { title:'币种', name:'currency' ,width:80, align:'center', sortable: true, type: 'object', hidden:true},
    { title:'币种', name:'currencyCn' ,width:80, align:'center', sortable: true, type: 'object'},
    { title:'融入日期', name:'incomeDate' ,width:180, align:'center', sortable: true, type: 'object'},
    { title:'到期日期', name:'expireDate' ,width:100, align:'center', sortable: true, type: 'object'},
    { title:'融入种类', name:'incomeType' ,width:80, align:'center', sortable: true, type: 'object', hidden:true},
    { title:'融入种类', name:'incomeTypeCn' ,width:80, align:'center', sortable: true, type: 'object'},
    { title:'来源', name:'incomeSource' ,width:180, align:'center', sortable: true, type: 'object'},
];


var fundIncome_mmg =  $("#fundIncome_mmg").mmGrid({
	height : getAutoHeightByMmGrid($("#xascfMainPanel")),
	cols : _cols,
	url : 'xascf/fund/fundIncome/getFundIncomeList.shtml',
	params : $("#fundIncomeQueryForm").serialize(),
	method : 'post',
	autoLoad : true,
	indexCol : true,
	indexColWidth : 15,
	sortName : 'id',
	sortStatus : 'desc',
	fullWidthRows : true,
	cache : false,
	multiSelect: true,
	checkCol : true,
	plugins : [$('#pg').mmPaginator({})]
});
   mmGridResizeListener(fundIncome_mmg, $(".page-content"));
var fundIncomeList = function() {
	return {
		/**查询*/
		query : function() {
            fundIncome_mmg.load($("#fundIncomeQueryForm").serialize());
			
		},
		/**清空**/
		clearQueryForm : function(){
			PUI.util.clearForm($("#fundIncomeQueryForm"));
		},
		clearEditorForm : function(){
			PUI.util.clearForm($("#fundIncomeEditorForm"));
		},
		add :function(){
			fundIncomeList.clearEditorForm();
			
			$("#agDiv").hide();
			$("#incomeLLdiv").hide();
			$("#expireDiv").hide();
			$("#expireDiv2").hide();
			
			$("#tabwin_add_fundIncome").popup({md:true});
		},
		cancle : function(){
			$("#tabwin_add_fundIncome").popup({display:false});
		},
		/**编辑**/
		editor :function(){
			if ($("input[class='mmg-check']:checked").length != 1){
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			var item = fundIncome_mmg.selectedRows()[0];
			fundIncomeList.toEditForm(item);
		},
		toEditForm : function(item) {
			//先赋值，再触发incomeType
			$("#incomeType").val(item.incomeType).trigger("liszt:updated");
			$("#incomeType").change();
			
			$("#fundIncomePid").val(item.fundIncomePid);
			$("#transactionSerialNo").val(item.transactionSerialNo);
			$("#bankNo").focus().val(item.bankNo);
			$("#incomeNo").val(item.incomeNo);
			$("#incomeAmount").val(item.incomeAmount);
			$("#incomeDate").val(item.incomeDate);
			$("#incomeSource").val(item.incomeSource);
			$("#fundRate").val(item.fundRate);
			$("#expireDate").val(item.expireDate);
			$("#expireDate2").val(item.expireDate);
			$("#currency").val(item.currency).trigger("liszt:updated");
			
			$("#tabwin_add_fundIncome").popup({md:true});
		},
		saveFundIncome : function() {
			if (!$("#fundIncomeEditorForm").isValid()) {
					return;
			}
			var params = $("#fundIncomeEditorForm").serializeArray();
			PUI.MessageBox.show({
				title: "提示",
				content: "请核对资金融入信息，一旦保存将无法修改！确定要保存吗？",
				type: "alert",
				buttons: [{ value: "是" },{ value: "否" }],
				success: function (result) {
				   if (result == "是") {
						$.post("xascf/fund/fundIncome/saveFundIncome.shtml",params,function(data){
						 		var message=data;
								if(message.result){
									fundIncomeList.cancle();
									fundIncomeList.query();
								}
								PUI.MessageBox.info(message.msg);
							},"json");
				   }
			    }
			});

		},
		/**删除*/
		deleteFundIncome : function() {
			var str = new Array();
			$.each(fundIncome_mmg.selectedRows(), function(i, n) {
				str.push("fundIncomePids=" + n.fundIncomePid);
			});
			/**选中才能删除 */
			if (str == "") {
				PUI.MessageBox.alert("请至少选中一条记录");

			} else {
				PUI.MessageBox.show({
				    title: "删除资金账号信息",
				    content: "你确定要删除资金账号信息吗？",
				    type: "alert",
				    buttons: [{ value: "是" },{ value: "否" }],
				    success: function (result) {
				        if (result == "是") {
				        	$.post("xascf/fund/fundIncome/deleteFundIncome.shtml",
							str.join("&"), function(data) {
			 					var message=data;
								if(message.result){
			        				fundIncomeList.query();
								}
								PUI.MessageBox.info(message.msg);
							});					
			        	}
			    	}
				});
			}
		}
	};
}();

