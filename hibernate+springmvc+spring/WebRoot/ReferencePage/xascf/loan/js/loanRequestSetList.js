 $(document).ready(function(){
 	PUI.plugin.init();
	sns.valid.init($("form"));
});
 var ch_cols = [
       { title:'放款单号', name:'fancingOrderItem' ,width:100, align:'center', sortable: true, type: 'object',
	    	renderer: function(val){
	    		return '<a class="btnPrice" href="javascript:void(0)" onclick="fancingOrderDetail4Pop.fancingDetail(\''+val.fancingOrderNo+'\')">'+val.fancingOrderNo+'</a>';
	    	}
	    },
	    { title:'操作', name:'' ,width:40, align:'center', sortable: true, type: 'String',
		 	  renderer: function(val,item,rowIndex){
		 		 var orderNo=item.fancingOrderItem.fancingOrderNo;
			  return '<a class="btnPrice" href="javascript:void(0)" onclick="LoanRequestConfir.fancingCheck(\''+orderNo+'\',\''+rowIndex+'\')">审批</a>';
	 	 }},
	    { title:'会员名称', name:'fancingOrderItem' ,width:300, align:'left', sortable: true, type: 'object',
	        renderer: function(val){return '<span style=""><a href="#" onclick="customerDetailPop.customerDetail(\''+val.menberPid+'\')">'
	    	  +val.menberName+'</a></span>'}},
	  { title:'委托方名称', name:'fancingOrderItem' ,width:300, align:'left', sortable: true, type: 'object',
		  renderer: function(val){return '<span style=""><a href="#" onclick="customerDetailPop.buyerDetail(\''+val.buyerPid+'\')">'
			  +val.buyerName+'</a></span>'}}, 	  	  
	    { title:'申请时间', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
	        renderer: function(val){return val.requestTime}},
        { title:'申请来源', name:'fancingOrderItem' ,width:70, align:'center', sortable: true, type: 'object',
        	renderer: function(val){return val.fancingFromCn}},
	    { title:'申请金额', name:'fancingOrderItem' ,width:100, align:'center', sortable: true, type: 'object',
	        renderer: function(val){return formatMoney(val.requestPrice)+' 元'}}
       
   ];
var	waitCheck_mmg =  $("#waitCheck_mmg").mmGrid({
		height : getAutoHeightByMmGrid($("#xascfMainPanel")),
		cols : ch_cols,
		url : 'xascf/fancing/page.shtml?type=WAITSET',
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

var LoanRequestConfir = function() {
	return {
		
		/**查询*/
		query : function() {
			waitCheck_mmg.load($("#fancingListQueryForm").serialize());
		},
		/**
		 * 编辑
		 */
		fancingCheck :function (orderNo,rowIndex){
			var item=waitCheck_mmg.row(rowIndex);
			var termType=item.fancingOrderItem.termType;
			var rebackType=item.fancingOrderItem.rebackType;
			var rateCycle=item.fancingOrderItem.rateCycle;
			$.post("xascf/fancing/toFKZYSD.shtml",{orderNo:orderNo},function(data){ 
				$("#xascfMainPanel").empty();
				$("#xascfMainPanel").append(data);
				$("#termType").val(termType).trigger("liszt:updated");
				$("#rebackType").val(rebackType).trigger("liszt:updated");
				$("#rateCycle").val(rateCycle).trigger("liszt:updated");
				if(rebackType=='2'){
					$("#lxjszq").show();
				}
			});
		},
		
		/**清空**/
		clear : function(){
			PUI.util.resetForm($("#fancingListQueryForm"));
		}
	};
}();