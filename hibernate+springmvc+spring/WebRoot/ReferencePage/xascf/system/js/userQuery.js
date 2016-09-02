 $(document).ready(function(){  
	PUI.plugin.init({},$("#userQueryForm"));
	sns.valid.init($("#userQueryForm")); 
});

var cols = new Array ( 
	{ title:'员工编号', name:'userNo' ,width:60, align:'center', sortable: true, type: 'object'},		
    { title:'登录名', name:'loginName' ,width:100, align:'center', sortable: true, type: 'object'},
    { title:'员工姓名', name:'userNameCn' ,width:150, align:'center', sortable: true, type: 'object'},
    { title:'邮箱', name:'email' ,width:150, align:'center', sortable: true, type: 'object'},
    { title:'手机号', name:'mobile' ,width:120, align:'center', sortable: true, type: 'object'},
    { title:'激活状态', name:'isenable' ,width:50, align:'center', sortable: true, type: 'object'},	
    { title:'所属系统', name:'systemNames' ,width:180, align:'center', sortable: true, type: 'object'}	
);


var user_mmg =  $("#user_mmg").mmGrid({
	height : getAutoHeightByMmGrid($("#xascfMainPanel")),
	cols : cols,
	url: 'xascf/system/user/getUserList.shtml', 
	params : $("#userQueryForm").serialize(),
	method : 'post',
	checkCol : true,
	autoLoad : true,
	multiSelect: false,
	indexCol : false,
	indexColWidth : 15, 
	fullWidthRows : true,
	cache : false,
	showBackboard:false,
	plugins : [$('#pg').mmPaginator({})]
});
	user_mmg.on('itemdblclick', function(event, item, rowIndex) {
		userQuery.doubleClick(item,rowIndex);    	
   });

   mmGridResizeListener(user_mmg, $(".page-content"));
   
var userQuery = function() {
	return {
		/**查询*/
		query : function() {
            user_mmg.load($("#userQueryForm").serialize());
			
		},
		/**清空**/
		clearQueryForm : function(){
			PUI.util.clearForm($("#userQueryForm"));
		},
		clearEditorForm : function(){
			PUI.util.clearForm($("#editForm")); 
			$("#userNo").attr('readonly',false); 
		},
		/**双击*/
		doubleClick : function(item){
			userQuery.toEditForm(item);
		},
		/**新增**/
		add  :function(){
			$("#pop_up_show_content").html(PUI.String.format($("#pop_up_staff").html(), {}));
			$("#pop_up_delay").popup({md:true});
			
			PUI.plugin.init({}, $("#pop_up_show_content"));
			sns.valid.init($("#pop_up_show_content form"));  
		}, 
		/**关闭弹出窗*/	
		canclePurchase: function(){
			$("#pop_up_delay").popup({display:false}); 
		},
		/**编辑**/
		editor :function(){  
			if (user_mmg.selectedRowsIndex().length != 1){
				PUI.MessageBox.alert("请先选中一条记录");
				return;
			} 
			
			var item = user_mmg.selectedRows()[0]; 
			var rowIndex = user_mmg.selectedRowsIndex();
			var html = PUI.String.format($("#pop_up_staff").html(),{});
			var content=$("#pop_up_show_content");
			content.html(html);
			 
			$("#pop_up_delay").popup({md:true});  
			PUI.plugin.init({}, $("#pop_up_show_content"));
			sns.valid.init($("#pop_up_show_content form")); 
//			$("#userNo").attr('readonly','readonly'); 
			userQuery.toEditForm(item);
		},
		
		
		toEditForm : function(item) {
			$("#userNo").val(item.userNo);
			$("#userPid").val(item.userPid);
			$("#loginName").val(item.loginName);
			$("#userNameCn").val(item.userNameCn);
			$("#email").val(item.email);
			$("#mobile").val(item.mobile);
			$("#loginPwd").val("");
			$("#loginPwd").removeAttr("data-required");
			$("#checkPwd").val("");
			$("#pwdTip").hide();
			$("#loginPwdSpan").hide();
			$("#checkPwdSpan").hide();
			$("#isenable").val(item.isenable=='是'?'Y':'N').trigger("liszt:updated");
		},
		
		
		
		saveUser : function() {
			var $editForm = $("#editForm");
			if (!$editForm.isValid()) {
					return;
			}  
			
			var params = $editForm.serializeArray();
			$.post("xascf/system/user/saveUser.shtml",params,function(data){ 
				if(data.result){
					 if(data.msg =="保存成功"){	
					   $("#pop_up_delay").popup({display:false}); 	 
					   userQuery.query();
					   userQuery.clearEditorForm();
				 	} 
				}
				PUI.MessageBox.info(data.msg);
			},"json"); 
		},


		/**删除*/
		deleteUser : function() {
			if (user_mmg.selectedRowsIndex().length == 0){
				PUI.MessageBox.alert("请至少选中一条记录");
				return;
			}		
			var params = new Array();
			var items = user_mmg.selectedRows();
			var length = items.length;
			for(var i=0;i<length;i++)
			{
				var item = items[i];
				var isenable = item.isenable;
				if(isenable == "是")
				{
					PUI.MessageBox.alert("不能删除激活状态下的用户");
					return;
				}
				params.push(item.userPid);
			}
			var pids=params.join(",");
			PUI.MessageBox.show({
			    title: "删除用户",
			    content: "你确定要删除用户吗？",
			    type: "alert",
			    buttons: [{ value: "是" },{ value: "否" }],
			    success: function (result) {
			        if (result == "是") {
			        	$.post("xascf/system/user/deleteUser.shtml",{"userPids":pids},function(data) {
			        		if(data.result){
				   				userQuery.query();
							}
							PUI.MessageBox.info(data.msg);
						});
			        }
			    }
			}); 
		},
		userSystem: function() {
			if (user_mmg.selectedRowsIndex().length != 1){
				PUI.MessageBox.alert("请先选中一条记录");
				return;
			}
			var item = user_mmg.selectedRows()[0];
			$.post("xascf/system/user/toUserSystemPopJsp.shtml",{userPid: item.userPid},function(data){
				$("#tabwin_add_system_content").html(PUI.String.format(data, {}));
				PUI.plugin.init({}, $("#tabwin_add_system_content"));
				$("#tabwin_add_system").popup({md:true});
			});
		},
		
		/**KPI考核*/
		userKPIAssess: function(){
			$.post("xascf/system/user/toKpiUserAll.shtml",'',function(data){
				PUI.MessageBox.alert(data);
				return;
			});  
		},
		
		
		/**
		 * 重置密码
		 * */
		userResetPws: function(){
			if (user_mmg.selectedRowsIndex().length != 1){
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}	
			var item = user_mmg.selectedRows()[0];
			PUI.MessageBox.show({
			    title: "重置密码",
			    content: "你确定要重置该用户密码吗？",
			    type: "alert",
			    buttons: [{ value: "是" },{ value: "否" }],
			    success: function (result) {
			        if (result == "是") {
			        	$.post("xascf/system/user/toUserResetPws.shtml",{"userPid": item.userPid},function(data) {
			        		if(data.result){
			        			PUI.MessageBox.info(data.msg);
							} 
						});
			        }
			    }
			});  
		}
		

	};
}();

