$(document).ready(function(){
	
});
var order_cols=null;
var order_mmg=null;

var _orderItems = new Array(
		'shipNo',
		'carrierCode',
		'carrierName',
		'carNo',
		'mainDriverName',
		'startAddress',
		'aimName',
		'payType',
		'payPrice',
		'status',
		'sendName',
		'sendPhone',
		'receiverName',
		'receiverPhone',
		'goodsName',
		'quantity',
		'weight',
		'transferFee',
		'toDate',
		'financingOrderNo',
		'planCarrierName',
		'planCarNo',
		'planHandCarNo',
		'handCarNo',
		'planScendDriverName',
		'scendDriverName',
		'aimCode',
		'sendCode',
		'sendAddress',
		'receiverCode',
		'receiverAddress',
		'goodsCode',
		'packageType',
		'goodsValue',
		'safeFee',
		'allFee',
		'remark'
	);




var OrderInfo = function(){	

	return {
		
		//表格初始化
		orderGrid:function(){
			 order_cols=[{title: "订单编号",name:"orderNo" ,width:120, sortable: true, type:'string', align:'center'},
			             {title: "授信编号",name:"creditNo" ,width:80, sortable: true,hidden:true, type:'string', align:'center'},
			  			 {title: "派车单号",name:"delveryNo" ,width:80, sortable: true, type:'string', align:'center'},
			  			 {title: "订单条码",name:"orderBarcode" ,width:120, sortable: true, type:'string', align:'center'}, 
			  			 {title: "委托方名称",name:"buyName" ,width:120, sortable: true, type:'string', align:'center'},
			  			 {title: "下单人",name:"singleName" ,width:80, sortable: true, type:'string', align:'center'}, 
			  			 {title: "下单时间",name:"singleDate" ,width:120, sortable: true, type:'string', align:'center'},  
			  			 {title: "运输类型",name:"tranType" ,width:120, sortable: true, type:'string', align:'center'},
			 			 {title: "订单状态",name:"orderStatus" ,width:120, sortable: true, type:'string', align:'center'},
			 			 {title: "要求达到时间",name:"reqArrivalDate" ,width:60, sortable: true, type:'string', align:'center',
			 				  renderer: function(val){
			 						 if(val=='1')
			 							 val='已签收';
			 						 else if(val=='2')
			 							 val='运输中';
			 					return val;}},
			 			 {title: "要求提货时间",name:"reqDeliveryDate" ,width:120, sortable: true, type:'string', align:'center'},
			 			 {title: "提货地址",name:"shipperAddress" ,width:120, sortable: true, type:'string', align:'center'},
			 			 {title: "提货联系人电话",name:"shipperTel" ,width:80, sortable: true, type:'string', align:'center'},
			 			 {title: "提货联系人",name:"shipperContact" ,width:120, sortable: true, type:'string', align:'center'},
			 			 {title: "总件数",name:"quantity" ,width:120, sortable: true, type:'string', align:'center'},
			 			 {title: "订单总体积",name:"valume" ,width:80, sortable: true, type:'string', align:'center'},
			 			 {title: "开票金额",name:"billAmount" ,width:80, sortable: true, type:'string', align:'center'},
			 			 {title: "是否开票",name:"isHaveBill" ,width:120, sortable: true, type:'string', align:'center'},
			 			 {title: "是否已开单",name:"isHaveAccount" ,width:60, sortable: true, type:'string', align:'center'},
			  			 
			 			 {title: "订单总毛重",name:"weight" ,width:120, sortable: true, type:'string', align:'center'},
			 			 {title: "预收付金额",name:"preAmount" ,width:120, sortable: true, type:'string', align:'center'},
			 			 {title: "已收付金额",name:"amountReceived" ,width:80, sortable: true, type:'string', align:'center'},
			 			 {title: "总金额",name:"totalAmount" ,width:120, sortable: true, type:'string', align:'center'},
			 			 {title: "有效期至",name:"toDate" ,width:120, sortable: true, type:'string', align:'center'},
			 			 {title: "文件名",name:"fileName" ,width:120, sortable: true, type:'string', align:'center'},
			 			 {title: "备注",name:"remark" ,width:60, sortable: true, type:'string', align:'center'}];
			 order_mmg=$('#order_mmg').mmGrid({
			 				width:'auto',
			 				height: 160,
			 				cols:order_cols, 
			 				indexCol: false,
			 				indexColWidth: 30,
			 				checkCol:false,
			 				fullWidthRows:true,
			 				multiSelect: true,
			 				nowrap : true,
			 				autoLoad : true,
			 				params : {creditNo:$("#businessNo").val()},
			 				url : 'xascf/order/orderPage.shtml'
			 });
			 order_mmg.on("loadSuccess",function(e, data){
					OrderInfo.orderCount();
			});
		},
		
		//计算总金额
		orderCount : function() {
			var allnum = 0;
			var allPrices = 0;
			var discountPrice=0;
			var termDate='';
			if (null != order_mmg.row(0)) {
				for ( var i = 0; i < order_mmg[0].rows.length; i++) {
					var price = parseFloat(order_mmg.row(i).totalAmount);
					termDate=order_mmg.row(i).toDate;
					allnum += 1;
					allPrices += price;
				}
			}
			allPrices = allPrices.toFixed(2);
			discountPrice=allPrices;
			if ($("#billRateVal").length > 0 ){
				discountPrice=allPrices*parseFloat($("#billRateVal").val())/100.0;
				discountPrice=discountPrice.toFixed(2)
			}
			$("#order_pices").html(formatMoney(allPrices)+"元");
			$("#orderDisount").html(formatMoney(discountPrice)+"元");
			$("#order_nums").html(allnum);
			//填充最大放款金额  历史剩余金额+票据折扣金额
//			var remaingAmountVal=parseFloat($("#histoteriRemaingAmount").val())+parseFloat(discountPrice);
			//填充最大放款金额 预付款无需添加历史剩余金额+票据折扣金额
			var remaingAmountVal=parseFloat(discountPrice);
			
			//查看是否低于剩余授信额度
			var lostAmount=$("#lostAmount").val();
			if(parseFloat(lostAmount)<remaingAmountVal){
				remaingAmountVal=parseFloat(lostAmount);
			}
			
			$("#remaingAmount").val(remaingAmountVal);
			$("#remaingAmountdiv").html(formatMoney(remaingAmountVal)+" 元");
			//填充票据总和订单运单不充当有效票据
//			var allNotePricedivVal=parseFloat($("#allNotePrice").val())+parseFloat(allPrices);
//			$("#allNotePricediv").html(formatMoney(allNotePricedivVal)+" 元(含本次)");
//			var llNoteDisPriceVal=parseFloat($("#allNoteDisPrice").val())+parseFloat(discountPrice);
//			$("#allNoteDisPricediv").html(formatMoney(llNoteDisPriceVal)+" 元(含本次)");
		}
		
	};
}();
