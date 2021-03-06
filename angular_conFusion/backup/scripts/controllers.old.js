/*jslint node: true */
'use strict';

angular.module('confusionApp')
        
        // we do dependency injection to introduce the menuFactory service into MenuController
        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {

            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
          
            $scope.dishes= menuFactory.getDishes();
          

            $scope.select = function(setTab) {
                $scope.tab = setTab;

                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };

            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };

            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];

            $scope.channels = channels;
            $scope.invalidChannelSelection = false;

        }])

        .controller('FeedbackController', ['$scope', function($scope) {

            $scope.sendFeedback = function() {

                console.log($scope.feedback);

                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])
        
        // we do dependency injection into the DishDetailController       
        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory',               function($scope, $stateParams, menuFactory) {
            
                var dish= menuFactory.getDish(parseInt($stateParams.id,10));
                $scope.dish = dish;
        }])
        
        
    /*  // controller for ng-route from last exercise
        .controller('DishDetailController', ['$scope', '$routeParams', 'menuFactory', function($scope, $routeParams, menuFactory) {

            var dish= menuFactory.getDish(parseInt($routeParams.id,10));                       $scope.dish = dish;
            
        }]) */

        .controller('DishCommentController', ['$scope', function($scope) {
            
            //Step 1: Create a JavaScript object to hold the comment from the form
            
          var sc = $scope;
          
            sc.mycomment = {author:"", rating: 5, comment:"", date: ""};
            sc.submitComment = function () {

                //Step 2: This is how you record the date
                sc.mycomment.date = new Date().toISOString();

                // Step 3: Push your comment into the dish's comment array
                // sc.mycomment.rating = parseInt($scope.mycomment.rating);
                sc.dish.comments.push($scope.mycomment);

                //Step 4: reset your form to pristine
                sc.commentForm.$setPristine();

                //Step 5: reset your JavaScript object that holds your comment
                sc.mycomment = {author:"", rating: 5, comment:"", date: ""};
            };
      }])
;
