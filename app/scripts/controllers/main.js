'use strict';
angular.module( 'scatterDemo' )
	.controller( 'MainCtrl', function ( $scope, $http ) {
		///////////////
		//	CHART //
		///////////////
		//	get data for chart
		d3.json( 'data.json', function ( err, data ) {
			if ( !err ) {
				//	add new graph to controller
				nv.addGraph( function ( ) {
					//	use scatterplot plust line chart and set options
					var chart = nv.models.scatterPlusLineChart( )
						.showDistX( true )
						.showDistY( true )
						.useVoronoi( false )
						.interactive( true )
						.tooltipContent( function ( key, x, y, z ) {
							return '<h3>' + key + '</h3><h5>' + x + ',' + y + '</h5>';
						} )
						.color( d3.scale.category10( ).range( ) );
					//	axis settings
					chart.xAxis.axisLabel( 'Drug Convictions' ).tickFormat( d3.format( '.1f' ) );
					chart.yAxis.axisLabel( 'Medical Board Exam Result' ).tickFormat( d3.format( '.1f' ) );
					//	insert svg into div with d3
					d3.select( '#chart' )
						.append( 'svg:svg' )
						.datum( data )
						.transition( ).duration( 500 )
						.call( chart );
					//	refresh on wndow resize
					nv.utils.windowResize( chart.update );
					//	bind to event when mouse over datapoint
					chart.scatter.dispatch.on( 'elementMouseover', function ( e ) {
						//	iterate eacj row in data grid looking for corresponding key to e.point
						$( '.vdvRow' ).each( function ( index, row ) {
							if ( ( $( row ).children( '.vdv_series' ).data( 'key' ) == e.point.key ) ) {
								//	on finding the right row reset active row
								$( 'tr' ).removeClass( 'vdvactive' );
								//	add active class to row
								$( row ).addClass( 'vdvactive' );
								//	animate scrolling into view
								$( '.tableContain' ).scrollTo( row, 250 );
							}
						} );
					} );
					//	return constructor
					return chart;
				} );
			} else console.log( err ); //	on error
		} );
	} );