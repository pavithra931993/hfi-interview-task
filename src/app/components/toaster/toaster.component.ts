import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Toast } from './toaster.model';
import { ToasterService } from './../../services/toaster.service';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: [ './toaster.component.css' ]
})
export class ToasterComponent implements OnInit, OnDestroy {
    toasts: Toast[] = [];
    displayToasts: Toast[] = [];
    defaultDuration:number = 5000;
    toastSubscription: Subscription;

    constructor(private router: Router, private toasterService: ToasterService) { }

    ngOnInit() {
        // subscribe to new toast notifications
        this.toastSubscription = this.toasterService.onToast()
            .subscribe(toast => {
                //validation for toast message
                if (!toast.message) {
                    return;
                }
                this.toasts.push(toast);
                // show 3 toasts
                this.findToastsToDisplay();
                if (toast.autoClose) {
                    const toastDuration = toast.duration ? toast.duration : this.defaultDuration;
                    setTimeout(() => this.removeToast(toast), toastDuration);
                }
           });
    }

    ngOnDestroy() {
        this.toastSubscription.unsubscribe();
    }

    removeToast(toast: Toast) {
        // If my mouse is hovered on the toaster, I need to reset the duration.
        // Else i can remove the toaster.
        if (toast.isMouseHover) {
            toast.duration = toast.duration ? toast.duration : this.defaultDuration;
            setTimeout(() => this.removeToast(toast), toast.duration);
        } else {
            toast.isOpen = false;
            setTimeout(() => {
                this.toasts = this.toasts.filter(x => x !== toast);
                this.findToastsToDisplay();
            }, 300);
        }
    }

    findToastsToDisplay() {
        this.displayToasts = this.toasts.slice(0, 3);
    }
}