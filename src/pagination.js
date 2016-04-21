export const name = 'pagination';

/**
 * <pagination home="#isNowHome" position="top" />
 */

export function f (prex) {
	const templete = 
`<nav class="${prex}-navigation" id="{{ids}}">
	<ul class="pagination {{color}}">
		<li class="first"><a ng-click="previous()" >{{text.first}}</a></li>
		<li class="previousPage disabled {{showPrevious}}"><a ng-click="previous(showNumber)">{{text.previous}} {{step}}</a></li>
		<li class="previous {{showPrevious}}"><a ng-click="previous(1)">{{text.previous}}</a></li>
		<li ng-repeat="val in arr" class="{{shomMe($index)}}"><a ng-href="{{hrefText(val)}}" data-index="{{$index}}">{{val}}</a></li>
		<li class="next {{showPrevious}}"><a ng-click="next(1)">{{text.next}}</a></li>
		<li class="nextPage {{showNext}}"><a ng-click="next(step)">{{text.next}} {{step}}</a></li>
		<li class="last"><a ng-click="next()">{{text.last}}</a></li>
	</ul>
</nav>`;
	return {
		restrict: 'E',
		transclude: true,
		scope: {
			step : '@step',
			max : '@max',
			text : '@text'
		},
		link (scope, elez, attrs, crtl) {
			scope.pagination = 0;
			scope.step = 5;
			scope.arr = [];
			for (var i = scope.max.length - 1; i >= 0; i--) {
				scope.arr.push(i + 1);
			}
			scope.arr.reverse();

			scope.previous = index => {
				if(angular.isNumber(index) ){
					scope.pagination -= index;
				} else{
					scope.pagination = 0;
				}

			};

			scope.next = index => {
				if(angular.isNumber(index) ){
					scope.pagination += index;
				} else {
					scope.pagination = ( Number(attr.max) - 1 ) - scope.step;
				}
			};

			scope.showMe = (index=0) =>{
				let max = scope.pagination += scope.step;
				if( index < max && scope.pagination < index ){
					return '';
				} else {
					return 'all-hide';
				}
			};

			scope.hrefText = (val=0) => {
				return attr.href.replace(':pages', val);
			};

		},
		templete
	}
}




