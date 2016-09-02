$(document).ready(function () {
	PUI.plugin.init();
	sns.valid.init($("form"));

});

var financing_cols = [
	{ title:'授信编号', name:'creditNo' ,width:120, align:'center', sortable: true, type: 'string',
		renderer: function(val,item,rowIndex){return '<span style=""><a href="#" onclick="CreditDetailPop.creditDetail(\''+item.creditNo+'\')">'
	    	  +val+'</a></span>';}},
	    	  { title:'状态', name:'status' ,width:60, align:'center', sortable: true, type: 'string'},
	  { title:'操作', name:'memberNo' ,width:60, align:'center', sortable: true, type: 'string',
  		  renderer: function(val,item,rowIndex){
  		  	  var a = '<span style=""><a href="#" onclick="creditAllList.editCredit(\''+item.creditNo+'\')">编辑</a>';
  			  if(item.status=='作废' || item.status=='通过'){
  				a=a+'|<a href="#" onclick="creditAllList.deleteCredit(\''+item.creditNo+'\')">删除</a></span>';
  			  }
  			  return a;
  		  }
	    },
	    
	    { title:'会员名称',name:'memberName', width: 300, align: 'left',lockWidth:true,sortable: true, type: 'object',
	    		  renderer: function(val,item,rowIndex){return '<span style=""><a href="#" onclick="customerDetailPop.customerDetail(\''+item.memberPid+'\')">'
	    	    	  +val+'</a></span>';}}, 
	    
	    {title: '产品类别', name:'financingTypeCn', width: 70, align:'center', sortable: true, type: 'string'}, 
	    { title:'保理类别', name:'financingMethodCn' ,width: 90, align:'center', sortable: true, type: 'string'},
	    { title:'申请额度', name:'creditQuota' ,width:100, align:'center', sortable: true, type: 'string',
	    	renderer: function(val,item,rowIndex){
    		return	formatMoney(val)+' 元';
    	}},
    	{ title:'批复额度', name:'resultQuto' ,width:100, align:'center', sortable: true, type: 'string',
	    	renderer: function(val,item,rowIndex){
	    		if(val!=null)
    		return	formatMoney(val)+' 元';
	    		else 
	    			return '';
    	}},
	    { title:'开始日期', name:'effectiveStartTime', width:70, align:'center', sortable: true, type: 'string'},
	    { title:'结束日期', name:'effectiveEndTime', width:70, align:'center', sortable: true, type: 'string'} 
];
var creditApply_mmg =  $("#creditApply_mmg").mmGrid({
	height : getAutoHeightByMmGrid($("#xascfMainPanel")),
	cols : financing_cols,
	url : 'xascf/creditApply/page.shtml?type=all',
	params : $("#creditAllQueryForm").serialize(),
	method : 'post',
	autoLoad : true,
	indexCol : true,
	indexColWidth : 15,
	sortName : 'id',
	sortStatus : 'desc',
	fullWidthRows : true,
	cache : false,
	multiSelect: true,
	plugins : [$('#pg').mmPaginator({})]
});

var creditAllList = function() {
	return {
		/**删除*/
		deleteCredit: function(creditNo) {
			//判断是否含有合同
        	$.post("xascf/creditApply/creditCheck.shtml",{"creditNo":creditNo}, function(data) {
        		if(data=="有授信"){
        			PUI.MessageBox.info("该授信下含有合同无法删除!");  
        		}else{
        			PUI.MessageBox.show({
        			    title: "删除授信信息",
        			    content: "是否删除该授信申请信息？",
        			    type: "confirm",
        			    buttons: [{ value: "是" },{ value: "否" }],
        			    success: function (result) {
        			        if (result == "是") {
        			        	$.post("xascf/creditApply/deleteCredit.shtml",{"creditNo":creditNo}, function(data) {  
        							PUI.MessageBox.info(data);  
        							creditApply_mmg.load($("#creditQueryForm").serialize());
        						});
        			        }
        			    }
        			});
        			
        		}
			});
			
			
			
			
		},
		/**修改*/
		editCredit: function(creditNo) {
			$.post("xascf/creditApply/forwardToEdit.shtml",{"creditNo":creditNo,"isSpecial":"1"}, function(data) {  
				$("#xascfMainPanel").html(data);  
			}); 
		},
		/**查询**/
		query : function(){
			creditApply_mmg.load($("#creditAllQueryForm").serialize());
		},
		/**清空**/
		clear : function(){
			PUI.util.clearForm($("#creditAllQueryForm"));
		}
	};
}();