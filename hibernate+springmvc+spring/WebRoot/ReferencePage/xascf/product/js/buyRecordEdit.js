$(document).ready(function(){
	PUI.plugin.init();
	sns.valid.init($("form"));
	
	var type=$("#type").val();
	if(type=="new"){
		$("#purchaseAmount").val("");
	}
});




var BuyRecordEdit = function() {
	return {
		/*清空**/
		clear : function(){
			PUI.util.clearForm($("#purchaseEditForm"));
			$("#purchaseAmount").val("");
		},
		/*保存*/
		save:function(){
			$.post("xascf/product/purchase/save.shtml",$("#purchaseEditForm").serialize(), function(data) {
				PUI.MessageBox.info(data);
				if(data=="保存成功"){
					$.post("xascf/product/jsp/buyRecord.jsp",  function(data) {
						$("#xascfMainPanel").html(data);
					});
				}
				
			});
		},
		/*购买份额改变触发购买金额改变*/
		textChanged:function(){
			if($("#purchaseShare").val()==""){
				$("#purchaseAmount").val("");
				return;
			}
			var amountStr= $("#amount").val();
			var unitPriceStr = $("#unitPrice").val();
			var surplusStr = $("#surplus").val();
			
			var surplus  = parseInt(surplusStr);
			var unitPrice= parseInt(unitPriceStr);
			
			var purchaseShare=parseFloat($("#purchaseShare").val());
			if(amountStr==""){
				PUI.MessageBox.info("请先选择产品编号");
				$("#purchaseShare").val("");
				$("#purchaseAmount").val("");
				return;
			}
			if(!BuyRecordEdit.isPositiveNum($("#purchaseShare").val())||purchaseShare>surplus){
				PUI.MessageBox.info("购买份数应该为小于剩余份数"+surplus+"的整数");
				$("#purchaseAmount").val("");
				$("#purchaseShare").val("");
				return;
			}
			$("#purchaseAmount").val(purchaseShare*unitPrice);
			
			
			
		},
		/*理财产品改变  */
		productChanged:function(){
			$("#purchaseAmount").val("");
			$("#purchaseShare").val("");
			$("#unitPrice").val("");
			$("#surplus").val("");
			$("#amount").val("");
			
		},
		/*是否为正整数  */
		isPositiveNum:function (s){
		    var re = /^[1-9]+[0-9]*]*$/;
		    return re.test(s);
		}
	};
}();