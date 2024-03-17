import { Injectable, inject } from '@angular/core';
import {
  Auth,
  UserCredential,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  signOut,
  user,
} from '@angular/fire/auth';
import { Observable, catchError, from, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);

  createUser(email: string, passw: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, passw);
  }

  signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  userExists(email: string): Observable<boolean> {
    return from(fetchSignInMethodsForEmail(this.auth, email)).pipe(
      map((signInMethods) => signInMethods.length > 0),
      catchError((error) => {
        console.error('Error checking user existence:', error);
        return of(false);
      })
    );
  }

  isSignedIn(): Observable<boolean> {
    return user(this.auth).pipe(map((user) => !!user));
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }
}
