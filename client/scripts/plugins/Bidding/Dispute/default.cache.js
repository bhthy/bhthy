"use strict";angular.module("getlancerApp.Bidding.Dispute",["getlancerApp.Bidding.Constant","ngResource","ngSanitize","satellizer","ngAnimate","ui.bootstrap","ui.bootstrap.datetimepicker","ui.router","angular-growl","google.places","angular.filter","ngCookies","angular-md5","ui.select2","http-auth-interceptor","angulartics","pascalprecht.translate","angulartics.google.analytics","tmh.dynamicLocale","ngFileUpload","infinite-scroll","ngTagsInput","angularMoment","bc.Flickity","afkl.lazyImage","angular-loading-bar","ngAnimate","oitozero.ngSweetAlert","slugifier","checklist-model","angularjs-dropdown-multiselect","rzModule"]).config(function($stateProvider,$urlRouterProvider){}),angular.module("getlancerApp.Bidding.Dispute").directive("biddingDispute",function(){return{restrict:"EA",templateUrl:"scripts/plugins/Bidding/Dispute/views/default/bidding_project_dispute.html",scope:{bidid:"@",project:"@",biduser:"@",projectuser:"@",isdispute:"@",projectstatus:"@"},controller:function($scope,$rootScope,$cookies,$state,$filter,flash,SweetAlert,DisputeStatus,ProjectDispute,md5){if($scope.auth=JSON.parse($cookies.get("auth")),"true"!==$scope.isdispute)$scope.data={},$scope.closefrm=function(){$scope.project_dispute=$rootScope.project_dispute=!1,$state.go("Bid_ProjectView",{id:$state.params.id,slug:$state.params.slug,action:"messages"},{reload:!0})},DisputeStatus.get({id:$scope.bidid},function(response){0===parseInt(response.error.code)&&($scope.disputeTypes=response.data)},function(error){console.log("DisputeStatus",error)}),$scope.dispute_submit=!1,$scope.disputeSubmit=function($valid,data){$valid&&($scope.dispute_submit=!0,data.bid_id=$scope.bidid,SweetAlert.swal({title:$filter("translate")("Are you sure you raise the dispute for this project?"),text:"",type:"warning",showCancelButton:!0,confirmButtonColor:"#DD6B55",confirmButtonText:"OK",cancelButtonText:"Cancel",closeOnConfirm:!0,animation:!1},function(isConfirm){isConfirm&&ProjectDispute.post(data,function(response){$scope.dispute_submit=!1;var flashMessage="";0===parseInt(response.error.code)?(flashMessage=$filter("translate")("Your dispute request sent successfully."),flash.set(flashMessage,"success",!1),$state.reload()):(flashMessage=$filter("translate")("Your dispute request sending failed."),flash.set(flashMessage,"error",!1),$scope.dispute_submit=!1)},function(error){console.log(error)}),$scope.dispute_submit=!1}))};else{var params={project_id:$scope.project,bid_id:$scope.bidid,user_id:$scope.biduser,fields:"id,reason,user_id,dispute_status_id,created_at"};ProjectDispute.get(params,function(response){0===parseInt(response.error.code)&&($scope.dispute=response.data[0],angular.isDefined($scope.dispute.user.attachment)&&null!==$scope.dispute.user.attachment?$scope.user_avatar_url="images/normal_thumb/UserAvatar/"+$scope.dispute.user.id+"."+md5.createHash("UserAvatar"+$scope.dispute.user.id+"pngnormal_thumb")+".png":$scope.user_avatar_url="images/default.png")},function(error){console.log("ProjectDispute Get",error)})}}}}),angular.module("getlancerApp.Bidding.Dispute").directive("biddingDisputeMessage",function(){return{restrict:"EA",templateUrl:"scripts/plugins/Bidding/Dispute/views/default/bidding_project_dispute_message.html",scope:{bidid:"@",project:"@",biduser:"@",projectuser:"@",projectstatus:"@",disputeid:"@",disputestatus:"@"},controller:function($scope,$rootScope,$timeout,$state,$cookies,$filter,flash,md5,ProjectStatusConstant,SweetAlert,Messages,Upload,DisputeMsgClass,DisputeStatusConstant){$scope.DisputeStatusConstant=DisputeStatusConstant,$timeout(function(){$scope.GetMessages=function(){Messages.get({foreign_id:$scope.disputeid,"class":DisputeMsgClass["class"]},function(response){0===parseInt(response.error.code)?($scope.messages=response.data,angular.forEach($scope.messages,function(value){angular.isDefined(value.user.attachment)&&null!==value.user.attachment?value.user.user_avatar_url="images/big_thumb/UserAvatar/"+value.user.id+"."+md5.createHash("UserAvatar"+value.user.id+"pngbig_thumb")+".png":value.user.user_avatar_url="images/default.png"})):$scope.messages=[]})},$scope.GetMessages()},2e3),$scope.data={},$scope.post_messages=!1,$scope.PostMessages=function(messageFrm,$valid){if($valid){$scope.post_messages=!0;var projectName=$state.params.slug,msgparams={foreign_id:$scope.disputeid,"class":DisputeMsgClass["class"]};msgparams.parent_id=0,msgparams.subject=$filter("capitalize")(projectName.replace(/-/g,"+")),msgparams.message=$scope.data.message,msgparams.image=$scope.file,console.log(msgparams),Messages.post(msgparams,function(response){var flashMessage="";console.log(response),0===parseInt(response.error.code)?($scope.post_messages=!1,flashMessage=$filter("translate")("Message sent successfully."),flash.set(flashMessage,"success",!1),$scope.data.message="",$scope.GetMessages(),messageFrm.$setPristine(),messageFrm.$setUntouched()):(flashMessage=$filter("translate")(response.error.message),flash.set(flashMessage,"error",!1),$scope.post_messages=!1)})}}}}}),angular.module("getlancerApp.Bidding").directive("biddingReview",function(){return{restrict:"EA",templateUrl:"scripts/plugins/Bidding/Dispute/views/default/bidding_project_review.html",scope:{bidid:"@",project:"@",biduser:"@",projectuser:"@",isdispute:"@",projectstatus:"@"},controller:function($scope,$rootScope,$cookies,$state,$filter,flash,SweetAlert,biddingReviewFactory,ProjectEditView){function usersDetail(){var getParams={id:$state.params.id,fields:"id,project_status_id,is_dispute,is_cancel_request_freelancer,is_cancel_request_employer"};ProjectEditView.get(getParams,function(response){$scope.reviewsLists=response.data.reviews,angular.forEach($scope.reviewsLists,function(reviewList){reviewList.user_id==$rootScope.user.id&&($scope.review.rating=reviewList.rating,$scope.review.message=reviewList.message,$scope.reviewid=reviewList.id)})})}$scope.auth=JSON.parse($cookies.get("auth"));var flashMessage;$scope.review={},$scope.rating_review=!0,$scope.reviewSubmit=function(is_valid){if(is_valid&&0==$scope.review.rating?(is_valid=!1,$scope.rating_review=!1):is_valid&&$scope.review.rating>0&&(is_valid=!0,$scope.rating_review=!0),is_valid)if($scope.reviewid){var params={};params.id=$scope.reviewid,params.rating=$scope.review.rating,params.message=$scope.review.message,biddingReviewFactory.put(params,function(response){0===response.error.code?(flashMessage=$filter("translate")("review updated successfully."),flash.set(flashMessage,"success",!1),$scope.closefrm()):(flashMessage=$filter("translate")(response.error.message),flash.set(flashMessage,"error",!1))})}else{var params={};params.foreign_id=$scope.bidid,params["class"]="Bid",params.rating=$scope.review.rating,params.message=$scope.review.message,biddingReviewFactory.post(params,function(response){0===response.error.code?(flashMessage=$filter("translate")("review added successfully."),flash.set(flashMessage,"success",!1),$scope.closefrm()):(flashMessage=$filter("translate")(response.error.message),flash.set(flashMessage,"error",!1))})}},$scope.closefrm=function(){$state.go("Bid_ProjectView",{id:$state.params.id,slug:$state.params.slug,action:"messages"},{reload:!0})},usersDetail()}}}),angular.module("getlancerApp.Bidding.Dispute").factory("DisputeStatus",["$resource",function($resource){return $resource("/api/v1/bids/:id/dispute_open_types",{},{get:{method:"GET"}})}]).factory("ProjectDispute",function($resource){return $resource("/api/v1/project_disputes",{},{get:{method:"GET"},post:{method:"POST"}})}),angular.module("getlancerApp.Bidding.Dispute").run(["$templateCache",function($templateCache){$templateCache.put("scripts/plugins/Bidding/Dispute/views/default/bidding_project_dispute.html",'<div class="clearfix" id="dispute-block"> <h3 class="clearfix montserrat-bold text-18">{{\'Dispute\'|translate}}</h3> <div ng-if="isdispute == \'false\'" class="top-space"> <form class="form-horizontal row" name="disputeFrm" ng-submit="disputeSubmit(disputeFrm.$valid, data)" novalidate> <div class="bot-20-space col-sm-12 col-md-9"> <div class="row"> <div class="col-sm-3"> <label for="review" class="">{{\'Type\'|translate}}:</label> </div> <div class="col-sm-7"> <div class="frm-select">  <select ng-model="data.dispute_open_type_id" name="dispute_open_type_id" class="form-control" ng-options="disputeType.id as disputeType.name for disputeType in disputeTypes" ng-required="true"> <option value=""> {{\'Select Dispute Type\' | translate}}</option> </select> <pan class="error" ng-show="(disputeFrm.$submitted || disputeFrm.dispute_open_type_id.$touched) && (disputeFrm.dispute_open_type_id.$pristine || disputeFrm.dispute_open_type_id.$invalid) && (disputeFrm.dispute_open_type_id.$error.required)"> {{\'Required\'| translate}}  </pan></div> </div> </div> </div> <div class="bot-20-space col-sm-12 col-md-9" ng-if="projectstatus != \'11\'"> <div class="row"> <div class="col-sm-3"> <label for="review">{{\'Expected Rating\'|translate}}:</label> </div> <div class="col-lg-7"> <input-stars ng-model="data.expected_rating" max="5" on-star-click="starCount(data.expected_rating)" name="rateing" class="cursor" required></input-stars> <span class="error" ng-show="(disputeFrm.$submitted || disputeFrm.rateing.$touched) && (disputeFrm.rateing.$pristine || disputeFrm.rateing.$invalid) && (disputeFrm.rateing.$error.required)"> {{\'Required\'| translate }} </span> </div> </div> </div> <div class="bot-20-space col-sm-12 col-md-9"> <div class="row"> <div class="col-sm-3"> <label for="review" class="">{{\'Dispute Note\'|translate}}:</label> </div> <div class="col-sm-7"> <textarea name="reason" ng-model="data.reason" class="form-control" rows="3" placeholder="{{\'Enter your dispute note\'|translate}}" ng-required="true"></textarea> <span class="error" ng-show="(disputeFrm.$submitted || disputeFrm.reason.$touched) && (disputeFrm.reason.$pristine || disputeFrm.reason.$invalid) && (disputeFrm.reason.$error.required)"> {{\'Required\'| translate }} </span> </div> </div> </div> <div class="col-sm-12 col-md-9"> <div class="row"> <div class="col-sm-offset-3 col-sm-8"> <button type="submit" ng-show="dispute_submit" class="text-uppercase btn btn-primary" disabled>{{\'Submit\'|translate}}</button> <button type="submit" class="text-uppercase btn btn-primary" ng-show="!dispute_submit">{{\'Submit\'|translate}}</button> <span class="review-cancel" ng-if="isdispute == \'false\'">  <a href="javascript:void(0)" ng-click="closefrm()" class="btn btn-danger text-14">{{\'Cancel\'|translate}}</a> </span> </div> </div> </div> </form> </div> <div ng-if="isdispute != \'false\'" class="comments-block"> <div class="comments-msg"> <div class="media"> <div class="pull-left"> <a class="blog-user-img center-block" href="users/{{dispute.user.id}}/{{dispute.user.username}}"><img ng-src="{{user_avatar_url}}" title="{{dispute.user.username}}" alt="[Image: {{dispute.user.username}}]" class="center-block img-circle"></a> </div> <div class="media-body"> <h4 class="text-16"><a href="users/{{dispute.user.id}}/{{dispute.user.username}}">{{dispute.user.username}}</a> , <span class="text-12 text-normal text-lowercase grayc"> {{ dispute.created_at | timeago}}</span></h4> <p> {{dispute.reason}} </p> </div> </div> </div>  <bidding-dispute-message bidid="{{bidid}}" project="{{project}}" biduser="{{biduser}}" projectuser="{{projectuser}" projectstatus="{{projectstatus}}" isdispute="{{isdispute}}" disputeid="{{dispute.id}}" disputestatus="{{dispute.dispute_status_id}}"></bidding-dispute-message> </div>  </div>'),$templateCache.put("scripts/plugins/Bidding/Dispute/views/default/bidding_project_dispute_message.html",'<div class="clearfix"> <div class="col-xs-12 comments-block"> <div class="clearfix comment-msg coment-setion"> <div class="media" ng-repeat="message in messages | orderBy:\'$index\':true"> <div class="pull-left"> <a class="blog-user-img center-block" href="users/{{message.user.id}}/{{message.user.username}}"><img ng-src="{{message.user.user_avatar_url}}" title="{{message.user.username}}" alt="[Image: {{message.user.username}}]" class="center-block img-circle"></a> </div> <div class="media-body"> <h4 class="text-16"><a href="users/{{message.user.id}}/{{message.user.username}}">{{message.user.username}}</a> , <span class="text-12 text-normal text-lowercase"> {{ message.created_at | timeago}} </span></h4> <p ng-bind-html="message.message_content.message"> </p> </div> </div> <div class="media" ng-if="disputestatus <= DisputeStatusConstant.UnderDiscussion"> <div class="pull-left media-top"> <img src="images/default.png" alt="[Image: USer]" class="img-circle center-block user-small"> </div> <div class="media-body"> <form role="form" name="messageFrm" ng-submit="PostMessages(messageFrm,messageFrm.$valid)" novalidate> <div class="form-group"> <label for="comments1" class="sr-only">comment</label> <textarea id="comments1" class="form-control" ng-model="data.message" name="message" placeholder="write your messages..." rows="3" ng-required="true"></textarea> <span class="error" ng-show="(messageFrm.$submitted || messageFrm.message.$touched) && (messageFrm.message.$pristine || messageFrm.message.$invalid) && (messageFrm.message.$error.required)"> {{\'Required\'| translate}} </span> </div> <div class="clearfix pull-right"> <button type="submit" ng-show="post_messages" class="gradi-rnd-btn btn btn-primary" disabled>{{\'Send\'|translate}}</button> <button type="submit" class="gradi-rnd-btn btn btn-primary" title="send" ng-show="!post_messages">Send</button> </div> </form> </div> </div> <div ng-if="disputestatus > DisputeStatusConstant.UnderDiscussion" class="navbar-btn"> <div class="alert alert-info"> <span ng-if="disputestatus == DisputeStatusConstant.WaitingforAdministratorDecision"> {{\'Waiting for Administrator Decision\'| translate}} </span> <span ng-if="disputestatus == DisputeStatusConstant.Closed"> {{\'Dispute closed\'| translate}} </span> </div> </div> </div> </div> </div>'),$templateCache.put("scripts/plugins/Bidding/Dispute/views/default/bidding_project_review.html",'<div id="update" class="submit-review-block clearfix milestone-submit"> <div> <form class="form-horizontal" name="reviewFrm" ng-submit="reviewSubmit(reviewFrm.$valid)" novalidate> <div class="form-group"> <div class=""> <label for="review" class="col-lg-1 col-sm-2">{{\'Rating\'|translate}}:</label> <div class="col-lg-8 col-sm-6 control-label"> <input-stars ng-model="review.rating" max="5" on-star-click="starCount(review.rating)" name="rateing" class="cursor" required></input-stars> <span class="error" ng-show="(review.rating == 0) && (!rating_review)"> {{\' Required \'| translate }} </span> <span class="error" ng-show="(reviewFrm.$submitted || reviewFrm.rateing.$touched) && (reviewFrm.rateing.$pristine || reviewFrm.rateing.$invalid) && (reviewFrm.rateing.$error.required)"> {{\'Required\'| translate }} </span> </div> </div> </div> <div class="form-group"> <div class=""> <label for="review" class="col-lg-1 col-sm-2">{{\'Review\'|translate}}:</label> <div class="col-lg-11 col-sm-10 control-label"> <textarea name="message" ng-model="review.message" class="form-control" rows="3" placeholder="{{\'Review\'|translate}}" required></textarea> <span class="error" ng-show="(reviewFrm.$submitted || reviewFrm.message.$touched) && (reviewFrm.message.$pristine || reviewFrm.message.$invalid) && (reviewFrm.message.$error.required)"> {{\'Required\'| translate }} </span> </div> </div> </div> <div class="col-sm-offset-2 col-lg-offset-1 no-pad"> <button type="submit" class="text-uppercase btn btn-primary">{{\'Submit\'|translate}}</button> <button class="text-uppercase btn btn-danger" ng-click="closefrm()">{{\'Cancel\'|translate}}</button> </div> </form> </div> </div>')}]);