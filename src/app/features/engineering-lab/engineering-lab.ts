import { Component, inject, signal } from '@angular/core';
import { JavaStreamExperiment } from './experiments/java/data-processing/java-stream-experiment';
import { AtariLabComponent } from './experiments/atari/atari';
import { LabCatalogComponent, LabTechnologyKey } from './lab-catalog/lab-catalog';
import { LabExperimentKey, LabTechnologyComponent } from './lab-technology/lab-technology';
import { HomeComputersLabComponent } from './experiments/home-computers/home-computers';
import { NapsterLabComponent } from './experiments/napster/napster';
import { EarlyWebComponent } from './experiments/early-web/early-web';
import { AngularLabComponent } from './experiments/angular/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-engineering-lab',
  standalone: true,
  imports: [
    JavaStreamExperiment,
    AtariLabComponent,
    HomeComputersLabComponent,
    NapsterLabComponent,
    EarlyWebComponent,
    AngularLabComponent,
    LabCatalogComponent,
    LabTechnologyComponent,
  ],
  templateUrl: './engineering-lab.html',
  styleUrl: './engineering-lab.css',
})
export class EngineeringLabComponent {
  private readonly router = inject(Router);

  readonly experimentDrawerOpen = signal<boolean>(false);

  readonly labGuideOpen = signal<boolean>(false);

  readonly selectedLab = signal<
    'PERSONAL_TECHNOLOGY' | 'WEB' | 'JAVA' | 'CLOUD_DEVOPS' | 'AI' | null
  >(null);

  readonly activeExperiment = signal<
    'JAVA_STREAM' | 'ATARI' | 'HOME_COMPUTERS' | 'NAPSTER' | 'EARLY_WEB' | 'ANGULAR' | null
  >(null);
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

  backFromPersonalTechnologyExperiment(): void {
    this.activeExperiment.set(null);
    this.selectedLab.set('PERSONAL_TECHNOLOGY');
  }

  backFromWebExperiment(): void {
    this.activeExperiment.set(null);
    this.selectedLab.set('WEB');
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

      case 'HOME_COMPUTERS':
        this.activeExperiment.set('HOME_COMPUTERS');

        break;

      case 'NAPSTER':
        this.activeExperiment.set('NAPSTER');

        break;

      case 'EARLY_WEB':
        this.activeExperiment.set('EARLY_WEB');

        break;

      case 'ANGULAR':
        this.activeExperiment.set('ANGULAR');

        break;
    }
  }

  returnToMuseum(): void {
    this.router.navigateByUrl('/');
  }

  toggleLabGuide(): void {
    this.labGuideOpen.update((open) => !open);
  }
}
