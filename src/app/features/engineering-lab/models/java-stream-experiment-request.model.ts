import { JavaStreamResultType } from './java-stream-result-type.model';
import { JavaStreamSortDirection } from './java-stream-sort-direction.model';


/**
 * Request sent from Angular to the Spring Boot
 * Java Streams Engineering Lab endpoint.
 *
 * Endpoint:
 *
 * POST /api/lab/java/streams/run
 *
 * The visitor configures these values through the
 * Engineering Lab experiment controls.
 */
export interface JavaStreamExperimentRequest {

  /**
   * Timeline category used to filter the dataset.
   *
   * Examples:
   *
   * ALL
   * DEVOPS
   * AI
   * CLOUD
   * GAMING
   *
   * Sending ALL tells the backend not to apply
   * the Java Stream filter operation.
   */
  category: string;


  /**
   * Determines how timeline events are sorted
   * before the results are returned.
   *
   * ASC  = oldest to newest
   * DESC = newest to oldest
   */
  sortDirection: JavaStreamSortDirection;


  /**
   * Determines how the Java Stream map operation
   * transforms the timeline events.
   *
   * FULL_OBJECT
   * TITLE
   * TECHNOLOGY
   */
  resultType: JavaStreamResultType;


  /**
   * Optional maximum number of results returned.
   *
   * When null, the backend does not execute
   * the Stream limit() operation.
   *
   * Example values used by the UI:
   *
   * null = All
   * 5
   * 10
   */
  limit: number | null;
}