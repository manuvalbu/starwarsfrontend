import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwapiService } from '../../services/swapi.service';
import { Person } from '../../models/person.model';

@Component({
  standalone: true,
  selector: 'app-people-table',
  imports: [CommonModule],
  templateUrl: './people-table.component.html',
  styleUrls: ['./people-table.component.css'],
})
export class PeopleTableComponent implements OnInit {
  people: Person[] = [];
  isLoading = false;

  constructor(private swapiService: SwapiService) {}

  ngOnInit(): void {
    this.loadPeople();
  }

  loadPeople(): void {
    this.isLoading = true;
    this.swapiService
      .getAllPeople()
      .subscribe((res) => {
        this.people = res;
        this.isLoading = false;
      });
  }
}
