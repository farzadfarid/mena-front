import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { ApiResponse } from '../Response/ApiResponse';
import { SkillModel, SpecialistServiceModel } from '../Models/Specialists/specialistService.model';
import { environment } from 'src/environments/environment.development';
import { SpecialistModel, SpecialistRegisterModel } from '../Models/Specialists/specialist.model';
@Injectable({
  providedIn: 'root'
})
export class SpecialistService {

  private baseUrl = environment.url;
  private localStorageKey = 'services';
  constructor(private http: HttpClient) { }

  getSpecialists(serviceIds: number[], atDates: string[]): Observable<ApiResponse<SpecialistModel[]>> {
    let params = new HttpParams();

    if (serviceIds?.length > 0) {
      serviceIds.forEach(id => {
        params = params.append('serviceIds', id.toString());
      });
    }

    if (atDates?.length > 0) {
      atDates.forEach(date => {
        params = params.append('atDates', date);
      });
    }

    return this.http.get<ApiResponse<SpecialistModel[]>>(`${this.baseUrl}Specialist/available`, { params });
  }





  getTest() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts')
  }

  getSpecialistById(specialistId: number): Observable<ApiResponse<SpecialistModel>> {
    return this.http.get<ApiResponse<SpecialistModel>>(this.baseUrl + `Specialist/${specialistId}`)
  }



  // ذخیره‌سازی تمام سرویس‌ها با اسکیل‌ها در localStorage
  getAllServicesAndSaveInTheLocalStorage(): Observable<SpecialistServiceModel[]> {
    const raw = localStorage.getItem(this.localStorageKey);

    if (raw && raw !== 'undefined') {
      try {
        const data: SpecialistServiceModel[] = JSON.parse(raw);
        console.log('📦 Loaded services (with skills) from localStorage');
        return of(data);
      } catch (error) {
        console.warn('⚠️ Failed to parse localStorage data, fetching from server...', error);
        localStorage.removeItem(this.localStorageKey);
      }
    }

    return this.http.get<ApiResponse<SpecialistServiceModel[]>>(`${this.baseUrl}Service`).pipe(
      map(response => response.data), // ✅ فقط data رو برمی‌گردونیم
      tap(data => {
        console.log('📦 Fetching services (with skills) from server...', data);
        if (Array.isArray(data)) {
          const json = JSON.stringify(data);
          localStorage.setItem(this.localStorageKey, json);
          console.log('✅ Saved services (with skills) to localStorage');
        }
      })
    );
  }

  // گرفتن فقط id و name سرویس‌ها بر اساس زبان انتخابی
  getServicesByLanguage(lang: 'en' | 'sv'): { id: number; name: string }[] {
    const raw = localStorage.getItem(this.localStorageKey);

    if (!raw || raw === 'undefined') {
      console.warn('⚠️ No valid localStorage data found');
      return [];
    }

    try {
      const services: SpecialistServiceModel[] = JSON.parse(raw);

      return services.map(service => ({
        id: service.id ?? 0,
        name: service.name?.values?.[lang] ?? '[missing]'
      }));
    } catch (err) {
      console.error('❌ Failed to parse services from localStorage:', err);
      return [];
    }
  }




  updateOffDays(specialistId: number, offDates: string[]): Observable<any> {
    return this.http.post(`${this.baseUrl}Specialist/${specialistId}/offdays`, offDates);
  }


  getOffDays(specialistId: number): Observable<ApiResponse<string[]>> {
    return this.http.get<ApiResponse<string[]>>(`${this.baseUrl}specialist/${specialistId}/offdays`);
  }

  registerSpecialist(specialist: any): Observable<ApiResponse<SpecialistRegisterModel>> {
    return this.http.post<ApiResponse<SpecialistRegisterModel>>(`${this.baseUrl}specialist/register`, specialist);
  }


  getServiceSkills(serviceId: number): Observable<ApiResponse<SkillModel[]>> {
    return this.http.get<ApiResponse<SkillModel[]>>(`${this.baseUrl}Service/${serviceId}/skills`);
  }

}
