$(document).ready(function(){
	PUI.plugin.init({},$("#agFancingSearchForm"));
	sns.valid.init($("#agFancingSearchForm")); 
}); 
 


var CapitalSideList = function() {
	var mmg = null;
	return {
		init: function() { 
		
			var cols = new Array(
			    { title:'名称', name:'customerName',width:200, align:'left', sortable: true, type: 'string' },  
			    { title:'pid', name:'pid',width:200, align:'left', sortable: true, type: 'string',hidden: true },  
			    { title:'编号', name:'customerPid',width:200, align:'left', sortable: true, type: 'string',hidden: true},  
			    { title:'登录账号', name:'loginName' ,width:100, align:'left', sortable: true, type: 'string'},
			    { title:'类别',name:'customerType', width: 100, align: 'center',lockWidth:true,sortable: true, type: 'object',
				    renderer:function(val){
				    	if(val=="001"){
				    		return "银行"
				    	}else if(val=="002"){
				    		return "信托";
				    	}else if(val=="003"){
				    		return "资管";
				    	}else if(val=="004"){
				    		return "P2P平台";
				    	}else if(val=="005"){
				    		return "投资公司";
				    	}else if(val=="006"){
				    		return "三方保理";
				    	}else {
				    		return val;
				    	}
			    	}
			    }, 
			    { title:'状态',name:'customerStatus', width: 100, align: 'center',lockWidth:true,sortable: true, type: 'object',
				    renderer:function(val){
				    	if(val=="10"){
				    		return "已停用"
				    	}else if(val=="20"){
				    		return "拟合作";
				    	}else if(val=="30"){
				    		return "合作中";
				    	}else {
				    		return val;
				    	}
			    	}
			    }, 
			    { title:'额度(元)', name:'limitAmount', width:100, align:'left', sortable: true, type: 'string'},
			    { title:'最低利率(%)', name:'lowestRate', width:100, align:'left', sortable: true, type: 'string'},
			    { title:'最高利率(%)', name:'highestRate', width:100, align:'left', sortable: true, type: 'string'},
			    { title:'开始日', name:'startDate', width:100, align:'left', sortable: true, type: 'string'},
			    { title:'结束日', name:'endDate', width:100, align:'left', sortable: true, type: 'string'}
			);
			
			mmg =  $("#mmg-purchase").mmGrid({
				height: getAutoHeightByMmGrid($("#xascfMainPanel")),
				cols: cols,
				width:'auto',
				url: 'xascf/agFancing/page.shtml',
				params: $("#agFancingSearchForm").serialize(),
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
		  	mmg.load($("#agFancingSearchForm").serialize());
		}, 
		

//		/*查看企业会员详细信息*/
//		customerDetail:function(customersubPid){   
//			$.post("xascf/customer/comapanyToShow.shtml",{"customersubPid":customersubPid},function(data){    
//				$("#xascfMainPanel").html(data); 
//			});   
//		},
		
		/*新增*/
		add: function() {   
			$.post("xascf/agFancing/toEdit.shtml",{"pid":""},function(data) {
				$("#xascfMainPanel").html(data)
			});
		},  
		
		/**修改*/
		update: function() { 
			if (mmg.selectedRowsIndex().length != 1){
				PUI.MessageBox.alert("请先选中一条记录");
				return;
			} 
			var item = mmg.selectedRows()[0]; 
			var rowIndex = mmg.selectedRowsIndex();
			$.post("xascf/agFancing/toEdit.shtml",{"pid":item.pid},function(data) {
        		$("#xascfMainPanel").html(data);
				$("#loginPwd").val("");
				$("#loginPwd").removeAttr("data-required");
				$("#checkPwd").val("");
				$("#pwdTip").hide();
				$("#loginPwdSpan").hide();
				$("#checkPwdSpan").hide();
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
				params.push(n.customerPid);
			});
			var pids=params.join(",");
			PUI.MessageBox.show({
				title: "删除资金方",
			    content: "你确定要删除资金方信息吗？",
			    type: "alert",
			    buttons: [{ value: "是" },{ value: "否" }],
			    success: function (result) {
			        if (result == "是") {
			        	$.post("xascf/agFancing/delete.shtml",{"pids":pids},function(data) {
			        		PUI.MessageBox.info(data);
			        		mmg.load($("#agFancingSearchForm").serialize());
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
	CapitalSideList.init();
});