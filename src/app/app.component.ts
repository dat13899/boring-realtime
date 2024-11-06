import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { firebase_config } from '../../firebase-config';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'boring-realtime';
  firebase_config = firebase_config;
  // app = initializeApp(firebase_config);
}
