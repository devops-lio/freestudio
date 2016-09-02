var n;//一个有几个材料 ，在材料js里面初始化
var CreditEdit=function(){
	return {
		//选择了会员才能选择调差报告
		clearReport:function(){
		},
		//检查会员是否有再走的授信流程
		customerCheck:function(){
			var memberPid=$("#memberPid").val();
			var memberPidSys=$("#memberPidSys").val();
			if(memberPid!=memberPidSys){
				$.post("xascf/creditApply/customerCheck.shtml",{"memberPid":memberPid},function(data){
					if(data=="有授信"){
						PUI.MessageBox.alert("此会员已经存在有效授信，无法再次发起授信!");
						$("#memberName").val("");
//						PUI.MessageBox.show({
//						    title: "提示",
//						    content: "此会员已经有一个授信，如果你继续发起此会员的授信那么之前授信会作废，您是否继续？",
//						    type: "info",
//						    buttons: [{ value: "是" },{ value: "否" }],
//						    success: function (result) {
//						        if (result == "是") {
//						        	$.post("xascf/creditApply/abolish.shtml", {"memberPid":memberPid}, function(data) {
//						        		$("#reportPid").val("");
//						        		$("#reportTitle").val("");
//						        		PUI.MessageBox.info(data);
//						        	});
//						        }else{
//						        	$("#memberName").val("");
//						        }
//						    }
//					    });
					}else{
						$("#reportPid").val("");
		        		$("#reportTitle").val("");
					}
				},"json");
			}
			
		},
		//融资类型显示或者隐藏
		typeShowOrHide:function(){
			var financingType=$("#financingType").val();
			if(financingType=="1"){
				$("#financingMethodDiv").show();
				$("#financingNatureDiv").show();
			}else if(financingType=="2"){
				$("#financingMethodDiv").hide();
				$("#financingNatureDiv").hide();
			}
		},
		returnList: function(){
			Menu.forward('xascf/credit/jsp/creditList.jsp');
		},
		//更新
		save:function(type){
			if(!$("#creditForm").isValid()){
				$("#creditQuota").focus();
				return;
			}
			if($("#materialSize").val()!=0){
				n=$("#materialSize").val();
			}else{
				n=$("#materialDefineSize").val();
			}
			//表单和材料有效时间校验
			 if("10"==type){
				//材料是否全部上传
				for(var i=0;i<n;i++){
					//如果文件名为空而且是必输的则提示
					var typeName = $("#typeName_"+i).text().trim();
					if(typeName.indexOf("*")>-1)
					{		
						if(""==$("#td"+i).text().trim()){
							PUI.MessageBox.alert("材料 "+typeName.replace("*","")+"不能为空");
							return ;
						}
					}
				}
				var val=buyer_mmg.row(0);
				if(null==val){
					PUI.MessageBox.alert("请新增委托方！");
					return ;
				}
			}
			
			//添加表单
			var	params = $("#creditForm").serializeArray();
//			}else{
//				params=[{"creditEntity.creditModel.pid":$("#creditPid").val()},
//				        {"creditEntity.creditModel.creditNo":$("#creditNo").val()},
//				        {"creditEntity.creditModel.memberType":$("#memberType").val()},
//				        {"creditEntity.creditModel.memberPid":$("#memberPid").val()},
//						{"creditEntity.creditModel.creditQuota":$("#creditQuota").val()},
//						{"creditEntity.creditModel.financingType":$("#financingType").val()},
//						{"creditEntity.creditModel.effectiveStartTime":$("#effectiveStartTime").val()},
//						{"creditEntity.creditModel.effectiveEndTime":$("#effectiveEndTime").val()}];
//			}
			params.push({
				name: "creditEntity.creditModel.status",
				value: type
			});
			
//			//添加贷款卡号
//			if($("#loansBank").val()!='' && $("#memberPid").val()!='' && $("#loansPwd").val()!=''){
//				params.push({
//					name: "creditEntity.loanbankModel.loansBank",
//					value: $("#loansBank").val()  
//				},{
//					name:"creditEntity.loanbankModel.memberPid",
//					value:$("#memberPid").val() 
//				},{
//					name:"creditEntity.loanbankModel.loansNo",
//					value:$("#loansNo").val() 
//				},{
//					name:"creditEntity.loanbankModel.loansPwd",
//					value:$("#loansPwd").val()
//				});
//			}
			//添加材料数据var flag='';
			var flag='';
			for(var i=0;i<n;i++){
				flag+=$("#flag"+i).val()+",";
			}
			params.push({
				name: "creditEntity.flag",
				value: flag
			});
			
			//添加授信材料
			for(var i=0;i<n;i++){
				params.push({
					name: "creditEntity.materialCreditModelList['"+i+"'].materialDefinePid",
					value: $("#materialDefinePid"+i).val()
				},{
					name: "creditEntity.materialCreditModelList['"+i+"'].effectiveTimeEnd",
					value: $("#timeStr"+i).val()
				},{
					name: "creditEntity.materialCreditModelList['"+i+"'].pid",
					value: $("#pid"+i).val()
				});
			}
				
			//添加委托人数据
			var _buyerItem= null;
			if (null!=buyer_mmg && null != buyer_mmg.row(0) && _buyerItems!=null){
				var len =buyer_mmg[0].rows.length;
				for (var i = 0;i < len; i++) {
					for (var j = 0; j < _buyerItems.length; j++) {
						_buyerItem  = _buyerItems[j];
						params.push({
							name: 'creditEntity.buyRelList[' + i + '].' + _buyerItem,
							value: buyer_mmg.row(i)[_buyerItem]
						});
					}
				}
			}
			
			//添加发票数据
			var receiptItem= null;
			if (null!=receipt_mmg && null != receipt_mmg.row(0)&& _receiptItems!=null){
				var len =receipt_mmg[0].rows.length;
				if(len>0){
					for (var i = 0;i < len; i++) {
						for (var j = 0; j < _receiptItems.length; j++) {
							receiptItem  = _receiptItems[j];
							params.push({
								name: 'creditEntity.receiptList[' + i + '].' + receiptItem,
								value: receipt_mmg.row(i)[receiptItem]
							});
						}
					}
				}
			}else{//数据完全清空
				params.push({
					name: 'creditEntity.receiptList[0].id',
					value: '-111'
				});
			}
			//添加对账单数据
			var shipBillItem= null;
			if (null!=shipBill_mmg && _shipBillItems!=null){
				if(null != shipBill_mmg.row(0)){
					var len =shipBill_mmg[0].rows.length;
					if(len>0){
						for (var i = 0;i < len; i++) {
							for (var j = 0; j < _shipBillItems.length; j++) {
								shipBillItem  = _shipBillItems[j];
								params.push({
									name: 'creditEntity.shipBillList[' + i + '].' + shipBillItem,
									value: shipBill_mmg.row(i)[shipBillItem]
								});
							}
						}
					}
				}else{//数据完全清空
					params.push({
						name: 'creditEntity.shipBillList[0].id',
						value: '-111'
					});
				}
			}else{//未点击tab
				params.push({
					name: 'creditEntity.shipBillList[0].id',
					value: '-222'
				});
			}
			//添加回单数据
			var shipTurnItem= null;
			if (null!=shipTurn_mmg && _shipTurnItems!=null){
				if(null != shipTurn_mmg.row(0)){
					var len =shipTurn_mmg[0].rows.length;
					if(len>0){
						for (var i = 0;i < len; i++) {
							for (var j = 0; j < _shipTurnItems.length; j++) {
								shipTurnItem  = _shipTurnItems[j];
								params.push({
									name: 'creditEntity.shipTurnList[' + i + '].' + shipTurnItem,
									value: shipTurn_mmg.row(i)[shipTurnItem]
								});
							}
						}
					}
				}else{
					params.push({
						name: 'creditEntity.shipTurnList[0].id',
						value: '-111'
					});
				}
			}else{//未点击tab
				params.push({
					name: 'creditEntity.shipTurnList[0].id',
					value: '-222'
				});
			}
			//添加运单数据
			var shipItem= null;
			if (null!=ship_mmg && null != ship_mmg.row(0) && _shipItems!=null){
				var len =ship_mmg[0].rows.length;
				if(len>0){
					for (var i = 0;i < len; i++) {
						for (var j = 0; j < _shipItems.length; j++) {
							shipItem  = _shipItems[j];
							params.push({
								name: 'creditEntity.shipList[' + i + '].' + shipItem,
								value: ship_mmg.row(i)[shipItem]
							});
						}
					}
				}
			}else{
				params.push({
					name: 'creditEntity.shipList[0].id',
					value: '-111'
				});
			}
			//添加订单数据
			var orderItem= null;
			if (null!=order_mmg  && _orderItems!=null){
				if(null != order_mmg.row(0)){
					var len =order_mmg[0].rows.length;
					if(len>0){
						for (var i = 0;i < len; i++) {
							for (var j = 0; j < _orderItems.length; j++) {
							orderItem  = _orderItems[j];
							params.push({
								name: 'creditEntity.orderList[' + i + '].' + orderItem,
								value: order_mmg.row(i)[orderItem]
							});
							}
						}
					}
				}else{
					//数据完全清空
					params.push({
						name: 'creditEntity.orderList[0].id',
						value: '-111'
					});
				}
			}else{
				//未点击tab
				params.push({
					name: 'creditEntity.orderList[0].id',
					value: '-222'
				});
			}
				var danbaoItem= null;
				if (null!=db_mmg  && danbaoItems!=null){
					if(null != db_mmg.row(0)){
						var len =db_mmg[0].rows.length;
						for (var i = 0;i < len; i++) {
							for (var j = 0; j < danbaoItems.length; j++) {
								danbaoItem  = danbaoItems[j];
								params.push({
									name: 'creditEntity.danbaoList[' + i + '].' + danbaoItem,
									value: db_mmg.row(i)[danbaoItem]
								});
							}
						}
					}else{//没数据
						params.push({
							name: 'creditEntity.danbaoList[0].id',
							value: '-111'
						});
					}
					
				}
				
				var danbaoItemRel= null;
				if (null!=db_mmg && null != db_mmg.row(0) && danbaoItemRels!=null){
					var len =db_mmg[0].rows.length;
					for (var i = 0;i < len; i++) {
						for (var j = 0; j < danbaoItemRels.length; j++) {
							danbaoItemRel  = danbaoItemRels[j];
							params.push({
								name: 'creditEntity.danbaoRelList[' + i + '].' + danbaoItemRel,
								value: db_mmg.row(i)[danbaoItemRel]
							});
						}
					}
				}
	 			var diyaItem= null;
				if (null!=dy_mmg  && diyaItems!=null){
					if( null != dy_mmg.row(0)){
						var len =dy_mmg[0].rows.length;
						for (var i = 0;i < len; i++) {
							for (var j = 0; j < diyaItems.length; j++) {
								diyaItem  = diyaItems[j];
								params.push({
									name: 'creditEntity.diyaModelList[' + i + '].' + diyaItem,
									value: dy_mmg.row(i)[diyaItem]
								});
							}
						}
					}else{//没数据
						params.push({
							name: 'creditEntity.diyaModelList[0].id',
							value: '-111'
						});
					}
					
				}
				if("10"==type){
					PUI.MessageBox.show({
					    title: "提示",
					    content: "确定需要提交授信信息吗？",
					    type: "alert",
					    buttons: [{ value: "是" },{ value: "否" }],
					    success: function (result) {
					        if (result == "是") {
					        	$.post("xascf/creditApply/save.shtml",params,function(data){
									if(data.indexOf('成功')>=0){
										if(type=='00')
											PUI.MessageBox.info("保存成功!");
										else
											PUI.MessageBox.info("提交成功!");
										Menu.forward("xascf/credit/jsp/creditList.jsp");
									}else{
										PUI.MessageBox.info(data);
									}
								},"json");
					        }
					    }
				    });
				}else if("90"==type){
					$.post("xascf/creditApply/update.shtml",params,function(data){
						if(data.indexOf('成功')>=0){
							PUI.MessageBox.info("保存成功!");
							Menu.forward("xascf/credit/jsp/creditAllList.jsp");
						}else{
							PUI.MessageBox.info(data);
						}
					},"json");
				}else{
					$.post("xascf/creditApply/save.shtml",params,function(data){
						if(data.indexOf('成功')>=0){
							if(type=='00')
								PUI.MessageBox.info("保存成功!");
							else
								PUI.MessageBox.info("提交成功!");
							Menu.forward("xascf/credit/jsp/creditList.jsp");
						}else{
							PUI.MessageBox.info(data);
						}
					},"json");
				}
			
			
		}
		
	};
}();

$(document).ready(function(){
	PUI.plugin.init({}, $("#creditForm"));
	sns.valid.init($("#creditForm"));
	//融资类型下拉框
//	$("#financingType").bind("change",
//		function(){
//			CreditEdit.typeShowOrHide();
//		}
//	);
	//票据下拉框
	$("#billType").bind("change",
		function(){
			CreditApply.billShowOrHide();
		}
	);
	//预付票据类型下拉框
	$("#prepayBillType").bind("change",
		function(){
			CreditApply.prePayBillShowOrHide();
		}
	);
	
	//初始化订单mmgrid
	$('#orderInfoBt').on('shown', function (e) {
		OrderInfo.orderGrid();		 		
	});
	$('#shipBillEditBt').on('shown', function (e) {
		ShipBillEdit.shipBillGrid();		 		
	});
	$('#shipTurnEditBt').on('shown', function (e) {
		ShipTurnEdit.shipTurnGrid();		 		
	});
//	//担保checkbox点击事件
//	 $("#dbcheck").bind('click', function() {
//		 var ch=$("#dbcheck").attr('checked');
// 		 if(ch){
// 			$("#dbshow").show();
// 			DanbaoInfo.danbaoGrid();
// 		 }else
// 			 $("#dbshow").hide();
//	 });
//	 //抵押checkbox点击事件
//	 $("#dycheck").bind('click', function() {
//		 var ch=$("#dycheck").attr('checked');
//		 if(ch){
//			 $("#dyshow").show();
//			 DiyaInfo.diyaGrid();
//		 }else
//			 $("#dyshow").hide();
//	 });
});
