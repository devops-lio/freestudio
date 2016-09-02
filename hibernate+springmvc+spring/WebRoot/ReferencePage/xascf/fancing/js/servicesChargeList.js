 $(document).ready(function(){
 	template_servicesChargeReceive_tabs = $("#fancingChargeReceive-template-tab").html();
	PUI.plugin.init();
	sns.valid.init($("form"));
});
		
var _cols = [
    { title:'逻辑ID', name:'fancingChargePid' ,width:180,hidden:true ,align:'center', sortable: true, type: 'object'},
    { title:'融资单号', name:'fancingOrderNo' ,width:100, align:'center', sortable: true, type: 'object'},
    { title:'客户', name:'customerName' ,width:180, align:'center', sortable: true, type: 'object'},
    { title:'费用', name:'charge' ,width:80, align:'center', sortable: true, type: 'object'},
    { title:'费用状态', name:'chargeStatus' ,width:50, align:'center', sortable: true, type: 'object'},
	{ title:'操作', name:'chargeStatus' ,width:20, align:'center', sortable: true, type: 'string',
		renderer: function(val,item,rowIndex){
			if(val!=null && val!="" && val=="待收款")
				return '<a class="btnPrice" href="javascript:void(0)" onclick="servicesChargeList.receiverPop(\''+rowIndex+'\')">收款'+'</a>'
			
    	}
	}
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
		receiverPop : function(rowIndex){
			var item=servicesCharge_mmg.row(rowIndex);
			/** 解析模板文件 */
			var template = Handlebars.compile(template_servicesChargeReceive_tabs);
			/** 模板加上json数据 */
			var html = template(item);
			$("#tabwin_receive_content").html(html);
			$("#tabwin_receive").popup({md:true});
			PUI.plugin.init({}, $("#tabwin_receive_content"));
			$("#receiveBtn").on("click", function() {
				servicesChargeList.receive();
			});
			
			$("#calcleBtn").on("click", function() {
				servicesChargeList.cancle();
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
			//保存数据至数据库中
			$.post("xascf/fancing/fancingCharge/receiveFancingCharge.shtml",param,function(data){
				var message = data;
				if(message.result)
				{
					$("#tabwin_receive").popup({display:false});
					servicesChargeList.query();							
				}
				PUI.MessageBox.info(message.msg);
			}, "json");	
		}
	};
}();

