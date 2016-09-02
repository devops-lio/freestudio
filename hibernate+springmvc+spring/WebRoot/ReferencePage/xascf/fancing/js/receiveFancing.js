var ReceiveFancing=function(){
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
		//发票导入
		$('#shipImport').upload({
			title:'发票导入',
			url:'xascf/util/upload.shtml',
			beforeSend:ReceiveFancing.validateExcel,
			success:function(data){
			},
			error:function(data){
				var message=data.message;
				if(message.indexOf('成功')>0){
					PUI.MessageBox.alert("上传成功");
					var url=data.url;
					var fileName=data.fileName;
					item.materialUrl=url;
					item.materialFileName=fileName;
					root_mmg.updateRow(item, rowIndex);
				}else{
					PUI.MessageBox.alert(message);
				}
			}
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
//			if(fancingFunction=='2' || fancingKinds=='2'){
//				$("#buyerInfo").css({display: "block"});
//				
//			}else{
//				$("#buyerInfo").css({display: "none"});
//			}
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
//		var val2=$("#fancingKinds").val();
		if(val=='2' ){
			$("#continueInfo").css({display: "block"});
			$.post("xascf/baseData/getContinueType.shtml",function(data){
				for(var i=0;i<data.length;i++){
					 var val=data[i].nameCn;
					 var date=(new Date()).getTime();
					 var f=false;
					 for(var i=0;i<rootMaterialInfo.length;i++){
						 if(val==rootMaterialInfo[i].materialType){
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
								'onchange="ReceiveFancing.fileUpLoad(\''+date+'\')" contenteditable="false" />	'+
							'</div></td>' +
							'<td style="text-align: center;" id="upLoadedName_'+date+'"></td>' +
							'</tr>';
						$("#continueMaterialTable").append(html);
						rootMaterialInfo.push({materialType:val,materialRoot:'2',materialFileName:'',materialUrl:''});
					 }
				}
			},"json");
		}else{
			$("#continueInfo").css({display: "none"});
		}
		
	});
	//持续性下拉框change事件
	//是否加载了后台
//	$("#fancingKinds").bind("change", function(){
//		var val=$(this).val();
//		var val2=$("#fancingFunction").val();
//		if(val=='2' || val2=='2'){
//			$("#buyerInfo").css({display: "block"});
//			_initBuyerGrid();
//		}else{
//			$("#buyerInfo").css({display: "none"});
//		}
//		//选择持续性融资获取材料类型
//		if(val=='2' ){
//			$("#continueInfo").css({display: "block"});
//			$.post("xascf/baseData/getContinueType.shtml",function(data){
//				for(var i=0;i<data.length;i++){
//					 var val=data[i].nameCn;
//					 var date=(new Date()).getTime();
//					 var f=false;
//					 for(var i=0;i<rootMaterialInfo.length;i++){
//						 if(val==rootMaterialInfo[i].materialType){
//							 f=true;
//						 }
//					 }
//					 if(!f){
//						 var html='<tr>' +
//							'<td style="text-align: center;color: red;width:250px;">'+val+'<input type="hidden" id="type_'+date+'"  value="'+val+'"/></td>' +
//							'<td style="text-align: center;width:350px; ">'+
//							'<div class="controls" style="width:350px;">'+
//							'<input type="text" name="textfield" '+
//							' id="textfielid_'+date+'" style="height:22px; border:1px solid #cdcdcd; width:180px;margin-bottom: 0px;" />'+
//							'<input type="button"  value="浏览..." class="btn" style="background-color:#FFF;margin-left: 5px; border:1px solid #CDCDCD;height:24px; width:64px;"/>'+
//							'<input type="file" name="file" class="file"  id="file_'+date+'" size="28" style="height:28px;width:315px;"'+
//								'onchange="ReceiveFancing.fileUpLoad(\''+date+'\')" contenteditable="false" />	'+
//							'</div></td>' +
//							'<td style="text-align: center;" id="upLoadedName_'+date+'"></td>' +
//							'</tr>';
//						$("#continueMaterialTable").append(html);
//						rootMaterialInfo.push({materialType:val,materialRoot:'2',materialFileName:'',materialUrl:''});
//					 }
//				}
//			},"json");
//		}else{
//			$("#continueInfo").css({display: "none"});
//		}
//		
//	});
	var _initBuyerGrid=function(){
		
		var buyer_cols = new Array(
			    { title:'企业名称', name:'customerName' ,width:150, align:'center', sortable: true, type: 'string'},
			    { title:'企业PID', name:'customersubPid' ,width:150, align:'center', sortable: true, hidden:true}
			);
			if(buyer_mmg!=null){
				return;
			}
			buyer_mmg =  $("#buyer_mmg").mmGrid({
				height: 'auto',
				cols: buyer_cols,
				url : 'xascf/material/getBuyPage.shtml',
	            params : {fancingOrderNo:$("#facingOrderNo").val()},
				method: 'post',
				checkCol: true,
				autoLoad: true,
				fullWidthRows: true,
				indexColWidth: 15, 
				cache: false,
				multiSelect: true,
				nowrap: true
			});
	};
	var _initdbGrid=function(){
		var cols=[
		          {title: "担保人/担保公司",name:"guaranteeName" ,width:300, sortable: true, type:'String', align:'center'},
		          {title: "担保协议",name:"guaranteeProtocolName" ,width:420, sortable: true, type:'string', align:'center',
						 renderer: function(val,item,rowIndex){
							 var url=item.guaranteeProtocolUrl;
					return '<a target="_blank" href="xascf/util/download.shtml?fileName='+val+'&url='+url+'">'+val+'</a>'}},
		          {title: "",name:"guaranteeProtocolUrl" ,width:150, sortable: true, type:'string',hidden:true, align:'center'},
		          {title: "",name:"guaranteeCompanyPid" ,width:150, sortable: true, type:'string',hidden:true, align:'center'},
		          {title: "",name:"guaranteeAddress" ,width:150, sortable: true, type:'string',hidden:true, align:'center'},
		          {title: "",name:"guaranteeCapital" ,width:150, sortable: true, type:'string',hidden:true, align:'center'},
		          {title: "",name:"tel" ,width:150, sortable: true, type:'string',hidden:true, align:'center'},
		          {title: "",name:"guaranteeContacts" ,width:150, sortable: true, type:'string',hidden:true, align:'center'},
		          {title: "",name:"mobile" ,width:150, sortable: true, type:'string',hidden:true, align:'center'},
		          {title: "",name:"email" ,width:150, sortable: true, type:'string',hidden:true, align:'center'},
		          {title: "",name:"guaranteeBusiness" ,width:150, sortable: true, type:'string',hidden:true, align:'center'}
		          ];
		db_mmg=$('#db_mmg').mmGrid({
			width:'auto',
			height: 'auto',
			cols: cols, 
			indexCol: true,
			indexColWidth: 30,
			checkCol:true,
			fullWidthRows:true,
			showBackboard:false,
			multiSelect: true,
			nowrap : true,
			autoLoad : true,
			params : {fancingOrderNo:$("#facingOrderNo").val()},
			url : 'xascf/guarantee/page.shtml'
		});
		db_mmg.on("loadSuccess",function(e, data){
			if(db_mmg.rowsLength()>0)
				$("#dbcheck").attr("checked",true).click().attr("checked",true);
		})

	};
	var _dbItems = new Array(
			'guaranteeName',
			'guaranteeProtocolName',
			'guaranteeCompanyPid',
			'guaranteeProtocolUrl',
			'guaranteeAddress',
			'guaranteeCapital',
			'guaranteeContacts',
			'tel',
			'mobile',
			'email',
			'guaranteeBusiness'
		);
	var _initdyGrid=function(){
		var cols=[
		          {title: "抵押类型",name:"qualificationType" ,width:120, sortable: true, type:'string', align:'center',
		        	  renderer: function(val){
							 if(val=='5')
								 val='房产抵押';
							 else if(val=='6')
								 val='车辆抵押';
							 else if(val=='7')
								 val='土地抵押';
					return val}},
		          {title: "抵押文件编码",name:"qualificationNo" ,width:120, sortable: true, type:'string', align:'center'},
				  {title: "抵押文件名称",name:"qualificationName" ,width:120, sortable: true, type:'string', align:'center'},
				  {title: '',name:"qualificationUrl" ,width:120, sortable: true, type:'string', align:'center',hidden:true},
				  {title: '',name:"qualificationPid" ,width:120, sortable: true, type:'string', align:'center',hidden:true},
				  {title: "已上传文件",name:"qualificationFileName" ,width:150, sortable: true, type:'string', align:'center',
						 renderer: function(val,item,rowIndex){
							 var url=item.qualificationUrl;
					return '<a target="_blank" href="xascf/util/download.shtml?fileName='+val+'&url='+url+'">'+val+'</a>'}}
		          ];
		dy_mmg=$('#dy_mmg').mmGrid({
			width:'auto',
			height: 'auto',
			cols: cols, 
			indexCol: true,
			indexColWidth: 30,
			checkCol:true,
			fullWidthRows:true,
			showBackboard:false,
			nowrap : true,
			multiSelect: true,
			autoLoad : true,
			params : {fancingOrderNo:$("#facingOrderNo").val()},
			url : 'xascf/qualification/page.shtml'
		});
		dy_mmg.on("loadSuccess",function(e, data){
			if(dy_mmg.rowsLength()>0)
				$("#dycheck").attr("checked",true).click().attr("checked",true);
		})

	};
	var _dyItems = new Array(
			'qualificationType',
			'qualificationPid',
			'qualificationNo',
			'qualificationName',
			'qualificationFileName',
			'qualificationUrl'
		);
	return{
		init:_init,
		/**
		 * 计算总价格、总数量
		 */
		countNumPrices:function(){
			var allnum=0;
			var allPrices=0;
			if (null != receipt_mmg.row(0)) {
				for (var i = 0;i < receipt_mmg[0].rows.length; i++) {
					var price=parseFloat(receipt_mmg.row(i).receiptPrice);
					allnum+=1;
					allPrices+=price;
				}
			}
			allPrices=allPrices.toFixed(2);
			$("#pices").empty();
			$("#nums").empty();
			$("#pices").html(allPrices);
			$("#nums").html(allnum);
		},
		
		editRootType :function(){
			$.post("xascf/baseData/toRootMaterailjsp.shtml",function(data){
				$("#tabwin_add_content_root").html(data);
				$("#tabwin_add_root").popup({md:true});
			},"html");
		},
		//新增一行表格记录
		addBuyerRow :function (){
			if (!$("#buyer_form").isValid()) {
				return ;
			}
			var _rootItem = {
					customersubPid:$("#customersubBuyPid").val(),
					customerName:$("#customerBuyName").val()
					
			}
			buyer_mmg.addRow(_rootItem, buyer_mmg.rowsLength());
			$("#tabwin_add_buyer").popup({display:false});
		},
		//收货采购商下拉
		consigneeChange :function(){
			$("#receiptOtherName").val($("#receiptOtherPid").find("option:selected").text());
		},
		/**
		 * 表格删除一行记录
		 */
		removeBuyerItem: function() {
			if (buyer_mmg.selectedRowsIndex().length == 0){
				PUI.MessageBox.alert("请至少选中一条记录");
				return;
			}
			PUI.MessageBox.show({
				title: "删除采购商信息",
				content: "你确定要删除采购商信息 吗？",
				type: "alert",
				buttons: [{ value: "是" },{ value: "否" }],
				success: function (result) {
					if (result == "是") {
						while (buyer_mmg.selectedRowsIndex().length > 0) {
							buyer_mmg.removeRow(buyer_mmg.selectedRowsIndex()[0]);
						}
					}
				}
			});
		},
		
		//基本材料操作
		/**
		 * 上传文件
		 */
		upLoadChange :function(val){
			var src=$("#file_"+val).val();
			if(!ReceiveFancing.validateFile(val)){
				return;
			}
			$("#textfielid_"+val).val(src);
		},
		fileUpLoad :function(val){
			var requestName=$("#customerName").val();
			if(requestName==''){
				PUI.MessageBox.alert('请选择会员！');
				return;
			}
			var src=$("#file_"+val).val();
			if(!ReceiveFancing.validateFile(val)){
				return;
			}
			$("#textfielid_"+val).val(src);
				$.ajaxFileUpload({
					url:'xascf/util/upload.shtml?type=基本材料&requestName='+requestName,
					secureuri : false,
					fileElementId : 'file_'+val,
					dataType : 'text',
					type:'post',
					success: function (data, status)
					{
						var message=data.message;
						if(message.indexOf('成功')>=0){
							 fileName=data.fileName;
							 url=data.url;
							 var typeval=$("#type_"+val).val();
							 var item={
										materialType:typeval,
										materialRoot:'1',
										materialFileName:fileName,
										materialUrl:url
								}
							 var f=false;
							 for(var i=0;i<rootMaterialInfo.length;i++){
								 if(typeval==rootMaterialInfo[i].materialType){
									 f=true;
									 var item2={
												materialType:typeval,
												materialRoot:rootMaterialInfo[i].materialRoot,
												materialFileName:fileName,
												materialUrl:url
										}
									 rootMaterialInfo.splice(i,1,item2);
								 }
							 }
							if(!f)
								rootMaterialInfo.push(item);
							var html='<a target="_blank"  href="xascf/util/download.shtml?fileName='+fileName+'&url='+url+'">'+fileName+'</a>';
							$("#upLoadedName_"+val).empty();
							$("#upLoadedName_"+val).html(html);
							
						}else{
							PUI.MessageBox.alert(message);
						}
					},
					error: function (data, status, e)
					{
						alert(e);
					}
				});
			
		},
		//运单处理
		
		//担保材料处理
		/**
		 * 编辑担保公司
		 */
		editdb :function(){
			if (db_mmg.selectedRowsIndex().length != 1){
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			var item = db_mmg.selectedRows()[0];
			var rowIndex =db_mmg.selectedRowsIndex();
			var html = PUI.String.format($("#template_db").html(),$.extend(item, {rowIndex: rowIndex}));
			var content=$("#tabwin_add_content_db");
			content.html(html);
			$("#tabwin_add_db").popup({md:true});
			PUI.plugin.init({}, $("#tabwin_add_content_db"));
			sns.valid.init($("#tabwin_add_content_db > form"));
		},
		/**
		 * 表格记录
		 */
		removedbItem: function() {
			if (db_mmg.selectedRowsIndex().length == 0){
				PUI.MessageBox.alert("请至少选中一条记录");
				return;
			}
			PUI.MessageBox.show({
				title: "删除担保信息",
				content: "你确定要删除担保信息吗？",
				type: "alert",
				buttons: [{ value: "是" },{ value: "否" }],
				success: function (result) {
					if (result == "是") {
						while (db_mmg.selectedRowsIndex().length > 0) {
							db_mmg.removeRow(db_mmg.selectedRowsIndex()[0]);
						}
					}
				}
			});
		},
		//新增一行表格记录
		adddbRow :function (){
			if (!$("#db_form").isValid()) {
				return ;
			}
			var requestName=$("#customerName").val();
			var db_fileName=$("#db_fileName").val();
			var db_textId=$("#textfielid_db").val();
			var fileName=$("#db_fileName").val();
			var url=$("#db_url").val();
			var fag=true;
			if( db_fileName!=db_textId){
				$.ajaxFileUpload({
					url:'xascf/util/upload.shtml?type=担保协议&requestName='+requestName,
					secureuri : false,
					fileElementId : 'file_db',
					dataType : 'text',
					type:'post',
					success: function (data, status)
					{
						var message=data.message;
						if(message.indexOf('成功')>=0){
							 fileName=data.fileName;
							 url=data.url;
							$("#db_fileName").val(fileName);
							$("#db_url").val(url);
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
			setTimeout(function() {
				if(!fag){
					return;
				}
				var _dbItem = {
						guaranteeName:$("#guaranteeName").val(),
						guaranteeCompanyPid:$("#guaranteeCompanyPid").val(),
						guaranteeProtocolName:fileName,
						guaranteeProtocolUrl:url,
						guaranteeAddress:$("#guaranteeAddress").val(),
						guaranteeCapital:$("#guaranteeCapital").val(),
						guaranteeContacts:$("#guaranteeContacts").val(),
						tel:$("#tel").val(),
						mobile:$("#mobile").val(),
						email:$("#email").val(),
						guaranteeBusiness:$("#guaranteeBusiness").val()
				};
				if ($("#tabwin_add_content_db input[name=rowIndex]").val() != "") {
					var rowIndex=parseInt($("#tabwin_add_content_db input[name=rowIndex]").val());
					db_mmg.updateRow(_dbItem, rowIndex);
				} else {
					db_mmg.addRow(_dbItem, db_mmg.rowsLength());
				}
				$("#tabwin_add_db").popup({display:false});
			}, '800');
		},
		
		//抵押材料处理
		/**
		 * 
		 */
		editdy :function(){
			if (dy_mmg.selectedRowsIndex().length != 1){
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			var item = dy_mmg.selectedRows()[0];
			var rowIndex =dy_mmg.selectedRowsIndex();
			var html = PUI.String.format($("#template_dy").html(),$.extend(item, {rowIndex: rowIndex}));
			var content=$("#tabwin_add_content_dy");
			content.html(html);
			$("#tabwin_add_dy").popup({md:true});
			$("#qualificationType").val(item.qualificationType).trigger("liszt:updated");
			PUI.plugin.init({}, $("#tabwin_add_content_dy"));
			sns.valid.init($("#tabwin_add_content_dy > form"));
		},
		/**
		 * 表格记录
		 */
		removeDyItem: function() {
			if (dy_mmg.selectedRowsIndex().length == 0){
				PUI.MessageBox.alert("请至少选中一条记录");
				return;
			}
			PUI.MessageBox.show({
				title: "删除抵押信息",
				content: "你确定要删除抵押信息吗？",
				type: "alert",
				buttons: [{ value: "是" },{ value: "否" }],
				success: function (result) {
					if (result == "是") {
						while (dy_mmg.selectedRowsIndex().length > 0) {
							dy_mmg.removeRow(dy_mmg.selectedRowsIndex()[0]);
						}
					}
				}
			});
		},
		//新增一行表格记录
		adddyRow :function (){
			if (!$("#dy_form").isValid()) {
				return ;
			}
			var requestName=$("#customerName").val();
			var dy_fileName=$("#dy_fileName").val();
			var dy_textId=$("#textfielid_dy").val();
			var fileName=$("#dy_fileName").val();
			var url=$("#dy_url").val();
			var fag=true;
			if( dy_fileName!=dy_textId){
				$.ajaxFileUpload({
					url:'xascf/util/upload.shtml?type=抵押文件&requestName='+requestName,
					secureuri : false,
					fileElementId : 'file_dy',
					dataType : 'text',
					type:'post',
					success: function (data, status)
					{
						var message=data.message;
						if(message.indexOf('成功')>=0){
							 fileName=data.fileName;
							 url=data.url;
							$("#dy_fileName").val(fileName);
							$("#dy_url").val(url);
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
			setTimeout(function() {
				if(!fag){
					return;
				}
				var _dyItem = {
						qualificationType:$("#qualificationType").val(),
						qualificationPid:$("#qualificationPid").val(),
						qualificationNo:$("#qualificationNo").val(),
						qualificationName:$("#qualificationName").val(),
						qualificationFileName:fileName,
						qualificationUrl:url
				};
				if ($("#tabwin_add_content_dy input[name=rowIndex]").val() != "") {
					var rowIndex=parseInt($("#tabwin_add_content_dy input[name=rowIndex]").val());
					dy_mmg.updateRow(_dyItem, rowIndex);
				} else {
					dy_mmg.addRow(_dyItem, dy_mmg.rowsLength());
				}
				$("#tabwin_add_dy").popup({display:false});
			}, '800');
		},
		add : function(val) {
			if ($("#companyNameCn").val()==''){
				PUI.MessageBox.alert("请选融资企业");
				return ;
			}
			var jHtml = $(PUI.String.format($("#template_"+val).html(), {}));
			if(val=='receipt'){
				if (null!=buyer_mmg && null != buyer_mmg.row(0)){
					var len =buyer_mmg[0].rows.length;
					jHtml.find("#receiptOtherPid").empty();
					 var html="<option value=''></option>";
					for(var i=0;i<len;i++){
						var item=buyer_mmg.row(i);
						var val1=item.customersubPid;
						var val2=item.customerName;
						html+="<option value=\'"+val1+"\'>"+val2+"</option>";
					}
				}
			}
			jHtml.find("#receiptOtherPid").html(html);
			$("#tabwin_add_content_"+val).html(jHtml[0].outerHTML);
			$("#tabwin_add_"+val).popup({md:true});
			PUI.plugin.init({}, $("#tabwin_add_content_"+val));
			sns.valid.init($("#"+val+"_form"));
		},
	
		//取消关闭
		cancle : function(val){
			$("#tabwin_add_"+val).popup({display:false});
		},	
		
		// 上传文件格式校验
		validateFile:function(val){
			var fileName = $("#file_"+val).val();
			var fileType = fileName.substring(fileName.lastIndexOf(".")+1);
			if (fileType != "doc" && fileType != "docx" && fileType != "gif"&& fileType != "jpg" && fileType != "png" && fileType != "bmp"){
				PUI.MessageBox.alert("请上传Word文件或者扫描图片文件!");
				return false;				
			} else {
				return true;
			}

		}, 
		
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
			if(null!=rootMaterialInfo && rootMaterialInfo.length!=0){
				var len =rootMaterialInfo.length;
				for (var i = 0;i < len; i++) {
					params.push({
						name: 'fancingOrderEntity.materialItemList[' + i + '].materialType',
						value: rootMaterialInfo[i].materialType
					});
					params.push({
						name: 'fancingOrderEntity.materialItemList[' + i + '].materialRoot',
						value: rootMaterialInfo[i].materialRoot
					});
					params.push({
						name: 'fancingOrderEntity.materialItemList[' + i + '].materialFileName',
						value: rootMaterialInfo[i].materialFileName
					});
					params.push({
						name: 'fancingOrderEntity.materialItemList[' + i + '].materialUrl',
						value: rootMaterialInfo[i].materialUrl
					});
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
			if (!$("#fancingForm").isValid()) {
				return ;
			}
			//判断采购商不为空
			if(($("#fancingFunction").val()=='2' || $("#fancingKinds").val()=='2')){
				if(buyer_mmg==null ||  null == buyer_mmg.row(0)){
					PUI.MessageBox.alert("采购商列表不能为空!");
					return ;
				}
				
			}
			//判断是否有添加基本材料
			for(var i=0;i<rootMaterialInfo.length;i++){
				if(rootMaterialInfo[i].materialUrl==''){
					PUI.MessageBox.alert(rootMaterialInfo[i].materialType+"不能为空!");
					return ;
				}
			}
			//判断运单选择
			if (null == receipt_mmg.row(0)) {
				PUI.MessageBox.alert("发票列表不能为空!");
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
			var len =rootMaterialInfo.length;
			for (var i = 0;i < len; i++) {
				params.push({
					name: 'fancingOrderEntity.materialItemList[' + i + '].materialType',
					value: rootMaterialInfo[i].materialType
				});
				params.push({
					name: 'fancingOrderEntity.materialItemList[' + i + '].materialRoot',
					value: rootMaterialInfo[i].materialRoot
				});
				params.push({
					name: 'fancingOrderEntity.materialItemList[' + i + '].materialFileName',
					value: rootMaterialInfo[i].materialFileName
				});
				params.push({
					name: 'fancingOrderEntity.materialItemList[' + i + '].materialUrl',
					value: rootMaterialInfo[i].materialUrl
				});
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
			
			
		},
		
		/**重置**/
		reset: function(){
			PUI.util.resetForm($("#DmFancingBillQueryForm"));
		}
	};
}();
 var root_option= function(){
	 return{
	 };
 }();
$(function(){
	ReceiveFancing.init();
	 sns.valid.init($("#fancingForm"));
	 PUI.plugin.init({}, $("#fancingForm"));
	 var orderNo=$("#facingOrderNo").val();
	 if(orderNo!=''){
		 $.post("xascf/material/page.shtml",{fancingOrderNo:orderNo},function(data){
			var lostArry= rootMaterialInfo;
			rootMaterialInfo=new Array();
			rootMaterialInfo=data.data.list;
//			 for(var i=0;i<data.data.list.length;i++){
//				 var item={
//							materialType:data.data.list[i].materialType,
//							materialFileName:data.data.list[i].materialFileName,
//							materialUrl:data.data.list[i].materialUrl
//					}
//				 var typeval=data.data.list[i].materialType;
//				 for(var j=0;j<rootMaterialInfo.length;j++){
//					 if(typeval==rootMaterialInfo[j].materialType){
//						 rootMaterialInfo.splice(j,1,item);
//					 }
//				 }
//				}
//			 for(var i=1;i<lostArry.length;i++){
//				 var date=(new Date()).getTime();
//					var val=lostArry[i].materialType;
//					 var html='<tr>' +
//						'<td style="text-align: center;color: red;">'+val+'<input type="hidden" id="type_'+date+'"  value="'+val+'"/></td>' +
//						'<td style="text-align: center; ">'+
//						'<div class="controls" style="width:350px;">'+
//						'<input type="text" name="textfield" '+
//						' id="textfielid_'+date+'" style="height:22px; border:1px solid #cdcdcd; width:180px;margin-bottom: 0px;" />'+
//						'<input type="button"  value="浏览..." class="btn" style="background-color:#FFF;margin-left: 5px; border:1px solid #CDCDCD;height:24px; width:64px;"/>'+
//						'<input type="file" name="file" class="file"  id="file_'+date+'" size="28" style="height:28px;width:315px;margin-top: 10px"'+
//							'onchange="ReceiveFancing.fileUpLoad(\''+date+'\')" contenteditable="false" />	'+
//						'</div></td>' +
//						'<td style="text-align: center;" id="upLoadedName_'+date+'"></td>' +
//						'</tr>';
//				$("#rootMaterialTable").append(html);
//			 }
			},"json");
	 }
});