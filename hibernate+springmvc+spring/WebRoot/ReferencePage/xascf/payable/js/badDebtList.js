$(document).ready(function(){
	PUI.plugin.init();
	sns.valid.init($("form")); 
});
var _cols = new Array(
			    { title:'交易单号', name:'orderNo', width:150, align:'center', sortable: true, type: 'object'},
			    { title:'预收金额', name:'amount' ,width:150, align:'center', sortable: true, type: 'object'},
			    { title:'预收时间', name:'exceptDate' ,width:150, align:'center', sortable: true, type: 'object'},
			    { title:'客户名称',name:'customerName', width: 120, align: 'center',lockWidth:true,sortable: true, type: 'object'}, 
			    { title:'业务类型', name:'businessType' ,width:150, align:'center', sortable: true, type: 'object'}
			);
			
			var	mmg =  $("#mmg_badDabt").mmGrid({
				height: 290,
				cols : _cols,
				url: 'xascf/payable/getPageBadDebtList.shtml',
				params: $("#badDebtForm").serialize(),
				method: 'post',
				autoLoad: true,
				indexCol : true,
				indexColWidth : 15, 
				fullWidthRows: true,
				cache: false,
				showBackboard:false,
				multiSelect: true,
				nowrap: true,
				plugins : [$('#pg').mmPaginator({})]
			}); 
		

var BadDebtList = function() { 
	return {  
			
		/**查询*/
		load: function() {  
		  	mmg.load($("#badDebtForm").serialize());
		},  
		
		/**清空**/
		clear: function(){
			PUI.util.resetForm($("form"));
		}
	};
}();

 