import { TestBed } from '@angular/core/testing';
import { SwapiService } from './swapi.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Person } from '../models/person.model';
import { Planet } from '../models/planet.model';

describe('SwapiService', () => {
  let service: SwapiService;
  let httpMock: HttpTestingController;

  const mockPeople: Person[] = [
    { name: 'Luke Skywalker', height: '172', mass: '77', hairColor: 'blond', skinColor: 'fair', eyeColor: 'blue', birthYear: '19BBY', gender: 'male', created: '1977-05-25T00:00:00Z' }
  ];

  const mockPlanets: Planet[] = [
    { name: 'Tatooine', climate: 'arid', diameter: '10465', gravity: '1 standard', orbitalPeriod: '304', population: '200000', rotationPeriod: '23', surfaceWater: '1', terrain: 'desert', created: '1977-05-25T00:00:00Z' }
  ];

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

  it('should fetch all people', () => {
    service.getAllPeople().subscribe((people) => {
      expect(people).toEqual(mockPeople);
    });

    const req = httpMock.expectOne('/api/swapi/people');
    expect(req.request.method).toBe('GET');
    req.flush(mockPeople);
  });

  it('should fetch all planets', () => {
    service.getAllPlanets().subscribe((planets) => {
      expect(planets).toEqual(mockPlanets);
    });

    const req = httpMock.expectOne('/api/swapi/planets');
    expect(req.request.method).toBe('GET');
    req.flush(mockPlanets);
  });
});
