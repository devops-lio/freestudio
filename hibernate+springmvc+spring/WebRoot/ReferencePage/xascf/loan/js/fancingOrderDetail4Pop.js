

var fancingOrderDetail4Pop=function(){
	return{
		/***
		 * 查看放款详情
		 */
		fancingDetail : function(fancingOrderNo){
			$.post("xascf/fancing/fancingDetail.shtml",{orderNo:fancingOrderNo},function(data){
				$("#fancingOrderDetailContent").html(data);
				
				//详细页面隐藏页面统计数据
				$("#loanStat1").hide();
				$("#loanStat2").hide();
				
				$("#fancingOrderDetailPop").popup({md:true});
			});

		},
		/***
		 * 查看再融资详情
		 */
		agFancingDetail : function(val){
			$.post("xascf/fancing/agFancingPop.shtml",{agfancingOrderNo:val},function(data){
				$("#tabwin_add_content_agFancingDetailTab").html(data);
				$("#tabwin_add_agFancingDetailTab").popup({md:true});
			});
			
		},
		fancingDetailClosed:function(){
			$("#fancingOrderDetailPop").popup({display:false});
		}
		
	};
}();
