import { Injectable, Signal, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

export const LOCATIONS: string = 'locations';

@Injectable()
export class LocationService {
	locations = signal<string[]>([]);

	constructor() {
		let locString = localStorage.getItem(LOCATIONS);
		if (locString) {
			this.locations.set(JSON.parse(locString));
		}
	}

	getLocations(): Signal<string[]> {
		return this.locations.asReadonly();
	}

	addLocation(zipcode: string) {
		this.locations.update((locations) => {
			locations.push(zipcode);
			localStorage.setItem(LOCATIONS, JSON.stringify(locations));
			return [...locations];
		});
	}

	removeLocation(zipcode: string) {
		this.locations.update((locations) => {
			let index = locations.indexOf(zipcode);
			if (index !== -1) {
				locations.splice(index, 1);
				localStorage.setItem(LOCATIONS, JSON.stringify(locations));
			}
			return [...locations];
		});
	}
}
