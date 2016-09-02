 var rootMaterialInfo=[
		 {materialType:'公司章程(含修正案)',materialRoot:'1',materialFileName:'',materialUrl:''},
		 {materialType:'贷款卡信息(卡号)',materialRoot:'1',materialFileName:'',materialUrl:''},
		 {materialType:'近两年的审计报告',materialRoot:'1',materialFileName:'',materialUrl:''},
		 {materialType:'近两年的收入明细',materialRoot:'1',materialFileName:'',materialUrl:''},
		 {materialType:'上季度财务报表',materialRoot:'1',materialFileName:'',materialUrl:''},
		 {materialType:'物流保险保单',materialRoot:'1',materialFileName:'',materialUrl:''},
		 {materialType:'法人代表身份证',materialRoot:'1',materialFileName:'',materialUrl:''},
		 {materialType:'实际控制人身份证',materialRoot:'1',materialFileName:'',materialUrl:''},
		 {materialType:'验资报告(实缴金额凭证)',materialRoot:'1',materialFileName:'',materialUrl:''}
 ];
var LadingBillFancing=function(){
	var receipt_mmg=null;
	var ladingBill_mmg=null;
	var buyer_mmg=null;
	var ship_mmg=null;
	var db_mmg=null;
	var dy_mmg=null;
	var _init=function(){
		_initReceiptGrid();
		_initLadingBillGrid();
		_initShipGrid();
	  	_initdbGrid();
		_initdyGrid();
		//采购商checkbox点击事件
		$("#buyercheck").bind('click', function() {
			var ch=$("#buyercheck").attr('checked');
	  		if(ch){
	  			$("#buyershow").attr('style','margin-top: -10px;width: 90.5%;display:inline');
	  			$("#buyershow").find(".widget-box").attr('style','margin-top: 0px;width: 90.5%;');
	  			_initBuyerGrid();
	  		}else
	  			$("#buyershow").css('display','none');
		});
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
		//运单导入
		$('#shipImport').upload({
			title:'发票导入',
			url:'xascf/util/upload.shtml',
			beforeSend:LadingBillFancing.validateExcel,
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
	var _initShipGrid=function(){
		var cols=[
		          {title: "运单号",name:"shipNo" ,width:120, sortable: true, type:'string', align:'center'},
		          {title: "",name:"shipOrderPid" ,width:120, sortable: true, type:'string', align:'center',hidden:true},
		          {title: "委托人",name:"shipClient" ,width:120, sortable: true, type:'string', align:'center'},
		          {title: "车牌号码",name:"shipCarNo" ,width:80, sortable: true, type:'string', align:'center'},
		          {title: "出发地",name:"shipFrom" ,width:80, sortable: true, type:'string', align:'center'},
		          {title: "目的地",name:"shipTo" ,width:80, sortable: true, type:'string', align:'center'},
		          {title: "运单金额(元)",name:"shipPrice" ,width:120, sortable: true, type:'string', align:'center'},
		          {title: "货物名称",name:"shipName" ,width:120, sortable: true, type:'string', align:'center'},
		          {title: "货物数量",name:"shipNum" ,width:120, sortable: true, type:'string', align:'center'},
		          {title: "状态",name:"shipStatus" ,width:60, sortable: true, type:'string', align:'center',
		        	  renderer: function(val){
							 if(val=='1')
								 val='已签收';
							 else if(val=='2')
								 val='运输中';
					return val}}
		          ];
		ship_mmg=$('#ship_mmg').mmGrid({
			width:'auto',
			height: 160,
			cols: cols, 
			indexCol: true,
			indexColWidth: 30,
			checkCol:true,
			fullWidthRows:true,
			multiSelect: true,
			nowrap : true,
			autoLoad : true,
			params : {fancingOrderNo:$("#facingOrderNo").val()},
			url : 'xascf/shipOrder/page.shtml'
		});
		ship_mmg.on("loadSuccess",function(e, data){
			LadingBillFancing.countShipNumPrices();
		})
	};
	var _shipItems = new Array(
			'shipNo',
			'shipOrderPid',
			'shipClient',
			'shipCarNo',
			'shipFrom',
			'shipTo',
			'shipPrice',
			'shipName',
			'shipNum',
			'shipStatus'
		);
	var _initReceiptGrid=function(){
		var cols=[
		          {title: "发票代码",name:"receiptNo" ,width:120, sortable: true, type:'string', align:'center'},
		          {title: "",name:"receiptPid" ,width:120, sortable: true, type:'string', align:'center',hidden:true},
		          {title: "发票类型",name:"receiptType" ,width:120, sortable: true, type:'string', align:'center',
		        	  renderer: function(val,item,rowIndex){
							 if(val=='1')
								 val='普通发票';
							 else if(val=='2')
								 val='增值税发票';
							 else
								 val='其他发票';
					return val}},
		          {title: "发票抬头",name:"receiptOtherName" ,width:80, sortable: true, type:'string', align:'center'},
		          {title: "货物名称",name:"goodsName" ,width:80, sortable: true, type:'string', align:'center'},
		          {title: "货物规格型号",name:"goodsSpec" ,width:80, sortable: true, type:'string', align:'center'},
		          {title: "数量",name:"goodsNum" ,width:120, sortable: true, type:'string', align:'center'},
		          {title: "单位",name:"goodsUnit" ,width:120, sortable: true, type:'string', align:'center'},
		          {title: "发票金额",name:"receiptPrice" ,width:120, sortable: true, type:'string', align:'center'},
		          {title: "发票税率",name:"taxRate" ,width:120, sortable: true, type:'string', align:'center'},
		          {title: "发票税额",name:"taxPrice" ,width:120, sortable: true, type:'string', align:'center'},
		          {title: "填开时间",name:"receiptFromDate" ,width:120, sortable: true, type:'string', align:'center'},
		          {title: "",name:"receiptFileUrl" ,width:150, sortable: true, type:'string',hidden:true, align:'center'},
		          {title: "附件",name:"receiptFileName" ,width:120, sortable: true, type:'string', align:'center',
		        	  renderer: function(val,item,rowIndex){
							 var url=item.receiptFileUrl;
					return '<a target="_blank" href="xascf/util/download.shtml?fileName='+val+'&url='+url+'">'+val+'</a>'}}
		          ];
		receipt_mmg=$('#receipt_mmg').mmGrid({
			width:'auto',
			height: 160,
			cols: cols, 
			indexCol: true,
			indexColWidth: 30,
			checkCol:true,
			fullWidthRows:true,
			multiSelect: true,
			nowrap : true,
			autoLoad : true,
			params : {fancingOrderNo:$("#facingOrderNo").val()},
			url : 'xascf/receipt/page.shtml'
		});
		receipt_mmg.on("loadSuccess",function(e, data){
			LadingBillFancing.countNumPrices();
		})
	};
	var _receiptItems = new Array(
			'receiptNo',
			'receiptPid',
			'receiptType',
			'receiptOtherName',
			'goodsName',
			'goodsSpec',
			'goodsNum',
			'goodsUnit',
			'receiptPrice',
			'taxRate',
			'taxPrice',
			'receiptFromDate',
			'receiptFileUrl',
			'receiptFileName'
		);
	var _initLadingBillGrid=function(){
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
		 * 计算发票总价格、总数量
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
		/**
		 * 计算提单总价格、总数量
		 */
		
		/**
		 * 计算运单总价格、总数量
		 */
		countShipNumPrices:function(){
			var allnum=0;
			var allPrices=0;
			if (null != ship_mmg.row(0)) {
				for (var i = 0;i < ship_mmg[0].rows.length; i++) {
					var price=parseFloat(ship_mmg.row(i).shipPrice);
					allnum+=1;
					allPrices+=price;
				}
			}
			allPrices=allPrices.toFixed(2);
			$("#shippices").empty();
			$("#shipnums").empty();
			$("#shippices").html(allPrices);
			$("#shipnums").html(allnum);
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
			if(!LadingBillFancing.validateFile(val)){
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
			if(!LadingBillFancing.validateFile(val)){
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
		/**
		 * 编辑运单信息
		 */
		editShip :function(){
			if (ship_mmg.selectedRowsIndex().length != 1){
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			var item = ship_mmg.selectedRows()[0];
			var rowIndex =ship_mmg.selectedRowsIndex();
			var html = PUI.String.format($("#template_ship").html(),$.extend(item, {rowIndex: rowIndex}));
			var content=$("#tabwin_add_content_ship");
			content.html(html);
			$("#tabwin_add_ship").popup({md:true});
			PUI.plugin.init({}, $("#tabwin_add_content_ship"));
			sns.valid.init($("#tabwin_add_content_ship > form"));
		},
		/**
		 * 表格删除一行记录
		 */
		removeShipItem: function() {
			if (ship_mmg.selectedRowsIndex().length == 0){
				PUI.MessageBox.alert("请至少选中一条记录");
				return;
			}
			PUI.MessageBox.show({
				title: "删除运单信息",
				content: "你确定要删除运单信息吗？",
				type: "alert",
				buttons: [{ value: "是" },{ value: "否" }],
				success: function (result) {
					if (result == "是") {
						while (ship_mmg.selectedRowsIndex().length > 0) {
							ship_mmg.removeRow(ship_mmg.selectedRowsIndex()[0]);
						}
						LadingBillFancing.countNumPrices();
					}
				}
			});
		},
		//新增一行表格记录
		addShipRow :function (){
			var _shipItem = {
					shipOrderPid:$("#shipOrderPid").val(),
					shipNo:$("#shipNo").val(),
					shipClient:$("#shipClient").val(),
					shipCarNo:$("#shipCarNo").val(),
					shipFrom:$("#shipFrom").val(),
					shipTo:$("#shipTo").val(),
					shipPrice:$("#shipPrice").val(),
					shipName:$("#shipName").val(),
					shipNum:$("#shipNum").val(),
					shipStatus:$("#shipStatus").val()
			};
			if (!$("#ship_form").isValid()) {
				return ;
			}
			if ($("#tabwin_add_content_ship input[name=rowIndex]").val() != "") {
				var rowIndex=parseInt($("#tabwin_add_content_ship input[name=rowIndex]").val());
				ship_mmg.updateRow(_shipItem, rowIndex);
			} else {
				ship_mmg.addRow(_shipItem, ship_mmg.rowsLength());
			}
			$("#tabwin_add_ship").popup({display:false});
			LadingBillFancing.countShipNumPrices();
		},
		//提单处理
		
		/**
		 * 编辑发票信息
		 */
		editReceipt:function(){
			if (receipt_mmg.selectedRowsIndex().length != 1){
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			var item = receipt_mmg.selectedRows()[0];
			var rowIndex =receipt_mmg.selectedRowsIndex();
			var html = PUI.String.format($("#template_receipt").html(),$.extend(item, {rowIndex: rowIndex}));
			var content=$("#tabwin_add_content_receipt");
			content.html(html);
			$("#tabwin_add_receipt").popup({md:true});
			PUI.plugin.init({}, $("#tabwin_add_content_receipt"));
			sns.valid.init($("#tabwin_add_content_receipt > form"));
		},
		/**
		 * 表格删除一行记录
		 */
		removeReceiptItem: function() {
			if (receipt_mmg.selectedRowsIndex().length == 0){
				PUI.MessageBox.alert("请至少选中一条记录");
				return;
			}
			PUI.MessageBox.show({
				title: "删除发票信息",
				content: "你确定要删除发票信息吗？",
				type: "alert",
				buttons: [{ value: "是" },{ value: "否" }],
				success: function (result) {
					if (result == "是") {
						while (receipt_mmg.selectedRowsIndex().length > 0) {
							receipt_mmg.removeRow(receipt_mmg.selectedRowsIndex()[0]);
						}
						LadingBillFancing.countNumPrices();
					}
				}
			});
		},
		//新增一行表格记录
		addReceiptRow:function (){
			if (!$("#receipt_form").isValid()) {
				return ;
			}
			var requestName=$("#customerName").val();
			var receipt_fileName=$("#receipt_fileName").val();
			var receipt_textId=$("#textfielid_receipt").val();
			var fileName=$("#receipt_fileName").val();
			var url=$("#receipt_url").val();
			var fag=true;
			if( receipt_fileName!=receipt_textId){
				$.ajaxFileUpload({
					url:'xascf/util/upload.shtml?type=发票清单&requestName='+requestName,
					secureuri : false,
					fileElementId : 'file_receipt',
					dataType : 'text',
					type:'post',
					success: function (data, status)
					{
						var message=data.message;
						if(message.indexOf('成功')>=0){
							 fileName=data.fileName;
							 url=data.url;
							$("#receipt_fileName").val(fileName);
							$("#receipt_url").val(url);
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
				var _receiptItem = {
					receiptNo:$("#receiptNo").val(),
					receiptPid:$("#receiptPid").val(),
					receiptType:$("#receiptType").val(),
					receiptOtherName:$("#receiptOtherName").val(),
					goodsName:$("#goodsName").val(),
					goodsSpec:$("#goodsSpec").val(),
					goodsNum:$("#goodsNum").val(),
					goodsUnit:$("#goodsUnit").val(),
					receiptPrice:$("#receiptPrice").val(),
					taxRate:$("#taxRate").val(),
					taxPrice:$("#taxPrice").val(),
					receiptFromDate:$("#receiptFromDate").val(),
					receiptFileUrl:url,
					receiptFileName:fileName
				};
				if ($("#tabwin_add_content_receipt input[name=rowIndex]").val() != "") {
					var rowIndex=parseInt($("#tabwin_add_content_receipt input[name=rowIndex]").val());
					receipt_mmg.updateRow(_receiptItem, rowIndex);
				} else {
					receipt_mmg.addRow(_receiptItem, receipt_mmg.rowsLength());
				}
				LadingBillFancing.countNumPrices();
				$("#tabwin_add_receipt").popup({display:false});
			}, '800');
		},
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
			$("#tabwin_add_content_"+val).html(PUI.String.format($("#template_"+val).html(), {}));
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
			//添加提单列表
			var ladingBillItem= null;
			if (null!=ladingBill_mmg && null != ladingBill_mmg.row(0)){
				var len =ladingBill_mmg[0].rows.length
				for (var i = 0;i < len; i++) {
					for (var j = 0; j < _ladingBillItems.length; j++) {
						ladingBillItem  = _ladingBillItems[j];
						params.push({
							name: 'fancingOrderEntity.ladingBillList[' + i + '].' + ladingBillItem,
							value: ladingBill_mmg.row(i)[ladingBillItem]
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
			//添加运单列表
			var shipItem= null;
			if (null != ship_mmg.row(0)){
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
			//判断是否有添加基本材料
			for(var i=0;i<rootMaterialInfo.length;i++){
				if(rootMaterialInfo[i].materialUrl==''){
					PUI.MessageBox.alert(rootMaterialInfo[i].materialType+"不能为空!");
					return ;
				}
			}
			//判断提单不为空
			if(ladingBillItem==null ||  null == ladingBillItem.row(0)){
				PUI.MessageBox.alert("提单列表不能为空!");
				return ;
			}
			//判断运单和发票必有一项
			if (null == receipt_mmg.row(0) && null==receipt_mmg.row(0)) {
				PUI.MessageBox.alert("运单或者发票必填一项!");
				return ;
			}
			var params = $("#fancingForm").serializeArray();
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
			//添加提单列表
			var ladingBillItem= null;
			if (null!=ladingBill_mmg && null != ladingBill_mmg.row(0)){
				var len =ladingBill_mmg[0].rows.length
				for (var i = 0;i < len; i++) {
					for (var j = 0; j < _ladingBillItems.length; j++) {
						ladingBillItem  = _ladingBillItems[j];
						params.push({
							name: 'fancingOrderEntity.ladingBillList[' + i + '].' + ladingBillItem,
							value: ladingBill_mmg.row(i)[ladingBillItem]
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
			//添加运单列表
			var shipItem= null;
			if (null != receipt_mmg.row(0)){
				var len =receipt_mmg[0].rows.length
				for (var i = 0;i < len; i++) {
					for (var j = 0; j < _receiptItems.length; j++) {
						shipItem  = _receiptItems[j];
						params.push({
							name: 'fancingOrderEntity.shipOrderItemList[' + i + '].' + shipItem,
							value: receipt_mmg.row(i)[shipItem]
						});
					}
				}
			}
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
	LadingBillFancing.init();
	 sns.valid.init($("#fancingForm"));
	 PUI.plugin.init({}, $("#fancingForm"));
	 var orderNo=$("#facingOrderNo").val();
	 if(orderNo!=''){
		 $.post("xascf/material/page.shtml",{fancingOrderNo:orderNo},function(data){
			var lostArry= rootMaterialInfo;
			rootMaterialInfo=new Array();
			rootMaterialInfo=data.data.list;
			},"json");
	 }
});