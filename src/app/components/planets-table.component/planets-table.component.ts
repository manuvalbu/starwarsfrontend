import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwapiService } from '../../services/swapi.service';
import { Planet } from '../../models/planet.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  standalone: true,
  selector: 'app-planets-table',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './planets-table.component.html',
  styleUrls: ['./planets-table.component.css'],
})
export class PlanetsTableComponent implements OnInit {
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private swapiService: SwapiService) {}

  ngOnInit(): void {
    this.loadPlanets();
  }

  loadPlanets(): void {
    this.isLoading = true;
    this.swapiService.getAllPlanets().subscribe((res) => {
      this.planetsDataSource.data = res;
      this.planetsDataSource.paginator = this.paginator;
      this.planetsDataSource.sort = this.sort;
      this.isLoading = false;
    });
  }
}
