 $(document).ready(function(){
	PUI.plugin.init();
	sns.valid.init($("form")); 
});
 var member_mmg = null;	
var cols = new Array ( 
    { title:'登陆账号', name:'loginName' ,width:150, align:'center', sortable: true, type: 'object'},
    { title:'用户名', name:'userNameCn' ,width:150, align:'center', sortable: true, type: 'object'},
    { title:'邮箱', name:'email' ,width:150, align:'center', sortable: true, type: 'object'},
    { title:'手机号', name:'mobile' ,width:150, align:'center', sortable: true, type: 'object'},
    { title:'账号类型', name:'userType' ,width:150, align:'center', sortable: true, type: 'object',
        renderer: function(val){  
    		return (null == val || val == "1" || val == "2") ? "企业会员": "锁定";
    		}
    },
    { title:'状态', name:'isenable' ,width:120, align:'center', sortable: true, type: 'object',
    renderer: function(val){
		return (null == val || val == "1" || val == "2") ? "已启用": "锁定";
		}
    }	
);


	member_mmg =  $("#member_mmg").mmGrid({
	height : getAutoHeightByMmGrid($("#xlctpMainPanel")),
	cols : cols,
	url: 'xascf/common/pageMemberList.shtml', 
	params : $("#memberQueryForm").serialize(),
	method : 'post',
	checkCol : true,
	autoLoad : true,
	indexCol : true,
	indexColWidth : 15, 
	fullWidthRows : true,
	cache : false,
	multiSelect: true,
	plugins : [$('#pg').mmPaginator({})]
});
	 
   mmGridResizeListener(member_mmg, $(".page-content"));
   
var memberList = function() {
	return {
		/**查询*/
		query : function() {
            member_mmg.load($("#memberQueryForm").serialize());
			
		},
		/**清空**/
		clearQueryForm : function(){
			PUI.util.resetForm($("#memberQueryForm"));
		},
		clearEditorForm : function(){
			PUI.util.resetForm($("#memberEditorForm"));
		},
		/**双击*/
//		doubleClick : function(item){
//			memberList.toEditForm(item);
//		},
		/**编辑**/
		editor :function(){
			if ($("input[class='mmg-check']:checked").length != 1){
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			var item = member_mmg.selectedRows()[0];
			memberList.toEditForm(item);
		},
		toEditForm : function(item) {
//			$("#fundIncomePid").val(item.fundIncomePid);
//			$("#bankNo").focus().val(item.bankNo);
//			$("#transactionNo").val(item.transactionNo);
//			$("#incomeAmount").val(item.incomeAmount);
//			$("#fundRate").val(item.fundRate);
//			$("#expireDate").val(item.expireDate);
//			$("#currency").val(item.currency);
//			$("#businessType").val(item.businessType);
		},
		
		saveComInMember : function() {
			 
			var params = $("#memberEditorForm").serializeArray(); 
			$.post("xascf/common/membersave.shtml",params,function(data){  
				   memberList.query();
				   memberList.clearQueryForm(); 
				}); 
		},


		/**删除*/
		deleteMamIncom : function() {
			if (member_mmg.selectedRowsIndex().length == 0){
				PUI.MessageBox.alert("请至少选中一条记录");
				return;
			}
			
			var params = new Array();
			var items = member_mmg.selectedRows();
			$.each(member_mmg.selectedRows(), function(i, n) {
				params.push(n.userPid);
			});
			var pids=params.join(",");
			PUI.MessageBox.show({
			    title: "删除企业",
			    content: "你确定要删除企业吗？",
			    type: "alert",
			    buttons: [{ value: "是" },{ value: "否" }],
			    success: function (result) {
			        if (result == "是") {
			        	$.post("xascf/common/mamberdelete.shtml",{"pids":pids},function(data) {
			        		PUI.MessageBox.info(data);
			        		 member_mmg.load($("#memberQueryForm").serialize());
						});
			        }
			    }
			}); 
		},
		//角色分配
		userRoleAssign: function() {
			if (member_mmg.selectedRowsIndex().length != 1){
				PUI.MessageBox.alert("请先选中一条记录");
				return;
			}
			var item = member_mmg.selectedRows()[0];
			$.post("xascf/system/toUserRolePopJsp.shtml",{userPid: item.userPid},function(data){
				$("#tabwin_add_role_content").html(PUI.String.format(data, {}));
				$("#tabwin_add_role").popup();
			});
		}

	};
}();

