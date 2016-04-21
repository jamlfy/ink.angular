(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.f = f;
var name = exports.name = 'alert';
/**
 * <alert status="green" title="Hello">
 * 		Hello is my body
 * </alert>
 */

function f(prex) {
	var template = '<div class="alert {{types}} {{status}}" role="alert">\n\t<button class="' + prex + '-dismiss close" ng-click="close()">&times;</button>\n\t<h4 ng-if="show">{{block}}</h4>\n\t<p ng-transclude></p>\n</div>';
	return {
		restrict: 'E',
		transclude: true,
		replace: true,
		scope: {
			'status': '@',
			'title': '@'
		},
		link: function link(scope, elez, attrs) {
			scope.types = scope.title ? 'block' : 'basic';
			scope.show = scope.types === 'block';
			scope.close = function () {
				elez.remove();
			};
		},

		template: template
	};
}
},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.f = f;
var name = exports.name = 'bar';

/**
 * <bar color="blue" caption="Is my progress.." progress="number" total="max" />
 */

function f(prex) {
	var template = '<div class="' + prex + '-progress-bar">\n\t<span class="caption" ng-transclude></span>\n\t<div class="bar {{cls}}"></div>\n</div>';
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		scope: {
			'color': '&color',
			'caption': '&title',
			'progress': '&progress'
		},
		link: function link(scope, ele, attr, ctrl) {
			var total = parseInt(attr.total) || 100;
			var bar = angular.element(ele.children()[1]);

			scope.$watch(scope.progress, function (value) {
				bar.css({
					'width': Number(value) * 100 / total + '%'
				});
			});

			scope.$watch(scope.color, function (value) {
				scope.cls = value;
			});
		},

		template: template
	};
}
},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
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
},{"./alert":1,"./bar":2,"./drawer":3,"./matchMedia":5,"./sticky":6,"./tabHref":7,"./tabs":8}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.f = f;
var text = 'Ink: This browser does not support matchMedia, ' + 'therefore the minWidth option will not work on this browser. ' + 'Polyfill matchMedia to fix this issue.';

function f(args) {
	(window.console && console.warn && console.warn)(text);
	return function () {
		return {
			matches: true
		};
	};
}
},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.f = f;
var name = exports.name = 'sticky';

function f(prex, win) {
	var InkStickyClass = prex + '-sticky';
	// Directive definition
	return {
		scope: {
			offset: '@', // top offset
			mediaQuery: '@', // minimum width required for sticky to come in
			stickyClass: '@', // class to be applied to the element on sticky
			bodyClass: '@' // class to be applied to the body on sticky
		},
		restrict: 'C',
		link: function link(scope, elem, attrs) {
			var mediaQuery = scope.mediaQuery || null,
			    stickyClass = scope.stickyClass || '',
			    bodyClass = scope.bodyClass || '',
			    $elem = $elem[0],
			    $window = angular.element(win),
			    $body = angular.element(doc.body),
			    doc = document.documentElement,
			    initial = {
				offsetWidth: elem.offsetWidth,
				top: $elem.css('top'),
				width: $elem.css('width'),
				position: $elem.css('position'),
				marginTop: $elem.css('margin-top')
			},
			    isPositionFixed = false,
			    isSticking = false,
			    stickyLine = void 0;
			var offset = typeof scope.offset === 'string' ? parseInt(scope.offset.replace(/px;?/, '')) : 0;
			// Watchers
			//
			var prevOffset = _getTopOffset(elem);
			scope.$watch(function () {
				if (isSticking) return prevOffset;
				prevOffset = _getTopOffset(elem);
				return prevOffset;
			}, function (newVal, oldVal) {
				if (newVal !== oldVal || typeof stickyLine === 'undefined') {
					stickyLine = newVal - offset;
					checkIfShouldStick();
				}
			});
			// checks if the window has passed the sticky line
			function checkIfShouldStick() {
				if (mediaQuery && !matchMedia('(' + mediaQuery + ')').matches) return;
				var scrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
				var shouldStick = scrollTop >= stickyLine;
				// Switch the sticky modes if the element has crossed the sticky line
				if (shouldStick && !isSticking) stickElement();else if (!shouldStick && isSticking) unstickElement();
			}

			function stickElement() {
				$elem.addClass(InkStickyClass);
				isSticking = true;
				bodyClass && $body.addClass(bodyClass);
				stickyClass && $elem.addClass(stickyClass);
				$elem.css('position', 'fixed') // Delete
				.css('top', offset + 'px').css('width', initial.offsetWidth).css('margin-top', 0);
			}

			function unstickElement() {
				$elem.removeClass(InkStickyClass);
				isSticking = false;
				bodyClass && $body.removeClass(bodyClass);
				stickyClass && $elem.removeClass(stickyClass);
				$elem.css('top', initial.top).css('position', initial.position).css('margin-top', initial.marginTop);
			}

			function _getTopOffset(element) {
				var pixels = 0;
				if (element.offsetParent) {
					do {
						pixels += element.offsetTop;
						element = element.offsetParent;
					} while (element);
				}
				return pixels;
			}

			// Listeners
			//
			$window.on('scroll', checkIfShouldStick);
			$window.on('resize', scope.$apply.bind(scope, onResize));
			scope.$on('$destroy', onDestroy);

			function onResize() {
				if (!initial.width) {
					var parent = window.getComputedStyle(elem.parentElement, null);
					var initialOffsetWidth = elem.parentElement.offsetWidth - parent.getPropertyValue('padding-right').replace("px", "") - parent.getPropertyValue('padding-left').replace("px", "");
					$elem.css("width", initialOffsetWidth);
				}
			}

			function onDestroy() {
				$window.off('scroll', checkIfShouldStick);
				$window.off('resize', onResize);
			}
		}
	};
}
},{}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
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
},{}]},{},[4]);
