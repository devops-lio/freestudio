$(document).ready(function(){
	PUI.plugin.init();
	sns.valid.init($("form"));
});
var _cols = [
    { title:'编号', name:'indexNo' ,width:150, align:'center', sortable: true, type: 'object'},
    { title:'评估名称', name:'indexName' ,width:100, align:'center', sortable: true, type: 'object'},
    { title:'指标说明', name:'remark' ,width:280, align:'center', sortable: true, type: 'object'},
    { title:'权重(%)', name:'percentage' ,width:80, align:'center', sortable: true, type: 'object'},
    { title:'满分值', name:'fullMarks' ,width:80, align:'center', sortable: true, type: 'object'},
    { title:'规则名称', name:'ruleName' ,width:80, align:'center', sortable: true, type: 'object'},
    { title:'材料名称', name:'materialName' ,width:80, align:'center', sortable: true, type: 'object'},
    { title:'规则描述', name:'ruleDesc' ,width:80, align:'center', sortable: true, type: 'object'}
    
];

var templateIndex_mmg =  $("#templateIndex_mmg").mmGrid({
	height : 253,
	cols : _cols,
	url : 'xascf/rm/templateIndex/getPage.shtml',
	params : $("#indexQueryForm").serialize(),
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
 templateIndex_mmg.on('itemdblclick', function(event, item, rowIndex) {
		templateIndexDetail.doubleClick(item,rowIndex);    	
   });
var templateIndexDetail = function() {
	return {
		query : function(){
			templateIndex_mmg.load($("#indexQueryForm").serialize());
		},
		saveTemplateIndex:function(){
			if (!$("#indexEditorForm").isValid()) {
					return;
			}
			$("#indexEditorForm").find("#parentPid").val($("#indexQueryForm").find("#parentPid").val());
			$("#templatePid").val($("#treePid").val());
			var params = $("#indexEditorForm").serializeArray();
			$.post("xascf/rm/templateIndex/saveTemplateIndex.shtml",params,function(data){
			 		var message=data;
					if(message.indexOf('成功')>=0){
						templateIndexDetail.clearEditorForm();
						
						templateIndexDetail.query();
						var zTree = $.fn.zTree.getZTreeObj("tree");
						zTree.reAsyncChildNodes(null, "refresh");
						
					}
					PUI.MessageBox.info("保存成功!");
					
				},	"json");
				
		},
		add :function(){
			PUI.util.clearForm($("#indexEditorForm"));
		},
		clearEditorForm : function(){
			PUI.util.clearForm($("#indexEditorForm"));
		},
		/**双击*/
		doubleClick : function(item){
			templateIndexDetail.toEditForm(item);
		},
		/**编辑**/
		editor :function(){
			if ($("input[class='mmg-check']:checked").length != 1){
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			var item = templateIndex_mmg.selectedRows()[0];
			templateIndexDetail.toEditForm(item);
		},
		/**删除*/
		deleteTemplateIndex : function() {
			var str = new Array();
			$.each(templateIndex_mmg.selectedRows(), function(i, n) {
				str.push("indexPids=" + n.indexPid);
			});
			/**选中才能删除 */
			if (str == "") {
				PUI.MessageBox.alert("请至少选中一条记录");

			} else {
				PUI.MessageBox.show({
				    title: "删除模板指标信息",
				    content: "你确定要删除模板指标信息吗？",
				    type: "alert",
				    buttons: [{ value: "是" },{ value: "否" }],
				    success: function (result) {
				        if (result == "是") {
				        	$.post("xascf/rm/templateIndex/deleteTemplateIndex.shtml",
							str.join("&"), function(data) {
								if(data.indexOf('成功')>=0){
									PUI.MessageBox.info("删除成功!");
			        				templateIndexDetail.query();
			        				var zTree = $.fn.zTree.getZTreeObj("tree");
									zTree.reAsyncChildNodes(null, "refresh");
								}
							});
			        }
			    }
			});
			}
		},
		toEditForm : function(item) {
			$("#id").val(item.id);
			$("#indexPid").val(item.indexPid);
			$("#indexNo").val(item.indexNo);
			$("#indexName").focus().val(item.indexName);
			$("#indexEditorForm").find("#parentPid").val(item.parentPid);
			$("#percentage").val(item.percentage);
			$("#fullMarks").val(item.fullMarks);
			$("#remark").val(item.remark);
			$("#ruleNo").val(item.ruleNo);
			$("#ruleName").val(item.ruleName);
			$("#mappingMaterial").val(item.mappingMaterial);
			$("#materialName").val(item.materialName);
		}
		
	};
}();
 