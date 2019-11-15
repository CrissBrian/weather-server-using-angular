import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MissionService {
  // Observable string sources
  private weatherDataSource = new Subject<string>();
  private tabDataSource = new Subject<string>();

  // Observable string streams
  weatherData$ = this.weatherDataSource.asObservable();
  tabData$ = this.tabDataSource.asObservable();

  // Service message commands
  weatherDataService(weather: any) {
    // console.log(weather);
    this.weatherDataSource.next(weather);
  }
  tabDataService(tab: any) {
    // console.log(weather);
    this.tabDataSource.next(tab);
  }


  constructor() { }
}
