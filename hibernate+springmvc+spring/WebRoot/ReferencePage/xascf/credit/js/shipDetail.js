$(document).ready(function(){
	
});
var ship_cols=[{title: "运单号",name:"shipNo" ,width:120, sortable: true, type:'string', align:'center'},
 			   {title: "起运地",name:"startAddress" ,width:80, sortable: true, type:'string', align:'center'}, 
 			   {title: "目的地",name:"aimName" ,width:120, sortable: true, type:'string', align:'center'},  
			  {title: "状态",name:"status" ,width:60, sortable: true, type:'string', align:'center',
				  renderer: function(val){
						 if(val=='1')
							 val='已签收';
						 else if(val=='2')
							 val='运输中';
					return val;}},
			  {title: "发货人名称",name:"sendName" ,width:120, sortable: true, type:'string', align:'center'},
			  {title: "发货人电话",name:"sendPhone" ,width:120, sortable: true, type:'string', align:'center'},
			  {title: "收货人名称",name:"receiverName" ,width:80, sortable: true, type:'string', align:'center'},
			  {title: "收货人电话",name:"receiverPhone" ,width:120, sortable: true, type:'string', align:'center'},
			  {title: "货物名称",name:"goodsName" ,width:120, sortable: true, type:'string', align:'center'},
			  {title: "件数",name:"quantity" ,width:80, sortable: true, type:'string', align:'center'},
			  {title: "重量",name:"weight" ,width:80, sortable: true, type:'string', align:'center'},
			  {title: "运费",name:"transferFee" ,width:120, sortable: true, type:'string', align:'center'},
			  {title: "有效期",name:"toDate" ,width:60, sortable: true, type:'string', align:'center'},
			  {title: "",name:"fileUrl" ,width:150, sortable: true, type:'string',hidden:true, align:'center'},
              {title: "附件",name:"fileName" ,width:200, sortable: true, type:'string', align:'left',
            	  renderer: function(val,item,rowIndex){
            		 var html='';
            		  if(item.fileUrl!='' && item.fileUrl!=null && val!='' && val!=null){
            		  var urlArray=item.fileUrl.split(',');
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
ship_mmg=$('#ship_mmg').mmGrid({
	width:'auto',
	height: 160,
	cols: ship_cols, 
	indexCol: false,
	indexColWidth: 30,
	fullWidthRows:true,
	multiSelect: true,
	nowrap : true,
	autoLoad : true,
	params : {creditNo:$("#businessNo").val()},
	url : 'xascf/ship/page.shtml'
});


ship_mmg.on("loadSuccess",function(e, data){
	ShipDetail.shipCount();
});
var ShipDetail = function(){	

	return {
		//计算总金额
		shipCount : function() {
			var allnum = 0;
			var allPrices = 0;
			var discountPrice=0;
			var termDate='';
			if (null != ship_mmg.row(0)) {
				for ( var i = 0; i < ship_mmg[0].rows.length; i++) {
					var item=ship_mmg.row(i);
					var price = parseFloat(item.transferFee);
					allnum += 1;
					allPrices += price;
					termDate=item.toDate;
				}
			}
			allPrices = allPrices.toFixed(2);
			discountPrice=allPrices;
			if ($("#billRateVal").length > 0 ){
				discountPrice=allPrices*parseFloat($("#billRateVal").val())/100.0;
				discountPrice=discountPrice.toFixed(2)
			}
			$("#ship_pices").empty();
			$("#ship_nums").empty();
			$("#ship_pices").html(formatMoney(allPrices)+' 元');
			$("#shipdis_pices").html(formatMoney(discountPrice)+' 元');
			$("#ship_nums").html(allnum);
			$("#termDate").val(termDate);
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
//			//填充票据总和订单运单不充当有效票据
//			var allNotePricedivVal=parseFloat($("#allNotePrice").val())+parseFloat(allPrices);
//			$("#allNotePricediv").html(formatMoney(allNotePricedivVal)+" 元");
//			var llNoteDisPriceVal=parseFloat($("#allNoteDisPrice").val())+parseFloat(discountPrice);
//			$("#allNoteDisPricediv").html(formatMoney(llNoteDisPriceVal)+" 元");
//			//票据置换填充信息
//			$("#changeAllPrice").html(formatMoney(allPrices)+'&nbsp;元');
//			$("#changeDesPrice").html(formatMoney(discountPrice)+'&nbsp;元');
//			$("#noteChangeAll").val(allPrices);
//			$("#noteChangeDis").val(discountPrice);
		}
	};
}();
