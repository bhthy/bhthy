"use strict";angular.module("getlancerApp.Common.UserFollow",["ngResource","ngSanitize","satellizer","ngAnimate","ui.bootstrap","ui.bootstrap.datetimepicker","ui.router","angular-growl","google.places","angular.filter","ngCookies","angular-md5","ui.select2","ui.select","http-auth-interceptor","vcRecaptcha","angulartics","pascalprecht.translate","angulartics.google.analytics","tmh.dynamicLocale","ngMap","chieffancypants.loadingBar","payment","builder","builder.components","validator.rules","angularMoment","ngFileUpload","oitozero.ngSweetAlert","720kb.socialshare","slugifier"]),angular.module("getlancerApp.Common.UserFollow").directive("profileViewFollower",function(){return{restrict:"EA",replace:!0,templateUrl:"scripts/plugins/Common/UserFollow/views/default/user_follow.html",controller:function($rootScope,$scope,$state,$filter,UnfollowFactory,FollowersFactory,$stateParams,flash){$scope.user_id=$stateParams.id;var flash;$scope.userFollow=function(){var follow={};follow.foreign_id=$scope.user_id,follow["class"]="User",FollowersFactory.create(follow,function(response){0===response.error.code?(flash.set($filter("translate")("Follow successfully."),"success",!1),$scope.follow_id=response.id,$scope.isfollow=!0):flash.set($filter("translate")("Follow failure."),"error",!1)})},$scope.UserUnFollow=function(follow_id){var follow={};follow.followerId=follow_id,UnfollowFactory.remove(follow,function(response){0===response.error.code?(flash.set($filter("translate")("UnFollow successfully."),"success",!1),$scope.follow_id=0,$scope.isfollow=!1):flash.set($filter("translate")("UnFollow failure."),"error",!1)})}}}}),angular.module("getlancerApp.Common.UserFollow").factory("FollowersFactory",["$resource",function($resource){return $resource("/api/v1/followers",{},{get:{method:"GET"},create:{method:"POST"}})}]).factory("UnfollowFactory",["$resource",function($resource){return $resource("/api/v1/followers/:followerId",{},{remove:{method:"DELETE",params:{followerId:"@followerId"}}})}]),angular.module("getlancerApp.Common.UserFollow").run(["$templateCache",function($templateCache){$templateCache.put("scripts/plugins/Common/UserFollow/views/default/user_follow.html",'<div ng-show="(userprofile.id != user.id && settings.SITE_ENABLED_PLUGINS.indexOf(\'Common/UserFollow\') > -1)" class="space no-pad"> <ul ng-show="!isfollow && isAuth" class="list-inline share user-share"> <li> <ul class="list-inline"> <li class="share-border cursor"> <a href="" ng-click="userFollow()" class="text-primary"><i class="fa fa-heart"></i></a> </li> <li> <a href="" ng-click="userFollow()" class="grayc" title="{{\'Follow\'| translate}}">{{\'Follow\'| translate}}</a> </li> </ul> </li> </ul> <ul ng-show="isfollow && isAuth" class="list-inline share user-share"> <li> <ul class="list-inline"> <li class="share-border"><a href="" ng-click="UserUnFollow(follow_id)" class="text-primary"><i class="fa fa-heart"></i></a></li> <li><a href="" ng-click="UserUnFollow(follow_id)" class="grayc" title="{{\'Unfollow\'| translate}}">{{\'Unfollow\'| translate}}</a></li> </ul> </li> </ul> </div>')}]);