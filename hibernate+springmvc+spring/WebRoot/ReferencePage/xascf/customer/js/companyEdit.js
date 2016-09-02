$(document).ready(function(){
	PUI.plugin.init();
	sns.valid.init($("#customerEditForm"));      
	 
});    

var CompanyEdit = function() {      
	
	/* 企业银行*/	
	var _cols = new Array(
			{ title:'逻辑ID', name:'companybankPid', hidden:true, sortable: true, type: 'object'}, 
			{ title: '账户类型', name:'bankType', width: 40, align:'center', sortable: true, type: 'object', 
				renderer: function(val){
					 if(val=='1')
						 val='监管账户';
					 else if(val=='2')
						 val='结算账户'; 
			return val}},
		    { title:'机构类型',name:'bankProperty', hidden:true, width: 150, align: 'center',sortable: true, type: 'object', 
	        	  renderer: function(val){
						 if(val=='1')
							 val='银行账户';
						 else if(val=='2')
							 val='第三方支付'; 
				return val}},
			{ title:'开户行全称', name:'bankName', width:200, align:'center', sortable: true, type: 'object'}, 
			{ title:'账号开户人', name:'bankholder', width:120, align:'center', sortable: true, type: 'object'}, 
		    { title:'账号', name:'bankNo', width:150, align:'center', sortable: true, type: 'object'},
			{ title:'附件', name:'agreementName' ,width:150, align:'left', sortable: true, type: 'object', 
			    	  renderer: function(val,item,rowIndex){
			    		  var html='';
			    		  if(item.agreementUrl!='' && item.agreementUrl!=null && val!='' && val!=null){
			    			  var urlArray=item.agreementUrl.split(',');
				    		  var fileNameArray=val.split(',');
				    		  var length=urlArray.length;
				    		 
				    		 for(var i=0;i<length;i++)
								{
									var thisFileName = fileNameArray[i];
									if(thisFileName!=''){
										html+="<span style='position: absolute;'><a target='_blank' "+
											" href='#' onclick='FileUtil.downLoad(\""+urlArray[i]+"\",\""+thisFileName+"\")'>"+thisFileName+"</a>"+
											" <span style='position: relative;top: 4px;'><a style='cursor:pointer' title='删除'" +
											"class='buttonRomve' onclick='CompanyEdit.removeAgree(\""+rowIndex+"\",\""+i+"\")'>&nbsp;&nbsp;</a></span></span><br> ";
									}
								}
			    		  }
					return  html;
			    	  } 	
			},  
			{ title: '协议路径', name:'agreementUrl', hidden:true, width:150, align:'center', sortable: true, type: 'object'}, 
			{ title: '是否为默认管理账户', name:'isManage', hidden:true, sortable: true, type: 'object'}
			
		);
		
			var bank_mmg =  $("#bank_mmg").mmGrid({ 
				url: 'xascf/customer/companyBankPage.shtml',   
				params: {'condition.customerPid':$("#memberPid").val()},
				width:'auto',
				height: 'auto', 
				cols : _cols,
				method: 'post',
				indexCol: false,
				showBackboard:false,
				indexColWidth: 30,
	            checkCol:true,
	            nowrap : true,
	            multiSelect: true,
	            fullWidthRows:true,
	            autoLoad : true
			});  

		var _rootLists = new Array( 
				'bankNo',
				'bankName', 
				'bankholder',
				'bankType',
				'isManage',
				'bankProperty',
				'agreementName',
				'agreementUrl'
				);
		//司机账号
		var driver_cols = new Array(
				{ title:'逻辑ID', name:'pid', hidden:true, sortable: true, type: 'object'}, 
				{ title: '司机名称', name:'driverName', width: 40, align:'center', sortable: true, type: 'object'},
				{ title:'司机身份证号',name:'driverIdNo',  width: 200, align: 'center',sortable: true, type: 'object'},
				{ title:'账号开户人', name:'bankHolder', width:150, align:'center', sortable: true, type: 'object'}, 
				{ title:'开户行全称', name:'bankName', width:200, align:'center', sortable: true, type: 'object'}, 
				{ title:'账号', name:'bankAccount', width:150, align:'center', sortable: true, type: 'object'}
		);
		
		var driver_bank_mmg =  $("#driver_bank_mmg").mmGrid({ 
			url: 'xascf/customer/companyDriverPage.shtml',   
			params: {'condition.memberPid':$("#memberPid").val()},
			width:'auto',
			height: 'auto', 
			cols : driver_cols,
			method: 'post',
			indexCol: false,
			showBackboard:false,
			indexColWidth: 30,
			checkCol:true,
			nowrap : true,
			multiSelect: true,
			fullWidthRows:true,
			autoLoad : true
		});  
		
		var _driverLists = new Array( 
				'pid',
				'driverName',
				'driverIdNo', 
				'bankHolder',
				'bankName',
				'bankAccount'
		); 
							
	return {       
		/****
		 * 2.5 Toney 新增司机账号
		 * 
		 */
		addDriverbank: function(){ 
			$("#pop_up_driver_content").html(PUI.String.format($("#pop_up_driver_T").html(), {}));
			$("#pop_up_driver").popup({md:true});
			PUI.plugin.init({}, $("#pop_up_driver_content"));
			sns.valid.init($("#editDriverForm"));
			
		},
		//司机银行账号唯一性校验
		bankNoChange:function(type){
			if(type=='BANK'){
				var bankAccount=$("#bankNo").val();
				$.post("xascf/customer/checkBank.shtml", {'condition.bankNo':bankAccount}, function(data){
					if(data.indexOf('OK')<0){
						PUI.MessageBox.info(data);
					}
				},"json");
			}
			else if(type=='ID'){
				var driverId=$("#driverIdNo").val();
				$.post("xascf/customer/checkDriver.shtml", {'condition.driverIdNo':driverId}, function(data){
					if(data.indexOf('OK')<0){
						PUI.MessageBox.info(data);
					}
				},"json");
			}else{
				var bankAccount=$("#bankAccount").val();
				$.post("xascf/customer/checkDriver.shtml", {'condition.bankAccount':bankAccount}, function(data){
					if(data.indexOf('OK')<0){
						PUI.MessageBox.info(data);
					}
				},"json");
			}
		},
		//证件号码唯一性检验
		checkUnio:function(type,val){
			var params=[{'condition.remark':type}];
			if(type=='001'){
				params.push({
					name: 'condition.businesslicenseno',
					value: val
				});	
			}else if(type=='002'){
				params.push({
					name: 'condition.organizationCode',
					value: val
				});
			}
			else if(type=='003'){
				params.push({
					name: 'condition.taxNo',
					value: val
				});
			}
			else if(type=='004'){
				params.push({
					name: 'condition.accountlicenseno',
					value: val
				});
			}
			else if(type=='005'){
				params.push({
					name: 'condition.roadmanagementNo',
					value: val
				});
			}
			params.push({
				name: 'condition.customersubPid',
				value: $("#customersubPid").val()
			});
			params.push({
				name: 'condition.remark',
				value: type
			});
			$.post("xascf/customer/checkNoUnio.shtml", params, function(data){
				if(data.indexOf('OK')<0){
					PUI.MessageBox.info(data);
					if(type=='001'){
						$("#businesslicenseno").val('');
					}else if(type=='002'){
						$("#organizationCode").val('');
					}
					else if(type=='003'){
						$("#taxNo").val('');
					}
					else if(type=='004'){
						$("#accountlicenseno").val('');
					}
					else if(type=='005'){
						$("#roadmanagementNo").val('');
					}
				}
			},"json"); 
		},
		//会员基本信息唯一性检验
		checkInfoUnio:function(type,val){
			var params=[{'condition.remark':type}];
			if(type=='001'){
				params.push({
					name: 'condition.loginName',
					value: val
				});	
			}else if(type=='002'){
				params.push({
					name: 'condition.tel',
					value: val
				});
			}
			else if(type=='003'){
				params.push({
					name: 'condition.emill',
					value: val
				});
			}
			params.push({
				name: 'condition.memberNo',
				value: $("#memberNo").val()
			});
			params.push({
				name: 'condition.remark',
				value: type
			});
			$.post("xascf/customer/checkCustomerInfoUnio.shtml", params, function(data){
				if(data.indexOf('OK')<0){
					PUI.MessageBox.info(data);
					if(type=='001'){
						$("#loginName").val('');
					}else if(type=='002'){
						$("#tel").val('');
					}
					else if(type=='003'){
						$("#emill").val('');
					}
				}
			},"json"); 
		},
		/**
		 * 新增一行表格记录
		 * */
		saveDriverBankRow :function(){ 
			if (!$("#editDriverForm").isValid()) {
				return ;
     		} 
			var _driverLists ={ 
					driverName:$("#driverName").val(),
					driverIdNo:$("#driverIdNo").val(),  
					bankHolder:$("#driverBankholder").val(), 
					bankName:$("#driverBankName").val(),
					bankAccount:$("#driverBankAccount").val()
			};   
			if ($("#pop_up_driver_content input[name=rowIndex]").val() != ""){
				var rowIndex=parseInt($("#pop_up_driver_content input[name=rowIndex]").val());
				driver_bank_mmg.updateRow(_driverLists, rowIndex); 
			}else{
				driver_bank_mmg.addRow(_driverLists,driver_bank_mmg.rowsLength());
			}
			$("#pop_up_driver").popup({display:false}); 
		},
		cancleDriverBank: function(){
			$("#pop_up_driver").popup({display:false});
			
		}, 
		/**
		 * 司机账号编辑
		 * */
		editDriverBankRow: function(){
			if (driver_bank_mmg.selectedRowsIndex().length != 1){
				PUI.MessageBox.alert("请选中一条记录");
				return; 
			}      
			var item = driver_bank_mmg.selectedRows()[0];
			var rowIndex = driver_bank_mmg.selectedRowsIndex();
			var html = PUI.String.format($("#pop_up_driver_T").html(),$.extend(item, {rowIndex: rowIndex}));   
			var content=$("#pop_up_driver_content");
			content.html(html);
			$("#pop_up_driver").popup({md:true});
			PUI.plugin.init({}, $("#pop_up_driver_content"));
			sns.valid.init($("#editForm"));
			
		},
		/**
		 * 从列表中删除一条记录
		 * */
		removeDriverBankRow : function(){
			if (driver_bank_mmg.selectedRowsIndex().length==0){
				PUI.MessageBox.alert("请至少选中一条记录");
				return; 
			}
			PUI.MessageBox.show({
				title:"删除司机银行信息",
				content:"确定删除该条司机银行信息吗?",
				type:"confirm",
				buttons:[{value: "是"} , {value:"否"}],
				success: function(result){ 
					 if (result == "是") {
						while(driver_bank_mmg.selectedRowsIndex().length > 0){
							driver_bank_mmg.removeRow(driver_bank_mmg.selectedRowsIndex()[0]);
						}
					 }
				} 
			})
		},   
		//  2.4 toney end 
		/**
		 * 新增一行表格记录
		 * */
		addBankRow :function(){
			if (!$("#editForm").isValid()) {
				return ;
     		} 
			var val = $("#bankType").val();
			var _rootList ={ 
					bankNo:$("#bankNo").val(),
					bankName:$("#bankName").val(),  
					bankholder:$("#bankholder").val(), 
					bankProperty:$("#bankProperty").val(),
					agreementName:$("#agreementName").val(),
					agreementUrl:$("#agreementUrl").val(),
					bankType:$("#bankType").val(),
					isManage:$("#isManage").val()
			};   
			
			//银行卡校验，暂时去掉校验
//			var bankNo = $("#bankNo").val();
//			var bankProperty = $("#bankProperty").val();
//			if(bankProperty =="1"){
//				if(!luhmCheck(bankNo))
//					return;  
//			}
			if ($("#pop_up_show_content input[name=rowIndex]").val() != ""){
				var rowIndex=parseInt($("#pop_up_show_content input[name=rowIndex]").val());
				bank_mmg.updateRow(_rootList, rowIndex); 
			}else{
				bank_mmg.addRow(_rootList,bank_mmg.rowsLength());
			}
			$("#pop_up_delay").popup({display:false}); 
		},
		
		/**
		 * 会员帐号监管编辑
		 * */
		editbankRow: function(){
			if (bank_mmg.selectedRowsIndex().length != 1){
				PUI.MessageBox.alert("请选中一条记录");
				return; 
			}      
			var item = bank_mmg.selectedRows()[0];
			var rowIndex = bank_mmg.selectedRowsIndex();
			var html = PUI.String.format($("#pop_up_bank").html(),$.extend(item, {rowIndex: rowIndex}));   
			
			var content=$("#pop_up_show_content");
			content.html(html);
			$("#pop_up_delay").popup({md:true});
			$("#bankType").val(item.bankType).trigger("liszt:updated");
			$("#bankProperty").val(item.bankProperty).trigger("liszt:updated"); 
			$("#isManage").val(item.isManage).trigger("liszt:updated");
			
			var bankproperty = item.bankProperty;
			var bankType = item.bankType;
			$("#agreementName").val(item.agreementName).trigger("liszt:updated");  
			$("#agreementUrl").val(item.agreementUrl).trigger("liszt:updated");   
			
			PUI.plugin.init({}, $("#pop_up_show_content"));
			sns.valid.init($("#editForm"));
			
		},
		
		//机构类型下拉框change事件
		typechange: function(){  
			var val = $("#bankProperty").val();
			var bankType = $("#bankType").val();
			if(val=='1'){  	//银行
				$("#jg-div").show();
				$("#kh-div").show();
				$("#lx-div").show(); 
				if(bankType=="2"){
					$("#xy-div").hide(); 
				}else{
					$("#xy-div").show(); 
				}
				$("#bankNo").attr('data-required','账户不能为空！');   
			}
			if(val=='2'){   //第三方
				$("#agreementName").text("");
				$("#agreementUrl").text("");
				$("#agreementName").val("");
				$("#agreementUrl").val("");
				$("#bankType").val("");
				$("#lx-div").hide();
				$("#xy-div").hide();  
				$("#bankNo").attr('data-required','账户不能为空！');    
			} 
		},
		
//		监管账户类型下拉框Change事件
		bankTypeChange: function(){
			var val = $("#bankType").val();
			if(val=="2"){   
				$("#agreementUrl").val("");
				$("#agreementName").val("");
				$("#xy-div").hide();
			}
			if(val=="1"){
				$("#xy-div").show(); 
			}
		},
		
		/**
		 * 从列表中删除一条记录
		 * */
		removeBankRow : function(){
			if (bank_mmg.selectedRowsIndex().length==0){
				PUI.MessageBox.alert("请至少选中一条记录");
				return; 
			}
			PUI.MessageBox.show({
				title:"删除银行信息",
				content:"确定删除该条银行信息吗?",
				type:"confirm",
				buttons:[{value: "是"} , {value:"否"}],
				success: function(result){ 
					 if (result == "是") {
						while(bank_mmg.selectedRowsIndex().length > 0){
							bank_mmg.removeRow(bank_mmg.selectedRowsIndex()[0]);
						}
					 }
				} 
			})
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
		removeAgree:function(rowIndex,i){
			PUI.MessageBox.show({
				title: "删除附件",
				content: "你确定要删除该附件吗？",
				type: "confirm",
				buttons: [{ value: "是" },{ value: "否" }],
				success: function (result) {
					if (result == "是") {
						var item=bank_mmg.row(rowIndex);
						var fileNameArray = item.agreementName.split(",");
						var urlArray = item.agreementUrl.split(",");
						var length=fileNameArray.length;
						var newName='';
						var newUrl='';
						for(var j=0;j<length;j++){
							if(i==j){
								continue;
							}
							newName+=fileNameArray[j]+",";
							newUrl+=urlArray[j]+",";
						}
						item.agreementName=newName;
						item.agreementUrl=newUrl;
						bank_mmg.updateRow(item, rowIndex); 
					}
				}
			})
		},
		/**
		 * 保存企业会员信息
		 * */ 
		save:function(){   
			if (!$("#customerEditForm").isValid()) {
				return ;
     		}   
			
			//新增企业会员信息以及银行信息列表  
			var bankList=null; 
			var params=$("#customerEditForm").serializeArray();   
			//企业银行信息管理
			if(null != bank_mmg.row(0)){
				var len= bank_mmg[0].rows.length;
				for (var i = 0; i < len; i++){
					for (var j = 0; j < _rootLists.length; j++) {
						bankList = _rootLists[j]; 
						params.push({
							name:'customerOrderEntity.bankOrderItemList['+ i +'].'+ bankList,
							value: bank_mmg.row(i)[bankList]
						});
					}
				} 
			}   
			//新增会员司机信银行信息列表  
			var _driverList=null; 
			//企业银行信息管理
			if(null != driver_bank_mmg.row(0)){
				var len= driver_bank_mmg[0].rows.length;
				for (var i = 0; i < len; i++){
					for (var j = 0; j < _driverLists.length; j++) {
						_driverList = _driverLists[j]; 
						params.push({
							name:'customerOrderEntity.driverBankNoList['+ i +'].'+ _driverList,
							value: driver_bank_mmg.row(i)[_driverList]
						});
					}
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
						name: 'customerOrderEntity.materialDefineList[' + i + '].filename',
						value: fileName
					});  
				} else {
					//如果文件名为空而且是必输的则提示
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
						name: 'customerOrderEntity.materialDefineList[' + i + '].fileFalg',
						value: fileFalg
					});   
				}else{
					return;
				} 
				
				var materialPid=$(this).find("input[name='materialPid']").val();
				if(materialPid!=undefined && materialPid!=null){
					params.push({
						name: 'customerOrderEntity.materialDefineList[' + i + '].materialPid',
						value: materialPid
					}); 
				}
				
				
				var effectiveDate=$(this).find("input[name='effectiveTime']").val();
				if(effectiveDate!=undefined && effectiveDate!=null){
					params.push({
						name: 'customerOrderEntity.materialDefineList[' + i + '].effectiveTime',
						value: effectiveDate
					});	
					
					i++;
				} 
				
			  });
			  //如果没有上传必填的文件
			  if(!materialUpload)
				return;
			 
			//新增企业会员、银行信息提交 
			  var rebackType=$("#rebackType").val();
				$.post("xascf/customer/companysave.shtml", params, function(data){
					var res=data.split(',');
					if(res[0].indexOf('成功')>=0){
						//保存按钮激活
						PUI.MessageBox.info(res[0]);
						var orderNo=res[1];
						var memberPid=res[2];
						$("#memberNo").val(orderNo);
						$("#memberPid").val(memberPid);
						CompanyEdit.forward(rebackType);
					}else{
						$("#loginName").focus();
						PUI.MessageBox.info(data);
						
					}
				},"json");  
		},  
		
		toback: function(){
			CompanyEdit.forward($("#rebackType").val()); 
		},
		
		/**
		 * 保存或者发布后调用跳转页面
		 * */
		forward:function(type){ 
			if (type=="1"){ 
				Menu.forward("xascf/customer/jsp/comapanyInfo.jsp");  
			} 
			if(type=="2"){
				Menu.forward("xascf/customer/jsp/comapanyInfoAll.jsp");
			}
			if(type=="3"){
				var comPid = $("#customersubPid").val();	 
				$.post("xascf/customer/comapanyToCheck.shtml",{"customersubPid":comPid}, function(data) {  
					$("#xascfMainPanel").html(data);  
					$("#companyNo").attr('readonly','readonly'); 
				}); 
			}
		},   
		
		addbank: function(){ 
			$("#pop_up_show_content").html(PUI.String.format($("#pop_up_bank").html(), {}));
			$("#pop_up_delay").popup({md:true});
			
			PUI.plugin.init({}, $("#pop_up_show_content"));
			sns.valid.init($("#editForm"));
			
		},
		
		canclebank: function(){
			$("#pop_up_delay").popup({display:false});
			
		}, 
		
		/**
		 * 上传控件出发事件
		*/  
		addUploadPop : function(data){
			pluploadUtil.init("/XA_SCF/xascf/util/plupload.shtml",{type : $("#memberNo").val(), requestName : $("#partnerName").val()},
				{title : "Image files", extensions : "jpg,gif,png"},partnerList.fillUrlAndName);
		},
		
		fillUrlAndName : function(array){ 
			$("#partnerLogo").val(array[0]);
			$("#partnerLogoName").val(array[1]);
		},
		
		/**
		 * 银行账户信息文件上传
		*/
		upLoadMaterials: function(){  
			var parameterArray = new Array();
			parameterArray.push("agreementName");
			parameterArray.push("agreementUrl");
			pluploadUtil.init("/XA_SCF/xascf/util/plupload.shtml",
					{type :yinhangtuoguanxieyi , requestName:$("#memberNo").val(), flag:"", whatFile:"bank"},
					"",CompanyEdit.backBankFileInfo,parameterArray);
		}, 
		backBankFileInfo: function(fileArray,parameter){ 
			var aname=$("#agreementName").val();
			var aurl=$("#agreementUrl").val();
			if(aname==''){
				$("#agreementName").val(fileArray[2]);
			}else{
				$("#agreementName").val(aurl+","+fileArray[2]);
			}
			if(aurl==''){
				$("#agreementUrl").val(fileArray[0]);
			}else{
				$("#agreementUrl").val(aurl+","+fileArray[0]);
			}
			
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
				"",CompanyEdit.backFillFileInfo,parameterArray);
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
					"class='buttonRomve' onclick='CompanyEdit.removeMaterial("+index+",this,"+flagArray[i]+")'>&nbsp;&nbsp;</a></span> "
				);	
			}
		},
		 
		
		/**
		 * 上传文件
		 */
		upLoadChange :function(val){   
			var src=$("#file_"+val).val();  
			var d = new Date();
			var str = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
			$("#url_"+val).val(src);  
			if(!CompanyEdit.validateFile(val)){
				return;
			}  
			if (val=="xy"){
				CompanyEdit.addRuleRow(val);
			} 
			 
			$("#textfielDate_"+val).text(str.valueOf());    
			$("#date_"+val).text(str.valueOf()); 
		},  
		
		
		/**
		 * 上传文件格式校验
		 * */
		validateFile : function(val){ 
			var fileName = $("#url_"+val).val();  
			var fileType = fileName.substring(fileName.lastIndexOf(".")+1); 
			if (fileType != "doc" && fileType != "docx" && fileType != "gif"&& fileType != "jpg" && fileType != "png" && fileType != "bmp"){
				PUI.MessageBox.alert("请上传Word文件或者扫描图片文件!");
				return false;				
			} else { 
				return true;
			}

		}, 

		
		/**
		 * 清空表单
		 * */
		clear : function(){  
			var cuspid = $("#memberPid").val();	 
			if (cuspid.length == 0){ 
				$.post("xascf/customer/companyToAdd.shtml",'',function(data) { 
					$("#xascfMainPanel").html(data);  
					$("#memberNo").attr('readonly','readonly');
				})
			}else{
				$.post("xascf/customer/comapanyToCheck.shtml",{"memberPid": cuspid}, function(data) {  
					$("#xascfMainPanel").html(data);  
					$("#memberNo").attr('readonly','readonly');
				})
			}  
		},
		
		toTrackPage: function(){  
			$.post("xascf/customer/toTrack.shtml",{memberPid: $("#memberPid").val()},function(data){  
			$("#tabwin_add_content_clieTrack").html(PUI.String.format(data, {}));
			$("#tabwin_add_clieTrack").popup({md:true});
			}); 
			
		},
		
		cancel: function(){
			$("#tabwin_add_clieTrack").popup({display:false}); 
		},
		 
		
		/*是否为正整数  */
		isPositiveNum:function (s){
		    var re = /^[1-9]+[0-9]*]*$/;
		    return re.test(s);
		} 
		
		
	};
}(); 