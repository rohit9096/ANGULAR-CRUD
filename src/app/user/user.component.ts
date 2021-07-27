import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms'
import { UserModel } from './user.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  formValue !: FormGroup;
  userModelObj : UserModel = new UserModel();
  userData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;

  constructor(private formbuilder: FormBuilder ,
              private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      Avtar : [''],
      Name : [''],
      Email : [''],
      Dob : [''],
      Country : ['']
    })
    this.getAllUser();
  }

  clickAddUser(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate =false;
  }

  postUserDetails(){
    this.userModelObj.Avtar = this.formValue.value.Avtar;
    this.userModelObj.Name = this.formValue.value.Name;
    this.userModelObj.Email = this.formValue.value.Email;
    this.userModelObj.Dob = this.formValue.value.Dob;
    this.userModelObj.Country = this.formValue.value.Country;

    this.api.postUser(this.userModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("User Added Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllUser();
    },
    err=>{
      alert("Somthing Went Wrong");
    })
  }

  getAllUser(){
    this.api.getUser()
    .subscribe(res=>{
      this.userData = res;
    })
  }
  deleteUser(row: any){
    this.api.deleteUser(row.id)
    .subscribe(res=>{
      alert("User Deleted")
      this.getAllUser();
    })
  }

  onEdit(row: any){
    this.showAdd = false;
    this.showUpdate = true;
    this.userModelObj.id = row.id;
    this.formValue.controls['Avtar'].setValue(row.Avtar);
    this.formValue.controls['Name'].setValue(row.Name);
    this.formValue.controls['Email'].setValue(row.Email);
    this.formValue.controls['Dob'].setValue(row.Dob);
    this.formValue.controls['Country'].setValue(row.Country);
  }

  updateUserDetails(){
    this.userModelObj.Avtar = this.formValue.value.Avtar;
    this.userModelObj.Name = this.formValue.value.Name;
    this.userModelObj.Email = this.formValue.value.Email;
    this.userModelObj.Dob = this.formValue.value.Dob;
    this.userModelObj.Country = this.formValue.value.Country;

    this.api.updateUser(this.userModelObj,this.userModelObj.id)
    .subscribe(res=>{
      alert("Updated Successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllUser();
    })
  }
}


