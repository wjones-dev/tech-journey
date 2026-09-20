import { Component, signal } from '@angular/core';
import { JavaStreamExperiment } from './experiments/java/data-processing/java-stream-experiment';
import { AtariLabComponent } from './experiments/atari/atari';
import { LabCatalogComponent, LabTechnologyKey } from './lab-catalog/lab-catalog';
import { LabExperimentKey, LabTechnologyComponent } from './lab-technology/lab-technology';

@Component({
  selector: 'app-engineering-lab',
  standalone: true,
  imports: [JavaStreamExperiment, AtariLabComponent, LabCatalogComponent, LabTechnologyComponent],
  templateUrl: './engineering-lab.html',
  styleUrl: './engineering-lab.css',
})
export class EngineeringLabComponent {
  readonly experimentDrawerOpen = signal<boolean>(false);

  readonly labGuideOpen = signal<boolean>(false);

  readonly selectedLab = signal<
    'PERSONAL_TECHNOLOGY' | 'WEB' | 'JAVA' | 'CLOUD_DEVOPS' | 'AI' | null
  >(null);

  readonly activeExperiment = signal<'JAVA_STREAM' | 'ATARI' | null>(null);
  toggleExperimentDrawer(): void {
    const opening = !this.experimentDrawerOpen();
    this.experimentDrawerOpen.set(opening);
    if (!opening) {
      this.selectedLab.set(null);
      this.activeExperiment.set(null);
      this.labGuideOpen.set(false);
    }
  }

  backToLabCategories(): void {
    this.selectedLab.set(null);
    this.activeExperiment.set(null);
  }

  backFromJavaExperiment(): void {
    this.activeExperiment.set(null);
    this.selectedLab.set('JAVA');
  }

  backFromAtariExperiment(): void {
    this.activeExperiment.set(null);

    this.selectedLab.set('PERSONAL_TECHNOLOGY');
  }

  closeExperimentDrawer(): void {
    this.experimentDrawerOpen.set(false);

    this.selectedLab.set(null);

    this.activeExperiment.set(null);

    this.labGuideOpen.set(false);
  }

  onTechnologySelected(technology: LabTechnologyKey): void {
    this.labGuideOpen.set(false);

    switch (technology) {
      case 'PERSONAL_TECHNOLOGY':
        this.selectedLab.set('PERSONAL_TECHNOLOGY');

        this.activeExperiment.set(null);

        break;

      case 'WEB':
        this.selectedLab.set('WEB');

        this.activeExperiment.set(null);

        break;

      case 'JAVA':
        this.selectedLab.set('JAVA');

        this.activeExperiment.set(null);

        break;

      case 'CLOUD_DEVOPS':
        this.selectedLab.set('CLOUD_DEVOPS');

        this.activeExperiment.set(null);

        break;

      case 'AI':
        this.selectedLab.set('AI');

        this.activeExperiment.set(null);

        break;
    }
  }

  onExperimentSelected(experiment: LabExperimentKey): void {
    this.labGuideOpen.set(false);

    switch (experiment) {
      case 'JAVA_STREAM':
        this.activeExperiment.set('JAVA_STREAM');

        break;

      case 'ATARI':
        this.activeExperiment.set('ATARI');

        break;
    }
  }

  toggleLabGuide(): void {
    this.labGuideOpen.update((open) => !open);
  }
}
