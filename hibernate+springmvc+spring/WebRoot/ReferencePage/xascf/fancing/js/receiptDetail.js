 $(document).ready(function(){
 	PUI.plugin.init();
	sns.valid.init($("form"));
});
var _cols=[
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
	{title: "",name:"receiptOtherPid" ,width:80, sortable: true, type:'string', align:'center',hidden:true},
	{title: "货物名称",name:"goodsName" ,width:80, sortable: true, type:'string', align:'center'},
	{title: "货物规格型号",name:"goodsSpec" ,width:80, sortable: true, type:'string', align:'center'},
	{title: "数量",name:"goodsNum" ,width:120, sortable: true, type:'string', align:'center'},
	{title: "单位",name:"goodsUnit" ,width:120, sortable: true, type:'string', align:'center'},
	{title: "发票金额",name:"receiptPrice" ,width:120, sortable: true, type:'string', align:'center'},
	{title: "发票税率",name:"taxRate" ,width:120, sortable: true, type:'string', align:'center'},
	{title: "发票税额",name:"taxPrice" ,width:120, sortable: true, type:'string', align:'center'},
	{title: "填开时间",name:"receiptFromDate" ,width:120, sortable: true, type:'string', align:'center'},
	{title: "备注",name:"remark" ,width:120, sortable: true, type:'string', align:'center'},
	{title: "附件",name:"receiptFileName" ,width:120, sortable: true, type:'string', align:'center',
		renderer: function(val,item,rowIndex){
				var url=item.receiptFileUrl;
		return '<a target="_blank" href="xascf/util/download.shtml?fileName='+val+'&url='+url+'">'+val+'</a>'}}	
	];
var _landingcols=[
	{title: "提单号",name:"ladingBillNo" ,width:120, sortable: true, type:'string', align:'center'},
	{title: "",name:"ladingBillPid" ,width:120, sortable: true, type:'string', align:'center',hidden:true},
	{title: "提单类型",name:"ladingBillType" ,width:120, sortable: true, type:'string', align:'center',
		        	  renderer: function(val,item,rowIndex){
							 if(val=='1')
								 val='海运提单';
							 else
								 val='空运提单';
					return val}},
	{title: "发货人",name:"ladingBillClient" ,width:120, sortable: true, type:'string', align:'center'},
	{title: "货物起运地",name:"ladingBillFrom" ,width:80, sortable: true, type:'string', align:'center'},
	{title: "货物目的地",name:"ladingBillTo" ,width:80, sortable: true, type:'string', align:'center'},
	{title: "航次",name:"ladingBillCarNo" ,width:80, sortable: true, type:'string', align:'center'},
	{title: "货物名称",name:"ladingBillGoodsname" ,width:80, sortable: true, type:'string', align:'center'},
	{title: "数量",name:"ladingBillNum" ,width:120, sortable: true, type:'string', align:'center'},
	{title: "运费",name:"ladingBillPrice" ,width:120, sortable: true, type:'string', align:'center'},
	{title: "承运时间",name:"ladingBillDate" ,width:120, sortable: true, type:'string', align:'center'},
	{title: "备注",name:"remark" ,width:120, sortable: true, type:'string', align:'center'},
	{title: "",name:"ladingBillFileurl" ,width:150, sortable: true, type:'string',hidden:true, align:'center'},
	{title: "附件",name:"ladingBillFilename" ,width:120, sortable: true, type:'string', align:'center',
		        	  renderer: function(val,item,rowIndex){
							 var url=item.ladingBillFileurl;
					return '<a target="_blank" href="xascf/util/download.shtml?fileName='+val+'&url='+url+'">'+val+'</a>'}}
	];
var _shipcols=[
	{title: "运单号",name:"shipNo" ,width:120, sortable: true, type:'string', align:'center'},
	{title: "",name:"shipOrderPid" ,width:120, sortable: true, type:'string', align:'center',hidden:true},
	{title: "委托人",name:"shipClient" ,width:120, sortable: true, type:'string', align:'center'},
	{title: "收货人",name:"shipConsigneeName" ,width:120, sortable: true, type:'string', align:'center'},
	{title: "",name:"shipConsigneePid" ,width:120, sortable: true,hidden:true, type:'string', align:'center'},
	{title: "车牌号码",name:"shipCarNo" ,width:80, sortable: true, type:'string', align:'center'},
	{title: "出发地",name:"shipFrom" ,width:80, sortable: true, type:'string', align:'center'},
	{title: "目的地",name:"shipTo" ,width:80, sortable: true, type:'string', align:'center'},
	{title: "运单金额(元)",name:"shipPrice" ,width:120, sortable: true, type:'string', align:'center'},
	{title: "货物名称",name:"shipName" ,width:120, sortable: true, type:'string', align:'center'},
	{title: "货物数量",name:"shipNum" ,width:120, sortable: true, type:'string', align:'center'},
	{title: "备注",name:"remark" ,width:120, sortable: true, type:'string', align:'center'},
	{title: "状态",name:"shipStatus" ,width:60, sortable: true, type:'string', align:'center',
		renderer: function(val){
					if(val=='1')
						val='已签收';
					else if(val=='2')
						val='运输中';
					return val}
	}
];
var dbcols=[
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
var buyer_cols = [
	{ title:'企业名称', name:'customerName' ,width:150, align:'center', sortable: true, type: 'string'},
	{ title:'折扣率', name:'buyerRate' ,width:150, align:'center', sortable: true, type: 'string'},
	{ title:'企业PID', name:'customersubPid' ,width:150, align:'center', sortable: true, hidden:true}
];
var dycols=[
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
buyer_mmg =  $("#buyer_mmg").mmGrid({
	width:'auto',
	height: 120,
	cols: buyer_cols,
	url : 'xascf/material/getBuyPage.shtml',
	params : {fancingOrderNo:$("#fancingOrderNo").val()},
	method: 'post',
	checkCol: false,
	autoLoad: true,
	fullWidthRows: true,
	indexColWidth: 15, 
	cache: false,
	multiSelect: true,
	nowrap: true
});
db_mmg=$('#db_mmg').mmGrid({
	width:'auto',
	height: 160,
	cols: dbcols, 
	indexCol: true,
	indexColWidth: 30,
	checkCol:true,
	fullWidthRows:true,
	showBackboard:false,
	multiSelect: true,
	nowrap : true,
	autoLoad : true,
	params : {fancingOrderNo:$("#fancingOrderNo").val()},
	url : 'xascf/guarantee/page.shtml'
});
dy_mmg=$('#dy_mmg').mmGrid({
	width:'auto',
	height: 160,
	cols: dycols, 
	indexCol: true,
	indexColWidth: 30,
	checkCol:true,
	fullWidthRows:true,
	showBackboard:false,
	nowrap : true,
	multiSelect: true,
	autoLoad : true,
	params : {fancingOrderNo:$("#fancingOrderNo").val()},
	url : 'xascf/qualification/page.shtml'
});

ship_mmg=$('#ship_mmg').mmGrid({
	width:'auto',
	height: 160,
	cols: _shipcols, 
	indexCol: true,
	indexColWidth: 30,
	checkCol:true,
	fullWidthRows:true,
	multiSelect: true,
	nowrap : true,
	autoLoad : true,
	params : {fancingOrderNo:$("#fancingOrderNo").val()},
	url : 'xascf/shipOrder/page.shtml'
});
ship_mmg.on("loadSuccess",function(e, data){
	ReceiptDetail.countShipNumPrices();
})	
ladingBill_mmg=$('#ladingBill_mmg').mmGrid({
	width:'auto',
	height: 160,
	cols: _landingcols, 
	indexCol: true,
	indexColWidth: 30,
	checkCol:true,
	fullWidthRows:true,
	multiSelect: true,
	nowrap : true,
	autoLoad : true,
	params : {fancingOrderNo:$("#fancingOrderNo").val()},
	url : 'xascf/ladingBill/page.shtml'
	});
ladingBill_mmg.on("loadSuccess",function(e, data){
	ReceiptDetail.countLadingBillNumPrices();
})
var receipt_mmg =  $("#all_mmg").mmGrid({
	height: 160,
	cols : _cols,
	url : 'xascf/receipt/page.shtml',
	method : 'post',
	checkCol : true,
	autoLoad : true,
	indexCol : true,
	indexColWidth : 15,
	sortName : 'id',
	sortStatus : 'desc',
	fullWidthRows : true,
	cache : false,
	multiSelect: true,
	params : {fancingOrderNo:$("#fancingOrderNo").val()}
});
receipt_mmg.on("loadSuccess",function(e, data){
	ReceiptDetail.countNumPrices();
})
var ReceiptDetail = function(){
	var _receiptItems = new Array(
			'receiptNo',
			'receiptPid',
			'receiptType',
			'receiptOtherName',
			'receiptOtherPid',
			'goodsName',
			'goodsSpec',
			'goodsNum',
			'goodsUnit',
			'receiptPrice',
			'taxRate',
			'taxPrice',
			'receiptFromDate',
			'receiptFileName',
			'remark'
		);
	var _ladingBillItems = new Array(
			'ladingBillNo',
			'ladingBillPid',
			'ladingBillType',
			'ladingBillClient',
			'ladingBillFrom',
			'ladingBillTo',
			'ladingBillCarNo',
			'ladingBillGoodsname',
			'ladingBillNum',
			'ladingBillPrice',
			'ladingBillDate',
			'ladingBillFileurl',
			'ladingBillFilename',
			'remark'
		);
	var _shipItems = new Array(
			'shipNo',
			'shipOrderPid',
			'shipClient',
			'shipConsigneePid',
			'shipConsigneeName',
			'shipCarNo',
			'shipFrom',
			'shipTo',
			'shipPrice',
			'shipName',
			'shipNum',
			'shipStatus',
			'remark'
		);
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
	var _dyItems = new Array(
			'qualificationType',
			'qualificationPid',
			'qualificationNo',
			'qualificationName',
			'qualificationFileName',
			'qualificationUrl'
		);
	function getBuyer(targetId,type,selectedId){
		var htmlStr ="";
		if (null!=buyer_mmg && null != buyer_mmg.row(0)){
			var len =buyer_mmg[0].rows.length;
			$("#"+targetId).empty();
			htmlStr="<option value=''></option>";
			for(var i=0;i<len;i++){
				var item=buyer_mmg.row(i);
				var val1=item.customersubPid;
				var val2=item.customerName;
				var selected = "";
				if(selectedId!=undefined && val1==selectedId)
				{
					selected = "selected='selected'";
				}
				htmlStr+="<option value=\'"+val1+"\' " + selected + ">"+val2+"</option>";
			}
		}
		$("#"+targetId).html(htmlStr);
	}
	return{
		add:function(type){
			$("#tabwin_add_content_"+type).html(PUI.String.format($("#template_"+type).html(), {}));
			if(type=="receipt"||type=="ship")
			{
				var targetId = "receiptOtherPid";
				if(type=="ship")
					targetId ="shipConsigneePid";
				getBuyer(targetId,type);
			}
			$("#tabwin_add_"+type).popup({md:true});
			PUI.plugin.init({}, $("#tabwin_add_content_"+type));
			sns.valid.init($("#"+type+"_form"));
		},
		addReceiptRow :function (){
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
						receiptOtherPid:$("#receiptOtherPid").val(),
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
						receiptFileName:fileName,
						remark:$("#remark").val()
				};
				if (!$("#receipt_form").isValid()) {
					return ;
				}
				if ($("#tabwin_add_content_receipt input[name=rowIndex]").val() != "") {
					var rowIndex=parseInt($("#tabwin_add_content_receipt input[name=rowIndex]").val());
					receipt_mmg.updateRow(_receiptItem, rowIndex);
				} else {
					receipt_mmg.addRow(_receiptItem, receipt_mmg.rowsLength());
				}
				$("#tabwin_add_receipt").popup({display:false});
			}, '800');
		},		
		/**
		 * 编辑票据信息
		 */
		editReceipt :function(){
			if (receipt_mmg.selectedRowsIndex().length != 1){
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			var f=true;
			$.each(receipt_mmg.selectedRows(), function(i, n) {
				if(n.receiptPid!='' && (n.remark==null || n.remark.length==0)){
					PUI.MessageBox.alert(n.receiptNo+"是历史票据(且非被拒绝)无法编辑!");
					f=false;
					return;
				}
			});
			if(f)
			{
				var item = receipt_mmg.selectedRows()[0];
				var rowIndex =receipt_mmg.selectedRowsIndex();
				var html = PUI.String.format($("#template_receipt").html(),$.extend(item, {rowIndex: rowIndex}));
				$("#tabwin_add_content_receipt").html(html);
				getBuyer("receiptOtherPid","receipt",item.receiptOtherPid);
				$("#tabwin_add_receipt").popup({md:true});
				PUI.plugin.init({}, $("#tabwin_add_content_receipt"));
				sns.valid.init($("#tabwin_add_content_receipt > form"));
			}
		},
		/**
		 * 表格删除一行记录
		 */
		removeReceiptItem: function() {
			if (receipt_mmg.selectedRowsIndex().length == 0){
				PUI.MessageBox.alert("请至少选中一条记录");
				return;
			}
			var f=true;
			$.each(receipt_mmg.selectedRows(), function(i, n) {
				if(n.receiptPid!=''){
					f=false;
					PUI.MessageBox.alert(n.receiptNo+"是历史票据无法删除!");
					return;
				}
			});
			if(f)
			{
				PUI.MessageBox.show({
					title: "删除运单信息",
					content: "你确定要删除票据信息吗？",
					type: "alert",
					buttons: [{ value: "是" },{ value: "否" }],
					success: function (result) {
						if (result == "是") {
							while (receipt_mmg.selectedRowsIndex().length > 0) {
								receipt_mmg.removeRow(receipt_mmg.selectedRowsIndex()[0]);
							}
						}
					}
				});
			}
		},
		//新增一行表格记录
		/**
		 * 新增运单信息
		 */
		addShipRow :function (){
			var _shipItem = {
					shipOrderPid:$("#shipOrderPid").val(),
					shipNo:$("#shipNo").val(),
					shipClient:$("#shipClient").val(),
					shipConsigneePid:$("#shipConsigneePid").val(),
					shipConsigneeName:$("#shipConsigneeName").val(),
					shipCarNo:$("#shipCarNo").val(),
					shipFrom:$("#shipFrom").val(),
					shipTo:$("#shipTo").val(),
					shipPrice:$("#shipPrice").val(),
					shipName:$("#shipName").val(),
					shipNum:$("#shipNum").val(),
					shipStatus:$("#shipStatus").val(),
					remark:$("#remark").val()
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
			ReceiptDetail.countNumPrices();
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
			var f=true;
			$.each(ship_mmg.selectedRows(), function(i, n) {
				if(n.shipOrderPid!='' && (n.remark==null || n.remark.length==0)){
					PUI.MessageBox.alert("运单"+n.shipNo+"是历史运单(且非被拒绝)无法编辑!");
					f=false;
					return;
				}
			});
			if(f){
				var item = ship_mmg.selectedRows()[0];
				var rowIndex =ship_mmg.selectedRowsIndex();
				var html = PUI.String.format($("#template_ship").html(),$.extend(item, {rowIndex: rowIndex}));
				var content=$("#tabwin_add_content_ship");
				content.html(html);
				getBuyer("shipConsigneePid","ship",item.shipConsigneePid);
				$("#tabwin_add_ship").popup({md:true});
				PUI.plugin.init({}, $("#tabwin_add_content_ship"));
				sns.valid.init($("#tabwin_add_content_ship > form"));
			}
		},
		/**
		 * 表格删除一行记录
		 */
		removeShipItem: function() {
			if (ship_mmg.selectedRowsIndex().length == 0){
				PUI.MessageBox.alert("请至少选中一条记录");
				return;
			}
			var f=true;
			$.each(ship_mmg.selectedRows(), function(i, n) {
				if(n.shipOrderPid!=''){
					f=false;
					PUI.MessageBox.alert("运单"+n.shipNo+"是历史运单无法删除!");
					return;
				}
			});
			if(f){
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
							ReceiptDetail.countNumPrices();
						}
					}
				});
			}
		},		
		//新增一行表格记录
		addLadingBillRow :function (){
			if (!$("#ladingBill_form").isValid()) {
				return ;
			}
			var requestName=$("#customerName").val();
			var ladingBill_fileName=$("#ladingBill_fileName").val();
			var ladingBill_textId=$("#textfielid_ladingBill").val();
			var fileName=$("#ladingBill_fileName").val();
			var url=$("#ladingBill_url").val();
			var fag=true;
			if( ladingBill_fileName!=ladingBill_textId){
				$.ajaxFileUpload({
					url:'xascf/util/upload.shtml?type=提单信息&requestName='+requestName,
					secureuri : false,
					fileElementId : 'file_ladingBill',
					dataType : 'text',
					type:'post',
					success: function (data, status)
					{
						var message=data.message;
						if(message.indexOf('成功')>=0){
							 fileName=data.fileName;
							 url=data.url;
							$("#ladingBill_fileName").val(fileName);
							$("#ladingBill_url").val(url);
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
				var _ladingBillItem = {
					ladingBillNo:$("#ladingBillNo").val(),
					ladingBillPid:$("#ladingBillPid").val(),
					ladingBillType:$("#ladingBillType").val(),
					ladingBillClient:$("#ladingBillClient").val(),
					ladingBillFrom:$("#ladingBillFrom").val(),
					ladingBillTo:$("#ladingBillTo").val(),
					ladingBillCarNo:$("#ladingBillCarNo").val(),
					ladingBillGoodsname:$("#ladingBillGoodsname").val(),
					ladingBillNum:$("#ladingBillNum").val(),
					ladingBillPrice:$("#ladingBillPrice").val(),
					ladingBillDate:$("#ladingBillDate").val(),
					ladingBillFileurl:url,
					ladingBillFilename:fileName,
					remark:$("#remark").val()
				};
				if ($("#tabwin_add_content_ladingBill input[name=rowIndex]").val() != "") {
					var rowIndex=parseInt($("#tabwin_add_content_ladingBill input[name=rowIndex]").val());
					ladingBill_mmg.updateRow(_ladingBillItem, rowIndex);
				} else {
					ladingBill_mmg.addRow(_ladingBillItem, ladingBill_mmg.rowsLength());
				}
				$("#tabwin_add_ladingBill").popup({display:false});
				ReceiptDetail.countLadingBillNumPrices();
			}, '800');
		},		
		//提单处理
		/**
		 * 编辑提单信息
		 */
		editLadingBill :function(){
			if (ladingBill_mmg.selectedRowsIndex().length != 1){
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			var f=true;
			$.each(ladingBill_mmg.selectedRows(), function(i, n) {
				if(n.ladingBillPid!='' && (n.remark==null || n.remark.length==0)){
					f=false;
					PUI.MessageBox.alert("提单"+n.ladingBillNo+"是历史提单(且非被拒绝)无法编辑!");
					return;
				}
			});
			if(f){
				var item = ladingBill_mmg.selectedRows()[0];
				var rowIndex =ladingBill_mmg.selectedRowsIndex();
				var html = PUI.String.format($("#template_ladingBill").html(),$.extend(item, {rowIndex: rowIndex}));
				var content=$("#tabwin_add_content_ladingBill");
				content.html(html);
				$("#tabwin_add_ladingBill").popup({md:true});
				PUI.plugin.init({}, $("#tabwin_add_content_ladingBill"));
				sns.valid.init($("#tabwin_add_content_ladingBill > form"));
			}
		},
		/**
		 * 表格删除一行记录
		 */
		removeLadingBillItem: function() {
			if (ladingBill_mmg.selectedRowsIndex().length == 0){
				PUI.MessageBox.alert("请至少选中一条记录");
				return;
			}
			var f=true;
			$.each(ladingBill_mmg.selectedRows(), function(i, n) {
				if(n.ladingBillPid!=''){
					f=false;
					PUI.MessageBox.alert("提单"+n.ladingBillNo+"是历史提单无法删除!");
					return;
				}
			});
			if(f){
				PUI.MessageBox.show({
					title: "删除提单信息",
					content: "你确定要删除提单信息吗？",
					type: "alert",
					buttons: [{ value: "是" },{ value: "否" }],
					success: function (result) {
						if (result == "是") {
							while (ladingBill_mmg.selectedRowsIndex().length > 0) {
								ladingBill_mmg.removeRow(ladingBill_mmg.selectedRowsIndex()[0]);
							}
							ReceiptDetail.countLadingBillNumPrices();
						}
					}
				});
			}
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
			var f = true;
			$.each(db_mmg.selectedRows(), function(i, n) {
				if(n.guaranteeCompanyPid!=''){
					f=false;
					PUI.MessageBox.alert(n.guaranteeName+"是历史担保信息无法编辑!");
					return;
				}
			});
			if(f){
				var item = db_mmg.selectedRows()[0];
				var rowIndex =db_mmg.selectedRowsIndex();
				var html = PUI.String.format($("#template_db").html(),$.extend(item, {rowIndex: rowIndex}));
				var content=$("#tabwin_add_content_db");
				content.html(html);
				$("#tabwin_add_db").popup({md:true});
				PUI.plugin.init({}, $("#tabwin_add_content_db"));
				sns.valid.init($("#tabwin_add_content_db > form"));
			}
		},
		/**
		 * 表格记录
		 */
		removedbItem: function() {
			if (db_mmg.selectedRowsIndex().length == 0){
				PUI.MessageBox.alert("请至少选中一条记录");
				return;
			}
			var f = true;
			$.each(db_mmg.selectedRows(), function(i, n) {
				if(n.guaranteeCompanyPid!=''){
					f=false;
					PUI.MessageBox.alert(n.guaranteeName+"是历史担保信息无法删除!");
					return;
				}
			});
			if(f){
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
			}
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
		editdy :function(){
			if (dy_mmg.selectedRowsIndex().length != 1){
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			var f = true;
			$.each(db_mmg.selectedRows(), function(i, n) {
				if(n.qualificationPid!=''){
					f=false;
					PUI.MessageBox.alert(n.qualificationName+"是历史抵押文件无法编辑!");
					return;
				}
			});
			if(f)
			{
				var item = dy_mmg.selectedRows()[0];
				var rowIndex =dy_mmg.selectedRowsIndex();
				var html = PUI.String.format($("#template_dy").html(),$.extend(item, {rowIndex: rowIndex}));
				var content=$("#tabwin_add_content_dy");
				content.html(html);
				$("#tabwin_add_dy").popup({md:true});
				$("#qualificationType").val(item.qualificationType).trigger("liszt:updated");
				PUI.plugin.init({}, $("#tabwin_add_content_dy"));
				sns.valid.init($("#tabwin_add_content_dy > form"));
			}
		},
		/**
		 * 表格记录
		 */
		removeDyItem: function() {
			if (dy_mmg.selectedRowsIndex().length == 0){
				PUI.MessageBox.alert("请至少选中一条记录");
				return;
			}
			var f = true;
			$.each(db_mmg.selectedRows(), function(i, n) {
				if(n.qualificationPid!=''){
					f=false;
					PUI.MessageBox.alert(n.qualificationName+"是历史抵押文件无法删除!");
					return;
				}
			});
			if(f){
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
			}
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
		//取消关闭
		cancle : function(val){
			$("#tabwin_add_"+val).popup({display:false});
		},
		/***
		 * 保存票据信息
		 */
		save : function(){
			if (!$("#fancingForm").isValid()) {
				return ;
			}
			var params = $("#fancingForm").serializeArray();
			//添加发票列表
			var receiptCount = 0;
			var receiptItem= null;
			if (null!=receipt_mmg && null != receipt_mmg.row(0)){
				var len =receipt_mmg[0].rows.length
				for (var i = 0;i < len; i++) {
					var remark = receipt_mmg.row(i)["remark"];
					if(receipt_mmg.row(i)["receiptPid"].length>0 && (remark==null || remark.length==0))
						continue;
					for (var j = 0; j < _receiptItems.length; j++) {
						receiptItem  = _receiptItems[j];
						params.push({
							name: 'fancingOrderEntity.receiptItemList[' + receiptCount + '].' + receiptItem,
							value: receipt_mmg.row(i)[receiptItem]
						});
					}
					receiptCount++;
				}
			}
			//添加提单列表
			var ladingBillItem= null;
			var ladingBillCount = 0;
			if (null!=ladingBill_mmg && null != ladingBill_mmg.row(0)){
				var len =ladingBill_mmg[0].rows.length
				for (var i = 0;i < len; i++) {
					var remark = ladingBill_mmg.row(i)["remark"];
					if(ladingBill_mmg.row(i)["ladingBillPid"].length>0 && (remark==null || remark.length==0))
						continue;
					for (var j = 0; j < _ladingBillItems.length; j++) {
						ladingBillItem  = _ladingBillItems[j];
						params.push({
							name: 'fancingOrderEntity.ladingBillList[' + ladingBillCount + '].' + ladingBillItem,
							value: ladingBill_mmg.row(i)[ladingBillItem]
						});
					}
					ladingBillCount++;
				}
			}
			//添加运单列表
			var shipItem= null;
			var shipCount = 0;
			if (null != ship_mmg.row(0)){
				var len =ship_mmg[0].rows.length
				for (var i = 0;i < len; i++) {
					var remark = ship_mmg.row(i)["remark"];
					if(ship_mmg.row(i)["shipOrderPid"].length>0 && (remark==null || remark.length==0))
						continue;
					for (var j = 0; j < _shipItems.length; j++) {
						shipItem  = _shipItems[j];
						params.push({
							name: 'fancingOrderEntity.shipOrderItemList[' + shipCount + '].' + shipItem,
							value: ship_mmg.row(i)[shipItem]
						});
					}
					shipCount++;
				}
			}
			//添加担保列表
			var dbItem= null;
			var dbCount = 0;
			if (null!=db_mmg && null != db_mmg.row(0)){
				var len =db_mmg[0].rows.length
				for (var i = 0;i < len; i++) {
					if(db_mmg.row(i)["guaranteeCompanyPid"].length>0)
						continue;
					for (var j = 0; j < _dbItems.length; j++) {
						dbItem  = _dbItems[j];
						params.push({
							name: 'fancingOrderEntity.guaranteeMappItemList[' + dbCount + '].' + dbItem,
							value: db_mmg.row(i)[dbItem]
						});
					}
					dbCount++;
				}
			}
			//添加抵押列表
			var dyItem= null;
			var dyCount = 0;
			if (null!=dy_mmg && null != dy_mmg.row(0)){
				var len =dy_mmg[0].rows.length
				for (var i = 0;i < len; i++) {
					if(dy_mmg.row(i)["qualificationPid"].length>0)
						continue;
					for (var j = 0; j < _dyItems.length; j++) {
						dyItem  = _dyItems[j];
						params.push({
							name: 'fancingOrderEntity.qualificationItemList[' + dyCount + '].' + dyItem,
							value: dy_mmg.row(i)[dyItem]
						});
					}
					dyCount++;
				}
			}
			//'运单融资'=1;  运单必须
        	//'应收账款融资'=2; 票据必须
        	//'抵押融资' = 3; && 抵押  && （运单或票据）
        	//'提单融资' = 4;  提单 && （运单或票据）
			var fancingType = $("#fancingType").val();
			var msg = "";
			if(fancingType=="1" && shipCount==0)
			{
				msg = "运单融资请至少新增一票运单";
			}
			else if(fancingType =="2" && receiptCount==0)
			{
				msg = "应收账款融资请至少新增一张票据信息";
			}
			else if(fancingType =="3" && !(dyCount > 0 && (shipCount>0 || receiptCount>0)))
			{
				msg = "抵押融资请至少新增一条抵押信息以及至少一票运单或票据";
			}
			else if(fancingType =="4" && !(ladingBillCount==0 && (shipCount>0 || receiptCount>0)))
			{
				msg = "提单融资请至少新增一票提单信息以及至少一票运单或票据";
			}
			if(msg.length>0)
			{
				PUI.MessageBox.info(msg);
				return;
			}
			$.post("xascf/receiptManager/save.shtml",params,function(data){
				if(data.indexOf('成功')>=0){
					PUI.MessageBox.info(data);
				}else{
					PUI.MessageBox.info(data);
				}
			});
		},
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
		/**
		 * 计算提单总价格、总数量
		 */
		countLadingBillNumPrices:function(){
			var allnum=0;
			var allPrices=0;
			if (null != ladingBill_mmg.row(0)) {
				for (var i = 0;i < ladingBill_mmg[0].rows.length; i++) {
					var price=parseFloat(ladingBill_mmg.row(i).ladingBillPrice);
					allnum+=1;
					allPrices+=price;
				}
			}
			allPrices=allPrices.toFixed(2);
			$("#ladingBillpices").empty();
			$("#ladingBillnums").empty();
			$("#ladingBillpices").html(allPrices);
			$("#ladingBillnums").html(allnum);
		},
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
		//基本材料操作
		/**
		 * 上传文件
		 */
		upLoadChange :function(val){
			var src=$("#file_"+val).val();
			if(!ReceiptDetail.validateFile(val)){
				return;
			}
			$("#textfielid_"+val).val(src);
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
		//采购商下拉
		consigneeChange :function(type){
			if(type=="ship")
				$("#shipConsigneeName").val($("#shipConsigneePid").find("option:selected").text());
			else
				$("#receiptOtherName").val($("#receiptOtherPid").find("option:selected").text());
		}
	}
}();
