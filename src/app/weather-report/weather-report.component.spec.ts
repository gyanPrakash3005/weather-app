import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherReportComponent } from './weather-report.component';
import { WeatherService } from '../weather.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('WeatherReportComponent', () => {
  let component: WeatherReportComponent;
  let fixture: ComponentFixture<WeatherReportComponent>;

  beforeEach(async () => {
    const weatherServiceMock = {
      getWeatherForCity: jasmine.createSpy('getWeatherForCity').and.returnValue(of({
        name: 'London',
        main: { temp: 10, feels_like: 8, humidity: 70, pressure: 1012 },
        wind: { speed: 5, deg: 200 },
        weather: [{ main: 'Clouds', description: 'scattered clouds', icon: '03d' }],
        image: 'img.png'
      }))
    };

    const activatedRouteMock = {
      params: of({ locationName: 'London' })
    };

    await TestBed.configureTestingModule({
      imports: [WeatherReportComponent, BrowserAnimationsModule],
      providers: [
        { provide: WeatherService, useValue: weatherServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(WeatherReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
