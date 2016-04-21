export const name = 'tabs';

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

export function f (prex) {
	return {
		restrict: 'E',
		transclude: true,
		scope: {},
		link (scope, elez, attrs, crtl) {
			let panel = angular.element(elez).children('.tabs-content');

			scope.position = attrs.position || 'top';
			scope.select = (name=0) => {
				panel
					.addClass('ng-hide')
					.removeClass('active');

				angular.forEach(panel, ( value, key ) => {
					let ele = angular.element(value);
					if( ele.attr('id') === name || name === key ){
						ele.addClass('ng-show').removeClass('ng-hide').addClass('active');
					}
				});
			}
			scope.select(attr.home);
		},
		templete :  `<div class="${prex}-tabs {{position}}" ng-transclude></div>`
	}
}
