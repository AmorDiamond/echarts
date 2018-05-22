import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DateAndWeatherComponent } from './date-and-weather/date-and-weather.component';
import { NumberListComponent } from './number-list/number-list.component';
import { NumberItemComponent } from './number-item/number-item.component';
import { ChartsLeftComponent } from './middle/charts-left/charts-left.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { NumberRightComponent } from './middle/number-right/number-right.component';
import { ChartsRightComponent } from './middle/charts-right/charts-right.component';
import { FooterTableChartsComponent } from './footer-table-charts/footer-table-charts.component';
import { MapComponent } from './map/map.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DateAndWeatherComponent,
    NumberListComponent,
    NumberItemComponent,
    ChartsLeftComponent,
    NumberRightComponent,
    ChartsRightComponent,
    FooterTableChartsComponent,
    MapComponent
  ],
  imports: [BrowserModule, NgxEchartsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
