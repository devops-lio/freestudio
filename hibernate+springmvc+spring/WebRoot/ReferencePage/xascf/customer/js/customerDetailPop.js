var customerDetailPop=function(){
	return {
		/**
		 * 会员详细信息
		 * @returns
		 */ 
		customerDetail:function(memberPid){    
			$.post("xascf/customer/comapanyToShow.shtml",{"memberPid":memberPid},function(data){    
				$("#customerDetailContent").html(data); 
				$("#customerDetail").popup({md:true});
			});  
		},
		popClose: function() { 
			$("#customerDetail").popup({display:false});
			
		}, 
		/**
		 * 委托方详细信息
		 * @returns
		 */ 
		buyerDetail:function(memberPid){    
			$.post("xascf/customer/buyerToShow.shtml",{"memberPid":memberPid},function(data){    
				$("#buyerDetailContent").html(data); 
				$("#buyerDetail").popup({md:true});
			});  
		},
		buyerPopClose: function() { 
			$("#buyerDetail").popup({display:false});
			
		}  
		
	};
}();

		