 $(document).ready(function(){
 	PUI.plugin.init();
	sns.valid.init($("form"));
});
var _cols = [
    { title:'放款单号', name:'fancingOrderItem' ,width:100, align:'center', sortable: true, type: 'object',
    	renderer: function(val){
    		return '<a class="btnPrice" href="javascript:void(0)" onclick="fancingOrderDetail4Pop.fancingDetail(\''+val.fancingOrderNo+'\')">'+val.fancingOrderNo+'</a>';
    	}
    },
	{ title:'操作', name:'' ,width:60, align:'center', sortable: true, type: 'String',
	 	  renderer: function(val,item,rowIndex){
 			  var orderNo=item.fancingOrderItem.fancingOrderNo;
 			  var loanType=item.fancingOrderItem.loanType;
 			  var bankType=item.fancingOrderItem.bankType;
	    	  return  '<a class="btnPrice" href="javascript:void(0)" onclick="BalancePaymentList.fancingEdit(\''+orderNo+'\',\''+bankType+'\')">尾款申请</a>';
 	 }},	      
    { title:'会员名称', name:'fancingOrderItem' ,width:150, align:'left', sortable: true, type: 'object',
        renderer: function(val){
        	return '<span style=""><a href="#" onclick="customerDetailPop.customerDetail(\''+val.menberPid+'\')">' +val.menberName+'</a></span>'}},
    { title:'申请时间', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
        renderer: function(val){return val.requestTime}},
    { title:'申请金额(元)', name:'fancingOrderItem' ,width:100, align:'center', sortable: true, type: 'object',
        renderer: function(val){return formatMoney(val.requestPrice)}},
    { title:'批复总金额(元)', name:'fancingOrderItem' ,width:100, align:'center', sortable: true, type: 'object',
        renderer: function(val){return formatMoney(val.requestReplyPrice)}},
    { title:'预付金额(元)', name:'fancingOrderItem' ,width:100, align:'center', sortable: true, type: 'object',
        renderer: function(val){return formatMoney(val.replyPrice)}},
    { title:'尾款金额(元)', name:'fancingOrderItem' ,width:100, align:'center', sortable: true, type: 'object',
        renderer: function(val){return formatMoney(val.lostPrice)}}
];
var balancePayment_mmg =  $("#balancePayment_mmg").mmGrid({
	height : getAutoHeightByMmGrid($("#xascfMainPanel")),
	cols : _cols,
	url : 'xascf/fancing/getBalancePaymentList.shtml',
	params : $("#fancingListQueryForm").serialize(),
	method : 'post',
	autoLoad : true,
	indexCol : true,
	indexColWidth : 15,
	sortName : 'id',
	sortStatus : 'desc',
	fullWidthRows : true,
	cache : false,
	multiSelect: true,
	plugins : [$('#balancePayment_pg').mmPaginator({})]
});

var BalancePaymentList = function() {
	return {
		/**查询*/
		query : function() {
			balancePayment_mmg.load($("#fancingListQueryForm").serialize());
		},
		/**
		 * 编辑
		 */
		fancingEdit :function (orderNo,bankType){
			$.post("xascf/fancing/toBalancePaymentEdit.shtml",{orderNo:orderNo},function(data){  
				$("#xascfMainPanel").empty();
				$("#xascfMainPanel").append(data);
				$("#bankType").val(bankType).trigger("liszt:updated");
				$("#bankType").attr("disabled","disabled");
			});
		},
		/**清空**/
		clear : function(){
			PUI.util.resetForm($("#fancingListQueryForm"));
		}
	};
}();