$(document).ready(function(){
	PUI.plugin.init();
	sns.valid.init($("form")); 
});
var _cols = new Array(
			    { title:'融入单号', name:'businessNo', width:150, align:'center', sortable: true, type: 'object'},
			    { title:'预付利息金额', name:'exceptAmount' ,width:150, align:'center', sortable: true, type: 'object',
			    	renderer: function(val){
		            	if(val==null)
		            		return '';
		            	else
		            	return formatMoney(val)+' 元'}},
			    { title:'生成月份', name:'createTimeStr' ,width:150, align:'center', sortable: true, type: 'object'}
			    //{ title:'客户名称',name:'customer', width: 120, align: 'center',lockWidth:true,sortable: true, type: 'object'}
			);
			
			var	mmg =  $("#mmg-payable").mmGrid({
				height: 290,
				cols : _cols,
				url: 'xascf/payable/pagePayableList.shtml',
				params: $("#payableForm").serialize(),
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
		

var PayableList = function() { 
	return {  
			
		/**查询*/
		load: function() {  
		  	mmg.load($("#payableForm").serialize());
		},  
		
		/**清空**/
		clear: function(){
			PUI.util.resetForm($("form"));
		}
	};
}();

 