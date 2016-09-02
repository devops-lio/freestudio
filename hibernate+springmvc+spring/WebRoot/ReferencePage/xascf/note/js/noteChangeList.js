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
		 		 var fancingStatus=item.fancingStatus;
		 		 if(fancingStatus!='80' )
		 			 	return '<a class="btnPrice" href="javascript:void(0)" onclick="NoteChangeList.noteToChange(\''+orderNo+'\')">置换</a>';
		 		 else return '';
	 	 }},
	 	 { title:'会员名称', name:'memberName' ,width:200, align:'left', sortable: true, type: 'object',
	    	 renderer: function(val,item,rowIndex){return '<span style=""><a href="#" onclick="customerDetailPop.customerDetail(\''+item.memberPid+'\')">'
		    	  +item.memberName+'</a></span>'}},
	    { title:'委托方名称', name:'buyerName' ,width:300, align:'left', sortable: true, type: 'object',
	        renderer:  function(val,item,rowIndex){return '<span style=""><a href="#" onclick="customerDetailPop.buyerDetail(\''+item.buyerPid+'\')">'
	    	  +val+'</a></span>'}},
	    { title:'放款金额', name:'replyPrice' ,width:100, align:'center', sortable: true, type: 'object',
	        renderer: function(val){
	        	if(null==val)
	        		return '';
	        	return formatMoney(val)+' 元'}},
    	{ title:'放款时间', name:'payTime' ,width:140, align:'center', sortable: true, type: 'object',
        	renderer: function(val){return val}},  
        { title:'未还金额', name:'remainingPrice' ,width:100, align:'center', sortable: true, type: 'object',
	        	renderer: function(val){
	        		if(null==val)
		        		return '';
	        		return formatMoney(val)+' 元'}},
    	{ title:'账单到期日', name:'rebackDate' ,width:100, align:'center', sortable: true, type: 'object',
	        		renderer: function(val){
	        			var html='<span >'+val+'</span>';
	        			if(val!='' && null!=val){
	        				var  repayTime=getDate(val);
	        				var i=(repayTime.getTime()- new Date().getTime())/1000/60/60/24;
	        				if(i<=10){
	        					html='<span style="color:red;">'+val+'</span>';
	        				}
	        			}else if(null==val)
	    	        		return '';
	        			return html;
	        			}},
		{ title:'最迟还款日', name:'latestTime' ,width:100, align:'center', sortable: true, type: 'object',
	        			renderer: function(val){
	        				if(null==val)
	        	        		return '';
	        				return val;}},
		{ title:'状态', name:'fancingStatusCn' ,width:100, align:'center', sortable: true, type: 'object',
	        				renderer: function(val){return val;}},
        { title:'票据类型', name:'noteType' ,width:70, align:'center', sortable: true, type: 'object',
	        	renderer: function(val){return val}},   
	    { title:'有效票据总额', name:'notePrice' ,width:100, align:'center', sortable: true, type: 'object',
	        renderer: function(val){return formatMoney(val)+' 元'}},
        { title:'有效票据折扣金额', name:'noteDisprice' ,width:120, align:'center', sortable: true, type: 'object',
	        	renderer: function(val){return formatMoney(val)+' 元'}},
	    { title:'最新票据状态', name:'noteStatus' ,width:90, align:'center', sortable: true, type: 'object',
		        	renderer: function(val){
		        		if(val=='0'){
     						val='失效';
     					}else
     						val='有效';
		        		return val}}, 
    	{ title:'最新票据到期日', name:'noteToDate' ,width:100, align:'center', sortable: true, type: 'object',
    		renderer: function(val){
    			var html='<span >'+val+'</span>';
    			if(val!='' && null!=val){
    				var  repayTime=getDate(val);
    				var i=(repayTime.getTime()- new Date().getTime())/1000/60/60/24;
    				if(i<=10){
    					html='<span style="color:red;">'+val+'</span>';
    				}
    			}
    			return html;
    			}}
		        		
   ];
var	waitCheck_mmg =  $("#waitCheck_mmg").mmGrid({
		height : getAutoHeightByMmGrid($("#xascfMainPanel")),
		cols : ch_cols,
		url : 'xascf/notePool/getFancingNoteChangeList.shtml?type=CHANGE',
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
var NoteChangeList = function() {
	return {
		
		
		/**查询*/
		query : function() {
			waitCheck_mmg.load($("#fancingListQueryForm").serialize());
		},
		/**
		 * 置换
		 */
		noteToChange:function(orderNo){
			PUI.MessageBox.show({
			    title: "提示",
			    content: "确定要置换票据信息?一旦置换该放款之前票据将全部无效!",
			    type: "confirm",
			    buttons: [{ value: "是" },{ value: "否" }],
			    success: function (result) {
			    	if (result == "是") {
						$.post("xascf/notePool/extendJsp.shtml",{fancingOrderNo:orderNo},function(data){ 
							$("#xascfMainPanel").empty();
							$("#xascfMainPanel").append(data);
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