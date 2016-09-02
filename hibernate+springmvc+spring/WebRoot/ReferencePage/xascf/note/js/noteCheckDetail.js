 $(document).ready(function(){
 	PUI.plugin.init({},$("#approdPass_form"));
	sns.valid.init($("#approdPass_form"));
	$("#zhangqi").find(".chosen-container").css("float",'right').css("width",'45%');
	$("#approvalNext").val($("#backTo").find("option:selected").text());
	//是否通过下拉框change事件
	$("#approvaelPass").bind("change", function(){
		var v=$(this).val();
		if(v=="N"){
			$("#backDiv").show();
			$("#fancingSet").hide();
		}else {
			$("#backDiv").hide();
			$("#fancingSet").show();
		}
	});
	$("#rebackType").bind("change", function(){
		var val=$(this).val();
		if(val=='1'){
			$("#lxjszq").hide();
		}else
			$("#lxjszq").show();
	});
	
});
 var listType=$("#listType").val();
//票据有效期
 var billType=$("#billType").val();
var NoteCheckDetail = function() {
	return {
		backChange:function(){
			$("#approvalNext").val($("#backTo").find("option:selected").text());
		},
		rebackList:function(){
				Menu.forward("xascf/note/jsp/noteCheckList.jsp"); 
		},
		save :function(){
			if (!$("#approdPass_form").isValid()) {
				return ;
			}
			var params = $("#approdPass_form").serializeArray();
			$.post("xascf/notePool/saveNoteCheck.shtml",params,function(data){
					PUI.MessageBox.info(data);
					if(data.indexOf('成功')>=0)
						Menu.forward("xascf/note/jsp/noteCheckList.jsp"); 
			},"json");
		}
	};
}();