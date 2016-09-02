$(document).ready(function(){
	PUI.plugin.init();
	sns.valid.init($("form"));

});


var UpdateRate = function() {
	return {
		
		/*清空表单*/
		clear:function(){
			$("#aunualRate").val("");
		},
		/*修改年化率*/
		save:function(){
			if (!$("#updateRateForm").isValid()) {
				return ;
     		}
			var aunualRate=$("#aunualRate").val();
			if(isNaN(aunualRate)||!(aunualRate<=100)){
				PUI.MessageBox.info("年化率应该为1~100的数");
				return;
			}
			$.post("xascf/product/updateRate.shtml",$("#updateRateForm").serialize(),function(data){
				PUI.MessageBox.info(data);
				UpdateRate.forward($("#status").val());
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

		
	};
}();