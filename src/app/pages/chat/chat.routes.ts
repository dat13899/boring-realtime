import { Routes } from '@angular/router';
import { ChatComponent } from './chat.component';

export const Chat_Routes: Routes = [
    {
        path: ':id',
        component: ChatComponent
    }
];
