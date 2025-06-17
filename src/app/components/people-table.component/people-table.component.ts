import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwapiService } from '../../services/swapi.service';
import { Person } from '../../models/person.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  standalone: true,
  selector: 'app-people-table',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './people-table.component.html',
  styleUrls: ['./people-table.component.css'],
})
export class PeopleTableComponent implements OnInit {
  isLoading = false;
  peopleDataSource = new MatTableDataSource<Person>();
  displayedColumns: string[] = [
    'name',
    'gender',
    'birthYear',
    'height',
    'mass',
    'hairColor',
    'skinColor',
    'eyeColor',
    'created'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private swapiService: SwapiService) {}

  ngOnInit(): void {
    this.loadPeople();
  }

  loadPeople(): void {
    this.isLoading = true;
    this.swapiService.getAllPeople().subscribe((res) => {
      this.peopleDataSource.data = res;
      this.peopleDataSource.paginator = this.paginator;
      this.peopleDataSource.sort = this.sort;
      this.isLoading = false;
    });
  }
}
