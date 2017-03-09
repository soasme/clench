import { Component } from '@angular/core';

@Component({
  selector: 'landing',
  styleUrls: [ './app/landing.component.css'  ],
  template: `
    <header class="navbar navbar-transparent navbar-fixed-top navbar-centered-nav navbar-animated">
      <div class="container">
        <div class="navbar-header">
          <button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".landing-navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="arrow"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a href="../../index.html" class="navbar-logo">
            <img src="../../img/logo-light.png" alt="Tron UI Kit">
            <img class="alt-logo" src="../../img/logo.png" alt="Tron UI Kit">
          </a>
        </div>
        <nav class="collapse navbar-collapse landing-navbar-collapse" role="navigation">
          <ul class="nav navbar-nav">
            <li class="active"><a class="scrollTo" href="#home" data-offset-top="0">Home</a></li>
            <li><a class="scrollTo" href="/home#features" data-offset-top="115">Features</a></li>
            <li><a class="scrollTo" href="/home#they-say" data-offset-top="120">They say</a></li>
            <li><a routerLink="/series-list" routerLinkActive="active" class="scrollTo" data-offset-top="30">Start Dictation!</a></li>
          </ul>
          <div class="navbar-right">
            <a href="#" class="btn-outlined btn-primary navbar-btn" data-toggle="modal" data-target="#signupModal">Sign Up</a>
          </div>
        </nav>
      </div>
    </header>

    <section class="intro" style="background-image: url(/img/intro-bg.jpg)" id="home">
      <div class="overlay"></div>
      <span></span>
      <div class="container">
        <h1>Train you ears by doing dictation!</h1>
        <h4>Listen, Understand, and Write them down.</h4>
        <p>You neven know how much you understand until you write them down and check. You will have great improvement by keeping practising dictation.</p>
        <a href="#" class="btn-outlined btn-light">Learn More</a>
        <!-- <a href="#" class="btn btn-warning">Buy Now</a> -->
      </div>
    </section>

    <section class="container features" id="features">
      <div class="row">
        <div class="col-sm-4">
          <div class="icon"><i class="flaticon-users25"></i></div>
          <h3>Special Team Plan</h3>
        </div>
        <div class="col-sm-4">
          <div class="icon"><i class="flaticon-cloud306"></i></div>
          <h3>Special Team Plan</h3>
        </div>
        <div class="col-sm-4">
          <div class="icon"><i class="flaticon-headset12"></i></div>
          <h3>Special Team Plan</h3>
        </div>
      </div>
    </section>

    <section class="container features" id="they-say">
      <div class="row">
        <div class="col-sm-4">
        </div>
        <div class="col-sm-4">
        </div>
        <div class="col-sm-4">
        </div>
      </div>
    </section>
  `
})
export class LandingComponent { name = 'Dictation'; }

