import { Component, computed, inject, signal } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import {
  ApiErrorResponse,
  TimelineApiService,
  TimelineEvent,
} from '../../core/services/timeline-api.service';
import {
  SandboxApiService,
  SandboxEvent,
  SandboxEventRequest,
} from '../../core/services/sandbox-api.service';

type RequestMode = 'all' | 'byId';

type ApiMode = 'museum' | 'sandbox';

type SandboxMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

type ResponseTab = 'response' | 'request';

type SandboxGetMode = 'all' | 'byId';

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

  private readonly sandboxApiService = inject(SandboxApiService);

  eventId = signal<number | null>(null);

  resource = signal<TimelineEvent | null>(null);

  responseBody = signal<
    TimelineEvent | TimelineEvent[] | SandboxEvent | SandboxEvent[] | ApiErrorResponse | null
  >(null);

  responseStatus = signal<number | null>(null);

  responseStatusText = signal<string>('');

  responseTime = signal<number | null>(null);

  responseSize = signal<number | null>(null);

  loading = signal(false);

  requestMode = signal<RequestMode>('byId');

  errorMessage = signal<string | null>(null);

  requestId = signal<number | null>(null);

  apiMode = signal<ApiMode>('museum');

  method = signal('GET');

  sandboxMethod = signal<SandboxMethod>('POST');

  sandboxGetMode = signal<SandboxGetMode>('byId');

  sandboxRecordId = signal<number | null>(null);

  showDeleteConfirm = signal(false);

  sandboxYear = signal(2026);

  activeResponseTab = signal<ResponseTab>('response');

  requestPayload = signal<SandboxEventRequest | null>(null);

  lastRequestMethod = signal<string>('');

  lastRequestEndpoint = signal<string>('');

  showHelpModal = signal(false);

  openHelpModal(): void {
    this.showHelpModal.set(true);
  }

  closeHelpModal(): void {
    this.showHelpModal.set(false);
  }

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
    const queryEventId = Number(this.route.snapshot.queryParamMap.get('eventId'));

    // Default to Atari (ID 1) when entering Explorer directly
    const eventId = queryEventId > 0 ? queryEventId : 1;

    this.eventId.set(eventId);
    this.requestId.set(eventId);

    this.loadResource(eventId);
  }

  private loadResource(id: number): void {
    this.timelineApiService.getTimelineEvent(id).subscribe({
      next: (event) => {
        this.resource.set(event);

        this.initializeSandboxFromResource(event);
      },

      error: (error) => {
        console.error('Unable to load API Explorer resource:', error);
      },
    });
  }

  private initializeSandboxFromResource(event: TimelineEvent): void {
    this.sandboxYear.set(event.year);

    this.sandboxCategory.set(event.category);

    this.sandboxTitle.set(event.title);

    this.sandboxTechnology.set(event.technology);

    this.sandboxDescription.set(
      `Experimenting with ${event.title} in the Tech Journey API sandbox.`,
    );
  }

  sendRequest(): void {
    if (this.apiMode() === 'sandbox') {
      if (this.sandboxMethod() === 'GET') {
        this.sendSandboxGet();
        return;
      }

      if (this.sandboxMethod() === 'PUT') {
        this.sendSandboxPut();
        return;
      }

      if (this.sandboxMethod() === 'DELETE') {
        this.sendSandboxDelete();
        return;
      }

      this.sendSandboxPost();
      return;
    }
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

  showMuseumApi(): void {
    this.apiMode.set('museum');
    this.method.set('GET');
    this.clearResponse();
  }

  showSandboxApi(): void {
    this.apiMode.set('sandbox');
    this.method.set('POST');
    this.clearResponse();
  }

  sandboxCategory = signal('DEVELOPMENT');

  sandboxTitle = signal('Sandbox CRUD Test');

  sandboxTechnology = signal('Spring Boot');

  sandboxDescription = signal('Testing the Tech Journey API sandbox.');

  updateSandboxYear(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.sandboxYear.set(Number(input.value));
  }

  updateSandboxTitle(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.sandboxTitle.set(input.value);
  }

  updateSandboxTechnology(event: Event): void {
    const input = event.target as HTMLInputElement;

    this.sandboxTechnology.set(input.value);
  }

  updateSandboxDescription(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;

    this.sandboxDescription.set(textarea.value);
  }

  private sendSandboxGet(): void {
    this.loading.set(true);

    this.clearResponse();

    const startedAt = performance.now();

    this.requestPayload.set(null);

    this.lastRequestMethod.set('GET');

    this.activeResponseTab.set('response');

    if (this.sandboxGetMode() === 'all') {
      this.lastRequestEndpoint.set('/api/sandbox/events');

      this.sandboxApiService.getEvents().subscribe({
        next: (response) => {
          this.handleSandboxSuccessResponse(
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

    const id = this.sandboxRecordId();

    if (!id) {
      this.loading.set(false);

      this.errorMessage.set('Enter a sandbox record ID.');

      return;
    }

    this.lastRequestEndpoint.set(`/api/sandbox/events/${id}`);

    this.sandboxApiService.getEvent(id).subscribe({
      next: (response) => {
        this.handleSandboxSuccessResponse(
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
  }

  private sendSandboxPost(): void {
    this.loading.set(true);

    this.clearResponse();

    const startedAt = performance.now();

    const request: SandboxEventRequest = {
      year: this.sandboxYear(),

      category: this.sandboxCategory(),

      title: this.sandboxTitle(),

      description: this.sandboxDescription(),

      technology: this.sandboxTechnology(),
    };

    this.requestPayload.set(request);

    this.lastRequestMethod.set('POST');

    this.lastRequestEndpoint.set('/api/sandbox/events');

    this.activeResponseTab.set('response');

    this.sandboxApiService.createEvent(request).subscribe({
      next: (response) => {
        if (response.body?.id) {
          this.sandboxRecordId.set(response.body.id);
        }

        this.handleSandboxSuccessResponse(
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
  }

  private handleSandboxSuccessResponse(
    body: SandboxEvent | SandboxEvent[] | null,
    status: number,
    statusText: string,
    startedAt: number,
  ): void {
    const finishedAt = performance.now();

    this.responseTime.set(Math.round(finishedAt - startedAt));

    this.responseStatus.set(status);

    this.responseStatusText.set(statusText || 'CREATED');

    if (body) {
      this.responseBody.set(body);

      const json = JSON.stringify(body);

      this.responseSize.set(new Blob([json]).size);
    }

    this.loading.set(false);
  }

  showSandboxGet(): void {
    this.sandboxMethod.set('GET');
    this.method.set('GET');

    this.clearResponse();
  }

  showSandboxPost(): void {
    this.sandboxMethod.set('POST');
    this.method.set('POST');

    this.clearResponse();
  }

  showAllSandboxEvents(): void {
    this.sandboxGetMode.set('all');

    this.clearResponse();
  }

  showSandboxById(): void {
    this.sandboxGetMode.set('byId');

    this.clearResponse();
  }

  updateSandboxRecordId(event: Event): void {
    const input = event.target as HTMLInputElement;

    const id = Number(input.value);

    if (!id) {
      this.sandboxRecordId.set(null);
      return;
    }

    this.sandboxRecordId.set(id);

    this.clearResponse();
  }

  showSandboxPut(): void {
    this.sandboxMethod.set('PUT');
    this.method.set('PUT');

    this.clearResponse();
  }

  private sendSandboxPut(): void {
    const id = this.sandboxRecordId();

    if (!id) {
      this.errorMessage.set('Create or select a sandbox record before updating.');

      return;
    }

    this.loading.set(true);

    this.clearResponse();

    const startedAt = performance.now();

    const request: SandboxEventRequest = {
      year: this.sandboxYear(),

      category: this.sandboxCategory(),

      title: this.sandboxTitle(),

      description: this.sandboxDescription(),

      technology: this.sandboxTechnology(),
    };

    this.requestPayload.set(request);

    this.lastRequestMethod.set('PUT');

    this.lastRequestEndpoint.set(`/api/sandbox/events/${id}`);

    this.activeResponseTab.set('response');

    this.sandboxApiService.updateEvent(id, request).subscribe({
      next: (response) => {
        this.handleSandboxSuccessResponse(
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
  }

  showSandboxDelete(): void {
    this.sandboxMethod.set('DELETE');
    this.method.set('DELETE');

    this.clearResponse();
  }

  private sendSandboxDelete(): void {
    const id = this.sandboxRecordId();

    if (!id) {
      this.errorMessage.set('Create or select a sandbox record before deleting.');

      return;
    }

    this.showDeleteConfirm.set(true);
  }

  confirmSandboxDelete(): void {
    const id = this.sandboxRecordId();

    if (!id) {
      return;
    }

    this.showDeleteConfirm.set(false);

    this.loading.set(true);

    this.clearResponse();

    const startedAt = performance.now();

    // Record the request for the
    // REQUEST PAYLOAD tab

    this.requestPayload.set(null);

    this.lastRequestMethod.set('DELETE');

    this.lastRequestEndpoint.set(`/api/sandbox/events/${id}`);

    this.activeResponseTab.set('response');

    this.sandboxApiService.deleteEvent(id).subscribe({
      next: (response) => {
        const finishedAt = performance.now();

        this.responseTime.set(Math.round(finishedAt - startedAt));

        this.responseStatus.set(response.status);

        this.responseStatusText.set(response.statusText || 'NO CONTENT');

        this.responseSize.set(0);

        this.responseBody.set(null);

        this.loading.set(false);
      },

      error: (error) => {
        this.handleErrorResponse(error, startedAt);
      },
    });
  }

  cancelSandboxDelete(): void {
    this.showDeleteConfirm.set(false);
  }

  formattedRequestPayload = computed(() => {
    const payload = this.requestPayload();

    if (!payload) {
      return '';
    }

    return JSON.stringify(payload, null, 2);
  });

  showResponseBody(): void {
    this.activeResponseTab.set('response');
  }

  showRequestPayload(): void {
    this.activeResponseTab.set('request');
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
