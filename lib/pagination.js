'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.f = f;
var name = exports.name = 'pagination';

/**
 * <pagination home="#isNowHome" position="top" />
 */

function f(prex) {
	var templete = '<nav class="' + prex + '-navigation" id="{{ids}}">\n\t<ul class="pagination {{color}}">\n\t\t<li class="first"><a ng-click="previous()" >{{text.first}}</a></li>\n\t\t<li class="previousPage disabled {{showPrevious}}"><a ng-click="previous(showNumber)">{{text.previous}} {{step}}</a></li>\n\t\t<li class="previous {{showPrevious}}"><a ng-click="previous(1)">{{text.previous}}</a></li>\n\t\t<li ng-repeat="val in arr" class="{{shomMe($index)}}"><a ng-href="{{hrefText(val)}}" data-index="{{$index}}">{{val}}</a></li>\n\t\t<li class="next {{showPrevious}}"><a ng-click="next(1)">{{text.next}}</a></li>\n\t\t<li class="nextPage {{showNext}}"><a ng-click="next(step)">{{text.next}} {{step}}</a></li>\n\t\t<li class="last"><a ng-click="next()">{{text.last}}</a></li>\n\t</ul>\n</nav>';
	return {
		restrict: 'E',
		transclude: true,
		scope: {
			step: '@step',
			max: '@max',
			text: '@text'
		},
		link: function link(scope, elez, attrs, crtl) {
			scope.pagination = 0;
			scope.step = 5;
			scope.arr = [];
			for (var i = scope.max.length - 1; i >= 0; i--) {
				scope.arr.push(i + 1);
			}
			scope.arr.reverse();

			scope.previous = function (index) {
				if (angular.isNumber(index)) {
					scope.pagination -= index;
				} else {
					scope.pagination = 0;
				}
			};

			scope.next = function (index) {
				if (angular.isNumber(index)) {
					scope.pagination += index;
				} else {
					scope.pagination = Number(attr.max) - 1 - scope.step;
				}
			};

			scope.showMe = function () {
				var index = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

				var max = scope.pagination += scope.step;
				if (index < max && scope.pagination < index) {
					return '';
				} else {
					return 'all-hide';
				}
			};

			scope.hrefText = function () {
				var val = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

				return attr.href.replace(':pages', val);
			};
		},

		templete: templete
	};
}