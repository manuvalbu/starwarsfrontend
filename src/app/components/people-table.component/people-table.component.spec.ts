import { TestBed, ComponentFixture } from '@angular/core/testing';
import { PeopleTableComponent } from './people-table.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SwapiService } from '../../services/swapi.service';
import { of } from 'rxjs';
import { Person } from '../../models/person.model';

describe('PeopleTableComponent', () => {
  let component: PeopleTableComponent;
  let fixture: ComponentFixture<PeopleTableComponent>;
  let swapiService: jasmine.SpyObj<SwapiService>;

  const mockPeople: Person[] = [
    {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hairColor: 'blond',
      skinColor: 'fair',
      eyeColor: 'blue',
      birthYear: '19BBY',
      gender: 'male',
      created: '1977-05-25T00:00:00Z'
    }
  ];


  beforeEach(async () => {
    const spy = jasmine.createSpyObj('SwapiService', ['getAllPeople']);

    await TestBed.configureTestingModule({
      imports: [PeopleTableComponent, HttpClientTestingModule],
      providers: [{ provide: SwapiService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(PeopleTableComponent);
    component = fixture.componentInstance;
    swapiService = TestBed.inject(SwapiService) as jasmine.SpyObj<SwapiService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load people on init', () => {
    swapiService.getAllPeople.and.returnValue(of(mockPeople));

    fixture.detectChanges();

    expect(swapiService.getAllPeople).toHaveBeenCalled();
    expect(component.peopleDataSource.data).toEqual(mockPeople);
    expect(component.isLoading).toBeFalse();
  });
});
