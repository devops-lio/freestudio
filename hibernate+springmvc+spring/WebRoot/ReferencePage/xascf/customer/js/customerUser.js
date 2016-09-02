var CustomerUser = function () {
	return {
		init: function() {
			
			PUI.plugin.init({}, $("#customerUserForm"));
			
			// 添加
			$("#customerUserAddBtn").bind("click", function() {
				var $checkedUnassignedUser = $("#unassignedUserListDiv").find("input[name='unassignedUser']:checked");
				var checkedLength = $checkedUnassignedUser.length;
				if(checkedLength == 0)
				{
					PUI.MessageBox.alert("请在可分配用户中至少选中一条记录");
					return;
				}
				$checkedUnassignedUser.each(function() {
					CustomerUser.customerUserAdd($(this));
				});
			});
			// 全部添加
			$("#customerUserAddAllBtn").bind("click", function() {
				$("#unassignedUserListDiv").find("input[name='unassignedUser']").each(function() {
					CustomerUser.customerUserAdd($(this));
				});
			});
			// 移除
			$("#customerUserRemoveBtn").bind("click", function() {
				var $checkedAssignedUser = $("#assignedUserListDiv").find("input[name='assignedUser']:checked");
				var checkedLength = $checkedAssignedUser.length;
				if(checkedLength == 0)
				{
					PUI.MessageBox.alert("请在已分配角色中至少选中一条记录");
					return;
				}

				$checkedAssignedUser.each(function() {
					CustomerUser.customerUserRemove($(this));
				});
			});
			// 全部移除
			$("#customerUserRemoveAllBtn").bind("click", function() {
				$("#assignedUserListDiv").find("input[name='assignedUser']").each(function() {
					CustomerUser.customerUserRemove($(this));
				});
			});
			// 保存
			$("#customerUserSaveBtn").bind("click", function() {
				CustomerUser.customerUserSave();
			});
			// 取消
			$("#customerUserCancelBtn").bind("click", function() {
				$("#tabwin_add_user").popup({display:false});
			});
		},
		// 添加
		customerUserAdd: function(elem) {
			var name = $.trim($(elem).attr("data-text"));
			var userPid = $(elem).val();
			$("#assignedUserListDiv").append("" +
				"<div class=\"row-fluid\">" +
                "	<div class=\"span12 control-group full\">" +
                "		<label class=\"checkbox\" >" +
                "			<input type=\"hidden\" name=\"assignedUserPidList\" value=\"" + userPid + "\">" +
                "			<input type=\"checkbox\" name=\"assignedUser\" value=\"" + userPid + "\" data-text=\"" + name + "\">" + name +
                "		</label>" +
                "	</div>" +
                "</div>");
			$(elem).closest("div.row-fluid").remove();
			PUI.plugin.init({}, $("#customerUserForm"));
		},
		// 移除
		customerUserRemove: function(elem) {
			var name = $.trim($(elem).attr("data-text"));
			var userPid = $(elem).val();
			$("#unassignedUserListDiv").append("" +
				"<div class=\"row-fluid\">" +
                "	<div class=\"span12 control-group full\">" +
                "		<label class=\"checkbox\" >" +
                "			<input type=\"checkbox\" name=\"unassignedUser\" value=\"" + userPid + "\" data-text=\"" + name + "\">" + name +
                "		</label>" +
                "	</div>" +
                "</div>");
			$(elem).closest("div.row-fluid").remove();
			PUI.plugin.init({}, $("#customerUserForm"));
		},
		// 保存
		customerUserSave: function() {
			var data = $("#customerUserForm").serialize();
			if(data.indexOf("assignedUserPidList")<0)
				data +="&assignedUserPidList=";
			$.post("xascf/customer/saveCustomerUserList.shtml", data, function(data){
				if (data.result) {
					$("#tabwin_add_user").popup({display: false});
				}
				PUI.MessageBox.info(data.msg);
				mmg.load($("#customerSearchForm").serialize());
			}, "json");
		}
	};
}();

$().ready(function() {
	CustomerUser.init();
});