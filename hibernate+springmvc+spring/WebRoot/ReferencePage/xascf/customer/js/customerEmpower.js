var mmg = null;
var CustomerEmpower = function() { 
	return {
		init: function(){  
			var cols = new Array(
					{ title:'企业ID',name:'memberPid', width: 110, align: 'center',type:'String', sortable: true, hidden: true},
					{ title:'会员编号', name:'memberNo' ,width:140, align:'center', sortable: true, type: 'string',
					      renderer: function(val,item,rowIndex){return '<span style=""><a href="#" onclick="customerDetailPop.customerDetail(\''+item.memberPid+'\')">'
				    	  +val+'</a></span>'}},
			        { title:'会员名称', name:'customerName' ,width:100, align:'left', sortable: true, type: 'String'},
			        { title:'会员类型', name:'customerType', width:120, align:'center', sortable: true, type: 'string',
				    	renderer: function(val){
				    		 if(val=='')
				    			 val='';
				    		 else if(val=='1')
								 val='企业会员';
							 else if(val=='2')
								 val='个人会员'; 
							 else if(val=='3')
								 val='委托方';
					return val}},
				    { title:'所属渠道', name:'companyLevel' ,width:75, align:'center', sortable: true, type: 'string',
				    	renderer: function(val){
				    		$.each(levelArray, function(i, n) {
				    			if(n.name==val){
				    				val=n.value;
				    				return false;
				    			}
							});
							return val;
						}
					},  
				    { title:'所属客户经理及客服', name:'businessPeople', width: 150, align:'center', sortable: true, type: 'string'},
					{ title:'操作', name:'' ,width:90, align:'center',sortable: true, type: 'String', 
				    	renderer: function(val,item,rowIndex){
				    		return '<a class="btnPrice" href="javascript:void(0)" onclick="CustomerEmpower.customerUserAssign(\''
				    				+item.memberPid+'\', \''+item.customerType+'\', \''+item.customerName+'\')">分配' +  '</a>'
				    	}
				    }
			);
			mmg=$("#mmg-customer").mmGrid({
				height: getAutoHeightByMmGrid($("#xascfMainPanel")),
				cols: cols,
				url: 'xascf/customer/customerEmpowerPage.shtml',
				params: $("#customerSearchForm").serialize(),
				method: 'post',
				checkCol: false,
				autoLoad: true,
				fullWidthRows: true,
				showBackboard:false,
				indexColWidth: 15, 
				indexCol : true,
				cache: false,
				nowrap: true,
				plugins: [$('#pg').mmPaginator({})] 
			});  
			mmGridResizeListener(mmg, $(".page-content")); 
		},
				
		/**查询*/
		load: function() {  
			mmg.load($("#customerSearchForm").serialize());
		},
		
		/**清空**/
		clear: function(){
			PUI.util.resetForm($("form"));
		},
		
		customerUserAssign: function(memberPid, customerType, customerName) {
			$.post("xascf/customer/toCustomerUserPopJsp.shtml",{memberPid:memberPid, customerType:customerType},function(data){
				$("#tabwin_add_user_content").html(PUI.String.format(data, {}));
				$("#tabwin_add_user").popup({md:true});
				$("#title_add_user").html("分配客户经理："+customerName);
			});
		}
	};
}();

$().ready(function() {
	PUI.plugin.init();
	sns.valid.init($("#customerSearchForm"));
	CustomerEmpower.init();
});