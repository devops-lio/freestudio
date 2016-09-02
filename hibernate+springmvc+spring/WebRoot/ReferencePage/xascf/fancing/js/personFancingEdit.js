var buyer_mmg=null;
var ship_mmg=null;
var receipt_mmg=null;
var db_mmg=null;
var dy_mmg=null;
var dy_mmg=null;
var ladingBill_mmg=null;
var PersonFancingEdit=function(){
	var _init=function(){
		//担保checkbox点击事件
		$("#dbcheck").bind('click', function() {
			var ch=$("#dbcheck").attr('checked');
	  		if(ch){
	  			$("#dbshow").attr('style','margin-top: -10px;width: 90.5%;display:inline');
	  			$("#dbshow").find(".widget-box").attr('style','margin-top: 0px;width: 90.5%;');
	  		}else
	  			$("#dbshow").css('display','none');
		});
		//抵押checkbox点击事件
		$("#dycheck").bind('click', function() {
			var ch=$("#dycheck").attr('checked');
			if(ch){
				$("#dyshow").attr('style','margin-top: -10px;width: 90.5%;display:inline');
				$("#dyshow").find(".widget-box").attr('style','margin-top: 0px;width: 90.5%;');
			}else
				$("#dyshow").css('display','none');
		});
	};
	setTimeout(function() {
			var fancingFunction=$("#fancingFunction").val();
			var fancingBankType=$("#fancingBankType").val();
			var fancingKinds=$("#fancingKinds").val();
			if(fancingBankType=='2'){
				$("#bank_div").css({display: "none"});
			}else
				$("#bank_div").css({display: "block"});
			if(fancingFunction=='2'){
				$("#continueInfo").css({display: "block"});
			}else
				$("#continueInfo").css({display: "none"});
		 }, '100');
	//监管账户下拉框change事件
	$("#fancingBankType").bind("change", function(){
		var val=$(this).val();
		if(val=='2'){
			$("#bank_div").css({display: "none"});
		}else
			$("#bank_div").css({display: "block"});
		var customerPid=$("#customersubPid").val();
		if(customerPid!=''){
			var params =new Array();
			params.push({
				name: 'condition.bankType',
				value: val
			});
			params.push({
				name: 'condition.customerPid',
				value: customerPid
			});
			$.post("xascf/customer/getSubBank.shtml",params,function(data){
				$("#fancingBankNo").val(data);
			},"json");
		}
	});
	//买断式下拉框change事件
	$("#fancingFunction").bind("change", function(){
		var val=$(this).val();
		if(val=='2'){
			$("#continueInfo").css({display: "block"});
			$.post("xascf/baseData/getContinueType.shtml",function(data){
				for(var i=0;i<data.length;i++){
					 var val=data[i].nameCn;
					 var date=(new Date()).getTime();
					 var f=false;
					 for(var i=0;i<personRootMaterialInfo.length;i++){
						 if(val==personRootMaterialInfo[i].materialType){
							 f=true;
						 }
					 }
					 if(!f){
						 var html='<tr>' +
							'<td style="text-align: center;color: red;width:250px;">'+val+'<input type="hidden" id="type_'+date+'"  value="'+val+'"/></td>' +
							'<td style="text-align: center;width:350px; ">'+
							'<div class="controls" style="width:350px;">'+
							'<input type="text" name="textfield" '+
							' id="textfielid_'+date+'" style="height:22px; border:1px solid #cdcdcd; width:180px;margin-bottom: 0px;" />'+
							'<input type="button"  value="浏览..." class="btn" style="background-color:#FFF;margin-left: 5px; border:1px solid #CDCDCD;height:24px; width:64px;"/>'+
							'<input type="file" name="file" class="file"  id="file_'+date+'" size="28" style="height:28px;width:315px;"'+
								'onchange="PersonRootMaterialInfo.fileUpLoad(\''+date+'\')" contenteditable="false" />	'+
							'</div></td>' +
							'<td style="text-align: center;" id="upLoadedName_'+date+'"></td>' +
							'</tr>';
						$("#continueMaterialTable").append(html);
						personRootMaterialInfo.push({materialType:val,materialRoot:'2',materialFileName:'',materialUrl:''});
					 }
				}
			},"json");
		}else{
			$("#continueInfo").css({display: "none"});
		}
		
	});
	return{
		init:_init,
		/***
		 * 保存融资交易单
		 */
		save : function(){
			if (!$("#fancingForm").isValid()) {
				return ;
			}
			var params = $("#fancingForm").serializeArray();
			//添加采购商信息列表
			var buyItem= null;
			var _buyItems =new Array(
					'customersubPid',
					'customerName'
			);
			if (null!=buyer_mmg && null != buyer_mmg.row(0)){
				var len =buyer_mmg[0].rows.length
				for (var i = 0;i < len; i++) {
					for (var j = 0; j < _buyItems.length; j++) {
						buyItem  = _buyItems[j];
						params.push({
							name: 'fancingOrderEntity.buyerInfoList[' + i + '].' + buyItem,
							value: buyer_mmg.row(i)[buyItem]
						});
					}
				}
			}
			//添加基本材料信息列表
			if(null!=personRootMaterialInfo && personRootMaterialInfo.length!=0){
				var len =personRootMaterialInfo.length;
				for (var i = 0;i < len; i++) {
					params.push({
						name: 'fancingOrderEntity.materialItemList[' + i + '].materialType',
						value: personRootMaterialInfo[i].materialType
					});
					params.push({
						name: 'fancingOrderEntity.materialItemList[' + i + '].materialRoot',
						value: personRootMaterialInfo[i].materialRoot
					});
					params.push({
						name: 'fancingOrderEntity.materialItemList[' + i + '].materialFileName',
						value: personRootMaterialInfo[i].materialFileName
					});
					params.push({
						name: 'fancingOrderEntity.materialItemList[' + i + '].materialUrl',
						value: personRootMaterialInfo[i].materialUrl
					});
				}
			}
			//添加运单列表
			var shipItem= null;
			if (null!=ship_mmg && null != ship_mmg.row(0) && null!=_shipItems){
				var len =ship_mmg[0].rows.length
				for (var i = 0;i < len; i++) {
					for (var j = 0; j < _shipItems.length; j++) {
						shipItem  = _shipItems[j];
						params.push({
							name: 'fancingOrderEntity.shipOrderItemList[' + i + '].' + shipItem,
							value: ship_mmg.row(i)[shipItem]
						});
					}
				}
			}
			//添加发票列表
			var receiptItem= null;
			if (null!=receipt_mmg && null != receipt_mmg.row(0)){
				var len =receipt_mmg[0].rows.length
				for (var i = 0;i < len; i++) {
					for (var j = 0; j < _receiptItems.length; j++) {
						receiptItem  = _receiptItems[j];
						params.push({
							name: 'fancingOrderEntity.receiptItemList[' + i + '].' + receiptItem,
							value: receipt_mmg.row(i)[receiptItem]
						});
					}
				}
			}
			//添加担保列表
			var dbItem= null;
			if (null!=db_mmg && null != db_mmg.row(0)){
				var len =db_mmg[0].rows.length
				for (var i = 0;i < len; i++) {
					for (var j = 0; j < _dbItems.length; j++) {
						dbItem  = _dbItems[j];
						params.push({
							name: 'fancingOrderEntity.guaranteeMappItemList[' + i + '].' + dbItem,
							value: db_mmg.row(i)[dbItem]
						});
					}
				}
			}
			//添加抵押列表
			var dyItem= null;
			if (null!=dy_mmg && null != dy_mmg.row(0)){
				var len =dy_mmg[0].rows.length
				for (var i = 0;i < len; i++) {
					for (var j = 0; j < _dyItems.length; j++) {
						dyItem  = _dyItems[j];
						params.push({
							name: 'fancingOrderEntity.qualificationItemList[' + i + '].' + dyItem,
							value: dy_mmg.row(i)[dyItem]
						});
					}
				}
			}
			
			$.post("xascf/fancing/save.shtml",params,function(data){
				var res=data.split(',');
				if(res[0].indexOf('成功')>=0){
					//保存按钮激活
					PUI.MessageBox.info(res[0]);
					var orderNo=res[1];
					var fancingPid=res[2];
					$("#facingOrderNo").val(orderNo);
					$("#fancingOrderPid").val(fancingPid);
				}else{
					PUI.MessageBox.info(data);
				}
			},"json");
			
			
		},
		/***
		 * 提交融资交易单
		 */
		comfirFancingOrder : function(){
			debugger
			if (!$("#fancingForm").isValid()) {
				return ;
			}
			var fancingType=$("#fancingType").val();
			//判断是否有添加基本材料
			for(var i=0;i<personRootMaterialInfo.length;i++){
				if(personRootMaterialInfo[i].materialUrl==''){
					PUI.MessageBox.alert(personRootMaterialInfo[i].materialType+"不能为空!");
					return ;
				}
			}
			//所有融资类型必须添加采购商
			if(buyer_mmg==null ||  null == buyer_mmg.row(0)){
				PUI.MessageBox.alert("采购商列表不能为空!");
				return ;
			}
			
			//运单融资
			if(fancingType=='1'){
				if (null==ship_mmg || null == ship_mmg.row(0)) {
					PUI.MessageBox.alert("运单列表不能为空!");
					return ;
				}
			}else if(fancingType=='2'){
				//应收账款融资
				if(receipt_mmg==null ||  null == receipt_mmg.row(0)){
					PUI.MessageBox.alert("发票列表不能为空!");
					return ;
				}
			}else if(fancingType=='3'){
				//抵押融资
				if(dy_mmg==null ||  null == dy_mmg.row(0)){
					PUI.MessageBox.alert("抵押材料列表不能为空!");
					return ;
				}
				if ((receipt_mmg==null ||  null == receipt_mmg.row(0))&&(null==ship_mmg || null == ship_mmg.row(0))) {
					PUI.MessageBox.alert("发票或者运单至少选择一项!");
					return ;
				}
			}else if(fancingType=='4'){
				//提单融资
				if(ladingBill_mmg==null ||  null == ladingBill_mmg.row(0)){
					PUI.MessageBox.alert("提单材料列表不能为空!");
					return ;
				}
				if ((receipt_mmg==null ||  null == receipt_mmg.row(0))&&(null==ship_mmg || null == ship_mmg.row(0))) {
					PUI.MessageBox.alert("发票或者运单至少选择一项!");
					return ;
				}
			}
			var params = $("#fancingForm").serializeArray();
			//添加采购商信息列表
			var buyItem= null;
			var _buyItems =new Array(
					'customersubPid',
					'customerName'
			);
			if (null!=buyer_mmg && null != buyer_mmg.row(0)){
				var len =buyer_mmg[0].rows.length
				for (var i = 0;i < len; i++) {
					for (var j = 0; j < _buyItems.length; j++) {
						buyItem  = _buyItems[j];
						params.push({
							name: 'fancingOrderEntity.buyerInfoList[' + i + '].' + buyItem,
							value: buyer_mmg.row(i)[buyItem]
						});
					}
				}
			}
			//添加基本材料信息列表
			var len =personRootMaterialInfo.length;
			for (var i = 0;i < len; i++) {
				params.push({
					name: 'fancingOrderEntity.materialItemList[' + i + '].materialType',
					value: personRootMaterialInfo[i].materialType
				});
				params.push({
					name: 'fancingOrderEntity.materialItemList[' + i + '].materialRoot',
					value: personRootMaterialInfo[i].materialRoot
				});
				params.push({
					name: 'fancingOrderEntity.materialItemList[' + i + '].materialFileName',
					value: personRootMaterialInfo[i].materialFileName
				});
				params.push({
					name: 'fancingOrderEntity.materialItemList[' + i + '].materialUrl',
					value: personRootMaterialInfo[i].materialUrl
				});
			}
			//添加运单列表
			var shipItem= null;
			if (null!=ship_mmg && null != ship_mmg.row(0) && null!=_shipItems){
				var len =ship_mmg[0].rows.length
				for (var i = 0;i < len; i++) {
					for (var j = 0; j < _shipItems.length; j++) {
						shipItem  = _shipItems[j];
						params.push({
							name: 'fancingOrderEntity.shipOrderItemList[' + i + '].' + shipItem,
							value: ship_mmg.row(i)[shipItem]
						});
					}
				}
			}
			//添加发票列表
			var receiptItem= null;
			if (null!=receipt_mmg && null != receipt_mmg.row(0)){
				var len =receipt_mmg[0].rows.length
				for (var i = 0;i < len; i++) {
					for (var j = 0; j < _receiptItems.length; j++) {
						receiptItem  = _receiptItems[j];
						params.push({
							name: 'fancingOrderEntity.receiptItemList[' + i + '].' + receiptItem,
							value: receipt_mmg.row(i)[receiptItem]
						});
					}
				}
			}
			//添加担保列表
			var dbItem= null;
			if (null!=db_mmg && null != db_mmg.row(0)){
				var len =db_mmg[0].rows.length
				for (var i = 0;i < len; i++) {
					for (var j = 0; j < _dbItems.length; j++) {
						dbItem  = _dbItems[j];
						params.push({
							name: 'fancingOrderEntity.guaranteeMappItemList[' + i + '].' + dbItem,
							value: db_mmg.row(i)[dbItem]
						});
					}
				}
			}
			//添加抵押列表
			var dyItem= null;
			if (null!=dy_mmg && null != dy_mmg.row(0)){
				var len =dy_mmg[0].rows.length
				for (var i = 0;i < len; i++) {
					for (var j = 0; j < _dyItems.length; j++) {
						dyItem  = _dyItems[j];
						params.push({
							name: 'fancingOrderEntity.qualificationItemList[' + i + '].' + dyItem,
							value: dy_mmg.row(i)[dyItem]
						});
					}
				}
			}
			$.post("xascf/fancing/toConfir.shtml",params,function(data){
				var res=data.split(',');
				if(res[0].indexOf('成功')>=0){
					PUI.MessageBox.info(res[0]);
					var facingOrderNo = $("#facingOrderNo").val();
					if(facingOrderNo!=null && facingOrderNo!=""){
						Menu.forward("xascf/fancing/jsp/fancingList.jsp");  
					} else {		
						var orderNo=res[1];
						$("#facingOrderNo").val(orderNo);
					}
				}else{
					PUI.MessageBox.info(data);
				}
			},"json");
		}
	};
}();
$(function(){
	PersonFancingEdit.init();
	 sns.valid.init($("#fancingForm"));
	 PUI.plugin.init({}, $("#fancingForm"));
	 var orderNo=$("#facingOrderNo").val();
	 if(orderNo!=''){
		 $.post("xascf/material/page.shtml",{fancingOrderNo:orderNo},function(data){
			personRootMaterialInfo=new Array();
			personRootMaterialInfo=data.data.list;
			},"json");
	 }
});