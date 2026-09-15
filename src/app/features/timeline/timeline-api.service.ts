import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TimelineEvent {
  id: number;
  year: number;
  category: string;
  title: string;
  description: string;
  technology: string;
}

export interface ApiErrorResponse {
  status: number;
  error: string;
  message: string;
  path: string;
}

@Injectable({
  providedIn: 'root',
})
export class TimelineApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/timeline';

  getTimeline(): Observable<TimelineEvent[]> {
    return this.http.get<TimelineEvent[]>(this.apiUrl);
  }

  getTimelineEvent(id: number): Observable<TimelineEvent> {
    return this.http.get<TimelineEvent>(`${this.apiUrl}/${id}`);
  }

  getTimelineResponse(): Observable<HttpResponse<TimelineEvent[]>> {
    return this.http.get<TimelineEvent[]>(this.apiUrl, {
      observe: 'response',
    });
  }

  getTimelineEventResponse(id: number): Observable<HttpResponse<TimelineEvent>> {
    return this.http.get<TimelineEvent>(`${this.apiUrl}/${id}`, {
      observe: 'response',
    });
  }
}
