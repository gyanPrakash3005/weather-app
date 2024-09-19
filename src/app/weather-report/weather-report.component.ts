import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../weather.service';
import { CommonModule } from '@angular/common';
import { Observable, map, filter, tap, concatMap } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-weather-report',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressBarModule,
    MatButtonModule
  ],
  templateUrl: './weather-report.component.html',
  styleUrl: './weather-report.component.css',
  providers: [
    WeatherService // Add the service here
  ]
})
export class WeatherReportComponent implements OnInit{
  data$!: Observable<any>;

  today: Date = new Date();

  loading = false;

  constructor(
    private weatherService: WeatherService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.data$ = this.route.params.pipe(
      map(params => params['locationName']),
      filter(name => !!name),
      tap(() => {
        this.loading = true;
      }),
      concatMap(name => this.weatherService.getWeatherForCity(name)),
      tap(() => {
        this.loading = false;
      })
    );
  }

}
