import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ToasterService } from './../../services/toaster.service';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: [ './second.component.css' ]
})
export class SecondComponent  {
  name = 'Component 2';
  formSubmitted: boolean = false;
  public options = {
    autoClose: true,
    duration: 2000
  }

  constructor(private toasterService: ToasterService) { }
 //create instance for Formgroup
  toastForm = new FormGroup({
    notificationText: new FormControl('', [Validators.required])
  });

  onFormSubmit() {
    this.formSubmitted = true;
    if(this.toastForm.valid) {
      const message = this.toastForm.get('notificationText').value;
      this.toasterService.show(message, this.options)
      this.toastForm.reset();
      this.formSubmitted = false;
    }
  }
}
