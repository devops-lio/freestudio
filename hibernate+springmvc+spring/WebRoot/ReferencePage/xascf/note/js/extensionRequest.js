$(function(){
	 sns.valid.init($("#fancingForm"));
	 PUI.plugin.init({}, $("#fancingForm"));
});

var ExtensionRequest=function(){
	return{
		/***
		 * 保存融资交易单
		 */
		save : function(){
			var params = $("#fancingForm").serializeArray();
			var billType=$("#billType").val();
			if(billType=='1'){
				//添加发票列表
				if(typeof receipt_mmg != 'undefined' && (receipt_mmg == null|| null == receipt_mmg.row(0))){
					PUI.MessageBox.alert("发票列表不能为空!");
					return;
				}
				var receiptItem= null;
				if (typeof receipt_mmg != 'undefined' && null!=receipt_mmg && null != receipt_mmg.row(0)){
					var len =receipt_mmg[0].rows.length
					for (var i = 0;i < len; i++) {
						for (var j = 0; j < _receiptItems.length; j++) {
							receiptItem  = _receiptItems[j];
							params.push({
								name: 'fancingOrderEntity.receiptModelList[' + i + '].' + receiptItem,
								value: receipt_mmg.row(i)[receiptItem]
							});
						}
					}
				}
			}
			// 对账单
			else if('2' == billType){
				var shipBillItem= null;
				if(typeof shipBill_mmg != 'undefined' && (shipBill_mmg == null|| null == shipBill_mmg.row(0))){
					PUI.MessageBox.alert("对账单列表不能为空!");
					return;
				}
				if (typeof shipBill_mmg != 'undefined' && null!=shipBill_mmg && null != shipBill_mmg.row(0)){
					var len = shipBill_mmg[0].rows.length;
					for (var i = 0;i < len; i++) {
						for (var j = 0; j < _shipBillItems.length; j++) {
							shipBillItem  = _shipBillItems[j];
							params.push({
								name: 'fancingOrderEntity.shipBillModelList[' + i + '].' + shipBillItem,
								value: shipBill_mmg.row(i)[shipBillItem]
							});
						}
					}
				}
			}
			// 回单
			else if('3' == billType){
				if(typeof shipTurn_mmg != 'undefined' && (shipTurn_mmg == null|| null == shipTurn_mmg.row(0))){
					PUI.MessageBox.alert("回单列表不能为空!");
					return;
				}
				var shipTurnItem= null;
				if (typeof shipTurn_mmg != 'undefined' && null!=shipTurn_mmg && null != shipTurn_mmg.row(0)){
					var len = shipTurn_mmg[0].rows.length;
					for (var i = 0;i < len; i++) {
						for (var j = 0; j < _shipTurnItems.length; j++) {
							shipTurnItem  = _shipTurnItems[j];
							params.push({
								name: 'fancingOrderEntity.shipTurnModelList[' + i + '].' + shipTurnItem,
								value: shipTurn_mmg.row(i)[shipTurnItem]
							});
						}
					}
				}
			}
			$.post("xascf/notePool/saveExtendRequest.shtml",params,function(data){  
					PUI.MessageBox.info(data);
					Menu.forward("xascf/note/jsp/noteChangeList.jsp"); 
			},"json");
		},
		/***
		 * 返回列表界面
		 */
		confir : function(){
			Menu.forward("xascf/note/jsp/noteChangeList.jsp"); 
		}
	};
}();
