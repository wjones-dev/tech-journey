import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TimelineEvent {
  id: number;
  year: number;
  category: string;
  title: string;
  description: string;
  technology: string;
}

@Injectable({
  providedIn: 'root'
})
export class TimelineApiService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:8080/api/timeline';

  getTimeline(): Observable<TimelineEvent[]> {
    return this.http.get<TimelineEvent[]>(this.apiUrl);
  }
}