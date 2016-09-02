$(document).ready(function(){
	PUI.plugin.init();
	sns.valid.init($("form"));
});

var _cols = [
	{ title:'主键', name:'id' ,width:250, align:'center',sortable: false, type: 'String',hidden:true},
    { title:'中文名称', name:'nameCn' ,width:120, align:'center', sortable: true, type: 'String'},
    { title:'说明', name:'reMark' ,width:120, align:'center', sortable: true, type: 'String'},
    { title:'操作', name:'nameEn' ,width:120, align:'center', sortable: true, type: 'String',
    	renderer: function(val,item,rowIndex){
		   return  '<a class="btnPrice" href="javascript:void(0)" onclick="BaseDataConfig.check(\''+item.code+'\',\''+item.nameCn+'\')">子项编辑</a>'
	 }}
];

var _mmg =  $("#mmg").mmGrid({
	height : getAutoHeightByMmGrid($("#xascfMainPanel")),
	cols : _cols,
	url : 'xascf/baseData/page.shtml',
	params : $("#basicDataQueryForm").serialize(),
	method : 'post',
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

//_mmg.on('itemdblclick', function(event, item, rowIndex) {
//	var parentCode=item.code;
//	$.post("xascf/baseData/toChildDataBasejsp.shtml",{parentCode:parentCode},function(data){
//		$("#xascfMainPanel").html(data); 
//	},"html");
//})

mmGridResizeListener(_mmg, $(".page-content")); 

var BaseDataConfig = function() {
	return {
		
		/**查询*/
		query : function() {
            _mmg.load($("#basicDataQueryForm").serialize());
		},
		/**清空**/
		clear : function(){
			PUI.util.resetForm($("#basicDataQueryForm"));
		},
		/**清空新增表单*/
		addFormclear:function(){
			PUI.util.resetForm($("#basicDataEditorForm"));
			$("#id").val("");
			$("#tempCode").val("");
		},
		
		/**
		 * 查看
		 */
		check:function(code,nameCn){
			var parentCode=code;
			$.post("xascf/baseData/toChildDataBasejsp.shtml",{parentCode:parentCode,nameCn:nameCn},function(data){
				$("#xascfMainPanel").html(data); 
			},"html");
		}
	};
}();

		
