import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {InfoService } from  '../../services/info.service'
import {Router} from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  jobs:Object;

  constructor(
      private authService:AuthService, 
      private router:Router, 
      private infoService:InfoService
    ) { }
  
  ngOnInit() {
    this.authService.getAllJobs().subscribe(profile => {
      this.jobs = profile;
    },
    err => {
      console.log(err);
      return false;
    });
  }
  craeteNewJob(){
    this.router.navigate(['/newjob']);
    return false;
  }

  updateJob(job){
    console.log(job)
    this.infoService.saveData(job);
    this.router.navigate(['/newjob']);
  }
  deleteJob(id){
    this.authService.deletejob(id).subscribe(data => {
          if(data.success){
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/newjob']);
          }
        });
  }

}
