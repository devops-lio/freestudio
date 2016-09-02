 $(document).ready(function(){
 	PUI.plugin.init();
	sns.valid.init($("form"));
});
 var ch_cols = [
        { title:'放款单号', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
    	renderer: function(val){
    		return '<a class="btnPrice" href="javascript:void(0)" onclick="fancingOrderDetail4Pop.fancingDetail(\''+val.fancingOrderNo+'\')">'+val.fancingOrderNo+'</a>';
    	}
    },
    { title:'状态', name:'fancingOrderItem' ,width:80, align:'center', sortable: true, type: 'object',
    	      renderer: function(val){return '<span >'+val.fancingStatusCn+'</span>'}},
	{ title:'操作', name:'' ,width:70, align:'center', sortable: true, type: 'String',
		renderer: function(val,item,rowIndex){
			var orderNo=item.fancingOrderItem.fancingOrderNo;
			var loanType=item.fancingOrderItem.loanType;
			var bankType=item.fancingOrderItem.bankType;
			return '<a class="btnPrice" href="javascript:void(0)" onclick="LoanRequestList.fancingEdit(\''+orderNo+'\',\''+loanType+'\',\''+bankType+'\')">编辑</a>';
 	 }},
    { title:'会员名称', name:'fancingOrderItem' ,width:230, align:'left', sortable: true, type: 'object',
        renderer: function(val){return '<span style=""><a href="#" onclick="customerDetailPop.customerDetail(\''+val.menberPid+'\')">'
	    	  +val.menberName+'</a></span>'}},
  { title:'委托方名称', name:'fancingOrderItem' ,width:300, align:'left', sortable: true, type: 'object',
	  renderer: function(val){return '<span style=""><a href="#" onclick="customerDetailPop.buyerDetail(\''+val.buyerPid+'\')">'
		  +val.buyerName+'</a></span>'}},    	  
    { title:'申请时间', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
        renderer: function(val){return val.requestTime}},
        { title:'申请来源', name:'fancingOrderItem' ,width:80, align:'center', sortable: true, type: 'object',
        	renderer: function(val){return val.fancingFromCn}},      
    { title:'申请金额', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
        renderer: function(val){return formatMoney(val.requestPrice)+' 元'}},
    { title:'批复金额', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
        renderer: function(val){
        	if(val.replyPrice==null)
        		return '';
        	else
        		return formatMoney(val.replyPrice)+' 元'}},
        		{ title:'放款时间', name:'fancingOrderItem' ,width:80, align:'center', sortable: true, type: 'object',
        	        renderer: function(val){return val.payTime}},
    { title:'预计回款日', name:'fancingOrderItem' ,width:80, align:'center', sortable: true, type: 'object',
        renderer: function(val){
        	return val.termDate;
        }
    }
   ];
var	waitCheck_mmg =  $("#waitCheck_mmg").mmGrid({
		height : getAutoHeightByMmGrid($("#xascfMainPanel")),
		cols : ch_cols,
		url : 'xascf/fancing/page.shtml?type=ALL',
		params : $("#fancingListQueryForm").serialize(),
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
		plugins : [$('#waitCheck_pg').mmPaginator({})]
	});
	mmGridResizeListener(waitCheck_mmg, $(".page-content"));

var LoanRequestList = function() {
	return {
		
		/**查询*/
		query : function() {
			waitCheck_mmg.load($("#fancingListQueryForm").serialize());
		},
		
		/**清空**/
		clear : function(){
			PUI.util.resetForm($("#fancingListQueryForm"));
		},
		/**
		 * 编辑
		 */
		fancingEdit :function (orderNo,loanType,bankType){
			$.post("xascf/fancing/toEditInSpecial.shtml",{orderNo:orderNo,isSpecial:"1"},function(data){  
				$("#xascfMainPanel").empty();
				$("#xascfMainPanel").append(data);
				
				//放款综合查询编辑页面 隐藏页面统计数据
				$("#loanStat").hide();
				
				$("#loanType").val(loanType).trigger("liszt:updated");
			});
		}
	};
}();