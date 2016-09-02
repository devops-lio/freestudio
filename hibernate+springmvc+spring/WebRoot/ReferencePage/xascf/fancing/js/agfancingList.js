$(document).ready(function(){ 
	$("#status").val("1");
	$("#updateRate").hide();
});

var _cols =[ { title:'再融资单PID',name:'agfancingPid', hidden: true, width: 110, align: 'center',type:'String', sortable: true},
             { title:'再融资编号',name:'agfancingOrderNo', width: 110, align: 'center',type:'String', sortable: true,
					renderer: function(val,item,rowIndex){
							return '<span style=""><a href="#" onclick="fancingOrderDetail4Pop.agFancingDetail(\''+val+'\')">'
				  	  +val+'</a></span>'}},
             //{ title:'会员名称', name:'agfancingCustomerName' ,width:120, align:'center', sortable: true, type: 'String'},
             { title:'账单总额', name:'billAmount' ,width:100, align:'center', sortable: true, type: 'String',
            	 renderer: function(val){return formatMoney(val)+' 元'}},
             { title:'再融资金额', name:'agfancingAmount' ,width:70, align:'center', sortable: true, type: 'String',
            		 renderer: function(val){return formatMoney(val)+' 元'}},
             { title:'融资账期', name:'agfancingAccount' ,width:70, align:'center', sortable: true, type: 'String',
            			 renderer: function(val){return val+'天'}},
             { title:'融资利率', name:'agfancingRate' ,width:70, align:'center', sortable: true, type: 'String',
            				 renderer: function(val){return val+'%'}},
             { title:'状态', name:'state', width:90, align:'center', sortable: true, type: 'String', 
            	 renderer: function(val){
            		 if(val=='1')
            				 val='通过';
            			 else if(val=='0')
            				 val='新建'; 
            			 else if(val=='2')
            				 val='已融入'; 
            	return '<span style="">'+val+'</span>';}}
         ];

var _mmg =  $("#mmg").mmGrid({
         	height : getAutoHeightByMmGrid($("#xascfMainPanel")),
         	cols : _cols,
         	url : 'xascf/fancing/agpage.shtml',
         	params : $("#agfancingQueryForm").serialize(),
         	method : 'post',
         	checkCol : true,
         	autoLoad : true, 
         	fullWidthRows: true,
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

var AgfancingList = function() {
	return {
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
			$.post("xascf/fancing/forwardToNew.shtml",{"agfancingOrderNo":""},function(data) {
				$("#xascfMainPanel").html(data);
				
			}); 
		},
		/*编辑*/
		edit:function(){ 
			if (_mmg.selectedRowsIndex().length != 1){
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			var item=_mmg.selectedRows();
//			if(item[0].state=='2'){
//				PUI.MessageBox.alert("该再融资已经融入资金账户中无法编辑!");
//				return;
//			}else{
				$.post("xascf/fancing/forwardToNew.shtml",{"agfancingOrderNo":item[0].agfancingOrderNo}, function(data) {
					$("#xascfMainPanel").html(data);
				});
//			}
		},
		/*删除*/
		deleteProduct:function(){
			if (_mmg.selectedRowsIndex().length < 1){
				PUI.MessageBox.alert("至少选中一条记录");
				return;
			} 
			
			var item=_mmg.selectedRows();
			var agfancingPids = new Array();
			var f=true;
			for(var i=0;i<_mmg.selectedRows().length;i++){
				var n=_mmg.row(i);
				if(n.state=='2'){
					agfancingPids.push(n.agfancingOrderNo);
					f=false;
					break;
				}else
					agfancingPids.push(n.agfancingPid);
			};
			if(!f){
				PUI.MessageBox.alert("再融资编号"+agfancingPids.join(",")+"已经融入资金账号中无法删除!");
				return;
			}
			var pids=agfancingPids.join(",");
			PUI.MessageBox.show({
			    title: "删除再融资单",
			    content: "你确定要删除再融资单吗？",
			    type: "alert",
			    buttons: [{ value: "是" },{ value: "否" }],
			    success: function (result) {
			        if (result == "是") {
			        	$.post("xascf/fancing/deleteagfancing.shtml",{"pids":pids},function(data) {
			        		PUI.MessageBox.info(data);
			        		_mmg.load($("#agfancingQueryForm").serialize());
						});
			        }
			    }
			});
			
			
		}, 
		
		/*申请审核*/
		agfancingVerifying: function(agfancingOrderNo){    
				PUI.MessageBox.show({
					title:"再融资单审核申请",
					content:"确定发起再融资审核吗?",
					type:"alert",
					buttons:[{value: "是"} , {value:"否"}],
					success: function(result){  
						if(result == "是"){
			        	$.post("xascf/fancing/submitCheck.shtml",{"agfancingOrderNo":agfancingOrderNo, "type":"checking"},function(data) { 
			        		PUI.MessageBox.info(data); 
			        		_mmg.load($("#agfancingQueryForm").serialize());
					}); 
					}
				}
			})
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