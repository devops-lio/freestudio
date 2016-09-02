var UserSystem = function () {
	return {
		init: function() {
			
			PUI.plugin.init({}, $("#userSystemForm"));
			
			// 添加
			$("#userSystemAddBtn").bind("click", function() {
				var $checkedUnassignedSystem = $("#unassignedSystemListDiv").find("input[name='unassignedSystem']:checked");
				var checkedLength = $checkedUnassignedSystem.length;
				if(checkedLength == 0)
				{
					PUI.MessageBox.alert("请在可分配系统中至少选中一条记录");
					return;
				}
				$checkedUnassignedSystem.each(function() {
					UserSystem.userSystemAdd($(this));
				});
			});
			// 全部添加
			$("#userSystemAddAllBtn").bind("click", function() {
				$("#unassignedSystemListDiv").find("input[name='unassignedSystem']").each(function() {
					UserSystem.userSystemAdd($(this));
				});
			});
			// 移除
			$("#userSystemRemoveBtn").bind("click", function() {
				var $checkedAssignedSystem = $("#assignedSystemListDiv").find("input[name='assignedSystem']:checked");
				var checkedLength = $checkedAssignedSystem.length;
				if(checkedLength == 0)
				{
					PUI.MessageBox.alert("请在已分配系统中至少选中一条记录");
					return;
				}

				$checkedAssignedSystem.each(function() {
					UserSystem.userSystemRemove($(this));
				});
			});
			// 全部移除
			$("#userSystemRemoveAllBtn").bind("click", function() {
				$("#assignedSystemListDiv").find("input[name='assignedSystem']").each(function() {
					UserSystem.userSystemRemove($(this));
				});
			});
			// 保存
			$("#userSystemSaveBtn").bind("click", function() {
				UserSystem.userSystemSave();
			});
			// 取消
			$("#userSystemCancelBtn").bind("click", function() {
				$("#tabwin_add_system").popup({display:false});
			});
		},
		// 添加
		userSystemAdd: function(elem) {
			var name = $.trim($(elem).attr("data-text"));
			var pid = $(elem).val();
			$("#assignedSystemListDiv").append("" +
				"<div class=\"row-fluid\">" +
                "	<div class=\"span12 control-group full\">" +
                "		<label class=\"checkbox\" >" +
                "			<input type=\"hidden\" name=\"assignedSystemPidList\" value=\"" + pid + "\">" +
                "			<input type=\"checkbox\" name=\"assignedSystem\" value=\"" + pid + "\" data-text=\"" + name + "\">" + name +
                "		</label>" +
                "	</div>" +
                "</div>");
			$(elem).closest("div.row-fluid").remove();
			PUI.plugin.init({}, $("#userSystemForm"));
		},
		// 移除
		userSystemRemove: function(elem) {
			var name = $.trim($(elem).attr("data-text"));
			var id = $(elem).val();
			$("#unassignedSystemListDiv").append("" +
				"<div class=\"row-fluid\">" +
                "	<div class=\"span12 control-group full\">" +
                "		<label class=\"checkbox\" >" +
                "			<input type=\"checkbox\" name=\"unassignedSystem\" value=\"" + id + "\" data-text=\"" + name + "\">" + name +
                "		</label>" +
                "	</div>" +
                "</div>");
			$(elem).closest("div.row-fluid").remove();
			PUI.plugin.init({}, $("#userSystemForm"));
		},
		// 保存
		userSystemSave: function() {
			var data = $("#userSystemForm").serialize();
			if(data.indexOf("assignedSystemPidList")<0)
				data +="&assignedSystemPidList=";
			$.post("xascf/system/user/saveUserSystemList.shtml",data , function(data){
				if (data.result) {
					PUI.MessageBox.info(data.msg, null, {autoClose: true, timeOut: 997, afterClose: function() {
						$("#tabwin_add_system").popup({display: false});
						userQuery.query();
					}});
				} else {
					PUI.MessageBox.error(data.msg);
				}
			}, "json");
		}
	};
}();

$().ready(function() {
	UserSystem.init();
});