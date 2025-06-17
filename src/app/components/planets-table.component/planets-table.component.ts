import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwapiService } from '../../services/swapi.service';
import { Planet } from '../../models/planet.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  standalone: true,
  selector: 'app-planets-table',
  imports: [
      CommonModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      MatProgressSpinnerModule,
      MatFormFieldModule,
      MatInputModule
    ],
  templateUrl: './planets-table.component.html',
  styleUrls: ['./planets-table.component.css'],
})
export class PlanetsTableComponent implements AfterViewInit {
  isLoading = false;
  planetsDataSource = new MatTableDataSource<Planet>();
  displayedColumns: string[] = [
    'name',
    'climate',
    'terrain',
    'population',
    'rotationPeriod',
    'orbitalPeriod',
    'diameter',
    'gravity',
    'surfaceWater',
    'created'
  ];

  constructor(private swapiService: SwapiService) {}

    ngAfterViewInit() {
        this.loadPlanets();
      }

    loadPlanets(): void {
      this.isLoading = true;
      this.swapiService.getAllPlanets().subscribe((res) => {
        this.planetsDataSource.data = res;
        this.isLoading = false;
      });
    }

    applyFilter(event: Event): void {
      const filterValue = (event.target as HTMLInputElement).value;
      this.planetsDataSource.filter = filterValue.trim().toLowerCase();
    }

    sortData(sort: Sort) {
        const data = this.planetsDataSource.data.slice();
        if (!sort.active || sort.direction === '') {
          return;
        }
        this.planetsDataSource.data = data.sort((a, b) => {
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
