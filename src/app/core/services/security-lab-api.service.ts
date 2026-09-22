import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface SecurityLoginRequest {
  username: string;
  password: string;
}

export interface SecurityLoginResponse {
  authenticated: boolean;
  username: string | null;
  roles: string[];
  message: string;
}

export interface SecuritySessionResponse {
  authenticated: boolean;
  username: string | null;
  roles: string[];
}

@Injectable({
  providedIn: 'root'
})
export class SecurityLabApiService {

  private readonly http = inject(HttpClient);

  private readonly baseUrl =
    '/api/lab/security';


  login(
    request: SecurityLoginRequest
  ): Observable<SecurityLoginResponse> {

    return this.http.post<SecurityLoginResponse>(
      `${this.baseUrl}/login`,
      request,
      {
        withCredentials: true
      }
    );
  }


  logout():
    Observable<SecurityLoginResponse> {

    return this.http.post<SecurityLoginResponse>(
      `${this.baseUrl}/logout`,
      {},
      {
        withCredentials: true
      }
    );
  }


  session():
    Observable<SecuritySessionResponse> {

    return this.http.get<SecuritySessionResponse>(
      `${this.baseUrl}/session`,
      {
        withCredentials: true
      }
    );
  }


  publicResource():
    Observable<HttpResponse<string>> {

    return this.http.get(
      `${this.baseUrl}/public`,
      {
        observe: 'response',
        responseType: 'text',
        withCredentials: true
      }
    );
  }


  userResource():
    Observable<HttpResponse<string>> {

    return this.http.get(
      `${this.baseUrl}/user`,
      {
        observe: 'response',
        responseType: 'text',
        withCredentials: true
      }
    );
  }


  adminResource():
    Observable<HttpResponse<string>> {

    return this.http.get(
      `${this.baseUrl}/admin`,
      {
        observe: 'response',
        responseType: 'text',
        withCredentials: true
      }
    );
  }
}