$(document).ready(function(){
	PUI.plugin.init();
	sns.valid.init($("form"));
});
 
 var edit_cols = [ 
              	{ title:'账单编号', name:'billNo' ,width:80, align:'center', sortable: true, type: 'object'},
              	{ title:'会员名称', name:'menberName' ,width:80, align:'left', sortable: true, type: 'object',
              		renderer: function(val,item,rowIndex){
              			return '<span style=""><a href="#" onclick="customerDetailPop.customerDetail(\''+item.menberPid+'\')">'
  	    	    	  +val+'</a></span>'}},
              	{ title:'账单金额（元）', name:'billPrice' ,width:40, align:'center', sortable: true, type: 'object'},
              	{ title:'账单应还日期', name:'rebackDate' ,width:30, align:'center', sortable: true, type: 'object'} 
              ];


var edit_mmg = $("#agfund_mmg").mmGrid({
	height : 290,
	cols : edit_cols,
	url : 'xascf/fancing/agfancingCapitalpage.shtml',
	params : {
		'condition.agfancingOrderNo' : $("#agfancingOrderNo").val()
	},
	method : 'post',
	checkCol : true,
	autoLoad : true,
	fullWidthRows : true,
	indexColWidth : 15,
	cache : false,
	multiSelect : true,
	nowrap : true,
	plugins : [ $('#pg').mmPaginator({}) ]
});

//edit_mmg.on('itemdblclick', function(event, item, rowIndex) {
//	AgfancingEdit.doubleClick(item, rowIndex);
//});

edit_mmg.on("loadSuccess",function(e,data){
	AgfancingEdit.calculate();
});
mmGridResizeListener(edit_mmg, $(".page-content"));
 


var _cols =[ 
		    { title:'账单编号', name:'billNo' ,width:80, align:'center', sortable: true, type: 'object'},
		    { title:'会员名称', name:'menberName' ,width:80, align:'center', sortable: true, type: 'object'},
		    { title:'账单类型', name:'billType' ,width:40, align:'center', sortable: true, type: 'object'},
		    { title:'账单金额', name:'billPrice' ,width:40, align:'center', sortable: true, type: 'object',
		    	 renderer: function(val){return formatMoney(val)+' 元'}},
		    { title:'账单开始日', name:'startDate' ,width:40, align:'center', sortable: true, type: 'object'},
		    { title:'账单到期日', name:'rebackDate' ,width:40, align:'center', sortable: true, type: 'object'},
		    { title:'账单生成日期', name:'createTimeStr' ,width:80, align:'center', sortable: true, type: 'object'} 
         ];
var _mmg =  $("#mmg").mmGrid({
         	height : 285,
         	cols : _cols,
         	url : 'xascf/allBill/page.shtml?type=benjin', 
			params: $("#fancingQueryForm").serialize(),
         	method : 'post',
    		checkCol: true,
			autoLoad: false,
			indexCol:true,
			fullWidthRows: true,
			indexColWidth: 15, 
			cache: false,
			multiSelect: true,
			nowrap: true,
         }); 
var _rootListsn = new Array(
		 'billNo'
		 );

var lists=null;  
var items;
//交易单选中事件
_mmg.on("rowSelected", function(item, rowIndex){
	items=_mmg.selectedRows();
	list=_mmg.selectedRowsIndex();
	var len= edit_mmg[0].rows.length;
	for(var i=0;i<items.length;i++){
		for (var j = 0; j < len; j++){
			if(items[i]['billNo']==edit_mmg.row(j)['billNo']){
				PUI.MessageBox.alert(items[i]['billNo']+"账单已经存在！");
				_mmg.deselect(function(item, index){
					if(item.billNo==items[i]['billNo'])
						return true;
				});
			}
		}
	}
	items=_mmg.selectedRows();
	
	
});
$(".mmGrid").find('.mmg-head').find('th .checkAll').on('click', function () {
	items=_mmg.selectedRows();
	list=_mmg.selectedRowsIndex();
	var len= edit_mmg[0].rows.length;
	for(var i=0;i<items.length;i++){
		for (var j = 0; j < len; j++){
			if(items[i]['billNo']==edit_mmg.row(j)['billNo']){
				PUI.MessageBox.alert(items[i]['billNo']+"账单已经存在！");
				_mmg.deselect(function(item, index){
					if(item.billNo==items[i]['billNo'])
						return true;
				});
			}
		}
	}
	items=_mmg.selectedRows();
});
//交易单取消选中事件
_mmg.on("rowDeselected", function(item, rowIndex) {
	items=_mmg.selectedRows();
	list=_mmg.selectedRowsIndex();
});
var AgfancingEdit = function() {
	return { 
		// 新增运单列表信息
		add : function(val) { 
			$("#tabwin_add_buyer").popup({md:true});
			_mmg.load(); 
		},
		//账单选择确定
		sure:function(){   
			edit_mmg.addRow(items, edit_mmg.rowsLength());
			AgfancingEdit.calculate();
			$("#tabwin_add_buyer").popup({display:false}); 
		},
		//账单选择关闭
		cancle : function(val){
			$("#tabwin_add_buyer").popup({display:false});
		},	
		//重置
		reback : function(){
			Menu.forward("xascf/fancing/jsp/agfancingList.jsp");  
		}, 
		
		//编辑页面关闭
		cancelEdit:function(){
			$.post("xascf/fancing/jsp/agfancingList.jsp", function(data) {
				$("#xascfMainPanel").html(data);
			});
		},
		//保存
		save: function() {
			if (!$("#capitalEditorForm").isValid()) {
					return;
			} 
			var params=$("#capitalEditorForm").serializeArray();  
			params.push({
				name:"agfancingEntity.type",
				value: $("#type").val()
			}); 
			if(typeof edit_mmg != 'undefined' && (edit_mmg == null|| null == edit_mmg.row(0))){
				PUI.MessageBox.alert("账单列表不能为空!");
				return;
			}
			if (typeof edit_mmg != 'undefined' && null!=edit_mmg && null != edit_mmg.row(0)){
				var len= edit_mmg[0].rows.length;
				for (var i = 0; i < len; i++){
					for (var j = 0; j < _rootListsn.length; j++) {
						params.push({
							name:'agfancingEntity.aGFancingBillModelList['+ i +'].'+ _rootListsn[j],
							value: edit_mmg.row(i)[_rootListsn[j]]
						});  
					}
					params.push({
						name:'agfancingEntity.aGFancingBillModelList['+ i +'].agfancingOrderNo',
						value: $("#agfancingOrderNo").val()
					}); 
				} 
				$.post("xascf/fancing/saveagfancing.shtml", params, function(data){
					PUI.MessageBox.info(data);
					if(data=="保存成功"){
						$.post("xascf/fancing/jsp/agfancingList.jsp", function(data) {
							$("#xascfMainPanel").html(data);
						});
					}
				});
			}  
			
		},
		//计算
		calculate:function(){
			var allBillPrice=0.0;
			if(null != edit_mmg.row(0)){
				var len= edit_mmg[0].rows.length;
				for (var i = 0; i < len; i++){
					allBillPrice+=parseFloat(edit_mmg.row(i)['billPrice']);
				}
				$("#allBillPrice").text(formatMoney(allBillPrice)+'（元）');
			}
		},
		//账单查询
		fancingQuery:function(){
			_mmg.load($("#fancingQueryForm").serialize());
		},
		//账单查询条件清空
		fancingClear:function(){
			PUI.util.clearForm($("#fancingQueryForm"));
		},
		
		/**编辑**/
		editor :function(){
			if ($("input[class='mmg-check']:checked").length != 1){
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			var item = fundAccount_mmg.selectedRows()[0];
			AgfancingEdit.toEditForm(item);
		},
		toEditForm : function(item) {
			var totalAmount = Number(item.totalAmount);
			if(totalAmount!=0)
			{
				PUI.MessageBox.alert("总金额不为0，不能编辑!");
				return;
			}
			$("#fundAccountPid").val(item.fundAccountPid);
			$("#bankNo").focus().val(item.bankNo);
			$("#theBank").val(item.theBank);
			$("#totalAmount").val(item.totalAmount);
			$("#availableAmount").val(item.availableAmount);
			$("#lockedAmount").val(item.lockedAmount);
		},
		/**
		 * 确认审核
		*/
		adopt: function(){ 
			if (!$("#capitalEditorForm").isValid()) {
					return;
			}  
			var agfancingOrderNo = $("#agfancingOrderNo").val(); 
			var agfancingAccount = $("#agfancingAccount").val();
			var agfancingRate = $("#agfancingRate").val();
			
			PUI.MessageBox.show({
				title:"再融资单审核提示",
				content:"确定再融资单审核通过?",
				type:"alert",
				buttons:[{value: "是"} , {value:"否"}],
				success: function(result){  
					if(result == "是"){
		        	$.post("xascf/fancing/submitCheck.shtml",
		        			{"agfancingOrderNo":agfancingOrderNo, 
		        			 "type":"checked", 
		        			 "agfancingAccount":agfancingAccount,
		        			 "agfancingRate": agfancingRate
        			 },function(data) { 
		        		PUI.MessageBox.info(data);  
		        		_mmg.load($("#agfancingQueryForm").serialize());
					}); 
					}
				}
			})
		}, 
		

		/**删除*/
		deleteCapital : function() { 
			if (edit_mmg.selectedRowsIndex().length==0){
				PUI.MessageBox.alert("请至少选中一条记录");
				return; 
			}
			PUI.MessageBox.show({
				title:"删除账单列表信息",
				content:"你确定要删除账单列表信息吗？",
				type:"alert",
				buttons:[{value: "是"} , {value:"否"}],
				success: function(result){ 
					while(edit_mmg.selectedRowsIndex().length > 0){
						edit_mmg.removeRow(edit_mmg.selectedRowsIndex()[0]);
					}
				} 
			}) 
			
		}
	};
}();

