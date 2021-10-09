import { Component, OnDestroy, OnInit } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { DataService } from "../data.service";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-core",
  templateUrl: "./core.component.html",
  styleUrls: ["./core.component.css"],
})
export class CoreComponent implements OnInit, OnDestroy {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  public wordsArray = [];
  public questionNumber: number;
  public score: number;
  public currentWord: string;
  public guessword;
  public isVowel;
  public remainingTrials;
  public currentWordMeaning;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.wordsArray = this.dataService.wordsArray;
    this.dataService.score$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((d) => (this.score = d));
    this.dataService.questionNumber$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((d) => {
        this.questionNumber = d;
      });

    this.dataService.guessword$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((d) => {
        this.guessword = d;
      });

    this.dataService.isVowel$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((d) => (this.isVowel = d));

    this.dataService.remainingTrials$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((d) => (this.remainingTrials = d));

    this.dataService.currentWordMeaning$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((d) => (this.currentWordMeaning = d));

    this.dataService.getNewWord();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
