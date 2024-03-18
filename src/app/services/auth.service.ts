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
import { Observable, map } from 'rxjs';

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

  userExists(email: string): Promise<string[]> {
    return fetchSignInMethodsForEmail(this.auth, email);
  }

  isSignedIn(): Observable<boolean> {
    return user(this.auth).pipe(map((user) => !!user));
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }
}
