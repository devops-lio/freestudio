$(document).ready(function(){
});
var buyer_cols = new Array(
	    { title:'委托方名称', name:'buyName' ,width:300, align:'left', sortable: true, type: 'string',
	    	renderer: function(val,item,rowIndex){
	    		return	'<a href="#" onclick="customerDetailPop.buyerDetail(\''+item.buyPid+'\');">'+val+'</a>';
				  
	    	}},
	    { title:'账期', name:'billCycle' ,width:60,lockWidth:true, align:'center', sortable: true, type: 'string',
	    	renderer: function(val){
				return val +'天';}},
	    { title:'业务占比', name:'businessPercent' ,lockWidth:true,width:70, align:'center', sortable: true, type: 'string',
	    	renderer: function(val,item,rowIndex){
    		return	val+'%';
			  
    	}},
	    { title:'票据类型', name:'billTypeCn' ,width:70,lockWidth:true, align:'center', sortable: true, type:'string'},
	    { title:'授信额度', name:'creditPercent' ,width:100,lockWidth:true, align:'center', sortable: true, type:'string',
	    	renderer: function(val,item,rowIndex){
	    		if(val==null){
	    			return '';
	    		}else
    		return	formatMoney(val)+'元';
    	}},
	    { title:'折扣率', name:'disCount' ,width:60,lockWidth:true, align:'center', sortable: true, type:'string',
	    	renderer: function(val,item,rowIndex){
	    		if(val==null){
	    			return '';
	    		}else
	    		return	val+'%';
	    	}},
	    { title:'是否预付', name:'isPrePayCn' ,width:70,lockWidth:true, align:'center', sortable: true, type:'string'},
	    { title:'预付票据类型', name:'preBillType' ,width:90,lockWidth:true, align:'center', sortable: true, type:'string',
	    	renderer: function(val,item,rowIndex){
	    		if(val=="1"){
	    			val='<span >订单</span>';
	    		}else if(val=="2"){
	    			val='<span >运单</span>';
	    		}
				 return val;
	    	}},
	    { title:'是否有效', name:'isEffective' ,width:70,lockWidth:true, align:'center', sortable: true, type:'string',
	    	renderer: function(val,item,rowIndex){
	    		if(val=="0"){
	    			val='<span style="color:red">无效</span>';
	    		}else if(val=="1"){
	    			val='<span style="color:green">有效</span>';
	    		}
				 return val;
	    	}
	    },
	    { title:'操作', name:'' ,width:50,lockWidth:true, align:'center', sortable: true, type:'string',
	    	renderer: function(val,item,rowIndex){
	    		return	'<a href="#" onclick="BuyerInfoSetTab.operate(\''+rowIndex+'\');">设定</a>';
				  
	    	}
	    }
	);
var buyer_mmg =  $("#buyer_mmg").mmGrid({
	height: 'auto',
	cols: buyer_cols,
	url : 'xascf/creditbuyRel/page.shtml',
    params : {creditNo:$("#creditNo").val()},
	method: 'post',
	checkCol: false,
	autoLoad: true,
	fullWidthRows: true,
	indexColWidth: 15, 
	cache: false,
	multiSelect: true,
	showBackboard:false,
	nowrap: true
});
var BuyerInfoSetTab = function(){	
	return{
		
		//设定
		operate:function(rowIndex){
			var item = buyer_mmg.row(rowIndex);
			var html = PUI.String.format($("#template_buyer_set").html(),$.extend(item, {rowIndex : rowIndex}));
			var content=$("#tabwin_buyer_set_content");
			content.html(html);
			$("#tabwin_buyer_set").popup({md:true});
			$("#isEffective").val(item.isEffective).trigger("liszt:updated");
			$("#billType").val(item.billType).trigger("liszt:updated");
			$("#isPrePay").val(item.isPrePay).trigger("liszt:updated");
			$("#preBillType").val(item.preBillType).trigger("liszt:updated");
			BuyerInfoSetTab.changeCheck();
			PUI.plugin.init({}, $("#buyer_set_form"));
			sns.valid.init($("#buyer_set_form"));
			

		},
	
		//确认设定
		operateOk:function(){
			if (!$("#buyer_set_form").isValid()) {
				return ;
			}
			var isEffective=$("#isEffective").val();
			var disCount=$("#disCount").val();
			var creditPercent=$("#creditPercent").val();
			var allCreditPercent=0;
			if (typeof buyer_mmg!='undefined' && null!=buyer_mmg){
				var len =buyer_mmg[0].rows.length;
				for (var i = 0;i < len; i++) {
					if(buyer_mmg.row(i)['isEffective']=='1' && $("#buyrelPid").val()!=buyer_mmg.row(i)['pid'])
						allCreditPercent+=parseInt(buyer_mmg.row(i)['creditPercent']);
				}
			}
			var memberCredit=$("#creditQuota").val();
			if(isEffective=='1'){
				if((allCreditPercent+parseInt(creditPercent))>parseInt(memberCredit)){
					PUI.MessageBox.alert("有效委托方的授信额度总和不能超过会员授信额度");
					return;
				}
			}
			$.post("xascf/creditbuyRel/operate.shtml",$("#buyer_set_form").serialize(), function(data) {  
				$("#tabwin_buyer_set").popup({display:false});
				buyer_mmg.load({creditNo:$("#creditNo").val()});
			}); 
		},
		//取消设定
		operateCancel:function(){
			$("#tabwin_buyer_set").popup({display:false});
		},
		//是否预付监听
		changeCheck:function(){
			var isPrePay=$("#isPrePay").val();
			if('1'==isPrePay){
				$("#preBillType").val("").trigger("liszt:updated");
				$("#preBillType").attr("disabled","disabled");
			} else {
				$("#preBillType").removeAttr("disabled");
			}
		},

		
	};
}();
