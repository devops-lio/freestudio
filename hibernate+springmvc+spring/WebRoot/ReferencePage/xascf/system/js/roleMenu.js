var RoleMenu = function () {
	var _mmg = null;
	var lastResourceId = -1;
	var lastTreeNode = null;
	var historyFunctions = new Array();
	var setting = {
		async: {
			enable: true,
			url: "xascf/system/role/getRoleFunction.shtml",
			otherParam: ["rolePid", $("#rolePid").val(),"systemPid",  $("#systemPid2").val()]
		},
		data: {
				key: {
					url: "none",
					name: "resourceName"
				}
			},
		check: {
			enable: true,
			chkboxType: {
				"Y": "ps",
				"N": "ps" 
		    }
		},
		view: {
			dblClickExpand: false
		},
		callback: {
			onClick: function(e,treeId, treeNode) {
//				if (null != _mmg && -1 != lastResourceId) {
//					var items = _mmg.selectedRows();
//					historyFunctions[lastResourceId] = items;
//				}
			
				var zTree = $.fn.zTree.getZTreeObj("tree");
				zTree.expandNode(treeNode);
//				var resourceId=treeNode.id;
//				$("#resourceId").val(resourceId);
//				RoleMenu._mmgLoad();
//				lastResourceId = resourceId;
//				lastTreeNode = treeNode;
			},
			onAsyncSuccess: function(event, treeId, treeNode, msg) {
				var zTree = $.fn.zTree.getZTreeObj("tree");
				zTree.expandAll(true);
			}
//			onCheck: function(event, treeId, treeNode) {
//				if (null != _mmg && lastTreeNode == treeNode) {
//					if (treeNode.checked) {
//						_mmg.select(0);
//					} else {
//						_mmg.deselect('all');
//					}
//					return;
//				}
//				
//			}
		}
	};

	return {
		init: function() {
			// 保存
			$("#roleMenuSaveBtn").bind("click", function() {
				RoleMenu.roleMenuSave();
			});
			// 取消
			$("#roleMenuCancelBtn").bind("click", function() {
				RoleMenu.roleMenuCancel();
			});
			var t = $("#tree");
			t = $.fn.zTree.init(t, setting);
//			var _cols = new Array(
//			         { title:'操作编号', name:'operationCode' ,width:80, align:'center', sortable: true, type: 'string'},
//			         { title:'操作名称', name:'operationName' ,width:80, align:'center', sortable: true, type: 'string'},
//			         { title:'描述', name:'description' ,width:80, align:'center', sortable: true, type: 'string'}
//			    );
//			_mmg = $("#roleMenu_mmg").mmGrid({
//		     	height : 367,
//		     	cols : _cols,
//		     	url : 'upm/function/getPage.shtml',
//		     	params : $("#roleMenuForm").serialize(),
//		     	method : 'post',
//		     	autoLoad : false,
//		     	fullWidthRows : true,
//		     	checkCol : true,
//		     	cache : false,
//		     	multiSelect: true
//		    });
//			_mmg.on("loadSuccess",function(e, data){
//				var list=data.data.list;
//				for (var i = 0;i < list.length; i++) {
//					if(list[i].checked){
//						//设置选中
//						_mmg.select(i);
//					}
//				}
//				if (lastTreeNode.checked) {
//					_mmg.select(0);
//				} else {
//					_mmg.deselect(0);
//				}
//			});
//			$("#roleMenu_mmg").on("change", "input.mmg-check:first", function() {
//				var zTree = $.fn.zTree.getZTreeObj("tree");
//				var checked = $(this).val() == 'on' ? true : false;
//				zTree.checkNode(lastTreeNode, checked);
//				return false;
//			});
		},
//		_mmgLoad:function(){
//			_mmg.load($("#roleMenuForm").serialize());
//		},
		// 保存
		roleMenuSave: function() {
			var params = new Array({
				name: 'rolePid',
				value: $("#rolePid").val()
			});
			
			var zTree = $.fn.zTree.getZTreeObj("tree");
			var nodes = zTree.getCheckedNodes(true);
			for ( var i = 0; i < nodes.length; i++) {
				if (null == nodes[i].id || nodes[i].id == '') {
					continue;
				}
				params.push({name: 'functionPidList', value: nodes[i].functionPid});
//				params.push({name: 'deleteFunctionIdList', value: nodes[i].functionId});
			}
//			nodes = zTree.getCheckedNodes(false);
//			for ( var i = 0; i < nodes.length; i++) {
//				if (null == nodes[i].id || nodes[i].id == '') {
//					continue;
//				}
//				params.push({name: 'deleteFunctionIdList', value: nodes[i].functionId});
//			}
			// 当前操作
//			if(null!=_mmg && lastResourceId != -1){
//				var items = _mmg.selectedRows();
//				historyFunctions[lastResourceId] = items;
//			}
//			// 历史操作
//			for (var resourceId in historyFunctions) {
//				if (historyFunctions.hasOwnProperty(resourceId)) {
//					items = historyFunctions[resourceId];
//					params.push({name: "resourceIdList", value: resourceId});
//					for (var i = 0;i < items.length; i++) {
//						params.push({name: "functionIdList", value: items[i].functionId});
//					}
//				}
//			}
//			params.push({name: 'resourceIdList', value: -1});
//			params.push({name: 'deleteFunctionIdList', value: -1});
			params.push({name: 'functionPidList', value: -1});
			$.post("xascf/system/role/menuSave.shtml", params, function(data){
				if(data.result){
					RoleMenu.roleMenuCancel();
				} 
				PUI.MessageBox.info(data.msg);
			}, "json");
		},
		roleMenuCancel: function() {
			$("#tabwin_add_menu").popup({display:false});
			$("#tabwin_add_content_menu").empty();
		}
	};
}();

$().ready(function() {
	RoleMenu.init();
});