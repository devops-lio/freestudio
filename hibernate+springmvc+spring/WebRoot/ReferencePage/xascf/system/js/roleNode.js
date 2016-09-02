var _cols = [
    { title:'逻辑ID', name:'nodePid' ,width:100,hidden:true,align:'center', sortable: true, type: 'object'},
    { title:'流程名称', name:'flowName' ,width:100,align:'center', sortable: true, type: 'object'},
    { title:'流程对象', name:'flowMapObject' ,width:100,align:'center', sortable: true, type: 'object'},
    { title:'节点名称', name:'nodeName' ,width:100, align:'center', sortable: true, type: 'object'},
    { title:'节点字段', name:'nodeMapField' ,width:100, align:'center', sortable: true, type: 'object'},
    { title:'字段值', name:'fieldValue' ,width:50, align:'center', sortable: true, type: 'object'}
];


var mmg_node =  $("#mmg_node").mmGrid({
	height : getAutoHeightByMmGrid($("#xascfMainPanel")),
	cols : _cols,
	url : 'xascf/system/nodeDefinition/page.shtml',
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
mmg_node.on("loadSuccess",function(e, data){
	//已分配的流程节点默认选中
	var list=data.data.list;
	var nodePids = $("#nodePids").val();
	for (var i in list) {
		if(nodePids.indexOf(list[i].nodePid)>0){
			mmg_node.select(parseInt(i));
		}
	}

});

var roleNode = function () {

	return {
		// 保存
		roleNodeSave: function() {
			var params = new Array({
				name: 'rolePid',
				value: $("#rolePid").val()
			});
			var items = mmg_node.selectedRows();
			params.push({name: 'nodePidList', value: "-1"});
			for(var i in items){
				params.push({name: 'nodePidList', value: items[i].nodePid});
			}
			$.post("xascf/system/role/roleNodeSave.shtml", params, function(data){
				if(data.result){
					roleNode.cancel();
				} 
				PUI.MessageBox.info(data.msg);
			}, "json");
		},
		cancel: function() {
			$("#tabwin_add_node").popup({display:false});
			$("#tabwin_add_content_node").empty();
		}
	};
}();

$().ready(function() {
//	RoleMenu.init();
});