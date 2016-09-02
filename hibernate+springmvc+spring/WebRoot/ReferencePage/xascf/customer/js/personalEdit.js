$(document).ready(function(){
	PUI.plugin.init();
	sns.valid.init($("#personalEditForm"));    
});   



var PersonalEdit = function() {   
	
	/* 监管账户*/	
	var _cols = new Array(
			{ title: "逻辑ID", name:'companybankPid', hidden:true, sortable: true, type: 'object'},
		    { title:'监管账户', name:'bankNo', width:150, align:'center', sortable: true, type: 'object'},
		    { title:'监管机构名称', name:'bankName' ,width:150, align:'center', sortable: true, type: 'object'}, 
		    { title:'监管机构类型',name:'bankProperty', width: 150, align: 'center',sortable: true, type: 'object', 
	        	  renderer: function(val){
						 if(val=='1')
							 val='银行账户';
						 else if(val=='2')
							 val='第三方监管'; 
				return val}},
			{ title:'托管协议', name:'agreementName' ,width:150, align:'center', sortable: true, type: 'object', 
			    	  renderer: function(val,item,rowIndex){
							return  '<a target="_blank" href="xascf/util/download.shtml?fileName='+ val + '&url=' + item.agreementUrl +'">'+val+'</a>' 
					    	  } 	 
			},
			{ title: '协议路径', name:'agreementUrl', hidden:true, width:150, align:'center', sortable: true, type: 'object'},
			{ title: '账户类型', name:'bankType', hidden:true, sortable: true, type: 'object'}
			
		);
		
			var bank_mmg =  $("#bank_mmg").mmGrid({ 
				url: 'xascf/customer/companyBankPage.shtml',   
				params: {'condition.customerPid':$("#customerPid").val()},
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
	            autoLoad : true,
			});  
			
			var _rootLists = new Array( 
					'bankNo',
					'bankName',  
					'bankType', 
					'bankProperty',
					'agreementName',
					'agreementUrl'
					);		 
							
	return {   
		
		Qualificationmaterials : function(){ 
			var sfQualificationName = $("#fileName_sf").val();
			var jhQualificationName = $("#fileName_jh").val();		
			var hkQualificationName = $("#fileName_hk").val();		
			var fcQualificationName = $("#fileName_fc").val();			
			var clQualificationName = $("#fileName_cl").val();		
			var grQualificationName = $("#fileName_gr").val(); 

		},
		
		//监管账户下拉框change事件
		typechange: function(){ 
			debugger
			var name="支付宝";
			var val = $("#bankProperty").val(); 
			if(val=='1'){   
				document.getElementById("jg-div").style.display=""; 
				document.getElementById("lx-div").style.display="";  
				document.getElementById("xy-div").style.display="";  
				$("#bankNo").attr('readonly',false);   
				$("#bankNo").attr('data-required','监管账户不能为空！');   
			}
			if(val=='2'){    
				$("#bankNo").text(name);
				document.getElementById("jg-div").style.display="none"; 
				document.getElementById("lx-div").style.display="none";  
				document.getElementById("xy-div").style.display="none";    
				$("#bankNo").attr('readonly','readonly'); 
				$("#bankNo").attr('data-required','');   
			} 
		},
		
		
		/**
		 * 个人监管账户托管协议
		 * */ 
		upLoadMaterials :function(val){
			var src=$("#file_"+val).val();
			var requestCompanyNo = $("#memberNo").val();
			var bankname = $("#bankName").val();

			$("#agreementUrl").val(src); 
			$("#agreementName").val(src);  
//			if(!CompanyEdit.validateFile(val)){
//				return;
//			}  
			var fileName = $("#agreementUrl").val();  
			var fileType = fileName.substring(fileName.lastIndexOf(".")+1); 
			if (fileType != "doc" && fileType != "docx" && fileType != "gif"&& fileType != "jpg" && fileType != "png" && fileType != "bmp"){
				PUI.MessageBox.alert("请上传Word文件或者扫描图片文件!");
				return;				
			}
			
			if (requestCompanyNo != null){
				$.ajaxFileUpload({ 
					url:'xascf/util/Qualificationupload.shtml?type='+bankname+'托管协议&requestCompanyNo='+requestCompanyNo,
					secureuri : false,
					fileElementId : 'file_xy',
					dataType: 'text',
					type:'post',
					success: function (data, status)
					{
						var message=data.message; 
						if(message == '上传成功'){
							 fileName=data.fileName;  
							 url=data.url;  
							 $("#agreementName").text(fileName);  
							 $("#agreementName").val(fileName);  
							 $("#agreementUrl").val(url);  
						}else{
							fag=false;
							PUI.MessageBox.alert(message); 
						}    
					},
					error: function (data, status, e)
					{
						alert(e);
					}
				}); 
			}   
		},
		
		/**
		 * 新增一行表格记录
		 * */
		addBankRow :function(){
			
			var _rootList ={
					bankNo:$("#bankNo").val(),
					bankName:$("#bankName").val(), 
					bankProperty:$("#bankProperty").val(),
					agreementName:$("#agreementName").val(),
					agreementUrl:$("#agreementUrl").val(), 
					bankType:$("#bankType").val()
					
			}; 
//			if (!$('#editForm').isValid()){
//				return;
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
			var _rootList ={
					bank: $("#bank").val(),
					bankName:$("#bankName").val(),
					bankNo:$("#bankNo").val(),
					bankType:$("#bankType").val(),
					bankProperty:$("#bankProperty").val(),
					agreementName:$("#agreementName").val(),  
					agreementUrl:$("#agreementUrl").val()
			}; 
			
			if (bank_mmg.selectedRowsIndex().length==0){
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
			
			var bankproperty = item.bankProperty;
			$("#agreementName").val(item.agreementName).trigger("liszt:updated");  
			$("#agreementUrl").val(item.agreementUrl).trigger("liszt:updated");  
			
			if(bankproperty=="1"){ 
				document.getElementById("jg-div").style.display=""; 
				document.getElementById("lx-div").style.display="";  
				document.getElementById("xy-div").style.display="";  
				$("#bankNo").attr('readonly',false);   
				$("#bankNo").attr('data-required','监管账户不能为空！');   
			}
			if(bankproperty=="2"){ 
				document.getElementById("jg-div").style.display="none"; 
				document.getElementById("lx-div").style.display="none";  
				document.getElementById("xy-div").style.display="none";    
				$("#bankNo").attr('readonly','readonly'); 
				$("#bankNo").attr('data-required','');    
			}
			
			PUI.plugin.init({}, $("#pop_up_show_content"));
			sns.valid.init($("#pop_up_show_content > form"));
			
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
				type:"alert",
				button:[{value: "是"} , {value:"否"}],
				success: function(result){ 
					while(bank_mmg.selectedRowsIndex().length > 0){
						bank_mmg.removeRow(bank_mmg.selectedRowsIndex()[0]);
					}
				} 
			})
		},
		
		
		/**
		 * 保存个人会员信息
		 * */ 
		save:function(){   
			var customerSubPidVal = $("#memberPid").val();			
			if (!$("#personalEditForm").isValid()) {
				return ;
     		}   
			//新增企业会员信息以及银行信息列表 
			if (customerSubPidVal.length == 0) { 
				var bankList=null; 
				var params=$("#personalEditForm").serializeArray();      
				//银行信息管理
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
				
				//新增企业会员、银行信息提交 
					$.post("xascf/customer/customersave.shtml", params, function(data){
						if(data=="保存成功"){ 
							PUI.MessageBox.show({
								title:"保存会员信息",
								content:"会员信息保存成功！",
								type:"alert",
								button:[{value: "是"}],
								success: function(result){ 
									PersonalEdit.forward("1");
								} 
							})   
						}else{ 
							PUI.MessageBox.show({
								title:"错误信息",
								content:"个人会员信息保存失败!",
								type:"alert",
								button:[{value: "是"}],
								success: function(result){
//									PersonalEdit.forward("2");
									} 
							});
						} 
					},"json"); 
			}
			
			// 修改个人会员  
			if (customerSubPidVal.length != 0){ 
				var params=$("#personalEditForm").serializeArray();  
				//银行信息管理
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
				
				$.post("xascf/customer/customersave.shtml", params, function(data){
					if(data=="保存成功"){
						PUI.MessageBox.show({
							title:"保存会员信息",
							content:"会员信息修改成功！",
							type:"alert",
							button:[{value: "是"}],
							success: function(result){ 
								PersonalEdit.forward("1");
							} 
						}) 
					}else{ 
						PUI.MessageBox.show({
							title:"错误信息",
							content:"企业会员信息保存失败!",
							type:"alert",
							button:[{value: "是"}],
							success: function(result){
								PersonalEdit.forward("3");
								} 
						});
					} 
				},"json");  
			} 
			
			 
		},  
		
		/**
		 * 保存或者发布后调用跳转页面
		 * */
		forward:function(type){ 
			if (type=="1"){ 
				Menu.forward("xascf/customer/jsp/personalInfo.jsp");  
			} 
			if(type=="2"){ 
				$.post("xascf/customer/personalToAdd.shtml",'',function(data) { 
					$("#xascfMainPanel").html(data);  
					$("#memberno").attr('readonly','readonly');  
				});
			}
			if(type=="3"){
				var cusPid = $("#customersubPid").val();	 
				$.post("xascf/customer/comapanyToCheck.shtml",{"customersubPid":cusPid}, function(data) {  
					$("#xascfMainPanel").html(data);  
					$("#memberno").attr('readonly','readonly'); 
				}); 
			}
		}, 
		
		addbank: function(){ 
			$("#pop_up_show_content").html(PUI.String.format($("#pop_up_bank").html(), {}));
			$("#pop_up_delay").popup({md:true});

			PUI.plugin.init({}, $("#pop_up_show_content"));
			sns.valid.init($("#pop_up_show_content > form"));
		},
		
		canclebank: function(){
			$("#pop_up_delay").popup({display:false}); 
		},
		
		/**
		 * 上传文件
		 */
		upLoadChange :function(val){    
//			if ( $("#QualificationName_"+val).val().length == 0){
//				alert("材料名称不能为空");
//				return;
//			}   
			debugger
			var src=$("#file_"+val).val();  
			var d = new Date();
			var str = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
			$("#textfielid_"+val).val(src);
			if(!PersonalEdit.validateFile(val)){
				return;
			}  
			if (val=="sf"){
				PersonalEdit.addCardRow(val);
			}  
			if (val=="jh"){
				PersonalEdit.addMarriageRow(val);
			} 
			if (val=="hk"){
				PersonalEdit.addRegisteredRow(val);
			}
			if (val=="fc"){
				PersonalEdit.addEstateRow(val);
			}
			if (val=="cl"){
				PersonalEdit.addVehicleRow(val);
			}
			if (val=="gr"){
				PersonalEdit.addSerialRow(val);
			}
			$("#textfielid_"+val).text(src); 
			$("#textfielDate_"+val).text(str.valueOf());    
			$("#date_"+val).text(str.valueOf());
			PersonalEdit.Qualificationmaterials(); 
		},
		
		/**
		 * 身份证复印件
		 * */
		addCardRow: function(val){ 
			var yy_textId=$("#textfielid_sf").val();
			//企业会员编号
			var requestCompanyNo = $("#memberNo").val();
			var fileName = $("#fileName_sf").val();
			var url = $("#url_sf").val();
			var fag=true;   
			if (requestCompanyNo != null){
				$.ajaxFileUpload({ 
					url:'xascf/util/Qualificationupload.shtml?type=户口本复印件&requestCompanyNo='+requestCompanyNo,
					secureuri : false,
					fileElementId : 'file_sf',
					dataType: 'text',
					type:'post',
					success: function (data, status)
					{
						var message=data.message; 
						if(message == '上传成功'){
							 fileName=data.fileName;  
							 url=data.url;
							 $("#textfielid_sf").text("");
//							 $("#textfielid_sf").text(fileName);   
							 $("#textfielid_sf").append('<a target="_blank" href="xascf/util/download.shtml?fileName='
									 +fileName+'&url='+url+'">'+fileName+'</a>');  
							 $("#fileName_sf").val(fileName);  
							 $("#url_sf").val(url);  
						}else{
							fag=false;
							PUI.MessageBox.alert(message); 
						}    
					},
					error: function (data, status, e)
					{
						alert(e);
					}
				}); 
			} 
		},
		
		/**
		 * 结婚证
		 * */
		addMarriageRow: function(val){ 
			var yy_textId=$("#textfielid_jh").val();
			//企业会员编号
			var requestCompanyNo = $("#memberNo").val();
			var fileName = $("#fileName_jh").val();
			var url = $("#url_jh").val();
			var fag=true;   
			if (requestCompanyNo != null){
				$.ajaxFileUpload({ 
					url:'xascf/util/Qualificationupload.shtml?type=结婚证&requestCompanyNo='+requestCompanyNo,
					secureuri : false,
					fileElementId : 'file_jh',
					dataType: 'text',
					type:'post',
					success: function (data, status)
					{
						var message=data.message; 
						if(message == '上传成功'){
							 fileName=data.fileName;  
							 url=data.url;
							 $("#textfielid_jh").text(""); 
							 $("#textfielid_jh").append('<a target="_blank" href="xascf/util/download.shtml?fileName='
									 +fileName+'&url='+url+'">'+fileName+'</a>'); 
							 $("#url_jh").val(url);
							 $("#fileName_jh").val(fileName);
						}else{
							fag=false;
							PUI.MessageBox.alert(message); 
						}  
					},
					error: function (data, status, e)
					{
						alert(e);
					}
				}); 
			} 
		},
		
		/**
		 * 户口本复印件
		 * */
		addRegisteredRow: function(val){ 
			var yy_textId=$("#textfielid_hk").val();
			//企业会员编号
			var requestCompanyNo = $("#memberNo").val();
			var fileName = $("#fileName_hk").val();
			var url = $("#url_hk").val();
			var fag=true;   
			if (requestCompanyNo != null){
				$.ajaxFileUpload({ 
					url:'xascf/util/Qualificationupload.shtml?type=户口本复印件&requestCompanyNo='+requestCompanyNo,
					secureuri : false,
					fileElementId : 'file_hk',
					dataType: 'text',
					type:'post',
					success: function (data, status)
					{
						var message=data.message; 
						if(message == '上传成功'){
							 fileName=data.fileName;  
							 url=data.url;
							 $("#textfielid_hk").text(""); 
							 $("#textfielid_hk").append('<a target="_blank" href="xascf/util/download.shtml?fileName='
									 +fileName+'&url='+url+'">'+fileName+'</a>'); 
							 $("#fileName_hk").val(fileName);
							 $("#url_hk").val(url);
						}else{
							fag=false;
							PUI.MessageBox.alert(message); 
						}  
					},
					error: function (data, status, e)
					{
						alert(e);
					}
				}); 
			} 
		},
		
		/**
		 * 房产证复印件
		 * */
		addEstateRow: function(val){ 
			var yy_textId=$("#textfielid_fc").val();
			//企业会员编号
			var requestCompanyNo = $("#memberNo").val();
			var fileName = $("#fileName_fc").val();
			var url = $("#url_fc").val();
			var fag=true;   
			if (requestCompanyNo != null){
				$.ajaxFileUpload({ 
					url:'xascf/util/Qualificationupload.shtml?type=房产证复印件&requestCompanyNo='+requestCompanyNo,
					secureuri : false,
					fileElementId : 'file_fc',
					dataType: 'text',
					type:'post',
					success: function (data, status)
					{
						var message=data.message; 
						if(message == '上传成功'){
							 fileName=data.fileName;  
							 url=data.url;
							 $("#textfielid_fc").text("");
							 $("#textfielid_fc").append('<a target="_blank" href="xascf/util/download.shtml?fileName='
									 +fileName+'&url='+url+'">'+fileName+'</a>'); 
							 $("#fileName_fc").val(fileName);
							 $("#url_fc").val(url);
						}else{
							fag=false;
							PUI.MessageBox.alert(message); 
						}  
					},
					error: function (data, status, e)
					{
						alert(e);
					}
				}); 
			} 
		},
		
		/**
		 * 车辆行驶证复印件
		 * */
		addVehicleRow: function(val){ 
			var yy_textId=$("#textfielid_cl").val();
			//企业会员编号
			var requestCompanyNo = $("#memberNo").val();
			var fileName = $("#fileName_cl").val();
			var url = $("#url_cl").val();
			var fag=true;   
			if (requestCompanyNo != null){
				$.ajaxFileUpload({ 
					url:'xascf/util/Qualificationupload.shtml?type=车辆行驶证复印件&requestCompanyNo='+requestCompanyNo,
					secureuri : false,
					fileElementId : 'file_cl',
					dataType: 'text',
					type:'post',
					success: function (data, status)
					{
						var message=data.message; 
						if(message == '上传成功'){
							 fileName=data.fileName;  
							 url=data.url;
							 $("#textfielid_cl").text("");
							 $("#textfielid_cl").append('<a target="_blank" href="xascf/util/download.shtml?fileName='
									 +fileName+'&url='+url+'">'+fileName+'</a>'); 
							 $("#fileName_cl").val(fileName);
							 $("#url_cl").val(url);
						}else{
							fag=false;
							PUI.MessageBox.alert(message); 
						}  
					},
					error: function (data, status, e)
					{
						alert(e);
					}
				}); 
			} 
		},
		
		/**
		 * 个人银行卡流水
		 * */
		addSerialRow: function(val){ 
			var yy_textId=$("#textfielid_gr").val();
			//企业会员编号
			var requestCompanyNo = $("#memberNo").val();
			var fileName = $("#fileName_gr").val();
			var url = $("#url_gr").val();
			var fag=true;   
			if (requestCompanyNo != null){
				$.ajaxFileUpload({ 
					url:'xascf/util/Qualificationupload.shtml?type=个人银行卡流水&requestCompanyNo='+requestCompanyNo,
					secureuri : false,
					fileElementId : 'file_gr',
					dataType: 'text',
					type:'post',
					success: function (data, status)
					{
						var message=data.message; 
						if(message == '上传成功'){
							 fileName=data.fileName;  
							 url=data.url;
							 $("#textfielid_gr").text("");
							 $("#textfielid_gr").append('<a target="_blank" href="xascf/util/download.shtml?fileName='
									 +fileName+'&url='+url+'">'+fileName+'</a>'); 
							 $("#fileName_gr").val(fileName);
							 $("#url_gr").val(url);
						}else{
							fag=false;
							PUI.MessageBox.alert(message); 
						}  
					},
					error: function (data, status, e)
					{
						alert(e);
					}
				}); 
			} 
		},
		
		/**
		 * 上传文件格式校验
		 * */
		validateFile : function(val){ 
			var fileName = $("#textfielid_"+val).val(); 
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
			var customerpid = $("#customersubPid").val();	 
			if (customerpid.length == 0){ 
				$.post("xascf/customer/personalToAdd.shtml",'',function(data) { 
					$("#xascfMainPanel").html(data);  
					$("#memberno").attr('readonly','readonly');
				})
			}else{
				$.post("xascf/customer/comapanyToCheck.shtml",{"customersubPid": customersubPid}, function(data) {  
					$("#xascfMainPanel").html(data);  
					$("#memberno").attr('readonly','readonly');
				})
			}  
		},
		 
		
		/*是否为正整数  */
		isPositiveNum:function (s){
		    var re = /^[1-9]+[0-9]*]*$/;
		    return re.test(s);
		} 
		
		
	};
}(); 