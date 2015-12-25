angular.module('DollarTrackerApp', ['ionic','ionic.utils','satellizer', 'ngCordova','ngFileUpload'])
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

            //            DSCacheFactory("leagueDataCache", {
            //                storageMode: "localStorage",
            //                maxAge: 360000,
            //                deleteOnExpire: "aggressive"
            //            });
            //            DSCacheFactory("leaguesCache", {
            //                storageMode: "localStorage",
            //                maxAge: 360000,
            //                deleteOnExpire: "aggressive"
            //            });
            //            DSCacheFactory("myTeamsCache", {
            //                storageMode: "localStorage"
            //            });
            //            DSCacheFactory("staticCache", {
            //                storageMode: "localStorage"
            //            });
        });
    })

.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$authProvider', 
         function ($stateProvider, $urlRouterProvider,$httpProvider, $authProvider) {
    $stateProvider

        .state('app', {
            //             abstract: true,
            url: "/app",
            templateUrl: "app/layout/menu-layout.html"
        })
        .state('login', {
            url: "/login",
            templateUrl: "app/login/login.html"
    })
        .state('home', {
            url: "/home",
            templateUrl: "app/home/home.html",
            controller:"homeCtrl"
        })
        .state('account', {
            url: "/account",
            templateUrl: "app/account/account.html"
        })
    var API_URL = 'http://dev-dollartracker.azurewebsites.net/api/';
    $authProvider.apiServer = API_URL;
    $authProvider.loginUrl = API_URL + 'login';
    $authProvider.signupUrl = API_URL + 'account';
    $authProvider.loginRedirect = '/home';
    $authProvider.logoutRedirect = '/login';
    $authProvider.signupRedirect = '/login';
    $authProvider.loginOnSignup = false;
    $authProvider.storageType = 'localStorage';
    $authProvider.withCredentials = false;
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
    $httpProvider.interceptors.push('authInterceptor');
    $urlRouterProvider.otherwise("login");
}])