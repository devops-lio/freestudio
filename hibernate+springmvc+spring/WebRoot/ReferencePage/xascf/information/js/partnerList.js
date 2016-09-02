 $(document).ready(function(){
 	template_partnerEdit_tabs = $("#partnerEdit-template-tab").html();
	PUI.plugin.init();
	sns.valid.init($("form"));
});
		
var _cols = [
    { title:'合作伙伴名称', name:'partnerName' ,width:80, align:'center', sortable: true, type: 'string'},
    { title:'合作伙伴URL', name:'partnerUrl' ,width:80, align:'center', sortable: true, type: 'string'},
    { title:'创建时间', name:'createTimeStr' ,width:80, align:'center', sortable: true, type: 'string'}
];

var _mmg =  $("#mmg").mmGrid({
	height : getAutoHeightByMmGrid($("#xascfMainPanel")),
	cols : _cols,
	url : 'xascf/information/partner/getPartnerList.shtml',
	params : $("#partnerListQueryForm").serialize(),
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
   _mmg.on('itemdblclick', function(event, item, rowIndex) {
				partnerList.doubleClick(item);
            	
            });  
            mmGridResizeListener(_mmg, $(".page-content"));
var partnerList = function() {
	return {
		/**查询*/
		query : function() {
            _mmg.load($("#partnerListQueryForm").serialize());
		},
		/**双击*/
		doubleClick : function(item){
			partnerList.addWinPop(item);
		},
		
		/**删除*/
		deleteByPids : function() {
			var str = new Array();
			$.each(_mmg.selectedRows(), function(i, n) {
				str.push("pids=" + n.partnerPid);
			});
			/**选中才能删除 */
				if (str == "") {
					PUI.MessageBox.alert("请至少选中一条记录");
				} else {
				PUI.MessageBox.show({
				    title: "删除合作伙伴信息",
				    content: "你确定要删除合作伙伴信息吗？",
				    type: "alert",
				    buttons: [{ value: "是" },{ value: "否" }],
				    success: function (result) {
				        if (result == "是") {
				        	$.post("xascf/information/partner/deleteByPids.shtml",
							str.join("&"), function(data) {
								var message=data;
								if(message.result){
									partnerList.query();
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
			partnerList.addWinPop({});			
		},
		save :function (){
			if(!$("#tabwin_add_content form").isValid()) {
				return ;
			}
			$.post("xascf/information/partner/save.shtml",$("#partnerEditForm").serialize(),function(data){
				var message = data;
				if(message.result)
				{
					$("#tabwin_add").popup({display:false});
					partnerList.query();							
				}
				PUI.MessageBox.info(message.msg);
			}, "json");	
		},
		
		/**打开一个新的编辑页面*/
		editor : function(){
			if ($("input[class='mmg-check']:checked").length != 1){
				PUI.MessageBox.alert("请选中一条记录!");
				return;
			}
			var item = _mmg.selectedRows()[0];
			partnerList.addWinPop(item);
		},
		addWinPop : function(data){
			/** 解析模板文件 */
			var template = Handlebars.compile(template_partnerEdit_tabs);
			/** 模板加上json数据 */
			var html = template(data);
			$("#tabwin_add_content").html(html);
			$("#tabwin_add").popup({md:true});
			PUI.plugin.init({}, $("#tabwin_add_content"));

		},
		cancle :function(){
			$("#tabwin_add").popup({display:false});
		},
		/**清空**/
		clear : function(){
			PUI.util.resetForm($("#partnerListQueryForm"));
		},
		addUploadPop : function(data){
			pluploadUtil.init("/XA_SCF/xascf/util/plupload.shtml",{type : "partner", requestName : $("#partnerName").val()},
				{title : "Image files", extensions : "jpg,gif,png"},partnerList.fillUrlAndName);
		},
		fillUrlAndName : function(array){
			
			$("#partnerLogo").val(array[0]);
			$("#partnerLogoName").val(array[1]);
		}
	};
}();