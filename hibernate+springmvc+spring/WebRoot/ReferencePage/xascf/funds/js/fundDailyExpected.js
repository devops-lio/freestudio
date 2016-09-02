$(document).ready(function() {
	PUI.plugin.init();
	sns.valid.init($("form"));
	initContainer();
	$("#accountUsage").on("change",
		function(){
			var param = $("#queryCondition").serializeArray();
			initContainer(param);
		}
	);


});

function initContainer(param){
	var url = "xascf/fund/dailyExpected/getDailyExpected4Statistic.shtml";
	var expectedFundAmount = new Array();
	var expectedPayAmount  = new Array();
	$.ajax({
        type:"POST",
        url:url,
        data:param,
        dataType:'json',
        async:false,
        success:function(data){
			var i, len = data.length;
			if(len==0){
				$("#fundDailyExpectedContainer").html("<h1>暂无数据</h1>")
			} else{
				for (i = 0; i < len; i++) {
					expectedFundAmount.push([data[i].expectedDate,Number(data[i].expectedFundAmount)]);
					expectedPayAmount.push([data[i].expectedDate,Number(data[i].expectedPayAmount)]);
				}
				$("#fundDailyExpectedContainer").html("")
				plot2 = $.jqplot('fundDailyExpectedContainer', [expectedFundAmount,expectedPayAmount], {
			    	title: '未来十天内资金账号及支出曲线图',
			      	axesDefaults: {
			      	},
			      	axes: {
			       		// 横坐标说明
			        	xaxis: {
			          	//	label: "日期",
			          		tickInterval:'1 days',
			          		renderer:$.jqplot.DateAxisRenderer,
			           		tickOptions:{formatString:'%Y-%m-%d'}
			        	},
			         	// 纵坐标说明
			        	yaxis: {
			          		label: "金额",
			          		min:0
			        	}
			    	},
			     	highlighter: {
		        		show: true,
		        		sizeAdjust: 7.5
		      		},
		      		cursor: {
		        		show: false
		      		},
			      	series: [
			            {label:'资金账号'},
			            {label:'应付资金'},
			        ],
			        legend: {
			            show: true,
			            placement: 'outsideGrid'
			        }
		    	});		
			}
        }
	});
}
