var MenuQuery = function () {
	return {
		init: function() {
			var setting = {
				view: {
					removeHoverDom: MenuQuery.removeHoverDom
				},
				edit: {
					enable: true,
					showRemoveBtn: MenuQuery.showRemoveBtn,
					showRenameBtn: MenuQuery.showRenameBtn
				},
				async: {
					enable: true,
					url: "xascf/system/menu/getMenuJson.shtml",
					otherParam: ["systemPid", $("#systemPid").val()]
				},
				data: {
					key: {
						url: "none",
						name: "menuName"
					},
					simpleData: {
						enable: true,
						idKey: "resourcePid",
						pIdKey: "resourceParentPid"
					}
				},
				callback: {
					onAsyncSuccess: MenuQuery.onAsyncSuccess,
					beforeDrag: MenuQuery.beforeDrag,
					beforeDrop: MenuQuery.beforeDrop,
					beforeRemove: MenuQuery.beforeRemove,
					onClick: MenuQuery.onClick
				}
			};
			var t = $("#tree");
			t = $.fn.zTree.init(t, setting);
		},
		removeHoverDom: function(treeId, treeNode) {
			$("#addBtn_"+treeNode.tId).unbind().remove();
		},
		showRemoveBtn: function(treeId, treeNode) {
			return !treeNode.isFirstNode || treeNode.level != 0;
		},
		showRenameBtn: function showRenameBtn(treeId, treeNode) {
			return false;
		},
		onAsyncSuccess: function(event, treeId, treeNode, msg) {
			var zTree = $.fn.zTree.getZTreeObj(treeId);
			var rootNodes = zTree.getNodes();
			for (var i = 0; i < rootNodes.length; i++) {
				var nodes = zTree.transformToArray(rootNodes[i]);
				for (var j = 1; j < nodes.length; j++) {
					nodes[j].menuName = nodes[j].menuName + "[" + nodes[j].orderNo + "]";
					zTree.updateNode(nodes[j]);
				}
			}
			zTree.expandAll(true);
		},
		beforeDrag: function(treeId, treeNodes) {
			return false;
		},
		beforeDrop: function(treeId, treeNodes) {
			return false;
		},
		beforeRemove: function(treeId, treeNode) {
			PUI.MessageBox.show({
				title: "删除菜单信息",
				content: "你确定要删除吗？",
				type: "alert",
				buttons: [{ value: "是" },{ value: "否" }],
				success: function (result) {
					if (result == "是") {
						var zTree = $.fn.zTree.getZTreeObj(treeId);
						var nodes = zTree.getNodesByFilter(function(){return true;}, false, treeNode);
						var pid = treeNode.resourcePid;
						$.post("xascf/system/menu/deleteMenuByPid.shtml",  {pid:pid}, function(data) {
							var message=data;
							if(message.result){
								zTree.removeNode(treeNode);
							} 
							PUI.MessageBox.info(message.msg);
						}, "json");
					}
				}
			});
//			$("#" + treeNode.tId + "_remove").smoothConfirm("确定要删除吗？", {
//		        ok: function() {
//		        	var zTree = $.fn.zTree.getZTreeObj(treeId);
//					var nodes = zTree.getNodesByFilter(function(){return true;}, false, treeNode);
//					var pid = treeNode.resourcePid;
//					$.post("xascf/system/menu/deleteMenuByPid.shtml",  {pid:pid}, function(data) {
//						var message=data;
//						if(message.result){
//							zTree.removeNode(treeNode);
//						} 
//						PUI.MessageBox.info(message.msg);
//					}, "json");
//		        }
//		    });
			return false;
		},
		onClick: function(event, treeId, treeNode, clickFlag) {
			$.post("xascf/system/menu/getMenuDetails.shtml", {parentPid: treeNode.resourceParentPid,pid:treeNode.resourcePid}, function(data) {
				$("#menuDetailsDiv").html(data);
			});
		}
	};
}();

$().ready(function() {
	MenuQuery.init();
	$.post("xascf/system/menu/getMenuDetails.shtml", {parentPid: 0,pid:"RE20140901110533-A2088FE9265C9BE"}, function(data) {
				$("#menuDetailsDiv").html(data);
			});
});