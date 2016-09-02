$(document).ready(function(){
	$("#status").val("3");
});

var _cols =[{ title:'购买编号', name:'purchaseNo' ,width:120, align:'center', sortable: true, type: 'String'},
            { title:'产品编号',name:'productNo', width: 110, align: 'center',type:'String', sortable: true,
			  renderer: function(val,item,rowIndex){return '<span style=""><a href="#" onclick="BuyRecord.productDetail(\''+item.purchaseProductPid+'\')">'+val+'</a></span>'}},
             { title:'产品名称', name:'name' ,width:120, align:'center', sortable: true, type: 'String'},
             { title:'赎回方式', name:'redeemType' ,width:70, align:'center', sortable: true, type: 'String'},
             { title:'购买者', name:'loginName' ,width:70, align:'center', sortable: true, type: 'String'},
             { title:'本金(元)', name:'purchaseAmount' ,width:70, align:'center', sortable: true, type: 'String'},
             { title:'购买份额', name:'purchaseShare' ,width:70, align:'center', sortable: true, type: 'String'},
             { title:'预计收益(元)', name:'interest' ,width:100, align:'center', sortable: true, type: 'String'},
             { title:'暂定收益(元)', name:'presentProfit' ,width:100, align:'center', sortable: true, type: 'String'},
             { title:'投资时间', name:'purchaseTime' ,width:90, align:'center', sortable: true, type: 'String'}
             
         ];

var _mmg =  $("#mmg").mmGrid({
         	height : getAutoHeightByMmGrid($("#xascfMainPanel")),
         	cols : _cols,
         	url : 'xascf/product/purchase/page.shtml',
         	params : $("#buyRecordQueryForm").serialize(),
         	method : 'post',
         	checkCol : true,
         	autoLoad : true,
         	indexCol : true,
         	indexColWidth : 15,
         	nowrap:true,
         	sortName : '',
         	sortStatus : '',
         	fullWidthRows : true,
         	cache : false,
         	multiSelect: true,
         	plugins : [$('#pg').mmPaginator({})]
         });

mmGridResizeListener(_mmg, $(".page-content"));

var BuyRecord = function() {
	return {
		/*查询*/
		query : function() {
            _mmg.load($("#buyRecordQueryForm").serialize());
		},
		/*清空**/
		clear : function(){
			PUI.util.clearForm($("#buyRecordQueryForm"));
		},
		/*tab查找*/
		tabQuery:function(type){
			if('3'==type){//募集
				$("#status").val(type);
				$("#buttonList").show();
			}else if('4'==type){//续存
				$("#status").val(type);
				$("#buttonList").hide();
			}else if('5'==type){//结束
				$("#status").val(type);
				$("#buttonList").hide();
			}
			_mmg.load($("#buyRecordQueryForm").serialize());
			
		},
		
		/*删除*/
		deleteBuyRecord:function(){
			if (_mmg.selectedRowsIndex().length < 1){
				PUI.MessageBox.alert("至少选中一条记录");
				return;
			}
			var item=_mmg.selectedRows();
			var purchasePids = new Array();
			$.each(_mmg.selectedRows(), function(i, n) {
				purchasePids.push(n.purchasePid);
			});
			var pids=purchasePids.join(",");
			PUI.MessageBox.show({
			    title: "删除购买记录",
			    content: "你确定要删除购买记录吗？",
			    type: "alert",
			    buttons: [{ value: "是" },{ value: "否" }],
			    success: function (result) {
			        if (result == "是") {
			        	$.post("xascf/product/purchase/deleteBuyRecord.shtml",{"pids":pids},function(data) {
			        		PUI.MessageBox.info(data);
			        		_mmg.load($("#buyRecordQueryForm").serialize());
						});
			        }
			    }
			});
		},
		/*购买录入*/
		add:function(){
			$.post("xascf/product/purchase/forwardToNew.shtml",{}, function(data) {
				$("#xascfMainPanel").html(data);
				$("type").val("new");
				$("#purchaseShare").val("");
			});
		},
		/*编辑*/
		edit:function(){
			if (_mmg.selectedRowsIndex().length != 1){
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			var item=_mmg.selectedRows();
			$.post("xascf/product/purchase/forwardToEdit.shtml",{"purchasePid":item[0].purchasePid}, function(data) {
				$("#xascfMainPanel").html(data);
			});
		},
		/*理财产品详细*/
		productDetail:function(productPid){
			$.post("xascf/product/forwardToEdit.shtml",{"productPid":productPid}, function(data) {
				$("#xascfMainPanel").html(data);
				$("#name").attr('readonly','readonly');
				$("#fm").attr('readonly','readonly');
				$("#to").attr('readonly','readonly');
				$("#amount").attr('readonly','readonly');
				$("#share").attr('readonly','readonly');
				$("#leastRate").attr('readonly','readonly');
				$("#leastCost").attr('readonly','readonly');
				$("#renewTerm").attr('readonly','readonly');
				$("#aunualRate").attr('readonly','readonly');
				$("#mostAmount").attr('readonly','readonly');
				$("#actualAmount").attr('readonly','readonly');
				$("#description").attr('disabled','disabled');
				$("#unitPrice").attr('readonly','readonly');
				$("#minRate").attr('readonly','readonly');
				$("#maxRate").attr('disabled','disabled');
				$("#saveBt").hide();
				$("#publish").hide();
				$("#reSetBtn").hide();
			});
		}
	};
}();