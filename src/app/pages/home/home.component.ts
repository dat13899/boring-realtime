import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Auth, user, User } from '@angular/fire/auth';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Subscription, takeUntil } from 'rxjs';
import { BaseClass } from '../../base-class';
import { UserItemComponent } from "../../shared/components/user-item/user-item.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, UserItemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  firestore: Firestore = inject(Firestore);
  private baseClass = inject(BaseClass);
  items: any = [];
  private auth = inject(Auth);
  user$ = user(this.auth);
  userSubscription: Subscription;
  constructor() {
    this.userSubscription = this.user$.pipe(takeUntil(this.baseClass.destroyed$)).subscribe((aUser: User | null) => {
      //handle user state changes here. Note, that user will be null if there is no currently logged in user.
      console.log(aUser);
    })
    const aCollection = collection(this.firestore, 'users')
    collectionData(aCollection).pipe(takeUntil(this.baseClass.destroyed$)).subscribe((data: any) => {
      this.items = data;
      console.log(this.items);
    });

  }
}