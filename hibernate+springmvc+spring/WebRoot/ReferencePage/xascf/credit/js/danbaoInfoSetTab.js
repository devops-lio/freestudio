$(document).ready(function(){
	
});

var danbao_cols=[
  {title: "担保人/担保公司",name:"guaranteeCompanyName" ,width:150, sortable: true, type:'String', align:'center'},
  {title: "担保协议",name:"guaranteeProtocolName" ,width:150, sortable: true, type:'string', align:'center',
		 renderer: function(val,item,rowIndex){
			 var url=item.guaranteeProtocolUrl;
	return '<a target="_blank" href="xascf/util/download.shtml?fileName='+val+'&url='+url+'">'+val+'</a>';}},
  {title: "图片url",name:"guaranteeProtocolUrl" ,width:150, sortable: true, type:'string',hidden:true, align:'center'},
  {title: "图片新名字",name:"guaranteeProtocolNewName" ,width:150, sortable: true, type:'string',hidden:true, align:'center'},
  {title: "担保公司地址",name:"guaranteeAddress" ,width:150, sortable: true, type:'string',hidden:true, align:'center'},
  {title: "注册资金",name:"guaranteeCapital" ,width:150, sortable: true, type:'string', align:'center'},
  {title: "固定电话",name:"tel" ,width:150, sortable: true, type:'string', align:'center'},
  {title: "企业联系人",name:"guaranteeContacts" ,width:150, sortable: true, type:'string', align:'center'},
  {title: "手机",name:"mobile" ,width:150, sortable: true, type:'string', align:'center'},
  {title: "邮箱",name:"email" ,width:150, sortable: true, type:'string', align:'center'},
  {title: "担保范围",name:"guaranteeBusiness" ,width:150, sortable: true, type:'string', align:'center'}
];
 db_mmg=$('#db_mmg').mmGrid({
	width:'auto',
	height: 160,
	cols: danbao_cols,
	method: 'post',
	indexCol: false,
	indexColWidth: 15,
	checkCol:true,
	fullWidthRows:true,
	multiSelect: true,
	cache: false,
	nowrap : true,
	autoLoad : true,
	params : {creditNo:$("#creditNo").val()},
	url : 'xascf/guarantee/page.shtml'
		
});
 
var danbaoItems=new Array(
		'guaranteeCompanyName',
		'guaranteeAddress',
		'guaranteeCapital',
		'guaranteeContacts',
		'tel',
		'mobile',
		'email',
		'guaranteeBusiness');
 
var danbaoItemRels=new Array(
	'guaranteeProtocolName',
	'guaranteeProtocolNewname',
	'guaranteeProtocolUrl');

var DanbaoInfo = function(){	
	return{
		
		//新增按钮
		dbadd : function(val) {
			var jHtml = $(PUI.String.format($("#template_"+val).html(), {}));
			$("#tabwin_add_content_"+val).html(jHtml[0].outerHTML);
			$("#tabwin_add_"+val).popup({md:true});
			PUI.plugin.init({}, $("#tabwin_add_content_"+val));
			sns.valid.init($("#"+val+"_form"));
		},
		
		//上传文件
		addUploadPop : function(data){
			 pluploadUtil.init(
				   "/XA_SCF/xascf/util/plupload.shtml",
				   {type : "担保材料", requestName : $("#memberName").val()},
				   {title : "Image files", extensions : "jpg,gif,png.doc"},
				   DanbaoInfo.fillUrlAndName
			);		
		},
		//上传回调函数
		fillUrlAndName:function(array){
			$("#db_url").val(array[0]);
			$("#db_fileName").val(array[1]);
			$("#show_db_fileName").html(array[2]);
		},	
		
		
		
		//取消关闭
		dbCancle : function(){
			$("#tabwin_add_db").popup({display:false});
		},
		
		
		//新增一行表格记录
		adddbRow :function (){
			var fileName=$("#show_db_fileName").html();
			if(fileName==""||fileName==null){
				PUI.MessageBox.alert("请上传担保材料！");
				return;
			}
			if (!$("#db_form").isValid()) {
				return ;
			}
			var _dbItem = {
					guaranteeCompanyName:$("#guaranteeCompanyName").val(),
					guaranteeProtocolName: $("#show_db_fileName").html(),
					guaranteeProtocolNewName:$("#db_fileName").val(),
					guaranteeProtocolUrl: $("#db_url").val(),
					guaranteeAddress:$("#guaranteeAddress").val(),
					guaranteeCapital:$("#guaranteeCapital").val(),
					guaranteeContacts:$("#guaranteeContacts").val(),
					tel:$("#tel").val(),
					mobile:$("#mobile").val(),
					email:$("#email").val(),
					guaranteeBusiness:$("#guaranteeBusiness").val()
			};
			if ($("#tabwin_add_content_db input[name=rowIndex]").val() != "") {
				var rowIndex=parseInt($("#tabwin_add_content_db input[name=rowIndex]").val());
				db_mmg.updateRow(_dbItem, rowIndex);
			} else {
				db_mmg.addRow(_dbItem, db_mmg.rowsLength());
			}
			$("#tabwin_add_db").popup({display:false});
			
		},
		
		//编辑
		editdb :function(){
			if (db_mmg.selectedRowsIndex().length != 1){
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			var item = db_mmg.selectedRows()[0];
			var rowIndex =db_mmg.selectedRowsIndex();
			var html = PUI.String.format($("#template_db").html(),$.extend(item, {rowIndex: rowIndex}));
			var content=$("#tabwin_add_content_db");
			content.html(html);
			$("#tabwin_add_db").popup({md:true});
			PUI.plugin.init({}, $("#tabwin_add_content_db"));
			sns.valid.init($("#tabwin_add_content_db > form"));
		},
		//删除
		removedbItem: function() {
			if (db_mmg.selectedRowsIndex().length == 0){
				PUI.MessageBox.alert("请至少选中一条记录");
				return;
			}
			PUI.MessageBox.show({
				title: "删除担保信息",
				content: "你确定要删除担保信息吗？",
				type: "alert",
				buttons: [{ value: "是" },{ value: "否" }],
				success: function (result) {
					if (result == "是") {
						while (db_mmg.selectedRowsIndex().length > 0) {
							db_mmg.removeRow(db_mmg.selectedRowsIndex()[0]);
						}
					}
				}
			});
		}
		
	};
}();
