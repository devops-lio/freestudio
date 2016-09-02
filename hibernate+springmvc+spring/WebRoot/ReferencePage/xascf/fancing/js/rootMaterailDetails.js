 $(document).ready(function(){
	 $("#checkAll").bind('click', function() {
			var ch=$("#checkAll").attr('checked');
	  		if(ch){
	  			 $("input[name='rootType']").each(function(){
	  				 $("input[name='rootType']").attr("checked","checked"); 
	  			 });
	  		}else{
	  			 $("input[name='rootType']").each(function(){
	  				 $("input[name='rootType']").removeAttr("checked","checked"); 
	  			 });
	  		}
		});
	 $("input[name='rootType']").bind('click', function() {
		 var ch=$(this).attr('checked');
		 if(!ch){
			 $("#checkAll").removeAttr('checked');
		 }
	 });
	
});
var RootMaterailDetails = function() {
	return {
		addRootType :function(){
			var temp= $("#showNewAdd").css("display");//是否隐藏 
			if(temp=='none')
				$("#showNewAdd").attr('style','display:inline');
			else
				$("#showNewAdd").attr('style','display:none');
		},
		saveRootType:function(){
			if (!$("#addRootType_form").isValid()) {
				return ;
			}
			var myDate = new Date();
			$("#rootTypeCode").val(myDate.getTime());
			$.post("xascf/baseData/save.shtml",$("#addRootType_form").serialize(),function(data){
				if(data.indexOf('成功')>=0){
					$("#tabwin_add_root").popup({display:false});
					$.post("xascf/fancingMaterail/toRootMaterailjsp.shtml",function(data){
						$("#tabwin_add_content_root").html(data);
						$("#tabwin_add_root").popup({md:true});
					},"html");
				}
			},"json");
		},
		//取消关闭
		otherRootCancle : function(){
			$("#tabwin_add_root").popup({display:false});
		},
		addOtherType :function(){
			var newArray = new Array();
			$("input[name='rootType']").each(function(){
				var ch=$(this).attr('checked');
				if(ch){
					var date=(new Date()).getTime();
					var val=$(this).attr('value');
					var ids=$(this).attr('id');
					var requestType=$("#requestType").val();
					if(requestType=='1'){
						var html='<tr>' +
						'<td style="text-align: center;color: red;"  onmouseover="ComapnyRootMaterialInfo.addRomove(this,\''+val+'\')">'+val+'<input type="hidden" id="type_'+date+'"  value="'+val+'"/>'+
						'</td>' +
						'<td style="text-align: center; ">'+
						'<div class="controls" style="width:350px;">'+
						'<input type="text" name="textfield" '+
						' id="textfielid_'+date+'" style="height:22px; border:1px solid #cdcdcd; width:180px;margin-bottom: 0px;" />'+
						'<input type="button"  value="浏览..." class="btn" style="background-color:#FFF;margin-left: 5px; border:1px solid #CDCDCD;height:24px; width:64px;"/>'+
						'<input type="file" name="file" class="file"  id="file_'+date+'" size="28" style="height:25px;width:80px;"'+
							'onchange="ComapnyRootMaterialInfo.fileUpLoad(\''+date+'\')" contenteditable="false" />	'+
						'</div></td>' +
						'<td style="text-align: center;" id="upLoadedName_'+date+'"><input type="hidden" name="type_ids"  value="'+val+'"/></td>' +
						'</tr>';
						$("#rootMaterialTable").before(html);
						rootMaterialInfo.push({materialType:val,materialRoot:'3',materialFileName:'',materialUrl:''});
					}else{
						var html='<tr>' +
						'<td style="text-align: center;color: red;"  onmouseover="PersonRootMaterialInfo.addRomove(this,\''+val+'\')">'+val+'<input type="hidden" id="type_'+date+'"  value="'+val+'"/>'+
						'</td>' +
						'<td style="text-align: center; ">'+
						'<div class="controls" style="width:350px;">'+
						'<input type="text" name="textfield" '+
						' id="textfielid_'+date+'" style="height:22px; border:1px solid #cdcdcd; width:180px;margin-bottom: 0px;" />'+
						'<input type="button"  value="浏览..." class="btn" style="background-color:#FFF;margin-left: 5px; border:1px solid #CDCDCD;height:24px; width:64px;"/>'+
						'<input type="file" name="file" class="file"  id="file_'+date+'" size="28" style="height:25px;width:80px;"'+
							'onchange="PersonRootMaterialInfo.fileUpLoad(\''+date+'\')" contenteditable="false" />	'+
						'</div></td>' +
						'<td style="text-align: center;" id="upLoadedName_'+date+'"><input type="hidden" name="type_ids"  value="'+val+'"/></td></td>' +
						'</tr>';
						$("#rootMaterialTable").before(html);
						personRootMaterialInfo.push({materialType:val,materialRoot:'3',materialFileName:'',materialUrl:''});
					}
				}
 			 });
			$("#tabwin_add_root").popup({display:false});
		}
	};
}();