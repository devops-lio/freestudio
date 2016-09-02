var RoleQuery = function () {
	var mmg = null;
	return {
		init: function() {
			
			PUI.plugin.init();
			RoleQuery.initEvent();
			
			var cols = new Array(
		         { title:'角色编号', name:'roleCode' ,width:80, align:'center', sortable: true, type: 'string'},
		         { title:'角色名称', name:'roleName' ,width:80, align:'center', sortable: true, type: 'string'},
		         { title:'描述', name:'description' ,width:80, align:'center', sortable: true, type: 'string'}
		    );

			mmg = $("#mmg").mmGrid({
		     	height : getAutoHeightByMmGrid($(".page-content")),
		     	cols : cols,
		     	url : 'xascf/system/role/getRoleList.shtml',
		     	params : $("#roleQueryForm").serialize(),
		     	method : 'post',
		     	autoLoad : true,
		     	fullWidthRows : true,
		     	checkCol : true,
		     	cache : false,
		     	multiSelect: false,
		     	nowrap: true,
		     	plugins : [$('#pg').mmPaginator({})]
		    });
			
			mmGridResizeListener(mmg, $(".page-content"));
		},
		initEvent: function() {
			$("#queryBtn").on("click", function() {
				RoleQuery.load();
			});
			
			$("#resetBtn").on("click", function() {
				RoleQuery.reset();
			});
			
			$("#menuAddBtn").on("click", function() {
				RoleQuery.add();
			});
			
			$("#menuEditBtn").on("click", function() {
				RoleQuery.edit();
			});
			
			$("#menuDeleteBtn").on("click", function() {
				RoleQuery._delete();
			});
			
			$("#tabwin_add_content_role").on("click", ".save", function() {
				RoleQuery.save();
			});
			
			$("#tabwin_add_content_role").on("click", ".cancel", function() {
				RoleQuery.saveCancel();
			});
			
			$("#menuAssignBtn").on("click", function() {
				RoleQuery.menuAssign();
			});
			
			$("#nodeAssignBtn").on("click", function() {
				RoleQuery.nodeAssign();
			});
		},
		load: function() {
			if (null != mmg) {
				mmg.load($("#roleQueryForm").serialize());
			}
		},
		reset: function() {
			PUI.util.resetForm($("#roleQueryForm"));
		},
		add: function() {
			$("#tabwin_add_content_role").html(PUI.String.format($("#role-detail-template").html(), {}));
			sns.valid.init($("#tabwin_add_content_role").find("form"));
			$("#tabwin_add_role").popup({md:true});
		},
		edit: function() {
			if (mmg.selectedRowsIndex().length != 1){
				PUI.MessageBox.alert("请先选中一条记录");
				return;
			}
			
			var item = mmg.selectedRows()[0];
//			if(item.rolePid='RO20140826104518-7308BBDF2AA8E98'){
//				PUI.MessageBox.alert("超级管理员角色无法编辑!");
//				return;
//			}
			$("#tabwin_add_content_role").html(PUI.String.format($("#role-detail-template").html(), item));
			sns.valid.init($("#tabwin_add_content_role").find("form"));
			$("#tabwin_add_role").popup({md:true});
		},
		_delete: function() {
			if (mmg.selectedRowsIndex().length == 0){
				PUI.MessageBox.alert("请至少选中一条记录");
				return;
			}
			
			var params = "";
			var items = mmg.selectedRows();
			for (var i = 0;i < items.length; i++) {
//				if(items[i].rolePid='RO20140826104518-7308BBDF2AA8E98'){
//					PUI.MessageBox.alert("创建管理员角色无法删除!");
//					return;
//				}
				params+=items[i].rolePid+',';
			}
			
			PUI.MessageBox.show({
			    title: "删除角色",
			    content: "你确定要删除角色吗？",
			    type: "alert",
			    buttons: [{ value: "是" },{ value: "否" }],
			    success: function (result) {
			        if (result == "是") {
			        	$.post("xascf/system/role/deleteRole.shtml", {rolePids:params}, function(data) {
			        		var message=data;
							if(message.result){
								PUI.MessageBox.info(message.msg)
								RoleQuery.load();
							} else {
								PUI.MessageBox.error(message.msg);
							}
						}, "json");
			        }
			    }
			});
		},
		save: function() {
			var form = $("#tabwin_add_content_role").find("form");
			if (form.isValid()) {
				$.post("xascf/system/role/saveRole.shtml", form.serialize(), function(data){
					var message=data;
					if(message.result){
						PUI.MessageBox.info(message.msg)
						RoleQuery.load();
						$("#tabwin_add_role").popup({display:false});
					} else {
						PUI.MessageBox.error(message.msg);
					}
				}, "json");
			}
		},
		saveCancel: function() {
			$("#tabwin_add_role").popup({display: false});
		},
		menuAssign: function() {
			if (mmg.selectedRowsIndex().length != 1){
				PUI.MessageBox.alert("请先选中一条记录");
				return;
			}
			var item = mmg.selectedRows()[0];
			$.post("xascf/system/role/getRoleResource.shtml", {rolePid: item.rolePid,systemPid:item.systemPid}, function(data){
				$("#tabwin_add_content_menu").html(PUI.String.format(data, {}));
				$("#tabwin_add_menu").popup({md:true});
			});
		},
		nodeAssign: function() {
			if (mmg.selectedRowsIndex().length != 1){
				PUI.MessageBox.alert("请先选中一条记录");
				return;
			}
			var item = mmg.selectedRows()[0];
			$.post("xascf/system/role/getRoleNode.shtml", {rolePid: item.rolePid}, function(data){
				$("#tabwin_add_content_node").html(PUI.String.format(data, {}));
				$("#tabwin_add_node").popup({md:true});
			});
		}
	};
}();

$().ready(function() {
	RoleQuery.init();
});