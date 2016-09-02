$(document).ready(function(){
	PUI.plugin.init({},$("#kpiSearchForm"));
	sns.valid.init($("#kpiSearchForm")); 
}); 
 


var KpiInfo = function() {
	
	var mmg = null;
	return {
		init: function() { 
		
			var cols = new Array(
			    { title:'员工PID', name:'userPid', hidden: true},   
			    { title:'员工编号', name:'userNo' ,width:140, align:'center', sortable: true, type: 'string'},
			    { title:'员工姓名', name:'userNameCn' ,width:150, align:'center', sortable: true, type: 'string'}, 
			    { title:'季度', name:'kpidetalQuarter' ,width:130, align:'center', sortable: true, type: 'string'},
			    { title:'KPI分值', name:'kpidetalScores' ,width:150, align:'center', sortable: true, type: 'string'}, 
			    { title:'考核时间', name:'kpidetalDate' ,width:150, align:'center', sortable: true, type: 'string'},
			    { title:'状态', name:'kpidetalType' ,width:150, align:'center', sortable: true, type: 'string',
			    	renderer: function(val){
						 if(val=='0')
							 val='已考核';
						 else if(val=='1')
							 val='未考核'; 
				return val}},
			    { title:'操作', name:'' ,width:150, align:'center', sortable: true, type: 'string', 
            		renderer: function(val,item,rowIndex){  
               	return '<span style=""><a href="#" onclick="KpiInfo.agfancingVerifying(\''+item.userPid+'\')">考核</a></span>'}
			    	}
			);
			
			mmg =  $("#mmg-kpi").mmGrid({
				height: 290,
				cols: cols,
				url: 'xascf/system/user/toSelectPage.shtml',
				params: $("#kpiSearchForm").serialize(),
				method: 'post',
				checkCol: true,
				autoLoad: true,
				fullWidthRows: true,
				indexColWidth: 15, 
				cache: false,
				multiSelect: true,
				nowrap: true,
				plugins: [$('#pig').mmPaginator({})] 
			});
			
		},
		
		/**查询*/
		load: function() {  
			mmg.load($("#kpiSearchForm").serialize());
		},  

		/*查看企业会员详细信息*/
		agfancingVerifying:function(userPid){    
			$.post("xascf/system/user/toKpiIndex.shtml",{"userPid":userPid},function(data){    
				$("#xascfMainPanel").html(data); 
			});   
		}, 
		
		/**清空**/
		clear: function(){
			PUI.util.resetForm($("form"));
		}
	};
}();

$().ready(function() {
	KpiInfo.init();
});