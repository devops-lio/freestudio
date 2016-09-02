$(document).ready(function(){
	PUI.plugin.init({},$("#details_form"));
	sns.valid.init($("#details_form"));

}); 



var ComapanyDetails = function() {
	return {
		popClose: function() { 
			alert()
			$("#pop_up_delay").popup({display:false});
			
		}  
	};
}();