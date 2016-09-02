$(function(){
	 sns.valid.init($("#fancingForm"));
	 PUI.plugin.init({}, $("#fancingForm"));
});

var NoteAddEdit=function(){
	return{
		
		rebackList:function(){
			//返回风险委员会确认列表
			Menu.forward("xascf/loan/jsp/noteAddList.jsp"); 
		},
		/***
		 * 保存票据信息
		 */
		save : function(){
			var params = new Array();
			// 放款单号
			params.push({name:'fancingOrderEntity.fancingOrderItem.fancingOrderNo',value:$("#businessNo").val()});
			params.push({name:'fancingOrderEntity.fancingOrderItem.pid',value:$("#fancingPid").val()});
			if(typeof receiptAdd_mmg != 'undefined' && (receiptAdd_mmg == null || null == receiptAdd_mmg.row(0))){
				PUI.MessageBox.alert("补充票据列表不能为空!");
				return;
			}
			// 补充票据列表
			var receiptItem= null;
			if (typeof receiptAdd_mmg != 'undefined' && null!=receiptAdd_mmg && null != receiptAdd_mmg.row(0)){
				var len =receiptAdd_mmg[0].rows.length;
				for (var i = 0;i < len; i++) {
					for (var j = 0; j < _receiptAddItems.length; j++) {
						receiptItem  = _receiptAddItems[j];
//						var urlVal=receiptAdd_mmg.row(i).receiptFileUrl;
//						if(urlVal==""){
//							PUI.MessageBox.alert("第"+(i+1)+"行数据请上传发票附件！");
//							return;
//						}
						params.push({
							name: 'fancingOrderEntity.receiptModelList[' + i + '].' + receiptItem,
							value: receiptAdd_mmg.row(i)[receiptItem]
						});
					}
				}
			}
			$.post("xascf/fancing/addNote.shtml",params,function(data){
				var res=data.split(',');
				if(res[0].indexOf('成功')>=0){
					//保存按钮激活
					PUI.MessageBox.info(res[0]);
					var orderNo=res[1];
					NoteAddEdit.rebackList();
//					$.post("xascf/fancing/toNoteAddEdit.shtml",{orderNo:orderNo},function(data){  
//						$("#xascfMainPanel").empty();
//						$("#xascfMainPanel").append(data);
//					});

				}else{
					PUI.MessageBox.info(data);
				}
			},"json");
		}
	};
}();
