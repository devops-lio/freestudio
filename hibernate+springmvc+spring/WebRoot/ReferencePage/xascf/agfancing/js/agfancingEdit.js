$(document).ready(function(){
	PUI.plugin.init({},$("#agfancingForm"));
	sns.valid.init($("#agfancingForm"));
	if($("#agfancingPid").val()!="")
	{
		$("#customerNamePop1").attr("style","display:none");
		$("#customerNamePop2").attr("style","display:block");
	}
});

var customerIndex;
var customerPid;
var customer_items;

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
              			return formatMoney(val);
              		}},
              	{ title:'操作', name:'' ,width:30, align:'center', sortable: true, type: 'object',
              		renderer: function(val,item,rowIndex){
              			return '<a class="btnPrice" href="javascript:void(0)" ' +
              					'onclick="AgfancingEdit.configureBill(\''+rowIndex+'\', \''+item.memberPid+'\')">账单配置</a>';
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
	checkCol : true,
	autoLoad : true,
	fullWidthRows : true,
	indexCol : false,
	indexColWidth : 15,
	cache : false,
	multiSelect : true,
	nowrap : true
});

fancing_mmg.on("loadSuccess",function(e,data){
});
mmGridResizeListener(fancing_mmg, $(".page-content"));

/**
 * 会员列表
 */
var customer_cols =[ 
			{ title:'会员PID', name:'memberPid' ,width:80, align:'center', sortable: true, type: 'object', hidden: true},
		    { title:'会员编号', name:'memberNo' ,width:80, align:'center', sortable: true, type: 'object', hidden: true},
		    { title:'会员名称', name:'memberName' ,width:80, align:'center', sortable: true, type: 'object', 
		    	renderer: function(val,item,rowIndex){
		    			if(val==null) return '';
              			return '<span style=""><a href="#" onclick="customerDetailPop.customerDetail(\''+item.memberPid+'\')">'+val+'</a></span>'
              		}},
		    { title:'授信编号', name:'creditNo' ,width:80, align:'center', sortable: true, type: 'object', 
		    	renderer: function(val,item,rowIndex){
		    			if(val==null) return '';
              			return '<span style=""><a href="#" onclick="AgfancingDetailPop.creditDetail(\''+val+'\', \'-1\')">'+val+'</a></span>'
              		}},
		    { title:'合同编号', name:'contractNo' ,width:80, align:'center', sortable: true, type: 'object',
		    	renderer: function(val,item,rowIndex){
		    			if(val==null) return '';
              			return '<span style=""><a href="#" onclick="AgfancingDetailPop.contractDetail(\''+val+'\', \'-1\')">'+val+'</a></span>'
              		}},
		    { title:'授信批复额度', name:'replyQuota' ,width:40, align:'center', sortable: true, type: 'object',
		    	 renderer: function(val){return formatMoney(val)+' 元'}},
		    { title:'授信开始日', name:'creditStartTime' ,width:40, align:'center', sortable: true, type: 'object'},
		    { title:'授信结束日', name:'creditEndTime' ,width:40, align:'center', sortable: true, type: 'object'},
		    { title:'票据总额度', name:'notePrice' ,width:40, align:'center', sortable: true, type: 'object',
		    	 renderer: function(val){return formatMoney(val)+' 元'}},
		    { title:'放款总额度', name:'replyPrice' ,width:40, align:'center', sortable: true, type: 'object',
		    	 renderer: function(val){return formatMoney(val)+' 元'}},
		    { title:'业务经理', name:'operator' ,width:40, align:'center', sortable: true, type: 'object'},
		    { title:'授信编号', name:'creditNo' ,width:40, align:'center', sortable: true, type: 'object', hidden: true},
		    { title:'合同编号', name:'contractNo' ,width:40, align:'center', sortable: true, type: 'object', hidden: true},
		    { title:'调查报告', name:'evaluateReportId' ,width:40, align:'center', sortable: true, type: 'object', hidden: true}
         ];
var customer_mmg =  $("#customer_mmg").mmGrid({
         	height : 285,
         	cols : customer_cols,
         	url : 'xascf/agfancing/customerPageForAgfancing.shtml', 
			params: function(){return {
	     				'condition.agfancingPid' : $("#agfancingPid").val(), 
	     				'condition.agfancingCustomerPid' : $("#customerPid").val()
	     				}},
         	method : 'post',
    		checkCol: true,
			autoLoad: false,
			indexCol:true,
			fullWidthRows: true,
			indexColWidth: 15, 
			cache: true,
			multiSelect: true,
			nowrap: true
         }); 
customer_mmg.on("loadSuccess",function(e,data){
	for(var i=0;i<customer_mmg.rowsLength();i++){
		for (var j = 0; j < fancing_mmg.rowsLength(); j++){
			if(customer_mmg.row(i)['memberNo']==fancing_mmg.row(j)['memberNo']){
				customer_mmg.select(i);
			}
		}
	}
});

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
		    { title:'对应放款单号', name:'fancingOrderNo' ,width:80, align:'center', sortable: true, type: 'object'}
         ];
var bill_conf_mmg =  $("#bill_conf_mmg").mmGrid({
         	height : 285,
         	cols : bill_conf_cols,
         	url : 'xascf/agfancing/billConfig.shtml',
         	params : {
				'condition.agfancingOrderNo' : $("#agfancingOrderNo").val()
			},
         	method : 'post',
    		checkCol: true,
			autoLoad: true,
			indexCol:true,
			fullWidthRows: true,
			indexColWidth: 15, 
			cache: false,
			multiSelect: true,
			nowrap: true
         });
bill_conf_mmg.on("loadSuccess",function(e,data){
});

/**
 * 账单信息列表
 */
var bill_cols =[ 
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
var bill_mmg =  $("#bill_mmg").mmGrid({
         	height : 285,
         	cols : bill_cols,
         	url : 'xascf/agfancing/billPageForAgfancing.shtml', 
         	params : function(){return {
         				'condition.memberPid':customerPid, 
         				'condition.agfancingOrderNo':$("#agfancingOrderNo").val()
         				}},
         	method : 'post',
    		checkCol: true,
			autoLoad: false,
			indexCol:true,
			fullWidthRows: true,
			indexColWidth: 15, 
			cache: false,
			multiSelect: true,
			nowrap: true
         });
bill_mmg.on("loadSuccess",function(e,data){
	for(var i=0;i<bill_mmg.rowsLength();i++){
		for (var j = 0; j < bill_conf_mmg.rowsLength(); j++){
			if(bill_mmg.row(i)['billNo']==bill_conf_mmg.row(j)['billNo']){
				bill_mmg.select(i);
			}
		}
	}
});

var fancing_field = new Array(
		 'id','agfancingDetailPid','memberPid','memberNo','memberName','billAmount','evaluateReportId','creditNo'
		 );
var bill_field = new Array('memberPid', 'billNo','fancingOrderNo','billPrice');

var AgfancingEdit = function() {
	return { 
		//添加会员
		add : function(val) {
			$("#tabwin_customer").popup({md:true});
			customer_mmg.load();
		},
		//删除
		del : function() { 
			if (fancing_mmg.selectedRowsIndex().length==0){
				PUI.MessageBox.alert("请至少选中一条记录");
				return; 
			}
			PUI.MessageBox.show({
				title:"删除列表信息",
				content:"你确定要删除列表信息吗？",
				type:"alert",
				buttons:[{value: "是"} , {value:"否"}],
				success: function(result){ 
					var items = fancing_mmg.selectedRows();
					for(var i=0;i<items.length;i++){
						for (var j = 0; j < bill_conf_mmg.rowsLength(); j++){
							if(items[i]['memberPid']==bill_conf_mmg.row(j)['memberPid']){
								bill_conf_mmg.select(j);
							}
						}
					}
					while(fancing_mmg.selectedRowsIndex().length > 0){
						fancing_mmg.removeRow(fancing_mmg.selectedRowsIndex()[0]);
					}
					while(bill_conf_mmg.selectedRowsIndex().length > 0){
						bill_conf_mmg.removeRow(bill_conf_mmg.selectedRowsIndex()[0]);
					}
					AgfancingEdit.calcAllBillPrice();
				} 
			}) 
			
		},
		
		//会员融资选择确定
		customer_sure : function(){
			customer_items=customer_mmg.selectedRows();
			var len= fancing_mmg.rowsLength();
			if(len>0){
				for(var i=0;i<len;i++){
					fancing_mmg.deselect(i);
					var flag = false;
					for(var j = 0; j < customer_items.length; j++){
						if(customer_items[j]['memberNo']==fancing_mmg.row(i)['memberNo']){
							customer_items[j]['billAmount'] = fancing_mmg.row(i)['billAmount'];
							flag = true;
						}
					}
					if (!flag) {
						fancing_mmg.select(i);
					}
				}
				var items = fancing_mmg.selectedRows();
				for(var i=0;i<items.length;i++){
					for (var j = 0; j < bill_conf_mmg.rowsLength(); j++){
						if(items[i]['memberPid']==bill_conf_mmg.row(j)['memberPid']){
							bill_conf_mmg.select(j);
						}
					}
				}
				while(bill_conf_mmg.selectedRowsIndex().length > 0){
					bill_conf_mmg.removeRow(bill_conf_mmg.selectedRowsIndex()[0]);
				}
				fancing_mmg.removeRow();
			}
			fancing_mmg.addRow(customer_items);
			AgfancingEdit.calcAllBillPrice();
			$("#tabwin_customer").popup({display:false}); 
		},
		//会员融资选择关闭
		customer_cancel : function(val){
			$("#tabwin_customer").popup({display:false});
		},

		//账单配置
		configureBill : function(index, memberPid) { 
			$("#tabwin_bill").popup({md:true});
			customerIndex = index;
			customerPid = memberPid;
			bill_mmg.load();
		},
		//账单选择确定
		bill_sure : function(){
			for(var i=0;i<bill_conf_mmg.rowsLength();i++){
				if(bill_conf_mmg.row(i)['memberPid']==customerPid){
					bill_conf_mmg.select(i);
				}
			}
			while(bill_conf_mmg.selectedRowsIndex().length > 0){
				bill_conf_mmg.removeRow(bill_conf_mmg.selectedRowsIndex()[0]);
			}
			bill_conf_mmg.addRow(bill_mmg.selectedRows(), bill_conf_mmg.rowsLength());
			AgfancingEdit.bill_calculate(customerIndex, customerPid);
			$("#tabwin_bill").popup({display:false}); 
		},
		//账单选择关闭
		bill_cancel : function(val){
			$("#tabwin_bill").popup({display:false});
		},
		
		//账单总额计算
		calcAllBillPrice : function(){
			var allBillPrice=0.0;
			for (var i = 0; i < fancing_mmg.rowsLength(); i++){
				var billAmount = fancing_mmg.row(i)['billAmount'];
				if (billAmount == null || billAmount == "" || billAmount == "undefined") {
					billAmount = 0;
				}
				allBillPrice+=parseFloat(billAmount);
			}
			$("#allBillPrice").text(formatMoney(allBillPrice)+'（元）');
			$("#billAmount").val(allBillPrice);
		},
		//账单金额计算
		bill_calculate : function(index, customerPid){
			var allBillPrice=0.0;
			for (var i = 0; i < bill_conf_mmg.rowsLength(); i++){
				if(bill_conf_mmg.row(i)['memberPid']==customerPid&&bill_conf_mmg.row(i)['billStatus']!='已还'){
					allBillPrice+=parseFloat(bill_conf_mmg.row(i)['billPrice']);
				}
			}
			var item = fancing_mmg.row(index);
			item['billAmount']=allBillPrice;
			fancing_mmg.updateRow(item, index);
			AgfancingEdit.calcAllBillPrice();
		},
		
		//保存
		save : function() {
			if (!$("#agfancingForm").isValid()) {
					return;
			}
			if($("#fileUrl").val().length>1000||$("#fileName").val().length>1000){
				PUI.MessageBox.alert("补充材料上传的文件数过多!");
				return;
			}
			var params=$("#agfancingForm").serializeArray();  
			params.push({
				name:"agfancingEntity.type",
				value: $("#type").val()
			}); 
			if(typeof fancing_mmg != 'undefined' && (fancing_mmg == null|| null == fancing_mmg.row(0))){
				PUI.MessageBox.alert("会员列表不能为空!");
				return;
			}
			if (typeof fancing_mmg != 'undefined' && null!=fancing_mmg && null != fancing_mmg.row(0)){
				var len= fancing_mmg.rowsLength();
				for (var i = 0; i < len; i++){
					for (var j = 0; j < fancing_field.length; j++) {
						params.push({
							name:'agfancingEntity.agfancingDetailModelList['+ i +'].'+ fancing_field[j],
							value: fancing_mmg.row(i)[fancing_field[j]]
						});  
					}
				}
			}
			if (typeof bill_conf_mmg != 'undefined' && null!=bill_conf_mmg && null != bill_conf_mmg.row(0)){
				var len= bill_conf_mmg.rowsLength();
				for (var i = 0; i < len; i++){
					for (var j = 0; j < bill_field.length; j++) {
						params.push({
							name:'agfancingEntity.agfancingBillModelList['+ i +'].'+ bill_field[j],
							value: bill_conf_mmg.row(i)[bill_field[j]]
						});  
					}
					params.push({
						name:'agfancingEntity.agfancingBillModelList['+ i +'].agfancingOrderNo',
						value: $("#agfancingOrderNo").val()
					});
				}
			}
			$.post("xascf/agfancing/saveAgfancing.shtml", params, function(data){
				PUI.MessageBox.info(data);
				if(data=="保存成功"){
					$.post("xascf/agfancing/jsp/agfancingList.jsp", function(data) {
						$("#xascfMainPanel").html(data);
					});
				}
			});
			
		},
		//重置
		reback : function(){
			Menu.forward("xascf/agfancing/jsp/agfancingList.jsp");  
		},
		
		/**
		 * 附件材料文件上传
		*/
		uploadFile:function(){   
			var parameterArray = new Array();
			parameterArray.push("fileName");
			parameterArray.push("fileUrl");
			parameterArray.push("fileDiv");
			
			pluploadUtil.init("/XA_SCF/xascf/util/plupload.shtml",
				{type :"agfancing" , requestName: $("#agfancingOrderNo").val(), whatFile:"agfancing"},
				"",AgfancingEdit.backFillFileInfo,parameterArray);
		},
		backFillFileInfo: function(fileArray,parameter){ 
			var fileName = fileArray[2];
			var fileUrl = fileArray[0];
			var $preFileName = $("#"+parameter[0]);
			var $preFileUrl = $("#"+parameter[1]);
			//填充隐藏的文件名和标示
			var preFileName = $preFileName.val();
			var preFileUrl = $preFileUrl.val();
			if(preFileName =="")
			{
				$preFileName.val(fileName);
				$preFileUrl.val(fileUrl);
			} else {	
				$preFileName.val(preFileName+","+fileName);
				$preFileUrl.val(preFileUrl+","+fileUrl);
			}
			//生成页面上下载删除功能的div
			var fileNameArray = fileName.split(",");
			var urlArray = fileArray[0].split(",");
			var length = fileNameArray.length;
			for(var i=0;i<length;i++)
			{
				var thisFileName = fileNameArray[i];
				$("#"+parameter[2]).append("<span><a target='_blank' href='#' onclick='FileUtil.downLoad(\""+urlArray[i]+"\",\""+thisFileName+"\")'>"+thisFileName+"</a>"+
					" <a style='cursor:pointer' title='删除' class='buttonRomve' onclick='AgfancingEdit.removeFile(this,\""+urlArray[i]+"\")'>&nbsp;&nbsp;</a></span> "
				);	
			}
		},
		removeFile:function(thisA,fileUrl){
		 	PUI.MessageBox.show({
			    title: "删除附件",
			    content: "你确定要删除该附件吗？",
			    type: "confirm",
			    buttons: [{ value: "是" },{ value: "否" }],
			    success: function (result) {
			        if (result == "是") {
			        	$(thisA).parent().hide();
			        	var fileName = $(thisA).prev().html();
			        	var $preFileName = $("#fileName");
			        	var $preFileUrl = $("#fileUrl");
			        	var preFileName = $preFileName.val();
			        	var preFileUrl = $preFileUrl.val();
			        	if(preFileName.indexOf(",")<0){//如果没有逗号，证明只有一个附件
			        		$preFileName.val(preFileName.replace(fileName,"")); 
							$preFileUrl.val(preFileUrl.replace(fileUrl,"")); 
			        	} else{
			        		if(preFileName.indexOf(fileName) == 0)
				        	{   		
								$preFileName.val(preFileName.replace(fileName+",","")); 
								$preFileUrl.val(preFileUrl.replace(fileUrl+",","")); 
				        	} else {
				        		$preFileName.val(preFileName.replace(","+fileName,"")); 
								$preFileUrl.val(preFileUrl.replace(","+fileUrl,"")); 
				        	}
			        	}
		        	}
		    	}
			})
		}
	};
}();

