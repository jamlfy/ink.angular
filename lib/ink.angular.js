var ink = angular.module('ink.angular', ['ng']);

ink.value('prefix', 'ink-');

/*

<alert title="hello" status="green" block >
	Hello is my body
</alert>

*/

ink.directive('alert', ['prefix', function ( prex ) {
	return {
		restrict: 'E',
		transclude: true,
		link : function(scope, elez, attrs) {
			scope.block = 'basic';
			scope.close = function(){
				elez.remove();
			};
			scope.stats = attrs.status;
			if( attrs.block ){
				scope.block = 'block';
				scope.blockShow = true;
				scope.title = attrs.block;
			}
		},
		template :	'<div class="alert {{block}} {{stats}}" role="alert">' + 
						'<button class="' + prex + 'dismiss close" ng-click="close()">&times;</button>' +
						'<h4 ng-show="blockShow">{{title}}</h4>' +
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
