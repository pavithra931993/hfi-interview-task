import { Component } from '@angular/core';
import { ToasterService } from './../../services/toaster.service';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: [ './first.component.css' ]
})
export class FirstComponent  {
  name = 'Component 1';
  public options = {
    autoClose: true
  }

  constructor(private toasterService: ToasterService) { }

  public showToaster():void {
    this.toasterService.show('Toast with default message closes in 7s', this.options)
  }
}
