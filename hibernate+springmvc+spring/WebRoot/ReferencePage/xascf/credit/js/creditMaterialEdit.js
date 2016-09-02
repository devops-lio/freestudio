$(document).ready(function(){
	
});
var flag="";

var CreditMaterialEdit = function(){	
	return{
		//上传文件
		upload : function(idIndex){
			var memberPid=$("#memberPid").val();
			if(memberPid==""){
				PUI.MessageBox.alert("请先选择申请会员！");
				return;
			}
			var date=new Date();
			flag=date.getTime();
			var parameterArray = new Array();
			parameterArray.push("url"+idIndex);
			parameterArray.push("newName"+idIndex);
			parameterArray.push("td"+idIndex);
			parameterArray.push("flag"+idIndex);
			pluploadUtil.init(
				   "/XA_SCF/xascf/util/plupload.shtml",
				   {type:"shouxincailiao",  requestName:$("#memberPid").val(), flag:flag, whatFile:"credit",materialDefinePid:$("#materialDefinePid"+idIndex).val()},
				  "", CreditMaterialEdit.fillUrlAndName,parameterArray
			);		
		},
		//上传回调函数
		fillUrlAndName:function(array,parameter){
			$("#"+parameter[0]).val(array[0]);
			$("#"+parameter[1]).val(array[1]);
			
			var html="";
			var urls=array[0];
			var url=urls.split(",");
			var newNames=array[1];
			var newName=newNames.split(",");
			var names=array[2];
			var name=names.split(",");
			for(var i=0;i<name.length;i++){
				if(name[i]!=""){
					html+='<span id="'+newName[i]+'"><a  href="#" onclick="FileUtil.downLoad(\''+url[i]+'\',\''+name[i]+'\')" style="text-align: center;">'+name[i]+'</a>'+
				     	  '<a title="删除"  class="buttonRomve" onclick="CreditMaterialEdit.removeTr(this,\''+newName[i]+'\')">&nbsp;&nbsp;</a></span>';
				}
			}
			
			$("#"+parameter[2]).html($("#"+parameter[2]).html()+html);
			$("#"+parameter[3]).val($("#"+parameter[3]).val()+","+flag);
			
		},
		//移除图片
		removeTr:function(thisa,reName){
			PUI.MessageBox.show({
			    title: "删除附件",
			    content: "你确定要删除该附件吗？",
			    type: "confirm",
			    buttons: [{ value: "是" },{ value: "否" }],
			    success: function (result) {
			        if (result == "是") {
						$.post("xascf/creditApply/deleteMaterial.shtml",{"reName":reName},function(data){
							if(data=="删除成功！")
			//					$("#"+reName).hide();
								$(thisa).parent().hide();
							PUI.MessageBox.info(data);
						},"json")
			        }
		    	}
			})
		}
		
		
	};
}();
