import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { iuserProfile } from 'src/app/core/interfaces/iuserProfile';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
constructor(private userProfile:ProfileService,private router:Router){

  console.log(this.profile);
}
  profile!: iuserProfile;
  selectedFile?: File;
  defaultImg='assets/images/staff-1.jpg';
ngOnInit(): void {
    this.GetUser();
  }
GetUser(){
  this.userProfile.getProfile().subscribe((data) => {
      this.profile=data;
    });
}
edit(){
this.router.navigateByUrl('user/editProfile')
}
}
