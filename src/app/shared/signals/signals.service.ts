import { BaseClass } from './../../base-class';
import { Inject, Injectable, PLATFORM_ID, effect, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LocalStorageService } from '../storage/local.service';
import {
  User,
} from './signals.model';
import { takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignalService {
  user = User;
  constructor(
    private localStorageService: LocalStorageService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private baseClass: BaseClass,
  ) {
    this.refreshData();
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
      }
    });
  }
  refreshData() {
    let user = this.localStorageService.getItem('user');
    this.user.set(user ? user : {});
  }
  setUser(data: any) {
    this.user.set(data);
    this.localStorageService.setItem('user', data);
  }
}
