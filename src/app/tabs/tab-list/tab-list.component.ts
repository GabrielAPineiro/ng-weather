import { Component, ContentChildren, EventEmitter, Output, QueryList } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
	selector: 'app-tab-list',
	templateUrl: './tab-list.component.html',
	styleUrls: ['./tab-list.component.css'],
})
export class TabListComponent {
	@Output() public remove = new EventEmitter<string>();

	@ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;

	activeComponent!: TabComponent;

	ngAfterContentInit() {
		this.activeComponent = this.tabs.toArray()[0];
	}

	activateTab(tab: TabComponent) {
		this.activeComponent = tab;
	}

	removeTab(tab: TabComponent) {
		this.remove.emit(tab.item);
	}
}
