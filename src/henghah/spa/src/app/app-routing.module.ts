import { NgModule  }             from '@angular/core';
import { RouterModule, Routes  } from '@angular/router';

import { AudioPlayerComponent } from './audio-player.component';
import { SeriesListComponent } from './series-list.component';
import { AudiosComponent } from './audios.component';

const routes: Routes = [
  { path: '', redirectTo: '/series-list', pathMatch: 'full' },
  { path: 'audio-play', component: AudioPlayerComponent },
  { path: 'series-list', component: SeriesListComponent },
  { path: 'series/:slug', component: AudiosComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes)  ],
    exports: [ RouterModule  ]
})
export class AppRoutingModule {}
