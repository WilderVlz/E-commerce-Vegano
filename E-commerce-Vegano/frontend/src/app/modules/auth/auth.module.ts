import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [
    LoginModalComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SharedModule
  ],exports: [
    LoginModalComponent
  ]
})
export class AuthModule { }
