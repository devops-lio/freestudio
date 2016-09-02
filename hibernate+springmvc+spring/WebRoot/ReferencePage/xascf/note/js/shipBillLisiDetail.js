$(document).ready(function(){
});
var lisishipBill_mmg=null;
var lisishipBill_cols=null;

var lisishipBillDetail_cols=[
                   {title: "对账单号",name:"shipBillNo" ,width:120, sortable: true, type:'string', align:'center'},
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
var lisishipBillDetail_mmg=$('#lisishipBilldetail_mmg').mmGrid({
	 width:'auto',
	 height: 240,
	 cols: lisishipBillDetail_cols, 
	 indexCol: true,
	 indexColWidth: 30,
	 checkCol:true,
	 fullWidthRows:true,
	 multiSelect: true,
	 nowrap : true,
	 autoLoad : false,
	 url : 'xascf/credit/shipBillDetailPage.shtml'
 });
 lisishipBillDetail_mmg.on("loadSuccess",function(e, data){
	 lisishipBillDetail.countDetailPrices();
 })
var lisishipBillDetail = function(){	
	return{
		
		//表格初始化
		shipBillGrid:function(){
			lisishipBill_cols=[
			                   {title: "对账单号",name:"shipBillNo" ,width:80, sortable: true, type:'string', align:'center',
			                 	  renderer: function(val,item,rowIndex){
			         			return '<a  href="javascript:void(0)" onclick="lisishipBillDetail.shipBillDetailShow(\''+val+'\')">'+val+'</a>'}},
			         			{title: "票据状态",name:"isEffective" ,width:40, sortable: true, type:'string', align:'center',
			         				renderer: function(val,item,rowIndex){
			         					if(val=='0'){
			         						val='失效';
			         					}else
			         						val='有效'
				         			return val}},
			         			{title: "客户(委托方)",name:"buyName" ,width:300, sortable: true, type:'string', align:'left'},
			                   
			                   {title: "",name:"buyPid" ,width:120, sortable: true, type:'string', align:'center',hidden:true},
			                   {title: "",name:"pid" ,width:120, sortable: true, type:'string', align:'center',hidden:true},
			                   {title: "结算总金额",name:"billAmount" ,width:100, sortable: true, type:'string', align:'center',
			                	   renderer: function(val,item,rowIndex){
	    			    	    		return	formatMoney(val)+'元';}},
			                   {title: "对账日",name:"checkDate" ,width:80, sortable: true, type:'string', align:'center'},
			                   {title: "票据到期时间",name:"toDate" ,width:80, sortable: true, type:'string', align:'center'},
			                   {title: "账单日期",name:"billDate" ,width:80, sortable: true, type:'string', align:'center'},
			                   {title: "客户确认人",name:"buyCheckName" ,width:80, sortable: true, type:'string', align:'center',hidden:true},
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
			          lisishipBill_mmg=$('#lisishipBill_mmg').mmGrid({
			         	width:'auto',
			         	height: 160,
			         	cols: lisishipBill_cols, 
			         	indexCol: false,
			         	indexColWidth: 30,
			         	checkCol:false,
			         	fullWidthRows:true,
			         	multiSelect: true,
			         	nowrap : true,
			         	autoLoad : true,
			         	params : {businessNo:$("#businessNo").val()},
			         	url : 'xascf/credit/shipBillPage.shtml?TYPE=LISI'
			         });
			          
			          lisishipBill_mmg.on("loadSuccess",function(e, data){
//			        	lisishipBillDetail.countBillPrices();
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
			if (null != lisishipBillDetail_mmg.row(0)) {
				for (var i = 0;i < lisishipBillDetail_mmg[0].rows.length; i++) {
					var price=parseFloat(lisishipBillDetail_mmg.row(i).allPrice);
					allnum+=1;
					allPrices+=price;
				}
			}
			allPrices=allPrices.toFixed(2);
			$("#lisidetailPices").empty();
			$("#lisidetailNums").empty();
			$("#lisidetailPices").html(formatMoney(allPrices)+'元');
			$("#lisidetailNums").html(allnum);
		},
		
		/**
		 * 计算对账单价格、总数量
		 */
		countBillPrices:function(){
			var allnum=0;
			var allPrices=0;
			var discountPrice=0;
			var termDate='';
			if (null != lisishipBill_mmg.row(0)) {
				for (var i = 0;i < lisishipBill_mmg[0].rows.length; i++) {
					var price=parseFloat(lisishipBill_mmg.row(i).billAmount);
					allnum+=1;
					allPrices+=price;
					discountPrice+=parseFloat(price*parseFloat($("#billRateVal").val())/100.0);
					termDate=lisishipBill_mmg.row(i).toDate;
				}
			}
			allPrices=allPrices.toFixed(2);
			$("#lisireceiptPices").empty();
			$("#lisireceiptNums").empty();
			$("#lisireceiptPices").html(formatMoney(allPrices)+'&nbsp;元');
			$("#lisireceiptNums").html(allnum);
			$("#lisishipBillDisount").html(formatMoney(discountPrice)+'&nbsp;元');
			$("#lisi_discountNotePriceDiv").html(formatMoney(discountPrice)+'&nbsp;元');
			$("#lisi_allNotePriceDiv").html(formatMoney(allPrices)+"&nbsp;元");
//			//填充最大放款金额  历史剩余金额+票据折扣金额
//			var remaingAmountVal=parseFloat($("#histoteriRemaingAmount").val())+parseFloat(discountPrice);
//			$("#remaingAmount").val(remaingAmountVal);
//			$("#remaingAmountdiv").html(formatMoney(remaingAmountVal)+" 元(含本次)");
//			//填充票据总和
//			var allNotePricedivVal=parseFloat($("#allNotePrice").val())+parseFloat(allPrices);
//			$("#allNotePrice").val(allNotePricedivVal);
//			$("#allNotePricediv").html(formatMoney(allNotePricedivVal)+" 元(含本次)");
//			var llNoteDisPriceVal=parseFloat($("#allNoteDisPrice").val())+parseFloat(discountPrice);
//			$("#allNoteDisPrice").val(llNoteDisPriceVal);
//			$("#allNoteDisPricediv").html(formatMoney(llNoteDisPriceVal)+" 元(含本次)");
		},
		//明细弹出
		shipBillDetailShow :function(val){
			$("#tabwin_add_lisishipBillDetail").popup({md:true});
			lisishipBillDetail_mmg.load({businessNo:val});
		},
		
		//取消关闭
		shipBillCancle : function(){
			$("#tabwin_add_lisishipBillDetail").popup({display:false});
		}
	};
}();
