$(document).ready(function(){
	PUI.plugin.init();
	sns.valid.init($("#agCustomerEditForm"));  
	if($("#customerPid").val()!="")
	{
		$("#loginName").attr("disabled","disabled");
	} else {
		$("#customerPid").val("-12345");
	}
	 
});    

var CompanyEdit = function() {      
	
	/* 企业银行*/	
	var _cols = new Array(
			{ title:'名称', name:'materialName', width:200, align:'center', sortable: true, type: 'string'},
			{ title:'编号', name:'materialNo', width:200, align:'center', sortable: true, type: 'string',hidden:true},
			{ title:'描述', name:'materialDesc', width:200, align:'center', sortable: true, type: 'string',hidden:true}
			
		);		
			var material_mmg =  $("#material_mmg").mmGrid({ 
				url: 'xascf/agFancing/pageMaterail.shtml',   
				params: {'condition.agFancingCustomerPid':$("#customerPid").val()},
				width:'auto',
				height: 'auto', 
				cols : _cols,
				method: 'post',
				indexCol: false,
				showBackboard:false,
				indexColWidth: 30,
	            checkCol:true,
	            nowrap : true,
	            multiSelect: true,
	            fullWidthRows:true,
	            autoLoad : true
			});  

		var _rootLists = new Array( 
				'pid',
				'agFancingCustomerPid', 
				'materialNo',
				'materialName',
				'materialDesc'				
				);
	return {       
		//会员基本信息唯一性检验
		checkInfoUnio:function(type,val){
			var params=[];
			params.push({
			name:'condition.remark',
			value:type
			});
			if(type=='001'){
				params.push({
					name: 'condition.loginName',
					value: val
				});	
			}else if(type=='002'){
				params.push({
					name: 'condition.tel',
					value: val
				});
			}
			else if(type=='003'){
				params.push({
					name: 'condition.emill',
					value: val
				});
			}
			$.post("xascf/customer/checkCustomerInfoUnio.shtml", params, function(data){
				if(data.indexOf('OK')<0){
					PUI.MessageBox.info(data);
					if(type=='001'){
						$("#loginName").val('');
					}else if(type=='002'){
						$("#tel").val('');
					}
					else if(type=='003'){
						$("#emill").val('');
					}
				}
			},"json"); 
		},
		
		/**
		 * 保存资金方信息
		 * */ 
		save:function(){   
			if (!$("#agCustomerEditForm").isValid()) {
				$("#customerName").focus();
				return ;
     		}   
			//材料信息列表  
			var materialList=null; 
			var params=$("#agCustomerEditForm").serializeArray();   
			//企业银行信息管理
			if(null != material_mmg.row(0)){
				var len= material_mmg[0].rows.length;
				for (var i = 0; i < len; i++){
					for (var j = 0; j < _rootLists.length; j++) {
						materialList = _rootLists[j]; 
						params.push({
							name:'condition.agMaterialModel['+ i +'].'+ materialList,
							value: material_mmg.row(i)[materialList]
						});
					}
				} 
			}   
			
			//新增资金方
				$.post("xascf/agFancing/save.shtml", params, function(data){
					var res=data.split(',');
					if(res[0].indexOf('成功')>=0){
						//保存按钮激活
						PUI.MessageBox.info(res[0]);
						CompanyEdit.toback();
					}else{
						$("#loginName").focus();
						PUI.MessageBox.info(data);
					}
				},"json");  
		},  
		/*返回*/
		toback: function(){
			Menu.forward("xascf/agfancing/jsp/capitalSideList.jsp"); 
		},
		
		/*是否为正整数  */
		isPositiveNum:function (s){
		    var re = /^[1-9]+[0-9]*]*$/;
		    return re.test(s);
		},
		/**************材料****************/
		//新增材料
		addMaterial:function(){
			$("#pop_up_show_content").html(PUI.String.format($("#pop_up_bank").html(), {}));
			$("#pop_up_delay").popup({md:true});
			
			PUI.plugin.init({}, $("#pop_up_show_content"));
			sns.valid.init($("#editForm"));
		},
		//修改材料
		editMaterial:function(){
			if (material_mmg.selectedRowsIndex().length != 1){
				PUI.MessageBox.alert("请选中一条记录");
				return; 
			}      
			var item = material_mmg.selectedRows()[0];
			var rowIndex = material_mmg.selectedRowsIndex();
			var html = PUI.String.format($("#pop_up_bank").html(),$.extend(item, {rowIndex: rowIndex}));   
			var content=$("#pop_up_show_content");
			content.html(html);
			$("#pop_up_delay").popup({md:true});
			$("#materialNo").val(item.materialNo).trigger("liszt:updated");  
			$("#materialName").val(item.materialName).trigger("liszt:updated");  
			$("#materialDesc").val(item.materialDesc).trigger("liszt:updated");  
			PUI.plugin.init({}, $("#pop_up_show_content"));
			sns.valid.init($("#editForm"));
		},
		//删除材料
		deleteMaterial:function(){
			if (material_mmg.selectedRowsIndex().length==0){
				PUI.MessageBox.alert("请至少选中一条记录");
				return; 
			}
			PUI.MessageBox.show({
				title:"删除材料信息",
				content:"确定删除该材料信息吗?",
				type:"confirm",
				buttons:[{value: "是"} , {value:"否"}],
				success: function(result){ 
					 if (result == "是") {
						while(material_mmg.selectedRowsIndex().length > 0){
							material_mmg.removeRow(material_mmg.selectedRowsIndex()[0]);
						}
					 }
				} 
			})
		},
		//添加材料行
		addMaterialRow:function(){
			if (!$("#editForm").isValid()) {
				return ;
     		} 
			var _rootList ={ 
					materialNo:$("#materialNo").val(),
					materialName:$("#materialName").val(),  
					materialDesc:$("#materialDesc").val()
			};   
			
			if ($("#pop_up_show_content input[name=rowIndex]").val() != ""){
				var rowIndex=parseInt($("#pop_up_show_content input[name=rowIndex]").val());
				material_mmg.updateRow(_rootList, rowIndex); 
			}else{
				material_mmg.addRow(_rootList,material_mmg.rowsLength());
			}
			$("#pop_up_delay").popup({display:false}); 
		},
		//取消材料行
		cancleMaterial:function(){
			$("#pop_up_delay").popup({display:false});
		}
	};
}(); 