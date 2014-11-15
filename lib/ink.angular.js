var ink = angular.module('ink.angular', ['ng']);

ink.value('prefix', 'ink-');

/*

<alert title="hello" status="green" >
	Hello is my body
</alert>

*/

ink.directive('alert', ['prefix', function ( prex ) {
	return {
		restrict: 'E',
		transclude: true,
		scope: {
			'stats' : '&status',
			'block' : '&title'
		},
		link : function(scope, elez, attrs) {
			scope.types = scope.block ? 'block' : 'basic';
			scope.show = scope.types === 'block';
			scope.close = function(){
				elez.remove();
			};
		},
		template :	'<div class="alert {{types}} {{stats}}" role="alert">' + 
						'<button class="' + prex + 'dismiss close" ng-click="close()">&times;</button>' +
						'<h4 ng-if="show">{{block}}</h4>' +
						'<p ng-transclude></p>' +
					'</div>'
	};
}]);

/*

<progress color="blue" caption="Is my progress" progress="number" total="max" />

*/

ink.directive('progress', ['prefix', function () {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		scope: {
			'color' : '&color',
			'caption' : '&title',
			'progress' : '&progress'
		},
		link: function(scope, ele, attr, ctrl) {
			var total = parseInt( attr.total ) || 100;
			var bar = angular.element( ele.children()[1] );

			scope.$watch(scope.progress, function (value) {
				bar.css({
					'width' : ( ( Number(value) * 100 ) / total ) +  '%'
				});
			});

			scope.$watch(scope.color, function (value) {
				scope.cls = value;
			});
		},
		template : 	'<div class="' + prex + 'progress-bar">' + 
						'<span class="caption" ng-transclude></span>' +
						'<div class="bar {{cls}}"></div>' +
					'</div>'
	};
}]);

/*


<ANY ng-controller="mycontroller">
	<drawer position="left" content="#myContent">
		<ul>
			...
			<li><a ng-click="close()">Close</a></li>
		</ul>
	</drawer>

	<ANY id="myContent">
		<a ng-click="open()">Open</a>
	</ANY>
</ANY>

or

function mycontroller (scope){
	scope.open();
}

*/

ink.directive('drawer', ['prefix', function (prefix) {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		scope: {
			'position' : '&position'
		},
		link: function (scope, ele, attr, ctrl) {
			var body = angular.elemeent('body').addClass( prefix + 'drawer');
			scope.position = scope.position || 'left';

			if( attr.content )
				angular.element(attr.content).addClass('content-drawer');

			ctrl.openDrawer = function () {
				body.addClass('push');
				body.addClass( scope.position );
				ele.addClass('show');
			};

			ctrl.closeDrawer = function () {
				body.removeClass('push');
				body.removeClass( scope.position );
				ele.removeClass('show');
			};
		},
		template : 	'<div class="{{position}}-drawer" ng-transclude></div>'
	};
}]);


/*


<ANY class="sticky" offset=100 body-class="BodyClass" sticky-class="myStickyClass" >

</ANY>

*/


ink.directive('sticky',['prefix', function (prex) {
		const InkStickyClass =  prex + 'sticky-stuck';
		// Directive definition
		return {
			scope: {
				offset: '@',      // top offset
				mediaQuery: '@',  // minimum width required for sticky to come in
				stickyClass: '@', // class to be applied to the element on sticky
				bodyClass: '@'    // class to be applied to the body on sticky
			},
			restrict: 'C',
			link: function(scope , elem, attrs) {
				var mediaQuery  = scope.mediaQuery  || null,
					stickyClass = scope.stickyClass || '',
					bodyClass   = scope.bodyClass   || '',

					$elem   = elem, elem = $elem[0],
					$window = angular.element(window),
					$body   = angular.element(document.body),
					doc     = document.documentElement,

					initial = {
						offsetWidth: elem.offsetWidth,
						top: $elem.css('top'),
						width: $elem.css('width'),
						position: $elem.css('position'),
						marginTop: $elem.css('margin-top'),
					},

					isPositionFixed = false,
					isSticking = false,
					stickyLine;

				var offset = typeof scope.offset === 'string'
					? parseInt( scope.offset.replace(/px;?/, '') )
					: 0;

				// Watchers
				//
				var prevOffset = _getTopOffset(elem);

				scope.$watch( function() {
					if ( isSticking ) return prevOffset;

					prevOffset = _getTopOffset(elem);
					return prevOffset;

				}, function(newVal, oldVal) {
					if ( newVal !== oldVal || typeof stickyLine === 'undefined' ) {
						stickyLine = newVal - offset;
						checkIfShouldStick();
					}
				});

				// checks if the window has passed the sticky line
				function checkIfShouldStick() {
					if ( mediaQuery && !matchMedia('('+mediaQuery+')').matches) return;

					var scrollTop = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
					var shouldStick = scrollTop >=  stickyLine;

					// Switch the sticky modes if the element has crossed the sticky line
					if ( shouldStick && !isSticking )
						stickElement();
							
					else if ( !shouldStick && isSticking )
						unstickElement();
				}

				function stickElement() {
					$elem.addClass(InkStickyClass);
					isSticking = true;
					bodyClass   && $body.addClass(bodyClass);
					stickyClass && $elem.addClass(stickyClass);

					$elem
						.css('position', 'fixed')
						.css('top',      offset+'px')
						.css('width',    initial.offsetWidth)
						.css('margin-top',   0);

				};

				function unstickElement() {
					$elem.removeClass(InkStickyClass);
					isSticking = false;
					bodyClass   && $body.removeClass(bodyClass);
					stickyClass && $elem.removeClass(stickyClass);

					$elem
						.css('top',      initial.top)
						.css('position', initial.position)
						.css('margin-top',   initial.marginTop);
				};

				function _getTopOffset (element) {
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
				$window.on('scroll',  checkIfShouldStick);
				$window.on('resize',  scope.$apply.bind(scope, onResize));
				scope.$on('$destroy', onDestroy);

				function onResize() {
					if ( !initial.width ) {

						var parent = window.getComputedStyle(elem.parentElement, null);
						var initialOffsetWidth = elem.parentElement.offsetWidth
							- parent.getPropertyValue('padding-right').replace("px", "")
							- parent.getPropertyValue('padding-left').replace("px", "");
						$elem.css("width", initialOffsetWidth);

					}
				};

				function onDestroy() {
					$window.off('scroll', checkIfShouldStick);
					$window.off('resize', onResize);
				};
			}
		};
	}]);