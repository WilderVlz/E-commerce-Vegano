import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-button-counter-product-optional',
  templateUrl: './button-counter-product-optional.component.html',
  styleUrls: ['./button-counter-product-optional.component.scss']
})
export class ButtonCounterProductOptionalComponent {
  @Input() id!: number;
  @Input() name!: string;
  @Input() minValue!: number;
  @Input() maxValue!: number;
}

export interface ProductOptional {
  id: number;
  name: string;
  minValue: number;
  maxValue: number;
}
