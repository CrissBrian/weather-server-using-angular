import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule, MatInputModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { WeatherFormComponent } from './weather-form/weather-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabComponent } from './tab/tab.component';
import { CurrentComponent } from './current/current.component';
import { ChartsComponent } from './charts/charts.component';
import { WeeklyComponent, NgbdModalContent } from './weekly/weekly.component';
import { FavoriteComponent } from './favorite/favorite.component';


@NgModule({
  declarations: [
    AppComponent,
    WeatherFormComponent,
    TabComponent,
    CurrentComponent,
    ChartsComponent,
    WeeklyComponent,
    NgbdModalContent,
    FavoriteComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    ChartsModule,
    RouterModule,
    NgbModule,
    MatIconModule,
  ],
  exports: [MatAutocompleteModule, MatInputModule, WeeklyComponent, MatIconModule, MatButtonModule],
  providers: [],
  bootstrap: [AppComponent, WeeklyComponent],
  entryComponents: [NgbdModalContent],
})
export class AppModule { }
