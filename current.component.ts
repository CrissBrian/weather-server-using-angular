import { Component, OnInit } from '@angular/core';
import {MissionService} from '../mission.service';
import {Features} from './features';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent implements OnInit {
  public data: any;
  private city: any;
  private timezone: any;
  private current: any;
  // private temperature: any;
  private temperature: number;
  private summary: string | HTMLElement;
  private features: Array<Features> = new Array<Features>();
  private seal: string;

  constructor(
    private mission: MissionService
  ) {
    this.mission.weatherData$.subscribe((data) => {
      this.city = data[0];
      // console.log(this.city);
      this.seal = data[2];
      this.data = data[3];
      this.timezone = this.data.timezone;
      this.current = this.data.currently;
      this.temperature = Math.round(this.current.temperature);
      this.summary = this.current.summary;
      this.features[0] = new Features('Humidity', this.current.humidity,
        'https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-16-512.png');
      this.features[1] = new Features('Pressure', this.current.pressure,
        'https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-25-512.png');
      this.features[2] = new Features('WindSpeed', this.current.windSpeed,
        'https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-27-512.png');
      this.features[3] = new Features('Visibility', this.current.visibility,
        'https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-30-512.png');
      this.features[4] = new Features('CloudCover', this.current.cloudCover,
        'https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-28-512.png');
      this.features[5] = new Features('Ozone', this.current.ozone,
        'https://cdn2.iconfinder.com/data/icons/weather-74/24/weather-24-512.png');
    });
  }

  ngOnInit() {
  }

}
