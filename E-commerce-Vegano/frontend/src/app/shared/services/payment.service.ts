import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { DOMAIN } from '@environments/environment';
import { Pay } from '@shared/interfaces/pay.interface';
import { PaymentIntentDto } from '@shared/interfaces/paymentIntentDto.interface';
import { Observable } from 'rxjs';

type NewType = string;

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  domain = DOMAIN;
  stripeUrl = `https://${this.domain}/stripe`;
  payUrl = `https://${this.domain}/pago`;
  private http = inject(HttpClient);

  //Pasarela de pago
  public pagar(paymentIntentDto: PaymentIntentDto): Observable<string> {
    return this.http.post<string>(
      this.stripeUrl + '/paymentintent',
      paymentIntentDto
    );
  }

  public confirmar(id: string): Observable<string> {
    return this.http.post<string>(this.stripeUrl + `/confirm/${id}`, {});
  }

  /* public cancelar(id: string): Observable<string> {
  return this.http.post<string>(this.stripeUrl + `cancel/${id}`, {},);
} */

  //servicio Pago

  public CrearPago(pay:Pay): Observable<Pay> {
    console.log(pay);

    return this.http.post<Pay>(`${this.payUrl}/crearPago`, pay);
  }
}
