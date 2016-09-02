 $(document).ready(function(){
 	PUI.plugin.init({},$("#fancingLoanListQueryForm"));
	sns.valid.init($("#fancingLoanListQueryForm"));
});
var _cols = [
     { title:'融资单号', name:'businessNo' ,width:120, align:'center', sortable: true, type: 'object'
//    	renderer: function(val){
//    		return '<a class="btnPrice" href="javascript:void(0)" onclick="fancingDetail(\''+val+'\')">'+val+'</a>';
//    	}
    }, 	      
    { title:'融资会员', name:'customerName' ,width:150, align:'center', sortable: true, type: 'object'},
    { title:'放款金额(元)', name:'loanAmount' ,width:120, align:'center', sortable: true, type: 'object'},
	{ title:'服务费(元)', name:'servicesPrice' ,width:120, align:'center', sortable: true, type: 'object'},
	{ title:'保证金(元)', name:'deposit' ,width:120, align:'center', sortable: true, type: 'object'},
    { title:'操作', name:'loanStatus' ,width:80, align:'center', sortable: true, type: 'String',
    	renderer: function(val,item,rowIndex){
    	  	if(val=="1")
				return  '<a class="btnPrice" href="javascript:void(0)" onclick="fancingLoanList.loanTrialPop(\''+rowIndex+'\')">放款初审</a>'
			else if(val=="3")
				return  '<a class="btnPrice" href="javascript:void(0)" onclick="fancingLoanList.loanConfirmPop(\''+rowIndex+'\')">放款确认</a>'
   		}
   	}
];
var loan_mmg =  $("#loan_mmg").mmGrid({
	height : getAutoHeightByMmGrid($("#xascfMainPanel")),
	cols : _cols,
	url : 'xascf/fund/preloan/getPage.shtml',
	params : $("#fancingLoanListQueryForm").serialize(),
	method : 'post',
	autoLoad : true,
	showBackboard:false,
	indexCol : true,
	indexColWidth : 15,
	sortName : 'id',
	sortStatus : 'desc',
	fullWidthRows : true,
	cache : false,
	multiSelect: true,
	plugins : [$('#loan_pg').mmPaginator({})]
});
mmGridResizeListener(loan_mmg, $(".page-content"));
var fancingLoanList = function() {
	return {
		/**查询*/
		query : function() {
				loan_mmg.load($("#fancingLoanListQueryForm").serialize());
		},
		//放款初审
		loanTrialPop:function(rowIndex){
			var item=loan_mmg.row(rowIndex);
			var $loanTrialForm =$("#loanTrialForm");
			$loanTrialForm.find("#preloanPid").val(item.preloanPid);
			$loanTrialForm.find("#businessNo").val(item.businessNo);
			$loanTrialForm.find("#loanAmount").val(item.loanAmount);
			$loanTrialForm.find("#servicesPrice").val(item.servicesPrice);
			$loanTrialForm.find("#deposit").val(item.deposit);
			$("#tabwin_trial").popup({md:true});

		},
		//取消初审
		cancleTrial : function(){
			$("#tabwin_trial").popup({display:false});
		},
		loanTrial :function(){
			var params = "";
			var $loanTrialForm =$("#loanTrialForm");
			params+="preloanPid=" + $loanTrialForm.find("#preloanPid").val();
			params+="&approvalRemark=" + $loanTrialForm.find("#approvalRemark").val();
			params+="&businessNo=" + $loanTrialForm.find("#businessNo").val();
			$.post("xascf/fund/preloan/loanTrial.shtml",params,function(data){
				var message=data;
				if(message.indexOf("成功")){
					fancingLoanList.cancleTrial();
					fancingLoanList.query();
				}
				PUI.MessageBox.info(message);
			});
		},
		//放款确认弹出
		loanConfirmPop:function(rowIndex){
			var item=loan_mmg.row(rowIndex);
			var $loanConfirmForm =$("#loanConfirmForm");
			$loanConfirmForm.find("#preloanPid").val(item.preloanPid);
			$loanConfirmForm.find("#businessNo").val(item.businessNo);
			$loanConfirmForm.find("#loanAmount").val(item.loanAmount);
			$loanConfirmForm.find("#servicesPrice").val(item.servicesPrice);
			$loanConfirmForm.find("#deposit").val(item.deposit);
			$("#tabwin_confirm").popup({md:true});
		},
		//放款确认
		loanConfirm :function(){
			var params = "";
			var $loanConfirmForm =$("#loanConfirmForm");
			params+="preloanPid=" + $loanConfirmForm.find("#preloanPid").val();
			params+="&approvalRemark=" + $loanConfirmForm.find("#approvalRemark").val();
			params+="&businessNo=" + $loanConfirmForm.find("#businessNo").val();
			$.post("xascf/fund/preloan/loanConfirm.shtml",params,function(data){
				var message=data;
				if(message.indexOf("成功")){
					fancingLoanList.cancleConfirm();
					fancingLoanList.query();
				}
				PUI.MessageBox.info(message);
			});
		},

		//取消确认
		cancleConfirm : function(){
			$("#tabwin_confirm").popup({display:false});
		},
		/**清空**/
		clear : function(){
			PUI.util.resetForm($("#fancingLoanListQueryForm"));
		}
	};
}();