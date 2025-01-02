import { Component } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  template: `
    <div class="unauthorized">
      <h1>Unauthorized Access</h1>
      <p>You do not have permission to view this page.</p>
      <a routerLink="/login">Go to Login</a>
      <a routerLink="/home">Go to home</a>
    </div>
  `,
  styles: [
    `
      .unauthorized {
        text-align: center;
        margin-top: 50px;
      }
    `
  ]
})
export class UnauthorizedComponent {}
