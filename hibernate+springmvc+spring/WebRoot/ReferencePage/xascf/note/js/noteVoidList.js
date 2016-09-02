 $(document).ready(function(){
 	PUI.plugin.init();
	sns.valid.init($("form"));
});
 var ch_cols = [
    { title:'会员名称', name:'memberName' ,width:200, align:'left', sortable: true, type: 'object',
    	 renderer: function(val,item,rowIndex){return '<span style=""><a href="#" onclick="customerDetailPop.customerDetail(\''+item.memberPid+'\')">'
	    	  +item.memberName+'</a></span>'}},
    { title:'操作', name:'' ,width:70, align:'center', sortable: true, type: 'object',
    	renderer:function(val,item,rowIndex){
    		return "<a onclick='NoteVoidList.detail(\""+item.memberPid+"\",\""+item.memberName+"\")'>查看</a>";
    	}},
    { title:'当前放款总额', name:'allLoanPrice' ,width:100, align:'center', sortable: true, type: 'object',
    		renderer: function(val,item,rowIndex){
    			if(val!=null)
        		return	formatMoney(val)+' 元';
    			else return '';
        	}},
    { title:'有效票据总额', name:'allNotePrice' ,width:100, align:'center', sortable: true, type: 'object',
        		renderer: function(val,item,rowIndex){
        			if(val!=null)
                		return	formatMoney(val)+' 元';
            			else return '';
            	}},
    { title:'有效票据折扣总额', name:'allNoteDisPrice' ,width:100, align:'center', sortable: true, type: 'object',
            		renderer: function(val,item,rowIndex){
            			if(val!=null)
                    		return	formatMoney(val)+' 元';
                			else return '';
                	}},    	  
    { title:'票据总数', name:'allNoteNum' ,width:70, align:'center', sortable: true, type: 'object'},
    { title:'有效票据总数', name:'effNoteNum' ,width:70, align:'center', sortable: true, type: 'object'},      
    { title:'无效票据数量', name:'noEffNoteNum' ,width:70, align:'center', sortable: true, type: 'object'}
    
   ];
var	_mmg =  $("#_mmg").mmGrid({
		height : getAutoHeightByMmGrid($("#xascfMainPanel")),
		cols : ch_cols,
		url : 'xascf/notePool/getAllNoteList.shtml',
		params : $("#noteVoidListForm").serialize(),
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

var NoteVoidList = function() {
	return {
		/**
		 * 查看详细
		 */
		detail :function(memberPid,memberName){
			$.post("xascf/notePool/getAllNoteDetailJsp.shtml",{"memberPid":memberPid,'memberName':memberName},function(data){
				$("#xascfMainPanel").html(data);
			});	
			
		},
		/**查询*/
		query : function() {
			_mmg.load($("#noteVoidListForm").serialize());
		},
		
		/**清空**/
		clear : function(){
			PUI.util.resetForm($("#noteVoidListForm"));
		}
	};
}();