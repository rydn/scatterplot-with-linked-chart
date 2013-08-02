'use strict';
angular.module( 'scatterDemo', [ ] ).config( function ( $routeProvider ) {
        $routeProvider.when( '/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
        } ).otherwise( {
                redirectTo: '/'
        } );
} ).run( function ( $rootScope, $location ) {} );