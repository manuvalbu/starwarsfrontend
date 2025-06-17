import { TestBed, ComponentFixture } from '@angular/core/testing';
import { PlanetsTableComponent } from './planets-table.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SwapiService } from '../../services/swapi.service';
import { of } from 'rxjs';
import { Planet } from '../../models/planet.model';

describe('PlanetsTableComponent', () => {
  let component: PlanetsTableComponent;
  let fixture: ComponentFixture<PlanetsTableComponent>;
  let swapiService: jasmine.SpyObj<SwapiService>;

  const mockPlanets: Planet[] = [
    {
      name: 'Tatooine',
      climate: 'arid',
      terrain: 'desert',
      population: '200000',
      rotationPeriod: '23',
      orbitalPeriod: '304',
      diameter: '10465',
      gravity: '1 standard',
      surfaceWater: '1',
      created: '1977-05-25T00:00:00Z'
    }
  ];


  beforeEach(async () => {
    const spy = jasmine.createSpyObj('SwapiService', ['getAllPlanets']);

    await TestBed.configureTestingModule({
      imports: [PlanetsTableComponent, HttpClientTestingModule],
      providers: [{ provide: SwapiService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(PlanetsTableComponent);
    component = fixture.componentInstance;
    swapiService = TestBed.inject(SwapiService) as jasmine.SpyObj<SwapiService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load planets on init', () => {
    swapiService.getAllPlanets.and.returnValue(of(mockPlanets));

    fixture.detectChanges();

    expect(swapiService.getAllPlanets).toHaveBeenCalled();
    expect(component.planetsDataSource.data).toEqual(mockPlanets);
    expect(component.isLoading).toBeFalse();
  });
});
