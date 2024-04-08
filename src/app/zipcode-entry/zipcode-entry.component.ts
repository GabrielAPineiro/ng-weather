import { Component } from '@angular/core';
import { LocationService } from '../location.service';
import { CacheService } from 'app/cache.service';

@Component({
	selector: 'app-zipcode-entry',
	templateUrl: './zipcode-entry.component.html',
})
export class ZipcodeEntryComponent {
	constructor(private service: LocationService, private cacheService: CacheService) {}

	addLocation(zipcode: string) {
		this.service.addLocation(zipcode);
	}

	clearCacheLocation(zipcode: string) {
		this.cacheService.removeCachedItem(zipcode);
	}
}
