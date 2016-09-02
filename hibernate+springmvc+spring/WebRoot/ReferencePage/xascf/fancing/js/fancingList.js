 $(document).ready(function(){
 	PUI.plugin.init();
	sns.valid.init($("form"));
	//初始化mmgridTab
	 $('#newing').on('shown', function (e) {
		 FancingList.newingGrid();	
	 });
	 $('#waitCheck').on('shown', function (e) {
		 FancingList.waitCheckGrid();	
	 });
	 $('#checking').on('shown', function (e) {
		 FancingList.checkingGrid();		 		
	 });
	 $('#passCheck').on('shown', function (e) {
		 FancingList.passCheckGrid();	
	 });
	 $('#payed').on('shown', function (e) {
		 FancingList.payedGrid();		 		
	 });
	 $('#rabacked').on('shown', function (e) {
		 FancingList.rebackdGrid();	
	 });
});
var _cols = [
    { title:'融资单号', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
    	renderer: function(val){
    		return '<a class="btnPrice" href="javascript:void(0)" onclick="fancingDetail(\''+val.fancingOrderNo+'\')">'+val.fancingOrderNo+'</a>';
    	}
    },
    { title:'状态', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
    	      renderer: function(val){return '<span style="color:red;">'+val.fancingStatusCn+'</span>'}},	
    { title:'申请人类型', name:'fancingOrderItem' ,width:100, align:'center', sortable: true, type: 'object',
    	renderer: function(val){
    		var val=val.fancingRequestType;
    		if(val=='1')
    			val='企业会员';
    			else 
    				val='个人会员';
    		return val}},  	      
    { title:'融资会员', name:'fancingOrderItem' ,width:150, align:'center', sortable: true, type: 'object',
        renderer: function(val){return val.requestName}},
    { title:'融资种类', name:'fancingOrderItem' ,width:100, align:'center', sortable: true, type: 'object',
        renderer: function(val){
        	var val=val.fancingType;
        	if(val=='1')
        		val='运单融资';
        	else if(val=='2')
        		val='应收账款融资';
        	else if(val=='3')
        		val='抵押融资';
        	else if(val=='4')
        		val='提单融资';
        	return val}},
	{ title:'融资方式', name:'fancingOrderItem' ,width:100, align:'center', sortable: true, type: 'object',
		renderer: function(val){
			var val=val.fancingFunction;
        	if(val=='1')
        		val='非买断式融资';
        	else if(val=='2')
        		val='买断式融资';
			return val}},
	{ title:'融资类别', name:'fancingOrderItem' ,width:100, align:'center', sortable: true, type: 'object',
		renderer: function(val){
			var val=val.fancingKinds;
        	if(val=='1')
        		val='一次性融资';
        	else if(val=='2')
        		val='持续性融资';
			return val}},
    { title:'申请时间', name:'fancingOrderItem' ,width:150, align:'center', sortable: true, type: 'object',
        renderer: function(val){return val.fancingRequestDateStr}},
    { title:'申请金额(元)', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
        renderer: function(val){return formatMoney(val.fancingRequestPrice)}},
    { title:'批复金额(元)', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
        renderer: function(val){return formatMoney(val.fancingReplyPrice)}},
    { title:'融资账期', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
        renderer: function(val){
        	if(val.fancingDate!=null && val.fancingDateType)
        		return val.fancingDate+''+val.fancingDateType;
        	else
        		return '';
        	}},
	{ title:'到账日期', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
		renderer: function(val){return val.fancingRebackDate}},   	
    { title:'账期利率(%)', name:'fancingRateItem' ,width:120, align:'center', sortable: true, type: 'object',
        renderer: function(val){
        	if(val.fancingRate!=null && val.fancingRate!='undefined')
        	return val.fancingRate+'%'}},
    { title:'还款方式', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
        renderer: function(val){return val.fancingRebackType}},    
    { title:'逾期利率(%)', name:'fancingRateItem' ,width:120, align:'center', sortable: true, type: 'object',
        renderer: function(val){
        	if(val.overdueRate!=null && val.overdueRate!='undefined')
        		return val.overdueRate+"%"}},
    { title:'逾期计息方式', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
       renderer: function(val){
    	   if(val!=null)
    		   return val.fancingOverdueType;
    	   else
    		   return null;
       }
        }
    
    
];
var all_mmg =  $("#all_mmg").mmGrid({
	height : getAutoHeightByMmGrid($("#xascfMainPanel")),
	cols : _cols,
	url : 'xascf/fancing/page.shtml?type=DETAIL',
	params : $("#fancingListQueryForm").serialize(),
	method : 'post',
	autoLoad : true,
	indexCol : true,
	indexColWidth : 15,
	sortName : 'id',
	sortStatus : 'desc',
	fullWidthRows : true,
	cache : false,
	multiSelect: true,
	plugins : [$('#all_pg').mmPaginator({})]
});
var newing_mmg = null;
var waitCheck_mmg = null;
var checking_mmg = null;
var passCheck_mmg = null;
var payed_mmg = null;
var rabacked_mmg = null;
mmGridResizeListener(all_mmg, $(".page-content"));

var FancingList = function() {
	return {
		newingGrid:function(){
			if (null != newing_mmg) {
				return;
			}
			var newing_cols = [
			             { title:'融资单号', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
			             	renderer: function(val){
			             		return '<a class="btnPrice" href="javascript:void(0)" onclick="fancingDetail(\''+val.fancingOrderNo+'\')">'+val.fancingOrderNo+'</a>';
			             		}
			             },
			             { title:'申请人类型', name:'fancingOrderItem' ,width:80, align:'center', sortable: true, type: 'object',
			             	renderer: function(val){
			             		var val=val.fancingRequestType;
			             		if(val=='1')
			             			val='企业会员';
			             			else 
			             				val='个人会员';
			             		return val}},  	      
			             { title:'融资会员', name:'fancingOrderItem' ,width:150, align:'center', sortable: true, type: 'object',
			                 renderer: function(val){return val.requestName}},
			                
			             { title:'融资种类', name:'fancingOrderItem' ,width:80, align:'center', sortable: true, type: 'object',
			                 renderer: function(val){
			                 	var val=val.fancingType;
			                 	if(val=='1')
			                 		val='运单融资';
			                 	else if(val=='2')
			                 		val='应收账款融资';
			                 	else if(val=='3')
			                 		val='抵押融资';
			                 	else if(val=='4')
			                 		val='提单融资';
			                 	return val}},
			            
			                 	{ title:'融资方式', name:'fancingOrderItem' ,width:100, align:'center', sortable: true, type: 'object',
			                		renderer: function(val){
			                			var val=val.fancingFunction;
			                        	if(val=='1')
			                        		val='非买断式融资';
			                        	else if(val=='2')
			                        		val='买断式融资';
			                			return val}},
			                	{ title:'融资类别', name:'fancingOrderItem' ,width:100, align:'center', sortable: true, type: 'object',
			                		renderer: function(val){
			                			var val=val.fancingKinds;
			                        	if(val=='1')
			                        		val='一次性融资';
			                        	else if(val=='2')
			                        		val='持续性融资';
			                			return val}},
			             { title:'申请时间', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
			                 renderer: function(val){return val.fancingRequestDateStr}},
			             { title:'申请金额(元)', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
			                 renderer: function(val){return formatMoney(val.fancingRequestPrice)}},
		                 { title:'操作', name:'' ,width:140, align:'center', sortable: true, type: 'String',
		             	  renderer: function(val,item,rowIndex){
		             		  if(item.fancingOrderItem.fancingStatusCn=='新建'){
	         			    	 return  '<a class="btnPrice" href="javascript:void(0)" onclick="FancingList.fancingEdit(\''+rowIndex+'\')">编辑</a>|'
	         			    	 +'<a class="btnPrice" href="javascript:void(0)" onclick="FancingList.fancingDelete(\''+item.fancingOrderItem.fancingPid+'\')">删除</a>';
		             		  }else{
		             			  return '';
		             		  }
		             	  }}
			         ];
			newing_mmg =  $("#new_mmg").mmGrid({
         		height : getAutoHeightByMmGrid($("#xascfMainPanel")),
         		cols : newing_cols,
         		url : 'xascf/fancing/page.shtml?type=NEWING',
         		params : $("#fancingListQueryForm").serialize(),
         		method : 'post',
         		autoLoad : true,
         		indexCol : true,
         		indexColWidth : 15,
         		showBackboard:false,
         		sortName : 'id',
         		sortStatus : 'desc',
         		fullWidthRows : true,
         		cache : false,
         		multiSelect: true,
         		plugins : [$('#new_pg').mmPaginator({})]
         	});
            mmGridResizeListener(newing_mmg, $(".page-content"));
		},
		waitCheckGrid:function(){
			if (null != waitCheck_mmg) {
				return;
			}
			var ch_cols = [
			               { title:'融资单号', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
			            	   renderer: function(val){
			            		   return '<a class="btnPrice" href="javascript:void(0)" onclick="fancingDetail(\''+val.fancingOrderNo+'\')">'+val.fancingOrderNo+'</a>';
			            		   }
			               },
			               { title:'申请人类型', name:'fancingOrderItem' ,width:80, align:'center', sortable: true, type: 'object',
			               	renderer: function(val){
			               		var val=val.fancingRequestType;
			               		if(val=='1')
			               			val='企业会员';
			               			else 
			               				val='个人会员';
			               		return val}},  	      
			               { title:'融资会员', name:'fancingOrderItem' ,width:150, align:'center', sortable: true, type: 'object',
			                   renderer: function(val){return val.requestName}},
			                  
			               { title:'融资种类', name:'fancingOrderItem' ,width:80, align:'center', sortable: true, type: 'object',
			                   renderer: function(val){
			                   	var val=val.fancingType;
			                   	if(val=='1')
			                   		val='运单融资';
			                   	else if(val=='2')
			                   		val='应收账款融资';
			                   	else if(val=='3')
			                   		val='抵押融资';
			                   	else if(val=='4')
			                   		val='提单融资';
			                   	return val}},
			              
			                   	{ title:'融资方式', name:'fancingOrderItem' ,width:100, align:'center', sortable: true, type: 'object',
			                		renderer: function(val){
			                			var val=val.fancingFunction;
			                        	if(val=='1')
			                        		val='非买断式融资';
			                        	else if(val=='2')
			                        		val='买断式融资';
			                			return val}},
			                	{ title:'融资类别', name:'fancingOrderItem' ,width:100, align:'center', sortable: true, type: 'object',
			                		renderer: function(val){
			                			var val=val.fancingKinds;
			                        	if(val=='1')
			                        		val='一次性融资';
			                        	else if(val=='2')
			                        		val='持续性融资';
			                			return val}},
            			   { title:'申请时间', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
            				   renderer: function(val){return val.fancingRequestDateStr}},
        				   { title:'申请金额(元)', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
        					   renderer: function(val){return formatMoney(val.fancingRequestPrice)}},
    					   { title:'预放款时间', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
    						   renderer: function(val){return val.fancingEstimateDateStr}}
			            					   ];
			waitCheck_mmg =  $("#waitCheck_mmg").mmGrid({
				height : getAutoHeightByMmGrid($("#xascfMainPanel")),
				cols : ch_cols,
				url : 'xascf/fancing/page.shtml?type=WAITCHECK',
				params : $("#fancingListQueryForm").serialize(),
				method : 'post',
				autoLoad : true,
				indexCol : true,
				indexColWidth : 15,
				showBackboard:false,
				sortName : 'id',
				sortStatus : 'desc',
				fullWidthRows : true,
				cache : false,
				multiSelect: true,
				plugins : [$('#waitCheck_pg').mmPaginator({})]
			});
			mmGridResizeListener(waitCheck_mmg, $(".page-content"));
		},
		checkingGrid :function (){
			if (null != checking_mmg) {
				return;
			}
			var pg_cols = [
			             { title:'融资单号', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
			             	renderer: function(val){
			             		return '<a class="btnPrice" href="javascript:void(0)" onclick="fancingDetail(\''+val.fancingOrderNo+'\')">'+val.fancingOrderNo+'</a>';
			             		}
			             },
			             { title:'申请人类型', name:'fancingOrderItem' ,width:80, align:'center', sortable: true, type: 'object',
			             	renderer: function(val){
			             		var val=val.fancingRequestType;
			             		if(val=='1')
			             			val='企业会员';
			             			else 
			             				val='个人会员';
			             		return val}},  	      
			             { title:'融资会员', name:'fancingOrderItem' ,width:150, align:'center', sortable: true, type: 'object',
			                 renderer: function(val){return val.requestName}},
			                
			             { title:'融资种类', name:'fancingOrderItem' ,width:80, align:'center', sortable: true, type: 'object',
			                 renderer: function(val){
			                 	var val=val.fancingType;
			                 	if(val=='1')
			                 		val='运单融资';
			                 	else if(val=='2')
			                 		val='应收账款融资';
			                 	else if(val=='3')
			                 		val='抵押融资';
			                 	else if(val=='4')
			                 		val='提单融资';
			                 	return val}},
			            
	                 	{ title:'融资方式', name:'fancingOrderItem' ,width:100, align:'center', sortable: true, type: 'object',
	                		renderer: function(val){
	                			var val=val.fancingFunction;
	                        	if(val=='1')
	                        		val='非买断式融资';
	                        	else if(val=='2')
	                        		val='买断式融资';
	                			return val}},
	                	{ title:'融资类别', name:'fancingOrderItem' ,width:100, align:'center', sortable: true, type: 'object',
	                		renderer: function(val){
	                			var val=val.fancingKinds;
	                        	if(val=='1')
	                        		val='一次性融资';
	                        	else if(val=='2')
	                        		val='持续性融资';
	                			return val}},
			             { title:'申请时间', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
			                 renderer: function(val){return val.fancingRequestDateStr}},
			             { title:'申请金额(元)', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
			                 renderer: function(val){return formatMoney(val.fancingRequestPrice)}}
			         ];
			checking_mmg =  $("#checking_mmg").mmGrid({
	        	height : getAutoHeightByMmGrid($("#xascfMainPanel")),
	        	cols : pg_cols,
	        	url : 'xascf/fancing/page.shtml?type=PGING',
	        	params : $("#fancingListQueryForm").serialize(),
	        	method : 'post',
	        	showBackboard:false,
	        	autoLoad : true,
	        	indexCol : true,
	        	indexColWidth : 15,
	        	sortName : 'id',
	        	sortStatus : 'desc',
	        	fullWidthRows : true,
	        	cache : false,
	        	multiSelect: true,
	        	plugins : [$('#checking_pg').mmPaginator({})]
	        });
	        mmGridResizeListener(checking_mmg, $(".page-content"));
		},
		rebackdGrid :function (){
			if (null != rabacked_mmg) {
				return;
			}
			var rb_cols = [
				             { title:'融资单号', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
				             	renderer: function(val){
				             		return '<a class="btnPrice" href="javascript:void(0)" onclick="fancingDetail(\''+val.fancingOrderNo+'\')">'+val.fancingOrderNo+'</a>';
				             		}
				             },
				             { title:'申请人类型', name:'fancingOrderItem' ,width:80, align:'center', sortable: true, type: 'object',
				             	renderer: function(val){
				             		var val=val.fancingRequestType;
				             		if(val=='1')
				             			val='企业会员';
				             			else 
				             				val='个人会员';
				             		return val}},  	      
				             { title:'融资会员', name:'fancingOrderItem' ,width:150, align:'center', sortable: true, type: 'object',
				                 renderer: function(val){return val.requestName}},
				                
				             { title:'融资种类', name:'fancingOrderItem' ,width:80, align:'center', sortable: true, type: 'object',
				                 renderer: function(val){
				                 	var val=val.fancingType;
				                 	if(val=='1')
				                 		val='运单融资';
				                 	else if(val=='2')
				                 		val='应收账款融资';
				                 	else if(val=='3')
				                 		val='抵押融资';
				                 	else if(val=='4')
				                 		val='提单融资';
				                 	return val}},
				            
		                 	{ title:'融资方式', name:'fancingOrderItem' ,width:100, align:'center', sortable: true, type: 'object',
		                		renderer: function(val){
		                			var val=val.fancingFunction;
		                        	if(val=='1')
		                        		val='非买断式融资';
		                        	else if(val=='2')
		                        		val='买断式融资';
		                			return val}},
		                	{ title:'融资类别', name:'fancingOrderItem' ,width:100, align:'center', sortable: true, type: 'object',
		                		renderer: function(val){
		                			var val=val.fancingKinds;
		                        	if(val=='1')
		                        		val='一次性融资';
		                        	else if(val=='2')
		                        		val='持续性融资';
		                			return val}},
				             { title:'申请时间', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
				                 renderer: function(val){return val.fancingRequestDateStr}},
				             { title:'申请金额(元)', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
				                 renderer: function(val){return formatMoney(val.fancingRequestPrice)}},
			                 { title:'退回原因', name:'fancingOrderItem' ,width:180, align:'center', sortable: true, type: 'object',
			                	 renderer: function(val){return val.fancingRebackRemark}},
		                	 { title:'操作', name:'' ,width:140, align:'center', sortable: true, type: 'String',
				             	  renderer: function(val,item,rowIndex){
			         			    	 return  '<a class="btnPrice" href="javascript:void(0)" onclick="FancingList.fancingEdit(\''+rowIndex+'\')">编辑</a>'
				             	  }}
				         ];
			rabacked_mmg =  $("#rabacked_mmg").mmGrid({
				height : getAutoHeightByMmGrid($("#xascfMainPanel")),
				cols : rb_cols,
				url : 'xascf/fancing/page.shtml?type=BACK',
				params : $("#fancingListQueryForm").serialize(),
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
				plugins : [$('#rabacked_pg').mmPaginator({})]
			});
			mmGridResizeListener(rabacked_mmg, $(".page-content"));
		},
		payedGrid :function (){
			if (null != payed_mmg) {
				return;
			}
			var payed_cols = [
			             { title:'融资单号', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
			             	renderer: function(val){
			             		return '<a class="btnPrice" href="javascript:void(0)" onclick="fancingDetail(\''+val.fancingOrderNo+'\')">'+val.fancingOrderNo+'</a>';
			             		}
			             },
			             { title:'申请人类型', name:'fancingOrderItem' ,width:80, align:'center', sortable: true, type: 'object',
			             	renderer: function(val){
			             		var val=val.fancingRequestType;
			             		if(val=='1')
			             			val='企业会员';
			             			else 
			             				val='个人会员';
			             		return val}},  	      
			             { title:'融资会员', name:'fancingOrderItem' ,width:150, align:'center', sortable: true, type: 'object',
			                 renderer: function(val){return val.requestName}},
			                
			             { title:'融资种类', name:'fancingOrderItem' ,width:80, align:'center', sortable: true, type: 'object',
			                 renderer: function(val){
			                 	var val=val.fancingType;
			                 	if(val=='1')
			                 		val='运单融资';
			                 	else if(val=='2')
			                 		val='应收账款融资';
			                 	else if(val=='3')
			                 		val='抵押融资';
			                 	else if(val=='4')
			                 		val='提单融资';
			                 	return val}},
			            
	                 	{ title:'融资方式', name:'fancingOrderItem' ,width:100, align:'center', sortable: true, type: 'object',
	                		renderer: function(val){
	                			var val=val.fancingFunction;
	                        	if(val=='1')
	                        		val='非买断式融资';
	                        	else if(val=='2')
	                        		val='买断式融资';
	                			return val}},
	                	{ title:'融资类别', name:'fancingOrderItem' ,width:100, align:'center', sortable: true, type: 'object',
	                		renderer: function(val){
	                			var val=val.fancingKinds;
	                        	if(val=='1')
	                        		val='一次性融资';
	                        	else if(val=='2')
	                        		val='持续性融资';
	                			return val}},
			             { title:'申请时间', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
			                 renderer: function(val){return val.fancingRequestDateStr}},
			             { title:'申请金额(元)', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
			                 renderer: function(val){return formatMoney(val.fancingRequestPrice)}},
			             { title:'批复金额(元)', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
			                 renderer: function(val){return formatMoney(val.fancingReplyPrice)}},
			             { title:'融资账期', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
			                 renderer: function(val){
			                 	if(val.fancingDate!=null && val.fancingDateType)
			                 		return val.fancingDate+''+val.fancingDateType;
			                 	else
			                 		return '';
			                 	}},
			             { title:'账期利率(%)', name:'fancingRateItem' ,width:120, align:'center', sortable: true, type: 'object',
			                 renderer: function(val){
			                	 if(val.fancingRate!=null && val.fancingRate!='undefined')
			                	 return val.fancingRate+"%"}},
		             	{ title:'到账日期', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
		            		renderer: function(val){return val.fancingRebackDate}},
			             { title:'还款方式', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
			                 renderer: function(val){return val.fancingRebackType}},    
			             { title:'逾期利率(%)', name:'fancingRateItem' ,width:120, align:'center', sortable: true, type: 'object',
			                 renderer: function(val){
			                	 if(val.overdueRate!=null && val.overdueRate!='undefined')
			                 		return val.overdueRate+"%"}},
			             { title:'逾期计息方式', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
			                renderer: function(val){
			             	   if(val!=null)
			             		   return val.fancingOverdueType;
			             	   else
			             		   return null;
			                }
			                 }
			         ];
			payed_mmg =  $("#payed_mmg").mmGrid({
				height : getAutoHeightByMmGrid($("#xascfMainPanel")),
				cols : payed_cols,
				url : 'xascf/fancing/page.shtml?type=PAYED',
				params : $("#fancingListQueryForm").serialize(),
				method : 'post',
				autoLoad : true,
				indexCol : true,
				showBackboard:false,
				indexColWidth : 15,
				sortName : 'id',
				sortStatus : 'desc',
				fullWidthRows : true,
				cache : false,
				multiSelect: true,
				plugins : [$('#payed_pg').mmPaginator({})]
			});
			mmGridResizeListener(payed_mmg, $(".page-content"));
		},
		passCheckGrid :function (){
			if (null != passCheck_mmg) {
				return;
			}
			var passCk_cols = [
					             { title:'融资单号', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
					             	renderer: function(val){
					             		return '<a class="btnPrice" href="javascript:void(0)" onclick="fancingDetail(\''+val.fancingOrderNo+'\')">'+val.fancingOrderNo+'</a>';
					             		}
					             },
					             { title:'申请人类型', name:'fancingOrderItem' ,width:80, align:'center', sortable: true, type: 'object',
					             	renderer: function(val){
					             		var val=val.fancingRequestType;
					             		if(val=='1')
					             			val='企业会员';
					             			else 
					             				val='个人会员';
					             		return val}},  	      
					             { title:'融资会员', name:'fancingOrderItem' ,width:150, align:'center', sortable: true, type: 'object',
					                 renderer: function(val){return val.requestName}},
					             { title:'融资种类', name:'fancingOrderItem' ,width:80, align:'center', sortable: true, type: 'object',
					                 renderer: function(val){
					                 	var val=val.fancingType;
					                 	if(val=='1')
					                 		val='运单融资';
					                 	else if(val=='2')
					                 		val='应收账款融资';
					                 	else if(val=='3')
					                 		val='抵押融资';
					                 	else if(val=='4')
					                 		val='提单融资';
					                 	return val}},
			                 	{ title:'融资方式', name:'fancingOrderItem' ,width:100, align:'center', sortable: true, type: 'object',
			                		renderer: function(val){
			                			var val=val.fancingFunction;
			                        	if(val=='1')
			                        		val='非买断式融资';
			                        	else if(val=='2')
			                        		val='买断式融资';
			                			return val}},
			                	{ title:'融资类别', name:'fancingOrderItem' ,width:100, align:'center', sortable: true, type: 'object',
			                		renderer: function(val){
			                			var val=val.fancingKinds;
			                        	if(val=='1')
			                        		val='一次性融资';
			                        	else if(val=='2')
			                        		val='持续性融资';
			                			return val}},
					             { title:'申请时间', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
					                 renderer: function(val){return val.fancingRequestDateStr}},
					             { title:'申请金额(元)', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
					                 renderer: function(val){return formatMoney(val.fancingRequestPrice)}},
					             { title:'批复金额(元)', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
					                 renderer: function(val){return formatMoney(val.fancingReplyPrice)}},
					             { title:'融资账期', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
					                 renderer: function(val){
					                 	if(val.fancingDate!=null && val.fancingDateType)
					                 		return val.fancingDate+''+val.fancingDateType;
					                 	else
					                 		return '';
					                 	}},
					             { title:'账期利率(%)', name:'fancingRateItem' ,width:120, align:'center', sortable: true, type: 'object',
					                 renderer: function(val){
					                	 if(val.fancingRate!=null && val.fancingRate!='undefined')
					                		 return val.fancingRate+"%"}},
				             	{ title:'到账日期', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
				            		renderer: function(val){return val.fancingRebackDate}},	
					             { title:'还款方式', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
					                 renderer: function(val){return val.fancingRebackType}},    
					             { title:'逾期利率(%)', name:'fancingRateItem' ,width:120, align:'center', sortable: true, type: 'object',
					                 renderer: function(val){
					                	 if(val.overdueRate!=null && val.overdueRate!='undefined')
					                 		return val.overdueRate+"%"
					                	}},
					             { title:'逾期计息方式', name:'fancingOrderItem' ,width:120, align:'center', sortable: true, type: 'object',
					                renderer: function(val){
					             	   if(val!=null)
					             		   return val.fancingOverdueType;
					             	   else
					             		   return null;
					                }
					                 }
					         ];
			passCheck_mmg =  $("#passCheck_mmg").mmGrid({
				height : getAutoHeightByMmGrid($("#xascfMainPanel")),
				cols : passCk_cols,
				url : 'xascf/fancing/page.shtml?type=WAITPAY',
				params : $("#fancingListQueryForm").serialize(),
				method : 'post',
				autoLoad : true,
				indexCol : true,
				showBackboard:false,
				indexColWidth : 15,
				sortName : 'id',
				sortStatus : 'desc',
				fullWidthRows : true,
				cache : false,
				multiSelect: true,
				plugins : [$('#passCheck_pg').mmPaginator({})]
			});
			mmGridResizeListener(passCheck_mmg, $(".page-content"));
		},
		
		/**查询*/
		query : function() {
			if($("#allboundTab").hasClass('active')){
				all_mmg.load($("#fancingListQueryForm").serialize());
			}else if($("#newingTab").hasClass('active')){
				newing_mmg.load($("#fancingListQueryForm").serialize());
			}else if($("#waitCheckTab").hasClass('active')){
				waitCheck_mmg.load($("#fancingListQueryForm").serialize());
			}else if($("#checkingTab").hasClass('active')){
				checking_mmg.load($("#fancingListQueryForm").serialize());
			}else if($("#passCheckTab").hasClass('active')){
				passCheck_mmg.load($("#fancingListQueryForm").serialize());
			}else if($("#payedTab").hasClass('active')){
				payed_mmg.load($("#fancingListQueryForm").serialize());
			}else if($("#rabackedTab").hasClass('active')){
				rabacked_mmg.load($("#fancingListQueryForm").serialize());
			}
		},
		/**
		 * 编辑
		 */
		fancingEdit :function (rowIndex){
		var item=newing_mmg.row(rowIndex);
		var type=item.fancingOrderItem.fancingType;
		var requestType=item.fancingOrderItem.fancingRequestType;
		var orderNo=item.fancingOrderItem.fancingOrderNo;
			$.post("xascf/fancing/toEdit.shtml",{orderNo:orderNo,type:type,requestType:requestType},function(data){  
				$("#xascfMainPanel").empty();
				$("#xascfMainPanel").append(data);
				$("#fancingBankType").val(item.fancingOrderItem.fancingBankType).trigger("liszt:updated");
				$("#fancingFunction").val(item.fancingOrderItem.fancingFunction).trigger("liszt:updated");
				$("#fancingKinds").val(item.fancingOrderItem.fancingKinds).trigger("liszt:updated");
				
			});
		},
//		/**
//		 * 详情
//		 */
//		fancingDetail :function (val){
//			$.post("xascf/fancing/toDetail.shtml",{orderNo:val},function(data){  
//				$("#xascfMainPanel").empty();
//				$("#xascfMainPanel").append(data);
//			});
//		},
		/**
		 * 删除
		 */
		fancingDelete : function(val){
			PUI.MessageBox.show({
				title: "删除融资交易单信息",
				content: "你确定要删除融资交易单信息吗？",
				type: "alert",
				buttons: [{ value: "是" },{ value: "否" }],
				success: function (result) {
					if (result == "是") {
						$.post("xascf/fancing/deleteFancing.shtml",{fancingPid:val},function(data){  
							if(data.indexOf('成功')>=0){
								PUI.MessageBox.info(data);
								newing_mmg.load($("#fancingListQueryForm").serialize());
								all_mmg.load($("#fancingListQueryForm").serialize());
							}else{
								PUI.MessageBox.info(data);
							}
							
						});
					}
				}
			});
			
		},
		
		/**清空**/
		clear : function(){
			PUI.util.resetForm($("#fancingListQueryForm"));
		}
	};
}();