import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface WeatherResponse {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  image?: string;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) { }

  getWeatherForCity(city: string): Observable<WeatherResponse> {
    const path = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${environment.apiKey}`;
    return this.http.get<WeatherResponse>(path).pipe(
      map(data => ({
        ...data,
        image: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      }))
    );
  }
}
