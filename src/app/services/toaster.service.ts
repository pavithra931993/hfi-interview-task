import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Toast } from './../components/toaster/toaster.model';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
    private subject = new Subject<Toast>();
    private defaultId = 'default-toast';

    // enable subscribing to toasts observable
    onToast(): Observable<Toast> {
        return this.subject.asObservable();
    }
    show(message: string, options?: any) {
        const toast = new Toast({ ...options, message });
        toast.id = toast.id || this.defaultId;
        this.subject.next(toast);
    }
    // clear toasts
    clear(id = this.defaultId) {
        this.subject.next(new Toast({ id }));
    }
}