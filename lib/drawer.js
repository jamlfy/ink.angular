'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.f = f;
var name = exports.name = 'drawer';

/**
 * 
 * <ANY ng-controller="mycontroller as Crtl">
 * 	<drawer position="left" content="#myContent">
 * 		<ul>
 * 			...
 * 			<li><a ng-click="Crtl.closeDrawer()">Close</a></li>
 * 		</ul>
 * 	</drawer>
 * 
 * 	<ANY id="myContent">
 * 		<a ng-click="Crtl.openDrawer()">Open</a>
 * 	</ANY>
 * </ANY>
 * 
 * And
 * 
 * function mycontroller (scope){
 * 	scope.openDrawer();
 * }
 */
function f(prex, doc) {
	return {
		restrict: 'E',
		transclude: true,
		scope: {
			'position': '&position'
		},
		link: function link(scope, ele, attr, ctrl) {
			var $body = angular.element(doc);
			$body.addClass(prex + '-drawer');

			scope.position = scope.position || 'left';

			if (attr.content) {
				angular.element($body.find(attr.content)).addClass('content-drawer');
			}

			ctrl.openDrawer = function () {
				$body.addClass('push');
				$body.addClass(scope.position);
				ele.addClass('show');
			};

			ctrl.closeDrawer = function () {
				$body.removeClass('push');
				$body.removeClass(scope.position);
				ele.removeClass('show');
			};
		},

		template: '<div class="{{position}}-drawer" ng-transclude></div>'
	};
}