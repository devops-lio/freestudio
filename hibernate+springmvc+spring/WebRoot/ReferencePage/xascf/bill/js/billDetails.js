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
    { title:'账单编号', name:'billNo' ,width:150, align:'left', sortable: true, type: 'String',
    	renderer: function(val,item,rowIndex){
    		if(item.billTypeEn=='1')
			return '<span class="benjinRow">'+val+'</span>';
    		else
    			return val;
		}},
  	  { title:'委托方名称', name:'buyerName' ,width:200, align:'left', sortable: true, type: 'String',
  		  renderer: function(val,item,rowIndex){
  			  if(item.billTypeEn=='1')
  				  return '<span class="benjinRow"><a href="#" onclick="customerDetailPop.buyerDetail(\''+item.buyerPid+'\')">'+val+'</a></span>';
  			  else
  				  return '';
  		  }},
  	{ title:'账单类型', name:'billType' ,width:70,lockWidth:true, align:'center', sortable: true, type: 'String',
  		renderer: function(val,item,rowIndex){
    		if(item.billTypeEn=='1')
			return '<span class="benjinRow">'+val+'</span>';
    		else
    			return val;
		}},
	{ title:'账单金额', name:'billPrice' ,width:130, align:'center',lockWidth:true, sortable: true, type: 'String',
		renderer: function(val,item,rowIndex){
			if(item.billTypeEn=='1')
				return '<span class="benjinRow">'+formatMoney(val)+' 元</span>';
		else
			return '<span>'+formatMoney(val)+' 元</span>';
		}
	},
	{ title:'账单开始日', name:'startDate' ,width:100,lockWidth:true, align:'center', sortable: true, type: 'String',
		renderer: function(val,item,rowIndex){
    		if(item.billTypeEn=='1')
			return '<span class="benjinRow">'+val+'</span>';
    		else
    			return val;
		}},	
	{ title:'账单到期日', name:'rebackDate' ,width:100,lockWidth:true, align:'center', sortable: true, type: 'String',
		renderer: function(val,item,rowIndex){
			var html='<span >'+val+'</span>';
			if(item.billTypeEn=='1')
				html='<span class="benjinRow">'+val+'</span>';
			if(val!='' && null!=val && item.billStatus!='已还'){
				var  repayTime=getDate(val);
				var i=(repayTime.getTime()- new Date().getTime())/1000/60/60/24;
				if(i<=2){
					html='<span class="benjinRow" style="color:red;">'+val+'</span>';
				}else if(i<=5){
					html='<span class="benjinRow" style="color:bule;">'+val+'</span>';
				}else if(i<=10){
					html='<span class="benjinRow" style="color: #9ACD32;">'+val+'</span>';
				}
			}
			return html;
		}},	
		{ title:'最迟还款日', name:'latestTime' ,width:100,lockWidth:true, align:'center', sortable: true, type: 'String',
			renderer: function(val,item,rowIndex){
	    		if(item.billTypeEn=='1')
				return '<span class="benjinRow">'+val+'</span>';
	    		else
	    			return val;
			}},		
	{ title:'账单生成时间', name:'createTimeStr' ,width:140, align:'center',lockWidth:true, sortable: true, type: 'String',
				renderer: function(val,item,rowIndex){
		    		if(item.billTypeEn=='1')
					return '<span class="benjinRow">'+val+'</span>';
		    		else
		    			return val;
				}},
	{ title:'状态', name:'billStatus' ,width:100,lockWidth:true, align:'center', sortable: true, type: 'String',
					renderer: function(val,item,rowIndex){
			    		if(item.billTypeEn=='1')
						return '<span class="benjinRow">'+val+'</span>';
			    		else
			    			return val;
					}},
	{ title:'已还金额', name:'backPrice' ,width:130,lockWidth:true, align:'center', sortable: true, type: 'String',
		renderer: function(val,item,rowIndex){
			if(item.billTypeEn=='1')
				return '<span class="benjinRow">'+formatMoney(val)+' 元</span>';
			else
			return '<span >'+formatMoney(val)+' 元</span>';
		}},
	{ title:'还款日期', name:'repayTime' ,width:100,lockWidth:true, align:'center', sortable: true, type: 'String',
			renderer: function(val,item,rowIndex){
				if(val!=null){
					if(item.billTypeEn=='1')
		    			return '<span class="benjinRow">'+val+'</span>';
		    		else
		    			return '<span>'+val+'</span>';
				}else
					return '';
	    		
			}},
    { title:'未还金额', name:'remainingPrice' ,width:130,lockWidth:true, align:'center', sortable: true, type: 'String',
			renderer: function(val,item,rowIndex){
				if(item.billTypeEn=='1')
				return '<span class="benjinRow">'+formatMoney(val)+' 元</span>';
				else
				return '<span >'+formatMoney(val)+' 元</span>';
			}},
    { title:'账单摘要', name:'remark' ,width:500, align:'left', sortable: true, type: 'String',
			renderer: function(val,item,rowIndex){
	    		if(item.billTypeEn=='1')
				return '<span class="benjinRow">'+val+'</span>';
	    		else
	    			return val;
			}}
];
var detail_mmg =  $("#detail_mmg").mmGrid({
	height : 260,
	cols : detail_cols,
	url : 'xascf/allBill/page.shtml?type=NOPAGE',
	params : {
		'condition.fancingOrderNo':$("#billFancingNo").val()
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
});
var BillDetails = function() {
	return {
		//取消关闭
		cancle : function(val){
			$("#tabwin_add_detail").popup({display:false});
		}
	};
}();