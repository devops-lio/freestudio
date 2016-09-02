var setting = {
			view: {
				selectedMulti: false
			},
			async: {
				enable: true,
				url:"xascf/rm/templateIndex/getTreeNode.shtml",
				otherParam: ["treePid", $("#treePid").val()]
			},
			data: {
				key: {
					url: "none",
					name: "indexName"
				},
				simpleData: {
					enable: true,
					idKey: "indexPid",
					pIdKey: "parentPid"
				}
			},
			callback: {
				onAsyncSuccess: onAsyncSuccess,
				onClick: onClick
				}
};
function onClick(event, treeId, treeNode, clickFlag){
	var indexPid=treeNode.indexPid;
	$.post("xascf/rm/templateIndex/getTemplateIndexDetail.shtml",{indexPid:indexPid}, function(data) {
		$("#indexDiv").html(data);
	});
	
}


function onAsyncSuccess(event, treeId, treeNode, msg) {
	var zTree = $.fn.zTree.getZTreeObj(treeId);
	var rootNodes = zTree.getNodes();
	for (var i = 0; i < rootNodes.length; i++) {
		var nodes = zTree.transformToArray(rootNodes[i]);
		for (var j = 1; j < nodes.length; j++) {
			nodes[j].rmName = nodes[j].rmName + "[" + nodes[j].rmRate + "%]";
			zTree.updateNode(nodes[j]);
		}
	}
	zTree.expandAll(true);
}
$(document).ready(function(){
	$.fn.zTree.init($("#tree"), setting);
});

 