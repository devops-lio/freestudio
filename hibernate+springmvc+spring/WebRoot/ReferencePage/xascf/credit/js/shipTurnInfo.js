$(document).ready(function(){
	
});
var shipTurn_mmg=null;
var shipTurn_cols=null;
var ShipTurnInfo = function(){	
	return {
		
		//表格初始化
		shipTurnGrid:function(){
			shipTurn_cols=[
			                   {title: "回单编号",name:"turnNo" ,width:120, sortable: true, type:'string', align:'center'},
			                   {title: "票据状态",name:"isEffective" ,width:40, sortable: true, type:'string', align:'center',
			         				renderer: function(val,item,rowIndex){
			         					if(val=='0'){
			         						val='失效';
			         					}else
			         						val='有效'
				         			return val}},
			                   {title: "",name:"businessNo" ,width:80, sortable: true,hidden:true, type:'string', align:'center'},
			     			   {title: "运输订单号",name:"customerOrderNo" ,width:80, sortable: true, type:'string', align:'center'},
			     			   {title: "物流运单号",name:"shipNo" ,width:120, sortable: true, type:'string', align:'center'}, 
			     			   {title: "运输派车单号",name:"dispatchOrder" ,width:120, sortable: true, type:'string', align:'center'},
			     			   {title: "车牌号",name:"carNo" ,width:120, sortable: true, type:'string', align:'center'},
			     			   {title: "到期日期",name:"toDate" ,width:120, sortable: true, type:'string', align:'center'},
			     			   {title: "发货人名称",name:"buyName" ,width:120, sortable: true, type:'string', align:'center'},
			     			   {title: "",name:"buyPid" ,width:120, sortable: true,hidden:true, type:'string', align:'center'},
			     			   {title: "起运地",name:"startPlace" ,width:80, sortable: true, type:'string', align:'center'}, 
			     			   {title: "目的地",name:"toPlace" ,width:120, sortable: true, type:'string', align:'center'},  
			     			   {title: "收货人名称",name:"consigneeName" ,width:120, sortable: true, type:'string', align:'center'},  
			     			   {title: "收货地址",name:"consigneeAddress" ,width:120, sortable: true, type:'string', align:'center'},  
			    			  {title: "签回人",name:"signPerson" ,width:120, sortable: true, type:'string', align:'center'},
			    			  {title: "签回时间",name:"signTime" ,width:120, sortable: true, type:'string', align:'center'},
			    			  {title: "客户回执人",name:"confirmCustomer" ,width:120, sortable: true, type:'string', align:'center'},
			    			  {title: "客户回执时间",name:"confirmTime" ,width:120, sortable: true, type:'string', align:'center'},
			    			  {title: "件数",name:"quantity" ,width:120, sortable: true, type:'string', align:'center'},
			    			  {title: "重量",name:"weight" ,width:120, sortable: true, type:'string', align:'center'},
			    			  {title: "体积",name:"volume" ,width:120, sortable: true, type:'string', align:'center'},
			    			  {title: "总金额",name:"totalPrice" ,width:120, sortable: true, type:'string', align:'center',
			    				  renderer: function(val,item,rowIndex){
			    			    		return	formatMoney(val)+'元';}},
			    			  {title: "签收金额",name:"signPrice" ,width:120, sortable: true, type:'string', align:'center',
			    			    			renderer: function(val,item,rowIndex){
			    			    	    		return	formatMoney(val)+'元';}},
			    			  {title: "",name:"fileUrl" ,width:150, sortable: true, type:'string',hidden:true, align:'center'},
			              	  {title: "",name:"fileRename" ,width:150, sortable: true, type:'string',hidden:true, align:'center'},
			              	  {title: "附件",name:"fileName" ,width:120, sortable: true, type:'string', align:'center',
			    	        	  renderer: function(val,item,rowIndex){
			    					var url=item.fileUrl;
			    				  	return '<a target="_blank" href="xascf/util/download.shtml?fileName='+val+'&url='+url+'">'+val+'</a>'}}
			    			  ];
			   shipTurn_mmg=$('#shipTurn_mmg').mmGrid({
			    				width:'auto',
			    				height: 160,
			    				cols: shipTurn_cols, 
			    				indexCol: false,
			    				indexColWidth: 30,
			    				fullWidthRows:true,
			    				multiSelect: true,
			    				nowrap : true,
			    				autoLoad : true,
			    				params : {businessNo:$("#businessNo").val()},
			    				url : 'xascf/shipTurn/page.shtml?TYPE='+$("#billTypeStatus").val()
			    		  });
			    shipTurn_mmg.on("loadSuccess",function(e, data){
			    	ShipTurnInfo.shipTurnCount();
			    		 	});
		},
		//计算总金额
		shipTurnCount : function() {
			var allnum = 0;
			var allPrices = 0;
			var discountPrice=0;
			var termDate='';
			if (null != shipTurn_mmg.row(0)) {
				for ( var i = 0; i < shipTurn_mmg[0].rows.length; i++) {
					var price = parseFloat(shipTurn_mmg.row(i).totalPrice);
					allnum += 1;
					allPrices += price;
					termDate=shipTurn_mmg.row(i).toDate;
//					discountPrice+=parseFloat(price*parseFloat($("#billRateVal").val())/100.0);
				}
			}
			allPrices = allPrices.toFixed(2);
			if ($("#billRateVal").length > 0 ){
				discountPrice=allPrices*parseFloat($("#billRateVal").val())/100.0;
				discountPrice=discountPrice.toFixed(2)
			}else
				discountPrice=allPrices;
			$("#shipTurn_pices").html(formatMoney(allPrices)+'&nbsp;元');
			$("#shipTurn_nums").html(allnum);
			// 放款票据审批界面—— 本次审批设置 —— 票据原始总金额、票据折扣后金额
			// 放款复核确认界面——放款申请信息—— 票据总金额、折扣后金额
//			$("#noteAllPrice").html(formatMoney(allPrices)+"&nbsp;元");
//			$("#discountPrice").html(formatMoney(discountPrice)+"&nbsp;元");
//			$("#fancingReplyPrice").val(discountPrice);
			$("#shipTurnDisount").empty();
			$("#shipTurnDisount").html(formatMoney(discountPrice));
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
