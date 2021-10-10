import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { CoreComponent } from "./core/core.component";
import { LetterComponent } from "./letter/letter.component";
import { GuessComponent } from "./guess/guess.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { TrialComponent } from "./trial/trial.component";
import { HighlightDirective } from "./highlight.directive";
import { AnswerComponent } from "./answer/answer.component";
import { MatDialogModule } from "@angular/material/dialog";
@NgModule({
  declarations: [
    AppComponent,
    CoreComponent,
    LetterComponent,
    GuessComponent,
    TrialComponent,
    HighlightDirective,
    AnswerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AnswerComponent],
})
export class AppModule {}
