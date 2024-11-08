import { Component, effect, inject, Input } from '@angular/core';
import { collection, collectionData, Firestore, limit, query, where } from '@angular/fire/firestore';
import { takeUntil } from 'rxjs';
import { BaseClass } from '../../base-class';
import { UserItemComponent } from "../../shared/components/user-item/user-item.component";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [UserItemComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  private db = inject(Firestore);
  private baseClass = inject(BaseClass);
  uid: any
  userInfo: any;
  @Input() set id(value: string) {
    this.uid = value;
    const uCollection = collection(this.db, 'users')
    const q = query(uCollection, where("uid", "==", this.uid), limit(1));
    collectionData(q).pipe(takeUntil(this.baseClass.destroyed$)).subscribe((data: any) => {
      console.log(data);

      this.userInfo = data[0];
    });
  }
  constructor() {
    // console.log(this.uid());

  }
}
