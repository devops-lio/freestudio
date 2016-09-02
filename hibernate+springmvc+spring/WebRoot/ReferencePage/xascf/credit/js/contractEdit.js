$(document).ready(function(){
 	PUI.plugin.init();
	sns.valid.init($("form"));
	var isBond=$("#isBond").val();
	if(isBond=='Y'){
		$('#bondDiv').show();
	}else{
		$('#bondDiv').hide();
	}
	var rebackTypeVal=$("#rebackType").val();
	if(rebackTypeVal=='1'){
		$("#showDiv").hide();
	}
});


var buyer_cols = new Array(
		{ title:'企业PID', name:'buyPid' ,width:150, align:'center', sortable: true, hidden:true},
	    { title:'委托方名称', name:'buyName' ,width:250, align:'left', sortable: true, type: 'string',
			renderer: function(val,item,rowIndex){
    		return	'<a href="#" onclick="customerDetailPop.buyerDetail(\''+item.buyPid+'\');">'+val+'</a>';
			  
    	}},
    	{ title:'账期', name:'billCycle' ,width:60,lockWidth:true, align:'center', sortable: true, type: 'string',
	    	renderer: function(val){
				return val +'天';}},
				
    	{ title:'业务占比', name:'businessPercent' ,width:60,lockWidth:true, align:'center', sortable: true, type: 'string',
			renderer: function(val){
				return val +'%';}},
	    
	    { title:'授信额度', name:'creditPercent' ,width:120,lockWidth:true, align:'center', sortable: true, type:'string',
	    	renderer: function(val,item,rowIndex){
	    		if(val==null){
	    			return '';
	    		}else
    		return	formatMoney(val)+'元';
    	}},
	    { title:'折扣率', name:'disCount' ,width:60, align:'center',lockWidth:true, sortable: true,type: 'string',
	    	renderer: function(val){
			return val+'%';}},
	    { title:'票据类型', name:'billType' ,width:70, align:'center',lockWidth:true, sortable: true, type: 'string',
	    	renderer: function(val){
				 if(val=='1')
					 val='发票';
				 else if(val=='2')
					 val='对账单';
				 else if(val=='3')
					 val='回单';
			return val;}},
	    { title:'是否预付', name:'isPrePay' ,width:70, align:'center',lockWidth:true, sortable: true, type: 'string',
	    	renderer: function(val){
				 if(val=='1')
					 val='否';
				 else if(val=='2')
					 val='是';
			return val;}},
			{ title:'预付票据类型', name:'preBillType' ,width:100, align:'center',lockWidth:true, sortable: true, type: 'string',
		    	renderer: function(val){
					 if(val=='1')
						 val='订单';
					 else if(val=='2')
						 val='运单';
				return val;}},
			{ title:'附加材料', name:'' ,width:100, align:'center',lockWidth:true, sortable: true, type: 'string',
					renderer: function(val,item,rowIndex){
					return '<a href="#" onclick="ContractEdit.buyerMaterial(\''+item.buyPid+'\');">详情</a>';}}
	);
buyer_mmg =  $("#buyer_mmg").mmGrid({
	height: 'auto',
	cols: buyer_cols,
	url : 'xascf/creditbuyRel/page.shtml?isEffective=1&buyPids='+$("#buyPids").val(),
    params : {creditNo:$("#creditNo").val()},
	method: 'post',
	checkCol: true,
	autoLoad: true,
	fullWidthRows: true,
	indexColWidth: 15, 
	cache: false,
	showBackboard :false,
	multiSelect: true,
	nowrap: true
});
var _buyerItems = new Array(
			'buyPid',
			'billCycle',
			'businessPercent',
			'buyName',
			'billType',
			'disCount',
			'creditPercent',
			'isPrePay',
			'preBillType'
		);
buyer_mmg.on("loadSuccess",function(e, data){
	var contractBuyPids=$("#contractBuyPids").val().split(",");
	for ( var i = 0; i < data.data.list.length; i++){
		var item=data.data.list[i];
		for(var j=0;j<contractBuyPids.length;j++){
			if(item.buyPid==contractBuyPids[j])
				buyer_mmg.select(i);
		}
	}
	
});
//buyer_mmg.on("loadSuccess",function(e, data){
//	if(typeof $("#contractBuyPids").val()!="undefined"){
//		var contractBuyPids=$("#contractBuyPids").val().split(",");
//		
//		for ( var i = 0; i < buyer_mmg[0].rows.length; i++){
//			debugger
//			var item=buyer_mmg.row(i);
//			for(var j=0;j<contractBuyPids.length;j++){
//				if(item.buyPid==contractBuyPids[j])
//					return true; 
//			}
//		}
////			buyer_mmg.select(function(item, index){
////				for(var i=0;i<contractBuyPids.length;i++){
////					debugger
////					if(item.buyPid==contractBuyPids[i])
////						return true; 
////				}
////			});
//		}
//});


buyer_mmg.on("rowSelected", function(item, rowIndex) {
	var allPrice=0.0;
	var data=buyer_mmg.selectedRows();
	for(var i=0;i<data.length;i++){
		var creditPercent=parseFloat(data[i]['creditPercent'])/100;
		allPrice+=parseFloat(data[i]['creditPercent']);
	}
	allPrice=parseInt(allPrice);
	$("#contractAmount").val(allPrice);
	$("#contractAmountHidden").val(allPrice);
	
});

buyer_mmg.on("rowDeselected", function(item, rowIndex) {
	var allPrice=0.0;
	var data=buyer_mmg.selectedRows();
	for(var i=0;i<data.length;i++){
		var creditPercent=parseFloat(data[i]['creditPercent'])/100;
		allPrice+=parseFloat(data[i]['creditPercent']);
	}
	allPrice=parseInt(allPrice);
	$("#contractAmount").val(allPrice);
	$("#contractAmountHidden").val(allPrice);
	
});

$(".mmGrid").find('.mmg-head').find('th .checkAll').on('click', function () {
	var allPrice=0.0;
	var data=buyer_mmg.selectedRows();
	for(var i=0;i<data.length;i++){
		var creditPercent=parseFloat(data[i]['creditPercent'])/100;
		allPrice+=parseFloat(data[i]['creditPercent']);
	}
	allPrice=parseInt(allPrice);
	$("#contractAmount").val(allPrice);
	$("#contractAmountHidden").val(allPrice);
});


var ContractEdit=function(){
	return{
		/**
		 * 委托方附加材料弹出
		 * @returns
		 */
		buyerMaterial :function(buyPid){
			var contractPid=$("#fancingContractModelPid").val();
			$.post("xascf/credit/contractbuyRel/buyMaterialPop.shtml",{"contractBuyPid":buyPid,'contractPid':contractPid}, function(data) {  
				$("#tabwin_buyMaterail_content").html(data);
				$("#tabwin_buyMaterail").popup({md:true});
			});
		},
		rebackList :function(){
			var rebackType=$("#rebackType").val();
			if(rebackType=='1'){
				Menu.forward("xascf/credit/jsp/contractAll.jsp");  
			}else
				Menu.forward("xascf/credit/jsp/contractQuery.jsp");  
		},
		//授信编号选择监听
		creditNoChange:function(){
			var creditResultNo=$("#creditResultNo").val();
			var contractNo=$("#contractNo").val();
			$.post("xascf/credit/fancingContract/creditNoChange.shtml",{"creditResultNo":creditResultNo,"contractNo":contractNo,"rebackType":"1"}, function(data) {  
				$("#xascfMainPanel").html(data);  
			}); 
		},
		//保存为草稿
		save:function(type){
			if (buyer_mmg.selectedRowsIndex().length < 1){
				PUI.MessageBox.alert("请至少选中一个委托方！");
				return;
			}
			var systemAmount=parseInt($("#contractAmountHidden").val());
			var amount=parseInt($("#contractAmount").val());
			if(amount>systemAmount){
				PUI.MessageBox.alert("合同金额不能大于"+systemAmount);
				return;
			}
//			var bondSystem=parseFloat($("#bondSystem").val());
//			var bondRate=parseFloat($("#bondRate").val());
//			if(bondRate<bondSystem){
//				PUI.MessageBox.alert("保证金不能低于"+bondSystem);
//				return;
//			}
//			var serveSystem=parseFloat($("#serveSystem").val());
//			var serveRate=parseFloat($("#serveRate").val());
//			if(serveRate<serveSystem){
//				PUI.MessageBox.alert("服务费不能低于"+serveSystem);
//				return;
//			}
			if(!$("#contractForm").isValid()){
				return;
			}
			//添加表单
			var params = $("#contractForm").serializeArray();
			var _buyerItem= null;
			if (null!=buyer_mmg && null != buyer_mmg.row(0) && _buyerItems!=null){
				var data=buyer_mmg.selectedRows();
				var len=data.length;
				for (var i = 0;i < len; i++) {
					for (var j = 0; j < _buyerItems.length; j++) {
						_buyerItem  = _buyerItems[j];
						params.push({
							name: 'fancingContractEntity.contractbuyRelModelList[' + i + '].' + _buyerItem,
							value: data[i][_buyerItem]
						});
					}
				}
				var i=0;
				var materialUpload = true;
				$("#material").find("tr").each(function(j){ 
					if(j==0){
						return;
					}     
					var fileName=$(this).find("input[name='filename']").val();
					if(fileName!=undefined && fileName!=null && fileName!=""){
						params.push({
							name: 'fancingContractEntity.contractMaterialList[' + i + '].fileName',
							value: fileName
						});  
					} else {
//						//如果文件名为空而且是必输的则提示
						var typeName = $(this).find("td[id*='typeName']").text().trim();
						if(typeName.indexOf("*")>-1)
						{		
							PUI.MessageBox.alert("材料 "+typeName.replace("*","")+" 不能为空");
							materialUpload = false;
							return false;
						}
					}
					
					var fileFalg=$(this).find("input[name='fileFalg']").val();
					if(fileFalg!=undefined && fileFalg!=null && fileFalg.length>0){
						params.push({
							name: 'fancingContractEntity.contractMaterialList[' + i + '].fileFalg',
							value: fileFalg
						});   
					}else{
						return;
					} 
					
					var materialPid=$(this).find("input[name='materialPid']").val();
					if(materialPid!=undefined && materialPid!=null){
						params.push({
							name: 'fancingContractEntity.contractMaterialList[' + i + '].materialPid',
							value: materialPid
						}); 
					}
					i++;
				  });
				  //如果没有上传必填的文件
				  if(!materialUpload)
					return;
				 
				if(type=='1'){
					$.post("xascf/credit/fancingContract/save.shtml?saveType=SAVEASNEW",params,function(data){
						var res=data.split(',');
						PUI.MessageBox.info(res[0]);
						if(res[0].indexOf("成功")>0){
							$("#fancingContractModelPid").val(res[1]);
							ContractEdit.rebackList();  
						}
					},"json");
				}else{
					PUI.MessageBox.show({
					    title: "提示",
					    content: "确定要提交合同信息?一旦提交信息将无法修改!",
					    type: "alert",
					    buttons: [{ value: "是" },{ value: "否" }],
					    success: function (result) {
					        if (result == "是") {
					        	$.post("xascf/credit/fancingContract/save.shtml?saveType=SAVEASCONFIR",params,function(data){
					        		var res=data.split(',');
					        		PUI.MessageBox.info(res[0]);
									if(res[0].indexOf("成功")>0){
										ContractEdit.rebackList(); 
									}
								},"json");
					        }
					    }
				    });
				}
			}else{
				PUI.MessageBox.alert("没有有效委托方委托方！");
			}
		},
		changeCheck :function(){
			var isBond=$("#isBond").val();
			if(isBond=='Y'){
				$('#bondDiv').show();
			}else{
				$('#bondDiv').hide();
			}
		},
		removeMaterial:function(index,thisA,flag){
		 	PUI.MessageBox.show({
			    title: "删除附件",
			    content: "你确定要删除该附件吗？",
			    type: "confirm",
			    buttons: [{ value: "是" },{ value: "否" }],
			    success: function (result) {
			        if (result == "是") {
			        	$(thisA).parent().hide();
			        	var fileName = $(thisA).prev().html();
			        	var $preFileName = $("#filename_"+index);
			        	var $preFlag = $("#flag_"+index);
			        	var preFileName = $preFileName.val();
			        	var preFlag = $preFlag.val();
			        	if(preFileName.indexOf(",")<0){//如果没有逗号，证明只有一个附件
			        		$preFileName.val(preFileName.replace(fileName,"")); 
							$preFlag.val(preFlag.replace(flag,"")); 
			        	} else{
			        		if(preFileName.indexOf(fileName) == 0)
				        	{   		
								$preFileName.val(preFileName.replace(fileName+",","")); 
								$preFlag.val(preFlag.replace(flag+",","")); 
				        	} else {
				        		$preFileName.val(preFileName.replace(","+fileName,"")); 
								$preFlag.val(preFlag.replace(","+flag,"")); 
				        	}
			        	}
		        	}
		    	}
			})
		},
		/**
		 * 企业材料文件上传事件
		*/
		uploadFile:function(fileType,index){   
			var parameterArray = new Array();
			var date=new Date();
			parameterArray.push(index);
			parameterArray.push("filename_"+index);
			parameterArray.push("flag_"+index);
			parameterArray.push("fileDiv_"+index);
			
			pluploadUtil.init("/XA_SCF/xascf/util/plupload.shtml",
				{type :fileType , requestName:$("#memberNo").val(), whatFile:"customer",
				materialDefinePid:$("#materialDefinePid_"+index).val()},
				"",ContractEdit.backFillFileInfo,parameterArray);
		},
		backFillFileInfo: function(fileArray,parameter){ 
			var index = parameter[0];
			var fileName = fileArray[2];
			var flag = fileArray[3];
			var $preFileName = $("#"+parameter[1]);
			var $preFlag = $("#"+parameter[2]);
			//填充隐藏的文件名和标示
			var preFileName = $preFileName.val();
			var preFlag = $preFlag.val();
			if(preFileName =="")
			{
				$preFileName.val(fileName);
				$preFlag.val(flag);
			} else {	
				$preFileName.val(preFileName+","+fileName);
				$preFlag.val(preFlag+","+flag);
			}
			//生成页面上下载删除功能的div
			var fileNameArray = fileName.split(",");
			var urlArray = fileArray[0].split(",");
			var flagArray = flag.split(",");
			var length = fileNameArray.length;
			for(var i=0;i<length;i++)
			{
				var thisFileName = fileNameArray[i];
				$("#"+parameter[3]).append("<span><a target='_blank' id='href_"+index+"' name='urlname_"+index+
					"' href='#' onclick='FileUtil.downLoad(\""+urlArray[i]+"\",\""+thisFileName+"\")'>"+thisFileName+"</a>"+
					" <a style='cursor:pointer' title='删除' id='remove_"+index+"' " +
					"class='buttonRomve' onclick='ContractEdit.removeMaterial("+index+",this,"+flagArray[i]+")'>&nbsp;&nbsp;</a></span> "
				);	
			}
		},
		 
		//
		checkAmount:function(){
			var systemAmount=parseInt($("#contractAmountHidden").val());
			var amount=parseInt($("#contractAmount").val());
			if(amount>systemAmount){
				PUI.MessageBox.alert("合同金额不能大于"+systemAmount);
			}
		}
	};
}();