var MenuDetails = function () {
	return {
		init: function() {
			PUI.plugin.init({}, $("#menuDetailsDiv form"));
			sns.valid.init($("#menuDetailsDiv form"));
			MenuDetails.initEvent();
		},
		initEvent: function() {
			$("#menuDetailsSaveBtn").on("click", function() {
				MenuDetails.menuSave();
			});
			$("#menuDetailsAddChildrenBtn").on("click", function() {
				MenuDetails.addChildren();
			});
			$("#menuDetailsBackBtn").on("click", function() {
				MenuDetails.back();
			});
		},
		menuSave: function() {
			var form = $("#menuDetailsDiv").find("form");
			if (form.isValid()) {
				$.post("xascf/system/menu/saveMenu.shtml", form.serialize(), function(data) {
					var message=data;
					if(message.result){
						var zTree = $.fn.zTree.getZTreeObj("tree");
						zTree.reAsyncChildNodes(null, "refresh");
//						refreshSidebar();
						} 
					PUI.MessageBox.info(message.msg);
				}, "json");
			}
		},
		addChildren: function() {
			var resourcePid = $("input[name='resourcePid']").val();
			$.post("xascf/system/menu/getMenuDetails.shtml", { parentPid: resourcePid}, function(data) {
				$("#menuDetailsDiv").html(data);
			});
		},
		back: function() {
			var parentPid = $("input[name='resourceParentPid']").val();
			$.post("xascf/system/menu/getMenuDetails.shtml", {pid: parentPid}, function(data) {
				$("#menuDetailsDiv").html(data);
			});
		}
	};
}();

$().ready(function() {
	MenuDetails.init();
});