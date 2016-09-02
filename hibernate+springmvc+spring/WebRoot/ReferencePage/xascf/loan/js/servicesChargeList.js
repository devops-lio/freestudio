 $(document).ready(function(){
 	template_servicesChargeReceive_tabs = $("#fancingChargeReceive-template-tab").html();
	PUI.plugin.init();
	sns.valid.init($("form"));
});
		
var _cols = [
    { title:'逻辑ID', name:'fancingChargePid' ,width:180,hidden:true ,align:'center', sortable: true, type: 'object'},
    { title:'费用编号', name:'chargeNo' ,width:60, align:'center', sortable: true, type: 'object'},
    { title:'操作', name:'chargeStatus' ,width:20, align:'center', sortable: true, type: 'string',
		renderer: function(val,item,rowIndex){
			if(val=="待收款"){
				return '<a class="btnPrice" href="javascript:void(0)" onclick="servicesChargeList.receiverPop(\''+rowIndex+'\',\''+item.id+'\')">收款'+'</a>'
			}else if(val=="已收款"){
				return '<a class="btnPrice" href="javascript:void(0)" onclick="servicesChargeList.receiverEdit(\''+rowIndex+'\',\''+item.id+'\')">编辑'+'</a>'
			}else{
				return "";
			}
    	}
	},
    { title:'合同编号', name:'fancingOrderNo' ,width:80, align:'center', sortable: true, type: 'object',
    	renderer: function(val,item,rowIndex){
    		return '<span style=""><a href="#" onclick="contractDetail(\''+val+'\')">'
	    	  +val+'</a></span>'}},
    { title:'收取时间', name:'repayDate' ,width:80, align:'center', sortable: true, type: 'object'},
    { title:'会员名称', name:'customerName' ,width:280, align:'left', sortable: true, type: 'object',
    	renderer: function(val,item,rowIndex){
    		return '<span style=""><a href="#" onclick="customerDetailPop.customerDetail(\''+item.customerPid+'\')">'
	    	  +val+'</a></span>'}},
    { title:'费用', name:'charge' ,width:60, align:'center', sortable: true, type: 'object',
	    		  renderer: function(val){return formatMoney(val)+' 元'}},
    { title:'费用状态', name:'chargeStatus' ,width:50, align:'center', sortable: true, type: 'object'}
	
];


var servicesCharge_mmg =  $("#servicesCharge_mmg").mmGrid({
	height : getAutoHeightByMmGrid($("#xascfMainPanel")),
	cols : _cols,
	url : "xascf/fancing/fancingCharge/getFancingChargeList.shtml?condition.chargeType=01",
	params : $("#servicesChargeQueryForm").serialize(),
	method : 'post',
	autoLoad : true,
	indexCol : true,
	indexColWidth : 15,
	sortName : 'id',
	sortStatus : 'desc',
	fullWidthRows : true,
	cache : false,
	multiSelect: true,
	showBackboard:false,
	plugins : [$('#pg').mmPaginator({})]
});
   mmGridResizeListener(servicesCharge_mmg, $(".page-content"));
  
var servicesChargeList = function() {
	return {
		/**查询*/
		query : function() {
            servicesCharge_mmg.load($("#servicesChargeQueryForm").serialize());
			
		},
		/**清空**/
		clearQueryForm : function(){
			PUI.util.clearForm($("#servicesChargeQueryForm"));
		},
		receiverPop : function(rowIndex,id){
			var item=getItemById(servicesCharge_mmg,id);
			/** 解析模板文件 */
			var html =	$(PUI.String.format($("#fancingChargeReceive-template-tab").html(),  $.extend(item, {rowIndex : rowIndex})));
			$("#tabwin_receive_content").html(html);
			$("#tabwin_receive").popup({md:true});
			PUI.plugin.init({}, $("#tabwin_receive_content"));
			sns.valid.init($("#fancingChargeReceiveForm"));
			$("#receiveBtn").on("click", function() {
				servicesChargeList.receive();
			});
			
			$("#calcleBtn").on("click", function() {
				servicesChargeList.cancle();
			});

		},
		receiverEdit : function(rowIndex,id){
			var item=getItemById(servicesCharge_mmg,id);
			
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
						servicesChargeList.receive();
					});
					
					$("#calcleBtn").on("click", function() {
						servicesChargeList.cancle();
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
			var param = $("#fancingChargeReceiveForm").serialize();
			param +="&fancingChargeModel.chargeType=01";
			param +="&chargeRecordModel.ioFlag=I";
			
			var url = "xascf/fancing/fancingCharge/receiveFancingCharge.shtml";
			var chargeRecordPid = $("#chargeRecordPid").val();
			if(chargeRecordPid!=null&&chargeRecordPid!=""&&chargeRecordPid!=undefined){
				url = "xascf/fancing/fancingCharge/fancingChargeRecordEdit.shtml";
			}
			
			//保存数据至数据库中
			$.post(url,param,function(data){
				if(data.indexOf('成功')>0){
					$("#tabwin_receive").popup({display:false});
					servicesChargeList.query();							
				}
				PUI.MessageBox.info(data);
			}, "json");	
		}
	};
}();

