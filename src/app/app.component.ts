import { Component } from '@angular/core';
import { FormControl , FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  formValue = new FormGroup({
    Name: new FormControl('', Validators.required)
  })

  get Name() {return this.formValue.get('Name')}

  title = 'ANGULAR-CRUD';
}                    
