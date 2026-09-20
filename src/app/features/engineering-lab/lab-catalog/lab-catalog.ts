import { Component, output } from '@angular/core';


export type LabTechnologyKey =
  | 'PERSONAL_TECHNOLOGY'
  | 'WEB'
  | 'JAVA'
  | 'CLOUD_DEVOPS'
  | 'AI';


interface LabTechnologyCard {
  key: LabTechnologyKey;

  period: string;

  eyebrow: string;

  title: string;

  description: string;

  experimentCount: number;

  buttonLabel: string;
}


@Component({
  selector: 'app-lab-catalog',
  standalone: true,
  imports: [],
  templateUrl: './lab-catalog.html',
  styleUrl: './lab-catalog.css',
})
export class LabCatalogComponent {

  readonly technologySelected =
    output<LabTechnologyKey>();


  readonly technologies: LabTechnologyCard[] = [

    {
      key: 'PERSONAL_TECHNOLOGY',

      period: '1983',

      eyebrow: 'TECHNOLOGY EVOLUTION',

      title: 'Personal Technology',

      description:
        'Explore the gaming, computing, music, and mobile technologies that shaped my earliest experiences with technology.',

      experimentCount: 3,

      buttonLabel: 'VIEW EXPERIMENTS',
    },


    {
  key: 'WEB',

  period: '1993',

  eyebrow: 'WEB DEVELOPMENT',

  title: 'Web',

  description:
    'Explore the evolution from early HTML, CSS, and JavaScript pages to modern Angular single-page applications.',

  experimentCount: 2,

  buttonLabel: 'VIEW EXPERIMENTS',
},

    


    {
      key: 'JAVA',

      period: '1995',

      eyebrow: 'SOFTWARE DEVELOPMENT',

      title: 'Java',

      description:
        'Explore Java data processing, Spring request flow, and application security through interactive engineering experiments.',

      experimentCount: 3,

      buttonLabel: 'VIEW EXPERIMENTS',
    },

    {
  key: 'CLOUD_DEVOPS',

  period: '2018',

  eyebrow: 'CLOUD & DEVOPS',

  title: 'Cloud & DevOps',

  description:
    'Explore cloud services, container orchestration, CI/CD pipelines, and the practices behind modern cloud-native software delivery.',

  experimentCount: 3,

  buttonLabel: 'VIEW EXPERIMENTS',
},


{
  key: 'AI',

  period: '2026',

  eyebrow: 'AI ENGINEERING',

  title: 'AI',

  description:
    'Explore agentic AI systems that can plan tasks, use tools, work across services, and coordinate multi-step engineering workflows.',

  experimentCount: 1,

  buttonLabel: 'VIEW EXPERIMENTS',
},

  ];


  selectTechnology(
    technology: LabTechnologyCard
  ): void {

    this.technologySelected.emit(
      technology.key
    );
  }


  experimentLabel(
    count: number
  ): string {

    return count === 1
      ? '1 EXPERIMENT'
      : `${count} EXPERIMENTS`;
  }

}