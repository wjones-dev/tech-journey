import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  inject,
  signal
} from '@angular/core';

import {
  TimelineApiService,
  TimelineEvent
} from './timeline-api.service';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [],
  templateUrl: './timeline.html',
  styleUrl: './timeline.css'
})
export class Timeline implements AfterViewInit, OnDestroy {

  private readonly timelineApiService = inject(TimelineApiService);
  private readonly elementRef = inject(ElementRef);

  timelineEvents = signal<TimelineEvent[]>([]);

  private observer?: IntersectionObserver;


  constructor() {

    this.timelineApiService.getTimeline().subscribe({

      next: (events) => {

        this.timelineEvents.set(events);

        // Wait for Angular to render timeline items
        // before attaching the IntersectionObserver.
        setTimeout(() => {
          this.observeTimelineItems();
        });

      },

      error: (error) => {
        console.error('Error loading timeline:', error);
      }

    });

  }


  ngAfterViewInit(): void {
    this.observeTimelineItems();
  }


  private observeTimelineItems(): void {

    if (!('IntersectionObserver' in window)) {
      return;
    }

    this.observer?.disconnect();


    this.observer = new IntersectionObserver(

      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add('visible');

            this.observer?.unobserve(entry.target);

          }

        });

      },

      {
        threshold: 0.2
      }

    );


    const items =
      this.elementRef.nativeElement
        .querySelectorAll('.timeline-item');


    items.forEach((item: Element) => {

      this.observer?.observe(item);

    });

  }


  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

}