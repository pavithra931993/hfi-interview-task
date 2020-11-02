import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Toast } from './toaster.model';
import { ToasterService } from './../../services/toaster.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toaster.component.html',
  styleUrls: [ './toaster.component.css' ]
})
export class ToastComponent implements OnInit, OnDestroy {
    toasts: Toast[] = [];
    displayToasts: Toast[] = [];
    defaultDuration:number = 700000;
    toastSubscription: Subscription;

    constructor(private router: Router, private toasterService: ToasterService) { }

    ngOnInit() {
        // subscribe to new toast notifications
        this.toastSubscription = this.toasterService.onToast()
            .subscribe(toast => {
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
        this.toasts = this.toasts.filter(x => x !== toast);
        this.findToastsToDisplay();
    }

    findToastsToDisplay() {
        this.displayToasts = this.toasts.slice(0, 3);
    }
}