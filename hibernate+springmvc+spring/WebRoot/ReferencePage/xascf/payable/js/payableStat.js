$(document).ready(function() {
	var url = "xascf/payable/gePayableStatistic.shtml";
	var expectedFundAmount = new Array();
	var expectedPayAmount  = new Array();
	var snap = new Array(); 
	$.ajax({
        type:"POST",
        url:url,
        dataType:'json',
        async:false,
        success:function(data){
        	var payAbleList=data.payAbleList;
        	var incomeList =data.incomeList;
        	
        	//应付
			var payLen = payAbleList.length;  
			for (var i = 0; i < payLen; i++) { 
					expectedPayAmount.push([payAbleList[i].businessNo ,Number(payAbleList[i].actualAmount)]);
			} 
			
			//应收
			var inLen = incomeList.length;  
			for (var i = 0; i < inLen; i++) { 
					expectedFundAmount.push([incomeList[i].businessNo ,Number(incomeList[i].paidPrice)]);
			}  
        }
	});
	

	var plot2 = $.jqplot('payableExpectedContainer', [expectedFundAmount, expectedPayAmount ], {
		title : '收入成本条形统计图',
		series : [ {
			renderer : $.jqplot.BarRenderer
		} ],
		axes : {
			// 横坐标说明
			xaxis : {
				label : "月份",
				min : "1",
				tickInterval : '1 months',
				renderer : $.jqplot.DateAxisRenderer,
				tickOptions : {
					formatString : '%m',
					labelPosition : 'start'
				},
			},
			// 纵坐标说明
			yaxis : {
				label : "金额(元)",
				min : 0,
				autoscale : true
			}
		},
		seriesDefaults : {
			shadow: true,
			renderer : $.jqplot.BarRenderer, //使用柱状图表示
			rendererOptions : {
				//柱状体组之间间隔
				barMargin : 220
			}
		},
		highlighter : {
			show : true,
			sizeAdjust : 7.5,
			lineWidthAdjust : 2.5,
			sizeAdjust : 5,
			showTooltip : true

		},
		cursor : {
			show : false
		},
		series : [ {
			label : '收入'
		}, {
			label : '成本'
		}, ],
		legend : {
			show : true,
			placement : 'outsideGrid'
		}
	});
 
});
