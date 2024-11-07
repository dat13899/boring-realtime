import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, User, user } from '@angular/fire/auth';
import { Subscription, takeUntil } from 'rxjs';
import { BaseClass } from '../../base-class';
import { SignalService } from '../../shared/signals/signals.service';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { Database } from '@angular/fire/database';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private auth = inject(Auth);
  private db = inject(Firestore);
  private baseClass = inject(BaseClass);
  user$ = user(this.auth);
  constructor(
    private signalService: SignalService,
    private router: Router
  ) {
    this.user$.pipe(takeUntil(this.baseClass.destroyed$)).subscribe((aUser: User | null) => {
      //handle user state changes here. Note, that user will be null if there is no currently logged in user.
      console.log(aUser);
    })
  }

  login() {
    signInWithEmailAndPassword(this.auth, 'datel1389@gmail.com', '1234567').then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      // ...
    })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      })
  }
  signInGoogle() {
    // signInWithRedirect(this.auth, new GoogleAuthProvider());
    signInWithPopup(this.auth, new GoogleAuthProvider())
      .then((result: any) => {
        console.log(result);
        this.signalService.setUser(result?.user?.reloadUserInfo);
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        if (result?.user?.accessToken) {
          let tempUser: any = {
            email: result.user?.reloadUserInfo?.email,
            name: result.user?.reloadUserInfo?.displayName,
            user_id: result.user?.reloadUserInfo?.localId,
            profile_picture: result.user?.reloadUserInfo?.photoUrl,
          }
          setDoc(doc(this.db, "users", result.user?.reloadUserInfo?.localId), tempUser);
          this.router.navigate(['/']);
        }
      })
  }
}
