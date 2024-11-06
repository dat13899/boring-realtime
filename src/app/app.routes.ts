import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages/home/home.routes').then(m => m.Home_Routes)
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.routes').then(m => m.Login_Routes)
    }
];
