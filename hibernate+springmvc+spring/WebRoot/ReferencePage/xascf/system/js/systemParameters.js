$(document).ready(function(){
	PUI.plugin.init();
	sns.valid.init($("form"));
});

var _cols = [
    { title:'参数名称', name:'parameterDesc' ,width:120, align:'center', sortable: true, type: 'String'},
    { title:'参数值', name:'parameterValue' ,width:120, align:'center', sortable: true, type: 'String'},
    { title:'操作', name:'nameEn' ,width:120, align:'center', sortable: true, type: 'String',
    	renderer: function(val,item,rowIndex){
		   return  '<a class="btnPrice" href="javascript:void(0)" onclick="SystemParameters.detail(\''+item.id+'\',\''+rowIndex+'\')">编辑</a>'
	 }}
    
];

var _mmg =  $("#mmg").mmGrid({
	height : getAutoHeightByMmGrid($("#xascfMainPanel")),
	cols : _cols,
	url : 'xascf/systemParameter/toParameter.shtml',
	params : $("#systemParametersQueryForm").serialize(),
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
mmGridResizeListener(_mmg, $(".page-content")); 
var SystemParameters = function() {
	return {
		
		/**查询*/
		query : function() {
            _mmg.load($("#systemParametersQueryForm").serialize());
		},
		/**清空**/
		clear : function(){
			PUI.util.resetForm($("#systemParametersQueryForm"));
		},  
		
		/**
		 * 关闭弹出框
		*/
		cancleParamet: function(){
			$("#pop_up_delay").popup({display:false}); 
		}, 
		/**
		 * 弹出框编辑
		*/
		detail: function(id,rowIndex){    
			var item =getItemById(_mmg,id);
			var html = PUI.String.format($("#pop_up_paramet").html(),$.extend(item, {rowIndex: rowIndex}));      
//			$("#pop_up_show_content").html(PUI.String.format($("#pop_up_paramet").html(), {}));
			var content=$("#pop_up_show_content");
			content.html(html); 
			$("#pop_up_delay").popup({md:true}); 
			$("#parameterPid").val(item.parameterPid).trigger("liszt:updated");
			$("#parameterCode").val(item.parameterCode).trigger("liszt:updated"); 
			$("#parameterDesc").val(item.parameterDesc).trigger("liszt:updated");
			$("#parameterValue").val(item.parameterValue).trigger("liszt:updated");
			$("#parameterCode").attr('readonly','readonly'); 
			
			
			PUI.plugin.init({}, $("#pop_up_show_content"));
			sns.valid.init($("#pop_up_show_content > form"));
			
		},
		
		/**
		 * 保存编辑
		*/
		addParametRow : function() {
			var $editForm = $("#editForm");
			if (!$editForm.isValid()) {
					return;
			}    
			var params = $editForm.serializeArray();
			$.post("xascf/systemParameter/saveParamet.shtml",params,function(data){ 
				if(data.result){
					 if(data.msg =="保存成功"){	
					   $("#pop_up_delay").popup({display:false}); 	 
					   SystemParameters.query();
					   SystemParameters.cancleParamet();
				 	} 
				}
				PUI.MessageBox.info(data.msg);
			},"json"); 
		},
		
		
		/**
		 * 编辑
		 */
		edit:function(){
			if (_mmg.selectedRowsIndex().length != 1){
				PUI.MessageBox.alert("请选中一条记录",null,{buttons : [],autoClose: true,timeOut: 1000});
				return;
			}
			window.scrollBy(0, 500);
			var item=_mmg.selectedRows();
			$("#tempCode").val(item[0].code);
			$("#id").val(item[0].id);
			$("#code").val(item[0].code);
			$("#nameCn").val(item[0].nameCn);
			$("#nameEn").val(item[0].nameEn);
			$("#reMark").val(item[0].reMark);
		},
		/**
		 * 查看
		 */
		check:function(){
			if (_mmg.selectedRowsIndex().length != 1){
				PUI.MessageBox.alert("请选中一条记录",null,{buttons : [],autoClose: true,timeOut: 1000});
				return;
			}
			var item=_mmg.selectedRows();
			var parentCode=item[0].code;
			$("#parentCode").val(parentCode);
			$("#title").append(parentCode);
			BaseDataConfigChild.load(parentCode);
			$("#parentDataConfig").hide();
			$("#childDataConfig").show();
		}
	};
}();
