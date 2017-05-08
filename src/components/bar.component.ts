import { Component, Input, OnInit } from '@angular/core';

/**
 * <dropdown classes="green" text="DropDown" >
 * 		<li><a tab-href="#isNowHome">Home</a></li>
 * 		<li><a tab-href="#isNowHome">Home</a></li>
 * 		<li><a tab-href="#isNowHome">Home</a></li>
 * 		<li><a tab-href="#isNowHome">Home</a></li>
 * </dropdown>
 */

const template = `
<div class="{{prefix}}-progress-bar">
	<ng-content class="caption"></ng-content>
	<div class="bar {{cls}}"></div>
</div>`;

@Component({
	moduleId: __filename,
	selector: 'progressBar',
	template
})
export class barComponent implements OnInit {
	show: bool = true;
	width: number = 0;

	@Input() prefix: stirng = 'ink';
	@Input() text : stirng? ;
	@Input() progress: stirng? ;
	@Input() total: number = 100 ;

	onChanges ( ){
		this.show = !this.show;
	}
}

