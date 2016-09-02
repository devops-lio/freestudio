var pluploadUtil = function(){
	return {
		init: function(url,params,filters,method,methodParameter,isMulti) {
			// Convert divs to queue widgets when the DOM is ready
			if(filters ==undefined || filters==null || filters=="")
				filters = {title : "所有文件", extensions : "*"};
			if(isMulti==undefined || isMulti==null || isMulti.length==0)
			{
				isMulti = true;
			}
			$("#uploader").pluploadQueue({
				// General settings
				runtimes : 'gears,flash,silverlight,browserplus,html5,html4',
				url : url,
				multipart_params: params,
				multi_selection: isMulti,
				max_file_size : '10mb',
				unique_names : true, //文件名是否重新生成唯一的名称
				chunk_size: '2mb',
				// Specify what files to browse for 格式：{title : "Image files", extensions : "jpg,gif,png"} 可设置多个，用逗号隔开,如
				//{title : "Image files", extensions : "jpg,gif,png"},  {title : "Zip files", extensions : "zip"}  
				filters : [
					filters
				],
				// Flash settings
				flash_swf_url : 'xascf/plupload/js/plupload.flash.swf',
				// Silverlight settings
				silverlight_xap_url : 'xascf/plupload/js/plupload.silverlight.xap',
				init : {
					FileUploaded: function(up, file, info){
						var jsonstr = eval("(" + info.response + ")");
						var result = jsonstr.result;
						if(result)
						{
	                        var url = jsonstr.url;
	                      	var $uploadFileUrls = $("#uploadFileUrls");
							$uploadFileUrls.val($uploadFileUrls.val()+url+",");
							
	                        var fileName = jsonstr.fileName;
	                        var $uploadFileNames = $("#uploadFileNames");
							$uploadFileNames.val($uploadFileNames.val()+fileName+",");
							
	                        var preFileName = jsonstr.preFileName;
	                        var $preFileNames = $("#preFileNames");
							$preFileNames.val($preFileNames.val()+preFileName+",");
							//标示
							var flag = jsonstr.flag;
	                        var $flags = $("#flags");
							$flags.val($flags.val()+flag+",");

						} else{
							var uploader = $('#uploader').pluploadQueue();
							uploader.stop();
							file.status = plupload.FAILED;
	                        var message = jsonstr.message;
							alert(message);
						}
					},
					FilesAdded: function (up, files) { 
						if(!isMulti)
						{
							$.each(up.files, function (i, file) {
									if (up.files.length <= 1) { return; } up.removeFile(file); });
						}
					},					
					ChunkUploaded : function(up, file, info){
						var jsonstr = eval("(" + info.response + ")");
						var result = jsonstr.result;
						if(!result)
						{
							var uploader = $('#uploader').pluploadQueue();
							uploader.stop();
							file.status = plupload.FAILED;
	                        var message = jsonstr.message;
						}
					},
					Error: function (up, args) {
                        //发生错误
                        if (args.file) {
                            alert('上传文件出错:' + args.file.name);
                        } else {
                            alert('错误：' + args);
                        }
                    }
				}
			});
			$("#tabwin_upload").popup({md:true});
			$("#uploadFileNames").val("");
			$("#uploadFileUrls").val("");
			$("#preFileNames").val("");
			$("#flags").val("");
			$('#uploadComplete').off("click");
			$('#uploadComplete').on("click", function(e) {
		        var uploader = $('#uploader').pluploadQueue();
		        if (uploader.files.length > 0) {
		        	if (uploader.files.length === (uploader.total.uploaded + uploader.total.failed)) {
		        		var uploadFileUrls = $("#uploadFileUrls").val();
		            	var uploadFileNames = $("#uploadFileNames").val();
		            	var preFileNames = $("#preFileNames").val();
		            	var flags = $("#flags").val();
		            	var uploadArray = new Array();
		            	uploadArray.push(uploadFileUrls.substring(0,uploadFileUrls.length-1));
		            	uploadArray.push(uploadFileNames.substring(0,uploadFileNames.length-1));
		            	uploadArray.push(preFileNames.substring(0,preFileNames.length-1));
		            	uploadArray.push(flags.substring(0,flags.length-1));
		            	if(methodParameter!=undefined && methodParameter!="" && methodParameter!=null)
		            		method(uploadArray,methodParameter);
		            	else
		            		method(uploadArray);
			        	$("#tabwin_upload").popup({display:false});
		        	} else{
		        		alert('请先上传文件.');
		        	}
		        } else {
					alert('请先选择文件.');
				}
	    	});
		}
	}
}();