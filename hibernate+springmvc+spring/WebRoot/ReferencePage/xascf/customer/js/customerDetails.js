$(document).ready(function(){
	PUI.plugin.init({},$("#details_form"));
	sns.valid.init($("#details_form"));
	
	var source = $("#companySource").val();
	if(source=="1"){
		$("#backstage").show();
		$("#reception").hide();
		 
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
	    { title:'账号', name:'bankNo', width:110, align:'center', sortable: true, type: 'object'},
	    { title:'开户人', name:'bankholder', width:110, align:'center', sortable: true, type: 'object'},
	    { title:'机构名称', name:'bankName' ,width:150, align:'center', sortable: true, type: 'object'},  
	    { title:'机构类型',name:'bankProperty', width: 100, align: 'center',lockWidth:true,sortable: true, type: 'object',
	    	renderer: function(val){
				 if(val=='1')
					 val='监管账户';
				 else if(val=='2')
					 val='基本账户'; 
				 return val}}, 
		{ title: '账户类型', name:'bankType', width: 150, align:'center', sortable: true, type: 'object', 
				renderer: function(val){
					 if(val=='1')
						 val='监管账户';
					 else if(val=='2')
						 val='结算账户'; 
			return val}},		 
	    { title:'托管协议', name:'agreementName' ,width:150, align:'center', sortable: true, type: 'object'}
	);
	
		var	mmg =  $("#mmg-bank").mmGrid({
			height: 100,
			cols : _cols,
//			url: 'xascf/customer/companyBankPage.shtml',   
			params: {'condition.customerPid':$("#customersubPid").val()}, 
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


var ComapanyDetails = function() {
	return {
		init: function() {   
		},  
		  
	};
}();