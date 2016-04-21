const text = 'Ink: This browser does not support matchMedia, '+
		'therefore the minWidth option will not work on this browser. '+
		'Polyfill matchMedia to fix this issue.';

export function f (args) {
	( window.console && console.warn && console.warn )( text );
	return function() {
		return {
			matches: true
		};
	};
}