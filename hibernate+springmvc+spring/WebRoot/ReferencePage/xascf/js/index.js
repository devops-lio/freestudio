$("#sidebar").ready(function() {
	refreshSidebar();
	 /***内部欢迎主页*/
    $.post("xascf/jsp/indexWelcome.jsp", function(data){
    	var path = '<li><i class="icon-home home-icon"></i><a href="javascript:void(0)" >主页</a></li>' ;
		$("ul.breadcrumb").html(path);
		$("#xascfMainPanel").empty();
		$("#xascfMainPanel").append(data);
		
	});
});
/**
 * 合同详情
 */
function contractDetail(val){
	$.post("xascf/fancing/contractDetail.shtml",{contractNo:val},function(data){  
		$("#contractDetailPop").html(data);
		$("#tabwin_add_contractDetailPop").popup({md:true});
	});
};
/**
 * 合同委托方附加材料详情
 */
function contractBuyMaterial(buyPid,contractPid){
	$.post("xascf/credit/contractbuyRel/buyMaterialDetailPop.shtml",{'contractBuyPid':buyPid,'contractPid':contractPid},function(data){  
		$("#tabwin_buyMaterail_content").html(data);
		$("#tabwin_buyMaterail").popup({md:true});
	});
};
//取消关闭
function popCancle (val){
	$("#tabwin_add_"+val).popup({display:false});
	if(val=='evaluateReportPop'){
		$("#evaluateReportContent").html();
	}
};
//取消关闭
function popCancleById (val){
	$("#"+val).popup({display:false});
};

//授信详细关闭
function creditCancle(){
	$("#creditDetail").popup({display:false});
}