$(document).ready(function(){
	
});

var order_cols=[
                			{title: "订单编号",name:"orderNo" ,width:120, sortable: true, type:'string', align:'center'},
			  			   {title: "派车单号",name:"delveryNo" ,width:80, sortable: true, type:'string', align:'center'},
			  			   {title: "订单条码",name:"orderBarcode" ,width:120, sortable: true, type:'string', align:'center'}, 
			  			   {title: "委托方pid",name:"buyPid" ,width:120, sortable: true, type:'string', align:'center',hidden:true},
			  			   {title: "委托方名称",name:"buyName" ,width:120, sortable: true, type:'string', align:'center'},
			  			   {title: "下单人",name:"singleName" ,width:80, sortable: true, type:'string', align:'center'}, 
			  			   {title: "下单时间",name:"singleDate" ,width:120, sortable: true, type:'string', align:'center'},  
			  			  {title: "运输类型",name:"tranType" ,width:120, sortable: true, type:'string', align:'center'},
			 			  {title: "订单状态",name:"orderStatus" ,width:120, sortable: true, type:'string', align:'center'},
			 			  {title: "要求到达时间",name:"reqArrivalDate" ,width:120, sortable: true, type:'string', align:'center'},
			 			  {title: "要求提货时间",name:"reqDeliveryDate" ,width:120, sortable: true, type:'string', align:'center'},
			 			  {title: "提货地址",name:"shipperAddress" ,width:120, sortable: true, type:'string', align:'center'},
			 			  {title: "提货联系人电话",name:"shipperTel" ,width:80, sortable: true, type:'string', align:'center'},
			 			  {title: "提货联系人",name:"shipperContact" ,width:120, sortable: true, type:'string', align:'center'},
			 			  {title: "总件数",name:"quantity" ,width:120, sortable: true, type:'string', align:'center'},
			 			  {title: "订单总体积",name:"valume" ,width:80, sortable: true, type:'string', align:'center'},
			 			  {title: "订单总毛重",name:"weight" ,width:120, sortable: true, type:'string', align:'center'},
			 			  {title: "是否开票",name:"isHaveBill" ,width:120, sortable: true, type:'string', align:'center'},
			 			  {title: "是否已开单",name:"isHaveAccount" ,width:120, sortable: true, type:'string', align:'center'},
			 			  {title: "开票金额",name:"billAmount" ,width:80, sortable: true, type:'string', align:'center'},
			 			  {title: "预收付金额",name:"preAmount" ,width:120, sortable: true, type:'string', align:'center'},
			 			  {title: "已收付金额",name:"amountReceived" ,width:80, sortable: true, type:'string', align:'center'},
			 			  {title: "总金额",name:"totalAmount" ,width:120, sortable: true, type:'string', align:'center'},
			 			  {title: "有效期至",name:"toDate" ,width:120, sortable: true, type:'string', align:'center'},
			 			  {title: "备注",name:"remark" ,width:60, sortable: true, type:'string', align:'center'},
			 			  
			 			  {title: "",name:"fileUrl" ,width:150, sortable: true, type:'string',hidden:true, align:'center'},
			          	  {title: "",name:"fileRename" ,width:150, sortable: true, type:'string',hidden:true, align:'center'},
			          	  {title: "附件",name:"fileName" ,width:220, sortable: true, type:'string', align:'left',
				        	  renderer: function(val,item,rowIndex){
				        		  var html='';
				        		  if(item.fileUrl!='' && item.fileUrl!=null && val!='' && val!=null){
				        		  var urlArray=item.fileUrl.split(',');
					    		  var fileNameArray=val.split(',');
					    		  var length=urlArray.length;
						    		 for(var i=0;i<length;i++)
										{
											var thisFileName = fileNameArray[i];
											if(thisFileName!=''){
												html+="<span style='position: absolute;'><a target='_blank' "+
													" href='#' onclick='FileUtil.downLoad(\""+urlArray[i]+"\",\""+thisFileName+"\")'>"+thisFileName+"</a>"+
													" <span style='position: relative;top: 4px;'><a style='cursor:pointer' title='删除'" +
													"class='buttonRomve' onclick='OrderInfo.removeFile(\""+rowIndex+"\",\""+i+"\")'>&nbsp;&nbsp;</a></span></span><br> ";
											}
										}
				        		  }
							return  html;
					    	  }
			          	  }
			 			  
			 			  
			 			  ];
var order_mmg=null;

var _orderItems = new Array(
		'orderNo',
		'creditNo',
		'delveryNo',
		'orderBarcode',
		'buyPid',
		'buyName',
		'singleName',
		'singleDate',
		'tranType',
		'orderStatus',
		'reqArrivalDate',
		'reqDeliveryDate',
		'shipperAddress',
		'shipperTel',
		'shipperContact',
		'quantity',
		'valume',
		'billAmount',
		'isHaveBill',
		'isHaveAccount',
		'weight',
		'preAmount',
		'amountReceived',
		'totalAmount',
		'toDate',
		'fileName',
		'fileRename',
		'fileUrl',
		'remark'
	);




var OrderInfo = function(){	

	return {
		
		
		//初始化订单mmgrid
		orderGrid:function(){
			if(order_mmg!=null){
				return;
			}
			 order_mmg=$('#order_mmg').mmGrid({
			 				height: 160,
			 				cols:order_cols, 
			 				indexCol: false,
			 				indexColWidth: 30,
			 				cache:true,
			 				checkCol:true,
			 				fullWidthRows:true,
			 				multiSelect: true,
			 				nowrap : true,
			 				autoLoad : true,
			 				params : {creditNo:$("#businessNo").val()},
			 				url : 'xascf/order/orderPage.shtml'
			 		  });
			 
			 order_mmg.on("loadSuccess",function(e, data){
					OrderInfo.orderCount();
				});
		},
		
		

		// 订单新增
		order_add : function(){
			var jHtml = $(PUI.String.format($("#template_order").html(), {}));
			if (typeof buyer_mmg != 'undefined' && null != buyer_mmg && null != buyer_mmg.row(0)) {
				var html = "<option value=''></option>";
				var len = buyer_mmg[0].rows.length;
				jHtml.find("#orderBuyPid").empty();
				for ( var i = 0; i < len; i++) {
					var item = buyer_mmg.row(i);
					var val1 = item.buyPid;
					var val2 = item.buyName;
					html += "<option value=\'" + val1 + "\'>" + val2
							+ "</option>";
				}
				jHtml.find("#orderBuyPid").html(html);
			}
			$("#tabwin_add_content_order").html(jHtml[0].outerHTML);
			$("#tabwin_add_order").popup({
				md : true
			});
			PUI.plugin.init({}, $("#tabwin_add_content_order"));
			sns.valid.init($("#order_form"));
			$("#orderBuyName").val($("#orderBuyPid").find("option:selected").text());
		},
		
		// 新增一行表格记录
		addOrderRow : function() {
			if (!$("#order_form").isValid()) {
				return;
			}
//			if($("#order_fileUrl").val()==""){
//				PUI.MessageBox.alert("请上传附件！");
//				return;
//			}
			var orderNo=$("#orderNo").val();
			var index =parseInt( $("#order_rowIndex").val());
			for (var i = 0;i <order_mmg[0].rows.length; i++) {
				var item=order_mmg.row(i);
				if(null!=item){
					var oldNo=item.orderNo;
					if(oldNo==orderNo && index!=i){
						PUI.MessageBox.alert("订单号不能重复!");
						return;
					}
				}
			}
			var _orderItem = {
					orderNo : $("#orderNo").val(),
					delveryNo : $("#delveryNo").val(),
					orderBarcode : $("#orderBarcode").val(),
					buyPid:$("#orderBuyPid").val(),
					buyName:$("#orderBuyName").val(),
					singleName : $("#singleName").val(),
					singleDate : $("#singleDate").val(),
					tranType : $("#tranType").val(),
					orderStatus : $("#orderStatus").val(),
					reqArrivalDate : $("#reqArrivalDate").val(),
					reqDeliveryDate : $("#reqDeliveryDate").val(),
					shipperAddress : $("#shipperAddress").val(),
					shipperTel : $("#shipperTel").val(),
					shipperContact:$("#shipperContact").val(),
					quantity : $("#quantity").val(),
					valume : $("#valume").val(),
					billAmount : $("#billAmount").val(),
					isHaveBill : $("#isHaveBill").val(),
					isHaveAccount:$("#isHaveAccount").val(),
					weight : $("#weight").val(),
					preAmount : $("#preAmount").val(),
					amountReceived: $("#amountReceived").val(),
					totalAmount: $("#totalAmount").val(),
					toDate: $("#orderToDate").val(),
					fileName: $("#order_fileName").val(),
					fileRename: $("#order_fileReName").val(),
					fileUrl: $("#odder_url").val(),
					remark: $("#remark").val()
			};
			var index = $("#order_rowIndex").val();
			if (index != "") {
				var rowIndex = parseInt(index);
				order_mmg.updateRow(_orderItem, rowIndex);
			} else {
				order_mmg.addRow(_orderItem, order_mmg.rowsLength());
			}
			$("#tabwin_add_order").popup({display : false});
			OrderInfo.orderCount();
		},

		//取消关闭
		orderCancle : function() {
			$("#tabwin_add_order").popup({
				display : false
			});
		},
		
		//委托人下拉框
		buyChange :function(){
			$("#orderBuyName").val($("#orderBuyPid").find("option:selected").text());
		},
		
		//编辑运单信息
		editOrder : function() {
			if (order_mmg.selectedRowsIndex().length != 1) {
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			var items = order_mmg.selectedRows()[0];
			var rowIndex = order_mmg.selectedRowsIndex();
			var jHtml = $(PUI.String.format($("#template_order").html(), $
					.extend(items, {
						rowIndex : rowIndex
					})));
			if (typeof buyer_mmg != 'undefined' && null != buyer_mmg && null != buyer_mmg.row(0))  {
				var len = buyer_mmg[0].rows.length;
				jHtml.find("#orderBuyPid").empty();
				var html = "<option value=''></option>";
				for ( var i = 0; i < len; i++) {
					var item = buyer_mmg.row(i);
					var val1 = item.buyPid;
					var val2 = item.buyName;
					html += "<option value=\'" + val1 + "\'>" + val2
							+ "</option>";
				}
				jHtml.find("#orderBuyPid").html(html);
			}
			$("#tabwin_add_content_order").html(jHtml[0].outerHTML);
			$("#tabwin_add_order").popup({md : true});
			$("#orderBuyPid").val(items.buyPid);
			$("#orderBuyName").val(items.buyName);
			PUI.plugin.init({}, $("#tabwin_add_content_order"));
			sns.valid.init($("#tabwin_add_content_order > form"));
		},
		
		//计算总金额
		orderCount : function() {
			var allnum = 0;
			var allPrices = 0;
			if (null != order_mmg.row(0)) {
				for ( var i = 0; i < order_mmg[0].rows.length; i++) {
					var price = parseFloat(order_mmg.row(i).totalAmount);
					allnum += 1;
					allPrices += price;
				}
			}
			allPrices = allPrices.toFixed(2);
			var discountPrice=allPrices;
			if ($("#billRateVal").length > 0 ){
				discountPrice=allPrices*parseFloat($("#billRateVal").val())/100.0;
				discountPrice=discountPrice.toFixed(2)
			}
			$("#orderDisount").empty();
			$("#orderDisount").html(formatMoney(discountPrice)+'元');
			$("#order_pices").html(formatMoney(allPrices)+'元');
			$("#order_nums").html(allnum);
			$("#noteDiscountPrice").val(discountPrice);
			$("#notePrice").val(allPrices);
			//填充最大放款金额  历史剩余金额+票据折扣金额
//			var remaingAmountVal=parseFloat($("#histoteriRemaingAmount").val())+parseFloat(discountPrice);
			//填充最大放款金额 预付款无需添加历史剩余金额+票据折扣金额
			var remaingAmountVal=parseFloat(discountPrice);
			
			//查看是否低于剩余授信额度
			var lostAmount=$("#lostAmount").val();
			if(parseFloat(lostAmount)<remaingAmountVal){
				remaingAmountVal=parseFloat(lostAmount);
			}
			
			$("#remaingAmount").val(remaingAmountVal);
			$("#remaingAmountdiv").html(formatMoney(remaingAmountVal)+" 元");
			//订单运单不充当有效票据
//			var allNotePricedivVal=parseFloat($("#allNotePrice").val())+parseFloat(allPrices);
//			$("#allNotePricediv").html(formatMoney(allNotePricedivVal)+" 元(含本次)");
//			var llNoteDisPriceVal=parseFloat($("#allNoteDisPrice").val())+parseFloat(discountPrice);
//			$("#allNoteDisPricediv").html(formatMoney(llNoteDisPriceVal)+" 元(含本次)");
		},
		
		/**
		 * 表格删除一行记录
		 */
		removeOrderItem : function() {
			if (order_mmg.selectedRowsIndex().length == 0) {
				PUI.MessageBox.alert("请至少选中一条记录");
				return;
			}
			PUI.MessageBox
					.show({
						title : "删除订单信息",
						content : "你确定要删除订单信息吗？",
						type : "alert",
						buttons : [ {
							value : "是"
						}, {
							value : "否"
						} ],
						success : function(result) {
							if (result == "是") {
								while (order_mmg.selectedRowsIndex().length > 0) {
									order_mmg.removeRow(order_mmg.selectedRowsIndex()[0]);
								}
								OrderInfo.orderCount();
							}
						}
					});
		},
			// 文件上传
			addUploadPop : function(data){
				   var parameterArray = new Array();
					parameterArray.push("fileName");
					parameterArray.push("fileUrl");
					parameterArray.push("fileRename");
				   pluploadUtil.init(
						   "/XA_SCF/xascf/util/plupload.shtml",
							{type : "dingdan", requestName:$("#memberPid").val(), flag:"",title : "Image files", extensions : "jpg,gif,png",
							whatFile:"bank"},"",OrderInfo.fillUrlAndName,parameterArray);
				},
				//上传回调函数
			fillUrlAndName : function(fileArray,parameter){
				var aname=$("#order_fileName").val();
				var aurl=$("#odder_url").val();
				var fileRename=$("#order_fileReName").val();
				if(aname==''){
					$("#order_fileName").val(fileArray[2]);
				}else{
					$("#order_fileName").val(aurl+","+fileArray[2]);
				}
				if(aurl==''){
					$("#odder_url").val(fileArray[0]);
				}else{
					$("#odder_url").val(aurl+","+fileArray[0]);
				}
				if(fileRename==''){
					$("#order_fileReName").val(fileArray[1]);
				}else{
					$("#order_fileReName").val(fileRename+","+fileArray[1]);
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
							var item=order_mmg.row(rowIndex);
							var fileNameArray = item.fileName.split(",");
							var urlArray = item.fileUrl.split(",");
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
							item.fileName=newName;
							item.fileUrl=newUrl;
							order_mmg.updateRow(item, rowIndex); 
						}
					}
				});
			},
	};
}();
