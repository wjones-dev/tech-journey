import { Component, OnInit, inject, output, signal } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';
import {
  SecurityLabApiService,
  SecuritySessionResponse,
} from '../../../../../core/services/security-lab-api.service';

@Component({
  selector: 'app-security',

  imports: [],

  templateUrl: './security.html',

  styleUrl: './security.css',
})
export class SecurityComponent implements OnInit {
  private readonly securityApi = inject(SecurityLabApiService);

  /*
   * =========================
   * LOGIN FORM
   * =========================
   */

  readonly username = signal<string>('demo-user');

  readonly password = signal<string>('demo123');

  /*
   * =========================
   * SESSION STATE
   * =========================
   */

  readonly authenticated = signal<boolean>(false);

  readonly authenticatedUsername = signal<string | null>(null);

  readonly roles = signal<string[]>([]);

  /*
   * =========================
   * REQUEST STATE
   * =========================
   */

  readonly loading = signal<boolean>(false);

  readonly lastAction = signal<string | null>(null);

  readonly lastStatus = signal<number | null>(null);

  readonly lastMessage = signal<string | null>(null);

  readonly back = output<void>();

  readonly showPassword = signal<boolean>(false);

  /*
   * This will later help drive the
   * UNDERSTAND security pipeline.
   */
  readonly lastOutcome = signal<'SUCCESS' | 'UNAUTHORIZED' | 'FORBIDDEN' | null>(null);

  ngOnInit(): void {
    this.loadSession();
  }

  /*
   * =========================
   * DEMO CREDENTIAL HELPERS
   * =========================
   */

  useDemoUser(): void {
    this.username.set('demo-user');

    this.password.set('demo123');
  }

  useDemoAdmin(): void {
    this.username.set('demo-admin');

    this.password.set('admin123');
  }

  /*
   * =========================
   * SESSION
   * =========================
   */

  loadSession(): void {
    this.securityApi.session().subscribe({
      next: (response: SecuritySessionResponse) => {
        this.applySession(response);
      },

      error: () => {
        this.clearSession();
      },
    });
  }

  /*
   * =========================
   * LOGIN
   * =========================
   */

  login(): void {
    this.loading.set(true);

    this.clearResult();

    this.lastAction.set('LOGIN');

    this.securityApi
      .login({
        username: this.username(),

        password: this.password(),
      })
      .subscribe({
        next: (response) => {
          this.loading.set(false);

          this.authenticated.set(response.authenticated);

          this.authenticatedUsername.set(response.username);

          this.roles.set(response.roles);

          this.lastStatus.set(200);

          this.lastMessage.set(response.message);

          this.lastOutcome.set('SUCCESS');
        },

        error: (error: HttpErrorResponse) => {
          this.loading.set(false);

          this.clearSession();

          this.lastStatus.set(error.status);

          this.lastMessage.set(error.error?.message ?? 'Authentication failed.');

          this.lastOutcome.set('UNAUTHORIZED');
        },
      });
  }

  /*
   * =========================
   * LOGOUT
   * =========================
   */

  logout(): void {
    this.loading.set(true);

    this.clearResult();

    this.lastAction.set('LOGOUT');

    this.securityApi.logout().subscribe({
      next: (response) => {
        this.loading.set(false);

        this.clearSession();

        this.lastStatus.set(200);

        this.lastMessage.set(response.message);

        this.lastOutcome.set('SUCCESS');
      },

      error: (error: HttpErrorResponse) => {
        this.loading.set(false);

        this.lastStatus.set(error.status);

        this.lastMessage.set('Logout request failed.');
      },
    });
  }

  /*
   * =========================
   * PROTECTED RESOURCES
   * =========================
   */

  requestUserResource(): void {
    this.loading.set(true);

    this.clearResult();

    this.lastAction.set('GET /api/lab/security/user');

    this.securityApi.userResource().subscribe({
      next: (response) => {
        this.handleSuccess(response.status, response.body ?? 'Request successful.');
      },

      error: (error) => {
        this.handleHttpError(error);
      },
    });
  }

  requestAdminResource(): void {
    this.loading.set(true);

    this.clearResult();

    this.lastAction.set('GET /api/lab/security/admin');

    this.securityApi.adminResource().subscribe({
      next: (response) => {
        this.handleSuccess(response.status, response.body ?? 'Request successful.');
      },

      error: (error) => {
        this.handleHttpError(error);
      },
    });
  }

  /*
   * =========================
   * RESPONSE HELPERS
   * =========================
   */

  private handleSuccess(status: number, message: string): void {
    this.loading.set(false);

    this.lastStatus.set(status);

    this.lastMessage.set(message);

    this.lastOutcome.set('SUCCESS');
  }

  private handleHttpError(error: HttpErrorResponse): void {
    this.loading.set(false);

    this.lastStatus.set(error.status);

    if (error.status === 401) {
      this.lastOutcome.set('UNAUTHORIZED');

      this.lastMessage.set('Authentication required.');

      return;
    }

    if (error.status === 403) {
      this.lastOutcome.set('FORBIDDEN');

      this.lastMessage.set('Authenticated, but not authorized for this resource.');

      return;
    }

    this.lastOutcome.set(null);

    this.lastMessage.set('The request could not be completed.');
  }

  /*
   * =========================
   * SESSION HELPERS
   * =========================
   */

  private applySession(session: SecuritySessionResponse): void {
    this.authenticated.set(session.authenticated);

    this.authenticatedUsername.set(session.username);

    this.roles.set(session.roles);
  }

  private clearSession(): void {
    this.authenticated.set(false);

    this.authenticatedUsername.set(null);

    this.roles.set([]);
  }

  private clearResult(): void {
    this.lastStatus.set(null);

    this.lastMessage.set(null);

    this.lastOutcome.set(null);
  }

  backToExperiments(): void {
    this.back.emit();
  }
}
