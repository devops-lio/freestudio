$(document).ready(function(){
 	PUI.plugin.init();
	sns.valid.init($("form"));
});

var cols = new Array(
		{ title:'授信批复编号', name:'creditResultNo' ,width:60, align:'center', sortable: true, type: 'string',
			renderer: function(val,item,rowIndex){
				return '<span style=""><a href="xascf/credit/toCreditResultPrintInner.shtml?creditNo='+item.creditNo+'" target="_bank">'
			  	  +val+'</a></span>';}},
	    { title:'合同编号', name:'contractNo' ,width:150, align:'center',lockWidth:true, sortable: true, type: 'string',
		     renderer: function(val,item,rowIndex){return '<span style=""><a href="#" onclick="contractDetail(\''+item.contractNo+'\')">'
  	     +val+'</a></span>';}},
  	   { title:'状态', name:'statusCn', width:60, align:'center',lockWidth:true, sortable: true, type: 'string',renderer: function(val,item,rowIndex){
	    	return '<span >'
	    	  +val+'</span>';}},
	  { title:'操作', name:'contractNo' ,width:60, align:'center',lockWidth:true, sortable: true, type: 'string',
  		  renderer: function(val,item,rowIndex){
  			  var html='<a href="#" onclick="ContractQuery.toEdit(\''+item.contractNo+'\',\''+item.creditResultNo+'\')">编辑</a></span>';
  			  if(item.status=='20' ){
  				return html+='|<a href="#" onclick="ContractQuery.voidContract(\''+val+'\')">作废</a></span>';
  			  }else if(item.status=='30'){
  				return html+='|<a href="#" onclick="ContractQuery.deleteContract(\''+val+'\')">删除</a></span>';
  			  }
  		  }
	    },	  
  	    { title:'签订方', name:'memberName' ,width: 250, align:'left', sortable: true, type: 'string',
  	    	renderer: function(val,item,rowIndex){return '<span style=""><a href="#" onclick="customerDetailPop.customerDetail(\''+item.memberPid+'\')">'
  	    	  +val+'</a></span>';}},  
  	    { title:'合同额度', name:'contractAmount' ,width:120,lockWidth:true, align:'center', sortable: true, type: 'string',
  		        renderer: function(val){return formatMoney(val)+' 元';}},
	    { title:'开始日期', name:'creditFrom',lockWidth:true, width:100, align:'center', sortable: true, type: 'string'},
	    { title:'结束日期', name:'creditTo',lockWidth:true, width:100, align:'center', sortable: true, type: 'string'}
	    
		
	);

var mmg =  $("#mmg").mmGrid({
	height:  350,
	cols: cols,
	url: 'xascf/credit/fancingContract/pageQuery.shtml',
	params: $("#contractQueryForm").serialize(),
	method: 'post',
	autoLoad: true,
	fullWidthRows: true,
	indexCol : true,
	indexColWidth : 15,
	cache: false,
	showBackboard:false,
	multiSelect: true,
	nowrap: true,
	plugins: [$('#pg').mmPaginator({})] 
});

var ContractQuery=function(){
	return {
		//编辑
		toEdit:function(contractNo,creditResultNo){
			$.post("xascf/credit/fancingContract/creditNoChange.shtml",{"creditResultNo":creditResultNo,"contractNo":contractNo,"rebackType":"2"}, function(data) {  
				$("#xascfMainPanel").html(data);  
				var creditResultNo=$("#creditResultNo").val();
				$("#creditResultNo").hide();
				$("#resultNoDiv").empty();
				$("#resultNoDiv").html(creditResultNo);
				$("#resultNoDiv").addClass('details');
				$("#saveBtn").hide();
				$("#editDiv").show();
				$("#showDiv").hide();
				$("#contractNo").attr('readonly','readonly');
//				ContractQuery.noEdiotContract();
				
				
			});
		},
		//合同编辑不可修改
		noEdiotContract:function(){
			
			$("#contractAmount").attr('readonly','readonly');
			$("#creditFrom").attr('readonly','readonly');
			$("#creditTo").attr('readonly','readonly');
			$("#rate").attr('readonly','readonly');
			$("#interest").attr('readonly','readonly');
			$("#interestDate").attr('readonly','readonly');
			$("#delayDate").attr('readonly','readonly');
			$("#delayMulpitle").attr('readonly','readonly');
			$("#compoundType").attr('readonly','readonly');
			$("#serviceType").attr('readonly','readonly');
			$("#serveRate").attr('readonly','readonly');
			$("#billRate").attr('readonly','readonly');
			$("#isBond").attr('readonly','readonly');
			$("#bondRate").attr('readonly','readonly');
			
			
		},
		//作废
		voidContract:function(val){
			$.post("xascf/credit/fancingContract/checkLoanContract.shtml", {'contractNo':val}, function(data) {
				if(data!='TRUE'){
					PUI.MessageBox.alert("该合同下含有未结清的放款信息无法作废!");
				}else{
					PUI.MessageBox.show({
					    title: "合同作废信息",
					    content: "是否作废该合同？",
					    type: "confirm",
					    buttons: [{ value: "是" },{ value: "否" }],
					    success: function (result) {
					        if (result == "是") {
					        	$.post("xascf/credit/fancingContract/voidContract.shtml", {'contractNo':val}, function(data) {
									PUI.MessageBox.info(data);
									mmg.load($("#contractQueryForm").serialize());
					        	});
					        }
					    }
				    });
				}
				
			});
			
		},
		//作废
		deleteContract:function(val){
			PUI.MessageBox.show({
				title: "合同删除信息",
				content: "是否删除该合同？",
				type: "confirm",
				buttons: [{ value: "是" },{ value: "否" }],
				success: function (result) {
					if (result == "是") {
						$.post("xascf/credit/fancingContract/deleteContract.shtml", {'contractNo':val}, function(data) {
							PUI.MessageBox.info(data);
							mmg.load($("#contractQueryForm").serialize());
						});
					}
				}
			});
		},
		//查询
		query:function(){
			mmg.load($("#contractQueryForm").serialize());
		},
		//重置
		clear:function(){
			PUI.util.resetForm($("#contractQueryForm"));
		}
	};
}();