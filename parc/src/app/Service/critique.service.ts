import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CritiqueInterface } from '../Interface/critique.interface';
import { MessageInterface } from '../Interface/message.interface';
import { DataService } from './data.service';  

@Injectable({
  providedIn: 'root'
})
export class CritiqueService {

  constructor(private dataService: DataService) { }

  public getCritiques(attractionId: number): Observable<CritiqueInterface[]> {
    const url = `http://127.0.0.1:5000/critiques/${attractionId}`;
    const data = this.dataService.getData(url);
    return data as Observable<CritiqueInterface[]>;
  }

  public addCritique(critique: CritiqueInterface): Observable<MessageInterface> {
    const url = "http://127.0.0.1:5000/critiques";
    const data = this.dataService.postData(url, critique);
    return data as Observable<MessageInterface>;
  }

  
}
