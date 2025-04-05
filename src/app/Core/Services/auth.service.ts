import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiResponse } from '../Response/ApiResponse';
import { environment } from 'src/environments/environment.development';
import { UserLoginDto } from '../Models/User/UserLoginDto.model';
import { userRealRegisterModel } from '../Models/User/realUser.model';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../Interfaces/DecodedToken';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.url;
  constructor(private http: HttpClient) { }
  extractAndStoreUserInfoFromToken(token: string): void {
    try {
      const decoded = jwtDecode<DecodedToken>(token);

      const userInfo = {
        name: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
        email: decoded["Email"],
        phoneNumber: decoded["PhoneNumber"],
        userId: decoded["UserId"],
        role: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
      };

      // ذخیره در localStorage
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } catch (error) {
      console.error("Invalid token", error);
    }
  }

  userRealRegister(user: userRealRegisterModel): Observable<ApiResponse<userRealRegisterModel>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': '*/*'
    });

    return this.http.post<ApiResponse<userRealRegisterModel>>(`${this.baseUrl}Customer/real`, user, { headers });
  }

  login(user: UserLoginDto): Observable<ApiResponse<string>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': '*/*'
    })
    return this.http.post<ApiResponse<string>>(this.baseUrl + "Identity/login", user, { headers }).pipe(

      tap(response => {
        const token = response.data; // ✅ اینجا توکن رو از data بگیر
        if (token) {
          this.setToken(token);
          this.extractAndStoreUserInfoFromToken(token);
          this.setUser(token); // اگه نیاز باشه
        }
      }))
  }


  public isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isAuthenticatedUser());
  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }


  private role: string = '';

  private roleSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  setRole(role: string): void {
    this.role = role;
    localStorage.setItem('role', JSON.stringify(role));
    this.roleSubject.next(this.role);
  }

  getRole(): any {
    return localStorage.getItem('role');
  }
  hasRole(role: string): boolean {
    return this.role.includes(role);
  }


  public canAccessAdmin(): boolean {
    const role = this.getRole();
    return role == '"Admin"' || role == '"admin"';
  }

  public canAccessSuperAdmin(): boolean {
    const role = this.getRole();
    return role == '"admin"';
  }

  getToken(): string | null {
    const token = localStorage.getItem('token');
    return token ? token : null;
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user;
  }

  setUser(user: any): void {
    localStorage.setItem('user', user.userName);
  }

  getUserId(): any {
    const user = localStorage.getItem('id');
    return user;
  }

  setUserId(user: any): void {
    localStorage.setItem('id', user);
  }

  clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
    localStorage.removeItem('userInfo')
  }

  isAuthenticatedUser(): boolean {
    return !!this.getToken();
  }

}
