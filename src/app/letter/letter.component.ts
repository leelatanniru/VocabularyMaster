import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-letter",
  templateUrl: "./letter.component.html",
  styleUrls: ["./letter.component.css"],
})
export class LetterComponent implements OnInit {
  @Input() enteredLetter;

  @Input() isOvel;

  constructor() {}

  ngOnInit() {}
}
