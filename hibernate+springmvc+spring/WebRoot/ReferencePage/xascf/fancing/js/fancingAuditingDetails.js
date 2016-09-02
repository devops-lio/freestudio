 $(document).ready(function(){
 	PUI.plugin.init({},$("#check_form"));
 	PUI.plugin.init({},$("#buyer_form"));
	sns.valid.init($("#check_form"));
	sns.valid.init($("#buyer_form"));
	$("#zhangqi").find(".chosen-container").css("float",'right').css("width",'30%');
	$("#billRebackType").bind("change", function(){
		var val=$(this).val();
		if(val=='3'){
			$("#lxjszq").css({display: "none"});
		}else
			$("#lxjszq").css({display: "block"});
	});
	
});
 var ship_cols=[
  {title: "运单号",name:"shipNo" ,width:120, sortable: true, type:'string', align:'center'},
  {title: "",name:"shipOrderPid" ,width:120, sortable: true, type:'string', align:'center',hidden:true},
  {title: "委托人",name:"shipClient" ,width:120, sortable: true, type:'string', align:'center'},
  {title: "车牌号码",name:"shipCarNo" ,width:80, sortable: true, type:'string', align:'center'},
  {title: "出发地",name:"shipFrom" ,width:80, sortable: true, type:'string', align:'center'},
  {title: "目的地",name:"shipTo" ,width:80, sortable: true, type:'string', align:'center'},
  {title: "运单金额(元)",name:"shipPrice" ,width:120, sortable: true, type:'string', align:'center'},
  {title: "货物名称",name:"shipName" ,width:120, sortable: true, type:'string', align:'center'},
  {title: "货物数量",name:"shipNum" ,width:120, sortable: true, type:'string', align:'center'},
  {title: "状态",name:"shipStatus" ,width:60, sortable: true, type:'string', align:'center',
	  renderer: function(val){
		 if(val=='1')
			 val='已签收';
		 else if(val=='2')
			 val='运输中';
	return val}}
  ];
	var ship_mmg=$('#ship_mmg').mmGrid({
		width:'auto',
		height: 160,
		cols: ship_cols, 
		indexCol: true,
		indexColWidth: 30,
		fullWidthRows:true,
		multiSelect: true,
		nowrap : true,
		showBackboard:false,
		autoLoad : true,
		params : {fancingOrderNo:$("#fancingOrderNo").val()},
		url : 'xascf/shipOrder/page.shtml'
	});
	ship_mmg.on("loadSuccess",function(e, data){
		FancingAuditingDetails.countNumPrices();
	})
var receipt_cols=[
  {title: "发票代码",name:"receiptNo" ,width:120, sortable: true, type:'string', align:'center'},
  {title: "",name:"receiptPid" ,width:120, sortable: true, type:'string', align:'center',hidden:true},
  {title: "发票类型",name:"receiptType" ,width:120, sortable: true, type:'string', align:'center',
	  renderer: function(val,item,rowIndex){
			 if(val=='1')
				 val='普通发票';
			 else if(val=='2')
				 val='增值税发票';
			 else
				 val='其他发票';
	return val}},
 {title: "附件",name:"receiptFileName" ,width:120, sortable: true, type:'string', align:'center',
    	  renderer: function(val,item,rowIndex){
				 var url=item.receiptFileUrl;
		return '<a target="_blank" href="xascf/util/download.shtml?fileName='+val+'&url='+url+'">'+val+'</a>'}},
 {title: "填开时间",name:"receiptFromDate" ,width:120, sortable: true, type:'string', align:'center'},		
  {title: "发票抬头",name:"receiptOtherName" ,width:80, sortable: true, type:'string', align:'center'},
  {title: "货物名称",name:"goodsName" ,width:80, sortable: true, type:'string', align:'center'},
  {title: "货物规格型号",name:"goodsSpec" ,width:80, sortable: true, type:'string', align:'center'},
  {title: "数量",name:"goodsNum" ,width:120, sortable: true, type:'string', align:'center'},
  {title: "单位",name:"goodsUnit" ,width:120, sortable: true, type:'string', align:'center'},
  {title: "发票金额",name:"receiptPrice" ,width:120, sortable: true, type:'string', align:'center'},
  {title: "发票税率",name:"taxRate" ,width:120, sortable: true, type:'string', align:'center'},
  {title: "发票税额",name:"taxPrice" ,width:120, sortable: true, type:'string', align:'center'},
  {title: "",name:"receiptFileUrl" ,width:150, sortable: true, type:'string',hidden:true, align:'center'}
 
  ];
var	receipt_mmg=$('#receipt_mmg').mmGrid({
		width:'auto',
		height: 160,
		cols: receipt_cols, 
		indexCol: true,
		indexColWidth: 30,
		fullWidthRows:true,
		multiSelect: true,
		nowrap : true,
		autoLoad : true,
		params : {fancingOrderNo:$("#fancingOrderNo").val()},
		url : 'xascf/receipt/page.shtml'
	});
	receipt_mmg.on("loadSuccess",function(e, data){
		FancingAuditingDetails.countReceiptNumPrices();
	})
var ladingBill_cols=[
  {title: "提单号",name:"ladingBillNo" ,width:120, sortable: true, type:'string', align:'center'},
  {title: "",name:"ladingBillPid" ,width:120, sortable: true, type:'string', align:'center',hidden:true},
  {title: "提单类型",name:"ladingBillType" ,width:120, sortable: true, type:'string', align:'center',
	  renderer: function(val,item,rowIndex){
			 if(val=='1')
				 val='海运提单';
			 else
				 val='空运提单';
	return val}},
	{title: "附件",name:"ladingBillFilename" ,width:120, sortable: true, type:'string', align:'center',
    	  renderer: function(val,item,rowIndex){
				 var url=item.ladingBillFileurl;
		return '<a target="_blank" href="xascf/util/download.shtml?fileName='+val+'&url='+url+'">'+val+'</a>'}},
  {title: "承运时间",name:"ladingBillDate" ,width:120, sortable: true, type:'string', align:'center'},
  {title: "发货人",name:"ladingBillClient" ,width:120, sortable: true, type:'string', align:'center'},
  {title: "货物起运地",name:"ladingBillFrom" ,width:80, sortable: true, type:'string', align:'center'},
  {title: "货物目的地",name:"ladingBillTo" ,width:80, sortable: true, type:'string', align:'center'},
  {title: "航次",name:"ladingBillCarNo" ,width:80, sortable: true, type:'string', align:'center'},
  {title: "货物名称",name:"ladingBillGoodsname" ,width:80, sortable: true, type:'string', align:'center'},
  {title: "数量",name:"ladingBillNum" ,width:120, sortable: true, type:'string', align:'center'},
  {title: "运费",name:"ladingBillPrice" ,width:120, sortable: true, type:'string', align:'center'},
  
  {title: "",name:"ladingBillFileurl" ,width:150, sortable: true, type:'string',hidden:true, align:'center'}
  
  ];
var ladingBill_mmg=$('#ladingBill_mmg').mmGrid({
	width:'auto',
	height: 160,
	cols: ladingBill_cols, 
	indexCol: true,
	indexColWidth: 30,
	fullWidthRows:true,
	multiSelect: true,
	nowrap : true,
	autoLoad : true,
	params : {fancingOrderNo:$("#fancingOrderNo").val()},
	url : 'xascf/ladingBill/page.shtml'
});
ladingBill_mmg.on("loadSuccess",function(e, data){
	FancingAuditingDetails.countLadingBillNumPrices();
})		
var FancingAuditingDetails = function() {
	return {
		/**
		 * 计算提单总价格、总数量
		 */
		countLadingBillNumPrices:function(){
			var allnum=0;
			var allPrices=0;
			if (null != ladingBill_mmg.row(0)) {
				for (var i = 0;i < ladingBill_mmg[0].rows.length; i++) {
					var price=parseFloat(ladingBill_mmg.row(i).ladingBillPrice);
					allnum+=1;
					allPrices+=price;
				}
			}
			allPrices=allPrices.toFixed(2);
			$("#ladingBillpices").empty();
			$("#ladingBillnums").empty();
			$("#ladingBillpices").html(allPrices);
			$("#ladingBillnums").html(allnum);
		},
		/**
		 * 计算发票总价格、总数量
		 */
		countReceiptNumPrices:function(){
			var allnum=0;
			var allPrices=0;
			if (null != receipt_mmg.row(0)) {
				for (var i = 0;i < receipt_mmg[0].rows.length; i++) {
					var price=parseFloat(receipt_mmg.row(i).receiptPrice);
					allnum+=1;
					allPrices+=price;
				}
			}
			allPrices=allPrices.toFixed(2);
			$("#picesReceipt").empty();
			$("#numsReceipt").empty();
			$("#picesReceipt").html(allPrices);
			$("#numsReceipt").html(allnum);
		},
		/**
		 * 计算运单总价格、总数量
		 */
		countNumPrices:function(){
			var allnum=0;
			var allPrices=0;
			if (null != ship_mmg.row(0)) {
				for (var i = 0;i < ship_mmg[0].rows.length; i++) {
					var price=parseFloat(ship_mmg.row(i).shipPrice);
					allnum+=1;
					allPrices+=price;
				}
			}
			allPrices=allPrices.toFixed(2);
			$("#pices").empty();
			$("#nums").empty();
			$("#pices").html(allPrices);
			$("#nums").html(allnum);
		},
		// 上传文件格式校验
		validateFile:function(val){
			var fileName = $("#file_"+val).val();
			var fileType = fileName.substring(fileName.lastIndexOf(".")+1);
			if (fileType != "doc" && fileType != "docx" && fileType != "gif"&& fileType != "jpg" && fileType != "png" && fileType != "bmp"){
				PUI.MessageBox.alert("请上传Word文件或者扫描图片文件!");
				return false;				
			} else {
				return true;
			}

		}, 
		fileChange :function(){
			var src=$("#file_pl").val();
			if(!FancingAuditingDetails.validateFile('pl')){
				return;
			}
			$("#textfielid_pl").val(src);
			var requestName=$("#fancingOrderNo").val();
			var pl_fileName=$("#pl_fileName").val();
			var pl_textId=src;
			var fileName=$("#pl_fileName").val();
			var url=$("#pl_url").val();
			var fag=true;
			if( pl_fileName!=pl_textId){
				$.ajaxFileUpload({
					url:'xascf/util/upload.shtml?type=买断式融资三方协议&requestName='+requestName,
					secureuri : false,
					fileElementId : 'file_pl',
					dataType : 'text',
					type:'post',
					success: function (data, status)
					{
						var message=data.message;
						if(message.indexOf('成功')>=0){
							 fileName=data.fileName;
							 url=data.url;
							$("#pl_fileName").val(fileName);
							$("#pl_url").val(url);
						}else{
							fag=false;
							PUI.MessageBox.alert(message);
						}
					},
					error: function (data, status, e)
					{
						alert(e);
					}
				});
			}
		},
		saveFancingCheck :function(){
			if (!$("#check_form").isValid()) {
				return ;
			}
			var requestPrice=parseFloat($("#requestPrice").val());
			var checkPrice=parseFloat($("#fancingReplyPrice").val());
			if(checkPrice>requestPrice){
				PUI.MessageBox.info("批复金额不能大于融资申请金额!");
				return ;
			}
			var params=$("#check_form").serializeArray();
			var i=0;
			$("#buyerTable").find("tr").each(function(){
				var buyerRate=$(this).find("input[name='buyerRate']").val();
				if(buyerRate!='undefined' &&buyerRate!=null){
					params.push({
						name: 'fancingOrderEntity.buyerInfoList[' + i + '].buyerRate',
						value: buyerRate
					});
				}
				var customersubPid=$(this).find("input[name='customersubPid']").val();
				if(customersubPid!='undefined' && customersubPid!=null){
					params.push({
						name: 'fancingOrderEntity.buyerInfoList[' + i + '].customersubPid',
						value: customersubPid
					});
					i++;
				}
			  });
			$.post("xascf/fancing/saveCheck.shtml",params,function(data){  
				if(data.indexOf('成功')>=0){
					PUI.MessageBox.info(data, null, {autoClose: true, timeOut: 997, afterClose: function() {
						Menu.forward("xascf/fancing/jsp/fancingAuditingList.jsp"); 
					}});
				}else{
					PUI.MessageBox.info(data);
				}
				
			});
		},
		saveReback:function(){
			if (!$("#reback_form").isValid()) {
				return ;
			}
			$.post("xascf/fancing/saveBack.shtml",$("#reback_form").serialize(),function(data){  
				if(data.indexOf('成功')>=0){
					PUI.MessageBox.info(data);
					Menu.forward("xascf/fancing/jsp/fancingAuditingList.jsp");  
				}else{
					PUI.MessageBox.info(data);
				}
				
			});
		},
		rebackCheck:function(){
			$("#checkPassDiv").css({display: "none"});
			$("#rebackDiv").css({display: "block"});
//			$("#checkDiv").empty();
//			$("#checkDiv").append(html);
			sns.valid.init($("#reback_form"));
		},
		rebackToCheck:function(){
			$("#rebackDiv").css({display: "none"});
			$("#checkPassDiv").css({display: "block"});
		},
		/**清空**/
		clear : function(){
			PUI.util.resetForm($("#billonListQueryForm"));
		}
	};
}();