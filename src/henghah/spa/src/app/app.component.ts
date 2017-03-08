import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h1>Start {{name}}!</h1>
  <nav>
      <a routerLink="/seriesList" routerLinkActive="active">All Series</a>
      <a routerLink="/audios" routerLinkActive="active">Audios</a>
  </nav>
  <router-outlet></router-outlet>`
})
export class AppComponent { name = 'Dictation'; }
