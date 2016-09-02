 $(document).ready(function(){
 	PUI.plugin.init();
	sns.valid.init($("form"));
});
 var order_cols = [
	{ title:'放款单号', name:'fancingOrderNo' ,width:150, align:'center', sortable: true, type: 'object',
		renderer: function(val){
    		return '<a class="btnPrice" href="javascript:void(0)" onclick="fancingOrderDetail4Pop.fancingDetail(\''+val+'\')">'+val+'</a>';
    	}},
    { title:'委托方名称', name:'buyerName' ,width:200, align:'left', sortable: true, type: 'object'},
    { title:'放款金额', name:'replyPrice' ,width:120, align:'center', sortable: true, type: 'object',
    	renderer: function(val){
        	if(val==null)
        		return '';
        	else
        	return formatMoney(val)+' 元'}},    	  
    { title:'放款时间', name:'payToTime' ,width:120, align:'center', sortable: true, type: 'object'},
    { title:'票据总金额', name:'notePrice' ,width:120, align:'center', sortable: true, type: 'object',
        		renderer: function(val){
                	if(val==null)
                		return '';
                	else
                	return formatMoney(val)+' 元'}},
	{ title:'再融资资金方', name:'agCustomerName' ,width:100, align:'center', sortable: true, type: 'object',
		renderer: function(val){
			if(val==null)
				return '';
			else
				return val}},
	{ title:'再融资账单总额', name:'agBillPrice' ,width:100, align:'center', sortable: true, type: 'object',
		renderer: function(val){
			if(val==null)
				return '';
			else
				return formatMoney(val)+' 元'}},
    { title:'票据折扣后金额', name:'noteDisprice' ,width:120, align:'center', sortable: true, type: 'object',
                		renderer: function(val){
                        	if(val==null)
                        		return '';
                        	else
                        	return formatMoney(val)+' 元'}},      
    { title:'提交日期', name:'requestTime' ,width:100, align:'center', sortable: true, type: 'String'},
    { title:'票据类型', name:'noteType' ,width:70, align:'center', sortable: true, type: 'object'},
    { title:'放款状态', name:'fancingStatus' ,width:70, align:'center', sortable: true, type: 'object'},
    { title:'预计回款日', name:'termDate' ,width:100, align:'center', sortable: true, type: 'object'},      
    { title:'最迟还款日', name:'latestTime' ,width:100, align:'center', sortable: true, type: 'object'},
    { title:'回款金额', name:'billPrice' ,width:120, align:'center', sortable: true, type: 'object',
    	renderer: function(val){
        	if(val==null)
        		return '';
        	else
        	return formatMoney(val)+' 元'}},
    { title:'回款时间', name:'payTime' ,width:100, align:'center', sortable: true, type: 'object'} 	 
    
   ];
var	order_mmg =  $("#order_mmg").mmGrid({
		height : getAutoHeightByMmGrid($("#xascfMainPanel")),
		cols : order_cols,
		url : 'xascf/businessQuery/businessOrderPage.shtml',
		params : $("#fancingOrderQueryForm").serialize(),
		method : 'post',
		autoLoad : true,
		indexCol : true,
		indexColWidth : 15,
		showBackboard:false,
		sortName : 'id',
		sortStatus : 'desc',
		fullWidthRows : true,
		cache : false,
		multiSelect: true,
		plugins : [$('#order_pg').mmPaginator({})]
	});
	mmGridResizeListener(order_mmg, $(".page-content"));
	
order_mmg.on("loadSuccess",function(e,data){
	$("#allFancingMsg").html(data.msg);
});

var FancingOrderDetail = function() {
	return {
		
		/**查询*/
		query : function() {
			order_mmg.load($("#fancingOrderQueryForm").serialize());
		},
		
		/**清空**/
		clear : function(){
			PUI.util.resetForm($("#fancingOrderQueryForm"));
		}
	};
}();