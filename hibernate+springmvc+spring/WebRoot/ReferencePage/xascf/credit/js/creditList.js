$(document).ready(function(){
	PUI.plugin.init({}, $("#creditQueryForm"));
	sns.valid.init($("#creditQueryForm"));
	
	//初始化mmgridTab
	$('#newTabBt').on('shown', function (e) {
		CreditList.newTabGrid();	
	});
	$('#mdTabBt').on('shown', function (e) {
		CreditList.mdTabGrid();		 		
	});
	$('#scoreTabBt').on('shown', function (e) {
		CreditList.scoreTabGrid();		 		
	});
	$('#setTabBt').on('shown', function (e) {
		CreditList.setTabGrid();	
	});
	$('#reviewTabBt').on('shown', function (e) {
		CreditList.reviewTabGrid();		 		
	});
	$('#throughTabBt').on('shown', function (e) {
		CreditList.throughTabGrid();	
	});
	$('#backTabBt').on('shown', function (e) {
		CreditList.backTabGrid();	
	});
	$('#cancelTabBt').on('shown', function (e) {
		CreditList.cancelTabGrid();		 		
	});
});	
	
var cols_all = new Array(
	    { title:'授信编号', name:'creditNo' ,width:110, align:'center', sortable: true, type: 'string',
		     renderer: function(val,item,rowIndex){return '<span style=""><a href="#" onclick="CreditDetailPop.creditDetail(\''+item.creditNo+'\')">'
  	  +val+'</a></span>';}},
	    
	    { title:'状态', name:'status' ,width:50, align:'center', sortable: true, type: 'string'},
	    { title:'操作', name:'memberNo' ,width:70, align:'center', sortable: true, type: 'string',
	  		  renderer: function(val,item,rowIndex){
	  			  if(item.status=='新建'||item.status=='退回'){
	  				return '<span style=""><a href="#" onclick="CreditList.edit(\''+item.creditNo+'\')">编辑</a>     <a href="#" onclick="CreditList.deleteCredit(\''+item.creditNo+'\')">删除</a></span>';
	  			  }else if(item.status=='作废'){
	  				return '<a href="#" onclick="CreditList.deleteCredit(\''+item.creditNo+'\')">删除</a></span>';
	  			  }
	  			  
	  		  }
		    },
		    { title:'会员名称',name:'memberName', width: 280, align: 'left',lockWidth:true,sortable: true, type: 'string',
		  		renderer: function(val,item,rowIndex){return '<span style=""><a href="#" onclick="customerDetailPop.customerDetail(\''+item.memberPid+'\')">'
			    	  +val+'</a></span>'}},
			    { title:'申请额度', name:'creditQuota' ,width:100, align:'center', sortable: true, type: 'string',
			    	        renderer: function(val){return formatMoney(val)+" 元"}},
        { title:'批复额度', name:'resultQuto' ,width:100, align:'center', sortable: true, type: 'string',
			    	        	 renderer: function(val,item,rowIndex){
        		if(val==null || val==''){
        			return "";
        		}else
  			  	 return  formatMoney(val)+' 元';}},
	    {title: '产品类别', name:'financingTypeCn', width: 70, align:'center', sortable: true, type: 'string'}, 
	    { title:'保理类别', name:'financingMethodCn' ,width: 90, align:'center', sortable: true, type: 'string'},
//		{ title:'保理方式', name:'financingNature' ,width:150, align:'center', sortable: true, type: 'string',
//	    	renderer: function(val){
//				 if(val=='1')
//					 val='一次性融资';
//				 else if(val=='2')
//					 val='持续性融资'; 
//				 return val;
//				}},
//	    { title:'账期利率', name:'termRate' ,width:150, align:'center', sortable: true, type: 'string'},
//	    { title:'逾期利率倍数', name:'overdueTimes' ,width:150, align:'center', sortable: true, type: 'string'},
//	    { title:'授信总得分',name:'score', width: 120, align: 'center',lockWidth:true,sortable: true, type: 'object'},
//	    { title:'会员编号', name:'memberNo' ,width:150, align:'center', sortable: true, type: 'string'},
//	    { title:'会员类型', name:'memberType' ,width:130, align:'center', sortable: true, type: 'string',
//	    	renderer: function(val){
//	    		 if(val=='1')
//	    			 val='企业会员';
//	    		 else if(val=='2')
//					 val='个人会员';
//	    		 return val;}},
	    { title:'开始日期', name:'effectiveStartTime', width:70, align:'center', sortable: true, type: 'string'},
	    { title:'结束日期', name:'effectiveEndTime', width:70, align:'center', sortable: true, type: 'string'}
	    
		
	);

var mmg_all =  $("#mmg-all").mmGrid({
	height:  getAutoHeightByMmGrid($("#xascfMainPanel")),
	cols: cols_all,
	url: 'xascf/creditApply/page.shtml?type=MYLIST',
	params: $("#creditQueryForm").serialize(),
	method: 'post',
	checkCol: false,
	indexCol : true,
	showBackboard:false,
	autoLoad: true,
	fullWidthRows: true,
	indexColWidth: 15, 
	cache: false,
	multiSelect: true,
	nowrap: true,
	plugins: [$('#pg-all').mmPaginator({})] 
});
var mmg_new=null;
var mmg_md=null;
var mmg_score=null;
var mmg_set=null;
var mmg_review=null;
var mmg_through=null;
var mmg_back=null;
var mmg_cancel=null;

var CreditList = function() {
 
	return {
		menberDetail:function(){
			
			
		},
			
		
		/**查询*/
		load : function() {
			if($("#allTab").hasClass('active')){
				mmg_all.load($("#creditQueryForm").serialize());
			}else if($("#newTab").hasClass('active')){
				mmg_new.load($("#creditQueryForm").serialize());
			}else if($("#mdTab").hasClass('active')){
				mmg_md.load($("#creditQueryForm").serialize());
			}else if($("#scoreTab").hasClass('active')){
				mmg_score.load($("#creditQueryForm").serialize());
			}else if($("#setTab").hasClass('active')){
				mmg_set.load($("#creditQueryForm").serialize());
			}else if($("#reviewTab").hasClass('active')){
				mmg_review.load($("#creditQueryForm").serialize());
			}else if($("#throughTab").hasClass('active')){
				mmg_through.load($("#creditQueryForm").serialize());
			}else if($("#backTab").hasClass('active')){
				mmg_back.load($("#creditQueryForm").serialize());
			}else if($("#cancelTab").hasClass('active')){
				mmg_cancel.load($("#creditQueryForm").serialize());
			}
		},

		/**查看*/
		detail: function() {
			PUI.MessageBox.alert("此功能稍后增加！");
		},
		/**修改*/
		edit: function(creditNo) {
			$.post("xascf/creditApply/forwardToEdit.shtml",{"creditNo":creditNo}, function(data) {  
				$("#xascfMainPanel").html(data);  
			}); 
		},
		
		/**删除*/
		deleteCredit: function(creditNo) {
			PUI.MessageBox.show({
			    title: "删除授信信息",
			    content: "是否删除该授信申请信息？",
			    type: "confirm",
			    buttons: [{ value: "是" },{ value: "否" }],
			    success: function (result) {
			        if (result == "是") {
			        	$.post("xascf/creditApply/deleteCredit.shtml",{"creditNo":creditNo}, function(data) {  
							PUI.MessageBox.info(data);  
							mmg_all.load($("#creditQueryForm").serialize());
						});
			        }
			    }
			});
			
			
			
		},
		
		/**清空**/
		clear: function(){
			PUI.util.resetForm($("form"));
		},
		newTabGrid:function(){
			if(null!=mmg_new){
				return;
			}
			var cols_new = new Array(
				    { title:'授信编号', name:'creditNo' ,width:140, align:'center', sortable: true, type: 'string',
				      renderer: function(val,item,rowIndex){return '<span style=""><a href="#" onclick="CreditList.detail(\''+item.creditNo+'\')">'
				    	  +val+'</a></span>';}},
			    	{ title:'会员名称',name:'memberName', width: 120, align: 'center',lockWidth:true,sortable: true, type: 'object'}, 
				    { title:'申请授信额度', name:'creditQuota' ,width:150, align:'center', sortable: true, type: 'string'},
				    { title:'操作', name:'memberNo' ,width:150, align:'center', sortable: true, type: 'string',
				    		  renderer: function(val,item,rowIndex){return '<span style=""><a href="#" onclick="CreditList.edit(\''+item.creditNo+'\')">编辑</a>     <a href="#" onclick="CreditList.deleteCredit(\''+item.creditNo+'\')">删除</a></span>';}},
	    		    {title: '产品类别', name:'financingType', width: 90, align:'center', sortable: true, type: 'string', 
						renderer: function(val){
							 if(val=='1')
								 val='运费保理';
							 else if(val=='2')
								 val='提单保理'; 
							 return val;
							}}, 
				    { title:'保理类别', name:'financingMethod' ,width: 90, align:'center', sortable: true, type: 'string',
								renderer: function(val){
									 if(val=='1')
										 val='非买断式融资';
									 else if(val=='2')
										 val='买断式融资'; 
									 return val;
									}},
//					{ title:'保理方式', name:'financingNature' ,width:150, align:'center', sortable: true, type: 'string',
//				    	renderer: function(val){
//							 if(val=='1')
//								 val='一次性融资';
//							 else if(val=='2')
//								 val='持续性融资'; 
//							 return val;
//							}},
//	    		    { title:'会员编号', name:'memberNo' ,width:150, align:'center', sortable: true, type: 'string'},
//				    { title:'会员类型', name:'memberType' ,width:130, align:'center', sortable: true, type: 'string',
//				    	renderer: function(val){
//				    		 if(val=='1')
//				    			 val='企业会员';
//				    		 else if(val=='2')
//								 val='个人会员';
//				    		 return val;}},
				    { title:'开始日期', name:'effectiveStartTime', width:120, align:'center', sortable: true, type: 'string'},
				    { title:'结束日期', name:'effectiveEndTime', width:120, align:'center', sortable: true, type: 'string'} 
					
				);
			 mmg_new =  $("#mmg-new").mmGrid({
				height: getAutoHeightByMmGrid($("#xascfMainPanel")),
				width: "auto",
				cols: cols_new,
				url: 'xascf/creditApply/page.shtml?type=newmodel&role=BUSINESS',
				params: $("#creditQueryForm").serialize(),
				method: 'post',
				checkCol: true,
				autoLoad: true,
				fullWidthRows: true,
				indexColWidth: 15, 
				cache: false,
				multiSelect: true,
				nowrap: true,
				plugins: [$('#pg-new').mmPaginator({})] 
			});
		},
		mdTabGrid:function(){
			if(null!=mmg_md){
				return;
			}
			var cols_md = new Array(
				    { title:'授信编号', name:'creditNo' ,width:140, align:'center', sortable: true, type: 'string',
					      renderer: function(val,item,rowIndex){return '<span style=""><a href="#" onclick="CreditList.detail(\''+item.creditNo+'\')">'
					    	  +val+'</a></span>';}},
					{ title:'会员名称',name:'memberName', width: 120, align: 'center',lockWidth:true,sortable: true, type: 'object'}, 
				    { title:'申请授信额度', name:'creditQuota' ,width:150, align:'center', sortable: true, type: 'string'},
				    {title: '产品类别', name:'financingType', width: 90, align:'center', sortable: true, type: 'string', 
						renderer: function(val){
							 if(val=='1')
								 val='运费保理';
							 else if(val=='2')
								 val='提单保理'; 
							 return val;
							}}, 
				    { title:'保理类别', name:'financingMethod' ,width: 90, align:'center', sortable: true, type: 'string',
								renderer: function(val){
									 if(val=='1')
										 val='非买断式融资';
									 else if(val=='2')
										 val='买断式融资'; 
									 return val;
									}},
//					{ title:'保理方式', name:'financingNature' ,width:150, align:'center', sortable: true, type: 'string',
//				    	renderer: function(val){
//							 if(val=='1')
//								 val='一次性融资';
//							 else if(val=='2')
//								 val='持续性融资'; 
//							 return val;
//							}},
//				    { title:'会员编号', name:'memberNo' ,width:150, align:'center', sortable: true, type: 'string'},
//				    { title:'会员类型', name:'memberType' ,width:130, align:'center', sortable: true, type: 'string',
//				    	renderer: function(val){
//				    		 if(val=='1')
//				    			 val='企业会员';
//				    		 else if(val=='2')
//								 val='个人会员';
//				    		 return val;}},
				    { title:'开始日期', name:'effectiveStartTime', width:120, align:'center', sortable: true, type: 'string'},
				    { title:'结束日期', name:'effectiveEndTime', width:120, align:'center', sortable: true, type: 'string'} 
					
				);
				
			 mmg_md =  $("#mmg-md").mmGrid({
					height: getAutoHeightByMmGrid($("#xascfMainPanel")),
					cols: cols_md,
					url: 'xascf/creditApply/page.shtml?type=md&role=BUSINESS',
					params: $("#creditQueryForm").serialize(),
					method: 'post',
					checkCol: true,
					autoLoad: true,
					fullWidthRows: true,
					indexColWidth: 15, 
					cache: false,
					multiSelect: true,
					nowrap: true,
					plugins: [$('#pg-md').mmPaginator({})] 
				});

		},
		scoreTabGrid:function(){
			if(mmg_score!=null){
				return;
			}
			var cols_score = new Array(
				    { title:'授信编号', name:'creditNo' ,width:140, align:'center', sortable: true, type: 'string',
					      renderer: function(val,item,rowIndex){return '<span style=""><a href="#" onclick="CreditList.detail(\''+item.creditNo+'\')">'
					    	  +val+'</a></span>';}},
		    	    { title:'会员名称',name:'memberName', width: 120, align: 'center',lockWidth:true,sortable: true, type: 'object'},
		    	    { title:'申请授信额度', name:'creditQuota' ,width:150, align:'center', sortable: true, type: 'string'},
				    {title: '产品类别', name:'financingType', width: 90, align:'center', sortable: true, type: 'string', 
						renderer: function(val){
							 if(val=='1')
								 val='运费保理';
							 else if(val=='2')
								 val='提单保理'; 
							 return val;
							}}, 
				    { title:'保理类别', name:'financingMethod' ,width: 90, align:'center', sortable: true, type: 'string',
								renderer: function(val){
									 if(val=='1')
										 val='非买断式融资';
									 else if(val=='2')
										 val='买断式融资'; 
									 return val;
									}},
//					{ title:'保理方式', name:'financingNature' ,width:150, align:'center', sortable: true, type: 'string',
//				    	renderer: function(val){
//							 if(val=='1')
//								 val='一次性融资';
//							 else if(val=='2')
//								 val='持续性融资'; 
//							 return val;
//							}},
//				    
//				    { title:'会员编号', name:'memberNo' ,width:150, align:'center', sortable: true, type: 'string'},
//				    { title:'会员类型', name:'memberType' ,width:130, align:'center', sortable: true, type: 'string',
//				    	renderer: function(val){
//				    		 if(val=='1')
//				    			 val='企业会员';
//				    		 else if(val=='2')
//								 val='个人会员';
//				    		 return val;}},
				    { title:'开始日期', name:'effectiveStartTime', width:120, align:'center', sortable: true, type: 'string'},
				    { title:'结束日期', name:'effectiveEndTime', width:120, align:'center', sortable: true, type: 'string'} 
					
				);
				
			 mmg_score =  $("#mmg-score").mmGrid({
					height: getAutoHeightByMmGrid($("#xascfMainPanel")),
					cols: cols_score,
					url: 'xascf/creditApply/page.shtml?type=score&role=BUSINESS',
					params: $("#creditQueryForm").serialize(),
					method: 'post',
					checkCol: true,
					autoLoad: true,
					fullWidthRows: true,
					indexColWidth: 15, 
					cache: false,
					multiSelect: true,
					nowrap: true,
					plugins: [$('#pg-score').mmPaginator({})] 
				});
		},
		setTabGrid:function(){
			if(mmg_set!=null){
				return;
			}
			var cols_set = new Array(
				    { title:'授信编号', name:'creditNo' ,width:140, align:'center', sortable: true, type: 'string',
					      renderer: function(val,item,rowIndex){return '<span style=""><a href="#" onclick="CreditList.detail(\''+item.creditNo+'\')">'
					    	  +val+'</a></span>';}},
					{ title:'会员名称',name:'memberName', width: 120, align: 'center',lockWidth:true,sortable: true, type: 'object'}, 
					{ title:'申请授信额度', name:'creditQuota' ,width:150, align:'center', sortable: true, type: 'string'},
					{title: '产品类别', name:'financingType', width: 90, align:'center', sortable: true, type: 'string', 
						renderer: function(val){
							 if(val=='1')
								 val='运费保理';
							 else if(val=='2')
								 val='提单保理'; 
							 return val;
							}}, 
				    { title:'保理类别', name:'financingMethod' ,width: 90, align:'center', sortable: true, type: 'string',
								renderer: function(val){
									 if(val=='1')
										 val='非买断式融资';
									 else if(val=='2')
										 val='买断式融资'; 
									 return val;
									}},
//					{ title:'保理方式', name:'financingNature' ,width:150, align:'center', sortable: true, type: 'string',
//				    	renderer: function(val){
//							 if(val=='1')
//								 val='一次性融资';
//							 else if(val=='2')
//								 val='持续性融资'; 
//							 return val;
//							}},
				    { title:'授信总得分',name:'score', width: 120, align: 'center',lockWidth:true,sortable: true, type: 'object'},
//					{ title:'会员编号', name:'memberNo' ,width:150, align:'center', sortable: true, type: 'string'},
//				    { title:'会员类型', name:'memberType' ,width:130, align:'center', sortable: true, type: 'string',
//				    	renderer: function(val){
//				    		 if(val=='1')
//				    			 val='企业会员';
//				    		 else if(val=='2')
//								 val='个人会员';
//				    		 return val;}},
				    { title:'开始日期', name:'effectiveStartTime', width:120, align:'center', sortable: true, type: 'string'},
				    { title:'结束日期', name:'effectiveEndTime', width:120, align:'center', sortable: true, type: 'string'} 
					
				);
				
			 mmg_set =  $("#mmg-set").mmGrid({
					height: getAutoHeightByMmGrid($("#xascfMainPanel")),
					cols: cols_set,
					url: 'xascf/creditApply/page.shtml?type=set&role=BUSINESS',
					params: $("#creditQueryForm").serialize(),
					method: 'post',
					checkCol: true,
					autoLoad: true,
					fullWidthRows: true,
					indexColWidth: 15, 
					cache: false,
					multiSelect: true,
					nowrap: true,
					plugins: [$('#pg-set').mmPaginator({})] 
				});
		},
		reviewTabGrid :function(){
			if(mmg_review!=null){
				return;
			}
			var cols_review = new Array(
				    { title:'授信编号', name:'creditNo' ,width:140, align:'center', sortable: true, type: 'string',
					      renderer: function(val,item,rowIndex){return '<span style=""><a href="#" onclick="CreditList.detail(\''+item.creditNo+'\')">'
					    	  +val+'</a></span>';}},
				    { title:'会员名称',name:'memberName', width: 120, align: 'center',lockWidth:true,sortable: true, type: 'object'}, 
					{ title:'申请授信额度', name:'creditQuota' ,width:150, align:'center', sortable: true, type: 'string'},
					{title: '产品类别', name:'financingType', width: 90, align:'center', sortable: true, type: 'string', 
						renderer: function(val){
							 if(val=='1')
								 val='运费保理';
							 else if(val=='2')
								 val='提单保理'; 
							 return val;
							}}, 
				    { title:'保理类别', name:'financingMethod' ,width: 90, align:'center', sortable: true, type: 'string',
								renderer: function(val){
									 if(val=='1')
										 val='非买断式融资';
									 else if(val=='2')
										 val='买断式融资'; 
									 return val;
									}},
//					{ title:'保理方式', name:'financingNature' ,width:150, align:'center', sortable: true, type: 'string',
//				    	renderer: function(val){
//							 if(val=='1')
//								 val='一次性融资';
//							 else if(val=='2')
//								 val='持续性融资'; 
//							 return val;
//							}},
					{ title:'账期利率', name:'termRate' ,width:150, align:'center', sortable: true, type: 'string'},
				    { title:'逾期利率倍数', name:'overdueTimes' ,width:150, align:'center', sortable: true, type: 'string'},
				    { title:'授信总得分',name:'score', width: 120, align: 'center',lockWidth:true,sortable: true, type: 'object'},
//					{ title:'会员编号', name:'memberNo' ,width:150, align:'center', sortable: true, type: 'string'},
//				    { title:'会员类型', name:'memberType' ,width:130, align:'center', sortable: true, type: 'string',
//				    	renderer: function(val){
//				    		 if(val=='1')
//				    			 val='企业会员';
//				    		 else if(val=='2')
//								 val='个人会员';
//				    		 return val;}},
				    { title:'开始日期', name:'effectiveStartTime', width:120, align:'center', sortable: true, type: 'string'},
				    { title:'结束日期', name:'effectiveEndTime', width:120, align:'center', sortable: true, type: 'string'} 
					
				);
				
			 mmg_review =  $("#mmg-review").mmGrid({
					height: getAutoHeightByMmGrid($("#xascfMainPanel")),
					cols: cols_review,
					url: 'xascf/creditApply/page.shtml?type=review&role=BUSINESS',
					params: $("#creditQueryForm").serialize(),
					method: 'post',
					checkCol: true,
					autoLoad: true,
					fullWidthRows: true,
					indexColWidth: 15, 
					cache: false,
					multiSelect: true,
					nowrap: true,
					plugins: [$('#pg-review').mmPaginator({})] 
				});

		},
		throughTabGrid:function(){
			if(mmg_through!=null){
				return;
			}
			var cols_through = new Array(
				    { title:'授信编号', name:'creditNo' ,width:140, align:'center', sortable: true, type: 'string',
					      renderer: function(val,item,rowIndex){return '<span style=""><a href="#" onclick="CreditList.detail(\''+item.creditNo+'\')">'
					    	  +val+'</a></span>';}},
					{ title:'会员名称',name:'memberName', width: 120, align: 'center',lockWidth:true,sortable: true, type: 'object'}, 
				    { title:'授信额度', name:'creditQuota' ,width:150, align:'center', sortable: true, type: 'string'},
				    {title: '产品类别', name:'financingType', width: 90, align:'center', sortable: true, type: 'string', 
						renderer: function(val){
							 if(val=='1')
								 val='运费保理';
							 else if(val=='2')
								 val='提单保理'; 
							 return val;
							}}, 
				    { title:'保理类别', name:'financingMethod' ,width: 90, align:'center', sortable: true, type: 'string',
								renderer: function(val){
									 if(val=='1')
										 val='非买断式融资';
									 else if(val=='2')
										 val='买断式融资'; 
									 return val;
									}},
//					{ title:'保理方式', name:'financingNature' ,width:150, align:'center', sortable: true, type: 'string',
//				    	renderer: function(val){
//							 if(val=='1')
//								 val='一次性融资';
//							 else if(val=='2')
//								 val='持续性融资'; 
//							 return val;
//							}},
				    { title:'账期利率', name:'termRate' ,width:150, align:'center', sortable: true, type: 'string'},
				    { title:'逾期利率倍数', name:'overdueTimes' ,width:150, align:'center', sortable: true, type: 'string'},
				    { title:'授信总得分',name:'score', width: 120, align: 'center',lockWidth:true,sortable: true, type: 'object'},
//				    { title:'会员编号', name:'memberNo' ,width:150, align:'center', sortable: true, type: 'string'},
//				    { title:'会员类型', name:'memberType' ,width:130, align:'center', sortable: true, type: 'string',
//				    	renderer: function(val){
//				    		 if(val=='1')
//				    			 val='企业会员';
//				    		 else if(val=='2')
//								 val='个人会员';
//				    		 return val;}},
				    { title:'开始日期', name:'effectiveStartTime', width:120, align:'center', sortable: true, type: 'string'},
				    { title:'结束日期', name:'effectiveEndTime', width:120, align:'center', sortable: true, type: 'string'} 
					
				);
			 mmg_through =  $("#mmg-through").mmGrid({
				height: getAutoHeightByMmGrid($("#xascfMainPanel")),
				cols: cols_through,
				url: 'xascf/creditApply/page.shtml?type=through&role=BUSINESS',
				params: $("#creditQueryForm").serialize(),
				method: 'post',
				checkCol: true,
				autoLoad: true,
				fullWidthRows: true,
				indexColWidth: 15, 
				cache: false,
				multiSelect: true,
				nowrap: true,
				plugins: [$('#pg-through').mmPaginator({})] 
			});
				
		},
		backTabGrid   :function(){
			if(mmg_back!=null){
				return;
			}
			var cols_back = new Array(
				    { title:'授信编号', name:'creditNo' ,width:140, align:'center', sortable: true, type: 'string',
					      renderer: function(val,item,rowIndex){return '<span style=""><a href="#" onclick="CreditList.detail(\''+item.creditNo+'\')">'
					    	  +val+'</a></span>';}},
					{ title:'会员名称',name:'memberName', width: 120, align: 'center',lockWidth:true,sortable: true, type: 'object'}, 
				    { title:'申请授信额度', name:'creditQuota' ,width:150, align:'center', sortable: true, type: 'string'},
				    {title: '产品类别', name:'financingType', width: 90, align:'center', sortable: true, type: 'string', 
						renderer: function(val){
							 if(val=='1')
								 val='运费保理';
							 else if(val=='2')
								 val='提单保理'; 
							 return val;
							}}, 
				    { title:'保理类别', name:'financingMethod' ,width: 90, align:'center', sortable: true, type: 'string',
								renderer: function(val){
									 if(val=='1')
										 val='非买断式融资';
									 else if(val=='2')
										 val='买断式融资'; 
									 return val;
									}},
//					{ title:'保理方式', name:'financingNature' ,width:150, align:'center', sortable: true, type: 'string',
//				    	renderer: function(val){
//							 if(val=='1')
//								 val='一次性融资';
//							 else if(val=='2')
//								 val='持续性融资'; 
//							 return val;
//							}},
//				    { title:'会员编号', name:'memberNo' ,width:150, align:'center', sortable: true, type: 'string'},
//				    { title:'会员类型', name:'memberType' ,width:130, align:'center', sortable: true, type: 'string',
//				    	renderer: function(val){
//				    		 if(val=='1')
//				    			 val='企业会员';
//				    		 else if(val=='2')
//								 val='个人会员';
//				    		 return val;}},
				    { title:'开始日期', name:'effectiveStartTime', width:120, align:'center', sortable: true, type: 'string'},
				    { title:'结束日期', name:'effectiveEndTime', width:120, align:'center', sortable: true, type: 'string'} 
					
				);
				
			 mmg_back =  $("#mmg-back").mmGrid({
					height: getAutoHeightByMmGrid($("#xascfMainPanel")),
					cols: cols_back,
					url: 'xascf/creditApply/page.shtml?type=back&role=BUSINESS',
					params: $("#creditQueryForm").serialize(),
					method: 'post',
					checkCol: true,
					autoLoad: true,
					fullWidthRows: true,
					indexColWidth: 15, 
					cache: false,
					multiSelect: true,
					nowrap: true,
					plugins: [$('#pg-back').mmPaginator({})] 
				});
		},
		cancelTabGrid :function(){
			if(mmg_cancel!=null){
				return;
			}
			var cols_cancel = new Array(
				    { title:'授信编号', name:'creditNo' ,width:140, align:'center', sortable: true, type: 'string',
					      renderer: function(val,item,rowIndex){return '<span style=""><a href="#" onclick="CreditList.detail(\''+item.creditNo+'\')">'
					    	  +val+'</a></span>';}},
					{ title:'会员名称',name:'memberName', width: 120, align: 'center',lockWidth:true,sortable: true, type: 'object'}, 
				    { title:'申请授信额度', name:'creditQuota' ,width:150, align:'center', sortable: true, type: 'string'},
				    {title: '产品类别', name:'financingType', width: 90, align:'center', sortable: true, type: 'string', 
						renderer: function(val){
							 if(val=='1')
								 val='运费保理';
							 else if(val=='2')
								 val='提单保理'; 
							 return val;
							}}, 
				    { title:'保理类别', name:'financingMethod' ,width: 90, align:'center', sortable: true, type: 'string',
								renderer: function(val){
									 if(val=='1')
										 val='非买断式融资';
									 else if(val=='2')
										 val='买断式融资'; 
									 return val;
									}},
//					{ title:'保理方式', name:'financingNature' ,width:150, align:'center', sortable: true, type: 'string',
//				    	renderer: function(val){
//							 if(val=='1')
//								 val='一次性融资';
//							 else if(val=='2')
//								 val='持续性融资'; 
//							 return val;
//							}},
//				    { title:'会员编号', name:'memberNo' ,width:150, align:'center', sortable: true, type: 'string'},
//				    { title:'会员类型', name:'memberType' ,width:130, align:'center', sortable: true, type: 'string',
//				    	renderer: function(val){
//				    		 if(val=='1')
//				    			 val='企业会员';
//				    		 else if(val=='2')
//								 val='个人会员';
//				    		 return val;}},
				    { title:'开始日期', name:'effectiveStartTime', width:120, align:'center', sortable: true, type: 'string'},
				    { title:'结束日期', name:'effectiveEndTime', width:120, align:'center', sortable: true, type: 'string'} 
					
				);
				
			 mmg_cancel =  $("#mmg-cancel").mmGrid({
					height: getAutoHeightByMmGrid($("#xascfMainPanel")),
					cols: cols_cancel,
					url: 'xascf/creditApply/page.shtml?type=cancel&role=BUSINESS',
					params: $("#creditQueryForm").serialize(),
					method: 'post',
					checkCol: true,
					autoLoad: true,
					fullWidthRows: true,
					indexColWidth: 15, 
					cache: false,
					multiSelect: true,
					nowrap: true,
					plugins: [$('#pg-cancel').mmPaginator({})] 
				});
		}	 		
	};
}();
