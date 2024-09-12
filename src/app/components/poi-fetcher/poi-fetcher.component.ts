import { Component, OnInit, signal, computed } from '@angular/core';
import { PoiService } from '../../services/poi.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-poi-fetcher',
  templateUrl: './poi-fetcher.component.html',
  styleUrls: ['./poi-fetcher.component.css']
})
export class PoiFetcherComponent implements OnInit {

  // Reference to the POIs signal. Filter out POIs with empty names
  pois = computed(() => 
    this.poiService.pois().filter(poi => poi.name && poi.name.trim() !== ''));

  // Access to latitude and longitude signals (current and last if updated)
  isLoading = computed(() => 
    this.poiService.isLoading());

  // Determine if the Update POIs button should be displayed
  isShowUpdateButton = computed(() => {
    return this.currentLatitude() !== this.lastLatitude() || this.currentLongitude() !== this.lastLongitude();
  });  

  // Create variables to bind inputs for manual adjustment
  latitudeInput: number | null = null;
  longitudeInput: number | null = null;

  // Create variables to handle state of latitude, longitude
  currentLatitude; 
  currentLongitude;
  lastLatitude; 
  lastLongitude;

  constructor(private poiService: PoiService) {
    this.currentLatitude = signal(this.poiService.latitude());
    this.currentLongitude = signal(this.poiService.longitude());
    this.lastLatitude = signal(this.currentLatitude());
    this.lastLongitude = signal(this.currentLongitude());
  }

  ngOnInit(): void {
    this.getUserLocation();
  }

  getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = this.poiService.adjust(position.coords.latitude);
        const lon = this.poiService.adjust(position.coords.longitude);

        // Update latitude and longitude signals
        this.poiService.latitude.set(lat);
        this.poiService.longitude.set(lon);

        this.currentLatitude.set(lat);
        this.currentLongitude.set(lon);

        this.lastLatitude.set(lat);
        this.lastLongitude.set(lon);

        this.poiService.fetchPOIs(lat, lon);
      }, (error) => {
        console.error('Error getting location', error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  // Methods to increase/decrease latitude and longitude
  adjustLatitude(value: number): void {
    const newValue = this.poiService.adjust(this.currentLatitude(), value);
    // Update the current latitude
    this.currentLatitude.set(newValue);
    this.poiService.latitude.set(newValue);
  }

  adjustLongitude(value: number): void {
    const newValue = this.poiService.adjust(this.currentLongitude(), value);
    // Update the current longitude
    this.currentLongitude.set(newValue);
    this.poiService.longitude.set(newValue);
  }

  updatePOIs(): void {
    // Refresh POIs based on updated coordinates
    this.poiService.fetchPOIs(this.currentLatitude(), this.currentLongitude());
    // Update last fetch values
    this.lastLatitude.set(this.currentLatitude());
    this.lastLongitude.set(this.currentLongitude());
  }
}
