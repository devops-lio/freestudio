$(document).ready(function(){
	
});
setTimeout(function() {
var buyer_cols = new Array(
	    { title:'企业名称', name:'customerName' ,width:150, align:'center', sortable: true, type: 'string'},
	    { title:'企业PID', name:'customersubPid' ,width:150, align:'center', sortable: true, hidden:true}
	);
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
}, '10');
var BuyerInfo = function(){	
	return{
		_uploadInit :function(id,url,type){
			$("#"+id).pluploadQueue({
				runtimes : 'gears,flash,silverlight,browserplus,html5,html4',
				url : url,
				max_file_size : '10mb',
				unique_names : true,
				chunk_size: '2mb',
				filters : [
					{title : "xls, xlsx文档", extensions : type}
				],
				flash_swf_url : '/XA_SCF/xascf/plupload/js/plupload.flash.swf',
				silverlight_xap_url : 'XA_SCF/xascf/plupload/js/plupload.silverlight.xap'
			});
		},
		uploadFile:function(){
		        var uploader = BuyerInfo._uploadInit('uploader','xascf/util/upload.shtml?type=抵押文件&requestName=123','doc,docx');
		        
		        
		        
		},
	
		buyerAdd : function(val) {
			var jHtml = $(PUI.String.format($("#template_"+val).html(), {}));
			$("#tabwin_add_content_"+val).html(jHtml[0].outerHTML);
			$("#tabwin_add_"+val).popup({md:true});
			PUI.plugin.init({}, $("#tabwin_add_content_"+val));
			sns.valid.init($("#"+val+"_form"));
		},
		//取消关闭
		buyerCancle : function(){
			$("#tabwin_add_buyer").popup({display:false});
		},
		//新增一行表格记录
		addBuyerRow :function (){
			if (!$("#buyer_form").isValid()) {
				return ;
			}
			var _rootItem = {
					customersubPid:$("#customersubBuyPid").val(),
					customerName:$("#customerBuyName").val()
					
			}
			buyer_mmg.addRow(_rootItem, buyer_mmg.rowsLength());
			$("#tabwin_add_buyer").popup({display:false});
			$("#buyerExist").val($("#buyerExist").val()+$("#customersubBuyPid").val()+',');
		},
		/**
		 * 表格删除一行记录
		 */
		removeBuyerItem: function() {
			if (buyer_mmg.selectedRowsIndex().length == 0){
				PUI.MessageBox.alert("请至少选中一条记录");
				return;
			}
			PUI.MessageBox.show({
				title: "删除采购商信息",
				content: "你确定要删除采购商信息 吗？",
				type: "alert",
				buttons: [{ value: "是" },{ value: "否" }],
				success: function (result) {
					if (result == "是") {
						while (buyer_mmg.selectedRowsIndex().length > 0) {
							buyer_mmg.removeRow(buyer_mmg.selectedRowsIndex()[0]);
						}
					}
				}
			});
		}
	};
}();
