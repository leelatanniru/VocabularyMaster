import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-trial",
  templateUrl: "./trial.component.html",
  styleUrls: ["./trial.component.css"],
})
export class TrialComponent implements OnInit {
  @Input() guess;
  constructor() {}

  ngOnInit() {}
}
