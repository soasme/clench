import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h1>Start {{name}}!</h1>
  <nav>
      <a routerLink="/series-list" routerLinkActive="active">All Series</a>
  </nav>
  <router-outlet></router-outlet>`
})
export class AppComponent { name = 'Dictation'; }
