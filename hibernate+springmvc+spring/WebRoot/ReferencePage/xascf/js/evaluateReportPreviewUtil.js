
/**
 * 本方法主要将输入框替换为输入框的文字，及删除按钮，替换文件等。
 */
function replaceDocument(){
	var $evaluateReportDiv = $("#evaluateReportDiv");
	//替换上传按钮
	$evaluateReportDiv.find("input[type='button'][value='上传']").each(
		function(){
			$(this).replaceWith("");
		}
	);
	//替换文件
	$evaluateReportDiv.find("input[type='hidden'][id*='Url']").each(
		function(){
			var url = $(this).val();
			var $name = $(this).prev();
			var name = $name.val();
			$name.replaceWith("<a target='_blank' href='xascf/util/download.shtml?fileName="+name+"&url="+url+"'>"+name+"</a>");	
		}
	);
	//替换文本框
	$evaluateReportDiv.find("input[class!='file'][type!='hidden']").each(
		function(){
			var val = $(this).val();
			$(this).replaceWith(val);
		}
	);
	//替换下拉框
	$evaluateReportDiv.find("div[class='select']").each(
		function(){
			var val=$(this).find('option:selected').text();
			$(this).before(val);
			//alert(val);
			$(this).css("display","none");
		}
	);
		
	//替换添加按钮
	$evaluateReportDiv.find("a:contains('添加')").each(
		function(){
			$(this).parent().parent().replaceWith("");
		}
	);
	//替换保存按钮
	$evaluateReportDiv.find("a:contains('保存')").each(
		function(){
			$(this).parent().parent().parent().replaceWith("");
		}
	);
	//替换多行输入框
	$evaluateReportDiv.find("textarea").each(
		function(){
			var html = $(this).html();
			$(this).replaceWith(html);
		}
	);

};
