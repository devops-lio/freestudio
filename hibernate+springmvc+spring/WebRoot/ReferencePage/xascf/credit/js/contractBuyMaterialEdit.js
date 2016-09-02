$(document).ready(function(){
	var allHeight=$("#tabwin_buyMaterail_content").height();
	var tableHeight=$("#buyMaterial").height();
	$("#eidtMaterialBtn").css('margin-top',(allHeight-tableHeight-100)+'px');
});


var ContractBuyMaterailEdit=function(){
	return {
		//保存信息至数据库中
		addMaterial :function(){
			var param=new Array();
			var i=0;
			var contractPid=$("#fancingContractModelPid").val();
			var materialUpload = true;
			$("#buyMaterial").find("tr").each(function(j){ 
				if(j==0){
					return;
				}     
				var fileName=$(this).find("input[name='filename']").val();
				if(fileName!=undefined && fileName!=null && fileName!=""){
					param.push({
						name: 'contractBuyMaterialList[' + i + '].fileName',
						value: fileName
					});  
				} else {
//					//如果文件名为空而且是必输的则提示
					var typeName = $(this).find("td[id*='typeName']").text().trim();
					if(typeName.indexOf("*")>-1)
					{		
						PUI.MessageBox.alert("材料 "+typeName.replace("*","")+" 不能为空");
						materialUpload = false;
						return false;
					}
				}
				
				var fileFalg=$(this).find("input[name='fileFalg']").val();
				if(fileFalg!=undefined && fileFalg!=null && fileFalg.length>0){
					param.push({
						name: 'contractBuyMaterialList[' + i + '].fileFalg',
						value: fileFalg
					});   
				}else{
					return;
				} 
				
				var materialPid=$(this).find("input[name='materialPid']").val();
				if(materialPid!=undefined && materialPid!=null){
					param.push({
						name: 'contractBuyMaterialList[' + i + '].materialPid',
						value: materialPid
					}); 
				}
				i++;
			  });
			param.push({name:'contractBuyPid',value:$("#contractBuyPid").val()});
			param.push({name:'contractPid',value:contractPid});
			  //如果没有上传必填的文件
			  if(!materialUpload)
				return;
			  $.post("xascf/credit/contractbuyRel/saveBuyMaterialList.shtml",param,function(data){
					var res=data.split(',');
//					PUI.MessageBox.info(res[0]);
					if(res[0].indexOf("成功")>0){
						popCancleById('tabwin_buyMaterail');
					}
				},"json");
			
		},
		removeBuyMaterial:function(index,thisA,flag){
		 	PUI.MessageBox.show({
			    title: "删除附件",
			    content: "你确定要删除该附件吗？",
			    type: "confirm",
			    buttons: [{ value: "是" },{ value: "否" }],
			    success: function (result) {
			        if (result == "是") {
			        	$(thisA).parent().hide();
			        	var fileName = $(thisA).prev().html();
			        	var $preFileName = $("#filename_"+index);
			        	var $preFlag = $("#flag_"+index);
			        	var preFileName = $preFileName.val();
			        	var preFlag = $preFlag.val();
			        	if(preFileName.indexOf(",")<0){//如果没有逗号，证明只有一个附件
			        		$preFileName.val(preFileName.replace(fileName,"")); 
							$preFlag.val(preFlag.replace(flag,"")); 
			        	} else{
			        		if(preFileName.indexOf(fileName) == 0)
				        	{   		
								$preFileName.val(preFileName.replace(fileName+",","")); 
								$preFlag.val(preFlag.replace(flag+",","")); 
				        	} else {
				        		$preFileName.val(preFileName.replace(","+fileName,"")); 
								$preFlag.val(preFlag.replace(","+flag,"")); 
				        	}
			        	}
		        	}
		    	}
			})
		},
		/**
		 * 企业材料文件上传事件
		*/
		uploadBuyMaterialFile:function(fileType,index){   
			var parameterArray = new Array();
			var date=new Date();
			parameterArray.push(index);
			parameterArray.push("filename_"+index);
			parameterArray.push("flag_"+index);
			parameterArray.push("fileDiv_"+index);
			
			pluploadUtil.init("/XA_SCF/xascf/util/plupload.shtml",
				{type :fileType , requestName:$("#memberNo").val(), whatFile:"customer",
				materialDefinePid:$("#materialDefinePid_"+index).val()},
				"",ContractBuyMaterailEdit.buyMaterialEditBack,parameterArray);
		},
		buyMaterialEditBack: function(fileArray,parameter){ 
			var index = parameter[0];
			var fileName = fileArray[2];
			var flag = fileArray[3];
			var $preFileName = $("#"+parameter[1]);
			var $preFlag = $("#"+parameter[2]);
			//填充隐藏的文件名和标示
			var preFileName = $preFileName.val();
			var preFlag = $preFlag.val();
			if(preFileName =="")
			{
				$preFileName.val(fileName);
				$preFlag.val(flag);
			} else {	
				$preFileName.val(preFileName+","+fileName);
				$preFlag.val(preFlag+","+flag);
			}
			//生成页面上下载删除功能的div
			var fileNameArray = fileName.split(",");
			var urlArray = fileArray[0].split(",");
			var flagArray = flag.split(",");
			var length = fileNameArray.length;
			for(var i=0;i<length;i++)
			{
				var thisFileName = fileNameArray[i];
				$("#"+parameter[3]).append("<span><a target='_blank' id='href_"+index+"' name='urlname_"+index+
					"' href='#' onclick='FileUtil.downLoad(\""+urlArray[i]+"\",\""+thisFileName+"\")'>"+thisFileName+"</a>"+
					" <a style='cursor:pointer' title='删除' id='remove_"+index+"' " +
					"class='buttonRomve' onclick='ContractBuyMaterailEdit.removeBuyMaterial("+index+",this,"+flagArray[i]+")'>&nbsp;&nbsp;</a></span> "
				);	
			}
		}
		 
	};
}();

		