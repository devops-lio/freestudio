$(document).ready(function(){
	$("#redeemType").val("2");
});

var _cols =[{ title:'购买编号', name:'purchaseNo' ,width:120, align:'center', sortable: true, type: 'String'},
            { title:'产品编号',name:'productNo', width: 110, align: 'center',type:'String', sortable: true,
			  renderer: function(val,item,rowIndex){return '<span style=""><a href="#" onclick="Expire.productDetail(\''+item.purchaseProductPid+'\')">'+val+'</a></span>'}},
			  { title:'产品名称', name:'name' ,width:110, align:'center', sortable: true, type: 'String'},
	             { title:'购买者', name:'loginName' ,width:60, align:'center', sortable: true, type: 'String'},
	             { title:'本金(元)', name:'purchaseAmount' ,width:70, align:'center', sortable: true, type: 'String'},
	             { title:'购买份额', name:'purchaseShare' ,width:60, align:'center', sortable: true, type: 'String'},
	             { title:'预计收益(元)', name:'interest' ,width:90, align:'center', sortable: true, type: 'String'},
	             { title:'实际收益(元)', name:'presentProfit' ,width:80, align:'center', sortable: true, type: 'String'},
             { title:'投资时间', name:'purchaseTime' ,width:80, align:'center', sortable: true, type: 'String'},
             { title:'款项状态', name:'profitStatus' ,width:120, align:'center', sortable: true, type: 'String',
            	 renderer: function(val,item,rowIndex){
            		 if(val=="客户申请"&& $("#redeemType").val()=="1")
            			 return '<span style=""><a style="color:red;" href="#" onclick="Expire.loan('+rowIndex+')">放款（客户已申请）</a></span>';
            		 else if(val=="未放款"&& $("#redeemType").val()=="1")
            			 return '<span style=""><a style="color:red;" href="#" onclick="Expire.loan('+rowIndex+')">放款（客户未申请）</a></span>';
            		 else if(val=="未放款"){
            			 return '<span style=""><a style="color:red;" href="#" onclick="Expire.loan('+rowIndex+')">放款</a></span>';
            		 }else
            			 return val;
            	 }
             }
             
         ];

var _mmg =  $("#mmg").mmGrid({
         	height : getAutoHeightByMmGrid($("#xascfMainPanel")),
         	cols : _cols,
         	url : 'xascf/product/purchase/page.shtml',
         	params : $("#expireQueryForm").serialize(),
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

var Expire = function() {
	return {
		/*查询*/
		query : function() {
            _mmg.load($("#expireQueryForm").serialize());
		},
		/*清空**/
		clear : function(){
			PUI.util.clearForm($("#expireQueryForm"));
		},
		/*tab查找*/
		tabQuery:function(type){
			if('1'==type){//手动赎回
				$("#redeemType").val("1");
			}else if('2'==type){//自动赎回
				$("#redeemType").val("2");
			}
			_mmg.load($("#expireQueryForm").serialize());
			
		},
		/*查看理财产品*/
		productDetail:function(purchaseProductPid){
			$.post("xascf/product/forwardToEdit.shtml",{"productPid":purchaseProductPid}, function(data) {
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
				$("#saveBt").hide();
				$("#publish").hide();
				$("#reSetBtn").hide();
			});
		},
		/*放款*/
		loan:function(rowIndex){
			var item=_mmg.row(rowIndex);
			console.log(item);
			$.post("xascf/product/purchase/loan.shtml",{"purchaseModel.purchasePid":item.purchasePid,"purchaseModel.purchaseNo":item.purchaseNo,
				"purchaseModel.productNo":item.productNo,"purchaseModel.loginName":item.loginName,"purchaseModel.purchaseAmount":item.purchaseAmount,"purchaseModel.presentProfit":item.presentProfit}, function(data) {
				PUI.MessageBox.info(data);
				_mmg.load($("#expireQueryForm").serialize());
			});
		}
		
	};
}();