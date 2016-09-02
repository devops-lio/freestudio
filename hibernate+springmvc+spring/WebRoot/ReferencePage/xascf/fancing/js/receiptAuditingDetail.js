 $(document).ready(function(){
 	PUI.plugin.init();
	sns.valid.init($("form"));
});
var oldcols=[
	{title: "发票号",name:"noteNo" ,width:150, sortable: true, type:'string',align:'center'},
	{title: "",name:"notePid" ,sortable: true, type:'string', align:'center',hidden:true},
	{title: "发票抬头",name:"noteObjectName" ,width:150, sortable: true, type:'string', align:'center'},
	{title: "发票金额(元)",name:"notePrice" ,width:150, sortable: true, type:'string',hidden:true, align:'center'},
	{title: "开票日期",name:"noteDate" ,width:150, sortable: true, type:'string',align:'center'},
	{title: "折扣率(%)",name:"noteDiscount" ,width:150, sortable: true, type:'string',align:'center'},
	{title: "审核时间",name:"noteCheckTime" ,width:150, sortable: true, type:'string',align:'center'}
];
var newcols=[	
		{title: "发票号",name:"noteNo" ,width:150, sortable: true, type:'string',align:'center'},
		{title: "",name:"notePid" ,sortable: true, type:'string', align:'center',hidden:true},
		{title: "",name:"noteType" ,sortable: true, type:'string', align:'center',hidden:true},
		{title: "发票抬头",name:"noteObjectName" ,width:150, sortable: true, type:'string', align:'center'},
		{title: "发票金额(元)",name:"notePrice" ,width:120, sortable: true, type:'string', align:'center'},
		{title: "开票日期",name:"noteDate" ,width:120, sortable: true, type:'string', align:'center'},
		{title: '折扣率(%)',name:"noteDiscount" ,width:120, sortable: true, type:'string', align:'center'},
];
old_mmg =  $("#note_old_mmg").mmGrid({
	width:'auto',
	height: 160,
	cols: oldcols,
	url : 'xascf/receiptManager/getNoteDetailPage.shtml',
	params : {fancingOrderNo:$("#businessNo").val(),type:"old"},
	method: 'post',
	checkCol: false,
	autoLoad: true,
	fullWidthRows: true,
	indexColWidth: 15, 
	cache: false,
	multiSelect: true,
	nowrap: true
});
new_mmg=$('#note_new_mmg').mmGrid({
	width:'auto',
	height: 160,
	cols: newcols, 
	indexCol: true,
	indexColWidth: 30,
	checkCol:true,
	fullWidthRows:true,
	showBackboard:false,
	multiSelect: true,
	nowrap : true,
	autoLoad : true,
	params : {fancingOrderNo:$("#businessNo").val(),type:"new"},
	url : 'xascf/receiptManager/getNoteDetailPage.shtml'
});
new_mmg.on("loadSuccess",function(e, data){
			ReceiptAuditingDetail.countNoteTotalAmount();
		})
var ReceiptAuditingDetail = function(){
	_noteItem = new Array(
			'noteNo',
			'notePid',
			'noteType',
			'noteObjectName',
			'notePrice',
			'noteDate',
			'noteDiscount'	
	)
	return{
		approve:function(){
			if (!$("#auditingForm").isValid()) {
				return ;
			}
			var lostAmount = parseFloat($("#lostPrice").val())+parseFloat($("#iptCurrNoteAmount").val());
			var loanAmount = parseFloat($("#loanAmount").val());
			var servicesPrice = parseFloat($("#servicesPrice").val());
			if($("#loanAmount").val().length==0 || $("#servicesPrice").val().length==0)
			{
				PUI.MessageBox.info("请输入放款金额或服务费");
				return;
			}
			if(loanAmount==NaN || servicesPrice==NaN)
			{
				PUI.MessageBox.info("放款金额或服务费请输入数字");
				return;
			}
			if(lostAmount<loanAmount)
			{
				PUI.MessageBox.info("放款金额不足,放款失败");
				return;
			}
			var params = $("#auditingForm").serializeArray();
			$.post("xascf/receiptManager/approve.shtml",params,function(data){
				PUI.MessageBox.info(data);
			});
		},
		reject:function(){
			if (!$("#auditingForm").isValid()) {
				return ;
			}
			if (new_mmg.selectedRowsIndex().length == 0){
				PUI.MessageBox.alert("请至少选中一条本次融资票据的记录");
				return;
			}
			var params = $("#auditingForm").serializeArray();
			var noteCount = 0;
			var noteItem= null;
			if (null!=new_mmg && null != new_mmg.row(0)){
				var len =new_mmg[0].rows.length
				for (var i = 0;i < len; i++) {
					for (var j = 0; j < _noteItem.length; j++) {
						noteItem  = _noteItem[j];
						params.push({
							name: 'fancingOrderEntity.noteDetailsModelList[' + noteCount + '].' + noteItem,
							value: new_mmg.row(i)[noteItem]
						});
					}
					noteCount++;
				}
			}
			
			$.post("xascf/receiptManager/reject.shtml",params,function(data){
				PUI.MessageBox.info(data);
			});
		},
		showApprove:function(){
			$("#trApprove").show();
			$("#divApprove").show();
			$("#trReject").hide();
			$("#divReject").hide();
			$("#loanAmount").attr("data-required","本次产生融资放款金额不能为空");
			$("#loanAmount").attr("data-num","本次产生融资放款金额只能是数字");
			$("#servicesPrice").attr("data-required","服务费不能为空");
			$("#servicesPrice").attr("data-num","服务费只能是数字");
			$("#reason").removeAttr("data-required");
		},
		showReject:function(){
			$("#trApprove").hide();
			$("#divApprove").hide();
			$("#trReject").show();
			$("#divReject").show();
			$("#loanAmount").removeAttr("data-required");
			$("#loanAmount").removeAttr("data-num");
			$("#servicesPrice").removeAttr("data-required");
			$("#servicesPrice").removeAttr("data-num");
			$("#reason").attr("data-required","请输入拒绝原因");			
		},
		 /**
		 * 计算本次票据总金额
		 */		
		countNoteTotalAmount:function(){
			var allPrices=0;
			if (null != new_mmg.row(0)) {
				for (var i = 0;i < new_mmg[0].rows.length; i++) {
					var price=parseFloat(new_mmg.row(i).notePrice);
					allPrices+=price;
				}
//				2014-2-22 admim tuihuishen,原因:""
			}
			$("#currNoteAmount").html(allPrices.toFixed(2));
			$("#iptCurrNoteAmount").val(allPrices.toFixed(2));
		}
	}
}();
