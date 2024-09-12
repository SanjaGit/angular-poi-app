import { Component } from '@angular/core';
import { PoiFetcherComponent } from './components/poi-fetcher/poi-fetcher.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    PoiFetcherComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-poi-app';
}
