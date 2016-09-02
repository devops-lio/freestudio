
/**
 * 绑定表格里为输入框的评分的change事件
 * 表格里的span input 都用 parentPid+indexPid开头 ，以score、percentage 、finalScore结尾
 */
function bindChangeEvent(){
	$("#indexTableId input[id$='_score']").bind("change",
		function(){
  			var id = $(this).attr("id");
  			var value = $(this).val();
  			calFinalScoreByScore(id,value)
		}
	);
};

/**
 * 给已有得分的span score计算分数
 */
function initBySpanScore(){
	$("#indexTableId span[id$='_score']").each(
		function(){
  			var value = $(this).html();
  			var id = $(this).attr("id");
  			if(value!=null && value!=undefined && value!="" )
  				calFinalScoreByScore(id,value)
		}
	);
}

/**
 * 根据score对应的tdID和值计算最终得分
 */
function calFinalScoreByScore(id,value){
	var idArray = id.split("_");
  	//父节点的逻辑ID
  	var parentPid = idArray[0];
  	//本节点的逻辑ID
  	var thisPid = idArray[1];
  	var percentage = $("#"+parentPid+"_"+thisPid+"_percentage").html().replace(/&nbsp;/g,"");
  	var fullMarks = $("#"+parentPid+"_"+thisPid+"_fullMarks").html().replace(/&nbsp;/g,"");
  	//计算本节点最终得分：本输入框的值*本输入框对应的Pecentage的值/满分值
  	$("#"+parentPid+"_"+thisPid+"_finalScore").html(parseFloat(value*percentage/fullMarks));
  	calScoreByPid(parentPid);
  	calResultScore();

}

/**
 * 根据逻辑ID计算节点的分数（递归)
 */
function calScoreByPid(indexPid){
	if(indexPid == null || indexPid == "")
		return;
  	var $indexScore = $("span[id$='"+indexPid+"_score']");
  	if($indexScore[0]===undefined)
  		return;
  	//父节点的逻辑ID，循环递归
  	var parentPid = $indexScore.attr("id").split("_")[0];
  	var value = 0;
  	$("[id^='"+indexPid+"'][id$='_finalScore']").each(
  		function(){
  			var html = $(this).html();
  			if(html !=null && html !="")
  			value = parseFloat(value) + parseFloat(html);
  		}
    )
  	$indexScore.html(parseFloat(value));
  	var percentage = $.trim($("#"+parentPid+"_"+indexPid+"_percentage").html()).replace(/&nbsp;/g,"");
  	var fullMarks = $.trim($("#"+parentPid+"_"+indexPid+"_fullMarks").html()).replace(/&nbsp;/g,"");
  	$("#"+parentPid+"_"+indexPid+"_finalScore").html(parseFloat(value*percentage/fullMarks));	
  	calScoreByPid(parentPid);
};

/**
 * 计算最终得分
 */
function calResultScore(){
	var value = 0;
	$("#indexTableId span[id$='_finalScore']").each(
		function(){
			var parentPid = $(this).attr("id").split("_")[0];
			var $parentScore = $("span[id$='"+parentPid+"_score']");
			//如果不存在父节点，则为顶点节点，最终得分是顶点节点之和
  			if($parentScore[0]===undefined)
  			{
  				var html = $(this).html();
  				if(html !=null && html !="")
  				value = parseFloat(value) + parseFloat(html);
  			}
			$("#resultScore").html(parseFloat(value));
		}
	)
}

/**
 * 将结果清单的信息由TR转到param参数里
 */
function pushResultItemToParam(params){
	//得分
	params.push({ //因子父节点逻辑ID
				name: 'evaluateResultModel.score',
				value: $("#resultScore").html()
	});
	var index = 0 ;
	$("#indexTableId tr[id*='_']").each(
		function(){
			$this = $(this);
			var thisId = $this.attr("id").split("_");
			var parentPid = thisId[0];
			var indexPid = thisId[1];
			var $score = $this.find("td [id$='_score']");
			var scoreValue = "";
			var tagName = $score.get(0).tagName;
			if(tagName == "SPAN" || tagName == "span")
				scoreValue = $score.html();
			else
				scoreValue = $score.val();
			params.push({ //因子父节点逻辑ID
				name: 'evaluateResultModel.resultItemList[' + index + '].indexParentPid',
				value: parentPid
			});
			params.push({//因子逻辑ID
				name: 'evaluateResultModel.resultItemList[' + index + '].indexPid',
				value: indexPid
			});
			params.push({//因子名称
				name: 'evaluateResultModel.resultItemList[' + index + '].indexName',
				value: $this.find("td:first").html().replace(/&nbsp;/g,"")
			});
			params.push({//
				name: 'evaluateResultModel.resultItemList[' + index + '].score',
				value: scoreValue
			});
			params.push({
				name: 'evaluateResultModel.resultItemList[' + index + '].percentage',
				value: $this.find("td[id$='_percentage']").html().replace(/&nbsp;/g,"")
			});
			params.push({
				name: 'evaluateResultModel.resultItemList[' + index + '].fullMarks',
				value: $this.find("td[id$='_fullMarks']").html().replace(/&nbsp;/g,"")
			});
			params.push({
				name: 'evaluateResultModel.resultItemList[' + index + '].finalScore',
				value: $this.find("span[id$='_finalScore']").html()
			});
			index++;
		}
	)
	return params;
}