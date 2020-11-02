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
  public options = {
    autoClose: true,
    duration: 15000
  }

  constructor(private toasterService: ToasterService) { }

  userForm = new FormGroup({
    notificationText: new FormControl('', [Validators.required])
  });

  onFormSubmit() {
    console.log(this.userForm.valid)
    if(this.userForm.valid) {
      const message = this.userForm.get('notificationText').value;
      this.toasterService.show(message, this.options)
      this.userForm.reset();
    }
  }
}
