import {
  Component,
  DestroyRef,
  inject,
  output,
  signal
} from '@angular/core';


type NapsterTrackId =
  | 'DIGITAL_HORIZON'
  | 'MIDNIGHT_CONNECTION'
  | 'PIXEL_DREAMS';


type ConnectionSpeed =
  | 'MODEM'
  | 'DSL'
  | 'CABLE';


type NapsterStageId =
  | 'SEARCH'
  | 'DIRECTORY'
  | 'PEER'
  | 'CONNECTION'
  | 'TRANSFER'
  | 'LIBRARY';


interface NapsterTrack {
  id: NapsterTrackId;
  title: string;
  size: string;
}


interface ConnectionOption {
  id: ConnectionSpeed;
  label: string;
  description: string;
}


interface NapsterStage {
  id: NapsterStageId;
  label: string;
  description: string;
}


interface EngineeringComponent {
  id: string;
  label: string;
  description: string;
}


@Component({
  selector: 'app-napster-lab',
  standalone: true,
  templateUrl: './napster.html',
  styleUrl: './napster.css'
})
export class NapsterLabComponent {

  readonly back =
    output<void>();


  private readonly destroyRef =
    inject(DestroyRef);


  private destroyed = false;


  /*
   * PLAY
   */
  readonly selectedTrack =
    signal<NapsterTrackId>('DIGITAL_HORIZON');


  readonly selectedConnection =
    signal<ConnectionSpeed>('MODEM');


  readonly simulationRunning =
    signal(false);


  readonly activeStage =
    signal<NapsterStageId | null>(null);


  readonly transferProgress =
    signal(0);


  readonly downloadCount =
    signal(0);


  readonly statusMessage =
    signal('READY TO SEARCH');


  /*
   * ENGINEER
   */
  readonly engineerExpanded =
    signal(false);


  readonly selectedEngineeringComponent =
    signal<EngineeringComponent | null>(null);


  readonly tracks: NapsterTrack[] = [

    {
      id: 'DIGITAL_HORIZON',
      title: 'Digital Horizon.mp3',
      size: '3.8 MB'
    },

    {
      id: 'MIDNIGHT_CONNECTION',
      title: 'Midnight Connection.mp3',
      size: '4.6 MB'
    },

    {
      id: 'PIXEL_DREAMS',
      title: 'Pixel Dreams.mp3',
      size: '3.2 MB'
    }
  ];


  readonly connectionOptions: ConnectionOption[] = [

    {
      id: 'MODEM',
      label: '56K MODEM',
      description:
        'Typical dial-up connection from the early file-sharing era.'
    },

    {
      id: 'DSL',
      label: 'EARLY DSL',
      description:
        'Faster always-on broadband beginning to reach home users.'
    },

    {
      id: 'CABLE',
      label: 'CABLE',
      description:
        'Higher bandwidth dramatically reduces transfer time.'
    }
  ];


  /*
   * Napster used a hybrid architecture.
   *
   * Search and discovery depended on centralized directory
   * servers, while the actual music file moved directly
   * between users.
   */
  readonly architectureStages: NapsterStage[] = [

    {
      id: 'SEARCH',
      label: 'Search',
      description:
        'The user searches for a song using the Napster client.'
    },

    {
      id: 'DIRECTORY',
      label: 'Directory Server',
      description:
        'A centralized service knows which connected users are sharing matching files.'
    },

    {
      id: 'PEER',
      label: 'Peer Match',
      description:
        'The system identifies another user who currently has the requested file available.'
    },

    {
      id: 'CONNECTION',
      label: 'Peer Connection',
      description:
        'The two computers establish a direct network connection for the file transfer.'
    },

    {
      id: 'TRANSFER',
      label: 'File Transfer',
      description:
        'The MP3 travels directly from the remote user to the requesting computer.'
    },

    {
      id: 'LIBRARY',
      label: 'Local Library',
      description:
        'The completed MP3 is stored locally and becomes part of the user’s music collection.'
    }
  ];


  readonly engineeringComponents: EngineeringComponent[] = [

    {
      id: 'directory',
      label: 'Directory Server',
      description:
        'Napster relied on centralized servers to maintain information about connected users and the music files they were sharing. This made searching fast but also created a central dependency.'
    },

    {
      id: 'peer',
      label: 'Peer-to-Peer Transfer',
      description:
        'After discovery, the actual MP3 did not need to pass through the central directory server. One user’s computer could send the file directly to another user.'
    },

    {
      id: 'network',
      label: 'TCP/IP Network',
      description:
        'Internet networking allowed computers in different homes to establish connections and move digital files between one another.'
    },

    {
      id: 'mp3',
      label: 'MP3 Compression',
      description:
        'MP3 compression made digital music files dramatically smaller than uncompressed audio, making Internet distribution much more practical.'
    },

    {
      id: 'bandwidth',
      label: 'Bandwidth',
      description:
        'Transfer speed depended heavily on both users’ Internet connections. A few megabytes could take many minutes over dial-up.'
    },

    {
      id: 'storage',
      label: 'Local Storage',
      description:
        'Downloaded songs were stored on the user’s own hard drive, creating local digital music libraries rather than relying on continuous streaming.'
    }
  ];


  constructor() {

    this.destroyRef.onDestroy(() => {

      this.destroyed = true;

    });

  }


  selectTrack(
    track: NapsterTrackId
  ): void {

    if (this.simulationRunning()) {
      return;
    }

    this.selectedTrack.set(
      track
    );

  }


  selectConnection(
    connection: ConnectionSpeed
  ): void {

    if (this.simulationRunning()) {
      return;
    }

    this.selectedConnection.set(
      connection
    );

  }


  async runTransfer(): Promise<void> {

    if (this.simulationRunning()) {
      return;
    }


    this.simulationRunning.set(true);

    this.transferProgress.set(0);

    this.activeStage.set(null);

    this.statusMessage.set(
      'SEARCHING NETWORK'
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


      this.updateStatusForStage(
        stage.id
      );


      if (
        stage.id === 'TRANSFER'
      ) {

        await this.simulateTransfer();

      } else {

        await this.wait(
          480
        );

      }

    }


    if (this.destroyed) {
      return;
    }


    this.downloadCount.update(
      count => count + 1
    );


    this.statusMessage.set(
      'DOWNLOAD COMPLETE'
    );


    this.activeStage.set(null);

    this.simulationRunning.set(false);

  }


  private updateStatusForStage(
    stage: NapsterStageId
  ): void {

    switch (stage) {

      case 'SEARCH':

        this.statusMessage.set(
          'SEARCHING NETWORK'
        );

        break;


      case 'DIRECTORY':

        this.statusMessage.set(
          'QUERYING DIRECTORY'
        );

        break;


      case 'PEER':

        this.statusMessage.set(
          'PEER FOUND'
        );

        break;


      case 'CONNECTION':

        this.statusMessage.set(
          'CONNECTING TO PEER'
        );

        break;


      case 'TRANSFER':

        this.statusMessage.set(
          'DOWNLOADING MP3'
        );

        break;


      case 'LIBRARY':

        this.statusMessage.set(
          'ADDING TO LIBRARY'
        );

        break;

    }

  }


  private async simulateTransfer(): Promise<void> {

    const delay =

      this.selectedConnection() === 'MODEM'
        ? 240

        : this.selectedConnection() === 'DSL'
          ? 110

          : 65;


    for (
      let progress = 10;
      progress <= 100;
      progress += 10
    ) {

      if (this.destroyed) {
        return;
      }


      this.transferProgress.set(
        progress
      );


      await this.wait(
        delay
      );

    }

  }


  selectedTrackDetails(): NapsterTrack {

    return (
      this.tracks.find(
        track =>
          track.id === this.selectedTrack()
      )
      ?? this.tracks[0]
    );

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
    stageId: NapsterStageId
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