 $(document).ready(function(){
 	PUI.plugin.init();
	sns.valid.init($("form"));
});
 var _cols = [
	{ title:'委托方名称', name:'buyName' ,width:200, align:'left', sortable: true, type: 'object',
		renderer:function(val,item,rowIndex){return '<span style=""><a href="#" onclick="customerDetailPop.buyerDetail(\''+item.buyPid+'\')">'
			  +val+'</a></span>'}},
    { title:'操作', name:'' ,width:70, align:'center', sortable: true, type: 'object',
    	renderer:function(val,item,rowIndex){
    		return "<a onclick='BuyDetail.detailPop(\""+item.buyPid+"\",\""+item.buyName+"\")'>查看明细</a>";
    	}},
    { title:'最高额度', name:'creditPercent' ,width:120, align:'center', sortable: true, type: 'object',
    		renderer: function(val){
            	if(val==null)
            		return '';
            	else
            	return formatMoney(val)+' 元'}},
    { title:'票据类型', name:'billType' ,width:70, align:'center', sortable: true, type: 'object'},    	  
    { title:'票据折扣率', name:'disCount' ,width:70, align:'center', sortable: true, type: 'object',
    	renderer: function(val){
        	if(val==null)
        		return '';
        	else
        	return val+'%'}},
    { title:'当前放款总额', name:'replyPrice' ,width:120, align:'center', sortable: true, type: 'object',
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
    { title:'有效票据总额', name:'notePrice' ,width:120, align:'center', sortable: true, type: 'object',
        		renderer: function(val){
                	if(val==null)
                		return '';
                	else
                	return formatMoney(val)+' 元'}},
    { title:'有效票据折扣总额', name:'noteDisprice' ,width:120, align:'center', sortable: true, type: 'object',
                		renderer: function(val){
                        	if(val==null)
                        		return '';
                        	else
                        	return formatMoney(val)+' 元'}},
    { title:'业务经理', name:'operator' ,width:100, align:'center', sortable: true, type: 'object'} 	  
    
   ];
var	_mmg =  $("#_mmg").mmGrid({
		height : getAutoHeightByMmGrid($("#xascfMainPanel"))-70,
		cols : _cols,
		url : 'xascf/businessQuery/businessBuyPage.shtml',
		params : $("#buyDetailQueryForm").serialize(),
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
		plugins : [$('#pg').mmPaginator({})]
	});
	mmGridResizeListener(_mmg, $(".page-content"));
	
_mmg.on("loadSuccess",function(e,data){
	$("#allMsg").html(data.msg);
});

var BuyDetail = function() {
	return {
		
		/**查询*/
		query : function() {
			_mmg.load($("#buyDetailQueryForm").serialize());
		},
		
		/**清空**/
		clear : function(){
			PUI.util.resetForm($("#buyDetailQueryForm"));
		},
		/**
		 * 查看明细
		 */
		detailPop:function(buyPid,buyName){
			var contractNo=$("#contractNo").val()
			$.post("xascf/businessQuery/forwardToDetaliPop.shtml",{"buyPid":buyPid,"buyName":buyName,"contractNo":contractNo},function(data) {  
				$("#fancingOrderDetailContent3Pop").html(data);
				$("#fancingOrderDetail3pop").popup({md:true});
			}); 
		},
		/**
		 * 返回
		 */
		back:function(){
			$.post("xascf/businessQuery/jsp/businessQuery.jsp",function(data){
				$("#xascfMainPanel").html(data);
			});
		}
	};
}();