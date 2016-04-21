'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.f = f;
var name = exports.name = 'tabHref';

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
    restrict: 'A',
    link: function link(scope, elez, attrs, crtl) {
      crtl.select(attrs.tabHref);
    }
  };
}