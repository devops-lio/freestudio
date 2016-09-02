 $(document).ready(function(){
 	PUI.plugin.init();
	sns.valid.init($("form"));
});
 var ch_cols = [
	{ title:'合同编号', name:'contractNo' ,width:120, align:'left', sortable: true, type: 'object',
		renderer: function(val,item,rowIndex){return '<span style=""><a href="#" onclick="contractDetail(\''+val+'\')">'
	  	     +val+'</a></span>';}},
    { title:'会员名称', name:'memberName' ,width:260, align:'left', sortable: true, type: 'object',
	  	    	renderer: function(val,item,rowIndex){return '<span style=""><a href="#" onclick="customerDetailPop.customerDetail(\''+item.memberPid+'\')">'
	    	    	  +val+'</a></span>'}},
    { title:'操作', name:'' ,width:70, align:'center', sortable: true, type: 'object',
    	renderer:function(val,item,rowIndex){
    		return "<a onclick='BusinessQuery.detail(\""+item.contractNo+"\",\""+item.memberName+"\")'>查看明细</a>";
    	}},
    { title:'批复额度', name:'replyQuota' ,width:120, align:'center', sortable: true, type: 'object',
    		renderer: function(val){
            	if(val==null)
            		return '';
            	else
            	return formatMoney(val)+' 元'}},
    { title:'授信开始日', name:'creditStartTime' ,width:100, align:'center', sortable: true, type: 'object'},
    { title:'授信结束日', name:'creditEndTime' ,width:100, align:'center', sortable: true, type: 'object'},    	  
    { title:'账期利率', name:'termRate' ,width:70, align:'center', sortable: true, type: 'object',
    	renderer: function(val){
        	if(val==null)
        		return '';
        	else
        	return val+'%'}},
    { title:'保证金率', name:'bondRate' ,width:70, align:'center', sortable: true, type: 'object',
        		renderer: function(val){
                	if(val==null)
                		return '';
                	else
                	return val+'%'}},      
    { title:'手续费率', name:'serveRate' ,width:70, align:'center', sortable: true, type: 'object',
                		renderer: function(val){
                        	if(val==null)
                        		return '';
                        	else
                        	return val+'%'}},
    { title:'委托方数', name:'buyTotal' ,width:70, align:'center', sortable: true, type: 'object'},
    { title:'当前放款总额', name:'replyPrice' ,width:100, align:'center', sortable: true, type: 'object',
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
	{ title:'再融资账单总额', name:'agBillAmount' ,width:100, align:'center', sortable: true, type: 'object',
		renderer: function(val){
			if (val==""||val==undefined) val=0.0;
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
		height : getAutoHeightByMmGrid($("#xascfMainPanel")),
		cols : ch_cols,
		url : 'xascf/businessQuery/page.shtml',
		params : $("#bussinessQueryForm").serialize(),
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

var BusinessQuery = function() {
	return {
		
		/**查询*/
		query : function() {
			_mmg.load($("#bussinessQueryForm").serialize());
		},
		
		/**清空**/
		clear : function(){
			PUI.util.resetForm($("#bussinessQueryForm"));
		},
		/**
		 * 查看明细
		 */
		detail:function(contractNo,memberName){
			$.post("xascf/businessQuery/forwardToDetali.shtml",{"contractNo":contractNo,"memberName":memberName},function(data){
				$("#xascfMainPanel").html(data);
			});	
		}
	};
}();