import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Person } from '../models/person.model';
import { Planet } from '../models/planet.model';

@Injectable({
  providedIn: 'root',
})
export class SwapiService {
  constructor(private http: HttpClient) {}

  getAllPeople(): Observable<Person[]> {
    return this.http.get<any>('/api/swapi/people');
  }

  getAllPlanets(): Observable<Planet[]> {
    return this.http.get<any>('/api/swapi/planets');
  }
}
