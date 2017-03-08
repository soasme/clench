import { NgModule  }             from '@angular/core';
import { RouterModule, Routes  } from '@angular/router';

import { AudioPlayerComponent } from './audio-player.component';

const routes: Routes = [
  { path: '', redirectTo: '/audios', pathMatch: 'full' },
  { path: 'audios', component: AudioPlayerComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes)  ],
    exports: [ RouterModule  ]
})
export class AppRoutingModule {}
