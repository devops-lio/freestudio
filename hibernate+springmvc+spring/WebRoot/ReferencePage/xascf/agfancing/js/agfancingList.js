$(document).ready(function(){
	PUI.plugin.init({},$("#agfancingQueryForm"));
	sns.valid.init($("#agfancingQueryForm")); 
});

var _cols =[ { title:'再融资单PID',name:'agfancingPid', hidden: true, width: 110, align: 'center',type:'String', sortable: true},
             { title:'再融资编号',name:'agfancingOrderNo', width: 120, align: 'center',type:'String', sortable: true,
					renderer: function(val,item,rowIndex){
							return '<span style=""><a href="#" onclick="AgfancingList.agfancingDetail(\''+val+'\')">'
				  	  +val+'</a></span>'}},
             { title:'资产包名称', name:'agfancingOrderName' ,width:120, align:'center', sortable: true, type: 'String'},
             { title:'资金方', name:'agfancingCustomerName' ,width:120, align:'center', sortable: true, type: 'String'},
             { title:'拟融资总额', name:'agfancingAmount' ,width:110, align:'center', sortable: true, type: 'String',
            		 renderer: function(val){return formatMoney(val==null||val==""?0:val)+' 元'}},
             { title:'实际融资总额', name:'agfancingActualAmount' ,width:110, align:'center', sortable: true, type: 'String',
            		 renderer: function(val){return formatMoney(val==null||val==""?0:val)+' 元'}},
             { title:'账单总额', name:'billAmount' ,width:110, align:'center', sortable: true, type: 'String',
            	 renderer: function(val){return formatMoney(val==null||val==""?0:val)+' 元'}},
             { title:'开始日期', name:'startDate' ,width:70, align:'center', sortable: true, type: 'String'},
             { title:'到期日期', name:'endDate' ,width:70, align:'center', sortable: true, type: 'String'},
             { title:'融资利率', name:'agfancingRate' ,width:60, align:'center', sortable: true, type: 'String',
					renderer: function(val){return val==null||val==''?val:val+'%'}},
             { title:'计息周期', name:'rateCycle' ,width:60, align:'center', sortable: true, type: 'String',
             		renderer: function(val){
            		 	if(val=='1')
            				 val='天';
            			 else if(val=='2')
            				 val='月'; 
            			 else if(val=='3')
            				 val='季';
            			 else if(val=='4')
            				 val='半年'; 
            			 else if(val=='5')
            				 val='年度';
            			 return val;
            		}
             },
             { title:'付息日期', name:'interestDateDesc' ,width:150, align:'center', sortable: true, type: 'String'},
             { title:'状态', name:'state', width:60, align:'center', sortable: true, type: 'String', 
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
         	url : 'xascf/agfancing/page.shtml',
         	params : $("#agfancingQueryForm").serialize(),
         	method : 'post',
         	checkCol : true,
         	autoLoad : true, 
         	fullWidthRows: true,
         	indexColWidth : 15,
         	nowrap:true,
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
			$.post("xascf/agfancing/forwardToNew.shtml",{"agfancingOrderNo":""},function(data) {
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
				$.post("xascf/agfancing/forwardToNew.shtml",{"agfancingOrderNo":item[0].agfancingOrderNo}, function(data) {
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
			        	$.post("xascf/agfancing/deleteagfancing.shtml",{"pids":pids},function(data) {
			        		PUI.MessageBox.info(data);
			        		_mmg.load($("#agfancingQueryForm").serialize());
						});
			        }
			    }
			});
		},
		
		agfancingDetail:function(agfancingOrderNo){
			$.post("xascf/agfancing/agfancingDetail.shtml",{"agfancingOrderNo":agfancingOrderNo},function(data) {  
				$("#xascfMainPanel").html(data);
			});
		}
	};
}();