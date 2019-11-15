import { Component, OnInit } from '@angular/core';
import {MissionService} from '../mission.service';
import {Color} from 'ng2-charts';
import { BaseChartDirective } from 'ng2-charts';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  private data: any;
  private hourly: any;
  private temperatureData: Array<number> = new Array<number>();
  private pressureData: Array<number> = new Array<number>();
  private humidityData: Array<number> = new Array<number>();
  private ozoneData: Array<number> = new Array<number>();
  private visibilityData: Array<number> = new Array<number>();
  private windspeedData: Array<number> = new Array<number>();
  private allData: Array<number>[];
  // @ts-ignore
  @ViewChild(BaseChartDirective) public myChart: BaseChartDirective;

  constructor(
    private mission: MissionService
  ) {

  }

  private units = ['Fahrenheit', 'Millibars', '% Humidity', 'Dobson Units', 'Miles (Maximum 10)', 'Miles per Hour'];
  private labels = ['temperature', 'pressure', 'humidity', 'ozone', 'visibility', 'windSpeed'];

  public barChartOptions = {
    scales: {
      xAxes: [{scaleLabel: {display: true,
          labelString: 'Time difference from current hour'
        }}],
      yAxes: [{scaleLabel: {display: true,
          labelString: this.units[0]
      }}]
    },
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public barChartColors: Color[] = [
    { backgroundColor: 'rgba(155,209,242,0.9)' },
  ];
  // tslint:disable-next-line:max-line-length
  public barChartLabels = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barFeatureData = {data: this.temperatureData, label: 'temperature'};
  public barChartData = [
    this.barFeatureData
  ];

  onChange(value: string) {
    this.barFeatureData.data = this.allData[Number(value)];
    this.barFeatureData.label = this.labels[Number(value)];
    this.barChartOptions = {
      scales: {
        xAxes: [{scaleLabel: {display: true,
            labelString: 'Time difference from current hour'
          }}],
        yAxes: [{scaleLabel: {display: true,
            labelString: this.units[Number(value)]
          }}]
      },
      scaleShowVerticalLines: false,
      responsive: true,
    };
    // console.log(this.labels[Number(value)]);
  }

  ngOnInit() {
    this.mission.weatherData$.subscribe((data) => {
      this.data = data[3];
      this.hourly = this.data.hourly;
      for (let i = 0; i < 24; i++) {
        this.temperatureData[i] = this.hourly.data[i].temperature;
        this.pressureData[i] = this.hourly.data[i].pressure;
        this.humidityData[i] = this.hourly.data[i].humidity;
        this.ozoneData[i] = this.hourly.data[i].ozone;
        this.visibilityData[i] = this.hourly.data[i].visibility;
        this.windspeedData[i] = this.hourly.data[i].windSpeed;
      }
      this.allData = [this.temperatureData, this.pressureData, this.humidityData, this.ozoneData, this.visibilityData, this.windspeedData];
      // console.log(this.temperatureData);
    });
    this.mission.tabData$.subscribe((data) => {
      if (data[1]) {
        // console.log('change!');
        // @ts-ignore
        this.myChart.ngOnChanges({} as SimpleChanges);
        // this.barChartData[0].data.shift();
        // this.barChartLabels.shift();
        // this.myChart.chart.render();
        // console.log(this.myChart.chartType);

        setTimeout(() => {
          this.myChart.chart.render();
        }, 500);
        // this.onChange('0');
        // this.barChartType = 'bar';
      }
    });
  }

}
