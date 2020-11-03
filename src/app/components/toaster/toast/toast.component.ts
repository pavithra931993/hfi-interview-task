import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { Toast } from './../toaster.model';
import { ToasterService } from './../../../services/toaster.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: [ './toast.component.css' ],
  animations: [
    trigger('openClose', [
        state('open', style({ opacity: 1, backgroundColor: '#d4edda', color: '#155724', borderColor: '#c3e6cb' })),
        state('*', style({ opacity: 0, backgroundColor: 'transparent', color: '#e8e8e8', borderColor: '#e8e8e8' })),
        transition('* => open', [
            animate('500ms ease-in')
        ]),
        transition('open => *', [
            animate('500ms ease-out')
        ])
    ])
  ]
})
export class ToastComponent implements OnInit {
    @Input() toast: Toast;
    @Output() removeToast = new EventEmitter();

    constructor(private router: Router, private toasterService: ToasterService) { }

    ngOnInit() { }

    emitToastToRemove(toast: Toast) {
        toast.isMouseHover = false;
        this.removeToast.emit(toast);
    }
    mouseover() {
        this.toast.isMouseHover = true;
    }
    mouseleave(){
        this.toast.isMouseHover = false;
    }
}