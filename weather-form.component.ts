import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AutocompleteService} from '../autocomplete.service';
import {MissionService} from '../mission.service';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'angular-local-storage';

@Component({
  selector: 'app-weather-form',
  templateUrl: './weather-form.component.html',
  styleUrls: ['./weather-form.component.css']
})

export class WeatherFormComponent implements OnInit {
  private myCity: any;
  private myState: any;
  // private weather: any[];
  private submitted = false;
  private status = true;
  private showInvalid = false;

  constructor(
    private formBuilder: FormBuilder,
    private api: AutocompleteService,
    private mission: MissionService,
    private http: HttpClient,
  ) { }

  get f() { return this.userForm.controls; }

  bar = false;
  tabHidden = true;
  favorHidden = true;
  userForm: FormGroup;
  street = new FormControl();
  city = new FormControl();
  state = new FormControl();
  current = new FormControl();

  predictions = [];
  geoInfo = [];
  lat = 0;
  lng = 0;
  public seal: string;
  url = 'http://ip-api.com/json';

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      street: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      state: [{value: '', disabled: this.current.value},  Validators.required],
    });
    // localStorage.setItem('count', '1');
  }

  autoCom() {
    this.api.autoComplete(this.city.value).subscribe((data: any[]) => {
      // console.log(data);
      this.predictions = data;
    });
  }

  getWeather() {
    this.api.weatherInfo(this.lat, this.lng).subscribe((weather: any[]) => {
      // console.log(data);
      this.api.getSeal(this.myState).subscribe((sealInfo: any[]) => {
        // @ts-ignore
        this.seal = sealInfo.items[0].link;
        // this.weather = weather;
        this.predictions = [this.myCity, this.myState, this.seal, weather];
        // console.log(this.lat, this.lng, this.myState, this.myCity);
        this.mission.weatherDataService(this.predictions);
      });
    });
  }

  getGEO() {
    this.api.geoInformation(this.street.value, this.city.value, this.state.value).then((data: any[]) => {
      console.log(data);
      // @ts-ignore
      if (data.status === 'ZERO_RESULTS') {
        this.status = false;
        this.tabHidden = true;
        this.favorHidden = true;
        this.bar = false;
        this.showInvalid = true;
      } else {
        this.showInvalid = false;
        this.status = true;
        this.geoInfo = data;
        // @ts-ignore
        this.location = this.geoInfo.results[0].geometry.location;
        // @ts-ignore
        this.lat = this.location.lat;
        // @ts-ignore
        this.lng = this.location.lng;
        this.myCity = this.city.value;
        this.myState = this.state.value;
        // console.log(this.lat, this.lng);
        this.getWeather();
      }
    });
  }

  getCurrent() {
    this.http.get(this.url).subscribe((data: any[]) => {
        this.status = true;
        this.showInvalid = false;
      // console.log(data);
        // @ts-ignore
        this.lat = data.lat;
        // @ts-ignore
        this.lng = data.lon;
        // @ts-ignore
        this.myState = data.region;
        // @ts-ignore
        this.myCity = data.city;
        // console.log(this.lat, this.lng);
        this.getWeather();
    });
  }

  onSubmit() {
    this.submitted = false;
    setTimeout(() => {this.submitted = true; }, 5);
    if (this.current.value) {
      console.log('Get Current Location');
      this.getCurrent();
    } else {
      console.log('Get Geology Location');
      this.getGEO();
    }

    this.tabHidden = true;
    this.favorHidden = true;
    this.bar = true;
    setTimeout(() => {
      if (this.status) {
        this.bar = false;  this.tabHidden = false;
      }
      }, 2000);
  }

  onReset() {
    this.submitted = false;
    this.favorHidden = true;
    this.showInvalid = false;
    this.status = true;
    this.tabHidden = true;
    this.userForm.reset();
    this.street = new FormControl();
    this.city = new FormControl();
    this.current = new FormControl();
    // localStorage.clear();
    // localStorage.setItem('count', '1');
  }

  onFavor() {
    this.favorHidden = false;
    this.tabHidden = true;
    this.mission.tabDataService([true, false, false]);
    // this.addFavour();
  }

  onResult() {
    this.favorHidden = true;
    this.tabHidden = false;
  }

}


