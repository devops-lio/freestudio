 $(document).ready(function(){
// 	PUI.plugin.init();
 	template_buyerEdit_tabs = $("#buyerEdit-template-tab").html();
 	PUI.plugin.init();
	sns.valid.init($("form"));
});
		
var _cols = [
    { title:'合作伙伴', name:'noticeTitle' ,width:180, align:'center', sortable: true, type: 'String'},
    { title:'链接地址', name:'friendLink' ,width:180, align:'center', sortable: true, type: 'String',renderer:
    	function(val){
    		return "<a href='http://"+val+"' target='_blank'>"+val+"</a>";
    	}
    },
    { title:'显示系统', name:'showingSystem' ,width:180, align:'center', sortable: true, type: 'String',renderer: 
    	function(val){
    		return val==null?"":val.replace("xascf","信安供应链金融").replace("jimi","积米网");
    	}
    },
    { title:'图片名称', name:'picName' ,width:80, align:'center', sortable: true, type: 'String',
    	renderer: function(val,item,rowIndex){
    		 var html='';
    		  if(item.picUrl!='' && item.picUrl!=null && val!='' && val!=null){
    		  var urlArray=item.picUrl.split(',');
    		  var fileNameArray=val.split(',');
    		  var length=urlArray.length;
	    		 for(var i=0;i<length;i++)
					{
						var thisFileName = fileNameArray[i];
						if(thisFileName!=''){
							html+="<span ><a target='_blank' "+
								" href='#' onclick='FileUtil.downLoad(\""+urlArray[i]+"\",\""+thisFileName+"\")'>"+thisFileName+"</a><br>";
						}
					}
    		  }
		return  html;}},
    { title:'是否置顶', name:'isTop' ,width:50, align:'center', sortable: true, type: 'String'},
    { title:'发布时间', name:'publishTimeStr' ,width:50, align:'center', sortable: true, type: 'Date'},
    { title:'状态', name:'status' ,width:30, align:'center', sortable: true, type: 'String'}
   
];

var _mmg =  $("#mmg").mmGrid({
	height : getAutoHeightByMmGrid($("#xascfMainPanel")),
	cols : _cols,
	url : 'xascf/information/noticeInfo/getPartnerList.shtml',
	params : $("#PartnerListQueryForm").serialize(),
	method : 'post',
	checkCol : true,
	indexColWidth : 15,
	autoLoad : true,
	nowrap:true,
	sortName : 'id',
	sortStatus : 'desc',
	fullWidthRows : true,
	cache : false,
	multiSelect: true,
	plugins : [$('#pg').mmPaginator({})]
});
    
//_mmg.on('itemdblclick', function(event, item, rowIndex) {
//				picInfoList.doubleClick(item);
//            	
//            });
 mmGridResizeListener(_mmg, $(".page-content"));           
var picInfoList = function() {
	return {
		/**查询*/
		query : function() {
            _mmg.load($("#PartnerListQueryForm").serialize());
		},

		/**双击*/
		doubleClick : function(item){
			var noticePid=item.noticePid;
			$.post("xascf/information/noticeInfo/toEditPartenr.shtml",{noticePid:noticePid},function(data){
					$("#xascfMainPanel").empty();
					$("#xascfMainPanel").append(data);
				});
		},
		/**删除*/
		deleteByPids : function() {
			var str = new Array();
				$.each(_mmg.selectedRows(), function(i, n) {
					str.push("pids=" + n.noticePid);
				});
				/**选中才能删除 */
				if (str == "") {
					PUI.MessageBox.alert("请至少选中一条记录");
				} else {
				PUI.MessageBox.show({
				    title: "删除合作伙伴信息",
				    content: "你确定要合作伙伴信息吗？",
				    type: "alert",
				    buttons: [{ value: "是" },{ value: "否" }],
				    success: function (result) {
				        if (result == "是") {
				        	$.post("xascf/information/noticeInfo/deleteByPids.shtml",
							str.join("&"), function(data) {
								var message=data;
								if(message.result){
									picInfoList.query();
								}
								PUI.MessageBox.info(message.msg);
							});
			       		 }
			    	}
				});
			}
		},
		/**新增跳转至发布页面*/
		add : function() {
			$.post("xascf/information/noticeInfo/toEditPartenr.shtml",{noticePid:""}, function(data) {
				$("#xascfMainPanel").empty();
				$("#xascfMainPanel").append(data);
			});
		},
		
		/**编辑*/
		edit : function(){
			if ($("input[class='mmg-check']:checked").length != 1){
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			var item = _mmg.selectedRows()[0];
			$.post("xascf/information/noticeInfo/toEditPartenr.shtml",{noticePid:item.noticePid},function(data){
					$("#xascfMainPanel").empty();
					$("#xascfMainPanel").append(data);
			});
		},
		/**
		* 发布
		*/
		publish : function(){
			if ($("input[class='mmg-check']:checked").length != 1){
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			var item = _mmg.selectedRows()[0];
			PUI.MessageBox.show({
				title: "发布公告信息",
				content: "你确定要发布公告信息吗？",
				type: "alert",
				buttons: [{ value: "是" },{ value: "否" }],
				success: function (result) {
					if (result == "是") {
						$.post("xascf/information/noticeInfo/publish.shtml",{noticePid:item.noticePid}, 
							function(data) {
								var message=data;
								if(message.result){
									picInfoList.query();
								}
								PUI.MessageBox.info(message.msg);
							}
						);
				    }
			    }
			});		
		},
		/**
		* 置顶
		*/
		toTop : function(){
			if ($("input[class='mmg-check']:checked").length != 1){
				PUI.MessageBox.alert("请选中一条记录");
				return;
			}
			var item = _mmg.selectedRows()[0];
			PUI.MessageBox.show({
				title: "置顶合作伙伴信息",
				content: "你确定要置顶合作伙伴信息吗？",
				type: "alert",
				buttons: [{ value: "是" },{ value: "否" }],
				success: function (result) {
					if (result == "是") {
						$.post("xascf/information/noticeInfo/toTop.shtml",{noticePid:item.noticePid}, 
							function(data) {
								var message=data;
								if(message.result){
									picInfoList.query();
								}
								PUI.MessageBox.info(message.msg);
							});
				    }
			    }
			});		
		},	
			
		/**清空**/
		clear : function(){
			PUI.util.resetForm($("#PartnerListQueryForm"));
		}
	};
}();