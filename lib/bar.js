'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.f = f;
var name = exports.name = 'bar';

/**
 * <bar color="blue" caption="Is my progress.." progress="number" total="max" />
 */

function f(prex) {
	var template = '<div class="' + prex + '-progress-bar">\n\t<span class="caption" ng-transclude></span>\n\t<div class="bar {{cls}}"></div>\n</div>';
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		scope: {
			'color': '&color',
			'caption': '&title',
			'progress': '&progress'
		},
		link: function link(scope, ele, attr, ctrl) {
			var total = parseInt(attr.total) || 100;
			var bar = angular.element(ele.children()[1]);

			scope.$watch(scope.progress, function (value) {
				bar.css({
					'width': Number(value) * 100 / total + '%'
				});
			});

			scope.$watch(scope.color, function (value) {
				scope.cls = value;
			});
		},

		template: template
	};
}