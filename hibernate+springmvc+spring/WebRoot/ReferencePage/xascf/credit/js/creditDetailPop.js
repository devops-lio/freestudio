var CreditDetailPop=function(){
	return {
		/**
		 * 授信详细
		 * @returns
		 */
		creditDetail:function(creditNo){
			$.post("xascf/credit/creditDetail.shtml",{"creditNo":creditNo},function(data) {  
				$("#creditDetailContent").html(data);
				$("#creditDetail").popup({md:true});
			}); 
		},
		
	};
}();

		