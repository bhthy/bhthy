"use strict";angular.module("getlancerApp.Bidding.Milestone",["getlancerApp.Bidding.Constant","ngResource","ngSanitize","satellizer","ngAnimate","ui.bootstrap","ui.bootstrap.datetimepicker","ui.router","angular-growl","google.places","angular.filter","ngCookies","angular-md5","ui.select2","http-auth-interceptor","angulartics","pascalprecht.translate","angulartics.google.analytics","tmh.dynamicLocale","ngFileUpload","infinite-scroll","ngTagsInput","angularMoment","bc.Flickity","afkl.lazyImage","angular-loading-bar","ngAnimate","oitozero.ngSweetAlert","slugifier","checklist-model","angularjs-dropdown-multiselect","rzModule"]).config(function($stateProvider,$urlRouterProvider){var getToken={TokenServiceData:function(TokenService,$q){return $q.all({AuthServiceData:TokenService.promise,SettingServiceData:TokenService.promiseSettings})}};$urlRouterProvider.otherwise("/"),$stateProvider.state("Bidding_MilestonePayment",{url:"/projects/payment/milestone/:id",templateUrl:"scripts/plugins/Bidding/Milestone/views/default/bidding_milestone_payment.html",controller:"BiddingMilestonePaymentCtrl",resolve:getToken})}),angular.module("getlancerApp.Bidding.Milestone").controller("BiddingMilestoneCtrl",function($scope,$rootScope,$timeout,$state,$cookies,$filter,flash,md5,ProjectStatusConstant,SweetAlert,MeMilestone,BidMilestone,GetMilestoneStatus,MilestoneStatusChange,Milestone,MilestoneStatusConstant){function toggleMin(){$scope.inlineOptions.minDate=$scope.inlineOptions.minDate?null:new Date,$scope.dateOptions.minDate=new Date}function getDayClass(data){var date=data.date,mode=data.mode;if("day"===mode)for(var dayToCheck=new Date(date).setHours(0,0,0,0),i=0;i<$scope.events.length;i++){var currentDay=new Date($scope.events[i].date).setHours(0,0,0,0);if(dayToCheck===currentDay)return $scope.events[i].status}return""}$scope.MilestoneStatusConstant=MilestoneStatusConstant;var flashMessage="";$scope.isupdated=!1,$scope.milestones=[],$scope.data={},$scope.form_value=!1,$scope.milestoneinit=function(){$scope.milestoneindex(1),$scope.milestoneindex(2)},$scope.milestoneindex=function(reqType){if(1===reqType?$scope.milestoneParams={page:$scope.currentPageMilestone,limit:3,bid_id:$scope.bidid}:2===reqType?$scope.milestoneParams={page:$scope.currentPage,limit:3,bid_id:$scope.bidid}:$scope.milestoneParams={page:void 0!==$scope.currentPage?$scope.currentPage:1,limit:3,bid_id:$scope.bidid},1===parseInt(reqType))$scope.milestoneParams.milestone_status_id=1,$scope.totalAmount=0;else{var milestone_status_id=[2,3,4,5,6,7];$scope.milestoneParams.milestone_status_id=milestone_status_id.toString(),$scope.all=0}BidMilestone.get($scope.milestoneParams,function(response){0===parseInt(response.error.code)&&(angular.forEach(response.data,function(value){1===parseInt(reqType)?$scope.totalAmount+=parseInt(value.amount):$scope.all+=parseInt(value.amount)}),1===parseInt(reqType)?($scope.milestones=response.data,$scope.currentPageMilestone=response._metadata.current_page,$scope.totalItemsMilestone=response._metadata.total,$scope.itemsPerPageMilestone=response._metadata.per_page,$scope.noOfPagesMilestone=response._metadata.last_page,$scope.is_show_loader=!1):($scope.milestonesGet=response.data,$scope.currentPage=response._metadata.current_page,$scope.totalItems=response._metadata.total,$scope.itemsPerPage=response._metadata.per_page,$scope.noOfPages=response._metadata.last_page,$scope.is_show_loader=!1))},function(error){1===parseInt(reqType)?($scope.currentPageMilestone=0,$scope.totalItemsMilestone=0,$scope.itemsPerPageMilestone=0,$scope.noOfPagesMilestone=0):($scope.currentPage=0,$scope.totalItems=0,$scope.itemsPerPage=0,$scope.noOfPages=0)})},GetMilestoneStatus.get(function(response){$scope.is_show_loader=!1,0===parseInt(response.error.code)&&($scope.milestoneStatus=response.data)},function(error){console.log("Milestone directive",error)}),$scope.form=function(){$scope.data={},0==$scope.form_value?($scope.create_mile=!0,$scope.form_value=!0,$scope.milestone_set_status_id=!1,$scope.buttonName="Cancel"):($scope.form_value=!1,$scope.buttonName=$scope.is_freelancer===!0?"Request Milestone":"Create Milestone")},$scope.milestone_set=!1,$scope.submit=function(id,$valid){$valid&&($scope.milestone_set=!0,angular.isDefined(id)?($scope.approveButton=!0,$scope.data.id=id,$scope.data.bid_id=$scope.bidid,$scope.is_freelancer||($scope.data.milestone_status_id=MilestoneStatusConstant.MilestoneSet),Milestone.put($scope.data,function(response){$scope.milestone_set=!1,$scope.milestonesss=response.data,0===response.error.code?($scope.form_value=!1,flashMessage=$filter("translate")("Milestone updated successfully."),flash.set(flashMessage,"success",!1),$scope.milestone_set=!1,$scope.buttonName=$scope.is_freelancer===!0?"Request Milestone":"Create Milestone"):($scope.milestone_set=!1,flashMessage=$filter("translate")(response.error.message),flash.set(flashMessage,"error",!1)),$scope.milestoneinit()})):($scope.data.bid_id=$scope.bidid,BidMilestone.post($scope.data,function(response){$scope.milestonesss=response.data,0===response.error.code?($scope.form_value=!1,flashMessage=$filter("translate")("Milestone added successfully."),flash.set(flashMessage,"success",!1),$scope.milestone_set=!1,$scope.buttonName=$scope.is_freelancer===!0?"Request Milestone":"Create Milestone"):($scope.milestone_set=!1,flashMessage=$filter("translate")(response.error.message),flash.set(flashMessage,"error",!1)),$scope.milestoneinit()})))},$scope.milestoneDelete=function(id){Milestone["delete"]({id:id},function(response){$scope.data=response.data;var flashMessage="";0===parseInt(response.error.code)?(flashMessage=$filter("translate")("Milestone is deleted"),flash.set(flashMessage,"success",!1),$scope.milestoneinit()):(flashMessage=$filter("translate")(response.error.message),flash.set(flashMessage,"error",!1))})},$scope.MilestoneEdit=function(id){$scope.milestone_set=!1,$scope.create_mile=!1,$scope.data={},$scope.buttonName="Cancel",$scope.form_value=!0,Milestone.get({id:id},function(response){$scope.milestone_set_status_id=response.data.milestone_status_id,response.data.amount=parseInt(response.data.amount),$scope.data=response.data,$scope.setDate($scope.data.deadline_date)})},$scope.paginate=function(value,page){1===value?($scope.currentPageMilestone=parseInt(page),$scope.milestoneindex(1)):($scope.currentPage=parseInt(page),$scope.milestoneindex(2))},$scope.milestoneinit(),$scope.$on("isupdated",function(event,data){$scope.milestoneinit()}),$scope.today=function(){$scope.dt=new Date},$scope.today(),$scope.clear=function(){$scope.dt=null},$scope.inlineOptions={customClass:getDayClass,minDate:new Date,showWeeks:!0},$scope.dateOptions={formatYear:"yy",maxDate:new Date(2020,12,31),minDate:new Date,startingDay:1},toggleMin(),$scope.open1=function(){$scope.popup1.opened=!0},$scope.open2=function(){$scope.popup2.opened=!0},$scope.setDate=function(date){$scope.data.deadline_date=new Date(date)},$scope.formats=["yyyy-MM-dd","yyyy/MM/dd","dd.MM.yyyy","shortDate"],$scope.format=$scope.formats[1],$scope.altInputFormats=$scope.formats[1],$scope.popup1={opened:!1},$scope.popup2={opened:!1}}),angular.module("getlancerApp.Bidding.Milestone").controller("BiddingMilestonePaymentCtrl",function($rootScope,$scope,$window,countries,states,cities,$stateParams,usersAddresses,wallet,flash,$location,$filter,$state,paymentGateways,userSettings,ConstPaymentGateways,ProjectEditView,UserMeFactory,$cookies,Milestone,ClassName,PaymentOrderFactory,CouponGetStatusFactory,$uibModalStack){$rootScope.header=$rootScope.settings.SITE_NAME+" | "+$filter("translate")("Confirm your Payment"),Milestone.get({id:$state.params.id},function(response){0===parseInt(response.error.code)&&($scope.paymentValue=response.data,$scope.projectId=$scope.paymentValue.project.id,$scope.plan_info.price_final=$scope.paymentValue.amount,$scope.className=ClassName.milestone,$scope.commission_value=parseInt($scope.plan_info.price_final*$rootScope.settings.PROJECT_COMMISSION_FROM_EMPLOYER_FOR_MILESTONE)/100)}),$scope.minimum_wallet_amount=$rootScope.settings.WALLET_MIN_WALLET_AMOUNT,$scope.maximum_wallet_amount=$rootScope.settings.WALLET_MAX_WALLET_AMOUNT,$scope.buyer={},$scope.plan={},$scope.paynow_is_disabled=!1,$scope.payment_note_enabled=!1,$scope.payer_form_enabled=!0,$scope.is_wallet_page=!0,$scope.plan_info={},$scope.save_btn=!1,$scope.first_gateway_id="",$scope.index=function(){$scope.loader=!0,$scope.payment=!0,UserMeFactory.get({},function(response){$scope.user_available_balance=response.data.available_wallet_amount,0===parseInt($scope.user_available_balance)?$scope.is_show_wallet_paybtn=!1:$scope.is_show_wallet_paybtn=!0});var payment_gateways=[];paymentGateways.get({},function(payment_response){if(payment_response.wallet&&($scope.wallet_enabled=!0),payment_response.PayPalREST){var response=payment_response.PayPalREST;response.paypalrest_enabled&&($scope.paypal_enabled=!0)}$scope.group_gateway_id="",0===payment_response.error.code&&(void 0!==payment_response.zazpay&&1!==payment_response.zazpay.error.code?(angular.forEach(payment_response.zazpay.gateways,function(gateway_group_value,gateway_group_key){0===gateway_group_key&&($scope.group_gateway_id=gateway_group_value.id,$scope.first_gateway_id=gateway_group_value.id),angular.forEach(gateway_group_value.gateways,function(payment_geteway_value,payment_geteway_key){var payment_gateway={},suffix="sp_";0===gateway_group_key&&($scope.sel_payment_gateway="sp_"+payment_geteway_value.id),suffix+=payment_geteway_value.id,payment_gateway.id=payment_geteway_value.id,payment_gateway.payment_id=suffix,payment_gateway.group_id=gateway_group_value.id,payment_gateway.display_name=payment_geteway_value.display_name,payment_gateway.thumb_url=payment_geteway_value.thumb_url,payment_gateway.suffix=payment_geteway_value._form_fields._extends_tpl.join(),payment_gateway.form_fields=payment_geteway_value._form_fields._extends_tpl.join(),payment_gateway.instruction_for_manual=payment_geteway_value.instruction_for_manual,payment_gateways.push(payment_gateway)})}),$scope.gateway_groups=payment_response.zazpay.gateways,$scope.payment_gateways=payment_gateways,$scope.form_fields_tpls=payment_response.zazpay._form_fields_tpls,$scope.show_form=[],$scope.form_fields=[],angular.forEach($scope.form_fields_tpls,function(key,value){"buyer"===value&&($scope.form_fields[value]="views/buyer.html"),"credit_card"===value&&($scope.form_fields[value]="views/credit_card.html"),"manual"===value&&($scope.form_fields[value]="views/manual.html"),$scope.show_form[value]=!0}),$scope.gateway_id=ConstPaymentGateways.ZazPay):response.paypalrest_enabled&&($scope.gateway_id=ConstPaymentGateways.PayPal)),$scope.loader=!1})},$scope.applyCoupon=function(){var params={};params.coupon_code=$scope.plan.coupon,params.amount=$scope.paymentValue.amount,CouponGetStatusFactory.get(params,function(response){if($scope.discountCoupon=response,0===response.error.code)if($scope.discountCoupon.data.discount_type_id==ConstDiscountType.Amount)$scope.plan_info.price_final=parseFloat($scope.paymentValue.amount)-parseFloat(response.data.discount),$scope.show_discount=$filter("currency")(response.data.discount);else{var discount_amt=response.data.discount/100*$scope.paymentValue.amount;$scope.plan_info.price_final=$scope.paymentValue.amount-discount_amt,$scope.show_discount=$filter("translate")(response.data.discount+"%")}else flash.set($filter("translate")(response.error.message),"error",!1),$scope.plan.coupon=""})},$scope.ClearCoupon=function(){$scope.plan_info.price_final=$scope.paymentValue.amount,$scope.purchase_plan_coupon=!1,$scope.show_discount=!1},$scope.paneChanged=function(pane){"Manual / Offline"===pane&&($scope.payment_note_enabled=!0);var keepGoing=!0;$scope.buyer={},$scope.PaymentForm.$setPristine(),$scope.PaymentForm.$setUntouched(),angular.forEach($scope.form_fields_tpls,function(key,value){$scope.show_form[value]=!1}),$scope.gateway_id=ConstPaymentGateways.ZazPay,angular.forEach($scope.gateway_groups,function(res){if(res.display_name===pane&&"Wallet"!==pane){var selPayment="";angular.forEach($scope.payment_gateways,function(response){keepGoing&&response.group_id===res.id&&(selPayment=response,keepGoing=!1,$scope.rdoclick(selPayment.id,selPayment.form_fields))}),$scope.sel_payment_gateway="sp_"+selPayment.id,$scope.group_gateway_id=selPayment.group_id}}),"Wallet"===pane&&($scope.gateway_id=ConstPaymentGateways.Wallet),"paypal"===pane&&($scope.gateway_id=ConstPaymentGateways.PayPal)},$scope.rdoclick=function(res,res1){$scope.paynow_is_disabled=!1,$scope.sel_payment_gateway="sp_"+res,$scope.array=res1.split(","),angular.forEach($scope.array,function(value){$scope.show_form[value]=!0})},$scope.PaymentFormSubmit=function(form){var payment_id="";if($scope.sel_payment_gateway&&$scope.gateway_id===ConstPaymentGateways.ZazPay&&(payment_id=$scope.sel_payment_gateway.split("_")[1]),$scope.auth=JSON.parse($cookies.get("auth")),$scope.buyer.user_id=$scope.auth.id,$scope.buyer.foreign_id=$state.params.id,$scope.buyer["class"]=$scope.className,$scope.buyer.buyer_name=$scope.buyer.credit_card_name_on_card,$scope.buyer.payment_gateway_id=$scope.gateway_id,$scope.buyer.gateway_id=payment_id,$scope.buyer.coupon_code=$scope.plan.coupon,angular.isDefined($scope.buyer.credit_card_expired)&&($scope.buyer.credit_card_expired.month||$scope.buyer.credit_card_expired.year)&&($scope.buyer.credit_card_expire=$scope.buyer.credit_card_expired.month+"/"+$scope.buyer.credit_card_expired.year),form){$scope.paynow_is_disabled=!0;var flashMessage;if(parseFloat($scope.plan_info.price_final)>parseFloat($scope.user_available_balance)&&$scope.gateway_id===ConstPaymentGateways.Wallet)return flashMessage=$filter("translate")("Your wallet has insufficient money."),flash.set(flashMessage,"error",!1),$scope.paynow_is_disabled=!1,!0;PaymentOrderFactory.create($scope.buyer,function(response){0===response.error.code?void 0!==response.data.gateway_callback_url?$window.location.href=response.data.gateway_callback_url:"Pending"===response.data.status?(flashMessage=$filter("translate")("Your request is in pending."),flash.set(flashMessage,"error",!1),$state.reload()):"Captured"===response.data.status?(flashMessage=$filter("translate")("Amount added successfully."),flash.set(flashMessage,"success",!1),$state.go("Bid_ProjectView",{id:$scope.paymentValue.project.id,slug:$scope.paymentValue.project.slug})):0===response.error.code?("Captured"===response.payment_response.status&&($scope.available_wallet_amount=$scope.my_user.available_wallet_amount-parseInt(response.data.amount),$scope.my_user.available_wallet_amount=$scope.available_wallet_amount-$scope.project_commision),flashMessage=$filter("translate")("Payment successfully completed."),flash.set(flashMessage,"success",!1),$state.go("Bid_ProjectView",{id:$scope.paymentValue.project.id,slug:$scope.paymentValue.project.slug})):512===response.error.code&&(flashMessage=$filter("translate")("Process Failed. Please, try again."),flash.set(flashMessage,"error",!1)):(flashMessage=$filter("translate")("We are unable to process your request. Please try again."+response.error.message),flash.set(flashMessage,"error",!1)),$scope.paynow_is_disabled=!1},function(error){console.log(error),(angular.isDefined(error.data.error.message)||null!==error.data.error.message)&&flash.set($filter("translate")(error.data.error.message),"error",!1),$scope.paynow_is_disabled=!1})}},$scope.payNowPayPalClick=function(){var flashMessage;$scope.buyer.foreign_id=$state.params.id,$scope.buyer["class"]="Milestone",$scope.buyer.payment_gateway_id=ConstPaymentGateways.PayPal,$scope.buyer.gateway_id=$scope.buyer.payment_gateway_id,$scope.paynow_is_disabled=!0,PaymentOrderFactory.create($scope.buyer,function(response){0===response.error.code?void 0!==response.redirect_url?$window.location.href=response.redirect_url:void 0!==response.data.gateway_callback_url?$window.location.href=response.data.gateway_callback_url:"Pending"===response.data.status?(flashMessage=$filter("translate")("Your request is in pending."),flash.set(flashMessage,"error",!1),$state.reload()):"Captured"===response.data.status?(flashMessage=$filter("translate")("Amount added successfully."),flash.set(flashMessage,"success",!1),$state.reload()):0===response.error.code?("Captured"===response.payment_response.status&&($scope.available_wallet_amount=$scope.my_user.available_wallet_amount-parseInt(response.data.amount),$scope.my_user.available_wallet_amount=$scope.available_wallet_amount-$scope.project_commision),flashMessage=$filter("translate")("Payment successfully completed."),flash.set(flashMessage,"success",!1),$state.reload(),$state.go("user_dashboard")):512===response.error.code&&(flashMessage=$filter("translate")("Process Failed. Please, try again."),flash.set(flashMessage,"error",!1)):(flashMessage=$filter("translate")("We are unable to process your request. Please try again."+response.error.message),flash.set(flashMessage,"error",!1)),$scope.paynow_is_disabled=!1,$uibModalStack.dismissAll()},function(error){console.log(error)})},countries.get({limit:"all"},function(response){angular.isDefined(response.data)&&($scope.countries=response.data)}),$scope.index()}),angular.module("getlancerApp.Bidding.Milestone").directive("milestoneActions",function(){return{restrict:"EA",templateUrl:"scripts/plugins/Bidding/Milestone/views/default/bidding_milestone_actions.html",scope:{projectuser:"@",milestoneid:"@",milestonestatus:"@",actiontype:"@"},controller:function($scope,$rootScope,$cookies,$state,$filter,flash,SweetAlert,MilestoneStatusConstant,MilestoneStatusChange){$scope.auth=JSON.parse($cookies.get("auth")),$scope.MilestoneStatusConstant=MilestoneStatusConstant,parseInt($scope.projectuser)===parseInt($scope.auth.id)?$scope.is_freelancer=!1:$scope.is_freelancer=!0,$scope.actiontype=parseInt($scope.actiontype),$scope.milestoneStatueChange=function(milestoneId,statusId,status){"pay"!==statusId?SweetAlert.swal({title:$filter("translate")("Are you sure you want to do this action?"),text:"",type:"warning",showCancelButton:!0,confirmButtonColor:"#DD6B55",confirmButtonText:"OK",cancelButtonText:"Cancel",closeOnConfirm:!0,animation:!1},function(isConfirm){isConfirm&&("workcompleted"===status?MilestoneStatusChange.put({id:milestoneId,milestone_status_id:$scope.MilestoneStatusConstant.Completed},function(response){0===response.error.code?MilestoneStatusChange.put({id:milestoneId,milestone_status_id:statusId},function(response){var flashMessage="";0===parseInt(response.error.code)?(flashMessage=$filter("translate")("Milestone status changed"),flash.set(flashMessage,"success",!1),$scope.$emit("isupdated","true")):(flashMessage=$filter("translate")(response.error.message),flash.set(flashMessage,"error",!1))}):(flashMessage=$filter("translate")(response.error.message),flash.set(flashMessage,"error",!1))}):MilestoneStatusChange.put({id:milestoneId,milestone_status_id:statusId},function(response){var flashMessage="";0===parseInt(response.error.code)?(flashMessage=$filter("translate")("Milestone status changed"),flash.set(flashMessage,"success",!1),$scope.$emit("isupdated","true")):(flashMessage=$filter("translate")(response.error.message),flash.set(flashMessage,"error",!1))}))}):$state.go("Bidding_MilestonePayment",{id:milestoneId,name:"milestone"})}}}}),angular.module("getlancerApp.Bidding.Milestone").factory("Milestone",["$resource",function($resource){return $resource("/api/v1/milestones/:id",{id:"@id"},{put:{method:"PUT"},get:{method:"GET"},"delete":{method:"DELETE"}})}]).factory("BidMilestone",["$resource",function($resource){return $resource("/api/v1/milestones",{},{get:{method:"GET"},post:{method:"POST"}})}]).factory("MeMilestone",["$resource",function($resource){return $resource("/api/v1/me/milestones",{},{get:{method:"GET"}})}]).factory("MilestoneStatus",["$resource",function($resource){return $resource("/api/v1/milestone_statuses",{},{get:{method:"GET"}})}]).factory("GetMilestoneStatus",["$resource",function($resource){return $resource("/api/v1/milestone_statuses",{},{get:{method:"GET"}})}]),angular.module("getlancerApp.Bidding.Milestone").run(["$templateCache",function($templateCache){$templateCache.put("scripts/plugins/Bidding/Milestone/views/default/bidding_milestone.html",'<div class="tab-pane active" id="milestone" ng-controller="BiddingMilestoneCtrl"> <div class="milestone-block clearfix"> <div class="clearfix" ng-show="!project_is_dispute"> <p class="pull-right cursor btn btn-default" ng-class="((buttonName == \'Request Milestone\') || (buttonName == \'Create Milestone\'))?\'request-btn\':\'text-danger\'" ng-click="form()" ng-if="projectstatus == ProjectStatusConstant.UnderDevelopment">{{buttonName}}</p> </div> <div class="row" ng-if="form_value"> <div class="col-xs-12 clearfix"> <h3 class="pull-left no-mar text-uppercase">{{\'New Milestone Request\'|translate}}</h3> </div> <div class="col-xs-12"> <form class="proj-form clearfix row" role="form" autocomplete="off" name="milestoneAdd" novalidate> <div class="col-sm-3 ver-mar-20"> <input type="number" ng-model="data.amount" name="amount" id="amount" placeholder="Amount" class="milestone-heading form-control" ng-required="true" min="0" number-only> <span class="error" ng-show="(milestoneAdd.$submitted || milestoneAdd.amount.$touched) && (milestoneAdd.amount.$pristine || milestoneAdd.amount.$invalid) && (milestoneAdd.amount.$error.required)">{{\'Required\'| translate }} </span> </div> <div class="col-sm-6 ver-mar-20"> <input type="text" ng-model="data.description" name="description" placeholder="Description" class="milestone-heading form-control" ng-required="true"> <span class="error" ng-show="(milestoneAdd.$submitted || milestoneAdd.description.$touched) && (milestoneAdd.description.$pristine || milestoneAdd.description.$invalid) && (milestoneAdd.description.$error.required)">{{\'Required\'| translate}} </span> </div> <div class="col-sm-3 ver-mar-20"> <input type="text" name="last_date" class="form-control milestone-heading" placeholder="Deadline date " uib-datepicker-popup="{{format}}" ng-model="data.deadline_date" is-open="popup1.opened" datepicker-options="dateOptions" close-text="Close" alt-input-formats="altInputFormats" ng-focus="open1()" ng-required="true"> <span class="error" ng-show="(milestoneAdd.$submitted || milestoneAdd.last_date.$touched) && (milestoneAdd.last_date.$pristine || milestoneAdd.last_date.$invalid) && (milestoneAdd.last_date.$error.required)">{{\'Required\'| translate}} </span> </div> <ul class="col-sm-6 list-inline ver-mar-20 clearfix"> <li class="no-pad"> <button type="submit" ng-show="milestone_set && (milestone_set_status_id != 1 && is_freelancer)" class="btn btn-primary text-uppercase" disabled>{{\'Submit\'|translate}}</button> <button type="submit" ng-click="submit(data.id, milestoneAdd.$valid)" title="{{\'Submit\' | translate}}" class="btn btn-primary text-uppercase" ng-show="!milestone_set && (milestone_set_status_id != 1 && is_freelancer)">{{\'Submit\'|translate}}</button> <button type="submit" ng-click="submit(data.id, milestoneAdd.$valid)" title="{{\'Submit\' | translate}}" class="btn btn-primary text-uppercase" ng-show="milestone_set && (milestone_set_status_id == 1 && is_freelancer)" disabled>{{\'Submit\'|translate}}</button> <button type="submit" ng-click="submit(data.id, milestoneAdd.$valid)" title="{{\'Submit\' | translate}}" class="btn btn-primary text-uppercase" ng-show="!milestone_set && (milestone_set_status_id == 1 && is_freelancer)">{{\'Submit\'|translate}}</button> <button type="submit" ng-click="submit(data.id, milestoneAdd.$valid)" title="{{\'Submit\' | translate}}" class="btn btn-primary text-uppercase" ng-show="milestone_set && (create_mile == true && !is_freelancer && milestone_set_status_id == false)" disabled> {{\'Submit\'|translate}}</button> <button type="submit" ng-click="submit(data.id, milestoneAdd.$valid)" title="{{\'Submit\' | translate}}" class="btn btn-primary text-uppercase" ng-show="!milestone_set && (create_mile == true && !is_freelancer && milestone_set_status_id == false)"> {{\'Submit\'|translate}}</button> <button type="submit" ng-click="submit(data.id, milestoneAdd.$valid)" title="{{\'Approve this Milestone\' | translate}}" class="btn btn-primary text-uppercase" ng-show="milestone_set && (milestone_set_status_id == 1 && !is_freelancer)" disabled>{{\'Approve this Milestone\'|translate}}</button> <button type="submit" ng-click="submit(data.id, milestoneAdd.$valid)" title="{{\'Approve this Milestone\' | translate}}" class="btn btn-primary text-uppercase" ng-show="!milestone_set && (milestone_set_status_id == 1 && !is_freelancer)">{{\'Approve this Milestone\'|translate}}</button> </li>  </ul> </form> </div> </div> <div class="panel-heading row" ng-if="milestones.length > 0 && !project_is_dispute"> <div class="clearfix"> <h3 class="pull-left text-uppercase col-sm-12 row">{{\'Milestone Requests\'|translate}}</h3> </div> <div class="add-wallet-table"> <div class="table-responsive pg-table"> <table class="table table-striped no-mar"> <thead> <tr> <th>{{\'Amount\' |translate}}</th> <th>{{\'Description\'|translate}}</th> <th>{{\'Deadline Date\'|translate}}</th> <th width="100" ng-show="!project_is_dispute">{{\'Actions\'|translate}}</th> </tr> </thead> <tbody> <tr ng-repeat="milestonesValue in milestones"> <td> <amount-display amount="{{milestonesValue.amount}}" ng-if="milestonesValue.amount"></amount-display> </td> <td> <p class="no-mar" ng-bind-html="milestonesValue.description">_</p> </td> <td> <p class="no-mar">{{milestonesValue.deadline_date}}</p> </td> <td ng-show="!project_is_dispute"> <div class="dropdown"> <button class="btn request-btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"> {{\'Action\'|translate}} <i class="fa fa-angle-down" aria-hidden="true"></i> </button> <ul class="dropdown-menu" aria-labelledby="dropdownMenu1"> <li class="cursor"> <a ng-click="MilestoneEdit(milestonesValue.id)"><i class="fa fa-edit fa-fw"></i> {{\'Edit\'|translate}}</a> </li> <milestone-actions projectuser="{{projectuser}}" milestoneid="{{milestonesValue.id}}" milestonestatus="{{milestonesValue.milestone_status_id}}" actiontype="2" ng-if="!is_freelancer"></milestone-actions> </ul> </div> </td> </tr> <tr ng-if="milestones.length === 0"> <td colspan="8"> <p class="text-center text-danger" ng-if="milestones.length === 0"> {{\'No records available\' | translate}}</p> </td> </tr> </tbody> </table> </div> <div class="pull-right hired-view-total-page" id="paging" ng-if="milestones.length > 0"> <nav aria-label="Page navigation"> <uib-pagination total-items="totalItemsMilestone" max-size="maxSize" items-per-page="itemsPerPageMilestone" ng-model="currentPageMilestone" class="pagination-sm" boundary-links="true" num-pages="numPages" num-pages="noOfPagesMilestone" ng-click="paginate(1 , currentPageMilestone)"></uib-pagination> </nav> </div> </div> </div> <div ng-if="project_is_dispute && is_freelancer"> <p class="text-center text-danger space no-mar"> {{"Project under dispute. So you can\'t send milestone." | translate}} </p> </div> </div> <div class="milestone-block clearfix" ng-if="milestonesGet.length > 0 && !project_is_dispute"> <div class="clearfix"> <h3 class="pull-left no-mar bot-space-10 text-uppercase">Milestones</h3> </div> <div class="table-responsive"> <table class="table table-striped no-mar"> <thead> <tr> <th>{{\'Amount\' |translate}}</th> <th>{{\'Description\'|translate}}</th> <th>{{\'Status\' |translate}}</th> <th>{{\'Deadline Date\'|translate}}</th> <th width="100" ng-show="!project_is_dispute">{{\'Actions\'|translate}}</th> </tr> </thead> <tbody> <tr ng-repeat="milestonesValue in milestonesGet"> <td> <amount-display amount="{{milestonesValue.amount}}" ng-if="milestonesValue.amount"></amount-display> </td> <td> <p class="no-mar" ng-bind-html="milestonesValue.description"></p> </td> <td> <p class="no-mar">{{milestonesValue.milestone_status.name}}</p> </td> <td> <p class="no-mar">{{milestonesValue.deadline_date}}</p> </td> <td> <div class="center-responsive" ng-if="!project_is_dispute && (!is_freelancer && milestonesValue.milestone_status_id != MilestoneStatusConstant.EscrowFunded) || (is_freelancer && milestonesValue.milestone_status_id != MilestoneStatusConstant.RequestedForRelease) && (is_freelancer && milestonesValue.milestone_status_id != MilestoneStatusConstant.Completed)"> <div class="dropdown" ng-if="milestonesValue.milestone_status_id < MilestoneStatusConstant.EscrowReleased"> <milestone-actions projectuser="{{projectuser}}" milestoneid="{{milestonesValue.id}}" milestonestatus="{{milestonesValue.milestone_status_id}}" actiontype="1"></milestone-actions> </div> </div> <div class="center-responsive" ng-if="!project_is_dispute && (!is_freelancer && milestonesValue.milestone_status_id == MilestoneStatusConstant.EscrowFunded) || (is_freelancer && milestonesValue.milestone_status_id == MilestoneStatusConstant.RequestedForRelease) || (is_freelancer && milestonesValue.milestone_status_id == MilestoneStatusConstant.Completed || milestonesValue.milestone_status_id == MilestoneStatusConstant.EscrowReleased)"> <span class="text-center">-</span> </div> </td> </tr> <tr class="text-center"> <div ng-if="milestonesGet.length === 0"> <td colspan="8"> <p class="text-center text-danger" ng-if="milestonesGet.length == 0"> {{\'No records available\' | translate}} </p> </td> </div> </tr> </tbody> </table> <div class="hired-view-total-page" ng-if="milestonesGet.length > 0"> <div class="clearfix"> <div class="pull-left"> <p>Total: <amount-display amount="{{all}}" ng-if="all"></amount-display> </p> </div> <div class="pull-right"> <nav aria-label="Page navigation"> <uib-pagination total-items="totalItems" max-size="maxSize" items-per-page="itemsPerPage" ng-model="currentPage" class="pagination-sm" boundary-links="true" num-pages="noOfPages" ng-click="paginate(2 , currentPage)"></uib-pagination> </nav> </div> </div> </div> </div> </div> <div ng-if="project_is_dispute && !is_freelancer"> <p class="text-center text-danger space no-mar"> {{"Project under dispute. So you can\'t send milestone." | translate}} </p> </div> </div>'),$templateCache.put("scripts/plugins/Bidding/Milestone/views/default/bidding_milestone_actions.html",'<button class="request-btn btn btn-default dropdown-toggle" type="button" id="dropdownMenu3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" ng-if="actiontype == 1"> {{\'Action\'| translate}} <i class="fa fa-angle-down" aria-hidden="true"></i> </button> <ul class="dropdown-menu dropdown-arrow-right" aria-labelledby="dropdownMenu3" ng-if="actiontype == 1"> <li class="cursor" ng-if="!is_freelancer && milestonestatus == MilestoneStatusConstant.MilestoneSuggested"> <a ng-click="milestoneStatueChange(milestoneid, MilestoneStatusConstant.MilestoneSet)"><i class="fa fa-check fa-fw"></i> {{\'Milestone Set\'| translate}} </a> </li> <li class="cursor" ng-if="is_freelancer && milestonestatus == MilestoneStatusConstant.MilestoneSet"> <a ng-click="milestoneStatueChange(milestoneid, MilestoneStatusConstant.RequestedforEscrow)"><i class="fa fa-hand-stop-o fa-fw"></i> {{\'Requested for Escrow\'| translate}} </a> </li> <li class="cursor" ng-if="!is_freelancer && (milestonestatus == MilestoneStatusConstant.RequestedforEscrow)"> <a ng-click="milestoneStatueChange(milestoneid, \'pay\')"><i class="fa fa-money fa-fw"></i> {{\'Pay amount\'| translate}} </a> </li> <li class="cursor" ng-if="is_freelancer && milestonestatus == MilestoneStatusConstant.EscrowFunded"> <a ng-click="milestoneStatueChange(milestoneid, MilestoneStatusConstant.RequestedForRelease, \'workcompleted\')"><i class="fa fa-check fa-fw"></i> {{\'Work Completed / Request to Release Escrow\'| translate}} </a> </li> <li class="cursor" ng-if="!is_freelancer && (milestonestatus == MilestoneStatusConstant.RequestedForRelease || milestonestatus == MilestoneStatusConstant.Completed)"> <a ng-click="milestoneStatueChange(milestoneid, MilestoneStatusConstant.EscrowReleased)"><i class="fa fa-check fa-fw"></i> {{\'Released Escrow Now\'| translate}} </a> </li> <li class="cursor" ng-if="milestonestatus < MilestoneStatusConstant.EscrowFunded"> <a ng-click="milestoneStatueChange(milestoneid, MilestoneStatusConstant.Canceled)"><i class="fa fa-close fa-fw"></i> {{\'Canceled\'| translate}} </a> </li> </ul>  <li class="cursor" ng-if="!is_freelancer && actiontype == 2"> <a class="milestone-action-anchor" ng-click="milestoneStatueChange(milestoneid, MilestoneStatusConstant.MilestoneSet)"><i class="fa fa-check fa-fw"></i> {{\'Approve\'| translate}}</a> </li>'),
$templateCache.put("scripts/plugins/Bidding/Milestone/views/default/bidding_milestone_payment.html",'<div class="section photo-view"> <div class="container">  <div class="row"> <div class="modal-header"> <h3>{{\'Milestone payment for\' | translate}} {{paymentValue.project.name}}</h3> </div> <div class="modal-body"> <div class=""> <div class=""> <div class="clearfix"> <form name="PaymentForm" role="form" ng-submit="PaymentFormSubmit(PaymentForm.$valid)"> <div class="panel navbar-btn clearfix"> <div class="panel-body col-xs-12">   <div class="col-xs-12 text-center navbar-btn"> <p class="text-22 textb" ng-show="quote_request_views_detail.quote_amount && show_discount"> {{"Price" | translate }} <amount-display amount="{{quote_request_views_detail.quote_amount}}" ng-if="quote_request_views_detail.quote_amount"></amount-display> </p> <p class="text-22 textb" ng-show="show_discount"> {{"Coupon discount" | translate }} {{show_discount}}</p> <p class="text-22 textb" ng-if="paymentValue.amount"> {{"You have to pay" | translate }} <span>{{paymentValue.amount |customCurrency}}</span> </p> <p class="alert alert-info" ng-if="settings.PROJECT_COMMISSION_FROM_EMPLOYER_FOR_MILESTONE && (settings.PROJECT_COMMISSION_FROM_EMPLOYER_FOR_MILESTONE !== \'0\' || settings.PROJECT_COMMISSION_FROM_EMPLOYER_FOR_MILESTONE !== \'\')"> {{\'Including site commission, system will take\'| translate}} {{commission_value -- paymentValue.amount |customCurrency}} {{\'from you\'| translate}}. </p> </div> </div> <div ng-include="\'views/gateway.html\'" class="col-xs-12"></div> </div> </form></div>  </div> </div> </div> </div> </div> </div>'),$templateCache.put("scripts/plugins/Bidding/Milestone/views/default/my_bids_milestones.html",'<section class=""> <div class="container"> <div class="row"> <div class="col-xs-12"> <div class="project-contest"> <div class="clearfix"> <ul class="list-group custom-binding"> <li class="list-group-item project-heading hidden-xs"> <div class="row text-center"> <div class="col-sm-4"> <h5>{{\'PROJECT NAME\'|translate}}</h5> </div> <div class="col-sm-2"> <h5>{{\'AMOUNT\'|translate}}</h5> </div> <div class="col-sm-2"> <h5>{{\'DESCRIPTION\'|translate}} </h5> </div> <div class="col-sm-2"> <h5>{{\'STATUS\'|translate}}</h5> </div> <div class="col-sm-2"> <h5>{{\'ACTIONS\'|translate}}</h5> </div> </div> </li> <li class="list-group-item project-content" ng-repeat="milestone in milestones" ng-if="milestones.length > 0"> <div class="row"> <div class="col-sm-4"> <h5 class="visible-xs">{{\'PROJECT NAME\'|translate}}</h5> <h5 class="text-18"><a ui-sref="Bid_ProjectView({id:milestone.project.id,slug:milestone.project.slug})"> {{milestone.project.name}} </a></h5> </div> <div class="col-sm-2"> <span class="visible-xs">{{\'AMOUNT\'|translate}}</span> <span class="content"> <amount-display amount="{{milestone.amount}}" ng-if="milestone.amount"></amount-display> </span> </div> <div class="col-sm-2"> <span class="visible-xs">{{\'DESCRIPTION\'|translate}}</span> <span class="content" ng-bind-html="milestone.description"></span> </div> <div class="col-sm-2"> <span class="visible-xs">{{\'STATUS\'|translate}}</span> <span class="content">{{milestone.milestone_status.name}}</span> </div> <div class="col-sm-2"> <div class="center-responsive"> <div class="dropdown" ng-if="milestone.milestone_status_id < MilestoneStatusConstant.EscrowReleased"> <milestone-actions projectuser="{{milestone.project.user_id}}" milestoneid="{{milestone.id}}" milestonestatus="{{milestone.milestone_status_id}}" actiontype="1" isupdated="isupdated"></milestone-actions> </div> </div> </div> </div> </li> <li ng-if="milestones.length == 0" class="list-group-item project-content"> <p class="no-mar alert alert-danger text-center">{{\'No milestone\' | translate}}</p> </li> </ul> </div> </div> </div> </div>  <div class="row binding-pagination" ng-if="milestones.length == 0"> <div class="pagnation-content"> <div class="container"> <div class="clearfix pagnation-inner"> <uib-pagination total-items="totalItems" max-size="maxSize" items-per-page="itemsPerPage" ng-model="currentPage" class="pagination-sm" boundary-links="true" num-pages="numPages" num-pages="noOfPages" ng-click="paginate()"></uib-pagination> </div> </div> </div> </div> </div> </section>')}]);