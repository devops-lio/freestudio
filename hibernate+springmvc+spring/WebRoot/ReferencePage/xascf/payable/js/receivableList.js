$(document).ready(function(){
	PUI.plugin.init();
	sns.valid.init($("form")); 
});

var _cols = new Array(
			    { title:'业务编号',name:'businessNo', width: 130, align: 'center',sortable: true, type: 'object'},  
			    { title:'业务类型', name:'incomeType' ,width:70, align:'center', sortable: true, type: 'object',
			    	renderer: function(val){
			    		 if(val=='0')
			    			 val='';
			    		 else if(val=='1')
							 val='利息收入';
						 else if(val=='2')
							 val='手续费收入';  
			    	return val}},  
			    { title:'账单类型', name:'billType' ,width:70, align:'center', sortable: true, type: 'object',
				    	renderer: function(val){
				    		 if(val=='0')
				    			 val='';
				    		 else if(val=='2')
								 val='利息';
							 else if(val=='3')
								 val='罚息';
				    	return val}},
			    { title:'收入金额', name:'incomePrice' ,width:70, align:'center', sortable: true, type: 'object',
				    		renderer: function(val){
				            	if(val==null)
				            		return '';
				            	else
				            	return formatMoney(val)+' 元'}},
			    { title:'实收额', name:'paidPrice' ,width:70, align:'center', sortable: true, type: 'object',
				            		renderer: function(val){
				                    	if(val==null)
				                    		return '';
				                    	else
				                    	return formatMoney(val)+' 元'}},
			    { title:'待收额', name:'collectPrice' ,width:70, align:'center', sortable: true, type: 'object',
				                    		renderer: function(val){
				                            	if(val==null)
				                            		return '';
				                            	else
				                            	return formatMoney(val)+' 元'}},
			    { title:'账期', name:'billCycle' ,width:70, align:'center', sortable: true, type: 'object'},
			    { title:'备注', name:'remark' ,width:300, align:'center', sortable: true, type: 'object'}
			);
			
			var	mmg =  $("#mmg-receivable").mmGrid({
				height : getAutoHeightByMmGrid($("#xascfMainPanel")),
				cols : _cols,
				url: 'xascf/payable/pageReceivableList.shtml',
				params: $("#receivableForm").serialize(),
				method: 'post',
				autoLoad: true,
				indexCol : false,
				indexColWidth : 15, 
				fullWidthRows: true,
				cache: false,
				showBackboard:false,
				multiSelect: true,
				nowrap: true,
				plugins: [$('#pg').mmPaginator({})] 
			}); 
			mmg.on("loadSuccess",function(e,data){
				$("#allMsg").html(data.msg);
			});	
			mmGridResizeListener(mmg, $(".page-content"));
var ReceivableList = function() { 
	return {  
			
		/**查询*/
		load: function() {  
		  	mmg.load($("#receivableForm").serialize());
		},  
		
		/**清空**/
		clear: function(){
			PUI.util.resetForm($("form"));
		}
	};
}();

 