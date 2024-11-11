import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Auth, user, User } from '@angular/fire/auth';
import { Firestore, collection, collectionData, doc, query, setDoc, where } from '@angular/fire/firestore';
import { Subscription, takeUntil } from 'rxjs';
import { BaseClass } from '../../base-class';
import { UserItemComponent } from "../../shared/components/user-item/user-item.component";
import { HomeHeaderComponent } from "./home-header/home-header.component";
import { HomeListUserComponent } from "./home-list-user/home-list-user.component";
import { HomeListChatComponent } from "./home-list-chat/home-list-chat.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, UserItemComponent, HomeHeaderComponent, HomeListUserComponent, HomeListChatComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private db = inject(Firestore);
  private baseClass = inject(BaseClass);
  items: any = [];
  private auth = inject(Auth);
  user$ = user(this.auth);
  userSubscription: Subscription;
  curentUser: User | null | undefined;
  constructor(
    private router: Router
  ) {
    this.userSubscription = this.user$.pipe(takeUntil(this.baseClass.destroyed$)).subscribe((aUser: User | null) => {
      //handle user state changes here. Note, that user will be null if there is no currently logged in user.
      console.log(aUser);
      this.curentUser = aUser;
      const uCollection = collection(this.db, 'users')
      const q = query(uCollection, where("uid", "!=", this.curentUser?.uid));
      collectionData(q).pipe(takeUntil(this.baseClass.destroyed$)).subscribe((data: any) => {
        this.items = data;
      });
    })
  }
  chatInit(item: any) {
    this.createChat(this.curentUser?.uid, item?.uid);
  }
  async createChat(currentUserUid: any, otherUserUid: any) {
    try {
      // Create the main chat document
      await setDoc(doc(this.db, "chats", currentUserUid), {});

      // Create the specific chat document
      await setDoc(doc(this.db, `chats/${currentUserUid}/chat`, otherUserUid), {});

      console.log("Both documents created successfully!");
      this.router.navigate([`/chat/${otherUserUid}`]);
    } catch (error) {
      console.error("Error creating documents:", error);
    }
  }
}