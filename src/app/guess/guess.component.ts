import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { DataService } from "../data.service";

@Component({
  selector: "app-guess",
  templateUrl: "./guess.component.html",
  styleUrls: ["./guess.component.css"],
})
export class GuessComponent implements OnInit {
  guess = new FormControl("");

  constructor(private dataService: DataService) {}

  ngOnInit() {}

  submit() {
    console.log(this.guess.value);
    this.dataService.check(this.guess.value);
    this.guess.setValue("");
  }
}
