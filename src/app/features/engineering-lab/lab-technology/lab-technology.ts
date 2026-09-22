import { Component, input, output } from '@angular/core';

export type LabTechnologyKey = 'PERSONAL_TECHNOLOGY' | 'WEB' | 'JAVA' | 'CLOUD_DEVOPS' | 'AI';

export type LabExperimentKey =
  | 'ATARI'
  | 'HOME_COMPUTERS'
  | 'NAPSTER'
  | 'EARLY_WEB'
  | 'ANGULAR'
  | 'JAVA_STREAM'
  | 'SPRING_REQUEST_LIFECYCLE'
  | 'SPRING_SECURITY'
  | 'AWS_CLOUD'
  | 'CONTAINERS_ORCHESTRATION'
  | 'CICD_CLOUD_NATIVE'
  | 'AGENTIC_AI';

interface LabExperimentCard {
  key: LabExperimentKey;

  number: string;

  eyebrow: string;

  title: string;

  description: string;

  available: boolean;
}

@Component({
  selector: 'app-lab-technology',
  standalone: true,
  imports: [],
  templateUrl: './lab-technology.html',
  styleUrl: './lab-technology.css',
})
export class LabTechnologyComponent {
  readonly technology = input.required<LabTechnologyKey>();

  readonly back = output<void>();

  readonly experimentSelected = output<LabExperimentKey>();

  /* =========================
     PERSONAL TECHNOLOGY
     ========================= */

  readonly personalTechnologyExperiments: LabExperimentCard[] = [
    {
      key: 'ATARI',

      number: '01',

      eyebrow: 'GAMING TECHNOLOGY',

      title: 'Atari 2600',

      description:
        'Explore how early cartridge-based game systems worked and compare their architecture with modern gaming systems.',

      available: true,
    },

    {
      key: 'HOME_COMPUTERS',

      number: '02',

      eyebrow: 'PERSONAL COMPUTING',

      title: 'Home Computers',

      description:
        'Explore how early home computers introduced personal computing and evolved into the systems we use today.',

      available: true,
    },

    {
      key: 'NAPSTER',

      number: '03',

      eyebrow: 'MUSIC • NETWORKING • P2P',

      title: 'Napster / File Sharing',

      description:
        'Explore how peer-to-peer networking changed digital music distribution and content sharing.',

      available: true,
    },
  ];

  /* =========================
   WEB
   ========================= */

  readonly webExperiments: LabExperimentCard[] = [
    {
      key: 'EARLY_WEB',

      number: '01',

      eyebrow: 'EARLY WEB DEVELOPMENT',

      title: 'HTML • CSS • JavaScript',

      description:
        'Explore how the early web evolved from connected documents into interactive experiences using HTML, CSS, and JavaScript.',

      available: true,
    },

    {
      key: 'ANGULAR',

      number: '02',

      eyebrow: 'MODERN WEB DEVELOPMENT',

      title: 'Angular • TypeScript • SPA',

      description:
        'Explore how modern Angular applications use components, services, routing, and REST APIs to create interactive single-page applications.',

      available: true,
    },
  ];

  /* =========================
     JAVA
     ========================= */

  readonly javaExperiments: LabExperimentCard[] = [
    {
      key: 'JAVA_STREAM',

      number: '01',

      eyebrow: 'JAVA DATA PROCESSING',

      title: 'Collections • Streams • Lambdas',

      description: 'Process real Tech Journey data through a live Java Stream pipeline.',

      available: true,
    },

    {
      key: 'SPRING_REQUEST_LIFECYCLE',

      number: '02',

      eyebrow: 'SPRING BOOT REQUEST LIFECYCLE',

      title: 'Under the Covers',

      description:
        'See how Maven, Spring Framework, and Spring Boot build, assemble, configure, and start a modern Java application.',

      available: true,
    },

    {
      key: 'SPRING_SECURITY',

      number: '03',

      eyebrow: 'SPRING SECURITY',

      title: 'Authentication • Authorization',

      description: 'Explore valid, missing, expired, and unauthorized token scenarios.',

      available: true,
    },
  ];

  /* =========================
   CLOUD & DEVOPS
   ========================= */

  readonly cloudDevOpsExperiments: LabExperimentCard[] = [
    {
      key: 'AWS_CLOUD',

      number: '01',

      eyebrow: 'AWS / CLOUD COMPUTING',

      title: 'Cloud Services • Architecture • AWS',

      description:
        'Explore how applications use managed cloud services such as storage, databases, messaging, and monitoring.',

      available: false,
    },

    {
      key: 'CONTAINERS_ORCHESTRATION',

      number: '02',

      eyebrow: 'CONTAINERS & ORCHESTRATION',

      title: 'Docker • Kubernetes • OpenShift',

      description:
        'Explore how applications are packaged into containers and how orchestration platforms deploy, scale, and manage them.',

      available: false,
    },

    {
      key: 'CICD_CLOUD_NATIVE',

      number: '03',

      eyebrow: 'CI/CD & CLOUD-NATIVE DEVELOPMENT',

      title: 'Build • Test • Deploy • Health',

      description:
        'Explore automated delivery pipelines and the configuration, health, and observability practices behind cloud-native applications.',

      available: false,
    },
  ];

  /* =========================
   AI
   ========================= */

  readonly aiExperiments: LabExperimentCard[] = [
    {
      key: 'AGENTIC_AI',

      number: '01',

      eyebrow: 'AGENTIC AI / AI ENGINEERING',

      title: 'Planning • Tool Use • MCP • Python',

      description:
        'Explore how an AI agent can receive a goal, plan steps, select tools, observe results, and continue working toward a final outcome.',

      available: false,
    },
  ];

  selectExperiment(experiment: LabExperimentCard): void {
    if (!experiment.available) {
      return;
    }

    this.experimentSelected.emit(experiment.key);
  }

  backToTechnologies(): void {
    this.back.emit();
  }
}
