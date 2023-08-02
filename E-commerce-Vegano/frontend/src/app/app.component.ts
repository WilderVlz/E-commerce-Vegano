import { Component, computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStatus } from '@shared/enums/auth-status.enum';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  private authService = inject( AuthService );
  private router = inject( Router );

  public finishedAuthCheck = computed<boolean>( () => {
    console.log("---->", this.authService.authStatus() )
    if ( this.authService.authStatus() === AuthStatus.checking ) {
      return false;
    }

    return true;
  });

  public authStatusChangedEffect = effect(() => {

    console.log("===)", this.authService.authStatus())

    switch( this.authService.authStatus() ) {

      case AuthStatus.checking:
        console.log(">>>>1")
        return;

      case AuthStatus.authenticated:
        console.log(">>>>2")
        //this.router.navigateByUrl('/container');
        return;

      case AuthStatus.notAuthenticated:
        console.log(">>>>3")
        //this.router.navigateByUrl('/auth');
        this.router.navigateByUrl('/container');
        return;
    }

  });
}
