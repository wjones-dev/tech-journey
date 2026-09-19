/**
 * Defines the available sort directions for the
 * Java Streams Engineering Lab experiment.
 *
 * These values must match the JavaStreamSortDirection enum
 * used by the Spring Boot backend.
 *
 * ASC
 *   Sorts timeline events from oldest to newest.
 *
 * DESC
 *   Sorts timeline events from newest to oldest.
 */
export type JavaStreamSortDirection =
  | 'ASC'
  | 'DESC';