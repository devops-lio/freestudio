 $(document).ready(function(){
 	PUI.plugin.init({},$("#billonListQueryForm"));
	sns.valid.init($("#billonListQueryForm"));
});
var _cols = [
    { title:'融资企业', name:'billonOwerName' ,width:150, align:'center', sortable: true, type: 'String'},
    { title:'账单结算日', name:'billonDate' ,width:120, align:'center', sortable: true, type: 'String'}
    
];
var all_mmg =  $("#all_mmg").mmGrid({
	height : getAutoHeightByMmGrid($("#xascfMainPanel")),
	cols : _cols,
	url : 'xascf/fancingBillon/page.shtml',
	params : $("#billonListQueryForm").serialize(),
	method : 'post',
	autoLoad : true,
	checkCol:true,
	showBackboard:false,
	indexCol : true,
	indexColWidth : 15,
	sortName : 'id',
	sortStatus : 'desc',
	fullWidthRows : true,
	cache : false,
	multiSelect: true,
	plugins : [$('#all_pg').mmPaginator({})]
});
mmGridResizeListener(all_mmg, $(".page-content"));
var BillonList = function() {
	return {
		/**查询*/
		query : function() {
				all_mmg.load($("#billonListQueryForm").serialize());
		},
		save:function(val){
			if (!$("#billOn_form").isValid()) {
				return ;
			}
			$.post("xascf/billon/billset.shtml",$("#billOn_form").serialize(),function(data){  
				if(data.indexOf('成功')>=0){
					PUI.MessageBox.info(data);
					$("#tabwin_add").popup({display:false});
					all_mmg.load($("#billListQueryForm").serialize());
				}else{
					PUI.MessageBox.info(data);
				}
				
			});
		},
		edit :function(){
			if (all_mmg.selectedRowsIndex().length != 1){
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			var item=all_mmg.selectedRows()[0];
			$("#tabwin_add_content").html(PUI.String.format($("#template_add").html(),$.extend(item)));
			$("#tabwin_add").popup({md:true});
			PUI.plugin.init({}, $("#tabwin_add_content"));
			$("#billOnType").val(item.billonDateEn).trigger("liszt:updated");
			sns.valid.init($("#billOn_form"));
			
		},
		add : function() {
			$("#tabwin_add_content").html(PUI.String.format($("#template_add").html(), {}));
			$("#tabwin_add").popup({md:true});
			PUI.plugin.init({}, $("#tabwin_add_content"));
			sns.valid.init($("#billOn_form"));
		},
		//取消关闭
		cancle : function(val){
			$("#tabwin_add").popup({display:false});
		},
		/**清空**/
		clear : function(){
			PUI.util.resetForm($("#billonListQueryForm"));
		}
	};
}();