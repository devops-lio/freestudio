$(document).ready(function(){
	PUI.plugin.init();
	sns.valid.init($("form"));
});

var _cols = [
	{ title:'ID',name:'id' ,width:180,hidden:true ,align:'center', sortable: true, type: 'object'},
    { title:'逻辑ID', name:'scoringRulePid' ,width:180,hidden:true ,align:'center', sortable: true, type: 'object'},
    { title:'规则名称', name:'ruleName' ,width:60, align:'center', sortable: true, type: 'object'},
    { title:'区间值(小)', name:'minimum' ,width:80, align:'center', sortable: true, type: 'object'},
    { title:'区间值(大)', name:'maximum' ,width:80, align:'center', sortable: true, type: 'object'},
    { title:'得分', name:'score' ,width:80, align:'center', sortable: true, type: 'object'},
    { title:'描述', name:'description' ,width:240, align:'center', sortable: true, type: 'object'}
];

var scoringRulesList_mmg =  $("#scoringRulesList_mmg").mmGrid({
	height : 260,
	cols : _cols,
	url : 'xascf/rm/scoringRules/getScoringRulePage.shtml',
	params : $("#scoringRulesListQueryForm").serialize(),
	method : 'post',
	checkCol : true,
	autoLoad : true,
	indexCol : false,
	showBackboard :false,
	sortName : 'id',
	sortStatus : 'desc',
	fullWidthRows : true,
	cache : false,
	multiSelect: true,
	plugins : [$('#pg').mmPaginator({})]
});
 scoringRulesList_mmg.on('itemdblclick', function(event, item, rowIndex) {
		scoringRulesList.doubleClick(item,rowIndex);    	
   });

var scoringRulesList = function() {
	return {
		query : function(){
			scoringRulesList_mmg.load($("#scoringRulesListQueryForm").serialize());
		},
		add :function(){
			PUI.util.clearForm($("#scoringRulesEditorForm"));
			$("#tabwin_add_scoringRules").popup();
			$("#ruleNo").val($("#ruleNoQuery").val());
			$("#rulePid").val($("#rulePidQuery").val());
			$("#ruleName").val($("#ruleNameQuery").val());
		},
		clearQueryForm : function(){
			PUI.util.resetForm($("#scoringRulesListQueryForm"));
		},
		cancle : function(){
			$("#tabwin_add_scoringRules").popup({display:false});
		},
		saveScoringRules:function(){
			if (!$("#scoringRulesEditorForm").isValid()) {
					return;
			}
			var params = $("#scoringRulesEditorForm").serializeArray();
			params.push({
				name: "scoringRulesModel.ruleName",
				value: $("#ruleName").val()
			});
			$.post("xascf/rm/scoringRules/saveScoringRules.shtml",params,function(data){
			 		var message=data;
					if(message.indexOf('成功')>=0){
						scoringRulesList.cancle();
						scoringRulesList.query();
					}
					PUI.MessageBox.info(message);
				},"json");
		},
		/**双击*/
		doubleClick : function(item){
			scoringRulesList.toEditForm(item);
		},
		/**编辑**/
		editor :function(){
			if ($("input[class='mmg-check']:checked").length != 1){
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			var item = scoringRulesList_mmg.selectedRows()[0];
			scoringRulesList.toEditForm(item);
		},
		/**删除*/
		deleteScoringRules : function() {
			var str = new Array();
			$.each(scoringRulesList_mmg.selectedRows(), function(i, n) {
				str.push("scoringRulePids=" + n.scoringRulePid);
			});
			/**选中才能删除 */
			if (str == "") {
				PUI.MessageBox.alert("请至少选中一条记录");

			} else {
				PUI.MessageBox.show({
				    title: "删除规则评分信息",
				    content: "你确定要删除规则评分信息吗？",
				    type: "alert",
				    buttons: [{ value: "是" },{ value: "否" }],
				    success: function (result) {
				        if (result == "是") {
				        	$.post("xascf/rm/scoringRules/deleteScoringRules.shtml",
							str.join("&"), function(data) {
								if(data.indexOf('成功')>=0){
									PUI.MessageBox.info("删除成功!");
			        				scoringRulesList.query();
								}
							});
							
			        }
			    }
			});
			}
		},
		toEditForm : function(item) {
			PUI.util.dataToForm($("#scoringRulesEditorForm"), item,"id");
			$("#tabwin_add_scoringRules").popup();
			$("#ruleNo").val($("#ruleNoQuery").val());
			$("#rulePid").val($("#rulePidQuery").val());
			$("#ruleName").val($("#ruleNameQuery").val());

		},
		returnRuleDefinition : function(){
			Menu.forward('xascf/risk/jsp/ruleDefinitionList.jsp');
		}
	};
}();


