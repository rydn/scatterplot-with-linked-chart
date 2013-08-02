'use strict';
angular.module( 'scatterDemo', [ ] ).config( function ( $routeProvider ) {
	//	routing
	$routeProvider.when( '/', {
		templateUrl: 'views/main.html',
		controller: 'MainCtrl'
	} ).otherwise( {
		redirectTo: '/'
	} );
} ).run( function ( $rootScope, $location, $http ) {
	//	angular root scope variables
	$rootScope.vd = [ ];
	$rootScope.vdCount = 0;
	//	get data for view
	$http.get( 'data.json' ).success( function ( d ) {
		var _data = [ ];
		//	function for processing data group
		var getGroupData = function ( group ) {
			//	iterate each data item in group
			for ( var i = group.values.length - 1; i >= 0; i-- ) {
				//	index
				$rootScope.vdCount++;
				//	current item
				var item = group.values[ i ];
				//	set index
				item.id = $rootScope.vdCount;
				//	set group property
				item.group = group.key;
				//	push into array
				_data.push( item );
				//	if we have got to the end of the collection
				if ( i == 0 ) {
					return _data;
				}
			}
		};
		//	iterate each data group
		for ( var i = d.length - 1; i >= 0; i-- ) {
			var group = d[ i ];
			//	process each group
			getGroupData( group );
		}
		//	set scoped view
		$rootScope.vd = _data;
	} );
} );