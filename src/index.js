import * as aler from './alert';
import * as bar from './bar';
import * as drawer from './drawer';
import * as sticky from './sticky';
import * as tabs from './tabs';
import * as tabHref from './tabHref';
import * as matchMedia from './matchMedia';

const name = 'ink.angular';
exports = name;

window.matchMedia || ( window.matchMedia = matchMedia.f() );

/**
 * Change the prefix
 *
 * import 'ink.angular';
 * angular
 * 		.module('ink.angular')
 * 		.value('prefix', 'ng');
 */

angular
	.module(name, [ 'ng' ])
	.value('prefix', 'ink')
	.directive(aler.name, aler.f)
	.directive(bar.name, bar.f)
	.directive(drawer.name, drawer.f)
	.directive(tabHref.name, tabHref.f)
	.directive(tabs.name, tabs.f)
	.directive(sticky.name, sticky.f)
