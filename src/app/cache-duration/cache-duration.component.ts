import { Component, inject } from '@angular/core';
import { CacheService } from 'app/cache.service';

@Component({
	selector: 'app-cache-duration',
	templateUrl: './cache-duration.component.html',
})
export class CacheDurationComponent {
	protected cacheService = inject(CacheService);
	protected cacheDuration = this.cacheService.getCacheDuration();

	protected get inputValue(): number {
		return this.cacheDuration();
	}
}
