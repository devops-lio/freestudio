var UserRole = function () {
	return {
		init: function() {
			
			PUI.plugin.init({}, $("#userRoleForm"));
			
			// 添加
			$("#userRoleAddBtn").bind("click", function() {
				var $checkedUnassignedRole = $("#unassignedRoleListDiv").find("input[name='unassignedRole']:checked");
				var checkedLength = $checkedUnassignedRole.length;
				if(checkedLength == 0)
				{
					PUI.MessageBox.alert("请在可分配角色中至少选中一条记录");
					return;
				}
				$checkedUnassignedRole.each(function() {
					UserRole.userRoleAdd($(this));
				});
			});
			// 全部添加
			$("#userRoleAddAllBtn").bind("click", function() {
				$("#unassignedRoleListDiv").find("input[name='unassignedRole']").each(function() {
					UserRole.userRoleAdd($(this));
				});
			});
			// 移除
			$("#userRoleRemoveBtn").bind("click", function() {
				var $checkedAssignedRole = $("#assignedRoleListDiv").find("input[name='assignedRole']:checked");
				var checkedLength = $checkedAssignedRole.length;
				if(checkedLength == 0)
				{
					PUI.MessageBox.alert("请在已分配角色中至少选中一条记录");
					return;
				}

				$checkedAssignedRole.each(function() {
					UserRole.userRoleRemove($(this));
				});
			});
			// 全部移除
			$("#userRoleRemoveAllBtn").bind("click", function() {
				$("#assignedRoleListDiv").find("input[name='assignedRole']").each(function() {
					UserRole.userRoleRemove($(this));
				});
			});
			// 保存
			$("#userRoleSaveBtn").bind("click", function() {
				UserRole.userRoleSave();
			});
			// 取消
			$("#userRoleCancelBtn").bind("click", function() {
				$("#tabwin_add_role").popup({display:false});
			});
		},
		// 添加
		userRoleAdd: function(elem) {
			var name = $.trim($(elem).attr("data-text"));
			var rolePid = $(elem).val();
			$("#assignedRoleListDiv").append("" +
				"<div class=\"row-fluid\">" +
                "	<div class=\"span12 control-group full\">" +
                "		<label class=\"checkbox\" >" +
                "			<input type=\"hidden\" name=\"assignedRolePidList\" value=\"" + rolePid + "\">" +
                "			<input type=\"checkbox\" name=\"assignedRole\" value=\"" + rolePid + "\" data-text=\"" + name + "\">" + name +
                "		</label>" +
                "	</div>" +
                "</div>");
			$(elem).closest("div.row-fluid").remove();
			PUI.plugin.init({}, $("#userRoleForm"));
		},
		// 移除
		userRoleRemove: function(elem) {
			var name = $.trim($(elem).attr("data-text"));
			var rolePid = $(elem).val();
			$("#unassignedRoleListDiv").append("" +
				"<div class=\"row-fluid\">" +
                "	<div class=\"span12 control-group full\">" +
                "		<label class=\"checkbox\" >" +
                "			<input type=\"checkbox\" name=\"unassignedRole\" value=\"" + rolePid + "\" data-text=\"" + name + "\">" + name +
                "		</label>" +
                "	</div>" +
                "</div>");
			$(elem).closest("div.row-fluid").remove();
			PUI.plugin.init({}, $("#userRoleForm"));
		},
		// 保存
		userRoleSave: function() {
			var data = $("#userRoleForm").serialize();
			if(data.indexOf("assignedRolePidList")<0)
				data +="&assignedRolePidList=";
			$.post("xascf/system/user/saveUserRoleList.shtml", data, function(data){
				if (data.result) {
					$("#tabwin_add_role").popup({display: false});
				}
				PUI.MessageBox.info(data.msg);
				mmg.load($("#userSearchForm").serialize());
			}, "json");
		}
	};
}();

$().ready(function() {
	UserRole.init();
});