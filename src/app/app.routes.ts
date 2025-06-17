import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { PeopleTableComponent } from './components/people-table.component/people-table.component';
import { PlanetsTableComponent } from './components/planets-table.component/planets-table.component';

export const routes: Routes = [
  { path: '', redirectTo: '/people', pathMatch: 'full' },
  { path: 'people', component: PeopleTableComponent },
  { path: 'planets', component: PlanetsTableComponent },
];
