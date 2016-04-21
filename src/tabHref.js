export const name = 'tabHref';

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
		restrict: 'A',
		link (scope, elez, attrs, crtl) {
			crtl.select(attrs.tabHref);
		}
	}
}