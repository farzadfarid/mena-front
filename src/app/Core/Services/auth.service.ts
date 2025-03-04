import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiResponse } from '../Response/ApiResponse';
import { environment } from 'src/environments/environment';
import { UserRegisterDto } from '../Models/User/UserRegisterDto.model';
import { UserLoginDto } from '../Models/User/UserLoginDto.model';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.url + 'User';

  constructor(private http: HttpClient) { }

  register(user: UserRegisterDto): Observable<ApiResponse<UserRegisterDto>> {
    return this.http.post<ApiResponse<UserRegisterDto>>(`${this.baseUrl}/register`, user);
  }

  login(user: UserLoginDto): Observable<ApiResponse<UserLoginDto>> {
    const headers = new HttpHeaders({
      'Accept': '*/*',
      'Authorization':
        'Access-Control-Allow-Origin',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers': 'origin,X-Requested-With,content-type,accept',
      'Access-Control-Allow-Credentials': 'true'
    })
    return this.http.post<ApiResponse<UserLoginDto>>(this.baseUrl + "/login", user, { headers }).pipe(

      tap(response => {
        this.setToken(response.token!);
        if (response.data) {
          this.setUser(response.data);
          this.setRole(response.roleName!);
          this.setUserId(response.data.id)
        }

      }));
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

  getToken(): any {
    return localStorage.getItem('token');
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
  }

  isAuthenticatedUser(): boolean {
    return !!this.getToken();
  }

}
