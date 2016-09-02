$(document).ready(function(){
	PUI.plugin.init();
	sns.valid.init($("form")); 
});
var _cols = new Array(
			    { title:'交易单号', name:'orderNo', width:150, align:'center', sortable: true, type: 'object'},
			    { title:'预收金额', name:'exceptAmount' ,width:150, align:'center', sortable: true, type: 'object'},
			    { title:'预收时间', name:'exceptData' ,width:150, align:'center', sortable: true, type: 'object'},
			    { title:'客户名称',name:'clientName', width: 120, align: 'center',lockWidth:true,sortable: true, type: 'object'}, 
			    { title:'业务类型', name:'businessType' ,width:150, align:'center', sortable: true, type: 'object'},
			    { title:'管理费率', name:'manageRate' ,width:150, align:'center', sortable: true, type: 'object'}
			);
			
			var	mmg =  $("#mmg_Windfall").mmGrid({
				height: 290,
				cols : _cols,
				url: 'xascf/payable/getPageWindFallList.shtml',
				params: $("#windfallForm").serialize(),
				method: 'post',
				autoLoad: true,
				indexCol : true,
				indexColWidth : 15, 
				fullWidthRows: true,
				cache: false,
				showBackboard:false,
				multiSelect: true,
				nowrap: true,
				plugins: [$('#pg').mmPaginator({})] 
			}); 
		

var WindfallList = function() { 
	return {  
			
		/**查询*/
		load: function() {  
		  	mmg.load($("#windfallForm").serialize());
		},  
		
		/**清空**/
		clear: function(){
			PUI.util.resetForm($("form"));
		}
	};
}();

 