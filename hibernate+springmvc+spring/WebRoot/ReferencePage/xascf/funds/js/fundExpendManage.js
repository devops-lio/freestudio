 $(document).ready(function(){
 	PUI.plugin.init();
	sns.valid.init($("form"));
	$('#financingBtn').on('shown', function (e) {
		fundExpendManage.financingGrid();
	});
	$('#productBtn').on('shown', function (e) {
		fundExpendManage.productGrid();
	});

});


var borrowedFund_cols = [
	{ title:'融入单号', name:'incomeNo' ,width:120, align:'center', sortable: true, type: 'object'},
    { title:'融入银行账号', name:'bankNo' ,width:150, align:'center', sortable: true, type: 'object'},
    { title:'操作', name:'fundIncomePid' ,width:140, align:'center',sortable: true, type: 'String', 
    	renderer: function(val,item,rowIndex){
    		return '<a class="btnPrice" href="javascript:void(0)" onclick="fundExpendManage.borrowedFundPayInterest(\''+val+'\')">还息' +  '</a>'
    		 + '&nbsp<a class="btnPrice" href="javascript:void(0)" onclick="fundExpendManage.borrowedFundRepay(\''+val+'\')">还款' +  '</a>'
    	}
    },
    { title:'交易流水号', name:'transactionSerialNo' ,width:140, align:'center', sortable: true, type: 'object'},
    { title:'融入金额', name:'incomeAmount' ,width:120, align:'center', sortable: true, type: 'object',
    	renderer: function(val){return formatMoney(val)+' 元'}},
    { title:'现有金额', name:'currentAmount' ,width:120, align:'center', sortable: true, type: 'object',
    		renderer: function(val){return formatMoney(val)+' 元'}},
    { title:'融入时间', name:'createTimeStr' ,width:150, align:'center', sortable: true, type: 'object'},
    { title:'到期日期', name:'expireDate' ,width:80, align:'center', sortable: true, type: 'object'},
    { title:'利率', name:'fundRate' ,width:50, align:'center', sortable: true, type: 'object',
    	renderer: function(val){
    		if(null==val)
    			return "";
    		else
    		return val+'%'}}
    
];

borrowedFund_mmg =  $("#borrowedFund_mmg").mmGrid({
	height : getAutoHeightByMmGrid($("#xascfMainPanel")),
	cols : borrowedFund_cols,
	url : 'xascf/fund/fundIncome/getFundIncomeList.shtml?condition.notIncomeType=01',
	params : {'condition.incomeNo':$("#orderNo").val()
	},
	method : 'post',
	autoLoad : true,
	indexCol : true,
	indexColWidth : 15,
	sortName : 'dmdiId',
	sortStatus : 'desc',
	fullWidthRows : true,
	cache : false,
	multiSelect: true,
	plugins : [$('#borrowedFundpg').mmPaginator({})]
});
mmGridResizeListener(borrowedFund_mmg, $(".page-content"));



var financing_mmg = null;
var financing_cols = [
     { title:'放款单号', name:'fancingOrderNo' ,width:120, align:'center', sortable: true, type: 'object',
    	 renderer: function(val){
     		return '<a class="btnPrice" href="javascript:void(0)" onclick="fancingOrderDetail4Pop.fancingDetail(\''+val+'\')">'+val+'</a>';
     	}}, 
     	{ title:'操作', name:'' ,width:40, align:'center',sortable: true, type: 'String', 
        	renderer: function(val,item,rowIndex){
        		var _status=item.loanStatus;
        		if(_status=='1')
        			return '<a class="btnPrice" href="javascript:void(0)" onclick="fundExpendManage.fancingLend(\''+rowIndex+'\')">放款' +  '</a>';
        		else if(_status=='2')
        			return '<a class="btnPrice" href="javascript:void(0)" onclick="fundExpendManage.fancingEdit(\''+rowIndex+'\')">编辑' +  '</a>';
        		else
        			return '';
        	}
        },
    { title:'会员名称', name:'loanMemberName' ,width:250, align:'left', sortable: true, type: 'object',
		  renderer: function(val,item,rowIndex){return '<span style=""><a href="#" onclick="customerDetailPop.customerDetail(\''+item.loanMemberPid+'\')">'
	    	  +val+'</a></span>'}},
    { title:'放款金额', name:'loanPrice' ,width:100, align:'center', sortable: true, type: 'object',
    	renderer: function(val,item,rowIndex){
    		return '<span >' +formatMoney(val)+' 元</span>'
    	}},
	{ title:'预放款日期', name:'loanDate' ,width:100, align:'center', sortable: true, type: 'object'},
	{ title:'收款开户人', name:'loanBankPayee' ,width:120, align:'center', sortable: true, type: 'object'},
	{ title:'收款银行', name:'loanBankName' ,width:120, align:'center', sortable: true, type: 'object'},
	{ title:'收款账号', name:'loanBankAccount' ,width:120, align:'center', sortable: true, type: 'object'},
	{ title:'状态', name:'loanStatus' ,width:40, align:'center', sortable: true, type: 'object',
		renderer: function(val,item,rowIndex){
			if(val=='1'){
				val="待放款";
			}else if(val=='2'){
				val='已放款'
			}
    		return val;
    	}},
    	{ title:'放款时间', name:'payDate' ,width:120, align:'center', sortable: true, type: 'object'}
//	{ title:'监管账号开户行', name:'accountOpenbank' ,width:120, align:'center', sortable: true, type: 'object'},
//	{ title:'监管账号', name:'account' ,width:120, align:'center', sortable: true, type: 'object'},
     
];

var product_mmg = null;
var product_cols = [
	{title:'产品编号',name:'productNo', width: 110, align: 'center',type:'String'},
    { title:'产品名称', name:'name' ,width:120, align:'center', sortable: true, type: 'String'},
   	{ title:'本金(万元)', name:'purchaseAmount' ,width:100, align:'center', sortable: true, type: 'String'},
    { title:'预计收益(元)', name:'interest' ,width:100, align:'center', sortable: true, type: 'String'},
    { title:'暂定收益(元)', name:'presentProfit' ,width:100, align:'center', sortable: true, type: 'String'},
    { title:'投资时间', name:'purchaseTime' ,width:90, align:'center', sortable: true, type: 'String'},
    { title:'购买者', name:'loginName' ,width:100, align:'center', sortable: true, type: 'String'},
    { title:'操作', name:'purchasePid' ,width:150, align:'center',sortable: true, type: 'String', 
    	renderer: function(val){
    		return '<a class="btnPrice" href="javascript:void(0)" onclick="fundExpendManage.productReturn(\''+val+'\')">返还本息' +  '</a>'
    	}
    }
];

var fundExpendManage = function() {
	return {

		financingGrid:function(){	
			if (null != financing_mmg) {
				return;
			}

	        financing_mmg =  $("#financing_mmg").mmGrid({
	        	height : getAutoHeightByMmGrid($("#xascfMainPanel")),
	        	cols : financing_cols,
	        	url : 'xascf/fund/loanNoite/getPage.shtml',
	        	params : {'condition.fancingOrderNo':$("#orderNo").val()},
	        	method : 'post',
	        	autoLoad : true,
	        	indexCol : true,
	        	indexColWidth : 15,
	        	sortName : 'dmdiId',
	        	sortStatus : 'desc',
	        	fullWidthRows : true,
	        	cache : false,
	        	multiSelect: true,
	        	plugins : [$('#financingpg').mmPaginator({})]
	        });
	        mmGridResizeListener(financing_mmg, $(".page-content"));

		},
		productGrid:function(){	
			if (null != product_mmg) {
				return;
			}

	        product_mmg =  $("#product_mmg").mmGrid({
	        	height : getAutoHeightByMmGrid($("#xascfMainPanel")),
	        	cols : product_cols,
	        	url : 'xascf/product/purchase/page.shtml?condition.profitStatus=2',
	        	params : $("#fundExpendManageQueryForm").serialize(),
	        	method : 'post',
	        	autoLoad : true,
	        	indexCol : true,
	        	indexColWidth : 15,
	        	sortName : 'dmdiId',
	        	sortStatus : 'desc',
	        	fullWidthRows : true,
	        	cache : false,
	        	multiSelect: true,
	        	plugins : [$('#productpg').mmPaginator({})]
	        });
	        mmGridResizeListener(financing_mmg, $(".page-content"));

		},
		/**查询*/
		query : function() {
			var params = "";
			var noVal = $("#orderNo").val();
			if($("#borrowedFundTab").hasClass('active')){
				params = params +"condition.incomeNo="+noVal;
           	 	borrowedFund_mmg.load(params);
			}else if($("#financingTab").hasClass('active')){
				params = params +"condition.fancingOrderNo="+noVal;
            	financing_mmg.load(params);
			}else if($("#productTab").hasClass('active')){
				params = params +"condition.productNo="+noVal;
            	product_mmg.load(params);
			}
		},

		/**清空**/
		clear : function(){
			PUI.util.resetForm($("#fundExpendManageQueryForm"));
		},
		//融资放款
		fancingLend : function(val) {
			var item=financing_mmg.row(val);
        	var jHtml = $(PUI.String.format($("#fancingLoan-template-tab").html(),$.extend(item, {rowIndex: val})));
			$("#tabwin_fancing_content").html(jHtml[0].outerHTML);
			$("#tabwin_fancing").popup({md:true});
			PUI.plugin.init({}, $("#tabwin_fancing_content"));
			$("#receiveBtn").on("click", function() {
				fundExpendManage.fancingLoan();
			});
			
			$("#calcleBtn").on("click", function() {
				$("#tabwin_fancing").popup({display:false});
			});

		},
		
		//融资放款
		fancingEdit : function(val) {
			var item=financing_mmg.row(val);
			
			$.post("xascf/fund/loanNoite/getLoanRecordByOrderNo.shtml",{fancingOrderNo:item.fancingOrderNo},function(response){  
				if(response.result){
		        	var jHtml = $(PUI.String.format($("#fancingLoan-template-tab").html(),$.extend(item, {rowIndex: val})));
					$("#tabwin_fancing_content").html(jHtml[0].outerHTML);
					
					var model = response.data;
					$("#loanRecordPid").val(model.loanRecordPid);
					$("#bankNo").val(model.payBankNo);
					$("#payNo").val(model.payNo);
					$("#transactionDate").val(model.loanDate.substr(0,10));
					$("#fileName").val(model.fileName);
					$("#fileUrl").val(model.fileUrl);
					if(model.fileName!=null){
						$("#show_fileName").html('<a href="#" style="text-align: center;" onclick="FileUtil.downLoad(\''+model.fileUrl+'\',\''+model.fileName+'\')">'+model.fileName+'</a>');
					}
					
					$("#tabwin_fancing").popup({md:true});
					PUI.plugin.init({}, $("#tabwin_fancing_content"));
					$("#receiveBtn").on("click", function() {
						fundExpendManage.fancingLoan();
					});
					
					$("#calcleBtn").on("click", function() {
						$("#tabwin_fancing").popup({display:false});
					});
				}
			});

		},
		addUploadPop : function(){
			   var parameterArray = new Array();
				parameterArray.push("fileName");
				parameterArray.push("fileUrl");
			   pluploadUtil.init(
					   "/XA_SCF/xascf/util/plupload.shtml",
						{type : "baolifangkuan", requestName:$("#loanFancingOrderNo").val(), flag:"",title : "Image files", extensions : "jpg,gif,png",
						whatFile:"bank"},"",fundExpendManage.fillUrlAndName,parameterArray, false);
			},
			//上传回调函数
		fillUrlAndName : function(fileArray,parameter){
			$("#fileName").val(fileArray[2]);
			$("#fileUrl").val(fileArray[0]);
			$("#show_fileName").html('<a href="#" style="text-align: center;" onclick="FileUtil.downLoad(\''+fileArray[0]+'\',\''+fileArray[2]+'\')">'+fileArray[2]+'</a>');
		},
		fancingLoan :function (){
			if(!$("#fancingForm").isValid()) {
				return ;
			}
//			var aurl=$("#fileUrl").val();
//			if(aurl==''){
//				PUI.MessageBox.info("请上传放款凭证附件!");
//				return;
//			}
			var param = $("#fancingForm").serialize();
			
			var url = "xascf/fund/loanNoite/fancingLoan.shtml";
			var loanRecordPid = $("#loanRecordPid").val();
			if(loanRecordPid!=null&&loanRecordPid!=""&&loanRecordPid!=undefined){
				url = "xascf/fund/loanNoite/fancingLoanEdit.shtml";
			}
			//保存数据至数据库中
			$.post(url,param,function(data){
				if(data.indexOf('成功')>0){
					$("#tabwin_fancing").popup({display:false});
					fundExpendManage.query();							
				}
				PUI.MessageBox.info(data);
			}, "json");	
		},
		//借入资金还款
		borrowedFundRepay : function(val){
			$("#account4Repay").val('');
			$("#tabwin_repay").popup({md:true});
			$("#fundIncomePid4Repay").val(val);

		},
		//借入资金还息
		borrowedFundPayInterest : function(val){
			$("#bankNo4LX").val('');
			$("#tabwin_payInterest").popup({md:true});
			$("#fundIncomePid").val(val);
		},
		//借入资金还息
		payInterest : function(){
			
			if (!$("#payInterestForm").isValid()) {
				return;
			}
			var fundIncomePid = $("#fundIncomePid").val();
			var transactionObjectAccount = $("#bankNo4LX").val();
			var interest = $("#interest").val();
			PUI.MessageBox.show({
				title : "还息",
				content : "你确定要偿还利息吗？",
				type : "alert",
				buttons : [{
					value : "是"
				}, {
					value : "否"
				}],
				success : function(result) {
					if (result == "是") {
						$.post("xascf/fund/fundExpend/incomeFundPayInterest.shtml", 
							"fundIncomePid="+ fundIncomePid+"&transactionObjectAccount="+transactionObjectAccount+"&interest="+interest, 
						function(data) {
			 				var message=data;
							if(message.result){
								$("#tabwin_payInterest").popup({display:false});
								PUI.util.resetForm($("#payInterestForm"));
							}
							PUI.MessageBox.info(message.msg);
						});
					}
					
				}
			});
		},
		//借入资金还款
		repay : function(){
			if (!$("#repayForm").isValid()) {
				return;
			}
			var fundIncomePid = $("#fundIncomePid4Repay").val();
			var transactionObjectAccount = $("#account4Repay").val();
			var principal = $("#principal").val();
			PUI.MessageBox.show({
				title : "还款",
				content : "你确定要还款吗？",
				type : "alert",
				buttons : [{
					value : "是"
				}, {
					value : "否"
				}],
				success : function(result) {
					if (result == "是") {
						$.post("xascf/fund/fundExpend/incomeFundRepay.shtml", 
							"fundIncomePid="+ fundIncomePid+"&transactionObjectAccount="+transactionObjectAccount+"&principal="+principal, 
						function(data) {
			 				var message=data;
							if(message.result){
								$("#tabwin_repay").popup({display:false});
								borrowedFund_mmg.load();
							}
							PUI.MessageBox.info(message.msg);
							PUI.util.resetForm($("#repayForm"));
						});
					}
				}
			});
		},
		//取消还息
		cancelPayInterest : function(){
			$("#tabwin_payInterest").popup({display:false});
		},
		//取消还款
		cancelRepay : function(){
			$("#tabwin_repay").popup({display:false});
		},
		//理财产品返还本息
		productReturn : function(val) {
			PUI.MessageBox.show({
				title : "返还金额",
				content : "你确定要返还本息吗？",
				type : "alert",
				buttons : [{
					value : "是"
				}, {
					value : "否"
				}],
				success : function(result) {
					if (result == "是") {
						$.post("xascf/fund/fundExpend/productReturn.shtml", "purchasePid="+ val, 
						function(data) {
			 				var message=data;
							if(message.result){
								product_mmg.load();
							}
							PUI.MessageBox.info(message.msg);
						});
					}
				}
			});

		}
	};
}();