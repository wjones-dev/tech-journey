import {
  Component,
  DestroyRef,
  inject,
  output,
  signal
} from '@angular/core';


type AtariDirection =
  | 'LEFT'
  | 'RIGHT';


type AtariSpeed =
  | 'SLOW'
  | 'NORMAL'
  | 'FAST';


type AtariStageId =
  | 'JOYSTICK'
  | 'CPU'
  | 'CARTRIDGE'
  | 'GRAPHICS'
  | 'SCANLINE'
  | 'TELEVISION';


interface AtariStage {
  id: AtariStageId;
  label: string;
  description: string;
}


interface EngineeringComponent {
  id: string;
  label: string;
  description: string;
}


interface PlayerColorOption {
  label: string;
  value: string;
}


@Component({
  selector: 'app-atari-lab',
  standalone: true,
  templateUrl: './atari.html',
  styleUrl: './atari.css'

  
})
export class AtariLabComponent {

  private readonly destroyRef =
    inject(DestroyRef);


  private destroyed = false;


  /*
   * PLAY
   *
   * These signals represent the small set of controls
   * available to the user.
   *
   * Nothing here requires a backend request.
   */
  readonly selectedDirection =
    signal<AtariDirection>('RIGHT');


  readonly selectedSpeed =
    signal<AtariSpeed>('NORMAL');


  readonly playerColor =
    signal('#62e8ff');


  readonly playerPosition =
    signal(42);


  readonly simulationRunning =
    signal(false);


  readonly frameCount =
    signal(0);


  /*
   * UNDERSTAND
   *
   * The currently active hardware/system stage.
   */
  readonly activeStage =
    signal<AtariStageId | null>(null);


  /*
   * ENGINEER
   */
  readonly engineerExpanded =
    signal(false);


  readonly selectedEngineeringComponent =
    signal<EngineeringComponent | null>(null);

    readonly back = output<void>();


  readonly speeds: AtariSpeed[] = [
    'SLOW',
    'NORMAL',
    'FAST'
  ];


  readonly colorOptions: PlayerColorOption[] = [

    {
      label: 'Cyan',
      value: '#62e8ff'
    },

    {
      label: 'Gold',
      value: '#ffd166'
    },

    {
      label: 'Green',
      value: '#80ed99'
    },

    {
      label: 'Rose',
      value: '#ff7b9c'
    }
  ];


  /*
   * Simplified hardware pipeline.
   *
   * This intentionally teaches the idea rather than
   * attempting to reproduce Atari hardware cycle-for-cycle.
   */
  readonly architectureStages: AtariStage[] = [

    {
      id: 'JOYSTICK',
      label: 'Joystick Input',
      description:
        'The controller provides the player movement requested for the next frame.'
    },

    {
      id: 'CPU',
      label: 'CPU',
      description:
        'The processor interprets the game instructions and coordinates what should happen next.'
    },

    {
      id: 'CARTRIDGE',
      label: 'Cartridge',
      description:
        'Program instructions and game data are supplied by the cartridge.'
    },

    {
      id: 'GRAPHICS',
      label: 'Graphics / Video',
      description:
        'Video hardware determines where the player and playfield should appear.'
    },

    {
      id: 'SCANLINE',
      label: 'Scanline Output',
      description:
        'The picture is produced as timed video information sent toward the television.'
    },

    {
      id: 'TELEVISION',
      label: 'Television',
      description:
        'The generated video signal becomes the image visible to the player.'
    }
  ];


  readonly engineeringComponents: EngineeringComponent[] = [

    {
      id: 'cpu',
      label: 'CPU',
      description:
        'Executes game logic and coordinates the extremely timing-sensitive work required to build each frame.'
    },

    {
      id: 'memory',
      label: 'Memory',
      description:
        'Early systems operated with tiny amounts of working memory, forcing developers to be extremely economical with data.'
    },

    {
      id: 'cartridge',
      label: 'Cartridge',
      description:
        'Stores the game program and data. The console reads those instructions to determine how the game behaves.'
    },

    {
      id: 'graphics',
      label: 'Graphics / Video',
      description:
        'Generates simple players, playfield elements and colors while remaining tightly synchronized with the television signal.'
    },

    {
      id: 'joystick',
      label: 'Joystick',
      description:
        'Turns physical player actions into simple directional and button input the game software can react to.'
    },

    {
      id: 'display',
      label: 'Display',
      description:
        'A CRT television receives the generated video signal and displays the game one scanline at a time.'
    }
  ];


  constructor() {

    this.destroyRef.onDestroy(() => {

      this.destroyed = true;

    });

  }


  /*
   * Select which direction the joystick should report.
   *
   * The player does not move immediately.
   * The movement is applied when RUN FRAME is pressed,
   * allowing the user to watch the entire processing path.
   */
  selectDirection(
    direction: AtariDirection
  ): void {

    if (this.simulationRunning()) {
      return;
    }

    this.selectedDirection.set(
      direction
    );

  }


  selectSpeed(
    speed: AtariSpeed
  ): void {

    if (this.simulationRunning()) {
      return;
    }

    this.selectedSpeed.set(
      speed
    );

  }


  selectColor(
    color: string
  ): void {

    this.playerColor.set(
      color
    );

  }


  /*
   * Runs one simplified Atari-style frame.
   *
   * The architecture stages illuminate one at a time so
   * PLAY directly drives the UNDERSTAND visualization.
   */
  async runFrame(): Promise<void> {

    if (this.simulationRunning()) {
      return;
    }


    this.simulationRunning.set(
      true
    );


    this.activeStage.set(
      null
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
       * Apply the actual visual change when the simulated
       * graphics hardware reaches its part of the pipeline.
       */
      if (
        stage.id === 'GRAPHICS'
      ) {

        this.applyPlayerMovement();

      }


      await this.wait(
        420
      );

    }


    if (this.destroyed) {
      return;
    }


    this.frameCount.update(
      count => count + 1
    );


    this.simulationRunning.set(
      false
    );

  }


  /*
   * Converts the selected speed into a simple amount
   * of movement on our simulated display.
   */
  private applyPlayerMovement(): void {

    const distance =

      this.selectedSpeed() === 'SLOW'
        ? 5

        : this.selectedSpeed() === 'FAST'
          ? 16

          : 10;


    const signedDistance =

      this.selectedDirection() === 'LEFT'
        ? -distance
        : distance;


    const nextPosition =

      this.playerPosition()
      + signedDistance;


    /*
     * Keep the block safely inside the simulated television.
     */
    const boundedPosition =

      Math.min(
        91,
        Math.max(
          5,
          nextPosition
        )
      );


    this.playerPosition.set(
      boundedPosition
    );

  }


  toggleEngineer(): void {

    this.engineerExpanded.update(
      expanded => !expanded
    );


    /*
     * Give the section a sensible default component
     * the first time it opens.
     */
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
    stageId: AtariStageId
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