import { Component, OnInit } from '@angular/core';
import {MissionService} from '../mission.service';
import {Features} from '../current/features';

Storage.prototype.setObj = function(key, obj) {
  return this.setItem(key, JSON.stringify(obj));
};
Storage.prototype.getObj = function(key) {
  return JSON.parse(this.getItem(key));
};


@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  private cities: any;
  private tabHidden = true;
  private bar = false;
  private exist = true;
  private warning = false;
  private favor = true;

  constructor(
    private mission: MissionService,
  ) {
  }

  getFavor() {
    const count = Number(localStorage.getItem('count'));
    if (count === 1) {
      this.warning = true;
      this.favor = false;
    } else {
      this.warning = false;
      this.favor = true;
      this.cities = localStorage.getObj('city');
    }
  }

  deleteFavor(index) {
    // console.log(index);
    const count = Number(localStorage.getItem('count'));
    if (count - 2 === index) {
      // console.log('delete last!');
      this.mission.tabDataService([false, false, false, true]);
    }
    if (count === 2) {
      localStorage.clear();
      this.cities = [];
      localStorage.setItem('count', '1');
      this.warning = true;
      this.favor = false;
      // console.log(localStorage.getItem('count'));
    } else {
      const city = localStorage.getObj('city');
      city.splice(index, 1);
      this.cities = city;
      localStorage.setObj('city', city);
      localStorage.setItem('count', String(count - 1));
      // console.log(localStorage.getItem('count'));
    }
  }

  openTab(data, index) {
    this.bar = true;
    data[4] = index;
    console.log(index, data);
    setTimeout(() => {this.bar = false;  this.tabHidden = false; }, 2000);
    this.mission.weatherDataService(data);
    this.exist = false;
  }

  ngOnInit() {
    this.mission.tabData$.subscribe((data) => {
      if (data[0]) {
        // console.log('draw!!!');
        this.exist = true;
        this.tabHidden = true;
        this.getFavor();
      }
    });
    this.getFavor();
  }

}
