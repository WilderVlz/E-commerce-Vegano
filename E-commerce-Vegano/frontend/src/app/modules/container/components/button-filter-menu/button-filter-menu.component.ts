import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-button-filter-menu',
  templateUrl: './button-filter-menu.component.html',
  styleUrls: ['./button-filter-menu.component.scss']
})
export class ButtonFilterMenuComponent {
  @Input() name!: string;
  @Input() isActive: boolean = false;
  @Input() secondary: boolean = false;

  toggleActive() {
    this.isActive = !this.isActive;
  }
}
