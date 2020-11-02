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

    // enable subscribing to alerts observable
    onToast(id = this.defaultId): Observable<Toast> {
        return this.subject.asObservable().pipe(filter(x => x && x.id === id));
    }
    show(message: string, options?: any) {
        this.toast(new Toast({ ...options, message }));
    }
    // main alert method    
    toast(toast: Toast) {
        toast.id = toast.id || this.defaultId;
        this.subject.next(toast);
    }

    // clear alerts
    clear(id = this.defaultId) {
        this.subject.next(new Toast({ id }));
    }
}