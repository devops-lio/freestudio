$(document).ready(function(){
	PUI.plugin.init();
	sns.valid.init($("form"));
}); 

var cols_contract = new Array(
	    { title:'授信编号', name:'creditNo' ,width:110, align:'center', sortable: true, type: 'string',
	    	renderer: function(val,item,rowIndex){return '<span style=""><a href="#" onclick="CreditDetailPop.creditDetail(\''+item.creditNo+'\')">'
		    	  +val+'</a></span>';}},
		{ title:'会员名称',name:'memberName', width: 300, align: 'center',lockWidth:true,sortable: true, type: 'object'}, 
		 { title:'状态', name:'status' ,width:70, align:'center', sortable: true, type: 'string'},
//	    { title:'会员编号', name:'memberNo' ,width:150, align:'center', sortable: true, type: 'string'},
//	    { title:'会员类型', name:'memberType' ,width:130, align:'center', sortable: true, type: 'string',
//	    	renderer: function(val){
//	    		 if(val=='1')
//	    			 val='企业会员';
//	    		 else if(val=='2')
//					 val='个人会员';
//	    		 return val;}},
	    { title:'授信额度', name:'creditQuota' ,width:70, align:'center', sortable: true, type: 'string'},
	    {title: '产品类别', name:'financingType', width: 70, align:'center', sortable: true, type: 'string', 
			renderer: function(val){
				 if(val=='1')
					 val='运费保理';
				 else if(val=='2')
					 val='提单保理'; 
				 return val;
				}}, 
	    { title:'保理类别', name:'financingMethod' ,width: 70, align:'center', sortable: true, type: 'string',
					renderer: function(val){
						 if(val=='1')
							 val='非买断式融资';
						 else if(val=='2')
							 val='买断式融资'; 
						 return val;
						}},
	    { title:'开始日期', name:'effectiveStartTime', width:70, align:'center', sortable: true, type: 'string'},
	    { title:'结束日期', name:'effectiveEndTime', width:70, align:'center', sortable: true, type: 'string'}, 
		
		 { title:'操作', name:'' ,width:70, align:'center', sortable: true, type: 'string',
	  		renderer: function(val,item,rowIndex){
	  			  return '<span style=""><a href="#" onclick="ContractList.forwardToContractSet(\''+item.creditNo+'\')">合同录入</a></span>';
	  		}}
//		{ title:'保理方式', name:'financingNature' ,width:150, align:'center', sortable: true, type: 'string',
//	    	renderer: function(val){
//				 if(val=='1')
//					 val='一次性融资';
//				 else if(val=='2')
//					 val='持续性融资'; 
//				 return val;
//				}},
//		{ title:'是否收取保证金', name:'isBond', width:120, align:'center', sortable: true, type: 'string'},
//		{ title:'手续费收取方式', name:'serveMethod', width:120, align:'center', sortable: true, type: 'string'}
	);
	
var mmg_contract =  $("#mmg-contract").mmGrid({
		height: getAutoHeightByMmGrid($("#xascfMainPanel")),
		cols: cols_contract,
		url: 'xascf/creditApply/page.shtml?role=BUSINESS&type=through',
		params: $("#creditQueryForm").serialize(),
		method: 'post',
		checkCol: true,
		autoLoad: true,
		fullWidthRows: true,
		indexColWidth: 15, 
		cache: false,
		multiSelect: true,
		nowrap: true,
		plugins: [$('#pg-contract').mmPaginator({})] 
	});


var ContractList = function() {
	 
	return {
			
		
		/**查询*/
		load : function() {
			mmg_set.load($("#creditQueryForm").serialize());
		},
		
		/**跳转到合同录入页面*/
		forwardToContractSet:function(creditNo){
			$.post("xascf/credit/fancingContract/forwardToContractSet.shtml",{"creditNo":creditNo}, function(data) {  
				$("#xascfMainPanel").html(data);  
			}); 
		},
		
		/**清空**/
		clear: function(){
			PUI.util.resetForm($("form"));
		}
	};
}();