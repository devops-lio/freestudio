$(document).ready(function(){
	PUI.plugin.init();
	sns.valid.init($("form"));
});
var _cols = [
//   { title:'编号', name:'code' ,width:80, align:'center', sortable: true, type: 'object'},
    { title:'材料名称', name:'typeName' ,width:80, align:'center', sortable: true, type: 'object'},
    { title:'权重(%)', name:'materialWeights' ,width:80, align:'center', sortable: true, type: 'object'},
    { title:'序号', name:'orderNo' ,width:80, align:'center', sortable: true, type: 'object'},
    { title:'是否必填', name:'isRequired' ,width:80, align:'center', sortable: true, type: 'object',
        	renderer: function(val,item,rowIndex){
    		if(val=='1')
    			val='是';
    		else
    			val='否'
    		return val;
    	}
	}
];

var materialDefine_mmg =  $("#materialDefine_mmg").mmGrid({
	height : 260,
	cols : _cols,
	url : 'xascf/rm/materialDefine/getPage.shtml',
	params : $("#materialDefineQueryForm").serialize(),
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
mmGridResizeListener(materialDefine_mmg, $(".page-content"));


var materialDefineDetail = function() {
	return {
		query : function(){
			materialDefine_mmg.load($("#materialDefineQueryForm").serialize());
		},
		clearQueryForm : function(){
			PUI.util.resetForm($("#materialDefineQueryForm"));
		},
		saveMaterialDefine:function(){
			if (!$("#materialDefineEditorForm").isValid()) {
					return;
			}
			var params = $("#materialDefineEditorForm").serializeArray();
			$.post("xascf/rm/materialDefine/saveMaterialDefine.shtml",params,function(data){
			 		var message=data;
					if(message.indexOf('成功')>=0){
						materialDefineDetail.query();
						materialDefineDetail.cancle();
					}
					PUI.MessageBox.info(message);
				},"json");
		},
		add :function(){
			PUI.util.clearForm($("#materialDefineEditorForm"));
			var $materialDefineEditorForm = $("#materialDefineEditorForm");
			var $materialDefineQueryForm = $("#materialDefineQueryForm");
			$materialDefineEditorForm.find("#parentCode").val($materialDefineQueryForm.find("#parentCode").val());
			$materialDefineEditorForm.find("#materialType").val($materialDefineQueryForm.find("#materialType").val());

			$("#tabwin_add_childMaterial").popup({md:true});
		},
		cancle : function(){
			$("#tabwin_add_childMaterial").popup({display:false});
		},
		/**编辑**/
		editor :function(){
			if ($("input[class='mmg-check']:checked").length != 1){
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			var item = materialDefine_mmg.selectedRows()[0];
			materialDefineDetail.toEditForm(item);
		},
		/**删除*/
		deleteMaterialDefine : function() {
			var str = new Array();
			$.each(materialDefine_mmg.selectedRows(), function(i, n) {
				str.push("pids=" + n.pid);
			});
			/**选中才能删除 */
			if (str == "") {
				PUI.MessageBox.alert("请至少选中一条记录");

			} else {
				PUI.MessageBox.show({
				    title: "删除材料定义信息",
				    content: "你确定要删除材料定义信息吗？",
				    type: "alert",
				    buttons: [{ value: "是" },{ value: "否" }],
				    success: function (result) {
				        if (result == "是") {
				        	$.post("xascf/rm/materialDefine/deleteMaterialDefine.shtml",
							str.join("&"), function(data) {
								if(data.indexOf('成功')>=0){
									PUI.MessageBox.info("删除成功!");
			        				materialDefineDetail.query();
								}
							});
			        	}
			    	}
				});
			}
		},
		toEditForm : function(item) {
			PUI.util.dataToForm($("#materialDefineEditorForm"), item,"id");
			$("#tabwin_add_childMaterial").popup({md:true});
			$("#isRequired").val(item.isRequired).trigger("liszt:updated");

		},
		returnMaterialList : function(){
			Menu.forward('xascf/risk/jsp/materialDefineList.jsp');
		}

	};
}();
 