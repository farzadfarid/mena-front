import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecialistService {

  constructor(private http: HttpClient) { }

  getSpecialists(date: string): Observable<any[]> {
    return this.http.get<any[]>(`/api/specialists?date=${date}`);
  }


  getSpecialistById(id: number): Observable<any> {
    return this.http.get<any>(`/api/specialistDetail/${id}`).pipe(
      map(specialist => {
        if (specialist) {
          return specialist;
        } else {
          console.log('Specialist not found');
          return null;
        }
      })
    );
  }

}
