
import { isPlatformBrowser } from "@angular/common";
import { Injectable, OnDestroy, Inject, PLATFORM_ID } from "@angular/core";
import { Subject } from "rxjs";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
}) // not root scope
export class BaseClass implements OnDestroy {
  public destroyed$ = new Subject<void>();
  platformId: Object;
  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private router: Router,
  ) {
    this.platformId = platformId;
  }
  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
  checkPlatform(): any {
    return isPlatformBrowser(this.platformId)
  }
}
