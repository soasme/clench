import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { HttpModule  }    from '@angular/http';
import { AudioPlayerComponent } from './audio-player.component';
import { AudioPlayerService } from './audio-player.service';
import { APIService } from './api.service';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports:      [ BrowserModule, HttpModule, AppRoutingModule ],
  declarations: [ AudioPlayerComponent, AppComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ APIService, AudioPlayerService ]
})
export class AppModule { }
