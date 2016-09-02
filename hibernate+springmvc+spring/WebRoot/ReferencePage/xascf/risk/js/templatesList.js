 $(document).ready(function(){
 	PUI.plugin.init();
	sns.valid.init($("from"));
});
var _cols = [
	{ title:'模板编码', name:'templateCode' ,width:150, align:'center', sortable: true, type: 'String'},
	{ title:'模板名称', name:'templateName' ,width:150, align:'center', sortable: true, type: 'String'},
	{ title:'所属行业', name:'templateIndustry' ,width:100, align:'center', sortable: true, type: 'String'
	},
	{ title:'模板类型', name:'templateType' ,width:100, align:'center', sortable: true, type: 'String',
		renderer: function(val,item,rowIndex){
    		if(val=='1')
    			val='企业';
    		else if(val =='2')
    			val='个人';
    		else
    			val = '融资单';
    		return '<span >'+val+'</span>';
    	}},
	{ title:'是否默认', name:'isDefault' ,width:100, align:'center', sortable: true, type: 'String',
		renderer: function(val,item,rowIndex){
    		if(val=='1')
    			val='是';
    		else
    			val='否'
    		return '<span style="color:red;">'+val+'</span>';
    	}},
    { title:'描述', name:'remark' ,width:250, align:'center', sortable: true, type: 'String'}
    
];
var all_mmg =  $("#all_mmg").mmGrid({
	height : getAutoHeightByMmGrid($("#xascfMainPanel")),
	cols : _cols,
	url : 'xascf/rm/templates/getPage.shtml',
	params : $("#templatesListQueryForm").serialize(),
	method : 'post',
	autoLoad : true,
	showBackboard:false,
	checkCol : true,
	indexCol : true,
	indexColWidth : 15,
	sortName : 'id',
	sortStatus : 'desc',
	fullWidthRows : true,
	cache : false,
	multiSelect: true,
	plugins : [$('#all_pg').mmPaginator({})]
});
mmGridResizeListener(all_mmg, $(".page-content"));
var templatesList = function() {
	return {
		/**查询*/
		query : function() {
				all_mmg.load($("#templatesListQueryForm").serialize());
		},
		clear :function(){
			PUI.util.clearForm($("#templatesListQueryForm"));
		},
		saveTemplates:function(){
			if (!$("#templatesEditorForm").isValid()) {
				return;
			}
			$.post("xascf/rm/templates/saveTemplates.shtml",$("#templatesEditorForm").serialize(),function(data){  
				if(data.indexOf('成功')>=0){
					PUI.MessageBox.info(data);
					all_mmg.load($("#templatesListQueryForm").serialize());
					templatesList.cancle();
				}else{
					PUI.MessageBox.info(data);
				}
			});
		},
		/**配置评估因子**/
		templatesSet :function(){
			if ($("input[class='mmg-check']:checked").length != 1){
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			var item = all_mmg.selectedRows()[0];
			$.post("xascf/rm/templateIndex/getTemplateIndexList.shtml",{templatePid:item.templatePid}, function(data) {
				$("#xascfMainPanel").html(data);
			});
		},
		/**删除*/
		deleteTemplates : function() {
			if ($("input[class='mmg-check']:checked").length ==0){
				PUI.MessageBox.alert("请只是选中一条记录");
				return;
			}
			var str = new Array();
			$.each(all_mmg.selectedRows(), function(i, n) {
				str.push("templatePids=" + n.templatePid);
			});
			PUI.MessageBox.show({
			    title: "删除评估模板信息",
			    content: "你确定要删除评估模板信息吗？",
			    type: "alert",
			    buttons: [{ value: "是" },{ value: "否" }],
			    success: function (result) {
			        if (result == "是") {
			        	$.post("xascf/rm/templates/deleteTemplates.shtml",
						str.join("&"), function(data) {
			        		if(data.indexOf('成功')>=0){
								PUI.MessageBox.info("删除成功!");
								templatesList.query();
							}
						});
			        }
			    }
			});
		},
		add :function(){
			PUI.util.clearForm($("#templatesEditorForm"));
			$("#tabwin_add_template").popup({md:true});
		},
		edit:function(){
			if ($("input[class='mmg-check']:checked").length != 1){
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			var item = all_mmg.selectedRows()[0];
			PUI.util.dataToForm($("#templatesEditorForm"), item,"id");
			$("#tabwin_add_template").popup({md:true});
			
			
		},
		/**清空**/
		cancle : function(){
			$("#tabwin_add_template").popup({display:false});
		},
		templatesList : function(){
			Menu.forward('xascf/risk/jsp/templatesList.jsp');
		}
	};
}();