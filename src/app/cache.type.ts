import { ConditionsAndZip } from './conditions-and-zip.type';
import { Forecast } from './forecasts-list/forecast.type';

export interface CachedItem {
	conditions?: CachedConditionsAndZip;
	forecast?: CachedForecast;
}

export interface CachedConditionsAndZip {
	data: ConditionsAndZip;
	expiryDateAndTime: Date;
}

export interface CachedForecast {
	data: Forecast;
	expiryDateAndTime: Date;
}
