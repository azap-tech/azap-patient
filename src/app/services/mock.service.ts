import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITicket } from '../pages/ticket/i-ticket';

@Injectable({
  providedIn: 'root',
})
export class MockService {
  getDepartments(): Observable<Department[]> {
    return of([
      { id: '75', name: 'Paris' },
      { id: '76', name: 'Seine-Maritime' },
      { id: '77', name: 'Seine-et-Marne' },
      { id: '2B', name: 'Haute-Corse' },
    ]);
  }

  getCenters(): Observable<Center[]> {
    const centers: Center[] = [];
    for (let i = 0; i < 20; i++) {
      centers.push({
        name: `Center ${i + 1}`,
        address: `Address ${i + 1}`,
        minsToWait: i * 5,
      });
    }

    return of(centers);
  }

  getReasons(): Observable<string[]> {
    return of(['Fracture', 'Cardio', 'Gastro', 'Covid19']);
  }

  getMinsWaitingTime(): Observable<number> {
    return of(88);
  }

  chooseCenter(): Observable<string> {
    return of('#20');
  }

  chooseDepartment(): Observable<Center[]> {
    return this.getCenters();
  }

  getTicketNumber(ticket: ITicket): Observable<number> {
    return of(Math.floor(Math.random() * 100));
  }
}
