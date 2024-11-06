import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable, takeUntil } from 'rxjs';
import { BaseClass } from './base-class';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'boring-realtime';
  firestore: Firestore = inject(Firestore);
  items: any = [];
  // firebase_config = firebase_config;
  // app = initializeApp(firebase_config);
  private baseClass = inject(BaseClass);
  constructor() {
    // const aCollection = collection(this.firestore, 'product')
    // collectionData(aCollection).pipe(takeUntil(this.baseClass.destroyed$)).subscribe((data: any) => {
    //   this.items = data;
    //   console.log(this.items);
    // });
  }
}
