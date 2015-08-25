'use strict';

/*https://thinkster.io/egghead/isolate-scope-at*/
/*https://thinkster.io/egghead/isolate-scope-am*/

foodMeApp.directive('fmRating', function() {
    debugger;
  return {
    restrict: 'E',
    scope: {
      symbol: '@',
      max: '@',
      readonly: '@'
    },
    /*to look for the controller on just its own element).*/
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      attrs.max = scope.max = parseInt(scope.max || 5, 10);

      if (!attrs.symbol) {
        attrs.symbol = scope.symbol = '\u2605';  //black star
      }
      var styles = [];
      scope.styles = styles;

      for(var i = 0; i < scope.max; i++) {
        styles.push({ 'fm-selected': false, 'fm-hover': false });
      }

        /*enter hover class on enter of pointer over ratings*/
      scope.enter = function(index) {
        if (scope.readonly) return;
        angular.forEach(styles, function(style, i) {
          style['fm-hover'] = i <= index;
        });
      };

        /*remove hover class on leave of pointer over ratings*/
      scope.leave = function(index) {
        if (scope.readonly) return;
        angular.forEach(styles, function(style, i) {
          style['fm-hover'] = false;
        });
      };


      // view -> model
      scope.select = function(index) {
        if (scope.readonly) return;

        ngModel.$setViewValue((index == null) ? null : index + 1);
        udpateSelectedStyles(index);
      };

      // model -> view
      ngModel.$render = function() {
        udpateSelectedStyles(ngModel.$viewValue - 1);
      };

      function udpateSelectedStyles(index) {
        if (index == null) index = -1;

        angular.forEach(styles, function(style, i) {
          style['fm-selected'] = i <= index;
        });
      }
    },
    template:
        /* fm-rating-pointer */

      '<ul class="fm-rating" ng-class="{\'fm-rating-pointer\':!readonly}">' +
        '<li ng-repeat="style in styles" ng-class="style" ' +
            'ng-click="select($index)" ng-mouseenter="enter($index)" ng-mouseleave="leave($index)">' +
          '{{symbol}}' +
        '</li>' +
      '</ul>' +
          /*hide the clear button if it's a readonly */
      '<a ng-hide="readonly" ng-click="select(null)">clear</a>'
  };
});