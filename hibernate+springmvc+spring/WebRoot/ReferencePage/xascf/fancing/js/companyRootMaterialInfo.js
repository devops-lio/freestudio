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
var rootMaterialInfo=[
	 {materialType:'公司章程(含修正案)',materialRoot:'1',materialFileName:'',materialUrl:''},
	 {materialType:'贷款卡信息(卡号)',materialRoot:'1',materialFileName:'',materialUrl:''},
	 {materialType:'近两年的审计报告',materialRoot:'1',materialFileName:'',materialUrl:''},
	 {materialType:'近两年的收入明细',materialRoot:'1',materialFileName:'',materialUrl:''},
	 {materialType:'上季度财务报表',materialRoot:'1',materialFileName:'',materialUrl:''},
	 {materialType:'物流保险保单',materialRoot:'1',materialFileName:'',materialUrl:''},
	 {materialType:'法人代表身份证',materialRoot:'1',materialFileName:'',materialUrl:''},
	 {materialType:'实际控制人身份证',materialRoot:'1',materialFileName:'',materialUrl:''},
	 {materialType:'验资报告(实缴金额凭证)',materialRoot:'1',materialFileName:'',materialUrl:''}
  ];

var ComapnyRootMaterialInfo = function(){	
	return{
		//移除本行
		removeTr : function(val,val2){
			$(val2).parent().parent().remove(); 
			var requestType=$("#requestType").val();
			for(var i=0;i<rootMaterialInfo.length;i++){
				 if(val==rootMaterialInfo[i].materialType){
					 rootMaterialInfo.splice(i,1);
				 }
			 }
		},
		//鼠标悬置到td
		addRomove:function(val,val2){
			var f=$(val).find("a").hasClass("buttonRomve");
			if(!f)
				$(val).append('<a class="buttonRomve" onclick="ComapnyRootMaterialInfo.removeTr(\''+val2+'\',this)">&nbsp;&nbsp;</a>');
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
			if(!ComapnyRootMaterialInfo.validateFile(val)){
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
			if(!ComapnyRootMaterialInfo.validateFile(val)){
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
							 for(var i=0;i<rootMaterialInfo.length;i++){
								 if(typeval==rootMaterialInfo[i].materialType){
									 f=true;
									 var item2={
												materialType:typeval,
												materialRoot:rootMaterialInfo[i].materialRoot,
												materialFileName:fileName,
												materialUrl:url
										}
									 rootMaterialInfo.splice(i,1,item2);
								 }
							 }
							if(!f)
								rootMaterialInfo.push(item);
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
