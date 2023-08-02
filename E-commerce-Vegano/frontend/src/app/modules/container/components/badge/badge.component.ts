import {Component, Input} from '@angular/core';


@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent {
  @Input() isSuccess!: boolean
  @Input() isDanger: boolean = false
  @Input() textSuccess!: string
  @Input() textDanger: string = ''
  @Input() textWarning!: string


}
