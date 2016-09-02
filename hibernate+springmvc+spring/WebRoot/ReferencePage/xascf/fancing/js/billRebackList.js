 $(document).ready(function(){
 	PUI.plugin.init({},$("#billRebackListQueryForm"));
	sns.valid.init($("#billRebackListQueryForm"));
});
var _cols = [
    { title:'融资单号', name:'fancingOrderNo' ,width:120, align:'center', sortable: true, type: 'String'},
    { title:'融资企业', name:'billOwerName' ,width:150, align:'center', sortable: true, type: 'String'},
    { title:'账单类型', name:'billType' ,width:120, align:'center', sortable: true, type: 'String'},
    { title:'生成时间', name:'createTimeStr' ,width:120, align:'center', sortable: true, type: 'String'},
    { title:'到期还款日', name:'rebackDate' ,width:120, align:'center', sortable: true, type: 'String'},
    { title:'账单摘要', name:'remark' ,width:120, align:'center', sortable: true, type: 'String'},
    { title:'账单金额(元)', name:'billPrice' ,width:120, align:'center', sortable: true, type: 'String'},
    { title:'操作', name:'billType' ,width:160, align:'center', sortable: true, type: 'String',
        renderer: function(val,item,rowIndex){
        	var repaydate='';
        	if(null!=item.rebackDate){
        		repaydate=item.rebackDate.replace("-","/");
        	}
        	var d2=new Date();//取今天的日期
        	var d1 = new Date(Date.parse(repaydate));
        	var d=d2-d1;
        	if(val.indexOf('本金')>=0 && d<0)
        		return  '<a class="btnPrice" href="javascript:void(0)" onclick="BillRebackList.fancingDelay(\''+item.fancingOrderNo+'\')">申请延期</a>|'
		    	 +'<a class="btnPrice" href="javascript:void(0)" onclick="BillRebackList.fancingReback(\''+rowIndex+'\')">还款</a>';
        	else
        		return '<a class="btnPrice" href="javascript:void(0)" onclick="BillRebackList.fancingReback(\''+rowIndex+'\')">还款</a>';
        	}}
];
var all_mmg =  $("#all_mmg").mmGrid({
	height : getAutoHeightByMmGrid($("#xascfMainPanel")),
	cols : _cols,
	url : 'xascf/fancingBill/page.shtml?type=REBACK',
	params : $("#billRebackListQueryForm").serialize(),
	method : 'post',
	autoLoad : true,
	showBackboard:false,
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
var BillRebackList = function() {
	return {
		/**查询*/
		query : function() {
				all_mmg.load($("#billRebackListQueryForm").serialize());
		},
		saveReback:function(){
			if (!$("#reback_form").isValid()) {
				return ;
			}
			$.post("xascf/bill/reback.shtml",$("#reback_form").serialize(),function(data){  
				if(data.indexOf('成功')>=0){
					PUI.MessageBox.info(data);
					$("#tabwin_add").popup({display:false});
					all_mmg.load($("#fancingAuditingListQueryForm").serialize());
				}else{
					PUI.MessageBox.info(data);
				}
				
			});
		},
		fancingDelay:function(val){
			PUI.MessageBox.show({
			    title: "账单延期申请",
			    content: "账单延期可能会导致利率改变，确定要申请账单延期吗？",
			    type: "alert",
			    buttons: [{ value: "是" },{ value: "否" }],
			    success: function (result) {
			    	$.post("xascf//bill/delay.shtml",{fancingOrderNo:val},function(data){  
						if(data.indexOf('成功')>=0){
							PUI.MessageBox.info(data);
							$("#tabwin_add").popup({display:false});
							all_mmg.load($("#fancingAuditingListQueryForm").serialize());
						}else{
							PUI.MessageBox.info(data);
						}
						
					});
			    }
			});
			
			
		},
		
		fancingReback : function(rowIndex){
			var item=all_mmg.row(rowIndex);
			$("#tabwin_add_content").html(PUI.String.format($("#template_add").html(),$.extend(item)));
			$("#tabwin_add").popup({md:true});
			PUI.plugin.init({}, $("#tabwin_add_content"));
			sns.valid.init($("#reback_form"));
		},
		//取消关闭
		cancle : function(val){
			$("#tabwin_add").popup({display:false});
		},
		/**清空**/
		clear : function(){
			PUI.util.resetForm($("#billRebackListQueryForm"));
		}
	};
}();