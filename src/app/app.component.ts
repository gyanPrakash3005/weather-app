import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { Subject, Observable, takeUntil, map } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressBarModule,
    HttpClientModule, 
    MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  // cities = ["London", "New York", "Moscow", "Karachi"];

  countries = [
    {
      name: 'Canada',
      cities: ['Toronto', 'Vancouver', 'Montreal'],
    },
    {
      name: 'Germany',
      cities: ['Berlin', 'Munich', 'Frankfurt'],
    },
    {
      name: 'India',
      cities: ['Delhi', 'Mumbai', 'Bangalore'],
    },
    {
      name: 'Japan',
      cities: ['Tokyo', 'Osaka', 'Kyoto'],
    },
    {
      name: 'Brazil',
      cities: ['São Paulo', 'Rio de Janeiro', 'Brasília'],
    },
    {
      name: 'South Africa',
      cities: ['Johannesburg', 'Cape Town', 'Durban'],
    },
  ];


  countryControl!: FormControl;
  cityControl!: FormControl;

  cities$!: Observable<string>;

  constructor(private router: Router) {}

  ngOnInit() {
    this.cityControl = new FormControl('');
    this.cityControl.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value) => {
        this.router.navigate([value]);
      });

    this.countryControl = new FormControl('');

    this.cities$ = this.countryControl.valueChanges.pipe(
      map((country) => country.cities)
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
