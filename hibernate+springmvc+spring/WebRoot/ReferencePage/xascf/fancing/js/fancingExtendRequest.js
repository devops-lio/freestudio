 $(document).ready(function(){
 	PUI.plugin.init({},$("#check_form"));
 	PUI.plugin.init({},$("#buyer_form"));
	sns.valid.init($("#check_form"));
	sns.valid.init($("#buyer_form"));
	$("#zhangqi").find(".chosen-container").css("float",'right').css("width",'30%');
	$("#dateType").val($("#fancingDateType").val()).trigger("liszt:updated");
	var days=parseInt(parseInt($("#fancingDate").val())/2);
	$("#extendDate").val(days);
});
 var detail_cols = [
    { title:'子账单号', name:'fancingBillNo' ,width:120, align:'center', sortable: true, type: 'String'},
    { title:'融资单号', name:'fancingOrderNo' ,width:120, align:'center', sortable: true, type: 'String'},
    { title:'', name:'billTypeEn' ,hidden:true,width:120, align:'center', sortable: true, type: 'String'},
    { title:'账单类型', name:'billType' ,width:80, align:'center', sortable: true, type: 'String',
        renderer: function(val,item,rowIndex){
    		return '<span style="color:red;">'+val+'</span>';
	}},
	{ title:'本期剩余(元)', name:'billPrice' ,width:100, align:'center', sortable: true, type: 'String',
		renderer: function(val,item,rowIndex){
			return '<span style="color:red;">'+val+'</span>';
		}},
	{ title:'到期还款日', name:'rebackDate' ,width:80, align:'center', sortable: true, type: 'String'},	
    { title:'本期应还(元)', name:'payPrice' ,width:100, align:'center', sortable: true, type: 'String'},
    { title:'本期已还(元)', name:'rebackedPrice' ,width:100, align:'center', sortable: true, type: 'String'},
    { title:'账单时间', name:'createTimeStr' ,width:80, align:'center', sortable: true, type: 'String',
    	renderer: function(val,item,rowIndex){
    		if(item.billType=='本金')
    			val=item.endDate;
    		return '<span>'+val+'</span>'}},
   
    { title:'账单摘要', name:'remark' ,width:350, align:'center', sortable: true, type: 'String'}
];
var detail_mmg =  $("#detail_mmg").mmGrid({
	height : 150,
	cols : detail_cols,
	url : 'xascf/fancingBillDetailShow/page.shtml?type='+$("#rebackFunction").val(),
	params : {
			'condition.billOwerPid':$("#billOwerPid").val(),
			'condition.billCycleRemark':$("#billCycleRemark").val(),
			'condition.fancingOrderNo':$("#beforeBackOrderNo").val()
			},
	method : 'post',
	autoLoad : true,
	showBackboard:false,
	indexCol : true,
	indexColWidth : 15,
	sortName : 'id',
	sortStatus : 'desc',
	fullWidthRows : true,
	cache : false,
	multiSelect: true
});
detail_mmg.on("loadSuccess",function(e, data){
	//设置全选
	var list=data.data.list;
	var payPrice=0.00;
	var billPrice=0;
	var rebackedPrice=0;
	var lxPrice=0;
	for(var i=0;i<list.length;i++){
		payPrice+=parseFloat(list[i].payPrice);
		billPrice+=parseFloat(list[i].billPrice);
		rebackedPrice+=parseFloat(list[i].rebackedPrice);
		if(list[i].billType!='本金'){
			lxPrice+=parseFloat(list[i].billPrice);
		}
	}
	payPrice=payPrice.toFixed(2);
	billPrice=billPrice.toFixed(2);
	rebackedPrice=rebackedPrice.toFixed(2);
	lxPrice=lxPrice.toFixed(2);
	if((payPrice+'').indexOf('.')<0)
		payPrice=payPrice+'.00'
	if((billPrice+'').indexOf('.')<0)
		billPrice=billPrice+'.00'
	if((rebackedPrice+'').indexOf('.')<0)
		rebackedPrice=rebackedPrice+'.00'
	if((lxPrice+'').indexOf('.')<0)
		lxPrice=lxPrice+'.00'
	$("#rebackBillPrice").text(billPrice);
	$("#rebackPayPrice").text(payPrice);
	$("#rebackRebackedPrice").text(rebackedPrice);
	$("#checkRebackPrice").val(billPrice);
	$("#rebackPayLx").val(lxPrice);
	$("#rebackLxPrice").text(lxPrice);
});
 var ship_cols=[
  {title: "运单号",name:"shipNo" ,width:120, sortable: true, type:'string', align:'center'},
  {title: "",name:"shipOrderPid" ,width:120, sortable: true, type:'string', align:'center',hidden:true},
  {title: "委托人",name:"shipClient" ,width:120, sortable: true, type:'string', align:'center'},
  {title: "车牌号码",name:"shipCarNo" ,width:80, sortable: true, type:'string', align:'center'},
  {title: "出发地",name:"shipFrom" ,width:80, sortable: true, type:'string', align:'center'},
  {title: "目的地",name:"shipTo" ,width:80, sortable: true, type:'string', align:'center'},
  {title: "运单金额(元)",name:"shipPrice" ,width:120, sortable: true, type:'string', align:'center'},
  {title: "货物名称",name:"shipName" ,width:120, sortable: true, type:'string', align:'center'},
  {title: "货物数量",name:"shipNum" ,width:120, sortable: true, type:'string', align:'center'},
  {title: "创建时间",name:"createTimeStr" ,width:120, sortable: true, type:'string', align:'center'},
  {title: "状态",name:"shipStatus" ,width:60, sortable: true, type:'string', align:'center',
	  renderer: function(val){
		 if(val=='1')
			 val='已签收';
		 else if(val=='2')
			 val='运输中';
	return val}}
  ];
	var ship_mmg=$('#ship_mmg').mmGrid({
		width:'auto',
		height: 160,
		cols: ship_cols, 
		indexCol: true,
		checkCol:true,
		indexColWidth: 30,
		fullWidthRows:true,
		multiSelect: true,
		nowrap : true,
		showBackboard:false,
		autoLoad : true,
		params : {fancingOrderNo:$("#fancingOrderNo").val()},
		url : 'xascf/shipOrder/page.shtml'
	});
	ship_mmg.on("loadSuccess",function(e, data){
		FancingExtendRequest.countNumPrices();
	})
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
var receipt_cols=[
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
 {title: "附件",name:"receiptFileName" ,width:120, sortable: true, type:'string', align:'center',
    	  renderer: function(val,item,rowIndex){
				 var url=item.receiptFileUrl;
		return '<a target="_blank" href="xascf/util/download.shtml?fileName='+val+'&url='+url+'">'+val+'</a>'}},
 {title: "填开时间",name:"receiptFromDate" ,width:120, sortable: true, type:'string', align:'center'},	
 {title: "创建时间",name:"createTimeStr" ,width:120, sortable: true, type:'string', align:'center'},
  {title: "发票抬头",name:"receiptOtherName" ,width:80, sortable: true, type:'string', align:'center'},
  {title: "货物名称",name:"goodsName" ,width:80, sortable: true, type:'string', align:'center'},
  {title: "货物规格型号",name:"goodsSpec" ,width:80, sortable: true, type:'string', align:'center'},
  {title: "数量",name:"goodsNum" ,width:120, sortable: true, type:'string', align:'center'},
  {title: "单位",name:"goodsUnit" ,width:120, sortable: true, type:'string', align:'center'},
  {title: "发票金额",name:"receiptPrice" ,width:120, sortable: true, type:'string', align:'center'},
  {title: "发票税率",name:"taxRate" ,width:120, sortable: true, type:'string', align:'center'},
  {title: "发票税额",name:"taxPrice" ,width:120, sortable: true, type:'string', align:'center'},
  {title: "",name:"receiptFileUrl" ,width:150, sortable: true, type:'string',hidden:true, align:'center'}
 
  ];
var	receipt_mmg=$('#receipt_mmg').mmGrid({
		width:'auto',
		height: 160,
		cols: receipt_cols, 
		indexCol: true,
		checkCol:true,
		indexColWidth: 30,
		fullWidthRows:true,
		multiSelect: true,
		nowrap : true,
		autoLoad : true,
		params : {fancingOrderNo:$("#fancingOrderNo").val()},
		url : 'xascf/receipt/page.shtml'
	});
	receipt_mmg.on("loadSuccess",function(e, data){
		FancingExtendRequest.countReceiptNumPrices();
	})
var ladingBill_cols=[
  {title: "提单号",name:"ladingBillNo" ,width:120, sortable: true, type:'string', align:'center'},
  {title: "",name:"ladingBillPid" ,width:120, sortable: true, type:'string', align:'center',hidden:true},
  {title: "提单类型",name:"ladingBillType" ,width:120, sortable: true, type:'string', align:'center',
	  renderer: function(val,item,rowIndex){
			 if(val=='1')
				 val='海运提单';
			 else
				 val='空运提单';
	return val}},
	{title: "附件",name:"ladingBillFilename" ,width:120, sortable: true, type:'string', align:'center',
    	  renderer: function(val,item,rowIndex){
				 var url=item.ladingBillFileurl;
		return '<a target="_blank" href="xascf/util/download.shtml?fileName='+val+'&url='+url+'">'+val+'</a>'}},
  {title: "承运时间",name:"ladingBillDate" ,width:120, sortable: true, type:'string', align:'center'},
  {title: "创建时间",name:"createTimeStr" ,width:120, sortable: true, type:'string', align:'center'},
  {title: "发货人",name:"ladingBillClient" ,width:120, sortable: true, type:'string', align:'center'},
  {title: "货物起运地",name:"ladingBillFrom" ,width:80, sortable: true, type:'string', align:'center'},
  {title: "货物目的地",name:"ladingBillTo" ,width:80, sortable: true, type:'string', align:'center'},
  {title: "航次",name:"ladingBillCarNo" ,width:80, sortable: true, type:'string', align:'center'},
  {title: "货物名称",name:"ladingBillGoodsname" ,width:80, sortable: true, type:'string', align:'center'},
  {title: "数量",name:"ladingBillNum" ,width:120, sortable: true, type:'string', align:'center'},
  {title: "运费",name:"ladingBillPrice" ,width:120, sortable: true, type:'string', align:'center'},
  
  {title: "",name:"ladingBillFileurl" ,width:150, sortable: true, type:'string',hidden:true, align:'center'}
  
  ];
var ladingBill_mmg=$('#ladingBill_mmg').mmGrid({
	width:'auto',
	height: 160,
	checkCol:true,
	cols: ladingBill_cols, 
	indexCol: true,
	indexColWidth: 30,
	fullWidthRows:true,
	multiSelect: true,
	nowrap : true,
	autoLoad : true,
	params : {fancingOrderNo:$("#fancingOrderNo").val()},
	url : 'xascf/ladingBill/page.shtml'
});
ladingBill_mmg.on("loadSuccess",function(e, data){
	FancingExtendRequest.countLadingBillNumPrices();
})	
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
			'ladingBillFilename'
		);
var db_cols=[
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
var	db_mmg=$('#db_mmg').mmGrid({
	width:'auto',
	height: 'auto',
	cols: db_cols, 
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
var dy_cols=[
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
var dy_mmg=$('#dy_mmg').mmGrid({
	width:'auto',
	height: 'auto',
	cols: dy_cols, 
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
var _dyItems = new Array(
		'qualificationType',
		'qualificationPid',
		'qualificationNo',
		'qualificationName',
		'qualificationFileName',
		'qualificationUrl'
	);
var FancingExtendRequest = function() {
	return {
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
		countReceiptNumPrices:function(){
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
			$("#picesReceipt").empty();
			$("#numsReceipt").empty();
			$("#picesReceipt").html(allPrices);
			$("#numsReceipt").html(allnum);
		},
		/**
		 * 计算运单总价格、总数量
		 */
		countNumPrices:function(){
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
			$("#pices").empty();
			$("#nums").empty();
			$("#pices").html(allPrices);
			$("#nums").html(allnum);
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
				if(n.shipOrderPid!=''){
					PUI.MessageBox.alert("运单"+n.shipNo+"是历史运单无法编辑!");
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
							ShipFancing.countNumPrices();
						}
					}
				});
			}
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
			ShipFancing.countNumPrices();
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
				if(n.ladingBillPid!=''){
					f=false;
					PUI.MessageBox.alert("提单"+n.ladingBillNo+"是历史提单无法编辑!");
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
							LadingBillFancing.countLadingBillNumPrices();
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
			var receipt_textId=$("#textfielid_ladingBill").val();
			var fileName=$("#ladingBill_fileName").val();
			var url=$("#ladingBill_url").val();
			var fag=true;
			if( ladingBill_fileName!=receipt_textId){
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
					ladingBillFilename:fileName
				};
				if ($("#tabwin_add_content_ladingBill input[name=rowIndex]").val() != "") {
					var rowIndex=parseInt($("#tabwin_add_content_ladingBill input[name=rowIndex]").val());
					ladingBill_mmg.updateRow(_ladingBillItem, rowIndex);
				} else {
					ladingBill_mmg.addRow(_ladingBillItem, ladingBill_mmg.rowsLength());
				}
				$("#tabwin_add_ladingBill").popup({display:false});
				LadingBillFancing.countLadingBillNumPrices();
			}, '800');
		},
		/**
		 * 编辑发票信息
		 */
		editReceipt:function(){
			if (receipt_mmg.selectedRowsIndex().length != 1){
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			var f=true;
			$.each(receipt_mmg.selectedRows(), function(i, n) {
				if(n.receiptPid!=''){
					f=false;
					PUI.MessageBox.alert("发票"+n.receiptNo+"是历史发票无法编辑!");
					return;
				}
			});
			if(f){
				var item = receipt_mmg.selectedRows()[0];
				var rowIndex =receipt_mmg.selectedRowsIndex();
				var html = PUI.String.format($("#template_receipt").html(),$.extend(item, {rowIndex: rowIndex}));
				var content=$("#tabwin_add_content_receipt");
				content.html(html);
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
					PUI.MessageBox.alert("发票"+n.receiptNo+"是历史发票无法删除!");
					return;
				}
			});
			if(f){
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
			}
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
		saveFancingExtendRequest :function(){
			if (!$("#check_form").isValid()) {
				return ;
			}
			debugger;
			var requestPrice=parseFloat($("#requestPrice").val());
			var checkPrice=parseFloat($("#fancingReplyPrice").val());
			if(checkPrice>requestPrice){
				PUI.MessageBox.info("展期金额不能小于融资剩余金额!");
				return ;
			}
			var params=$("#check_form").serializeArray();
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
			$.post("xascf/bill/saveExtendRequest.shtml",params,function(data){  
				if(data.indexOf('成功')>=0){
					PUI.MessageBox.info(data, null, {autoClose: true, timeOut: 997, afterClose: function() {
						Menu.forward("xascf/fancing/jsp/billList.jsp"); 
					}});
				}else{
					PUI.MessageBox.info(data);
				}
				
			});
		}
	};
}();