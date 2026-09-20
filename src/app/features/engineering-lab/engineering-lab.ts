import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';

import { EngineeringLabApiService } from '../../core/services/engineering-lab-api.service';

import { JavaStreamExperimentRequest } from './experiments/java-stream/models/java-stream-experiment-request.model';
import { JavaStreamExperimentResponse, JavaStreamPipelineStage } from './experiments/java-stream/models/java-stream-experiment-response.model';
import { JavaStreamResultType } from './experiments/java-stream/models/java-stream-result-type.model';
import { JavaStreamSortDirection } from './experiments/java-stream/models/java-stream-sort-direction.model';
import { JavaStreamExperiment } from './experiments/java-stream/java-stream-experiment';
import { AtariLabComponent } from './experiments/atari/atari';

@Component({
  selector: 'app-engineering-lab',
  standalone: true,
  imports: [JavaStreamExperiment, AtariLabComponent],
  templateUrl: './engineering-lab.html',
  styleUrl: './engineering-lab.css',
})
export class EngineeringLabComponent {
  private readonly engineeringLabApi = inject(EngineeringLabApiService);

  readonly selectedCategory = signal<string>('ALL');

  readonly selectedSortDirection = signal<JavaStreamSortDirection>('ASC');

  readonly selectedResultType = signal<JavaStreamResultType>('FULL_OBJECT');

  readonly selectedLimit = signal<number | null>(null);

  readonly loading = signal<boolean>(false);

  readonly errorMessage = signal<string | null>(null);

  readonly javaStreamResponse = signal<JavaStreamExperimentResponse | null>(null);

  readonly experimentDrawerOpen = signal<boolean>(false);

  readonly labGuideOpen =
  signal<boolean>(false);

 readonly selectedLab =
  signal<'JAVA' | 'ATARI' | null>(null);

readonly activeExperiment =
  signal<'JAVA_STREAM' | 'ATARI' | null>(null);

  readonly pipelineStages: JavaStreamPipelineStage[] = [
    'COLLECTION',
    'STREAM',
    'FILTER',
    'SORT',
    'MAP',
    'LIMIT',
    'TO_LIST',
    'RESULT',
  ];

  readonly lastConfiguredStage = signal<JavaStreamPipelineStage | null>(null);

  toggleExperimentDrawer(): void {
  const opening =
    !this.experimentDrawerOpen();

  this.experimentDrawerOpen.set(opening);

  if (!opening) {
    this.selectedLab.set(null);

    this.activeExperiment.set(null);

    this.labGuideOpen.set(false);
  }
}

  selectJavaLab(): void {
  this.labGuideOpen.set(false);

  this.selectedLab.set('JAVA');

  this.activeExperiment.set(null);

  this.errorMessage.set(null);
}


openAtariExperiment(): void {
  this.labGuideOpen.set(false);

  this.selectedLab.set('ATARI');

  this.activeExperiment.set('ATARI');

  this.errorMessage.set(null);
}


backToLabCategories(): void {
  this.selectedLab.set(null);

  this.activeExperiment.set(null);

  this.errorMessage.set(null);
}


backFromJavaExperiment(): void {
  this.activeExperiment.set(null);

  this.selectedLab.set('JAVA');

  this.errorMessage.set(null);
}


backFromAtariExperiment(): void {
  this.activeExperiment.set(null);

  this.selectedLab.set(null);

  this.errorMessage.set(null);
}

  openJavaStreamExperiment(): void {
     this.labGuideOpen.set(false);

  this.activeExperiment.set('JAVA_STREAM');

  this.errorMessage.set(null);
  }

  //remove
  backToExperiments(): void {
    this.activeExperiment.set(null);

    this.errorMessage.set(null);
  }

  closeExperimentDrawer(): void {
  this.experimentDrawerOpen.set(false);

  this.selectedLab.set(null);

  this.activeExperiment.set(null);

  this.labGuideOpen.set(false);

  this.errorMessage.set(null);
}

  

  onCategoryChange(event: Event): void {
    const select = event.target as HTMLSelectElement;

    this.selectedCategory.set(select.value);

    this.lastConfiguredStage.set('FILTER');
  }

  onSortDirectionChange(event: Event): void {
    const select = event.target as HTMLSelectElement;

    this.selectedSortDirection.set(select.value as JavaStreamSortDirection);

    this.lastConfiguredStage.set('SORT');
  }

  onResultTypeChange(event: Event): void {
    const select = event.target as HTMLSelectElement;

    this.selectedResultType.set(select.value as JavaStreamResultType);

    this.lastConfiguredStage.set('MAP');
  }

  onLimitChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    const value = input.value.trim();

    this.selectedLimit.set(value === '' ? null : Number(value));

    this.lastConfiguredStage.set('LIMIT');
  }

  runJavaStreamExperiment(): void {
    this.errorMessage.set(null);
    this.javaStreamResponse.set(null);
    this.loading.set(true);

    const request: JavaStreamExperimentRequest = {
      category: this.selectedCategory(),

      sortDirection: this.selectedSortDirection(),

      resultType: this.selectedResultType(),

      limit: this.selectedLimit(),
    };

    this.engineeringLabApi.runJavaStreamExperiment(request).subscribe({
      next: (response) => {
        this.javaStreamResponse.set(response);

        this.loading.set(false);
      },

      error: (error: HttpErrorResponse) => {
        this.loading.set(false);

        this.javaStreamResponse.set(null);

        const message = error.error?.message ?? 'Unable to run the Java Stream experiment.';

        this.errorMessage.set(message);
      },
    });
  }

  isPipelineStageActive(stage: JavaStreamPipelineStage): boolean {
    const response = this.javaStreamResponse();

    if (!response) {
      return false;
    }

    return response.stages.includes(stage);
  }

  getPipelineStageDetail(stage: JavaStreamPipelineStage): string {
    const response = this.javaStreamResponse();

    if (!response) {
      if (stage === 'FILTER') {
        return 'OFF';
      }

      if (stage === 'LIMIT') {
        return 'OFF';
      }

      return 'READY';
    }

    switch (stage) {
      case 'COLLECTION':
        return `${response.originalCount} records`;

      case 'STREAM':
        return `${response.originalCount} records`;

      case 'FILTER':
        if (!this.isPipelineStageActive('FILTER')) {
          return 'OFF';
        }

        return `${response.originalCount} → ${response.filteredCount}`;

      case 'SORT':
        return this.selectedSortDirection();

      case 'MAP':
        return this.selectedResultType().replace('_', ' ');

      case 'LIMIT':
        if (!this.isPipelineStageActive('LIMIT')) {
          return 'OFF';
        }

        return `${response.filteredCount} → ${response.finalCount}`;

      case 'TO_LIST':
        return `${response.finalCount} items`;

      case 'RESULT':
        return `${response.finalCount} returned`;

      default:
        return '';
    }
  }

  getPipelineStageDescription(stage: JavaStreamPipelineStage): string {
    switch (stage) {
      case 'COLLECTION':
        return 'The original Java collection loaded from the Tech Journey timeline.';

      case 'STREAM':
        return 'Creates a Stream from the Java collection.';

      case 'FILTER':
        return 'Uses filter() when a specific timeline category is selected.';

      case 'SORT':
        return 'Uses sorted() to order timeline records by year.';

      case 'MAP':
        return 'Uses map() to transform each timeline record into the selected result type.';

      case 'LIMIT':
        return 'Uses limit() when a maximum result count is entered.';

      case 'TO_LIST':
        return 'Materializes the Stream into a Java List.';

      case 'RESULT':
        return 'The final result returned by the Spring Boot API.';

      default:
        return '';
    }
  }

  toggleLabGuide(): void {
  this.labGuideOpen.update(
    open => !open
  );
}
}
