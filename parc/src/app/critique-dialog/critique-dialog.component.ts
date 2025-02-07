import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { CritiqueService } from '../Service/critique.service';
import { CritiqueInterface } from '../Interface/critique.interface';

@Component({
  selector: 'app-critique-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  templateUrl: './critique-dialog.component.html',
})
export class CritiqueDialogComponent {
  newCritique: CritiqueInterface = {
    attraction_id: 0,
    nom: '',
    prenom: '',
    note: 3,
    texte: ''
  };

  constructor(
    public dialogRef: MatDialogRef<CritiqueDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private critiqueService: CritiqueService
  ) {
    this.newCritique.attraction_id = data.attractionId;
  }

  submitCritique() {
    if (!this.newCritique.texte.trim()) {
      console.error('La critique ne peut pas être vide.');
      return;
    }
    this.critiqueService.addCritique(this.newCritique).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Erreur lors de l\'envoi de la critique', err);
      }
    });
  }
    
}