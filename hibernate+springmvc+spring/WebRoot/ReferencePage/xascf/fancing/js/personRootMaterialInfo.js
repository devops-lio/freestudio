$(document).ready(function(){
	 var orderNo=$("#facingOrderNo").val();
	 if(orderNo!=''){
		 $.post("xascf/material/page.shtml",{fancingOrderNo:orderNo},function(data){
			var lostArry= rootMaterialInfo;
			rootMaterialInfo=new Array();
			rootMaterialInfo=data.data.list;
			},"json");
	 }
});
var personRootMaterialInfo=[
	 {materialType:'户口本',materialRoot:'1',materialFileName:'',materialUrl:''},
	 {materialType:'房产证',materialRoot:'1',materialFileName:'',materialUrl:''},
	 {materialType:'车辆行驶证',materialRoot:'1',materialFileName:'',materialUrl:''},
	 {materialType:'结婚证(单身证明)',materialRoot:'1',materialFileName:'',materialUrl:''},
	 {materialType:'主要银行账户流水',materialRoot:'1',materialFileName:'',materialUrl:''}
];
var PersonRootMaterialInfo = function(){	
	return{
		//移除本行
		removeTr : function(val,val2){
			$(val2).parent().parent().remove(); 
			var requestType=$("#requestType").val();
			for(var i=0;i<personRootMaterialInfo.length;i++){
				 if(val==personRootMaterialInfo[i].materialType){
					 personRootMaterialInfo.splice(i,1);
				 }
			 }
		},
		//鼠标悬置到td
		addRomove:function(val,val2){
			var f=$(val).find("a").hasClass("buttonRomve");
			if(!f)
				$(val).append('<a class="buttonRomve" onclick="PersonRootMaterialInfo.removeTr(\''+val2+'\',this)">&nbsp;&nbsp;</a>');
		},
		editRootType :function(){
			var param="";
			$("input[name='type_ids']").each(function(){
				var val=$(this).attr('value');
				param+=val+',';
			});
			$.post("xascf/baseData/toRootMaterailjsp.shtml",{ids:param},function(data){
				$("#tabwin_add_content_root").html(data);
				$("#tabwin_add_root").popup({md:true});
			},"html");
		},
		/**
		 * 上传文件
		 */
		upLoadChange :function(val){
			var src=$("#file_"+val).val();
			if(!PersonRootMaterialInfo.validateFile(val)){
				return;
			}
			$("#textfielid_"+val).val(src);
		},
		fileUpLoad :function(val){
			var requestName=$("#customerName").val();
			if(requestName==''){
				PUI.MessageBox.alert('请选择会员！');
				return;
			}
			var src=$("#file_"+val).val();
			if(!PersonRootMaterialInfo.validateFile(val)){
				return;
			}
			$("#textfielid_"+val).val(src);
				$.ajaxFileUpload({
					url:'xascf/util/upload.shtml?type=基本材料&requestName='+requestName,
					secureuri : false,
					fileElementId : 'file_'+val,
					dataType : 'text',
					type:'post',
					success: function (data, status)
					{
						var message=data.message;
						if(message.indexOf('成功')>=0){
							 fileName=data.fileName;
							 url=data.url;
							 var typeval=$("#type_"+val).val();
							 var item={
										materialType:typeval,
										materialRoot:'1',
										materialFileName:fileName,
										materialUrl:url
								}
							 var f=false;
							 for(var i=0;i<personRootMaterialInfo.length;i++){
								 if(typeval==personRootMaterialInfo[i].materialType){
									 f=true;
									 var item2={
												materialType:typeval,
												materialRoot:personRootMaterialInfo[i].materialRoot,
												materialFileName:fileName,
												materialUrl:url
										}
									 personRootMaterialInfo.splice(i,1,item2);
								 }
							 }
							if(!f)
								personRootMaterialInfo.push(item);
							var html='<a target="_blank"  href="xascf/util/download.shtml?fileName='+fileName+'&url='+url+'">'+fileName+'</a>';
							$("#upLoadedName_"+val).empty();
							$("#upLoadedName_"+val).html(html);
							
						}else{
							PUI.MessageBox.alert(message);
						}
					},
					error: function (data, status, e)
					{
						alert(e);
					}
				});
			
		},
		// 上传文件格式校验
		validateFile:function(val){
			var fileName = $("#file_"+val).val();
			var fileType = fileName.substring(fileName.lastIndexOf(".")+1);
			if (fileType != "doc" && fileType != "docx" && fileType != "gif"&& fileType != "jpg" && fileType != "png" && fileType != "bmp"){
				PUI.MessageBox.alert("请上传Word文件或者扫描图片文件!");
				return false;				
			} else {
				return true;
			}

		}
	};
}();
