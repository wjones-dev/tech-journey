/**
 * Defines the available result transformations for the
 * Java Streams Engineering Lab experiment.
 *
 * These values must match the JavaStreamResultType enum
 * used by the Spring Boot backend.
 *
 * FULL_OBJECT
 *   Returns complete timeline event objects.
 *
 * TITLE
 *   Maps each timeline event to its title.
 *
 * TECHNOLOGY
 *   Maps each timeline event to its technology value.
 */
export type JavaStreamResultType =
  | 'FULL_OBJECT'
  | 'TITLE'
  | 'TECHNOLOGY';