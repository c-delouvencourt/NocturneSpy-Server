App = angular.module('AdoBot', [
    'ui.router',
    'ngRoute',
    'btford.socket-io',
    'ui.bootstrap',
    'ngAnimate',
    'toastr',
    'angular-duration-format',
    'angularMoment',
    'http-auth-interceptor',
    'uiGmapgoogle-maps',
    'angular-loading-bar',
])
    .config(['uiGmapGoogleMapApiProvider', function (uiGmapGoogleMapApiProvider) {
        var config = {
            key: 'AIzaSyD5DvmWUiIYaxtKllJJ8csLr6j4EPBIlKs',
            v: '3', //defaults to latest 3.X anyhow
            libraries: 'weather,geometry,visualization'
        }
        uiGmapGoogleMapApiProvider.configure(config);
    }])
    .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = true;
    }])
    .run(function(amMoment) {
        amMoment.changeLocale('fr');
    })
    .run([
        '$http',
        '$rootScope',
        function ($http, $rootScope) {
            $http.defaults.headers.common.username = localStorage.getItem('username')
            $http.defaults.headers.common.password = localStorage.getItem('password')
            $rootScope.$on('event:auth-loginRequired', function (event, data) {
                localStorage.removeItem('username')
                localStorage.removeItem('password')
                window.location.reload()
            })
        }
    ])
