import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service'
import {AuthService} from '../../services/auth.service'
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  comfirmpassword : String;
  contactnumber : Number;
  experience : String ;
  skill : String;
  skills = ['IT', 'FS','ps'];
  constructor(
    private validateService: ValidateService,
    private authService:AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.skill = null;
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password,
      contactnumber: this.contactnumber,
      experience: this.experience,
      skill: this.skill
    }

    // Required Fields
    if(!this.validateService.validateRegister(user)){
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)){
      return false;
    }

    // Register user
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/register']);
      }
    });

  }

}
