 $(document).ready(function(){
 	PUI.plugin.init({},$("#allLXReback_form"));
	sns.valid.init($("#allLXReback_form"));
});
 var listDetail_cols = [
    { title:'账单编号', name:'billNo' ,width:120, align:'left', sortable: true, type: 'String'},
    { title:'会员名称', name:'menberName' ,width:300, align:'left', sortable: true, type: 'String',
        renderer: function(val,item,rowIndex){
       	return '<span style=""><a href="#" onclick="customerDetailPop.customerDetail(\''+item.menberPid+'\')">'
    	  +val+'</a></span>'}},
  { title:'委托方名称', name:'buyerName' ,width:200, align:'left', sortable: true, type: 'String',
	  renderer: function(val,item,rowIndex){
		  if(item.billTypeEn=='1')
			  return '<span ><a href="#" onclick="customerDetailPop.buyerDetail(\''+item.buyerPid+'\')">'+val+'</a></span>';
		  else
			  return '';
	  }},
    { title:'', name:'billTypeEn' ,hidden:true,width:120, align:'center', sortable: true, type: 'String'},
    { title:'账单类型', name:'billType' ,width:80, align:'center', sortable: true, type: 'String',
        renderer: function(val,item,rowIndex){
    		return '<span >'+val+'</span>';
	}},
	{ title:'剩余金额', name:'remainingPrice' ,width:100, align:'center', sortable: true, type: 'String',
		renderer: function(val,item,rowIndex){
			return '<span >'+formatMoney(val)+' 元</span>';
		}},
	{ title:'账单开始日', name:'startDate' ,width:100,lockWidth:true, align:'center', sortable: true, type: 'String'},
	{ title:'到期还款日', name:'rebackDate' ,width:80, align:'center', sortable: true, type: 'String'},	
   
    { title:'账单摘要', name:'remark' ,width:450, align:'left', sortable: true, type: 'String'}
];
var listDetail_mmg =  $("#listDetail_mmg").mmGrid({
	height : 200,
	cols : listDetail_cols,
	url : 'xascf/allBill/page.shtml?type=ALLLXNOPAYNOPAGE',
	params : $("#allLXQueryForm").serialize(),
	method : 'post',
	autoLoad : true,
	showBackboard:false,
	indexCol : true,
	indexColWidth : 15,
	checkCol: true,
	sortName : 'id',
	sortStatus : 'desc',
	fullWidthRows : true,
	cache : false,
	multiSelect: true
});
listDetail_mmg.on("loadSuccess",function(e, data) {
	var list=data.data.list;
	listDetail_mmg.select('all');
	if(list.length>0)
		BillListRebackDetail.countSelect();
	var backPrice=0.00;
	var billPrice=0;
	var remainingPrice=0;
	for(var i=0;i<list.length;i++){
		backPrice+=parseFloat(list[i].backPrice);
		billPrice+=parseFloat(list[i].billPrice);
		remainingPrice+=parseFloat(list[i].remainingPrice);
	}
	backPrice=backPrice.toFixed(2);
	billPrice=billPrice.toFixed(2);
	remainingPrice=remainingPrice.toFixed(2);
	if((backPrice+'').indexOf('.')<0)
		backPrice=backPrice+'.00'
	if((billPrice+'').indexOf('.')<0)
		billPrice=billPrice+'.00'
	if((remainingPrice+'').indexOf('.')<0)
		remainingPrice=remainingPrice+'.00'
	$("#rebackBillPrice").text(formatMoney(billPrice)+' 元');
	$("#rebackRemainPrice").text(formatMoney(remainingPrice)+' 元');
	$("#rebackRebackedPrice").text(formatMoney(backPrice)+' 元');
	
});

listDetail_mmg.on("rowSelected", function(item, rowIndex) {
	BillListRebackDetail.countSelect();
	
});
listDetail_mmg.on("rowDeselected", function(item, rowIndex) {
	BillListRebackDetail.countSelect();
	
});
$("#mmgDiv").find('.mmg-head').find('th .checkAll').on('click', function () {
	BillListRebackDetail.countSelect();
	
});
var BillListRebackDetail = function() {
	return {
		
		/**
		 * 计算选择
		 */
		countSelect :function(){
			var allPrice=0.0;
			var items=listDetail_mmg.selectedRows();
			var itemOne=listDetail_mmg.row(0);
			if(items!=null && items!='undefined' && items.length>0 && itemOne!='undefined' && itemOne!=null){
				for(var i=0;i<items.length;i++){
					allPrice+=parseFloat(items[i].remainingPrice);
				}
				$("#checkRebackPrice").val(allPrice.toFixed(2));
			}
			
		},
		/**查询*/
		allLXQuery : function() {
			listDetail_mmg.load($("#allLXQueryForm").serialize());
		},
		saveReback:function(){
			if (!$("#allLXReback_form").isValid()) {
				return ;
			}
			var params = $("#allLXReback_form").serializeArray();
			var isCheck="N";
			if (null!=listDetail_mmg && null != listDetail_mmg.row(0)){
				var items = listDetail_mmg.selectedRows();
				var len=items.length;
				if(len>0){
					for (var i = 0;i < len; i++) {
							params.push({
								name: 'billrebackRecordItem.fancingBillNos[' + i + ']' ,
								value: items[i].billNo
							});
					}
				}else{
					PUI.MessageBox.alert("请先选择需要还款的利息!");
					return;
				}
				if($("#dbcheck").is(':checked')){
					params.push({
						name : 'billrebackRecordItem.isReback',
						value : '1'
					});
				}
				$.post("xascf/allBill/rebackByList.shtml",params,function(data){  
					if(data.indexOf('成功')>=0){
						$("#tabwin_add").popup({display:false});
						all_mmg.load($("#billListQueryForm").serialize());
						PUI.MessageBox.info(data);
					}else{
						PUI.MessageBox.info(data);
					}
					
				});
			}else{
				PUI.MessageBox.alert("暂时没有需要还款的利息!");
				return;
			}
			
		},
		//取消关闭
		cancle : function(val){
			$("#tabwin_add").popup({display:false});
		},
		/**清空**/
		clear : function(){
			PUI.util.resetForm($("#allLXQueryForm"));
		}
	};
}();