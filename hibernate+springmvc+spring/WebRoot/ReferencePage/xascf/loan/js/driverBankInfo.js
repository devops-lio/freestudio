$(document).ready(function(){
});
var driver_cols=[
          {title: "",name:"driverbanknoPid" ,width:120,hidden:true, sortable: true, type:'string', align:'center'},
          {title: "司机名称",name:"driverName" ,width:120, sortable: true, type:'string', align:'center'},
          {title: "司机身份证号",name:"driverIdNo" ,width:80, sortable: true, type:'string', align:'center'},
          {title: "银行账号",name:"driverNo" ,width:80, sortable: true, type:'string', align:'center'},
          {title: "放款金额",name:"loanPrice" ,width:80, sortable: true, type:'string', align:'center',
        	  renderer: function(val){return formatMoney(val)+' 元'}}
          ];
 var driver_mmg=null;
var _driverBankItems = new Array(
		'driverbanknoPid',
		'driverName',
		'driverNo',
		'driverIdNo',
		'loanPrice'
	);
var DriverBankInfo = function(){	
	return{
		
		_init:function(){
			if (null != driver_mmg) {
				return;
			}
			driver_mmg=$('#driver_mmg').mmGrid({
				width:'auto',
				height: 160,
				cols: driver_cols, 
				checkCol:true,
				fullWidthRows:true,
				multiSelect: true,
				nowrap : true,
				autoLoad : true,
				params : {fancingOrderNo:$("#businessNo").val()},
				url : 'xascf/fancing/getFancingDriverList.shtml'
			});
			 driver_mmg.on("loadSuccess",function(e, data){
				 DriverBankInfo.countPrices();
			})
		},
		//表格新增
		driverAdd : function(val) {
			var html = $(PUI.String.format($("#template_driver").html(), {}));
			$("#tabwin_add_content_driver").html(html);
			$("#tabwin_add_driver").popup({md:true});
			PUI.plugin.init({}, $("#tabwin_add_content_driver"));
			sns.valid.init($("#driver_form"));
			if (null!=driver_mmg && null != driver_mmg.row(0)){
				var len =driver_mmg[0].rows.length;
				for (var i = 0;i < len; i++) {
					 $("#driverExist").val($("#driverExist").val()+driver_mmg.row(i)['driverbanknoPid']+',');
				}
			}
		},
		//新增一行表格记录
		addDriverRow :function (){
			if (!$("#driver_form").isValid()) {
				return ;
			}
			var _rootItem = {
					driverbanknoPid:$("#driverbanknoPid").val(),
					driverName:$("#driverName").val(),
					driverNo:$("#driverNo").val(),
					driverIdNo:$("#driverIdNo").val(),
					loanPrice:$("#loanPrice").val()
			};
			if ($("#tabwin_add_content_driver input[name=rowIndex]").val() != "") {
				var rowIndex=parseInt($("#tabwin_add_content_driver input[name=rowIndex]").val());
				driver_mmg.updateRow(_rootItem, rowIndex);
			} else {
				driver_mmg.addRow(_rootItem, driver_mmg.rowsLength());
			}
			$("#tabwin_add_driver").popup({display:false});
			$("#driverExist").val($("#driverExist").val()+$("#driverbanknoPid").val()+',');
			 DriverBankInfo.countPrices();
		},
		
		// 表格删除一行记录
		removeDriverItem: function() {
			if (driver_mmg.selectedRowsIndex().length == 0){
				PUI.MessageBox.alert("请至少选中一条记录");
				return;
			}
			PUI.MessageBox.show({
				title: "删除司机账号信息",
				content: "你确定要删除司机账号信息 吗？",
				type: "alert",
				buttons: [{ value: "是" },{ value: "否" }],
				success: function (result) {
					if (result == "是") {
						while (driver_mmg.selectedRowsIndex().length > 0) {
							var data=driver_mmg.selectedRows();
							var len =data.length;
							for (var i = 0;i < len; i++) {
								var driverbanknoPid=data[i]['driverbanknoPid'];
								$("#driverExist").val($("#driverExist").val().replace(new RegExp(driverbanknoPid,'gm'),''));
							}
							driver_mmg.removeRow(driver_mmg.selectedRowsIndex()[0]);
						}
					}
					 DriverBankInfo.countPrices();
				}
			});
		},
		//编辑
		edit:function(){
			if (driver_mmg.selectedRows().length != 1) {
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			var items = driver_mmg.selectedRows()[0];
			var rowIndex = driver_mmg.selectedRowsIndex();
			var html = $(PUI.String.format($("#template_driver").html(), $.extend(items, {rowIndex : rowIndex})));
			$("#tabwin_add_content_driver").html(html);
			$("#tabwin_add_driver").popup({md : true});
			PUI.plugin.init({}, $("#tabwin_add_content_driver"));
			sns.valid.init($("#driver_form"));
		},
		/**
		 * 计算总价格、总数量
		 */
		countPrices:function(){
			var allPrices=0;
			if (null != driver_mmg.row(0)) {
				for (var i = 0;i < driver_mmg[0].rows.length; i++) {
					var price=parseFloat(driver_mmg.row(i).loanPrice);
					allPrices+=price;
				}
			}
			allPrices=allPrices.toFixed(2);
			$("#driverPices").empty();
			$("#driverPices").html(formatMoney(allPrices)+' 元');
		},
		//取消关闭
		cancle : function(){
			$("#tabwin_add_driver").popup({display:false});
		}
	};
}();
