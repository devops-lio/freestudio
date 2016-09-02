 $(document).ready(function(){
 	template_creditBlackListEdit_tabs = $("#creditBlackListEdit-template-tab").html();
	PUI.plugin.init();
	sns.valid.init($("form"));
});
		
var _cols = [
    { title:'客户名称', name:'customerName' ,width:400, align:'center', sortable: true, type: 'number'},
    { title:'原因', name:'reason' ,width:480, align:'center', sortable: true, type: 'number'},
    { title:'创建时间', name:'createTimeStr' ,width:120, align:'center', sortable: true, type: 'number'}
    
     
   
];

var _mmg =  $("#mmg").mmGrid({
	height : getAutoHeightByMmGrid($("#xascfMainPanel")),
	cols : _cols,
	url : 'xascf/information/creditBlackList/getBlackList.shtml',
	params : $("#blackQueryForm").serialize(),
	method : 'post',
	checkCol : true,
	indexCol : true,
	indexColWidth : 15,
	autoLoad : true,
	sortName : 'id',
	sortStatus : 'desc',
	fullWidthRows : true,
	cache : false,
	multiSelect: true,
	plugins : [$('#pg').mmPaginator({})]
});
  mmGridResizeListener(_mmg, $(".page-content"));  
var creditBlackList = function() {
	return {
		/**查询*/
		query : function() {
            _mmg.load($("#creditBlackListQueryForm").serialize());
		},
		save :function (){
			if (!$("#creditBlackListEditForm").isValid()) {
				return;
			}
			$.post("xascf/information/creditBlackList/save.shtml",$("#creditBlackListEditForm").serialize(),function(data){
				var message=data;
				if(message.result){
					$("#tabwin_add").popup({display:false});
					creditBlackList.query();
				}
				PUI.MessageBox.info(message.msg);
				
			}, "json");	
			
		},
		/**删除*/
		deleteByPids : function() {
			var str = new Array();
				$.each(_mmg.selectedRows(), function(i, n) {
					str.push("pids=" + n.blackListPid);
				});
				/**选中才能删除 */
				if (str == "") {
					PUI.MessageBox.alert("请至少选中一条记录");
				} else {
				PUI.MessageBox.show({
				    title: "删除信用黑名单",
				    content: "你确定要删除信用黑名单吗？",
				    type: "alert",
				    buttons: [{ value: "是" },{ value: "否" }],
				    success: function (result) {
				        if (result == "是") {
				        	$.post("xascf/information/creditBlackList/deleteByPids.shtml",
							str.join("&"), function(data) {
								var message=data;
								if(message.result){
									creditBlackList.query();
								}
								PUI.MessageBox.info(message.msg);
							});
			       		 }
			    	}
				});
			}
		},
		/**新增弹出层*/
		add : function() {	
			/** 解析模板文件 */
			var template = Handlebars.compile(template_creditBlackListEdit_tabs);
			/** 模板加上json数据 */
			var html = template({});
			$("#tabwin_add_content").html(html);
			$("#tabwin_add").popup({md:true});
			PUI.plugin.init({}, $("#tabwin_add_content"));
			
		},
		/**取消*/
		cancle: function(){
			$("#tabwin_add").popup({display:false});
		},
		/**清空**/
		clear : function(){
			PUI.util.resetForm($("#creditBlackListQueryForm"));
		}
	};
}();