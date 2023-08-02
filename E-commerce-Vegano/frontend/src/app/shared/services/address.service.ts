import {inject, Injectable} from '@angular/core';
import {ApiBaseService} from './api-base.service';
import {Observable} from 'rxjs';
import {Address} from '@shared/interfaces/address.interface';
import {HttpClient} from '@angular/common/http';
import {BASE_URL} from '@environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AddressService {
  private _urlBase: string = BASE_URL;
  private http = inject(HttpClient);

  private apiBase = inject(ApiBaseService);

  listarDirecciones(): Observable<Address[]> {
    return this.apiBase.get<Address[]>('/VeggieDelivery/listaDeDirecciones');
  }

  crearDirreccion(body: Address): Observable<Address> {
    return this.http.post<Address>(`${this._urlBase}/VeggieDelivery/crearDireccion`, body);
  }
  eliminarDirreccion(id: number) {
    return this.apiBase.delete(`/VeggieDelivery/eliminarDireccion/${id}`);
  }
}
