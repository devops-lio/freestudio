var allComapanyclieInfo = function() {
	var mmg = null;
	return {
		init: function() {
			
			PUI.plugin.init({}, $("#comapanyclieSearchForm"));

			var cols = new Array(
			    { title:'', name:'cliePid', hidden: true},
			    { title:'会员名称', name:'memberName' ,width:250, align:'left', sortable: true, type: 'string',
			    	renderer: function(val,item,rowIndex){return '<span style=""><a href="#" onclick="customerDetailPop.customerDetail(\''+item.memberPid+'\')">'
				    	  +item.memberName+'</a></span>'}},
			    { title:'拜访人数', name:'visitCount' ,width:70, align:'center', sortable: true, type: 'string'},
			    { title:'拜访日期', name:'visitDate' ,width:90, align:'center', sortable: true, type: 'string'},
			    { title:'拜访记录',name:'visitCaption', width: 120, align: 'center',sortable: true, type: 'string',
			    	 renderer:function replaceTextarea1(str){
			    	        var reg=new RegExp("\r\n","g"); 

			    	     str = str.replace(reg,"<br/>"); 
			    	       return str; 
			    	}},
			    { title:'拜访方式', name:'visitType' ,width:70, align:'center', sortable: true, type: 'string',
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
				height : getAutoHeightByMmGrid($("#xascfMainPanel")),
				cols: cols,
				url: 'xascf/customer/toTrackPage.shtml',
				params: $("#comapanyclieSearchForm").serialize(),
				method: 'post',
				checkCol: false,
				indexCol : true,
				indexColWidth : 15,
				autoLoad: true,
				fullWidthRows: true,
				cache: false,
				multiSelect: true,
				nowrap: true,
				plugins: [$('#pg').mmPaginator({})]
			
			});
			  mmGridResizeListener(mmg, $(".page-content"));
		},
		/**查询*/
		load: function() {
		  	mmg.load($("#comapanyclieSearchForm").serialize());
		},
		clearQueryForm : function(){
			PUI.util.clearForm($("#comapanyclieSearchForm"));
		}
		
	};
}();

$(document).ready(function() {
	allComapanyclieInfo.init();
});