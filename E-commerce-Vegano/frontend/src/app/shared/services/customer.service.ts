import {inject, Injectable} from '@angular/core';
import {ApiBaseService} from './api-base.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiBase = inject(ApiBaseService);


  consultarCliente(id: number): Observable<Customer> {
    return this.apiBase.get<Customer>(`/VeggieDelivery/consultarCliente/${id}`);
  }


}

export interface Customer {
  clienteId: number,
  nombre: string,
  apellido: string,
  email: string,
  numeroCelular: string
}
