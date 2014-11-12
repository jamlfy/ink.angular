# [ink](http://ink.sapo.pt).[angular](https://angularjs.org)

## Install

```console
$ npm install ink.anglar.js
# OR
$ bower install ink.anglar.js
```

## Use

In html
```html
<script src="angular.js">
<script src="ink.anglar.js">
```
In the JS
```js
var app = anglar.module('myApp', [ 'ink.angular' ]);
```

### Directives
Alert
```html
<alert title="hello" status="green" block >
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