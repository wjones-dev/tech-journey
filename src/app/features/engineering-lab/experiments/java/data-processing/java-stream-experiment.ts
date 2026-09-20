import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  computed,
  inject,
  output,
  signal
} from '@angular/core';

import { EngineeringLabApiService } from '../../../../../core/services/engineering-lab-api.service';

import { JavaStreamExperimentRequest } from './models/java-stream-experiment-request.model';
import {
  JavaStreamExperimentResponse,
  JavaStreamPipelineStage
} from './models/java-stream-experiment-response.model';
import { JavaStreamResultType } from './models/java-stream-result-type.model';
import { JavaStreamSortDirection } from './models/java-stream-sort-direction.model';


interface JavaImplementationLine {
  stage: JavaStreamPipelineStage | null;
  text: string;
  enabled: boolean;
}

@Component({
  selector: 'app-java-stream-experiment',
  standalone: true,
  imports: [],
  templateUrl: './java-stream-experiment.html',
  styleUrl: './java-stream-experiment.css'
})
export class JavaStreamExperiment {

  private readonly engineeringLabApi =
    inject(EngineeringLabApiService);


  readonly back =
    output<void>();


  readonly selectedCategory =
    signal<string>('ALL');


  readonly selectedSortDirection =
    signal<JavaStreamSortDirection>('ASC');


  readonly selectedResultType =
    signal<JavaStreamResultType>('FULL_OBJECT');


  readonly selectedLimit =
    signal<number | null>(null);


  readonly loading =
    signal<boolean>(false);


  readonly errorMessage =
    signal<string | null>(null);


  readonly javaStreamResponse =
    signal<JavaStreamExperimentResponse | null>(null);


  readonly lastConfiguredStage =
    signal<JavaStreamPipelineStage | null>(null);

      /*
   * Controls whether the ENGINEER implementation
   * panel is currently visible.
   */
  readonly implementationExpanded =
    signal<boolean>(false);


  /*
   * Temporary highlight used while the user
   * hovers or focuses a pipeline stage.
   */
  readonly hoveredImplementationStage =
    signal<JavaStreamPipelineStage | null>(null);


  /*
   * Persistent highlight used when a pipeline
   * stage is clicked.
   */
  readonly pinnedImplementationStage =
    signal<JavaStreamPipelineStage | null>(null);


  /*
   * Determines which Java implementation line
   * should currently be highlighted.
   *
   * Priority:
   *
   * hover/focus
   *      ↓
   * clicked stage
   *      ↓
   * most recently configured stage
   */
  readonly activeImplementationStage =
    computed<JavaStreamPipelineStage | null>(() => {

      return (
        this.hoveredImplementationStage() ??
        this.pinnedImplementationStage() ??
        this.lastConfiguredStage()
      );
    });


  /*
   * Builds the Java Stream implementation shown
   * in the ENGINEER panel.
   *
   * The code changes automatically whenever the
   * PLAY controls change.
   */
  readonly implementationLines =
    computed<JavaImplementationLine[]>(() => {

      const category =
        this.selectedCategory();

      const sortDirection =
        this.selectedSortDirection();

      const resultType =
        this.selectedResultType();

      const limit =
        this.selectedLimit();


      const filterEnabled =
        category !== 'ALL';


      const limitEnabled =
        limit !== null;


      const sortLine =
        sortDirection === 'DESC'
          ? '        .sorted(Comparator.comparing(TimelineEvent::getYear).reversed())'
          : '        .sorted(Comparator.comparing(TimelineEvent::getYear))';


      let mapLine =
        '        .map(event -> event)';


      switch (resultType) {

        case 'TITLE':

          mapLine =
            '        .map(TimelineEvent::getTitle)';

          break;


        case 'TECHNOLOGY':

          mapLine =
            '        .map(TimelineEvent::getTechnology)';

          break;


        case 'FULL_OBJECT':

        default:

          mapLine =
            '        .map(event -> event)';

          break;
      }


      return [

        {
          stage: null,
          text: 'public List<?> processTimeline() {',
          enabled: true
        },

        {
          stage: 'COLLECTION',
          text: '    List<TimelineEvent> timelineEvents = timelineEventRepository.findAll();',
          enabled: true
        },

        {
          stage: null,
          text: '',
          enabled: true
        },

        {
          stage: null,
          text: '    List<?> results = timelineEvents',
          enabled: true
        },

        {
          stage: 'STREAM',
          text: '        .stream()',
          enabled: true
        },

        filterEnabled
          ? {
              stage: 'FILTER',
              text:
                `        .filter(event -> event.getCategory() == TimelineCategory.${category})`,
              enabled: true
            }
          : {
              stage: 'FILTER',
              text:
                '        // filter() skipped — All Categories selected',
              enabled: false
            },

        {
          stage: 'SORT',
          text: sortLine,
          enabled: true
        },

        {
          stage: 'MAP',
          text: mapLine,
          enabled: true
        },

        limitEnabled
          ? {
              stage: 'LIMIT',
              text:
                `        .limit(${limit})`,
              enabled: true
            }
          : {
              stage: 'LIMIT',
              text:
                '        // limit() skipped — No limit selected',
              enabled: false
            },

        {
          stage: 'TO_LIST',
          text: '        .toList();',
          enabled: true
        },

        {
          stage: null,
          text: '',
          enabled: true
        },

        {
          stage: 'RESULT',
          text: '    return results;',
          enabled: true
        },

        {
          stage: null,
          text: '}',
          enabled: true
        }
      ];
    });


  readonly pipelineStages: JavaStreamPipelineStage[] = [
    'COLLECTION',
    'STREAM',
    'FILTER',
    'SORT',
    'MAP',
    'LIMIT',
    'TO_LIST',
    'RESULT'
  ];


  backToExperiments(): void {

    this.back.emit();
  }

    toggleImplementation(): void {

    this.implementationExpanded.update(
      expanded => !expanded
    );
  }


  previewImplementationStage(
    stage: JavaStreamPipelineStage
  ): void {

    this.hoveredImplementationStage.set(
      stage
    );
  }


  clearImplementationPreview(): void {

    this.hoveredImplementationStage.set(
      null
    );
  }


  selectImplementationStage(
    stage: JavaStreamPipelineStage
  ): void {

    /*
     * Clicking a pipeline stage automatically opens
     * ENGINEER so the related Java operation is visible.
     */
    this.implementationExpanded.set(true);


    this.pinnedImplementationStage.update(
      current =>
        current === stage
          ? null
          : stage
    );
  }


  isImplementationLineHighlighted(
    stage: JavaStreamPipelineStage | null
  ): boolean {

    return (
      stage !== null &&
      this.activeImplementationStage() === stage
    );
  }


  onCategoryChange(event: Event): void {

    const select =
      event.target as HTMLSelectElement;

    this.selectedCategory.set(
      select.value
    );

    this.lastConfiguredStage.set(
      'FILTER'
    );
  }


  onSortDirectionChange(event: Event): void {

    const select =
      event.target as HTMLSelectElement;

    this.selectedSortDirection.set(
      select.value as JavaStreamSortDirection
    );

    this.lastConfiguredStage.set(
      'SORT'
    );
  }


  onResultTypeChange(event: Event): void {

    const select =
      event.target as HTMLSelectElement;

    this.selectedResultType.set(
      select.value as JavaStreamResultType
    );

    this.lastConfiguredStage.set(
      'MAP'
    );
  }


  onLimitChange(event: Event): void {

    const input =
      event.target as HTMLInputElement;

    const value =
      input.value.trim();

    this.selectedLimit.set(
      value === ''
        ? null
        : Number(value)
    );

    this.lastConfiguredStage.set(
      'LIMIT'
    );
  }


  isPipelineStageActive(
    stage: JavaStreamPipelineStage
  ): boolean {

    const response =
      this.javaStreamResponse();

    if (!response) {
      return false;
    }

    return response.stages.includes(stage);
  }


  getPipelineStageDetail(
    stage: JavaStreamPipelineStage
  ): string {

    const response =
      this.javaStreamResponse();

    if (!response) {

      if (
        stage === 'FILTER' ||
        stage === 'LIMIT'
      ) {
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
        return this.selectedResultType()
          .replace('_', ' ');

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


  getPipelineStageDescription(
    stage: JavaStreamPipelineStage
  ): string {

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


  runJavaStreamExperiment(): void {

    this.errorMessage.set(null);

    this.javaStreamResponse.set(null);

    this.loading.set(true);


    const request: JavaStreamExperimentRequest = {

      category:
        this.selectedCategory(),

      sortDirection:
        this.selectedSortDirection(),

      resultType:
        this.selectedResultType(),

      limit:
        this.selectedLimit()
    };


    this.engineeringLabApi
      .runJavaStreamExperiment(request)
      .subscribe({

        next: (response) => {

          this.javaStreamResponse.set(
            response
          );

          this.loading.set(false);
        },

        error: (error: HttpErrorResponse) => {

          this.loading.set(false);

          this.javaStreamResponse.set(null);

          const message =
            error.error?.message ??
            'Unable to run the Java Stream experiment.';

          this.errorMessage.set(
            message
          );
        }
      });
  }
}