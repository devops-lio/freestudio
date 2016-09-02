$(document).ready(function(){
 	PUI.plugin.init();
	sns.valid.init($("form")); 
	
	$('#twoTabBtn').on('shown', function (e) {
		AgfancingDetails.CheckedGrid();
	});
	$('#threeTabBtn').on('shown', function (e) {
		AgfancingDetails.IncomeedGrid();
	});
	$('#fourTabBtn').on('shown', function (e) {
		AgfancingDetails.RepaymentGrid();
	});
});

/**
 * 审核中
*/
var Checking_mmg = null;
var Checking_cols =[ { title:'再融资编号',name:'agfancingOrderNo', width: 110, align: 'center',type:'String', sortable: true},
             { title:'再融资企业', name:'agfancingCustomerName' ,width:120, align:'center', sortable: true, type: 'String'},
             { title:'账单总额', name:'billAmount' ,width:100, align:'center', sortable: true, type: 'String'},
             { title:'融资申请额', name:'agfancingAmount' ,width:70, align:'center', sortable: true, type: 'String'},
             { title:'融资账期', name:'agfancingAccount' ,width:70, align:'center', sortable: true, type: 'String'},
             { title:'融资利率', name:'agfancingRate' ,width:70, align:'center', sortable: true, type: 'String'},
             { title:'融资状态', name:'state', width:90, align:'center', sortable: true, type: 'String',
            	 renderer: function(val){
            		 if(val=='1')
        				 val='新建';
        			 else if(val=='2')
        				 val='审核中'; 
        			 else if(val=='3')
        				 val='审核已通过';
        			 else if(val=='4')
        				 val='等待收款'; 
        			 else if(val=='5')
        				 val='已收款';
        			 else if(val=='6')
        				 val='到期还款';
            	return '<span style="color:red;">'+val+'</span>'}},
            	 { title:'操作', name:'state' ,width:120, align:'center', sortable: true, type: 'String', 
            		renderer:function(val,item,rowIndex){  
                       	return '<span style=""><a href="#" onclick="AgfancingDetails.agfancingVerifyed(\''+item.agfancingOrderNo+'\')">审核</a></span>'}
             	}  
         ];

var Checking_mmg =  $("#Checking_mmg").mmGrid({
 	height : getAutoHeightByMmGrid($("#xascfMainPanel")),
 	cols : Checking_cols,
 	url : 'xascf/fancing/pagechecking.shtml',
 	params : $("#agfancingQueryForm").serialize(),
 	method : 'post',
 	checkCol : true,
 	autoLoad : true, 
 	indexColWidth : 15,
 	nowrap:true,
 	sortName : '',
 	sortStatus : '',
 	fullWidthRows : true,
 	cache : false,
 	multiSelect: true,
 	plugins : [$('#onefancpg').mmPaginator({})]
 }); 
mmGridResizeListener(Checking_mmg, $(".page-content"));
 
/**
 * 以审核通过
*/
var Checked_mmg = null;
var Checked_cols =[{ title:'再融资编号',name:'agfancingOrderNo', width: 110, align: 'center',type:'String', sortable: true},
                   { title:'再融资企业', name:'agfancingCustomerName' ,width:120, align:'center', sortable: true, type: 'String'},
                   { title:'账单总额', name:'billAmount' ,width:100, align:'center', sortable: true, type: 'String'},
                   { title:'融资申请额', name:'agfancingAmount' ,width:70, align:'center', sortable: true, type: 'String'},
                   { title:'融资账期', name:'agfancingAccount' ,width:70, align:'center', sortable: true, type: 'String'},
                   { title:'融资利率', name:'agfancingRate' ,width:70, align:'center', sortable: true, type: 'String'},
                   { title:'融资状态', name:'state', width:90, align:'center', sortable: true, type: 'String',
                  	 renderer: function(val){
		                  		if(val=='1')
		           				 val='新建';
		           			 else if(val=='2')
		           				 val='审核中'; 
		           			 else if(val=='3')
		           				 val='审核已通过';
		           			 else if(val=='4')
		           				 val='等待收款'; 
		           			 else if(val=='5')
		           				 val='已收款';
		           			 else if(val=='6')
		           				 val='到期还款';
                  	return '<span style="color:red;">'+val+'</span>'}},
                  	 { title:'操作', name:'state' ,width:120, align:'center', sortable: true, type: 'String', 
                		renderer:function(val,item,rowIndex){  
                           	return '<span style=""><a href="#" onclick="AgfancingDetails.receivables(\''+item.agfancingOrderNo+'\')">申请提款</a></span>'}
                 	}  
        ];

/**
 * 已收款
*/
var Incomeed_mmg = null;
var Incomeed_cols =[ { title:'再融资编号',name:'agfancingOrderNo', width: 110, align: 'center',type:'String', sortable: true},
                     { title:'再融资企业', name:'agfancingCustomerName' ,width:120, align:'center', sortable: true, type: 'String'},
                     { title:'账单总额', name:'billAmount' ,width:100, align:'center', sortable: true, type: 'String'},
                     { title:'融资申请额', name:'agfancingAmount' ,width:70, align:'center', sortable: true, type: 'String'},
                     { title:'融资账期', name:'agfancingAccount' ,width:70, align:'center', sortable: true, type: 'String'},
                     { title:'融资利率', name:'agfancingRate' ,width:70, align:'center', sortable: true, type: 'String'},
                     { title:'融资状态', name:'state', width:90, align:'center', sortable: true, type: 'String',
                    	 renderer: function(val){
	                    		 if(val=='1')
	                				 val='新建';
	                			 else if(val=='2')
	                				 val='审核中'; 
	                			 else if(val=='3')
	                				 val='审核已通过';
	                			 else if(val=='4')
	                				 val='等待收款'; 
	                			 else if(val=='5')
	                				 val='已收款';
	                			 else if(val=='6')
	                				 val='到期还款';
                    	return '<span style="color:red;">'+val+'</span>'}}  
                 ];
 
/**
 * 到期还款      
*/   
var Repayment_mmg = null;     
var Repayment_cols =[ { title:'再融资编号',name:'agfancingOrderNo', width: 110, align: 'center',type:'String', sortable: true},
                     { title:'再融资企业', name:'agfancingCustomerName' ,width:120, align:'center', sortable: true, type: 'String'},
                     { title:'账单总额', name:'billAmount' ,width:100, align:'center', sortable: true, type: 'String'},
                     { title:'融资申请额', name:'agfancingAmount' ,width:70, align:'center', sortable: true, type: 'String'},
                     { title:'融资账期', name:'agfancingAccount' ,width:70, align:'center', sortable: true, type: 'String'},
                     { title:'融资利率', name:'agfancingRate' ,width:70, align:'center', sortable: true, type: 'String'},
                     { title:'融资状态', name:'state', width:90, align:'center', sortable: true, type: 'String',
                    	 renderer: function(val){
	                    		 if(val=='1')
	                				 val='新建';
	                			 else if(val=='2')
	                				 val='审核中'; 
	                			 else if(val=='3')
	                				 val='审核已通过';
	                			 else if(val=='4')
	                				 val='等待收款'; 
	                			 else if(val=='5')
	                				 val='已收款';
	                			 else if(val=='6')
	                				 val='到期还款';
                    	return '<span style="color:red;">'+val+'</span>'}},
                      { title:'应还时间', name:'mustRepaydate',hidden:true, sortable: true, type: 'String'}, 
                    	 { title:'操作', name:'state' ,width:120, align:'center', sortable: true, type: 'String', 
                    		renderer:function(val,item,rowIndex){  
                               	return '<span style=""><a href="#" onclick="AgfancingDetails.repaymentPop(\''+rowIndex+'\')">还款申请</a></span>'}
                     	}  
                 ];  



var AgfancingDetails = function() { 
	return { 
		
	CheckingGrid:function(){	
		if (null != Checking_mmg) {
			return;
		}
		
	},
	
	CheckedGrid: function(){ 
		if(null != Checked_mmg){
			return;
		}
		Checked_mmg =  $("#Checked_mmg").mmGrid({ 
         	height : getAutoHeightByMmGrid($("#xascfMainPanel")),
         	cols : Checked_cols,
         	url : 'xascf/fancing/pagechecked.shtml',
         	params : $("#agfancingQueryForm").serialize(),
         	method : 'post',
         	checkCol : true,
         	autoLoad : true, 
         	indexColWidth : 15,
         	nowrap:true,
         	sortName : '',
         	sortStatus : '',
         	fullWidthRows : true,
         	cache : false,
         	multiSelect: true,
         	plugins : [$('#twofancpg').mmPaginator({})]
        });
		mmGridResizeListener(Checked_mmg, $(".page-content"));
	}, 
	nowrap: true,
	
	IncomeedGrid: function(){
		if(null != Incomeed_mmg){
			return;
		}
		Incomeed_mmg =  $("#Incomeed_mmg").mmGrid({
         	height : getAutoHeightByMmGrid($("#xascfMainPanel")),
         	cols : Incomeed_cols,
         	url : 'xascf/fancing/pageincomeed.shtml',
         	params : $("#agfancingQueryForm").serialize(),
         	method : 'post',
         	checkCol : true,
         	autoLoad : true, 
         	indexColWidth : 15,
         	nowrap:true,
         	sortName : '',
         	sortStatus : '',
         	fullWidthRows : true,
         	cache : false,
         	multiSelect: true,
         	plugins : [$('#threefancpg').mmPaginator({})]
         });
		mmGridResizeListener(Incomeed_mmg, $(".page-content"));
	},
	
	RepaymentGrid: function(){
		if(null != Repayment_mmg){
			return;
		}
		Repayment_mmg =  $("#Repayment_mmg").mmGrid({
         	height : getAutoHeightByMmGrid($("#xascfMainPanel")),
         	cols : Repayment_cols,
         	url : 'xascf/fancing/pagerepayment.shtml',
         	params : $("#agfancingQueryForm").serialize(),
         	method : 'post',
         	checkCol : true,
         	autoLoad : true, 
         	indexColWidth : 15,
         	nowrap:true,
         	sortName : '',
         	sortStatus : '',
         	fullWidthRows : true,
         	cache : false,
         	multiSelect: true,
         	plugins : [$('#fourfancpg').mmPaginator({})]
         });
		mmGridResizeListener(Repayment_mmg, $(".page-content"));
	},
	
		
		/*查询*/
		query : function() {
            _mmg.load($("#agfancingQueryForm").serialize());
		},
		/*清空**/
		clear : function(){
			PUI.util.clearForm($("#agfancingQueryForm"));
		},
		/*新增*/
		add:function(){ 
			Menu.forward("xascf/fancing/jsp/agfancingEdit.jsp");   
			/*$.post("xascf/product/forwardToNew.shtml",{}, function(data) {
				$("#xascfMainPanel").html(data);
			});
			*/
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
			        		_mmg.load($("#agfancingQueryForm").serialize());
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
			        		_mmg.load($("#agfancingQueryForm").serialize());
			        		PUI.MessageBox.info(data);
							
						});
						
			        }
			    }
			});
		},
		/*tab查找*/
		tabQuery:function(type){
			if('1'==type){      //新建
//				$("#add").show();
//				$("#edit").show();
//				$("#look").hide();
//				$("#updateRate").hide();
//				$("#come").show();
//				$("#publish").show();
//				$("#deleteProduct").show();
//				$("#status").val(type);
			}else if('2'==type){//发布
//				$("#add").show();
//				$("#edit").show();
//				$("#look").show();
//				$("#updateRate").show();
//				$("#come").show();
//				$("#publish").hide();
//				$("#deleteProduct").show();
//				$("#status").val(type);
			}else if('3'==type){//募集
//				$("#add").show();
//				$("#edit").show();
//				$("#look").show();
//				$("#updateRate").show();
//				$("#come").show();
//				$("#publish").hide();
//				$("#deleteProduct").show();
//				$("#status").val(type);
			}else if('4'==type){//续存
//				$("#add").show();
//				$("#edit").show();
//				$("#look").show();
//				$("#updateRate").show();
//				$("#come").show();
//				$("#publish").hide();
				$("#deleteProduct").show();
//				$("#status").val(type);
			}else if('5'==type){//结束
//				$("#add").show();
//				$("#edit").show();
//				$("#look").show();
//				$("#updateRate").hide();
//				$("#come").show();
//				$("#publish").hide();
//				$("#deleteProduct").show();
//				$("#status").val(type);
			} 
			_mmg.load($("#agfancingQueryForm").serialize());
			
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
		},
		
		/*审核*/
		agfancingVerifyed: function(agfancingOrderNo){     
			$.post("xascf/fancing/forwardToEdit.shtml",{"agfancingOrderNo":agfancingOrderNo}, function(data) {
				$("#xascfMainPanel").html(data);
				$("#agfancingOrderNo").attr('readonly','readonly');  
				$("#agfancingAmount").attr('readonly','readonly'); 
				$("#agfancingType").attr('readonly','readonly'); 
				$("#billAmount").attr('readonly','readonly'); 
				
				$("#agfancingAccount").attr('data-required','融资账期不能为空！');  
				$("#agfancingRate").attr('data-required','融资费率不能为空！');  
				$("#billAmount").attr('data-required','账单总额不能为空！');  
				document.getElementById("qrbtn").style.display=""; 
				document.getElementById("bcbtn").style.display="none"; 
			});
		},	
		
		receivables: function(agfancingOrderNo){  
			PUI.MessageBox.show({
				title:"再融资单提款申请",
				content:"确定发起再融资提款吗?",
				type:"alert",
				buttons:[{value: "是"} , {value:"否"}],
				success: function(result){  
					if(result == "是"){
		        	$.post("xascf/fancing/submitCheck.shtml",{"agfancingOrderNo":agfancingOrderNo, "type":"receivables"},function(data) { 
		        		PUI.MessageBox.info(data); 
		        		Checked_mmg.load($("#agfancingQueryForm").serialize());
				}); 
				}
			}
		})
			
		},
		repaymentPop: function(rowIndex){  
			var item=Repayment_mmg.row(rowIndex);   
			$("#agfancingOrderNo_bill").val(item.agfancingOrderNo); 
			$("#agfancingAmount_bill").val(item.agfancingAmount);
			$("#agfancingAccount").val(item.agfancingAccount);
			$("#agfancingRate").val(item.agfancingRate);
			$("#mustRepaydate").val(item.mustRepaydate);  
			$("#tabwin_agfancingbill").popup({md:true}); 
		},
		
		close: function(){
			$("#tabwin_agfancingbill").popup({display:false});  
		}
		
	};
}();