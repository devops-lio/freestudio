 $(document).ready(function(){
 	PUI.plugin.init({},$("#billListQueryForm"));
	sns.valid.init($("#billListQueryForm"));
});
 //所有账单
 var _cols = [
    { title:'账单编号', name:'billNo' ,width:150, align:'left', sortable: true, type: 'String',
    	renderer: function(val,item,rowIndex){
    		if(item.billTypeEn=='1')
			return '<span class="benjinRow">'+val+'</span>';
    		else
    			return val;
		}},
    { title:'会员名称', name:'menberName' ,width:300, align:'left', sortable: true, type: 'String',
      renderer: function(val,item,rowIndex){
    	  if(item.billTypeEn=='1')
    		  return '<span class="benjinRow"><a href="#" onclick="customerDetailPop.customerDetail(\''+item.menberPid+'\')">'+val+'</a></span>';
    	else
    		return '<span class=""><a href="#" onclick="customerDetailPop.customerDetail(\''+item.menberPid+'\')">'+val+'</a></span>';
  	  }},
  	  { title:'委托方名称', name:'buyerName' ,width:200, align:'left', sortable: true, type: 'String',
  		  renderer: function(val,item,rowIndex){
  			  if(item.billTypeEn=='1')
  				  return '<span class="benjinRow"><a href="#" onclick="customerDetailPop.buyerDetail(\''+item.buyerPid+'\')">'+val+'</a></span>';
  			  else
  				  return '';
  		  }},
  	{ title:'账单类型', name:'billType' ,width:70,lockWidth:true, align:'center', sortable: true, type: 'String',
  		renderer: function(val,item,rowIndex){
    		if(item.billTypeEn=='1')
			return '<span class="benjinRow">'+val+'</span>';
    		else
    			return val;
		}},
	{ title:'账单金额', name:'billPrice' ,width:130, align:'center',lockWidth:true, sortable: true, type: 'String',
		renderer: function(val,item,rowIndex){
			if(item.billTypeEn=='1')
				return '<span class="benjinRow">'+formatMoney(val)+' 元</span>';
		else
			return '<span>'+formatMoney(val)+' 元</span>';
		}
	},
	{ title:'账单开始日', name:'startDate' ,width:100,lockWidth:true, align:'center', sortable: true, type: 'String',
		renderer: function(val,item,rowIndex){
    		if(item.billTypeEn=='1')
			return '<span class="benjinRow">'+val+'</span>';
    		else
    			return val;
		}},	
	{ title:'账单到期日', name:'rebackDate' ,width:100,lockWidth:true, align:'center', sortable: true, type: 'String',
		renderer: function(val,item,rowIndex){
			var html='<span >'+val+'</span>';
			if(item.billTypeEn=='1')
				html='<span class="benjinRow">'+val+'</span>';
			if(val!='' && null!=val&&item.billStatus!='已还'){
				var  repayTime=getDate(val);
				var i=(repayTime.getTime()- new Date().getTime())/1000/60/60/24;
				if(i<=2){
					html='<span class="benjinRow" style="color:red;">'+val+'</span>';
				}else if(i<=5){
					html='<span class="benjinRow" style="color:bule;">'+val+'</span>';
				}else if(i<=10){
					html='<span class="benjinRow" style="color: #9ACD32;">'+val+'</span>';
				}
			}
			return html;
		}},	
		{ title:'最迟还款日', name:'latestTime' ,width:100,lockWidth:true, align:'center', sortable: true, type: 'String',
			renderer: function(val,item,rowIndex){
	    		if(item.billTypeEn=='1')
				return '<span class="benjinRow">'+val+'</span>';
	    		else
	    			return val;
			}},		
	{ title:'账单生成时间', name:'createTimeStr' ,width:140, align:'center',lockWidth:true, sortable: true, type: 'String',
				renderer: function(val,item,rowIndex){
		    		if(item.billTypeEn=='1')
					return '<span class="benjinRow">'+val+'</span>';
		    		else
		    			return val;
				}},
	{ title:'状态', name:'billStatus' ,width:100,lockWidth:true, align:'center', sortable: true, type: 'String',
					renderer: function(val,item,rowIndex){
			    		if(item.billTypeEn=='1')
						return '<span class="benjinRow">'+val+'</span>';
			    		else
			    			return val;
					}},
	{ title:'已还金额', name:'backPrice' ,width:130,lockWidth:true, align:'center', sortable: true, type: 'String',
		renderer: function(val,item,rowIndex){
			if(item.billTypeEn=='1')
				return '<span class="benjinRow">'+formatMoney(val)+' 元</span>';
			else
			return '<span >'+formatMoney(val)+' 元</span>';
		}},
	{ title:'还款日期', name:'repayTime' ,width:100,lockWidth:true, align:'center', sortable: true, type: 'String',
			renderer: function(val,item,rowIndex){
				if(val!=null){
					if(item.billTypeEn=='1')
		    			return '<span class="benjinRow">'+val+'</span>';
		    		else
		    			return '<span>'+val+'</span>';
				}else
					return '';
	    		
			}},
    { title:'未还金额', name:'remainingPrice' ,width:130,lockWidth:true, align:'center', sortable: true, type: 'String',
			renderer: function(val,item,rowIndex){
				if(item.billTypeEn=='1')
				return '<span class="benjinRow">'+formatMoney(val)+' 元</span>';
				else
				return '<span >'+formatMoney(val)+' 元</span>';
			}},
	{ title:'操作', name:'' ,width:100, align:'center',lockWidth:true, sortable: true, type: 'String',
		renderer: function(val,item,rowIndex){
			var html='<span >';
			if(item.billTypeEn=='1')
				html='<span class="benjinRow">';
			if(item.billStatus=='未还' || parseFloat(item.remainingPrice)>0){
				html='<a class="btnPrice" href="javascript:void(0)" onclick="AllBillList.fancingReback(\''+item.billNo+'\')">还款</a>|'+
					'<a class="btnPrice" href="javascript:void(0)" onclick="AllBillList.handsCount(\''+item.billNo+'\')">计息</a>';
			}
			if(item.billType=='罚息' || item.billType=='利息'){
				html='<a class="btnPrice" href="javascript:void(0)" onclick="AllBillList.fancingReback(\''+item.billNo+'\')">还款</a>|'+
					'<a class="btnPrice" href="javascript:void(0)" onclick="AllBillList.handsCount(\''+item.billNo+'\')">计息</a>|'+
					'<a class="btnPrice" href="javascript:void(0)" onclick="AllBillList.deleteByBillNo(\''+item.billNo+'\')">删除</a>';
			}
			
			return html+'</span>';
		}},			
    { title:'账单摘要', name:'remark' ,width:500, align:'left', sortable: true, type: 'String',
			renderer: function(val,item,rowIndex){
	    		if(item.billTypeEn=='1')
				return '<span class="benjinRow">'+val+'</span>';
	    		else
	    			return val;
			}}
];
//所有账单
var all_mmg =  $("#all_mmg").mmGrid({
	height : getAutoHeightByMmGrid($("#xascfMainPanel")),
	cols : _cols,
	url : 'xascf/allBill/page.shtml?type=ALL',
	params : $("#billListQueryForm").serialize(),
	method : 'post',
	autoLoad : true,
	showBackboard:false,
	indexCol : true,
	indexColWidth : 15,
	sortName : 'id',
	sortStatus : 'desc',
	fullWidthRows : true,
	cache : false,
	multiSelect: true,
	plugins : [$('#all_pg').mmPaginator({})]
});
mmGridResizeListener(all_mmg, $(".page-content"));
//账单明细
var details_cols = [
	{ title:'子账单号', name:'billNo' ,width:150, align:'center', sortable: true, type: 'String'},
	{ title:'', name:'billTypeEn' ,hidden:true,width:120, align:'center', sortable: true, type: 'String'},
	{ title:'账单类型', name:'billType' ,width:80, align:'center', sortable: true, type: 'String',
	   renderer: function(val,item,rowIndex){
		return '<span >'+val+'</span>';
	   }
    },
	{ title:'账单金额', name:'billPrice' ,width:100, align:'center', sortable: true, type: 'String',
		renderer: function(val,item,rowIndex){
			return '<span>'+formatMoney(val)+' 元</span>';
		}
	},
	{ title:'账单开始日', name:'startDate' ,width:120, align:'center', sortable: true, type: 'String'},	
	{ title:'账单到期日', name:'rebackDate' ,width:120, align:'center', sortable: true, type: 'String'},	
	{ title:'账单生成时间', name:'createTimeStr' ,width:120, align:'center', sortable: true, type: 'String'},
	{ title:'状态', name:'billStatus' ,width:120, align:'center', sortable: true, type: 'String'},
	{ title:'已还金额', name:'backPrice' ,width:100, align:'center', sortable: true, type: 'String',
		renderer: function(val,item,rowIndex){
			return '<span >'+formatMoney(val)+' 元</span>';
		}},
		{ title:'还款日期', name:'backPrice' ,width:100, align:'center', sortable: true, type: 'String',
			renderer: function(val,item,rowIndex){
				return '<span >'+formatMoney(val)+' 元</span>';
			}},
    { title:'未还金额', name:'remainingPrice' ,width:100, align:'center', sortable: true, type: 'String',
			renderer: function(val,item,rowIndex){
				return '<span >'+formatMoney(val)+' 元</span>';
			}},
    
   { title:'账单摘要', name:'remark' ,width:550, align:'center', sortable: true, type: 'String'}
];
//账单明细
var details_mmg =  $("#details_mmg").mmGrid({
	height : 200,
	cols : details_cols,
	url : 'xascf/bill/fancingBillDetailShow/page.shtml',
	method : 'post',
	autoLoad : false,
	showBackboard:false,
	indexCol : true,
	indexColWidth : 15,
	sortName : 'id',
	sortStatus : 'desc',
	fullWidthRows : true,
	cache : false,
	multiSelect: true
});
var AllBillList = function() {
	return {
		/**查询*/
		query : function() {
			all_mmg.load($("#billListQueryForm").serialize());
		},
		/**
		 * 手动利息计算
		 * @returns
		 */
		handsCount :function(billNo){
			$.post("xascf/allBill/fancingHandsCount/toHandsConntDetailjsp.shtml",{billNo:billNo},function(data){ 
				$("#add_span").text("手动计息");
				$("#tabwin_add_content").html(data);
				$("#tabwin_add").popup({md:true});
			});
		},
		/**
		 * 删除罚息
		 */
		deleteByBillNo :function(billNo){
			PUI.MessageBox.show({
			    title: "账单删除",
			    content: "确定要删除该账单？",
			    type: "alert",
			    buttons: [{ value: "是" },{ value: "否" }],
			    success: function (result) {
			    	if (result == "是") {
						$.post("xascf/allBill/billDelete.shtml",{billNo:billNo},function(data){ 
							if(data.indexOf('成功')>=0){
								$("#tabwin_add").popup({display:false});
								all_mmg.load($("#billListQueryForm").serialize());
								PUI.MessageBox.info(data);
							}else{
								PUI.MessageBox.info(data);
							}
						});
			    	 	}
			    	}
				});
		},
		/**
		 * 还款
		 * @param rowIndex
		 * @returns
		 */
		fancingReback : function(billNo){
			$.post("xascf/allBill/fancingReback/toDetailjsp.shtml",{billNo:billNo},function(data){ 
				$("#add_span").text("账单还款");
				$("#tabwin_add_content").html(data);
				$("#tabwin_add").popup({md:true});
			});
		},
		/**
		 * 批量还款
		 * @param rowIndex
		 * @returns
		 */
		rebackByList : function(){
			$.post("xascf/allBill/fancingReback/toAllLxDetailjsp.shtml",function(data){ 
				$("#add_span").text("批量利息账单还款");
				$("#tabwin_add_content").html(data);
				$("#tabwin_add").popup({md:true});
			});
		},
		/**
		 * 明细查看
		 * @param rowIndex
		 * @returns
		 */
		billDetail : function(rowIndex,val){
			var item;
			var rowIndex;
			if(val=='benqi'){
				 item=waitCheck_mmg.row(rowIndex);
				 rowIndex =waitCheck_mmg.selectedRowsIndex();
			}else{
				 item=history_mmg.row(rowIndex);
				 rowIndex =history_mmg.selectedRowsIndex();
			}
			var billOwerPid=item.menberPid;
			var term=item.term;
			 $("#tabwin_add_detail").popup({md:true});
			 details_mmg.load({'condition.billOwerPid':billOwerPid,'type':'DETAILS','condition.term':term});
			 var html='<a href="#" onclick="customerDetailPop.customerDetail(\''+billOwerPid+'\')" >'+item.menberName+'</a>';
			 $("#menberName").html(html);
			 $("#termDiv").text(item.term);
			 $("#billPriceDiv").text(formatMoney(item.remainingPrice)+' 元');
			 $("#payPriceDiv").text(formatMoney(item.billPrice)+' 元');
			 $("#rebackedPriceDiv").text(formatMoney(item.backPrice)+' 元');
		},
		//取消关闭
		cancle : function(val){
			$("#tabwin_add_detail").popup({display:false});
		},
		
		/**清空**/
		clear : function(){
			PUI.util.resetForm($("#billListQueryForm"));
		}
	};
}();