$(document).ready(function(){
	
	//初始化订单mmgrid
	$('#orderInfoJspTabBt').on('shown', function (e) {
		OrderInfo.orderGrid();		 		
	});
	$('#shipBillEditJspTabBt').on('shown', function (e) {
		ShipBillDetail.shipBillGrid();		 		
	});
	$('#shipTurnInfoJspTabBt').on('shown', function (e) {
		ShipTurnInfo.shipTurnGrid();		 		
	});
	
});