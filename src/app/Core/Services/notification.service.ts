import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = environment.url;

  constructor(private http: HttpClient) { }

  sendPushNotification(token: string, title: string, body: string) {
    return this.http.post(this.apiUrl + 'notifications/send', {
      token: token,
      title: title,
      body: body
    });
  }

  saveFcmToken(userId: number, token: string) {
    return this.http.post(`${this.apiUrl}notifications/save-token`, {
      userId,
      token
    });
  }

  getFcmToken(userId: number) {
    return this.http.get<{ token: string }>(`${this.apiUrl}notifications/${userId}/fcm-token`)
      .pipe(map(res => res.token));
  }


}
