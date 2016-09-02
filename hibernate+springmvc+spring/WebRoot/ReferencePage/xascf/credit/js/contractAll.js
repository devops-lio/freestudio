$(document).ready(function(){
 	PUI.plugin.init();
	sns.valid.init($("form"));
});

var cols = new Array(
		{ title:'授信批复编号', name:'creditResultNo' ,width:60, align:'center', sortable: true, type: 'string',
			renderer: function(val,item,rowIndex){
				return '<span style=""><a href="xascf/credit/toCreditResultPrintInner.shtml?creditNo='+item.creditNo+'" target="_bank">'
			  	  +val+'</a></span>';}},
	    { title:'合同编号', name:'contractNo' ,width:60, align:'center', sortable: true, type: 'string',
		     renderer: function(val,item,rowIndex){return '<span style=""><a href="#" onclick="contractDetail(\''+item.contractNo+'\')">'
  	     +val+'</a></span>';}},
  	    { title:'签订方', name:'memberName' ,width: 250, align:'left', sortable: true, type: 'string',
  	    	renderer: function(val,item,rowIndex){return '<span style=""><a href="#" onclick="customerDetailPop.customerDetail(\''+item.memberPid+'\')">'
  	    	  +val+'</a></span>'}},  
  	    { title:'合同额度', name:'contractAmount' ,width:70, align:'center', sortable: true, type: 'string',
  		        renderer: function(val){return formatMoney(val)+' 元'}},
	    { title:'开始日期', name:'creditFrom', width:60, align:'center', sortable: true, type: 'string'},
	    { title:'结束日期', name:'creditTo', width:60, align:'center', sortable: true, type: 'string'},
	    { title:'状态', name:'statusCn', width:40, align:'center', sortable: true, type: 'string',renderer: function(val,item,rowIndex){
	    	return '<span >'
	    	  +val+'</span>'}}
		
	);

var mmg =  $("#mmg").mmGrid({
	height:  290,
	cols: cols,
	url: 'xascf/credit/fancingContract/page.shtml',
	params: $("#contractQueryForm").serialize(),
	method: 'post',
	checkCol: true,
	autoLoad: true,
	fullWidthRows: true,
	indexColWidth: 15, 
	cache: false,
	showBackboard:false,
	multiSelect: true,
	nowrap: true,
	plugins: [$('#pg').mmPaginator({})] 
});

var ContractAll=function(){
	return {
		//新增
		add:function(){
			$.post("xascf/credit/jsp/contractEdit.jsp", function(data) {  
				$("#xascfMainPanel").html(data); 
				$("#rebackType").val("1");
			}); 
		},
		//查询
		query:function(){
			mmg.load($("#contractQueryForm").serialize());
		},
		//重置
		clear:function(){
			PUI.util.resetForm($("#contractQueryForm"));
		},
		//删除
		deleteContract:function(){
			if (mmg.selectedRowsIndex().length == 0){
				PUI.MessageBox.alert("请至少选中一条记录");
				return;
			}
			
			var params = new Array();
			var items = mmg.selectedRows();
			for (var i = 0;i < items.length; i++) {
				params.push({name: "ids", value: items[i].id});
			}
			
			PUI.MessageBox.show({
			    title: "合同作废信息",
			    content: "是否作废该合同？",
			    type: "confirm",
			    buttons: [{ value: "是" },{ value: "否" }],
			    success: function (result) {
			        if (result == "是") {
			        	$.post("xascf/credit/fancingContract/deleteContract.shtml", params, function(data) {
							PUI.MessageBox.info(data);
							mmg.load($("#contractQueryForm").serialize());
			        	});
			        }
			    }
		    });
		},
		/**
		 *合同详细信息
		 * @returns
		 */ 
		contractDetail:function(contractNo){ 
			$.post("xascf/credit/fancingContract/getContractByContractNo.shtml",{"contractNo":contractNo,"loanType":""},function(data){    
				$("#contractDetailContent").html(data); 
				$("#contractDetail").popup({md:true});
			});  
			
		},

		//编辑
		edit:function(){
			if(mmg.selectedRows().length!=1){
				PUI.MessageBox.alert("请选中一条记录！");
				return;
			}
			var item=mmg.selectedRows()[0];
			var itemStatus=item.status;
			if(itemStatus!='10'){
				PUI.MessageBox.alert("该合同不是新建状态不能编辑!");
				return;
			}
			var contractNo=item.contractNo;
			var creditResultNo=item.creditResultNo;
			$.post("xascf/credit/fancingContract/creditNoChange.shtml",{"creditResultNo":creditResultNo,"contractNo":contractNo,"rebackType":"1"}, function(data) {  
				$("#xascfMainPanel").html(data);  
				var creditResultNo=$("#creditResultNo").val();
				$("#creditResultNo").hide();
				$("#resultNoDiv").empty();
				$("#resultNoDiv").html(creditResultNo);
				$("#resultNoDiv").addClass('details');
				
			});
		}
	};
}();