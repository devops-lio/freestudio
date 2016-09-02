$(document).ready(function(){
	
});
var ship_cols=[
               {title: "运单号",name:"shipNo" ,width:120, sortable: true, type:'string', align:'center'},
 			   {title: "起运地",name:"startAddress" ,width:80, sortable: true, type:'string', align:'center'}, 
 			   {title: "目的地",name:"aimName" ,width:120, sortable: true, type:'string', align:'center'},  
			  {title: "状态",name:"status" ,width:60, sortable: true, type:'string', align:'center',
				  renderer: function(val){
						 if(val=='1')
							 val='已签收';
						 else if(val=='2')
							 val='运输中';
					return val;}},
			  {title: "发货人名称",name:"sendName" ,width:120, sortable: true, type:'string', align:'center'},
			  {title: "",name:"sendCode" ,width:120, sortable: true,hidden:true, type:'string', align:'center'},
			  {title: "发货人电话",name:"sendPhone" ,width:120, sortable: true, type:'string', align:'center'},
			  {title: "收货人名称",name:"receiverName" ,width:80, sortable: true, type:'string', align:'center'},
			  {title: "收货人电话",name:"receiverPhone" ,width:120, sortable: true, type:'string', align:'center'},
			  {title: "货物名称",name:"goodsName" ,width:120, sortable: true, type:'string', align:'center'},
			  {title: "件数",name:"quantity" ,width:80, sortable: true, type:'string', align:'center'},
			  {title: "重量",name:"weight" ,width:80, sortable: true, type:'string', align:'center'},
			  {title: "运费",name:"transferFee" ,width:120, sortable: true, type:'string', align:'center'},
			  {title: "有效期",name:"toDate" ,width:60, sortable: true, type:'string', align:'center'},
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
										"class='buttonRomve' onclick='ShipInfo.removeFile(\""+rowIndex+"\",\""+i+"\")'>&nbsp;&nbsp;</a></span></span><br> ";
								}
							}
	        		  }
				return  html;
		    	  }}
			  ];
ship_mmg=$('#ship_mmg').mmGrid({
	width:'auto',
	height: 160,
	cols: ship_cols, 
	indexCol: false,
	indexColWidth: 30,
	checkCol:true,
	fullWidthRows:true,
	multiSelect: true,
	nowrap : true,
	autoLoad : true,
	params : {creditNo:$("#businessNo").val()},
	url : 'xascf/ship/page.shtml'
});

var _shipItems = new Array(
		'shipNo',
		'startAddress',
		'aimName',
		'status',
		'sendCode',
		'sendName',
		'sendPhone',
		'receiverName',
		'receiverPhone',
		'goodsName',
		'quantity',
		'weight',
		'transferFee',
		'toDate',
		'fileUrl',
		'fileName',
		'fileRename'
	);

ship_mmg.on("loadSuccess",function(e, data){
	ShipInfo.shipCount();
});
var ShipInfo = function(){	

	return {
		removeFile:function(rowIndex,i){
			
			PUI.MessageBox.show({
				title: "删除附件",
				content: "你确定要删除该附件吗？",
				type: "confirm",
				buttons: [{ value: "是" },{ value: "否" }],
				success: function (result) {
					if (result == "是") {
						var item=ship_mmg.row(rowIndex);
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
						ship_mmg.updateRow(item, rowIndex); 
					}
				}
			})
		},
		//发货人下拉
		senderChange :function(){
			$("#sendName").val($("#sendCode").find("option:selected").text());
		},
		// 运单新增
		ship_add : function() {
			var jHtml = $(PUI.String.format($("#template_ship").html(), {}));
			if (typeof buyer_mmg != 'undefined' && null != buyer_mmg && null != buyer_mmg.row(0)) {
				var html = "<option value=''></option>";
				var len = buyer_mmg[0].rows.length;
				jHtml.find("#sendCode").empty();
				for ( var i = 0; i < len; i++) {
					var item = buyer_mmg.row(i);
//					if(item.preBillType == "2"){				
						var val1 = item.buyPid;
						var val2 = item.buyName;
						html += "<option value=\'" + val1 + "\'>" + val2
								+ "</option>";
//					}
				}
				jHtml.find("#sendCode").html(html);
			}
			$("#tabwin_add_content_ship").html(jHtml[0].outerHTML);
			$("#tabwin_add_ship").popup({md : true});
			PUI.plugin.init({}, $("#tabwin_add_content_ship"));
			sns.valid.init($("#ship_form"));
		},
		
		// 新增一行表格记录
		addShipRow : function() {
			if (!$("#ship_form").isValid()) {
				return;
			}
//			if($("#ship_fileUrl").val()==""){
//				PUI.MessageBox.alert("请上传附件！");
//				return;
//			}
			var shipNo=$("#shipNo").val();
			var index = parseInt($("#ship_rowIndex").val());
			for (var i = 0;i <ship_mmg[0].rows.length; i++) {
				var item=ship_mmg.row(i);
				if(null!=item){
					var oldNo=item.shipNo;
					if(oldNo==shipNo && index!=i){
						PUI.MessageBox.alert("运单号不能重复!");
						return;
					}
				}
			}
			var _shipItem = {
					shipNo : $("#shipNo").val(),
					carrierCode : $("#carrierCode").val(),
					carrierName : $("#carrierName").val(),
					carNo : $("#carNo").val(),
					mainDriverName:$("#mainDriverName").val(),
					shipConsigneeName : $("#mainDriverName").val(),
					startAddress : $("#startAddress").val(),
					aimName : $("#aimName").val(),
					payType : $("#payType").val(),
					payPrice : $("#payPrice").val(),
					status : $("#status").val(),
					sendCode: $("#sendCode").val(),
					sendName : $("#sendCode").find("option:selected").text(),
					sendPhone : $("#sendPhone").val(),
					receiverName:$("#receiverName").val(),
					shipConsigneeName : $("#receiverName").val(),
					receiverPhone : $("#receiverPhone").val(),
					goodsName : $("#goodsName").val(),
					quantity : $("#quantity").val(),
					weight:$("#weight").val(),
					transferFee : $("#transferFee").val(),
					toDate : $("#toDate").val(),
					fileUrl:$("#ship_fileUrl").val(),
					fileName:$("#ship_fileName").val(),
					fileRename:$("#ship_fileRename").val()
				};
			
			var index = $("#ship_rowIndex").val();
			if (index != "") {
				var rowIndex = parseInt(index);
				ship_mmg.updateRow(_shipItem, rowIndex);
			} else {
				ship_mmg.addRow(_shipItem, ship_mmg.rowsLength());
			}
			$("#tabwin_add_ship").popup({
				display : false
			});
			ShipInfo.shipCount();
		},

		//取消关闭
		shipCancle : function() {
			$("#tabwin_add_ship").popup({
				display : false
			});
		},
		
		//编辑运单信息
		editShip : function() {
			if (ship_mmg.selectedRowsIndex().length != 1) {
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			var items = ship_mmg.selectedRows()[0];
			var rowIndex = ship_mmg.selectedRowsIndex();
			var jHtml = $(PUI.String.format($("#template_ship").html(), $
					.extend(items, {
						rowIndex : rowIndex
					})));
			if (typeof buyer_mmg != 'undefined' && null != buyer_mmg && null != buyer_mmg.row(0)) {
				var len = buyer_mmg[0].rows.length;
				jHtml.find("#sendCode").empty();
				var html = "<option value=''></option>";
				for ( var i = 0; i < len; i++) {
					var item = buyer_mmg.row(i);
					var val1 = item.buyPid;
					var val2 = item.buyName;
					html += "<option value=\'" + val1 + "\'>" + val2
							+ "</option>";
				}
				jHtml.find("#sendCode").html(html);
			}else{
				jHtml.find("#sendCode").empty();
				var html = "<option value=\'" + items.sendCode + "\'>" + items.sendName
							+ "</option>";
				jHtml.find("#sendCode").html(html);
			}
			$("#tabwin_add_content_ship").html(jHtml);
			$("#tabwin_add_ship").popup({md : true});
			$("#sendCode").val(items.sendCode);
			$("#sendName").val(items.sendName);
			$("#status").val(items.status);
			PUI.plugin.init({}, $("#tabwin_add_content_ship"));
			sns.valid.init($("#tabwin_add_content_ship > form"));
		},
		
		//计算总金额
		shipCount : function() {
			var allnum = 0;
			var allPrices = 0;
			var discountPrice=0;
			if (null != ship_mmg.row(0)) {
				for ( var i = 0; i < ship_mmg[0].rows.length; i++) {
					var price = parseFloat(ship_mmg.row(i).transferFee);
					allnum += 1;
					allPrices += price;
				}
			}
			allPrices = allPrices.toFixed(2);
			discountPrice=allPrices;
			if ($("#billRateVal").length > 0 ){
				discountPrice=allPrices*parseFloat($("#billRateVal").val())/100.0;
				discountPrice=discountPrice.toFixed(2)
			}
			$("#ship_pices").html(formatMoney(allPrices)+'元');
			$("#ship_dis_pices").html(formatMoney(discountPrice)+'元');
			$("#ship_nums").html(allnum);
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
//			$("#allNotePricediv").html(formatMoney(allNotePricedivVal)+" 元");
//			var llNoteDisPriceVal=parseFloat($("#allNoteDisPrice").val())+parseFloat(discountPrice);
//			$("#allNoteDisPricediv").html(formatMoney(llNoteDisPriceVal)+" 元");
		},
		
		/**
		 * 表格删除一行记录
		 */
		removeShipItem : function() {
			if (ship_mmg.selectedRowsIndex().length == 0) {
				PUI.MessageBox.alert("请至少选中一条记录");
				return;
			}
			PUI.MessageBox
					.show({
						title : "删除运单信息",
						content : "你确定要删除运单信息吗？",
						type : "alert",
						buttons : [ {
							value : "是"
						}, {
							value : "否"
						} ],
						success : function(result) {
							if (result == "是") {
								while (ship_mmg.selectedRowsIndex().length > 0) {
									ship_mmg.removeRow(ship_mmg.selectedRowsIndex()[0]);
								}
								ShipInfo.shipCount();
							}
						}
					});
		},
		// 文件上传
		addUploadPop : function(data){
//			   pluploadUtil.init(
//					   "/XA_SCF/xascf/util/plupload.shtml",
//					   {type : "预付运单", requestName : $("#memberName").val()},
//					   {title : "Image files", extensions : "jpg,gif,png"},
//					   ShipInfo.fillUrlAndName
//					);
			   var parameterArray = new Array();
				parameterArray.push("fileName");
				parameterArray.push("fileUrl");
				parameterArray.push("fileRename");
			   pluploadUtil.init(
					   "/XA_SCF/xascf/util/plupload.shtml",
						{type : "yundan", requestName:$("#memberPid").val(), flag:"",title : "Image files", extensions : "jpg,gif,png",
						whatFile:"bank"},"",ShipInfo.fillUrlAndName,parameterArray);
			},
			//上传回调函数
		fillUrlAndName : function(fileArray,parameter){
			var aname=$("#ship_fileName").val();
			var aurl=$("#ship_fileUrl").val();
			var fileRename=$("#ship_fileRename").val();
			if(aname==''){
				$("#ship_fileName").val(fileArray[2]);
			}else{
				$("#ship_fileName").val(aurl+","+fileArray[2]);
			}
			if(aurl==''){
				$("#ship_fileUrl").val(fileArray[0]);
			}else{
				$("#ship_fileUrl").val(aurl+","+fileArray[0]);
			}
			if(fileRename==''){
				$("#ship_fileRename").val(fileArray[1]);
			}else{
				$("#ship_fileRename").val(fileRename+","+fileArray[1]);
			}
//			$("#ship_fileUrl").val(array[0]); // 文件路径
//			$("#ship_fileName").val(array[2]); // 原始文件名
//			$("#ship_fileRename").val(array[1]); // 重命名
//			$("#show_ship_fileRename").html(array[1]);
		}
	};
}();
