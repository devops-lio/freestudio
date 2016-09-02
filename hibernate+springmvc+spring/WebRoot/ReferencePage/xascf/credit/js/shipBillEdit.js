$(document).ready(function(){
});

var shipBillDetail_cols=[
                   {title: "对账单号",name:"shipBillNo" ,width:120, sortable: true, type:'string', align:'center',hidden:true},
                   {title: "物流单号",name:"shipNo" ,width:120, sortable: true, type:'string', align:'center'},
                   {title: "",name:"pid" ,width:120, sortable: true, type:'string', align:'center',hidden:true},
                   {title: "始发站",name:"startPalce" ,width:120, sortable: true, type:'string', align:'center'},
                   {title: "目的站",name:"toPlace" ,width:80, sortable: true, type:'string', align:'center'},
                   {title: "收货人",name:"consigneeName" ,width:80, sortable: true, type:'string', align:'center'},
                   {title: "服务方式",name:"serviceType" ,width:80, sortable: true, type:'string', align:'center',hidden:true},
                   {title: "货物名",name:"goodsName" ,width:120, sortable: true, type:'string', align:'center'},
                   {title: "总件数",name:"goodsNum" ,width:150, sortable: true, type:'string', align:'center'},
                   {title: "体积",name:"goodsValume" ,width:150, sortable: true, type:'string',align:'center'},
                   {title: "应收提货费",name:"deliveryFee" ,width:150, sortable: true, type:'string',align:'center'},
                   {title: "应收操作费",name:"operationFee" ,width:150, sortable: true, type:'string',align:'center'},
                   {title: "应收保险费",name:"insuranceFee" ,width:150, sortable: true, type:'string',align:'center'},
                   {title: "应收派送费",name:"delivertoFee" ,width:150, sortable: true, type:'string',align:'center'},
                   {title: "运费单价",name:"shipFee" ,width:150, sortable: true, type:'string',align:'center'},
                   {title: "应收运费",name:"shipPrice" ,width:150, sortable: true, type:'string',align:'center'},
                   {title: "应收总费用",name:"allPrice" ,width:150, sortable: true, type:'string',align:'center'}
                   ];
var shipBillDetail_mmg=null;
var _shipBillItems = new Array(
		'shipBillNo',
		'buyName',
		'buyPid',
		'toDate',
		'pid',
		'billAmount',
		'checkDate',
		'billDate',
		'buyCheckName',
		'checkName',
		'billFileUrl',
		'billFileRename',
		'billFileName'
	);
 var _shipBillDetailItems = new Array(
		 'pid',
		 'shipBillNo',
		 'shipNo',
		 'startPalce',
		 'toPlace',
		 'consigneeName',
		 'serviceType',
		 'goodsName',
		 'goodsNum',
		 'goodsValume',
		 'deliveryFee',
		 'operationFee',
		 'insuranceFee',
		 'delivertoFee',
		 'shipFee',
		 'shipPrice',
		 'allPrice'
 );
 
 
 
var shipBill_cols=[
                   {title: "对账单编号",name:"shipBillNo" ,width:120, sortable: true, type:'string', align:'center'},
                   {title: "客户(委托方)",name:"buyName" ,width:300, sortable: true, type:'string', align:'left'},
                   {title: "",name:"buyPid" ,width:0, sortable: true, type:'string', align:'center',hidden:true},
                   {title: "",name:"pid" ,width:0, sortable: true, type:'string', align:'center',hidden:true},
                   {title: "结算总金额",name:"billAmount" ,width:100, sortable: true, type:'string', align:'center',
                	   renderer: function(val,item,rowIndex){
                		   if(val!=null)
                			   return	formatMoney(val)+' 元';
                		   else return '';}},
                   {title: "对账日",name:"checkDate" ,width:80, sortable: true, type:'string', align:'center'},
                   {title: "有效期至",name:"toDate" ,width:100, sortable: true, type:'string', align:'center'},
                   {title: "账单日期",name:"billDate" ,width:80, sortable: true, type:'string', align:'center'},
                   {title: "客户确认人",name:"buyCheckName" ,width:80, sortable: true, type:'string', align:'center',hidden:true},
                   {title: "审核人",name:"checkName" ,width:60, sortable: true, type:'string', align:'center'},
                   {title: "",name:"billFileUrl" ,width:150, sortable: true, type:'string',hidden:true, align:'center'},
               	  {title: "",name:"billFileRename" ,width:150, sortable: true, type:'string',hidden:true, align:'center'},
               	  {title: "附件",name:"billFileName" ,width:200, sortable: true, type:'string', align:'left',
                 	  renderer: function(val,item,rowIndex){
                 		  var html='';
                 		  if(item.billFileUrl!='' && item.billFileUrl!=null && val!='' && val!=null){
                 		  var urlArray=item.billFileUrl.split(',');
         	    		  var fileNameArray=val.split(',');
         	    		  var length=urlArray.length;
         		    		 for(var i=0;i<length;i++)
         						{
         							var thisFileName = fileNameArray[i];
         							if(thisFileName!=''){
         								html+="<span style='position: absolute;'><a target='_blank' "+
         									" href='#' onclick='FileUtil.downLoad(\""+urlArray[i]+"\",\""+thisFileName+"\")'>"+thisFileName+"</a>"+
         									" <span style='position: relative;top: 4px;'><a style='cursor:pointer' title='删除'" +
         									"class='buttonRomve' onclick='ShipBillEdit.removeFile(\""+rowIndex+"\",\""+i+"\")'>&nbsp;&nbsp;</a></span></span><br> ";
         							}
         						}
                 		  }
         			return  html;
         	    	  }
               	  }
                   ];
var shipBill_mmg=null;
var ShipBillEdit = function(){	
	return{
		
		//表格初始化
		shipBillGrid:function(){
			if(shipBill_mmg!=null){
				return;
			}
	        shipBill_mmg=$('#shipBill_mmg').mmGrid({
	         	height: 160,
	         	cols: shipBill_cols, 
	         	indexCol: false,
	         	indexColWidth: 30,
	         	checkCol:true,
	         	fullWidthRows:true,
	         	multiSelect: true,
	         	nowrap : true,
	         	autoLoad : true,
	         	params : {businessNo:$("#businessNo").val()},
	         	url : 'xascf/credit/shipBillPage.shtml?TYPE='+$("#billTypeStatus").val()
	         });
	         shipBill_mmg.on("loadSuccess",function(e, data){
	         	 ShipBillEdit.countBillPrices();
	         })
		},
		
		/**
		 * 清空明细
		 * @returns
		 */
		detailAdd:function(){
			if (!$("#shipBill_form").isValid()) {
				return ;
			}
			PUI.util.clearForm($("#shipBillDetail_form"));
		},
		//添加对账单详细的时候需要先填写对账单号
		checkNo:function(){
			var val=$("#shipBillNo").val();
			if(''==val){
				PUI.MessageBox.alert("请先填写对账单号");
				$("#shipBillNo").focus();
				$("#shipNo").val();
				return ;
			}
		},
		/**
		 * 表格删除一行明细记录
		 */
		removeDetailItem: function() {
			if (shipBillDetail_mmg.selectedRowsIndex().length == 0){
				PUI.MessageBox.alert("请至少选中一条记录");
				return;
			}
			PUI.MessageBox.show({
				title: "删除对账单明细信息",
				content: "你确定要删除对账单明细信息吗？",
				type: "alert",
				buttons: [{ value: "是" },{ value: "否" }],
				success: function (result) {
					if (result == "是") {
						while (shipBillDetail_mmg.selectedRowsIndex().length > 0) {
							shipBillDetail_mmg.removeRow(shipBillDetail_mmg.selectedRowsIndex()[0]);
						}
						ShipBillEdit.countDetailPrices();
					}
				}
			});
		},
		/**
		 * 新增明细
		 * @returns
		 */
		detailSave:function(){
			if (!$("#shipBillDetail_form").isValid()) {
				return ;
			}
			var _shipBillDetailItems = {
					pid:$("#detial_pid").val(),
					shipBillNo:$("#shipBillNo").val(),
					shipNo:$("#shipNo").val(),
					startPalce:$("#startPalce").val(),
					toPlace:$("#toPlace").val(),
					consigneeName:$("#consigneeName").val(),
					serviceType:$("#serviceType").val(),
					goodsName:$("#goodsName").val(),
					goodsNum:$("#goodsNum").val(),
					goodsValume:$("#goodsValume").val(),
					deliveryFee:$("#deliveryFee").val(),
					operationFee:$("#operationFee").val(),
					insuranceFee:$("#insuranceFee").val(),
					delivertoFee:$("#delivertoFee").val(),
					shipFee:$("#shipFee").val(),
					shipPrice:$("#shipPrice").val(),
					allPrice:$("#allPrice").val()
			};
			var index=$("#detail_rowIndex").val();
			if ( index!= "") {
				var rowIndex=parseInt(index);
				shipBillDetail_mmg.updateRow(_shipBillDetailItems, rowIndex);
			} else {
				shipBillDetail_mmg.addRow(_shipBillDetailItems, shipBillDetail_mmg.rowsLength());
			}
			ShipBillEdit.countDetailPrices();
			PUI.util.clearForm($("#shipBillDetail_form"));
		},
		/**
		 * 编辑明细
		 * @returns
		 */
		editDetail:function(){
			if (shipBillDetail_mmg.selectedRowsIndex().length != 1){
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			var items = shipBillDetail_mmg.selectedRows()[0];
			var rowIndex =shipBillDetail_mmg.selectedRowsIndex();
			$("#detial_pid").val(items.pid);
			$("#detail_rowIndex").val(rowIndex);
			$("#shipBillNo").val(items.shipBillNo);
			$("#shipNo").val(items.shipNo);
			$("#startPalce").val(items.startPalce);
			$("#toPlace").val(items.toPlace);
			$("#consigneeName").val(items.consigneeName);
			$("#serviceType").val(items.serviceType);
			$("#goodsName").val(items.goodsName);
			$("#goodsNum").val(items.goodsNum);
			$("#goodsValume").val(items.goodsValume);
			$("#deliveryFee").val(items.deliveryFee);
			$("#operationFee").val(items.operationFee);
			$("#insuranceFee").val(items.insuranceFee);
			$("#delivertoFee").val(items.delivertoFee);
			$("#shipFee").val(items.shipFee);
			$("#shipPrice").val(items.shipPrice);
			$("#allPrice").val(items.allPrice);
		},
		//对账单明细表格初始化
		shipBillDetail_Init:function(){
//			if (null != shipBillDetail_mmg) {
//				return;
//			}
			shipBillDetail_mmg=$('#shipBilldetail_mmg').mmGrid({
				 width:'auto',
				 height: 240,
				 cols: shipBillDetail_cols, 
				 indexCol: true,
				 indexColWidth: 30,
				 checkCol:true,
				 fullWidthRows:true,
				 multiSelect: true,
				 nowrap : true,
				 autoLoad : true,
				 params : {businessNo:$("#shipBillNo").val()},
				 url : 'xascf/credit/shipBillDetailPage.shtml'
			 });
			 shipBillDetail_mmg.on("loadSuccess",function(e, data){
				 ShipBillEdit.countDetailPrices();
			 })
		},
		/**
		 * 计算对账单明细总价格、总数量
		 */
		countDetailPrices:function(){
			var allnum=0;
			var allPrices=0;
			
			if (null != shipBillDetail_mmg.row(0)) {
				for (var i = 0;i < shipBillDetail_mmg[0].rows.length; i++) {
					var price=parseFloat(shipBillDetail_mmg.row(i).allPrice);
					allnum+=1;
					allPrices+=price;
				}
			}
			allPrices=allPrices.toFixed(2);
			
			$("#detailPices").empty();
			$("#detailNums").empty();
			$("#detailPices").html(formatMoney(allPrices));
			$("#detailNums").html(allnum);
			
		},
		/**
		 * 计算对账单明细价格、总数量
		 */
		countBillPrices:function(){
			var allnum=0;
			var allPrices=0;
			var discountPrice=0;
			if (null != shipBill_mmg.row(0)) {
				for (var i = 0;i < shipBill_mmg[0].rows.length; i++) {
					var price=parseFloat(shipBill_mmg.row(i).billAmount);
					allnum+=1;
					allPrices+=price;
				}
			}
			allPrices=allPrices.toFixed(2);
			discountPrice=allPrices;
			if ($("#billRateVal").length > 0 ){
				discountPrice=allPrices*parseFloat($("#billRateVal").val())/100.0;
				discountPrice=discountPrice.toFixed(2)
			}
			$("#shipBillEditPrice").empty();
			$("#shipBillEditNums").empty();
			$("#shipBillEditPrice").html(formatMoney(allPrices)+'元');
			$("#shipBillEditNums").html(allnum);
			$("#shipBillDisount").empty();
			$("#shipBillDisount").html(formatMoney(discountPrice)+'元');
			$("#noteDiscountPrice").val(discountPrice);
			$("#notePrice").val(allPrices);
			//填充最大放款金额  历史剩余金额+票据折扣金额
			//查看是否低于剩余授信额度
			var lostAmount=$("#lostAmount").val();
			
			var remaingAmountVal=parseFloat($("#histoteriRemaingAmount").val())+parseFloat(discountPrice);
			
			if(parseFloat(lostAmount)<remaingAmountVal){
				remaingAmountVal=parseFloat(lostAmount);
			}
			$("#remaingAmount").val(remaingAmountVal);
			$("#remaingAmountdiv").html(formatMoney(remaingAmountVal)+" 元");
			//填充票据总和
			var allNotePricedivVal=parseFloat($("#allNotePrice").val())+parseFloat(allPrices);
			$("#allNotePricediv").html(formatMoney(allNotePricedivVal)+" 元");
			var llNoteDisPriceVal=parseFloat($("#allNoteDisPrice").val())+parseFloat(discountPrice);
			$("#allNoteDisPricediv").html(formatMoney(llNoteDisPriceVal)+" 元");
		},
		/**
		 * 编辑对账单
		 */
		editShipBill:function(){
			if (shipBill_mmg.selectedRowsIndex().length != 1){
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			var items = shipBill_mmg.selectedRows()[0];
			var rowIndex =shipBill_mmg.selectedRowsIndex();
			var jHtml = $(PUI.String.format($("#template_shipBill").html(),$.extend(items, {rowIndex: rowIndex})));
			if (typeof buyer_mmg != 'undefined' && null != buyer_mmg && null != buyer_mmg.row(0)) {
				var html = "<option value=''></option>";
				var len = buyer_mmg[0].rows.length;
				jHtml.find("#buyPidTwo").empty();
				for ( var i = 0; i < len; i++) {
					var item = buyer_mmg.row(i);
					var val1 = item.buyPid;
					var val2 = item.buyName;
					html += "<option value=\'" + val1 + "\'>" + val2
						+ "</option>";
				}
				
				jHtml.find("#buyPidTwo").html(html);
				$("#tabwin_add_content_shipBill").html(jHtml);
			}else{
				jHtml.find("#buyPidTwo").empty();
				var html = "<option value=\'" + items.buyPid + "\'>" + items.buyName
							+ "</option>";
				jHtml.find("#buyPidTwo").html(html);
				$("#tabwin_add_content_shipBill").html(jHtml);
			}
			$("#tabwin_add_shipBill").popup({md:true});
			PUI.plugin.init({}, $("#shipBill_form"));
			sns.valid.init($("#shipBill_form"));
			PUI.plugin.init({}, $("#shipBillDetail_form"));
			sns.valid.init($("#shipBillDetail_form"));
			ShipBillEdit.shipBillDetail_Init();
			$("#buyPidTwo").val(items.buyPid).trigger("liszt:updated");
			$("#buyNameTwo").val(items.buyName);
			$("#shipBillNo").attr("readonly",'readonly');
		},
		//委托方下拉
		consigneeChange :function(){
			$("#buyNameTwo").val($("#buyPidTwo").find("option:selected").text());
		},
		/**
		 * 表格删除一行对账单记录
		 */
		removeShipBillItem: function() {
			if (shipBill_mmg.selectedRowsIndex().length == 0){
				PUI.MessageBox.alert("请至少选中一条记录");
				return;
			}
			PUI.MessageBox.show({
				title: "删除对账单信息",
				content: "你确定要删除对账单信息吗？",
				type: "alert",
				buttons: [{ value: "是" },{ value: "否" }],
				success: function (result) {
					if (result == "是") {
						while (shipBill_mmg.selectedRowsIndex().length > 0) {
							shipBill_mmg.removeRow(shipBill_mmg.selectedRowsIndex()[0]);
						}
						ShipBillEdit.countBillPrices();
					}
				}
			});
		},
		
		//新增一行对账单记录
		addBillRow:function (){
			if (!$("#shipBill_form").isValid()) {
				return ;
			}
//			if($("#billFileUrl_url").val()==""){
//				PUI.MessageBox.alert("请上传附件！");
//				return;
//			}
			var shipBillNO=$("#shipBillNo").val();
			var index=$("#ship_Bill_rowIndex").val();
//			for (var i = 0;i <shipBill_mmg[0].rows.length; i++) {
//				var item=shipBill_mmg.row(i);
//				if(null!=item){
//					var oldNo=item.shipBillNo;
//					if(oldNo==shipBillNO && index!=i){
//						PUI.MessageBox.alert("对账单号不能重复!");
//						return;
//					}
//				}
//			}
			var _shipBillItem = {
					shipBillNo:$("#shipBillNo").val(),
					pid:$("#shipBill_pid").val(),
					buyName:$("#buyNameTwo").val(),
					buyPid:$("#buyPidTwo").val(),
					toDate:$("#shipBillToDate").val(),
					billAmount:$("#shipBillAmount").val(),
					billDate:$("#billDate").val(),
					checkDate:$("#checkDate").val(),
					buyCheckName:$("#buyCheckName").val(),
					checkName:$("#checkName").val(),
					billFileUrl:$("#billFileUrl").val(),
					billFileRename:$("#billFileRename").val(),
					billFileName:$("#billFileName").val()
				
			};
			
			if ( index!= "") {
				var rowIndex=parseInt(index);
				shipBill_mmg.updateRow(_shipBillItem, rowIndex);
			} else {
				shipBill_mmg.addRow(_shipBillItem, shipBill_mmg.rowsLength());
			}
			ShipBillEdit.countBillPrices();
			$("#tabwin_add_shipBill").popup({display:false});
			//保存明细到数据库
			ShipBillEdit.saveDetailToDB();
		},
		//保存明细到数据库
		saveDetailToDB:function(){
			var detailItem= null;
			if (null!=shipBillDetail_mmg && null != shipBillDetail_mmg.row(0)){
				var params=new Array();
				var len =shipBillDetail_mmg[0].rows.length
				for (var i = 0;i < len; i++) {
					for (var j = 0; j < _shipBillDetailItems.length; j++) {
						detailItem  = _shipBillDetailItems[j];
						params.push({
							name: 'shipBillDetailList[' + i + '].' + detailItem,
							value: shipBillDetail_mmg.row(i)[detailItem]
						});
					}
				}
				$.post("xascf/credit/saveShipBillDetail.shtml",params,function(data){
				},"json");
			}
			
		},
		//对账单弹出框
		shipBill_add : function() {
			var shipBillNo=getUid();
			var jHtml = $(PUI.String.format($("#template_shipBill").html(), {}));
			if (typeof buyer_mmg != 'undefined' && null != buyer_mmg && null != buyer_mmg.row(0)) {
				var html = "<option value=''></option>";
				var len = buyer_mmg[0].rows.length;
				jHtml.find("#buyPidTwo").empty();
				for ( var i = 0; i < len; i++) {
					var item = buyer_mmg.row(i);
					var val1 = item.buyPid;
					var val2 = item.buyName;
						html += "<option value=\'" + val1 + "\'>" + val2
								+ "</option>";
				}
				jHtml.find("#buyPidTwo").html(html);
				$("#tabwin_add_content_shipBill").html(jHtml);
			}else{
				$("#tabwin_add_content_shipBill").html(jHtml);
			}
			$("#tabwin_add_shipBill").popup({md:true});
			PUI.plugin.init({}, $("#shipBill_form"));
			sns.valid.init($("#shipBill_form"));
			PUI.plugin.init({}, $("#shipBillDetail_form"));
			sns.valid.init($("#shipBillDetail_form"));
			$("#shipBillNo").val(shipBillNo);
			ShipBillEdit.shipBillDetail_Init();
			$("#buyNameTwo").val($("#buyPidTwo").find("option:selected").text());
		},
		//取消关闭
		shipBillCancle : function(){
			$("#tabwin_add_shipBill").popup({display:false});
		},
		// 文件上传
		addUploadPop : function(){
			   var parameterArray = new Array();
				parameterArray.push("fileName");
				parameterArray.push("fileUrl");
				parameterArray.push("fileRename");
			   pluploadUtil.init(
					   "/XA_SCF/xascf/util/plupload.shtml",
						{type : "duizhangdan", requestName:$("#memberPid").val(), flag:"",title : "Image files", extensions : "jpg,gif,png",
						whatFile:"bank"},"",ShipBillEdit.fillUrlAndName,parameterArray);
			},
			//上传回调函数
		fillUrlAndName : function(fileArray,parameter){
			var aname=$("#billFileName").val();
			var aurl=$("#billFileUrl").val();
			var fileRename=$("#billFileRename").val();
			if(aname==''){
				$("#billFileName").val(fileArray[2]);
			}else{
				$("#billFileName").val(aurl+","+fileArray[2]);
			}
			if(aurl==''){
				$("#billFileUrl").val(fileArray[0]);
			}else{
				$("#billFileUrl").val(aurl+","+fileArray[0]);
			}
			if(fileRename==''){
				$("#billFileRename").val(fileArray[1]);
			}else{
				$("#billFileRename").val(fileRename+","+fileArray[1]);
			}
		},
		removeFile:function(rowIndex,i){
			PUI.MessageBox.show({
				title: "删除附件",
				content: "你确定要删除该附件吗？",
				type: "confirm",
				buttons: [{ value: "是" },{ value: "否" }],
				success: function (result) {
					if (result == "是") {
						var item=shipBill_mmg.row(rowIndex);
						var fileNameArray = item.billFileName.split(",");
						var urlArray = item.billFileUrl.split(",");
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
						item.billFileName=newName;
						item.billFileUrl=newUrl;
						shipBill_mmg.updateRow(item, rowIndex); 
					}
				}
			});
			}
		};
}();
