$(document).ready(function(){
	$("#look").hide();
	$("#status").val("1");
	$("#updateRate").hide();
});

var _cols =[{ title:'产品编号',name:'productNo', width: 110, align: 'center',type:'String', sortable: true},
             { title:'产品名称', name:'name' ,width:120, align:'center', sortable: true, type: 'String'},
             { title:'最大募集金额', name:'mostAmount' ,width:100, align:'center', sortable: true, type: 'String'},
             { title:'总份额', name:'share' ,width:70, align:'center', sortable: true, type: 'String'},
             { title:'赎回方式', name:'redeemType' ,width:70, align:'center', sortable: true, type: 'String'},
             { title:'续存期', name:'renewTerm' ,width:70, align:'center', sortable: true, type: 'String'},
             { title:'预计年化率', width:90, align:'center', sortable: true, type: 'String',
            	 renderer: function(val,item,rowIndex){
             		return item.minRate+"%-"+item.maxRate+"%";
             	}},
             { title:'年化率', name:'aunualRate' ,width:90, align:'center', sortable: true, type: 'String',
             		renderer: function(val,item,rowIndex){
                 		return val+"%";
                 	}},
             { title:'募集开始时间', name:'startTime' ,width:120, align:'center', sortable: true, type: 'date'},
             { title:'募集结束时间', name:'endTime' ,width:120, align:'center', sortable: true, type: 'date'}
             
         ];

var _mmg =  $("#mmg").mmGrid({
         	height : getAutoHeightByMmGrid($("#xascfMainPanel")),
         	cols : _cols,
         	url : 'xascf/product/page.shtml',
         	params : $("#productQueryForm").serialize(),
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


var financial_cols =[{ title:'融资单号',name:'fancingOrderNo', width: 110, align: 'center',type:'String', sortable: true},
            { title:'融资企业', name:'requesterPid' ,width:120, align:'center', sortable: true, type: 'String'},
            { title:'融资类型', name:'fancingType' ,width:120, align:'center', sortable: true, type: 'String'},
            { title:'融资金额', name:'fancingReplyPrice' ,width:100, align:'center', sortable: true, type: 'String'}
            
        ];
var financial_mmg =  $("#financial_mmg").mmGrid({
        	height : 270,
        	cols : financial_cols,
        	url : 'xascf/fancing/getFinancial.shtml',
        	params : {},
        	method : 'post',
        	checkCol : true,
        	autoLoad : false,
        	indexCol : true,
        	indexColWidth : 15,
        	nowrap:true,
        	sortName : '',
        	sortStatus : '',
        	fullWidthRows : true,
        	cache : false,
        	multiSelect: true
        });

mmGridResizeListener(_mmg, $(".page-content"));

var Product = function() {
	return {
		/*查询*/
		query : function() {
            _mmg.load($("#productQueryForm").serialize());
		},
		/*清空**/
		clear : function(){
			PUI.util.clearForm($("#productQueryForm"));
		},
		/*新增*/
		add:function(){
			$.post("xascf/product/forwardToNew.shtml",{}, function(data) {
				$("#xascfMainPanel").html(data);
			});
		},
		/*编辑*/
		edit:function(){
			var status=$("#status").val();
			if (_mmg.selectedRowsIndex().length != 1){
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			var item=_mmg.selectedRows();
			$.post("xascf/product/forwardToEdit.shtml",{"productPid":item[0].productPid}, function(data) {
				$("#xascfMainPanel").html(data);
			});
		},
		/*删除*/
		deleteProduct:function(){
			if (_mmg.selectedRowsIndex().length < 1){
				PUI.MessageBox.alert("至少选中一条记录");
				return;
			}
			var item=_mmg.selectedRows();
			var productPids = new Array();
			$.each(_mmg.selectedRows(), function(i, n) {
				productPids.push(n.productPid);
			});
			var pids=productPids.join(",");
			PUI.MessageBox.show({
			    title: "删除理财产品",
			    content: "你确定要删除理财产品吗？",
			    type: "alert",
			    buttons: [{ value: "是" },{ value: "否" }],
			    success: function (result) {
			        if (result == "是") {
			        	$.post("xascf/product/deleteProduct.shtml",{"pids":pids},function(data) {
			        		PUI.MessageBox.info(data);
			        		_mmg.load($("#productQueryForm").serialize());
						});
			        }
			    }
			});
			
			
		},
		/*发布*/
		publish:function(){
			if (_mmg.selectedRowsIndex().length < 1){
				PUI.MessageBox.alert("至少选中一条记录");
				return;
			}
			var item=_mmg.selectedRows();
			var productPids = new Array();
			$.each(_mmg.selectedRows(), function(i, n) {
				productPids.push(n.productPid);
			});
			var pids=productPids.join(",");
			PUI.MessageBox.show({
			    title: "发布理财产品",
			    content: "你确定要发布理财产品吗？",
			    type: "alert",
			    buttons: [{ value: "是" },{ value: "否" }],
			    success: function (result) {
			        if (result == "是") {
			        	$.post("xascf/product/publish.shtml",{"pids":pids},function(data) {
			        		_mmg.load($("#productQueryForm").serialize());
			        		PUI.MessageBox.info(data);
							
						});
						
			        }
			    }
			});
		},
		/*tab查找*/
		tabQuery:function(type){
			if('1'==type){      //新建
				$("#add").show();
				$("#edit").show();
				$("#look").hide();
				$("#updateRate").hide();
				$("#come").show();
				$("#publish").show();
				$("#deleteProduct").show();
				$("#status").val(type);
			}else if('2'==type){//发布
				$("#add").hide();
				$("#edit").hide();
				$("#look").show();
				$("#updateRate").show();
				$("#come").show();
				$("#publish").hide();
				$("#deleteProduct").hide();
				$("#status").val(type);
			}else if('3'==type){//募集
				$("#add").hide();
				$("#edit").hide();
				$("#look").show();
				$("#updateRate").show();
				$("#come").show();
				$("#publish").hide();
				$("#deleteProduct").hide();
				$("#status").val(type);
			}else if('4'==type){//续存
				$("#add").hide();
				$("#edit").hide();
				$("#look").show();
				$("#updateRate").show();
				$("#come").show();
				$("#publish").hide();
				$("#deleteProduct").hide();
				$("#status").val(type);
			}else if('5'==type){//结束
				$("#add").hide();
				$("#edit").hide();
				$("#look").show();
				$("#updateRate").hide();
				$("#come").show();
				$("#publish").hide();
				$("#deleteProduct").hide();
				$("#status").val(type);
			}else if('6'==type){//募集失败
				$("#add").hide();
				$("#edit").hide();
				$("#look").show();
				$("#updateRate").hide();
				$("#come").show();
				$("#publish").hide();
				$("#deleteProduct").hide();
				$("#status").val(type);
			}
			_mmg.load($("#productQueryForm").serialize());
			
		},
		/*查看*/
		look:function(){
			if (_mmg.selectedRowsIndex().length != 1){
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			var item=_mmg.selectedRows();
			$.post("xascf/product/forwardToEdit.shtml",{"productPid":item[0].productPid}, function(data) {
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
		},
		/*来源*/
		come:function(){
			if (_mmg.selectedRowsIndex().length != 1){
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			var item=_mmg.selectedRows();
			financial_mmg.load({"relProductPid":item[0].productPid});
			$("#tabwin_finanacial").popup({md:true});
		},
		/*修改年化率*/
		updateRate:function(){
			
			var type=$("#status").val();
			if (_mmg.selectedRowsIndex().length != 1){
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			var item=_mmg.selectedRows();
			
			var productPid=item[0].productPid;
			var productNo=item[0].productNo;
			var name=item[0].name;
			var aunualRate=item[0].aunualRate;
			
			$.post("xascf/product/jsp/updateRate.jsp",function(data) {
				$("#xascfMainPanel").html(data);
				$("#productPid").val(productPid);
				$("#productNo").val(productNo);
				$("#name").val(name);
				$("#aunualRate").val(aunualRate);
				$("#status").val(type);
			});
		}
	};
}();