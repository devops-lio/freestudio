 $(document).ready(function(){
	PUI.plugin.init();
	sns.valid.init($("form"));
});
		
var _cols = [
    { title:'逻辑ID', name:'parameterPid' ,width:180,hidden:true ,align:'center', sortable: true, type: 'object'},
    { title:'参数编码', name:'parameterCode' ,width:180,align:'center', sortable: true, type: 'object'},
    { title:'描述', name:'parameterDesc' ,width:180, align:'center', sortable: true, type: 'object'},
    { title:'值', name:'parameterValue' ,width:180, align:'center', sortable: true, type: 'object'},
    { title:'备注', name:'remark' ,width:80, align:'center', sortable: true, type: 'object'}
];


var _mmg =  $("#mmg").mmGrid({
	height : 220,
	cols : _cols,
	url : 'xascf/fancingParatemer/page.shtml',
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
   _mmg.on('itemdblclick', function(event, item, rowIndex) {
		FancingParameterList.doubleClick(item,rowIndex);    	
   });

var FancingParameterList = function() {
	return {
		/**删除*/
		deleteParameter : function() {
			var str = new Array();
			$.each(_mmg.selectedRows(), function(i, n) {
				str.push("parameterPids=" + n.parameterPid);
			});
			/**选中才能删除 */
			if (str == "") {
				PUI.MessageBox.alert("请至少选中一条记录");

			} else {
				PUI.MessageBox.show({
				    title: "删除系统参数信息",
				    content: "你确定要删除系统参数信息吗？",
				    type: "alert",
				    buttons: [{ value: "是" },{ value: "否" }],
				    success: function (result) {
				        if (result == "是") {
				        	$.post("xlctp/dataconfig/systemParameterAction!deleteParameter.shtml",
							str.join("&"), function(data) {
								if(data.indexOf('成功')>0){
								PUI.MessageBox.info("删除成功!");
			        			_mmg.load();
								}
							});
							
			        }
			    }
			});
			}
		},
		doubleClick : function(item) {
			FancingParameterList.toEditForm(item);
		},
		edit : function() {
			if ($("input[class='mmg-check']:checked").length != 1){
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			var item = _mmg.selectedRows()[0];
			FancingParameterList.toEditForm(item);
		},
		
		toEditForm : function(item) {
			$("#parameterPid").val(item.parameterPid);
			$("#parameterCode").focus().val(item.parameterCode);
			$("#parameterValue").val(item.parameterValue);
			$("#parameterDesc").val(item.parameterDesc);
			$("#remark").val(item.remark);
		},

		saveSystemParameter : function() {
			if (!$("#systemParameterEditorForm").isValid()) {
					return;
			}
			var params = $("#systemParameterEditorForm").serializeArray();
			$.post("xascf/fancingParatemer/save.shtml",params,function(data){
			 		var message=data;
					if(message.indexOf('成功')>0){
						FancingParameterList.clear();
						_mmg.load();
					}
					PUI.MessageBox.info(message);
				},"json");

		},
		clear : function(){
			PUI.util.resetForm($("#systemParameterEditorForm"));
			$("#parameterPid").val("");
		}
	};
}();

