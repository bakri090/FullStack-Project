import { iuserProfile } from 'src/app/core/interfaces/iuserProfile';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../core/services/profile.service';
import { updateiuserProfile } from '../core/interfaces/updateiuserProfile';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {
  profileForm!: FormGroup;
  firstname!:string;
  previewImage: string | ArrayBuffer | null = null;
  selectedFile!: File;
  updatedData!:updateiuserProfile;

  constructor(private fb: FormBuilder, private userService: ProfileService) {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: [{ value: '', disabled: true }], // غير قابل للتعديل
      profileImageUrl: ['']
    });
    this.userService.getProfile().subscribe({
      next: (data: any) => {
        this.profileForm.patchValue(data);
        this.firstname =this.profileForm.controls['firstName'].value;
        console.log(this.firstname);
        this.previewImage = data.profileImageUrl ?
        'https://localhost:7273/' + data.profileImageUrl :
        'assets/images/default-avatar.png';
        console.log(this.profileForm);
        this.firstname =data.firstName;
      },
      error: (err) => console.error(err)
    });
  }
  onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
  console.log(this.selectedFile);
  console.log(this.profileForm);
    if (this.selectedFile) {
      // عرض الصورة قبل الرفع
      const reader = new FileReader();
      reader.onload = e => this.previewImage = reader.result;
      reader.readAsDataURL(this.selectedFile);
}
}
  ngOnInit(): void {
  }
submit() {
  if (this.selectedFile) {
    console.log(this.selectedFile);
    this.userService.upload(this.selectedFile).subscribe({
      next: (res) => {
        console.log('Image uploaded:', res);
      },
    });
  }
  this.updatedData ={
    firstName:this.profileForm.controls['firstName'].value,
    lastName:this.profileForm.controls['lastName'].value,
  };

  this.userService.update(this.updatedData).subscribe({
    next:(res) => console.log(res),
    error:(er) => console.log(er)
  })
}
}
