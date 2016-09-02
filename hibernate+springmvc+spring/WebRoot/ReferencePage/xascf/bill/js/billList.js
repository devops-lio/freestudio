 $(document).ready(function(){
 	PUI.plugin.init({},$("#billListQueryForm"));
	sns.valid.init($("#billListQueryForm"));
	//初始化mmgridTab
	 $('#waitCheck').on('shown', function (e) {
		 BillList.waitCheckGrid();	
	 });
	 $('#history').on('shown', function (e) {
		 BillList.historyGrid();	
	 });
	 $('#delay').on('shown', function (e) {
		 BillList.delayGrid();	
	 });
	 $('#earlier').on('shown', function (e) {
		 BillList.earlierGrid();	
	 });
	 $('#hands').on('shown', function (e) {
		 BillList.handsGrid();	
	 });
});
 var waitCheck_mmg = null;
 var history_mmg = null;
 var delay_mmg = null;
 var earlier_mmg = null;
 var hands_mmg = null;
 //所有账单
 var _cols = [
    { title:'账单编号', name:'billNo' ,width:120, align:'center', sortable: true, type: 'String'},
    { title:'放款单号', name:'fancingOrderNo' ,width:120, align:'center', sortable: true, type: 'String',
    	renderer: function(val){
        		return '<a class="btnPrice" href="javascript:void(0)" onclick="fancingOrderDetail4Pop.fancingDetail(\''+val+'\')">'+val+'</a>';
     		}},
    { title:'会员名称', name:'menberName' ,width:300, align:'left', sortable: true, type: 'String',
     			renderer: function(val,item,rowIndex){
     	return '<span style=""><a href="#" onclick="customerDetailPop.customerDetail(\''+item.menberPid+'\')">'
  	  +val+'</a></span>'}},
    { title:'账单金额', name:'billPrice' ,width:90, align:'center', sortable: true, type: 'String',
        renderer: function(val,item,rowIndex){
        		return '<span >'+formatMoney(val)+' 元</span>';
        	}
    },
    { title:'账单类型', name:'billType' ,width:80, align:'center', sortable: true, type: 'String',
        renderer: function(val,item,rowIndex){
    		return '<span >'+val+'</span>';
    	}
    },
	{ title:'账单时间', name:'createTimeStr' ,width:120, align:'center', sortable: true, type: 'String',
    	renderer: function(val,item,rowIndex){
    		if(item.billType=='本金' &&item.endDate!=null)
    			val=item.endDate;
    		return '<span>'+val+'</span>';
    		}
    },
    { title:'到期还款日', name:'rebackDate' ,width:120, align:'center', sortable: true, type: 'String'},
    { title:'账单摘要', name:'remark' ,width:500, align:'left', sortable: true, type: 'String'}
];
 //提前还款账单
 var earlier_cols = [
      { title:'账单编号', name:'billNo' ,width:120, align:'center', sortable: true, type: 'String'},
      { title:'放款单号', name:'fancingOrderNo' ,width:120, align:'center', sortable: true, type: 'String',
      	renderer: function(val){
          		return '<a class="btnPrice" href="javascript:void(0)" onclick="fancingOrderDetail4Pop.fancingDetail(\''+val+'\')">'+val+'</a>';
       		}},
      { title:'会员名称', name:'menberName' ,width:300, align:'left', sortable: true, type: 'String',
       			renderer: function(val,item,rowIndex){
       	return '<span style=""><a href="#" onclick="customerDetailPop.customerDetail(\''+item.menberPid+'\')">'
    	  +val+'</a></span>'}},
      { title:'账单金额', name:'billPrice' ,width:90, align:'center', sortable: true, type: 'String',
          renderer: function(val,item,rowIndex){
          		return '<span >'+formatMoney(val)+' 元</span>';
          	}
      },
      { title:'剩余金额', name:'remainingPrice' ,width:120, align:'center', sortable: true, type: 'String',
    	  renderer: function(val,item,rowIndex){
    		  return '<span>'+formatMoney(val)+' 元</span>';
    	  }
      },
      { title:'到期还款日', name:'rebackDate' ,width:120, align:'center', sortable: true, type: 'String'},
      { title:'操作', name:'billType' ,width:120, align:'center', sortable: true, type: 'String',
 		 renderer: function(val,item,rowIndex){
 			return '<a class="btnPrice" href="javascript:void(0)" onclick="BillList.fancingRebackBefore(\''+rowIndex+'\')">提前还款</a>';
// 			'<a class="btnPrice" href="javascript:void(0)" onclick="BillList.lxBeforeReback(\''+rowIndex+'\')">提前还息</a>';;
      	}
 	 }
  ];
 //逾期账单
 var delay_cols = [
      { title:'账单编号', name:'billNo' ,width:120, align:'center', sortable: true, type: 'String'},
      { title:'放款单号', name:'fancingOrderNo' ,width:120, align:'center', sortable: true, type: 'String',
        	renderer: function(val){
            		return '<a class="btnPrice" href="javascript:void(0)" onclick="fancingOrderDetail4Pop.fancingDetail(\''+val+'\')">'+val+'</a>';
         		}},
	    { title:'会员名称', name:'menberName' ,width:300, align:'left', sortable: true, type: 'String',
	     			renderer: function(val,item,rowIndex){
	     	return '<span style=""><a href="#" onclick="customerDetailPop.customerDetail(\''+item.menberPid+'\')">'
	  	  +val+'</a></span>'}},
	    { title:'账单金额', name:'billPrice' ,width:90, align:'center', sortable: true, type: 'String',
	        renderer: function(val,item,rowIndex){
	        		return '<span >'+formatMoney(val)+' 元</span>';
	        	}
	    },
      { title:'所属账期', name:'term' ,width:100, align:'center', sortable: true, type: 'String'},
      { title:'逾期金额', name:'delayPrice' ,width:100, align:'center', sortable: true, type: 'String',
    	  renderer: function(val,item,rowIndex){
    		  return '<span style="color:red;">'+formatMoney(val)+' 元</span>';
    	  }
      },
      { title:'账单类型', name:'billType' ,width:80, align:'center', sortable: true, type: 'String',
    	  renderer: function(val,item,rowIndex){
    		  return '<span >'+val+'</span>';
    	  }
      },
      { title:'账单时间', name:'createTimeStr' ,width:120, align:'center', sortable: true, type: 'String',
    	  renderer: function(val,item,rowIndex){
    		  if(item.billType=='本金' &&item.endDate!=null)
    			  val=item.endDate;
    		  return '<span>'+val+'</span>';
    	  }
      },
      { title:'到期还款日', name:'rebackDate' ,width:120, align:'center', sortable: true, type: 'String'},
      { title:'操作', name:'' ,width:160, align:'center', sortable: true, type: 'String',
  		 renderer: function(val,item,rowIndex){
  			if(item.billType=='本金')
  				return '<a class="btnPrice" href="javascript:void(0)" onclick="BillList.fancingDelay(\''+rowIndex+'\')">展期申请</a>&nbsp;|&nbsp;'+
//  				'<a class="btnPrice" href="javascript:void(0)" onclick="BillList.fancingDelay(\''+rowIndex+'\')">坏账申请</a>&nbsp;|&nbsp;'+
  				'<a class="btnPrice" href="javascript:void(0)" onclick="BillList.fancingDelayReback(\''+rowIndex+'\')">逾期还款</a>';
       	}
  	  }
      
  ];
 //本期账单
var _cols2 = [
//	 { title:'账单编号', name:'billNo' ,width:120, align:'center', sortable: true, type: 'String'},
//	 { title:'放款单号', name:'fancingOrderNo' ,width:120, align:'center', sortable: true, type: 'String',
//     	renderer: function(val){
//         		return '<a class="btnPrice" href="javascript:void(0)" onclick="fancingOrderDetail4Pop.fancingDetail(\''+val+'\')">'+val+'</a>';
//      		}},
	    { title:'会员名称', name:'menberName' ,width:300, align:'left', sortable: true, type: 'String',
	     			renderer: function(val,item,rowIndex){
	     	return '<span style=""><a href="#" onclick="customerDetailPop.customerDetail(\''+item.menberPid+'\')">'
	  	  +val+'</a></span>'}},
	 { title:'所属账期', name:'term' ,width:100, align:'center', sortable: true, type: 'String'},
	 { title:'账单时间', name:'createTimeStr' ,width:120, align:'center', sortable: true, type: 'String',
		renderer: function(val,item,rowIndex){
			if(item.billType=='本金' &&item.endDate!=null)
			val=item.endDate;
		return '<span>'+val+'</span>'
		}
	 },
	 { title:'到期还款日', name:'rebackDate' ,width:120, align:'center', sortable: true, type: 'String'},
	 { title:'本期剩余', name:'remainingPrice' ,width:100, align:'center', sortable: true, type: 'String',
	   	  renderer: function(val,item,rowIndex){
	   		  return '<span style="color:red;">'+formatMoney(val)+' 元</span>';
	   	  }
	 },
	 { title:'本期应还', name:'billPrice' ,width:100, align:'center', sortable: true, type: 'String',
		 renderer: function(val,item,rowIndex){
			 return '<a style="font-weight: bold;" href="javascript:void(0)" onclick="BillList.billDetail(\''+rowIndex+'\',\'benqi\')">'+formatMoney(val)+' 元<span style="color:red;">+</span></a>';
			 }
	 },
	 { title:'本期已还', name:'backPrice' ,width:100, align:'center', sortable: true, type: 'String',
		 renderer: function(val,item,rowIndex){
	   		  return '<span >'+formatMoney(val)+' 元</span>';
	   	  }},
	 { title:'操作', name:'billType' ,width:50, align:'center', sortable: true, type: 'String',
		 renderer: function(val,item,rowIndex){
			 if(item.billPrice>0)
			return '<a class="btnPrice" href="javascript:void(0)" onclick="BillList.fancingReback(\''+rowIndex+'\')">还款</a>';
     	}
	 }
 ];
//手动计息账单
var hands_cols = [
	  { title:'会员名称', name:'menberName' ,width:350, align:'left', sortable: true, type: 'String',
		  renderer: function(val,item,rowIndex){
			  return '<span style=""><a href="#" onclick="customerDetailPop.customerDetail(\''+item.menberPid+'\')">'
			  +val+'</a></span>'}},
	  { title:'合计总金额', name:'remainingPrice' ,width:100, align:'center', sortable: true, type: 'String',
		  renderer: function(val,item,rowIndex){
			  return '<span >'+formatMoney(val)+' 元</span>';
		  }
	  },
	  { title:'操作', name:'billType' ,width:50, align:'center', sortable: true, type: 'String',
		  renderer: function(val,item,rowIndex){
			  if(item.billPrice>0)
				  return '<a class="btnPrice" href="javascript:void(0)" onclick="BillList.handsCount(\''+rowIndex+'\')">计息</a>';
			  }
		  }
  ];
//历史账单
var history_cols2 = [
	  { title:'账单编号', name:'billNo' ,width:120, align:'center', sortable: true, type: 'String'},
	  { title:'放款单号', name:'fancingOrderNo' ,width:120, align:'center', sortable: true, type: 'String',
	     	renderer: function(val){
	         		return '<a class="btnPrice" href="javascript:void(0)" onclick="fancingOrderDetail4Pop.fancingDetail(\''+val+'\')">'+val+'</a>';
	      		}},
    { title:'会员名称', name:'menberName' ,width:300, align:'left', sortable: true, type: 'String',
     			renderer: function(val,item,rowIndex){
     	return '<span style=""><a href="#" onclick="customerDetailPop.customerDetail(\''+item.menberPid+'\')">'
  	  +val+'</a></span>'}},
	  { title:'所属账期', name:'term' ,width:100, align:'center', sortable: true, type: 'String'},
	  { title:'账单时间', name:'createTimeStr' ,width:120, align:'center', sortable: true, type: 'String',
		  renderer: function(val,item,rowIndex){
			  if(item.billType=='本金' &&item.endDate!=null)
				  val=item.endDate;
			  return '<span>'+val+'</span>';
		  }
	  },
	  { title:'到期还款日', name:'rebackDate' ,width:120, align:'center', sortable: true, type: 'String'},
	  { title:'本期应还', name:'billPrice' ,width:100, align:'center', sortable: true, type: 'String',
		  renderer: function(val,item,rowIndex){
			  return '<a style="font-weight: bold;" href="javascript:void(0)" onclick="BillList.billDetail(\''+rowIndex+'\',\'history\')">'+formatMoney(val)+' 元<span style="color:red;">+</span></a>';
		  }
	  },
	  { title:'本期已还', name:'backPrice' ,width:100, align:'center', sortable: true, type: 'String',
		  renderer: function(val,item,rowIndex){
	   		  return '<span >'+formatMoney(val)+' 元</span>';
	   	  }},
	  { title:'本期剩余', name:'remainingPrice' ,width:100, align:'center', sortable: true, type: 'String',
		  renderer: function(val,item,rowIndex){
			  return '<span >'+formatMoney(val)+' 元</span>';
		  }}
  ];
//所有账单
var all_mmg =  $("#all_mmg").mmGrid({
	height : getAutoHeightByMmGrid($("#xascfMainPanel")),
	cols : _cols,
	url : 'xascf/bill/page.shtml?type=ALL',
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
	{ title:'子账单号', name:'billNo' ,width:120, align:'center', sortable: true, type: 'String'},
	{ title:'放款单号', name:'fancingOrderNo' ,width:120, align:'center', sortable: true, type: 'String',
    	renderer: function(val){
    		return '<a class="btnPrice" href="javascript:void(0)" onclick="fancingOrderDetail4Pop.fancingDetail(\''+val+'\')">'+val+'</a>';
 		}},
	{ title:'', name:'billTypeEn' ,hidden:true,width:120, align:'center', sortable: true, type: 'String'},
	{ title:'账单类型', name:'billType' ,width:80, align:'center', sortable: true, type: 'String',
	   renderer: function(val,item,rowIndex){
		return '<span >'+val+'</span>';
	   }
    },
	{ title:'本期剩余', name:'remainingPrice' ,width:100, align:'center', sortable: true, type: 'String',
		renderer: function(val,item,rowIndex){
			return '<span>'+formatMoney(val)+' 元</span>';
		}
	},
	{ title:'到期还款日', name:'rebackDate' ,width:120, align:'center', sortable: true, type: 'String'},	
	{ title:'本期应还', name:'billPrice' ,width:100, align:'center', sortable: true, type: 'String',
		renderer: function(val,item,rowIndex){
			return '<span >'+formatMoney(val)+' 元</span>';
		}},
    { title:'本期已还', name:'backPrice' ,width:100, align:'center', sortable: true, type: 'String',
			renderer: function(val,item,rowIndex){
				return '<span >'+formatMoney(val)+' 元</span>';
			}},
    { title:'账单时间', name:'createTimeStr' ,width:120, align:'center', sortable: true, type: 'String',
		renderer: function(val,item,rowIndex){
			if(item.billType=='本金' &&item.endDate!=null)
			val=item.endDate;
		return '<span>'+val+'</span>';
		}
    },
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
var BillList = function() {
	return {
		waitCheckGrid:function(){
			if (null != waitCheck_mmg) {
				return;
			}
			waitCheck_mmg =  $("#waitCheck_mmg").mmGrid({
         		height : getAutoHeightByMmGrid($("#xascfMainPanel")),
         		cols : _cols2,
         		url : 'xascf/bill/page.shtml?type=BENQI',
         		params : $("#billListQueryForm").serialize(),
         		method : 'post',
         		autoLoad : true,
         		indexCol : true,
         		indexColWidth : 15,
         		sortName : 'id',
         		sortStatus : 'desc',
         		fullWidthRows : true,
         		showBackboard:false,
         		cache : false,
         		multiSelect: true,
         		plugins : [$('#waitCheck_pg').mmPaginator({})]
         	});
            mmGridResizeListener(waitCheck_mmg, $(".page-content"));
		},
		handsGrid:function(){
			if (null != hands_mmg) {
				return;
			}
			hands_mmg =  $("#hands_mmg").mmGrid({
				height : getAutoHeightByMmGrid($("#xascfMainPanel")),
				cols : hands_cols,
				url : 'xascf/bill/page.shtml?type=HANDS',
				params : $("#billListQueryForm").serialize(),
				method : 'post',
				autoLoad : true,
				indexCol : true,
				indexColWidth : 15,
				sortName : 'id',
				sortStatus : 'desc',
				fullWidthRows : true,
				showBackboard:false,
				cache : false,
				multiSelect: true,
				plugins : [$('#hands_pg').mmPaginator({})]
			});
			mmGridResizeListener(hands_mmg, $(".page-content"));
		},
		historyGrid:function(){
			if (null != history_mmg) {
				return;
			}
			history_mmg =  $("#history_mmg").mmGrid({
				height : getAutoHeightByMmGrid($("#xascfMainPanel")),
				cols : history_cols2,
				url : 'xascf/bill/page.shtml?type=HISTORY',
				params : $("#billListQueryForm").serialize(),
				method : 'post',
				autoLoad : true,
				indexCol : true,
				indexColWidth : 15,
				sortName : 'id',
				sortStatus : 'desc',
				fullWidthRows : true,
				showBackboard:false,
				cache : false,
				multiSelect: true,
				plugins : [$('#history_pg').mmPaginator({})]
			});
			mmGridResizeListener(history_mmg, $(".page-content"));
		},
		delayGrid:function(){
			if (null != delay_mmg) {
				return;
			}
			delay_mmg =  $("#delay_mmg").mmGrid({
				height : getAutoHeightByMmGrid($("#xascfMainPanel")),
				cols : delay_cols,
				url : 'xascf/bill/page.shtml?type=DELAY',
				params : $("#billListQueryForm").serialize(),
				method : 'post',
				autoLoad : true,
				showBackboard:false,
				indexCol : true,
				indexColWidth : 15,
				sortName : 'id',
				sortStatus : 'asc',
				fullWidthRows : true,
				cache : false,
				multiSelect: true,
				plugins : [$('#delay_pg').mmPaginator({})]
			});
			mmGridResizeListener(delay_mmg, $(".page-content"));
		},
		earlierGrid:function(){
			if (null != earlier_mmg) {
				return;
			}
			earlier_mmg =  $("#earlier_mmg").mmGrid({
				height : getAutoHeightByMmGrid($("#xascfMainPanel")),
				cols : earlier_cols,
				url : 'xascf/bill/page.shtml?type=EARLIER',
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
				plugins : [$('#earlier_pg').mmPaginator({})]
			});
			mmGridResizeListener(earlier_mmg, $(".page-content"));
		},
		/**查询*/
		query : function() {
			if($("#allboundTab").hasClass('active')){
				all_mmg.load($("#billListQueryForm").serialize());
			}//本期账单
			else if($("#waitCheckTab").hasClass('active')){ 
				waitCheck_mmg.load($("#billListQueryForm").serialize());
			}else if($("#historyTab").hasClass('active')){
				history_mmg.load($("#billListQueryForm").serialize());
			}//预期账单
			else if($("#delayTab").hasClass('active')){
				delay_mmg.load($("#billListQueryForm").serialize());
			}//提前还款
			else if($("#earlierTab").hasClass('active')){
				earlier_mmg.load($("#billListQueryForm").serialize());
			}
		},
		
		fancingDelay:function(rowIndex){
			var item=delay_mmg.row(rowIndex);
			//先计算利息查看是否有未还款的利息
			$.post("xascf/bill/fancingExtend/toCheck.shtml",{fancingOrderNo:item.fancingOrderNo},function(data){ 
				//还有未还利息
				if(data.indexOf('TRUE')>=0){
					PUI.MessageBox.show({
					    title: "账单展期",
					    content: "该账单含有未还清的利息，确定先还利息再进行展期吗？",
					    type: "alert",
					    buttons: [{ value: "是" },{ value: "否" }],
					    success: function (result) {
					    	if (result == "是") {
								$.post("xascf/bill/fancingExtend/toDetailjsp.shtml",{fancingOrderNo:item.fancingOrderNo},function(data){ 
									$("#add_span").text("融资单逾期还款");
									$("#tabwin_add_content").html(data);
									$("#tabwin_add").popup({md:true});
								});
					    	}else if(result == "否") {
					    		//不先还款 直接进入展期设置页面
					    		$.post("xascf/bill/extend.shtml",{fancingOrderNo:item.fancingOrderNo},function(data){ 
					    			$("#xascfMainPanel").empty();
									$("#xascfMainPanel").append(data);
								});
					    	}
					    }
					});
				}else{
					//无未还利息直接进入展期页面
		    		$.post("xascf/bill/extend.shtml",{fancingOrderNo:item.fancingOrderNo},function(data){ 
		    			$("#xascfMainPanel").empty();
						$("#xascfMainPanel").append(data);
					});
				}
			});
		},
		/**
		 * 逾期本金还款
		 * @returns
		 */
		fancingDelayReback :function(rowIndex){
			PUI.MessageBox.show({
			    title: "账单逾期还款",
			    content: "账单逾期还款将重新计算还款金额，确定要逾期还款吗？",
			    type: "alert",
			    buttons: [{ value: "是" },{ value: "否" }],
			    success: function (result) {
			    	if (result == "是") {
				    	var item=delay_mmg.row(rowIndex);
						$.post("xascf/bill/fancingRebackDelay/toDetailjsp.shtml",{fancingOrderNo:item.fancingOrderNo},function(data){ 
							$("#add_span").text("账单逾期还款");
							$("#tabwin_add_content").html(data);
							$("#tabwin_add").popup({md:true});
						});
			    	}
			    }
			});
		},
		/**
		 * 提前本金还款
		 * @returns
		 */
		fancingRebackBefore :function(rowIndex){
			PUI.MessageBox.show({
				title: "账单提前还款",
				content: "账单提前还款将重新计算还款金额，确定要提前还款吗？",
				type: "alert",
				buttons: [{ value: "是" },{ value: "否" }],
				success: function (result) {
					if (result == "是") {
						var item=earlier_mmg.row(rowIndex);
						$.post("xascf/bill/fancingRebackBefore/toDetailjsp.shtml",{fancingOrderNo:item.fancingOrderNo},function(data){ 
							$("#add_span").text("账单提前还款");
							$("#tabwin_add_content").html(data);
							$("#tabwin_add").popup({md:true});
						});
					}
				}
			});
		},
		/**
		 * 手动利息计算
		 * @returns
		 */
		handsCount :function(rowIndex){
			var item=hands_mmg.row(rowIndex);
			var menberPid=item.menberPid;
			$.post("xascf/bill/fancingHandsCount/toHandsConntDetailjsp.shtml",{menberPid:menberPid},function(data){ 
				$("#add_span").text("手动计息");
				$("#tabwin_add_content").html(data);
				$("#tabwin_add").popup({md:true});
			});
		},
		/**
		 * 还款
		 * @param rowIndex
		 * @returns
		 */
		fancingReback : function(rowIndex){
			var item=waitCheck_mmg.row(rowIndex);
			var params = new Array();
			var menberPid=item.menberPid;
			params.push({name: "condition.menberPid", value: menberPid});
			params.push({name: "condition.memberName", value: item.menberName});
			params.push({name: "condition.term", value: item.term});
			$.post("xascf/bill/fancingReback/toDetailjsp.shtml",params,function(data){ 
				$("#add_span").text("账单本期还款");
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