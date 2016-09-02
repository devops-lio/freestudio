 $(document).ready(function(){
 	PUI.plugin.init();
	sns.valid.init($("form"));
});
var _cols = [
    { title:'融资单号', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
    	renderer: function(val){
    		return '<a class="btnPrice" href="javascript:void(0)" onclick="fancingDetail(\''+val.fancingOrderNo+'\')">'+val.fancingOrderNo+'</a>';
    	}
    },
    { title:'状态', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
    	      renderer: function(val){return '<span style="color:red;">'+val.fancingStatusCn+'</span>'}},	
    { title:'申请人类型', name:'fancingOrderItem' ,width:100, align:'center', sortable: true, type: 'object',
    	renderer: function(val){
    		var val=val.fancingRequestType;
    		if(val=='1')
    			val='企业会员';
    			else 
    				val='个人会员';
    		return val}},  	      
    { title:'融资会员', name:'fancingOrderItem' ,width:150, align:'center', sortable: true, type: 'object',
        renderer: function(val){return val.requestName}},
    { title:'融资种类', name:'fancingOrderItem' ,width:100, align:'center', sortable: true, type: 'object',
        renderer: function(val){
        	var val=val.fancingType;
        	if(val=='1')
        		val='运单融资';
        	else if(val=='2')
        		val='应收账款融资';
        	else if(val=='3')
        		val='抵押融资';
        	else if(val=='4')
        		val='提单融资';
        	return val}},
	{ title:'融资方式', name:'fancingOrderItem' ,width:100, align:'center', sortable: true, type: 'object',
		renderer: function(val){
			var val=val.fancingFunction;
        	if(val=='1')
        		val='非买断式融资';
        	else if(val=='2')
        		val='买断式融资';
			return val}},
	{ title:'融资类别', name:'fancingOrderItem' ,width:100, align:'center', sortable: true, type: 'object',
		renderer: function(val){
			var val=val.fancingKinds;
        	if(val=='1')
        		val='一次性融资';
        	else if(val=='2')
        		val='持续性融资';
			return val}},
    { title:'申请时间', name:'fancingOrderItem' ,width:150, align:'center', sortable: true, type: 'object',
        renderer: function(val){return val.fancingRequestDateStr}},
    { title:'申请金额(元)', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
        renderer: function(val){return formatMoney(val.fancingRequestPrice)}},
    { title:'批复金额(元)', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
        renderer: function(val){return formatMoney(val.fancingReplyPrice)}},
    { title:'融资账期', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
        renderer: function(val){
        	if(val.fancingDate!=null && val.fancingDateType)
        		return val.fancingDate+''+val.fancingDateType;
        	else
        		return '';
        	}},
	{ title:'到账日期', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
		renderer: function(val){return val.fancingRebackDate}},   	
    { title:'账期利率(%)', name:'fancingRateItem' ,width:120, align:'center', sortable: true, type: 'object',
        renderer: function(val){
        	if(val.fancingRate!=null && val.fancingRate!='undefined')
        	return val.fancingRate+'%'}},
    { title:'还款方式', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
        renderer: function(val){return val.fancingRebackType}},    
    { title:'逾期利率(%)', name:'fancingRateItem' ,width:120, align:'center', sortable: true, type: 'object',
        renderer: function(val){
        	if(val.overdueRate!=null && val.overdueRate!='undefined')
        		return val.overdueRate+"%"}},
    { title:'逾期计息方式', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
       renderer: function(val){
    	   if(val!=null)
    		   return val.fancingOverdueType;
    	   else
    		   return null;
       }
        },
        { title:'所属业务员', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
            renderer: function(val){return val.userNo}}   
    
    
];
var all_mmg =  $("#all_mmg").mmGrid({
	height : getAutoHeightByMmGrid($("#xascfMainPanel")),
	cols : _cols,
	url : 'xascf/fancing/page.shtml?type=ALL',
	params : $("#fancingListQueryForm").serialize(),
	method : 'post',
	autoLoad : true,
	indexCol : true,
	indexColWidth : 15,
	sortName : 'id',
	sortStatus : 'desc',
	fullWidthRows : true,
	cache : false,
	multiSelect: true,
	plugins : [$('#all_pg').mmPaginator({})]
});
mmGridResizeListener(all_mmg, $(".page-content"));

var FancingQuery = function() {
	return {
		/**查询*/
		query : function() {
			all_mmg.load($("#fancingListQueryForm").serialize());
		},
		
		/**清空**/
		clear : function(){
			PUI.util.resetForm($("#fancingListQueryForm"));
		}
	};
}();