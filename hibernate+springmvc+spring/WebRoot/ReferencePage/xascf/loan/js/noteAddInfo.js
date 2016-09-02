$(document).ready(function(){
});
var receipt_cols=[
{title: "发票号码",name:"receiptNumber" ,width:120, sortable: true, type:'string', align:'center'},
{title: "填开日期",name:"issueDate" ,width:120, sortable: true, type:'string', align:'center'},
{title: "到期日期",name:"receiptToDate" ,width:120, sortable: true, type:'string', align:'center'},
{title: "价税合计",name:"actualAmount" ,width:120, sortable: true, type:'string', align:'center',
	  renderer: function(val,item,rowIndex){
		  if(null!=val && val!='')
	    		return	formatMoney(val)+'元';
    		  else return '';}},
{title: "付款方名称",name:"payerName" ,width:150, sortable: true, type:'string', align:'center'},
{title: "附件",name:"receiptFileName" ,width:220, sortable: true, type:'string', align:'left',
        	  renderer: function(val,item,rowIndex){
        		  var html='';
        		  if(item.receiptFileUrl!='' && item.receiptFileUrl!=null && val!='' && val!=null){
        		  var urlArray=item.receiptFileUrl.split(',');
	    		  var fileNameArray=val.split(',');
	    		  var length=urlArray.length;
		    		 for(var i=0;i<length;i++)
						{
							var thisFileName = fileNameArray[i];
							if(thisFileName!=''){
								html+="<span style='position: absolute;'><a target='_blank' "+
									" href='#' onclick='FileUtil.downLoad(\""+urlArray[i]+"\",\""+thisFileName+"\")'>"+thisFileName+"</a>"+
									" <span style='position: relative;top: 4px;'><a style='cursor:pointer' title='删除'" +
									"class='buttonRomve' onclick='ReceiptInfo.removeFile(\""+rowIndex+"\",\""+i+"\")'>&nbsp;&nbsp;</a></span></span><br> ";
							}
						}
        		  }
			return  html;
	    	  }},
{title: "",name:"receiptPid" ,width:120, sortable: true, type:'string', align:'center',hidden:true},
{title: "发票类型",name:"receiptType" ,width:120, sortable: true, type:'string', align:'center',
	  renderer: function(val,item,rowIndex){
			 if(val=='1')
				 val='增值税普通发票';
			 else if(val=='2')
				 val='增值税专用发票';
			 else if(val=='3')
				 val='公路内河运输统一发票';
			 else
				 val='其他发票';
	return val}},
{title: "发票种类",name:"receiptKinds" ,width:80, sortable: true, type:'string', align:'center',
	  renderer: function(val,item,rowIndex){
			 if(val=='1')
				 val='正式发票';
			 else if(val=='2')
				 val='虚拟发票';
			 else if(val=='3')
				 val='红冲发票';
	return val}},
	{title: "发票代码",name:"receiptNo" ,width:120, sortable: true, type:'string', align:'center'},
{title: "收付标识",name:"rpFlag" ,width:80, sortable: true, type:'string', align:'center'},
{title: "代收代付标识",name:"cpFlag" ,width:80, sortable: true, type:'string', align:'center'},
{title: "",name:"payerPid" ,width:80, sortable: true, type:'string', align:'center',hidden:true},

{title: "客户签收日期",name:"signforDate" ,width:80, sortable: true, type:'string', align:'center'},
{title: "付款方纳税人识别号",name:"taxPayerIdentifier" ,width:80, sortable: true, type:'string', align:'center'},

{title: "付款方开户行",name:"payerBank" ,width:120, sortable: true, type:'string', align:'center'},
{title: "付款方账号",name:"payerAccountNumber" ,width:120, sortable: true, type:'string', align:'center'},
{title: "收款方名称",name:"payeeName" ,width:120, sortable: true, type:'string', align:'center'},
{title: "收款方纳税人识别号" ,name:"taxPayeeIdentifier",width:120, sortable: true, type:'string', align:'center'},
{title: "收款方地址",name:"payeeAddress" ,width:120, sortable: true, type:'string', align:'center'},
{title: "收款方电话",name:"payeePhone" ,width:120, sortable: true, type:'string', align:'center'},
{title: "收款方开户行",name:"payeeBank" ,width:120, sortable: true, type:'string', align:'center'},
{title: "收款方账号",name:"payeeAccountNumber" ,width:120, sortable: true, type:'string', align:'center'},
{title: "商品名称或经营项目",name:"settlementName" ,width:160, sortable: true, type:'string', align:'center'},
{title: "收款人姓名",name:"payeeEsusUsername" ,width:120, sortable: true, type:'string', align:'center'},
{title: "开票人姓名",name:"drawerEsusUsername" ,width:120, sortable: true, type:'string', align:'center'},
{title: "合计总金额",name:"sumAmount" ,width:120, sortable: true, type:'string', align:'center',
	  renderer: function(val,item,rowIndex){
		  if(null!=val && val!='')
	    		return	formatMoney(val)+'元';
    		  else return '';}},
{title: "合计不含税总金额",name:"sumNotaxAmount" ,width:120, sortable: true, type:'string', align:'center',
	  renderer: function(val,item,rowIndex){
		  if(null!=val && val!='')
		return	formatMoney(val)+'元';
		  else return '';}},
{title: "合计总税金",name:"sumTaxAmount" ,width:120, sortable: true, type:'string', align:'center',
	  renderer: function(val,item,rowIndex){
		  if(null!=val && val!='')
	    		return	formatMoney(val)+'元';
    		  else return '';}},

{title: "实际总税金",name:"actualTaxAmount" ,width:120, sortable: true, type:'string', align:'center',
	  renderer: function(val,item,rowIndex){
		  if(null!=val && val!='')
	    		return	formatMoney(val)+'元';
    		  else return '';}},
{title: "",name:"receiptFileUrl" ,width:150, sortable: true, type:'string',hidden:true, align:'center'},
{title: "",name:"receiptFileRename" ,width:150, sortable: true, type:'string',hidden:true, align:'center'}

          ];
 var receiptAdd_mmg=$('#receiptAdd_mmg').mmGrid({
	width:'auto',
	height: 160,
	cols: receipt_cols, 
	indexCol: true,
	indexColWidth: 30,
	checkCol:true,
	fullWidthRows:true,
	multiSelect: true,
	nowrap : true,
	//autoLoad : true,
	params : {fancingOrderNo:''}//,
	//url : 'xascf/credit/receiptPage.shtml'
});
receiptAdd_mmg.on("loadSuccess",function(e, data){
	NoteAddInfo.countReceiptPrices();
})
var _receiptAddItems = new Array(
		'receiptNo',
		'receiptNumber',
		'receiptToDate',
		'receiptPid',
		'receiptType',
		'receiptKinds',
		'rpFlag',
		'cpFlag',
		'payerPid',
		'issueDate',
		'signforDate',
		'taxPayerIdentifier',
		'payerName',
		'payerBank',
		'payerAccountNumber',
		'payeeName',
		'taxPayeeIdentifier',
		'payeeAddress',
		'payeePhone',
		'payeeBank',
		'payeeAccountNumber',
		'settlementName',
		'payeeEsusUsername',
		'drawerEsusUsername',
		'sumAmount',
		'sumNotaxAmount',
		'sumTaxAmount',
		'actualAmount',
		'actualTaxAmount',
		'receiptFileUrl',
		'receiptFileName',
		'receiptFileRename'
		
	);
var NoteAddInfo = function(){	
	return{
		removeFile:function(rowIndex,i){
			PUI.MessageBox.show({
				title: "删除附件",
				content: "你确定要删除该附件吗？",
				type: "confirm",
				buttons: [{ value: "是" },{ value: "否" }],
				success: function (result) {
					if (result == "是") {
						var item=receiptAdd_mmg.row(rowIndex);
						var fileNameArray = item.receiptFileName.split(",");
						var urlArray = item.receiptFileUrl.split(",");
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
						item.receiptFileName=newName;
						item.receiptFileUrl=newUrl;
						receiptAdd_mmg.updateRow(item, rowIndex); 
					}
				}
			})
		},
		/**
		 * 计算总价格、总数量
		 */
		countReceiptPrices:function(){
			var allnum=0;
			var allPrices=0;
			var discountPrice=0;
			if (null != receiptAdd_mmg.row(0)) {
				for (var i = 0;i < receiptAdd_mmg[0].rows.length; i++) {
					var price=parseFloat(receiptAdd_mmg.row(i).actualAmount);
					allnum+=1;
					allPrices+=price;
					if ($("#billRateVal").length > 0 ){
						discountPrice+=parseFloat(price*parseFloat($("#billRateVal").val())/100.0);
					}else{
						discountPrice+=price;
					}
				}
			}
			allPrices=allPrices.toFixed(2);
			$("#addReceiptPices").empty();
			$("#addReceiptNums").empty();
			$("#addReceiptPices").html(formatMoney(allPrices)+' 元');
			$("#addReceiptNums").html(allnum);
			$("#addreceiptDisount").empty();
			$("#addreceiptDisount").html(formatMoney(discountPrice)+' 元');
		},
		/**
		 * 
		 */
		editReceipt:function(){
			if (receiptAdd_mmg.selectedRowsIndex().length != 1){
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			var items = receiptAdd_mmg.selectedRows()[0];
			var rowIndex =receiptAdd_mmg.selectedRowsIndex();
			var jHtml = $(PUI.String.format($("#template_receipt").html(),$.extend(items, {rowIndex: rowIndex})));
			jHtml.find("#payerPid").empty();
			var html = "<option value=\'" + items.payerPid + "\'>" + items.payerName
						+ "</option>";
			jHtml.find("#payerPid").html(html);
			$("#tabwin_add_content_receipt").html(jHtml[0].outerHTML);
			$("#tabwin_add_receipt").popup({md:true});
			$("#payerPid").val(items.payerPid);
			$("#payerName").val(items.payerName);
			PUI.plugin.init({}, $("#tabwin_add_content_receipt"));
			sns.valid.init($("#tabwin_add_content_receipt > form"));
		},
		//收货采购商下拉
		consigneeChange :function(){
			$("#payerName").val($("#payerPid").find("option:selected").text());
		},
		/**
		 * 表格删除一行记录
		 */
		removeReceiptItem: function() {
			if (receiptAdd_mmg.selectedRowsIndex().length == 0){
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
						while (receiptAdd_mmg.selectedRowsIndex().length > 0) {
							receiptAdd_mmg.removeRow(receiptAdd_mmg.selectedRowsIndex()[0]);
						}
						NoteAddInfo.countReceiptPrices();
					}
				}
			});
		},
		
		//新增一行表格记录
		addReceiptRow:function (){
			if (!$("#receipt_form").isValid()) {
				return ;
			}
			var receiptNo=$("#receiptNo").val();
			for (var i = 0;i <receiptAdd_mmg[0].rows.length; i++) {
				var item=receiptAdd_mmg.row(i);
				if(null!=item){
					var oldNo=item.receiptNo;
					if(oldNo==receiptNo){
						PUI.MessageBox.alert("发票代码不能重复!");
						return;
					}
				}
			}
			var _receiptItem = {
				receiptNo:$("#receiptNo").val(),
				receiptNumber:$("#receiptNumber").val(),
				receiptPid:$("#receiptPid").val(),
				receiptType:$("#receiptType").val(),
				receiptKinds:$("#receiptKinds").val(),
				rpFlag:$("#rpFlag").val(),
				cpFlag:$("#cpFlag").val(),
				payerPid:$("#payerPid").val(),
				issueDate:$("#issueDate").val(),
				signforDate:$("#signforDate").val(),
				taxPayerIdentifier:$("#taxPayerIdentifier").val(),
				payerName:$("#payerName").val(),
				payerBank:$("#payerBank").val(),
				payerAccountNumber:$("#payerAccountNumber").val(),
				payeeName:$("#payeeName").val(),
				payeeAddress:$("#payeeAddress").val(),
				payeePhone:$("#payeePhone").val(),
				payeeBank:$("#payeeBank").val(),
				payeeAccountNumber:$("#payeeAccountNumber").val(),
				settlementName:$("#settlementName").val(),
				payeeEsusUsername:$("#payeeEsusUsername").val(),
				drawerEsusUsername:$("#drawerEsusUsername").val(),
				sumAmount:$("#sumAmount").val(),
				taxPayeeIdentifier:$("#taxPayeeIdentifier").val(),
				sumNotaxAmount:$("#sumNotaxAmount").val(),
				sumTaxAmount:$("#sumTaxAmount").val(),
				actualAmount:$("#actualAmount").val(),
				actualTaxAmount:$("#actualTaxAmount").val(),
				receiptFileUrl:$("#receipt_url").val(),
				receiptFileName:$("#receipt_fileName").val(),
				receiptToDate:$("#receiptToDate").val(),
				receiptFileRename:$("#receipt_fileName").val()
			};
			var index=$("#receipt_rowIndex").val();
			if ( index!= "") {
				var rowIndex=parseInt(index);
				receiptAdd_mmg.updateRow(_receiptItem, rowIndex);
			} else {
				receiptAdd_mmg.addRow(_receiptItem, receiptAdd_mmg.rowsLength());
			}
			NoteAddInfo.countReceiptPrices();
			$("#tabwin_add_receipt").popup({display:false});
		},
		receipt_add : function() {
			var jHtml = $(PUI.String.format($("#template_receipt").html(), {}));
			$("#tabwin_add_content_receipt").html(jHtml[0].outerHTML);
			$("#payerName").val($("#payerPid").find("option:selected").text());
			$("#tabwin_add_receipt").popup({md:true});
			PUI.plugin.init({}, $("#tabwin_add_content_receipt"));
			sns.valid.init($("#receipt_form"));
		},
		addUploadPop : function(data){
			   var parameterArray = new Array();
				parameterArray.push("fileName");
				parameterArray.push("fileUrl");
				parameterArray.push("fileRename");
			   pluploadUtil.init(
					   "/XA_SCF/xascf/util/plupload.shtml",
						{type : "piaojubuchong", requestName:$("#memberPid").val(), flag:"",title : "Image files", extensions : "jpg,gif,png",
						whatFile:"bank"},"",NoteAddInfo.fillUrlAndName,parameterArray);
			},
			//上传回调函数
			fillUrlAndName : function(fileArray,parameter){
				var aname=$("#receipt_fileName").val();
				var aurl=$("#receipt_url").val();
				if(aname==''){
					$("#receipt_fileName").val(fileArray[2]);
				}else{
					$("#receipt_fileName").val(aurl+","+fileArray[2]);
				}
				if(aurl==''){
					$("#receipt_url").val(fileArray[0]);
				}else{
					$("#receipt_url").val(aurl+","+fileArray[0]);
				}
			},
			//上传回调函数
//		fillUrlAndName : function(array){
//			$("#receipt_url").val(array[0]);
//			$("#receipt_fileName").val(array[2]);
//			$("#show_receipt_fileName").html(array[1]);
//		},	
		//取消关闭
		receiptCancle : function(){
			$("#tabwin_add_receipt").popup({display:false});
		}
	};
}();
