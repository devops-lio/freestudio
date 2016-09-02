
/**
 * 1、指标评分时绑定事件
 * 2、材料评分绑定事件
 * 
 */
function initScoringEvent(){
	initEventWithMaterial();
	initEventWithIndex();
};

/**
 * 绑定材料评分check事件
 */
function initEventWithMaterial(){
	$("#materialDefineTableId input[id$='_check']").each(
		function(){
			var $this = $(this);
			var id = $this.attr("id");
			var idArray = id.split("_");
			var parentId = idArray[0];
			var myId = idArray[1];
			var $parentId = $("input[id$='"+parentId+"_check']");
			$this.on("ifChecked", function(event){
	  			//如果是父节点，由于之后会调用子节点的check方法，因此在此不调用其他方法
  				if($parentId[0]===undefined){			
					$("input[id^='"+myId+"'][id$='_check']").iCheck('check');
  				}
				//如果是子节点
				else{
					//isCheck参数用来判断是否所有子节点都选中；如果都选中则父节点也选中，反之不处理
					var isCheck = true;
					$("#materialDefineTableId [id^='"+parentId+"'][id$='_check']").each(
						function(){
							if(!$(this).is(":checked"))
								isCheck = false;;
						}
					)
					if(isCheck)
						$("#materialDefineTableId [id$='"+parentId+"_check']").iCheck('check');
					calMaterialScore(myId,parentId,true);
					calResultScore("materialDefineTableId","materialResultScore");
				}
			}).on("ifUnchecked", function(event){
	  			//如果是父节点
  				if($parentId[0]===undefined){
  					$("input[id^='"+myId+"'][id$='_check']").iCheck('uncheck');
  				}
				//如果是子节点
				else{
  					var isCheck = false;
					$("#materialDefineTableId [id^='"+parentId+"'][id$='_check']").each(
						function(){
							if($(this).is(":checked"))
								isCheck = true;;
						}
					)
					if(!isCheck)
						$("#materialDefineTableId [id$='"+parentId+"_check']").iCheck('uncheck');
					calMaterialScore(myId,parentId,false);
					calResultScore("materialDefineTableId","materialResultScore");
				}
			});
		}
	);
}

/**
 * 计算材料得分
 * 参数名 id：此节点的唯一domid;parentId父节点的唯一domid ;isCheck是否选中
 */
function calMaterialScore(id,parentId,isCheck){
	debugger
	var weight = $.trim($("[id$='"+id+"_weight']").html()).replace(/&nbsp;/g,"");
	var $score = $("[id$='"+id+"_score']");
	var $finalScore = $("[id$='"+id+"_finalScore']");
	if(isCheck){
		$score.text("100");
		$finalScore.text(weight);
	} else {
		$score.text("0");
		$finalScore.text("0");
	}
	//计算父节点的得分，由于只有两层，不做递归
	var parentScore = 0;
	$("#materialDefineTableId [id^='"+parentId+"'][id$='_finalScore']").each(
		function(){
			parentScore = parseFloat(parentScore) + parseFloat($(this).html().replace(/&nbsp;/g,""));
		}
	)
	$("[id$='"+parentId+"_score']").html(parentScore);
	var parentWeight = $.trim($("[id$='"+parentId+"_weight']").html()).replace(/&nbsp;/g,"");
	$("[id$='"+parentId+"_finalScore']").html((parentScore*parentWeight/100).toFixed(2));

}

/**
 * 计算最终得分
 */
function calResultScore(parentId,resultScordId){
	debugger
	var value = 0;
	$("#"+parentId).find("span[id$='_finalScore']").each(
		function(){
			var parentPid = $(this).attr("id").split("_")[0];
			var $parentScore = $("span[id$='"+parentPid+"_score']");
			//如果不存在父节点，则为顶点节点，最终得分是顶点节点之和
  			if($parentScore[0]==undefined)
  			{
  				var html = $(this).html();
  				if(html !=null && html !="")
  				value = parseFloat(value) + parseFloat(html);
  			}
			$("#"+parentId +" #" +resultScordId).html(parseFloat(value).toFixed(2));
		}
	)
}

/**
 * 初始化指标值事件
 */
function initEventWithIndex(){
	$("#templateIndexDivId input[id$='_value']").on("change",
		function(){
			var id = $(this).attr("id");
			var scoreId = id.replace(/value/,"score");
			var $score = $("#templateIndexDivId input[id='"+scoreId+"']");
			//如果没有存在这样的得分输入框，则意味着要按规则计算得分
			if($score[0]===undefined){
				var ruleNoId = id.replace(/value/,"ruleNo");
				var ruleNo = $("#"+ ruleNoId).val();
				$.post("xascf/credit/creditScoring/scoreByValue.shtml",{"ruleNo":ruleNo,"value":$(this).val()}, function(data) {
					$("#templateIndexDivId td[id='"+scoreId+"']").html(data);
					calIndexScore(scoreId,data);
					calResultScore("templateIndexDivId","indexResultScore");
				});

			}
		}
	);
	$("#templateIndexDivId input[id$='_score']").on("change",
		function(){
			var $this = $(this);
			calIndexScore($this.attr("id"),$this.val());
			calResultScore("templateIndexDivId","indexResultScore");
		}
	)

}

/**
 * 计算指标得分
 */
function calIndexScore(scoreId,scoreValue){
	debugger
	var scoreIdArray = scoreId.split("_");
	var parentId = scoreIdArray[0];
	var id = scoreIdArray[1];
	var percentage = $.trim($("[id$='"+id+"_percentage']").html()).replace(/&nbsp;/g,"");
	var $finalScore = $("[id$='"+id+"_finalScore']");
	$finalScore.text(parseFloat(scoreValue*percentage/100).toFixed(2));

	//计算父节点的得分，由于只有两层，不做递归
	var parentScore = 0;
	$("#templateIndexDivId [id^='"+parentId+"'][id$='_finalScore']").each(
		function(){
			var finalScore = $(this).html().replace(/&nbsp;/g,"");
			if(finalScore == "")
				finalScore = 0
			parentScore = parseFloat(parentScore) + parseFloat(finalScore);
		}
	)
	//指标得分,保留两位小数，2015-7-28 update payne
	$("[id$='"+parentId+"_score']").html(parentScore.toFixed(2));
	var parentPercentage = $.trim($("[id$='"+parentId+"_percentage']").html()).replace(/&nbsp;/g,"");
	//指标最终得分
	$("[id$='"+parentId+"_finalScore']").html((parentScore*parentPercentage/100).toFixed(2));

}

/**
 * 将结果清单的信息转到param参数里
 */
function pushResultItemToParam(params){
	//得分
	var index = 0 ;
	//材料
	$("#materialDefineTableId tr[id*='_']").each(
		function(){
			$this = $(this);
			var thisId = $this.attr("id").split("_");
			var parentPid = thisId[0];
			var factorPid = thisId[1];
			if(factorPid!=undefined && factorPid!=null && factorPid!="")
			{ 
				params.push({ //因子父节点逻辑ID
					name: 'evaluateResultModel.resultItemList[' + index + '].factorParentPid',
					value: parentPid
				});
				params.push({//因子逻辑ID
					name: 'evaluateResultModel.resultItemList[' + index + '].factorPid',
					value: factorPid
				});
				params.push({//因子名称
					name: 'evaluateResultModel.resultItemList[' + index + '].factorName',
					value: $this.find("td:first").html().replace(/&nbsp;/g,"")
				});
				params.push({//
					name: 'evaluateResultModel.resultItemList[' + index + '].score',
					value: $this.find("span[id$='_score']").html()
				});
				params.push({
					name: 'evaluateResultModel.resultItemList[' + index + '].percentage',
					value: $this.find("td[id$='_weight']").html().replace(/&nbsp;/g,"")
				});
				var url = $this.find("td[id$='_url']").html();
				if( url!=null && url!=undefined)
					url = url.replace(/&nbsp;/g,"")
				params.push({
					name: 'evaluateResultModel.resultItemList[' + index + '].factorUrl',
					value: url
				});
				params.push({
					name: 'evaluateResultModel.resultItemList[' + index + '].fullMarks',
					value: '100'
				});
				params.push({
					name: 'evaluateResultModel.resultItemList[' + index + '].finalScore',
					value: $this.find("span[id$='_finalScore']").html()
				});
			} else {//如果不存在，则为根节点
				params.push({ //因子父节点逻辑ID
					name: 'evaluateResultModel.resultItemList[' + index + '].factorParentPid',
					value: $("#cretitApplyPid").val()
				});
				params.push({//因子逻辑ID
					name: 'evaluateResultModel.resultItemList[' + index + '].factorPid',
					value: parentPid
				});
				params.push({//因子名称
					name: 'evaluateResultModel.resultItemList[' + index + '].factorName',
					value: "材料评分"
				});
				params.push({
					name: 'evaluateResultModel.resultItemList[' + index + '].finalScore',
					value: $("#materialResultScore").html()
				});
			}
			index++;
		}
	);
	//指标tr
	$("#templateIndexDivId tr[id*='_']").each(
		function(){
			$this = $(this);
			var thisId = $this.attr("id").split("_");
			var parentPid = thisId[0];
			var indexPid = thisId[1];
			var $score = $this.find("[id$='_score']");
			var scoreValue = "";
			var tagName = $score.get(0).tagName;
			if(tagName == "TD" || tagName == "td")
				scoreValue = $score.html();
			else
				scoreValue = $score.val();
			params.push({ //因子父节点逻辑ID
				name: 'evaluateResultModel.resultItemList[' + index + '].factorParentPid',
				value: parentPid
			});
			params.push({//因子逻辑ID
				name: 'evaluateResultModel.resultItemList[' + index + '].factorPid',
				value: indexPid
			});
			params.push({//因子名称
				name: 'evaluateResultModel.resultItemList[' + index + '].factorName',
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
			var url = $this.find("td[id$='_url']").html();
			if( url!=null && url!=undefined)
				url = url.replace(/&nbsp;/g,"")
			params.push({
				name: 'evaluateResultModel.resultItemList[' + index + '].factorUrl',
				value: url
			});
			params.push({
				name: 'evaluateResultModel.resultItemList[' + index + '].fullMarks',
				value: '100'
			});
			params.push({
				name: 'evaluateResultModel.resultItemList[' + index + '].finalScore',
				value: $this.find("span[id$='_finalScore']").html()
			});
			index++;
		}
	)
	//指标div
	$("#templateIndexDivId div[id*='_']").each(
		function(){
			$this = $(this);
			var thisId = $this.attr("id").split("_");
			var parentPid = thisId[0];
			var indexPid = thisId[1];
			if(indexPid!=undefined && indexPid!=null && indexPid!="")
			{ 
				params.push({ //因子父节点逻辑ID
					name: 'evaluateResultModel.resultItemList[' + index + '].factorParentPid',
					value: parentPid
				});
				params.push({//因子逻辑ID
					name: 'evaluateResultModel.resultItemList[' + index + '].factorPid',
					value: indexPid
				});
				params.push({//因子名称
					name: 'evaluateResultModel.resultItemList[' + index + '].factorName',
					value: $this.find("span:first").html().replace(/&nbsp;/g,"")
				});
				params.push({//
					name: 'evaluateResultModel.resultItemList[' + index + '].score',
					value: $this.find("span[id$='_score']").html()
				});
				params.push({
					name: 'evaluateResultModel.resultItemList[' + index + '].percentage',
					value: $this.find("span[id$='_percentage']").html().replace(/&nbsp;/g,"")
				});
				params.push({
					name: 'evaluateResultModel.resultItemList[' + index + '].fullMarks',
					value: '100'
				});
				params.push({
					name: 'evaluateResultModel.resultItemList[' + index + '].finalScore',
					value: $this.find("span[id$='_finalScore']").html()
				});
			} else {
				params.push({ //因子父节点逻辑ID
					name: 'evaluateResultModel.resultItemList[' + index + '].factorParentPid',
					value: $("#cretitApplyPid").val()
				});
				params.push({//因子逻辑ID
					name: 'evaluateResultModel.resultItemList[' + index + '].factorPid',
					value: parentPid
				});
				params.push({//因子名称
					name: 'evaluateResultModel.resultItemList[' + index + '].factorName',
					value: "指标评分"
				});
				params.push({
					name: 'evaluateResultModel.resultItemList[' + index + '].finalScore',
					value: $("#indexResultScore").html()
				});

			}
			index++;
		}
	)

	return params;
}

function pushMaterialItemToParam(param,index){
	
}

