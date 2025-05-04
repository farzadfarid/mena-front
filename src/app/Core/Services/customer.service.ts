import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { ServiceAppointmentStateCode } from '../enums/ServiceAppointmentStateCode.enum';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Response/ApiResponse';
import { ServiceAppointmentModel } from '../Models/Specialists/ServiceAppointment.model';
import { ServiceAppointmentStateCountViewModel } from '../Models/Specialists/ServiceAppointmentStateCountViewModel.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl = environment.url;
  private localStorageKey = 'services';
  state!: ServiceAppointmentStateCode;
  count!: number;
  constructor(private http: HttpClient) { }







  getServiceAppointmentStateTranslationKey(state: ServiceAppointmentStateCode): string {
    switch (state) {
      case ServiceAppointmentStateCode.New:
        return 'New';
      case ServiceAppointmentStateCode.Confirmed:
        return 'Confirmed';
      case ServiceAppointmentStateCode.Rejected:
        return 'Rejected';
      case ServiceAppointmentStateCode.CanceledByCustomer:
        return 'Canceled by customer';
      case ServiceAppointmentStateCode.CanceledBySpecialist:
        return 'Canceled by specialist';
      case ServiceAppointmentStateCode.Done:
        return 'Done';
      default:
        return 'unknown';
    }
  }

  getAppointmentsByState(states: number[]): Observable<ApiResponse<ServiceAppointmentModel[]>> {
    let params = new HttpParams();
    states.forEach(state => {
      params = params.append('serviceAppointmentStates', state.toString());
    });

    return this.http.get<ApiResponse<ServiceAppointmentModel[]>>(`${this.baseUrl}ServiceAppointment/customer-services`, { params });
  }

  confirmAppointment(appointmentId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}ServiceAppointment/confirm`, {
      appointmentId
    });
  }

  rejectAppointment(appointmentId: number, rejectReason: string): Observable<any> {
    return this.http.post(`${this.baseUrl}ServiceAppointment/reject`, {
      appointmentId,
      rejectReason
    });
  }


  getServiceAppointmentCounts(states: ServiceAppointmentStateCode[]) {
    let params = new HttpParams();
    for (let state of states) {
      params = params.append('serviceAppointmentStates', state.toString());
    }

    return this.http.get<{ isSuccess: boolean, data: ServiceAppointmentStateCountViewModel[] }>(
      `${this.baseUrl}ServiceAppointment/customer-services-count`,
      { params }
    );
  }


  cancelAppointment(appointmentId: number, CancellationReason: string): Observable<any> {
    return this.http.post(`${this.baseUrl}ServiceAppointment/cancel-by-customer`, {
      appointmentId,
      CancellationReason
    });
  }


}
