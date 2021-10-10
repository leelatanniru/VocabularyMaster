import { Injectable } from "@angular/core";
import * as data from "./data.json";
import { BehaviorSubject, Subject } from "rxjs";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AnswerComponent } from "./answer/answer.component";
@Injectable({
  providedIn: "root",
})
export class DataService {
  public vowels = ["A", "E", "I", "O", "U", "a", "e", "i", "o", "u"];
  public wordsArray = (data as any).default;
  public _questionNumber: number =
    localStorage.getItem("questionNoVM") === null
      ? 0
      : Number(localStorage.getItem("questionNoVM"));
  public _score: number =
    localStorage.getItem("scoreVM") === null
      ? 0
      : Number(localStorage.getItem("scoreVM"));
  public questionNumber$ = new BehaviorSubject(this._questionNumber);
  public score$ = new BehaviorSubject(this._score);
  public currentWord;
  public guessword$ = new Subject();
  public isVowel$ = new Subject();
  public _guessword;
  public _isVowel;
  public wrongAnswers = 0;
  public _remainingTrials = new Array(10);
  public remainingTrials$ = new Subject();
  public _currentWordMeaning;
  public currentWordMeaning$ = new Subject();
  private currentWordObj;
  public _currentWordExample;
  public _currentWordPOS;

  constructor(public dialog: MatDialog) {}

  IncrementScore() {
    this._score++;
    localStorage.setItem("scoreVM", this._score.toString());
    this.score$.next(this._score);
  }

  IncrementQuestionNumber() {
    this._questionNumber++;
    localStorage.setItem("questionNoVM", this._questionNumber.toString());
    this.questionNumber$.next(this._questionNumber);
  }

  getNewWord() {
    this.currentWordObj = this.wordsArray[this._questionNumber];
    this.currentWord = this.currentWordObj.word;
    this._currentWordMeaning = this.currentWordObj.meaning;
    this._currentWordExample = this.currentWordObj.example;
    this._currentWordPOS = this.currentWordObj.partsOfSpeech;
    this._guessword = new Array(this.currentWord.length);
    this._isVowel = new Array(this.currentWord.length);
    for (let i = 0; i < this._guessword.length; i++) {
      this._guessword[i] = "";
      if (this.vowels.includes(this.currentWord[i])) {
        this._isVowel[i] = true;
      } else {
        this._isVowel[i] = false;
      }
    }
    this.guessword$.next(this._guessword);
    this.isVowel$.next(this._isVowel);
    this.currentWordMeaning$.next(this._currentWordMeaning);
    this.wrongAnswers = 0;
    for (let i = 0; i < 10; i++) {
      this._remainingTrials[i] = "";
    }
    this.remainingTrials$.next(this._remainingTrials);
  }
  check(c) {
    const match = this.createMatchArray(c);
    if (match.length === 0) {
      this._remainingTrials[this.wrongAnswers++] = c;
      this.remainingTrials$.next(this._remainingTrials);
    } else {
      match.forEach((m) => {
        this._guessword[m] = c;
      });

      this.guessword$.next(this._guessword);
    }

    if (
      this._guessword.join("").toLowerCase() === this.currentWord.toLowerCase()
    ) {
      this.IncrementScore();
      this.IncrementQuestionNumber();
      this.openAnswer();
      console.log("correct");
    } else if (this.wrongAnswers === 10) {
      this.IncrementQuestionNumber();
      this.openAnswer();
      console.log("wrong");
    }
  }

  createMatchArray(c) {
    const match = [];
    for (let i = 0; i < this.currentWord.length; i++) {
      if (this.currentWord[i].toLowerCase() === c.toLowerCase()) {
        match.push(i);
      }
    }
    return match;
  }

  openAnswer() {
    const dialogRef = this.dialog.open(AnswerComponent, {
      data: {
        word: this.currentWord,
        meaning: this._currentWordMeaning,
        example: this._currentWordExample,
        pos: this._currentWordPOS,
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(() => this.getNewWord());
  }
}
