angular.module('starter.controllers', [])

  .controller('STController', function($scope,MapManager,$ionicModal,HTTPManager,Show,userInfo,$state,$rootScope,resize,dateTool) {

    $scope.isShowContent = false;
    $scope.markerInfo = {};
    $scope.toUserID = 0;
    //$state 可以切换路由的位置 go
    var types = ["代购","代练","代驾","宠物代养","洗车","跑腿"];
    //初始化数据模型
    $scope.infoModal = {};
    $scope.mapSize = {
      width:innerWidth+"px",
      height:(innerHeight-88)+"px"
    };

    function changeInfoType(info) {
      var newInfo = {};
      newInfo.type = types[parseInt(info.type)];
      newInfo.startTime = new Date(info.startTime).toDateString();
      newInfo.startTimeString = dateTool.toMDH(info.startTime);
      newInfo.endTimeString = dateTool.toMDH(info.endTime);
      return newInfo;
    }
    resize.fullMap($scope);

    function loadNews() {
      HTTPManager.get(HOST+SEARCH_All_USERS_LAST_NEWS).then(function (result) {
        console.log(result);

        if (result.data.data){
          result.data.data.forEach(function (info) {
            //只要使用回调函数 都需要 更改$rootScope作用域
            //需要使用$apply去更改
            MapManager.addMarker(info,true,function (markerInfo) {
              resize.tabBarSizeControl($rootScope,$scope);

              $scope.$apply(function (scope) {
                $scope.toUserID = markerInfo.userID;
                scope.isShowContent = !scope.isShowContent;
                scope.markerInfo = changeInfoType(markerInfo);
              });

              MapManager.pointToAddress(markerInfo.curPoint).then(function (result) {
                $scope.$apply(function (scope) {
                  scope.markerInfo.address = result.address;
                });
              });
            },function () {
              resize.tabBarSizeControl($rootScope,$scope);
              $scope.$apply(function (scope) {
                scope.isShowContent = !scope.isShowContent;
              });
            });
          });
        }
      }).catch(function (error) {
        Show.showAlertDelay(error.message,3);
        console.log(error);
      });
    }
    loadNews();
    MapManager.showMap();

    $ionicModal.fromTemplateUrl('updateModal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;


    });
    $scope.updateMessage = function () {
      //  如果 用户登录了
      //  查询用户是不是 验证过的
      userInfo.getInfo("userid")&&userInfo.getInfo("isValidity")==="true"?$scope.modal.show():$state.go("tab.user");
      // $scope.modal.show();
    };


    $scope.hideMessage = function () {
      $scope.modal.hide();
    };

    $scope.toUpdate = function () {

      if ($scope.infoModal.time){
        $scope.infoModal.endTime = $scope.infoModal.time.getTime();
      }

      if ($scope.infoModal.typeStr){
        //将字符串 转成 对应的数据类型
        $scope.infoModal.type = types.indexOf($scope.infoModal.typeStr);
      }
      console.log($scope.infoModal.endTime);

      $scope.infoModal.startTime = new Date().getTime();
      $scope.infoModal.userID = 10;
      MapManager.getCurrentLocation().then(function (point) {
        $scope.infoModal.lat = point.lat;
        $scope.infoModal.lng = point.lng;
        HTTPManager.post(HOST+ADD_NEWS,$scope.infoModal).then(function (result) {
          console.log(result);
          if (result.data.code === 2000){
            $scope.modal.hide();
          }else {
            Show.showAlertDelay(result.data.message,3);
          }
        }).catch(function (error) {
          //  弹出错误提示窗口
          Show.showAlertDelay(error.message,3);
        });
      });
      console.log($scope.infoModal)
    };

  })

  .controller('FriendsController', function($scope) {})

  .controller('RankController', function($scope) {})

  .controller('UserController', function($scope,userInfo) {
    //登录成功
    var info = {userid:10,phone:"851285142",username:"xiaobai",isValidity:true};
    userInfo.saveInfo(info);
  })

  .controller("MessageController",function ($scope,$stateParams,HTTPManager) {
    $scope.friendInfo = {};

    $scope.size = {
      width:innerWidth+"px",
      height:(innerHeight-44)+"px"
    };

    HTTPManager.get().then(function (result) {
      $scope.friendInfo = result.data.data[0];
    }).catch(function (error){

    });
    $scope.sendInfo = {};
    $scope.sendMessage = function () {

    }
  });
