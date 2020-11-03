import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { Toast } from './../components/toaster/toaster.model';
@Directive({
  selector: '[preventAutoClose]'
})
export class PreventAutoCloseDirective {
  toastElement: any;
  @Input() toast: Toast;
  constructor(el: ElementRef) {
    this.toastElement = el.nativeElement;
  }

  @HostListener('mouseenter') onMouseEnter() {
    console.log("mouseenter >> ", this.toast);
    this.toast.autoClose = false;
  }

  @HostListener('mouseleave') onMouseLeave() {
    console.log("mouseleave >> ", this.toast);
    this.toast.autoClose = true;
  }
}
