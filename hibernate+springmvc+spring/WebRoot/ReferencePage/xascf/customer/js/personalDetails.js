$(document).ready(function(){
	PUI.plugin.init({},$("#details_form"));
	sns.valid.init($("#details_form"));
	
	var source = $("#companySource").val();
	if(source=="1"){
		document.getElementById("backstage").style.display=""; 
		document.getElementById("reception").style.display="none"; 
	} 
}); 


/*历史融资*/
var _cols = new Array(
	    { title:'申请编号', name:'fancingOrderNo', width:110, align:'center', sortable: true, type: 'object'},
	    { title:'融资企业', name:'billOwerName' ,width:150, align:'center', sortable: true, type: 'object'},
	    { title:'批复金额（万元）', name:'fancingPrice' ,width:140, align:'center', sortable: true, type: 'object'},
	    { title:'利率',name:'fancingRate', width: 95, align: 'center',lockWidth:true,sortable: true, type: 'object'}, 
	    { title:'放款时间', name:'businessType' ,width:110, align:'center', sortable: true, type: 'object'}
	);
	
	var	_mmg =  $("#mmg-fun").mmGrid({
		height: 100,
		cols : _cols,
//		url: 'xascf/customer/comapanyFancingPage.shtml',   
//		params: {'companymodel.requestPid':$("#customersubPid").val()},
		method: 'post',
		autoLoad: true,
		indexCol : true,
		indexColWidth : 15, 
		fullWidthRows: true,
		cache: false,
		showBackboard:false,  
		multiSelect: true,
		nowrap: true 
	}); 
	
/*理财记录 */
	var fun_cols = new Array(
		    { title:'理财编号', name:'purchaseNo', width:110, align:'center', sortable: true, type: 'object'},
		    { title:'产品名称', name:'name',width:150, align:'center', sortable: true, type: 'object'},
		    { title:'批复金额（万元）', name:'' ,width:140, align:'center', sortable: true, type: 'object'},
		    { title:'利率',name:'', width: 95, align: 'center',lockWidth:true,sortable: true, type: 'object'}, 
		    { title:'购买时间', name:'purchaseTime' ,width:110, align:'center', sortable: true, type: 'object'}
		);
		
		var	_mmg =  $("#mmg-fin").mmGrid({
			height: 100,
			cols : fun_cols,
//			url: 'xascf/customer/companyPurchase.shtml',   
//			params: {'condition.customersubPid':$("#customersubPid").val()},
			method: 'post',
			autoLoad: true,
			indexCol : true,
			indexColWidth : 15, 
			fullWidthRows: true,
			cache: false,
			showBackboard:false,  
			multiSelect: true,
			nowrap: true 
		}); 
	
	
/* 监管账户*/	
var _cols = new Array(
		{ title:'逻辑ID', name:'companybankPid', hidden:true, sortable: true, type: 'object'},
	    { title:'监管账户', name:'bankNo', width:110, align:'center', sortable: true, type: 'object'},
	    { title:'监管机构名称', name:'bankName' ,width:150, align:'center', sortable: true, type: 'object'},  
	    { title:'监管机构类型',name:'bankProperty', width: 100, align: 'center',lockWidth:true,sortable: true, type: 'object',
	    	renderer: function(val){
				 if(val=='1')
					 val='监管账户';
				 else if(val=='2')
					 val='基本账户'; 
				 return val}},
	    { title:'托管协议上传', name:'bankNo' ,width:150, align:'center', sortable: true, type: 'object'}
	    
	);
	
		var	mmg =  $("#mmg-account").mmGrid({
			height: 100,
			cols : _cols,
			url: 'xascf/customer/companyBankPage.shtml',   
			params: {'condition.customerPid':$("#customerPid").val()}, 
			method: 'post',
			autoLoad: true,
			indexCol : true,
			indexColWidth : 15, 
			fullWidthRows: true,
			cache: false,
			showBackboard:false,  
			multiSelect: true,
			nowrap: true 
			
		}); 	


var PersonalDetails = function() {
	return {
		init: function() {   
		},  
		
		local: function(){ 
			Menu.forward("xascf/customer/jsp/personalInfo.jsp");  
		},
		
		/*审核通过*/
		define: function(){
			if($("#companyStatus").val()==0 || $("#companyStatus").val()==2){ 
				alert("已审核或为后台登记业务无需再次审核");
				return;
			}  
			
			var customerPid =  $("#customerPid").val();	 
			PUI.MessageBox.show({
				title:"企业信息审核",
				content:"确定通过审核该企业信息吗?",
				type:"alert",
				buttons:[{ value: "是" },{ value: "否" }],
				success: function(result){
					if(result=="是"){
						$.post("xascf/customer/comapanydefine.shtml", {"customersubPid":customerPid}, function(data){
							PUI.MessageBox.info(data); 
							if(data=='审核成功'){
								$.post("xascf/customer/comapanyToShow.shtml",{"customersubPid":customerPid},function(data){    
									$("#xascfMainPanel").html(data); 
								});  
							} 
						}, "json");
					}
				} 
			})
			
		},
		
		/*取消审核通过*/
		cancel: function(){
			if($("#companyStatus").val()==0 || $("#companyStatus").val()==3){
				alert("已取消审核或为后台登记业务无需再次审核");
				return;
			} 
			var customerPid =  $("#customerPid").val();	 
			PUI.MessageBox.show({
				title:"企业信息审核", 
				content:"确定取消审核该企业信息吗?",
				type:"alert",
				buttons:[{value: "是"} , {value:"否"}],
				success: function(result){
					if(result=="是"){
						$.post("xascf/customer/comapanycancel.shtml", {"customersubPid":customerPid}, function(data){
							PUI.MessageBox.info(data);
							if(data=='取消审核成功'){
								$.post("xascf/customer/personalToShow.shtml",{"customersubPid":customerPid},function(data){    
									$("#xascfMainPanel").html(data); 
								});  
							}else{
								$.post("xascf/customer/personalToShow.shtml",{"customersubPid":customerPid},function(data){    
									$("#xascfMainPanel").html(data);  
								});  
							}
						}, "json"); 
					}
				}
			});
		}
	};
}();