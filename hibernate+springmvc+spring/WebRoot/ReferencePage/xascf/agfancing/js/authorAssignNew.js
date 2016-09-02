var setting = {
			view: {
				selectedMulti: false
			},
			async: {
				enable: true,
				url:"xascf/agFancingSO/authorAssignTree.shtml",
				otherParam: ["solutionPid", $("#solutionPid").val()]
			},
			data: {
				key: {
					url: "none",
					name: "authorName"
				},
				simpleData: {
					enable: true,
					idKey: "authorCode",
					pIdKey: "parentCode"
				}
			},
			check: {
			enable: true,
			chkboxType: {
				"Y": "ps",
				"N": "ps" 
		    	}
			},
			callback: {
				onAsyncSuccess: onAsyncSuccess				
				}
};

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

var AuthorSet=function(){
	return{
		//取消
		cancle:function(){
			$("#tabwin_add_assign").popup({display:false});
			$("#tabwin_add_content_assign").empty();
		},
		//保存
		save:function(){
			debugger
			var params = new Array({
				name: 'solutionPid',
				value: $("#solutionPid").val()
			});
			
			var zTree = $.fn.zTree.getZTreeObj("tree");
			var nodes = zTree.getCheckedNodes(true);
			for ( var i = 0; i < nodes.length; i++) {
				//过滤掉父节点
				if (null == nodes[i].parentCode || nodes[i].parentCode == '') {
					continue;
				}
				params.push({name: 'authorCodePidList', value: nodes[i].authorCode});
			}
			$.post("xascf/agFancingSO/authorSave.shtml", params, function(data){
				if(data.result){
					AuthorSet.cancle();
				} 
				PUI.MessageBox.info(data.msg);
			}, "json");
		}
	}
}();

$(document).ready(function(){
	$.fn.zTree.init($("#tree"), setting);
});

 