$(document).ready(function(){
});
setTimeout(function() {
var ladingBill_cols=[
          {title: "提单号",name:"ladingBillNo" ,width:120, sortable: true, type:'string', align:'center'},
          {title: "",name:"ladingBillPid" ,width:120, sortable: true, type:'string', align:'center',hidden:true},
          {title: "提单类型",name:"ladingBillType" ,width:120, sortable: true, type:'string', align:'center',
        	  renderer: function(val,item,rowIndex){
					 if(val=='1')
						 val='海运提单';
					 else
						 val='空运提单';
			return val}},
          {title: "发货人",name:"ladingBillClient" ,width:120, sortable: true, type:'string', align:'center'},
          {title: "货物起运地",name:"ladingBillFrom" ,width:80, sortable: true, type:'string', align:'center'},
          {title: "货物目的地",name:"ladingBillTo" ,width:80, sortable: true, type:'string', align:'center'},
          {title: "航次",name:"ladingBillCarNo" ,width:80, sortable: true, type:'string', align:'center'},
          {title: "货物名称",name:"ladingBillGoodsname" ,width:80, sortable: true, type:'string', align:'center'},
          {title: "数量",name:"ladingBillNum" ,width:120, sortable: true, type:'string', align:'center'},
          {title: "运费",name:"ladingBillPrice" ,width:120, sortable: true, type:'string', align:'center'},
          {title: "承运时间",name:"ladingBillDate" ,width:120, sortable: true, type:'string', align:'center'},
          {title: "",name:"ladingBillFileurl" ,width:150, sortable: true, type:'string',hidden:true, align:'center'},
          {title: "附件",name:"ladingBillFilename" ,width:120, sortable: true, type:'string', align:'center',
        	  renderer: function(val,item,rowIndex){
					 var url=item.ladingBillFileurl;
			return '<a target="_blank" href="xascf/util/download.shtml?fileName='+val+'&url='+url+'">'+val+'</a>'}}
          ];
 ladingBill_mmg=$('#ladingBill_mmg').mmGrid({
	width:'auto',
	height: 160,
	cols: ladingBill_cols, 
	indexCol: true,
	indexColWidth: 30,
	checkCol:true,
	fullWidthRows:true,
	multiSelect: true,
	nowrap : true,
	autoLoad : true,
	params : {fancingOrderNo:$("#facingOrderNo").val()},
	url : 'xascf/ladingBill/page.shtml'
});

ladingBill_mmg.on("loadSuccess",function(e, data){
	LadingBillInfo.countLadingBillNumPrices();
})
}, '10');
var _ladingBillItems = new Array(
		'ladingBillNo',
		'ladingBillPid',
		'ladingBillType',
		'ladingBillClient',
		'ladingBillFrom',
		'ladingBillTo',
		'ladingBillCarNo',
		'ladingBillGoodsname',
		'ladingBillNum',
		'ladingBillPrice',
		'ladingBillDate',
		'ladingBillFileurl',
		'ladingBillFilename'
	);
var LadingBillInfo = function(){	
	return{
		countLadingBillNumPrices:function(){
			var allnum=0;
			var allPrices=0;
			if (null != ladingBill_mmg.row(0)) {
				for (var i = 0;i < ladingBill_mmg[0].rows.length; i++) {
					var price=parseFloat(ladingBill_mmg.row(i).ladingBillPrice);
					allnum+=1;
					allPrices+=price;
				}
			}
			allPrices=allPrices.toFixed(2);
			$("#ladingBillpices").empty();
			$("#ladingBillnums").empty();
			$("#ladingBillpices").html(allPrices);
			$("#ladingBillnums").html(allnum);
		},
		upLoadChange :function(val){
			var fileName = $("#file_"+val).val();
			var fileType = fileName.substring(fileName.lastIndexOf(".")+1);
			if (fileType != "doc" && fileType != "docx" && fileType != "gif"&& fileType != "jpg" && fileType != "png" && fileType != "bmp"){
				PUI.MessageBox.alert("请上传Word文件或者扫描图片文件!");
				return false;				
			} 
			$("#textfielid_"+val).val(fileName);
		},
		ladingAdd : function(val) {
			var jHtml = $(PUI.String.format($("#template_"+val).html(), {}));
			$("#tabwin_add_content_"+val).html(jHtml[0].outerHTML);
			$("#tabwin_add_"+val).popup({md:true});
			PUI.plugin.init({}, $("#tabwin_add_content_"+val));
			sns.valid.init($("#"+val+"_form"));
		},
		//取消关闭
		ladingCancle : function(){
			$("#tabwin_add_ladingBill").popup({display:false});
		},
		/**
		 * 编辑提单信息
		 */
		editLadingBill :function(){
			if (ladingBill_mmg.selectedRowsIndex().length != 1){
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			var item = ladingBill_mmg.selectedRows()[0];
			var rowIndex =ladingBill_mmg.selectedRowsIndex();
			var html = PUI.String.format($("#template_ladingBill").html(),$.extend(item, {rowIndex: rowIndex}));
			var content=$("#tabwin_add_content_ladingBill");
			content.html(html);
			$("#tabwin_add_ladingBill").popup({md:true});
			PUI.plugin.init({}, $("#tabwin_add_content_ladingBill"));
			sns.valid.init($("#tabwin_add_content_ladingBill > form"));
		},
		/**
		 * 表格删除一行记录
		 */
		removeLadingBillItem: function() {
			if (ladingBill_mmg.selectedRowsIndex().length == 0){
				PUI.MessageBox.alert("请至少选中一条记录");
				return;
			}
			PUI.MessageBox.show({
				title: "删除提单信息",
				content: "你确定要删除提单信息吗？",
				type: "alert",
				buttons: [{ value: "是" },{ value: "否" }],
				success: function (result) {
					if (result == "是") {
						while (ladingBill_mmg.selectedRowsIndex().length > 0) {
							ladingBill_mmg.removeRow(ladingBill_mmg.selectedRowsIndex()[0]);
						}
						LadingBillFancing.countLadingBillNumPrices();
					}
				}
			});
		},
		//新增一行表格记录
		addLadingBillRow :function (){
			if (!$("#ladingBill_form").isValid()) {
				return ;
			}
			var requestName=$("#customerName").val();
			var ladingBill_fileName=$("#ladingBill_fileName").val();
			var receipt_textId=$("#textfielid_ladingBill").val();
			var fileName=$("#ladingBill_fileName").val();
			var url=$("#ladingBill_url").val();
			var fag=true;
			if( ladingBill_fileName!=receipt_textId){
				$.ajaxFileUpload({
					url:'xascf/util/upload.shtml?type=提单信息&requestName='+requestName,
					secureuri : false,
					fileElementId : 'file_ladingBill',
					dataType : 'text',
					type:'post',
					success: function (data, status)
					{
						var message=data.message;
						if(message.indexOf('成功')>=0){
							 fileName=data.fileName;
							 url=data.url;
							$("#ladingBill_fileName").val(fileName);
							$("#ladingBill_url").val(url);
						}else{
							fag=false;
							PUI.MessageBox.alert(message);
						}
					},
					error: function (data, status, e)
					{
						alert(e);
					}
				});
			}
			setTimeout(function() {
				if(!fag){
					return;
				}
				var _ladingBillItem = {
					ladingBillNo:$("#ladingBillNo").val(),
					ladingBillPid:$("#ladingBillPid").val(),
					ladingBillType:$("#ladingBillType").val(),
					ladingBillClient:$("#ladingBillClient").val(),
					ladingBillFrom:$("#ladingBillFrom").val(),
					ladingBillTo:$("#ladingBillTo").val(),
					ladingBillCarNo:$("#ladingBillCarNo").val(),
					ladingBillGoodsname:$("#ladingBillGoodsname").val(),
					ladingBillNum:$("#ladingBillNum").val(),
					ladingBillPrice:$("#ladingBillPrice").val(),
					ladingBillDate:$("#ladingBillDate").val(),
					ladingBillFileurl:url,
					ladingBillFilename:fileName
				};
				if ($("#tabwin_add_content_ladingBill input[name=rowIndex]").val() != "") {
					var rowIndex=parseInt($("#tabwin_add_content_ladingBill input[name=rowIndex]").val());
					ladingBill_mmg.updateRow(_ladingBillItem, rowIndex);
				} else {
					ladingBill_mmg.addRow(_ladingBillItem, ladingBill_mmg.rowsLength());
				}
				$("#tabwin_add_ladingBill").popup({display:false});
				LadingBillFancing.countLadingBillNumPrices();
			}, '800');
		}
	};
}();
