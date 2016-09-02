$(document).ready(function(){
	PUI.plugin.init();
	sns.valid.init($("form"));
});

var _cols = [
	{ title:'ID',name:'id' ,width:180,hidden:true ,align:'center', sortable: true, type: 'object'},
    { title:'逻辑ID', name:'rulePid' ,width:180,hidden:true ,align:'center', sortable: true, type: 'object'},
    { title:'规则名称', name:'ruleName' ,width:180, align:'center', sortable: true, type: 'object'},
    { title:'描述', name:'description' ,width:180, align:'center', sortable: true, type: 'object',
//    	renderer: function(val,item,rowIndex){
//    		return "<textarae>"+item.description+"<textarae>"}
    
   renderer:function replaceTextarea1(str){
        var reg=new RegExp("\r\n","g"); 
       // var reg1=new RegExp(" ","g"); 

     str = str.replace(reg,"<br/>"); 
   //  str = str.replace(reg1,"＜p＞"); 

       return str; 
}
    		}
];

var ruleDefinitionList_mmg =  $("#ruleDefinitionList_mmg").mmGrid({
	height : 350,
	cols : _cols,
	url : 'xascf/rm/ruleDefinition/getRulePage.shtml',
	params : $("#ruleDefinitionListQueryForm").serialize(),
	method : 'post',
	checkCol : true,
	autoLoad : true,
	indexCol : false,
	showBackboard :false,
	indexColWidth : 15,
	sortName : 'id',
	sortStatus : 'desc',
	fullWidthRows : true,
	cache : false,
	multiSelect: true,
	plugins : [$('#pg').mmPaginator({})]
});
// ruleDefinitionList_mmg.on('itemdblclick', function(event, item, rowIndex) {
//		ruleDefinitionList.doubleClick(item,rowIndex);    	
// });
mmGridResizeListener(ruleDefinitionList_mmg, $(".page-content"));


var ruleDefinitionList = function() {
	return {
		query : function(){
			ruleDefinitionList_mmg.load($("#ruleDefinitionListQueryForm").serialize());
		},
		clearQueryForm : function(){
			PUI.util.resetForm($("#ruleDefinitionListQueryForm"));
		},
		cancle : function(){
			$("#tabwin_add_ruleDefinition").popup({display:false});
		},
		add :function(){
			PUI.util.clearForm($("#ruleDefinitionEditorForm"));
			$("#tabwin_add_ruleDefinition").popup({md:true});
		},

		saveRuleDefinition:function(){
			if (!$("#ruleDefinitionEditorForm").isValid()) {
					return;
			}
//			var newString = $("#description").val().replace(/\n/g, '_@').replace(/\r/g, '_#');
//			 newString = newString.replace(/_#_@/g, '<br/>');//IE7-8
//		     newString = newString.replace(/_@/g, '<br/>');//IE9、FF、chrome
//		     newString = newString.replace(/\s/g, '&nbsp;');//空格处理
			var params = $("#ruleDefinitionEditorForm").serializeArray();
//			params.push({
//				name: "ruleDefinitionModel.description",
//				value: newString
//			});
			$.post("xascf/rm/ruleDefinition/saveRuleDefinition.shtml",params,function(data){
			 		var message=data;
					if(message.indexOf('成功')>=0){
						ruleDefinitionList.cancle();
						ruleDefinitionList.query();
					}
					PUI.MessageBox.info(message);
				},"json");
		},
		/**双击*/
		doubleClick : function(item){
			ruleDefinitionList.toEditForm(item);
		},
		/**编辑**/
		editor :function(){
			if ($("input[class='mmg-check']:checked").length != 1){
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			var item = ruleDefinitionList_mmg.selectedRows()[0];
			ruleDefinitionList.toEditForm(item);
		},
		/**删除*/
		deleteRuleDefinition : function() {
			var str = new Array();
			$.each(ruleDefinitionList_mmg.selectedRows(), function(i, n) {
				str.push("rulePids=" + n.rulePid);
			});
			/**选中才能删除 */
			if (str == "") {
				PUI.MessageBox.alert("请至少选中一条记录");

			} else {
				PUI.MessageBox.show({
				    title: "删除规则设定信息",
				    content: "你确定要删除规则设定信息吗？",
				    type: "alert",
				    buttons: [{ value: "是" },{ value: "否" }],
				    success: function (result) {
				        if (result == "是") {
				        	$.post("xascf/rm/ruleDefinition/deleteRuleDefinition.shtml",
							str.join("&"), function(data) {
								if(data.indexOf('成功')>=0){
									PUI.MessageBox.info("删除成功!");
			        				ruleDefinitionList.query();
								}
							});
							
			        }
			    }
			});
			}
		},
		toEditForm : function(item) {
			PUI.util.dataToForm($("#ruleDefinitionEditorForm"), item,"id");
			$("#tabwin_add_ruleDefinition").popup({md:true});
		},
				/**
		 * 查看
		 */
		scoringRoleSetting:function(){
			if (ruleDefinitionList_mmg.selectedRowsIndex().length != 1){
				PUI.MessageBox.alert("请选中一条记录",null,{buttons : [],autoClose: true,timeOut: 1000});
				return;
			}
			var item = ruleDefinitionList_mmg.selectedRows()[0];
			$.post("xascf/rm/ruleDefinition/toScoringRuleSetting.shtml",{"rulePid":item.rulePid},function(data){    
				$("#xascfMainPanel").html(data); 
			});  
		}

	};
}();


