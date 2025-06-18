import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Person } from '../models/person.model';
import { Planet } from '../models/planet.model';
import { API_ENDPOINTS } from '../constants/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class SwapiService {
  constructor(private http: HttpClient) {}

  getAllPeople(): Observable<Person[]> {
    return this.http.get<any>(API_ENDPOINTS.PEOPLE);
  }

  getAllPlanets(): Observable<Planet[]> {
    return this.http.get<any>(API_ENDPOINTS.PLANETS);
  }
}
