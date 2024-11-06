import { Component, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, User, user } from '@angular/fire/auth';
import { Subscription, takeUntil } from 'rxjs';
import { BaseClass } from '../../base-class';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private auth = inject(Auth);
  private baseClass = inject(BaseClass);
  user$ = user(this.auth);
  constructor() {
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
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
}
