'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.f = f;
var name = exports.name = 'alert';
/**
 * <alert status="green" title="Hello">
 * 		Hello is my body
 * </alert>
 */

function f(prex) {
	var template = '<div class="alert {{types}} {{status}}" role="alert">\n\t<button class="' + prex + '-dismiss close" ng-click="close()">&times;</button>\n\t<h4 ng-if="show">{{block}}</h4>\n\t<p ng-transclude></p>\n</div>';
	return {
		restrict: 'E',
		transclude: true,
		replace: true,
		scope: {
			'status': '@',
			'title': '@'
		},
		link: function link(scope, elez, attrs) {
			scope.types = scope.title ? 'block' : 'basic';
			scope.show = scope.types === 'block';
			scope.close = function () {
				elez.remove();
			};
		},

		template: template
	};
}