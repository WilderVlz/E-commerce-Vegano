import { AfterViewInit, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { faUser, faKey, faLock, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SocialAuthService, FacebookLoginProvider } from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements AfterViewInit {
  private fb = inject( FormBuilder );
  private router = inject(Router);

  @ViewChild('googleButton') googleButton: ElementRef = new ElementRef({});

  user:any;
  loggedIn:any;

  isLogin: boolean = true;

  //private modalService = inject(NgbModal);
  public activeModal = inject(NgbActiveModal);

  private authService = inject(SocialAuthService);

  faUser = faUser;
  faKey = faKey;
  faLock = faLock;
  faFacebook = faFacebook;
  faPhone = faPhone;
  faEnvelope = faEnvelope;

  closeResult = '';

  ngAfterViewInit(): void {
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: "1062265390620-bsef1fpg54tvsc9fh04tq5hja74ta8ol.apps.googleusercontent.com",
      callback: this.handleCredentialResponse.bind(this),
      auto_select: false,
      cancel_on_tap_outside: true,
      //itp_support: true,
    });
    // @ts-ignore
    google.accounts.id.renderButton(
      // @ts-ignore
      //document.getElementById("google-button"),
      this.googleButton.nativeElement,
      { theme: "outline", size: "large", width: "100%" }
      /*
      {
        type: "standard", theme: "outline",
        size: "medium", width: "50", shape: "pill", ux_mode: "popup",
      }
      */
    );
    // @ts-ignore
    google.accounts.id.prompt((notification: PromptMomentNotification) => {
      console.log("notification =>", notification)
    });

  }

  async handleCredentialResponse(response: any) {
    // Here will be your response from Google.
    console.log("response =>", response);
  }

  public loginForm: FormGroup = this.fb.group({
    usuario:    ['', [ Validators.required ]],
    contrasena: ['', [ Validators.required, Validators.minLength(6) ]],
  });

  public registerForm: FormGroup = this.fb.group({
    email:    ['', [ Validators.required, Validators.email ]],
    contrasena: ['', [ Validators.required, Validators.minLength(6) ]],
    contrasena2: ['', [ Validators.required]],
    nombre: ['', [ Validators.required]],
    apellido: ['', [ Validators.required]],
    numeroCelular: ['', [ Validators.required]],
  }, {
    validators: [
      this.validatePasswords('contrasena1', 'contrasena2')
    ]
  });

  public validatePasswords( fieldName1: string, fieldName2: string ) {
    return (formGroup: AbstractControl): ValidationErrors | null => {

      if(!formGroup.get(fieldName1)?.value || !formGroup.get(fieldName2)?.value){
        return null;
      }

      const field1 = formGroup.get(fieldName1)?.value;
      const field2 = formGroup.get(fieldName2)?.value;

      if(field1 !== field2){
        formGroup.get(fieldName2)?.setErrors({ notEqual: true})
        return { notEqual: true};
      }

      formGroup.get(fieldName2)?.setErrors(null)
      return null;
    }
  }

  /*
  open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
        console.log("login =>", this.loginForm.value)
        console.log("result =>", result)
				//this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${reason}`
        console.log("reason =>", reason);
			},
		);
	}
  */

  login(){
    //console.log("login =>", this.loginForm.value)
    //this.activeModal.close(this.loginForm.value);
    console.log("isLogin =>", this.isLogin)

    let payload;

    if(this.isLogin){
      payload = {
        ...this.loginForm.value
      }
    }else{
      payload = {
        ...this.registerForm.value
      }
    }

    payload = {
      payload,
      isLogin: this.isLogin,
    }

    this.activeModal.close(payload);

  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  /*
  loginWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  logOut(): void {
    this.authService.signOut();
  }
  */

  changeModal(){
    this.isLogin = !this.isLogin;
  }
}
