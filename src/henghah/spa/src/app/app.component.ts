import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  styleUrls: ['./app/app.component.css'],
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent { name = 'Dictation'; }
