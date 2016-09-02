$(function(){
	 sns.valid.init($("#fancingForm"));
	 PUI.plugin.init({}, $("#fancingForm"));
	//放宽至下拉框change事件
		$("#loanToType").on("change", function(){
			var _thisVal=$(this).val();
			if(_thisVal=='2'){
				$("#driverBankInfo_div").show();
				DriverBankInfo._init();
			}else
				$("#driverBankInfo_div").hide();
		});
		var _thisVal=$("#loanToType").val();
		if(_thisVal=='2'){
			$("#driverBankInfo_div").show();
			setTimeout(function() {
				DriverBankInfo._init();
			}, '10');
		}else
			$("#driverBankInfo_div").hide();
});

var BalancePaymentEdit=function(){
	return{
		/***
		 * 保存融资交易单
		 */
		save : function(){
			if (!$("#fancingForm").isValid()) {
				return ;
			}
			// 本次申请放款金额
			var replyPrice=parseFloat($("#replyPrice").val());
			// 未付金额
			var lostPrice=parseFloat($("#lostPrice").val());
			if(lostPrice<replyPrice){
				PUI.MessageBox.alert("放款申请金额不能超过未付金额!");
				return ;
			}
			// 申请金额 = 本次申请放款金额
			$("#requestPrice").val(replyPrice);
			var params = $("#fancingForm").serializeArray();
			// 款项类型
			var loanType = $("#loanType").val();
			// 票据类型
			var billType= "";
			// loanType=3=尾款
			if('3'==loanType){
				billType = $("#billType").val(); // 全款票据类型
				if(billType=='1'){
					//添加发票列表
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
			}
			//2.11 Toney  放款至司机账号绑定关联信息
			var loanToType=$("#loanToType").val();
			if(loanToType=='2'){
				var driverBankItem= null;
				if (typeof driver_mmg != 'undefined' && null!=driver_mmg && null != driver_mmg.row(0)){
					var len = driver_mmg[0].rows.length;
					for (var i = 0;i < len; i++) {
						for (var j = 0; j < _driverBankItems.length; j++) {
							driverBankItem  = _driverBankItems[j];
							params.push({
								name: 'fancingOrderEntity.driverBankNoList[' + i + '].' + driverBankItem,
								value: driver_mmg.row(i)[driverBankItem]
							});
						}
					}
				}
			}

			var isSpecial = $("#isSpecial").val();
			if("1"==isSpecial){
				$.post("xascf/fancing/saveInSpecial.shtml",params,function(data){
					var res=data.split(',');
					if(res[0].indexOf('成功')>=0){
						//保存按钮激活
						PUI.MessageBox.info(res[0]);
						Menu.forward("xascf/loan/jsp/loanRequestList.jsp");  
					}else{
						PUI.MessageBox.info(data);
					}
				},"json");
			}else{
				$.post("xascf/fancing/save.shtml",params,function(data){
					var res=data.split(',');
					if(res[0].indexOf('成功')>=0){
						//保存按钮激活
						PUI.MessageBox.info(res[0]);
						var orderNo=res[1];
						var fancingPid=res[2];
						$("#businessNo").val(orderNo);
						$("#fancingPid").val(fancingPid);
						Menu.forward("xascf/loan/jsp/myLoanRequestList.jsp");  
					}else{
						PUI.MessageBox.info(data);
					}
				},"json");
			}
		},
		/***
		 * 提交融资交易单
		 */
		confir : function(){
			if (!$("#fancingForm").isValid()) {
				return ;
			}
			var requestPrice=parseFloat($("#requestPrice").val());
			var remaingAmount=parseFloat($("#remaingAmount").val());
			if(remaingAmount<requestPrice){
				PUI.MessageBox.alert("放款申请金额不能超过剩余可融资金额!");
				return ;
			}
			var params = $("#fancingForm").serializeArray();
			// 款项类型
			var loanType = $("#loanType").val();
			// 票据类型
			var billType= "";
			// loanType = 3 = 尾款。票据两种（订单、运单）
			if('3'==loanType){
				billType = $("#billType").val(); // 全款票据类型
				if(billType=='1'){
					if(typeof receipt_mmg != 'undefined' && (receipt_mmg == null|| null == receipt_mmg.row(0))){
						PUI.MessageBox.alert("发票列表不能为空!");
						return;
					}
					//添加发票列表
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
					if(typeof shipBill_mmg != 'undefined' && (shipBill_mmg == null|| null == shipBill_mmg.row(0))){
						PUI.MessageBox.alert("对账单列表不能为空!");
						return;
					}
					var shipBillItem= null;
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
			}
			PUI.MessageBox.show({
			    title: "提示",
			    content: "确定要提交放款申请信息?",
			    type: "alert",
			    buttons: [{ value: "是" },{ value: "否" }],
			    success: function (result) {
			        if (result == "是") {
							$.post("xascf/fancing/toConfir.shtml",params,function(data){
								var res=data.split(',');
								if(res[0].indexOf('成功')>=0){
									//保存按钮激活
									PUI.MessageBox.info(res[0]);
									var orderNo=res[1];
									if(orderNo!=null && orderNo!=""){
										Menu.forward("xascf/loan/jsp/myLoanRequestList.jsp");  
									} else {		
										$("#businessNo").val(orderNo);
										$("#fancingPid").val(fancingPid);
									}
								}else{
									PUI.MessageBox.info(data);
								}
							},"json");
			        }
			    }
		    });
		}
	};
}();
