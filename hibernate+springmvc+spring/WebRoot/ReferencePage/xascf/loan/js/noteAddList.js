 $(document).ready(function(){
 	PUI.plugin.init();
	sns.valid.init($("form"));
});
var _cols = [
    { title:'放款单号', name:'fancingOrderItem' ,width:110, align:'center', sortable: true, type: 'object',
    	renderer: function(val){
    		return '<a class="btnPrice" href="javascript:void(0)" onclick="fancingOrderDetail4Pop.fancingDetail(\''+val.fancingOrderNo+'\')">'+val.fancingOrderNo+'</a>';
    	}
    },
	{ title:'操作', name:'' ,width:60, align:'center', sortable: true, type: 'String',
	 	  renderer: function(val,item,rowIndex){
 			  var orderNo=item.fancingOrderItem.fancingOrderNo;
 			  var loanType=item.fancingOrderItem.loanType;
 			  var bankType=item.fancingOrderItem.bankType;
	    	  return  '<a class="btnPrice" href="javascript:void(0)" onclick="NoteAddList.fancingEdit(\''+orderNo+'\',\''+bankType+'\')">票据补充</a>';
 	 }},	      
    { title:'会员名称', name:'fancingOrderItem' ,width:240, align:'left', sortable: true, type: 'object',
        renderer: function(val){return '<span style=""><a href="#" onclick="customerDetailPop.customerDetail(\''+val.menberPid+'\')">'
	    	  +val.menberName+'</a></span>'}},
    { title:'申请时间', name:'fancingOrderItem' ,width:140, align:'center', sortable: true, type: 'object',
        renderer: function(val){return val.requestTime}},
    { title:'申请金额', name:'fancingOrderItem' ,width:100, align:'center', sortable: true, type: 'object',
        renderer: function(val){return formatMoney(val.requestPrice)+" 元"}},
    { title:'批复总金额', name:'fancingOrderItem' ,width:100, align:'center', sortable: true, type: 'object',
        renderer: function(val){return formatMoney(val.replyPrice)+' 元'}},
//    { title:'预付金额', name:'fancingOrderItem' ,width:100, align:'center', sortable: true, type: 'object',
//        renderer: function(val){return formatMoney(val.replyPrice)+' '}},
//    { title:'尾款金额', name:'fancingOrderItem' ,width:100, align:'center', sortable: true, type: 'object',
//        renderer: function(val){return formatMoney(val.lostPrice)}},
    { title:'预计回款日', name:'fancingOrderItem' ,width:60, align:'center', sortable: true, type: 'object',
        renderer: function(val){
        	if(val.term!=null && val.termType!=null)
        		return val.term+''+val.termTypeCn;
        	else
        		return '';
		}
	}
];
var noteAdd_mmg =  $("#noteAdd_mmg").mmGrid({
	height : getAutoHeightByMmGrid($("#xascfMainPanel")),
	cols : _cols,
	url : 'xascf/fancing/page.shtml?type=ALL',
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
	showBackboard:false,
	plugins : [$('#noteAdd_pg').mmPaginator({})]
});

var NoteAddList = function() {
	return {
		/**查询*/
		query : function() {
			noteAdd_mmg.load($("#fancingListQueryForm").serialize());
		},
		/**
		 * 编辑
		 */
		fancingEdit :function (orderNo,bankType){
			$.post("xascf/fancing/toNoteAddEdit.shtml",{orderNo:orderNo},function(data){  
				$("#xascfMainPanel").empty();
				$("#xascfMainPanel").append(data);
				
				//票据补充 隐藏页面统计数据
				$("#loanStat1").hide();
				$("#loanStat2").hide();
				
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