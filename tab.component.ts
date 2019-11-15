import { Component, OnInit } from '@angular/core';
import {MissionService} from '../mission.service';

Storage.prototype.setObj = function(key, obj) {
  return this.setItem(key, JSON.stringify(obj));
};
Storage.prototype.getObj = function(key) {
  return JSON.parse(this.getItem(key));
};

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {
  private city: string;
  private data: any;
  private current: any;
  private temperature: number | any;
  private summary: string | any | HTMLElement;
  private urlText: string;
  private seal: string;
  private state: string;
  private favor = false;
  private index: string;
  // private hour = false;

  constructor(
    private mission: MissionService
  ) {
    this.mission.weatherData$.subscribe((data) => {
      this.city = data[0];
      this.state = data[1];
      this.seal = data[2];
      this.data = data[3];
      this.index = data[4];
      console.log(this.index);
      if (this.index != null) {
        this.favor = true;
      }
      this.current = this.data.currently;
      this.temperature = this.current.temperature;
      this.summary = this.current.summary;
      // tslint:disable-next-line:max-line-length
      this.urlText = encodeURIComponent('The current temperature at ' + this.city + ' is ' + this.temperature +
        '℉. The weather conditions are ' + this.summary + '. #CSCI571WeatherSearch');
    });
  }

  ngOnInit() {
    this.deleteLast();
  }

  addFavor() {
    this.favor = true;
    const count = localStorage.getItem('count');
    const data = [this.city, this.state, this.seal, this.data];
    if (count === '1') {
      // tslint:disable-next-line:no-shadowed-variable
      const arr: Array<any> = new Array<any>();
      arr[0] = data;
      localStorage.setObj('city', arr);
    }
    const arr = localStorage.getObj('city');
    arr[Number(count) - 1] = data;
    localStorage.setObj('city', arr);
    localStorage.setItem('count',  String(Number(count) + 1));
  }

  deleteFavor() {
    this.favor = false;
    const count = Number(localStorage.getItem('count'));
    if (count === 2) {
      localStorage.clear();
      localStorage.setItem('count', '1');
    } else {
      const city = localStorage.getObj('city');
      if (this.index == null) {
        this.index = String(Number(localStorage.getItem('count')) - 1);
      }
      city.splice(Number(this.index), 1);
      localStorage.setObj('city', city);
      localStorage.setItem('count', String(count - 1));
    }
    // console.log(localStorage.getItem('count'));

  }

  showHour() {
    this.mission.tabDataService([false, true, false]);
  }
  showWeek() {
    this.mission.tabDataService([false, false, true]);
  }
  deleteLast() {
    this.mission.tabData$.subscribe((data) => {
      if (data[3]) {
        this.favor = false;
      }
    });
  }

}
