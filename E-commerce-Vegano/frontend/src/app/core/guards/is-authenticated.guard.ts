import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginModalComponent } from '@modules/auth/components/login-modal/login-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthStatus } from '@shared/enums/auth-status.enum';
import { AuthService } from '@shared/services/auth.service';
import Swal from 'sweetalert2';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject( AuthService );
  const router      = inject( Router );

  if ( authService.authStatus() === AuthStatus.authenticated ) {
    return true;
  }

  // if ( authService.authStatus() === AuthStatus.checking ) {
  //   return false;
  // }

  // const url = state.url;
  // localStorage.setItem('url', url);


  //router.navigateByUrl('/container/shopping');
  //return false;

  const modalService = inject(NgbModal);

  const modalAgregarRef = modalService.open(LoginModalComponent,
    { size: 'md', backdrop: 'static', fullscreen: 'xs', scrollable: true });

    modalAgregarRef.result.then(
      (result) => {
        const authService = inject(AuthService);
        const router = inject(Router);

        console.log("result => ", result)

        // TODO: refactorizar código cochino
        if(result.isLogin){
          authService.login(result.payload)
            .subscribe({
              next: () => {
                router.navigateByUrl('/container')
                Swal.fire('Inicio de sesión exitosa', "Usted inició sesión correctamente", 'success' )
              },
              error: (error) => {
                Swal.fire('Error', "Algo salió mal", 'error' )
                console.log("error =>", error)
              },
          })
        }else {
          authService.registro({
            ...result.payload,
            usuario: result.payload.email,
            idRol: 1
          })
            .subscribe({
              next: () => {
                router.navigateByUrl('/container')
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

  return false;
};
