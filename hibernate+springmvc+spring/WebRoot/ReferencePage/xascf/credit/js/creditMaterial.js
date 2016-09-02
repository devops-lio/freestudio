$(document).ready(function(){
	$.post("xascf/creditApply/findCreditMaterial.shtml",function(data){
		var html="";
		n=data.length;
		for(var i=0;i<data.length;i++){
			var tt='';
			if(data[i].isRequired=='1'){
				tt='<span style="color: red;">*</span>';
			}
			html+='<tr>'+
					'<td id="typeName_'+i+'" style="text-align: left;width:250px;vertical-align: middle;font-size:12px">'+tt+data[i].typeName+
						'<input type="hidden" id="materialDefinePid'+i+'" value="'+data[i].pid+'" />'+
						'<input type="hidden" id="flag'+i+'"/>'+
						'<input type="hidden" id="newName'+i+'" />'+
						'<input type="hidden" id="url'+i+'" />'+
					'</td>'+
					'<td style="text-align: center; width:90px;vertical-align: middle;font-size:12px">'+
						'<input type="button"  onclick="CreditMaterial.upload('+i+');" value="上传"  style="background-color:#FFF; border:1px solid #CDCDCD;height:24px; width:64px;" />'+
					'</td>'+
					'<td id="td'+i+'" style="text-align: center; width:auto;vertical-align: middle;font-size:12px">'+
					'</td>'+
					'<td style="text-align: center; width:200px;font-size:12px">'+
						'<div class="control-group full">'+
							'<div class="controls time" style="margin-top:6px;margin-left:10px;margin-right:10px;">'+
								'<input style="margin-bottom:0px;"  type="text" data-required="有效时间不能为空！" id="timeStr'+i+'" >'+
								'<i class="date" data-format="yyyy-MM-dd"></i>'+
							'</div>'+
						'</div>'+
					'</td>'+
				 '</tr>';
		}
		$("#creditMaterial").append(html);
		
	},"json");
});
var flag="";

var CreditMaterial = function(){	
	return{
		//上传文件
		upload : function(idIndex){
			var date=new Date();
			flag=date.getTime();
			var parameterArray = new Array();
			parameterArray.push("url"+idIndex);
			parameterArray.push("newName"+idIndex);
			parameterArray.push("td"+idIndex);
			parameterArray.push("flag"+idIndex);
			pluploadUtil.init(
				   "/XA_SCF/xascf/util/plupload.shtml",
				   {type:"授信材料",  requestName:$("#memberName").val(), flag:flag, whatFile:"credit",materialDefinePid:$("#materialDefinePid"+idIndex).val()},
				   {title : "Image files", extensions : "jpg,gif,png,doc"},
				   CreditMaterial.fillUrlAndName,parameterArray
			);		
		},
		//上传回调函数
		fillUrlAndName:function(array,parameter){
			$("#"+parameter[0]).val(array[0]);
			$("#"+parameter[1]).val(array[1]);
			
			
			var html="";
			var newNames=array[1];
			var newName=newNames.split(",");
			var names=array[2];
			var name=names.split(",");
			var urlArray = array[0].split(",");
			for(var i=0;i<name.length;i++){
				if(name[i]!=""){
					html+='<span id="'+newName[i]+'"><a href="#" style="text-align: center;" onclick="FileUtil.downLoad(\''+urlArray[i]+'\',\''+name[i]+'\')">'+name[i]+'</a>'+
				     	  '<a title="删除"  class="buttonRomve" onclick="CreditMaterial.removeTr(this,\''+newName[i]+'\')">&nbsp;&nbsp;</a></span>';
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
						$.post("xascf/creditApply/deleteMaterialByReName.shtml",{"reName":reName},function(data){
							if(data=="删除成功！")
								$(thisa).parent().hide();
							PUI.MessageBox.info(data);
						},"json")
			        }
		    	}
			})
		}
		
		
	};
}();
