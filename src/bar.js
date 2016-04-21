export const name = 'bar';

/**
 * <bar color="blue" caption="Is my progress.." progress="number" total="max" />
 */

export function f (prex) {
	const template =
`<div class="${prex}-progress-bar">
	<span class="caption" ng-transclude></span>
	<div class="bar {{cls}}"></div>
</div>`;
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		scope: {
			'color' : '&color',
			'caption' : '&title',
			'progress' : '&progress'
		},
		link (scope, ele, attr, ctrl) {
			var total = parseInt( attr.total ) || 100;
			var bar = angular.element( ele.children()[1] );

			scope.$watch(scope.progress, value => {
				bar.css({
					'width' : ( ( Number(value) * 100 ) / total ) +  '%'
				});
			});

			scope.$watch(scope.color, value => {
				scope.cls = value;
			});
		},
		template
	};
}