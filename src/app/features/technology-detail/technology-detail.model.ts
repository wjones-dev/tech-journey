export interface TechnologyDetail {
  key: string;

  technology: string;

  heading: string;

  technologyDescription: string;

  whyItMatters: string;

  concepts: string[];

  imageUrl?: string;

  imageAlt?: string;

  visualLabel?: string;

  visualCaption?: string;

  labType?: 'java' | 'angular' | 'spring' | 'docker' | 'cloud';

  labAvailable?: boolean;
}
