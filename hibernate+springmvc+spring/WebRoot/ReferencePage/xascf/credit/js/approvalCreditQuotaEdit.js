$(document).ready(function(){
 	PUI.plugin.init({},$("#approval_editForm"));
	sns.valid.init($("#approval_editForm"));
	$("#approvalNext").val($("#backTo").find("option:selected").text());
	//是否通过下拉框change事件
	$("#approvaelPass").bind("change", function(){
		var v=$(this).val();
		if(v=="N" ){
			$("#backDiv").show();
			$("#result_div").hide();
		}else {
			$("#backDiv").hide();
			$("#result_div").show();
		}
	});
});
var sug_mmg=null;
var ApprovaelFancingQuotaEdit = function() {
	return {
		//是否收取保证金
		changeCheck:function(){
			var isBond=$("#isBond").val();
			if('N'==isBond){
				$("#bondRate").attr("readonly","readonly");
				$("#bondRate").val('0');
			} else {
				$("#bondRate").removeAttr("readonly");
				$("#bondRate").val('');
			}
		},
		
		//保证金金额和敞口金额计算
		jsBond:function(){
			var bondRate=parseFloat($("#bondRate").val())/100.0;
			var replyQuota=parseFloat($("#replyQuota").val());
			var bondPrice=replyQuota*bondRate;
			$("#bondPrice").val(bondPrice+'');
			$("#openPrice").val((replyQuota-bondPrice)+'');
		},
		
		//驳回节点下拉框选择
		backChange:function(){
			$("#approvalNext").val($("#backTo").find("option:selected").text());
		},
		rebackList:function(){
			//返回授信额度设定列表
			Menu.forward("xascf/credit/jsp/quotaSetList.jsp"); 
		},
		
		//提交授信额度设定
		save :function(){
			var approvaelPass=$("#approvaelPass").val();
			var params=$("#approval_editForm").serializeArray(); 
			//保存否决退回
			if(approvaelPass=='N'){
				if($("#approvalRemark").val()==''){
					PUI.MessageBox.info("批复内容不能为空!");
					return;
				}
			}else{
				if (!$("#approval_editForm").isValid()) {
					return ;
				}
				if(approvaelPass=='Y'){
					if(buyer_mmg !=null && buyer_mmg.row(0)!=null){
						var len =buyer_mmg[0].rows.length;
						var flag=false;
						for (var i = 0;i < len; i++) {
							if(buyer_mmg.row(i)['isEffective']=="1"){
								flag=true;
							}
						}
						if(!flag){
							PUI.MessageBox.alert("至少要有一个有效委托方!");
							return ;
						}
					}else{
						PUI.MessageBox.alert("至少要有一个有效委托方!");
						return ;
					}
				}
				//添加审批意见数据
				var _sugItem= null;
				if (null!=sug_mmg && null != sug_mmg.row(0) && _sugItems!=null){
					var len =sug_mmg[0].rows.length;
					if(len==0){
						PUI.MessageBox.alert("请补充评审意见信息!");
						return ;
					}
					for (var i = 0;i < len; i++) {
						for (var j = 0; j < _sugItems.length; j++) {
							_sugItem  = _sugItems[j];
							params.push({
								name: 'creditEntity.creditResultSugList[' + i + '].' + _sugItem,
								value: sug_mmg.row(i)[_sugItem]
							});
						}
					}
				}else{
					PUI.MessageBox.alert("请补充评审意见信息!");
					return ;
				}
			}
			PUI.MessageBox.show({
				title: "提交审批",
				content: "你确定要提交审批吗？",
				type: "alert",
				buttons: [{ value: "是" },{ value: "否" }],
				success: function (result) {
				   if (result == "是") {
						$.post("xascf/quota/quotaSet.shtml",params,function(data){
							PUI.MessageBox.info(data);
							//返回授信额度设定列表
							Menu.forward("xascf/credit/jsp/quotaSetList.jsp"); 
						},"json");
				   }
			    }
			});
		}
	};
}();
$(document).ready(function(){
	ApprovaelFancingQuotaEdit.jsBond();
});