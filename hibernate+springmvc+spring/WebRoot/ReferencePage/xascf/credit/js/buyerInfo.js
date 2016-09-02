
var buyer_cols = new Array(
		{ title:'企业PID', name:'buyPid' ,width:150, align:'center', sortable: true, hidden:true},
	    { title:'委托方名称', name:'buyName' ,width:350, align:'left', sortable: true, type: 'string',
			renderer: function(val,item,rowIndex){return '<span style=""><a href="#" onclick="customerDetailPop.buyerDetail(\''+item.buyPid+'\')">'
		    	  +val+'</a></span>';}},
	    { title:'账期', name:'billCycle' ,width:60,lockWidth:true,align:'center', sortable: true, type: 'string',
	    	renderer: function(val){
			return val +'天';}},
	    { title:'业务占比', name:'businessPercent' ,width:70,lockWidth:true, align:'center', sortable: true, type:'string',
				renderer: function(val){
				return val+'%';}},
	    { title:'票据类型', name:'billType' ,width:70,lockWidth:true, align:'center', sortable: true, type: 'string',
	    	renderer: function(val){
				 if(val=='1')
					 val='发票';
				 else if(val=='2')
					 val='对账单';
				 else if(val=='3')
					 val='回单';
			return val;}},
	    { title:'是否预付', name:'isPrePay' ,width:70,lockWidth:true, align:'center', sortable: true, type: 'string',
	    	renderer: function(val){
				 if(val=='1')
					 val='否';
				 else if(val=='2')
					 val='是';
			return val;}},
	    { title:'预付票据类型', name:'preBillType' ,width:90,lockWidth:true, align:'center', sortable: true, type:'string',
				renderer: function(val){
					 if(val=='1')
						 val='订单';
					 else if(val=='2')
						 val='运单';
				return val;}}
	);
 buyer_mmg =  $("#buyer_mmg").mmGrid({
	height: 160,
	cols: buyer_cols,
	url : 'xascf/creditbuyRel/page.shtml',
    params : {creditNo:$("#creditNo").val()},
	method: 'post',
	checkCol: true,
	autoLoad: true,
	showBackboard:false,
	fullWidthRows: true,
	indexColWidth: 15, 
	cache: false,
	multiSelect: true,
	nowrap: true
});
var _buyerItems = new Array(
			'buyPid',
			'buyName',
			'billCycle',
			'businessPercent',
			'billType',
			'isPrePay',
			'preBillType'
		);



var BuyerInfo = function(){	
	return{
		//预付票据页面选择
//		isPrePayChoose:function(){
//			var isPrepay=$("#isPrePay").val();
//			if(isPrepay=="2"){
//				$("#preBillType").val("2").trigger("liszt:updated");
//			}
//			
//		},
		//表格新增委托方
		buyerAdd : function(val) {
			var html = PUI.String.format($("#template_"+val).html(), {});
			$("#tabwin_add_content_"+val).html(html);
			$("#tabwin_add_"+val).popup({md:true});
			PUI.plugin.init({}, $("#tabwin_add_content_"+val));
			sns.valid.init($("#"+val+"_form"));
			
//			$("#isPrePay").bind("change",
//				function(){
//					BuyerInfo.isPrePayChoose();
//				}
//			);
			
			if (null!=buyer_mmg && null != buyer_mmg.row(0)){
				var len =buyer_mmg[0].rows.length;
				for (var i = 0;i < len; i++) {
					 $("#buyerExist").val($("#buyerExist").val()+buyer_mmg.row(i)['buyPid']+',');
				}
			}
		},
		//新增一行表格记录
		addBuyerRow :function (){
			if (!$("#buyer_form").isValid()) {
				return ;
			}
			var isPrePay=$("#isPrePay").val();
			if('1'==isPrePay){
				if($("#billType").val()==''){
					PUI.MessageBox.alert("是否预付为“否”，票据类型必填！");
					return ;
				}
			}else if('2'==isPrePay){
				if($("#preBillType").val()==''){
					PUI.MessageBox.alert("是否预付为“是”，预付票据必填！");
					return ;
				}
			}
			var _rootItem = {
					buyPid:$("#buyPid").val(),
					buyName:$("#buyName").val(),
					billCycle:$("#billCycle").val(),
					businessPercent:$("#businessPercent").val(),
					billType:$("#billType").val(),
					isPrePay:$("#isPrePay").val(),
					preBillType:$("#preBillType").val()
			};
//			if("2"==$("#isPrePay").val()&&"2"!=$("#preBillType").val()){
//				PUI.MessageBox.alert("是否预付为“是”，预付票据必须为运单！");
//				return ;
//			}
			if ($("#tabwin_add_content_buyer input[name=rowIndex]").val() != "") {
				var rowIndex=parseInt($("#tabwin_add_content_buyer input[name=rowIndex]").val());
				buyer_mmg.updateRow(_rootItem, rowIndex);
			} else {
				buyer_mmg.addRow(_rootItem, buyer_mmg.rowsLength());
			}
			$("#tabwin_add_buyer").popup({display:false});
			$("#buyerExist").val($("#buyerExist").val()+$("#buyPid").val()+',');
		},
		
		//取消关闭
		buyerCancle : function(){
			$("#tabwin_add_buyer").popup({display:false});
		},
		
		
		// 表格删除一行记录
		removeBuyerItem: function() {
			if (buyer_mmg.selectedRowsIndex().length == 0){
				PUI.MessageBox.alert("请至少选中一条记录");
				return;
			}
			PUI.MessageBox.show({
				title: "删除委托方信息",
				content: "你确定要删除委托方信息 吗？",
				type: "alert",
				buttons: [{ value: "是" },{ value: "否" }],
				success: function (result) {
					if (result == "是") {
						while (buyer_mmg.selectedRowsIndex().length > 0) {
							var data=buyer_mmg.selectedRows();
							var len =data.length;
							for (var i = 0;i < len; i++) {
								var buyPid=data[i]['buyPid'];
								$("#buyerExist").val($("#buyerExist").val().replace(new RegExp(buyPid,'gm'),''));
							}
							$("#buyerExist").val();
							buyer_mmg.removeRow(buyer_mmg.selectedRowsIndex()[0]);
							
							
							
							
						}
					}
				}
			});
		},
		//是否预付监听
		changeCheck:function(){
			var isPrePay=$("#isPrePay").val();
			if('1'==isPrePay){
				$("#preBillType").val("").trigger("liszt:updated");
				$("#preBillType").attr("disabled","disabled");
			} else {
				$("#preBillType").removeAttr("disabled");
			}
		},
		//编辑
		edit:function(){
			if (buyer_mmg.selectedRows().length != 1) {
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			var items = buyer_mmg.selectedRows()[0];
			var rowIndex = buyer_mmg.selectedRowsIndex();
			var html = PUI.String.format($("#template_buyer").html(), $.extend(items, {rowIndex : rowIndex}));
			$("#tabwin_add_content_buyer").html(html);
			$("#tabwin_add_buyer").popup({md : true});
			$("#billType").val(items.billType).trigger("liszt:updated");
			$("#isPrePay").val(items.isPrePay).trigger("liszt:updated");
			$("#preBillType").val(items.preBillType).trigger("liszt:updated");
			PUI.plugin.init({}, $("#tabwin_add_content_buyer"));
			sns.valid.init($("#tabwin_add_content_buyer > form"));
			BuyerInfo.changeCheck();
			
		}
	};
}();

$(document).ready(function(){
	//预付票据类型下拉框
	
});
