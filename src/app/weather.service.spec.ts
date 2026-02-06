import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { WeatherService, WeatherResponse } from './weather.service';
import { environment } from '../environments/environment';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WeatherService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch weather for a city', () => {
    const dummyCity = 'London';
    const dummyResponse = {
      name: 'London',
      main: { temp: 10, feels_like: 8, humidity: 70, pressure: 1012 },
      wind: { speed: 5, deg: 200 },
      weather: [{ main: 'Clouds', description: 'scattered clouds', icon: '03d' }]
    };

    service.getWeatherForCity(dummyCity).subscribe((data: WeatherResponse) => {
      expect(data.name).toBe('London');
      expect(data.main.temp).toBe(10);
      expect(data.image).toBe('https://openweathermap.org/img/wn/03d@2x.png');
    });

    const expectedUrl = `https://api.openweathermap.org/data/2.5/weather?q=${dummyCity}&units=metric&APPID=${environment.apiKey}`;
    const req = httpMock.expectOne(expectedUrl);

    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });
});
