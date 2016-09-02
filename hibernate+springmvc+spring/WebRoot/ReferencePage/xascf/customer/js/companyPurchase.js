$(document).ready(function(){
	PUI.plugin.init({},$("#purchaseSearchForm"));
	sns.valid.init($("#purchaseSearchForm")); 
}); 
 


var CompanyPurchase = function() {
	var mmg = null;
	return {
		init: function() { 
		
			var cols = new Array(
			    { title:'企业ID', name:'customersubPid', hidden: true},  
			    { title:'企业名称', name:'customerName' ,width:200, align:'left', sortable: true, type: 'string',
			    	renderer: function(val,item,rowIndex){
			    		return '<span style=""><a href="#" onclick="customerDetailPop.buyerDetail(\''+item.customersubPid+'\')">'
				    	  +val+'</a></span>'}},
			    { title:'注册资金',name:'registeredFund', width: 110, align: 'center',lockWidth:true,sortable: true, type: 'object',
			        renderer: function(val){if(val==null)
			    		return '';
		        	else
		        		return formatMoney(val)+' 万元'}}, 
			    { title:'类别', name:'businessScope', width: 60, align:'center', sortable: true, type: 'string',
					renderer: function(val){
			    		 if(val=='0' && val=='')
			    			 val=''; 
			    		 else if(val=='1')
							 val='三方';
						 else if(val=='2')
							 val='直客'; 
				return val}}, 
			    { title:'联系电话', name:'tel' ,width:110, align:'center', sortable: true, type: 'string'},
			    { title:'公司办公地址', name:'officeAddress', width:400, align:'left', sortable: true, type: 'string'}
			);
			
			mmg =  $("#mmg-purchase").mmGrid({
				height: getAutoHeightByMmGrid($("#xascfMainPanel")),
				cols: cols,
				width:'auto',
				url: 'xascf/customer/purchasePage.shtml',
				params: $("#purchaseSearchForm").serialize(),
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
		  	mmg.load($("#purchaseSearchForm").serialize());
		}, 
		

		/*查看企业会员详细信息*/
		customerDetail:function(customersubPid){   
			$.post("xascf/customer/comapanyToShow.shtml",{"customersubPid":customersubPid},function(data){    
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
			var rowIndex = mmg.selectedRowsIndex();
			$.post("xascf/customer/getCostomerCredit.shtml",{"memberPid":item.customersubPid,type:'BUY'},function(data) {
        		if(data.indexOf('OK')>=0){
        			var html = PUI.String.format($("#template_weitf").html(),$.extend(item, {rowIndex: rowIndex}));
        			var content=$("#tabwin_add_content_weitf");
        			content.html(html);
        			$("#tabwin_add_weitf").popup({md:true}); 
        			$("#businessScope").val(item.businessScope);
        			document.getElementById("remark").value=item.remark;
        			PUI.plugin.init({}, $("#purchaseEditForm"));
        			sns.valid.init($("#purchaseEditForm"));
        		}else{
        			PUI.MessageBox.alert("该委托方已经含在授信流程中不能修改!");
        		}
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
				params.push(n.customersubPid);
			});
			var pids=params.join(",");
			PUI.MessageBox.show({
				title: "删除委托方",
			    content: "删除委托方导致该委托方关联的授信、放款等相关信息的删除!你确定要删除委托方吗？",
			    type: "alert",
			    buttons: [{ value: "是" },{ value: "否" }],
			    success: function (result) {
			        if (result == "是") {
			        	$.post("xascf/customer/purchasedelete.shtml",{"pids":pids},function(data) {
			        		PUI.MessageBox.info(data);
			        		mmg.load($("#purchaseSearchForm").serialize());
						});
			        }
			    }
			}); 
		},
		
		save: function(){   
			if (!$("#purchaseEditForm").isValid()) {
				return ;
     		}   
 
			var customerPidVal = $("#customersubPid").val();
			
			/**
			 * 新增采购商
			*/
			if (customerPidVal.length == 0) {  
				var params=$("#purchaseEditForm").serializeArray();  
				
				//新增采购商信息提交 
				$.post("xascf/customer/purchasesave.shtml", params, function(data){
					var res=data.split(',');
					if(res[0].indexOf('成功')>=0){
						//保存按钮激活
						PUI.MessageBox.info(res[0]);
						mmg.load($("#purchaseSearchForm").serialize());
						$("#tabwin_add_weitf").popup({display:false}); 
					}else{
						PUI.MessageBox.info(data);
					}
				},"json");
			}
			
			/**
			 * 更新采购商
			*/
			if (customerPidVal.length != 0){  
				var params=$("#purchaseEditForm").serializeArray();  
				//更新采购商信息提交 
				$.post("xascf/customer/purchasesave.shtml", params, function(data){
					var res=data.split(',');
					if(res[0].indexOf('成功')>=0){
						//保存按钮激活
						PUI.MessageBox.info(res[0]);
						mmg.load($("#purchaseSearchForm").serialize());
						$("#tabwin_add_weitf").popup({display:false}); 
					}else{
						PUI.MessageBox.info(data);
					}
				},"json"); 
			}
			
		},
		//证件号码唯一性检验
		checkUnio:function(type,val){
			var params=[{'condition.remark':type}];
			if(type=='001'){
				params.push({
					name: 'condition.businesslicenseno',
					value: val
				});	
			}else if(type=='002'){
				params.push({
					name: 'condition.organizationCode',
					value: val
				});
			}
			else if(type=='003'){
				params.push({
					name: 'condition.taxNo',
					value: val
				});
			}
			else if(type=='004'){
				params.push({
					name: 'condition.accountlicenseno',
					value: val
				});
			}
			else if(type=='005'){
				params.push({
					name: 'condition.roadmanagementNo',
					value: val
				});
			}
			params.push({
				name: 'condition.customersubPid',
				value: $("#customersubPid").val()
			});
			params.push({
				name: 'condition.remark',
				value: type
			});
			$.post("xascf/customer/checkNoUnio.shtml", params, function(data){
				if(data.indexOf('OK')<0){
					//保存按钮激活
					PUI.MessageBox.info(data);
					if(type=='001'){
						$("#businesslicenseno").val('');
					}else if(type=='002'){
						$("#organizationCode").val('');
					}
					else if(type=='003'){
						$("#taxNo").val('');
					}
					else if(type=='004'){
						$("#accountlicenseno").val('');
					}
					else if(type=='005'){
						$("#roadmanagementNo").val('');
					}
				}
			},"json"); 
		},
		add: function() {   
			$("#tabwin_add_content_weitf").html(PUI.String.format($("#template_weitf").html(), {}));
			$("#tabwin_add_weitf").popup({md:true});
			PUI.plugin.init({}, $("#purchaseEditForm"));
			sns.valid.init($("#purchaseEditForm")); 
		},  
		
		canclePurchase: function(){
			$("#tabwin_add_weitf").popup({display:false}); 
		},
		
		
		/**
		 * 保存或者发布后调用跳转页面
		 * */
		forward:function(type){ 
			if (type=="1"){ 
				$("#pop_up_delay").popup({display:false}); 
				Menu.forward("xascf/customer/jsp/companyPurchase.jsp");  
			} 
			if(type=="2"){
				return;
			} 
		}, 
		
		/**清空**/
		clear: function(){
			PUI.util.resetForm($("form"));
		}
	};
}();

$().ready(function() {
	CompanyPurchase.init();
});