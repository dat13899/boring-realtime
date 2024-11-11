import { Component, inject } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { AsyncPipe, CommonModule } from '@angular/common';
import { filter, Observable, takeUntil } from 'rxjs';
import { BaseClass } from './base-class';
import { SignalService } from './shared/signals/signals.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  signalService = inject(SignalService);
  router = inject(Router);
  constructor() {
    this.signalService.refreshData();
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((val: any) => {
        console.log(val);
        this.signalService.refreshData();
      });
  }
}
