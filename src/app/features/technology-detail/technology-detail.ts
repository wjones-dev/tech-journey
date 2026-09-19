import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TechnologyDetail } from './technology-detail.model';
import { TECHNOLOGY_DETAILS } from './technology-detail.data';
import { TimelineApiService, TimelineEvent } from '../../core/services/timeline-api.service';

@Component({
  selector: 'app-technology-detail',
  standalone: true,
  imports: [],
  templateUrl: './technology-detail.html',
  styleUrl: './technology-detail.css',
})
export class TechnologyDetailComponent {
  private readonly route = inject(ActivatedRoute);

  private readonly router = inject(Router);

  private readonly timelineApiService = inject(TimelineApiService);

  event = signal<TimelineEvent | null>(null);

  detail = signal<TechnologyDetail | null>(null);

  previousEvent = signal<TimelineEvent | null>(null);
  nextEvent = signal<TimelineEvent | null>(null);

  concepts = computed(() => this.detail()?.concepts ?? []);

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.loadTimelineEvent(id);
  }

  private loadTimelineEvent(id: number): void {
    this.timelineApiService.getTimelineEvent(id).subscribe({
      next: (event) => {
        this.event.set(event);

        this.loadTechnologyDetail(event.title);

        this.loadTimelineNavigation(event.id);
      },

      error: (error) => {
        console.error('Error loading timeline event:', error);
      },
    });
  }

  private loadTechnologyDetail(title: string): void {
    const key = this.createTechnologyKey(title);

    const detail = TECHNOLOGY_DETAILS.find((item) => item.key === key);

    this.detail.set(detail ?? null);
  }

  backToTimeline(): void {
    this.router.navigate(['/']);
  }

  viewApiData(): void {
    const event = this.event();

    if (!event) {
      return;
    }

    this.router.navigate(['/explorer'], {
      queryParams: {
        eventId: event.id,
      },
    });
  }

  private loadTimelineNavigation(currentId: number): void {
    this.timelineApiService.getTimeline().subscribe({
      next: (events) => {
        const sortedEvents = [...events].sort((a, b) => a.year - b.year);

        const currentIndex = sortedEvents.findIndex((item) => item.id === currentId);

        this.previousEvent.set(currentIndex > 0 ? sortedEvents[currentIndex - 1] : null);

        this.nextEvent.set(
          currentIndex >= 0 && currentIndex < sortedEvents.length - 1
            ? sortedEvents[currentIndex + 1]
            : null,
        );
      },

      error: (error) => {
        console.error('Error loading timeline navigation:', error);
      },
    });
  }

  navigateToTechnology(event: TimelineEvent): void {
    this.router.navigate(['/technology', event.id]).then(() => {
      this.loadTimelineEvent(event.id);

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  private createTechnologyKey(title: string): string {
    return title
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/\//g, '-')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }
}
