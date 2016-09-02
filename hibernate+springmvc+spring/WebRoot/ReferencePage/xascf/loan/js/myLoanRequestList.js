 $(document).ready(function(){
 	PUI.plugin.init();
	sns.valid.init($("form"));

});
var _cols = [
    { title:'放款单号', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
    	renderer: function(val){
    		return '<a class="btnPrice" href="javascript:void(0)" onclick="fancingOrderDetail4Pop.fancingDetail(\''+val.fancingOrderNo+'\')">'+val.fancingOrderNo+'</a>';
    	}
    },
    { title:'状态', name:'fancingOrderItem' ,width:100, align:'center', sortable: true, type: 'object',
    	      renderer: function(val){return '<span >'+val.fancingStatusCn+'</span>'}},
	{ title:'操作', name:'' ,width:70, align:'center', sortable: true, type: 'String',
	 	  renderer: function(val,item,rowIndex){
	 		  if(item.fancingOrderItem.fancingStatus=='00' || item.fancingOrderItem.fancingStatus=='01'){
	 			  var orderNo=item.fancingOrderItem.fancingOrderNo;
	 			  var loanType=item.fancingOrderItem.loanType;
	 			  var bankType=item.fancingOrderItem.bankType;
		    	 return  '<a class="btnPrice" href="javascript:void(0)" onclick="MyLoanRequestList.fancingEdit(\''+orderNo+'\',\''+loanType+'\',\''+bankType+'\')">编辑</a>|'
		    	 +'<a class="btnPrice" href="javascript:void(0)" onclick="MyLoanRequestList.fancingDelete(\''+orderNo+'\')">删除</a>';
	 		  }else{
	 			  return '';
	 		  }
 	 }},	      
    { title:'会员名称', name:'fancingOrderItem' ,width:300, align:'left', sortable: true, type: 'object',
        renderer: function(val){return '<span style=""><a href="#" onclick="customerDetailPop.customerDetail(\''+val.menberPid+'\')">'
	    	  +val.menberName+'</a></span>'}},
	{ title:'委托方名称', name:'fancingOrderItem' ,width:300, align:'left', sortable: true, type: 'object',
	    		  renderer: function(val){return '<span style=""><a href="#" onclick="customerDetailPop.buyerDetail(\''+val.buyerPid+'\')">'
	    			  +val.buyerName+'</a></span>'}},
  { title:'账单信息', name:'fancingOrderItem' ,width:80, align:'center', sortable: true, type: 'object',
	  renderer: function(val){return '<span style=""><a href="#" onclick="MyLoanRequestList.billDetail(\''+val.fancingOrderNo+'\')">查看</a></span>'}},
    { title:'申请时间', name:'fancingOrderItem' ,width:130, align:'center', sortable: true, type: 'object',
        renderer: function(val){return val.requestTime}},
    { title:'申请金额', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
        renderer: function(val){return formatMoney(val.requestPrice)+' 元'}},
    { title:'批复金额', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
        renderer: function(val){
        	if(val.replyPrice==null)
        		return '';
        	else
        	return formatMoney(val.replyPrice)+' 元'}},
	{ title:'放款时间', name:'fancingOrderItem' ,width:130, align:'center', sortable: true, type: 'object',
        renderer: function(val){return val.payTime}},
    { title:'预计回款日', name:'fancingOrderItem' ,width:80, align:'center', sortable: true, type: 'object',
        renderer: function(val){
        		return val.termDate;
        	
        	}}
];
var all_mmg =  $("#all_mmg").mmGrid({
	height : getAutoHeightByMmGrid($("#xascfMainPanel")),
	cols : _cols,
	url : 'xascf/fancing/page.shtml?type=MYLIST',
	params : $("#fancingListQueryForm").serialize(),
	method : 'post',
	autoLoad : true,
	indexCol : true,
	indexColWidth : 15,
	sortName : 'id',
	sortStatus : 'desc',
	fullWidthRows : true,
	showBackboard:false,
	cache : false,
	multiSelect: true,
	plugins : [$('#all_pg').mmPaginator({})]
});
mmGridResizeListener(all_mmg, $(".page-content"));

var MyLoanRequestList = function() {
	return {
		billDetail :function(fancingNo){
			$.post("xascf/fancing/toBillDetalsPop.shtml",{orderNo:fancingNo},function(data){ 
				$("#tabwin_add_content_detail").html(data);
				$("#tabwin_add_detail").popup({md:true});
			});
		},
		/**查询*/
		query : function() {
			all_mmg.load($("#fancingListQueryForm").serialize());
		},
		/**
		 * 编辑
		 */
		fancingEdit :function (orderNo,loanType,bankType){
			$.post("xascf/fancing/toEdit.shtml",{orderNo:orderNo},function(data){  
				$("#xascfMainPanel").empty();
				$("#xascfMainPanel").append(data);
				$("#bankType").val(bankType).trigger("liszt:updated");
				$("#loanType").val(loanType).trigger("liszt:updated");
			});
		},
		/**
		 * 删除
		 */
		fancingDelete : function(val){
			PUI.MessageBox.show({
				title: "删除放款申请单信息",
				content: "你确定要删除放款申请单信息吗？",
				type: "alert",
				buttons: [{ value: "是" },{ value: "否" }],
				success: function (result) {
					if (result == "是") {
						$.post("xascf/fancing/deleteFancing.shtml",{orderNo:val},function(data){  
							if(data.indexOf('成功')>=0){
								PUI.MessageBox.info(data);
								all_mmg.load($("#fancingListQueryForm").serialize());
							}else{
								PUI.MessageBox.info(data);
							}
							
						});
					}
				}
			});
			
		},
		
		/**清空**/
		clear : function(){
			PUI.util.resetForm($("#fancingListQueryForm"));
		}
	};
}();