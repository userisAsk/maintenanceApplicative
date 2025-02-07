import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

// Services and Interfaces
import { AttractionService } from '../Service/attraction.service';
import { CritiqueService } from '../Service/critique.service';
import { AttractionInterface } from '../Interface/attraction.interface';
import { CritiqueInterface } from '../Interface/critique.interface';

// Dialog Component
import { CritiqueDialogComponent } from '../critique-dialog/critique-dialog.component';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule
  ],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
})
export class AccueilComponent {
  public attractions: Observable<AttractionInterface[]> = this.attractionService.getAllAttraction()
    .pipe(
      map((attractions: AttractionInterface[]) => attractions.filter(attraction => attraction.visible))
    );

  private critiquesMap = new Map<number, Observable<CritiqueInterface[]>>();
  
  constructor(
    public attractionService: AttractionService,
    public critiqueService: CritiqueService,
    public dialog: MatDialog
  ) {}

  getCritiques(attractionId: number): Observable<CritiqueInterface[]> {
    if (!this.critiquesMap.has(attractionId)) {
      this.critiquesMap.set(attractionId, this.critiqueService.getCritiques(attractionId));
    }
    return this.critiquesMap.get(attractionId)!;
  }

  openCritiqueDialog(attraction: AttractionInterface) {
    if (attraction.attraction_id === null) {
      console.error('Attraction ID is null');
      return;
    }
  
    const dialogRef = this.dialog.open(CritiqueDialogComponent, {
      width: '400px',
      data: {
        attractionName: attraction.nom,
        attractionId: attraction.attraction_id 
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Mettre à jour les critiques pour cette attraction
        this.critiquesMap.set(
          attraction.attraction_id!,
          this.critiqueService.getCritiques(attraction.attraction_id!)
        );
      }
    });
  }
}