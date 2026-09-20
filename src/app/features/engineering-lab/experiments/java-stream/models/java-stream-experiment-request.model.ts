import { JavaStreamResultType } from './java-stream-result-type.model';
import { JavaStreamSortDirection } from './java-stream-sort-direction.model';

export interface JavaStreamExperimentRequest {
  category: string;

  sortDirection: JavaStreamSortDirection;

  resultType: JavaStreamResultType;

  limit: number | null;
}
