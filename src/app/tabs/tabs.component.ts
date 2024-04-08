import { Component, Signal, computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CacheService } from 'app/cache.service';
import { ConditionsAndZip } from 'app/conditions-and-zip.type';
import { LocationService } from 'app/location.service';
import { WeatherService } from 'app/weather.service';
import { EMPTY, NEVER, Observable, from, merge, of } from 'rxjs';
import { catchError, concatAll, concatMap, filter, map, mergeAll, mergeMap, scan, switchAll, switchMap, take, toArray } from 'rxjs/operators';

@Component({
	selector: 'app-tabs',
	templateUrl: './tabs.component.html',
	styleUrls: ['./tabs.component.css'],
})
export class TabsComponent {
	private router = inject(Router);
	private weatherService = inject(WeatherService);
	protected locationService = inject(LocationService);
	protected locations = this.locationService.getLocations();
	protected currentConditionsByZip: Signal<ConditionsAndZip[]> = this.weatherService.getCurrentConditions();

	constructor() {
		effect(
			() => {
				const locations = this.locations();

				this.weatherService.removeAllCurrentConditions();

				locations.forEach((location) => this.weatherService.addCurrentConditions(location));
			},
			{ allowSignalWrites: true },
		);
	}

	showForecast(zipcode: string) {
		this.router.navigate(['/forecast', zipcode]);
	}
}
