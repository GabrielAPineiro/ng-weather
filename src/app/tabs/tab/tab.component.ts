import { Component, Input, TemplateRef } from '@angular/core';

@Component({
	selector: 'app-tab',
	templateUrl: './tab.component.html',
	styleUrls: ['./tab.component.css'],
})
export class TabComponent {
	@Input() public tabName?: string;

	@Input() public item?: any;

	@Input() public templateRef!: TemplateRef<any>;
}
