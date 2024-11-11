import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, User, user } from '@angular/fire/auth';
import { takeUntil } from 'rxjs';
import { BaseClass } from '../../base-class';
import { SignalService } from '../../shared/signals/signals.service';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule],
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
    this.signalService.setUser({});
    // signInWithRedirect(this.auth, new GoogleAuthProvider());
    signInWithPopup(this.auth, new GoogleAuthProvider())
      .then((result: any) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        if (result?.user?.accessToken) {
          let tempUser: any = {
            email: result.user?.email,
            displayName: result.user?.displayName,
            phoneNumber: result.user?.phoneNumber,
            uid: result.user?.uid,
            photoURL: result.user?.photoURL,
          }
          this.signalService.setUser(tempUser);
          setDoc(doc(this.db, "users", result.user?.uid), tempUser);
          this.router.navigate(['/']);
        }
      })
  }
}
