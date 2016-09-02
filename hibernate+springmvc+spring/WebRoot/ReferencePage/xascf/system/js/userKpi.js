$(document).ready(function(){   
	PUI.plugin.init({},$("#userKpiSearchForm"));
	sns.valid.init($("#userKpiSearchForm")); 
	 
	var myDate = new Date();
	var nowMonth = myDate.getMonth(); 
	var nowYear = myDate.getYear();
	var monthStartDate = new Date(nowYear, nowMonth, 1);      
	var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));  
	
	var m=myDate.getMonth(); 
 
//	var starStr = monthStartDate.format("yyyy-MM-dd");
//	var endStr = monthEndDate.format("yyyy-MM-dd");
	 
	 if(m>=1 && m<=3) 
		 $("#kpidetalQuarter").text("第一季度"); 
	 if(m>=4 && m<=6) 
		 $("#kpidetalQuarter").text("第二季度"); 
	 if(m>=7 && m<=9) 
		 $("#kpidetalQuarter").text("第三季度"); 
	 if(m>=10 && m<=12) 
		 $("#kpidetalQuarter").text("第四季度"); 
//	 $("#kpidetalDateblock").text(starStr + "~" + endStr);
	 
	 function getMonthDays(nowMonth){     
		    var monthStartDate = new Date(nowYear, nowMonth, 1);      
		    var monthEndDate = new Date(nowYear, nowMonth + 1, 1);      
		    var days = (monthEndDate - monthStartDate)/(1000*60*60*24);      
		    return days;      
		}     
});    


var _initShipGrid=function(){
	var cols=[
	          {title: "运单号",name:"shipNo" ,width:120, sortable: true, type:'string', align:'center'},
	          {title: "",name:"shipOrderPid" ,width:120, sortable: true, type:'string', align:'center',hidden:true},
	          {title: "委托人",name:"shipClient" ,width:120, sortable: true, type:'string', align:'center'},
	          {title: "收货人",name:"shipConsigneeName" ,width:120, sortable: true, type:'string', align:'center'},
	          {title: "",name:"shipConsigneePid" ,width:120, sortable: true,hidden:true, type:'string', align:'center'},
	          {title: "车牌号码",name:"shipCarNo" ,width:80, sortable: true, type:'string', align:'center'},
	          {title: "出发地",name:"shipFrom" ,width:80, sortable: true, type:'string', align:'center'},
	          {title: "目的地",name:"shipTo" ,width:80, sortable: true, type:'string', align:'center'},
	          {title: "运单金额(元)",name:"shipPrice" ,width:120, sortable: true, type:'string', align:'center'},
	          {title: "货物名称",name:"shipName" ,width:120, sortable: true, type:'string', align:'center'},
	          {title: "货物数量",name:"shipNum" ,width:120, sortable: true, type:'string', align:'center'},
	          {title: "状态",name:"shipStatus" ,width:60, sortable: true, type:'string', align:'center',
	        	  renderer: function(val){
						 if(val=='1')
							 val='已签收';
						 else if(val=='2')
							 val='运输中';
				return val}}
	          ];
	ship_mmg=$('#ship_mmg').mmGrid({
		width:'auto',
		height: 160,
		cols: cols, 
		indexCol: true,
		indexColWidth: 30,
		checkCol:true,
		fullWidthRows:true,
		multiSelect: true,
		nowrap : true,
		autoLoad : true,
		params : {fancingOrderNo:$("#facingOrderNo").val()},
		url : 'xascf/shipOrder/page.shtml'
	}); 
};   

var userKpi=function(){
	var ship_mmg=null;
	var buyer_mmg=null; 
	var _init=function(){
		_initBuyerGrid();
		_initShipGrid(); 
	};   
	 
	var _initBuyerGrid=function(){ 
		var buyer_cols = new Array(
			    { title:'企业名称', name:'customerName' ,width:150, align:'center', sortable: true, type: 'string'},
			    { title:'企业PID', name:'customersubPid' ,width:150, align:'center', sortable: true, hidden:true},
			    { title:'企业PID', name:'customersubPid' ,width:150, align:'center', sortable: true, hidden:true}
			);
			if(buyer_mmg!=null){
				return;
			}
			buyer_mmg =  $("#buyer_mmg").mmGrid({
				height: 'auto',
				cols: buyer_cols,
				url : 'xascf/material/getBuyPage.shtml',
	            params : {fancingOrderNo:$("#facingOrderNo").val()},
				method: 'post',
				checkCol: true,
				autoLoad: true,
				fullWidthRows: true,
				indexColWidth: 15, 
				cache: false,
				multiSelect: true,
				nowrap: true
			});
	};
	 
	return{
		init:_init,
		
	 
		editRootType :function(){
			$.post("xascf/baseData/toRootMaterailjsp.shtml",function(data){
				$("#tabwin_add_content_root").html(data);
				$("#tabwin_add_root").popup({md:true});
			},"html");
		}, 
		
		backtrack : function(){
			Menu.forward("xascf/system/jsp/kpiList.jsp");
		},
		 
		save: function(){ 
			if (!$("#userKpiSearchForm").isValid()) {
				return ;
     		} 
			var params = $("#userKpiSearchForm").serializeArray(); ;
			
//			params.push({ //员工Pid
//				name: 'kpiIndexModel.userPid',
//				value: $("#userPid").val()
//			});
//			params.push({ //KPI考核Pid
//				name: 'kpiIndexModel.kpiindexPid',
//				value: $("#kpiindexPid").val()
//			});
			params.push({ //员工编号
				name: 'kpiIndexModel.userNo',
				value: $("#userNo").html()
			});
			params.push({ //员工姓名
				name: 'kpiIndexModel.userNameCn',
				value: $("#userNameCn").html()
			});
			params.push({ //考核季度
				name: 'kpiIndexModel.kpidetalQuarter',
				value: $("#kpidetalQuarter").html()
			});
			params.push({ //岗位状态
				name: 'kpiIndexModel.workstatus',
				value: $("#workstatus").html()
			});
			params.push({ //企业会员个数
				name: 'kpiIndexModel.entCount',
				value: $("#entCount").html()
			});
			params.push({ //个人会员个数
				name: 'kpiIndexModel.perCount',
				value: $("#perCount").html()
			});
			params.push({ //会员总数
				name: 'kpiIndexModel.customerCount',
				value: $("#customerCount").html()
			});
			params.push({ //新建融资单数
				name: 'kpiIndexModel.newfancingCount',
				value: $("#newfancingCount").html()
			});
			params.push({ //融资单总数
				name: 'kpiIndexModel.fancingCount',
				value: $("#fancingCount").html()
			});
			params.push({ //融资单总金额
				name: 'kpiIndexModel.newfancingMoney',
				value: $("#newfancingMoney").html()
			});
			params.push({ //本次融资单差额
				name: 'kpiIndexModel.fancingdifference',
				value: $("#fancingdifference").html()
			});
			params.push({ //总差额
				name: 'kpiIndexModel.totalFancingdifference',
				value: $("#totalFancingdifference").html()
			});
			params.push({ //融资单总金额
				name: 'kpiIndexModel.fancingMoney',
				value: $("#fancingMoney").html()
			});
			params.push({ //本月已发生放款融资单数
				name: 'kpiIndexModel.singularbBacksection',
				value: $("#singularbBacksection").html()
			});
			params.push({ //融资单放款总额
				name: 'kpiIndexModel.totalBacksectionmoney',
				value: $("#totalBacksectionmoney").html()
			});
			params.push({ //本月已发生还款融资单数
				name: 'kpiIndexModel.singularRepayment',
				value: $("#singularRepayment").html()
			});
			params.push({ //本月已发生还款总金额
				name: 'kpiIndexModel.totalRepayment',
				value: $("#totalRepayment").html()
			});
			params.push({ //本月产出收益总额
				name: 'kpiIndexModel.totalEarnings',
				value: $("#totalEarnings").html()
			});
			params.push({ //本月坏账融资单数
				name: 'kpiIndexModel.singularBadbill',
				value: $("#singularBadbill").html()
			}); 
			params.push({ //坏账总数
				name: 'kpiIndexModel.totalBadbill',
				value: $("#totalBadbill").html()
			});
			params.push({ //考核时间
				name: 'kpiIndexModel.kpidetalDateblock',
				value: $("#kpidetalDateblock").html()
			});
			params.push({ //考核时间
				name: 'kpiIndexModel.kpidetalDateblock',
				value: $("#kpidetalDateblock").html()
			});


			$.post("xascf/system/user/toKpiResults.shtml",params,function(data){    
				if(data.result){
        			PUI.MessageBox.info(data.msg);
    				Menu.forward("xascf/system/jsp/kpiList.jsp");  
				} 
			});  
			
			
			
		}, 
		
		/**重置**/
		reset: function(){ 
			PUI.util.resetForm($("form"));
		}
		
		
	};
}();
 var root_option= function(){
	 return{
	 };
 }();
