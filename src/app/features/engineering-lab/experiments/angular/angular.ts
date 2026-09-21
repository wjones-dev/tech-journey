import {
  Component,
  computed,
  output,
  signal
} from '@angular/core';


type AngularScenario =
  | 'REACTIVE_STATE'
  | 'COMPONENT_COMMUNICATION';


type TechnologyKey =
  | 'ANGULAR'
  | 'JAVA'
  | 'DOCKER'
  | 'AI';


type DisplayMode =
  | 'CARD'
  | 'DETAILS';


type CodeTab =
  | 'COMPONENT'
  | 'TEMPLATE'
  | 'COMMUNICATION';


interface TechnologyDemo {
  name: string;

  category: string;

  description: string;

  concepts: string[];
}


@Component({
  selector: 'app-angular-lab',
  standalone: true,
  imports: [],
  templateUrl: './angular.html',
  styleUrl: './angular.css'
})
export class AngularLabComponent {

  readonly back =
    output<void>();


  /* =========================================================
     EXPERIMENT SCENARIO
     ========================================================= */

  readonly activeScenario =
    signal<AngularScenario>(
      'REACTIVE_STATE'
    );


  /* =========================================================
     REACTIVE STATE
     ========================================================= */

  readonly selectedTechnology =
    signal<TechnologyKey>(
      'ANGULAR'
    );


  readonly showConcepts =
    signal<boolean>(
      true
    );


  readonly displayMode =
    signal<DisplayMode>(
      'CARD'
    );


  /*
   * Used to show the most recent user action
   * in the UNDERSTAND section.
   */
  readonly lastAction =
    signal<string>(
      'Experiment ready'
    );


  /* =========================================================
     COMPONENT COMMUNICATION
     ========================================================= */

  readonly childSelection =
    signal<string>(
      'No event emitted yet'
    );


  readonly parentMessage =
    signal<string>(
      'Waiting for child component'
    );


  readonly childInputValue =
    signal<string>(
      'ANGULAR'
    );


  /* =========================================================
     ENGINEER
     ========================================================= */

  readonly implementationOpen =
    signal<boolean>(
      false
    );


  readonly activeCodeTab =
    signal<CodeTab>(
      'COMPONENT'
    );


  /* =========================================================
     DATA
     ========================================================= */

  private readonly technologyData:
    Record<TechnologyKey, TechnologyDemo> = {

      ANGULAR: {
        name: 'Angular',
        category: 'Frontend Framework',
        description:
          'A component-based framework for building reactive web applications with TypeScript.',
        concepts: [
          'Components',
          'Templates',
          'Signals',
          'Routing'
        ]
      },


      JAVA: {
        name: 'Java',
        category: 'Programming Language',
        description:
          'A strongly typed language commonly used for backend applications and enterprise systems.',
        concepts: [
          'Objects',
          'Collections',
          'Streams',
          'Spring'
        ]
      },


      DOCKER: {
        name: 'Docker',
        category: 'Container Platform',
        description:
          'Packages applications and their dependencies into portable containers.',
        concepts: [
          'Images',
          'Containers',
          'Dockerfiles',
          'Networks'
        ]
      },


      AI: {
        name: 'AI Engineering',
        category: 'Intelligent Systems',
        description:
          'Builds applications that use models, tools, workflows, and agentic behavior.',
        concepts: [
          'Models',
          'Tools',
          'Agents',
          'MCP'
        ]
      }
    };


  readonly currentTechnology =
    computed<TechnologyDemo>(
      () =>
        this.technologyData[
          this.selectedTechnology()
        ]
    );


  /* =========================================================
     DYNAMIC IMPLEMENTATION
     ========================================================= */

  readonly componentCode =
    computed(() => {

      return `import {
  Component,
  signal
} from '@angular/core';

@Component({
  selector: 'app-technology-demo',
  standalone: true,
  templateUrl: './technology-demo.html'
})
export class TechnologyDemoComponent {

  readonly selectedTechnology =
    signal('${this.selectedTechnology()}');

  readonly showConcepts =
    signal(${this.showConcepts()});

  readonly displayMode =
    signal<'CARD' | 'DETAILS'>(
      '${this.displayMode()}'
    );


  selectTechnology(
    technology: string
  ): void {

    this.selectedTechnology.set(
      technology
    );
  }


  toggleConcepts(): void {

    this.showConcepts.update(
      visible => !visible
    );
  }
}`;
    });


  readonly templateCode =
    computed(() => {

      return `<button
  type="button"
  (click)="selectTechnology('ANGULAR')"
>
  Angular
</button>


<h2>
  {{ selectedTechnology() }}
</h2>


@if (showConcepts()) {

  <ul>

    @for (
      concept of concepts;
      track concept
    ) {

      <li>
        {{ concept }}
      </li>

    }

  </ul>

}`;
    });


  readonly communicationCode =
    computed(() => {

      return `// CHILD COMPONENT

readonly technologySelected =
  output<string>();

selectAngular(): void {

  this.technologySelected.emit(
    'ANGULAR'
  );
}


// PARENT TEMPLATE

<app-technology-selector
  (technologySelected)="
    handleTechnologySelected($event)
  "
/>

<app-technology-card
  [technology]="selectedTechnology()"
/>


// PARENT COMPONENT

readonly selectedTechnology =
  signal('ANGULAR');

handleTechnologySelected(
  technology: string
): void {

  this.selectedTechnology.set(
    technology
  );
}


// CHILD INPUT

readonly technology =
  input.required<string>();`;
    });


  /* =========================================================
     PLAY ACTIONS
     ========================================================= */

  selectScenario(
    scenario: AngularScenario
  ): void {

    this.activeScenario.set(
      scenario
    );

    this.lastAction.set(
      scenario === 'REACTIVE_STATE'
        ? 'Reactive state scenario selected'
        : 'Component communication scenario selected'
    );
  }


  selectTechnology(
    technology: TechnologyKey
  ): void {

    this.selectedTechnology.set(
      technology
    );

    this.lastAction.set(
      `selectedTechnology.set('${technology}')`
    );
  }


  toggleConcepts(): void {

    this.showConcepts.update(
      visible => !visible
    );

    this.lastAction.set(
      `showConcepts.set(${this.showConcepts()})`
    );
  }


  setDisplayMode(
    mode: DisplayMode
  ): void {

    this.displayMode.set(
      mode
    );

    this.lastAction.set(
      `displayMode.set('${mode}')`
    );
  }


  runComponentCommunication(): void {

    /*
     * Step 1:
     * Child emits an output event.
     */
    this.childSelection.set(
      'ANGULAR'
    );


    /*
     * Step 2:
     * Parent receives the event
     * and updates its own state.
     */
    this.parentMessage.set(
      'Parent received ANGULAR'
    );


    /*
     * Step 3:
     * Parent passes the new state
     * back to another child through input().
     */
    this.childInputValue.set(
      'ANGULAR'
    );


    this.lastAction.set(
      'Child output → Parent signal → Child input'
    );
  }


  resetCommunication(): void {

    this.childSelection.set(
      'No event emitted yet'
    );

    this.parentMessage.set(
      'Waiting for child component'
    );

    this.childInputValue.set(
      'ANGULAR'
    );

    this.lastAction.set(
      'Component communication reset'
    );
  }


  /* =========================================================
     ENGINEER
     ========================================================= */

  toggleImplementation(): void {

    this.implementationOpen.update(
      open => !open
    );
  }


  selectCodeTab(
    tab: CodeTab
  ): void {

    this.activeCodeTab.set(
      tab
    );
  }


  /* =========================================================
     RESET / NAVIGATION
     ========================================================= */

  resetExperiment(): void {

    this.activeScenario.set(
      'REACTIVE_STATE'
    );

    this.selectedTechnology.set(
      'ANGULAR'
    );

    this.showConcepts.set(
      true
    );

    this.displayMode.set(
      'CARD'
    );

    this.childSelection.set(
      'No event emitted yet'
    );

    this.parentMessage.set(
      'Waiting for child component'
    );

    this.childInputValue.set(
      'ANGULAR'
    );

    this.lastAction.set(
      'Experiment ready'
    );

    this.activeCodeTab.set(
      'COMPONENT'
    );
  }


  backToExperiments(): void {

    this.back.emit();
  }
}