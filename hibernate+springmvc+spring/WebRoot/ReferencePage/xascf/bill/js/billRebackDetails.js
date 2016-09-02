 $(document).ready(function(){
 	PUI.plugin.init({},$("#reback_form"));
	sns.valid.init($("#reback_form"));
//	//下拉框change事件
//	$("#billRebackFunction").bind("change", function(){
//		var val=$(this).val();
//		if(val=='2'){
//			$("#bank_div").css({display: "none"});
//		}else
//			$("#bank_div").css({display: "block"});
//	});
	
	
});
 var detail_cols = [
    { title:'账单编号', name:'billNo' ,width:120, align:'left', sortable: true, type: 'String'},
    { title:'', name:'billTypeEn' ,hidden:true,width:120, align:'center', sortable: true, type: 'String'},
    { title:'账单类型', name:'billType' ,width:80, align:'center', sortable: true, type: 'String',
        renderer: function(val,item,rowIndex){
    		return '<span >'+val+'</span>';
	}},
	 { title:'委托方名称', name:'buyerName' ,width:200, align:'left', sortable: true, type: 'String',
		  renderer: function(val,item,rowIndex){
			  if(item.billTypeEn=='1')
				  return '<span ><a href="#" onclick="customerDetailPop.buyerDetail(\''+item.buyerPid+'\')">'+val+'</a></span>';
			  else
				  return '';
		  }},
	{ title:'剩余金额', name:'remainingPrice' ,width:100, align:'center', sortable: true, type: 'String',
		renderer: function(val,item,rowIndex){
			return '<span >'+formatMoney(val)+' 元</span>';
		}},
		{ title:'账单开始日', name:'startDate' ,width:100,lockWidth:true, align:'center', sortable: true, type: 'String'},
	{ title:'到期还款日', name:'rebackDate' ,width:80, align:'center', sortable: true, type: 'String'},	
   
    { title:'账单摘要', name:'remark' ,width:450, align:'center', sortable: true, type: 'String'}
];
var detail_mmg =  $("#detail_mmg").mmGrid({
	height : 200,
	cols : detail_cols,
	url : 'xascf/allBill/page.shtml?type=NOPAGE',
	params : {
		'condition.pid':$("#billPid").val()
			},
	method : 'post',
	autoLoad : true,
	showBackboard:false,
	indexCol : true,
	indexColWidth : 15,
	sortName : 'id',
	sortStatus : 'desc',
	fullWidthRows : true,
	cache : false,
	multiSelect: true
});
//detail_mmg.on("loadSuccess",function(e, data) {
//	var allPrice=0.0;
//	var data=detail_mmg.selectedRows();
//	for(var i=0;i<data.length;i++){
//		allPrice+=parseFloat(data[i]['remainingPrice']);
//	}
//	$("#checkRebackPrice").val(allPrice.toFixed(2));
//	
//});
//
//detail_mmg.on("rowDeselected", function(item, rowIndex) {
//	var allPrice=0.0;
//	var data=detail_mmg.selectedRows();
//	for(var i=0;i<data.length;i++){
//		allPrice+=parseFloat(data[i]['remainingPrice']);
//	}
//	$("#checkRebackPrice").val(allPrice.toFixed(2));
//	
//});
//$("#reback_form").find('.mmg-head').find('th .checkAll').on('click', function () {
//	var allPrice=0.0;
//	var data=detail_mmg.selectedRows();
//	for(var i=0;i<data.length;i++){
//		allPrice+=parseFloat(data[i]['remainingPrice']);
//	}
//	$("#checkRebackPrice").val(allPrice.toFixed(2));
//	
//});
detail_mmg.on("loadSuccess",function(e, data){
	var list=data.data.list;
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
	$("#checkRebackPrice").val(remainingPrice);
});
var BillRebackDetails = function() {
	return {
		saveReback:function(){
			if (!$("#reback_form").isValid()) {
				return ;
			}
			var params = $("#reback_form").serializeArray();
			if($("#dbcheck").is(':checked')){
				params.push({
					name : 'billrebackRecordItem.isReback',
					value : '1'
				});
			}
//			var billDetails=new Array(
//					'billNo',
//					'fancingOrderNo',
//					'billTypeEn',
//					'remainingPrice',
//					'rebackDate',
//					'billPrice',
//					'backPrice'
//				); 
//			var isCheck="N";
//			if (null!=detail_mmg && null != detail_mmg.row(0)){
//				var item = detail_mmg.selectedRowsIndex();
//				for (var i = 0;i < item.length; i++) {
//					
//					for (var j = 0; j < billDetails.length; j++) {
//						rootItem  = billDetails[j];
//						debugger;
//						//判断是否勾选了利息
//						if(rootItem=="billTypeEn"){
//							var billType=detail_mmg.row(item[i])[rootItem];
//							if(billType !='1'){
//								isCheck="Y";
//							}
//						}
//						params.push({
//							name: 'billDetailList[' + i + '].' + rootItem,
//							value: detail_mmg.row(item[i])[rootItem]
//						});
//					}
//				}
//			}
//			if(isCheck=="N" && rebackLxPrice>0){
//				PUI.MessageBox.alert("请先偿还勾选利息");
//				return;
//			}
			$.post("xascf/allBill/reback.shtml",params,function(data){  
				if(data.indexOf('成功')>=0){
					$("#tabwin_add").popup({display:false});
					all_mmg.load($("#billListQueryForm").serialize());
					PUI.MessageBox.info(data);
				}else{
					PUI.MessageBox.info(data);
				}
				
			});
		},
		//取消关闭
		cancle : function(val){
			$("#tabwin_add").popup({display:false});
		},
		/**清空**/
		clear : function(){
			PUI.util.resetForm($("#billonListQueryForm"));
		}
	};
}();