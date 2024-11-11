import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../signals/signals.model';
import { LocalStorageService } from '../storage/local.service';
interface CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
}
@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {
  user = User;
  localStorageService = inject(LocalStorageService);
  constructor(
    private router: Router,
    public dialog: MatDialog,
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.localStorageService.getItem('user')?.uid) {
      return true;
    } else {
      return this.router.navigate(['/login']);
      // return this.handleUnauthorizedAccess(state.url);
    }
  }
  private handleUnauthorizedAccess(redirectUrl: string): Promise<UrlTree> {
    return Promise.resolve(this.router.createUrlTree(['/login'], {
      queryParams: {
        next: redirectUrl,
      },
    }));
  }
}
