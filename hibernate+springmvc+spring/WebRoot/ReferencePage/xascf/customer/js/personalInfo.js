$(document).ready(function(){
	PUI.plugin.init({},$("#personalSearchForm"));
	sns.valid.init($("#personalSearchForm")); 
});  

var PersonalInfo = function() {
	var mmg = null;
	return {
		init: function() { 
		
			var cols = new Array(
			    { title:'企业PID', name:'memberPid', hidden: true}, 
			    { title:'会员编号', name:'memberNo' ,width:140, align:'center', sortable: true, type: 'string',
			      renderer: function(val,item,rowIndex){return '<span style=""><a href="#" onclick="PersonalInfo.personalDetail(\''+item.memberPid +'\')">'
			    	  +val+'</a></span>'}},
			    { title:'姓名', name:'userNameCn' ,width:150, align:'center', sortable: true, type: 'string'},
			    { title:'联系方式',name:'tel', width: 120, align: 'center',lockWidth:true,sortable: true, type: 'object'}, 
			    { title:'身份证号', name:'cardNo' ,width:130, align:'center', sortable: true, type: 'string'},
			    { title:'邮箱', name:'emill' ,width:150, align:'center', sortable: true, type: 'string'},  
			    { title:'客户来源', name:'customerSource', width:120, align:'center', sortable: true, type: 'string',
			    	renderer: function(val){
			    		 if(val=='0'||val=='') 
			    			 val='';
			    		 else if(val=='1')
							 val='后端登记';
						 else if(val=='2')
							 val='前端注册'; 
						 else if(val=='3')
							 val='外来抓取';
				return val}}, 
			    { title:'所属业务员', name:'businessPeople', hidden: true, width: 90, align:'center', sortable: true, type: 'string'}, 
				{title: '审核状态', name:'customerStatus', width: 90, align:'center', sortable: true, type: 'string', 
					renderer: function(val){
						 if(val=='0'|| val=='')
							 val='';
						 else if(val=='1')
							 val='未审核'; 
						 else if(val=='2')
							 val='审核确认';
						 else if(val=='3')
							 val='审核取消';
				return val}}
			);
			
			mmg =  $("#mmg-personal").mmGrid({
				height: 290,
				cols: cols,
				url: 'xascf/customer/customerUserPage.shtml',
				params: $("#personalSearchForm").serialize(),
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
			
		},
		
		/**查询*/
		load: function() {  
		  	mmg.load($("#personalSearchForm").serialize());
		}, 
		

		/*查看个人会员详细信息*/
		personalDetail:function(memberPid){   
			$.post("xascf/customer/personalToShow.shtml",{"memberPid":memberPid},function(data){    
				$("#xascfMainPanel").html(data); 
			});   
		},
		
		/**修改*/
		update: function() {
			if (mmg.selectedRowsIndex().length != 1){
				PUI.MessageBox.alert("请先选中一条记录");
				return;
			}
			 
			var item = mmg.selectedRows()[0];
			
			$.post("xascf/customer/personalToCheck.shtml",{"memberPid":item.memberPid}, function(data) {  
				$("#xascfMainPanel").html(data);  
				$("#memberNo").attr('readonly','readonly'); 
			}); 
		},
		
		
		/**删除*/
		_delete: function() {
			if (mmg.selectedRowsIndex().length == 0){
				PUI.MessageBox.alert("请至少选中一条记录");
				return;
			}
			
			var params = new Array();
			var items = mmg.selectedRows();
			$.each(mmg.selectedRows(), function(i, n) {
				params.push(n.memberPid);
			});
			var pids=params.join(",");
			PUI.MessageBox.show({
			    title: "删除企业",
			    content: "你确定要删除企业吗？",
			    type: "alert",
			    buttons: [{ value: "是" },{ value: "否" }],
			    success: function (result) {
			        if (result == "是") {
			        	$.post("xascf/customer/comapanydelete.shtml",{"pids":pids},function(data) {
			        		PUI.MessageBox.info(data);
			        		mmg.load($("#personalSearchForm").serialize());
						});
			        }
			    }
			}); 
		},
		
		add: function() {    
			$.post("xascf/customer/personalToAdd.shtml",'',function(data) { 
				$("#xascfMainPanel").html(data);  
				$("#memberNo").attr('readonly','readonly');  
			});
			
			
		},
		
		/**
		 * 重置个人会员密码
		*/
		personResetPws: function(){
			if (mmg.selectedRowsIndex().length == 0){
				PUI.MessageBox.alert("请至少选中一条记录");
				return;
			}
			var item = mmg.selectedRows()[0];
			PUI.MessageBox.show({
			    title: "重置密码",
			    content: "你确定要重置该个人会员密码吗？",
			    type: "alert",
			    buttons: [{ value: "是" },{ value: "否" }],
			    success: function (result) {
			        if (result == "是") {
			        	$.post("xascf/customer/toPersonResetPws.shtml",{"memberPid": item.memberPid},function(data) {
			        		if(data.result){
			        			PUI.MessageBox.info(data.msg);
							} 
						});
			        }
			    }
			});  
			
		},
		
		/**清空**/
		clear: function(){
			PUI.util.resetForm($("form"));
		}
	};
}();

$().ready(function() {
	PersonalInfo.init();
});