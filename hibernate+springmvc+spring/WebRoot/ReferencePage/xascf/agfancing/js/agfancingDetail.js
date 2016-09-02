$(document).ready(function(){
	PUI.plugin.init();
});

var customerIndex;
var customerPid;

/**
 * 融资信息列表
 */
var fancing_cols = [ 
				{ title:'会员PID', name:'memberPid' ,width:20, align:'center', sortable: true, type: 'object', hidden: true},
              	{ title:'会员编号', name:'memberNo' ,width:80, align:'center', sortable: true, type: 'object'},
              	{ title:'会员名称', name:'memberName' ,width:80, align:'left', sortable: true, type: 'object',
              		renderer: function(val,item,rowIndex){
//              		return '<span style=""><a href="#" onclick="AgfancingDetailPop.memberDetail(\''+item.memberNo+'\', \''+item.memberPid+'\', \''+item.creditNo+'\')">'+val+'</a></span>'
              			return val;
              		}},
              	{ title:'调查报告', name:'evaluateReportId' ,width:40, align:'center', sortable: true, type: 'object', 
              		renderer: function(val,item,rowIndex){
              			//return '<a href="#" onclick="CreditDetail.showEvaluateReport(\''+item.evaluateReportId+'\')">查看报告</a>'
              			return '<a href="#" onclick="AgfancingDetailPop.viewEvaluateReport(\''+item.evaluateReportId+'\')">查看报告</a>'
              		}},
              	{ title:'授信批复', name:'creditNo' ,width:30, align:'center', sortable: true, type: 'object', 
              		renderer: function(val,item,rowIndex){
//              		return '<a href="#" onclick="AgfancingDetailPop.creditDetail(\''+item.creditNo+'\')">'+item.creditNo+'</a>'
              			return '<a href="xascf/credit/toCreditResultPrintInner.shtml?creditNo='+item.creditNo+'" target="_bank">点击查看</a>'
              		}},
              	{ title:'基本信息', name:'' ,width:30, align:'center', sortable: true, type: 'object',
              		renderer: function(val,item,rowIndex){
              			return '<span style=""><a href="#" onclick="AgfancingDetailPop.memberDetail(\''+item.memberNo+'\', \''+item.memberPid+'\', \''+item.creditNo+'\')">点击查看</a></span>'
//              		return '<a href="#" onclick="AgfancingDetailPop.contractDetail(\''+item.contractNo+'\')">'+item.contractNo+'</a>'
              		}},
              	{ title:'账单总额', name:'billAmount' ,width:30, align:'center', sortable: true, type: 'object', 
              		renderer: function(val,item,rowIndex){
              			if (val==""||val==undefined) val=0.0;
              			return '<a class="btnPrice" href="javascript:void(0)" ' +
              					'onclick="AgfancingDetail.viewBill(\''+rowIndex+'\', \''+item.memberPid+'\')">'+formatMoney(val)+'</a>';
              		}
              	}
              ];


var fancing_mmg = $("#fancing_mmg").mmGrid({
	height : 290,
	cols : fancing_cols,
	url : 'xascf/agfancing/agfancingDetailPage.shtml',
	params : {
		'condition.agfancingPid' : $("#agfancingPid").val()
	},
	method : 'post',
	checkCol : false,
	autoLoad : true,
	fullWidthRows : true,
	indexCol : false,
	indexColWidth : 15,
	cache : false,
	multiSelect : false,
	nowrap : true
});

fancing_mmg.on("loadSuccess",function(e,data){
});
mmGridResizeListener(fancing_mmg, $(".page-content"));

/**
 * 账单信息列表
 */
var bill_conf_cols =[ 
		    { title:'会员ID', name:'memberPid' ,width:80, align:'center', sortable: true, type: 'object', hidden: true},
		    { title:'账单编号', name:'billNo' ,width:80, align:'center', sortable: true, type: 'object'},
		    { title:'账单类型', name:'billType' ,width:40, align:'center', sortable: true, type: 'object'},
		    { title:'账单金额', name:'billPrice' ,width:40, align:'center', sortable: true, type: 'object',
		    	 renderer: function(val){return formatMoney(val)+' 元'}},
		    { title:'账单开始日', name:'startDate' ,width:40, align:'center', sortable: true, type: 'object'},
		    { title:'账单到期日', name:'rebackDate' ,width:40, align:'center', sortable: true, type: 'object'},
		    { title:'状态', name:'billStatus' ,width:80, align:'center', sortable: true, type: 'object'},
		    { title:'对应放款单号', name:'fancingOrderNo' ,width:80, align:'center', sortable: true, type: 'object',
		    	renderer: function(val,item,rowIndex){
		    		return '<a class="btnPrice" href="javascript:void(0)" onclick="fancingOrderDetail4Pop.fancingDetail(\''+item.fancingOrderNo+'\')">'+item.fancingOrderNo+'</a>';
		    	}
		    },
		    { title:'放款凭证', name:'fileName' ,width:80, align:'center', sortable: true, type: 'object',
		    	renderer: function(val,item,rowIndex){
		    		return '<a onclick="FileUtil.downLoad(\''+item.fileUrl+'\',\''+item.fileName+'\');" href="#">'+item.fileName+'</a>';
		    	}}
         ];
var bill_conf_mmg =  $("#bill_conf_mmg").mmGrid({
         	height : 200,
         	cols : bill_conf_cols,
         	url : 'xascf/agfancing/billConfig.shtml',
         	params : function(){
         		return {
	         		'condition.agfancingOrderNo' : $("#agfancingOrderNo").val(), 
	         		'condition.memberPid' : customerPid, 
	         		'condition.exceptBillStatus' : '20'
         		}
			},
         	method : 'post',
    		checkCol: false,
			autoLoad: true,
			indexCol:true,
			fullWidthRows: true,
			indexColWidth: 15, 
			cache: false,
			multiSelect: false,
			nowrap: true
         });
bill_conf_mmg.on("loadSuccess",function(e,data){
});

var AgfancingDetail = function() {
	return { 
		//账单配置
		viewBill : function(index, memberPid) { 
			customerIndex = index;
			customerPid = memberPid;
			$("#tabwin_bill_conf").popup({md:true});
			bill_conf_mmg.load();
		},
		//返回列表
		reback : function(){
			Menu.forward("xascf/agfancing/jsp/agfancingList.jsp");  
		}
	};
}();

