$(document).ready(function(){
	PUI.plugin.init({},$("#solutionSearchForm"));
	sns.valid.init($("#solutionSearchForm")); 
}); 
 


var AgfancingAuthorList = function() {
	var mmg = null;
	return {
		init: function() { 
		
			var cols = new Array(
				{ title:'PID', name:'pid',width:200, align:'center', sortable: true, type: 'string',hidden:true },
			    { title:'方案编码', name:'solutionNo',width:200, align:'center', sortable: true, type: 'string' },  
			    { title:'方案名称', name:'solutionName' ,width:100, align:'center', sortable: true, type: 'string'},
			    { title:'方案描述', name:'solutionDesc' ,width:100, align:'center', sortable: true, type: 'string'}
			);
			
			mmg =  $("#mmg-purchase").mmGrid({
				height: getAutoHeightByMmGrid($("#xascfMainPanel")),
				cols: cols,
				width:'auto',
				url: 'xascf/agFancingSO/page.shtml',
				params: $("#solutionSearchForm").serialize(),
				method: 'post',
				checkCol: true,
				autoLoad: true,
				fullWidthRows: true,
				indexColWidth: 15, 
				cache: false,
				multiSelect: true,
				nowrap: true,
				plugins: [$('#pig').mmPaginator({})] 
			});
			mmGridResizeListener(mmg, $(".page-content"));
			
		},
		
		/**查询*/
		load: function() {  
		  	mmg.load($("#solutionSearchForm").serialize());
		}, 
		

		/*方案设定*/
		authorAssign:function(){   
			var val="";
			if (mmg.selectedRowsIndex().length == 0 || mmg.selectedRowsIndex().length>1){
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			var params = new Array();
			var items = mmg.selectedRows();
			val=items[0].pid;
			$.post("xascf/agFancingSO/authorAssign.shtml", {solutionPid:val}, function(data){
				$("#tabwin_add_content_assign").html(PUI.String.format(data, {}));
				$("#tabwin_add_assign").popup({md:true});
			});  
		},
		/*修改按钮*/
		edit:function(){
			if (mmg.selectedRowsIndex().length != 1){
				PUI.MessageBox.alert("请选中一条记录");
				return; 
			}      
			var item = mmg.selectedRows()[0];
			var rowIndex = mmg.selectedRowsIndex();
			var html = PUI.String.format($("#template_fangan").html(),$.extend(item, {rowIndex: rowIndex}));   
			var content=$("#tabwin_add_content_fangan");
			content.html(html);
			$("#tabwin_add_fangan").popup({md:true});
			$("#pid").val(item.pid).trigger("liszt:updated");  
			$("#solutionNo").val(item.solutionNo).trigger("liszt:updated");  
			$("#solutionName").val(item.solutionName).trigger("liszt:updated");  
			$("#solutionDesc").val(item.solutionDesc).trigger("liszt:updated");  
			PUI.plugin.init({}, $("#tabwin_add_content_fangan"));
			sns.valid.init($("#solutionEditForm"));
		},
		/**删除按钮*/
		_delete: function() {
			if (mmg.selectedRowsIndex().length == 0){
				PUI.MessageBox.alert("请至少选中一条记录");
				return;
			}
			var params = new Array();
			var items = mmg.selectedRows();
			$.each(items, function(i, n) {
				params.push(n.pid);
			});
			var pids=params.join(",");
			PUI.MessageBox.show({
				title: "删除方案",
			    content: "你确定要删除方案吗？",
			    type: "alert",
			    buttons: [{ value: "是" },{ value: "否" }],
			    success: function (result) {
			        if (result == "是") {
			        	$.post("xascf/agFancingSO/delete.shtml",{"pids":pids},function(data) {
			        		PUI.MessageBox.info(data);
			        		mmg.load($("#solutionSearchForm").serialize());
						});
			        }
			    }
			}); 
		},
		//新增按钮
		add: function() {   
			$("#tabwin_add_content_fangan").html(PUI.String.format($("#template_fangan").html(), {}));
			sns.valid.init($("#tabwin_add_content_fangan").find("form"));
			$("#tabwin_add_fangan").popup({md:true}); 
			PUI.plugin.init({},$("#solutionEditForm"));
			sns.valid.init($("#solutionEditForm")); 
		},  
		//保存
		save:function(){
			if (!$("#solutionEditForm").isValid()) {
				return ;
     		} 
     		var params=$("#solutionEditForm").serializeArray();   
     		$.post("xascf/agFancingSO/save.shtml", params, function(data){
     			var res=data.split(',');
					if(res[0].indexOf('成功')>=0){
						PUI.MessageBox.info(res[0]);
						AgfancingAuthorList.load();
					}else{
						$("#loginName").focus();
						PUI.MessageBox.info(data);
					}
					$("#tabwin_add_fangan").popup({display:false}); 
				},"json");  			
		},
		/**
		 * 取消按钮
		 */
		cancle: function(){
			$("#tabwin_add_fangan").popup({display:false}); 
		},
		/**清空**/
		clear: function(){
			PUI.util.resetForm($("form"));
		}
	};
}();

$().ready(function() {
	AgfancingAuthorList.init();
});