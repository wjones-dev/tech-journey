import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JavaStreamExperimentRequest } from '../../features/engineering-lab/experiments/java/data-processing/models/java-stream-experiment-request.model';
import { JavaStreamExperimentResponse } from '../../features/engineering-lab/experiments/java/data-processing/models/java-stream-experiment-response.model';


/**
 * Provides HTTP communication between the Angular Engineering Lab
 * and the Spring Boot Engineering Lab REST endpoints.
 *
 * The Engineering Lab is different from the API Explorer:
 *
 * API Explorer
 *   Allows the visitor to interact directly with REST operations.
 *
 * Engineering Lab
 *   Allows the visitor to configure experiments and visualize
 *   what the Java/Spring backend is doing internally.
 *
 * Experiment 01 currently uses:
 *
 * POST /api/lab/java/streams/run
 *
 * Future Engineering Lab experiments can also be added to this
 * service as additional methods.
 */
@Injectable({
  providedIn: 'root'
})
export class EngineeringLabApiService {

  /**
   * Angular HttpClient used to communicate with the
   * Spring Boot backend.
   *
   * inject() is used instead of constructor injection to follow
   * the modern Angular dependency injection style.
   */
  private readonly http = inject(HttpClient);


  /**
   * Base URL for the Engineering Lab Java endpoints.
   *
   * A relative URL is intentionally used here.
   *
   * During local development, the Angular proxy forwards /api
   * requests to the Spring Boot application.
   *
   * In production, Nginx forwards /api requests to the
   * Spring Boot API container.
   */
  private readonly javaLabUrl = '/api/lab/java';


  /**
   * Executes Experiment 01:
   *
   * Java Collections • Streams • Lambdas
   *
   * Angular sends the visitor's selected experiment configuration
   * to Spring Boot. The backend then performs a real Java Stream
   * pipeline against the Tech Journey timeline dataset.
   *
   * The response contains:
   *
   * - Original record count
   * - Filtered record count
   * - Final result count
   * - Execution time
   * - Pipeline stages that actually executed
   * - Final Stream results
   *
   * Angular will later use the returned stages to animate only
   * the Java operations that actually participated in the request.
   *
   * Example endpoint:
   *
   * POST /api/lab/java/streams/run
   *
   * @param request
   * Configuration for the Java Stream experiment.
   *
   * @returns
   * Observable containing the Java Stream experiment response.
   */
  runJavaStreamExperiment(
    request: JavaStreamExperimentRequest
  ): Observable<JavaStreamExperimentResponse> {

    return this.http.post<JavaStreamExperimentResponse>(
      `${this.javaLabUrl}/streams/run`,
      request
    );
  }
}