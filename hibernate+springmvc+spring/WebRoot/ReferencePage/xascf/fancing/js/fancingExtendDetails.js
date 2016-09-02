 $(document).ready(function(){
 	PUI.plugin.init({},$("#check_form"));
	sns.valid.init($("#check_form"));
	$("#zhangqi").find(".chosen-container").css("float",'right').css("width",'30%');
	$("#dateType").val($("#fancingDateType").val()).trigger("liszt:updated");
	$("#overdueType").val($("#fancingOverdueType").val()).trigger("liszt:updated");
	$("#billRebackType").val($("#fancingRebackType").val()).trigger("liszt:updated");
	var days=parseInt(parseInt($("#fancingDate").val())/2);
	$("#extendDate").val(days);
});
 var ship_cols=[
		          {title: "运单号",name:"shipNo" ,width:120, sortable: true, type:'string', align:'center'},
		          {title: "",name:"shipOrderPid" ,width:120, sortable: true, type:'string', align:'center',hidden:true},
		          {title: "委托人",name:"shipClient" ,width:120, sortable: true, type:'string', align:'center'},
		          {title: "车牌号码",name:"shipCarNo" ,width:80, sortable: true, type:'string', align:'center'},
		          {title: "出发地",name:"shipFrom" ,width:80, sortable: true, type:'string', align:'center'},
		          {title: "目的地",name:"shipTo" ,width:80, sortable: true, type:'string', align:'center'},
		          {title: "运单金额(元)",name:"shipPrice" ,width:120, sortable: true, type:'string', align:'center'},
		          {title: "货物名称",name:"shipName" ,width:120, sortable: true, type:'string', align:'center'},
		          {title: "货物数量",name:"shipNum" ,width:120, sortable: true, type:'string', align:'center'},
		          {title: "状态",name:"shipStatus" ,width:60, sortable: true, type:'string', align:'center',
		        	  renderer: function(val){
							 if(val=='1')
								 val='已签收';
							 else if(val=='2')
								 val='运输中';
					return val}}
		         ];
var ship_mmg=$('#ship_mmg').mmGrid({
	width:'auto',
	height: 160,
	cols: ship_cols, 
	indexCol: true,
	indexColWidth: 30,
	fullWidthRows:true,
	multiSelect: true,
	nowrap : true,
	autoLoad : true,
	params : {fancingOrderNo:$("#fancingOrderNo").val()},
	url : 'xascf/shipOrder/page.shtml'
});
var FancingExtendDetails = function() {
	return {
		saveFancingCheck :function(){
			if (!$("#check_form").isValid()) {
				return ;
			}
			var days=parseInt($("#fancingDate").val())/2;
			var nowDays=parseInt($("#extendDate").val());
			if(nowDays>days){
				PUI.MessageBox.alert("展期不能超过原有账期的一半!");
				return ;
			}
			$.post("xascf/bill/saveExtend.shtml",$("#check_form").serialize(),function(data){  
				if(data.indexOf('成功')>=0){
					PUI.MessageBox.info(data);
					$("#tabwin_add").popup({display:false});
					delay_mmg.load($("#billListQueryForm").serialize());
				}else{
					PUI.MessageBox.info(data);
				}
				
			});
		},
		//取消关闭
		cancle : function(val){
			$("#tabwin_add").popup({display:false});
		},
		/**清空**/
		clear : function(){
			PUI.util.resetForm($("#billonListQueryForm"));
		}
	};
}();