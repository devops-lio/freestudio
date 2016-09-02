$(document).ready(function(){
	PUI.plugin.init({},$("#customerSearchForm"));
	sns.valid.init($("#customerSearchForm"));  
	$('#newCustomerBtn').on('shown', function (e) {
		ComapanyInfo.newCustomerGrid();
	}); 
	
});    

var _mmg = null; 
var mmg = null;   
var _cols = new Array(
		{ title:'企业ID',name:'memberPid', width: 110, align: 'center',type:'String', sortable: true, hidden: true},
		{ title:'会员编号', name:'memberNo' ,width:140, align:'center', sortable: true, type: 'string',
		      renderer: function(val,item,rowIndex){return '<span style="">'
		    	  +val+'</span>'}},
        { title:'企业名称', name:'customerName' ,width:100, align:'left', sortable: true, type: 'String'},
        { title:'客户来源', name:'customerSource', width:120, align:'center', sortable: true, type: 'string',
	    	renderer: function(val){
	    		 if(val=='')
	    			 val='';
	    		 else if(val=='1')
					 val='后端登记';
				 else if(val=='2')
					 val='信安利得注册'; 
				 else if(val=='3')
					 val='外来抓取';
				 else if(val=='4')
					 val='手机APP注册';
		return val}},
		{ title:'操作', name:'' ,width:150, align:'center',sortable: true, type: 'String', 
	    	renderer: function(val,item,rowIndex){
	    		return '<a class="btnPrice" href="javascript:void(0)" onclick="ComapanyInfo.divide(\''+item.memberPid+'\')">客户抓取' +  '</a>'
	    	}
	    }
);

var ComapanyInfo = function() { 
	return {
		init: function(){  
			var cols = new Array(
				    { title:'企业ID', name:'memberPid', hidden: true}, 
				    { title:'会员编号', name:'memberNo' ,width:100, align:'center', sortable: true, type: 'string',
				      renderer: function(val,item,rowIndex){return '<span style=""><a href="#" onclick="customerDetailPop.customerDetail(\''+item.memberPid+'\')">'
				    	  +val+'</a></span>'}},
				    { title:'企业名称', name:'customerName' ,width:200, align:'left', sortable: true, type: 'string'},
				    { title:'注册资金',name:'registeredFund', width: 110, align: 'center',lockWidth:true,sortable: true, type: 'object',
				        renderer: function(val){
				        	if(val==null)
					    		return '';
				        	else
				        		return formatMoney(val)+' 万元'}}, 
				    { title:'联系人', name:'userNameCn' ,width:55, align:'center', sortable: true, type: 'string'},
				    { title:'联系人手机', name:'tel' ,width:100, align:'center', sortable: true, type: 'string'}, 
				    { title:'客户来源', name:'customerSource', width:75, align:'center', sortable: true, type: 'string',
				    	renderer: function(val){
				    		 if(val=='')
				    			 val='';
				    		 else if(val=='1')
								 val='后端登记';
							 else if(val=='2')
								 val='信安利得注册'; 
							 else if(val=='3')
								 val='外来抓取';
							 else if(val=='4')
								 val='积米网注册';
							 else if(val=='5')
								 val='外部平台';
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
					{title: '状态', name:'customerStatus', width: 75, align:'center', sortable: true, type: 'string', 
						renderer: function(val){
							 if(val=='0')
								 val='';
							 else if(val=='10')
								 val='待完善资料'; 
							 else if(val=='20')
								 val='待审核'; 
							 else if(val=='30')
								 val='审核确认';
					return val}}, 
				    { title:'所属业务员', name:'businessPeople', hidden: true,width: 90, align:'center', sortable: true, type: 'string'},
				    { title:'操作', name:'' ,width:220, align:'center',sortable: true, type: 'String', 
				    	renderer: function(val,item,rowIndex){
				    		var operatorUrl = "";
				    		var v=item.customerStatus;
				    		var v1=item.customerSource;
				    		var countReport = item.countReport;
				    		if(countReport>0){
				    			operatorUrl = operatorUrl+'<a class="btnPrice" href="javascript:void(0)" onclick="ComapanyInfo.toEvaluateReportPage(\''+item.memberPid+'\')">查看报告' + '</a>';
				    		} else{
				    			operatorUrl = operatorUrl+'<a class="btnPrice" href="javascript:void(0)" onclick="ComapanyInfo.toEvaluateReportPage(\''+item.memberPid+'\')">新增报告' + '</a>';
				    		}
				    		if((v=='20' || v=='10') && v1!='1'){
				    			operatorUrl = operatorUrl+' | <a class="btnPrice" href="javascript:void(0)" onclick="ComapanyInfo.define(\''+rowIndex+'\')">审核' + '</a> | '+
				    				'<a class="btnPrice" href="javascript:void(0)" onclick="ComapanyInfo.release(\''+item.memberPid+'\')">资源释放' + '</a>	';
				    		}
				    		operatorUrl=operatorUrl+' | <a class="btnPrice" href="javascript:void(0)" onclick="ComapanyInfo.afterTrack(\''
				    		+item.memberPid+'\',\''+item.customerName+'\')">贷后跟踪' + '</a>	';
				    		return operatorUrl;
				    		
				    	}
				    }
					
				    ); 
					mmg=$("#mmg-customer").mmGrid({
						height: getAutoHeightByMmGrid($("#xascfMainPanel")),
						cols: cols,
						url: 'xascf/customer/companypage.shtml',
						params: $("#customerSearchForm").serialize(),
						method: 'post',
						checkCol: true,
						autoLoad: true,
						fullWidthRows: true,
						showBackboard:false,
						indexColWidth: 15, 
						indexCol : true,
						cache: false,
						multiSelect: true,
						nowrap: true,
						plugins: [$('#pig').mmPaginator({})] 
					});  
					mmGridResizeListener(mmg, $(".page-content")); 
		},
		
		newCustomerGrid: function(){ 
				if(null!=_mmg){
					return; 
				} 
				_mmg =  $("#mmg-newcustomer").mmGrid({ 
					height: getAutoHeightByMmGrid($("#xascfMainPanel")),
						url: 'xascf/customer/newcompanypage.shtml',
			        	params : $("#customerSearchForm").serialize(),
			        	cols : _cols,
			        	method : 'post',
			        	autoLoad : true, 
			        	indexCol : true,
			        	indexColWidth : 15,
			        	nowrap:true,
			        	sortName : '',
			        	sortStatus : '',
			        	fullWidthRows : true,
			        	showBackboard:false,
			        	cache : false,
			        	multiSelect: true,
			        	plugins : [$('#pg').mmPaginator({})]
	        });  
			mmGridResizeListener(_mmg, $(".page-content")); 
		}, 
		
		/**查询*/
		load: function() {  
			var params = "";
		  	if($("#customerTab").hasClass('active')){ 
		  		mmg.load($("#customerSearchForm").serialize());
		  	}
		  	if($("#newCustomerTab").hasClass('active')){
		  		_mmg.load($("#customerSearchForm").serialize()); 
		  	}
		}, 
		

		/**查看企业会员详细信息**/
		customerDetail:function(memberPid){    
			$.post("xascf/customer/comapanyToShow.shtml",{"memberPid":memberPid},function(data){    
				$("#xascfMainPanel").html(data); 
			});  
			 
		}, 
		
		afterTrack:function(memberPid,customerName){
			$.post("xascf/customer/toTrackPageListJsp.shtml",{"memberPid":memberPid,"memberName":customerName},function(data){    
				$("#xascfMainPanel").html(data); 
			}); 
		},
		
		/**客户抓取*/
		divide: function(memberPid){ 
			PUI.MessageBox.show({
				title:"客户抓取",
				content:"确定要抓取该客户吗?",
				type:"confirm",
				buttons:[{value: "是"}, {value:"否"}],
				success: function(result){ 
					if (result == "是") {
						$.post("xascf/customer/toInsert.shtml",{"memberPid":memberPid},function(data){     
							if(data.indexOf('成功')>=0){ 
								PUI.MessageBox.info(data);
								mmg.load($("#customerSearchForm").serialize());
								_mmg.load($("#customerSearchForm").serialize());  
							}else{ 
								PUI.MessageBox.alert(data);
								return;  
							}
						});  
					}
				} 
			})
		},
		/**客户资源释放*/
		release: function(memberPid){ 
			PUI.MessageBox.show({
				title:"客户释放",
				content:"确定要释放该客户吗?",
				type:"confirm",
				buttons:[{value: "是"}, {value:"否"}],
				success: function(result){ 
					if (result == "是") {
						$.post("xascf/customer/toReseale.shtml",{"memberPid":memberPid},function(data){     
							if(data.indexOf('成功')>=0){ 
								PUI.MessageBox.info(data);
								mmg.load($("#customerSearchForm").serialize());
							}else{ 
								PUI.MessageBox.alert(data);
								return;  
							}
						});  
					}
				} 
			})
		},
		toEvaluateReportPage : function(memberPid){
			$.post("xascf/customer/toEvaluateReportPage.shtml",{"memberPid":memberPid}, function(data) {
				$("#xascfMainPanel").html(data);
				$("#requestType").val("1");
			});

		},
		
		/**tab查找**/
		tabQuery:function(type){
			if("2"==type){ 
				$("#buttonGroup").hide();
			}else if("1"==type){
				$("#buttonGroup").show();
			}
		},
		
		/**修改*/
		update: function() {
			if (mmg.selectedRowsIndex().length != 1){
				PUI.MessageBox.alert("请先选中一条记录");
				return;
			} 
			var item = mmg.selectedRows()[0]; 
			$.post("xascf/customer/getCostomerCredit.shtml",{"memberPid":item.memberPid,type:'COMPANY'},function(data) {
        		if(data.indexOf('OK')>=0){
        			$.post("xascf/customer/comapanyToCheck.shtml",{"memberPid":item.memberPid,type:'1'}, function(data) {  
        				$("#xascfMainPanel").html(data);  
        				$("#memberNo").attr('readonly','readonly');
						$("#loginPwd").val("");
						$("#loginPwd").removeAttr("data-required");
						$("#checkPwd").val("");
						$("#pwdTip").hide();
						$("#loginPwdSpan").hide();
						$("#checkPwdSpan").hide();
        				$("#trackBt").show(); 
        			}); 
        		}else{
        			PUI.MessageBox.alert("该会员已经含在授信流程中不能修改信息!");
        		}
			});
		},
		
		/**删除*/
		_delete: function() {
			if (mmg.selectedRowsIndex().length == 0){
				PUI.MessageBox.alert("请至少选中一条记录");
				return;
			}
			var item = mmg.selectedRows()[0]; 
			var customerStatus = item.customerStatus; 
			
			var params = new Array();
			var items = mmg.selectedRows();
			var f=true;
			for(var i=0;i<items.length;i++){
				var item=items[i];
				$.post("xascf/customer/getCostomerCredit.shtml",{"memberPid":item.memberPid,type:'COMPANY'},function(data) {
	        		if(data.indexOf('OK')<0){
	        			PUI.MessageBox.alert("会员"+item.customerName+"已经含在授信流程中不能修改信息!");
	        			f=false;
	        			return;
	        		}else{
	        			params.push(item.memberPid);
	        			var pids=params.join(",");
	    				PUI.MessageBox.show({
	    				    title: "删除企业",
	    				    content: "删除企业会导致该企业下的授信、放款等相关信息的删除!你确定要删除企业吗？",
	    				    type: "alert",
	    				    buttons: [{ value: "是" },{ value: "否" }],
	    				    success: function (result) {
	    				        if (result == "是") {
	    				        	$.post("xascf/customer/comapanydelete.shtml",{"pids":pids},function(data) {
	    				        		PUI.MessageBox.info(data);
	    				        		mmg.load($("#customerSearchForm").serialize());
	    							});
	    				        }
	    				    }
	    				}); 
	        		}
	        			
				})
			}
		},
		
		/*审核通过*/
		define: function(rowIndex){
			var item=mmg.row(rowIndex);
			var customerStatus = item.customerStatus;
			var v1=item.customerSource;
			if(customerStatus==30 || v1==1){  
				PUI.MessageBox.alert("已审核或为后台登记业务无需再次审核");
				return;
			}  
			
			var companyPid =  item.memberPid;
			$.post("xascf/customer/comapanyCheck.shtml",{memberPid: companyPid},function(data){  
				$("#xascfMainPanel").html(data);  
			}); 
//			PUI.MessageBox.show({
//				title:"企业信息审核",
//				content:"确定通过审核该企业信息吗?",
//				type:"alert",
//				buttons:[{ value: "是" },{ value: "否" }],
//				success: function(result){
//					if(result=="是"){
//						$.post("xascf/customer/comapanydefine.shtml", {"customersubPid":companyPid}, function(data){
//							PUI.MessageBox.info(data); 
//							if(data=='审核成功'){ 
//								ComapanyInfo.load(); 
//							} 
//						}, "json");
//					}
//				} 
//			})
			
		},
		
		add: function() {    
			$.post("xascf/customer/companyToAdd.shtml",'',function(data) { 
				$("#xascfMainPanel").html(data);  
				$("#memberNo").attr('readonly','readonly'); 
				$("#trackBt").hide(); 
				$("#rebackType").val('1'); 
				
			})
		},
		
		detail: function(){  
			if (mmg.selectedRowsIndex().length != 1){
				PUI.MessageBox.alert("请先选中一条记录");
				return;
			}  
			var item = mmg.selectedRows()[0]; 
			$.post("xascf/customer/toDetail.shtml",{memberPid: item.memberPid},function(data){  
				$("#tabwin_add_content_customerDetails").html(PUI.String.format(data, {}));
				$("#tabwin_add_customerDetails").popup({md:true});
			}); 
		},
		
		cancel: function(){
			$("#tabwin_add_customerDetails").popup({display:false}); 
		},
		
		/**
		 * 重置企业会员密码
		*/
		companyResetPws: function(){
			if (mmg.selectedRowsIndex().length != 1){
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			var item = mmg.selectedRows()[0]; 
			PUI.MessageBox.show({
			    title: "重置密码",
			    content: "你确定要重置该企业会员密码吗？",
			    type: "alert",
			    buttons: [{ value: "是" },{ value: "否" }],
			    success: function (result) {
			        if (result == "是") {
			        	$.post("xascf/customer/toCompanyResetPws.shtml",{"memberPid": item.memberPid},function(data) {
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
	ComapanyInfo.init();
});