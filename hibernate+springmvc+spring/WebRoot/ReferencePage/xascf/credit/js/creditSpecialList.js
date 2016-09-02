$(document).ready(function () {
	PUI.plugin.init();
	sns.valid.init($("form"));

});

var financing_cols = [
	{ title:'授信编号', name:'creditNo' ,width:110, align:'center', sortable: true, type: 'string',
		renderer: function(val,item,rowIndex){return '<span style=""><a href="#" onclick="CreditDetailPop.creditDetail(\''+item.creditNo+'\')">'
	    	  +val+'</a></span>';}},
//	{ title:'会员编号', name:'memberNo' ,width:150, align:'center', sortable: true, type: 'string'},
	{ title:'会员名称',name:'memberName', width: 300, align: 'left',lockWidth:true,sortable: true, type: 'object',
	    		  renderer: function(val,item,rowIndex){return '<span style=""><a href="#" onclick="customerDetailPop.customerDetail(\''+item.memberPid+'\')">'
	    	    	  +val+'</a></span>';}}, 
	{ title:'授信额度', name:'creditQuota' ,width:100, align:'center', sortable: true, type: 'string',
	    	    		  renderer: function(val,item,rowIndex){
	    	    	    		return	formatMoney(val)+' 元';}},
	{title: '产品类别', name:'financingTypeCn', width: 70, align:'center', sortable: true, type: 'string'}, 
	{ title:'保理类别', name:'financingMethodCn' ,width: 90, align:'center', sortable: true, type: 'string'},
	{ title:'开始日期', name:'effectiveStartTime', width:70, align:'center', sortable: true, type: 'string'},
	{ title:'结束日期', name:'effectiveEndTime', width:70, align:'center', sortable: true, type: 'string'}, 
	{ title:'操作', name:'' ,width:70, align:'center',sortable: true, type: 'String', 
    	renderer: function(val,item,rowIndex){
    		return '<a class="btnPrice" href="javascript:void(0)" onclick="creditSpecialList.evaluate(\''+item.creditNo+'\')">审批' +  '</a>';
    	}
    }
];
var creditApply_mmg =  $("#creditApply_mmg").mmGrid({
	height : getAutoHeightByMmGrid($("#xascfMainPanel")),
	cols : financing_cols,
	url : 'xascf/creditApply/page.shtml?type=fxwyh',
	params : $("#creditSpecialQueryForm").serialize(),
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

var creditSpecialList = function() {
	return {
		/**审批**/
		evaluate : function(creditNo) {
			$.post("xascf/credit/toSCZJConfir.shtml",{creditNo:creditNo,type:"FXWYH"},function(data){
				$("#xascfMainPanel").html(data);
			});			
		},
		/**查询**/
		query : function(){
			creditApply_mmg.load($("#creditSpecialQueryForm").serialize());
		},
		/**清空**/
		clear : function(){
			PUI.util.clearForm($("#creditSpecialQueryForm"));
		}
	};
}();