(function($){
	xwinconfig = function() {
		var defaults= {
			options: new Array(
            	{key: '银行账号', value: 'bankNo'},
                {key: '开户行全称', value: 'theBank'}
            ),
            url: 'xascf/fund/fundAccount/getFundAccountList.shtml'
        };
		return $.extend(defaults, {
			
			"reportPop":{
				header:'选择评估报告',
				options: new Array(
						{key: '评估对象', value: 'reportObjectName'},
						{key: '评估标题', value: 'reportTitle'}
				),
				url: 'xascf/rm/evaluateReport/reportPop.shtml',
				params: {
					'condition.reportObjectPid': $("#memberPid").val()==""?"xascffdfddd":$("#memberPid").val()
				},
				columns: new Array( 	
					    { title:'评估对象', name:'reportObjectName' ,width:180, align:'center', sortable: true, type: 'object'},
					    { title:'评估标题', name:'reportTitle' ,width:180, align:'center', sortable: true, type: 'object'},
					    { title:'报告时间', name:'reportTime' ,width:180, align:'center', sortable: true, type: 'object'}
					),
					returnValue: new Array(	
						{targetSelector: '#reportPid', sourceColumn: "reportPid"},
						{targetSelector: '#reportTitle', sourceColumn: "reportTitle"}
						
					)
			},
			"creditResultPop":{
				header:'选择会员',
				options: new Array(
						{key: '批复编号', value: 'creditResultNo'},
						{key: '会员名称', value: 'memberName'}
				),
				url: 'xascf/creditApply/creditResultPop.shtml',
				columns: new Array( 	
				    { title:'批复编号', name:'creditResultNo' ,width:180, align:'center', sortable: true, type: 'object'},
				    { title:'会员名称', name:'memberName' ,width:180, align:'left', sortable: true, type: 'object'},
				    { title:'授信额度(元)', name:'replyQuota' ,width:180, align:'center', sortable: true, type: 'object',
				        renderer: function(val){return formatMoney(val)}},
				    { title:'开始时间', name:'creditStartTime' ,width:180, align:'center', sortable: true, type: 'object'},
				    { title:'结束时间', name:'creditEndTime' ,width:180, align:'center', sortable: true, type: 'object'}
				),
				returnValue: new Array(	
					{targetSelector: '#creditResultNo', sourceColumn: "creditResultNo"}
					
				)
				
			},
			
			
			"fundAccountPop": {
				header: '资金账号',
				options: new Array(
                    {key: '银行账号', value: 'bankNo'},
                    {key: '开户行全称', value: 'theBank'}
                ),
                url: 'xascf/fund/fundAccount/getFundAccountList.shtml',
                params: {
					'condition.accountUsage': $("#accountUsage").val()
				},
				columns: new Array(
				    { title:'银行账号', name:'bankNo' ,width:180, align:'center', sortable: true, type: 'object'},
				    { title:'账户别名', name:'accountOtherName' ,width:180, align:'center', sortable: true, type: 'object'},
				    { title:'账户名称', name:'accountName' ,width:180, align:'center', sortable: true, type: 'object'},
				    { title:'开户行全称', name:'theBank' ,width:180, align:'center', sortable: true, type: 'object'},
				    { title:'账号用途', name:'accountUsage' ,width:180, align:'center', sortable: true, type: 'object', 
				    	renderer: function(val){
				    		 if(val=='01')
				    			 val='融资款';
				    		 else if(val=='02')
								 val='服务费';
							 else if(val=='03')
								 val='保证金'; 
							 else if(val=='04')
								 val='理财';
							return val
						}},
				    { title:'可用金额', name:'availableAmount' ,width:180, align:'center', sortable: true, type: 'object',
							 renderer: function(val){return formatMoney(val)+' 元'}},
				    { title:'锁定金额', name:'lockedAmount' ,width:180, align:'center', sortable: true, type: 'object',
								 renderer: function(val){return formatMoney(val)+' 元'}},
				    { title:'总金额', name:'totalAmount' ,width:180, align:'center', sortable: true, type: 'object',
									 renderer: function(val){return formatMoney(val)+' 元'}}
			    ),
			    returnValue: new Array(
		    		{targetSelector: "#bankNo", sourceColumn: "bankNo"},
		    		{targetSelector: "#bankNo4LX", sourceColumn: "bankNo"},
		    		{targetSelector: "#account4Repay", sourceColumn: "bankNo"},
		    		{targetSelector: "#bondAccountBank", sourceColumn: "theBank"},
		    		{targetSelector: "#bondAccountName", sourceColumn: "accountName"}
			    )
			},
			"commonComapanyPop":{
				header:'选择会员',
				options: new Array(
						{key: '会员编号', value: 'memberNo'},
						{key: '会员名称', value: 'memberName'}
				),
				url: 'xascf/customer/companyPoppage.shtml',
				params: {
					'condition.customerType': $("#customerType").val()
				},
				columns: new Array( 	
				    { title:'会员编号', name:'memberNo' ,width:180, align:'center', sortable: true, type: 'object'},
				    { title:'会员名称', name:'memberName' ,width:180, align:'left', sortable: true, type: 'object'},
				    { title:'联系人', name:'userNameCn' ,width:180, align:'center', sortable: true, type: 'object'},
				    { title:'联系方式', name:'tel' ,width:180, align:'center', sortable: true, type: 'object'}
				),
				returnValue: new Array(	
					{targetSelector: '#memberName', sourceColumn: "memberName"},
					{targetSelector: '#memberNo', sourceColumn: "memberNo"},
					{targetSelector: '#memberPid', sourceColumn: "memberPid"}
					
				)
			},
			"buyerComapanyPop":{
				header:'选择委托方',
				options: new Array(
						{key: '委托方名称', value: 'customerName'}
				),
				url: 'xascf/customer/customersubpage.shtml',
				params: {
					'condition.ispurchase': $("#ispurchase").val(),
					'condition.remark': $("#buyerExist").val()
					
				},
				columns: new Array( 	
						{ title:'委托方名称', name:'customerName' ,width:180, align:'left', sortable: true, type: 'object'},
						{ title:'联系方式', name:'tel' ,width:180, align:'center', sortable: true, type: 'object'},
						{ title:'公司地址', name:'officeAddress' ,width:180, align:'left', sortable: true, type: 'object'}
				),
				returnValue: new Array(	
						{targetSelector: '#buyName', sourceColumn: "customerName"},
						{targetSelector: '#buyPid', sourceColumn: "customersubPid"}
						
				)
			},
			"customerBankPop":{
				header:'选择结算账号',
				options: new Array(
						{key: '开户行', value: 'bankName'},
						{key: '账号', value: 'bankNo'}
				),
				url: 'xascf/customer/customerLoanBank.shtml',
				params: {
					'condition.customerPid': $("#memberPid").val()
					
				},
				columns: new Array( 	
						{ title:'开户行', name:'bankName' ,width:180, align:'center', sortable: true, type: 'object'},
						{ title:'账号', name:'bankNo' ,width:180, align:'center', sortable: true, type: 'object'},
						{ title:'开户人', name:'bankholder' ,width:180, align:'center', sortable: true, type: 'object'}
				),
				returnValue: new Array(	
						{targetSelector: '#loanBankNo', sourceColumn: "bankNo"},
						{targetSelector: '#loanBankPayee', sourceColumn: "bankholder"},
						{targetSelector: '#loanBankName', sourceColumn: "bankName"}
						
				)
			},
			"driverBankPop":{
				header:'选择司机账号',
				options: new Array(
						{key: '司机姓名', value: 'driverName'},
						{key: '账号', value: 'bankNo'}
				),
				url: 'xascf/customer/companyDriverPopPage.shtml',
				params: {
					'condition.memberPid': $("#memberPid").val(),
					'condition.remark': $("#driverExist").val()
					
				},
				columns: new Array( 	
						{ title:'', name:'pid' ,width:180,hidden:true, align:'center', sortable: true, type: 'object'},
						{ title:'司机姓名', name:'driverName' ,width:60, align:'center', sortable: true, type: 'object'},
						{ title:'身份证号', name:'driverIdNo' ,width:100, align:'center', sortable: true, type: 'object'},
						{ title:'开户行', name:'bankName' ,width:140, align:'center', sortable: true, type: 'object'},
						{ title:'开户人', name:'bankHolder' ,width:60, align:'center', sortable: true, type: 'object'},
						{ title:'银行账号', name:'bankAccount' ,width:120, align:'center', sortable: true, type: 'object'}
				),
				returnValue: new Array(	
						{targetSelector: '#driverbanknoPid', sourceColumn: "pid"},
						{targetSelector: '#driverName', sourceColumn: "driverName"},
						{targetSelector: '#driverNo', sourceColumn: "bankAccount"},
						{targetSelector: '#driverIdNo', sourceColumn: "driverIdNo"}
						
				)
			},
			"fancingContractPop":{
				header:'选择合同',
				options: new Array(
						{key: '合同编号', value: 'contractNo'}
				),
				url: 'xascf/credit/fancingContract/pageWithBuyRel.shtml',
//				params: {
//					'condition.ispurchase': $("#ispurchase").val(),
//					'condition.remark': $("#buyerExist").val()
					
//				},
				columns: new Array( 	
						{ title:'合同编号', name:'contractNo' ,width:80, align:'center', sortable: true, type: 'object'},
						{ title:'授信批复编号', name:'creditResultNo' ,width:120, align:'center', sortable: true, type: 'object'},
						{ title:'会员名称', name:'memberName' ,width:180, align:'left', sortable: true, type: 'object'},
						{ title:'委托方', name:'buyRelNames' ,width:180, align:'left', sortable: true, type: 'object'}
				),
				returnValue: new Array(	
						{targetSelector: '#contractNo', sourceColumn: "contractNo"},
						{targetSelector: '#memberName', sourceColumn: "memberName"},
						{targetSelector: '#memberPid', sourceColumn: "memberPid"},
						{targetSelector: '#creditNo', sourceColumn: "creditNo"},
						{targetSelector: '#bankNo', sourceColumn: "supervisonNo"},
						{targetSelector: '#bankName', sourceColumn: "supervisonBank"},
						{targetSelector: '#loanBankPayee', sourceColumn: "payAccountName"},
						{targetSelector: '#loanBankNo', sourceColumn: "payAccountNo"},
						{targetSelector: '#loanBankName', sourceColumn: "payAccountBank"}
						
				)
			},
			"ruleDefinitionPop" : {
				header: '评分规则',
				options: new Array(
						{key: '编号', value: 'ruleNo'},
						{key: '名称', value: 'ruleName'}
				),
				url: 'xascf/rm/ruleDefinition/getRulePage.shtml',
                columns: new Array(
					 { title:'编号', name:'ruleNo' ,width:80, align:'center', sortable: true, type: 'string'},
			         { title:'名称', name:'ruleName' ,width:80, align:'center', sortable: true, type: 'string'},
			         { title:'规则描述', name:'description' ,width:80, align:'center', sortable: true, type: 'string'}
			    ),
			    returnValue: new Array(
		    		{targetSelector: "#ruleNo", sourceColumn: "ruleNo"},
		    		{targetSelector: "#ruleName", sourceColumn: "ruleName"},
		    		{targetSelector: "#ruleDesc", sourceColumn: "description"}
			    )
			},
			"leafMaterialDefinePop" : {
				header: '材料定义',
				options: new Array(
						{key: '编号', value: 'code'},
						{key: '名称', value: 'typeName'}
				),
				url: 'xascf/rm/materialDefine/getLeafMaterialDefine.shtml',
                columns: new Array(
					 { title:'编号', name:'code' ,width:80, align:'center', sortable: true, type: 'string'},
			         { title:'名称', name:'typeName' ,width:80, align:'center', sortable: true, type: 'string'}
			    ),
			    returnValue: new Array(
		    		{targetSelector: "#mappingMaterial", sourceColumn: "pid"},
		    		{targetSelector: "#materialName", sourceColumn: "typeName"}
			    )
			},
			"templatesPop" : {
				header: '行业模板',
				options: new Array(
						{key: '模板编号', value: 'templateNo'},
						{key: '模板名称', value: 'templatesPopName'}
				),
				url: 'xascf/rm/templates/getPopPage.shtml',
				params: {
	                	'condition.industryCode': $("#industryCode").val()
	                },
				columns: new Array(
						{ title:'模板编码', name:'templateCode' ,width:150, align:'center', sortable: true, type: 'String'},
						{ title:'模板名称', name:'templateName' ,width:150, align:'center', sortable: true, type: 'String'},
						{ title:'所属行业', name:'templateIndustry' ,width:100, align:'center', sortable: true, type: 'String'},
						{ title:'模板类型', name:'templateType' ,width:100, align:'center', sortable: true, type: 'String',
							renderer: function(val,item,rowIndex){
					    		if(val=='1')
					    			val='企业';
					    		else
					    			val='个人'
					    		return '<span >'+val+'</span>';
					    	}},
						{ title:'是否默认', name:'isDefault' ,width:100, align:'center', sortable: true, type: 'String',
							renderer: function(val,item,rowIndex){
					    		if(val=='1')
					    			val='是';
					    		else
					    			val='否'
					    		return '<span style="color:red;">'+val+'</span>';
					    	}},
					    { title:'描述', name:'remark' ,width:250, align:'center', sortable: true, type: 'String'}
				),
				returnValue: new Array(
						{targetSelector: "#templatePid", sourceColumn: "templatePid"},
						{targetSelector: "#templateName", sourceColumn: "templateName"}
				)
			},
			"tableInfoPop" : {
				header:  $("#objectMapping").find("option:selected").text()+'表结构信息',
				options: new Array(
						{key: '字段注释', value: 'columnComment'}
				),
				url: 'xascf/rm/mappingInfo/getTablePage.shtml',
				 params: {
	                	'condition.tableName': $("#objectMapping").val()
	                },
				columns: new Array(
						{ title:'字段中文注释', name:'columnComment' ,width:80, align:'center', sortable: true, type: 'string'},
						{ title:'字段名称', name:'columnName' ,width:80, align:'center', sortable: true, type: 'string'}
						
				),
				returnValue: new Array(
						{targetSelector: "input[name='mappingInfoModel.mappingProperty']", sourceColumn: "columnName"}
				)
			},
			/*理财--会员信息*/
			"proCustomerPop":{
				header: '会员信息',
				options: new Array(
                    {key: '会员名称', value: 'loginName'}                    
                ),
                url:'xaproductm/xwin/getProCustomer.shtml',
                params: {
//                	'condition.customerType': '1'                	
                },
                columns:new Array(
                	{ title:'会员名称', name:'loginName' ,width:180, align:'center', sortable: true, type: 'string'},
                	{ title:'会员实名', name:'customerName' ,width:180, align:'center', sortable: true, type: 'string'},
                	{ title:'是否实名认证', name:'nameStatus' ,width:180, align:'center', sortable: true, type: 'string',
                		renderer:function(val){
                			if(val==null || val=='')
                			{
                				return '否';
                			}else return '是';
                		}
                	}
                ),
                returnValue: new Array(
		    		{targetSelector: "#customerName", sourceColumn: "customerName"},
		    		{targetSelector: "#customerPid", sourceColumn: "pid"}
			    )
			},
			/*理财--产品列表【已经审核发布的】*/
			"productListPop":{
				header: '理财产品信息',
				options: new Array(
                    {key: '理财产品编号', value: 'productNo'},
                    {key: '理财产品名称', value: 'productName'}  
                ),
                url:'xaproductm/xwin/getProductList.shtml',
                params: {
                	'condition.productStatus': '30'                	
                },
                columns:new Array(
                	{ title:'理财产品编号', name:'productNo' ,width:140, align:'center', sortable: true, type: 'string'},
                	{ title:'理财产品名称', name:'productName' ,width:160, align:'center', sortable: true, type: 'string'},
                	{ title:'产品单价', name:'productUnitPrice' ,width:120, align:'center', sortable: true, type: 'string'},
                	{ title:'剩余份额', name:'remainNums' ,width:120, align:'center', sortable: true, type: 'string'}
                ),
                returnValue: new Array(
		    		{targetSelector: "#productNo", sourceColumn: "productNo"},
		    		{targetSelector: "#productName", sourceColumn: "productName"},
		    		{targetSelector: "#remainNums", sourceColumn: "remainNums"},
		    		{targetSelector: "#productUnitPrice", sourceColumn: "productUnitPrice"},
		    		/*派息日*/
		    		{targetSelector: "#productDividEnd", sourceColumn: "workFrom"},
		    		/*到期日*/
		    		{targetSelector: "#productWorkEnd", sourceColumn: "workTo"}		    		
			    )				
			},
			/**
			 * 获取投标人信息
			 */
			"issuerPop":{
				header: '发标人信息',
				options: new Array(
                    {key: '发标人编号', value: 'pid'},
                    {key: '发标人名称', value: 'customerName'}                 
                ),
                url:'xaproductm/xwin/getIssuerList.shtml',
              
                columns:new Array(
                	{ title:'发标人编号', name:'pid' ,width:140, align:'center', sortable: true, type: 'string'},
                	{ title:'发标人名称', name:'customerName' ,width:160, align:'center', sortable: true, type: 'string'},
                	{ title:'托管账户', name:'depositId' ,width:120, align:'center', sortable: true, type: 'string'}
                ),
                returnValue: new Array(
		    		{targetSelector: "#issuerNo", sourceColumn: "pid"},
		    		{targetSelector: "#issuerName", sourceColumn: "customerName"},
		    		{targetSelector: "#depositAccount", sourceColumn: "depositId"}
			    )				
			},

			"creditCustomerPop":{
				header:'选择会员',
				options: new Array(
						{key: '会员编号', value: 'memberNo'},
						{key: '会员名称', value: 'memberName'}
				),
				url: 'xascf/credit/customerCreditPage.shtml',
				columns: new Array( 
					{ title:'会员编号', name:'memberNo' ,width:180, align:'center', sortable: true, type: 'object'},	
				    { title:'会员名称', name:'memberName' ,width:180, align:'left', sortable: true, type: 'object'},
				    { title:'授信编号', name:'creditNo' ,width:180, align:'center', sortable: true, type: 'object'},
				    { title:'授信额度', name:'creditQuota' ,width:180, align:'center', sortable: true, type: 'object'},
				    { title:'剩余额度', name:'remaingAmount' ,width:180, align:'center', sortable: true, type: 'object'}
				),
				returnValue: new Array(	
					{targetSelector: '#memberName', sourceColumn: "memberName"},
					{targetSelector: '#memberPid', sourceColumn: "memberPid"},
					{targetSelector: '#creditNo', sourceColumn: "creditNo"}
				)
			} ,
			/**
			 * 再融资融入
			 */
			"againFancingPop":{
				header:'选择会员',
				options: new Array(
						{key: '再融资编号', value: 'agfancingOrderNo'}
				),
				url: 'xascf/agfancing/page.shtml',
				params: {'condition.state':'0'},//0-新建
				columns: new Array( 
						{ title:'融资编号', name:'agfancingOrderNo' ,width:120, align:'center', sortable: true, type: 'object'},
						{ title:'资金方', name:'agfancingCustomerName' ,width:120, align:'center', sortable: true, type: 'object'},
			            { title:'拟融资总额', name:'agfancingAmount' ,width:120, align:'center', sortable: true, type: 'String',
			            		 renderer: function(val){return formatMoney(val)+' 元'}},
			            { title:'实际融资总额', name:'agfancingActualAmount' ,width:120, align:'center', sortable: true, type: 'String',
			            		 renderer: function(val){return formatMoney(val)+' 元'}},
						{ title:'账单总额', name:'billAmount' ,width:120, align:'center', sortable: true, type: 'String',
			            	 renderer: function(val){return formatMoney(val)+' 元'}},
			             { title:'融资利率', name:'agfancingRate' ,width:70, align:'center', sortable: true, type: 'String',
			            				 renderer: function(val){return val==null||val==''?val:val+'%'}},
			             { title:'开始日期', name:'startDate' ,width:70, align:'center', sortable: true, type: 'String'},
			             { title:'到期日期', name:'endDate' ,width:70, align:'center', sortable: true, type: 'String'}
				),
				returnValue: new Array(	
						{targetSelector: '#incomeNo', sourceColumn: "agfancingOrderNo"},
						{targetSelector: '#incomeAmount', sourceColumn: "agfancingActualAmount"},
						{targetSelector: '#fundRate', sourceColumn: "agfancingRate"},
						{targetSelector: '#expireDate', sourceColumn: "endDate"},
						{targetSelector: '#expireDate2', sourceColumn: "endDate"},
						{targetSelector: '#incomeSource', sourceColumn: "agfancingCustomerName"}
				)
			} ,
			// 20141221.1 vicky 放款申请界面，委托方选择弹出框
			"creditBuyerPop":{
				header:'选择委托方',
				options: new Array(
					{key: '委托方名称', value: 'customerName'}
				),
				url: 'xascf/creditbuyRel/getBuyerByCreditNo.shtml',
				params: {
					'condition.creditNo': $("#creditNo").val(),
					'condition.isPrePay': $("#loanType").val()// 是否预付。全款只能查询全款的委托方，预付只能查询预付的委托方
				},
				columns: new Array( 	
					{ title:'委托方名称', name:'buyName' ,width:160, align:'left', sortable: true, type: 'object'},
					{ title:'票据类型', name:'billType' ,width:60, align:'center',sortable: true, type: 'String',
						renderer: function(val,item,rowIndex){
				    		if(val=='1')
				    			val='发票';
				    		else if(val=='2')
				    			val='对账单'
				    		else if(val=='3')
				    			val='回单'
				    		else
				    			val='无'
				    		return val;
				    	}
			    	},
					{ title:'是否预付', name:'isPrePay' ,width:60, align:'center',sortable: true, type: 'String',
						renderer: function(val,item,rowIndex){
				    		if(val=='1')
				    			val='否';
				    		else if(val=='2')
				    			val='是'
				    		return val;
				    	}
			    	},
					{ title:'预付票据类型', name:'preBillType' ,width:80, align:'center',sortable: true, type: 'String',
						renderer: function(val,item,rowIndex){
				    		if(val=='1')
				    			val='订单';
				    		else if(val=='2')
				    			val='运单'
				    		else
				    			val='无'
				    		return val;
				    	}
			    	},
					{ title:'业务占比', name:'businessPercent' ,width:60, align:'center', sortable: true, type: 'object'},
					{ title:'结算周期(天)', name:'billCycle' ,width:80, align:'center', sortable: true, type: 'object'}
				),
				returnValue: new Array(	
					{targetSelector: '#buyerName', sourceColumn: "buyName"},
					{targetSelector: '#buyerPid', sourceColumn: "buyPid"}
				)
			},
			"contractBuyerPop":{
				header:'选择委托方',
				options: new Array(
					{key: '委托方名称', value: 'buyName'}
				),
				url: 'xascf/credit/contractbuyRel/getBuyerByContractNo.shtml',
				params: {
					'condition.contractNo': $("#contractNo").val(),
					'condition.loanType': $("#loanType").val()// 是否预付。全款只能查询全款的委托方，预付只能查询预付的委托方
				},
				columns: new Array( 	
					{ title:'委托方名称', name:'buyName' ,width:160, align:'left', sortable: true, type: 'object'},
					{ title:'票据类型', name:'billType' ,width:60, align:'center',sortable: true, type: 'String',
						renderer: function(val,item,rowIndex){
				    		if(val=='1')
				    			val='发票';
				    		else if(val=='2')
				    			val='对账单'
				    		else if(val=='3')
				    			val='回单'
				    		else
				    			val='无'
				    		return val;
				    	}
			    	},
					{ title:'是否预付', name:'isPrePay' ,width:60, align:'center',sortable: true, type: 'String',
						renderer: function(val,item,rowIndex){
				    		if(val=='1')
				    			val='否';
				    		else if(val=='2')
				    			val='是'
				    		return val;
				    	}
			    	},
					{ title:'预付票据类型', name:'preBillType' ,width:80, align:'center',sortable: true, type: 'String',
						renderer: function(val,item,rowIndex){
				    		if(val=='1')
				    			val='订单';
				    		else if(val=='2')
				    			val='运单'
				    		else
				    			val='无'
				    		return val;
				    	}
			    	}
				),
				returnValue: new Array(	
					{targetSelector: '#buyerName', sourceColumn: "buyName"},
					{targetSelector: '#buyerPid', sourceColumn: "buyPid"}
				)
			},
			"agfancingCapitalPop":{
				header:'选择会员',
				options: new Array(
						{key: '交易单号', value: 'fancingOrderNo'},
						{key: '融资人', value: 'customerName'}
				),
				url: 'xascf/fancing/agfancingCapitalpage.shtml',
//				params: {
//					'condition.customerType': $("#requestType").val()
//				},
				columns: new Array( 
						{ title:'交易单号', name:'fancingOrderNo' ,width:180, align:'center', sortable: true, type: 'object'},	
						{ title:'交易单号', name:'fancingOrderNo' ,width:180, align:'center', sortable: true, type: 'object'},
						{ title:'融资人', name:'customerName' ,width:180, align:'center', sortable: true, type: 'object'},
						{ title:'业务类型', name:'fancingType' ,width:180, align:'center', sortable: true, type: 'object'},
						{ title:'账单金额', name:'billPrice' ,width:180, align:'center', sortable: true, type: 'object',
							 renderer: function(val){return formatMoney(val)+' 元'}},
						{ title:'应收时间', name:'endDate' ,width:180, align:'center', sortable: true, type: 'object'}
				),
				returnValue: new Array(	
						{targetSelector: '#fancingOrderNo', sourceColumn: "fancingOrderNo"},
						{targetSelector: '#customerName', sourceColumn: "customerName"},
						{targetSelector: '#fancingType', sourceColumn: "fancingType"},
						{targetSelector: '#billPrice', sourceColumn: "billPrice"},
						{targetSelector: '#endDate', sourceColumn: "endDate"} 
				)
			},
			"agfancingCustomerPop":{
				header:'选择资金方',
				options: new Array(
					{key: '资金方名称', value: 'customerName'}
				),
				url: 'xascf/agFancing/page.shtml',
				params: {'condition.unCustomerStatus':'10'},//10-已停用
				columns: new Array(
				    { title:'资金方名称', name:'customerName' ,width:180, align:'left', sortable: true, type: 'object'},
				    { title:'类型', name:'customerType' ,width:180, align:'center', sortable: true, type: 'object'},
				    { title:'联系人', name:'linkMan' ,width:180, align:'center', sortable: true, type: 'object'},
				    { title:'联系方式', name:'tel' ,width:180, align:'center', sortable: true, type: 'object'}
				),
				returnValue: new Array(	
					{targetSelector: '#customerNamePop', sourceColumn: "customerName"},
					{targetSelector: '#customerName', sourceColumn: "customerName"},
					{targetSelector: '#customerPid', sourceColumn: "customerPid"}
				)
			},
			"agfancingSolutionPop":{
				header:'选择方案',
				options: new Array(
					{key: '方案编号', value: 'solutionNo'},
					{key: '方案名称', value: 'solutionName'}
				),
				url: 'xascf/agFancingSO/page.shtml',
				params: {},
				columns: new Array(
				    { title:'方案编号', name:'solutionNo' ,width:180, align:'left', sortable: true, type: 'object'},
				    { title:'方案名称', name:'solutionName' ,width:180, align:'left', sortable: true, type: 'object'},
				    { title:'描述', name:'solutionDesc' ,width:180, align:'left', sortable: true, type: 'object'}
				),
				returnValue: new Array(	
					{targetSelector: '#solutionName', sourceColumn: "solutionName"},
					{targetSelector: '#solutionPid', sourceColumn: "pid"}
				)
			}
			
		}[arguments[0]]);
	};
		
})(jQuery);