import { FacebookLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { ChangeDetectorRef, Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { faBars} from '@fortawesome/free-solid-svg-icons';
import { LoginModalComponent } from '@modules/auth/components/login-modal/login-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MenuItem } from '@shared/interfaces/menu-item.interface';
import { AuthService } from '@shared/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-layout-container',
  templateUrl: './layout-container.component.html',
  styleUrls: ['./layout-container.component.scss']
})
export class LayoutContainerComponent implements OnInit {

  private modalService = inject(NgbModal);

  private authService = inject(AuthService);

  mostrarElementos: boolean = true;

  router = inject(Router);

  cdr = inject(ChangeDetectorRef);

  faBars = faBars;

  isCollapsed = false;

  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
  }

  public menuItems = signal<MenuItem[]>([
    { title: 'Home', route: 'home'},
    { title: 'Menú', route: 'menu'},
  ]);

  ngOnInit(): void {
    this.checkRouter();

    // Escucha los eventos de cambio de ruta para actualizar la evaluación del *ngIf
    this.router.events.subscribe(() => {
      this.checkRouter();
      this.cdr.detectChanges(); // Marca el componente para la detección de cambios
    });
  }

  private checkRouter() {
    this.mostrarElementos = this.router.url !== '/container/shopping'
        && this.router.url !== '/container/pay' && this.router.url !== '/container/confirm';
  }

  login() {

    const modalAgregarRef = this.modalService.open(LoginModalComponent,
      { size: 'md', backdrop: 'static', fullscreen: 'xs', scrollable: true });

      modalAgregarRef.result.then(
        (result) => {

          console.log("result => ", result)

          // TODO: refactorizar código cochino
          if(result.isLogin){
            this.authService.login(result.payload)
              .subscribe({
                next: () => {
                  this.router.navigateByUrl('/container')
                  Swal.fire('Inicio de sesión exitosa', "Usted inició sesión correctamente", 'success' )
                },
                error: (error) => {
                  Swal.fire('Error', "Algo salió mal", 'error' )
                  console.log("error =>", error)
                },
            })
          }else {
            this.authService.registro({
              ...result.payload,
              usuario: result.payload.email,
              idRol: 1
            })
              .subscribe({
                next: () => {
                  this.router.navigateByUrl('/container')
                  Swal.fire('Registro exitosa', "Usted se registró correctamente", 'success' )
                },
                error: (error) => {
                  Swal.fire('Error', "Algo salió mal", 'error' )
                  console.log("error =>", error)
                },
              })
          }

        } ,
        (reason) => {
          console.log("reason =>", reason)
        }
      );
  }

  /*
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }
  */

}
