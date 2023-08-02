import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  faAngleLeft,
  faArrowLeft,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { PaymentIntentDto } from '@shared/interfaces/paymentIntentDto.interface';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import { StripeCardComponent, StripeService } from 'ngx-stripe';
import { PaymentService } from '../../../../shared/services/payment.service';
import { Store } from '@ngrx/store';
import { AddIdPago, AddIdStripe } from 'src/app/store/actions/pedido.actions';
import Swal from 'sweetalert2';
import { ICard } from 'src/app/store/models/card.interface';
import { AddCard } from 'src/app/store/actions/card.actions';
import { Pay } from '../../../../shared/interfaces/pay.interface';
import { selectCart } from 'src/app/store/selectors/cart.selectors';


@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss'],
})
export class PaymentMethodComponent implements OnInit {
  faAngleLeft = faAngleLeft;
  faArrowLeft = faArrowLeft;
  faTrashCan = faTrashCan;
  public valueMethod: string = '0';
  public typeMethod: string = '';
  public montoTotal: number = 0;
  public isnewCard: boolean = false;
  public pagoId: number = 0;
  public pedidoId: number = 0;
  public stripeId: string = '';
  public error: string = '';
  public messageError: string = '';
  public cardsRegister: any[] = [];

  public stripeTest!: FormGroup;
  private router = inject(Router);
  private stripeService = inject(StripeService);
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private paymentService = inject(PaymentService);

  @ViewChild(StripeCardComponent) card!: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0',
        },
      },
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'es',
  };

  ngOnInit(): void {
    const envio = 2;
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]],
    });
    this.store.subscribe(resp=>{
      console.log(resp);
    })
    this.store.select(selectCart).subscribe(({cart}) => {

      this.pedidoId = cart.id;

      if (cart.total) {

        this.montoTotal = cart.total + envio;
      }
      else {
        this.montoTotal = envio;

      }

    })
  }
  createToken(): void {
    const name = this.stripeTest.get('name')?.value;
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {


        // If creating the token was successful
        if (result.token) {
          const { card } = result.token;
          const cardRegister: ICard = {
            name: card?.name as string,
            exp_month: card?.exp_month as number,
            exp_year: card?.exp_year as number,
            last4: card?.last4 as string,
            brand: card?.brand as string,
          };


          this.store.dispatch(AddCard({ card: cardRegister }));

          const paymentIntentDto: PaymentIntentDto = {
            token: result.token.id,
            amount: this.montoTotal,
            currency: 'usd',
            description: `pago ${result.token.id}`,
          };


          this.paymentService.pagar(paymentIntentDto).subscribe((resp: any) => {

            Swal.fire('Success', 'Tarjeta Agregada Correctamente', 'success');

            this.stripeId = resp.id;
            this.store.dispatch(AddIdStripe({ stripeId: this.stripeId }));
          });

        } else if (result.error) {
          // Error creating the token
          this.error = result.error.message as string;

          Swal.fire('Error', this.error, 'error');
        }
      });
  }


  sgtePage() {
    this.valueMethod == '0' ? (this.typeMethod = 'Tarjeta') : this.valueMethod == '1' ? (this.typeMethod = 'Efectivo') : '';
    const pay: Pay = {
      monto: this.montoTotal,
      medioDePago: this.typeMethod
    }
    this.paymentService.CrearPago(pay).subscribe((resp) => {

      this.pagoId = resp.pagoId as number;

      if (this.stripeId !== "" || this.valueMethod == '1') {
        this.store.dispatch(AddIdPago({ pagoId: this.pagoId }));
        this.router.navigateByUrl('/container/confirm');
      } else {
        this.messageError = 'Debe agregar una tarjeta';

      }
    });

  }

  goBack() {
    this.router.navigateByUrl('/container/shopping');
  }

}
