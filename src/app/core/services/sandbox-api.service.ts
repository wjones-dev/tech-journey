import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SandboxEventRequest {
  year: number;
  category: string;
  title: string;
  description: string;
  technology: string;
}

export interface SandboxEvent extends SandboxEventRequest {
  id: number;
  createdAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class SandboxApiService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = '/api/sandbox/events';

  createEvent(event: SandboxEventRequest): Observable<HttpResponse<SandboxEvent>> {
    return this.http.post<SandboxEvent>(this.apiUrl, event, {
      observe: 'response',
    });
  }

  getEvents(): Observable<HttpResponse<SandboxEvent[]>> {
    return this.http.get<SandboxEvent[]>(this.apiUrl, {
      observe: 'response',
    });
  }

  getEvent(id: number): Observable<HttpResponse<SandboxEvent>> {
    return this.http.get<SandboxEvent>(`${this.apiUrl}/${id}`, {
      observe: 'response',
    });
  }

  updateEvent(id: number, event: SandboxEventRequest): Observable<HttpResponse<SandboxEvent>> {
    return this.http.put<SandboxEvent>(`${this.apiUrl}/${id}`, event, {
      observe: 'response',
    });
  }

  deleteEvent(
  id: number
): Observable<HttpResponse<void>> {

  return this.http.delete<void>(
    `${this.apiUrl}/${id}`,
    {
      observe: 'response',
    }
  );
}
}
