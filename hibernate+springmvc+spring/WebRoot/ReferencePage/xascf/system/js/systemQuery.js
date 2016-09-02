var SystemQuery = function() {
	var mmg = null;
	return {
		init: function() {
			
			PUI.plugin.init({}, $("#systemSearchForm"));
			SystemQuery.initEvent();

			var cols = new Array(
			    { title:'系统ID', name:'id', hidden: true},
			    { title:'系统逻辑ID', name:'systemPid', hidden: true},
			    { title:'系统名称', name:'systemName', width: 120, align: 'center',sortable: true, type: 'string'},
			    { title:'系统编码', name:'systemCode' ,width:120, align:'center', sortable: true, type: 'string'},
			    { title:'系统URL', name:'systemUrl' ,width:220, align:'center', sortable: true, type: 'string'},
			    { title:'系统描述', name:'description' ,width:220, align:'center', sortable: true, type: 'string'}
			);
			
			mmg =  $("#mmg-systems").mmGrid({
				height : getAutoHeightByMmGrid($(".page-content")),
				cols: cols,
				url: 'xascf/system/page.shtml',
				params: $("#systemSearchForm").serialize(),
				method: 'post',
				checkCol: true,
				autoLoad: true,
				fullWidthRows: true,
				cache: false,
				multiSelect: true,
				nowrap: true,
				plugins: [$('#pg').mmPaginator({})]
			
			});
			
			mmGridResizeListener(mmg, $(".page-content"));
			
			
		},
		initEvent: function() {
			$("#systemQueryAddBtn").on("click", function() {
				SystemQuery.add();
			});
			
			$("#systemQueryUpdateBtn").on("click", function() {
				SystemQuery.update();
			});
			
			$("#systemQueryDeleteBtn").on("click", function() {
				SystemQuery.del();
			});
		},
		/**查询*/
		load: function() {
		  	mmg.load($("#systemSearchForm").serialize());
		},
		/**修改*/
		update: function() {
			if (mmg.selectedRowsIndex().length != 1){
				PUI.MessageBox.alert("请先选中一条记录");
				return;
			}
			var item = mmg.selectedRows()[0];
			var rowIndex =mmg.selectedRowsIndex;
			var id = item.id ;
			if(id == 1)
			{
				PUI.MessageBox.alert("此记录不可编辑，请重新选择！");
				return ;
			}
			var html = PUI.String.format($("#system-detail-template").html(),$.extend(item, {rowIndex: rowIndex}));
			$("#tabwin_add_content").html(html);
			$("#tabwin_add").popup();
			sns.valid.init($("#tabwin_add_content").find("form"));
		},
		/**保存*/
		save :function (){
			if(!$("#tabwin_add_content form").isValid()) {
				return ;
			}
			var form = $("#tabwin_add_content").find("form");
			$.post("xascf/system/saveSystem.shtml",form.serialize(),function(data){
				var message=data;
				if(message.result){
					$("#tabwin_add").popup({display:false});
					SystemQuery.load();
				}
				PUI.MessageBox.info(message.msg);
			}, "json");	
			
			
			
		},
		
		/**删除*/
		del: function() {
			if (mmg.selectedRowsIndex().length != 1){
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			
			var params = new Array();
			var items = mmg.selectedRows();
			for (var i = 0;i < items.length; i++) {
				var id = items[i].id ;
				if(id == 1)
				{
					PUI.MessageBox.alert("此记录不可删除，请重新选择！");
					return ;
				}
				params.push({name: "pids", value: items[i].systemPid});
			}
			PUI.MessageBox.show({
			    title: "删除系统",
			    content: "你确定要删除系统吗？",
			    type: "alert",
			    buttons: [{ value: "是" },{ value: "否" }],
			    success: function (result) {
			        if (result == "是") {
			        	$.post("xascf/system/delete.shtml", params, function(data) {
							var message=data;
							if(message.result){
								SystemQuery.load();
							}
							PUI.MessageBox.info(message.msg);
			        	}, "json");
			        }
			    }
			});
		},
		add: function() {
			$("#tabwin_add_content").html(PUI.String.format($("#system-detail-template").html(), {}));
			$("#tabwin_add").popup({md:true});
			sns.valid.init($("#tabwin_add_content").find("form"));
			sns.valid.init($("form"));
		},
		ExcelCancle :function (){
			$("#tabwin_upload").popup({display:false});
			
		},
		cancle : function(){
			$("#tabwin_add").popup({display:false});
		},
		/**清空**/
		clear: function(){
			PUI.util.resetForm($("form"));
		}
	};
}();

$().ready(function() {
	SystemQuery.init();
});