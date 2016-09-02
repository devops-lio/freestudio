 $(document).ready(function(){
 	template_depositReceive_tabs = $("#fancingChargeReceive-template-tab").html();
	PUI.plugin.init();
	sns.valid.init($("form"));
});
		
var _cols = [
    { title:'逻辑ID', name:'fancingChargePid' ,width:10,hidden:true ,align:'center', sortable: true, type: 'object'},
    { title:'费用编号', name:'chargeNo' ,width:80, align:'center', sortable: true, type: 'object'},
    { title:'操作', name:'chargeStatus' ,width:40, align:'center', sortable: true, type: 'string',
		renderer: function(val,item,rowIndex){
			if(val!=null && val!="" && val=="待收款"){
				return '<a class="btnPrice" href="javascript:void(0)" onclick="depositList.receiverPop(\''+rowIndex+'\',\''+item.id+'\')">收款'+'</a>';
			}else if(val=="已收款"){
				return '<a class="btnPrice" href="javascript:void(0)" onclick="depositList.receiverEdit(\''+rowIndex+'\',\''+item.id+'\')">编辑'+'</a>|'
					+'<a class="btnPrice" href="javascript:void(0)" onclick="depositList.rebackPop(\''+rowIndex+'\',\''+item.id+'\')">退还'+'</a>';
			}else if(val=="已退还"){
				return '<a class="btnPrice" href="javascript:void(0)" onclick="depositList.rebackEdit(\''+rowIndex+'\',\''+item.id+'\')">编辑'+'</a>';
			}else{
				return val;
			}
    	}
	},
    { title:'合同编号', name:'fancingOrderNo' ,width:80, align:'center', sortable: true, type: 'object',
	     renderer: function(val,item,rowIndex){return '<span style=""><a href="#" onclick="contractDetail(\''+val+'\')">'
	  	     +val+'</a></span>';}},
    { title:'会员名称', name:'customerName' ,width:180, align:'left', sortable: true, type: 'object',
    	renderer: function(val,item,rowIndex){
    		return '<span style=""><a href="#" onclick="customerDetailPop.customerDetail(\''+item.customerPid+'\')">'
	    	  +val+'</a></span>'}},
    { title:'应收费用', name:'charge' ,width:70, align:'center', sortable: true, type: 'object',
	    		  renderer: function(val){return formatMoney(val)+' 元'}},
    { title:'实收费用', name:'repayCharge' ,width:70, align:'center', sortable: true, type: 'object',
	    		  renderer: function(val){return val==null?"":(formatMoney(val)+' 元')}},
    { title:'退还费用', name:'rebackCharge' ,width:70, align:'center', sortable: true, type: 'object',
	    		  renderer: function(val){return val==null?"":(formatMoney(val)+' 元')}},
    { title:'费用状态', name:'chargeStatus' ,width:40, align:'center', sortable: true, type: 'object'},
    { title:'收取时间', name:'repayDate' ,width:60, align:'center', sortable: true, type: 'object'},
    { title:'退还时间', name:'rebackDate' ,width:60, align:'center', sortable: true, type: 'object',
    		renderer: function(val,item,rowIndex){
    			return val==null?"":val.substr(0,10);
    		}}
	
];


var deposit_mmg =  $("#deposit_mmg").mmGrid({
	height : getAutoHeightByMmGrid($("#xascfMainPanel")),
	cols : _cols,
	url : "xascf/fancing/fancingCharge/getFancingChargeList.shtml?condition.chargeType=02",
	params : $("#depositQueryForm").serialize(),
	method : 'post',
	autoLoad : true,
	indexCol : true,
	indexColWidth : 15,
	showBackboard:false,
	sortName : 'id',
	sortStatus : 'desc',
	fullWidthRows : true,
	cache : false,
	nowrap: true,
	multiSelect: true,
	plugins : [$('#pg').mmPaginator({})]
});
   mmGridResizeListener(deposit_mmg, $(".page-content"));
var depositList = function() {
	return {
		/**查询*/
		query : function() {
            deposit_mmg.load($("#depositQueryForm").serialize());
			
		},
		/**清空**/
		clearQueryForm : function(){
			PUI.util.clearForm($("#depositQueryForm"));
		},
		receiverPop : function(rowIndex,id){
			var item=getItemById(deposit_mmg,id);
			/** 解析模板文件 */
			var html =	$(PUI.String.format($("#fancingChargeReceive-template-tab").html(),  $.extend(item, {rowIndex : rowIndex})));
			$("#tabwin_receive_content").html(html);
			$("#tabwin_receive").popup({md:true});
			PUI.plugin.init({}, $("#tabwin_receive_content"));
			sns.valid.init($("#fancingChargeReceiveForm"));
			$("#receiveBtn").on("click", function() {
				depositList.receive();
			});
			
			$("#calcleBtn").on("click", function() {
				depositList.cancle();
			});

		},
		rebackPop : function(rowIndex,id){
			var item=getItemById(deposit_mmg,id);
			/** 解析模板文件 */
			var html =	$(PUI.String.format($("#fancingChargeReceive-template-tab").html(),  $.extend(item, {rowIndex : rowIndex})));
			$("#tabwin_receive_content").html(html);
			
			$("#repaymentTypeLbl").text("退还方式");
			$("#bankNoLbl").text("转出账户");
			$("#repayPriceLbl").text("退还金额");
			$("#customerBankNo").removeAttr("readonly");
			
			$("#tabwin_receive").popup({md:true});
			PUI.plugin.init({}, $("#tabwin_receive_content"));
			sns.valid.init($("#fancingChargeReceiveForm"));
			$("#receiveBtn").on("click", function() {
				depositList.reback();
			});
			
			$("#calcleBtn").on("click", function() {
				depositList.cancle();
			});

		},
		rebackEdit : function(rowIndex,id){
			var item=getItemById(deposit_mmg,id);
			
			$.post("xascf/fancing/fancingCharge/getFancingChargeRecordByChargeNo.shtml",{chargeNo:item.chargeNo,ioFlag:'O'},function(response){  
				if(response.result){
					var html =	$(PUI.String.format($("#fancingChargeReceive-template-tab").html(),  $.extend(item, {rowIndex : rowIndex})));
					$("#tabwin_receive_content").html(html);
					
					var model = response.data;
					$("#chargeRecordPid").val(model.chargeRecordPid);
					$("#transactionSerialNo").val(model.repayNo);
					$("#bankNo").val(model.repalyBanktoNo);
					$("#bondAccountName").val(model.repalyBanktoNo);
					$("#transactionDate").val(model.repayDateStr);
					$("#repaymentType").val(model.repaymentType);
					$("#customerBankNo").val(model.repayPrice);
					$("#remark").val(model.remark);
					
					$("#repaymentTypeLbl").text("退还方式");
					$("#bankNoLbl").text("转出账户");
					$("#repayPriceLbl").text("退还金额");
					$("#customerBankNo").removeAttr("readonly");
					
					$("#tabwin_receive").popup({md:true});
					PUI.plugin.init({}, $("#tabwin_receive_content"));
					sns.valid.init($("#fancingChargeReceiveForm"));
					$("#receiveBtn").on("click", function() {
						depositList.reback();
					});
					
					$("#calcleBtn").on("click", function() {
						depositList.cancle();
					});
				}
			});
		},
		receiverEdit : function(rowIndex,id){
			var item=getItemById(deposit_mmg,id);
			
			$.post("xascf/fancing/fancingCharge/getFancingChargeRecordByChargeNo.shtml",{chargeNo:item.chargeNo,ioFlag:'I'},function(response){  
				if(response.result){
					var html =	$(PUI.String.format($("#fancingChargeReceive-template-tab").html(),  $.extend(item, {rowIndex : rowIndex})));
					$("#tabwin_receive_content").html(html);
					
					var model = response.data;
					$("#chargeRecordPid").val(model.chargeRecordPid);
					$("#transactionSerialNo").val(model.repayNo);
					$("#bankNo").val(model.repalyBanktoNo);
					$("#bondAccountName").val(model.repalyBanktoNo);
					$("#transactionDate").val(model.repayDateStr);
					$("#repaymentType").val(model.repaymentType);
					$("#customerBankNo").val(model.repayPrice);
					$("#remark").val(model.remark);
					
					$("#tabwin_receive").popup({md:true});
					PUI.plugin.init({}, $("#tabwin_receive_content"));
					sns.valid.init($("#fancingChargeReceiveForm"));
					$("#receiveBtn").on("click", function() {
						depositList.receive();
					});
					
					$("#calcleBtn").on("click", function() {
						depositList.cancle();
					});
				}
			});
		},
		cancle :function(){
			$("#tabwin_receive").popup({display:false});
		},
		receive :function (){
			if(!$("#fancingChargeReceiveForm").isValid()) {
				return ;
			}
			var param = $("#fancingChargeReceiveForm").serializeArray();

			param.push({
				name:'fancingChargeModel.chargeType',value:'02'
			});
			param.push({
				name:'chargeRecordModel.ioFlag',value:'I'
			});
			
			var url = "xascf/fancing/fancingCharge/receiveFancingCharge.shtml";
			var chargeRecordPid = $("#chargeRecordPid").val();
			if(chargeRecordPid!=null&&chargeRecordPid!=""&&chargeRecordPid!=undefined){
				url = "xascf/fancing/fancingCharge/fancingChargeRecordEdit.shtml";
			}
			
			//保存数据至数据库中
			$.post(url,param,function(data){
				if(data.indexOf('成功')>0){
					$("#tabwin_receive").popup({display:false});
					depositList.query();							
				}
				PUI.MessageBox.info(data);
			}, "json");	
		},
		reback :function (){
			if(!$("#fancingChargeReceiveForm").isValid()) {
				return ;
			}
			var param = $("#fancingChargeReceiveForm").serializeArray();
			param.push({
				name:'fancingChargeModel.chargeType',value:'02'
			});
			param.push({
				name:'chargeRecordModel.ioFlag',value:'O'
			});
			
			var url = "xascf/fancing/fancingCharge/rebackFancingCharge.shtml";
			var chargeRecordPid = $("#chargeRecordPid").val();
			if(chargeRecordPid!=null&&chargeRecordPid!=""&&chargeRecordPid!=undefined){
				url = "xascf/fancing/fancingCharge/fancingChargeRecordEdit.shtml";
			}
			
			//保存数据至数据库中
			$.post(url,param,function(data){
				if(data.indexOf('成功')>0){
					$("#tabwin_receive").popup({display:false});
					depositList.query();							
				}
				PUI.MessageBox.info(data);
			}, "json");	
		}
	};
}();

