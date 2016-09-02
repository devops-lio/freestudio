 $(document).ready(function(){
	//初始化mmgridTab
	 $('#diya_Tab').on('shown', function (e) {
		 FancingDetails._diyaInit();	
	 });
	 $('#danbao_Tab').on('shown', function (e) {
		 FancingDetails._danbaoInit();	
	 });
	 $('#ladingBill_Tab').on('shown', function (e) {
		 FancingDetails._ladingBillInit();	
	 });
	 $('#receipt_Tab').on('shown', function (e) {
		 FancingDetails._receiptInit();	
	 });
});
 var details_receipt_mmg=null;
 var details_ladingBill_mmg=null;
 var details_db_mmg=null;
 var detailsdy_mmg=null;
 var details_ship_cols=[
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
 var details_ship_mmg=$('#details_ship_mmg').mmGrid({
		width:'auto',
		height: 160,
		cols: details_ship_cols, 
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
	details_ship_mmg.on("loadSuccess",function(e, data){
		FancingDetails.countNumPrices();
	});
var details_receipt_cols=[
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
var details_ladingBill_cols=[
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
var details_db_cols=[
  {title: "担保人/担保公司",name:"guaranteeName" ,width:300, sortable: true, type:'String', align:'center'},
  {title: "担保协议",name:"guaranteeProtocolName" ,width:420, sortable: true, type:'string', align:'center',
		 renderer: function(val,item,rowIndex){
			 var url=item.guaranteeProtocolUrl;
	return '<a target="_blank" href="xascf/util/download.shtml?fileName='+val+'&url='+url+'">'+val+'</a>'}}
  ];
var details_dy_cols=[
          {title: "抵押类型",name:"qualificationType" ,width:120, sortable: true, type:'string', align:'center',
        	  renderer: function(val){
					 if(val=='5')
						 val='房产抵押';
					 else if(val=='6')
						 val='车辆抵押';
					 else if(val=='7')
						 val='土地抵押';
			return val}},
          {title: "抵押文件编码",name:"qualificationNo" ,width:120, sortable: true, type:'string', align:'center'},
		  {title: "抵押文件名称",name:"qualificationName" ,width:120, sortable: true, type:'string', align:'center'},
		  {title: "已上传文件",name:"qualificationFileName" ,width:150, sortable: true, type:'string', align:'center',
				 renderer: function(val,item,rowIndex){
					 var url=item.qualificationUrl;
			return '<a target="_blank" href="xascf/util/download.shtml?fileName='+val+'&url='+url+'">'+val+'</a>'}}
          ];
var FancingDetails = function() {
	return {
		_diyaInit :function(){
			if (null != detailsdy_mmg) {
				return;
			}
			detailsdy_mmg=$('#details_dy_mmg').mmGrid({
				width:'auto',
				height:160,
				cols: details_dy_cols, 
				indexCol: true,
				indexColWidth: 30,
				fullWidthRows:true,
				showBackboard:false,
				nowrap : true,
				multiSelect: true,
				autoLoad : true,
				params : {fancingOrderNo:$("#fancingOrderNo").val()},
				url : 'xascf/qualification/page.shtml'
			});
		},
		_danbaoInit :function(){
			if (null != details_db_mmg) {
				return;
			}
			details_db_mmg=$('#details_db_mmg').mmGrid({
				width:'auto',
				height: 160,
				cols: details_db_cols, 
				indexCol: true,
				indexColWidth: 30,
				fullWidthRows:true,
				showBackboard:false,
				multiSelect: true,
				nowrap : true,
				autoLoad : true,
				params : {fancingOrderNo:$("#fancingOrderNo").val()},
				url : 'xascf/guarantee/page.shtml'
			});
		},
		_ladingBillInit :function(){
			if (null != details_ladingBill_mmg) {
				return;
			}
			details_ladingBill_mmg=$('#details_ladingBill_mmg').mmGrid({
				width:'auto',
				height: 160,
				cols: details_ladingBill_cols, 
				indexCol: true,
				indexColWidth: 30,
				fullWidthRows:true,
				multiSelect: true,
				nowrap : true,
				autoLoad : true,
				params : {fancingOrderNo:$("#fancingOrderNo").val()},
				url : 'xascf/ladingBill/page.shtml'
			});
			details_ladingBill_mmg.on("loadSuccess",function(e, data){
				FancingDetails.countLadingBillNumPrices();
			})
		},
		_receiptInit :function(){
			if (null != details_receipt_mmg) {
				return;
			}
			details_receipt_mmg=$('#details_receipt_mmg').mmGrid({
				width:'auto',
				height: 160,
				cols: details_receipt_cols, 
				indexCol: true,
				indexColWidth: 30,
				fullWidthRows:true,
				multiSelect: true,
				nowrap : true,
				autoLoad : true,
				params : {fancingOrderNo:$("#fancingOrderNo").val()},
				url : 'xascf/receipt/page.shtml'
			});
		details_receipt_mmg.on("loadSuccess",function(e, data){
				FancingDetails.countReceiptNumPrices();
			})
		},
		/**
		 * 计算提单总价格、总数量
		 */
		countLadingBillNumPrices:function(){
			var allnum=0;
			var allPrices=0;
			if (null != details_ladingBill_mmg.row(0)) {
				for (var i = 0;i < details_ladingBill_mmg[0].rows.length; i++) {
					var price=parseFloat(details_ladingBill_mmg.row(i).ladingBillPrice);
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
			if (null != details_receipt_mmg.row(0)) {
				for (var i = 0;i < details_receipt_mmg[0].rows.length; i++) {
					var price=parseFloat(details_receipt_mmg.row(i).receiptPrice);
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
			if (null != details_ship_mmg.row(0)) {
				for (var i = 0;i < details_ship_mmg[0].rows.length; i++) {
					var price=parseFloat(details_ship_mmg.row(i).shipPrice);
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
		/**清空**/
		clear : function(){
			
		}
	};
}();