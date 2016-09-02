 
 var edit_cols = [ 
              	{ title:'账单编号', name:'billNo' ,width:80, align:'center', sortable: true, type: 'object'},
              	{ title:'会员名称', name:'menberName' ,width:80, align:'left', sortable: true, type: 'object',
              		renderer: function(val,item,rowIndex){
              			return '<span style=""><a href="#" onclick="customerDetailPop.customerDetail(\''+item.menberPid+'\')">'
  	    	    	  +val+'</a></span>'}},
              	{ title:'账单金额（元）', name:'billPrice' ,width:40, align:'center', sortable: true, type: 'object',
  	    	    		renderer: function(val){return formatMoney(val)+' 元'}},
              	{ title:'账单应还日期', name:'rebackDate' ,width:30, align:'center', sortable: true, type: 'object'} 
              ];


var edit_mmg = $("#agfund_mmg").mmGrid({
	height : 220,
	cols : edit_cols,
	url : 'xascf/fancing/agfancingCapitalpage.shtml',
	params : {
		'condition.agfancingOrderNo' : $("#agfancingOrderNo").val()
	},
	method : 'post',
	checkCol : false,
	autoLoad : true,
	fullWidthRows : true,
	indexColWidth : 15,
	cache : false,
	multiSelect : true,
	nowrap : true,
	plugins : [ $('#pg').mmPaginator({}) ]
});

edit_mmg.on('itemdblclick', function(event, item, rowIndex) {
	AgfancingEdit.doubleClick(item, rowIndex);
});

edit_mmg.on("loadSuccess",function(e,data){
	AgfancingEdit.calculate();
});
mmGridResizeListener(edit_mmg, $(".page-content"));
 


var AgfancingEdit = function() {
	return { 
		//计算
		calculate:function(){
			var allBillPrice=0.0;
			if(null != edit_mmg.row(0)){
				var len= edit_mmg[0].rows.length;
				for (var i = 0; i < len; i++){
					allBillPrice+=parseFloat(edit_mmg.row(i)['billPrice']);
				}
				$("#allBillPrice").text(formatMoney(allBillPrice)+'（元）');
			}
		}
		
	};
}();

