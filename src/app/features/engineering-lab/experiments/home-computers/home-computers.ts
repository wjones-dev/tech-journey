import {
  Component,
  DestroyRef,
  inject,
  output,
  signal
} from '@angular/core';


type ComputerAction =
  | 'TYPE'
  | 'LOAD'
  | 'SAVE';


type ComputerStageId =
  | 'INPUT'
  | 'OS'
  | 'MEMORY'
  | 'CPU'
  | 'STORAGE'
  | 'DISPLAY';


interface ComputerStage {
  id: ComputerStageId;
  label: string;
  description: string;
}


interface EngineeringComponent {
  id: string;
  label: string;
  description: string;
}


interface ComputerActionOption {
  id: ComputerAction;
  label: string;
  description: string;
}


@Component({
  selector: 'app-home-computers-lab',
  standalone: true,
  templateUrl: './home-computers.html',
  styleUrl: './home-computers.css'
})
export class HomeComputersLabComponent {

  readonly back = output<void>();


  private readonly destroyRef =
    inject(DestroyRef);


  private destroyed = false;


  /*
   * PLAY
   */
  readonly selectedAction =
    signal<ComputerAction>('TYPE');


  readonly simulationRunning =
    signal(false);


  readonly activeStage =
    signal<ComputerStageId | null>(null);


  readonly operationCount =
    signal(0);


  readonly screenMessage =
    signal(
      'READY\n\nSelect an action and run the computer.'
    );


  /*
   * ENGINEER
   */
  readonly engineerExpanded =
    signal(false);


  readonly selectedEngineeringComponent =
    signal<EngineeringComponent | null>(null);


  readonly actions: ComputerActionOption[] = [

    {
      id: 'TYPE',
      label: 'TYPE COMMAND',
      description:
        'Send keyboard input through the computer and display the result.'
    },

    {
      id: 'LOAD',
      label: 'LOAD PROGRAM',
      description:
        'Retrieve a program from storage and prepare it for execution.'
    },

    {
      id: 'SAVE',
      label: 'SAVE FILE',
      description:
        'Move information from working memory into persistent storage.'
    }
  ];


  readonly architectureStages: ComputerStage[] = [

    {
      id: 'INPUT',
      label: 'Keyboard Input',
      description:
        'The user creates input through the keyboard or another connected device.'
    },

    {
      id: 'OS',
      label: 'Operating System',
      description:
        'System software interprets the request and coordinates the hardware needed to perform it.'
    },

    {
      id: 'MEMORY',
      label: 'RAM',
      description:
        'Working data and program instructions are temporarily held in memory while the computer is operating.'
    },

    {
      id: 'CPU',
      label: 'CPU',
      description:
        'The processor executes instructions and coordinates the work required by the current operation.'
    },

    {
      id: 'STORAGE',
      label: 'Storage',
      description:
        'Programs and files can be loaded from or written to persistent media such as disks.'
    },

    {
      id: 'DISPLAY',
      label: 'Display',
      description:
        'The result is presented back to the user through the computer display.'
    }
  ];


  readonly engineeringComponents: EngineeringComponent[] = [

    {
      id: 'cpu',
      label: 'CPU',
      description:
        'Executes instructions and coordinates the movement of data through the computer. Early home computers had dramatically less processing power than modern machines.'
    },

    {
      id: 'memory',
      label: 'RAM',
      description:
        'Provides temporary working space for programs and data. Early systems often measured memory in kilobytes rather than gigabytes.'
    },

    {
      id: 'storage',
      label: 'Storage',
      description:
        'Stores programs and files after power is removed. Home computers evolved from cassette tapes and floppy disks to hard drives and modern solid-state storage.'
    },

    {
      id: 'os',
      label: 'Operating System',
      description:
        'Provides the software layer that coordinates hardware, programs, files, input devices and the user interface.'
    },

    {
      id: 'input',
      label: 'Input',
      description:
        'Keyboards, mice and other devices translate physical user actions into signals the computer can process.'
    },

    {
      id: 'display',
      label: 'Display',
      description:
        'Turns processed information into something visible to the user, evolving from simple CRT output to modern high-resolution displays.'
    }
  ];


  constructor() {

    this.destroyRef.onDestroy(() => {

      this.destroyed = true;

    });

  }


  selectAction(
    action: ComputerAction
  ): void {

    if (this.simulationRunning()) {
      return;
    }

    this.selectedAction.set(
      action
    );

  }


  async runComputer(): Promise<void> {

    if (this.simulationRunning()) {
      return;
    }


    this.simulationRunning.set(
      true
    );


    this.activeStage.set(
      null
    );


    this.screenMessage.set(
      'PROCESSING...'
    );


    for (
      const stage
      of this.architectureStages
    ) {

      if (this.destroyed) {
        return;
      }


      this.activeStage.set(
        stage.id
      );


      /*
       * Update the computer display near the end
       * of the simulated system path.
       */
      if (
        stage.id === 'DISPLAY'
      ) {

        this.updateScreen();

      }


      await this.wait(
        420
      );

    }


    if (this.destroyed) {
      return;
    }


    this.operationCount.update(
      count => count + 1
    );


    this.activeStage.set(
      null
    );


    this.simulationRunning.set(
      false
    );

  }


  private updateScreen(): void {

    switch (
      this.selectedAction()
    ) {

      case 'TYPE':

        this.screenMessage.set(
          'C:\\> HELLO\n\nHELLO FROM THE HOME COMPUTER'
        );

        break;


      case 'LOAD':

        this.screenMessage.set(
          'LOADING PROGRAM...\n\nPROGRAM READY'
        );

        break;


      case 'SAVE':

        this.screenMessage.set(
          'SAVING FILE...\n\nFILE SAVED SUCCESSFULLY'
        );

        break;

    }

  }


  toggleEngineer(): void {

    this.engineerExpanded.update(
      expanded => !expanded
    );


    if (
      this.engineerExpanded()
      && !this.selectedEngineeringComponent()
    ) {

      this.selectedEngineeringComponent.set(
        this.engineeringComponents[0]
      );

    }

  }


  selectEngineeringComponent(
    component: EngineeringComponent
  ): void {

    this.selectedEngineeringComponent.set(
      component
    );

  }


  isStageActive(
    stageId: ComputerStageId
  ): boolean {

    return (
      this.activeStage()
      === stageId
    );

  }


  backToExperiments(): void {

    this.back.emit();

  }


  private wait(
    milliseconds: number
  ): Promise<void> {

    return new Promise(
      resolve => {

        setTimeout(
          resolve,
          milliseconds
        );

      }
    );

  }

}