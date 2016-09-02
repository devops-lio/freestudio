$(document).ready(function(){
});


diya_cols=[
           {title: "抵押类型",name:"qualificationType" ,width:80, sortable: true, type:'string', align:'center',
         	  renderer: function(val){
         			 if(val=='5')
         				 val='房产抵押';
         			 else if(val=='6')
         				 val='车辆抵押';
         			 else if(val=='7')
         				 val='土地抵押';
         	return val;}},
           {title: "抵押文件编号",name:"qualificationNo" ,width:101, sortable: true, type:'string', align:'center'},
           {title: "抵押文件新名称",name:"qualificationNewName" ,width:150, sortable: true, type:'string',hidden:true, align:'center'},
           {title: '抵押材料url',name:"qualificationUrl" ,width:150, sortable: true, type:'string', align:'center',hidden:true},
           {title: "附件",name:"qualificationName" ,width:220, sortable: true, type:'string', align:'left',
          	  renderer: function(val,item,rowIndex){
          		  var html='';
          		  if(item.qualificationUrl!='' && item.qualificationUrl!=null && val!='' && val!=null){
          		  var urlArray=item.qualificationUrl.split(',');
  	    		  var fileNameArray=val.split(',');
  	    		  var length=urlArray.length;
  		    		 for(var i=0;i<length;i++)
  						{
  							var thisFileName = fileNameArray[i];
  							if(thisFileName!=''){
  								html+="<span style='position: absolute;'><a target='_blank' "+
  									" href='#' onclick='FileUtil.downLoad(\""+urlArray[i]+"\",\""+thisFileName+"\")'>"+thisFileName+"</a>"+
  									" <span style='position: relative;top: 4px;'><a style='cursor:pointer' title='删除'" +
  									"class='buttonRomve' onclick='DiyaInfo.removeFile(\""+rowIndex+"\",\""+i+"\")'>&nbsp;&nbsp;</a></span></span><br> ";
  							}
  						}
          		  }
  			return  html;
  	    	  }
        	  }
           ];
    dy_mmg=$('#dy_mmg').mmGrid({
         	 width:'auto',
         	height: 160,
         	params : {"creditNo":$("#creditNo").val()},
         	cols: diya_cols,
         	method: 'post',
         	indexCol: false,
         	indexColWidth: 15,
         	checkCol:true,
         	fullWidthRows:true,
         	multiSelect: true,
         	showBackboard:false,
         	cache: false,
         	nowrap : true,
         	autoLoad : true,
         	url : 'xascf/qualification/page.shtml'
         	 
         		
         });

 diyaItems=new Array(
			'qualificationType',
			'qualificationNo',
			'qualificationNewName',
			'qualificationName',
			'qualificationUrl'
		);

var DiyaInfo = function(){	
	return{
		//新增按钮
		dyadd : function(val) {
			var jHtml = $(PUI.String.format($("#template_"+val).html(), {}));
			$("#tabwin_add_content_"+val).html(jHtml[0].outerHTML);
			$("#tabwin_add_"+val).popup({md:true});
			PUI.plugin.init({}, $("#tabwin_add_content_"+val));
			sns.valid.init($("#"+val+"_form"));
		},
		//上传文件
		addUploadPop : function(data){
			 var parameterArray = new Array();
				parameterArray.push("fileName");
				parameterArray.push("fileUrl");
				parameterArray.push("fileRename");
			   pluploadUtil.init(
					   "/XA_SCF/xascf/util/plupload.shtml",
						{type : "diyawenjian", requestName:$("#memberPid").val(), flag:"",title : "Image files", extensions : "jpg,gif,png",
						whatFile:"bank"},"",DiyaInfo.fillUrlAndName,parameterArray);
		},
		//上传回调函数
		fillUrlAndName:function(fileArray,parameter){
			var aname=$("#dy_fileName").val();
			var aurl=$("#dy_url").val();
			if(aname==''){
				$("#dy_fileName").val(fileArray[2]);
			}else{
				$("#dy_fileName").val(aname+","+fileArray[2]);
			}
			if(aurl==''){
				$("#dy_url").val(fileArray[0]);
			}else{
				$("#dy_url").val(aurl+","+fileArray[0]);
			}
		},	
		
		//取消关闭
		diyaCancle : function(){
			$("#tabwin_add_dy").popup({display:false});
		},
		
		//新增一行表格记录
		adddyRow :function (){
			var fileName=$("#dy_url").val();
			if(fileName==""||fileName==null){
				PUI.MessageBox.alert("请上传抵押材料！");
				return;
			}
			if (!$("#dy_form").isValid()) {
				return ;
			}
			var _dyItem = {
					qualificationType:$("#qualificationType").val(),
					qualificationPid:$("#qualificationPid").val(),
					qualificationNo:$("#qualificationNo").val(),
					qualificationName:$("#dy_fileName").val(),
					qualificationNewName:$("#dy_fileName").val(),
					qualificationUrl:$("#dy_url").val()
			};
			if ($("#tabwin_add_content_dy input[name=rowIndex]").val() != "") {
				var rowIndex=parseInt($("#tabwin_add_content_dy input[name=rowIndex]").val());
				dy_mmg.updateRow(_dyItem, rowIndex);
			} else {
				dy_mmg.addRow(_dyItem, dy_mmg.rowsLength());
			}
			$("#tabwin_add_dy").popup({display:false});
		},
		//编辑
		editdy :function(){
			if (dy_mmg.selectedRowsIndex().length != 1){
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			var item = dy_mmg.selectedRows()[0];
			var rowIndex =dy_mmg.selectedRowsIndex();
			var html = PUI.String.format($("#template_dy").html(),$.extend(item, {rowIndex: rowIndex}));
			var content=$("#tabwin_add_content_dy");
			content.html(html);
			$("#tabwin_add_dy").popup({md:true});
			$("#qualificationType").val(item.qualificationType).trigger("liszt:updated");
			PUI.plugin.init({}, $("#tabwin_add_content_dy"));
			sns.valid.init($("#tabwin_add_content_dy > form"));
		},
		//删除
		removeDyItem: function() {
			if (dy_mmg.selectedRowsIndex().length == 0){
				PUI.MessageBox.alert("请至少选中一条记录");
				return;
			}
			PUI.MessageBox.show({
				title: "删除抵押信息",
				content: "你确定要删除抵押信息吗？",
				type: "alert",
				buttons: [{ value: "是" },{ value: "否" }],
				success: function (result) {
					if (result == "是") {
						while (dy_mmg.selectedRowsIndex().length > 0) {
							dy_mmg.removeRow(dy_mmg.selectedRowsIndex()[0]);
						}
					}
				}
			});
		},
		removeFile:function(rowIndex,i){
			PUI.MessageBox.show({
				title: "删除附件",
				content: "你确定要删除该附件吗？",
				type: "confirm",
				buttons: [{ value: "是" },{ value: "否" }],
				success: function (result) {
					if (result == "是") {
						var item=dy_mmg.row(rowIndex);
						var fileNameArray = item.qualificationName.split(",");
						var urlArray = item.qualificationUrl.split(",");
						var length=fileNameArray.length;
						var newName='';
						var newUrl='';
						for(var j=0;j<length;j++){
							if(i==j){
								continue;
							}
							newName+=fileNameArray[j]+",";
							newUrl+=urlArray[j]+",";
						}
						item.qualificationName=newName;
						item.qualificationUrl=newUrl;
						dy_mmg.updateRow(item, rowIndex); 
					}
				}
			});
			}
		
	};
}();
