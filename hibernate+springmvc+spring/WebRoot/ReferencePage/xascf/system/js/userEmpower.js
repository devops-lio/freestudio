var mmg = null;
var UserEmpower = function() {
	return {
		init: function() {
			
			PUI.plugin.init({}, $("#userSearchForm"));
			UserEmpower.initEvent();
			var cols = new Array(
			    { title:'用户ID', name:'id', hidden: true},
			    { title:'用户逻辑ID', name:'userPid', hidden: true},
			    { title:'登录名',name:'loginName', width: 220, align: 'center',sortable: true, type: 'string'},
			    { title:'员工姓名', name:'userNameCn' ,width:150, align:'center', sortable: true, type: 'string'},
			    { title:'所属角色', name:'roleName' ,width:150, align:'center', sortable: true, type: 'string'}
			);
			
			mmg =  $("#mmg-users").mmGrid({
				height : getAutoHeightByMmGrid($(".page-content")),
				cols: cols,
				url: 'xascf/system/user/page.shtml',
				params: $("#userSearchForm").serialize(),
				method: 'post',
				checkCol: true,
				autoLoad: true,
				fullWidthRows: true,
				cache: false,
				multiSelect: false,
				showBackboard:false,
				nowrap: true,
				plugins: [$('#pg').mmPaginator({})]
			
			});
			
			mmGridResizeListener(mmg, $(".page-content"));
			
			
		},
		initEvent: function() {
			$("#userRoleAssignBtn").click(function() {
				UserEmpower.userRoleAssign();
			});
//			$("#rightsAssignBtn").click(function() {
//				UserEmpower.rightsAssignBtn();
//			});
		},
		/**查询*/
		load: function() {
		  	mmg.load($("#userSearchForm").serialize());
		},
		/**清空**/
		clear: function(){
			PUI.util.resetForm($("form"));
		},
//		rightsAssignBtn: function() {
//			if (mmg.selectedRowsIndex().length != 1){
//				PUI.MessageBox.alert("请先选中一条记录");
//				return;
//			}
//			var item = mmg.selectedRows()[0];
//			var systemId=$("#systemId").val();
//			$.post("upm/user/toUserResourcePopJsp.shtml",{userId: item.id,systemId:systemId},function(data){
//				$("#tabwin_add_function_content").html(PUI.String.format(data, {}));
//				$("#tabwin_add_function").popup();
//			});
//		},
		userRoleAssign: function() {
			if (mmg.selectedRowsIndex().length != 1){
				PUI.MessageBox.alert("请先选中一条记录");
				return;
			}
			var item = mmg.selectedRows()[0];
			var systemPid=$("#systemPid").val();
			$.post("xascf/system/user/toUserRolePopJsp.shtml",{userPid: item.userPid,systemPid:systemPid},function(data){
				$("#tabwin_add_role_content").html(PUI.String.format(data, {}));
				$("#tabwin_add_role").popup({md:true});
			});
		}
	};
}();

$().ready(function() {
	UserEmpower.init();
});