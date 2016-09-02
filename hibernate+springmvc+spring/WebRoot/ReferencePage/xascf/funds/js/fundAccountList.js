 $(document).ready(function(){
 	PUI.plugin.init();
	sns.valid.init($("form"));
});
		
var _cols = [
    { title:'逻辑ID', name:'fundAccountPid' ,width:180,hidden:true ,align:'center', sortable: true, type: 'object'},
    { title:'银行账号', name:'bankNo' ,width:180, align:'center', sortable: true, type: 'object'},
    { title:'账户名称', name:'accountName' ,width:180, align:'center', sortable: true, type: 'object'},
    { title:'账户别名', name:'accountOtherName' ,width:180, align:'center', sortable: true, type: 'object'},
    { title:'开户行全称', name:'theBank' ,width:180, align:'center', sortable: true, type: 'object'},
    { title:'用途', name:'accountUsage', width:120, align:'center', sortable: true, type: 'string', 
    	renderer: function(val){
    		 if(val=='01')
    			 val='融资款';
    		 else if(val=='02')
				 val='手续费';
			 else if(val=='03')
				 val='保证金'; 
			 else if(val=='04')
				 val='保理款';
			 else if(val=='05')
				 val='利息';
			 else if(val=='06')
				 val='其他';
			return val
		}
	},
    { title:'可用金额', name:'availableAmount' ,width:120, align:'center', sortable: true, type: 'object',
		 renderer: function(val){return formatMoney(val)+' 元'}},
    { title:'锁定金额', name:'lockedAmount' ,width:120, align:'center', sortable: true, type: 'object',
			 renderer: function(val){return formatMoney(val)+' 元'}},
    { title:'总金额', name:'totalAmount' ,width:120, align:'center', sortable: true, type: 'object',
				 renderer: function(val){return formatMoney(val)+' 元'}},
    { title:'创建时间', name:'createTimeStr' ,width:150, align:'center', sortable: true, type: 'object'},
];


var fundAccount_mmg =  $("#fundAccount_mmg").mmGrid({
	height : getAutoHeightByMmGrid($("#xascfMainPanel")),
	cols : _cols,
	url : 'xascf/fund/fundAccount/getFundAccountList.shtml',
	params : $("#fundAccountQueryForm").serialize(),
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
	plugins : [$('#pg').mmPaginator({})]
});
   fundAccount_mmg.on('itemdblclick', function(event, item, rowIndex) {
		fundAccountList.doubleClick(item,rowIndex);    	
   });
   mmGridResizeListener(fundAccount_mmg, $(".page-content"));
var fundAccountList = function() {
	return {
		/**查询*/
		query : function() {
            fundAccount_mmg.load($("#fundAccountQueryForm").serialize());
			
		},
		/**清空**/
		clearQueryForm : function(){
			PUI.util.clearForm($("#fundAccountQueryForm"));
		},
		/**双击*/
		doubleClick : function(item){
			fundAccountList.toEditForm(item);
		},
		add :function(){
		      
			$("#tabwin_add_fundAccount").popup({md:true});
			PUI.util.clearForm($("#fundAccountEditorForm"));
		},
		/**编辑**/
		editor :function(){
			if ($("input[class='mmg-check']:checked").length != 1){
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			var item = fundAccount_mmg.selectedRows()[0];
			fundAccountList.toEditForm(item);
		},
		cancle : function(){
			$("#tabwin_add_fundAccount").popup({display:false});
		},

		toEditForm : function(item) {
			var totalAmount = Number(item.totalAmount);
//			if(totalAmount!=0)
//			{
//				PUI.MessageBox.alert("总金额不为0，不能编辑!");
//				return;
//			}
			PUI.util.dataToForm($("#fundAccountEditorForm"), item,"id");
			$("#tabwin_add_fundAccount").popup({md:true});
		},
		saveFundAccount : function() {
			if (!$("#fundAccountEditorForm").isValid()) {
					return;
			}
			var bankNo = $("#bankNo").val();
//			if(!luhmCheck(bankNo))
//				return;
			var params = $("#fundAccountEditorForm").serializeArray();
			params.push({
				name: 'fundAccountModel.totalAmount',
				value: $("#totalAmount").val()
			});
			params.push({
				name: 'fundAccountModel.availableAmount',
				value: $("#availableAmount").val()
			});
			params.push({
				name: 'fundAccountModel.lockedAmount',
				value: $("#lockedAmount").val()
			});
			PUI.MessageBox.show({
				title: "保存",
				content: "请核对资金账号信息，一旦保存将无法修改！确定要保存吗？",
				type: "alert",
				buttons: [{ value: "是" },{ value: "否" }],
				success: function (result) {
				   if (result == "是") {
						$.post("xascf/fund/fundAccount/saveFundAccount.shtml", params, function(data){
						 		var message=data;
								if(message.result){
									$("#tabwin_add_fundAccount").popup({display:false});
									fundAccountList.query();
								}
								PUI.MessageBox.info(message.msg);
							},"json");
				   }
			    }
			});

		},


		/**删除*/
		deleteFundAccount : function() {
			var str = new Array();
			var fundAccountPids = "";
			var items = fundAccount_mmg.selectedRows();
			for(var i in items)
			{
				var totalAmount = Number(items[i].totalAmount);
				if(totalAmount!=0)
				{
					PUI.MessageBox.alert("总金额不为0，不能删除!");
					return;
				}
				str.push("bankNos=" + items[i].bankNo);
				fundAccountPids += items[i].fundAccountPid;

			}
			/**选中才能删除 */
			if (str == "") {
				PUI.MessageBox.alert("请至少选中一条记录");

			} else {
				PUI.MessageBox.show({
				    title: "删除资金账号信息",
				    content: "你确定要删除资金账号信息吗？",
				    type: "alert",
				    buttons: [{ value: "是" },{ value: "否" }],
				    success: function (result) {
				        if (result == "是") {
				        	$.post("xascf/fund/fundAccount/deleteFundAccount.shtml",
							str.join("&"), function(data) {
			 					var message=data;
								if(message.result){
			        				fundAccountList.query();
								}
								PUI.MessageBox.info(message.msg);
							});
							
			        }
			    }
			});
			}
		}
	};
}();

