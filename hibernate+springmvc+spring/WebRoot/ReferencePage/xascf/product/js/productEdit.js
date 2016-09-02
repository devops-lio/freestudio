$(document).ready(function(){
	PUI.plugin.init();
	sns.valid.init($("form"));
	
	var type=$("#type").val();
	if(type=="new"){
		$("#amount").val("");
		$("#share").val("");
		$("#leastRate").val("");
		$("#leastCost").val("");
		$("#aunualRate").val("");
		$("#mostAmount").val("");
		$("#amaiTel").val("");
		$("#minRate").val("");
		$("#maxRate").val("");
		$("#actualAmount").val("");
		$("#unitPrice").val("");	
	}
});

var _cols =[{ title:'融资单号',name:'fancingOrderNo', width: 110, align: 'center',type:'String', sortable: true},
            { title:'融资企业', name:'requesterPid' ,width:120, align:'center', sortable: true, type: 'String'},
            { title:'融资类型', name:'fancingType' ,width:120, align:'center', sortable: true, type: 'String'},
            { title:'融资金额', name:'fancingReplyPrice' ,width:100, align:'center', sortable: true, type: 'String'}
            
        ];
var _mmg =  $("#mmg").mmGrid({
        	height : 270,
        	cols : _cols,
        	url : 'xascf/fancing/financialPage.shtml',
        	params : {relProductPid:$("#productPid").val()},
        	method : 'post',
        	checkCol : true,
        	autoLoad : false,
        	indexCol : true,
        	indexColWidth : 15,
        	nowrap:true,
        	sortName : '',
        	sortStatus : '',
        	fullWidthRows : true,
        	cache : false,
        	multiSelect: true
        });


var items;
var list;
var isLoad="0";
//融资交易单选中事件
_mmg.on("rowSelected", function(item, rowIndex) {
	items=_mmg.selectedRows();
	list=_mmg.selectedRowsIndex();
	var amountTemp=0;
	for(var i=0;i<items.length;i++){
		amountTemp+=parseFloat(items[i].fancingReplyPrice);
	}
	if(amountTemp==0){
		amountTemp = "";
	}
	$("#tempMostAmount").val(amountTemp);
	$("#mostAmount").val(amountTemp);
});

//融资交易单取消选中事件
_mmg.on("rowDeselected", function(item, rowIndex) {
	items=_mmg.selectedRows();
	list=_mmg.selectedRowsIndex();
	var amountTemp=0;
	for(var i=0;i<items.length;i++){
		amountTemp+=parseFloat(items[i].fancingReplyPrice);
	}
	if(amountTemp==0){
		amountTemp = "";
	}
	$("#tempMostAmount").val(amountTemp);
	$("#mostAmount").val(amountTemp);
	
});

//融资交易单全选全不选事件
$(".mmGrid").find('.mmg-head').find('th .checkAll').on('click', function () {
	if (this.checked) {
		items=_mmg.selectedRows();
		var amountTemp=0;
		for(var i=0;i<items.length;i++){
			amountTemp+=parseFloat(items[i].fancingReplyPrice);
		}	
		if(amountTemp==0){
			amountTemp = "";
		}
		$("#tempMostAmount").val(amountTemp);
		$("#mostAmount").val(amountTemp);
	} else {
		$("#tempMostAmount").val("");
		$("#mostAmount").val("");
	}
});

var ProductEdit = function() {
	return {
		
		/*清空表单*/
		clear:function(){
			//PUI.util.clearForm($("#productEditForm"));
			$("#name").val("");
			$("#fm").val("");
			$("#to").val("");
			$("#renewTerm").val("");
			$("#description").val("");
			$("#amount").val("");
			$("#share").val("");
			$("#leastRate").val("");
			$("#leastCost").val("");
			$("#aunualRate").val("");
			$("#mostAmount").val("");
			$("#amaiTel").val("");
			$("#minRate").val("");
			$("#maxRate").val("");
			$("#actualAmount").val("");
			$("#unitPrice").val("");
		},
		/*保存理财产品*/
		save:function(){
			if (!$("#productEditForm").isValid()) {
				return ;
     		}
			var amount=$("#amount").val();
			var mostAmount=$("#mostAmount").val();
			if(isNaN(amount)||!(parseInt(amount)<=parseInt(mostAmount))){
				PUI.MessageBox.info("设置的募集金额应该为小于最大募集金额的整数");
				return;
			}
			var share=$("#share").val();
			if(isNaN(share)){
				PUI.MessageBox.info("总份额应该为整数");
				return;
			}
			var leastRate=$("#leastRate").val();
			if(isNaN(leastRate)||!(leastRate<=100)){
				PUI.MessageBox.info("募集达标比例应该为1~100的数");
				return;
			}
			var leastCost=$("#leastCost").val();
			if(isNaN(leastCost)||!(parseInt(leastCost)<parseInt(share))){
				PUI.MessageBox.info("最低起购份应该为小于总份额的整数");
				return;
			}
			var renewTerm=$("#renewTerm").val();
			if(isNaN(renewTerm)){
				PUI.MessageBox.info("续存期应该为整数");
				return;
			}
			var aunualRate=$("#aunualRate").val();
			if(isNaN(aunualRate)||!(aunualRate<=100)){
				PUI.MessageBox.info("年化率应该为1~100的数");
				return;
			}
			var minRate=$("#minRate").val();
			if(isNaN(minRate)||!(minRate<=100)){
				PUI.MessageBox.info("最低年化率应该为1~100的数");
				return;
			}
			var maxRate=$("#maxRate").val();
			if(isNaN(maxRate)||!(maxRate<=100)){
				PUI.MessageBox.info("最大年化率应该为1~100的数");
				return;
			}
			
			$.post("xascf/product/save.shtml",$("#productEditForm").serialize(),function(data){
				if(data!="产品名称已经存在"&&data!="保存失败"&&data!="保存成功"){
					var relFancingPids = new Array();
					$.each(items, function(i, n) {
						relFancingPids.push(n.fancingPid);
					});
					var pids=relFancingPids.join(",");
					$.post("xascf/product/financiaProduct.shtml",{"relProductPid":data,"relFancingPids":pids},function(data){
						ProductEdit.forward("1");
						PUI.MessageBox.info(data);
					},"json");
				}else if(data=="保存成功"){
					var relFancingPids = new Array();
					$.each(items, function(i, n) {
						relFancingPids.push(n.fancingPid);
					});
					var pids=relFancingPids.join(",");
					$.post("xascf/product/financiaProductUpdate.shtml",{"relProductPid":$("#productPid").val(),"relFancingPids":pids},function(data){
						ProductEdit.forward("1");
						PUI.MessageBox.info(data);
					},"json");
				}else {
					PUI.MessageBox.info(data);
				}
				
				
			},"json");
		},
		
		/*发布*/
		editPublish:function(){
			if (!$("#productEditForm").isValid()) {
				return ;
     		}
			var amount=$("#amount").val();
			var mostAmount=$("#mostAmount").val();
			if(isNaN(amount)||!(parseInt(amount)<=parseInt(mostAmount))){
				PUI.MessageBox.info("设置的募集金额应该为小于最大募集金额的整数");
				return;
			}
			var share=$("#share").val();
			if(isNaN(share)){
				PUI.MessageBox.info("总份额应该为整数");
				return;
			}
			var leastRate=$("#leastRate").val();
			if(isNaN(leastRate)||!(leastRate<=100)){
				PUI.MessageBox.info("募集达标比例应该为1~100的数");
				return;
			}
			var leastCost=$("#leastCost").val();
			if(isNaN(leastCost)||!(parseInt(leastCost)<parseInt(share))){
				PUI.MessageBox.info("最低起购份应该为小于总份额的整数");
				return;
			}
			var renewTerm=$("#renewTerm").val();
			if(isNaN(renewTerm)){
				PUI.MessageBox.info("续存期应该为整数");
				return;
			}
			var aunualRate=$("#aunualRate").val();
			if(isNaN(aunualRate)||!(aunualRate<=100)){
				PUI.MessageBox.info("年化率应该为1~100的数");
				return;
			}
			var minRate=$("#minRate").val();
			if(isNaN(minRate)||!(minRate<=100)){
				PUI.MessageBox.info("最低年化率应该为1~100的数");
				return;
			}
			var maxRate=$("#maxRate").val();
			if(isNaN(maxRate)||!(maxRate<=100)){
				PUI.MessageBox.info("最大年化率应该为1~100的数");
				return;
			}
			$.post("xascf/product/editPublish.shtml",$("#productEditForm").serialize(),function(data){
				PUI.MessageBox.info(data);
				if(data=="发布成功")
					ProductEdit.forward("2");
			},"json");
		},
		
		/*保存或者发布后调用跳转页面*/
		forward:function(type){
			$.post("xascf/product/jsp/product.jsp", {"type":type}, function(data) {
				$("#xascfMainPanel").html(data);
				if(type=="1"){
					$("#oneNew").attr("class","active");
					$("#twoPublish").removeAttr("class");
					$("#status").val(1);
					$("#add").show();
					$("#edit").show();
					$("#look").hide();
					$("#updateRate").hide();
					$("#come").show();
					$("#publish").show();
					$("#deleteProduct").show();
				}else if(type=="2"){
					$("#oneNew").removeAttr("class");
					$("#twoPublish").attr("class","active");
					$("#status").val(2);
					$("#add").hide();
					$("#edit").hide();
					$("#look").show();
					$("#updateRate").show();
					$("#come").show();
					$("#publish").hide();
					$("#deleteProduct").hide();
				}
				_mmg.load($("#productQueryForm").serialize());
			});
		},
		
		/*选择融资交易单*/
		trade:function(){
			if(isLoad=="0"){
				_mmg.load({relProductPid:$("#productPid").val()});
				isLoad="1";
			}
			$("#tabwin_trade").popup({md:true});
		},
		/*是否为正整数  */
		isPositiveNum:function (s){
		    var re = /^[1-9]+[0-9]*]*$/;
		    return re.test(s);
		},
		/*完成*/
		sure:function(){
			$("#tabwin_trade").popup({display:false});
		},
		textChanged:function(){
			if($("#unitPrice").val()==""){
				$("#share").val("");
				$("#amount").val("");
				PUI.MessageBox.info("请先填写每份价格");
				return;
			}
			if(!ProductEdit.isPositiveNum($("#share").val())){
				$("#amount").val("");
				$("#share").val("");
				PUI.MessageBox.info("总份额必须为整数");
				return;
			}
			var unitPrice=parseFloat($("#unitPrice").val());
			var share=parseFloat($("#share").val());
			$("#amount").val(unitPrice*share);
			
			
		},
		changed:function(){
			$("#amount").val("");
			$("#share").val("");
		}

		
	};
}();