$(document).ready(function(){
	PUI.plugin.init({},$("#customerSearchForm"));
	sns.valid.init($("#customerSearchForm"));  
});    


var cols = new Array(
	    { title:'企业ID', name:'memberPid', hidden: true}, 
	    { title:'会员编号', name:'memberNo' ,width:100, align:'center', sortable: true, type: 'string',
	      renderer: function(val,item,rowIndex){return '<span style=""><a href="#" onclick="customerDetailPop.customerDetail(\''+item.memberPid+'\')">'
	    	  +val+'</a></span>';}},
	    { title:'企业名称', name:'customerName' ,width:200, align:'left', sortable: true, type: 'string'},
	    { title:'注册资金',name:'registeredFund', width: 110, align: 'center',lockWidth:true,sortable: true, type: 'object',
	        renderer: function(val){
	        	if(val==null)
		    		return '';
	        	else
	        		return formatMoney(val)+' 万元'}}, 
	    { title:'联系人', name:'userNameCn' ,width:55, align:'center', sortable: true, type: 'string'},
	    { title:'联系人电话', name:'tel' ,width:110, align:'center', sortable: true, type: 'string'}, 
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
		return val;}}, 
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
		{title: '审核状态', name:'customerStatus', width: 75, align:'center', sortable: true, type: 'string', 
			renderer: function(val){
				 if(val=='0')
					 val='';
				 else if(val=='10')
					 val='待完善资料'; 
				 else if(val=='20')
					 val='待审核'; 
				 else if(val=='30')
					 val='审核确认';
		return val;}}, 
		{title: '停用状态', name:'recStatus', width: 75, align:'center', sortable: true, type: 'string', 
			renderer: function(val){
				 if(val=='1')
					val='停用'; 
				else if(val=='2')
					val='正常';
				return val;}}, 
	    { title:'所属业务员', name:'businessPeople', hidden: true,width: 90, align:'center', sortable: true, type: 'string'},
	    { title:'操作', name:'' ,width:120, align:'center',sortable: true, type: 'String', 
	    	renderer: function(val,item,rowIndex){
	    		var operatorUrl = '<a class="btnPrice" href="javascript:void(0)" onclick="ComapanyInfoAll.toUpdate(\''+item.memberPid+'\')">编辑 ' + '</a>';
	    		var v1=item.customerSource;
	    		var recStatus=item.recStatus;
	    		var countReport = item.countReport;
	    		if(countReport>0){
	    			operatorUrl = operatorUrl+'|<a class="btnPrice" href="javascript:void(0)" onclick="ComapanyInfoAll.toEvaluateReportPage(\''+item.memberPid+'\')">查看报告 ' + '</a>';
	    		}
	    		if(recStatus==1){
	    			operatorUrl = operatorUrl+'|<a class="btnPrice" href="javascript:void(0)" onclick="ComapanyInfoAll.recovery(\''+item.memberPid+'\')">恢复正常 ' + '</a>';
	    			operatorUrl = operatorUrl+'|<a class="btnPrice" href="javascript:void(0)" onclick="ComapanyInfoAll.deleteCus(\''+item.memberPid+'\')">彻底删除 ' + '</a>';
	    		}
	    		return operatorUrl;
	    		
	    	}
	    }
		
	    ); 

var	mmg=$("#mmg-customer").mmGrid({
			height: getAutoHeightByMmGrid($("#xascfMainPanel")),
			cols: cols,
			url: 'xascf/customer/companypageAll.shtml',
			params: $("#customerSearchForm").serialize(),
			method: 'post',
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

var ComapanyInfoAll = function() { 
	return {
		
		/**查询*/
		load: function() {  
		  		mmg.load($("#customerSearchForm").serialize());
		}, 
		
		/**清空**/
		clear: function(){
			PUI.util.resetForm($("form"));
		},
		/**修改*/
		toUpdate: function(memberPid) {
        			$.post("xascf/customer/comapanyToCheck.shtml",{"memberPid":memberPid,type:'2'}, function(data) {  
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
		},
		/**
		 * 查看会员报告
		 * @param memberPid
		 * @returns
		 */
		toEvaluateReportPage : function(memberPid){
			$.post("xascf/customer/toEvaluateReportPage.shtml",{"memberPid":memberPid}, function(data) {
				$("#xascfMainPanel").html(data);
				$("#requestType").val("2");
//				$("#evalAdd").hide();
//				$("#evalEdit").hide();
//				$("#evalDel").hide();
			});

		},
		/**
		 * 恢复
		 */
		recovery:function(memberPid){
			$.post("xascf/customer/recovery.shtml",{"memberPid":memberPid},function(data) {
        		PUI.MessageBox.info(data);
        		if(data=="恢复成功！")
        			mmg.load($("#customerSearchForm").serialize());
			});
		},
		
		/**删除*/
		deleteCus: function(memberPid) {
			var params = new Array();
			$.post("xascf/customer/getCostomerCredit.shtml",{"memberPid":memberPid,type:'COMPANY'},function(data) {
        		if(data.indexOf('OK')<0){
        			PUI.MessageBox.alert("会员已经含在授信流程中不能删除!");
        			return;
        		}else{
        			params.push(memberPid);
        			var pids=params.join(",");
    				PUI.MessageBox.show({
    				    title: "删除企业",
    				    content: "删除企业会导致该企业下的授信、放款等相关信息的删除!你确定要删除企业吗？",
    				    type: "alert",
    				    buttons: [{ value: "是" },{ value: "否" }],
    				    success: function (result) {
    				        if (result == "是") {
    				        	$.post("xascf/customer/logicDelete.shtml",{"pids":pids},function(data) {
    				        		PUI.MessageBox.info(data);
    				        		mmg.load($("#customerSearchForm").serialize());
    							});
    				        }
    				    }
    				}); 
        		}
			});
		}
	};
}();

