$(document).ready(function(){
});
var shipBill_mmg=null;
var shipBill_cols=null;

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
	 autoLoad : false,
	 url : 'xascf/credit/shipBillDetailPage.shtml'
 });
 shipBillDetail_mmg.on("loadSuccess",function(e, data){
	 ShipBillDetail.countDetailPrices();
 })
var ShipBillDetail = function(){	
	return{
		
		//表格初始化
		shipBillGrid:function(){
			shipBill_cols=[
			                   {title: "对账单编号",name:"shipBillNo" ,width:120, sortable: true, type:'string', align:'center',
			                 	  renderer: function(val,item,rowIndex){
			         			return '<a  href="javascript:void(0)" onclick="ShipBillDetail.shipBillDetailShow(\''+val+'\')">'+val+'</a>'}},
			                   {title: "票据状态",name:"isEffective" ,width:40, sortable: true, type:'string', align:'center',
			         				renderer: function(val,item,rowIndex){
			         					if(val=='0'){
			         						val='失效';
			         					}else
			         						val='有效'
				         			return val}},
			                   {title: "客户(委托方)",name:"buyName" ,width:250, sortable: true, type:'string', align:'left'},
			                   {title: "",name:"buyPid" ,width:120, sortable: true, type:'string', align:'center',hidden:true},
			                   {title: "",name:"pid" ,width:120, sortable: true, type:'string', align:'center',hidden:true},
			                   {title: "结算总金额",name:"billAmount" ,width:100, sortable: true, type:'string', align:'center',
			                	   renderer: function(val,item,rowIndex){
			           	    		return	formatMoney(val)+' 元';}},
			                   {title: "对账日",name:"checkDate" ,width:80, sortable: true, type:'string', align:'center'},
			                   {title: "到期日期",name:"toDate" ,width:80, sortable: true, type:'string', align:'center'},
			                   {title: "账单日期",name:"billDate" ,width:80, sortable: true, type:'string', align:'center'},
			                   {title: "客户确认人",name:"buyCheckName" ,width:80, sortable: true, type:'string', align:'center',},
			                   {title: "审核人",name:"checkName" ,width:60, sortable: true, type:'string', align:'center'},
			                   {title: "",name:"billFileUrl" ,width:150, sortable: true, type:'string',hidden:true, align:'center'},
			                   {title: "",name:"billFileRename" ,width:150, sortable: true, type:'string',hidden:true, align:'center'},
			                   {title: "附件",name:"billFileName" ,width:200, sortable: true, type:'string', align:'left',
			                 	  renderer: function(val,item,rowIndex){
			                 		 var html='';
			                 		  if(item.billFileUrl!='' && item.billFileUrl!=null && val!='' && val!=null){
			                 		  var urlArray=item.billFileUrl.split(',');
			         	    		  var fileNameArray=val.split(',');
			         	    		  var length=urlArray.length;
			         		    		 for(var i=0;i<length;i++)
			         						{
			         							var thisFileName = fileNameArray[i];
			         							if(thisFileName!=''){
			         								html+="<span ><a target='_blank' "+
			         									" href='#' onclick='FileUtil.downLoad(\""+urlArray[i]+"\",\""+thisFileName+"\")'>"+thisFileName+"</a><br>";
			         							}
			         						}
			                 		  }
			         			return  html;}}
			                   ];
			          shipBill_mmg=$('#shipBill_mmg').mmGrid({
			         	width:'auto',
			         	height: 160,
			         	cols: shipBill_cols, 
			         	indexCol: false,
			         	indexColWidth: 30,
			         	checkCol:false,
			         	fullWidthRows:true,
			         	multiSelect: true,
			         	nowrap : true,
			         	autoLoad : true,
			         	params : {businessNo:$("#businessNo").val()},
			         	url : 'xascf/credit/shipBillPage.shtml?TYPE='+$("#billTypeStatus").val()
			         });
			          
			        shipBill_mmg.on("loadSuccess",function(e, data){
			        		 ShipBillDetail.countBillPrices();
			        })
		},
		
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
		
		/**
		 * 计算对账单明细价格、总数量
		 */
		countBillPrices:function(){
			var allnum=0;
			var allPrices=0;
			var discountPrice=0;
			var termDate='';
			if (null != shipBill_mmg.row(0)) {
				for (var i = 0;i < shipBill_mmg[0].rows.length; i++) {
					if(shipBill_mmg.row(i).isEffective=='1'){
						var price=parseFloat(shipBill_mmg.row(i).billAmount);
						allnum+=1;
						allPrices+=price;
						if ($("#billRateVal").length > 0 ){
							discountPrice+=parseFloat(price*parseFloat($("#billRateVal").val())/100.0);
						}else{
							discountPrice+=price;
						}
						termDate=shipBill_mmg.row(i).toDate;
					}else
						continue;
				}
			}
			allPrices=allPrices.toFixed(2);
			$("#shipBillPices").empty();
			$("#shipBillNums").empty();
			$("#shipBillPices").html(formatMoney(allPrices)+'&nbsp;元');
			$("#shipBillNums").html(allnum);
			$("#shipBillDisount").empty();
			$("#shipBillDisount").html(formatMoney(discountPrice)+'&nbsp;元');
			$("#termDate").val(termDate);
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
		},
		//明细弹出
		shipBillDetailShow :function(val){
			$.post("xascf/shipBillDetai/shipBill4pop.shtml",{shipBillNo:val},function(data){
				$("#tabwin_add_content_shipBillDetailTab").html(data);
				$("#tabwin_add_shipBillDetailTab").popup({md:true});
			});
		}
	};
}();
