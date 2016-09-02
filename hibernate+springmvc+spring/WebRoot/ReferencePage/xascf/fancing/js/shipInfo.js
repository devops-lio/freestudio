$(document).ready(function(){
	
});
var ship_cols=[{title: "运单号",name:"shipNo" ,width:120, sortable: true, type:'string', align:'center'},
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
		cols: ship_cols, 
		indexCol: true,
		indexColWidth: 30,
		checkCol:true,
		fullWidthRows:true,
		multiSelect: true,
		nowrap : true,
		autoLoad : false,
		params : {fancingOrderNo:$("#facingOrderNo").val()},
		url : 'xascf/shipOrder/page.shtml'
  });
  ship_mmg.on("loadSuccess",function(e, data){
	ShipInfo.shipCount();
  });
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
		'shipStatus'
	);
var ShipInfo = function(){	
	return{
		shipCount:function(){
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
			$("#ship_pices").empty();
			$("#ship_nums").empty();
			$("#ship_pices").html(allPrices);
			$("#ship_nums").html(allnum);
		},
		/**
		 * 编辑运单信息
		 */
		editShip :function(){
			if (ship_mmg.selectedRowsIndex().length != 1){
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			var items = ship_mmg.selectedRows()[0];
			var rowIndex =ship_mmg.selectedRowsIndex();
			var jHtml = $(PUI.String.format($("#template_ship").html(), $.extend(items, {rowIndex: rowIndex})));
				if (null!=buyer_mmg && null != buyer_mmg.row(0)){
					var len =buyer_mmg[0].rows.length;
					jHtml.find("#shipConsigneePid").empty();
					 var html="<option value=''></option>";
					for(var i=0;i<len;i++){
						var item=buyer_mmg.row(i);
						var val1=item.customersubPid;
						var val2=item.customerName;
						html+="<option value=\'"+val1+"\'>"+val2+"</option>";
					}
				}
			jHtml.find("#shipConsigneePid").html(html);
			$("#tabwin_add_content_ship").html(jHtml[0].outerHTML);
			$("#tabwin_add_ship").popup({md:true});
			$("#shipConsigneePid").val(items.shipConsigneePid);
			$("#shipStatus").val(items.shipStatus);
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
						ShipInfo.shipCount();
					}
				}
			});
		},
		//收货采购商下拉
		consigneeChange :function(){
			$("#shipConsigneeName").val($("#shipConsigneePid").find("option:selected").text());
		},
		//新增一行表格记录
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
					shipStatus:$("#shipStatus").val()
			};
			if (!$("#ship_form").isValid()) {
				return ;
			}
			var index=$("#ship_rowIndex").val();
			if ( index!= "") {
				var rowIndex=parseInt(index);
				ship_mmg.updateRow(_shipItem, rowIndex);
			} else {
				ship_mmg.addRow(_shipItem, ship_mmg.rowsLength());
			}
			$("#tabwin_add_ship").popup({display:false});
			ShipInfo.shipCount();
		},
		ship_add : function() {
			 var jHtml = $(PUI.String.format($("#template_ship").html(), {}));
			 var html="<option value=''></option>";
			if (buyer_mmg!='undefined'&& null!=buyer_mmg && null != buyer_mmg.row(0)){
				var len =buyer_mmg[0].rows.length;
				jHtml.find("#shipConsigneePid").empty();
				for(var i=0;i<len;i++){
					var item=buyer_mmg.row(i);
					var val1=item.customersubPid;
					var val2=item.customerName;
					html+="<option value=\'"+val1+"\'>"+val2+"</option>";
				}
			}
			jHtml.find("#shipConsigneePid").html(html);
			$("#tabwin_add_content_ship").html(jHtml[0].outerHTML);
			$("#tabwin_add_ship").popup({md:true});
			PUI.plugin.init({}, $("#tabwin_add_content_ship"));
			sns.valid.init($("#ship_form"));
		},
		//取消关闭
		shipCancle : function(){
			$("#tabwin_add_ship").popup({display:false});
		}
	};
}();
