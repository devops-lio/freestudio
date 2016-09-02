$(document).ready(function(){
});

var shipBillDetail_cols=[
   {title: "对账单编号",name:"shipBillNo" ,width:120, sortable: true, type:'string', align:'center'},
   {title: "物流单号",name:"shipNo" ,width:120, sortable: true, type:'string', align:'center'},
   {title: "",name:"pid" ,width:120, sortable: true, type:'string', align:'center',hidden:true},
   {title: "始发站",name:"startPalce" ,width:120, sortable: true, type:'string', align:'center'},
   {title: "目的站",name:"toPlace" ,width:80, sortable: true, type:'string', align:'center'},
   {title: "收货人",name:"consigneeName" ,width:80, sortable: true, type:'string', align:'center'},
   {title: "服务方式",name:"serviceType" ,width:80, sortable: true, type:'string', align:'center',hidden:true},
   {title: "货物名",name:"goodsName" ,width:120, sortable: true, type:'string', align:'center'},
   {title: "总件数",name:"goodsNum" ,width:150, sortable: true, type:'string', align:'center'},
   {title: "体积",name:"goodsValume" ,width:150, sortable: true, type:'string',align:'center'},
   {title: "应收提货费",name:"deliveryFee" ,width:150, sortable: true, type:'string',align:'center'},
   {title: "应收操作费",name:"operationFee" ,width:150, sortable: true, type:'string',align:'center'},
   {title: "应收保险费",name:"insuranceFee" ,width:150, sortable: true, type:'string',align:'center'},
   {title: "应收派送费",name:"delivertoFee" ,width:150, sortable: true, type:'string',align:'center'},
   {title: "运费单价",name:"shipFee" ,width:150, sortable: true, type:'string',align:'center'},
   {title: "应收运费",name:"shipPrice" ,width:150, sortable: true, type:'string',align:'center'},
   {title: "应收总费用",name:"allPrice" ,width:150, sortable: true, type:'string',align:'center'}
   ];
var shipBillDetail_mmg=$('#shipBilldetail_mmg').mmGrid({
	 width:'auto',
	 height: 240,
	 cols: shipBillDetail_cols, 
	 indexCol: true,
	 indexColWidth: 30,
	 fullWidthRows:true,
	 multiSelect: true,
	 nowrap : true,
	 autoLoad : true,
	 params : {businessNo:$("#shipBillNo").val()},
	 url : 'xascf/credit/shipBillDetailPage.shtml'
 });
 shipBillDetail_mmg.on("loadSuccess",function(e, data){
	 ShipBillDetailTab.countDetailPrices();
 })
var ShipBillDetailTab = function(){	
	return{
		
		
		//对账单明细表格初始化
		shipBillDetail_Init:function(){
//			if (null != shipBillDetail_mmg) {
//				return;
//			}
			
		},
		/**
		 * 计算对账单明细总价格、总数量
		 */
		countDetailPrices:function(){
			var allnum=0;
			var allPrices=0;
			if (null != shipBillDetail_mmg.row(0)) {
				for (var i = 0;i < shipBillDetail_mmg[0].rows.length; i++) {
					var price=parseFloat(shipBillDetail_mmg.row(i).allPrice);
					allnum+=1;
					allPrices+=price;
				}
			}
			allPrices=allPrices.toFixed(2);
			$("#detailPices").empty();
			$("#detailNums").empty();
			$("#detailPices").html(formatMoney(allPrices)+'元');
			$("#detailNums").html(allnum);
		},
		
		
		//取消关闭
		shipBillCancle : function(){
			$("#tabwin_add_shipBillDetailTab").popup({display:false});
		}
	};
}();
