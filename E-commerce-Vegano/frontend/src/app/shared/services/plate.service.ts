import {inject, Injectable} from '@angular/core';
import {ApiBaseService} from './api-base.service';
import {Observable} from 'rxjs';
import {Plate} from '@shared/interfaces/plate.interface';

@Injectable({
  providedIn: 'root'
})
export class PlateService {

  private apiBase = inject(ApiBaseService);

  listarPlatos(): Observable<Plate[]> {
    return this.apiBase.get<Plate[]>('/VeggieDelivery/listaDePlatos');
  }

  findById(id: number): Observable<Plate> {
    return this.apiBase.get<Plate>(`/VeggieDelivery/buscarPlato/${id}`);
  }

  /*
  crearPlato(body: PlatoRequest): Observable<Plate> {
    return this.apiBase.post<Plate>('/plato', body);
  }

  actualizarPlatoo(body: PlatoRequest): Observable<Plate> {
    return this.apiBase.put<Plate>('/plato', body);
  }

  eliminarPlato(idPlato: number): Observable<any> {
    return this.apiBase.delete(`/plato/${idPlato}`)
  }
  */
}
