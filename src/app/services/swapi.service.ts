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
    return this.http.get<any>('https://swapi.dev/api/people').pipe(
      map(res => (res.results || []).map((item: any) => this.normalizePerson(item)))
    );
  }

  getAllPlanets(): Observable<Planet[]> {
    return this.http.get<any>('https://swapi.dev/api/planets').pipe(
      map(res => (res.results || []).map((item: any) => this.normalizePlanet(item)))
    );
  }

  private normalizePerson(item: any): Person {
    return {
      name: item.name || '',
      gender: item.gender || '',
      birthYear: item.birth_year || '',
      height: item.height || '',
      mass: item.mass || '',
      hairColor: item.hair_color || '',
      skinColor: item.skin_color || '',
      eyeColor: item.eye_color || '',
      created: item.created || '',
    };
  }

  private normalizePlanet(item: any): Planet {
    return {
      name: item.name || '',
      climate: item.climate || '',
      terrain: item.terrain || '',
      population: item.population || '',
      rotationPeriod: item.rotation_period || '',
      orbitalPeriod: item.orbital_period || '',
      diameter: item.diameter || '',
      gravity: item.gravity || '',
      surfaceWater: item.surface_water || '',
      created: item.created || '',
    };
  }
}
