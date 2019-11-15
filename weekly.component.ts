import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';
import {AutocompleteService} from '../autocomplete.service';
import {MissionService} from '../mission.service';
import * as CanvasJS from '../../assets/canvasjs.min';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngbd-modal-content',
  encapsulation: ViewEncapsulation.None,
  styles: [`
      .dark-modal .modal-content {
          background-color: #6592ad;
      }
      .dark-modal .close {
      }
      @media screen and (min-width: 601px) {
          /*.cb-25-100 {width: 25%}*/
      }
      @media screen and (max-width: 600px) {
          h4 {font-size: 25px;}
      }
  `],
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{time}}</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>

    <div class="modal-body" style="background-color: #9bd1f2">
        <div class="row ml-3 mb-3">
            <div class="col-6 text-left">
                <h4  class="card-title">{{city}}</h4>

                <div class="card-text my-2  ml-2">
                    <div class="row">
                        <h2 class="card-text">{{temperature}}</h2>
                        <img src="https://cdn3.iconfinder.com/data/icons/virtual-notebook/16/button_shape_oval-512.png"
                             height="10" width="10"  alt="circle">
                        <h2 class="card-text">F</h2>
                    </div>
                </div>

                <h6 class="card-text">{{summary}}</h6>
            </div>
            <div class="col-6">
                <img src="{{icon}}" height="120" width="120" alt="This is icon!" class="mx-auto">
            </div>
        </div>

    <div class="modal-footer">
        <div class="row w-100 justify-content-end m-0">
            <div class="col-12 col-sm-7 text-left">
                <h6 class="card-text">Precipitation: {{precipitation}}</h6>
                <h6 class="card-text">Chance of Rain: {{cor}} %</h6>
                <h6 class="card-text">Wind Speed: {{windSpeed}} mph</h6>
                <h6 class="card-text">Humidity: {{humidity}} %</h6>
                <h6 class="card-text">Visibility: {{visibility}} miles</h6>
            </div>
        </div>
    </div>
    </div>
  `
})
// tslint:disable-next-line:component-class-suffix
export class NgbdModalContent {
  @Input() time;
  @Input() city;
  @Input() summary;
  @Input() temperature;
  @Input() icon;
  @Input() precipitation;
  @Input() cor;
  @Input() windSpeed;
  @Input() humidity;
  @Input() visibility;
  constructor(public activeModal: NgbActiveModal) {}
}



@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.component.html',
  styleUrls: ['./weekly.component.css']
})
export class WeeklyComponent implements OnInit {
  private data: any;
  private daily: any;
  private times: Array<any> = new Array<any>();
  private temperatureLows: Array<number> = new Array<number>();
  private temperatureHighs: Array<number> = new Array<number>();
  private rawTimes: Array<any> = new Array<any>();
  private city: string;
  private lat: number;
  private lng: number;

  constructor(
    private api: AutocompleteService,
    private mission: MissionService,
    private  modalService: NgbModal,
  ) { }

  cbInit() {
    this.mission.weatherData$.subscribe((data) => {
      this.city = data[0];
      this.data = data[3];
      this.lat = this.data.latitude;
      this.lng = this.data.longitude;
      this.daily = this.data.daily.data;
      function formatDate(date) {
        // tslint:disable-next-line:one-variable-per-declaration prefer-const
        let d = new Date(date),
          // tslint:disable-next-line:prefer-const
          month = '' + (d.getMonth() + 1),
          // tslint:disable-next-line:prefer-const
          day = '' + d.getDate(),
          // tslint:disable-next-line:prefer-const
          year = d.getFullYear();
        // if (month.length < 2) { month = month; }
        // if (day.length < 2) { day = day; }
        return [day, month, year].join('/');
      }
      for (let i = 0; i < 7; i++) {
        this.times[i] = formatDate(this.daily[i].time * 1000);
        this.rawTimes[i] = this.daily[i].time;
        this.temperatureLows[i] = Math.round(this.daily[i].temperatureLow);
        this.temperatureHighs[i] = Math.round(this.daily[i].temperatureHigh);
      }
      this.drawChart();
    });
  }

  ngOnInit() {
    this.cbInit();
    this.mission.tabData$.subscribe((data) => {
      if (data[2]) {
        // console.log('draw!!!');
        this.drawChart();
      }
    });
  }

  opens(data, app) {
    // console.log(data);
    // const time = data.time;
    const formatTime = data.label;

    app.api.weatherInfoDate(app.lat, app.lng, data.time).subscribe((weather: any[]) => {
      // @ts-ignore
      const currently = weather.currently;
      const dict = { 'clear-day' : 0, 'clear-night' : 0, rain : 1, snow : 2, sleet : 3, wind : 4,
        fog : 5, cloudy : 6, 'partly-cloudy-day' : 7, 'partly-cloudy-night' : 7 };
      const icon = ['https://cdn3.iconfinder.com/data/icons/weather-344/142/sun-512.png',
        'https://cdn3.iconfinder.com/data/icons/weather-344/142/rain-512.png',
        'https://cdn3.iconfinder.com/data/icons/weather-344/142/snow-512.png',
        'https://cdn3.iconfinder.com/data/icons/weather-344/142/lightning-512.png',
        'https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_10512.png',
        'https://cdn3.iconfinder.com/data/icons/weather-344/142/cloudy-512.png',
        'https://cdn3.iconfinder.com/data/icons/weather-344/142/cloud-512.png',
        'https://cdn3.iconfinder.com/data/icons/weather-344/142/sunny-512.png'];
      // console.log(currently.icon, dict[currently.icon], icon[dict[currently.icon]]);

      const modalRef = app.modalService.open(NgbdModalContent , {windowClass: 'dark-modal' });
      modalRef.componentInstance.city = app.city;
      modalRef.componentInstance.time = formatTime;
      modalRef.componentInstance.temperature = Math.round(currently.temperature);
      modalRef.componentInstance.summary = currently.summary;
      modalRef.componentInstance.icon = icon[dict[currently.icon]];
      modalRef.componentInstance.precipitation  = currently.precipIntensity;
      modalRef.componentInstance.cor  = currently.precipProbability * 100;
      modalRef.componentInstance.windSpeed  = currently.windSpeed;
      modalRef.componentInstance.humidity = Math.round(currently.humidity * 100);
      modalRef.componentInstance.visibility  = currently.visibility;


    });

  }

  drawChart() {
    CanvasJS.addColorSet('blue', ['#9bd1f2']);
    const data = [];
    const dataSeries = {
      type: 'rangeBar',
      showInLegend: true,
      indexLabel: '{y[#index]}',
      legendText: 'Day wise temperature range',
      toolTipContent: '<b>{label}</b>: {y[0]} to {y[1]}',
      click: (e) => {this.opens(e.dataPoint, this); },
      dataPoints: undefined
    };
    const dataPoints = [];
    for (let i = 6; i >= 0; i--) {
      dataPoints.push({
        X: i,
        y: [this.temperatureLows[i], this.temperatureHighs[i]],
        label: this.times[i],
        time: this.rawTimes[i],
      });
    }
    dataSeries.dataPoints = dataPoints;
    data.push(dataSeries);

    const options = {
      colorSet: 'blue',
      animationEnabled: true,
      exportEnabled: false,
      title: {text: 'Weekly Weather'},
      legend: {
        horizontalAlign: 'center', // "center" , "right"
        verticalAlign: 'top',  // "top" , "bottom"
        fontSize: 15
      },
      axisX: {title: 'Days', interval: 1},
      axisY: {
        includeZero: false,
        title: 'Temperature in Fahrenheit',
        interval: 10,
        gridThickness: 0,
      },
      dataPointWidth: 17,
      data
    };

    const chart = new CanvasJS.Chart('chartContainer', options);
    // tslint:disable-next-line:only-arrow-functions
    setTimeout(function() {
    chart.render();
    }, 5);
  }


}
