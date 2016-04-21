export const name = 'alert';
/**
 * <alert status="green" title="Hello">
 * 		Hello is my body
 * </alert>
 */

export function f (prex) {
	const template = 
`<div class="alert {{types}} {{status}}" role="alert">
	<button class="${prex}-dismiss close" ng-click="close()">&times;</button>
	<h4 ng-if="show">{{block}}</h4>
	<p ng-transclude></p>
</div>`;
	return {
		restrict: 'E',
		transclude: true,
		replace: true,
		scope: {
			'status' : '@',
			'title' : '@'
		},
		link (scope, elez, attrs) {
			scope.types = scope.title ? 'block' : 'basic';
			scope.show = scope.types === 'block';
			scope.close = function(){
				elez.remove();
			};
		},
		template
	};	
}