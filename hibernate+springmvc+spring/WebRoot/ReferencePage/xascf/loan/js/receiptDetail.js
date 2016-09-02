$(document).ready(function(){
});
var receipt_cols=[
{title: "发票号码",name:"receiptNumber" ,width:120, sortable: true, type:'string', align:'center'},
{title: "填开日期",name:"issueDate" ,width:120, sortable: true, type:'string', align:'center'},
{title: "到期日期",name:"receiptToDate" ,width:120, sortable: true, type:'string', align:'center'},
{title: "价税合计",name:"actualAmount" ,width:120, sortable: true, type:'string', align:'center',
	  renderer: function(val,item,rowIndex){
		  if(null!=val && val!='')
	    		return	formatMoney(val)+'元';
    		  else return '';}},
{title: "付款方名称",name:"payerName" ,width:150, sortable: true, type:'string', align:'center'},
{title: "票据状态",name:"isEffective" ,width:40, sortable: true, type:'string', align:'center',
	renderer: function(val,item,rowIndex){
		if(val=='0'){
			val='失效';
		}else
			val='有效'
	return val}},
{title: "附件",name:"receiptFileName" ,width:220, sortable: true, type:'string', align:'left',
        	  renderer: function(val,item,rowIndex){
        		  var html='';
        		  if(item.receiptFileUrl!='' && item.receiptFileUrl!=null && val!='' && val!=null){
        		  var urlArray=item.receiptFileUrl.split(',');
	    		  var fileNameArray=val.split(',');
	    		  var length=urlArray.length;
		    		 for(var i=0;i<length;i++)
						{
							var thisFileName = fileNameArray[i];
							if(thisFileName!=''){
								html+="<span style='position: absolute;'><a target='_blank' "+
									" href='#' onclick='FileUtil.downLoad(\""+urlArray[i]+"\",\""+thisFileName+"\")'>"+thisFileName+"</a></span><br> ";
							}
						}
        		  }
			return  html;
	    	  }},
{title: "",name:"receiptPid" ,width:120, sortable: true, type:'string', align:'center',hidden:true},
{title: "发票类型",name:"receiptType" ,width:120, sortable: true, type:'string', align:'center',
	  renderer: function(val,item,rowIndex){
			 if(val=='1')
				 val='增值税普通发票';
			 else if(val=='2')
				 val='增值税专用发票';
			 else if(val=='3')
				 val='公路内河运输统一发票';
			 else
				 val='其他发票';
	return val}},
{title: "发票种类",name:"receiptKinds" ,width:80, sortable: true, type:'string', align:'center',
	  renderer: function(val,item,rowIndex){
			 if(val=='1')
				 val='正式发票';
			 else if(val=='2')
				 val='虚拟发票';
			 else if(val=='3')
				 val='红冲发票';
	return val}},
	{title: "发票代码",name:"receiptNo" ,width:120, sortable: true, type:'string', align:'center'},
{title: "收付标识",name:"rpFlag" ,width:80, sortable: true, type:'string', align:'center'},
{title: "代收代付标识",name:"cpFlag" ,width:80, sortable: true, type:'string', align:'center'},
{title: "",name:"payerPid" ,width:80, sortable: true, type:'string', align:'center',hidden:true},

{title: "客户签收日期",name:"signforDate" ,width:80, sortable: true, type:'string', align:'center'},
{title: "付款方纳税人识别号",name:"taxPayerIdentifier" ,width:80, sortable: true, type:'string', align:'center'},

{title: "付款方开户行",name:"payerBank" ,width:120, sortable: true, type:'string', align:'center'},
{title: "付款方账号",name:"payerAccountNumber" ,width:120, sortable: true, type:'string', align:'center'},
{title: "收款方名称",name:"payeeName" ,width:120, sortable: true, type:'string', align:'center'},
{title: "收款方纳税人识别号" ,name:"taxPayeeIdentifier",width:120, sortable: true, type:'string', align:'center'},
{title: "收款方地址",name:"payeeAddress" ,width:120, sortable: true, type:'string', align:'center'},
{title: "收款方电话",name:"payeePhone" ,width:120, sortable: true, type:'string', align:'center'},
{title: "收款方开户行",name:"payeeBank" ,width:120, sortable: true, type:'string', align:'center'},
{title: "收款方账号",name:"payeeAccountNumber" ,width:120, sortable: true, type:'string', align:'center'},
{title: "商品名称或经营项目",name:"settlementName" ,width:160, sortable: true, type:'string', align:'center'},
{title: "收款人姓名",name:"payeeEsusUsername" ,width:120, sortable: true, type:'string', align:'center'},
{title: "开票人姓名",name:"drawerEsusUsername" ,width:120, sortable: true, type:'string', align:'center'},
{title: "合计总金额",name:"sumAmount" ,width:120, sortable: true, type:'string', align:'center',
	  renderer: function(val,item,rowIndex){
		  if(null!=val && val!='')
	    		return	formatMoney(val)+'元';
    		  else return '';}},
{title: "合计不含税总金额",name:"sumNotaxAmount" ,width:120, sortable: true, type:'string', align:'center',
	  renderer: function(val,item,rowIndex){
		  if(null!=val && val!='')
		return	formatMoney(val)+'元';
		  else return '';}},
{title: "合计总税金",name:"sumTaxAmount" ,width:120, sortable: true, type:'string', align:'center',
	  renderer: function(val,item,rowIndex){
		  if(null!=val && val!='')
	    		return	formatMoney(val)+'元';
    		  else return '';}},

{title: "实际总税金",name:"actualTaxAmount" ,width:120, sortable: true, type:'string', align:'center',
	  renderer: function(val,item,rowIndex){
		  if(null!=val && val!='')
	    		return	formatMoney(val)+'元';
    		  else return '';}},
{title: "",name:"receiptFileUrl" ,width:150, sortable: true, type:'string',hidden:true, align:'center'},
{title: "",name:"receiptFileRename" ,width:150, sortable: true, type:'string',hidden:true, align:'center'}

          ];
 var receipt_mmg=$('#receipt_mmg').mmGrid({
	width:'auto',
	height: 160,
	cols: receipt_cols, 
	indexCol: false,
	indexColWidth: 30,
	fullWidthRows:true,
	multiSelect: true,
	nowrap : true,
	autoLoad : true,
	params : {fancingOrderNo:$("#businessNo").val()},
	url : 'xascf/credit/receiptPage.shtml?TYPE='+$("#billTypeStatus").val()
});
receipt_mmg.on("loadSuccess",function(e, data){
	ReceiptDetail.countReceiptPrices();
})
var ReceiptDetail = function(){	
	return{
		/**
		 * 计算总价格、总数量
		 */
		countReceiptPrices:function(){
			var allnum=0;
			var allPrices=0;
			var discountPrice=0;
			var termDate='';
			if (null != receipt_mmg.row(0)) {
				for (var i = 0;i < receipt_mmg[0].rows.length; i++) {
					var item=receipt_mmg.row(i);
					termDate=item.receiptToDateStr;
					var price=parseFloat(item.actualAmount);
					allnum+=1;
					allPrices+=price;
					if ($("#billRateVal").length > 0 ){
						discountPrice+=parseFloat(price*parseFloat($("#billRateVal").val())/100.0);
					}else{
						discountPrice+=price;
					}
				}
			}
			allPrices=allPrices.toFixed(2);
//			allPrices=formatMoney(allPrices);
			discountPrice=discountPrice.toFixed(2);
//			discountPrice=formatMoney(discountPrice);
			$("#receiptPices").empty();
			$("#receiptNums").empty();
			$("#receiptNums").html(allnum);
			$("#receiptPices").html(formatMoney(allPrices)+' 元');
			$("#details_receiptNotePriceDiv").empty();
			$("#details_receiptNotePriceDiv").html(formatMoney(discountPrice)+' 元');
			$("#discountPrice").val(discountPrice);
			// 放款复核确认界面——放款申请信息—— 票据总金额、折扣后金额
//			$("#noteAllPrice").html(formatMoney(formatMoney(allPrices))+"&nbsp;元");
//			$("#discountPrice").html(formatMoney(discountPrice)+"&nbsp;元");
//			$("#fancingReplyPrice").val(discountPrice);
			$("#termDate").val(termDate);
//			$("#details_discountNotePriceDiv").html(formatMoney(discountPrice)+'&nbsp;元');
//			$("#details_allNotePriceDiv").html(formatMoney(allPrices)+"&nbsp;元");
			//填充最大放款金额  历史剩余金额+票据折扣金额
			var remaingAmountVal=parseFloat($("#histoteriRemaingAmount").val())+parseFloat(discountPrice);
			
			//查看是否低于剩余授信额度
			var lostAmount=$("#lostAmount").val();
			if(parseFloat(lostAmount)<remaingAmountVal){
				remaingAmountVal=parseFloat(lostAmount);
			}
			
			$("#remaingAmount").val(remaingAmountVal);
			$("#remaingAmountdiv").html(formatMoney(remaingAmountVal)+" 元");
			//填充票据总和
			var allNotePricedivVal=parseFloat($("#allNotePrice").val())+parseFloat(allPrices);
			$("#allNotePricediv").html(formatMoney(allNotePricedivVal)+" 元");
			var llNoteDisPriceVal=parseFloat($("#allNoteDisPrice").val())+parseFloat(discountPrice);
			$("#allNoteDisPricediv").html(formatMoney(llNoteDisPriceVal)+" 元");
			//票据置换填充信息
			$("#changeAllPrice").html(formatMoney(allPrices)+'&nbsp;元');
			$("#changeDesPrice").html(formatMoney(discountPrice)+'&nbsp;元');
			$("#noteChangeAll").val(allPrices);
			$("#noteChangeDis").val(discountPrice);
		}
	};
}();
