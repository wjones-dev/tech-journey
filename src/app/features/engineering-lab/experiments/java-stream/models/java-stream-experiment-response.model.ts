
export interface JavaStreamTimelineEvent {

  id: number;

  year: number;

  category: string;

  title: string;

  description: string;

  technology: string;
}

export type JavaStreamPipelineStage =
  | 'COLLECTION'
  | 'STREAM'
  | 'FILTER'
  | 'SORT'
  | 'MAP'
  | 'LIMIT'
  | 'TO_LIST'
  | 'RESULT';


export type JavaStreamExperimentResult =
  | string
  | JavaStreamTimelineEvent;


export interface JavaStreamExperimentResponse {


  originalCount: number;

  filteredCount: number;

  finalCount: number;

  executionTimeMs: number;

  stages: JavaStreamPipelineStage[];

  results: JavaStreamExperimentResult[];
}