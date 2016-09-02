$(document).ready(function(){
});
var lisireceipt_cols=[
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
									" href='#' onclick='FileUtil.downLoad(\""+urlArray[i]+"\",\""+thisFileName+"\")'>"+thisFileName+"</a>"+
									" <span style='position: relative;top: 4px;'><a style='cursor:pointer' title='删除'" +
									"class='buttonRomve' onclick='ReceiptInfo.removeFile(\""+rowIndex+"\",\""+i+"\")'>&nbsp;&nbsp;</a></span></span><br> ";
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
 var lisireceipt_mmg=$('#lisireceipt_mmg').mmGrid({
	width:'auto',
	height: 160,
	cols: lisireceipt_cols, 
	indexCol: false,
	indexColWidth: 30,
	fullWidthRows:true,
	multiSelect: true,
	nowrap : true,
	autoLoad : true,
	params : {fancingOrderNo:$("#businessNo").val()},
	url : 'xascf/credit/receiptPage.shtml?TYPE=LISI'
});
lisireceipt_mmg.on("loadSuccess",function(e, data){
//	ReceiptLisiDetail.countReceiptPrices();
})
var ReceiptLisiDetail = function(){	
	return{
		/**
		 * 计算总价格、总数量
		 */
		countReceiptPrices:function(){
			var allnum=0;
			var allPrices=0;
			var discountPrice=0;
			var termDate='';
			if (null != lisireceipt_mmg.row(0)) {
				for (var i = 0;i < lisireceipt_mmg[0].rows.length; i++) {
					var item=lisireceipt_mmg.row(i);
					termDate=item.receiptToDateStr;
					var price=parseFloat(item.actualAmount);
					allnum+=1;
					allPrices+=price;
					if($("#billRateVal").val()==null){
						discountPrice=0;
					}else{
						discountPrice+=parseFloat(parseFloat(item.actualAmount)*parseFloat($("#billRateVal").val())/100.0);
					}
					
				}
			}
			allPrices=allPrices.toFixed(0);
			discountPrice=discountPrice.toFixed(0);
			$("#lisireceiptPices").empty();
			$("#lisireceiptNums").empty();
			$("#lisireceiptNums").html(allnum);
			$("#lisireceiptPices").html(formatMoney(allPrices)+'元');
			$("#lisidetails_discountNotePriceDiv").html(formatMoney(discountPrice)+'&nbsp;元');
		}
	};
}();
