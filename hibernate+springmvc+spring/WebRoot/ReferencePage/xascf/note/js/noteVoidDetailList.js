 $(document).ready(function(){
 	PUI.plugin.init();
	sns.valid.init($("form"));
});
 var ch_cols = [
       { title:'放款单号', name:'fancingOrderNo' ,width:120, align:'center', sortable: true, type: 'object',
	    	renderer: function(val){
	    		return '<a class="btnPrice" href="javascript:void(0)" onclick="fancingOrderDetail4Pop.fancingDetail(\''+val+'\')">'+val+'</a>';
	    	}
	    },
	    { title:'操作', name:'' ,width:40, align:'center', sortable: true, type: 'String',
		 	  renderer: function(val,item,rowIndex){
		 		 var orderNo=item.fancingOrderNo;
		 		 var noteStatus=item.noteStatus;
		 		 if(noteStatus=='1')
		 			 return '<a class="btnPrice" href="javascript:void(0)" onclick="NoteVoidDetailList.noteToVoid(\''+orderNo+'\')">作废</a>';
		 		 else 
		 			 return '';
	 	 }},
	    { title:'委托方名称', name:'buyerName' ,width:250, align:'left', sortable: true, type: 'object',
	        renderer:  function(val,item,rowIndex){return '<span style=""><a href="#" onclick="customerDetailPop.buyerDetail(\''+item.buyerPid+'\')">'
	    	  +val+'</a></span>'}},
	    { title:'放款金额', name:'replyPrice' ,width:100, align:'center', sortable: true, type: 'object',
	        renderer: function(val){
	        	if(null==val)
	        		return '';
	        	return formatMoney(val)+' 元'}},
        { title:'票据类型', name:'noteType' ,width:70, align:'center', sortable: true, type: 'object',
	        	renderer: function(val){return val}},   
	    { title:'有效票据总额', name:'notePrice' ,width:100, align:'center', sortable: true, type: 'object',
	        renderer: function(val){return formatMoney(val)+' 元'}},
        { title:'有效票据折扣金额', name:'noteDisprice' ,width:120, align:'center', sortable: true, type: 'object',
	        	renderer: function(val){return formatMoney(val)+' 元'}},
	    { title:'最新票据状态', name:'noteStatus' ,width:100, align:'center', sortable: true, type: 'object',
		        	renderer: function(val){
		        		if(val=='0'){
     						val='失效';
     					}else
     						val='有效';
		        		return val}}, 
    	{ title:'最新票据到期日', name:'noteToDate' ,width:100, align:'center', sortable: true, type: 'object',
    		renderer: function(val){return val}}
		        		
   ];
var	waitCheck_mmg =  $("#waitCheck_mmg").mmGrid({
		height : getAutoHeightByMmGrid($("#xascfMainPanel")),
		cols : ch_cols,
		url : 'xascf/notePool/getFancingNoteList.shtml',
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
var NoteVoidDetailList = function() {
	return {
		
		rebackList:function(){
			Menu.forward("xascf/note/jsp/noteVoidList.jsp"); 
		},
		
		/**查询*/
		query : function() {
			waitCheck_mmg.load($("#fancingListQueryForm").serialize());
		},
		/**
		 * 作废
		 */
		noteToVoid :function (orderNo){
			PUI.MessageBox.show({
			    title: "提示",
			    content: "确定要作废票据信息?一旦作废该放款票据将全部无效!",
			    type: "confirm",
			    buttons: [{ value: "是" },{ value: "否" }],
			    success: function (result) {
			        if (result == "是") {
						$.post("xascf/notePool/noteToVoid.shtml",{fancingOrderNo:orderNo},function(data){  
							PUI.MessageBox.info(data);  
							waitCheck_mmg.load($("#fancingListQueryForm").serialize());
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