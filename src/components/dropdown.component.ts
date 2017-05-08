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
<div class="{{prefix}}-dropdown" [active.class]="!show" >
    <button class="{{prefix}}-button {{class}}" (click)="showNow()">{{text}}</button>
    <ul ng-content class="dropdown-menu" [hidden]="show" ></ul>
</div>`;

@Component({
	moduleId: __filename,
	selector: 'dropdown',
	template
})
export class dropdownComponent implements OnInit {
	show: bool = true;

	@Input() prefix: stirng = 'ink';
	@Input() text : stirng? ;
	@Input() classes: stirng? ;

	showNow(){
		this.show = !this.show;
	}
}

