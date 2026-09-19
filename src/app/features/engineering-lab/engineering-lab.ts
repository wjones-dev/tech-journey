import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';

import { EngineeringLabApiService } from '../../core/services/engineering-lab-api.service';

import { JavaStreamExperimentRequest } from './models/java-stream-experiment-request.model';
import { JavaStreamExperimentResponse } from './models/java-stream-experiment-response.model';
import { JavaStreamResultType } from './models/java-stream-result-type.model';
import { JavaStreamSortDirection } from './models/java-stream-sort-direction.model';


@Component({
  selector: 'app-engineering-lab',
  standalone: true,
  imports: [],
  templateUrl: './engineering-lab.html',
  styleUrl: './engineering-lab.css'
})
export class EngineeringLabComponent {

  /**
   * Service responsible for communicating with the
   * Spring Boot Engineering Lab endpoints.
   */
  private readonly engineeringLabApi =
    inject(EngineeringLabApiService);


  // ============================================================
  // EXPERIMENT 01
  // Java Collections • Streams • Lambdas
  // ============================================================


  /**
   * Timeline category selected by the visitor.
   *
   * ALL tells the backend not to execute the
   * Stream filter() operation.
   */
  readonly selectedCategory =
    signal<string>('ALL');


  /**
   * Controls the order of timeline events.
   *
   * ASC
   *   Oldest → Newest
   *
   * DESC
   *   Newest → Oldest
   */
  readonly selectedSortDirection =
    signal<JavaStreamSortDirection>('ASC');


  /**
   * Determines how the Java Stream map() operation
   * transforms each TimelineEvent.
   *
   * FULL_OBJECT
   *   Returns complete TimelineEventDto objects.
   *
   * TITLE
   *   Returns only timeline titles.
   *
   * TECHNOLOGY
   *   Returns only technology values.
   */
  readonly selectedResultType =
    signal<JavaStreamResultType>('FULL_OBJECT');


  /**
   * Optional maximum number of results returned
   * by the Java Stream pipeline.
   *
   * null means no limit is applied.
   */
  readonly selectedLimit =
    signal<number | null>(null);


  // ============================================================
  // EXPERIMENT STATE
  // ============================================================


  /**
   * Indicates whether the Java Stream experiment
   * is currently executing.
   *
   * The HTML will later use this to disable the
   * RUN JAVA STREAM button and display a running state.
   */
  readonly loading =
    signal<boolean>(false);


  /**
   * Contains an error message when the backend
   * rejects or fails an experiment request.
   *
   * null means no error is currently displayed.
   */
  readonly errorMessage =
    signal<string | null>(null);


  /**
   * Stores the most recent successful response
   * returned by the Spring Boot Engineering Lab.
   *
   * Angular will later use this response to display:
   *
   * - Metrics
   * - Pipeline stages
   * - Java Stream results
   * - Execution time
   */
  readonly javaStreamResponse =
    signal<JavaStreamExperimentResponse | null>(null);

    
    // ============================================================
// ENGINEERING LAB DRAWER
// ============================================================


/**
 * Controls whether the Engineering Lab experiment drawer
 * is currently open.
 *
 * false
 *   Only the small EXPLORE EXPERIMENTS launcher is visible.
 *
 * true
 *   The experiment selection drawer is displayed.
 */
readonly experimentDrawerOpen =
  signal<boolean>(false);


/**
 * Identifies the experiment currently opened inside
 * the Engineering Lab drawer.
 *
 * null
 *   The drawer is showing the experiment launcher cards.
 *
 * JAVA_STREAM
 *   Experiment 01 is active.
 *
 * Additional experiment identifiers can be added later
 * as the Engineering Lab grows.
 */
readonly activeExperiment =
  signal<'JAVA_STREAM' | null>(null);


/**
 * Opens or closes the Engineering Lab experiment drawer.
 *
 * Closing the drawer also clears the currently active
 * experiment so the next open begins at the launcher view.
 */
toggleExperimentDrawer(): void {

  const opening =
    !this.experimentDrawerOpen();

  this.experimentDrawerOpen.set(opening);

  if (!opening) {
    this.activeExperiment.set(null);
  }
}


/**
 * Opens Experiment 01 inside the existing Engineering
 * Lab drawer.
 *
 * The next development step will replace the initial
 * experiment shell with the complete Java Stream console.
 */
openJavaStreamExperiment(): void {

  this.activeExperiment.set('JAVA_STREAM');

  this.errorMessage.set(null);
}


/**
 * Returns from an active experiment to the experiment
 * launcher cards without closing the entire drawer.
 */
backToExperiments(): void {

  this.activeExperiment.set(null);

  this.errorMessage.set(null);
}


/**
 * Completely closes the Engineering Lab drawer and
 * returns the page to the unobstructed laboratory view.
 */
closeExperimentDrawer(): void {

  this.experimentDrawerOpen.set(false);

  this.activeExperiment.set(null);

  this.errorMessage.set(null);
}


  // ============================================================
  // EXPERIMENT EXECUTION
  // ============================================================


  /**
   * Executes Engineering Lab Experiment 01.
   *
   * The current Angular control values are converted into
   * a JavaStreamExperimentRequest and sent to:
   *
   * POST /api/lab/java/streams/run
   *
   * Spring Boot then performs the real Java Stream pipeline
   * against the Tech Journey timeline dataset.
   */
  runJavaStreamExperiment(): void {

    /**
     * Clear the previous error before starting
     * another experiment.
     */
    this.errorMessage.set(null);


    /**
     * Mark the experiment as running.
     */
    this.loading.set(true);


    /**
     * Build the request using the visitor's current
     * experiment configuration.
     */
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


    /**
     * Send the request to the Spring Boot
     * Engineering Lab API.
     */
    this.engineeringLabApi
      .runJavaStreamExperiment(request)
      .subscribe({

        /**
         * Successful experiment execution.
         */
        next: (response) => {

          /**
           * Store the complete backend response.
           *
           * The returned stages array will later drive
           * the visual Java Stream pipeline animation.
           */
          this.javaStreamResponse.set(response);


          /**
           * Experiment execution has completed.
           */
          this.loading.set(false);
        },


        /**
         * Handles HTTP or backend validation errors.
         */
        error: (error: HttpErrorResponse) => {

          /**
           * Stop the loading state because the request
           * has completed with an error.
           */
          this.loading.set(false);


          /**
           * Clear the previous successful response so
           * the UI does not display stale experiment data.
           */
          this.javaStreamResponse.set(null);


          /**
           * Spring Boot's GlobalExceptionHandler returns
           * a message property for controlled validation
           * errors such as:
           *
           * Unknown timeline category: BANANAS
           *
           * Limit must be greater than zero.
           *
           * If no backend message is available, Angular
           * displays a general fallback message.
           */
          const message =
            error.error?.message ??
            'Unable to run the Java Stream experiment.';


          this.errorMessage.set(message);
        }
      });
  }
}