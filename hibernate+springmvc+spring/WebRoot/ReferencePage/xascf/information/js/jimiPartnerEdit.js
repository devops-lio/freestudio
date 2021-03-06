 $(document).ready(function(){ 
	PUI.plugin.init();
	if(CKEDITOR.instances['contect']){ //判断 I_ZTText 是否已经被绑定
		CKEDITOR.remove(CKEDITOR.instances['contect']); //如果绑定了就解绑定
	}
	if($("#isTop").val()=="1"){
		$('#isTopCheck').iCheck('check');
	}

	$("#isTopCheck").on("ifChecked", function(event){
		  $("#isTop").val("1");
	}).on("ifUnchecked", function(event){
		  $("#isTop").val("0");
	});
	
	//显示系统根据值选择
	var showingSystem =$("#showingSystem").val();
	if(showingSystem.indexOf("xascf")>-1)
		$("#xascfCheck").iCheck('check');
	if(showingSystem.indexOf("jimi")>-1)
		$("#jimiCheck").iCheck('check'); 

});	
  
var partnerEditor = function() {
	return {
		save :function (){
			if(!$("#xascfCheck").is(":checked") && !$("#jimiCheck").is(":checked"))
			{
				PUI.MessageBox.info("显示系统不能为空!");
				return ;
			}
			if (!$("#partnerEditorForm").isValid()) {
					return;
			}
//			if(contet==''){
//				PUI.MessageBox.info("内容不能为空!");
//				return;
//			}
			//显示系统
			var showingSystem ="";
			if($("#xascfCheck").is(":checked"))
				showingSystem+="xascf,";
			if($("#jimiCheck").is(":checked"))
				showingSystem+="jimi,";
			$("#showingSystem").val(showingSystem.substring(0,showingSystem.length-1));
			
			$.post("xascf/information/noticeInfo/savePartnerPic.shtml",$("#partnerEditorForm").serialize(),function(data){
				var message=data;
				if(message.result){
					partnerEditor.clear();
					Menu.forward('xascf/information/jsp/jimiPartnerList.jsp');
				}
				PUI.MessageBox.info(message.msg);
			},"json");
			
		},
		/**清空**/
		clear : function(){
			PUI.util.resetForm($("#partnerEditorForm"));
			//CKEDITOR.instances.contect.setData('');
		},
		/**清空**/
		back : function(){
			Menu.forward('xascf/information/jsp/jimiPartnerList.jsp');
		},
		
		/**
		 * 图片文件上传
		*/
		upLoadMaterials: function(){  
			var parameterArray = new Array();
			parameterArray.push("picUrl");
			parameterArray.push("picName"); 
			pluploadUtil.init("/XA_SCF/xascf/util/plupload.shtml",
					{type : "information", requestName:"picturePartner", flag:"", whatFile:"pic"},
					"",partnerEditor.backBankFileInfo,parameterArray,false);
		}, 
		backBankFileInfo: function(fileArray,parameter){  
			$("#"+parameter[0]).val(fileArray[0]);
			$("#"+parameter[1]).val(fileArray[2]);
		}
	}
}();