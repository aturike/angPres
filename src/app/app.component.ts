import { Observable, finalize, first, tap } from 'rxjs';
import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'pres';
  isSignedin$: Observable<boolean>;
  isLoading = false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.isSignedin$ = this.auth.isSignedIn().pipe(
      first(),
      tap(() => {
        this.isLoading = true;
      }),
      finalize(() => {
        this.isLoading = false;
      })
    );
  }
}
