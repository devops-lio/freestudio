$(document).ready(function () {
	PUI.plugin.init({}, $("#evaluateReportForm"));
	sns.valid.init($("#evaluateReportForm"));
});

var CompanyEvaluateReport= function() {
	return {

		/**股东情况新增*/
		holderAddTemp : function($this){
			var id = $this.attr("nums");
			var html = 	"<tr>" +
							"<td>"+id+"</td>"+
							"<td><input type='text'/></td>"+
							"<td><input type='text'/></td>"+
							"<td><input type='text' /></td>"+
							"<td><input type='text' /></td>"+
							"<td style='padding-bottom: 3px'><div style='min-height:50px'><textarea class='textarea3'></textarea></div></td>"+
						"</tr>";
			$("#holder").before(html);
			$this.attr("nums",parseInt(id)+1);
		},
		/**对外投资新增**/
		investmentAdd : function($this){
			var id = $this.attr("nums");
			var html = 	"<tr>" +
							"<td>"+id+"</td>"+
							"<td><input type='text'/></td>"+
							"<td><input type='text'/></td>"+
							"<td><input type='text' /></td>"+
							"<td><input type='text' /></td>"+
							"<td><input type='text' /></td>"+
							"<td><input type='text' /></td>"+
							"<td><input type='text' /></td>"+
						"</tr>";
			$("#investment").before(html);
			$this.attr("nums",parseInt(id)+1);
		},
		/**
		 * 企业征信情况新增
		 * @returns
		 */
		guAdd:function($this){
			var id = $this.attr("nums");
			var jHtml=  $("#guLotable tbody").html();
			jHtml = jHtml.replace("guLoTdIndex",id);
			$("#guAddTr").before(jHtml);
			$this.attr("nums",parseInt(id)+1);
			PUI.plugin.init({}, $("#evaluateReportForm"));
			sns.valid.init($("#evaluateReportForm"));
		},
		/**
		 * 实际控制人征信情况新增
		 * @returns
		 */
		loAdd:function($this){
			var id = $this.attr("nums");
			var jHtml=  $("#guLotable tbody").html();
			jHtml = jHtml.replace("guLoTdIndex" ,id);
			$("#loAddTr").before(jHtml);
			$this.attr("nums",parseInt(id)+1);
			PUI.plugin.init({}, $("#evaluateReportForm"));
			sns.valid.init($("#evaluateReportForm"));
		},
		/**上游主要供应商**/
		supplyAdd : function($this){
			var id = $this.attr("nums");
			var html = 	"<tr>" +
							"<td>"+id+"</td>"+
							"<td><input type='text'/></td>"+
							"<td><input type='text'/></td>"+
							"<td><input type='text'/></td>"+
							"<td>"+$("#billRebackSltDiv").html()+"</td>"+
							"<td><div style='min-height:30px'><textarea class='textarea2'></textarea></div></td>"+
							"<td>"+$("#divUpLoad").html().replace(/fileType/g,"upContract").replace(/index/g,id)+"</td>"+
						"</tr>";			
			$("#upSupply").before(html);
			$this.attr("nums",parseInt(id)+1);
			PUI.plugin.init({}, $("#evaluateReportForm"));
			sns.valid.init($("#evaluateReportForm"));
		},
		
		/**下游主要供应商**/
		buyyerAdd : function($this){
			var id = $this.attr("nums");
			var html = 	"<tr>" +
							"<td>"+id+"</td>"+
							"<td><input type='text'/></td>"+
							"<td><input type='text'/></td>"+
							"<td><input type='text'/></td>"+
							"<td>"+$("#billRebackSltDiv").html()+"</td>"+
							"<td><div style='min-height:30px'><textarea class='textarea2'></textarea></div></td>"+
							"<td>"+$("#divUpLoad").html().replace(/fileType/g,"downContract").replace(/index/g,id)+"</td>"+
						"</tr>";			
			$("#downBuyer").before(html);
			$this.attr("nums",parseInt(id)+1);
			PUI.plugin.init({}, $("#evaluateReportForm"));
			sns.valid.init($("#evaluateReportForm"));
		},
		/**
		 * 应收账款分析
		 */
		accountAdd:function($this){
			var id = $this.attr("nums");
			var jHtml=  $('<tr>'+
							'<td>'+id+'</td>'+
							'<td><input type="text"></td>'+
							'<td><input type="text"></td>'+
							'<td><input type="text"></td>'+
							'<td><input type="text"></td>'+
							'<td><input type="text"></td>'+
							'<td><div style="min-height:30px"><textarea class="textarea2" style="width:280px"></textarea></div></td>'+
						'</tr>');
			$("#account").before(jHtml);
			$this.attr("nums",parseInt(id)+1);
		},
		/**
		 * 保存
		 */
		save:function(){
			var reportObjectPid = $("#reportObjectPid").val();
			if (!$("#evaluateReportForm").isValid()) {
					return;
			}
			//防止保存html信息时input的value丢失问题
			$("#evaluateReportDiv input[class!='file']").each(
				function(){
					$(this).attr("value",$(this).val())
				}
			)
			//防止保存html信息时textarea的value丢失问题
			$("#evaluateReportDiv textarea").each(
				function(){
					var $this = $(this);
					$this.html($this.text().replace('<br/>',/\n/g));
					$this.html($this.val());
				}
			)
			//防止保存html信息时textarea的select丢失问题
//			$("#evaluateReportDiv select").each(
//				function(){
//					$(this).find('option:selected').removeAttr("selected");
//				}
//			)
			//重新定义select下拉框
			var $evaluateReportDiv = $("#evaluateReportDiv");
			$evaluateReportDiv.find("div[class='select']").each(
				function(){
						var val;
						$(this).find("span").each(function(){
							val=$(this).text();
						});
						$(this).find("option").each(function(){
							var value=$(this).text();
							if(value==val){
								$(this).attr("selected","selected");
							}else{
								$(this).removeAttr("selected");
							}
						});
						
						$(this).find("div[class='chosen-container chosen-container-single chosen-container-single-nosearch']").each(function(){
							$(this).replaceWith("");
						});
						
						$(this).find("div[class='chosen-container chosen-container-single chosen-container-single-nosearch chosen-container-active']").each(function(){
							$(this).replaceWith("");										
						});						
			});
			
			var reportContent = $("#divReportContent").html();
			var params = $("#evaluateReportForm").serializeArray();
			params.push({ //评估内容
				name: 'evaluateReportModel.reportContent',
				value: reportContent
			});
			params.push({
				name: 'evaluateReportModel.fileUrl',
				value: $("#fileUrl").val()
			});
			params.push({
				name: 'evaluateReportModel.fileName',
				value: $("#fileName").val()
			});
			var requestType=$("#requestType").val();
			var url = "xascf/rm/evaluateReport/addEvaluateReport.shtml";
			var saveType = $("#saveType").val();
			if(saveType =="update")
				url = "xascf/rm/evaluateReport/updateEvaluateReport.shtml";
			$.post(url,params,function(data){
				PUI.MessageBox.info(data);
				$.post("xascf/customer/toEvaluateReportPage.shtml",{"memberPid":reportObjectPid}, function(data) {
					$("#xascfMainPanel").html(data);
					$("#requestType").val(requestType);
				});

			},"json");
		},
		/**
		 * 上传附件，参数名为客户名称，文件类型，文件在列表中的位置
		 */
		uploadFile:function(fileType,index,thisInput){
			var parameterArray = new Array();
			parameterArray.push(thisInput);
			var customerName =  $("#reportObjectPid").val();
			pluploadUtil.init("/XA_SCF/xascf/util/plupload.shtml",{type : "pinggubaogaofujian", requestName : customerName+"_"+fileType},
				"",CompanyEvaluateReport.backFillFileInfo,parameterArray);
		},
		backFillFileInfo: function(fileArray,parameter){
			var $param = $(parameter[0]);
			//去掉之前上传的文件
			$param.siblings().replaceWith("");
			$param.after('  <a href="#" style="text-align: center;" onclick="FileUtil.downLoad(\''+fileArray[0]+'\',\''+fileArray[2]+'\')">'+fileArray[2]+'</a>');
		},
		returnList:function(){
			var requestType=$("#requestType").val();
				$.post("xascf/customer/toEvaluateReportPage.shtml",{"memberPid":$("#reportObjectPid").val()}, function(data) {
					$("#xascfMainPanel").html(data);
					$("#requestType").val(requestType);
				});
		},
		//附件上传
		addUploadPop : function(){
		   	var parameterArray = new Array();
			parameterArray.push("fileName");
			parameterArray.push("fileUrl");
			var customerSubPid =  $("#reportObjectPid").val();
		  	pluploadUtil.init("/XA_SCF/xascf/util/plupload.shtml",
					{type : "pinggubaogaofujian", requestName: customerSubPid+"_reportFile", flag:"",title : "Image files", extensions : "jpg,gif,png",
					whatFile:"pinggubaogao"},"",CompanyEvaluateReport.fillUrlAndName,parameterArray, false);
		},
		//上传回调函数
		fillUrlAndName : function(fileArray,parameter){
			$("#fileName").val(fileArray[2]);
			$("#fileUrl").val(fileArray[0]);
			$("#show_fileName").html('<a href="#" style="text-align: center;" onclick="FileUtil.downLoad(\''+fileArray[0]+'\',\''+fileArray[2]+'\')">'+fileArray[2]+'</a>');
		}
	};
}();


