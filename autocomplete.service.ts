import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteService {
  private API_SERVER = 'http://localhost:3000/';
  private AUTO_API_SERVER = this.API_SERVER + 'autocomplete?city=';
  private GEO_API_SERVER = this.API_SERVER + 'geo?street=';
  private DARK_API_SERVER = this.API_SERVER + 'darksky?lat=';
  private DATE_API_SERVER = this.API_SERVER + 'darksky_time?lat=';
  private SEAL_API_SERVER = this.API_SERVER + 'seal?state=';
  constructor(private httpClient: HttpClient) { }
  public autoComplete(city) {
    return this.httpClient.get(this.AUTO_API_SERVER + city);
  }
  public async geoInformation(street, city, state) {
    return await this.httpClient.get(this.GEO_API_SERVER + street + '&city=' + city + '&state=' + state).toPromise();
  }
  public weatherInfo(lat, lng) {
    return this.httpClient.get(this.DARK_API_SERVER + lat + '&lng=' + lng);
  }
  public weatherInfoDate(lat, lng, time) {
    return this.httpClient.get(this.DATE_API_SERVER + lat + '&lng=' + lng + '&time=' + time);
  }
  public getSeal(state) {
    return this.httpClient.get(this.SEAL_API_SERVER + state);
  }
}
