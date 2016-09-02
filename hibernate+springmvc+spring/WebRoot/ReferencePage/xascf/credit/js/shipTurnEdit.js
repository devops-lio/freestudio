var shipTurn_cols=[
                   {title: "回单编号",name:"turnNo" ,width:120, sortable: true, type:'string', align:'center'},
                   {title: "",name:"businessNo" ,width:80, sortable: true,hidden:true, type:'string', align:'center'},
     			   {title: "运输订单号",name:"customerOrderNo" ,width:80, sortable: true, type:'string', align:'center'},
     			   {title: "物流运单号",name:"shipNo" ,width:120, sortable: true, type:'string', align:'center'}, 
     			   {title: "运输派车单号",name:"dispatchOrder" ,width:120, sortable: true, type:'string', align:'center'},
     			   {title: "车牌号",name:"carNo" ,width:120, sortable: true, type:'string', align:'center'},
     			   {title: "到期日期",name:"toDate" ,width:120, sortable: true, type:'string', align:'center'},
     			   {title: "发货人名称",name:"buyName" ,width:120, sortable: true, type:'string', align:'center'},
     			   {title: "发货人pid",name:"buyPid" ,width:120, sortable: true,hidden:true, type:'string', align:'center'},
     			   {title: "起运地",name:"startPlace" ,width:80, sortable: true, type:'string', align:'center'}, 
     			   {title: "目的地",name:"toPlace" ,width:120, sortable: true, type:'string', align:'center'},  
     			   {title: "收货人名称",name:"consigneeName" ,width:120, sortable: true, type:'string', align:'center'},  
     			   {title: "收货地址",name:"consigneeAddress" ,width:120, sortable: true, type:'string', align:'center'},  
    			  {title: "签回人",name:"signPerson" ,width:120, sortable: true, type:'string', align:'center'},
    			  {title: "签回时间",name:"signTime" ,width:120, sortable: true, type:'string', align:'center'},
    			  {title: "客户回执人",name:"confirmCustomer" ,width:120, sortable: true, type:'string', align:'center'},
    			  {title: "客户回执时间",name:"confirmTime" ,width:120, sortable: true, type:'string', align:'center'},
    			  {title: "件数",name:"quantity" ,width:120, sortable: true, type:'string', align:'center'},
    			  {title: "重量",name:"weight" ,width:120, sortable: true, type:'string', align:'center'},
    			  {title: "体积",name:"volume" ,width:120, sortable: true, type:'string', align:'center'},
    			  {title: "总金额",name:"totalPrice" ,width:120, sortable: true, type:'string', align:'center',
    				  renderer: function(val,item,rowIndex){
    			    		return	formatMoney(val)+'元';}},
    			  {title: "签收金额",name:"signPrice" ,width:120, sortable: true, type:'string', align:'center',
    			    			renderer: function(val,item,rowIndex){
    			    	    		if(null!=val)
    			    				return	formatMoney(val)+'元';
    			    	    		else return '';}},
              	  
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
         									"class='buttonRomve' onclick='ShipTurnEdit.removeFile(\""+rowIndex+"\",\""+i+"\")'>&nbsp;&nbsp;</a></span></span><br> ";
         							}
         						}
                 		  }
         			return  html;
         	    	  }
               	  }
              	  
              	  
              	  ];
var shipTurn_mmg=null;

var _shipTurnItems = new Array(
		'turnNo',
		'businessNo',
		'customerOrderNo',
		'shipNo',
		'dispatchOrder',
		'carNo',
		'toDate',
		'buyName',
		'buyPid',
		'startPlace',
		'toPlace',
		'consigneeName',
		'consigneeAddress',
		'signPerson',
		'signTime',
		'confirmCustomer',
		'confirmTime',
		'quantity',
		'weight',
		'volume',
		'totalPrice',
		'signPrice',
		'fileUrl',
		'fileName',
		'fileRename'
	);


var ShipTurnEdit = function(){	

	return {
		
		//表格初始化
		shipTurnGrid:function(){
			if(shipTurn_mmg!=null){
				return;
			}
			   shipTurn_mmg=$('#shipTurn_mmg').mmGrid({
			    				width:'auto',
			    				height: 160,
			    				cols: shipTurn_cols, 
			    				indexCol: false,
			    				indexColWidth: 30,
			    				checkCol:true,
			    				fullWidthRows:true,
			    				multiSelect: true,
			    				nowrap : true,
			    				autoLoad : true,
			    				params : {businessNo:$("#businessNo").val()},
			    				url : 'xascf/shipTurn/page.shtml?TYPE='+$("#billTypeStatus").val()
			    		  });
			   shipTurn_mmg.on("loadSuccess",function(e, data){
					ShipTurnEdit.shipTurnCount();
			 	});
		},
		// 回单新增
		shipTurn_add : function() {
			var jHtml = $(PUI.String.format($("#template_shipTurn").html(), {}));
			if (typeof buyer_mmg != 'undefined' && null != buyer_mmg && null != buyer_mmg.row(0)) {
				var html = "<option value=''></option>";
				var len = buyer_mmg[0].rows.length;
				jHtml.find("#turnBuyPid").empty();
				for ( var i = 0; i < len; i++) {
					var item = buyer_mmg.row(i);
					var val1 = item.buyPid;
					var val2 = item.buyName;
					html += "<option value=\'" + val1 + "\'>" + val2
							+ "</option>";
				}
				jHtml.find("#turnBuyPid").html(html);
			}
			$("#tabwin_add_content_shipTurn").html(jHtml[0].outerHTML);
			$("#tabwin_add_shipTurn").popup({
				md : true
			});
			PUI.plugin.init({}, $("#tabwin_add_content_shipTurn"));
			sns.valid.init($("#shipTurn_form"));
			$("#turnBuyName").val($("#turnBuyPid").find("option:selected").text());
		},
		
		// 新增一行表格记录
		addshipTurnRow : function() {
			if (!$("#shipTurn_form").isValid()) {
				return;
			}
			var turnNo=$("#turnNo").val();
			var index = parseInt( $("#shipTurn_rowIndex").val());
			for (var i = 0;i <shipTurn_mmg[0].rows.length; i++) {
				var item=shipTurn_mmg.row(i);
				if(null!=item){
					var oldNo=item.turnNo;
					if(oldNo==turnNo && index!=i){
						PUI.MessageBox.alert("回单号不能重复!");
						return;
					}
				}
			}
			var _shipTurnItem = {
					turnNo : $("#turnNo").val(),
					businessNo : $("#businessNo").val(),
					customerOrderNo : $("#customerOrderNo").val(),
					shipNo : $("#turnShipNo").val(),
					dispatchOrder:$("#dispatchOrder").val(),
					carNo : $("#carNo").val(),
					toDate : $("#shipTurntoDate").val(),
					buyName : $("#turnBuyName").val(),
					buyPid : $("#turnBuyPid").val(),
					startPlace : $("#startPlace").val(),
					toPlace : $("#shipTurnToPlace").val(),
					consigneeName : $("#shipTurnConsigneeName").val(),
					consigneeAddress : $("#consigneeAddress").val(),
					signPerson:$("#signPerson").val(),
					signTime : $("#signTime").val(),
					confirmCustomer : $("#confirmCustomer").val(),
					confirmTime : $("#confirmTime").val(),
					quantity : $("#shipTurnquantity").val(),
					weight:$("#shipTurnweight").val(),
					volume : $("#shipTurnvolume").val(),
					totalPrice : $("#totalPrice").val(),
					signPrice : $("#signPrice").val(),
					fileUrl:$("#shipTurn_fileUrl").val(),
					fileName:$("#shipTurn_fileName").val(),
					fileRename:$("#shipTurn_fileRename").val()
				};
			var index = $("#shipTurn_rowIndex").val();
			if (index != "") {
				var rowIndex = parseInt(index);
				shipTurn_mmg.updateRow(_shipTurnItem, rowIndex);
			} else {
				shipTurn_mmg.addRow(_shipTurnItem, shipTurn_mmg.rowsLength());
			}
			$("#tabwin_add_shipTurn").popup({
				display : false
			});
			ShipTurnEdit.shipTurnCount();
			
		},
		//收货采购商下拉
		consigneeChange :function(){
			$("#turnBuyName").val($("#turnBuyPid").find("option:selected").text());
		},
		//取消关闭
		shipTurnCancle : function() {
			$("#tabwin_add_shipTurn").popup({
				display : false
			});
		},
		
		//编辑运单信息
		editShipTurn : function() {
			if (shipTurn_mmg.selectedRowsIndex().length != 1) {
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			var items = shipTurn_mmg.selectedRows()[0];
			var rowIndex = shipTurn_mmg.selectedRowsIndex();
			var jHtml = $(PUI.String.format($("#template_shipTurn").html(), $.extend(items, {rowIndex : rowIndex})));
			if (typeof buyer_mmg != 'undefined' && null != buyer_mmg && null != buyer_mmg.row(0)) {
				var len = buyer_mmg[0].rows.length;
				jHtml.find("#turnBuyPid").empty();
				var html = "<option value=''></option>";
				for ( var i = 0; i < len; i++) {
					var item = buyer_mmg.row(i);
					var val1 = item.buyPid;
					var val2 = item.buyName;
					html += "<option value=\'" + val1 + "\'>" + val2
							+ "</option>";
				}
				jHtml.find("#turnBuyPid").html(html);
				$("#tabwin_add_content_shipTurn").html(jHtml[0].outerHTML);
			}else{
				jHtml.find("#turnBuyPid").empty();
				var html = "<option value=\'" + items.buyPid + "\'>" + items.buyName
							+ "</option>";
				jHtml.find("#turnBuyPid").html(html);
				$("#tabwin_add_content_shipTurn").html(jHtml[0].outerHTML);
			}
			$("#tabwin_add_shipTurn").popup({md : true});
			$("#turnBuyPid").val(items.buyPid);
			$("#turnBuyName").val(items.buyName);
//			$("#tabwin_add_content_shipTurn > #toPlace").val(items.toPlace);
//			$("#tabwin_add_content_shipTurn > #consigneeName").val(items.consigneeName);
			$("#turnBuyName").val(items.buyName);
			PUI.plugin.init({}, $("#tabwin_add_content_shipTurn"));
			sns.valid.init($("#tabwin_add_content_shipTurn > form"));
			
		},
		
		//计算总金额
		shipTurnCount : function() {
			var allnum = 0;
			var allPrices = 0;
			if (null!=shipTurn_mmg && null != shipTurn_mmg.row(0)) {
				for ( var i = 0; i < shipTurn_mmg[0].rows.length; i++) {
					var price = parseFloat(shipTurn_mmg.row(i).totalPrice);
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
			$("#shipTurn_pices").html(formatMoney(allPrices)+'元');
			$("#shipTurn_nums").html(allnum);
			$("#shipTurnDisount").empty();
			$("#shipTurnDisount").html(formatMoney(discountPrice)+'元');
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
		 * 表格删除一行记录
		 */
		removeShipTurnItem : function() {
			if (shipTurn_mmg.selectedRowsIndex().length == 0) {
				PUI.MessageBox.alert("请至少选中一条记录");
				return;
			}
			PUI.MessageBox.show({
						title : "删除回单信息",
						content : "你确定要删除回单信息吗？",
						type : "alert",
						buttons : [{value : "是"}, {value : "否"}],
						success : function(result) {
							if (result == "是") {
								while (shipTurn_mmg.selectedRowsIndex().length > 0) {
									shipTurn_mmg.removeRow(shipTurn_mmg.selectedRowsIndex()[0]);
								}
								ShipTurnEdit.shipTurnCount();
							}
						}
					});
		},
		// 文件上传
		addUploadPop : function(){
			   var parameterArray = new Array();
				parameterArray.push("fileName");
				parameterArray.push("fileUrl");
				parameterArray.push("fileRename");
			   pluploadUtil.init(
					   "/XA_SCF/xascf/util/plupload.shtml",
						{type : "huidan", requestName:$("#memberPid").val(), flag:"",title : "Image files", extensions : "jpg,gif,png",
						whatFile:"bank"},"",ShipTurnEdit.fillUrlAndName,parameterArray);
			},
			
			//上传回调函数
			fillUrlAndName : function(fileArray,parameter){
				var aname=$("#shipTurn_fileName").val();
				var aurl=$("#shipTurn_fileUrl").val();
				var fileRename=$("#shipTurn_fileRename").val();
				if(aname==''){
					$("#shipTurn_fileName").val(fileArray[2]);
				}else{
					$("#shipTurn_fileName").val(aname+","+fileArray[2]);
				}
				if(aurl==''){
					$("#shipTurn_fileUrl").val(fileArray[0]);
				}else{
					$("#shipTurn_fileUrl").val(aurl+","+fileArray[0]);
				}
				if(fileRename==''){
					$("#shipTurn_fileRename").val(fileArray[1]);
				}else{
					$("#shipTurn_fileRename").val(fileRename+","+fileArray[1]);
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
							var item=shipTurn_mmg.row(rowIndex);
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
							shipTurn_mmg.updateRow(item, rowIndex); 
						}
					}
				});
				}	
			
	
	};
}();
$(document).ready(function(){
	if (null == shipTurn_mmg) {
		
	}
});