import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

import { Toast } from './toaster.model';
import { ToasterService } from './../../services/toaster.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toaster.component.html',
  styleUrls: [ './toaster.component.css' ]
})
export class ToastComponent implements OnInit, OnDestroy {
    @Input() id = 'default-toast';
    @Input() fade = true;

    toasts: Toast[] = [];
    displayToasts: Toast[] = [];
    defaultDuration:number = 700000;
    toastSubscription: Subscription;
    routeSubscription: Subscription;

    constructor(private router: Router, private toasterService: ToasterService) { }

    ngOnInit() {
        // subscribe to new toast notifications
        this.toastSubscription = this.toasterService.onToast(this.id)
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

        // clear toasts on location change
        this.routeSubscription = this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.toasterService.clear();
            }
        });
    }

    ngOnDestroy() {
        this.toastSubscription.unsubscribe();
        this.routeSubscription.unsubscribe();
    }

    removeToast(toast: Toast) {
        if (!this.toasts.includes(toast)) return;
        setTimeout(() => {
            this.toasts = this.toasts.filter(x => x !== toast);
            this.findToastsToDisplay();
        }, 300);
    }

    findToastsToDisplay() {
        this.displayToasts = this.toasts.slice(0, 3);
    }
}