$(document).ready(function(){
	PUI.plugin.init();
	sns.valid.init($("form"));
}); 

var cols_set = new Array(
	    { title:'授信编号', name:'creditNo' ,width:110, align:'center', sortable: true, type: 'string',
	    	renderer: function(val,item,rowIndex){return '<span style=""><a href="#" onclick="CreditDetailPop.creditDetail(\''+item.creditNo+'\')">'
		    	  +val+'</a></span>';}},
		    	  { title:'操作', name:'' ,width:70, align:'center', sortable: true, type: 'string',
		  	  		renderer: function(val,item,rowIndex){
		  	  			  return '<span style=""><a href="#" onclick="QuotaSetList.quotaSet(\''+item.creditNo+'\')">额度设定</a></span>';
		  	  		}},
	    { title:'会员名称',name:'memberName', width: 300, align: 'left',lockWidth:true,sortable: true, type: 'object',
		    		  renderer: function(val,item,rowIndex){return '<span style=""><a href="#" onclick="customerDetailPop.customerDetail(\''+item.memberPid+'\')">'
		    	    	  +val+'</a></span>'}}, 
	  { title:'申请额度', name:'creditQuota' ,width:100, align:'center', sortable: true, type: 'string',
			renderer: function(val,item,rowIndex){
	    		return	formatMoney(val)+'元';}},
	  {title: '产品类别', name:'financingTypeCn', width: 70, align:'center', sortable: true, type: 'string'}, 
	    { title:'保理类别', name:'financingMethodCn' ,width: 90, align:'center', sortable: true, type: 'string'},
	    { title:'开始日期', name:'effectiveStartTime', width:70, align:'center', sortable: true, type: 'string'},
	    { title:'结束日期', name:'effectiveEndTime', width:70, align:'center', sortable: true, type: 'string'} 
	    
//		{ title:'保理方式', name:'financingNature' ,width:150, align:'center', sortable: true, type: 'string',
//	    	renderer: function(val){
//				 if(val=='1')
//					 val='一次性融资';
//				 else if(val=='2')
//					 val='持续性融资'; 
//				 return val;
//				}}
	);
	
var mmg_set =  $("#mmg-set").mmGrid({
		height: getAutoHeightByMmGrid($("#xascfMainPanel")),
		cols: cols_set,
		url: 'xascf/creditApply/page.shtml?type=set',
		params: $("#creditQueryForm").serialize(),
		method: 'post',
		checkCol: false,
		autoLoad: true,
		fullWidthRows: true,
		indexColWidth: 15, 
		cache: false,
		multiSelect: true,
		showBackboard:false,
		nowrap: true,
		plugins: [$('#pg-set').mmPaginator({})] 
	});


var QuotaSetList = function() {
	 
	return {
			
		
		/**查询*/
		load : function() {
			mmg_set.load($("#creditQueryForm").serialize());
		},
		
		/**授信额度设定*/
		quotaSet:function(creditNo){
			$.post("xascf/quota/forwardToSetQuota.shtml",{"creditNo":creditNo}, function(data) {  
				$("#xascfMainPanel").html(data);  
			}); 
		},
		
		/**清空**/
		clear: function(){
			PUI.util.resetForm($("form"));
		}
	};
}();