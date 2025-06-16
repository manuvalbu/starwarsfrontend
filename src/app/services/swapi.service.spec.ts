import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SwapiService } from './swapi.service';
import { Person } from '../models/person.model';
import { Planet } from '../models/planet.model';

describe('SwapiService', () => {
  let service: SwapiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SwapiService],
    });

    service = TestBed.inject(SwapiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch and normalize people', () => {
    const mockApiResponse = {
      results: [
        {
          name: 'Luke Skywalker',
          gender: 'male',
          birth_year: '19BBY',
          height: '172',
          mass: '77',
          hair_color: 'blond',
          skin_color: 'fair',
          eye_color: 'blue',
          created: '2024-01-01T00:00:00Z',
        },
      ],
    };

    service.getAllPeople().subscribe((people: Person[]) => {
      expect(people.length).toBe(1);
      expect(people[0].name).toBe('Luke Skywalker');
      expect(people[0].birthYear).toBe('19BBY');
    });

    const req = httpMock.expectOne('https://swapi.dev/api/people');
    expect(req.request.method).toBe('GET');
    req.flush(mockApiResponse);
  });

  it('should fetch and normalize planets', () => {
    const mockApiResponse = {
      results: [
        {
          name: 'Tatooine',
          climate: 'arid',
          terrain: 'desert',
          population: '200000',
          rotation_period: '23',
          orbital_period: '304',
          diameter: '10465',
          gravity: '1 standard',
          surface_water: '1',
          created: '2024-01-01T00:00:00Z',
        },
      ],
    };

    service.getAllPlanets().subscribe((planets: Planet[]) => {
      expect(planets.length).toBe(1);
      expect(planets[0].name).toBe('Tatooine');
      expect(planets[0].climate).toBe('arid');
    });

    const req = httpMock.expectOne('https://swapi.dev/api/planets');
    expect(req.request.method).toBe('GET');
    req.flush(mockApiResponse);
  });
});
