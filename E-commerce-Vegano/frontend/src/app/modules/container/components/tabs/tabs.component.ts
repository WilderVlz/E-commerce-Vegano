import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  @Input() state:string="";
  @Input() state2:string="";
menu:any[]=[
  {
    title:"Tipo de Entrega",
    path:"shopping"
  },{
    title:"Método de Pago",
    path:"pay"
  }
  ,{
    title:'Todo Listo',
    path:"confirm"
  }
]
}
