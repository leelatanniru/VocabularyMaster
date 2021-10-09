import { Directive, ElementRef, Input } from "@angular/core";

@Directive({
  selector: "[appHighlight]",
})
export class HighlightDirective {
  @Input() appHighlight: string;

  constructor(private el: ElementRef) {}
  ngOnInit() {
    if (this.appHighlight !== "") {
      this.el.nativeElement.classList.add("red");
    } else {
      this.el.nativeElement.classList.add("green");
    }
  }
}
