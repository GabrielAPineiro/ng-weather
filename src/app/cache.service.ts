import { Injectable, Signal, signal } from '@angular/core';
import { ConditionsAndZip } from './conditions-and-zip.type';
import { Forecast } from './forecasts-list/forecast.type';
import { CachedItem } from './cache.type';

export const CACHE_DURATION: string = 'cache_duration';

@Injectable()
export class CacheService {
	private cacheDuration = signal<number>(7200);

	constructor() {
		let cacheDurationString = localStorage.getItem(CACHE_DURATION);
		if (cacheDurationString) {
			this.cacheDuration.set(JSON.parse(cacheDurationString));
		}
	}

	getCacheDuration(): Signal<number> {
		return this.cacheDuration.asReadonly();
	}

	updateCacheDuration(duration: number) {
		this.cacheDuration.set(duration);
		localStorage.setItem(CACHE_DURATION, JSON.stringify(duration));
	}

	public getCachedItem(zipcode: string, key: 'conditions' | 'forecast'): ConditionsAndZip | Forecast | null {
		const cachedItemString = localStorage.getItem(zipcode);
		if (cachedItemString) {
			const cachedItem = JSON.parse(cachedItemString);
			if (cachedItem[key]) {
				const cachedTime = new Date(cachedItem[key].expiryDateAndTime);
				const now = new Date();

				// Checking if cached time is bigger than now to return cached item
				if (cachedTime > now) {
					return cachedItem[key].data;
				}
			}
		}

		return null;
	}

	public setCachedItem(zipcode: string, conditions?: ConditionsAndZip, forecast?: Forecast) {
		const cachedItemString = localStorage.getItem(zipcode);
		let cachedItem!: CachedItem;
		if (cachedItemString) {
			cachedItem = JSON.parse(cachedItemString);
		} else {
			cachedItem = {};
		}

		if (conditions) {
			cachedItem.conditions = {
				data: conditions,
				expiryDateAndTime: this.getExpiryDateAndTime(),
			};
		}

		if (forecast) {
			cachedItem.forecast = {
				data: forecast,
				expiryDateAndTime: this.getExpiryDateAndTime(),
			};
		}

		localStorage.setItem(zipcode, JSON.stringify(cachedItem));
	}

	public removeCachedItem(zipcode: string) {
		localStorage.removeItem(zipcode);
	}

	private getExpiryDateAndTime(): Date {
		let expiryDateAndTime = new Date();
		const seconds = expiryDateAndTime.getSeconds() + Number(this.cacheDuration());
		expiryDateAndTime.setSeconds(seconds);
		return expiryDateAndTime;
	}
}
