coalesceModule.service('chartsService', function(){

	this.pieChart =  function(chartOptions, scope){
		var container = this[0];
		var $defaults ={
	            chart: {
					renderTo:container,
					type: 'pie',
					backgroundColor:'rgba(255, 255, 255, 0.1)',
		            options3d: {
		                enabled: true,
		                alpha: 45,
		                beta: 0
		            }
	            },
				credits: {
					enabled:false
				},
	            title: {
	                text: ''
	            },
	            tooltip: {
	                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	            },
	            plotOptions: {
	                pie: {
	                    allowPointSelect: true,
	                    cursor: 'pointer',
	                    dataLabels: {
	                        enabled: false
	                    },
	                    showInLegend: true
	                }
	            }
		};

		$.extend(true, $defaults, chartOptions);
		var _chart = new Highcharts.Chart($defaults);
		return _chart;

	};
	
	
	this.donutChart =  function(chartOptions, scope){
		var container = this[0];
		var $defaults ={
	            chart: {
					renderTo:container,
					type: 'pie'
	            },
				credits: {
					enabled:false
				},
	            title: {
	                text: ''
	            },
	            tooltip: {
	                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	            },
	            plotOptions: {
	                pie: {
	                    allowPointSelect: true,
	                    cursor: 'pointer',
	                    dataLabels: {
	                        enabled: true
	                    },
	                    showInLegend: true
	                }
	            },
	            series:[{
	            }]
		};

		$.extend(true, $defaults, chartOptions);
		var _chart = new Highcharts.Chart($defaults);
		return _chart;

	};
	
	this.lineChart =  function(chartOptions, scope){
		var container = this[0];
		var $defaults ={
	            chart: {
					renderTo:container,
					type: 'line'
	            },
				credits: {
					enabled:false
				},
	            title: {
	                text: ''
	            }
		};

		$.extend(true, $defaults, chartOptions);
		var _chart = new Highcharts.Chart($defaults);
		return _chart;

	};
	
})
