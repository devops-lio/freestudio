$(document).ready(function(){
	
});

var FileUtil = function(){	
	return{
	
		/**下载*/
		downLoad:function(fileUrl,oldFileName){
			var type=fileUrl.substring(fileUrl.lastIndexOf(".")+1);
			if(type=="jpg"||type=="gif"||type=="png"){
				$.post("xascf/util/getFileToShow.shtml?fileUrl="+fileUrl+'&oldFileName='+oldFileName,function(data) { 
					var url=data;
					$("#tabwin_picture").popup({md:true});
					$("#downPicture").attr("src",url)+'?'+(new Date()).getTime();
				})
			}else{
				download("xascf/util/getFile.shtml?fileUrl="+fileUrl+'&oldFileName='+oldFileName);
			}
			
		},
		/**查看*/
		downLoadToShow:function(fileUrl,oldFileName){
			$("#tabwin_picture").popup({md:true});
			var type=fileUrl.substring(fileUrl.lastIndexOf(".")+1);
//			if(type=="jpg"||type=="gif"||type=="png"){
//				$("#downPicture").attr("src","xascf/util/getFile.shtml?fileUrl="+fileUrl+'&oldFileName='+oldFileName)+'?'+(new Date()).getTime();;
//			}else{
//				download("xascf/util/getFile.shtml?fileUrl="+fileUrl+'&oldFileName='+oldFileName);
//			}
			
		},
		//显示图片
		pup:function(){
			$("#tabwin_picture").popup({md:true});
		},
		//图片加载失败显示信息
		pupError:function(){
			alert("图片加载失败");
		}
		
		
	};
}();
