import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwapiService } from '../../services/swapi.service';
import { Person } from '../../models/person.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  standalone: true,
  selector: 'app-people-table',
  imports: [
      CommonModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      MatProgressSpinnerModule,
      MatFormFieldModule,
      MatInputModule
    ],
  templateUrl: './people-table.component.html',
  styleUrls: ['./people-table.component.css'],
})
export class PeopleTableComponent implements AfterViewInit {
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

  constructor(private swapiService: SwapiService) {}

  ngAfterViewInit() {
      this.loadPeople();
    }

  loadPeople(): void {
    this.isLoading = true;
    this.swapiService.getAllPeople().subscribe((res) => {
      this.peopleDataSource.data = res;
      this.isLoading = false;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.peopleDataSource.filter = filterValue.trim().toLowerCase();
  }

  sortData(sort: Sort) {
      const data = this.peopleDataSource.data.slice();
      if (!sort.active || sort.direction === '') {
        return;
      }
      this.peopleDataSource.data = data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'name':
            return compare(a.name ?? '', b.name ?? '', isAsc);
          case 'created':
            return compare(a.created ?? '', b.created ?? '', isAsc);
          default:
            return 0;
        }
      });
    }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
