
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services',"starter.HTTPServices"])

.run(function($ionicPlatform,$rootScope) {
  //是否隐藏分栏
  $rootScope.isHideTabBar = false;
  $ionicPlatform.ready(function() {

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

  $ionicConfigProvider.platform.android.tabs.position("bottom");
  $ionicConfigProvider.platform.android.navBar.alignTitle("center");


  $stateProvider
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

    .state('tab.st', {
      url: '/st',
      views: {
      'tab-st': {
        templateUrl: 'templates/tab-st.html',
        controller: 'STController'
      }
    }
  })

    .state('tab.message', {
      url: '/message/:userID',
      views: {
        'tab-st': {
          templateUrl: 'templates/message.html',
          controller: 'MessageController'
        }
      }
    })

    .state('tab.friends', {
      url: '/friends',
      views: {
        'tab-friends': {
          templateUrl: 'templates/tab-friends.html',
          controller: 'FriendsController'
        }
      }
    })
    .state('tab.rank', {
      url: '/rank',
      views: {
        'tab-rank': {
          templateUrl: 'templates/tab-rank.html',
          controller: 'RankController'
        }
      }
    })
    .state('tab.user', {
    url: '/user',
    views: {
      'tab-user': {
        templateUrl: 'templates/tab-user.html',
        controller: 'UserController'
      }
    }
  });

  $urlRouterProvider.otherwise('/tab/st');

});
