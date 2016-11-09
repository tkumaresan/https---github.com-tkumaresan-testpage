coalesceModule.service('ChartOptionsService', function(){

	this.getFundRaisingChart = function(data, title, subtitle, height){
		return {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                height:height,
                width:450,
                backgroundColor:'transparent'
            },
            title: {
                text: title,
	            align:'center',
	            style: {
	                color: '#686868',
	                fontWeight: 'bold'
	            }
            },
            subtitle: {
            	text:"",
	            align:'center',
	            style: {
	                color: '#686868',
	                fontWeight: '400'
	            },
	            verticalAlign: 'middle',
	            floating: true
            },
            legend: {
            	enabled:false,
                itemMarginTop: 10
          },
            tooltip: {
                pointFormat: '<b>${point.y:.1f}M</b>'
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true,
                        useHTML: true,
                        formatter: function() {
                            return "<div class='chart-label-color'><b>"+this.key+"</b>: $"+ this.y +"M</div>";
                        },
                        color:'black'
                    }
                },
                pie: {
                    innerSize: '80%',
                    allowPointSelect: true,
                    cursor: 'pointer',
                    showInLegend: true
                }
            },
            series: [{
                name: "",
                colorByPoint: true,
                data: data
            }]
		}
	};
	
	this.companyScaleLineChart = function(data, title, subtitle, height){
		return {
	        chart: {
	            type: 'line',
                height:height,
                width:450,
                backgroundColor:'transparent'
	        },
	        title: {
	            text: title,
	            align:'center'
	        },
	        subtitle: {
	            text: subtitle,
	            align:'center',
	            style: {
	                color: '#686868',
	                fontWeight: 'bold'
	            }
	        },
            legend: {
            	enabled:false
            },
	        tooltip: {
	            valueSuffix: ''
	        },
	        xAxis: {
	        	//x-axis data
	            categories: data.xAxisData,
	            title: {
	                text: null
	            }
	        },
	        yAxis: {
	            title: {
	                text: null
	            }
	        },
	        series: [{
	            name: "",
	            data: data.data,
	            color:data.color
	        }]
		}
		
	};
	
})
