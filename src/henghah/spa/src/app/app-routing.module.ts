import { NgModule  }             from '@angular/core';
import { RouterModule, Routes  } from '@angular/router';

import { AudioPlayerComponent } from './audio-player.component';
import { SeriesListComponent } from './series-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/audios', pathMatch: 'full' },
  { path: 'audios', component: AudioPlayerComponent },
  { path: 'seriesList', component: SeriesListComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes)  ],
    exports: [ RouterModule  ]
})
export class AppRoutingModule {}
