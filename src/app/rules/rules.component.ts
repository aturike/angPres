import { RulesService } from './../services/rules.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IIntroRules } from '../model/rules.model';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrl: './rules.component.scss',
})
export class RulesComponent implements OnInit, OnDestroy {
  animationDuration = '500ms';
  animate = false;
  finishAnimate = false;
  introRules: IIntroRules[];
  onDestroy$ = new Subject();
  showIntroRule: string;
  spinInterval: any;
  isSpinning: boolean = false;

  constructor(private rulesService: RulesService) {}

  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
    if (this.spinInterval) {
      clearInterval(this.spinInterval);
    }
  }

  spin() {
    this.isSpinning = true;
    this.finishAnimate = false;
    this.animate = true;
    const animationTime = parseInt(this.animationDuration.slice(0, -2), 10);
    const endAnimationTime = Math.floor(4 * Math.random()) * 1000 + 5000;

    this.spinInterval = setInterval(() => {
      this.selectNextElement(this.showIntroRule, this.introRules);
    }, animationTime);

    setTimeout(() => {
      (this.animate = false),
        clearInterval(this.spinInterval),
        (this.finishAnimate = true);
      this.isSpinning = false;
    }, endAnimationTime);
  }

  private selectNextElement(currentElement: string, elements: IIntroRules[]) {
    const currentIndex = elements.findIndex(
      (element) => element.rule === currentElement
    );

    const nextIndex = (currentIndex + 1) % elements.length;

    this.showIntroRule = elements[nextIndex].rule;
  }

  private getData() {
    this.rulesService
      .getAllIntroRules()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((rules) => {
        this.introRules = rules;
        const randomIndex = Math.floor(this.introRules.length * Math.random());
        this.showIntroRule = this.introRules[randomIndex].rule;
      });
  }
}
