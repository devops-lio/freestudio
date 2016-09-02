 $(document).ready(function(){
 	PUI.plugin.init();
 	sns.valid.init($("form"));
 	$("#approvaelPass").on("change",
 		function(){
	 		var v=$(this).val();
			if(v=="N"){
				$("#backDiv").show();
				$("#scoreDiv").hide();
			}else {
				$("#backDiv").hide();
				$("#scoreDiv").show();
			}
 		}
 	);
});


var creditScoringDetail = function() {
	return {
		seeLook:function(id){
			$("#"+id+"Detail").popup({md:true});
		},
		reScoring: function(){
			var templatePid = $("#templatePid").val();
			var creditNo = $("#creditNo").html();
			var memberNo = $("#memberNo").html();
			if(templatePid =="")
			{			
				PUI.MessageBox.info("请选择模板");
				return;
			}
			$.post("xascf/credit/creditScoring/reScoring.shtml",{"templatePid":templatePid,"creditNo":creditNo,"memberNo":memberNo}, function(data) {
				$("#templateIndexDivId").html(data);
				initScoringEvent();
				$(".popaclass").hover(
						function() {
							$(this).next().show("fast");
						}, 
						function() {
							$(this).next().hide("fast");
						}
					);
			});
		},
		returnList: function(){
			Menu.forward('xascf/credit/jsp/creditScoringList.jsp');
		},
		saveScoring : function(){
			if (!$("#evaluateResultForm").isValid()) {
				return;
			}
			PUI.MessageBox.show({
				title: "提交评分审批",
				content: "你确定要提交评分审批吗？",
				type: "alert",
				buttons: [{ value: "是" },{ value: "否" }],
				success: function (result) {
				   if (result == "是") {
				   		$("#approvalNext").val($("#backTo").find("option:selected").text());
				   		var params = $("#evaluateResultForm").serializeArray();
						params.push({ //评估对象逻辑ID
							name: 'evaluateResultModel.evaluateObjectPid',
							value: $("#cretitApplyPid").val()
						});
						params.push({ //评估对象编码
							name: 'evaluateResultModel.evaluateObjectNo',
							value: $("#creditNo").val()
						});

						params = pushResultItemToParam(params);
				   		$.post("xascf/rm/evaluateResult/saveEvaluateResult.shtml",params,function(data){
				   			var message=data;
							if(message.result){
								creditScoringDetail.returnList();
							}
							PUI.MessageBox.info(message.msg);
				   		},"json");
				   }
			    }
			});


		}
	};
}();