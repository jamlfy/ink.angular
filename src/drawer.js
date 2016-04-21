export const name = 'drawer';

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
export function f (prex, doc) {
	return {
		restrict: 'E',
		transclude: true,
		scope: {
			'position' : '&position'
		},
		link (scope, ele, attr, ctrl) {
			var $body = angular.element(doc);
			$body.addClass( `${prex}-drawer`);
			
			scope.position = scope.position || 'left';

			if( attr.content ){
				angular.element($body.find(attr.content)).addClass('content-drawer');
			}

			ctrl.openDrawer = () => {
				$body.addClass('push');
				$body.addClass( scope.position );
				ele.addClass('show');
			};

			ctrl.closeDrawer = () => {
				$body.removeClass('push');
				$body.removeClass( scope.position );
				ele.removeClass('show');
			};
		},
		template : 	'<div class="{{position}}-drawer" ng-transclude></div>'
	};
}