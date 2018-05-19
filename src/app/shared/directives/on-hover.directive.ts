import { Directive, Host, Input, HostListener, ElementRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[classesOnHover]'
})
export class ClassesOnHoverDirective {

   // tslint:disable-next-line:no-input-rename
  @Input('classesOnHover') classes: string[];

  @HostListener('mouseenter', ['$event.target']) onMouseEnter() {
    this.addStyles();
  }
  @HostListener('mouseleave', ['$event.target']) onMouseLeave() {
    this.removeStyles();
  }

  constructor(private host: ElementRef) {}

  private addStyles() {
    const el: HTMLTemplateElement = this.host.nativeElement;
    this.classes.forEach((className: string) => el.classList.add(className));
  }

  private removeStyles() {
    const el: HTMLTemplateElement = this.host.nativeElement;
    this.classes.forEach((className: string) => el.classList.remove(className));
  }
}
