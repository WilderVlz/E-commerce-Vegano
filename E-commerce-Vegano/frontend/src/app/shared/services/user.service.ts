import {inject, Injectable} from '@angular/core';
import {ApiBaseService} from './api-base.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiBase = inject(ApiBaseService);


  consultarUsuario(id: number): Observable<UserAPI> {
    return this.apiBase.get<UserAPI>(`/VeggieDelivery/consultarUsuario/${id}`);
  }


}

export interface UserAPI {
  usuarioId: number,
  usuario: string,
  contrasena: string,
  clienteId: number
}
