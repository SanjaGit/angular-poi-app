import { Injectable } from '@angular/core';
import { signal } from '@angular/core';

import { openstreetmapGetPOIs } from '../../assets/js/ez-opendata';

@Injectable({
  providedIn: 'root'
})
export class PoiService {
  isLoading = signal<boolean>(true);
  latitude = signal<number>(0);
  longitude = signal<number>(0);
  pois = signal<any[]>([]); // Create a signal for storing POIs

  public static readonly RECT_STEP = 0.1;
  public static readonly AMENITIES = [
    ["amenity", "bar"],
    ["amenity", "biergarten"],
    ["amenity", "cafe"],
    ["amenity", "restaurant"],
    ["amenity", "fast_food"],
    ["amenity", "food_court"],
    ["amenity", "ice_cream"],
  ];

  constructor() {}

  adjust(current: number, value?: number): number {
    return parseFloat((current + (value ?? 0)).toFixed(2));
  }

  fetchPOIs(lng: number, lat: number): void {
    this.isLoading.set(true);
    const bbox = 
      this.adjust(lng, -PoiService.RECT_STEP) + ',' + 
      this.adjust(lat, -PoiService.RECT_STEP) + ',' +
      this.adjust(lng, PoiService.RECT_STEP) + ',' +
      this.adjust(lat, PoiService.RECT_STEP);
    console.log('Fething POIs by rectangle', bbox);
    openstreetmapGetPOIs(bbox, PoiService.AMENITIES).then(res => {
      this.pois.set(res);
      this.isLoading.set(false);
    }).catch(error => {
      console.error('Error fetching from openstreetmapGetPOIs', error);
      this.pois.set([]);
      this.isLoading.set(false);
    });
  }
}
