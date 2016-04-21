'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.f = f;
var name = exports.name = 'tabs';

/**
 * <tabs home="#isNowHome" position="top">
 * 		<ul>
 * 			<li><a tab-href="#isNowHome">Home</a></li>
 * 		</ul>
 * 		<ANY id="isNowHome" class="tabs-content">
 * 			<p>Bla..<p>
 * 		</ANY>
 * 		<ANY id="isOther" class="tabs-content">
 * 			<p>Bla..<p>
 * 		</ANY>
 * </tabs>
 */

function f(prex) {
	return {
		restrict: 'E',
		transclude: true,
		scope: {},
		link: function link(scope, elez, attrs, crtl) {
			var panel = angular.element(elez).children('.tabs-content');

			scope.position = attrs.position || 'top';
			scope.select = function () {
				var name = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

				panel.addClass('ng-hide').removeClass('active');

				angular.forEach(panel, function (value, key) {
					var ele = angular.element(value);
					if (ele.attr('id') === name || name === key) {
						ele.addClass('ng-show').removeClass('ng-hide').addClass('active');
					}
				});
			};
			scope.select(attr.home);
		},

		templete: '<div class="' + prex + '-tabs {{position}}" ng-transclude></div>'
	};
}