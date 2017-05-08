import { Component, Input, OnInit } from '@angular/core';

const template = `
<div [block.class]="!!title" [basic.class]="!title" class="alert" role="alert" *ngIf="show">
	<button class="{{prefix}}-dismiss close" (click)="close()">&times;</button>
	<h4 *ngIf="!!title">{{title}}</h4>
	<ng-content></ng-content>
</div>`;

@Component({
	moduleId: __filename,
	selector: 'alert',
	template
})
export class AlertComponent implements OnInit {
	show: bool = true;

	@Input() prefix: stirng = 'ink';
	@Input() title : stirng? ;
	@Input() status: stirng? ;

	close(){
		this.show = false;
	}
}
