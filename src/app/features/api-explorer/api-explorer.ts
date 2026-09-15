import { Component, computed, inject, signal } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import {
  ApiErrorResponse,
  TimelineApiService,
  TimelineEvent,
} from '../timeline/timeline-api.service';

type RequestMode = 'all' | 'byId';

@Component({
  selector: 'app-api-explorer',
  standalone: true,
  imports: [],
  templateUrl: './api-explorer.html',
  styleUrl: './api-explorer.css',
})
export class ApiExplorerComponent {
  private readonly route = inject(ActivatedRoute);

  private readonly router = inject(Router);

  private readonly timelineApiService = inject(TimelineApiService);

  eventId = signal<number | null>(null);

  resource = signal<TimelineEvent | null>(null);

  responseBody = signal<TimelineEvent | TimelineEvent[] | ApiErrorResponse | null>(null);

  responseStatus = signal<number | null>(null);

  responseStatusText = signal<string>('');

  responseTime = signal<number | null>(null);

  responseSize = signal<number | null>(null);

  loading = signal(false);

  requestMode = signal<RequestMode>('byId');

  errorMessage = signal<string | null>(null);

  requestId = signal<number | null>(null);

  method = signal('GET');

  endpoint = computed(() => {
    if (this.requestMode() === 'all') {
      return '/api/timeline';
    }

    const id = this.requestId();

    return id ? `/api/timeline/${id}` : '/api/timeline';
  });

  formattedResponse = computed(() => {
    const response = this.responseBody();

    if (!response) {
      return '';
    }

    return JSON.stringify(response, null, 2);
  });

  constructor() {
    const eventId = Number(this.route.snapshot.queryParamMap.get('eventId'));

    if (!eventId) {
      return;
    }

    this.eventId.set(eventId);

    this.loadResource(eventId);

    this.eventId.set(eventId);
    this.requestId.set(eventId);
  }

  private loadResource(id: number): void {
    this.timelineApiService.getTimelineEvent(id).subscribe({
      next: (event) => {
        this.resource.set(event);
      },

      error: (error) => {
        console.error('Unable to load API Explorer resource:', error);
      },
    });
  }

  sendRequest(): void {
    this.loading.set(true);

    this.clearResponse();

    const startedAt = performance.now();

    if (this.requestMode() === 'all') {
      this.timelineApiService.getTimelineResponse().subscribe({
        next: (response) => {
          this.handleSuccessResponse(
            response.body,
            response.status,
            response.statusText,
            startedAt,
          );
        },

        error: (error) => {
          this.handleErrorResponse(error, startedAt);
        },
      });

      return;
    }

    const id = this.requestId();

    if (!id) {
      this.loading.set(false);

      return;
    }

    this.timelineApiService.getTimelineEventResponse(id).subscribe({
      next: (response) => {
        this.handleSuccessResponse(response.body, response.status, response.statusText, startedAt);
      },

      error: (error) => {
        this.handleErrorResponse(error, startedAt);
      },
    });
  }

  tryMissingId(): void {
    this.requestMode.set('byId');

    this.requestId.set(999999);

    this.clearResponse();
  }

  backToTechnology(): void {
    const id = this.eventId();

    if (!id) {
      this.router.navigate(['/']);

      return;
    }

    this.router.navigate(['/technology', id]);
  }

  updateRequestId(event: Event): void {
    const input = event.target as HTMLInputElement;

    const id = Number(input.value);

    if (!id) {
      return;
    }

    this.requestId.set(id);

    this.clearResponse();
  }

  restoreSelectedResource(): void {
    const id = this.eventId();

    if (!id) {
      return;
    }

    this.requestId.set(id);

    this.clearResponse();
  }

  showAllEvents(): void {
    this.requestMode.set('all');

    this.clearResponse();
  }

  showById(): void {
    this.requestMode.set('byId');

    this.restoreSelectedResource();
  }

  private handleSuccessResponse(
    body: TimelineEvent | TimelineEvent[] | null,
    status: number,
    statusText: string,
    startedAt: number,
  ): void {
    const finishedAt = performance.now();

    this.responseTime.set(Math.round(finishedAt - startedAt));

    this.responseStatus.set(status);

    this.responseStatusText.set(statusText || 'OK');

    if (body) {
      this.responseBody.set(body);

      const json = JSON.stringify(body);

      this.responseSize.set(new Blob([json]).size);
    }

    this.loading.set(false);
  }

  private handleErrorResponse(error: any, startedAt: number): void {
    const finishedAt = performance.now();

    this.responseTime.set(Math.round(finishedAt - startedAt));

    this.responseStatus.set(error.status);

    this.responseStatusText.set(error.statusText || 'ERROR');

    if (error.error) {
      this.responseBody.set(error.error);

      const json = JSON.stringify(error.error);

      this.responseSize.set(new Blob([json]).size);
    }
    this.loading.set(false);
  }

  private clearResponse(): void {
    this.responseBody.set(null);
    this.responseStatus.set(null);
    this.responseStatusText.set('');
    this.responseTime.set(null);
    this.responseSize.set(null);
    this.errorMessage.set(null);
  }
}
