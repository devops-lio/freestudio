var RoleMenu = function () {
	var _mmg = null;
	var lastResourceId = -1;
	var lastTreeNode = null;
	var historyFunctions = new Array();
	var setting = {
		async: {
			enable: false,
			url: "xascf/agFancingSO/authorAssignTree.shtml",
			otherParam: ["treePid", $("#treePid").val()]
		},
		data: {
				key: {
					url: "none",
					name: "authorName"
				},
			simpleData: {
				enable: true,
				idKey: "authorCode",
				pIdKey: "parentCode"
			}
			},
			
		check: {
			enable: true,
			chkboxType: {
				"Y": "ps",
				"N": "ps" 
		    }
		},
		view: {
			dblClickExpand: false
		},
		callback: {
			onClick: function(e,treeId, treeNode) {
				var zTree = $.fn.zTree.getZTreeObj("tree");
				zTree.expandNode(treeNode);
			},
			onAsyncSuccess: function(event, treeId, treeNode, msg) {
				var zTree = $.fn.zTree.getZTreeObj("tree");
				zTree.expandAll(true);
			}
		}
	};
//	var zNodes =[
//		 			{ id:1, pId:0, name:"企业信息", open:true},
//		 			{ id:11, pId:1, name:"公司名称", open:true},
//		 			{ id:12, pId:1, name:"营业执照编码",  open:true},
//		 			{ id:13, pId:1, name:"组织机构代码",  open:true},
//		 			{ id:14, pId:1, name:"税务登记号",  open:true},
//		 			{ id:15, pId:1, name:"开户许可证",  open:true},
//		 			{ id:16, pId:1, name:"道路经营许可证",  open:true},
//		 			{ id:17, pId:1, name:"法人代表",  open:true},
//		 			{ id:18, pId:1, name:"注册资金",  open:true},
//		 			{ id:19, pId:1, name:"认缴金额",  open:true},
//		 			{ id:20, pId:1, name:"资金币种",  open:true},
//		 			{ id:21, pId:1, name:"注册时间",  open:true},
//		 			{ id:22, pId:1, name:"所属行业",  open:true},
//		 			{ id:23, pId:1, name:"企业级别",  open:true},
//		 			{ id:24, pId:1, name:"公司电话",  open:true},
//		 			{ id:25, pId:1, name:"公司传真",  open:true},
//		 			{ id:26, pId:1, name:"注册地址",  open:true},
//		 			{ id:27, pId:1, name:"办公地址",  open:true},
//		 			{ id:28, pId:1, name:"邮政编码",  open:true},
//		 			{ id:29, pId:1, name:"公司邮箱",  open:true},
//		 			{ id:30, pId:1, name:"公司备注",  open:true},
//		 			{ id:2, pId:0, name:"基本材料",open:true},
//		 			{ id:31, pId:2, name:"营业执照",open:true},
//		 			{ id:31, pId:2, name:"组织机构代码证",open:true},
//		 			{ id:31, pId:2, name:"税务登记证",open:true},
//		 			{ id:31, pId:2, name:"开户许可证",open:true},
//		 			{ id:31, pId:2, name:"公司章程",open:true},
//		 			{ id:31, pId:2, name:"道路运输经营许可证",open:true},
//		 			{ id:31, pId:2, name:"验资报告(实缴金额凭证)",open:true},
//		 			{ id:31, pId:2, name:"贷款卡",open:true},
//		 			{ id:31, pId:2, name:"营业执照",open:true},
//		 			{ id:3, pId:0, name:"授信材料",open:true},
//		 			{ id:31, pId:3, name:"经审议的近两年年度财务报表",open:true},
//		 			{ id:31, pId:3, name:"即期的财务报表",open:true},
//		 			{ id:31, pId:3, name:"近三个月银行流水",open:true},
//		 			{ id:31, pId:3, name:"运输合作协议或业务合同",open:true},
//		 			{ id:31, pId:3, name:"企业的征信报告",open:true},
//		 			{ id:31, pId:3, name:"实际控制人征信报告",open:true},
//		 			{ id:31, pId:3, name:"国内保理融资申请书",open:true},
//		 			{ id:31, pId:3, name:"贷款卡",open:true},
//		 			{ id:31, pId:3, name:"营业执照",open:true},
//		 			{ id:4, pId:0, name:"合同材料",open:true},
//		 			{ id:31, pId:4, name:"国内保理协议",open:true},
//		 			{ id:31, pId:4, name:"融资股东会或董事会决议",open:true},
//		 			{ id:31, pId:4, name:"最高额保证合同",open:true}
//		 			
//		 		];
	return {
		init: function() {
			// 保存
			$("#roleMenuSaveBtn").bind("click", function() {
				RoleMenu.roleMenuSave();
			});
			// 取消
			$("#roleMenuCancelBtn").bind("click", function() {
				RoleMenu.roleMenuCancel();
			});
			var t = $("#tree");
			t = $.fn.zTree.init(t, setting);
		},
		// 保存
		roleMenuSave: function() {
			var params = new Array({
				name: 'rolePid',
				value: $("#rolePid").val()
			});
			
			var zTree = $.fn.zTree.getZTreeObj("tree");
			var nodes = zTree.getCheckedNodes(true);
			for ( var i = 0; i < nodes.length; i++) {
				if (null == nodes[i].id || nodes[i].id == '') {
					continue;
				}
				params.push({name: 'functionPidList', value: nodes[i].functionPid});
			}
			params.push({name: 'functionPidList', value: -1});
			$.post("xascf/system/role/menuSave.shtml", params, function(data){
				if(data.result){
					RoleMenu.roleMenuCancel();
				} 
				PUI.MessageBox.info(data.msg);
			}, "json");
		},
		roleMenuCancel: function() {
			$("#tabwin_add_menu").popup({display:false});
			$("#tabwin_add_content_menu").empty();
		}
	};
}();

$().ready(function() {
	RoleMenu.init();
});