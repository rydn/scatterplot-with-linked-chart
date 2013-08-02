'use strict';
angular.module( 'scatterDemo' )
	.controller( 'MainCtrl', function ( $scope, $http ) {
		$scope.vd = [ ];
		$scope.vdCount = 0;
		$http.get( 'data.json' ).success( function ( d ) {
			var _data = [ ];
			var getGroupData = function ( group ) {
				for ( var i = group.values.length - 1; i >= 0; i-- ) {
					$scope.vdCount++;
					var item = group.values[ i ];
					item.id = $scope.vdCount;
					item.group = group.key;
					_data.push( item );
					if ( i == 0 ) {
						return _data;
					}
				};
			}
			for ( var i = d.length - 1; i >= 0; i-- ) {
				var group = d[ i ];
				getGroupData( group );
			};
			$scope.vd = _data;
			d3.json( 'data.json', function ( err, data ) {
				if ( !err ) {
					nv.addGraph( function ( ) {
						var chart = nv.models.scatterPlusLineChart( )
							.showDistX( true )
							.showDistY( true )
							.useVoronoi( false )
							.interactive( true )
							.tooltipContent( function ( key, x, y, z ) {
								return '<h3>' + key + '</h3><h5>' + x + ',' + y + '</h5>'
							} )
							.color( d3.scale.category10( ).range( ) );
						chart.xAxis.axisLabel( 'Drug Convictions' ).tickFormat( d3.format( '.1f' ) )
						chart.yAxis.axisLabel( 'Medical Board Exam Result' ).tickFormat( d3.format( '.1f' ) )
						d3.select( '#chart' )
							.append( "svg:svg" )
							.datum( data )
							.transition( ).duration( 500 )
							.call( chart );
						nv.utils.windowResize( chart.update );
						chart.scatter.dispatch.on( 'elementMouseover', function ( e ) {
							
							$( '.vdvRow' ).each( function ( index, row ) {

								if ( ( $( row ).children( '.vdv_series' ).data( 'key' ) == e.point.key ) ) {
									$( 'tr' ).removeClass( 'vdvactive' );
									$( row ).addClass( 'vdvactive' );
									$( '.tableContain' ).animate( {
										scrollTop: $( row ).offset( ).top +20
									}, 500 );
								}
							} )
						} );
						return chart;
					} );
					d3.selectAll( "nv-point" ).on( "click", function ( ) {
						console.log( "clicked" );
					} );
				} else console.log( err );
			} );
		} );
	} );