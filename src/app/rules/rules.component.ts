import { RulesService } from './../services/rules.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IIntroRules } from '../model/rules.model';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrl: './rules.component.scss',
})
export class RulesComponent implements OnInit {
  introRules$: Observable<IIntroRules[]>;
  animate = false;

  constructor(private rulesService: RulesService) {}

  ngOnInit(): void {
    this.getData();
  }

  spin() {
    this.animate = true;

    setTimeout(() => (this.animate = false), 2000);
  }

  private getData() {
    this.introRules$ = this.rulesService.getAllIntroRules();
  }
}
