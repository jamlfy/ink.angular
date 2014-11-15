# [ink](http://ink.sapo.pt).[angular](https://angularjs.org)

No jQuery required! - [AngularJS](https://angularjs.org) directives for [Ink](http://ink.sapo.pt).

## Install

```console
$ npm install ink.angular
# OR
$ bower install ink.angular
```

## Use

In html
```html
<script src="angular.js"></script>
<script src="ink.angular.js"></script>
```
In the JS
```js
var app = anglar.module('myApp', [ 'ink.angular' ]);
```

### Directives
Alert
```html
<alert title="hello" status="green" >
	Hello is my body
</alert>
```

Progress
```html
<progress color="blue" caption="Is my progress" progress="number" total="max" />
```

Drawer
```html
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
```
or
```js
function(scope){
	scope.open();
}
```

Sticky
```html
<ANY class="sticky" offset=100 body-class="BodyClass" sticky-class="myStickyClass" >
</ANY>
```
