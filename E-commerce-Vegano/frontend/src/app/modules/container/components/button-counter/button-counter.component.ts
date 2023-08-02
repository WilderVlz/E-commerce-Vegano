import {Component, EventEmitter, Input, Output} from '@angular/core';
import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons'
import {faTrashAlt} from '@fortawesome/free-regular-svg-icons'

@Component({
  selector: 'app-button-counter',
  templateUrl: './button-counter.component.html',
  styleUrls: ['./button-counter.component.scss']
})
export class ButtonCounterComponent {
  faPlus = faPlus
  faMinus = faMinus
  faTrash = faTrashAlt
  @Input() minValue: number = 0;
  @Input() maxValue!: number;
  @Input() value: number = 0;
  @Input() deleteIcon: boolean = false;


  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();


  emitValueChange() {
    this.valueChange.emit(this.value);
  }

  incrementValue() {
    this.value++
    this.value = Math.min(this.value, this.maxValue)
    this.emitValueChange()
  }

  decrementValue() {
    this.value--
    this.value = Math.max(this.value, this.minValue)
    this.emitValueChange()
  }
}

export interface ButtonFilter {
  minValue: number;
  maxValue: number;
}
