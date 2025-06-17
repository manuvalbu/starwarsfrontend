import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwapiService } from '../../services/swapi.service';
import { Planet } from '../../models/planet.model';

@Component({
  standalone: true,
  selector: 'app-planets-table',
  imports: [CommonModule],
  templateUrl: './planets-table.component.html',
  styleUrls: ['./planets-table.component.css'],
})
export class PlanetsTableComponent implements OnInit {
  planets: Planet[] = [];
  isLoading = false;

  constructor(private swapiService: SwapiService) {}

  ngOnInit(): void {
    this.loadPlanets();
  }

  loadPlanets(): void {
    this.isLoading = true;
    this.swapiService
      .getAllPlanets()
      .subscribe((res) => {
        this.planets = res;
        this.isLoading = false;
      });
  }
}
