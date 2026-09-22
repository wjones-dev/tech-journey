import { Component, OnDestroy, computed, output, signal } from '@angular/core';

type BootStageKey = 'BUILD' | 'BOOT' | 'SCAN' | 'INJECT' | 'CONFIGURE' | 'RUN';

interface BootStage {
  key: BootStageKey;
  number: string;
  title: string;
  subtitle: string;
  description: string;
}

@Component({
  selector: 'app-lifecycle',
  imports: [],
  templateUrl: './lifecycle.html',
  styleUrl: './lifecycle.css',
})
export class LifecycleComponent implements OnDestroy {
  readonly back = output<void>();

  readonly stages: BootStage[] = [
    {
      key: 'BUILD',
      number: '01',
      title: 'BUILD',
      subtitle: 'Maven prepares the application',
      description:
        'Maven resolves dependencies, compiles the Java source, runs tests, and packages the application.',
    },
    {
      key: 'BOOT',
      number: '02',
      title: 'BOOT',
      subtitle: 'Spring Boot starts',
      description:
        'The JVM runs the application entry point and SpringApplication creates the Spring application context.',
    },
    {
      key: 'SCAN',
      number: '03',
      title: 'SCAN',
      subtitle: 'Components are discovered',
      description:
        'Spring scans the application packages and discovers controllers, services, components, and other managed types.',
    },
    {
      key: 'INJECT',
      number: '04',
      title: 'INJECT',
      subtitle: 'Beans are created and connected',
      description:
        'Spring creates managed objects and supplies the dependencies they require through dependency injection.',
    },
    {
      key: 'CONFIGURE',
      number: '05',
      title: 'CONFIGURE',
      subtitle: 'Spring Boot applies configuration',
      description:
        'Spring Boot examines the classpath, application configuration, and available beans to configure common infrastructure.',
    },
    {
      key: 'RUN',
      number: '06',
      title: 'RUN',
      subtitle: 'The web application becomes available',
      description:
        'The embedded web server starts, Spring MVC is ready, and the Tech Journey API can receive HTTP requests.',
    },
  ];

  readonly bootStarted = signal<boolean>(false);

  readonly bootComplete = signal<boolean>(false);

  readonly currentStageIndex = signal<number>(-1);

  readonly completedStageIndexes = signal<Set<number>>(new Set());

  readonly implementationOpen = signal<boolean>(false);

  private timers: ReturnType<typeof setTimeout>[] = [];

  readonly currentStage = computed<BootStage | null>(() => {
    const index = this.currentStageIndex();

    if (index < 0 || index >= this.stages.length) {
      return null;
    }

    return this.stages[index];
  });

  startBoot(): void {
    this.clearTimers();

    this.bootStarted.set(true);
    this.bootComplete.set(false);
    this.implementationOpen.set(false);

    this.currentStageIndex.set(-1);

    this.completedStageIndexes.set(new Set());

    this.stages.forEach((_, index) => {
      const timer = setTimeout(
        () => {
          this.currentStageIndex.set(index);

          if (index > 0) {
            this.completedStageIndexes.update((completed) => {
              const next = new Set(completed);

              next.add(index - 1);

              return next;
            });
          }

          if (index === this.stages.length - 1) {
            const completionTimer = setTimeout(() => {
              this.completedStageIndexes.update((completed) => {
                const next = new Set(completed);

                next.add(index);

                return next;
              });

              this.bootComplete.set(true);
            }, 2200);

            this.timers.push(completionTimer);
          }
        },
        700 + index * 2800,
      );

      this.timers.push(timer);
    });
  }

  restartBoot(): void {
    this.startBoot();
  }

  toggleImplementation(): void {
    this.implementationOpen.update((open) => !open);
  }

  isStageActive(index: number): boolean {
    return this.currentStageIndex() === index && !this.bootComplete();
  }

  isStageComplete(index: number): boolean {
    return this.completedStageIndexes().has(index);
  }

  ngOnDestroy(): void {
    this.clearTimers();
  }

  private clearTimers(): void {
    this.timers.forEach((timer) => clearTimeout(timer));

    this.timers = [];
  }

  backToExperiments(): void {
    this.back.emit();
  }
}
