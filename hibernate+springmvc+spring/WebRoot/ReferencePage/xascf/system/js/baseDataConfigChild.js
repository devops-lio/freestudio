$(document).ready(function(){
	PUI.plugin.init();
	sns.valid.init($("form"));
});


var _cols = [
	{ title:'主键', name:'id' ,width:250, align:'center',sortable: false, type: 'String', hidden:true},
    { title:'KEY', name:'code' ,width:150, align:'center', sortable: true, type: 'String'},
    { title:'中文值', name:'nameCn' ,width:120, align:'center', sortable: true, type: 'String'},
     { title:'英文值', name:'nameEn' ,width:120, align:'center', sortable: true, type: 'String'},
    { title:'排序号', name:'sequenceNo' ,width:120, align:'center', sortable: true, type: 'String'}
];
var _mmg=$("#mmg").mmGrid({
	height : getAutoHeightByMmGrid($("#xascfMainPanel")),
	cols : _cols,
	url : 'xascf/baseData/page.shtml',
	params : $("#basicDataChildQueryForm").serialize(),
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
mmGridResizeListener(_mmg, $(".page-content")); 	
var BaseDataConfigChild = function() {
	return {
		
		/**查询*/
		queryChild : function() {
            _mmg.load($("#basicDataChildQueryForm").serialize());
		},
		/**清空**/
		cancle : function(){
			$("#tabwin_baseData").popup({display:false});
		},
		/**清空**/
		clear : function(){
			PUI.util.resetForm($("#basicDataChildQueryForm"));
		},
		
		addChild:function(){
			var html = PUI.String.format($("#baseData-template-tab").html(), {});
			$("#tabwin_baseData_content").html(html);
			$("#tabwin_baseData").popup({md:true});
			PUI.plugin.init({}, $("#tabwin_baseData_content"));
			sns.valid.init($("#basicDataChildEditorForm"));
			$("#parentCode").val($("#parentCodeQuery").val());
		},
		/**
		 * 编辑
		 */
		editChild:function(){
			if (_mmg.selectedRowsIndex().length != 1){
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			var items = _mmg.selectedRows()[0];
			var rowIndex = _mmg.selectedRowsIndex();
			var html = PUI.String.format($("#baseData-template-tab").html(), $.extend(items, {rowIndex : rowIndex}));
			$("#tabwin_baseData_content").html(html);
			$("#tabwin_baseData").popup({md : true});
			PUI.plugin.init({}, $("#tabwin_baseData_content"));
			sns.valid.init($("#basicDataChildEditorForm"));
			
		},
		/**保存子项数据*/
		saveChild:function(){
			if(!$("#basicDataChildEditorForm").isValid()){
				return;
			}
			$.post("xascf/baseData/save.shtml",$("#basicDataChildEditorForm").serialize(),function(data){
				if(data.indexOf('成功')>=0){
					//保存按钮激活
					PUI.MessageBox.info(data);
					_mmg.load($("#basicDataChildQueryForm").serialize());
					$("#tabwin_baseData").popup({display:false}); 
				}else{
					PUI.MessageBox.info(data);
				}
			},"json");
			
		},
		/**删除*/
		deleteBasicDataChild:function(){
			if (_mmg.selectedRowsIndex().length == 0){
				PUI.MessageBox.alert("请至少选中一条记录!");
				return;
			}
			PUI.MessageBox.show({
				    title: "删除子项数据",
				    content: "你确定要删除选中子项数据吗？",
				    type: "alert",
				    buttons: [{ value: "是" },{ value: "否" }],
				    success: function (result) {
				        if (result == "是") {
				        	var item=_mmg.selectedRows();
							var ids=new Array();
							var codes=new Array();
							for(var i=0;i<item.length;i++){
								ids.push(item[i].id);
								codes.push(item[i].code);
							}
							var idsStr=ids.join(",");
							var codesStr=codes.join(",");
							$.post("xascf/baseData/delete.shtml",{ids:idsStr,codes:codesStr},function(data){
								PUI.MessageBox.info(data);
								_mmg.load($("#basicDataChildQueryForm").serialize());
							},"json")
			        	}
			    }
			});
		},
		backChild:function(){
			Menu.forward('xascf/system/jsp/baseDataConfig.jsp');
		}
	};
}();