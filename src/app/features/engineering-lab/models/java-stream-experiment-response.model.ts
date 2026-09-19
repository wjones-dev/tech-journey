/**
 * Represents one complete timeline event returned by the
 * Java Streams Engineering Lab when resultType is FULL_OBJECT.
 *
 * This mirrors the TimelineEventDto returned by the
 * Spring Boot backend.
 *
 * We can later replace this interface with an existing
 * shared TimelineEvent model if the Engineering Lab and
 * Timeline UI should use the exact same Angular model.
 */
export interface JavaStreamTimelineEvent {

  /**
   * Database identifier for the timeline event.
   */
  id: number;


  /**
   * Year associated with the timeline event.
   */
  year: number;


  /**
   * Timeline category returned by the backend.
   *
   * Examples:
   *
   * GAMING
   * MUSIC
   * INTERNET
   * CLOUD
   * DEVOPS
   * AI
   */
  category: string;


  /**
   * Display title of the timeline event.
   */
  title: string;


  /**
   * Description associated with the timeline event.
   */
  description: string;


  /**
   * Technology or technologies associated with
   * the timeline event.
   */
  technology: string;
}


/**
 * Represents every possible pipeline stage that can
 * be returned by the Spring Boot Engineering Lab.
 *
 * Angular will use these values later to determine
 * which visual pipeline stages should animate.
 *
 * For example:
 *
 * category = ALL
 *   FILTER will not be returned.
 *
 * limit = null
 *   LIMIT will not be returned.
 */
export type JavaStreamPipelineStage =
  | 'COLLECTION'
  | 'STREAM'
  | 'FILTER'
  | 'SORT'
  | 'MAP'
  | 'LIMIT'
  | 'TO_LIST'
  | 'RESULT';


/**
 * Represents one possible result returned by the
 * Java Stream experiment.
 *
 * TITLE and TECHNOLOGY produce strings.
 *
 * FULL_OBJECT produces complete timeline event objects.
 */
export type JavaStreamExperimentResult =
  | string
  | JavaStreamTimelineEvent;


/**
 * Response returned by the Spring Boot
 * Java Streams Engineering Lab endpoint.
 *
 * Endpoint:
 *
 * POST /api/lab/java/streams/run
 *
 * The response contains both the actual Stream results
 * and metadata Angular can use to visualize how the
 * Java pipeline executed.
 */
export interface JavaStreamExperimentResponse {

  /**
   * Number of timeline events loaded from the repository
   * before any Stream operations are applied.
   */
  originalCount: number;


  /**
   * Number of timeline events remaining after the
   * optional category filter is applied.
   *
   * If no filter is used, this will normally match
   * originalCount.
   */
  filteredCount: number;


  /**
   * Number of records contained in the final result.
   *
   * This may be smaller than filteredCount when
   * limit() is used.
   */
  finalCount: number;


  /**
   * Backend execution time for the experiment,
   * measured in milliseconds.
   */
  executionTimeMs: number;


  /**
   * Actual Java Stream pipeline stages executed
   * by the backend.
   *
   * Angular should use this collection when building
   * the pipeline visualization rather than assuming
   * every possible stage executed.
   */
  stages: JavaStreamPipelineStage[];


  /**
   * Final values produced by the Java Stream pipeline.
   *
   * TITLE
   *   string[]
   *
   * TECHNOLOGY
   *   string[]
   *
   * FULL_OBJECT
   *   JavaStreamTimelineEvent[]
   */
  results: JavaStreamExperimentResult[];
}