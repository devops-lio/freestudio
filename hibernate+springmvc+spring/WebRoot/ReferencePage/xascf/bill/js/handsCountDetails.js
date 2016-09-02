 $(document).ready(function(){
 	PUI.plugin.init({},$("#handsCountForm"));
	sns.valid.init($("#handsCountForm"));
	//放宽至下拉框change事件
	$("#handsLxType").on("change", function(){
		var _thisVal=$(this).val();
		if(_thisVal=='IN'){
			$("#inRate").show();
			$("#outRate").hide();
		}else{
			$("#inRate").hide();
			$("#outRate").show();
		}
			
	});
	
});
 var handsDetail_cols = [
    { title:'账单编号', name:'billNo' ,width:120, align:'left', sortable: true, type: 'String'},
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
    { title:'账单摘要', name:'remark' ,width:350, align:'left', sortable: true, type: 'String'}
];
var handsDetail_mmg =  $("#benjin_mmg").mmGrid({
	height : 200,
	cols : handsDetail_cols,
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
handsDetail_mmg.on("loadSuccess",function(e, data){
	var list=data.data.list;
	var backPrice=0.00;
	var billPrice=0;
	var remainingPrice=0;
	var lxPrice=0;
	for(var i=0;i<list.length;i++){
		backPrice+=parseFloat(list[i].backPrice);
		billPrice+=parseFloat(list[i].billPrice);
		remainingPrice+=parseFloat(list[i].remainingPrice);
		if(list[i].billType!='本金'){
			lxPrice+=parseFloat(list[i].billPrice);
		}
	}
	backPrice=backPrice.toFixed(4);
	billPrice=billPrice.toFixed(4);
	remainingPrice=remainingPrice.toFixed(4);
	lxPrice=lxPrice.toFixed(4);
	if((backPrice+'').indexOf('.')<0)
		backPrice=backPrice+'.00'
	if((billPrice+'').indexOf('.')<0)
		billPrice=billPrice+'.00'
	if((remainingPrice+'').indexOf('.')<0)
		remainingPrice=remainingPrice+'.00'
	if((lxPrice+'').indexOf('.')<0)
		lxPrice=lxPrice+'.00'
//	$("#rebackBillPrice").text(remainingPrice);
	$("#allBillPrice").text(formatMoney(remainingPrice)+' 元');
//	$("#rebackRebackedPrice").text(backPrice);
//	$("#checkRebackPrice").val(remainingPrice);
//	$("#rebackPayLx").val(lxPrice);
//	$("#rebackLxPrice").text(lxPrice);
});
var HandsCountDetails = function() {
	return {
		saveCount:function(){
			if (!$("#handsCountForm").isValid()) {
				return ;
			}
			var params = $("#handsCountForm").serializeArray();
			if (null!=handsDetail_mmg && null != handsDetail_mmg.row(0)){
				var items = handsDetail_mmg.rows();
				for (var i = 0;i < items.length; i++) {
						params.push({
							name: 'billHandsCountItem.billNos[' + i + ']',
							value: items[i].billNo
						});
						params.push({
							name: 'billHandsCountItem.fancingOrderNos[' + i + ']',
							value: items[i].fancingOrderNo
						});
					}
			}
			$.post("xascf/allBill/billHands/toCount.shtml",params,function(data){  
				if(data.indexOf('成功')>=0){
					PUI.MessageBox.info(data);
					all_mmg.load($("#billListQueryForm").serialize());
				}else{
					PUI.MessageBox.info(data);
				}
				$("#tabwin_add").popup({display:false});
			});
		},
		//取消关闭
		cancle : function(val){
			$("#tabwin_add").popup({display:false});
		}
	};
}();