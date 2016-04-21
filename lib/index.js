'use strict';

var _alert = require('./alert');

var aler = _interopRequireWildcard(_alert);

var _bar = require('./bar');

var bar = _interopRequireWildcard(_bar);

var _drawer = require('./drawer');

var drawer = _interopRequireWildcard(_drawer);

var _sticky = require('./sticky');

var sticky = _interopRequireWildcard(_sticky);

var _tabs = require('./tabs');

var tabs = _interopRequireWildcard(_tabs);

var _tabHref = require('./tabHref');

var tabHref = _interopRequireWildcard(_tabHref);

var _matchMedia = require('./matchMedia');

var matchMedia = _interopRequireWildcard(_matchMedia);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var name = 'ink.angular';
exports = name;

window.matchMedia || (window.matchMedia = matchMedia.f());

/**
 * Change the prefix
 *
 * import 'ink.angular';
 * angular
 * 		.module('ink.angular')
 * 		.value('prefix', 'ng');
 */

angular.module(name, ['ng']).value('prefix', 'ink').directive(aler.name, aler.f).directive(bar.name, bar.f).directive(drawer.name, drawer.f).directive(tabHref.name, tabHref.f).directive(tabs.name, tabs.f).directive(sticky.name, sticky.f);