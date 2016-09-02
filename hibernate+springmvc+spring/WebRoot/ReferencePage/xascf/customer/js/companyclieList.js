var ComapanyclieInfo = function() {
	var mmg = null;
	return {
		init: function() {
			
			PUI.plugin.init({}, $("#comapanyclieSearchForm"));

			var cols = new Array(
			    { title:'', name:'cliePid', hidden: true},
			    { title:'拜访人数', name:'visitCount' ,width:150, align:'center', sortable: true, type: 'string'},
			    { title:'拜访日期', name:'visitDate' ,width:150, align:'center', sortable: true, type: 'string'},
			    { title:'拜访记录',name:'visitCaption', width: 120, align: 'center',sortable: true, type: 'string'},
			    
			    { title:'拜访方式', name:'visitType' ,width:150, align:'center', sortable: true, type: 'string',
			    	renderer: function(val,item,rowIndex){
               		 if(val=='2'){
               			 val='上门拜访';
               		 }else{
               			 val='电话拜访';
               		 }
       			return  val;
       	    	  }}, 
			    { title:'附件', name:'fileName' ,width:150, align:'left', sortable: true, type: 'string',
			    	 renderer: function(val,item,rowIndex){
                 		  var html='';
                 		  if(item.fileUrl!='' && item.fileUrl!=null && val!='' && val!=null){
                 		  var urlArray=item.fileUrl.split(',');
         	    		  var fileNameArray=val.split(',');
         	    		  var length=urlArray.length;
         		    		 for(var i=0;i<length;i++)
         						{
         							var thisFileName = fileNameArray[i];
         							if(thisFileName!=''){
         								html+="<a target='_blank' "+
         									" href='#' onclick='FileUtil.downLoad(\""+urlArray[i]+"\",\""+thisFileName+"\")'>"+thisFileName+"</a><br>";
         							}
         						}
                 		  }
         			return  html;
         	    	  }},
			    { title:'', name:'fileUrl' ,width:100, align:'center', hidden: true, type: 'string'}
			);
			
			mmg =  $("#mmg-users").mmGrid({
				height: 290,
				cols: cols,
				url: 'xascf/customer/toTrackPage.shtml',
				params: $("#comapanyclieSearchForm").serialize(),
				method: 'post',
				checkCol: true,
				autoLoad: true,
				fullWidthRows: true,
				cache: false,
				multiSelect: true,
				nowrap: true,
				plugins: [$('#pg').mmPaginator({})]
			
			});
			
		},
		/**查询*/
		load: function() {
		  	mmg.load($("#comapanyclieSearchForm").serialize());
		},
		clearQueryForm : function(){
			$("#visitTypeQuery").val('');
			$("#bfyf").val('');
		},
		
		/**保存*/
		save: function() {
			if (!$("#clieEditForm").isValid()) {
				return ;
			}
			var params = $("#clieEditForm").serializeArray();
			$.post("xascf/customer/toSaveTrack.shtml",params,function(data){
			 		var message=data;
					if(message.indexOf('成功')>=0){
						ComapanyclieInfo.cancle();
						ComapanyclieInfo.load();
					}
					PUI.MessageBox.info(message);
				},"json");
			
		},
		
		/**修改*/
		update: function() {
			if (mmg.selectedRowsIndex().length != 1){
				PUI.MessageBox.alert("请先选中一条记录");
				return;
			}
			var item = mmg.selectedRows()[0];
			var rowIndex =mmg.selectedRowsIndex();
			var jHtml = $(PUI.String.format($("#template_clie").html(),$.extend(item, {rowIndex: rowIndex})));
			$("#tabwin_add_content_clie").html(jHtml);
			$("#tabwin_add_clie").popup({md:true});
			$("#visitType").val(item.visitType);
			PUI.plugin.init({}, $("#tabwin_add_content_clie"));
			sns.valid.init($("#clieEditForm"));
		},
		forward:function(){ 
				Menu.forward("xascf/customer/jsp/comapanyInfo.jsp");  
		},  
		/**删除*/
		_delete: function() {
			if (mmg.selectedRowsIndex().length == 0){
				PUI.MessageBox.alert("请至少选中一条记录");
				return;
			}
			
			var params = new Array();
			var items = mmg.selectedRows();
			for (var i = 0;i < items.length; i++) {
				params.push({name: "pids", value: items[i].cliePid});
			}
			
			PUI.MessageBox.show({
			    title: "删除拜访跟踪记录",
			    content: "是否删除？",
			    type: "confirm",
			    buttons: [{ value: "是" },{ value: "否" }],
			    success: function (result) {
			        if (result == "是") {
			        	$.post("xascf/customer/comapanycliedelete.shtml", params, function(data) {
			        		var message=data;
							if(message.indexOf('成功')>=0){
								ComapanyclieInfo.load();
							}
							PUI.MessageBox.info(message);
			        	}, "json");
			        }
			    }
			});
		},
		
		add: function() {
			$("#tabwin_add_content_clie").html(PUI.String.format($("#template_clie").html(), {}));
			$("#tabwin_add_clie").popup({md:true});
			PUI.plugin.init({}, $("#tabwin_add_content_clie"));
			sns.valid.init($("#clieEditForm"));
			$("#clieMemberPid").val($("#memberPid").val());
		},
		
		addUploadPop : function(data){
			   var parameterArray = new Array();
				parameterArray.push("fileName");
				parameterArray.push("fileUrl");
			   pluploadUtil.init(
					   "/XA_SCF/xascf/util/plupload.shtml",
						{type : $("#memberPid").val(), requestName:"daihougenzong", flag:"",title : "Image files", extensions : "jpg,gif,png",
						whatFile:"bank"},"",ComapanyclieInfo.fillUrlAndName,parameterArray);
			},
			//上传回调函数
		fillUrlAndName : function(fileArray){
			var aname=$("#cliefile_Name").val();
			var aurl=$("#cliefile_url").val();
			if(aname==''){
				$("#cliefile_Name").val(fileArray[2]);
			}else{
				$("#cliefile_Name").val(aname+","+fileArray[2]);
			}
			if(aurl==''){
				$("#cliefile_url").val(fileArray[0]);
			}else{
				$("#cliefile_url").val(aurl+","+fileArray[0]);
			}
		},	
		//取消关闭
		cancle : function(){
			$("#tabwin_add_clie").popup({display:false});
		}
	};
}();

$(document).ready(function() {
	ComapanyclieInfo.init();
});