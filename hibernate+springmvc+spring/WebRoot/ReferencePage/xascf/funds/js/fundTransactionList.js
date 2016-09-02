 $(document).ready(function(){
	PUI.plugin.init();
	sns.valid.init($("form"));
});
		
var _cols = [
    { title:'逻辑ID', name:'fundTransactionPid' ,width:150,hidden:true ,align:'center', sortable: true, type: 'object'},
    { title:'交易流水号', name:'transactionSerialNo' ,width:150, align:'center', sortable: true, type: 'object'},
    { title:'流水号类型', name:'serialType' ,width:150, align:'center', sortable: true, type: 'object'},
    { title:'业务编号', name:'businessNo' ,width:150, align:'center', sortable: true, type: 'object'},
    { title:'交易时间', name:'transactionDate' ,width:150, align:'center', sortable: true, type: 'date'},
    { title:'交易金额', name:'transactionAmount' ,width:80, align:'center', sortable: true, type: 'object'},
    { title:'交易类型', name:'transactionType' ,width:80, align:'center', sortable: true, type: 'object'},
    { title:'资金账号', name:'transactionObjectAccount' ,width:150, align:'center', sortable: true, type: 'object'},
    { title:'业务类型', name:'businessType' ,width:80, align:'center', sortable: true, type: 'object'},
    { title:'融入种类', name:'incomeType' ,width:80, align:'center', sortable: true, type: 'object'},
    { title:'资金类型', name:'fundType' ,width:80, align:'center', sortable: true, type: 'object'},
    { title:'交易对象', name:'transactionObject' ,width:150, align:'center', sortable: true, type: 'object'},
    { title:'交易对象账号', name:'bankNo' ,width:150, align:'center', sortable: true, type: 'object'}
];


var fundTransaction_mmg =  $("#fundTransaction_mmg").mmGrid({
	height : getAutoHeightByMmGrid($("#xascfMainPanel")),
	cols : _cols,
	url : 'xascf/fund/fundTransaction/getFundTransactionList.shtml',
	params : $("#fundTransactionQueryForm").serialize(),
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
   mmGridResizeListener(fundTransaction_mmg, $(".page-content"));
var fundTransactionList = function() {
	return {
		/**查询*/
		query : function() {
            fundTransaction_mmg.load($("#fundTransactionQueryForm").serialize());
			
		},
		/**清空**/
		clearQueryForm : function(){
			PUI.util.resetForm($("#fundTransactionQueryForm"));
			$("#companyPid").val("");
		}
	};
}();

