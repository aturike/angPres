import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  isSignedIn$: Observable<boolean>;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.isSignedIn$ = this.auth.isSignedIn();
  }

  async logOut() {
    try {
      this.auth.logout();
    } catch (error) {
      console.error(error);
    }
  }
}
