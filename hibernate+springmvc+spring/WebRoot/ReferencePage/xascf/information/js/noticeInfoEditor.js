 var editor;
 $(document).ready(function(){
	
	 PUI.plugin.init({}, $("#noticeInfoEditorForm"));
		sns.valid.init($("#noticeInfoEditorForm"));
	if(CKEDITOR.instances['contect']){ //判断 I_ZTText 是否已经被绑定
		CKEDITOR.remove(CKEDITOR.instances['contect']); //如果绑定了就解绑定
	}
	editor = CKEDITOR.replace('contect',{width:800,height:350});
	if($("#isTop").val()=="1"){
		$('#isTopCheck').iCheck('check');
	}
//	CKFinder.setupCKEditor(editor,'ckfinder/');
	
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
  
var noticeInfoEditor = function() {
	return {
		save :function (){
			if(!$("#xascfCheck").is(":checked") && !$("#jimiCheck").is(":checked"))
			{
				PUI.MessageBox.info("显示系统不能为空!");
				return ;
			}
			var contet=editor.getData();
			if (!$("#noticeInfoEditorForm").isValid()) {
					return;
			}
			if(contet==''){
				PUI.MessageBox.info("内容不能为空!");
				return;
			}
			$("#noticeContent").val(contet);
			//显示系统
			var showingSystem ="";
			if($("#xascfCheck").is(":checked"))
				showingSystem+="xascf,";
			if($("#jimiCheck").is(":checked"))
				showingSystem+="jimi,";
			$("#showingSystem").val(showingSystem.substring(0,showingSystem.length-1));
			
			$.post("xascf/information/noticeInfo/save.shtml",$("#noticeInfoEditorForm").serialize(),function(data){
				var message=data;
				if(message.result){
					noticeInfoEditor.clear();
					Menu.forward('xascf/information/jsp/noticeInfoList.jsp');
				}
				PUI.MessageBox.info(message.msg);
			},"json");
			
		},
		/**清空**/
		clear : function(){
			CKEDITOR.instances.contect.setData('');
			PUI.util.resetForm($("#noticeInfoEditorForm"));
		},
		/**清空**/
		back : function(){
			Menu.forward('xascf/information/jsp/noticeInfoList.jsp');
		}
	}
}();