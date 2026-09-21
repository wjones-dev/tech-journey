import { Component, computed, output, signal } from '@angular/core';

type WebEra =
  | 'EARLY'
  | 'MODERN';

type BackgroundChoice =
  | 'GRAY'
  | 'NAVY'
  | 'BLACK';

type FontChoice =
  | 'SERIF'
  | 'SANS'
  | 'MONO';

type AlignmentChoice =
  | 'LEFT'
  | 'CENTER';

type BorderChoice =
  | 'NONE'
  | 'CLASSIC';

type CodeTab =
  | 'HTML'
  | 'CSS'
  | 'JAVASCRIPT';

@Component({
  selector: 'app-early-web',
  standalone: true,
  imports: [],
  templateUrl: './early-web.html',
  styleUrl: './early-web.css'
})
export class EarlyWebComponent {

  /*
   * Experiment layers.
   *
   * HTML is always present because it provides
   * the structure of the document.
   *
   * CSS and JavaScript can be enabled progressively.
   */
  readonly cssEnabled =
    signal<boolean>(false);

  readonly javascriptEnabled =
    signal<boolean>(false);


  /*
   * Preview configuration.
   */
  readonly webEra =
    signal<WebEra>('EARLY');

  readonly backgroundChoice =
    signal<BackgroundChoice>('GRAY');

  readonly fontChoice =
    signal<FontChoice>('SERIF');

  readonly alignmentChoice =
    signal<AlignmentChoice>('LEFT');

  readonly borderChoice =
    signal<BorderChoice>('CLASSIC');


  /*
   * JavaScript experiment state.
   */
  readonly visitorCount =
    signal<number>(41);

  readonly guestbookMessage =
    signal<string>(
      'Enable JavaScript to make the page interactive.'
    );


  /*
   * ENGINEER section.
   */
  readonly implementationOpen =
    signal<boolean>(false);

  readonly activeCodeTab =
    signal<CodeTab>('HTML');

    readonly back =
  output<void>();


  /*
   * Used by the UNDERSTAND section to explain
   * what is currently happening inside the browser.
   */
  readonly currentStage =
    computed(() => {

      if (this.javascriptEnabled()) {
        return 'HTML + CSS + JAVASCRIPT';
      }

      if (this.cssEnabled()) {
        return 'HTML + CSS';
      }

      return 'HTML';
    });


  /*
   * Dynamic HTML implementation shown in
   * the ENGINEER section.
   */
  readonly htmlCode =
    computed(() => {

      if (this.webEra() === 'MODERN') {

        return `<main class="site">
  <header>
    <h1>My First Web Page</h1>

    <p>
      Exploring how the web works.
    </p>
  </header>

  <section>
    <h2>About Me</h2>

    <p>
      Welcome to my website.
    </p>
  </section>

  <nav>
    <a href="#">Projects</a>
    <a href="#">Links</a>
  </nav>

  <button id="guestbook-button">
    Sign Guestbook
  </button>

  <p id="guestbook-message"></p>
</main>`;
      }

      return `<body>
  <h1>MY FIRST WEB PAGE</h1>

  <p>
    Welcome to my website.
  </p>

  <h2>About Me</h2>

  <p>
    Learning HTML, CSS and JavaScript.
  </p>

  <a href="#">Cool Links</a>

  <br><br>

  <button id="guestbook-button">
    Sign Guestbook
  </button>

  <p id="guestbook-message"></p>
</body>`;
    });


  /*
   * Dynamic CSS implementation.
   *
   * The generated code reflects the controls
   * selected by the visitor.
   */
  readonly cssCode =
    computed(() => {

      if (!this.cssEnabled()) {

        return `/* CSS is currently disabled.

The browser is using its default styles.

Enable CSS to separate presentation
from the HTML document structure.
*/`;
      }


      const background =
        this.backgroundChoice() === 'NAVY'
          ? '#081a35'
          : this.backgroundChoice() === 'BLACK'
            ? '#050505'
            : '#d6d6d6';


      const textColor =
        this.backgroundChoice() === 'GRAY'
          ? '#111111'
          : '#ffffff';


      const fontFamily =
        this.fontChoice() === 'SANS'
          ? 'Arial, sans-serif'
          : this.fontChoice() === 'MONO'
            ? '"Courier New", monospace'
            : '"Times New Roman", serif';


      const textAlign =
        this.alignmentChoice() === 'CENTER'
          ? 'center'
          : 'left';


      const border =
        this.borderChoice() === 'CLASSIC'
          ? '3px ridge #b8b8b8'
          : 'none';


      return `body {
  background: ${background};
  color: ${textColor};

  font-family:
    ${fontFamily};

  text-align: ${textAlign};
}

.site {
  border: ${border};
  padding: 24px;
}

a {
  color: ${
    this.backgroundChoice() === 'GRAY'
      ? '#0000ee'
      : '#70b7ff'
  };
}`;
    });


  /*
   * JavaScript implementation shown in the
   * ENGINEER section.
   */
  readonly javascriptCode =
    computed(() => {

      if (!this.javascriptEnabled()) {

        return `// JavaScript is currently disabled.
//
// HTML provides structure.
// CSS provides presentation.
//
// Enable JavaScript to add behavior.`;
      }

      return `const button =
  document.querySelector(
    '#guestbook-button'
  );

const message =
  document.querySelector(
    '#guestbook-message'
  );

let visitorCount = 41;

button.addEventListener(
  'click',
  () => {

    visitorCount++;

    message.textContent =
      \`Thanks for visiting!

      You are visitor #\${visitorCount}.\`;
  }
);`;
    });


  enableHtml(): void {

    /*
     * HTML is the foundation of the experiment.
     *
     * Returning to HTML disables the layers
     * built on top of it.
     */
    this.cssEnabled.set(false);

    this.javascriptEnabled.set(false);

    this.guestbookMessage.set(
      'Enable JavaScript to make the page interactive.'
    );
  }


  enableCss(): void {

    /*
     * CSS requires the HTML document,
     * so HTML remains available automatically.
     */
    this.cssEnabled.set(true);

    this.javascriptEnabled.set(false);

    this.guestbookMessage.set(
      'Enable JavaScript to make the page interactive.'
    );
  }


  enableJavaScript(): void {

    /*
     * JavaScript represents the third layer,
     * so CSS is enabled automatically.
     */
    this.cssEnabled.set(true);

    this.javascriptEnabled.set(true);

    this.guestbookMessage.set(
      'JavaScript is active. Try signing the guestbook.'
    );
  }


  setWebEra(
    era: WebEra
  ): void {

    this.webEra.set(era);
  }


  setBackground(
    background: BackgroundChoice
  ): void {

    this.backgroundChoice.set(background);
  }


  setFont(
    font: FontChoice
  ): void {

    this.fontChoice.set(font);
  }


  setAlignment(
    alignment: AlignmentChoice
  ): void {

    this.alignmentChoice.set(alignment);
  }


  setBorder(
    border: BorderChoice
  ): void {

    this.borderChoice.set(border);
  }


  signGuestbook(): void {

    if (!this.javascriptEnabled()) {

      this.guestbookMessage.set(
        'Nothing happened because JavaScript is disabled.'
      );

      return;
    }


    this.visitorCount.update(
      count => count + 1
    );


    this.guestbookMessage.set(
      `Thanks for visiting! You are visitor #${this.visitorCount()}.`
    );
  }


  toggleImplementation(): void {

    this.implementationOpen.update(
      open => !open
    );
  }


  selectCodeTab(
    tab: CodeTab
  ): void {

    this.activeCodeTab.set(tab);
  }


  resetExperiment(): void {

    this.cssEnabled.set(false);

    this.javascriptEnabled.set(false);

    this.webEra.set('EARLY');

    this.backgroundChoice.set('GRAY');

    this.fontChoice.set('SERIF');

    this.alignmentChoice.set('LEFT');

    this.borderChoice.set('CLASSIC');

    this.visitorCount.set(41);

    this.guestbookMessage.set(
      'Enable JavaScript to make the page interactive.'
    );

    this.activeCodeTab.set('HTML');
  }

  backToExperiments(): void {
  this.back.emit();
}
}