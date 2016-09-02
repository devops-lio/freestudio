$(document).ready(function(){
	PUI.plugin.init();
	sns.valid.init($("form"));
});

var _cols = [
    { title:'编号', name:'code' ,width:80, align:'center', sortable: true, type: 'object'},
    { title:'权重(%)', name:'materialWeights' ,width:80, align:'center', sortable: true, type: 'object'},
    { title:'名称', name:'typeName' ,width:80, align:'center', sortable: true, type: 'object'},
    { title:'序号', name:'orderNo' ,width:80, align:'center', sortable: true, type: 'object'},
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

var materialDefineList = function() {
	return {
		query : function(){
			materialDefine_mmg.load($("#materialDefineQueryForm").serialize());
		},
		/**清空**/
		clear : function(){
			PUI.util.resetForm($("#materialDefineQueryForm"));
		},
		/**
		 * 子材料定义
		 */
		childMaterialDefine:function(){
			if (materialDefine_mmg.selectedRowsIndex().length != 1){
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			var item = materialDefine_mmg.selectedRows()[0];
			$.post("xascf/rm/materialDefine/getMaterialDefineDetail.shtml",{code:item.code,materialType:item.materialType,parentName:item.typeName},
					function(data){    
				$("#xascfMainPanel").html(data); 
			});  
		}

	};
}();


