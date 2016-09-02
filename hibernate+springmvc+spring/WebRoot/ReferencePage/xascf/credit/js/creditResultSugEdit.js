
var sug_cols = new Array(
	    { title:'委员名称', name:'commitorName' ,width:150, align:'center', sortable: true, type: 'string'},
	    { title:'意见', name:'replySuggestion' ,width:150, align:'center', sortable: true, type: 'string'},
	    { title:'表决', name:'replyVote' ,width:150, align:'center', sortable: true, type:'string',
	    	renderer: function(val,item,rowIndex){
	    		if(val=='Y')
	    			val='同意';
	    		else if(val=='N'){
	    			val='否决'
	    		}else
	    			val='再议'
	    		return val;
	    	}}
	);
 sug_mmg =  $("#sug_mmg").mmGrid({
	height: 200,
	cols: sug_cols,
	url : 'xascf/quota/credit/creditResultSugPage.shtml',
    params : {businessNo:$("#creditNo").val()},
	method: 'post',
	checkCol: true,
	autoLoad: true,
	showBackboard:false,
	fullWidthRows: true,
	indexColWidth: 15, 
	cache: false,
	multiSelect: true,
	nowrap: true
});
var _sugItems = new Array(
			'creditNo',
			'creditResultNo',
			'commitorName',
			'replySuggestion',
			'businessPercent',
			'replyVote'
		);
sug_mmg.on("loadSuccess",function(e, data){
	CreditResultSugEdit.computeResult();
});
var CreditResultSugEdit = function(){	
	return{
		//表格新增
		sugAdd : function() {
			var html = PUI.String.format($("#template_sug").html(), {});
			$("#tabwin_add_content_sug").html(html);
			$("#tabwin_add_sug").popup({md:true});
			PUI.plugin.init({}, $("#tabwin_add_content_sug"));
			sns.valid.init($("#sug_form"));
		},
		//新增一行表格记录
		addSugRow :function (){
			if (!$("#sug_form").isValid()) {
				return ;
			}
			var _rootItem = {
					creditNo:$("#creditNo").val(),
					commitorName:$("#commitorName").val(),
					replySuggestion:$("#replySuggestion").val(),
					businessPercent:$("#businessPercent").val(),
					replyVote:$("#replyVote").val()
			};
			if ($("#tabwin_add_content_sug input[name=rowIndex]").val() != "") {
				var rowIndex=parseInt($("#tabwin_add_content_sug input[name=rowIndex]").val());
				sug_mmg.updateRow(_rootItem, rowIndex);
			} else {
				sug_mmg.addRow(_rootItem, sug_mmg.rowsLength());
			}
			$("#tabwin_add_sug").popup({display:false});
			CreditResultSugEdit.computeResult();
		},
		
		//计算统计结果
		computeResult :function(){
			var passResult=0;
			var backResult=0;
			var againResult=0;
			var allNote=sug_mmg[0].rows.length;
			var passRate=0;
			var backRate=0;
			var gaginRate=0;
			if (null != sug_mmg.row(0)) {
				for ( var i = 0; i < sug_mmg[0].rows.length; i++) {
					var item=sug_mmg.row(i);
					var replyVote=item.replyVote;
					if(replyVote=='Y'){
						passResult=passResult+1;
					}else if(replyVote=='N'){
						backResult=backResult+1;
					}else if(replyVote=='A'){
						againResult=againResult+1;
					}
				}
				passRate=parseFloat((passResult/allNote)*100.0).toFixed(0);
				backRate=parseFloat((backResult/allNote)*100.0).toFixed(0);
				gaginRate=parseFloat((againResult/allNote)*100.0).toFixed(0);
			}
			$("#passResult").val(passResult);
			$("#backResult").val(backResult);
			$("#againResult").val(againResult);
			$("#passRate").val(passRate);
			$("#backRate").val(backRate);
			$("#gaginRate").val(gaginRate);
			$("#passResultTd").html(passResult);
			$("#backResultTd").html(backResult);
			$("#againResultTd").html(againResult);
			$("#passRateTd").html(passRate+'%');
			$("#backRateTd").html(backRate+'%');
			$("#gaginRateTd").html(gaginRate+'%');
			
		},
		// 表格删除一行记录
		removeItem: function() {
			if (sug_mmg.selectedRowsIndex().length == 0){
				PUI.MessageBox.alert("请至少选中一条记录");
				return;
			}
			PUI.MessageBox.show({
				title: "删除评审意见信息",
				content: "你确定要删除评审意见信息吗？",
				type: "alert",
				buttons: [{ value: "是" },{ value: "否" }],
				success: function (result) {
					if (result == "是") {
						while (sug_mmg.selectedRowsIndex().length > 0) {
							var data=sug_mmg.selectedRows();
							var len =data.length;
							sug_mmg.removeRow(sug_mmg.selectedRowsIndex()[0]);
						}
						CreditResultSugEdit.computeResult();
					}
				}
			});
		},
		//编辑
		edit:function(){
			if (sug_mmg.selectedRows().length != 1) {
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			var items = sug_mmg.selectedRows()[0];
			var rowIndex = sug_mmg.selectedRowsIndex();
			var html = PUI.String.format($("#template_sug").html(), $.extend(items, {rowIndex : rowIndex}));
			$("#tabwin_add_content_sug").html(html);
			$("#tabwin_add_sug").popup({md : true});
			$("#replyVote").val(items.replyVote).trigger("liszt:updated");
			PUI.plugin.init({}, $("#tabwin_add_content_sug"));
			sns.valid.init($("#tabwin_add_content_sug > form"));
		}
	};
}();

$(document).ready(function(){
	
});
